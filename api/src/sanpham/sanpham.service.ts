import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service'; 
import { ErrorlogService } from 'src/errorlog/errorlog.service'; 
import { SocketGateway } from 'src/socket.gateway'; 
@Injectable()
export class SanphamService { 
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway, 
    private _ErrorlogService: ErrorlogService,
  ) {}
  async getLastUpdatedSanpham(): Promise<{ updatedAt: number }> { 
    try {
      const lastUpdated = await this.prisma.sanpham.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedSanpham', error);
      throw error;
    }
  }
  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.sanpham.findFirst({
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
      this._ErrorlogService.logError('generateSanphamCodeId', error);
      throw error;
    }
  }
  
async create(data: any) { 
  try {
    const maxOrder = await this.prisma.sanpham.aggregate({
      _max: { order: true },
    });
    const newOrder = (maxOrder._max?.order || 0) + 1;
    const codeId = await this.generateCodeId();
    
    // Extract the expected fields from the payload
    const { title, danhmucId, bienthe, donvitinh, price, status, ...restData } = data;
    
    const created = await this.prisma.sanpham.create({
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, // Map 'price' to 'giagoc' as per the schema
        status: status || 'draft',
        ...restData,
        order: newOrder,
        codeId: codeId,
        // Connect the danhmuc relation using danhmucId
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
      },
    });
    
    this._SocketGateway.sendUpdate('sanpham'); 
    return created;
  } catch (error) {
    console.log('Error creating sanpham:', error);
    this._ErrorlogService.logError('createSanpham', error);
    throw error;
  }
}


  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.sanpham.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.sanpham.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.sanpham.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findBySanpham', error);
      throw error;
    }
  }
  async findAll(page: number = 1, limit: number = 20) { 
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.sanpham.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' }, 
          include: { danhmuc: true }, // Include related danhmuc data
        }),
        this.prisma.sanpham.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit)
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllSanpham', error);
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const item = await this.prisma.sanpham.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Sanpham not found'); 
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOneSanpham', error);
      throw error;
    }
  }


async update(id: string, data: any) { 
  try {
    // Extract the expected fields from the payload
    const { title, danhmucId, bienthe, donvitinh, price, status, order, ...restData } = data;
    
    const updated = await this.prisma.sanpham.update({ 
      where: { id }, 
      data: {
        title,
        bienthe,
        donvitinh,
        giagoc: price || 0, // Map 'price' to 'giagoc' as per the schema
        status: status || 'draft',
        order: order || undefined, // Include order if provided
        ...restData,
        // Connect the danhmuc relation using danhmucId if provided
        ...(danhmucId && { danhmuc: { connect: { id: danhmucId } } }),
        // If danhmucId is explicitly null, disconnect the relation
        ...(data.danhmucId === null && { danhmuc: { disconnect: true } }),
      },
    });
    this._SocketGateway.sendUpdate('sanpham');
    return updated;
  } catch (error) {
    this._ErrorlogService.logError('updateSanpham', error);
    throw error;
  }
}

  async remove(id: string) { 
    try {
      const deleted = await this.prisma.sanpham.delete({ where: { id } });
      this._SocketGateway.sendUpdate('sanpham');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removeSanpham', error);
      throw error;
    }
  }
  async reorderSanphams(sanphamIds: string[]) { 
    try {
      for (let i = 0; i < sanphamIds.length; i++) {
        await this.prisma.sanpham.update({
          where: { id: sanphamIds[i] },
          data: { order: i + 1 }
        });
      }
      this._SocketGateway.sendUpdate('sanpham'); 
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderSanphams', error);
      throw error;
    }
  }
}
