import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';


@Injectable()
export class SanphamService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedSanpham() {
    try {
      const lastUpdated = await this.prisma.sanpham.aggregate({
        _max: {
          updatedAt: true,
        },
      });
      return { updatedAt: lastUpdated._max.updatedAt || 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedSanpham',error);
      throw error;
    }
  }

  async generateMaSP(): Promise<string> {
    try {
      const latest = await this.prisma.sanpham.findFirst({
        orderBy: { masp: 'desc' },
      });

      let nextNumber = 1;
      if (latest) {
        const match = latest.masp.match(/I1(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }

      return `I1${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateMaSP',error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      let newOrder: number;
      const maxOrder = await this.prisma.sanpham.aggregate({
        _max: { order: true },
      });
      newOrder = (maxOrder._max?.order || 0) + 1;
      this._SocketGateway.sendSanphamUpdate();
      const masp = await this.generateMaSP();
      return this.prisma.sanpham.create({
        data: {
          ...data,
          order: newOrder,
          masp: masp,
        },
      });
    } catch (error) {
      this._ErrorlogService.logError('createSanpham',error);
      throw error;
    }
  }

  async reorderSanphams(sanphamIds: string[]) {
    try {
      for (let i = 0; i < sanphamIds.length; i++) {
        await this.prisma.sanpham.update({
          where: { id: sanphamIds[i] },
          data: { order: i + 1 },
        });
      }
    } catch (error) {
      this._ErrorlogService.logError('reorderSanphams',error);
      throw error;
    }
  }

  async findAll() {
    try {
      return this.prisma.sanpham.findMany();
    } catch (error) {
      this._ErrorlogService.logError('findAll',error);
      throw error;
    }
  }

  async findby(param: any) {
    try {
      const sanpham = await this.prisma.sanpham.findUnique({ where: param });
      if (!sanpham) throw new NotFoundException('Sanpham not found');
      return sanpham;
    } catch (error) {
      this._ErrorlogService.logError('findby',error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
      if (!sanpham) throw new NotFoundException('Sanpham not found');
      return sanpham;
    } catch (error) {
      this._ErrorlogService.logError('findOne',error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.sanpham.update({ where: { id }, data: rest });
        await this.prisma.sanpham.update({ where: { id }, data: { order } });
      }
      this._SocketGateway.sendSanphamUpdate();
      return this.prisma.sanpham.update({ where: { id }, data });
    } catch (error) {
      this._ErrorlogService.logError('updateSanpham',error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      this._SocketGateway.sendSanphamUpdate();
      return this.prisma.sanpham.delete({ where: { id } });
    } catch (error) {
      this._ErrorlogService.logError('removeSanpham',error);
      throw error;
    }
  }
}
