import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { SocketGateway } from './socket.gateway'; 
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
@Injectable()
export class ImportdataService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogsService,
  ) {}
  async getLastUpdatedImportdata(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.importHistory.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedImportdata', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.importHistory.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'IH';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'IH';
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateImportdataCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.importHistory.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      console.log('Creating importdata with codeId:', codeId);
      
      const created = await this.prisma.importHistory.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendImportdataUpdate(); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createImportdata', error);
      throw error;
    }
  }
  async findBy(param: any) {
    console.log('findByImportdata', param);
    
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.importHistory.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.importHistory.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.importHistory.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByImportdata', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.importHistory.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.importHistory.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllImportdata', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.importHistory.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Importdata not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneImportdata', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.importHistory.update({ where: { id }, data: rest });
        updated = await this.prisma.importHistory.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.importHistory.update({ where: { id }, data });
      }
      this._SocketGateway.sendImportdataUpdate();
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateImportdata', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.importHistory.delete({ where: { id } });
      this._SocketGateway.sendImportdataUpdate();
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeImportdata', error);
      throw error;
    }
  }
  async reorderImportdatas(importdataIds: string[]) { 
    try {
      for (let i = 0; i < importdataIds.length; i++) {
        await this.prisma.importHistory.update({
          where: { id: importdataIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendImportdataUpdate(); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderImportdatas', error);
      throw error;
    }
  }
}
