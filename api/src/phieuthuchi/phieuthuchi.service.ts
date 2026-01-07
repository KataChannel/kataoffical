import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { LoaiPhieuThuChi, TrangThaiPhieu } from '@prisma/client';
import { PrismaService } from 'prisma/prisma.service';
import { PaymentProposalService } from '../payment-proposal/payment-proposal.service';
import {
  CreatePhieuThuChiDto,
  UpdatePhieuThuChiDto,
} from './dto/phieuthuchi.dto';

@Injectable()
export class PhieuThuChiService {
  constructor(
    private prisma: PrismaService,
    private paymentProposalService: PaymentProposalService,
  ) {}

  // Sinh mã phiếu tự động
  async generateMaPhieu(loai: LoaiPhieuThuChi): Promise<string> {
    const prefix = loai === LoaiPhieuThuChi.THU ? 'PTH' : 'PTC';
    const year = new Date().getFullYear().toString().slice(-2);
    const month = (new Date().getMonth() + 1).toString().padStart(2, '0');

    // Tìm số thứ tự lớn nhất trong tháng
    const lastPhieu = await this.prisma.phieuThuChi.findFirst({
      where: {
        maPhieu: {
          startsWith: `${prefix}${year}${month}`,
        },
      },
      orderBy: {
        maPhieu: 'desc',
      },
    });

    let sequence = 1;
    if (lastPhieu) {
      const lastSequence = parseInt(lastPhieu.maPhieu.slice(-4));
      sequence = lastSequence + 1;
    }

    return `${prefix}${year}${month}${sequence.toString().padStart(4, '0')}`;
  }

  // Tạo phiếu thu chi
  async create(createDto: CreatePhieuThuChiDto, nguoiTaoId?: string) {
    const maPhieu = await this.generateMaPhieu(createDto.loai);

    const data: any = {
      maPhieu,
      loai: createDto.loai,
      soTien: createDto.soTien,
      doiTuong: createDto.doiTuong,
      phuongThuc: createDto.phuongThuc || 'TIEN_MAT',
      coHoaDon: createDto.coHoaDon || false,
      trangThai: TrangThaiPhieu.NHAP,
      ghichu: createDto.ghichu,
      lydo: createDto.lydo,
      nguoiTaoId,
    };

    if (createDto.ngay) {
      data.ngay = new Date(createDto.ngay);
    }

    if (createDto.donhangId) {
      data.donhangId = createDto.donhangId;
    }

    if (createDto.dathangId) {
      data.dathangId = createDto.dathangId;
    }

    if (createDto.doiTuongId) {
      data.doiTuongId = createDto.doiTuongId;
    }

    if (createDto.tenDoiTuong) {
      data.tenDoiTuong = createDto.tenDoiTuong;
    }

    try {
      return await this.prisma.$transaction(async (tx) => {
        const phieu = await tx.phieuThuChi.create({
          data,
          include: {
            donhang: {
              include: {
                khachhang: true,
              },
            },
            dathang: true,
          },
        });

        // Liên kết với Chứng từ công nợ (Bán hàng)
        if (createDto.arDocumentItemId) {
          await tx.aRDocumentItem.update({
            where: { id: createDto.arDocumentItemId },
            data: { receiptVoucherId: phieu.id },
          });
        }

        // Liên kết với Đề xuất thanh toán (Mua hàng)
        if (createDto.paymentProposalSupplierId) {
          await tx.paymentProposalSupplier.update({
            where: { id: createDto.paymentProposalSupplierId },
            data: { paymentVoucherId: phieu.id },
          });
        }

        return phieu;
      });
    } catch (error) {
      console.error('Error creating PhieuThuChi:', error);
      throw error;
    }
  }

  // Lấy danh sách phiếu thu chi
  async findAll(filters?: {
    loai?: LoaiPhieuThuChi;
    trangThai?: TrangThaiPhieu;
    doiTuong?: string;
    tuNgay?: Date;
    denNgay?: Date;
    page?: number;
    limit?: number;
  }) {
    const { page = 1, limit = 20, ...where } = filters || {};
    const skip = (page - 1) * limit;

    const whereClause: any = {};

    if (where.loai) {
      whereClause.loai = where.loai;
    }

    if (where.trangThai) {
      whereClause.trangThai = where.trangThai;
    }

    if (where.doiTuong) {
      whereClause.doiTuong = where.doiTuong;
    }

    if (where.tuNgay || where.denNgay) {
      whereClause.ngay = {};
      if (where.tuNgay) {
        whereClause.ngay.gte = where.tuNgay;
      }
      if (where.denNgay) {
        whereClause.ngay.lte = where.denNgay;
      }
    }

    const [data, total] = await Promise.all([
      this.prisma.phieuThuChi.findMany({
        where: whereClause,
        include: {
          donhang: {
            include: {
              khachhang: true,
            },
          },
          dathang: true,
        },
        orderBy: {
          ngay: 'desc',
        },
        skip,
        take: limit,
      }),
      this.prisma.phieuThuChi.count({ where: whereClause }),
    ]);

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  // Lấy chi tiết phiếu thu chi
  async findOne(id: string) {
    const phieu = await this.prisma.phieuThuChi.findUnique({
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
        dathang: true,
      },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu thu chi với ID: ${id}`);
    }

    return phieu;
  }

  // Cập nhật phiếu thu chi
  async update(id: string, updateDto: UpdatePhieuThuChiDto) {
    const phieu = await this.findOne(id);

    // Chỉ cho phép cập nhật phiếu ở trạng thái NHAP
    if (phieu.trangThai !== TrangThaiPhieu.NHAP) {
      throw new BadRequestException(
        'Chỉ có thể cập nhật phiếu ở trạng thái NHAP',
      );
    }

    return this.prisma.phieuThuChi.update({
      where: { id },
      data: updateDto,
      include: {
        donhang: {
          include: {
            khachhang: true,
          },
        },
        dathang: true,
      },
    });
  }

  // Xóa phiếu thu chi
  async remove(id: string) {
    const phieu = await this.findOne(id);

    // Chỉ cho phép xóa phiếu ở trạng thái NHAP hoặc HUY
    if (
      phieu.trangThai !== TrangThaiPhieu.NHAP &&
      phieu.trangThai !== TrangThaiPhieu.HUY
    ) {
      throw new BadRequestException(
        'Chỉ có thể xóa phiếu ở trạng thái NHAP hoặc HUY',
      );
    }

    await this.prisma.phieuThuChi.delete({
      where: { id },
    });

    return { success: true, message: 'Đã xóa phiếu thu chi' };
  }

  // Gửi duyệt phiếu
  async guiDuyet(id: string) {
    const phieu = await this.findOne(id);

    if (phieu.trangThai !== TrangThaiPhieu.NHAP) {
      throw new BadRequestException(
        'Chỉ có thể gửi duyệt phiếu ở trạng thái NHAP',
      );
    }

    return this.prisma.phieuThuChi.update({
      where: { id },
      data: {
        trangThai: TrangThaiPhieu.CHO_DUYET,
      },
    });
  }

  // Duyệt phiếu
  async duyet(id: string, nguoiDuyetId?: string) {
    const phieu = await this.findOne(id);

    if (phieu.trangThai !== TrangThaiPhieu.CHO_DUYET) {
      throw new BadRequestException(
        'Chỉ có thể duyệt phiếu ở trạng thái CHO_DUYET',
      );
    }

    return this.prisma.phieuThuChi.update({
      where: { id },
      data: {
        trangThai: TrangThaiPhieu.DA_DUYET,
        nguoiDuyetId,
        ngayDuyet: new Date(),
      },
    });
  }

  // Hủy phiếu
  async huy(id: string) {
    const phieu = await this.findOne(id);

    if (phieu.trangThai === TrangThaiPhieu.DA_DUYET) {
      throw new BadRequestException('Không thể hủy phiếu đã duyệt');
    }

    return this.prisma.phieuThuChi.update({
      where: { id },
      data: {
        trangThai: TrangThaiPhieu.HUY,
      },
    });
  }

  // ERP: Hoàn tất thanh toán
  async thanhToan(id: string, billImage?: string) {
    const phieu = await this.prisma.phieuThuChi.findUnique({
      where: { id },
      include: {
        paymentProposalSupplier: {
          include: {
            purchaseOrders: true,
          },
        },
        arDocumentItem: {
          include: {
            salesOrders: true,
          },
        },
      },
    });

    if (!phieu) {
      throw new NotFoundException(`Không tìm thấy phiếu thu chi với ID: ${id}`);
    }

    if (
      phieu.trangThai !== TrangThaiPhieu.DA_DUYET &&
      phieu.trangThai !== TrangThaiPhieu.CHO_DUYET
    ) {
      // Thường phải duyệt rồi mới chi, hoặc tùy workflow.
      // Ở đây ta cho phép từ DA_DUYET sang DA_THANH_TOAN
    }

    if (phieu.phuongThuc === 'CHUYEN_KHOAN' && !billImage) {
      throw new BadRequestException(
        'Bắt buộc upload ảnh bill cho hình thức chuyển khoản',
      );
    }

    return this.prisma.$transaction(async (tx) => {
      // 1. Cập nhật trạng thái phiếu chi
      const updatedPhieu = await tx.phieuThuChi.update({
        where: { id },
        data: {
          trangThai: TrangThaiPhieu.DA_THANH_TOAN,
          billImage: billImage || undefined,
        },
      });

      // 2. Nếu có liên kết với Đề xuất thanh toán
      if (phieu.paymentProposalSupplier) {
        // Cập nhật trạng thái NCC trong đề xuất
        await tx.paymentProposalSupplier.update({
          where: { id: phieu.paymentProposalSupplier.id },
          data: { status: 'DA_THANH_TOAN' },
        });

        // Cập nhật trạng thái các đơn PO liên quan
        const poIds = phieu.paymentProposalSupplier.purchaseOrders.map(
          (po) => po.purchaseOrderId,
        );
        if (poIds.length > 0) {
          await tx.dathang.updateMany({
            where: { id: { in: poIds } },
            data: { poStatus: 'DA_THANH_TOAN' },
          });
        }

        // Kiểm tra để cập nhật trạng thái đề xuất Master
        // Lưu ý: Ta gọi service sau transaction hoặc thực hiện logic ở đây.
        // Tốt nhất là thực hiện logic ở đây để đảm bảo tính nhất quán trong transaction.
        const otherItems = await tx.paymentProposalSupplier.findMany({
          where: {
            proposalId: phieu.paymentProposalSupplier.proposalId,
            id: { not: phieu.paymentProposalSupplier.id },
          },
        });

        const allPaid = otherItems.every(
          (item) => item.status === 'DA_THANH_TOAN',
        );
        if (allPaid) {
          await tx.paymentProposal.update({
            where: { id: phieu.paymentProposalSupplier.proposalId },
            data: { status: 'DA_THANH_TOAN' },
          });
        }
      }

      // 3. Nếu có liên kết với Chứng từ công nợ (AR Document - Bán hàng)
      if (phieu.arDocumentItem) {
        // Cập nhật trạng thái mục công nợ
        await tx.aRDocumentItem.update({
          where: { id: phieu.arDocumentItem.id },
          data: { status: 'DA_THU_TIEN' },
        });

        // Cập nhật trạng thái các đơn SO liên quan
        const soIds = phieu.arDocumentItem.salesOrders.map(
          (so) => so.salesOrderId,
        );
        if (soIds.length > 0) {
          await tx.donhang.updateMany({
            where: { id: { in: soIds } },
            data: { soStatus: 'DA_THU_TIEN' },
          });
        }

        // Kiểm tra để cập nhật trạng thái AR Document Master
        const otherItems = await tx.aRDocumentItem.findMany({
          where: {
            arDocumentId: phieu.arDocumentItem.arDocumentId,
            id: { not: phieu.arDocumentItem.id },
          },
        });

        const allPaid = otherItems.every(
          (item) => item.status === 'DA_THU_TIEN',
        );
        if (allPaid) {
          await tx.aRDocument.update({
            where: { id: phieu.arDocumentItem.arDocumentId },
            data: { status: 'DA_THU_TIEN' },
          });
        }
      }

      return updatedPhieu;
    });
  }

  // Báo cáo thu chi theo thời gian
  async baoCaoThuChi(tuNgay: Date, denNgay: Date) {
    const phieuList = await this.prisma.phieuThuChi.findMany({
      where: {
        ngay: {
          gte: tuNgay,
          lte: denNgay,
        },
        trangThai: TrangThaiPhieu.DA_DUYET,
      },
    });

    const tongThu = phieuList
      .filter((p) => p.loai === LoaiPhieuThuChi.THU)
      .reduce((sum, p) => sum + Number(p.soTien), 0);

    const tongChi = phieuList
      .filter((p) => p.loai === LoaiPhieuThuChi.CHI)
      .reduce((sum, p) => sum + Number(p.soTien), 0);

    const tonQuy = tongThu - tongChi;

    return {
      tuNgay,
      denNgay,
      tongThu,
      tongChi,
      tonQuy,
      soPhieuThu: phieuList.filter((p) => p.loai === LoaiPhieuThuChi.THU)
        .length,
      soPhieuChi: phieuList.filter((p) => p.loai === LoaiPhieuThuChi.CHI)
        .length,
    };
  }

  // Summary cho dashboard widget
  async getSummary() {
    const now = new Date();
    const startOfMonth = new Date(now.getFullYear(), now.getMonth(), 1);
    const endOfMonth = new Date(now.getFullYear(), now.getMonth() + 1, 0);

    // Tính tổng thu trong tháng (đã duyệt)
    const thuResult = await this.prisma.phieuThuChi.aggregate({
      where: {
        loai: LoaiPhieuThuChi.THU,
        trangThai: TrangThaiPhieu.DA_DUYET,
        ngay: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        soTien: true,
      },
    });

    // Tính tổng chi trong tháng (đã duyệt)
    const chiResult = await this.prisma.phieuThuChi.aggregate({
      where: {
        loai: LoaiPhieuThuChi.CHI,
        trangThai: TrangThaiPhieu.DA_DUYET,
        ngay: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      _sum: {
        soTien: true,
      },
    });

    // Đếm số phiếu chờ duyệt
    const choDuyet = await this.prisma.phieuThuChi.count({
      where: {
        trangThai: TrangThaiPhieu.CHO_DUYET,
      },
    });

    // Lấy phiếu gần đây
    const phieuGanDay = await this.prisma.phieuThuChi.findMany({
      where: {
        ngay: {
          gte: startOfMonth,
          lte: endOfMonth,
        },
      },
      orderBy: {
        createdAt: 'desc',
      },
      take: 5,
      select: {
        id: true,
        maPhieu: true,
        loai: true,
        soTien: true,
        trangThai: true,
        ngay: true,
        doiTuong: true,
        tenDoiTuong: true,
      },
    });

    const tongThu = Number(thuResult._sum.soTien || 0);
    const tongChi = Number(chiResult._sum.soTien || 0);

    return {
      tongThu,
      tongChi,
      choDuyet,
      phieuGanDay,
    };
  }
}
