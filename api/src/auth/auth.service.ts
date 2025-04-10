import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}


async register(data: any, affiliateCode?: string) {
  const { email, phone, zaloId, facebookId, googleId, password } = data;

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
    include: {
      Employee: true, // Bao gồm thông tin employee để kiểm tra
      referrals: true, // Bao gồm thông tin referrals để kiểm tra
      referrer: true, // Bao gồm thông tin referrer
    },
  });

  let user;
  let isNewUser = false;
  let referrerId: string | null = null;
  let affiliateLinkId: string | null = null;

  // Xử lý affiliate code nếu có
  if (affiliateCode) {
    try {
      const affiliateLink = await this.prisma.affiliateLink.findUnique({
        where: { codeId: affiliateCode },
        include: { createdBy: true }, // Include user sở hữu link
      });

      console.log(`Affiliate link found: ${JSON.stringify(affiliateLink)}`);

      if (affiliateLink) {
        referrerId = affiliateLink.createdById; // ID của user đã giới thiệu
        affiliateLinkId = affiliateLink.id;
        console.log(`Processing affiliate code: ${affiliateCode}, Referrer ID: ${referrerId}`);
      } else {
        console.warn(`Affiliate code ${affiliateCode} provided but not found.`);
      }
    } catch (error) {
      console.error(`Error finding affiliate link for code ${affiliateCode}:`, error);
      // Tiếp tục mà không dừng quá trình
    }
  }

  if (existingUser) {
    // User đã tồn tại
    user = existingUser;

    // Kiểm tra và cập nhật thông tin nhân viên
    if (!user.employee) {
      // Nếu chưa là nhân viên, tạo bản ghi Employee
      await this.prisma.employee.create({
        data: {
          userId: user.id,
          employeeCode: `EMP-${Date.now()}`,
          firstName: data.firstName || 'Default',
          lastName: data.lastName || 'Name',
          workEmail: user.email || `employee-${Date.now()}@example.com`,
          // Thêm các trường Employee khác nếu cần, ví dụ:
          // name: data.name || null,
          // position: data.position || null,
        },
      });
      console.log(`Created Employee record for user ${user.id}`);
    } else {
      // Nếu đã là nhân viên, cập nhật thông tin Employee
      await this.prisma.employee.update({
        where: { userId: user.id },
        data: {
          // Cập nhật các trường Employee nếu cần, ví dụ:
          // name: data.name || user.employee.name,
          // position: data.position || user.employee.position,
          updatedAt: new Date(),
        },
      });
      console.log(`Updated Employee record for user ${user.id}`);
    }

    // Kiểm tra và thêm thông tin referrer nếu chưa có
    if (!user.referrerId && referrerId) {
      await this.prisma.user.update({
        where: { id: user.id },
        data: {
          referrerId,
        },
      });
      console.log(`Added referrerId ${referrerId} for user ${user.id}`);
    }
  } else {
    // User chưa tồn tại, tạo user mới
    isNewUser = true;
    const hashedPassword = password ? await bcrypt.hash(password, 10) : undefined;

    user = await this.prisma.user.create({
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
      include: {
        Employee: true,
        referrals: true,
        referrer: true,
      },
    });

    // Tạo bản ghi Employee cho user mới
    await this.prisma.employee.create({
      data: {
        userId: user.id,
        employeeCode: `EMP-${Date.now()}`,
        firstName: data.firstName || 'Default',
        lastName: data.lastName || 'Name',
        workEmail: user.email || `employee-${Date.now()}@example.com`,
        // Thêm các trường Employee khác nếu cần, ví dụ:
        // name: data.name || null,
        // position: data.position || null,
      },
    });
    console.log(`Created new user ${user.id} with Employee record`);
  }

  // Tạo bản ghi Registration nếu có affiliate link
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
      console.error(`Failed to create Registration record for user ${user.id}:`, error);
      // Không dừng quá trình nếu lỗi này xảy ra
    }
  }

  // Kiểm tra vai trò
  const isEmployee = !!(user.employee || isNewUser); // Nếu mới tạo hoặc có employee
  const isReferrer = user.referrals.length > 0 || !!affiliateCode || !!user.referrerId; // Có referrals, affiliateCode, hoặc referrerId

  // Trả về thông tin user và trạng thái
  return {
    id: user.id,
    email: user.email,
    phone: user.phone,
    isNewUser, // true nếu user vừa được tạo
    isEmployee, // true nếu là nhân viên
    isReferrer, // true nếu liên quan đến giới thiệu
    isBoth: isEmployee && isReferrer, // true nếu là cả hai
    referrerId: user.referrerId || referrerId, // ID của người giới thiệu
  };
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
