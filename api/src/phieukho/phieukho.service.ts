import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { convertXuatnhapton } from 'src/shared/utils/xuatnhapton.utils';
import { TimezoneUtilService } from '../shared/services/timezone-util.service';

@Injectable()
export class PhieukhoService {
  constructor(
    private readonly prisma: PrismaService,
    private _ImportdataService: ImportdataService,
    private readonly timezoneUtil: TimezoneUtilService,
  ) {}

  async generateNextOrderCode(type: any): Promise<string> {
    // Lấy mã đơn hàng gần nhất theo type nhap hoặc xuat
    const lastOrder = await this.prisma.phieuKho.findFirst({
      where: { type },
      orderBy: { createdAt: 'desc' },
    });
    // Mã mặc định cho từng loại
    let nextCode = type === 'nhap' ? 'PKNAA00001' : 'PKXAA00001';

    if (lastOrder && lastOrder.maphieu) {
      nextCode = this.incrementOrderCode(lastOrder.maphieu, type);
    }
    return nextCode;
  }

  private incrementOrderCode(orderCode: string, type: any): string {
    // Sử dụng prefix theo loại: PKN cho nhap, PKX cho xuat
    const prefix = type === 'nhap' ? 'PKN' : 'PKX';
    // Với cấu trúc mã: prefix (3 ký tự) + 2 chữ (AA -> ZZ) + 5 số (00001 -> 99999)
    const letters = orderCode.slice(3, 5);
    const numbers = parseInt(orderCode.slice(5), 10);

    let newLetters = letters;
    let newNumbers = numbers + 1;

    if (newNumbers > 99999) {
      newNumbers = 1; // Reset số về 00001
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
      orderBy: { createdAt: 'desc' },
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

    console.log(tranData);
    // return convertXuatnhapton(tranData);
    return tranData
  }



  async findAll() {
    const phieuKhos = await this.prisma.phieuKho.findMany({
      where: {},
      include: {
      sanpham: { include: { sanpham: true } },
      kho: true,
      },
      orderBy: { createdAt: 'desc' },
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
    return this.prisma.$transaction(async (prisma) => {
      let attempts = 0;
      let newPhieuKho: any;
      while (attempts < 3) {
        const maphieukho = await this.generateNextOrderCode(data.type);
        try {
          newPhieuKho = await prisma.phieuKho.create({
            data: {
              title: data.title,  
              maphieu: maphieukho,
              ngay: new Date(data.ngay),
              type: data.type,
              isChotkho: data.isChotkho || false,
              khoId: data.khoId || "4cc01811-61f5-4bdc-83de-a493764e9258",
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
          break;
        } catch (error: any) {
          await this._ImportdataService.create({
            caseDetail: {
              errorMessage: error.message,
              errorStack: error.stack,
              additionalInfo: 'Error during import process',
            },
            order: 1, // Cập nhật nếu cần theo thứ tự của bạn
            createdBy: 'system', // Thay bằng ID người dùng thực nếu có
            title: `Import Khách Hàng ${new Date().toLocaleString('vi-VN')}`,
            type: 'sanpham',
          });
          if (
            error.code === 'P2002' &&
            error.meta &&
            error.meta.target &&
            error.meta.target.includes('maphieu')
          ) {
            attempts++;
            console.log(`Duplicate maphieu encountered. Retrying attempt ${attempts}...`);
            if (attempts >= 3) {
              throw error;
            }
          } else {
            throw error;
          }
        }
      }
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

      // Điều chỉnh tồn kho (tonkho) ngược lại theo loại phiếu: 
      // Nếu là phiếu nhập thì giảm tồn, nếu là phiếu xuất thì tăng tồn
      for (const item of phieuKho.sanpham) {
        await prisma.tonKho.update({
          where: { sanphamId: item.sanphamId },
          data: {
            slton:
              phieuKho.type === 'nhap'
                ? { decrement: item.soluong ?? 0 }
                : { increment: item.soluong ?? 0 },
          },
        });
      }

      await prisma.phieuKhoSanpham.deleteMany({ where: { phieuKhoId: id } });
      return prisma.phieuKho.delete({ where: { id } });
    });
  }
}
