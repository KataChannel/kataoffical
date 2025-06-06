import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class SettingService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  // Hàm parse giá trị dựa trên type
  private parseValue(value: string | null, type: string | null): any {
    if (value === null) return null;

    switch (type) {
      case 'number':
        const num = Number(value);
        return isNaN(num) ? null : num;
      case 'boolean':
        return value === 'true' || value === '1';
      case 'json':
        try {
          return JSON.parse(value);
        } catch (error) {
          this._ErrorlogService.logError('parseValue', error);
          return null;
        }
      case 'string':
      default:
        return value;
    }
  }

  // Lấy thời gian cập nhật mới nhất
  async getLastUpdatedSetting(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.setting.aggregate({
        _max: { updatedAt: true },
      });
      return {
        updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0,
      };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedSetting', error);
      throw error;
    }
  }

  // Tạo codeId tự động
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.setting.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'ST';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'ST';
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateSettingCodeId', error);
      throw error;
    }
  }

  // Tạo setting mới
  async create(data: any): Promise<any> {
    try {
      const maxOrder = await this.prisma.setting.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();

      const created = await this.prisma.setting.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId,
        },
      });

      this._SocketGateway.sendUpdate('setting');

      return {
        ...created,
        value: this.parseValue(created.value, created.type),
      };
    } catch (error) {
      this._ErrorlogService.logError('createSetting', error);
      throw error;
    }
  }

  // Tìm setting theo tham số
  async findBy(param: any) {
    try {
      const { isOne, page = 1, pageSize = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.setting.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        if (!result) return null;
        return {
          ...result,
          value: this.parseValue(result.value, result.type),
        };
      }

      const skip = (page - 1) * pageSize;
      const [data, total] = await Promise.all([
        this.prisma.setting.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { order: 'asc' },
        }),
        this.prisma.setting.count({ where }),
      ]);

      return {
        data: data.map((setting) => ({
          ...setting,
          value: this.parseValue(setting.value, setting.type),
        })),
        total,
        page,
        pageCount: Math.ceil(total / pageSize),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBySetting', error);
      throw error;
    }
  }

  // Lấy tất cả settings
  async findAll(page: number = 1, pageSize: number = 20) {
    try {
      const skip = (page - 1) * pageSize;
      const [data, total] = await Promise.all([
        this.prisma.setting.findMany({
          skip,
          take: pageSize,
          orderBy: { order: 'asc' },
        }),
        this.prisma.setting.count(),
      ]);

      return {
        data: data.map((setting) => ({
          ...setting,
          value: this.parseValue(setting.value, setting.type),
        })),
        total,
        page,
        pageCount: Math.ceil(total / pageSize),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllSetting', error);
      throw error;
    }
  }

  // Lấy một setting theo ID
  async findOne(id: string): Promise<any> {
    try {
      const item = await this.prisma.setting.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Setting not found');
      return {
        ...item,
        value: this.parseValue(item.value, item.type),
      };
    } catch (error) {
      this._ErrorlogService.logError('findOneSetting', error);
      throw error;
    }
  }

  // Cập nhật setting
  async update(id: string, data: any): Promise<any> {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.setting.update({ where: { id }, data: rest });
        updated = await this.prisma.setting.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.setting.update({ where: { id }, data });
      }

      this._SocketGateway.sendUpdate('setting');

      return {
        ...updated,
        value: this.parseValue(updated.value, updated.type),
      };
    } catch (error) {
      this._ErrorlogService.logError('updateSetting', error);
      throw error;
    }
  }

  // Xóa setting
  async remove(id: string): Promise<any> {
    try {
      const deleted = await this.prisma.setting.delete({ where: { id } });
      this._SocketGateway.sendUpdate('setting');
      return {
        ...deleted,
        value: this.parseValue(deleted.value, deleted.type),
      };
    } catch (error) {
      this._ErrorlogService.logError('removeSetting', error);
      throw error;
    }
  }

  // Sắp xếp lại thứ tự settings
  async reorderSettings(settingIds: string[]): Promise<{ status: string }> {
    try {
      for (let i = 0; i < settingIds.length; i++) {
        await this.prisma.setting.update({
          where: { id: settingIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('setting');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderSettings', error);
      throw error;
    }
  }
}