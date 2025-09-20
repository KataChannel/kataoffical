import { Injectable, NotFoundException } from '@nestjs/common';
import * as bcrypt from 'bcryptjs';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class UserService {
  constructor(
    private prisma: PrismaService,
    private _SocketGateway: SocketGateway,
  ) {}

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
  
    return users.map(({ password, roles, userPermissions, ...userWithoutPassword }) => {
      // Get role-based permissions
      const rolePermissions = Array.from(
        new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
      );
      
      // Get user-specific granted permissions
      const validUserPermissions = userPermissions
        .filter((up: any) => up.isGranted)
        .map((up: any) => up.permission);
      
      // Get user-specific denied permissions
      const deniedUserPermissions = userPermissions
        .filter((up: any) => !up.isGranted)
        .map((up: any) => up.permission.id);
      
      // Merge permissions: role permissions + user granted - user denied
      const allPermissions = [
        ...rolePermissions.filter((p: any) => !deniedUserPermissions.includes(p.id)),
        ...validUserPermissions
      ];
      
      // Remove duplicates based on permission id
      const uniquePermissions = Array.from(
        new Map(allPermissions.map((p: any) => [p.id, p])).values()
      );
      
      return {
        ...userWithoutPassword,
        roles: roles.map(({ role }) => role.name), // Return role names consistently
        permissions: uniquePermissions,
      };
    });
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
  
    return users.map(({ password, roles, userPermissions, ...userWithoutPassword }) => {
      // Get role-based permissions
      const rolePermissions = Array.from(
        new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
      );
      
      // Get user-specific granted permissions
      const validUserPermissions = userPermissions
        .filter((up: any) => up.isGranted)
        .map((up: any) => up.permission);
      
      // Get user-specific denied permissions
      const deniedUserPermissions = userPermissions
        .filter((up: any) => !up.isGranted)
        .map((up: any) => up.permission.id);
      
      // Merge permissions: role permissions + user granted - user denied
      const allPermissions = [
        ...rolePermissions.filter((p: any) => !deniedUserPermissions.includes(p.id)),
        ...validUserPermissions
      ];
      
      // Remove duplicates based on permission id
      const uniquePermissions = Array.from(
        new Map(allPermissions.map((p: any) => [p.id, p])).values()
      );
      
      return {
        ...userWithoutPassword,
        roles: roles.map(({ role }) => role.name), // Return role names consistently
        permissions: uniquePermissions,
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
        userPermissions: {
          include: {
            permission: true
          }
        }
      },
    }); 
    if (!user) throw new NotFoundException('User not found');
    
    // Loại bỏ password và userPermissions một cách an toàn bằng destructuring
    const { password, roles, userPermissions, ...userWithoutPassword } = user; 
    
    // Lấy danh sách role nhưng bỏ đi permissions
    const formattedRoles = roles.map(({ role }) => {
      const { permissions, ...roleWithoutPermissions } = role;
      return roleWithoutPermissions;
    });
    
    // Lấy danh sách permissions từ roles
    const rolePermissions = Array.from(
      new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))
    );
    
    // Lấy danh sách user-specific permissions (chỉ granted và chưa expired)
    const now = new Date();
    const validUserPermissions = userPermissions
      .filter(up => up.isGranted && (!up.expiresAt || new Date(up.expiresAt) > now))
      .map(up => up.permission);
    
    // Lấy danh sách user-specific denied permissions
    const deniedUserPermissions = userPermissions
      .filter(up => !up.isGranted && (!up.expiresAt || new Date(up.expiresAt) > now))
      .map(up => up.permission.id);
    
    // Merge permissions: role permissions + user granted - user denied
    const allPermissions = [
      ...rolePermissions.filter(p => !deniedUserPermissions.includes(p.id)),
      ...validUserPermissions
    ];
    
    // Remove duplicates based on permission id
    const uniquePermissions = Array.from(
      new Map(allPermissions.map(p => [p.id, p])).values()
    );
    
    return {
      ...userWithoutPassword,
      roles: formattedRoles.map((role) => role.name), // Ensure consistent string format
      permissions: uniquePermissions,
    };
  }
  

  async update(id: string, data: any) {
    this._SocketGateway.senduserUpdate();
    delete data.roles;
    delete data.permissions;
    if (data.password) {
      const hashedPassword = await bcrypt.hash(data.password, 10);
      data.password = hashedPassword;
    }
    return this.prisma.user.update({ where: { id }, data });
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
    return this.prisma.userRole.delete({
      where: {
        id: rolePermission.id,
      },
    });
  }
}
