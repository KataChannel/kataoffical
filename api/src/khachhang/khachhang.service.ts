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
    let banggiaData = {};
    if (
      data.banggia &&
      Array.isArray(data.banggia) &&
      data.banggia.length > 0
    ) {
      banggiaData = {
        banggia: { connect: data.banggia.map((id: string) => ({ id })) },
      };
    }

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
        let banggiaData = {};
        if (banggia !== undefined) {
          if (banggia.length > 0) {
            // Chuyển danh sách banggia từ mabanggia sang id thông qua lookup
            const banggiaRecords = await Promise.all(
              banggia.map(async (bg: any) => {
                const bgRecord = await this.prisma.banggia.findFirst({
                  where: { mabanggia: bg },
                  select: { id: true },
                });
                if (!bgRecord) {
                  throw new NotFoundException(
                    `Banggia với mabanggia ${bg} không tồn tại`,
                  );
                }
                return { id: bgRecord.id };
              }),
            );
            banggiaData = { banggia: { connect: banggiaRecords } };
          } else {
            // Nếu mảng rỗng thì đảm bảo các kết nối hiện có bị hủy
            banggiaData = { banggia: { set: [] } };
          }
        }

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
            processedCustomer = await this.prisma.khachhang.update({
              where: { id: existingCustomer.id },
              data: dataToUse,
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

  async findAll() {
    return this.prisma.khachhang.findMany({
      include: { banggia: true },
    });
  }
    async findby(param:any) {
    const { page = 1, pageSize = 50, isOne, ...where } = param;
    const whereClause: any = {};
    if (where.subtitle) {
      whereClause.subtitle = { contains: where.subtitle, mode: 'insensitive' };
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
    // Lấy thông tin khách hàng cùng các bảng giá liên kết
    const existingCustomer = await this.prisma.khachhang.findUnique({
      where: { id },
      select: { banggia: { select: { id: true } } }, // Chỉ lấy ID của bảng giá
    });

    if (!existingCustomer) {
      throw new Error('Khách hàng không tồn tại');
    }

    // Ngắt kết nối tất cả bảng giá cũ
    const disconnectBanggia = existingCustomer.banggia.map(({ id }) => ({
      id,
    }));

    // Lấy danh sách bảng giá mới từ payload
    const newBanggiaIds =
      data.banggia?.map(({ id }: { id: string }) => ({ id })) || [];

    // Cập nhật dữ liệu khách hàng
    return this.prisma.khachhang.update({
      where: { id },
      data: {
        ...data,
        banggia: {
          disconnect: disconnectBanggia, // Ngắt toàn bộ bảng giá cũ
          connect: newBanggiaIds, // Kết nối bảng giá mới từ payload
        },
      },
      include: { banggia: true },
    });
  }

  async remove(id: string) {
    return this.prisma.khachhang.delete({ where: { id } });
  }
}
