import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class NhacungcapService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedNhacungcap(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.nhacungcap.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.nhacungcap.findFirst({
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
      this._ErrorlogService.logError('generateNhacungcapCodeId', error);
      throw error;
    }
  }
async create(data: any) { 
  try {
    const maxOrder = await this.prisma.nhacungcap.aggregate({
      _max: { order: true },
    });
    const newOrder = (maxOrder._max?.order || 0) + 1;
    const codeId = await this.generateCodeId();
    const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
    const created = await this.prisma.nhacungcap.create({
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, 
        status: status || 'draft',
        ...restData,
        order: newOrder,
        codeId: codeId,
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
      },
    });
    this._SocketGateway.sendUpdate('nhacungcap'); 
    return created;
  } catch (error) {
    console.log('Error creating nhacungcap:', error);
    this._ErrorlogService.logError('createNhacungcap', error);
    throw error;
  }
}
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.nhacungcap.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.nhacungcap.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.nhacungcap.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findByNhacungcap', error);
      throw error;
    }
  }
async findAll(query: any) {
  console.log('findAllNhacungcap query:', query);
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
    const [nhacungcaps, total] = await this.prisma.$transaction([
      this.prisma.nhacungcap.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.nhacungcap.count({ where }),
    ]);
    return {
      data: nhacungcaps,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllNhacungcap:', error);
    throw error;
  }
}
  async findOne(id: string) {
    try {
      const item = await this.prisma.nhacungcap.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Nhacungcap not found'); 
      return item;
    } catch (error) {
      console.log('Error finding nhacungcap:', error);
      throw error;
    }
  }
async update(id: string, data: any) { 
  try {
    const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
    const updated = await this.prisma.nhacungcap.update({ 
      where: { id }, 
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, 
        status: status || 'draft',
        order: order || undefined, 
        ...restData,
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
        ...(data.danhmucId === null && { danhmuc: { disconnect: true } }),
      },
    });
    this._SocketGateway.sendUpdate('nhacungcap');
    return updated;
  } catch (error) {
    console.log('Error updating nhacungcap:', error);
    throw error;
  }
}
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.nhacungcap.delete({ where: { id } });
      this._SocketGateway.sendUpdate('nhacungcap');
      return deleted;
    } catch (error) {
      console.log('Error removing nhacungcap:', error);
      throw error;
    }
  }
  async reorderNhacungcaps(nhacungcapIds: string[]) { 
    try {
      for (let i = 0; i < nhacungcapIds.length; i++) {
        await this.prisma.nhacungcap.update({
          where: { id: nhacungcapIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('nhacungcap'); 
      return { status: 'success' };
    } catch (error) {
      console.log('Error reordering nhacungcap:', error);
      throw error;
    }
  }
}
