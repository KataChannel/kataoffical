import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class KhoahocService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedKhoahoc(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.khoahoc.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.khoahoc.findFirst({
        orderBy: { codeId: 'desc' }, 
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'SP';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      const newPrefix = 'SP'; 
      return `${newPrefix}${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generateKhoahocCodeId', error);
      throw error;
    }
  }

async getTotalKhoahocByUserId(userId: string){
  try {
    const result = await this.prisma.khoahoc.count({
      where: { phone: userId },
    });
    return {total: result || 0};
  } catch (error) {
    throw error;
  }
}




async syncskhoahoc(items: any[]) { 
  if (!Array.isArray(items) || items.length === 0) {
    return { success: 0, failure: 0, error: 'Invalid parameters for syncskhoahoc' };
  }
  const concurrencyLimit = 50;
  let success = 0;
  let failure = 0;

  const processBatch = async (batch: any[]) => {
    try {
      // Prepare upsert operations for all items in the batch
      const upsertOps = batch.map((item) => {
        item.codeId = item.codeId?.toString();
        item.timeIndex = Number(item.timeIndex);
        item.branchId = item.branchId.toString();
        item.state = item.state.toString();
        return this.prisma.khoahoc.upsert({
          where: { codeId: item.codeId },
          update: item,
          create: item,
        });
      });      
      // Run all upserts concurrently, handle errors
      const results = await Promise.allSettled(upsertOps);
      console.log(results);
      
      results.forEach((result) => {
        if (result.status === 'fulfilled') {
          success++;
        } else {
          failure++;
        }
      });
    } catch (error) {
      console.log('Error in syncskhoahoc:', error);
      
      failure += batch.length;
    }
  };

  for (let i = 0; i < items.length; i += concurrencyLimit) {
    const batch = items.slice(i, i + concurrencyLimit);
    await processBatch(batch);
  }
  this._SocketGateway.sendUpdate('khoahoc');
  return { success, failure };
}


async create(data: any) { 
  try {
    const created = await this.prisma.khoahoc.create({data});
    this._SocketGateway.sendUpdate('khoahoc'); 
    return created;
  } catch (error) {
    console.log('Error creating khoahoc:', error);
    this._ErrorlogService.logError('createKhoahoc', error);
    throw error;
  }
}
  async findBy(param: any) {
    try {
    const { isOne, page = 1, pageSize = 20,listphone, ...where } = param;
    if (listphone && Array.isArray(listphone)) {
      where.phone = { in: listphone };
    }

      if (isOne) {
        const result = await this.prisma.khoahoc.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * pageSize;
      const [data, total] = await Promise.all([
        this.prisma.khoahoc.findMany({
          where,
          skip,
          take: pageSize,
          orderBy: { order: 'asc' },
        }),
        this.prisma.khoahoc.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / pageSize)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByKhoahoc', error);
      throw error;
    }
  }
async findAll(query: any) {
  try {
    const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category } = query;
    const numericPage = Number(page);
    const numericPageSize = Number(pageSize);
    const skip = (numericPage - 1) * numericPageSize;
    const take = numericPageSize;
    const where: any = {};
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    if (category) {
      where.category = { equals: category, mode: 'insensitive' };
    }
    if (priceMin || priceMax) {
      where.price = {};
      if (priceMin) {
        where.price.gte = priceMin;
      }
      if (priceMax) {
        where.price.lte = priceMax;
      }
    }
    const orderBy: any = {};
    if (sortBy && sortOrder) {
      orderBy[sortBy] = sortOrder;
    } else {
      orderBy.createdAt = 'desc'; 
    }
    const [khoahocs, total] = await this.prisma.$transaction([
      this.prisma.khoahoc.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.khoahoc.count({ where }),
    ]);
    return {
      data: khoahocs,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllKhoahoc:', error);
    throw error;
  }
}
  async findOne(id: string) {
    try {
      const item = await this.prisma.khoahoc.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Khoahoc not found'); 
      return item;
    } catch (error) {
      console.log('Error finding khoahoc:', error);
      throw error;
    }
  }
async update(id: string, data: any) { 
  try {
    const updated = await this.prisma.khoahoc.update({ 
      where: { id }, 
      data: data,
    });
    this._SocketGateway.sendUpdate('khoahoc');
    return updated;
  } catch (error) {
    console.log('Error updating khoahoc:', error);
    throw error;
  }
}
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.khoahoc.delete({ where: { id } });
      this._SocketGateway.sendUpdate('khoahoc');
      return deleted;
    } catch (error) {
      console.log('Error removing khoahoc:', error);
      throw error;
    }
  }
  async reorderKhoahocs(khoahocIds: string[]) { 
    try {
      for (let i = 0; i < khoahocIds.length; i++) {
        await this.prisma.khoahoc.update({
          where: { id: khoahocIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('khoahoc'); 
      return { status: 'success' };
    } catch (error) {
      console.log('Error reordering khoahoc:', error);
      throw error;
    }
  }
}
