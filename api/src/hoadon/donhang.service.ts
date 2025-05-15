import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class HoadonService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedHoadon(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.hoadon.aggregate({
        _max: { updatedAt: true },
      });
      return {
        updatedAt: lastUpdated._max.updatedAt
          ? new Date(lastUpdated._max.updatedAt).getTime()
          : 0,
      };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedHoadon', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const created = await this.prisma.hoadon.create({
        data: {
          ...data,
        },
      });
      this._SocketGateway.sendUpdate('donhang');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createHoadon', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.hoadon.findFirst({
          where,
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadon.findMany({
          where,
          skip,
          take: limit,
        }),
        this.prisma.hoadon.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findByHoadon', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadon.findMany({
          skip,
          take: limit,
        }),
        this.prisma.hoadon.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllHoadon', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.hoadon.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Hoadon not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneHoadon', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      const updated = await this.prisma.hoadon.update({ where: { id }, data });
      this._SocketGateway.sendUpdate('donhang');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateHoadon', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const deleted = await this.prisma.hoadon.delete({ where: { id } });
     this._SocketGateway.sendUpdate('donhang');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeHoadon', error);
      throw error;
    }
  }
}
