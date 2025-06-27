import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class DanhmucService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
  ) {}
  async getLastUpdatedDanhmuc(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.danhmuc.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.danhmuc.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DM';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DM';
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.danhmuc.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.danhmuc.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('danhmuc'); 
      return created;
    } catch (error) {
      throw error;
    }
  }
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.danhmuc.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.danhmuc.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.danhmuc.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.danhmuc.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.danhmuc.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.danhmuc.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Danhmuc not found'); 
      return item;
    } catch (error) {
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.danhmuc.update({ where: { id }, data: rest });
        updated = await this.prisma.danhmuc.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.danhmuc.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('danhmuc');
      return updated;
    } catch (error) {
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.danhmuc.delete({ where: { id } });
      this._SocketGateway.sendUpdate('danhmuc');
      return deleted;
    } catch (error) {
      throw error;
    }
  }
  async reorderDanhmucs(danhmucIds: string[]) { 
    try {
      for (let i = 0; i < danhmucIds.length; i++) {
        await this.prisma.danhmuc.update({
          where: { id: danhmucIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('danhmuc'); 
      return { status: 'success' };
    } catch (error) {
      throw error;
    }
  }
}
