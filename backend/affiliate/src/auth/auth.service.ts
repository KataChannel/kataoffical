import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}


async register(data: any, affiliateCode?: string) {
  try {
    // Normalize input
    const { email, phone, password, facebookId, googleId, zaloId } = data;

    // Check for existing user by unique fields
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phone: phone || undefined },
          { SDT: phone || undefined },
          { zaloId: zaloId || undefined },
          { facebookId: facebookId || undefined },
          { googleId: googleId || undefined },
        ],
      },
    });
    if (existingUser) {
      throw new UnauthorizedException('User already exists');
    }

    // Resolve referrer if affiliateCode is provided
    let referrerId: string | undefined;
    if (affiliateCode) {
      const referrer = await this.prisma.user.findUnique({
        where: { inviteCode: affiliateCode },
        select: { id: true },
      });
      referrerId = referrer?.id;
    }

    // Create new user
    const hashedPassword = await bcrypt.hash(password, 10);
    const inviteCode = phone || Math.random().toString(36).slice(-8);

    const user = await this.prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        password: hashedPassword,
        inviteCode,
        affiliateCode: affiliateCode || null,
        referrerId,
        facebookId: facebookId || null,
        googleId: googleId || null,
      },
    });

    return user;
  } catch (error) {
    // Log error for debugging
    console.error('Register error:', error);

    if (error instanceof UnauthorizedException) {
      throw error;
    }
    throw new UnauthorizedException('Registration failed');
  }
}



  async login(phone:string,email: string, password: string) {   
    const user:any = await this.prisma.user.findFirst({ 
      where: { OR: [{ email }, { phone }, { SDT: phone }] },
      include: {
      roles: { include: { role: { include: { permissions: {include:{permission:true}} } } } },
      },
     });    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }
    const resultUser = {
      ...user,
      roles: user.roles.map((role) => {
        const { permissions, ...rest } = role.role;
        return rest;
      }),
      permissions: Array.from(new Set(user.roles.flatMap((role) => role.role.permissions.map((p) => p.permission)))),
    };
    const payload = { id: user.id, role: user.role, permissions: user.permissions };
    const result = {
      access_token: this.jwtService.sign(payload),
      user: resultUser,
    };
    return result
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user:any = await this.prisma.user.findUnique({ where: { id: userId } });
   
    if (!user || !user.password || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('Mật Khẩu Cũ Không Đúng');
    }
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    return this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
  }

  async generateRandomPassword(userId: string) {
    const newPassword = Math.random().toString(36).slice(-8); // Tạo password ngẫu nhiên
    const hashedPassword = await bcrypt.hash(newPassword, 10);
    await this.prisma.user.update({
      where: { id: userId },
      data: { password: hashedPassword },
    });
    return { newPassword };
  }
  async validateOAuthLogin(provider: string, providerId: string, email?: string) {
    let user = await this.prisma.user.findUnique({ where: { providerId } });

    if (!user) {
      const newPassword = Math.random().toString(36).slice(-8); // Tạo password ngẫu nhiên
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user = await this.prisma.user.create({
        data: { provider, providerId, email: email || '', password: hashedPassword },
      });
    }

    const token = this.jwtService.sign({ id: user.id, provider: user.provider });
    return { token, user };
  }
  async getUserRoles(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
      include: { role: { include: { permissions: { include: { permission: true } } } } },
    });
  }

  async hasPermission(userId: string, permissionName: string): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.some((userRole) =>
      userRole.role.permissions.some((rp) => rp.permission.name === permissionName),
    );
  }

  async checkPermission(userId: string, permissionName: string) {
    const hasPerm = await this.hasPermission(userId, permissionName);
    if (!hasPerm) {
      throw new UnauthorizedException('Bạn không có quyền thực hiện thao tác này');
    }
  }
}
