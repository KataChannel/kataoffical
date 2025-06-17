import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';

@Injectable()
export class NhacungcapService {
  constructor(
    private readonly prisma: PrismaService,
    private _ImportdataService: ImportdataService,
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
  async generateMancc(): Promise<string> {
    try {
      let isUnique = false;
      let mancc = '';
      let attempts = 0;
      const maxAttempts = 100;

      while (!isUnique && attempts < maxAttempts) {
        // Tìm mancc lớn nhất hiện tại
        const latest = await this.prisma.nhacungcap.findFirst({
          orderBy: { mancc: 'desc' },
        });

        let nextNumber = 1;
        if (latest) {
          const match = latest.mancc.match(/TG-NCC(\d+)/);
          if (match) {
            nextNumber = parseInt(match[1]) + 1 + attempts;
          }
        }

        mancc = `TG-NCC${nextNumber.toString().padStart(5, '0')}`;

        // Kiểm tra xem mancc đã tồn tại chưa
        const existing = await this.prisma.nhacungcap.findUnique({
          where: { mancc },
        });

        if (!existing) {
          isUnique = true;
        } else {
          attempts++;
        }
      }

      if (!isUnique) {
        throw new InternalServerErrorException('Không thể tạo mã nhà cung cấp duy nhất');
      }

      return mancc;
    } catch (error) {
      console.log('Error generating mancc:', error);
      throw new InternalServerErrorException('Lỗi khi tạo mã nhà cung cấp');
    }
  }

  async create(data: any) {
    try {
      if (data.mancc && data.mancc.trim() !== '') {
        const existing = await this.prisma.nhacungcap.findUnique({
          where: { mancc: data.mancc },
        });
        if (existing) {
          console.log(`Mã nhà cung cấp ${data.mancc} đã tồn tại`);
          
          throw new BadRequestException('Mã nhà cung cấp đã tồn tại');
        }
      }
      const mancc =
        data.mancc && data.mancc.trim() !== ''
          ? data.mancc
          : await this.generateMancc();
  console.log(`Generated mancc: ${mancc}`);
  
      const { Sanpham, ...rest } = data;

      const result = await this.prisma.nhacungcap.create({
        data: {
          mancc,
          ...rest,
          Sanpham: {
            connect: Sanpham?.map((sp: any) => ({ id: sp.id })) || [],
          },
        },
      });
      this.getLastUpdatedNhacungcap();
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) throw error; 
      console.log('Error creating nhacungcap:', error);
      
      throw new InternalServerErrorException('Lỗi khi tạo nhà cung cấp');
    }
  }

  async import(data: any[]): Promise<{ message: string }> {
    try {
      // Dữ liệu gửi lên là một mảng nhà cung cấp
      for (const supplier of data) {
        // Nếu không có mancc, gọi create để tự sinh mancc
        if (!supplier.mancc) {
          await this.create(supplier);
        } else {
          // Tìm nhà cung cấp tồn tại theo mancc
          const existingSupplier = await this.prisma.nhacungcap.findFirst({
            where: { mancc: supplier.mancc },
            select: { id: true },
          });
          if (existingSupplier) {
            // Nếu nhà cung cấp đã tồn tại thì cập nhật
            await this.update(existingSupplier.id, supplier);
          } else {
            // Nếu chưa tồn tại thì tạo mới
            await this.create(supplier);
          }
        }
      }
         this.getLastUpdatedNhacungcap();
      return { message: 'Import completed' };
    } catch (error) {
      await this._ImportdataService.create({
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: 'Error during import process',
          },
          order: 1, // cập nhật nếu cần theo thứ tự của bạn
          createdBy: 'system', // thay bằng ID người dùng thực nếu có
          title: `Import Nhà Cung Cấp ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
          type: 'nhacungcap',
        });
        
      throw new InternalServerErrorException('Lỗi khi nhập khẩu nhà cung cấp');
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
  async findBy(param: any) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.nhacungcap.findFirst({
          where,
          orderBy: { createdAt: 'desc' },
        });
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.nhacungcap.findMany({
          where,
          skip,
          take: limit,
          orderBy: { createdAt: 'desc' },
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
      throw error;
    }
  }
  async findOne(id: string) {
    try {
      const nhacungcap = await this.prisma.nhacungcap.findUnique({
        where: { id },
        include: {
          Sanpham: true,
        },
      });
      if (!nhacungcap) throw new NotFoundException('Nhacungcap not found');
      return nhacungcap;
    } catch (error) {
      if (error instanceof NotFoundException) throw error;
      throw new InternalServerErrorException('Lỗi khi lấy nhà cung cấp');
    }
  }

  async update(id: string, data: any) {
    try {
      const { Sanpham, ...rest } = data;
      const updatedNhacc = await this.prisma.nhacungcap.update({
        where: { id },
        data: {
          ...rest,
          Sanpham: {
            set: Sanpham?.map((sp: any) => ({ id: sp.id })) || [],
          },
        },
      });
         this.getLastUpdatedNhacungcap();
      return updatedNhacc;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi cập nhật nhà cung cấp');
    }
  }

  async remove(id: string) {
    try {
      const result = await this.prisma.nhacungcap.delete({ where: { id } });
      this.getLastUpdatedNhacungcap();
      return result;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi xóa nhà cung cấp');
    }
  }

  async findByProductIds(productIds: string[]) {
    try {
      if (!productIds || productIds.length === 0) {
        return [];
      }
      const suppliers = await this.prisma.nhacungcap.findMany({
        where: {
          Sanpham: {
            some: {
              id: { in: productIds }
            }
          }
        },
        include: {
          Sanpham: true,
        },
      });
      return suppliers;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi tìm nhà cung cấp theo sản phẩm');
    }
  }
}