import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
export declare class NhacungcapService {
    private readonly prisma;
    private _ImportdataService;
    constructor(prisma: PrismaService, _ImportdataService: ImportdataService);
    getLastUpdatedNhacungcap(): Promise<{
        updatedAt: number;
    }>;
    generateMancc(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    import(data: any[]): Promise<{
        message: string;
    }>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            diachi: string | null;
            sdt: string | null;
            email: string | null;
            mancc: string;
            manccold: string | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    findBy(param: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    } | {
        data: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            diachi: string | null;
            sdt: string | null;
            email: string | null;
            mancc: string;
            manccold: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findOne(id: string): Promise<{
        Sanpham: {
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
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: number;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    }>;
    findByProductIds(productIds: string[]): Promise<({
        Sanpham: {
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
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: number;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
    } & {
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        diachi: string | null;
        sdt: string | null;
        email: string | null;
        mancc: string;
        manccold: string | null;
    })[]>;
}
