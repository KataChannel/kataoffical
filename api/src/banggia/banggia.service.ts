import { Injectable, NotFoundException, ConflictException, BadRequestException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class BanggiaService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogService: ErrorlogService,
  ) {}

  async getLastUpdatedBanggia(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.banggia.aggregate({
        _max: { updatedAt: true },
      });
      return { updatedAt: lastUpdated._max.updatedAt ? new Date(lastUpdated._max.updatedAt).getTime() : 0 };
    } catch (error) {
      this._ErrorlogService.logError('getLastUpdatedBanggia', error);
      throw error;
    }
  }

  async generateCodeId(): Promise<string> {
    try {
      const latest = await this.prisma.banggia.findFirst({
        orderBy: { codeId: 'desc' },
      });
      let nextNumber = 1;
      if (latest && latest.codeId) {
        const prefix = 'BG';
        const match = latest.codeId.match(new RegExp(prefix + '(\\d+)'));
        if (match) {
          nextNumber = parseInt(match[1]) + 1;
        }
      }
      return `BG${nextNumber.toString().padStart(5, '0')}`;
    } catch (error) {
      this._ErrorlogService.logError('generatebanggiaCodeId', error);
      throw error;
    }
  }

  async validateDateRange(
    batdau: string | Date | undefined | null,
    ketthuc: string | Date | null | undefined,
    status: string,
    excludeId?: string,
  ) {
    if (status !== 'dangban') return; // Only validate date overlaps for dangban

    const start = batdau ? new Date(batdau) : new Date();
    const end = ketthuc ? new Date(ketthuc) : null;

    if (end && start > end) {
      throw new BadRequestException('Ngày bắt đầu phải trước ngày kết thúc');
    }

    const overlapping = await this.prisma.banggia.findMany({
      where: {
        status: 'dangban',
        id: { not: excludeId },
        OR: [
          {
            AND: [
              { batdau: { lte: end || new Date('9999-12-31') } },
              { ketthuc: { gte: start } },
            ],
          },
          {
            AND: [
              { batdau: { lte: end || new Date('9999-12-31') } },
              { ketthuc: null },
            ],
          },
          {
            AND: [
              { batdau: { gte: start } },
              { ketthuc: { lte: end || new Date('9999-12-31') } },
            ],
          },
        ],
      },
    });

    if (overlapping.length > 0) {
      throw new ConflictException('Đã tồn tại bảng giá đang bán có thời gian áp dụng trùng lặp');
    }
  }

  async create(payload: any) {
    try {
      console.log('Creating banggia with payload:', payload);
      const { title, giaban, status, batdau, ketthuc, order, sanphamIds, khachhangIds } = payload;
      const codeId = payload.codeId || await this.generateCodeId();
      console.log('Generated codeId:', codeId);

      // Check if codeId is unique
      const existingPrice = await this.prisma.banggia.findUnique({ where: { codeId } });
      if (existingPrice) {
        throw new ConflictException('Mã bảng giá đã tồn tại');
      }

      // Validate sanphamIds if provided
      if (sanphamIds?.length) {
        for (const id of sanphamIds) {
          const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
          if (!sanpham) {
            throw new NotFoundException(`Sản phẩm với ID ${id} không tồn tại`);
          }
        }
      }

      // Validate khachhangIds if provided
      if (khachhangIds?.length) {
        for (const id of khachhangIds) {
          const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
          if (!khachhang) {
            throw new NotFoundException(`Khách hàng với ID ${id} không tồn tại`);
          }
        }
      }

      // Validate date range for dangban
      await this.validateDateRange(batdau, ketthuc, status || 'baogia');

      // Generate order number
      const maxOrder = await this.prisma.banggia.aggregate({
        _max: { order: true },
      });
      const newOrder = (maxOrder._max?.order || 0) + 1;
      console.log('New order number:', newOrder);

      const created = await this.prisma.banggia.create({
        data: {
          codeId,
          title,
          status: status || 'baogia',
          batdau: batdau ? new Date(batdau) : new Date(),
          ketthuc: ketthuc ? new Date(ketthuc) : null,
          order: order || newOrder,
          sanpham: sanphamIds?.length
            ? {
                create: sanphamIds.map((sanphamId: string) => ({
                  sanphamId,
                })),
              }
            : undefined,
          khachhang: khachhangIds?.length
            ? {
                create: khachhangIds.map((khachhangId: string) => ({
                  khachhangId,
                })),
              }
            : undefined,
        },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: { include: { khachhang: true } },
        },
      });

      this._SocketGateway.sendUpdate('banggia');
      return created;
    } catch (error) {
      this._ErrorlogService.logError('createbanggia', error);
      throw error;
    }
  }

  async findBy(param: { isOne?: boolean; page?: number; limit?: number; [key: string]: any }) {
    try {
      const { isOne, page = 1, limit = 20, ...where } = param;
      if (isOne) {
        const result = await this.prisma.banggia.findFirst({
          where,
          include: {
            sanpham: { include: { sanpham: true } },
            khachhang: { include: { khachhang: true } },
          },
          orderBy: { order: 'asc' },
        });
        if (!result) throw new NotFoundException('Bảng giá không tồn tại');
        return result;
      }
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.banggia.findMany({
          where,
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            sanpham: { include: { sanpham: true } },
            khachhang: { include: { khachhang: true } },
          },
        }),
        this.prisma.banggia.count({ where }),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findBybanggia', error);
      throw error;
    }
  }

  async findAll(page: number = 1, limit: number = 20) {
    try {
      const skip = (page - 1) * limit;
      const [data, total] = await Promise.all([
        this.prisma.banggia.findMany({
          skip,
          take: limit,
          orderBy: { order: 'asc' },
          include: {
            sanpham: { include: { sanpham: true } },
            khachhang: { include: { khachhang: true } },
          },
        }),
        this.prisma.banggia.count(),
      ]);
      return {
        data,
        total,
        page,
        pageCount: Math.ceil(total / limit),
      };
    } catch (error) {
      this._ErrorlogService.logError('findAllbanggia', error);
      throw error;
    }
  }

  async findOne(id: string) {
    try {
      const item = await this.prisma.banggia.findUnique({
        where: { id },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: { include: { khachhang: true } },
        },
      });
      if (!item) throw new NotFoundException('Bảng giá không tồn tại');
      return item;
    } catch (error) {
      this._ErrorlogService.logError('findOnebanggia', error);
      throw error;
    }
  }

  async approve(id: string) {
    try {
      const banggia = await this.prisma.banggia.findUnique({
        where: { id },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: { include: { khachhang: true } },
        },
      });
      if (!banggia) {
        throw new NotFoundException('Bảng giá không tồn tại');
      }
      if (banggia.status === 'dangban') {
        throw new ConflictException('Bảng giá đã ở trạng thái đang bán');
      }

      // Validate date range
      await this.validateDateRange(banggia.batdau, banggia.ketthuc, 'dangban', id);

      const updated = await this.prisma.banggia.update({
        where: { id },
        data: { status: 'dangban' },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: { include: { khachhang: true } },
        },
      });

      this._SocketGateway.sendUpdate('banggia');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('approvebanggia', error);
      throw error;
    }
  }

  async update(id: string, payload: any) {
    try {
      const { codeId, title, status, batdau, ketthuc, order, sanphamIds, khachhangIds } = payload;

      // Check if price exists
      const banggia = await this.prisma.banggia.findUnique({ where: { id } });
      if (!banggia) {
        throw new NotFoundException('Bảng giá không tồn tại');
      }

      // Check if new codeId is unique (if provided)
      if (codeId && codeId !== banggia.codeId) {
        const existingPrice = await this.prisma.banggia.findUnique({ where: { codeId } });
        if (existingPrice) {
          throw new ConflictException('Mã bảng giá đã tồn tại');
        }
      }

      // Validate sanphamIds if provided
      if (sanphamIds?.length) {
        for (const id of sanphamIds) {
          const sanpham = await this.prisma.sanpham.findUnique({ where: { id } });
          if (!sanpham) {
            throw new NotFoundException(`Sản phẩm với ID ${id} không tồn tại`);
          }
        }
      }

      // Validate khachhangIds if provided
      if (khachhangIds?.length) {
        for (const id of khachhangIds) {
          const khachhang = await this.prisma.khachhang.findUnique({ where: { id } });
          if (!khachhang) {
            throw new NotFoundException(`Khách hàng với ID ${id} không tồn tại`);
          }
        }
      }

      // Validate date range
      await this.validateDateRange(
        batdau || banggia.batdau,
        ketthuc || banggia.ketthuc,
        status || banggia.status,
        id,
      );

      const updated = await this.prisma.banggia.update({
        where: { id },
        data: {
          codeId: codeId || banggia.codeId,
          title: title || banggia.title,
          status: status || banggia.status,
          batdau: batdau ? new Date(batdau) : banggia.batdau,
          ketthuc: ketthuc ? new Date(ketthuc) : banggia.ketthuc,
          order: order || banggia.order,
          sanpham: sanphamIds?.length
            ? {
                deleteMany: {}, // Remove existing mappings
                create: sanphamIds.map((sanphamId: string) => ({
                  sanphamId,
                })),
              }
            : undefined,
          khachhang: khachhangIds?.length
            ? {
                deleteMany: {}, // Remove existing mappings
                create: khachhangIds.map((khachhangId: string) => ({
                  khachhangId,
                })),
              }
            : undefined,
        },
        include: {
          sanpham: { include: { sanpham: true } },
          khachhang: { include: { khachhang: true } },
        },
      });

      this._SocketGateway.sendUpdate('banggia');
      return updated;
    } catch (error) {
      this._ErrorlogService.logError('updatebanggia', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const banggia = await this.prisma.banggia.findUnique({ where: { id } });
      if (!banggia) {
        throw new NotFoundException('Bảng giá không tồn tại');
      }
      const deleted = await this.prisma.banggia.delete({ where: { id } });
      this._SocketGateway.sendUpdate('banggia');
      return deleted;
    } catch (error) {
      this._ErrorlogService.logError('removebanggia', error);
      throw error;
    }
  }

  async reorderBanggias(banggiaIds: string[]) {
    try {
      for (let i = 0; i < banggiaIds.length; i++) {
        await this.prisma.banggia.update({
          where: { id: banggiaIds[i] },
          data: { order: i + 1 },
        });
      }
      this._SocketGateway.sendUpdate('banggia');
      return { status: 'success' };
    } catch (error) {
      this._ErrorlogService.logError('reorderBanggias', error);
      throw error;
    }
  }
}