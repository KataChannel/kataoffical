import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { permission } from 'process';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import * as bcrypt from 'bcryptjs';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService, // Assuming you have an ErrorLogService for logging errors
  ) {}
  async getLastUpdated() {
    try {
      const lastUpdated = await this.prisma.user.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdated', error);
      throw error;
    }
  }

  async createUser(dto: any) {
    const hashedPassword = await bcrypt.hash(dto.password, 10);
    return this.prisma.user.create({
      data: {
        email: dto.email,
        password: hashedPassword, // Hash password in real app
      },
    });
  }

  async getUsers() {
    const users = await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: { include: { permission: true } },
              },
            },
          },
        },
      },
    });
  
    return users.map(({ password, roles, ...userWithoutPassword }) => ({
      ...userWithoutPassword,
      name:userWithoutPassword?.name,
      roles: roles.map(({ role }) => {
        const { permissions, ...roleWithoutPermissions } = role;
        return roleWithoutPermissions;
      }),
      permissions: Array.from(
        new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
      ),
    }));
  }
  async findAll() {
    const users = await this.prisma.user.findMany({
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: { include: { permission: true } },
              },
            },
          },
        },
      },
    });
  
    return users.map(({ password, roles, ...userWithoutPassword }) => ({
      ...userWithoutPassword,
      roles: roles.map(({ role }) => {
        const { permissions, ...roleWithoutPermissions } = role;
        return roleWithoutPermissions;
      }),
      permissions: Array.from(
        new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
      ),
    }));
  }
  async findby(param: any) {
    try {
      const user = await this.prisma.user.findUnique({
        where:param ,
        include: {
          roles: {
            include: {
              role: {
                include: {
                  permissions: { include: { permission: true } },
                },
              },
            },
          },
        },
      }); 
      if (!user) throw new NotFoundException('User not found');
      // Loại bỏ password một cách an toàn bằng destructuring
      const { password, roles, ...userWithoutPassword } = user; 
      // Lấy danh sách role nhưng bỏ đi permissions
      const formattedRoles = roles.map(({ role }) => {
        const { permissions, ...roleWithoutPermissions } = role;
        return roleWithoutPermissions;
      });
      // Lấy danh sách permissions duy nhất
      const permissions = Array.from(
        new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
      ); 
      return {
        ...userWithoutPassword,
        roles: formattedRoles,
        permissions,
      };
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }
  async leaderboard() {
    const users = await this.prisma.user.findMany({
      include: {
        referrals: true,
      },
      orderBy: {
        referrals: {
          _count: 'desc',
        },
      },
      take: 10,
    });

    // Filter users who have more than 1 referral
    return users
      .filter(user => user.referrals.length > 0)
      .map(({ password, ...user }) => {
      // Mask phone number and email
      const maskedPhone = user?.phone ? 
        `${user.phone.slice(0, 3)}${'*'.repeat(Math.max(0, user.phone.length - 6))}${user.phone.slice(-3)}` : 
        null;
      const maskedSDT = user?.SDT ? 
        `${user.SDT.slice(0, 3)}${'*'.repeat(Math.max(0, user.SDT.length - 6))}${user.SDT.slice(-3)}` : 
        null;
        
      const maskedEmail = user?.email ? 
        `${user.email.slice(0, 3)}${'*'.repeat(Math.max(0, user.email.indexOf('@') - 3))}${user.email.slice(user.email.indexOf('@') - 3)}` : 
        null;
        
      return {
        ...user,
        name: user.name,
        phone: maskedPhone,
        SDT: maskedSDT,
        email: maskedEmail,
        referralsCount: user.referrals.length,
      };
      });
  }



  
  async findOne(id: string) {
    const user = await this.prisma.user.findUnique({
      where: { id },
      include: {
        roles: {
          include: {
            role: {
              include: {
                permissions: { include: { permission: true } },
              },
            },
          },
        },
        referrals: true,
        referrer: true,
      },
    }); 
    if (!user) throw new NotFoundException('User not found');
    // Loại bỏ password một cách an toàn bằng destructuring
    const { password, roles, ...userWithoutPassword } = user; 
    // Lấy danh sách role nhưng bỏ đi permissions
    const formattedRoles = roles.map(({ role }) => {
      const { permissions, ...roleWithoutPermissions } = role;
      return roleWithoutPermissions;
    });
    // Lấy danh sách permissions duy nhất
    const permissions = Array.from(
      new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
    ); 
    return {
      ...userWithoutPassword,
      roles: formattedRoles,
      permissions,
    };
  }


  async update(id: string, data: Partial<Omit<any, 'id' | 'roles' | 'permissions'>>) {
    try {
      // Remove sensitive properties that shouldn't be directly updated
      const { roles, permissions, ...updateData } = data;

      // Hash password if provided
      if (updateData.password) {
        updateData.password = await bcrypt.hash(updateData.password, 10);
      }

      // Update user in database
      const updatedUser = await this.prisma.user.update({ 
        where: { id }, 
        data: updateData 
      });

      // Notify clients about the update
      this._SocketGateway.senduserUpdate();

      // Return user without password
      const { password, ...userWithoutPassword } = updatedUser;
      return userWithoutPassword;
    } catch (error) {
      this._ErrorlogService.logError('update', error);
      
      // Improve error handling with more specific errors
      if (error.code === 'P2025') {
        throw new NotFoundException(`User with ID ${id} not found`);
      }
      throw error;
    }
  }

  async remove(id: string) {
    return this.prisma.user.delete({ where: { id } });
  }
  async assignRoleToUser(data: { userId: string; roleId: any }) {
    const { userId, roleId } = data;

    const role = await this.prisma.user.findUnique({
      where: { id: userId },
    });
    if (!role) {
      throw new NotFoundException(`Role with ID ${userId} not found`);
    }
    const permission = await this.prisma.role.findUnique({
      where: { id: roleId },
    });
    if (!permission) {
      throw new NotFoundException(`Permission with ID ${roleId} not found`);
    }
    return this.prisma.userRole.create({
      data: {
        userId,
        roleId,
      },
    });
  }
  async removeRoleFromUser(data: { userId: string; roleId: any }) {
    const { userId, roleId } = data;
    // Check if the role-permission relationship exists
    const rolePermission = await this.prisma.userRole.findFirst({
      where: {
        userId,
        roleId,
      },
    });
    if (!rolePermission) {
      throw new NotFoundException(
        `Permission with ID ${roleId} is not assigned to Role with ID ${userId}`,
      );
    }
    // Remove permission from role
    return this.prisma.userRole.delete({
      where: {
        id: rolePermission.id,
      },
    });
  }
}
