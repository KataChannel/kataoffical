import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';

@Injectable()
export class KhachhangService {
  constructor(
    private readonly prisma: PrismaService,
    private _ImportdataService: ImportdataService,
  ) {}

    async getLastUpdated(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.khachhang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }

  async timkiemkhachhang(query: string) {
    return this.prisma.$queryRaw`
      SELECT * FROM "Khachhang" 
      WHERE search_vector @@ to_tsquery('simple', ${query})
    `;
  }

  async generateMakh(loaikh: string): Promise<string> {
    try {
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
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tạo mã khách hàng');
    }
  }

  async create(data: any) {
    // Nếu mã khách hàng không được truyền, tự động tạo mới
    if (!data.makh) {
      data.makh = await this.generateMakh(data.loaikh);
    }

    // Xử lý kết nối banggia nếu có (thêm banggia thuộc khách hàng)
    let banggiaData = data.banggiaId
      ? { banggia: { connect: { id: data.banggiaId } } }
      : { banggia: { disconnect: true } };
    // Hợp nhất dữ liệu ban đầu và dữ liệu banggia
    const newData = { ...data, ...banggiaData };
    // Nếu mã khách hàng đã có, kiểm tra xem khách hàng đó đã tồn tại chưa
    const existingCustomer = await this.prisma.khachhang.findUnique({
      where: { makh: data.makh },
      include: { banggia: true },
    });
    if (existingCustomer) {
      // Nếu đã tồn tại, cập nhật thông tin khách hàng bằng hàm update
      return this.prisma.khachhang.update({
        where: { id: existingCustomer.id },
        data: newData,
        include: { banggia: true },
      });
    }
    return this.prisma.khachhang.create({
      data: newData,
    });
  }

  async import(data: any[]) {
    for (const customer of data) {
      try {
        // Dữ liệu gửi lên là một mảng khách hàng, mỗi khách hàng có thể chứa danh sách banggia dưới dạng các đối tượng với thuộc tính mabanggia
        const { banggia, ...rest } = customer;

        const banggiaRecord = customer.mabanggia
          ? await this.prisma.banggia.findFirst({
              where: { mabanggia: customer.mabanggia },
              select: { id: true },
            })
          : null;

        const banggiaData = banggiaRecord?.id
          ? { banggia: { connect: { id: banggiaRecord.id } } }
          : { banggia: { disconnect: true } };

        const dataToUse = { ...rest, ...banggiaData };

        let processedCustomer;
        // Nếu mã khách hàng không tồn tại thì tạo mới
        if (!customer.makh) {
          processedCustomer = await this.create(dataToUse);
        } else {
          // Nếu khách hàng đã tồn tại, cập nhật thông qua hàm update
          const existingCustomer = await this.prisma.khachhang.findUnique({
            where: { makh: customer.makh },
            select: { id: true },
          });
          if (existingCustomer) {
            const { mabanggia, ...updateData } = dataToUse;
            processedCustomer = await this.prisma.khachhang.update({
              where: { id: existingCustomer.id },
              data: updateData,
            });
          } else {
            processedCustomer = await this.create(dataToUse);
          }
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
            additionalInfo: 'Error during product import process',
          },
          order: 1, // cập nhật nếu cần theo thứ tự của bạn
          createdBy: 'system', // thay bằng ID người dùng thực nếu có
          title: `Import Khách Hàng ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
          type: 'khachhang',
        });
        // Log error and continue with next customer
      }
    }
    return { message: 'Import completed' };
  }

  // async findAll() {
  //   return this.prisma.khachhang.findMany({
  //     include: { banggia: true },
  //   });
  // }
  async findAll(query: any) {
    console.log('findAllKhachHang query:', query);
    
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
      console.log('findby param:', param);
      
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
    return this.prisma.khachhang.update({
      where: { id },
      data: {
        banggia: data.banggiaId ? { connect: { id: data.banggiaId } } : { disconnect: true },
      },
      include: { banggia: true },
    });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}
