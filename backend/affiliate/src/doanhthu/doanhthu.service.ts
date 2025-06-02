import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class DoanhthuService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedDoanhthu(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.doanhthu.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedDoanhthu', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.doanhthu.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DT';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DT'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateDoanhthuCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.doanhthu.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = data.codeId || await this.generateCodeId();
      const created = await this.prisma.doanhthu.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });
      this._SocketGateway.sendUpdate('doanhthu'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createDoanhthu', error);
      throw error;
    }
  }

    async syncsdoanhthu(param: any) {
    if (!param || !Array.isArray(param) || param.length === 0) {
      throw new NotFoundException('Invalid parameters for syncsdoanhthu');
    }
    // console.log(param);
    
    const concurrencyLimit = 50;
    let successCount = 0;
    let failureCount = 0;

    // Create an array of tasks to process each item
    const tasks = param.map((item: any) => async () => {
      try {
        const existing = await this.prisma.doanhthu.findFirst({
          where: { codeId: item.source_id },
        });
        
        const dichvu = await this.prisma.dichvu.findFirst({
          where: { OR: [
            { TabCode: item.TabCode },
            { TabCardCode: item.TabCardCode },
            { TabMedicineCode: item.TabMedicineCode }
          ] },
        });
        if (!dichvu) {
          throw new NotFoundException(`Dichvu not found for serviceCode: ${item.serviceCode}`);
        }
        
        if (!existing) {
         const data = {
            codeId: item.source_id, // using source_id as codeId
            dichvuId: dichvu.id || null,
            codeDT: item.code || null,
            amount: item.amount || 0,
            commission: item.amount * 0.2 || 0,
          };
         await this.create(data);
        }
        // else {
        //   const data = {
        //     codeId: item.source_id, // using source_id as codeId
        //     dichvuId: dichvu.id || null,
        //     codeDT: item.code || null,
        //     amount: item.amount || 0,
        //     commission: item.amount * 0.2 || 0,
        //   };
        //   await this.update(existing.id, data);
        // }
        // successCount++;
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
        const result = await this.prisma.doanhthu.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.doanhthu.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.doanhthu.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByDoanhthu', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.doanhthu.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.doanhthu.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllDoanhthu', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.doanhthu.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Doanhthu not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneDoanhthu', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.doanhthu.update({ where: { id }, data: rest });
        updated = await this.prisma.doanhthu.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.doanhthu.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('doanhthu');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateDoanhthu', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.doanhthu.delete({ where: { id } });
      this._SocketGateway.sendUpdate('doanhthu');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeDoanhthu', error);
      throw error;
    }
  }
  async reorderDoanhthus(doanhthuIds: string[]) { 
    try {
      for (let i = 0; i < doanhthuIds.length; i++) {
        await this.prisma.doanhthu.update({
          where: { id: doanhthuIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('doanhthu'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderDoanhthus', error);
      throw error;
    }
  }
}
