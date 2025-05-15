import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { MinioService } from 'src/minio/minio.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class ResourceService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
    private _MinioService: MinioService,
  ) {}

  async getLastUpdatedResource(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.resource.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedResource', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.resource.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const match = latest.codeId.match(/RS(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `RS${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateCodeId', error);
      throw error;
    }
  }

  async create(data: any) {
    try {
      const maxOrder = await this.prisma.resource.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = await this.generateCodeId();
      const created = await this.prisma.resource.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('resource');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createResource', error);
      throw error;
    }
  }

  async findBy(param: any) {
    try {
      const { isOne, ...rest } = param;
      if (isOne) {
        const result = await this.prisma.resource.findFirst({
          where: rest,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const { page = 1, limit = 20, ...where } = rest;
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.resource.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.resource.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByResource', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.resource.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.resource.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllResource', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.resource.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Resource not found');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneResource', error);
      throw error;
    }
  }

  async update(id: string, data: any) {
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.resource.update({ where: { id }, data: rest });
        updated = await this.prisma.resource.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.resource.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('resource');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateResource', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const resource = await this.prisma.resource.findUnique({ where: { id } });
      if (!resource) throw new NotFoundException('Resource not found');

      // Delete file from Minio and check if deletion was successful
      const fileDeleted = await this._MinioService.deleteFile(resource.id);
      if (!fileDeleted) {
        throw new Error('File deletion from Minio failed');
      }
      this._SocketGateway.sendUpdate('resource');
      return fileDeleted;
    } catch (error) {
      this._ErrorlogService.logError('removeResource', error);
      throw error;
    }
  }

  async reorderResources(resourceIds: string[]) {
    try {
      for (let i = 0; i < resourceIds.length; i++) {
        await this.prisma.resource.update({
          where: { id: resourceIds[i] },
          data: { order: i + 1 }
        });
      }
      //this._SocketGateway.sendResourceUpdate();
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderResources', error);
      throw error;
    }
  }
}