import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from '../socket.gateway';

@Injectable()
export class UserguideService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedUserguide(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.userguide.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedUserguide', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.userguide.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/I1(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `I1${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.userguide.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.userguide.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUserguideUpdate();
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createUserguide', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguide.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.userguide.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByUserguide', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguide.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.userguide.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllUserguide', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.userguide.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Userguide not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneUserguide', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.userguide.update({ where: { id }, data: rest });
        updated = await this.prisma.userguide.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.userguide.update({ where: { id }, data });
      }
      this._SocketGateway.sendUserguideUpdate();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateUserguide', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.userguide.delete({ where: { id } });
      this._SocketGateway.sendUserguideUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeUserguide', error);
      throw error;
    }
  }

  async reorderUserguides(userguideIds: string[]) {
    try {
      for (let i = 0; i < userguideIds.length; i++) {
        await this.prisma.userguide.update({
          where: { id: userguideIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUserguideUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderUserguides', error);
      throw error;
    }
  }
}