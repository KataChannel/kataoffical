import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class fileManagerService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedfileManager(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.fileManager.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedfileManager', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.fileManager.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'FILE';
        const match = latest.codeId.match(new RegExp(prefix + '(\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'FILE'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatefileManagerCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.fileManager.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.fileManager.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('fileManager');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createfileManager', error);
      throw error;
    }
  }
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.fileManager.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.fileManager.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.fileManager.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByfileManager', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.fileManager.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.fileManager.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllfileManager', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.fileManager.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('fileManager not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnefileManager', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.fileManager.update({ where: { id }, data: rest });
        updated = await this.prisma.fileManager.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.fileManager.update({ where: { id }, data });
      }
     this._SocketGateway.sendUpdate('fileManager');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatefileManager', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.fileManager.delete({ where: { id } });
      this._SocketGateway.sendUpdate('fileManager');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removefileManager', error);
      throw error;
    }
  }
  async reorderfileManagers(fileManagerIds: string[]) { 
    try {
      for (let i = 0; i < fileManagerIds.length; i++) {
        await this.prisma.fileManager.update({
          where: { id: fileManagerIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('fileManager');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderfileManagers', error);
      throw error;
    }
  }
}
