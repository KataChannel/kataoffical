import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { TrangThaiHoaDon } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { CreateHoaDonDto, UpdateHoaDonDto } from './dto/hoadon.dto';

@Injectable()
export class HoaDonService {
  constructor(private prisma: PrismaService) {}

  // Sinh số hóa đơn tự động
  async generateSoHoaDon(): Promise<string> {
    const prefix = 'HD';
    const year = new Date().getFullYear().toString();
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');
    
    const lastHoaDon = await this.prisma.hoaDonDienTu.findFirst({
      where: {
        soHoaDon: {
          startsWith: `${prefix}${year}${month}`,
        },
      },
      orderBy: {
        soHoaDon: 'desc',
      },
    });

    let sequence = 1;
    if (lastHoaDon) {
      const lastSequence = parseInt(lastHoaDon.soHoaDon.slice(-6));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${month}${sequence.toString().padStart(6, '0')}`;
  }

  // Tạo hóa đơn điện tử
  async create(createDto: CreateHoaDonDto, nguoiTaoId?: string) {
    const soHoaDon = await this.generateSoHoaDon();

    // Kiểm tra đơn hàng tồn tại
    const donhang = await this.prisma.donhang.findUnique({
      where: { id: createDto.donhangId },
      include: {
        sanpham: true,
      },
    });

    if (!donhang) {
      throw new NotFoundException('Không tìm thấy đơn hàng');
    }

    // Tính tổng tiền
    const tongTien = Number(donhang.tongtien);
    const tongVAT = Number(donhang.tongvat);
    const tongThanhToan = tongTien + tongVAT;

    const data: any = {
      soHoaDon,
      donhangId: createDto.donhangId,
      mauSo: createDto.mauSo || '01GTKT',
      kyHieu: createDto.kyHieu || 'AA/25E',
      tongTien,
      tongVAT,
      tongThanhToan,
      trangThai: TrangThaiHoaDon.NHAP,
      ghichu: createDto.ghichu,
      nguoiTaoId,
    };

    // Cập nhật đơn hàng đánh dấu đã xuất hóa đơn
    await this.prisma.donhang.update({
      where: { id: createDto.donhangId },
      data: { xuatHoaDon: true },
    });

    return this.prisma.hoaDonDienTu.create({
      data,
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
  }

  // Lấy danh sách hóa đơn
  async findAll(filters?: {
    donhangId?: string;
    trangThai?: TrangThaiHoaDon;
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

    if (where.trangThai) {
      whereClause.trangThai = where.trangThai;
    }

    if (where.tuNgay || where.denNgay) {
      whereClause.ngayLap = {};
      if (where.tuNgay) {
        whereClause.ngayLap.gte = where.tuNgay;
      }
      if (where.denNgay) {
        whereClause.ngayLap.lte = where.denNgay;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.hoaDonDienTu.findMany({
        where: whereClause,
        include: {
          donhang: {
            include: {
              khachhang: true,
            },
          },
        },
        orderBy: {
          ngayLap: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.hoaDonDienTu.count({ where: whereClause }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Lấy chi tiết hóa đơn
  async findOne(id: string) {
    const hoaDon = await this.prisma.hoaDonDienTu.findUnique({
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

    if (!hoaDon) {
      throw new NotFoundException(`Không tìm thấy hóa đơn với ID: ${id}`);
    }

    return hoaDon;
  }

  // Cập nhật hóa đơn
  async update(id: string, updateDto: UpdateHoaDonDto) {
    const hoaDon = await this.findOne(id);

    // Chỉ cho phép cập nhật hóa đơn ở trạng thái NHAP
    if (hoaDon.trangThai !== TrangThaiHoaDon.NHAP) {
      throw new BadRequestException('Chỉ có thể cập nhật hóa đơn ở trạng thái NHAP');
    }

    return this.prisma.hoaDonDienTu.update({
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
  }

  // Xóa hóa đơn
  async remove(id: string) {
    const hoaDon = await this.findOne(id);

    // Chỉ cho phép xóa hóa đơn ở trạng thái NHAP hoặc HUY
    if (hoaDon.trangThai !== TrangThaiHoaDon.NHAP && hoaDon.trangThai !== TrangThaiHoaDon.HUY) {
      throw new BadRequestException('Chỉ có thể xóa hóa đơn ở trạng thái NHAP hoặc HUY');
    }

    // Cập nhật đơn hàng
    await this.prisma.donhang.update({
      where: { id: hoaDon.donhangId },
      data: { xuatHoaDon: false },
    });

    await this.prisma.hoaDonDienTu.delete({
      where: { id },
    });

    return { success: true, message: 'Đã xóa hóa đơn' };
  }

  // Duyệt hóa đơn (xuất hóa đơn)
  async duyet(id: string, nguoiDuyetId?: string) {
    const hoaDon = await this.findOne(id);

    if (hoaDon.trangThai !== TrangThaiHoaDon.NHAP) {
      throw new BadRequestException('Chỉ có thể duyệt hóa đơn ở trạng thái NHAP');
    }

    return this.prisma.hoaDonDienTu.update({
      where: { id },
      data: {
        trangThai: TrangThaiHoaDon.DA_XUAT,
        nguoiDuyetId,
        ngayDuyet: new Date(),
      },
    });
  }

  // Hủy hóa đơn
  async huy(id: string) {
    const hoaDon = await this.findOne(id);

    if (hoaDon.trangThai === TrangThaiHoaDon.DA_XUAT) {
      throw new BadRequestException('Không thể hủy hóa đơn đã xuất');
    }

    return this.prisma.hoaDonDienTu.update({
      where: { id },
      data: {
        trangThai: TrangThaiHoaDon.HUY,
      },
    });
  }
}
