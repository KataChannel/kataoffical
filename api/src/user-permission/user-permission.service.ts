import { Injectable, NotFoundException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

export interface UserPermissionData {
  id?: string;
  userId: string;
  permissionId: string;
  isGranted: boolean;
  grantedBy?: string;
  grantedAt?: Date;
  expiresAt?: Date;
  reason?: string;
}

@Injectable()
export class UserPermissionService {
  constructor(private prisma: PrismaService) {}

  /**
   * Assign permission to user (grant or deny)
   */
  async assignPermissionToUser(data: {
    userId: string;
    permissionId: string;
    isGranted: boolean;
    grantedBy: string;
    reason?: string;
    expiresAt?: Date;
  }) {
    // Check if user exists
    const user = await this.prisma.user.findUnique({
      where: { id: data.userId },
    });
    if (!user) {
      throw new NotFoundException(`User with ID ${data.userId} not found`);
    }

    // Check if permission exists
    const permission = await this.prisma.permission.findUnique({
      where: { id: data.permissionId },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${data.permissionId} not found`);
    }

    // Check if granting user exists
    const grantingUser = await this.prisma.user.findUnique({
      where: { id: data.grantedBy },
    });
    if (!grantingUser) {
      throw new NotFoundException(`Granting user with ID ${data.grantedBy} not found`);
    }

    // Create or update user permission
    return this.prisma.userPermission.upsert({
      where: {
        userId_permissionId: {
          userId: data.userId,
          permissionId: data.permissionId,
        },
      },
      update: {
        isGranted: data.isGranted,
        grantedBy: data.grantedBy,
        grantedAt: new Date(),
        reason: data.reason,
        expiresAt: data.expiresAt,
        updatedAt: new Date(),
      },
      create: {
        userId: data.userId,
        permissionId: data.permissionId,
        isGranted: data.isGranted,
        grantedBy: data.grantedBy,
        grantedAt: new Date(),
        reason: data.reason,
        expiresAt: data.expiresAt,
      },
      include: {
        user: { select: { id: true, name: true, email: true } },
        permission: { select: { id: true, name: true, codeId: true } },
      },
    });
  }

  /**
   * Remove user permission
   */
  async removeUserPermission(userId: string, permissionId: string) {
    const userPermission = await this.prisma.userPermission.findFirst({
      where: {
        userId,
        permissionId,
      },
    });

    if (!userPermission) {
      throw new NotFoundException(
        `Permission with ID ${permissionId} is not assigned to User with ID ${userId}`,
      );
    }

    return this.prisma.userPermission.delete({
      where: {
        id: userPermission.id,
      },
    });
  }

  /**
   * Get all permissions for a user (both granted and denied)
   */
  async getUserPermissions(userId: string) {
    return this.prisma.userPermission.findMany({
      where: { userId },
      include: {
        permission: {
          select: {
            id: true,
            name: true,
            codeId: true,
            description: true,
            group: true,
          },
        },
      },
      orderBy: [
        { isGranted: 'desc' }, // Granted permissions first
        { permission: { name: 'asc' } }, // Then by permission name
      ],
    });
  }

  /**
   * Get effective permission for a user (check if granted and not expired)
   */
  async getUserEffectivePermission(userId: string, permissionId: string) {
    const userPermission = await this.prisma.userPermission.findFirst({
      where: {
        userId,
        permissionId,
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      include: {
        permission: true,
      },
    });

    return userPermission;
  }

  /**
   * Get effective permission by permission name
   */
  async getUserEffectivePermissionByName(userId: string, permissionName: string) {
    const userPermission = await this.prisma.userPermission.findFirst({
      where: {
        userId,
        permission: { name: permissionName },
        OR: [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ],
      },
      include: {
        permission: true,
      },
    });

    return userPermission;
  }

  /**
   * Get all user permissions with pagination and filtering
   */
  async findMany(params: {
    userId?: string;
    permissionId?: string;
    isGranted?: boolean;
    isExpired?: boolean;
    page?: number;
    limit?: number;
  }) {
    const { userId, permissionId, isGranted, isExpired, page = 1, limit = 50 } = params;
    
    const where: any = {};
    
    if (userId) where.userId = userId;
    if (permissionId) where.permissionId = permissionId;
    if (typeof isGranted === 'boolean') where.isGranted = isGranted;
    
    if (typeof isExpired === 'boolean') {
      if (isExpired) {
        where.expiresAt = { lt: new Date() };
      } else {
        where.OR = [
          { expiresAt: null },
          { expiresAt: { gt: new Date() } },
        ];
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.userPermission.findMany({
        where,
        include: {
          user: { select: { id: true, name: true, email: true } },
          permission: { select: { id: true, name: true, codeId: true, description: true } },
        },
        orderBy: [
          { createdAt: 'desc' },
        ],
        skip: (page - 1) * limit,
        take: limit,
      }),
      this.prisma.userPermission.count({ where }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  /**
   * Batch assign permissions to multiple users
   */
  async batchAssignPermissions(data: {
    userIds: string[];
    permissionIds: string[];
    isGranted: boolean;
    grantedBy: string;
    reason?: string;
    expiresAt?: Date;
  }) {
    const results: any[] = [];
    
    for (const userId of data.userIds) {
      for (const permissionId of data.permissionIds) {
        const result = await this.prisma.userPermission.upsert({
          where: {
            userId_permissionId: { userId, permissionId },
          },
          update: {
            isGranted: data.isGranted,
            grantedBy: data.grantedBy,
            grantedAt: new Date(),
            reason: data.reason,
            expiresAt: data.expiresAt,
          },
          create: {
            userId,
            permissionId,
            isGranted: data.isGranted,
            grantedBy: data.grantedBy,
            reason: data.reason,
            expiresAt: data.expiresAt,
          },
        });
        results.push(result);
      }
    }

    return results;
  }

  /**
   * Clean up expired permissions
   */
  async cleanupExpiredPermissions() {
    return this.prisma.userPermission.deleteMany({
      where: {
        expiresAt: {
          lt: new Date(),
        },
      },
    });
  }

  /**
   * Get permission statistics
   */
  async getPermissionStats() {
    const [
      totalUserPermissions,
      activePermissions,
      expiredPermissions,
      grantedPermissions,
      deniedPermissions,
    ] = await Promise.all([
      this.prisma.userPermission.count(),
      this.prisma.userPermission.count({
        where: {
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
      }),
      this.prisma.userPermission.count({
        where: {
          expiresAt: { lt: new Date() },
        },
      }),
      this.prisma.userPermission.count({
        where: {
          isGranted: true,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
      }),
      this.prisma.userPermission.count({
        where: {
          isGranted: false,
          OR: [
            { expiresAt: null },
            { expiresAt: { gt: new Date() } },
          ],
        },
      }),
    ]);

    return {
      total: totalUserPermissions,
      active: activePermissions,
      expired: expiredPermissions,
      granted: grantedPermissions,
      denied: deniedPermissions,
    };
  }
}