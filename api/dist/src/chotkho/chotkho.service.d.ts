import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { NotificationService } from '../notification/notification.service';
export declare class ChotkhoService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
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
                userId: string | null;
                createdAt: Date;
                updatedAt: Date;
                title: string | null;
                ghichu: string | null;
                order: number | null;
                slhuy: Decimal;
                sanphamId: string | null;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            khoId: string | null;
            codeId: string | null;
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
                userId: string | null;
                createdAt: Date;
                updatedAt: Date;
                title: string | null;
                ghichu: string | null;
                order: number | null;
                slhuy: Decimal;
                sanphamId: string | null;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            khoId: string | null;
            codeId: string | null;
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
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            slhuy: Decimal;
            sanphamId: string | null;
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            chenhlech: Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        khoId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }) | null>;
    update(id: string, updateData: any): Promise<{
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        khoId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        khoId: string | null;
        codeId: string | null;
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
                userId: string | null;
                createdAt: Date;
                updatedAt: Date;
                title: string | null;
                ghichu: string | null;
                order: number | null;
                slhuy: Decimal;
                sanphamId: string | null;
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                chenhlech: Decimal;
                chotkhoId: string | null;
            })[];
        } & {
            id: string;
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            khoId: string | null;
            codeId: string | null;
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
            userId: string | null;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            slhuy: Decimal;
            sanphamId: string | null;
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            chenhlech: Decimal;
            chotkhoId: string | null;
        })[];
    } & {
        id: string;
        userId: string | null;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        khoId: string | null;
        codeId: string | null;
        ngaychot: Date;
    }) | null>;
}
