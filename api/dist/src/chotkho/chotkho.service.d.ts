import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
export declare class ChotkhoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(inventoryData: {
        khoId: string;
        products: Array<{
            sanphamId: string;
            sltonthucte: number;
            slhuy: number;
            ghichu?: string;
        }>;
    }): Promise<{
        success: boolean;
        message: string;
        data?: undefined;
    } | {
        success: boolean;
        message: string;
        data: {
            totalProducts: number;
            totalDifference: number;
            records: any[];
        };
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
            kho: {
                id: string;
                name: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            sanphamId: string | null;
            userId: string | null;
            slhuy: Decimal;
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            chenhlech: Decimal;
        })[];
        pagination: {
            current: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<({
        sanpham: {
            id: string;
            title: string;
            masp: string;
        } | null;
        kho: {
            id: string;
            name: string;
        } | null;
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: Decimal;
        ngaychot: Date;
        sltonhethong: Decimal;
        sltonthucte: Decimal;
        chenhlech: Decimal;
    }) | null>;
    update(id: string, updateData: any): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: Decimal;
        ngaychot: Date;
        sltonhethong: Decimal;
        sltonthucte: Decimal;
        chenhlech: Decimal;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        khoId: string | null;
        sanphamId: string | null;
        userId: string | null;
        slhuy: Decimal;
        ngaychot: Date;
        sltonhethong: Decimal;
        sltonthucte: Decimal;
        chenhlech: Decimal;
    }>;
}
