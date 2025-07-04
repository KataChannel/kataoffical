import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class LichhenService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedLichhen(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.lichhen.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.lichhen.findFirst({
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
      this._ErrorlogService.logError('generateLichhenCodeId', error);
      throw error;
    }
  }
async create(data: any) { 
  try {
    const created = await this.prisma.lichhen.create({data});
    this._SocketGateway.sendUpdate('lichhen'); 
    return created;
  } catch (error) {
    console.log('Error creating lichhen:', error);
    this._ErrorlogService.logError('createLichhen', error);
    throw error;
  }
}

async findBy(param: any) {
  try {
    const { isOne, page = 1, pageSize = 20, listphone, ...where } = param;

    // Build where condition for listphone if provided
    if (listphone && Array.isArray(listphone)) {
      where.phone = { in: listphone };
    }
    if (isOne) {
      const result = await this.prisma.lichhen.findFirst({
        where,
        orderBy: { order: 'asc' },
      });
      return result;
    }

    const skip = (page - 1) * pageSize;
    const [data, total] = await Promise.all([
      this.prisma.lichhen.findMany({
        where,
        skip,
        take: pageSize,
        orderBy: { order: 'asc' },
      }),
      this.prisma.lichhen.count({ where }),
    ]);
    return {
      data,
      total,
      page,
      pageCount: Math.ceil(total / pageSize)
    };
  } catch (error) {
    throw error;
  }
}



async findAll(query: any) {
  try {
    const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category,listphone } = query;
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
    const [lichhens, total] = await this.prisma.$transaction([
      this.prisma.lichhen.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.lichhen.count({ where }),
    ]);
    return {
      data: lichhens,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllLichhen:', error);
    throw error;
  }
}
  async findOne(id: string) {
    try {
      const item = await this.prisma.lichhen.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Lichhen not found'); 
      return item;
    } catch (error) {
      console.log('Error finding lichhen:', error);
      throw error;
    }
  }
async update(id: string, data: any) { 
  try {
    const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
    const updated = await this.prisma.lichhen.update({ 
      where: { id }, 
      data
    });
    this._SocketGateway.sendUpdate('lichhen');
    return updated;
  } catch (error) {
    console.log('Error updating lichhen:', error);
    throw error;
  }
}
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.lichhen.delete({ where: { id } });
      this._SocketGateway.sendUpdate('lichhen');
      return deleted;
    } catch (error) {
      console.log('Error removing lichhen:', error);
      throw error;
    }
  }
  async reorderLichhens(lichhenIds: string[]) { 
    try {
      for (let i = 0; i < lichhenIds.length; i++) {
        await this.prisma.lichhen.update({
          where: { id: lichhenIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('lichhen'); 
      return { status: 'success' };
    } catch (error) {
      console.log('Error reordering lichhen:', error);
      throw error;
    }
  }

async syncslichhen(items: any[]): Promise<{ success: number; failure: number; error?: string }> {
  if (!Array.isArray(items) || items.length === 0) {
    return { success: 0, failure: 0, error: 'Invalid parameters for syncslichhen' };
  }
  const concurrencyLimit = 50;
  let success = 0;
  let failure = 0;
  const processBatch = async (batch: any[]) => {
    // Prepare upsert operations for all items in the batch
    const upsertOps = batch.map((item) => {
      const codeId = item.id?.toString();
      const data = { ...item, codeId, isCancel: Boolean(item.isCancel) };
      delete data.id;
      return this.prisma.lichhen.upsert({
        where: { codeId },
        update: data,
        create: data,
      });
    });

    // Run all upserts concurrently, handle errors
    const results = await Promise.allSettled(upsertOps);
    results.forEach((result) => {
      if (result.status === 'fulfilled') {
        success++;
      } else {
        failure++;
        this._ErrorlogService.logError('syncslichhen', result.reason);
      }
    });
  };

  for (let i = 0; i < items.length; i += concurrencyLimit) {
    const batch = items.slice(i, i + concurrencyLimit);
    await processBatch(batch);
  }
  this._SocketGateway.sendUpdate('lichhen');
  return { success, failure };
}

}
