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
  async register(data: any,affiliateCode?: string) {
    const { email, phone, zaloId, facebookId,googleId, password } = data;

    // Kiểm tra xem người dùng đã tồn tại chưa
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
      throw new Error('Thông tin đăng ký đã tồn tại');
    }

    // Mã hóa mật khẩu nếu có
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;
    let referrerId: string | null = null;
    let affiliateLinkId: string | null = null;
    console.log(`Affiliate code: ${affiliateCode}`);
    
    if (affiliateCode) {
      try {
          const affiliateLink = await this.prisma.affiliateLink.findUnique({
              where: { codeId: affiliateCode },
              include: { createdBy: true } // Include the user who owns the link (referrer)
          });
          console.log(`Affiliate link found: ${affiliateLink}`);
          
          if (affiliateLink) {
              referrerId = affiliateLink.createdById; // ID of the user who created the affiliate link
              affiliateLinkId = affiliateLink.id;
              console.log(`Registration via affiliate code: ${affiliateCode}, Referrer ID: ${referrerId}`);
          } else {
               console.warn(`Affiliate code ${affiliateCode} provided but not found.`);
               // Decide if you want to throw an error or proceed without referral
          }
      } catch (error) {
          console.error(`Error finding affiliate link for code ${affiliateCode}:`, error);
          // Decide handling: throw error or log and proceed
      }
   }
    // Tạo người dùng mới
    const user = await this.prisma.user.create({
      data: {
        email: email || null,
        phone: phone || null,
        SDT: phone || null,
        zaloId: zaloId || null,
        facebookId: facebookId || null,
        googleId: googleId || null,
        password: hashedPassword,
        referrerId: referrerId || null,
      },
    });
    if (affiliateLinkId && user) {
      try {
        await this.prisma.registration.create({
          data: {
            registeredUserId: user.id,
            affiliateLinkId: affiliateLinkId,
          },
        });
        console.log(`Registration record created for user ${user.id} via link ${affiliateLinkId}`);
        } catch (error) {
            console.error(`Failed to create Registration record or tracking event for user ${user.id}:`, error);
            // Log error, but registration is likely already successful
        }
      }
    return { id: user.id, email: user.email, phone: user.phone };
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
