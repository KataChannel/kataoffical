import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { PerformanceLogger } from '../shared/performance-logger';

@Injectable()
export class KhachhangService {
  constructor(
    private readonly prisma: PrismaService,
    private _ImportdataService: ImportdataService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private formatDateForFilename(): string {
    const now = new Date();
    const year = now.getFullYear();
    const month = (now.getMonth() + 1).toString().padStart(2, '0');
    const day = now.getDate().toString().padStart(2, '0');
    const hours = now.getHours().toString().padStart(2, '0');
    const minutes = now.getMinutes().toString().padStart(2, '0');
    const seconds = now.getSeconds().toString().padStart(2, '0');
    return `${year}${month}${day}_${hours}${minutes}${seconds}`;
  }

  async getLastUpdated(): Promise<{ updatedAt: number }> {
    return PerformanceLogger.logAsync('KH_getLastUpdated', async () => {
      const lastUpdated = await this.prisma.khachhang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    });
  }

  async generateMakh(loaikh: string): Promise<string> {
    return PerformanceLogger.logAsync('KH_generateMakh', async () => {
      const prefix = loaikh === 'khachsi' ? 'TG-KS' : 'TG-KL';
      const latest = await this.prisma.khachhang.findFirst({
        where: { makh: { startsWith: prefix } },
        orderBy: { makh: 'desc' },
        select: { makh: true },
      });
      let nextNumber = 1;
      if (latest && latest.makh) {
        const lastNumber = parseInt(latest.makh.slice(prefix.length), 10);
        nextNumber = lastNumber + 1;
      }
      return `${prefix}${nextNumber.toString().padStart(5, '0')}`;
    }, { loaikh });
  }

  async create(data: any) {
    // Nếu mã khách hàng không được truyền, tự động tạo mới
    if (!data.makh) {
      data.makh = await this.generateMakh(data.loaikh);
    }

    // Xử lý kết nối banggia nếu có (thêm banggia thuộc khách hàng)
    const banggia = await this.prisma.banggia.findFirst({
      where: { mabanggia: data.mabanggia ? data.mabanggia : data.banggiaId },
      select: { id: true },
    });
    if (!banggia) {
      console.warn(`Bảng giá với mã ${data.mabanggia} không tồn tại, bỏ qua thiết lập bảng giá`);
    } else {
      data.banggiaId = banggia.id;
    }
    // Hợp nhất dữ liệu ban đầu và dữ liệu banggia
    // Nếu mã khách hàng đã có, kiểm tra xem khách hàng đó đã tồn tại chưa
    const existingCustomer = await this.prisma.khachhang.findUnique({
      where: { makh: data.makh },
      include: { banggia: true },
    });
    if (existingCustomer) {
      // Nếu đã tồn tại, cập nhật thông tin khách hàng bằng hàm update
      return this.prisma.khachhang.update({
        where: { id: existingCustomer.id },
        data,
        include: { banggia: true },
      });
    }
    return this.prisma.khachhang.create({data});
  }

  async import(data: any[]) {
    const notifications: string[] = [];
    for (const customer of data) {
      try {
        // Kiểm tra banggia theo mabanggia
        const banggia = await this.prisma.banggia.findFirst({
          where: { mabanggia: customer.mabanggia },
          select: { id: true },
        });
        if (!banggia) {
          console.warn(`Bảng giá với mã ${customer.mabanggia} không tồn tại, bỏ qua khách hàng này`);
          customer.banggiaId = null; // Không gán banggiaId nếu không tìm thấy bảng giá
          notifications.push(`Bỏ qua khách hàng với makh ${customer.makh} do không tìm thấy bảng giá`);
          continue;
        } else {
          customer.banggiaId = banggia.id;
        }
        console.log(`Xử lý khách hàng với makh ${customer.makh}`);

        // Tìm khách hàng theo makh
        const existingCustomer = await this.prisma.khachhang.findUnique({
          where: { makh: customer.makh },
          select: { id: true },
        });

        let processedCustomer;
        if (existingCustomer) {
          processedCustomer = await this.update(existingCustomer.id, customer);
          notifications.push(`Cập nhật khách hàng thành công: ${processedCustomer.makh}`);
        } else {
          processedCustomer = await this.create(customer);
          notifications.push(`Tạo mới khách hàng thành công: ${processedCustomer.makh}`);
        }
      } catch (error) {
        console.error(
          `Error processing customer with makh ${customer.makh}:`,
          error,
        );
        // Lưu lịch sử import lỗi với chi tiết
        await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: 'Error during customer import process',
          },
          order: 1,
          createdBy: 'system',
          title: `Import Khách Hàng ${new Date().toLocaleString('vi-VN')}`,
          type: 'khachhang',
        });
        notifications.push(`Lỗi xử lý khách hàng với makh ${customer.makh}: ${error.message}`);
      }
    }
    return { message: 'Import completed', notifications };
  }

  // async findAll() {
  //   return this.prisma.khachhang.findMany({
  //     include: { banggia: true },
  //   });
  // }
  async findAllForSelect() {    
    try {
      const khachhangs = await this.prisma.khachhang.findMany({
        select: {
          id: true,
          makh: true,
          name: true,
          banggia: {
              select: {
                id: true,
                mabanggia: true,
                title: true,
                batdau: true,
                ketthuc: true,
              },
            },
          },
          orderBy: { createdAt: 'desc' },
        });
      return { data: khachhangs };
    } catch (error) {
      console.log('Error in findAllKhachhang:', error);
      throw error;
    }
  }

  async findAll(query: any) {    
    try {
      const { page, pageSize, sortBy, sortOrder, search, priceMin, priceMax, category } = query;
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

      const [sanphams, total] = await this.prisma.$transaction([
        this.prisma.khachhang.findMany({
          where,
          include: { banggia: true },
          skip,
          take,
          orderBy,
        }),
        this.prisma.khachhang.count({ where }),
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

  async findby(param:any) {
      
    const { page = 1, pageSize = 50, isOne, ...where } = param;
    const whereClause: any = {};
    if (where.id) {
      whereClause.id = where.id;
    }
    if (where.subtitle) {
      whereClause.subtitle = { contains: where.subtitle, mode: 'insensitive' };
    }
    if (where.name) {
      whereClause.name = { contains: where.name, mode: 'insensitive' };
    }
    if (where.startDate || where.endDate) {
      whereClause.createdAt = {};
      if (where.startDate) whereClause.createdAt.gte = where.startDate;
      if (where.endDate) whereClause.createdAt.lte = where.endDate;
    }    
    if (isOne) {
      const oneResult = await this.prisma.khachhang.findFirst({
      where: whereClause,
      include: { banggia: true },
      orderBy: { createdAt: 'desc' },
      });
      return oneResult;
    }
    else {
    const skip = (page - 1) * pageSize;
    const [khachhangs, total] = await Promise.all([
      this.prisma.khachhang.findMany({
      where: whereClause,
      include: { banggia: true },
      skip,
      take: pageSize,
      orderBy: { createdAt: 'desc' },
      }),
      this.prisma.khachhang.count({ where: whereClause }),
    ]);

    return {
      data: khachhangs,
      page,
      pageSize,
      total,
      pageCount: Math.ceil(total / pageSize),
    };
    }
  }  
  
  async findOne(id: string) {
    const khachhang = await this.prisma.khachhang.findUnique({
      where: { id },
      include: {
        banggia: true,
      },
    });
    if (!khachhang) throw new NotFoundException('Khachhang not found');
    return khachhang;
  }
  
  async searchfield(searchParams: Record<string, any>) {
    const where: any = {};
    // Xây dựng điều kiện tìm kiếm linh hoạt
    for (const [key, value] of Object.entries(searchParams)) {
      if (!value) continue;

      if (key === 'id') {
        where[key] = value; // Tìm chính xác theo ID
      } else if (typeof value === 'number' || typeof value === 'boolean') {
        where[key] = value; // Tìm theo số hoặc boolean
      } else {
        where[key] = { contains: value, mode: 'insensitive' }; // Tìm gần đúng với string
      }
    }
    const khachhang = await this.prisma.khachhang.findUnique({
      where,
      include: {
        banggia: true,
      },
    });
    if (!khachhang) throw new NotFoundException('Khachhang not found');
    return khachhang;
  }

  async update(id: string, data: any) {
    const existingCustomer = await this.prisma.khachhang.findUnique({
      where: { id },
      select: { banggia: { select: { id: true } } },
    });

    if (!existingCustomer) {
      throw new NotFoundException('Khách hàng không tồn tại');
    }
    
    if (data.banggiaId) {
      const banggia = await this.prisma.banggia.findUnique({
        where: { id: data.banggiaId },
      });

      if (!banggia) {
        throw new NotFoundException(`Không tìm thấy bảng giá với ID: ${data.banggiaId}`);
      }
    }
    const { banggiaId,mabanggia, ...rest } = data;
    return this.prisma.khachhang.update({
      where: { id },
      data: {
        ...rest,
        banggia: banggiaId ? { connect: { id: banggiaId } } : { disconnect: true },
      },
      include: { banggia: true },
    });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}
