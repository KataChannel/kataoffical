import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { convertXuatnhapton } from 'src/shared/utils/xuatnhapton.utils';

@Injectable()
export class PhieukhoService {
  constructor(private readonly prisma: PrismaService) {}

  async generateNextOrderCode(): Promise<string> {
    // Lấy mã đơn hàng gần nhất
    const lastOrder = await this.prisma.dathang.findFirst({
      orderBy: { createdAt: 'desc' },
    });

    let nextCode = 'TGNCC-AA00001'; // Mã đầu tiên

    if (lastOrder && lastOrder.madncc) {
      nextCode = this.incrementOrderCode(lastOrder.madncc);
    }
    return nextCode;
  }
  private incrementOrderCode(orderCode: string): string {
    const prefix = 'PK-';
    const letters = orderCode.slice(6, 8); // Lấy AA → ZZ
    const numbers = parseInt(orderCode.slice(8), 13); // Lấy 00001 → 99999

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset về 00001
      newLetters = this.incrementLetters(letters);
    }

    return `${prefix}${newLetters}${newNumbers.toString().padStart(5, '0')}`;
  }

  private incrementLetters(letters: string): string {
    let firstChar = letters.charCodeAt(0);
    let secondChar = letters.charCodeAt(1);

    if (secondChar === 90) {
      // 'Z'
      if (firstChar === 90) return 'ZZ'; // Giới hạn cuối cùng
      firstChar++;
      secondChar = 65; // Reset về 'A'
    } else {
      secondChar++;
    }

    return String.fromCharCode(firstChar) + String.fromCharCode(secondChar);
  }



  async xuatnhapton(query: any) {
    const { khoId, Batdau, Ketthuc } = query;
    const phieuKhos = await this.prisma.phieuKho.findMany({
      where: {
        ...(khoId && { khoId }),
        ngay: {
          gte: new Date(Batdau),
          lte: new Date(Ketthuc),
        },
      },
      include: {
        sanpham: { include: { sanpham: true } },
        kho: true,
      },
    });
    const tranData = phieuKhos.map((phieuKho) => ({
      khoname: phieuKho.kho?.name ?? '',
      maphieu: phieuKho.maphieu,
      ngay: phieuKho.ngay,
      type: phieuKho.type,
      sanpham: phieuKho.sanpham.map((item) => ({
        id: item.id,
        soluong: item.soluong,
        title: item.sanpham.title,
      })),
    }));
    return convertXuatnhapton(tranData);
  }
  async findAll() {
    const phieuKhos = await this.prisma.phieuKho.findMany({
      include: {
        sanpham: { include: { sanpham: true } },
        kho: true,
      },
    });
    return phieuKhos.map((phieuKho) => ({
      ...phieuKho,
      sanpham: phieuKho.sanpham.map((item) => ({
        ...item,
        sanpham: item.sanpham,
      })),
    }));
  }

  async findOne(id: string) {
    const phieuKho = await this.prisma.phieuKho.findUnique({
      where: { id },
      include: {
        sanpham: true,
        kho: true,
      },
    });
    if (!phieuKho) throw new NotFoundException('phieuKho not found');
    return phieuKho;
  }

  async create(data: any) {
    const maphieukho = await this.generateNextOrderCode();
    return this.prisma.$transaction(async (prisma) => {
      const newPhieuKho = await prisma.phieuKho.create({
        data: {
          maphieu: maphieukho,
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
      for (const sp of data.sanpham) {
        await prisma.tonKho.upsert({
          where: { sanphamId: sp.sanphamId },
          update:
            data.type === 'nhap'
              ? {
                  slton: { increment: sp.soluong },
                }
              : {
                  slton: { decrement: sp.soluong },
                },
          create:
            data.type === 'nhap'
              ? {
                  sanphamId: sp.sanphamId,
                  slton: sp.soluong,
                  slchogiao: 0,
                  slchonhap: 0,
                }
              : {
                  sanphamId: sp.sanphamId,
                  slton: -sp.soluong,
                  slchogiao: 0,
                  slchonhap: 0,
                },
        });
      }
      return newPhieuKho;
    });
  }

  async update(id: string, data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const oldPhieuKho = await prisma.phieuKho.findUnique({
        where: { id },
        include: { sanpham: true },
      });

      if (!oldPhieuKho) throw new NotFoundException('Phiếu kho không tồn tại');
      for (const oldSP of oldPhieuKho.sanpham) {
        await prisma.sanpham.update({
          where: { id: oldSP.sanphamId },
          data: {
            soluongkho:
              oldPhieuKho.type === 'nhap'
                ? { decrement: Number(oldSP.soluong) || 0 }
                : { increment: Number(oldSP.soluong) || 0 },
          },
        });
      }
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
              sldat: sp.sldat,
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
            soluongkho:
              data.type === 'nhap'
                ? { increment: newSP.soluong } // Tăng kho nếu là phiếu nhập
                : { decrement: newSP.soluong }, // Giảm kho nếu là phiếu xuất
          },
        });
      }
      return updatedPhieuKho;
    });
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (prisma) => {
      const phieuKho = await prisma.phieuKho.findUnique({
        where: { id },
        include: { sanpham: true },
      });
      if (!phieuKho) {
        throw new NotFoundException('Phiếu kho không tồn tại');
      }

      // Điều chỉnh tồn kho ngược lại theo loại phiếu
      for (const item of phieuKho.sanpham) {
        await prisma.sanpham.update({
          where: { id: item.sanphamId },
          data: {
            soluongkho:
              phieuKho.type === 'xuat'
                ? { increment: item.soluong ?? 0 }
                : { decrement: item.soluong ?? 0 },
          },
        });
      }

      await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: id } });
      return prisma.phieuKho.delete({ where: { id } });
    });
  }
}
