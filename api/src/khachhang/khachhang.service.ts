import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class KhachhangService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedKhachhang(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.khachhang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedKhachhang', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.khachhang.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'KH';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'KH'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateKhachhangCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.khachhang.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.khachhang.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('khachhang'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createKhachhang', error);
      throw error;
    }
  }
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.khachhang.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.khachhang.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.khachhang.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByKhachhang', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.khachhang.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.khachhang.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllKhachhang', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.khachhang.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Khachhang not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneKhachhang', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.khachhang.update({ where: { id }, data: rest });
        updated = await this.prisma.khachhang.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.khachhang.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('khachhang');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateKhachhang', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.khachhang.delete({ where: { id } });
      this._SocketGateway.sendUpdate('khachhang');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeKhachhang', error);
      throw error;
    }
  }
  async reorderKhachhangs(khachhangIds: string[]) { 
    try {
      for (let i = 0; i < khachhangIds.length; i++) {
        await this.prisma.khachhang.update({
          where: { id: khachhangIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('khachhang'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderKhachhangs', error);
      throw error;
    }
  }
}
