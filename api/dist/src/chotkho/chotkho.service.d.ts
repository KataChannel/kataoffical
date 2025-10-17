import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
export declare class ChotkhoService {
    private prisma;
    constructor(prisma: PrismaService);
    create(inventoryData: {
        ngaychot?: Date;
        title?: string;
        ghichu?: string;
        khoId: string;
        userId?: string;
        details: Array<{
            sanphamId: string;
            sltonhethong: number;
            sltonthucte: number;
            slhuy: number;
            ghichu?: string;
        }>;
    }): Promise<{
        success: boolean;
        message: string;
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
            } | null;
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
            details: ({
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                } | null;
            } & {
                id: string;
                title: string | null;
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: Decimal;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            khoId: string | null;
            ngaychot: Date;
        }) | null;
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    getAllKho(): Promise<any[]>;
    getAllProducts(): Promise<any[]>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
            } | null;
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
            details: ({
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                } | null;
            } & {
                id: string;
                title: string | null;
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: Decimal;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            khoId: string | null;
            ngaychot: Date;
        })[];
        pagination: {
            current: number;
            pageSize: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<({
        user: {
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
        } | null;
        kho: {
            id: string;
            name: string;
            makho: string | null;
        } | null;
        details: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string | null;
            userId: string | null;
            slhuy: Decimal;
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            chenhlech: Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }) | null>;
    update(id: string, updateData: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }>;
    search(searchParams: any): Promise<{
        data: ({
            user: {
                id: string;
                email: string | null;
                profile: {
                    name: string;
                } | null;
            } | null;
            kho: {
                id: string;
                name: string;
                makho: string | null;
            } | null;
            details: ({
                sanpham: {
                    id: string;
                    title: string;
                    masp: string;
                } | null;
            } & {
                id: string;
                title: string | null;
                order: number | null;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                sanphamId: string | null;
                userId: string | null;
                slhuy: Decimal;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            khoId: string | null;
            ngaychot: Date;
        })[];
        pagination: {
            current: any;
            pageSize: any;
            total: number;
            totalPages: number;
        };
    }>;
    updateChotkhoWithDetails(id: string, data: {
        ngaychot?: Date;
        title?: string;
        ghichu?: string;
        isActive?: boolean;
        details?: Array<{
            sanphamId: string;
            sltonhethong: number;
            sltonthucte: number;
            slhuy: number;
            ghichu?: string;
        }>;
    }): Promise<({
        user: {
            id: string;
            email: string | null;
            profile: {
                name: string;
            } | null;
        } | null;
        details: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
        } & {
            id: string;
            title: string | null;
            order: number | null;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string | null;
            userId: string | null;
            slhuy: Decimal;
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            chenhlech: Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        order: number | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        khoId: string | null;
        ngaychot: Date;
    }) | null>;
}
