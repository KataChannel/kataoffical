import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
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

  async getLastUpdatedSetting() {
    try {
      const lastUpdated = await this.prisma.setting.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedSetting', error);
      throw new InternalServerErrorException({
        message: 'Không thể lấy thông tin cập nhật cuối cùng',
        error: error?.message || error,
      });
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.setting.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest) {
        const match = latest.codeId?.match(/I1(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `ST${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generate codeId', error);
      throw new InternalServerErrorException({
        message: 'Không thể sinh mã codeId',
        error: error?.message || error,
      });
    }
  }

  async create(data: any) {
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
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createSetting', error);
      throw new BadRequestException({
        message: 'Tạo mới setting thất bại',
        error: error?.message || error,
      });
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
      throw new InternalServerErrorException({
        message: 'Không thể lấy danh sách setting',
        error: error?.message || error,
      });
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
      throw new InternalServerErrorException({
        message: 'Không thể lấy tất cả setting',
        error: error?.message || error,
      });
    }
  }

  async findOne(id: string) {
    try {
      const setting = await this.prisma.setting.findUnique({ where: { id } });
      if (!setting) throw new NotFoundException('Setting not found');
      return setting;
    } catch (error) {
      this._ErrorlogService.logError('findOne', error);
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException({
        message: 'Không thể lấy setting',
        error: error?.message || error,
      });
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
      this._SocketGateway.sendUpdate('setting');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateSetting', error);
      throw new BadRequestException({
        message: 'Cập nhật setting thất bại',
        error: error?.message || error,
      });
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.setting.delete({ where: { id } });
       this._SocketGateway.sendUpdate('setting');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeSetting', error);
      throw new BadRequestException({
        message: 'Xóa setting thất bại',
        error: error?.message || error,
      });
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
      this._SocketGateway.sendUpdate('setting');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderSettings', error);
      throw new BadRequestException({
        message: 'Sắp xếp lại setting thất bại',
        error: error?.message || error,
      });
    }
  }
}