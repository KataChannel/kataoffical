import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class DonhangService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
  ) {}

  async getLastUpdatedDonhang(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.donhang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.donhang.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DON';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `DON${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: any) {
    try {
      const {khachhangId, total, status, order, donhangsanpham } = payload;
       const codeId = payload.codeId || await this.generateCodeId();
      // Check if codeId is unique
      const existingOrder = await this.prisma.donhang.findUnique({ where: { codeId } });
      if (existingOrder) {
        throw new ConflictException('Mã đơn hàng đã tồn tại');
      }

      // Check if khachhangId exists
      const khachhang = await this.prisma.khachhang.findUnique({ where: { id: khachhangId } });
      if (!khachhang) {
        throw new NotFoundException('Khách hàng không tồn tại');
      }

      // Check if all sanphamId exist
      for (const item of donhangsanpham) {
        const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
        if (!sanpham) {
          throw new NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
        }
      }

      // Generate order number
      const maxOrder = await this.prisma.donhang.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;

      const created = await this.prisma.donhang.create({
        data: {
          codeId,
          khachhangId,
          total,
          status: status || 'pending',
          order: order || newOrder,
          donhangsanpham: {
            create: donhangsanpham.map(item => ({
              sanphamId: item.sanphamId,
              sldat: item.sldat,
              slgiao: item.slgiao || 0,
              slnhan: item.slnhan || 0,
              slhuy: item.slhuy || 0,
              gia: item.gia,
            })),
          },
        },
        include: { donhangsanpham: true, khachhang: true },
      });

      this._SocketGateway.sendUpdate('donhang');
      return created;
    } catch (error) {
      throw error;
    }
  }

  async findBy(param: { isOne?: boolean; page?: number; limit?: number; [key: string]: any }) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.donhang.findFirst({
          where,
          include: {
            donhangsanpham: { include: { sanpham: true } },
            khachhang: true,
          },
          orderBy: { order: 'asc' },
        });
        if (!result) throw new NotFoundException('Đơn hàng không tồn tại');
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.donhang.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            donhangsanpham: { include: { sanpham: true } },
            khachhang: true,
          },
        }),
        this.prisma.donhang.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.donhang.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            donhangsanpham: { include: { sanpham: true } },
            khachhang: true,
          },
        }),
        this.prisma.donhang.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.donhang.findUnique({
        where: { id },
        include: {
          donhangsanpham: { include: { sanpham: true } },
          khachhang: true,
        },
      });
      if (!item) throw new NotFoundException('Đơn hàng không tồn tại');
      return item;
    } catch (error) {
      throw error;
    }
  }

  async update(id: string, payload: any) {
    try {
      const { codeId, khachhangId, donhangsanpham, khachhang, ...data } = payload;

      // Check if order exists
      const order = await this.prisma.donhang.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // Check if new codeId is unique (if provided)
      if (codeId && codeId !== order.codeId) {
        const existingOrder = await this.prisma.donhang.findUnique({ where: { codeId } });
        if (existingOrder) {
          throw new ConflictException('Mã đơn hàng đã tồn tại');
        }
      }

      // Check if khachhangId exists (if provided)
      if (khachhangId) {
        const khachhang = await this.prisma.khachhang.findUnique({ where: { id: khachhangId } });
        if (!khachhang) {
          throw new NotFoundException('Khách hàng không tồn tại');
        }
      }

      // Check if all sanphamId exist (if provided)
      if (donhangsanpham) {
        for (const item of donhangsanpham) {
          const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
          if (!sanpham) {
            throw new NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
          }
        }
      }

      const updated = await this.prisma.donhang.update({
        where: { id },
        data: {
          ...data,
          codeId: codeId || order.codeId,
          khachhangId: khachhangId || order.khachhangId,
          ...(donhangsanpham && {
            donhangsanpham: {
              deleteMany: {}, // Remove existing donhangsanpham
              create: donhangsanpham.map((item: {sanphamId: string; sldat: number; slgiao?: number; slnhan?: number; slhuy?: number; gia: number}) => ({
                sanphamId: item.sanphamId,
                sldat: item.sldat,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
                slhuy: item.slhuy || 0,
                gia: item.gia,
              })),
            },
          }),
        },
        include: { donhangsanpham: true, khachhang: true },
      });

      this._SocketGateway.sendUpdate('donhang');
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const order = await this.prisma.donhang.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }
      const deleted = await this.prisma.donhang.delete({ where: { id } });
      this._SocketGateway.sendUpdate('donhang');
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async reorderDonhangs(donhangIds: string[]) {
    try {
      for (let i = 0; i < donhangIds.length; i++) {
        await this.prisma.donhang.update({
          where: { id: donhangIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('donhang');
      return { status: 'success' };
    } catch (error) {
      throw error;
    }
  }
}