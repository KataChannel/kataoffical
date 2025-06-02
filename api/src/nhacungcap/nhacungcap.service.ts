import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class NhacungcapService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedNhacungcap(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.nhacungcap.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedNhacungcap', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.nhacungcap.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'NCC';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'NCC'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateNhacungcapCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.nhacungcap.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.nhacungcap.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('nhacungcap'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createNhacungcap', error);
      throw error;
    }
  }
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.nhacungcap.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.nhacungcap.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.nhacungcap.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByNhacungcap', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {      
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.nhacungcap.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.nhacungcap.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllNhacungcap', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.nhacungcap.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Nhacungcap not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneNhacungcap', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.nhacungcap.update({ where: { id }, data: rest });
        updated = await this.prisma.nhacungcap.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.nhacungcap.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('nhacungcap');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateNhacungcap', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.nhacungcap.delete({ where: { id } });
      this._SocketGateway.sendUpdate('nhacungcap');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeNhacungcap', error);
      throw error;
    }
  }
  async reorderNhacungcaps(nhacungcapIds: string[]) { 
    try {
      for (let i = 0; i < nhacungcapIds.length; i++) {
        await this.prisma.nhacungcap.update({
          where: { id: nhacungcapIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('nhacungcap'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderNhacungcaps', error);
      throw error;
    }
  }
}
