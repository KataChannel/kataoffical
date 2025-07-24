"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LichSuTonKhoService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const client_1 = require("@prisma/client");
let LichSuTonKhoService = class LichSuTonKhoService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async createLichSuTonKho(data) {
        const tonKho = await this.prisma.tonKho.findUnique({
            where: { sanphamId: data.sanphamId }
        });
        if (!tonKho) {
            throw new common_1.NotFoundException('Sản phẩm không tồn tại trong kho');
        }
        const soLuongTruoc = Number(tonKho.slton);
        const soLuongSau = soLuongTruoc + data.soLuongThayDoi;
        const thanhTien = data.donGia ? data.soLuongThayDoi * data.donGia : 0;
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
        await this.prisma.tonKho.update({
            where: { id: tonKho.id },
            data: {
                slton: soLuongSau,
                updatedAt: new Date()
            }
        });
        return lichSu;
    }
    async getLichSuTonKho(params) {
        const { page, limit, sanphamId, loaiGiaoDich, tuNgay, denNgay, userId } = params;
        if (page < 1)
            throw new Error('Page number must be greater than 0');
        if (limit < 1)
            throw new Error('Limit must be greater than 0');
        const skip = (page - 1) * limit;
        const where = {};
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
    async getThongKeGiaoDich(params) {
        const { tuNgay, denNgay, sanphamId } = params;
        const where = {};
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
    async createChotKho(data) {
        return await this.prisma.chotKho.create({
            data: {
                maChotKho: data.maChotKho,
                tenChotKho: data.tenChotKho,
                tuNgay: data.tuNgay,
                denNgay: data.denNgay,
                userId: data.userId,
                ghichu: data.ghichu,
                trangThai: client_1.TrangThaiChotKho.DANG_MO
            }
        });
    }
    async thucHienChotKho(chotKhoId, userId) {
        const chotKho = await this.prisma.chotKho.findUnique({
            where: { id: chotKhoId }
        });
        if (!chotKho) {
            throw new common_1.NotFoundException('Không tìm thấy phiên chốt kho');
        }
        if (chotKho.trangThai === client_1.TrangThaiChotKho.DA_CHOT) {
            throw new Error('Phiên chốt kho đã được chốt trước đó');
        }
        const tonKhoList = await this.prisma.tonKho.findMany({
            include: {
                sanpham: true
            }
        });
        let tongSanPham = 0;
        let tongGiaTri = 0;
        for (const tonKho of tonKhoList) {
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
                .filter(ls => [client_1.LoaiGiaoDichKho.NHAP, client_1.LoaiGiaoDichKho.DIEU_CHINH].includes(ls.loaiGiaoDich))
                .reduce((sum, ls) => sum + Number(ls.soLuongSauQuay), 0);
            const slXuatTrongKy = lichSuTrongKy
                .filter(ls => [client_1.LoaiGiaoDichKho.XUAT, client_1.LoaiGiaoDichKho.HUY_HANG].includes(ls.loaiGiaoDich))
                .reduce((sum, ls) => sum + Math.abs(Number(ls.soLuongSauQuay)), 0);
            const slDieuChinhTrongKy = lichSuTrongKy
                .filter(ls => ls.loaiGiaoDich === client_1.LoaiGiaoDichKho.KIEM_KE)
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
        return await this.prisma.chotKho.update({
            where: { id: chotKhoId },
            data: {
                trangThai: client_1.TrangThaiChotKho.DA_CHOT,
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
    async getDanhSachChotKho(params) {
        const { page, limit, trangThai, tuNgay, denNgay } = params;
        if (page < 1)
            throw new Error('Page number must be greater than 0');
        if (limit < 1)
            throw new Error('Limit must be greater than 0');
        const skip = (page - 1) * limit;
        const where = {};
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
    async getChiTietChotKho(chotKhoId) {
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
            throw new common_1.NotFoundException('Không tìm thấy phiên chốt kho');
        }
        return chotKho;
    }
    async xoaChotKho(chotKhoId) {
        const chotKho = await this.prisma.chotKho.findUnique({
            where: { id: chotKhoId }
        });
        if (!chotKho) {
            throw new common_1.NotFoundException('Không tìm thấy phiên chốt kho');
        }
        if (chotKho.trangThai === client_1.TrangThaiChotKho.DA_CHOT) {
            throw new Error('Không thể xóa phiên chốt kho đã được chốt');
        }
        await this.prisma.chotKho.delete({
            where: { id: chotKhoId }
        });
        return { message: 'Xóa phiên chốt kho thành công' };
    }
};
exports.LichSuTonKhoService = LichSuTonKhoService;
exports.LichSuTonKhoService = LichSuTonKhoService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LichSuTonKhoService);
//# sourceMappingURL=lichsu-tonkho.service.js.map