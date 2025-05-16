import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class HoadonchitietService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedhoadonChitiet(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.hoadonChitiet.aggregate({
        _max: { updatedAt: true },
      });
      return { 
        updatedAt: lastUpdated._max.updatedAt 
          ? new Date(lastUpdated._max.updatedAt).getTime() 
          : 0 
      };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.hoadonChitiet.findFirst({
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
      this._ErrorlogService.logError('generatehoadonChitietCodeId', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.hoadonChitiet.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const { id, ...rest } = data;
      const created = await this.prisma.hoadonChitiet.create({
        data: {
          ...rest,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.hoadonChitiet.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.hoadonChitiet.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.hoadonChitiet.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.hoadonChitiet.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllhoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.hoadonChitiet.findUnique({ where: { id } });
      if (!item)
        throw new HttpException('hoadonChitiet not found', HttpStatus.NOT_FOUND);
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.hoadonChitiet.update({ where: { id }, data: rest });
        updated = await this.prisma.hoadonChitiet.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.hoadonChitiet.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async remove(id: string) { 
    try {
      const deleted = await this.prisma.hoadonChitiet.delete({ where: { id } });
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removehoadonChitiet', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }

  async reorderhoadonChitiets(hoadonChitietIds: string[]) { 
    try {
      for (let i = 0; i < hoadonChitietIds.length; i++) {
        await this.prisma.hoadonChitiet.update({
          where: { id: hoadonChitietIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('hoadonchitiet');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderhoadonChitiets', error);
      if (error instanceof HttpException) throw error;
      throw new HttpException(error.message, HttpStatus.INTERNAL_SERVER_ERROR);
    }
  }
}
