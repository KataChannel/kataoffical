import { Injectable, NotFoundException, ConflictException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class DathangService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
  ) {}

  async getLastUpdatedDathang(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.dathang.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.dathang.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'DATH';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `DATH${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      throw error;
    }
  }

  async create(payload: any) {
    try {
      const {nhacungcapId, total, status, order, dathangsanpham } = payload;
       const codeId = payload.codeId || await this.generateCodeId();
      // Check if codeId is unique
      const existingOrder = await this.prisma.dathang.findUnique({ where: { codeId } });
      if (existingOrder) {
        throw new ConflictException('Mã đơn hàng đã tồn tại');
      }

      // Check if nhacungcapId exists
      const nhacungcap = await this.prisma.nhacungcap.findUnique({ where: { id: nhacungcapId } });
      if (!nhacungcap) {
        throw new NotFoundException('Khách hàng không tồn tại');
      }

      // Check if all sanphamId exist
      for (const item of dathangsanpham) {
        const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
        if (!sanpham) {
          throw new NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
        }
      }

      // Generate order number
      const maxOrder = await this.prisma.dathang.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;

      const created = await this.prisma.dathang.create({
        data: {
          codeId,
          nhacungcapId,
          total,
          status: status || 'pending',
          order: order || newOrder,
          dathangsanpham: {
            create: dathangsanpham.map(item => ({
              sanphamId: item.sanphamId,
              sldat: item.sldat,
              slgiao: item.slgiao || 0,
              slnhan: item.slnhan || 0,
              slhuy: item.slhuy || 0,
              giaban: item.giaban,
            })),
          },
        },
        include: { dathangsanpham: true, nhacungcap: true },
      });

      this._SocketGateway.sendUpdate('dathang');
      return created;
    } catch (error) {
      throw error;
    }
  }

  async findBy(param: { isOne?: boolean; page?: number; limit?: number; [key: string]: any }) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.dathang.findFirst({
          where,
          include: {
            dathangsanpham: { include: { sanpham: true } },
            nhacungcap: true,
          },
          orderBy: { order: 'asc' },
        });
        if (!result) throw new NotFoundException('Đơn hàng không tồn tại');
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.dathang.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            dathangsanpham: { include: { sanpham: true } },
            nhacungcap: true,
          },
        }),
        this.prisma.dathang.count({ where }),
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
        this.prisma.dathang.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            dathangsanpham: { include: { sanpham: true } },
            nhacungcap: true,
          },
        }),
        this.prisma.dathang.count(),
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
      const item = await this.prisma.dathang.findUnique({
        where: { id },
        include: {
          dathangsanpham: { include: { sanpham: true } },
          nhacungcap: true,
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
      const { codeId, nhacungcapId, dathangsanpham, nhacungcap, ...data } = payload;

      // Check if order exists
      const order = await this.prisma.dathang.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }

      // Check if new codeId is unique (if provided)
      if (codeId && codeId !== order.codeId) {
        const existingOrder = await this.prisma.dathang.findUnique({ where: { codeId } });
        if (existingOrder) {
          throw new ConflictException('Mã đơn hàng đã tồn tại');
        }
      }

      // Check if nhacungcapId exists (if provided)
      if (nhacungcapId) {
        const nhacungcap = await this.prisma.nhacungcap.findUnique({ where: { id: nhacungcapId } });
        if (!nhacungcap) {
          throw new NotFoundException('Khách hàng không tồn tại');
        }
      }

      // Check if all sanphamId exist (if provided)
      if (dathangsanpham) {
        for (const item of dathangsanpham) {
          const sanpham = await this.prisma.sanpham.findUnique({ where: { id: item.sanphamId } });
          if (!sanpham) {
            throw new NotFoundException(`Sản phẩm với ID ${item.sanphamId} không tồn tại`);
          }
        }
      }

      const updated = await this.prisma.dathang.update({
        where: { id },
        data: {
          ...data,
          codeId: codeId || order.codeId,
          nhacungcapId: nhacungcapId || order.nhacungcapId,
          ...(dathangsanpham && {
            dathangsanpham: {
              deleteMany: {}, // Remove existing dathangsanpham
              create: dathangsanpham.map((item: {sanphamId: string; sldat: number; slgiao?: number; slnhan?: number; slhuy?: number; giaban: number}) => ({
                sanphamId: item.sanphamId,
                sldat: item.sldat,
                slgiao: item.slgiao || 0,
                slnhan: item.slnhan || 0,
                slhuy: item.slhuy || 0,
                giaban: item.giaban,
              })),
            },
          }),
        },
        include: { dathangsanpham: true, nhacungcap: true },
      });

      this._SocketGateway.sendUpdate('dathang');
      return updated;
    } catch (error) {
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const order = await this.prisma.dathang.findUnique({ where: { id } });
      if (!order) {
        throw new NotFoundException('Đơn hàng không tồn tại');
      }
      const deleted = await this.prisma.dathang.delete({ where: { id } });
      this._SocketGateway.sendUpdate('dathang');
      return deleted;
    } catch (error) {
      throw error;
    }
  }

  async reorderDathangs(dathangIds: string[]) {
    try {
      for (let i = 0; i < dathangIds.length; i++) {
        await this.prisma.dathang.update({
          where: { id: dathangIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('dathang');
      return { status: 'success' };
    } catch (error) {
      throw error;
    }
  }
}