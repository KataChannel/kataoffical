import { Injectable, UnauthorizedException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class AuthService {
  constructor(private prisma: PrismaService, private jwtService: JwtService) {}

  async register(email: string, password: string) {
    const hashedPassword = await bcrypt.hash(password, 10);
    return this.prisma.user.create({
      data: { email, password: hashedPassword },
    });
  }

  async login(SDT:string,email: string, password: string) {   
    const user:any = await this.prisma.user.findFirst({ 
      where: { OR: [{ email }, { SDT }] },
      include: {
        roles: { include: { role: { include: { permissions: {include:{permission:true}} } } } },
        userPermissions: {
          include: {
            permission: true
          },
          where: {
            OR: [
              { expiresAt: null }, // Never expires
              { expiresAt: { gt: new Date() } }, // Not expired yet
            ],
          }
        }
      },
     });    
    if (!user || !(await bcrypt.compare(password, user.password))) {
      throw new UnauthorizedException('Invalid credentials');
    }

    // Get role-based permissions
    const rolePermissions: any[] = Array.from(new Set(user.roles.flatMap((role: any) => role.role.permissions.map((p: any) => p.permission))));
    
    // Get user-specific granted permissions
    const validUserPermissions = user.userPermissions
      .filter((up: any) => up.isGranted)
      .map((up: any) => up.permission);
    
    // Get user-specific denied permissions
    const deniedUserPermissions = user.userPermissions
      .filter((up: any) => !up.isGranted)
      .map((up: any) => up.permission.id);
    
    // Merge permissions: role permissions + user granted - user denied
    const allPermissions = [
      ...rolePermissions.filter((p: any) => !deniedUserPermissions.includes(p.id)),
      ...validUserPermissions
    ];
    
    // Remove duplicates based on permission id
    const uniquePermissions = Array.from(
      new Map(allPermissions.map(p => [p.id, p])).values()
    );

    const resultUser = {
      ...user,
      roles: user.roles.map((role) => {
        const { permissions, ...rest } = role.role;
        return rest.name; // Return just role name for consistency
      }),
      permissions: uniquePermissions,
    };
    
    // Remove sensitive data
    delete resultUser.password;
    delete resultUser.userPermissions;

    const payload = { 
      id: user.id, 
      email: user.email,
      roles: resultUser.roles,
      permissions: uniquePermissions.map(p => p.name) // Include permission names in JWT
    };
    const result = {
      access_token: this.jwtService.sign(payload),
      user: resultUser,
    };
    return result
  }

  async changePassword(userId: string, oldPassword: string, newPassword: string) {
    const user = await this.prisma.user.findUnique({ where: { id: userId } });
    if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
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
  async validateOAuthLogin(provider: string, providerId: string, email?: string, SDT?: string) {
    let user = await this.prisma.user.findUnique({ where: { providerId } });

    if (!user) {
      // Kiểm tra nếu email hoặc SDT đã tồn tại
      const existingUser = await this.prisma.user.findFirst({
        where: {
          OR: [
            ...(email ? [{ email }] : []),
            ...(SDT ? [{ SDT }] : [])
          ]
        }
      });

      if (existingUser) {
        // Cập nhật user hiện có với providerId
        user = await this.prisma.user.update({
          where: { id: existingUser.id },
          data: { 
            provider, 
            providerId,
            ...(email && { email }),
            ...(SDT && { SDT })
          }
        });
      } else {
        // Tạo user mới
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        user = await this.prisma.user.create({
          data: { 
            provider, 
            providerId, 
            email: email || '', 
            password: hashedPassword,
            ...(SDT && { SDT })
          },
        });
      }
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
    // 1. Check user-specific permissions first (highest priority)
    const userPermission = await this.prisma.userPermission.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        OR: [
          { expiresAt: null }, // Never expires
          { expiresAt: { gt: new Date() } }, // Not expired yet
        ],
      },
      include: { permission: true },
    });

    // If explicitly denied, return false (overrides role permissions)
    if (userPermission && !userPermission.isGranted) {
      return false;
    }

    // If explicitly granted, return true (no need to check roles)
    if (userPermission && userPermission.isGranted) {
      return true;
    }

    // 2. Fall back to role-based permissions
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

  /**
   * Get comprehensive user permissions including role-based and user-specific permissions
   */
  async getUserPermissionsDetailed(userId: string) {
    // Get role-based permissions
    const roles = await this.getUserRoles(userId);
    const rolePermissions = roles.flatMap((userRole) =>
      userRole.role.permissions.map((rp) => ({
        ...rp.permission,
        source: 'role',
        roleName: userRole.role.name,
        isGranted: true,
        isActive: true,
      }))
    );

    // Get user-specific permissions
    const userPermissions = await this.prisma.userPermission.findMany({
      where: { userId },
      include: {
        permission: true,
        user: { select: { name: true, email: true } },
      },
    });

    const userSpecificPermissions = userPermissions.map((up) => ({
      ...up.permission,
      source: 'user-specific',
      isGranted: up.isGranted,
      isActive: !up.expiresAt || up.expiresAt > new Date(),
      grantedBy: up.grantedBy,
      grantedAt: up.grantedAt,
      expiresAt: up.expiresAt,
      reason: up.reason,
    }));

    // Combine and deduplicate
    const allPermissions = new Map();

    // Add role permissions first (lower priority)
    rolePermissions.forEach((perm) => {
      allPermissions.set(perm.id, perm);
    });

    // Add user-specific permissions (higher priority - will override)
    userSpecificPermissions.forEach((perm) => {
      if (allPermissions.has(perm.id)) {
        // Merge with existing permission, prioritizing user-specific
        const existing = allPermissions.get(perm.id);
        allPermissions.set(perm.id, {
          ...existing,
          ...perm,
          sources: [existing.source, perm.source], // Track multiple sources
        });
      } else {
        allPermissions.set(perm.id, perm);
      }
    });

    return Array.from(allPermissions.values());
  }

  /**
   * Check if user has permission with detailed reason
   */
  async checkPermissionDetailed(userId: string, permissionName: string) {
    const userPermission = await this.prisma.userPermission.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      include: { permission: true },
    });

    if (userPermission) {
      return {
        hasPermission: userPermission.isGranted,
        source: 'user-specific',
        reason: userPermission.reason,
        grantedBy: userPermission.grantedBy,
        expiresAt: userPermission.expiresAt,
      };
    }

    // Check role permissions
    const roles = await this.getUserRoles(userId);
    const hasRolePermission = roles.some((userRole) =>
      userRole.role.permissions.some((rp) => rp.permission.name === permissionName),
    );

    if (hasRolePermission) {
      const roleWithPermission = roles.find((userRole) =>
        userRole.role.permissions.some((rp) => rp.permission.name === permissionName),
      );
      
      return {
        hasPermission: true,
        source: 'role',
        roleName: roleWithPermission?.role.name,
        reason: 'Inherited from role',
      };
    }

    return {
      hasPermission: false,
      source: 'none',
      reason: 'Permission not found in roles or user-specific permissions',
    };
  }

  async zaloMiniappLogin(accessToken: string, phoneToken?: string, userInfo?: any, mockPhone?: string) {
    let phone = mockPhone || '';

    // 1. Try to decrypt phone number via Zalo API if token is provided
    if (phoneToken && accessToken && process.env.ZALO_APP_SECRET && process.env.ZALO_APP_SECRET !== 'your-zalo-app-secret') {
      try {
        const response = await fetch('https://graph.zalo.me/v2.0/me/info', {
          headers: {
            access_token: accessToken,
            code: phoneToken,
            secret_key: process.env.ZALO_APP_SECRET
          }
        });
        const resData: any = await response.json();
        if (resData && resData.data && resData.data.number) {
          phone = resData.data.number;
          // Zalo phone numbers might start with 84, convert to 0
          if (phone.startsWith('84')) {
            phone = '0' + phone.slice(2);
          }
        }
      } catch (error) {
        console.error('Error decrypting Zalo phone number:', error);
      }
    }

    // 2. Fallback to userInfo details if phone is still empty
    if (!phone && userInfo && userInfo.phone) {
      phone = userInfo.phone;
    }

    // 3. Fallback to mock phone number based on user ID if still empty
    if (!phone && userInfo && userInfo.id) {
      phone = '09' + userInfo.id.slice(0, 8).replace(/[^0-9]/g, '9').padEnd(8, '0').slice(0, 8);
    }
    
    if (!phone) {
      phone = '0988888888'; // fallback absolute default
    }

    // 4. Validate or register OAuth User
    const zaloId = userInfo?.id || 'zalo-mock-id';
    const zaloName = userInfo?.name || 'Zalo User';
    
    // Call validateOAuthLogin to link/register the user
    const loginResult = await this.validateOAuthLogin('zalo', zaloId, undefined, phone);
    
    // Update user profile name if not set
    if (loginResult.user && !loginResult.user.name) {
      await this.prisma.user.update({
        where: { id: loginResult.user.id },
        data: { name: zaloName }
      });
      loginResult.user.name = zaloName;
    }

    // 5. Check if customer (Khachhang) exists with this phone number
    let khachhang = await this.prisma.khachhang.findFirst({
      where: { OR: [{ sdt: phone }, { phone: phone }] }
    });

    if (!khachhang) {
      // Generate new makh
      const prefix = 'TG-KL';
      const latest = await this.prisma.khachhang.findFirst({
        where: { makh: { startsWith: prefix } },
        orderBy: { makh: 'desc' },
        select: { makh: true },
      });
      let nextNumber = 1;
      if (latest && latest.makh) {
        const lastNumber = parseInt(latest.makh.slice(prefix.length), 10);
        nextNumber = lastNumber + 1;
      }
      const makh = `${prefix}${nextNumber.toString().padStart(5, '0')}`;

      // Create new Khachhang
      khachhang = await this.prisma.khachhang.create({
        data: {
          makh,
          name: zaloName,
          sdt: phone,
          phone: phone,
          isActive: true,
          loaikh: 'khachle',
          isshowvat: true,
        }
      });
    }

    return {
      access_token: loginResult.token,
      user: {
        id: loginResult.user.id,
        email: loginResult.user.email,
        SDT: loginResult.user.SDT,
        name: loginResult.user.name,
        provider: loginResult.user.provider,
        providerId: loginResult.user.providerId,
      },
      khachhangId: khachhang.id,
      makh: khachhang.makh,
    };
  }
}

