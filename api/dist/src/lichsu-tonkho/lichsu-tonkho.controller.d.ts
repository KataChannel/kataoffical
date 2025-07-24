import { LichSuTonKhoService } from './lichsu-tonkho.service';
import { LoaiGiaoDichKho, TrangThaiChotKho } from '@prisma/client';
export declare class LichSuTonKhoController {
    private readonly lichSuTonKhoService;
    constructor(lichSuTonKhoService: LichSuTonKhoService);
    createLichSuTonKho(createDto: {
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
        user: {
            id: string;
            profile: {
                name: string;
            } | null;
            email: string | null;
        } | null;
        donhang: {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            type: string | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            madonhang: string;
            ngaygiao: Date | null;
            khachhangId: string;
            printCount: number | null;
        } | null;
        phieuKho: {
            id: string;
            title: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            type: string | null;
            madonhang: string | null;
            madncc: string | null;
            maphieu: string | null;
            madathang: string | null;
            ngay: Date | null;
            khoId: string | null;
        } | null;
        tonKho: {
            sanpham: {
                id: string;
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
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
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
    } & {
        id: string;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        donhangId: string | null;
        userId: string | null;
        phieuKhoId: string | null;
        tonKhoId: string;
        loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
        soLuongTruoc: import("@prisma/client/runtime/library").Decimal;
        soLuongSauQuay: import("@prisma/client/runtime/library").Decimal;
        soLuongSau: import("@prisma/client/runtime/library").Decimal;
        donGia: import("@prisma/client/runtime/library").Decimal | null;
        thanhTien: import("@prisma/client/runtime/library").Decimal | null;
        chotKhoId: string | null;
        lyDo: string | null;
        soChungTu: string | null;
        ngayGiaoDich: Date;
    }>;
    getLichSuTonKho(page?: number, limit?: number, sanphamId?: string, loaiGiaoDich?: LoaiGiaoDichKho, tuNgay?: string, denNgay?: string, userId?: string): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
            donhang: {
                id: string;
                title: string | null;
                madonhang: string;
            } | null;
            phieuKho: {
                id: string;
                title: string | null;
                type: string | null;
                maphieu: string | null;
            } | null;
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
        } & {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            donhangId: string | null;
            userId: string | null;
            phieuKhoId: string | null;
            tonKhoId: string;
            loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
            soLuongTruoc: import("@prisma/client/runtime/library").Decimal;
            soLuongSauQuay: import("@prisma/client/runtime/library").Decimal;
            soLuongSau: import("@prisma/client/runtime/library").Decimal;
            donGia: import("@prisma/client/runtime/library").Decimal | null;
            thanhTien: import("@prisma/client/runtime/library").Decimal | null;
            chotKhoId: string | null;
            lyDo: string | null;
            soChungTu: string | null;
            ngayGiaoDich: Date;
        })[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    getThongKeGiaoDich(tuNgay?: string, denNgay?: string, sanphamId?: string): Promise<{
        loaiGiaoDich: import(".prisma/client").$Enums.LoaiGiaoDichKho;
        soGiaoDich: number;
        tongSoLuong: number;
        tongGiaTri: number;
    }[]>;
    createChotKho(createDto: {
        maChotKho: string;
        tenChotKho: string;
        tuNgay: string;
        denNgay: string;
        userId?: string;
        ghichu?: string;
    }): Promise<{
        id: string;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        tuNgay: Date;
        denNgay: Date;
        maChotKho: string;
        tenChotKho: string;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    thucHienChotKho(chotKhoId: string, body: {
        userId?: string;
    }): Promise<{
        chiTietChotKho: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
                dvt: string | null;
            };
        } & {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            chotKhoId: string;
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
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        tuNgay: Date;
        denNgay: Date;
        maChotKho: string;
        tenChotKho: string;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    getDanhSachChotKho(page?: number, limit?: number, trangThai?: TrangThaiChotKho, tuNgay?: string, denNgay?: string): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
            _count: {
                lichSuTonKho: number;
                chiTietChotKho: number;
            };
        } & {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            tuNgay: Date;
            denNgay: Date;
            maChotKho: string;
            tenChotKho: string;
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
            profile: {
                name: string;
            } | null;
            email: string | null;
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
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            chotKhoId: string;
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
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        tuNgay: Date;
        denNgay: Date;
        maChotKho: string;
        tenChotKho: string;
        trangThai: import(".prisma/client").$Enums.TrangThaiChotKho;
        ngayChot: Date | null;
        tongSanPham: number | null;
        tongGiaTri: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    xoaChotKho(chotKhoId: string): Promise<{
        message: string;
    }>;
}
