import { HttpStatus } from '@nestjs/common';
import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        isActive: boolean;
        mancc: string;
        manccold: string | null;
        diachi: string | null;
        email: string | null;
        sdt: string | null;
        isshowvat: boolean;
        tenfile: string | null;
    }>;
    getLastUpdatedNhacungcap(): Promise<{
        updatedAt: number;
    }>;
    import(data: any): Promise<{
        message: string;
    }>;
    findByProductIds(productIds: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: ({
            Sanpham: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                title: string;
                ghichu: string | null;
                isActive: boolean;
                subtitle: string | null;
                title2: string | null;
                slug: string | null;
                masp: string;
                giagoc: import("@prisma/client/runtime/library").Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: import("@prisma/client/runtime/library").Decimal;
                giaban: import("@prisma/client/runtime/library").Decimal;
                vat: import("@prisma/client/runtime/library").Decimal | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        })[];
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    findOne(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data?: undefined;
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        data: {
            Sanpham: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                title: string;
                ghichu: string | null;
                isActive: boolean;
                subtitle: string | null;
                title2: string | null;
                slug: string | null;
                masp: string;
                giagoc: import("@prisma/client/runtime/library").Decimal;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: import("@prisma/client/runtime/library").Decimal | null;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: import("@prisma/client/runtime/library").Decimal;
                giaban: import("@prisma/client/runtime/library").Decimal;
                vat: import("@prisma/client/runtime/library").Decimal | null;
            }[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        };
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        isActive: boolean;
        mancc: string;
        manccold: string | null;
        diachi: string | null;
        email: string | null;
        sdt: string | null;
        isshowvat: boolean;
        tenfile: string | null;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    update(id: string, updateNhacungcapDto: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        };
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
    remove(id: string): Promise<{
        statusCode: HttpStatus;
        message: string;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            mancc: string;
            manccold: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
        };
        error?: undefined;
    } | {
        statusCode: HttpStatus;
        message: string;
        error: any;
        data?: undefined;
    }>;
}
