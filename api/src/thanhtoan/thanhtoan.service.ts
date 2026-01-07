import { Injectable, NotFoundException } from '@nestjs/common';
import {
  LoaiThanhToan,
  StatusDonhang,
  TrangThaiThanhToan,
} from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import {
  CreateBulkThanhToanDto,
  CreateThanhToanDto,
  UpdateThanhToanDto,
} from './dto/thanhtoan.dto';

@Injectable()
export class ThanhToanService {
  constructor(private prisma: PrismaService) {}

  // Sinh mã thanh toán tự động
  async generateMaThanhToan(): Promise<string> {
    const prefix = 'TT';
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

    const lastThanhToan = await this.prisma.thanhToan.findFirst({
      where: {
        maThanhToan: {
          startsWith: `${prefix}${year}${month}`,
        },
      },
      orderBy: {
        maThanhToan: 'desc',
      },
    });

    let sequence = 1;
    if (lastThanhToan) {
      const lastSequence = parseInt(lastThanhToan.maThanhToan.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${month}${sequence.toString().padStart(4, '0')}`;
  }

  // Tạo thanh toán
  async create(createDto: CreateThanhToanDto, nguoiTaoId?: string) {
    const maThanhToan = await this.generateMaThanhToan();

    // Kiểm tra đơn hàng tồn tại
    const donhang = await this.prisma.donhang.findUnique({
      where: { id: createDto.donhangId },
    });

    if (!donhang) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    const data: any = {
      maThanhToan,
      donhangId: createDto.donhangId,
      soTien: createDto.soTien,
      loai: createDto.loai || LoaiThanhToan.KHONG_HOA_DON,
      phuongThuc: createDto.phuongThuc || 'TIEN_MAT',
      trangThai: TrangThaiThanhToan.DA_THANH_TOAN,
      ghichu: createDto.ghichu,
      nguoiTaoId,
    };

    if (createDto.ngayThanhToan) {
      data.ngayThanhToan = new Date(createDto.ngayThanhToan);
    }

    const result = await this.prisma.thanhToan.create({
      data,
      include: {
        donhang: {
          include: {
            khachhang: true,
          },
        },
      },
    });

    // Tự động kiểm tra và cập nhật trạng thái đơn hàng
    await this.checkAndUpdateOrderStatus(createDto.donhangId);

    return result;
  }

  // Thanh toán hàng loạt cho nhiều đơn hàng
  async createBulk(createBulkDto: CreateBulkThanhToanDto, nguoiTaoId?: string) {
    const results: any[] = [];

    // Sử dụng transaction để đảm bảo dữ liệu nhất quán
    return await this.prisma.$transaction(async (prisma) => {
      for (const item of createBulkDto.items) {
        const maThanhToan = await this.generateMaThanhToan(); // Note: This might need careful handling in transaction for unique codes

        const data: any = {
          maThanhToan,
          donhangId: item.donhangId,
          soTien: item.soTien,
          loai: createBulkDto.loai || LoaiThanhToan.KHONG_HOA_DON,
          phuongThuc: createBulkDto.phuongThuc || 'TIEN_MAT',
          trangThai: TrangThaiThanhToan.DA_THANH_TOAN,
          ghichu: item.ghichu || createBulkDto.ghichu,
          nguoiTaoId,
          ngayThanhToan: createBulkDto.ngayThanhToan
            ? new Date(createBulkDto.ngayThanhToan)
            : new Date(),
        };

        const tt = await prisma.thanhToan.create({
          data,
        });

        results.push(tt);

        // Cập nhật trạng thái đơn hàng (phiên bản dùng prisma nội bộ transaction)
        await this.checkAndUpdateOrderStatusInternal(item.donhangId, prisma);
      }

      return {
        success: true,
        count: results.length,
        items: results,
      };
    });
  }

  // Tự động cập nhật trạng thái đơn hàng thành 'hoanthanh' nếu đã thanh toán đủ
  private async checkAndUpdateOrderStatus(donhangId: string) {
    return this.checkAndUpdateOrderStatusInternal(donhangId, this.prisma);
  }

  private async checkAndUpdateOrderStatusInternal(
    donhangId: string,
    prisma: any,
  ) {
    // 1. Lấy thông tin đơn hàng và tổng tiền
    const donhang = await prisma.donhang.findUnique({
      where: { id: donhangId },
      select: { tongtien: true, status: true },
    });

    if (!donhang) return;

    // 2. Tính tổng tiền đã thanh toán
    const aggregate = await prisma.thanhToan.aggregate({
      where: {
        donhangId,
        trangThai: TrangThaiThanhToan.DA_THANH_TOAN,
      },
      _sum: {
        soTien: true,
      },
    });

    const tongDaThanhToan = Number(aggregate._sum.soTien || 0);
    const tongPhaiThanhToan = Number(donhang.tongtien);

    // 3. Nếu đã thanh toán đủ hoặc thừa, chuyển trạng thái sang hoanthanh
    // (Chỉ cập nhật nếu đơn chưa hoàn thành và không bị hủy)
    if (
      tongDaThanhToan >= tongPhaiThanhToan &&
      donhang.status !== StatusDonhang.hoanthanh &&
      donhang.status !== StatusDonhang.huy
    ) {
      await prisma.donhang.update({
        where: { id: donhangId },
        data: { status: StatusDonhang.hoanthanh },
      });
    }
  }

  // Lấy danh sách thanh toán
  async findAll(filters?: {
    donhangId?: string;
    loai?: LoaiThanhToan;
    trangThai?: TrangThaiThanhToan;
    tuNgay?: Date;
    denNgay?: Date;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 20, ...where } = filters || {};
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (where.donhangId) {
      whereClause.donhangId = where.donhangId;
    }

    if (where.loai) {
      whereClause.loai = where.loai;
    }

    if (where.trangThai) {
      whereClause.trangThai = where.trangThai;
    }

    if (where.tuNgay || where.denNgay) {
      whereClause.ngayThanhToan = {};
      if (where.tuNgay) {
        whereClause.ngayThanhToan.gte = where.tuNgay;
      }
      if (where.denNgay) {
        whereClause.ngayThanhToan.lte = where.denNgay;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.thanhToan.findMany({
        where: whereClause,
        include: {
          donhang: {
            include: {
              khachhang: true,
            },
          },
        },
        orderBy: {
          ngayThanhToan: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.thanhToan.count({ where: whereClause }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Lấy chi tiết thanh toán
  async findOne(id: string) {
    const thanhToan = await this.prisma.thanhToan.findUnique({
      where: { id },
      include: {
        donhang: {
          include: {
            khachhang: true,
            sanpham: {
              include: {
                sanpham: true,
              },
            },
          },
        },
      },
    });

    if (!thanhToan) {
      throw new NotFoundException(`Không tìm thấy thanh toán với ID: ${id}`);
    }

    return thanhToan;
  }

  // Cập nhật thanh toán
  async update(id: string, updateDto: UpdateThanhToanDto) {
    await this.findOne(id);

    const result = await this.prisma.thanhToan.update({
      where: { id },
      data: updateDto,
      include: {
        donhang: {
          include: {
            khachhang: true,
          },
        },
      },
    });

    // Kiểm tra lại trạng thái đơn hàng sau khi cập nhật số tiền
    if (result.donhangId) {
      await this.checkAndUpdateOrderStatus(result.donhangId);
    }

    return result;
  }

  // Xóa thanh toán
  async remove(id: string) {
    await this.findOne(id);

    await this.prisma.thanhToan.delete({
      where: { id },
    });

    return { success: true, message: 'Đã xóa thanh toán' };
  }

  // Lấy tổng thanh toán theo đơn hàng
  async getTongThanhToanByDonhang(donhangId: string) {
    const result = await this.prisma.thanhToan.aggregate({
      where: {
        donhangId,
        trangThai: TrangThaiThanhToan.DA_THANH_TOAN,
      },
      _sum: {
        soTien: true,
      },
    });

    return result._sum.soTien || 0;
  }

  // Báo cáo thanh toán theo thời gian
  async baoCaoThanhToan(tuNgay: Date, denNgay: Date) {
    const thanhToanList = await this.prisma.thanhToan.findMany({
      where: {
        ngayThanhToan: {
          gte: tuNgay,
          lte: denNgay,
        },
        trangThai: TrangThaiThanhToan.DA_THANH_TOAN,
      },
    });

    const tongTien = thanhToanList.reduce(
      (sum, tt) => sum + Number(tt.soTien),
      0,
    );

    const theoLoai = {
      coHoaDon: thanhToanList
        .filter((tt) => tt.loai === LoaiThanhToan.CO_HOA_DON)
        .reduce((sum, tt) => sum + Number(tt.soTien), 0),
      khongHoaDon: thanhToanList
        .filter((tt) => tt.loai === LoaiThanhToan.KHONG_HOA_DON)
        .reduce((sum, tt) => sum + Number(tt.soTien), 0),
      tongHop: thanhToanList
        .filter((tt) => tt.loai === LoaiThanhToan.TONG_HOP)
        .reduce((sum, tt) => sum + Number(tt.soTien), 0),
    };

    return {
      tuNgay,
      denNgay,
      tongTien,
      soGiaoDich: thanhToanList.length,
      theoLoai,
    };
  }
}
