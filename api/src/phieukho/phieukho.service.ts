import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PhieukhoService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.phieuKho.create({
      data: {
        maphieu: data.maphieu,
        ngay: new Date(data.ngay),
        type: data.type,
        khoId: data.khoId,
        ghichu: data.ghichu,
        isActive: data.isActive ?? true,
        sanpham: {
          create: data.sanpham.map((sp:any) => ({
            sanphamId: sp.sanphamId,
            soluong: sp.soluong,
            ghichu: sp.ghichu,
          })),
        },
      },
      include: {
        sanpham: true, // Trả về danh sách sản phẩm trong phiếu kho
      },
    }); 
  }
  async findAll() {
    return this.prisma.phieuKho.findMany(
      {
        include: {
          sanpham: true,
          kho: true,
        },
      },
    );
  }

  async findOne(id: string) {
    const phieuKho = await this.prisma.phieuKho.findUnique(
      {
        where: { id },
        include: {
          sanpham: true,
          kho: true,
        },
      },
    );
    if (!phieuKho) throw new NotFoundException('phieuKho not found');
    return phieuKho;
  }

  async update(id: string, data: any) {
    return this.prisma.phieuKho.update(
      {
        where: { id },
        data: {
          maphieu: data.maphieu,
          ngay: new Date(data.ngay),
          type: data.type,
          khoId: data.khoId,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            deleteMany: {},
            create: data.sanpham.map((sp:any) => ({
              sanphamId: sp.sanphamId,
              soluong: sp.soluong,
              ghichu: sp.ghichu,
            })),
          },
        },
        include: {
          sanpham: true, // Trả về danh sách sản phẩm trong phiếu kho
        },
      },
    );
  }
  async remove(id: string) {
    return this.prisma.phieuKho.delete({ where: { id } });
  }
}