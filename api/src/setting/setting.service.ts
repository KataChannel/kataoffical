import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from './socket.gateway';

@Injectable()
export class SettingService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedSetting() {
    try {
      const lastUpdated = await this.prisma.setting.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedSetting', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.setting.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest) {
        const match = latest.codeId.match(/I1(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `I1${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generate codeId', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.setting.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const masp = await this.generateCodeId();
      const created = await this.prisma.setting.create({
        data: {
          ...data,
          order: newOrder,
          masp: masp,
        },
      });
      this._SocketGateway.sendSettingUpdate();
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createSetting', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.setting.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.setting.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBy', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.setting.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.setting.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAll', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const setting = await this.prisma.setting.findUnique({ where: { id } });
      if (!setting) throw new NotFoundException('Setting not found');
      return setting;
    } catch (error) {
      this._ErrorlogService.logError('findOne', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.setting.update({ where: { id }, data: rest });
        updated = await this.prisma.setting.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.setting.update({ where: { id }, data });
      }
      this._SocketGateway.sendSettingUpdate();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateSetting', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.setting.delete({ where: { id } });
      this._SocketGateway.sendSettingUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeSetting', error);
      throw error;
    }
  }

  async reorderSettings(settingIds: string[]) {
    try {
      for (let i = 0; i < settingIds.length; i++) {
        await this.prisma.setting.update({
          where: { id: settingIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendSettingUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderSettings', error);
      throw error;
    }
  }
}