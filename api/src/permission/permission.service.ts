import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; // Giả sử đường dẫn này là cố định
import { SocketGateway } from './socket.gateway'; // Nằm trong cùng thư mục module
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';

@Injectable()
export class PermissionService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogsService,
  ) {}

  async getLastUpdatedPermission(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.permission.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedPermission', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> { // Giữ nguyên logic 'I1' nếu nó không phụ thuộc vào 'sanpham'
    try {
      const latest = await this.prisma.permission.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/PEM(\d+)/); // Giữ nguyên prefix 'PEM'
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `PEM${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeIdForPermission', error); // Có thể làm rõ hơn cho logging
      throw error;
    }
  }

  async updateCodeIds(): Promise<{ status: string }> {
    try {
      const permissions = await this.prisma.permission.findMany({
        orderBy: { order: 'asc' },
      });
      for (let i = 0; i < permissions.length; i++) {
        const newCodeId = `PEM${(i + 1).toString().padStart(5, '0')}`;
        if (permissions[i].codeId !== newCodeId) {
          await this.prisma.permission.update({
            where: { id: permissions[i].id },
            data: { codeId: newCodeId },
          });
        }
      }
      this._SocketGateway.sendPermissionUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('updateCodeIds', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.permission.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.permission.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendPermissionUpdate();
      return created;
    } catch (error) {
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.permission.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.permission.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.permission.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByPermission', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.permission.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.permission.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllPermission', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.permission.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Permission not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnePermission', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.permission.update({ where: { id }, data: rest });
        updated = await this.prisma.permission.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.permission.update({ where: { id }, data });
      }
      this._SocketGateway.sendPermissionUpdate();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatePermission', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.permission.delete({ where: { id } });
      this._SocketGateway.sendPermissionUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removePermission', error);
      throw error;
    }
  }

  async reorderPermissions(permissionIds: string[]) {
    try {
      for (let i = 0; i < permissionIds.length; i++) {
        await this.prisma.permission.update({
          where: { id: permissionIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendPermissionUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderPermissions', error);
      throw error;
    }
  }
}