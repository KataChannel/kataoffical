import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class PhieukhoService {
  constructor(private readonly prisma: PrismaService) {}



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

  async create(data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const newPhieuKho = await prisma.phieuKho.create({
        data: {
          maphieu: data.maphieu,
          ngay: new Date(data.ngay),
          type: data.type,
          khoId: data.khoId,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.sanphamId,
              soluong: sp.soluong,
              ghichu: sp.ghichu,
            })),
          },
        },
        include: { sanpham: true },
      });
  
      // Cập nhật tồn kho theo loại phiếu
      for (const sp of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: sp.sanphamId },
          data: {
            soluongkho: data.type === 'nhap' 
              ? { increment: sp.soluong }  // Tăng kho nếu là phiếu nhập
              : { decrement: sp.soluong }, // Giảm kho nếu là phiếu xuất
          },
        });
      }
  
      return newPhieuKho;
    });
  }
  
  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // Lấy phiếu kho cũ
      const oldPhieuKho = await prisma.phieuKho.findUnique({
        where: { id },
        include: { sanpham: true },
      });
  
      if (!oldPhieuKho) throw new NotFoundException('Phiếu kho không tồn tại');
  
      // Hoàn lại số lượng cũ trước khi cập nhật
      for (const oldSP of oldPhieuKho.sanpham) {
        await prisma.sanpham.update({
          where: { id: oldSP.sanphamId },
          data: {
            soluongkho: oldPhieuKho.type === 'nhap' 
              ? { decrement: oldSP.soluong } // Trừ đi số lượng cũ nếu là phiếu nhập
              : { increment: oldSP.soluong }, // Cộng lại số lượng cũ nếu là phiếu xuất
          },
        });
      }
  
      // Cập nhật phiếu kho mới
      const updatedPhieuKho = await prisma.phieuKho.update({
        where: { id },
        data: {
          maphieu: data.maphieu,
          ngay: new Date(data.ngay),
          type: data.type,
          khoId: data.khoId,
          ghichu: data.ghichu,
          isActive: data.isActive ?? true,
          sanpham: {
            deleteMany: {}, // Xóa sản phẩm cũ trước khi thêm mới
            create: data.sanpham.map((sp: any) => ({
              sanphamId: sp.sanphamId,
              soluong: sp.soluong,
              ghichu: sp.ghichu,
            })),
          },
        },
        include: { sanpham: true },
      });
  
      // Cập nhật tồn kho theo loại phiếu mới
      for (const newSP of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: newSP.sanphamId },
          data: {
            soluongkho: data.type === 'nhap' 
              ? { increment: newSP.soluong }  // Tăng kho nếu là phiếu nhập
              : { decrement: newSP.soluong }, // Giảm kho nếu là phiếu xuất
          },
        });
      }
  
      return updatedPhieuKho;
    });
  }
  
  async remove(id: string) {
    return this.prisma.phieuKho.delete({ where: { id } });
  }
}