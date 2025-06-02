import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class PhieukhoService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedPhieukho(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.phieukho.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedPhieukho', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.phieukho.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DONHANG';
        const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DONHANG'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatePhieukhoCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.phieukho.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.phieukho.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('phieukho'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createPhieukho', error);
      throw error;
    }
  }
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.phieukho.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.phieukho.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.phieukho.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByPhieukho', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.phieukho.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.phieukho.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllPhieukho', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.phieukho.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Phieukho not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnePhieukho', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.phieukho.update({ where: { id }, data: rest });
        updated = await this.prisma.phieukho.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.phieukho.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('phieukho');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatePhieukho', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.phieukho.delete({ where: { id } });
      this._SocketGateway.sendUpdate('phieukho');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removePhieukho', error);
      throw error;
    }
  }
  async reorderPhieukhos(phieukhoIds: string[]) { 
    try {
      for (let i = 0; i < phieukhoIds.length; i++) {
        await this.prisma.phieukho.update({
          where: { id: phieukhoIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('phieukho'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderPhieukhos', error);
      throw error;
    }
  }
}
