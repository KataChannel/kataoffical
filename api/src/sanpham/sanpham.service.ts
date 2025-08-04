import { Injectable, NotFoundException } from '@nestjs/common';
import * as moment from 'moment-timezone';
import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { SocketGateway } from 'src/socket.gateway';

@Injectable()
export class SanphamService {
  constructor(
    private readonly prisma: PrismaService,
    private _SocketGateway: SocketGateway,
    private _ErrorlogsService: ErrorlogsService,
    private _ImportdataService: ImportdataService,
  ) {}

  // async create(data: any) {
  //   return this.prisma.sanpham.create({ data });
  // }


  async findAllForSelect() {    
    try {
      const sanphams = await this.prisma.sanpham.findMany({
        select: {
          id: true,
          masp: true,
          title: true,
          },
          orderBy: { createdAt: 'desc' },
        });
      return { data: sanphams };
    } catch (error) {
      console.log('Error in findAllSanpham:', error);
      throw error;
    }
  }


  async getLastUpdated(): Promise<{ updatedAt: number }> {
    try {
      const lastUpdated = await this.prisma.sanpham.aggregate({
        _max: { updatedAt: true },
      });
      return {
        updatedAt: lastUpdated._max.updatedAt
          ? new Date(lastUpdated._max.updatedAt).getTime()
          : 0,
      };
    } catch (error) {
      throw error;
    }
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
    const importResults: {
      masp: any;
      status: string;
      action?: string;
      error?: string;
    }[] = [];
    // Dữ liệu gửi lên là list sản phẩm
    for (const sanpham of data) {
      try {
        let action = '';
        // Nếu không có masp thì gọi create để tự sinh masp
        if (!sanpham.masp) {
          await this.create(sanpham);
          action = 'created';
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
            action = 'updated';
          } else {
            // Nếu chưa tồn tại thì tạo mới
            await this.create(sanpham);
            action = 'created';
          }
        }
        importResults.push({
          masp: sanpham.masp || 'generated',
          status: 'success',
          action,
        });
      } catch (error) {
        // Lưu lại lịch sử lỗi import cho sản phẩm đang xử lý
        const importData = {
          caseDetail: {
            errorMessage: error.message,
            errorStack: error.stack,
            additionalInfo: 'Error during product import process',
          },
          order: 1, // cập nhật nếu cần theo thứ tự của bạn
          createdBy: 'system', // thay bằng ID người dùng thực nếu có
          title: `Import Sản Phẩm ${moment().format('HH:mm:ss DD/MM/YYYY')} `,
          type: 'sanpham',
        };
        this._ImportdataService.create(importData);
        importResults.push({
          masp: sanpham.masp || 'unknown',
          status: 'failed',
          error: error.message,
        });
      }
    }
    // Lưu lại lịch sử tổng hợp quá trình import
    const importData = {
      caseDetail: {
        additionalInfo: JSON.stringify(importResults),
      },
      order: 0,
      createdBy: 'system',
      title: `Import ${moment().format('HH:mm:ss DD/MM/YYYY')}`,
      type: 'sanpham',
    };
    this._ImportdataService.create(importData);
    return { message: 'Import completed', results: importResults };
  }

  async banggiamacdinh(item: { banggiaid: string }): Promise<{
    message: string;
    status: 'success' | 'error';
    updatedCount?: number;
  }> {
    try {
      const banggia = await this.prisma.banggia.findUnique({
        where: { id: item.banggiaid },
        include: { sanpham: true },
      });

      if (!banggia) {
        return {
          message: 'Bảng giá không tồn tại',
          status: 'error',
        };
      }

      // Set isDefault = true for selected banggia, false for others
      await this.prisma.$transaction([
        this.prisma.banggia.updateMany({
          data: { isDefault: false },
          where: { NOT: { id: item.banggiaid } },
        }),
        this.prisma.banggia.update({
          where: { id: item.banggiaid },
          data: { isDefault: true },
        }),
      ]);

      const updateOperations = banggia.sanpham.map((sp) =>
        this.prisma.sanpham.update({
          where: { id: sp.sanphamId },
          data: { giaban: sp.giaban },
        })
      );

      await this.prisma.$transaction(updateOperations);

      this._SocketGateway.sendSanphamUpdate();

      return {
        message: `Đã cập nhật giá bán cho ${banggia.sanpham.length} sản phẩm từ bảng giá mặc định`,
        status: 'success',
        updatedCount: banggia.sanpham.length,
      };
    } catch (error) {
      this._ErrorlogsService.logError('Lỗi cập nhật bảng giá mặc định', {
        error: error.message,
        banggiaid: item.banggiaid,
      });
      throw error;
    }
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
  // async findAll() {
  //   try {
  //     return await this.prisma.sanpham.findMany({
  //        orderBy: { createdAt: 'desc' },
  //     });
  //   } catch (error) {
  //     this._ErrorlogsService.logError('Lỗi lấy tất cả sản phẩm', {
  //       error: error.message,
  //     });
  //     throw error;
  //   }
  // }
  async findAll(query: any) {
    console.log('findAllSanpham query:', query);

    try {
      const {
        page,
        pageSize,
        sortBy,
        sortOrder,
        search,
        subtitle,
        priceMin,
        priceMax,
        category,
      } = query;
      const numericPage = Number(page || 1); // Default to page 1 if not provided
      const numericPageSize = Number(pageSize || 50);
      const skip = (numericPage - 1) * numericPageSize;
      const take = numericPageSize;
      const where: any = {};
      console.log(subtitle);

      // Xử lý lọc theo trường cụ thể
      if (subtitle) {
        where.subtitle = { contains: subtitle, mode: 'insensitive' };
      }
      if (category) {
        where.category = { equals: category, mode: 'insensitive' };
      }
      if (priceMin || priceMax) {
        where.price = {};
        if (priceMin) {
          where.price.gte = priceMin;
        }
        if (priceMax) {
          where.price.lte = priceMax;
        }
      }
      const orderBy: any = {};
      if (sortBy && sortOrder) {
        orderBy[sortBy] = sortOrder;
      } else {
        orderBy.createdAt = 'desc'; // Mặc định nếu không có sortBy/sortOrder
      }
      const [sanphams, total] = await this.prisma.$transaction([
        this.prisma.sanpham.findMany({
          where,
          skip,
          take,
          orderBy,
        }),
        this.prisma.sanpham.count({ where }),
      ]);

      return {
        data: sanphams,
        total: Number(total),
        page: numericPage,
        pageSize: numericPageSize,
        totalPages: Math.ceil(Number(total) / numericPageSize),
      };
    } catch (error) {
      console.log('Error in findAllSanpham:', error);
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
            (Number(tonkho.slton) -
              Number(tonkho.slchogiao) +
              Number(tonkho.slchonhap)) *
            (1 + Number(sanpham.haohut) / 100);
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
    const { page = 1, pageSize = 50, isOne, ...where } = param;
    const whereClause: any = {};
    if (where.id) {
      whereClause.id = where.id;
    }
    if (where.subtitle || where.name || where.title) {
      whereClause.OR = [];
      if (where.subtitle) {
        whereClause.OR.push({
          subtitle: { contains: where.subtitle, mode: 'insensitive' },
        });
      }
      if (where.name) {
        whereClause.OR.push({
          name: { contains: where.name, mode: 'insensitive' },
        });
      }
      if (where.title) {
        whereClause.OR.push({
          title: { contains: where.title, mode: 'insensitive' },
        });
      }
    }
    if (where.startDate || where.endDate) {
      whereClause.createdAt = {};
      if (where.startDate) whereClause.createdAt.gte = where.startDate;
      if (where.endDate) whereClause.createdAt.lte = where.endDate;
    }
    if (isOne) {
      const oneResult = await this.prisma.sanpham.findFirst({
        where: whereClause,
        include: { banggia: true },
        orderBy: { createdAt: 'desc' },
      });
      return oneResult;
    } else {
      const skip = (page - 1) * pageSize;
      const [sanphams, total] = await Promise.all([
        this.prisma.sanpham.findMany({
          where: whereClause,
          include: { banggia: true },
          skip,
          take: pageSize,
          orderBy: { createdAt: 'desc' },
        }),
        this.prisma.sanpham.count({ where: whereClause }),
      ]);

      return {
        data: sanphams,
        page,
        pageSize,
        total,
        pageCount: Math.ceil(total / pageSize),
      };
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
          set: Nhacungcap.map((nc: any) => ({ id: nc.id })), // Gán lại danh sách nhà cung cấp
        },
      },
    });
    // Send update notification
    this._SocketGateway.sendSanphamUpdate();
    return updatedSanpham;
  }

  async remove(id: string) {
    return this.prisma.$transaction(async (tx) => {
      // Disconnect Nhacungcap relations if applicable
      await tx.sanpham.update({
        where: { id },
        data: { Nhacungcap: { set: [] } },
      });
      // Delete related Donhangsanpham records
      await tx.donhangsanpham.deleteMany({
        where: { sanpham: { id } },
      });
      // Delete related Dathangsanpham records
      await tx.dathangsanpham.deleteMany({
        where: { sanpham: { id } },
      });
      // Delete related Banggiasanpham records
      await tx.banggiasanpham.deleteMany({
        where: { sanphamId: id },
      });
      // Delete the sanpham
      const deletedSanpham = await tx.sanpham.delete({ where: { id } });
      // Send update notification
      this._SocketGateway.sendSanphamUpdate();
      return deletedSanpham;
    });
  }
}
