import { PrismaService } from 'prisma/prisma.service';
import { LoaiGiaoDichKho, TrangThaiChotKho } from '@prisma/client';
export declare class LichSuTonKhoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    createLichSuTonKho(data: {
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
    }): Promise<{
        tonKho: {
            sanpham: {
                id: string;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                isActive: boolean;
                title: string;
                title2: string | null;
                slug: string | null;
                masp: string;
                subtitle: string | null;
                giagoc: number;
                giaban: number;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: number | null;
                vat: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: number;
                order: number | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            slton: import("@prisma/client/runtime/library").Decimal;
            slchogiao: import("@prisma/client/runtime/library").Decimal;
            slchonhap: import("@prisma/client/runtime/library").Decimal;
        };
        phieuKho: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            title: string | null;
            maphieu: string | null;
            madonhang: string | null;
            madncc: string | null;
            madathang: string | null;
            ngay: Date | null;
            type: string | null;
            khoId: string | null;
        } | null;
        donhang: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            isActive: boolean;
            title: string | null;
            order: number | null;
            madonhang: string;
            type: string | null;
            ngaygiao: Date | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            khachhangId: string;
            printCount: number | null;
        } | null;
        user: {
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
        } | null;
    } & {
        id: string;
        tonKhoId: string;
        loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
        soLuongTruoc: import("@prisma/client/runtime/library").Decimal;
        soLuongSauQuay: import("@prisma/client/runtime/library").Decimal;
        soLuongSau: import("@prisma/client/runtime/library").Decimal;
        donGia: import("@prisma/client/runtime/library").Decimal | null;
        thanhTien: import("@prisma/client/runtime/library").Decimal | null;
        phieuKhoId: string | null;
        donhangId: string | null;
        chotKhoId: string | null;
        userId: string | null;
        lyDo: string | null;
        ghichu: string | null;
        soChungTu: string | null;
        ngayGiaoDich: Date;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getLichSuTonKho(params: {
        page: number;
        limit: number;
        sanphamId?: string;
        loaiGiaoDich?: LoaiGiaoDichKho;
        tuNgay?: Date;
        denNgay?: Date;
        userId?: string;
    }): Promise<{
        data: ({
            tonKho: {
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                    dvt: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string;
                slton: import("@prisma/client/runtime/library").Decimal;
                slchogiao: import("@prisma/client/runtime/library").Decimal;
                slchonhap: import("@prisma/client/runtime/library").Decimal;
            };
            phieuKho: {
                id: string;
                title: string | null;
                maphieu: string | null;
                type: string | null;
            } | null;
            donhang: {
                id: string;
                title: string | null;
                madonhang: string;
            } | null;
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
            } | null;
        } & {
            id: string;
            tonKhoId: string;
            loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
            soLuongTruoc: import("@prisma/client/runtime/library").Decimal;
            soLuongSauQuay: import("@prisma/client/runtime/library").Decimal;
            soLuongSau: import("@prisma/client/runtime/library").Decimal;
            donGia: import("@prisma/client/runtime/library").Decimal | null;
            thanhTien: import("@prisma/client/runtime/library").Decimal | null;
            phieuKhoId: string | null;
            donhangId: string | null;
            chotKhoId: string | null;
            userId: string | null;
            lyDo: string | null;
            ghichu: string | null;
            soChungTu: string | null;
            ngayGiaoDich: Date;
            createdAt: Date;
            updatedAt: Date;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getThongKeGiaoDich(params: {
        tuNgay?: Date;
        denNgay?: Date;
        sanphamId?: string;
    }): Promise<{
        loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
        soGiaoDich: number;
        tongSoLuong: number;
        tongGiaTri: number;
    }[]>;
    createChotKho(data: {
        maChotKho: string;
        tenChotKho: string;
        tuNgay: Date;
        denNgay: Date;
        userId?: string;
        ghichu?: string;
    }): Promise<{
        id: string;
        userId: string | null;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        maChotKho: string;
        tenChotKho: string;
        tuNgay: Date;
        denNgay: Date;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    thucHienChotKho(chotKhoId: string, userId?: string): Promise<{
        chiTietChotKho: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
                dvt: string | null;
            };
        } & {
            id: string;
            chotKhoId: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            slTonDauKy: import("@prisma/client/runtime/library").Decimal;
            slNhapTrongKy: import("@prisma/client/runtime/library").Decimal;
            slXuatTrongKy: import("@prisma/client/runtime/library").Decimal;
            slDieuChinhTrongKy: import("@prisma/client/runtime/library").Decimal;
            slTonCuoiKy: import("@prisma/client/runtime/library").Decimal;
            donGiaTrungBinh: import("@prisma/client/runtime/library").Decimal | null;
            giaTri: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        userId: string | null;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        maChotKho: string;
        tenChotKho: string;
        tuNgay: Date;
        denNgay: Date;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    getDanhSachChotKho(params: {
        page: number;
        limit: number;
        trangThai?: TrangThaiChotKho;
        tuNgay?: Date;
        denNgay?: Date;
    }): Promise<{
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
            } | null;
            _count: {
                lichSuTonKho: number;
                chiTietChotKho: number;
            };
        } & {
            id: string;
            userId: string | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            maChotKho: string;
            tenChotKho: string;
            tuNgay: Date;
            denNgay: Date;
            trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
            ngayChot: Date | null;
            tongSanPham: number | null;
            tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getChiTietChotKho(chotKhoId: string): Promise<{
        user: {
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
        } | null;
        chiTietChotKho: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
                giaban: number;
                dvt: string | null;
            };
        } & {
            id: string;
            chotKhoId: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            slTonDauKy: import("@prisma/client/runtime/library").Decimal;
            slNhapTrongKy: import("@prisma/client/runtime/library").Decimal;
            slXuatTrongKy: import("@prisma/client/runtime/library").Decimal;
            slDieuChinhTrongKy: import("@prisma/client/runtime/library").Decimal;
            slTonCuoiKy: import("@prisma/client/runtime/library").Decimal;
            donGiaTrungBinh: import("@prisma/client/runtime/library").Decimal | null;
            giaTri: import("@prisma/client/runtime/library").Decimal | null;
        })[];
    } & {
        id: string;
        userId: string | null;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        maChotKho: string;
        tenChotKho: string;
        tuNgay: Date;
        denNgay: Date;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    xoaChotKho(chotKhoId: string): Promise<{
        message: string;
    }>;
}
