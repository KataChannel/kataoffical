import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  // async register(email: string, password: string) {
  //   const hashedPassword = await bcrypt.hash(password, 10);
  //   return this.prisma.user.create({
  //     data: { email, password: hashedPassword },
  //   });
  // }
  async register(data: any) {
    const { email, phone, zaloId, facebookId,googleId, password } = data;

    // Kiểm tra xem người dùng đã tồn tại chưa
    const existingUser = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { SDT: phone || undefined },
          { zaloId: zaloId || undefined },
          { facebookId: facebookId || undefined },
          { googleId: googleId || undefined },
        ],
      },
    });

    if (existingUser) {
      throw new Error('Thông tin đăng ký đã tồn tại');
    }

    // Mã hóa mật khẩu nếu có
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    // Tạo người dùng mới
    const user = await this.prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        zaloId: zaloId || null,
        facebookId: facebookId || null,
        googleId: googleId || null,
        password: hashedPassword,
      },
    });

    return { id: user.id, email: user.email, phone: user.phone };
  }

  async login(SDT:string,email: string, password: string) {   
    const user:any = await this.prisma.user.findFirst({ 
      where: { OR: [{ email }, { SDT }] },
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
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !user.password || !(await bcrypt.compare(oldPassword, user.password))) {
      throw new UnauthorizedException('Old password is incorrect');
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
