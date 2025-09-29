import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from '../email/email.service';

@Injectable()
export class AuthService {
  constructor(
    private prisma: PrismaService,
    private jwtService: JwtService,
    private emailService: EmailService,
  ) {}

  async generateCodeId(): Promise<string> {
    try {
      let nextNumber = 1;
      let codeId: string = '';
      let isUnique = false;

      // Get the latest codeId to start from
      const latest = await this.prisma.user.findFirst({
        orderBy: { codeId: 'desc' },
      });

      if (latest && latest.codeId) {
        const match = latest.codeId.match(/CTV(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      // Keep generating until we find a unique codeId
      while (!isUnique) {
        codeId = `CTV${nextNumber.toString().padStart(5, '0')}`;
        
        const existingUser = await this.prisma.user.findFirst({
          where: { codeId },
        });

        if (!existingUser) {
          isUnique = true;
        } else {
          nextNumber++;
        }
      }

      return codeId;
    } catch (error) {
      throw error;
    }
  }


  async register(data: any, affiliateCode?: string) {
    console.log('Register data:', data);
    
    try {
      // Normalize input
      const { name,email, phone, password, facebookId, googleId, zaloId, khoahoc } = data;
      // Check for existing user by unique fields
      console.log('Checking for existing user with email:', email, 'or phone:', phone);
      
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
      const hashedPassword = password 
        ? await bcrypt.hash(password, 10)
        : await bcrypt.hash(Math.random().toString(36).slice(-8), 10);

      const inviteCode = phone || Math.random().toString(36).slice(-8);
      const codeId = await this.generateCodeId();
      const user = await this.prisma.user.create({
        data: {
          codeId,
          name: name || null,
          email: email || null,
          phone: phone || null,
          password: hashedPassword,
          inviteCode,
          affiliateCode: affiliateCode || null,
          referrerId,
          facebookId: facebookId || null,
          googleId: googleId || null,
          ghichu: khoahoc || null,
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

  async registerctv(data: any, affiliateCode?: string) {
    try {
      // Normalize input
      const { email, phone, password, facebookId, googleId, zaloId } = data;
      console.log(data);
      
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
      const codeId = await this.generateCodeId();
      console.log('codeId', codeId);
      
      const user = await this.prisma.user.create({
        data: {
          codeId,
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

      // Send welcome email if user has an email
      if (user.email) {
        try {
          await this.emailService.sendWelcomeEmail(
            user.email,
            user.codeId || 'CTV'
          );
        } catch (emailError) {
          console.error('Failed to send welcome email:', emailError);
          // Don't throw error as registration was successful
        }
      }

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

  async login(phone: string, email: string, password: string) {
    const user: any = await this.prisma.user.findFirst({
      where: { OR: [{ email }, { phone }, { SDT: phone }] },
      include: {
        roles: {
          include: {
            role: {
              include: { permissions: { include: { permission: true } } },
            },
          },
        },
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
      permissions: Array.from(
        new Set(
          user.roles.flatMap((role) =>
            role.role.permissions.map((p) => p.permission),
          ),
        ),
      ),
    };
    const payload = {
      id: user.id,
      role: user.role,
      permissions: user.permissions,
    };
    const result = {
      access_token: this.jwtService.sign(payload),
      user: resultUser,
    };
    return result;
  }

  async changePassword(
    userId: string,
    oldPassword: string,
    newPassword: string,
  ) {
    const user: any = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (
      !user ||
      !user.password ||
      !(await bcrypt.compare(oldPassword, user.password))
    ) {
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

  async forgotPassword(email?: string, phone?: string) {
    if (!email && !phone) {
      throw new UnauthorizedException('Email hoặc số điện thoại là bắt buộc');
    }

    const user = await this.prisma.user.findFirst({
      where: {
        OR: [
          { email: email || undefined },
          { phone: phone || undefined },
          { SDT: phone || undefined },
        ],
      },
    });

    if (!user) {
      throw new UnauthorizedException('Không tìm thấy người dùng');
    }

    // Generate reset token
    const resetToken = this.jwtService.sign(
      { userId: user.id, type: 'password_reset' },
      { expiresIn: '15m' } // Token expires in 15 minutes
    );

    try {
      // Send email if user has an email address
      if (user.email) {
        await this.emailService.sendPasswordResetEmail(
          user.email,
          resetToken,
          user.name || user.codeId || undefined
        );
        
        return {
          message: 'Link đặt lại mật khẩu đã được gửi qua email',
          emailSent: true,
          email: this.maskEmail(user.email),
        };
      } else {
        // If no email, return token for manual handling (SMS, etc.)
        return {
          message: 'Token đặt lại mật khẩu đã được tạo',
          resetToken,
          emailSent: false,
          resetUrl: `${process.env.BASE_URL}/reset-password-ctv?token=${resetToken}`,
        };
      }
    } catch (emailError) {
      // If email fails, still provide token as fallback
      console.error('Email sending failed:', emailError);
      return {
        message: 'Có lỗi khi gửi email. Vui lòng sử dụng token bên dưới',
        resetToken,
        emailSent: false,
        resetUrl: `${process.env.BASE_URL}/reset-password-ctv?token=${resetToken}`,
        error: 'Email sending failed',
      };
    }
  }

  private maskEmail(email: string): string {
    const [localPart, domain] = email.split('@');
    const maskedLocal = localPart.length > 2 
      ? localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
      : localPart;
    return `${maskedLocal}@${domain}`;
  }

  async resetPassword(token: string, newPassword: string) {
    try {
      const decoded = this.jwtService.verify(token);
      
      if (decoded.type !== 'password_reset') {
        throw new UnauthorizedException('Token không hợp lệ');
      }

      const hashedPassword = await bcrypt.hash(newPassword, 10);
      
      const user = await this.prisma.user.update({
        where: { id: decoded.userId },
        data: { password: hashedPassword },
      });

      return { message: 'Mật khẩu đã được đặt lại thành công' };
    } catch (error) {
      if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
        throw new UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
      }
      throw error;
    }
  }
  async validateOAuthLogin(
    provider: string,
    providerId: string,
    email?: string,
  ) {
    let user = await this.prisma.user.findFirst({ where: { providerId } });

    if (!user) {
      const newPassword = Math.random().toString(36).slice(-8); // Tạo password ngẫu nhiên
      const hashedPassword = await bcrypt.hash(newPassword, 10);
      user = await this.prisma.user.create({
        data: {
          provider,
          providerId,
          email: email || '',
          password: hashedPassword,
        },
      });
    }

    const token = this.jwtService.sign({
      id: user.id,
      provider: user.provider,
    });
    return { token, user };
  }
  async getUserRoles(userId: string) {
    return this.prisma.userRole.findMany({
      where: { userId },
      include: {
        role: { include: { permissions: { include: { permission: true } } } },
      },
    });
  }

  async hasPermission(
    userId: string,
    permissionName: string,
  ): Promise<boolean> {
    const roles = await this.getUserRoles(userId);
    return roles.some((userRole) =>
      userRole.role.permissions.some(
        (rp) => rp.permission.name === permissionName,
      ),
    );
  }

  async checkPermission(userId: string, permissionName: string) {
    const hasPerm = await this.hasPermission(userId, permissionName);
    if (!hasPerm) {
      throw new UnauthorizedException(
        'Bạn không có quyền thực hiện thao tác này',
      );
    }
  }
}
