import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class SanphamService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogsService: ErrorlogsService,
  ) {}

  // async create(data: any) {
  //   return this.prisma.sanpham.create({ data });
  // }
  async getLastUpdatedSanpham() {
    const lastUpdated = await this.prisma.sanpham.aggregate({
      _max: {
        updatedAt: true,
      },
    });
    return { updatedAt: lastUpdated._max.updatedAt || 0 };
  }
  async generateMaSP(): Promise<string> {
    // Lấy NCC mới nhất
    const latest = await this.prisma.sanpham.findFirst({
      orderBy: { masp: 'desc' },
    });

    // Nếu chưa có NCC nào, bắt đầu từ 1
    let nextNumber = 1;
    if (latest) {
      const match = latest.masp.match(/I1(\d+)/);
      if (match) {
        nextNumber = parseInt(match[1]) + 1;
      }
    }

    // Tạo mã mới dạng TG-NCC00001
    return `I1${nextNumber.toString().padStart(5, '0')}`;
  }

  async create(data: any) {
    // Check if the masp is provided, if not generate a new one
    data.masp = data.masp ? data.masp : await this.generateMaSP();

    // Check if the masp already exists in the database
    const existingSanpham = await this.prisma.sanpham.findUnique({
      where: { masp: data.masp },
    });

    if (existingSanpham) {
      // If masp already exists, return the existing entry
      return existingSanpham;
    }

    let newOrder: number;
    const maxOrder = await this.prisma.sanpham.aggregate({
      _max: { order: true },
    });
    newOrder = (maxOrder._max?.order || 0) + 1;

    // Create the new sanpham entry
    this._SocketGateway.sendSanphamUpdate();
    return this.prisma.sanpham.create({
      data: {
        ...data,
        order: newOrder,
      },
    });
  }

  async import(data: any[]) {
    // Dữ liệu gửi lên là list sản phẩm
    for (const sanpham of data) {
      // Nếu không có masp thì gọi create để tự sinh masp
      if (!sanpham.masp) {
        await this.create(sanpham);
      } else {
        // Tìm sản phẩm tồn tại dựa trên masp
        const existingSanpham = await this.prisma.sanpham.findUnique({
          where: { masp: sanpham.masp },
          select: { id: true },
        });
        if (existingSanpham) {
          // Nếu sản phẩm đã tồn tại thì cập nhật
          await this.prisma.sanpham.update({
            where: { id: existingSanpham.id },
            data: { ...sanpham },
          });
        } else {
          // Nếu chưa tồn tại thì tạo mới
          await this.create(sanpham);
        }
      }
    }
    return { message: 'Import completed' };
  }


  async reorderSanphams(sanphamIds: string[]) {
    // Update the order of each sanpham based on its position in the array
    for (let i = 0; i < sanphamIds.length; i++) {
      await this.prisma.sanpham.update({
        where: { id: sanphamIds[i] },
        data: { order: i + 1 },
      });
    }
  }
  async findAll() {
    try {
      return await this.prisma.sanpham.findMany();
    } catch (error) {
      this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', {
        error: error.message,
      });
      throw error;
    }
  }
  async nhucaudathang() {
    try {
      const sanphams = await this.prisma.sanpham.findMany();
      const tonkhos = await this.prisma.tonKho.findMany();
      const result = tonkhos.filter((tonkho: any) => {
        const sanpham = sanphams.find((sp: any) => sp.id === tonkho.sanphamId);
        if (sanpham) {
          const goiy =
            (Number(tonkho.slton) - Number(tonkho.slchogiao) + Number(tonkho.slchonhap))
            * (1 + Number(sanpham.haohut) / 100);
          goiy < 0;
          tonkho.goiy = goiy;
          return goiy < 0;
        }
        return false;
      });

      const combined = result.map((tonkho: any) => {
        const product = sanphams.find((sp) => sp.id === tonkho.sanphamId);
        return {
          ...product,
          slton: Number(tonkho.slton),
          slchogiao: Number(tonkho.slchogiao),
          slchonhap: Number(tonkho.slchonhap),
          goiy: Math.abs(Number(tonkho.goiy)),
        };
      });
      return combined;
    } catch (error) {
      this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', {
        error: error.message,
      });
      throw error;
    }
  }


  async findby(param: any) {
    try {
      const sanpham = await this.prisma.sanpham.findUnique({
        where: param,
      });
      return sanpham;
    } catch (error) {
      throw error;
    }
  }
  async findOne(id: string) {
    const sanpham = await this.prisma.sanpham.findUnique({
      where: { id },
      include: {
        Nhacungcap: true,
        Donhangsanpham: {
          include: {
            donhang: true,
          },
        },
        Dathangsanpham: {
          include: {
            dathang: true,
          },
        },
      },
    });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return {
      ...sanpham,
      Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
        createdAt: item.donhang.createdAt || null,
        madonhang: item.donhang.madonhang,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
      })),
      Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
        createdAt: item.dathang.createdAt || null,
        madncc: item.dathang.madncc,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
      })),
    };
  }
  async finby(id: string) {
    const sanpham = await this.prisma.sanpham.findUnique({
      where: { id },
      include: {
        Donhangsanpham: {
          include: {
            donhang: true,
          },
        },
        Dathangsanpham: {
          include: {
            dathang: true,
          },
        },
      },
    });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return {
      ...sanpham,
      Donhangsanpham: sanpham.Donhangsanpham.map((item) => ({
        createdAt: item.donhang.createdAt || null,
        madonhang: item.donhang.madonhang,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
      })),
      Dathangsanpham: sanpham.Dathangsanpham.map((item) => ({
        createdAt: item.dathang.createdAt || null,
        madncc: item.dathang.madncc,
        sldat: item.sldat || 0,
        slgiao: item.slgiao || 0,
        slnhan: item.slnhan || 0,
      })),
    };
  }

  async update(id: string, data: any) {
    const { Donhangsanpham, Dathangsanpham, Nhacungcap, ...rest } = data;
    const updatedSanpham = await this.prisma.sanpham.update({
      where: { id },
      data: {
        ...rest,
        Nhacungcap: {
          set: Nhacungcap.map((nc:any) => ({ id: nc.id })), // Gán lại danh sách nhà cung cấp
        },
      },
    });
    // Send update notification
    this._SocketGateway.sendSanphamUpdate();
    return updatedSanpham;
  }

  async remove(id: string) {
    return this.prisma.sanpham.delete({ where: { id } });
  }
}
