import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DathangService {
  constructor(private readonly prisma: PrismaService) {}

  async create(data: any) {
    return this.prisma.dathang.create(
      {
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
        include: { sanpham: true }, // Load sản phẩm trong đơn hàng
      }
    );

  }
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

  async update(id: string, data: any) {
    // Kiểm tra đơn hàng có tồn tại không
    const existingOrder = await this.prisma.dathang.findUnique({ where: { id } });
    if (!existingOrder) throw new NotFoundException('Đơn hàng không tồn tại');

    return this.prisma.dathang.update({
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
          deleteMany: {}, // Xóa tất cả sản phẩm cũ trước khi cập nhật
          create: data.sanpham.map((sp:any) => ({
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
  }
  async remove(id: string) {
    return this.prisma.dathang.delete({ where: { id } });
  }
}