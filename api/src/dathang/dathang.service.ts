import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
const DEFAUL_KHO_ID='4cc01811-61f5-4bdc-83de-a493764e9258' // Kho mặc định, cần thay đổi theo yêu cầu thực tế
@Injectable() 
export class DathangService {
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
    const prefix = 'TGNCC-';
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
    const dathangs = await this.prisma.dathang.findMany({
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true,
      },
    });
    return dathangs.map((dathang) => ({
      ...dathang,
      sanpham: dathang.sanpham.map((item: any) => ({
        ...item.sanpham,
        idSP: item.idSP,
        sldat: item.sldat|| 0,
        slgiao: item.slgiao|| 0,
        slnhan: item.slnhan|| 0,
        ttdat: item.ttdat|| 0,
        ttgiao: item.ttgiao|| 0,
        ttnhan: item.ttnhan|| 0,
        ghichu: item.ghichu,
      })),
    }));
  }

  async findOne(id: string) {
    // const dathang = await this.prisma.dathang.findUnique({ where: { id } });
    const dathang = await this.prisma.dathang.findUnique({
      where: { id },
      include: {
        sanpham: {
          include: {
            sanpham: true,
          },
        },
        nhacungcap: true,
      },
    });
    if (!dathang) throw new NotFoundException('Dathang not found');
    return {
      ...dathang,
      sanpham: dathang.sanpham.map((item) => ({
        ...item.sanpham,
        idSP: item.idSP,
        sldat: item.sldat|| 0,
        slgiao: item.slgiao|| 0,
        slnhan: item.slnhan|| 0,
        ttdat: item.ttdat|| 0,
        ttgiao: item.ttgiao|| 0,
        ttnhan: item.ttnhan|| 0,
        ghichu: item.ghichu,
      })),
    };
  }


  async create(data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const madathang = await this.generateNextOrderCode();
      console.log(madathang);
      
      const newDathang = await prisma.dathang.create({
        data: {
          title: data.title,
          type: data.type,
          madncc: madathang,
          ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
          ghichu: data.ghichu,
          nhacungcapId: data.nhacungcapId,
          order: data.order,
          isActive: data.isActive,
          sanpham: {
            create: data.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              sldat: sp.sldat,
              slgiao: sp.slgiao,
              slnhan: sp.slnhan,
              ttdat: sp.ttdat || 0,
              ttgiao: sp.ttgiao || 0,
              ttnhan: sp.ttnhan || 0,
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
          where: { id: sp.id },
          data: {
            soluong: {
              decrement: parseFloat((sp.sldat ?? 0).toFixed(2))
            },
          },
        });
      }
  
      // Tạo phiếu nhập kho tương ứng
      await prisma.phieuKho.create({
        data: {
          maphieu: `PN-${newDathang.id}`, // Mã phiếu nhập kho dựa trên ID đơn hàng
          khoId: DEFAUL_KHO_ID,        // Cập nhật khoId phù hợp
          type: 'nhap',                   // Loại phiếu nhập (nhập kho)
          ngay: newDathang.ngaynhan || new Date(),        // Sử dụng ngày nhận từ đơn hàng
          ghichu: `Phiếu nhập kho cho đơn hàng ${newDathang.title}`,
          sanpham: {
            create: data?.sanpham?.map((sp: any) => ({
              sanphamId: sp.id,
              sldat: sp.sldat,
              soluong: sp.sldat,
              ghichu: sp.ghichu,
            })),
          },
        },
      });
  
      return newDathang;
    });
  }

  async createbynhucau(data: any) {
    return this.prisma.$transaction(async (prisma) => {
      const nhacungcap = await prisma.nhacungcap.findUnique({
        where: { id: data.id },
      });
      if (!nhacungcap) throw new NotFoundException('Nhà cung cấp không tồn tại');

      // Generate a new order code similar to create
      const madathang = await this.generateNextOrderCode();

      const newDathang = await prisma.dathang.create({
        data: {
          title: data.title,
          type: data.type,
          madncc: madathang,
          ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
          ghichu: data.ghichu,
          nhacungcapId: nhacungcap.id,
          order: data.order || 0,
          isActive: data.isActive !== undefined ? data.isActive : true,
          sanpham: {
            create: data.sanpham?.map((sp: any) => ({
              idSP: sp.id,
              sldat: sp.sldat,
              slgiao: sp.slgiao,
              slnhan: sp.slnhan,
              ttdat: sp.ttdat || 0,
              ttgiao: sp.ttgiao || 0,
              ttnhan: sp.ttnhan || 0,
              ghichu: sp.ghichu,
              order: sp.order,
              isActive: sp.isActive,
            })),
          },
        },
        include: { sanpham: true },
      });

      // Cập nhật số lượng sản phẩm trong kho (giảm số lượng theo sp.sldat)
      for (const sp of data.sanpham) {
        await prisma.sanpham.update({
          where: { id: sp.id },
          data: {
            soluong: {
              decrement: parseFloat((sp.sldat ?? 0).toFixed(2)),
            },
          },
        });
      }

      // Tạo phiếu nhập kho tương tự create
      await prisma.phieuKho.create({
        data: {
          maphieu: `PN-${newDathang.id}`, // Mã phiếu nhập kho dựa trên ID đơn hàng
          khoId: DEFAUL_KHO_ID,        // Cập nhật khoId phù hợp
          type: 'nhap',                   // Loại phiếu nhập (nhập kho)
          ngay: newDathang.ngaynhan || new Date(),
          ghichu: `Phiếu nhập kho cho đơn hàng ${newDathang.title}`,
          sanpham: {
            create: data?.sanpham?.map((sp: any) => ({
              sanphamId: sp.id,
              sldat: sp.sldat,
              soluong: sp.sldat,
              ghichu: sp.ghichu,
            })),
          },
        },
      });

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
        const existingSP = await prisma.sanpham.findUnique({
          where: { id: oldSP.idSP },
        });
      
        if (existingSP) {
          await prisma.sanpham.update({
            where: { id: oldSP.idSP },
            data: {
              soluong: {
                decrement: oldSP.sldat|| 0,
              },
            },
          });
        } else {
          console.warn(`Skipping update: Product with id ${oldSP.idSP} not found.`);
        }
      }
  
      // Cập nhật đơn hàng mới
      const updatedDathang = await prisma.dathang.update({
        where: { id },
        data: {
          title: data.title,
          type: data.type,
          madncc: data.madncc,
          ngaynhan: data.ngaynhan ? new Date(data.ngaynhan) : new Date(),
          ghichu: data.ghichu,
          order: data.order,
          isActive: data.isActive,
          sanpham: {
            deleteMany: {}, // Xóa tất cả sản phẩm cũ trước khi thêm mới
            create: data.sanpham.map((sp: any) => ({
              idSP: sp.id,
              sldat: sp.sldat,
              slgiao: sp.slgiao,
              slnhan: sp.slnhan,
              ttdat: sp.ttdat  || 0,
              ttgiao: sp.ttgiao  || 0,
              ttnhan: sp.ttnhan || 0,
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
          where: { id: newSP.id },
          data: {
            soluong: {
              increment: newSP.sldat|| 0, // Cộng số lượng mới nhận
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