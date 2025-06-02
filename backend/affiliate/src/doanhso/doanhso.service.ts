import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class DoanhsoService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedDoanhso(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.doanhso.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedDoanhso', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.doanhso.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DS';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'DS'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateDoanhsoCodeId', error);
      throw error;
    }
  }
  async create(data: any) { 
    try {
      const maxOrder = await this.prisma.doanhso.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      const codeId = data.codeId || await this.generateCodeId();
      const created = await this.prisma.doanhso.create({
        data: {
          ...data,
          order: newOrder,
          codeId: codeId
        },
      });

      this._SocketGateway.sendUpdate('doanhso'); 
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createDoanhso', error);
      throw error;
    }
  }

  async syncsdoanhso(param: any) {
    if (!param || !Array.isArray(param) || param.length === 0) {
      throw new NotFoundException('Invalid parameters for syncsdoanhso');
    }

    const concurrencyLimit = 50;
    let successCount = 0;
    let failureCount = 0;

    // Create an array of tasks to process each item
    const tasks = param.map((item: any) => async () => {
      try {
        const existing = await this.prisma.doanhso.findFirst({
          where: { codeId: item.source_id },
        });
        
        const user = await this.prisma.user.findFirst({
          where: { phone: item.phone },
        });
        
        if (!user) {
          throw new NotFoundException(`User not found for phone: ${item.phone}`);
        }
        const dichvu = await this.prisma.dichvu.findFirst({
          where: { serviceCode: item.serviceCode },
        });
        if (!dichvu) {
          throw new NotFoundException(`Dichvu not found for serviceCode: ${item.serviceCode}`);
        }
        
        if (!existing) {
          console.log(`Creating new doanhso for source_id ${item.source_id}`);
          if(item.priceDiscounted>0) {
            const data = {
              codeId: item.source_id, // using source_id as codeId
              userId: user.id || null,
              dichvuId: dichvu.id || null,
              originalAmount: item.priceRoot || 0,
              discountAmount: item.discount || 0,
              actualAmount: item.priceDiscounted || 0,
            };
            console.log(data);
            await this.create(data);
          }
        }
        // else {
        //   console.log(`Updating doanhso for source_id ${item.source_id}`);
        //   if(item.priceDiscounted>0) {
        //     const data = {
        //       codeId: item.source_id,
        //       userId: user.id || null,
        //       dichvuId: dichvu.id || null,
        //       originalAmount: item.priceRoot || 0,
        //       discountAmount: item.discount || 0,
        //       actualAmount: item.priceDiscounted || 0,
        //     };
        //     console.log(data);
        //     await this.update(existing.id, data);
        //   }
        // }
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
        const result = await this.prisma.doanhso.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.doanhso.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.doanhso.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByDoanhso', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.doanhso.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
        }),
        this.prisma.doanhso.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllDoanhso', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.doanhso.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Doanhso not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneDoanhso', error);
      throw error;
    }
  }
  async update(id: string, data: any) { 
    try {
      let updated;
      if (data.order) {
        const { order, ...rest } = data;
        await this.prisma.doanhso.update({ where: { id }, data: rest });
        updated = await this.prisma.doanhso.update({ where: { id }, data: { order } });
      } else {
        updated = await this.prisma.doanhso.update({ where: { id }, data });
      }
      this._SocketGateway.sendUpdate('doanhso');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updateDoanhso', error);
      throw error;
    }
  }
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.doanhso.delete({ where: { id } });
      this._SocketGateway.sendUpdate('doanhso');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeDoanhso', error);
      throw error;
    }
  }
  async reorderDoanhsos(doanhsoIds: string[]) { 
    try {
      for (let i = 0; i < doanhsoIds.length; i++) {
        await this.prisma.doanhso.update({
          where: { id: doanhsoIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('doanhso'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderDoanhsos', error);
      throw error;
    }
  }
}
