import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Nhanvien } from '@prisma/client';

@Injectable()
export class NhanvienService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.NhanvienCreateInput): Promise<Nhanvien> {
    try {
      // Check if manv already exists
      const existing = await this.prisma.nhanvien.findUnique({
        where: { manv: data.manv }
      });
      
      if (existing) {
        throw new HttpException('Mã nhân viên đã tồn tại', HttpStatus.BAD_REQUEST);
      }

      return await this.prisma.nhanvien.create({ data });
    } catch (error) {
      throw new HttpException(
        error.message || 'Tạo nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAll(query?: any): Promise<Nhanvien[]> {
    try {
      const where: Prisma.NhanvienWhereInput = {};
      
      if (query?.isActive !== undefined) {
        where.isActive = query.isActive === 'true';
      }

      if (query?.search) {
        where.OR = [
          { tennv: { contains: query.search, mode: 'insensitive' } },
          { manv: { contains: query.search, mode: 'insensitive' } },
          { sdtnv: { contains: query.search, mode: 'insensitive' } },
          { emailnv: { contains: query.search, mode: 'insensitive' } },
        ];
      }

      return await this.prisma.nhanvien.findMany({
        where,
        orderBy: { tennv: 'asc' },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Lấy danh sách nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findAllForSelect(): Promise<Pick<Nhanvien, 'id' | 'manv' | 'tennv'>[]> {
    try {
      return await this.prisma.nhanvien.findMany({
        where: { isActive: true },
        select: {
          id: true,
          manv: true,
          tennv: true,
        },
        orderBy: { tennv: 'asc' },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Lấy danh sách nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findOne(id: string): Promise<Nhanvien> {
    try {
      const nhanvien = await this.prisma.nhanvien.findUnique({
        where: { id },
        include: {
          _count: {
            select: {
              donhangChiahang: true,
              donhangShipper: true,
            },
          },
        },
      });

      if (!nhanvien) {
        throw new HttpException('Không tìm thấy nhân viên', HttpStatus.NOT_FOUND);
      }

      return nhanvien;
    } catch (error) {
      throw new HttpException(
        error.message || 'Lấy thông tin nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async findByManv(manv: string): Promise<Nhanvien> {
    try {
      const nhanvien = await this.prisma.nhanvien.findUnique({
        where: { manv },
      });

      if (!nhanvien) {
        throw new HttpException('Không tìm thấy nhân viên', HttpStatus.NOT_FOUND);
      }

      return nhanvien;
    } catch (error) {
      throw new HttpException(
        error.message || 'Lấy thông tin nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async searchfield(searchParams: Record<string, any>): Promise<Nhanvien> {
    try {
      const where: Prisma.NhanvienWhereInput = {};
      
      Object.keys(searchParams).forEach((key) => {
        if (searchParams[key] !== undefined && searchParams[key] !== null) {
          where[key] = searchParams[key];
        }
      });

      const nhanvien = await this.prisma.nhanvien.findFirst({ where });
      
      if (!nhanvien) {
        throw new HttpException('Không tìm thấy nhân viên', HttpStatus.NOT_FOUND);
      }

      return nhanvien;
    } catch (error) {
      throw new HttpException(
        error.message || 'Tìm kiếm nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async update(id: string, data: Prisma.NhanvienUpdateInput): Promise<Nhanvien> {
    try {
      // Check if nhanvien exists
      await this.findOne(id);

      // If updating manv, check if new manv already exists
      if (data.manv) {
        const existing = await this.prisma.nhanvien.findUnique({
          where: { manv: data.manv as string },
        });
        
        if (existing && existing.id !== id) {
          throw new HttpException('Mã nhân viên đã tồn tại', HttpStatus.BAD_REQUEST);
        }
      }

      return await this.prisma.nhanvien.update({
        where: { id },
        data,
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Cập nhật nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async remove(id: string): Promise<Nhanvien> {
    try {
      // Check if nhanvien exists
      const nhanvien = await this.findOne(id);

      // Check if nhanvien is being used in any donhang
      const donhangCount = await this.prisma.donhang.count({
        where: {
          OR: [
            { nhanvienchiahangId: id },
            { shipperId: id },
          ],
        },
      });

      if (donhangCount > 0) {
        throw new HttpException(
          'Không thể xóa nhân viên đang được sử dụng trong đơn hàng',
          HttpStatus.BAD_REQUEST,
        );
      }

      return await this.prisma.nhanvien.delete({
        where: { id },
      });
    } catch (error) {
      throw new HttpException(
        error.message || 'Xóa nhân viên thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async import(data: any[]): Promise<{ success: number; failed: number; errors: { manv: string; error: string }[] }> {
    const results: { success: number; failed: number; errors: { manv: string; error: string }[] } = {
      success: 0,
      failed: 0,
      errors: [],
    };

    for (const item of data) {
      try {
        // Check if manv exists
        const existing = await this.prisma.nhanvien.findUnique({
          where: { manv: item.manv },
        });

        if (existing) {
          // Update existing
          await this.prisma.nhanvien.update({
            where: { manv: item.manv },
            data: {
              tennv: item.tennv,
              sdtnv: item.sdtnv,
              ngaysinhnv: item.ngaysinhnv ? new Date(item.ngaysinhnv) : undefined,
              emailnv: item.emailnv,
              diachinv: item.diachinv,
              hinhccnv: item.hinhccnv,
              isActive: item.isActive !== undefined ? item.isActive : true,
            },
          });
        } else {
          // Create new
          await this.prisma.nhanvien.create({
            data: {
              manv: item.manv,
              tennv: item.tennv,
              sdtnv: item.sdtnv,
              ngaysinhnv: item.ngaysinhnv ? new Date(item.ngaysinhnv) : undefined,
              emailnv: item.emailnv,
              diachinv: item.diachinv,
              hinhccnv: item.hinhccnv,
              isActive: item.isActive !== undefined ? item.isActive : true,
            },
          });
        }
        
        results.success++;
      } catch (error) {
        results.failed++;
        results.errors.push({
          manv: item.manv,
          error: error.message,
        });
      }
    }

    return results;
  }

  async getLastUpdated(): Promise<{ lastUpdated: Date }> {
    try {
      const lastNhanvien = await this.prisma.nhanvien.findFirst({
        orderBy: { updatedAt: 'desc' },
        select: { updatedAt: true },
      });

      return {
        lastUpdated: lastNhanvien?.updatedAt || new Date(),
      };
    } catch (error) {
      throw new HttpException(
        error.message || 'Lấy thông tin cập nhật thất bại',
        error.status || HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }
}
