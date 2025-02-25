import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DathangService {
  constructor(private readonly prisma: PrismaService) {}


  async reorderDathangs(dathangIds: string[]) {
    // Update the order of each dathang based on its position in the array
    for (let i = 0; i < dathangIds.length; i++) {
      await this.prisma.dathang.update({
        where: { id: dathangIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    return this.prisma.dathang.findMany({include: { 
      sanpham: true, 
      nhacungcap: true
    }});
  }

  async findOne(id: string) {
    const dathang = await this.prisma.dathang.findUnique(
      {
        where: { id },
        include: { 
          sanpham: true, 
          nhacungcap: true
        },
      }
    );
    if (!dathang) throw new NotFoundException('Dathang not found');
    return dathang;
  }


  async create(data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const newDathang = await prisma.dathang.create({
        data: {
          title: data.title,
          type: data.type,
          madncc: data.madncc,
          ngaynhan: new Date(data.ngaynhan),
          ghichu: data.ghichu,
          nhacungcapId: data.nhacungcapId,
          order: data.order,
          isActive: data.isActive,
          sanpham: {
            create: data.sanpham.map(sp => ({
              idSP: sp.idSP,
              sldat: sp.sldat,
              slgiao: sp.slgiao,
              slnhan: sp.slnhan,
              ttdat: sp.ttdat,
              ttgiao: sp.ttgiao,
              ttnhan: sp.ttnhan,
              ghichu: sp.ghichu,
              order: sp.order,
              isActive: sp.isActive,
            })),
          },
        },
        include: { sanpham: true },
      });
  
      // Cập nhật số lượng sản phẩm trong kho (tăng số lượng nhận)
      for (const sp of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: sp.idSP },
          data: {
            soluong: {
              increment: sp.slnhan ?? 0, // Tăng số lượng sản phẩm nhập về
            },
          },
        });
      }
  
      return newDathang;
    });
  }
  

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      // Lấy đơn hàng cũ
      const oldDathang = await prisma.dathang.findUnique({
        where: { id },
        include: { sanpham: true },
      });
  
      if (!oldDathang) throw new NotFoundException('Đơn hàng không tồn tại');
  
      // Hoàn lại số lượng sản phẩm trong đơn hàng cũ
      for (const oldSP of oldDathang.sanpham) {
        await prisma.sanpham.update({
          where: { id: oldSP.idSP },
          data: {
            soluong: {
              decrement: oldSP.slnhan ?? 0, // Giảm số lượng cũ trước khi cập nhật số mới
            },
          },
        });
      }
  
      // Cập nhật đơn hàng mới
      const updatedDathang = await prisma.dathang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          madncc: data.madncc,
          ngaynhan: new Date(data.ngaynhan),
          ghichu: data.ghichu,
          order: data.order,
          isActive: data.isActive,
          sanpham: {
            deleteMany: {}, // Xóa tất cả sản phẩm cũ trước khi thêm mới
            create: data.sanpham.map((sp: any) => ({
              idSP: sp.idSP,
              sldat: sp.sldat,
              slgiao: sp.slgiao,
              slnhan: sp.slnhan,
              ttdat: sp.ttdat,
              ttgiao: sp.ttgiao,
              ttnhan: sp.ttnhan,
              ghichu: sp.ghichu,
              order: sp.order,
              isActive: sp.isActive,
            })),
          },
        },
        include: { sanpham: true },
      });
  
      // Cập nhật số lượng sản phẩm trong kho (tăng số lượng nhận mới)
      for (const newSP of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: newSP.idSP },
          data: {
            soluong: {
              increment: newSP.slnhan ?? 0, // Cộng số lượng mới nhận
            },
          },
        });
      }
  
      return updatedDathang;
    });
  }
  
  async remove(id: string) {
    return this.prisma.dathang.delete({ where: { id } });
  }
}