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
  private handleError(method: string, error: any): never {
    this._ErrorlogService.logError(method, error);
    throw error;
  }
  async getLastUpdatedUserguide(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.userguidStep.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this.handleError('getLastUpdatedUserguide', error);
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.userguidStep.findFirst({
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
      this.handleError('generateCodeId', error);
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.userguidStep.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const masp = await this.generateCodeId();
      const created = await this.prisma.userguidStep.create({
        data: {
          ...data,
          order: newOrder,
          masp: masp,
        },
      });
       this._SocketGateway.sendUpdate('userguides');
      return created;
    } catch (error) {
      this.handleError('createUserguide', error);
    }
  }
  async findBy(param: any) {
    try {
      const { page = 1, limit = 20, ...where } = param;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguidStep.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.userguidStep.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this.handleError('findByUserguide', error);
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.userguidStep.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.userguidStep.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this.handleError('findAllUserguide', error);
    }
  }

  async findOne(id: string) {
    try {
      const userguide = await this.prisma.userguidStep.findUnique({ where: { id } });
      if (!userguide) throw new NotFoundException('Userguide not found');
      return userguide;
    } catch (error) {
      this.handleError('findOneUserguide', error);
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.userguidStep.update({ where: { id }, data: rest });
        updated = await this.prisma.userguidStep.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.userguidStep.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('userguides');
      return updated;
    } catch (error) {
      this.handleError('updateUserguide', error);
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.userguidStep.delete({ where: { id } });
      this._SocketGateway.sendUpdate('userguides');
      return deleted;
    } catch (error) {
      this.handleError('removeUserguide', error);
    }
  }

  async reorderUserguides(userguideIds: string[]) {
    try {
      for (let i = 0; i < userguideIds.length; i++) {
        await this.prisma.userguidStep.update({
          where: { id: userguideIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('userguides');
      return { status: 'success' };
    } catch (error) {
      this.handleError('reorderUserguides', error);
    }
  }
}
