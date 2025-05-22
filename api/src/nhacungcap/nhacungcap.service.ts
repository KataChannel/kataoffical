import { Injectable, NotFoundException, InternalServerErrorException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class NhacungcapService {
  constructor(private readonly prisma: PrismaService) {}

  async generateMancc(): Promise<string> {
    try {
      const latest = await this.prisma.nhacungcap.findFirst({
        orderBy: { mancc: 'desc' },
      });

      let nextNumber = 1;
      if (latest) {
        const match = latest.mancc.match(/TG-NCC(\d+)/);
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `TG-NCC${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
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
          throw new BadRequestException('Mã nhà cung cấp đã tồn tại');
        }
      }
      const mancc =
        data.mancc && data.mancc.trim() !== ''
          ? data.mancc
          : await this.generateMancc();

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
      return result;
    } catch (error) {
      if (error instanceof BadRequestException) throw error;
      throw new InternalServerErrorException('Lỗi khi tạo nhà cung cấp');
    }
  }

  async import(data: any[]) {
    // Dữ liệu gửi lên là một mảng nhà cung cấp
    for (const supplier of data) {
      // Nếu không có mancc, gọi create để tự sinh mancc
      if (!supplier.mancc) {
        await this.create(supplier);
      } else {
        // Tìm nhà cung cấp tồn tại theo mancc
        const existingSupplier = await this.prisma.nhacungcap.findUnique({
          where: { mancc: supplier.mancc },
          select: { id: true },
        });
        if (existingSupplier) {
          // Nếu nhà cung cấp đã tồn tại thì cập nhật
          this.update(existingSupplier.id, supplier);
        } else {
          // Nếu chưa tồn tại thì tạo mới
          await this.create(supplier);
        }
      }
    }
    return { message: 'Import completed' };
  }


  async findAll() {
    try {
      return await this.prisma.nhacungcap.findMany({
        include: {
          Sanpham: true,
        },
      });
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi lấy danh sách nhà cung cấp');
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
      return updatedNhacc;
    } catch (error) {
      throw new InternalServerErrorException('Lỗi khi cập nhật nhà cung cấp');
    }
  }

  async remove(id: string) {
    try {
      return await this.prisma.nhacungcap.delete({ where: { id } });
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