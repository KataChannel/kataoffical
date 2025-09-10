import { Injectable, NotFoundException, BadRequestException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { CreateNhomkhachhangInput } from './dto/create-nhomkhachhang.dto';
import { UpdateNhomkhachhangInput } from './dto/update-nhomkhachhang.dto';
import { NhomkhachhangFilterInput, NhomkhachhangPaginationInput, NhomkhachhangSortInput } from './dto/filter-nhomkhachhang.dto';
import { NhomkhachhangConnection } from './types/nhomkhachhang-response.type';

@Injectable()
export class NhomkhachhangService {
  constructor(private readonly prisma: PrismaService) {}

  // Helper function để chuyển đổi null thành undefined
  private transformNullToUndefined(data: any): any {
    if (data === null) return undefined;
    if (Array.isArray(data)) {
      return data.map(item => this.transformNullToUndefined(item));
    }
    if (typeof data === 'object' && data !== null) {
      const transformed: any = {};
      for (const [key, value] of Object.entries(data)) {
        transformed[key] = this.transformNullToUndefined(value);
      }
      return transformed;
    }
    return data;
  }

  // GraphQL: Tạo nhóm khách hàng mới
  async createNhomkhachhang(input: CreateNhomkhachhangInput) {
    try {
      // Kiểm tra tên nhóm đã tồn tại chưa
      const existingNhom = await this.prisma.nhomkhachhang.findUnique({
        where: { name: input.name }
      });

      if (existingNhom) {
        throw new ConflictException(`Nhóm khách hàng với tên "${input.name}" đã tồn tại`);
      }

      const nhomkhachhang = await this.prisma.nhomkhachhang.create({
        data: input,
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              tenkh: true,
              diachi: true,
              sdt: true,
              email: true,
              isActive: true
            }
          }
        }
      });

      return this.transformNullToUndefined(nhomkhachhang);
    } catch (error) {
      if (error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi tạo nhóm khách hàng: ${error.message}`);
    }
  }

  // GraphQL: Lấy danh sách nhóm khách hàng với phân trang và lọc
  async findAllNhomkhachhang(
    filter?: NhomkhachhangFilterInput,
    pagination?: NhomkhachhangPaginationInput,
    sort?: NhomkhachhangSortInput
  ): Promise<NhomkhachhangConnection> {
    const { page = 1, limit = 10 } = pagination || {};
    const skip = (page - 1) * limit;
    const { field = 'createdAt', direction = 'desc' } = sort || {};

    // Xây dựng điều kiện where
    const where: any = {};
    if (filter) {
      if (filter.search) {
        where.OR = [
          { name: { contains: filter.search, mode: 'insensitive' } },
          { description: { contains: filter.search, mode: 'insensitive' } }
        ];
      } else {
        if (filter.name) {
          where.name = { contains: filter.name, mode: 'insensitive' };
        }
        if (filter.description) {
          where.description = { contains: filter.description, mode: 'insensitive' };
        }
      }
    }

    try {
      const [data, total] = await Promise.all([
        this.prisma.nhomkhachhang.findMany({
          where,
          skip,
          take: limit,
          orderBy: { [field]: direction },
          include: {
            khachhang: {
              select: {
                id: true,
                name: true,
                tenkh: true,
                diachi: true,
                sdt: true,
                email: true,
                isActive: true
              }
            }
          }
        }),
        this.prisma.nhomkhachhang.count({ where })
      ]);

      const totalPages = Math.ceil(total / limit);

      return {
        data: this.transformNullToUndefined(data),
        total,
        page,
        limit,
        totalPages,
        hasNextPage: page < totalPages,
        hasPreviousPage: page > 1
      };
    } catch (error) {
      throw new BadRequestException(`Lỗi khi lấy danh sách nhóm khách hàng: ${error.message}`);
    }
  }

  // GraphQL: Lấy nhóm khách hàng theo ID
  async findOneNhomkhachhang(id: string) {
    try {
      const nhomkhachhang = await this.prisma.nhomkhachhang.findUnique({
        where: { id },
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              tenkh: true,
              diachi: true,
              sdt: true,
              email: true,
              isActive: true
            }
          }
        }
      });

      if (!nhomkhachhang) {
        throw new NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
      }

      return this.transformNullToUndefined(nhomkhachhang);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi lấy nhóm khách hàng: ${error.message}`);
    }
  }

  // GraphQL: Cập nhật nhóm khách hàng
  async updateNhomkhachhang(id: string, input: UpdateNhomkhachhangInput) {
    try {
      // Kiểm tra nhóm có tồn tại không
      const existingNhom = await this.prisma.nhomkhachhang.findUnique({
        where: { id }
      });

      if (!existingNhom) {
        throw new NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
      }

      // Kiểm tra tên nhóm mới có bị trùng không (nếu có thay đổi tên)
      if (input.name && input.name !== existingNhom.name) {
        const nameConflict = await this.prisma.nhomkhachhang.findUnique({
          where: { name: input.name }
        });

        if (nameConflict) {
          throw new ConflictException(`Nhóm khách hàng với tên "${input.name}" đã tồn tại`);
        }
      }

      const updatedNhom = await this.prisma.nhomkhachhang.update({
        where: { id },
        data: input,
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              tenkh: true,
              diachi: true,
              sdt: true,
              email: true,
              isActive: true
            }
          }
        }
      });

      return this.transformNullToUndefined(updatedNhom);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof ConflictException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi cập nhật nhóm khách hàng: ${error.message}`);
    }
  }

  // GraphQL: Xóa nhóm khách hàng
  async removeNhomkhachhang(id: string) {
    try {
      const existingNhom = await this.prisma.nhomkhachhang.findUnique({
        where: { id },
        include: { khachhang: true }
      });

      if (!existingNhom) {
        throw new NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${id}`);
      }

      // Kiểm tra có khách hàng trong nhóm không
      if (existingNhom.khachhang && existingNhom.khachhang.length > 0) {
        throw new BadRequestException(
          `Không thể xóa nhóm khách hàng vì còn ${existingNhom.khachhang.length} khách hàng trong nhóm. Vui lòng di chuyển khách hàng trước khi xóa.`
        );
      }

      await this.prisma.nhomkhachhang.delete({
        where: { id }
      });

      return true;
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi xóa nhóm khách hàng: ${error.message}`);
    }
  }

  // GraphQL: Thêm khách hàng vào nhóm
  async addKhachhangToNhom(nhomId: string, khachhangIds: string[]) {
    try {
      // Kiểm tra nhóm có tồn tại không
      const nhom = await this.prisma.nhomkhachhang.findUnique({
        where: { id: nhomId }
      });

      if (!nhom) {
        throw new NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${nhomId}`);
      }

      // Kiểm tra các khách hàng có tồn tại không
      const khachhangCount = await this.prisma.khachhang.count({
        where: { id: { in: khachhangIds } }
      });

      if (khachhangCount !== khachhangIds.length) {
        throw new BadRequestException('Một hoặc nhiều khách hàng không tồn tại');
      }

      const updatedNhom = await this.prisma.nhomkhachhang.update({
        where: { id: nhomId },
        data: {
          khachhang: {
            connect: khachhangIds.map(id => ({ id }))
          }
        },
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              tenkh: true,
              diachi: true,
              sdt: true,
              email: true,
              isActive: true
            }
          }
        }
      });

      return this.transformNullToUndefined(updatedNhom);
    } catch (error) {
      if (error instanceof NotFoundException || error instanceof BadRequestException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi thêm khách hàng vào nhóm: ${error.message}`);
    }
  }

  // GraphQL: Xóa khách hàng khỏi nhóm
  async removeKhachhangFromNhom(nhomId: string, khachhangIds: string[]) {
    try {
      // Kiểm tra nhóm có tồn tại không
      const nhom = await this.prisma.nhomkhachhang.findUnique({
        where: { id: nhomId }
      });

      if (!nhom) {
        throw new NotFoundException(`Không tìm thấy nhóm khách hàng với ID: ${nhomId}`);
      }

      const updatedNhom = await this.prisma.nhomkhachhang.update({
        where: { id: nhomId },
        data: {
          khachhang: {
            disconnect: khachhangIds.map(id => ({ id }))
          }
        },
        include: {
          khachhang: {
            select: {
              id: true,
              name: true,
              tenkh: true,
              diachi: true,
              sdt: true,
              email: true,
              isActive: true
            }
          }
        }
      });

      return this.transformNullToUndefined(updatedNhom);
    } catch (error) {
      if (error instanceof NotFoundException) {
        throw error;
      }
      throw new BadRequestException(`Lỗi khi xóa khách hàng khỏi nhóm: ${error.message}`);
    }
  }

  // REST API methods (giữ nguyên để tương thích)
  async create(data: any) {
    return this.prisma.nhomkhachhang.create({ data });
  }

  async findAll() {
    return this.prisma.nhomkhachhang.findMany({ include: { khachhang: true } });
  }

  async findOne(id: string) {
    const nhomkhachhang = await this.prisma.nhomkhachhang.findUnique({
      where: { id },
      include: { khachhang: true }
    });
    if (!nhomkhachhang) throw new NotFoundException('Nhomkhachhang not found');
    return nhomkhachhang;
  }

  async update(id: string, data: any) {
    return this.prisma.nhomkhachhang.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.nhomkhachhang.delete({ where: { id } });
  }

  async addKHtoNhom(nhomId: string, khachhangIds: any[]) {
    return this.prisma.nhomkhachhang.update({
      where: { id: nhomId },
      data: {
        khachhang: {
          connect: khachhangIds.map(id => ({ id }))
        }
      }
    });
  }

  async removeKHfromNhom(nhomId: string, khachhangIds: any[]) {
    return this.prisma.nhomkhachhang.update({
      where: { id: nhomId },
      data: {
        khachhang: {
          disconnect: khachhangIds.map(id => ({ id }))
        }
      }
    });
  }
}