import { Injectable, NotFoundException } from '@nestjs/common';
import moment from 'moment';
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
  
  async import(data: any[]) {
    const importResults: { codeId: any; status: string; action?: string; error?: string }[] = [];
    // Dữ liệu gửi lên là list sản phẩm
    for (const sanpham of data) {
      try {
        let action = '';
        // Nếu không có codeId thì gọi create để tự sinh codeId
        if (!sanpham.codeId) {
          await this.create(sanpham);
          action = 'created';
        } else {
          // Tìm sản phẩm tồn tại dựa trên codeId
          const existingSanpham = await this.prisma.sanpham.findUnique({
            where: { codeId: sanpham.codeId },
            select: { id: true },
          });
          if (existingSanpham) {
            // Nếu sản phẩm đã tồn tại thì cập nhật
            await this.prisma.sanpham.update({
              where: { id: existingSanpham.id },
              data: { ...sanpham },
            });
            action = 'updated';
          } else {
            // Nếu chưa tồn tại thì tạo mới
            await this.create(sanpham);
            action = 'created';
          }
        }
        importResults.push({ codeId: sanpham.codeId || 'generated', status: 'success', action });
      } catch (error) {
        // Lưu lại lịch sử lỗi import cho sản phẩm đang xử lý
        const importData =  {
            caseDetail: {
              errorMessage: error.message,
              errorStack: error.stack,
              additionalInfo: 'Error during product import process',
            },
            order: 1, // cập nhật nếu cần theo thứ tự của bạn
            createdBy: 'system', // thay bằng ID người dùng thực nếu có
            title: `Import Sản Phẩm ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
            type: 'sanpham',
          };
        importResults.push({ codeId: sanpham.codeId || 'unknown', status: 'failed', error: error.message });
      }
    }
    // Lưu lại lịch sử tổng hợp quá trình import
    // const importData = {
    //   caseDetail: {
    //     additionalInfo: JSON.stringify(importResults),
    //   },
    //   order: 0,
    //   createdBy: 'system',
    //   title: `Import ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
    //   type: 'sanpham',
    // };
    return { message: 'Import completed', results: importResults };
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
      const whereFilter = Object.entries(where).reduce((acc, [field, value]) => {
        if (value !== undefined && value !== null) {
          acc[field] = typeof value === 'string'
            ? { contains: value, mode: 'insensitive' }
            : value;
        }
        return acc;
      }, {});
      if (isOne) {
        const result = await this.prisma.sanpham.findFirst({
          where: whereFilter,
          orderBy: { order: 'asc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.sanpham.findMany({
          where: whereFilter,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
        }),
        this.prisma.sanpham.count({ where: whereFilter }),
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

async findAll(query: any) {
  try {
    const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category,isOne } = query;
    const numericPage = Number(page || 1); // Default to page 1 if not provided
    const numericPageSize = Number(pageSize || 50);
    const skip = (numericPage - 1) * numericPageSize;
    const take = numericPageSize;
    const where: any = {};
    // Xử lý tìm kiếm chung (OR condition)
    if (search) {
      where.OR = [
        { title: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } }
      ];
    }
    // Xử lý lọc theo trường cụ thể
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
      orderBy.createdAt = 'desc'; // Mặc định nếu không có sortBy/sortOrder
    }
    if (isOne) {
        const result = await this.prisma.sanpham.findFirst({
          where,
          orderBy: { order: 'asc' },
        });
        return result;
     }
    const [sanphams, total] = await this.prisma.$transaction([
      this.prisma.sanpham.findMany({
        where,
        skip,
        take,
        orderBy,
      }),
      this.prisma.sanpham.count({ where }),
    ]);
    
    return {
      data: sanphams,
      total: Number(total),
      page: numericPage,
      pageSize: numericPageSize,
      totalPages: Math.ceil(Number(total) / numericPageSize),
    };
  } catch (error) {
    console.log('Error in findAllSanpham:', error);
    throw error;
  }
}

  async findOne(id: string) {
    try {
      const item = await this.prisma.sanpham.findUnique({ where: { id } });
      if (!item) throw new NotFoundException('Sanpham not found'); 
      return item;
    } catch (error) {
      console.log('Error finding sanpham:', error);
      throw error;
    }
  }


async update(id: string, data: any) { 
  try {
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
    console.log('Error updating sanpham:', error);
    throw error;
  }
}

  async remove(id: string) { 
    try {
      const deleted = await this.prisma.sanpham.delete({ where: { id } });
      this._SocketGateway.sendUpdate('sanpham');
      return deleted;
    } catch (error) {
      console.log('Error removing sanpham:', error);
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
      console.log('Error reordering sanpham:', error);
      throw error;
    }
  }
}
