import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'prisma/prisma.service';
import { LoaiGiaoDichKho, TrangThaiChotKho } from '@prisma/client';

@Injectable()
export class LichSuTonKhoService {
  constructor(private readonly prisma: PrismaService) {}

  // Tạo lịch sử giao dịch tồn kho
  async createLichSuTonKho(data: {
    sanphamId: string;
    loaiGiaoDich: LoaiGiaoDichKho;
    soLuongThayDoi: number;
    donGia?: number;
    phieuKhoId?: string;
    donhangId?: string;
    userId?: string;
    lyDo?: string;
    ghichu?: string;
    soChungTu?: string;
  }) {
    // Lấy thông tin tồn kho hiện tại
    const tonKho = await this.prisma.tonKho.findUnique({
      where: { sanphamId: data.sanphamId }
    });

    if (!tonKho) {
      throw new NotFoundException('Sản phẩm không tồn tại trong kho');
    }

    const soLuongTruoc = Number(tonKho.slton);
    const soLuongSau = soLuongTruoc + data.soLuongThayDoi;
    const thanhTien = data.donGia ? data.soLuongThayDoi * data.donGia : 0;

    // Tạo lịch sử
    const lichSu = await this.prisma.lichSuTonKho.create({
      data: {
        tonKhoId: tonKho.id,
        loaiGiaoDich: data.loaiGiaoDich,
        soLuongTruoc: soLuongTruoc,
        soLuongSauQuay: data.soLuongThayDoi,
        soLuongSau: soLuongSau,
        donGia: data.donGia || 0,
        thanhTien: thanhTien,
        phieuKhoId: data.phieuKhoId,
        donhangId: data.donhangId,
        userId: data.userId,
        lyDo: data.lyDo,
        ghichu: data.ghichu,
        soChungTu: data.soChungTu,
      },
      include: {
        tonKho: {
          include: {
            sanpham: true
          }
        },
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                name: true
              }
            }
          }
        },
        phieuKho: true,
        donhang: true
      }
    });

    // Cập nhật tồn kho
    await this.prisma.tonKho.update({
      where: { id: tonKho.id },
      data: {
        slton: soLuongSau,
        updatedAt: new Date()
      }
    });

    return lichSu;
  }

  // Lấy lịch sử tồn kho với phân trang
  async getLichSuTonKho(params: {
    page: number;
    limit: number;
    sanphamId?: string;
    loaiGiaoDich?: LoaiGiaoDichKho;
    tuNgay?: Date;
    denNgay?: Date;
    userId?: string;
  }) {
    const { page, limit, sanphamId, loaiGiaoDich, tuNgay, denNgay, userId } = params;
    
    if (page < 1) throw new Error('Page number must be greater than 0');
    if (limit < 1) throw new Error('Limit must be greater than 0');

    const skip = (page - 1) * limit;
    const where: any = {};

    if (sanphamId) {
      where.tonKho = { sanphamId };
    }
    if (loaiGiaoDich) {
      where.loaiGiaoDich = loaiGiaoDich;
    }
    if (userId) {
      where.userId = userId;
    }
    if (tuNgay && denNgay) {
      where.ngayGiaoDich = {
        gte: tuNgay,
        lte: denNgay
      };
    }

    const [data, total] = await Promise.all([
      this.prisma.lichSuTonKho.findMany({
        where,
        include: {
          tonKho: {
            include: {
              sanpham: {
                select: {
                  id: true,
                  title: true,
                  masp: true,
                  dvt: true
                }
              }
            }
          },
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true
                }
              }
            }
          },
          phieuKho: {
            select: {
              id: true,
              maphieu: true,
              title: true,
              type: true
            }
          },
          donhang: {
            select: {
              id: true,
              madonhang: true,
              title: true
            }
          }
        },
        orderBy: {
          ngayGiaoDich: 'desc'
        },
        skip,
        take: limit,
      }),
      this.prisma.lichSuTonKho.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy thống kê giao dịch theo khoảng thời gian
  async getThongKeGiaoDich(params: {
    tuNgay?: Date;
    denNgay?: Date;
    sanphamId?: string;
  }) {
    const { tuNgay, denNgay, sanphamId } = params;
    const where: any = {};

    if (sanphamId) {
      where.tonKho = { sanphamId };
    }
    if (tuNgay && denNgay) {
      where.ngayGiaoDich = {
        gte: tuNgay,
        lte: denNgay
      };
    }

    const thongKe = await this.prisma.lichSuTonKho.groupBy({
      by: ['loaiGiaoDich'],
      where,
      _count: {
        id: true
      },
      _sum: {
        soLuongSauQuay: true,
        thanhTien: true
      }
    });

    return thongKe.map(item => ({
      loaiGiaoDich: item.loaiGiaoDich,
      soGiaoDich: item._count.id,
      tongSoLuong: Number(item._sum.soLuongSauQuay || 0),
      tongGiaTri: Number(item._sum.thanhTien || 0)
    }));
  }

  // Tạo chốt kho mới
  async createChotKho(data: {
    maChotKho: string;
    tenChotKho: string;
    tuNgay: Date;
    denNgay: Date;
    userId?: string;
    ghichu?: string;
  }) {
    return await this.prisma.chotKho.create({
      data: {
        maChotKho: data.maChotKho,
        tenChotKho: data.tenChotKho,
        tuNgay: data.tuNgay,
        denNgay: data.denNgay,
        userId: data.userId,
        ghichu: data.ghichu,
        trangThai: TrangThaiChotKho.DANG_MO
      }
    });
  }

  // Thực hiện chốt kho
  async thucHienChotKho(chotKhoId: string, userId?: string) {
    const chotKho = await this.prisma.chotKho.findUnique({
      where: { id: chotKhoId }
    });

    if (!chotKho) {
      throw new NotFoundException('Không tìm thấy phiên chốt kho');
    }

    if (chotKho.trangThai === TrangThaiChotKho.DA_CHOT) {
      throw new Error('Phiên chốt kho đã được chốt trước đó');
    }

    // Lấy tất cả sản phẩm có tồn kho
    const tonKhoList = await this.prisma.tonKho.findMany({
      include: {
        sanpham: true
      }
    });

    let tongSanPham = 0;
    let tongGiaTri = 0;

    // Tạo chi tiết chốt kho cho từng sản phẩm
    for (const tonKho of tonKhoList) {
      // Tính toán số liệu trong kỳ
      const lichSuTrongKy = await this.prisma.lichSuTonKho.findMany({
        where: {
          tonKhoId: tonKho.id,
          ngayGiaoDich: {
            gte: chotKho.tuNgay,
            lte: chotKho.denNgay
          }
        }
      });

      const slNhapTrongKy = lichSuTrongKy
        .filter(ls => ([LoaiGiaoDichKho.NHAP, LoaiGiaoDichKho.DIEU_CHINH] as LoaiGiaoDichKho[]).includes(ls.loaiGiaoDich))
        .reduce((sum, ls) => sum + Number(ls.soLuongSauQuay), 0);

      const slXuatTrongKy = lichSuTrongKy
        .filter(ls => ([LoaiGiaoDichKho.XUAT, LoaiGiaoDichKho.HUY_HANG] as LoaiGiaoDichKho[]).includes(ls.loaiGiaoDich))
        .reduce((sum, ls) => sum + Math.abs(Number(ls.soLuongSauQuay)), 0);

      const slDieuChinhTrongKy = lichSuTrongKy
        .filter(ls => ls.loaiGiaoDich === LoaiGiaoDichKho.KIEM_KE)
        .reduce((sum, ls) => sum + Number(ls.soLuongSauQuay), 0);

      const donGiaTrungBinh = tonKho.sanpham.giaban || 0;
      const giaTri = Number(tonKho.slton) * donGiaTrungBinh;

      await this.prisma.chiTietChotKho.create({
        data: {
          chotKhoId: chotKhoId,
          sanphamId: tonKho.sanphamId,
          slTonDauKy: Number(tonKho.slton) - slNhapTrongKy + slXuatTrongKy,
          slNhapTrongKy: slNhapTrongKy,
          slXuatTrongKy: slXuatTrongKy,
          slDieuChinhTrongKy: slDieuChinhTrongKy,
          slTonCuoiKy: Number(tonKho.slton),
          donGiaTrungBinh: donGiaTrungBinh,
          giaTri: giaTri
        }
      });

      tongSanPham++;
      tongGiaTri += giaTri;
    }

    // Cập nhật thông tin chốt kho
    return await this.prisma.chotKho.update({
      where: { id: chotKhoId },
      data: {
        trangThai: TrangThaiChotKho.DA_CHOT,
        ngayChot: new Date(),
        userId: userId,
        tongSanPham: tongSanPham,
        tongGiaTri: tongGiaTri
      },
      include: {
        chiTietChotKho: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true
              }
            }
          }
        }
      }
    });
  }

  // Lấy danh sách các đợt chốt kho
  async getDanhSachChotKho(params: {
    page: number;
    limit: number;
    trangThai?: TrangThaiChotKho;
    tuNgay?: Date;
    denNgay?: Date;
  }) {
    const { page, limit, trangThai, tuNgay, denNgay } = params;
    
    if (page < 1) throw new Error('Page number must be greater than 0');
    if (limit < 1) throw new Error('Limit must be greater than 0');

    const skip = (page - 1) * limit;
    const where: any = {};

    if (trangThai) {
      where.trangThai = trangThai;
    }
    if (tuNgay && denNgay) {
      where.OR = [
        {
          tuNgay: {
            gte: tuNgay,
            lte: denNgay
          }
        },
        {
          denNgay: {
            gte: tuNgay,
            lte: denNgay
          }
        }
      ];
    }

    const [data, total] = await Promise.all([
      this.prisma.chotKho.findMany({
        where,
        include: {
          user: {
            select: {
              id: true,
              email: true,
              profile: {
                select: {
                  name: true
                }
              }
            }
          },
          _count: {
            select: {
              chiTietChotKho: true,
              lichSuTonKho: true
            }
          }
        },
        orderBy: {
          createdAt: 'desc'
        },
        skip,
        take: limit,
      }),
      this.prisma.chotKho.count({ where }),
    ]);

    return {
      data,
      meta: {
        page,
        limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  // Lấy chi tiết một đợt chốt kho
  async getChiTietChotKho(chotKhoId: string) {
    const chotKho = await this.prisma.chotKho.findUnique({
      where: { id: chotKhoId },
      include: {
        user: {
          select: {
            id: true,
            email: true,
            profile: {
              select: {
                name: true
              }
            }
          }
        },
        chiTietChotKho: {
          include: {
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true,
                giaban: true
              }
            }
          },
          orderBy: {
            sanpham: {
              masp: 'asc'
            }
          }
        }
      }
    });

    if (!chotKho) {
      throw new NotFoundException('Không tìm thấy phiên chốt kho');
    }

    return chotKho;
  }

  // Xóa chốt kho (chỉ được phép khi chưa chốt)
  async xoaChotKho(chotKhoId: string) {
    const chotKho = await this.prisma.chotKho.findUnique({
      where: { id: chotKhoId }
    });

    if (!chotKho) {
      throw new NotFoundException('Không tìm thấy phiên chốt kho');
    }

    if (chotKho.trangThai === TrangThaiChotKho.DA_CHOT) {
      throw new Error('Không thể xóa phiên chốt kho đã được chốt');
    }

    await this.prisma.chotKho.delete({
      where: { id: chotKhoId }
    });

    return { message: 'Xóa phiên chốt kho thành công' };
  }
}
