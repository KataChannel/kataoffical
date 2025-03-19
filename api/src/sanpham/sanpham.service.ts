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
      this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', { error: error.message });
      throw error;
    }
  }

  async findOne(id: string) {
    const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
    if (!sanpham) throw new NotFoundException('Sanpham not found');
    return sanpham;
  }

  async update(id: string, data: any) {
    if(data.order){
      const { order, ...rest } = data;
      await this.prisma.sanpham.update({ where: { id }, data: rest });
      await this.prisma.sanpham.update({ where: { id }, data: { order } });
    }
    this._SocketGateway.sendSanphamUpdate();
    return this.prisma.sanpham.update({ where: { id }, data });
  }

  async remove(id: string) {
    return this.prisma.sanpham.delete({ where: { id } });
  }
}