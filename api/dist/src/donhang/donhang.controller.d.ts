import { Response } from 'express';
import { DonhangService } from './donhang.service';
import { DonhangCronService } from './donhang-cron.service';
export declare class DonhangController {
    private readonly donhangService;
    private readonly donhangCronService;
    constructor(donhangService: DonhangService, donhangCronService: DonhangCronService);
    create(createDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
<<<<<<< HEAD
=======
            giaban: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
            vat: import("@prisma/client/runtime/library").Decimal;
            idSP: string;
            sldat: import("@prisma/client/runtime/library").Decimal;
            slgiao: import("@prisma/client/runtime/library").Decimal;
            slnhan: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ttdat: import("@prisma/client/runtime/library").Decimal;
            ttgiao: import("@prisma/client/runtime/library").Decimal;
            ttnhan: import("@prisma/client/runtime/library").Decimal;
            donhangId: string;
<<<<<<< HEAD
            giaban: import("@prisma/client/runtime/library").Decimal;
=======
>>>>>>> dev5.1
            ttsauvat: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    ImportDonhangOld(data: any): Promise<{
        success: number;
        fail: number;
        skip: number;
    }>;
    ImportDonhang(data: any): Promise<{
        success: number;
        fail: number;
    }>;
    search(params: any): Promise<{
        data: {
            sanpham: any[];
            khachhang: any;
            name: string | null | undefined;
            id: string;
            title: string | null;
<<<<<<< HEAD
            type: string | null;
            madonhang: string;
            ngaygiao: Date | null;
=======
>>>>>>> dev5.1
            ghichu: string | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            khachhangId: string | null;
            printCount: number | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
<<<<<<< HEAD
            isshowvat: boolean;
            tongtien: import("@prisma/client/runtime/library").Decimal;
            tongvat: import("@prisma/client/runtime/library").Decimal;
            banggiaId: string | null;
            vat: import("@prisma/client/runtime/library").Decimal;
=======
            vat: import("@prisma/client/runtime/library").Decimal;
            type: string | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            banggiaId: string | null;
            isshowvat: boolean;
            madonhang: string;
            ngaygiao: Date | null;
            khachhangId: string | null;
            printCount: number | null;
            tongtien: import("@prisma/client/runtime/library").Decimal;
            tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
        }[];
        total: number;
        pageNumber: any;
        pageSize: any;
        totalPages: number;
    }>;
    congnokhachhang(params: any): Promise<{
        madonhang: any;
        ngaygiao: any;
        tong: any;
        soluong: any;
        tongtien: any;
        tongvat: any;
        name: any;
        makh: any;
    }[]>;
    downloadcongnokhachhang(params: any, res: Response): Promise<Response<any, Record<string, any>>>;
    phieuchuyen(params: any): Promise<{
        name: string | null | undefined;
        diachi: string | null | undefined;
        sdt: string | null | undefined;
        gionhanhang: string | null | undefined;
        tongsomon: number;
        soluongtt: number;
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }[]>;
    dongbogia(params: any): Promise<{
        status: string;
        message: string;
        updatedCount: number;
        errorCount: number;
        totalProcessed: any;
    }>;
    getchogiao(params: any): Promise<{
        idSP: string;
        title: string;
        masp: string;
        slchogiaott: number;
    }[]>;
    phieugiao(params: any): Promise<{
        sanpham: any[];
        khachhang: any;
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    searchfield(searchParams: Record<string, any>): Promise<{
        sanpham: {
            idSP: string;
            giaban: import("@prisma/client/runtime/library").Decimal | undefined;
            sldat: number;
            slgiao: number;
            slnhan: number;
            ttdat: number;
            ttgiao: number;
            ttnhan: number;
            ghichu: string | null;
            id: string;
            title: string;
<<<<<<< HEAD
=======
            title2: string | null;
            slug: string | null;
            masp: string;
            subtitle: string | null;
            giagoc: import("@prisma/client/runtime/library").Decimal;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: import("@prisma/client/runtime/library").Decimal | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            vat: import("@prisma/client/runtime/library").Decimal | null;
<<<<<<< HEAD
            subtitle: string | null;
            title2: string | null;
            slug: string | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: number | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: number;
=======
>>>>>>> dev5.1
        }[];
        khachhang: any;
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    findAll(): Promise<{
        sanpham: any[];
        name: string | null | undefined;
        khachhang: ({
            banggia: ({
                sanpham: {
                    id: string;
                    order: number | null;
                    isActive: boolean;
                    giaban: import("@prisma/client/runtime/library").Decimal;
                    banggiaId: string;
                    giaban: number;
                    sanphamId: string;
                }[];
            } & {
                id: string;
                title: string | null;
                type: string | null;
                ghichu: string | null;
                status: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                mabanggia: string | null;
                batdau: Date | null;
                ketthuc: Date | null;
                isDefault: boolean;
            }) | null;
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            isshowvat: boolean;
            banggiaId: string | null;
            name: string | null;
<<<<<<< HEAD
=======
            diachi: string | null;
            sdt: string | null;
>>>>>>> dev5.1
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
<<<<<<< HEAD
        }) | null;
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
            banggiaId: string | null;
            isshowvat: boolean;
        }) | null;
        id: string;
        title: string | null;
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }[]>;
    findByProductId(id: string): Promise<{
        sanpham: ({
            sanpham: {
                id: string;
                title: string;
<<<<<<< HEAD
=======
                title2: string | null;
                slug: string | null;
                masp: string;
                subtitle: string | null;
                giagoc: import("@prisma/client/runtime/library").Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
<<<<<<< HEAD
                vat: import("@prisma/client/runtime/library").Decimal | null;
                subtitle: string | null;
                giaban: number;
                title2: string | null;
                slug: string | null;
                masp: string;
                giagoc: number;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: number | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: number;
=======
                giaban: import("@prisma/client/runtime/library").Decimal;
                vat: import("@prisma/client/runtime/library").Decimal | null;
>>>>>>> dev5.1
            };
        } & {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
<<<<<<< HEAD
=======
            giaban: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
            vat: import("@prisma/client/runtime/library").Decimal;
            idSP: string;
            sldat: import("@prisma/client/runtime/library").Decimal;
            slgiao: import("@prisma/client/runtime/library").Decimal;
            slnhan: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ttdat: import("@prisma/client/runtime/library").Decimal;
            ttgiao: import("@prisma/client/runtime/library").Decimal;
            ttnhan: import("@prisma/client/runtime/library").Decimal;
            donhangId: string;
<<<<<<< HEAD
            giaban: import("@prisma/client/runtime/library").Decimal;
=======
>>>>>>> dev5.1
            ttsauvat: import("@prisma/client/runtime/library").Decimal;
        }) | undefined;
        khachhang: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            isshowvat: boolean;
            banggiaId: string | null;
            name: string | null;
<<<<<<< HEAD
=======
            diachi: string | null;
            sdt: string | null;
>>>>>>> dev5.1
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
<<<<<<< HEAD
        } | null;
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
            banggiaId: string | null;
            isshowvat: boolean;
        } | null;
        id: string;
        title: string | null;
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            idSP: string;
            giaban: import("@prisma/client/runtime/library").Decimal | undefined;
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            ttdat: number;
            ttgiao: number;
            ttnhan: number;
            ghichu: string | null;
            id: string;
            title: string;
<<<<<<< HEAD
=======
            title2: string | null;
            slug: string | null;
            masp: string;
            subtitle: string | null;
            giagoc: import("@prisma/client/runtime/library").Decimal;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: import("@prisma/client/runtime/library").Decimal | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            vat: import("@prisma/client/runtime/library").Decimal | null;
<<<<<<< HEAD
            subtitle: string | null;
            title2: string | null;
            slug: string | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: number | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: number;
=======
>>>>>>> dev5.1
        }[];
        khachhang: ({
            banggia: ({
                sanpham: {
                    id: string;
                    order: number | null;
                    isActive: boolean;
                    giaban: import("@prisma/client/runtime/library").Decimal;
                    banggiaId: string;
                    giaban: number;
                    sanphamId: string;
                }[];
            } & {
                id: string;
                title: string | null;
                type: string | null;
                ghichu: string | null;
                status: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                mabanggia: string | null;
                batdau: Date | null;
                ketthuc: Date | null;
                isDefault: boolean;
            }) | null;
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            isshowvat: boolean;
            banggiaId: string | null;
            name: string | null;
<<<<<<< HEAD
=======
            diachi: string | null;
            sdt: string | null;
>>>>>>> dev5.1
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
<<<<<<< HEAD
        }) | null;
        id: string;
        title: string | null;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
            banggiaId: string | null;
            isshowvat: boolean;
        }) | null;
        id: string;
        title: string | null;
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    updatePhieugiao(id: string, updateDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
<<<<<<< HEAD
=======
            giaban: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
            vat: import("@prisma/client/runtime/library").Decimal;
            idSP: string;
            sldat: import("@prisma/client/runtime/library").Decimal;
            slgiao: import("@prisma/client/runtime/library").Decimal;
            slnhan: import("@prisma/client/runtime/library").Decimal;
            slhuy: import("@prisma/client/runtime/library").Decimal;
            ttdat: import("@prisma/client/runtime/library").Decimal;
            ttgiao: import("@prisma/client/runtime/library").Decimal;
            ttnhan: import("@prisma/client/runtime/library").Decimal;
            donhangId: string;
<<<<<<< HEAD
            giaban: import("@prisma/client/runtime/library").Decimal;
=======
>>>>>>> dev5.1
            ttsauvat: import("@prisma/client/runtime/library").Decimal;
        }[];
    } & {
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    updateBulk(data: any[]): Promise<{
        success: number;
        fail: number;
    }>;
    update(id: string, updateDonhangDto: any): Promise<{
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    }>;
    removeBulk(ids: any[]): Promise<{
        success: number;
        fail: number;
    }>;
    remove(id: string): Promise<void>;
    reorder(body: {
        donhangIds: string[];
    }): Promise<void>;
    dagiao(id: string, data: any): Promise<{
        message: string;
        code: string;
        result: null;
    } | {
        message: string;
        code: string;
        result: {
            id: string;
            title: string | null;
<<<<<<< HEAD
            type: string | null;
            madonhang: string;
            ngaygiao: Date | null;
=======
>>>>>>> dev5.1
            ghichu: string | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            khachhangId: string | null;
            printCount: number | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
<<<<<<< HEAD
            isshowvat: boolean;
            tongtien: import("@prisma/client/runtime/library").Decimal;
            tongvat: import("@prisma/client/runtime/library").Decimal;
            banggiaId: string | null;
            vat: import("@prisma/client/runtime/library").Decimal;
=======
            vat: import("@prisma/client/runtime/library").Decimal;
            type: string | null;
            status: import(".prisma/client").$Enums.StatusDonhang;
            banggiaId: string | null;
            isshowvat: boolean;
            madonhang: string;
            ngaygiao: Date | null;
            khachhangId: string | null;
            printCount: number | null;
            tongtien: import("@prisma/client/runtime/library").Decimal;
            tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
        };
    }>;
    danhan(id: string, data: any): Promise<{
        id: string;
        title: string | null;
<<<<<<< HEAD
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
=======
>>>>>>> dev5.1
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string | null;
        printCount: number | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
<<<<<<< HEAD
        isshowvat: boolean;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
        banggiaId: string | null;
        vat: import("@prisma/client/runtime/library").Decimal;
=======
        vat: import("@prisma/client/runtime/library").Decimal;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        banggiaId: string | null;
        isshowvat: boolean;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string | null;
        printCount: number | null;
        tongtien: import("@prisma/client/runtime/library").Decimal;
        tongvat: import("@prisma/client/runtime/library").Decimal;
>>>>>>> dev5.1
    } | undefined>;
    autoCompleteOrdersDaily(): Promise<{
        success: boolean;
        message: string;
        result: void;
        error?: undefined;
    } | {
        success: boolean;
        message: string;
        error: any;
        result?: undefined;
    }>;
    manualAutoComplete(body: {
        date?: string;
    }): Promise<any>;
}
