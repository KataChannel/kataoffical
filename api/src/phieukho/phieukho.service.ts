import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class PhieukhoService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
  ) {}
  async getLastUpdatedPhieukho(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.phieukho.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.phieukho.findFirst({
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
      throw error;
    }
  }
async create(data: any) { 
  try {
    const maxOrder = await this.prisma.phieukho.aggregate({
      _max: { order: true },
    });
    const newOrder = (maxOrder._max?.order || 0) + 1;
    const codeId = await this.generateCodeId();
    const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
    const created = await this.prisma.phieukho.create({
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
    this._SocketGateway.sendUpdate('phieukho'); 
    return created;
  } catch (error) {
    console.log('Error creating phieukho:', error);
    throw error;
  }
}
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.phieukho.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.phieukho.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.phieukho.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      throw error;
    }
  }
async findAll(query: any) {
  console.log('findAllPhieukho query:', query);
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
    const [phieukhos, total] = await this.prisma.$transaction([
      this.prisma.phieukho.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.phieukho.count({ where }),
    ]);
    return {
      data: phieukhos,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllPhieukho:', error);
    throw error;
  }
}
  async findOne(id: string) {
    try {
      const item = await this.prisma.phieukho.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Phieukho not found'); 
      return item;
    } catch (error) {
      console.log('Error finding phieukho:', error);
      throw error;
    }
  }
async update(id: string, data: any) { 
  try {
    const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
    const updated = await this.prisma.phieukho.update({ 
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
    this._SocketGateway.sendUpdate('phieukho');
    return updated;
  } catch (error) {
    console.log('Error updating phieukho:', error);
    throw error;
  }
}
  async remove(id: string) { 
    try {
      const deleted = await this.prisma.phieukho.delete({ where: { id } });
      this._SocketGateway.sendUpdate('phieukho');
      return deleted;
    } catch (error) {
      console.log('Error removing phieukho:', error);
      throw error;
    }
  }
  async reorderPhieukhos(phieukhoIds: string[]) { 
    try {
      for (let i = 0; i < phieukhoIds.length; i++) {
        await this.prisma.phieukho.update({
          where: { id: phieukhoIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('phieukho'); 
      return { status: 'success' };
    } catch (error) {
      console.log('Error reordering phieukho:', error);
      throw error;
    }
  }
}
