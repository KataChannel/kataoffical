import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class DichvuService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedDichvu(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.dichvu.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedDichvu', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.dichvu.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DV';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DV'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateDichvuCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.dichvu.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = data.codeId || await this.generateCodeId();
      const created = await this.prisma.dichvu.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('dichvu'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createDichvu', error);
      throw error;
    }
  }

  async syncsdichvu(param: any) {
    if (!param || !Array.isArray(param) || param.length === 0) {
      throw new NotFoundException('Invalid parameters for syncsdichvu');
    }

    const concurrencyLimit = 50;
    let successCount = 0;
    let failureCount = 0;

    // Create an array of tasks to process each item
    const tasks = param.map((item: any) => async () => {
      try {
        const existing = await this.prisma.dichvu.findFirst({
          where: { codeId: item.source_id },
        });
        if (!existing) {
          const data = {
            codeId: item.source_id, // using source_id as codeId
            serviceCode: item.serviceCode,
            serviceName: item.serviceName,
            description: item.description,
            price: item.priceRoot,
          };
          await this.create(data);
        }
      } catch (error) {
        throw error;
      }
    });

    // Process tasks in chunks with limited concurrency
    for (let i = 0; i < tasks.length; i += concurrencyLimit) {
      const chunk = tasks.slice(i, i + concurrencyLimit);
      const results = await Promise.allSettled(chunk.map((task) => task()));
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          successCount++;
        } else {
          failureCount++;
        }
      });
    }

    return { success: successCount, failure: failureCount };
  }

  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.dichvu.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.dichvu.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.dichvu.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByDichvu', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.dichvu.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.dichvu.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllDichvu', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.dichvu.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Dichvu not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneDichvu', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.dichvu.update({ where: { id }, data: rest });
        updated = await this.prisma.dichvu.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.dichvu.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('dichvu');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateDichvu', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.dichvu.delete({ where: { id } });
      this._SocketGateway.sendUpdate('dichvu');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeDichvu', error);
      throw error;
    }
  }
  async reorderDichvus(dichvuIds: string[]) { 
    try {
      for (let i = 0; i < dichvuIds.length; i++) {
        await this.prisma.dichvu.update({
          where: { id: dichvuIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('dichvu');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderDichvus', error);
      throw error;
    }
  }
}
