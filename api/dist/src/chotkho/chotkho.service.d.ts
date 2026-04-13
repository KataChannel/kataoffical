import { PrismaService } from '../../prisma/prisma.service';
import { Decimal } from '@prisma/client/runtime/library';
import { NotificationService } from '../notification/notification.service';
export declare class ChotkhoService {
    private prisma;
    private notificationService;
    constructor(prisma: PrismaService, notificationService: NotificationService);
    calculateStockFromLogs(sanphamId: string, khoId: string, endTime?: Date, tx?: any): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
    getTraceLog(chotkhoId: string, sanphamId: string): Promise<{
        initialQty: number;
        lastClosingDate: Date;
        currentCalc: number;
        history: any[];
    }>;
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
                profile: {
                    name: string;
                } | null;
                email: string | null;
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
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                slhuy: Decimal;
                chenhlech: Decimal;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                sanphamId: string | null;
                chotkhoId: string | null;
                userId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ngaychot: Date;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            khoId: string | null;
            isActive: boolean;
            codeId: string | null;
        }) | null;
    }>;
    getAllProductsByKho(khoId: string): Promise<any[]>;
    getAllKho(): Promise<any[]>;
    getAllProducts(): Promise<any[]>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
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
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                slhuy: Decimal;
                chenhlech: Decimal;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                sanphamId: string | null;
                chotkhoId: string | null;
                userId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ngaychot: Date;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            khoId: string | null;
            isActive: boolean;
            codeId: string | null;
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
            profile: {
                name: string;
            } | null;
            email: string | null;
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
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            slhuy: Decimal;
            chenhlech: Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            sanphamId: string | null;
            chotkhoId: string | null;
            userId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }) | null>;
    update(id: string, updateData: any): Promise<{
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }>;
    search(searchParams: any): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
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
                ngaychot: Date;
                sltonhethong: Decimal;
                sltonthucte: Decimal;
                slhuy: Decimal;
                chenhlech: Decimal;
                ghichu: string | null;
                createdAt: Date;
                updatedAt: Date;
                order: number | null;
                sanphamId: string | null;
                chotkhoId: string | null;
                userId: string | null;
            })[];
        } & {
            id: string;
            title: string | null;
            ngaychot: Date;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            userId: string | null;
            khoId: string | null;
            isActive: boolean;
            codeId: string | null;
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
            profile: {
                name: string;
            } | null;
            email: string | null;
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
            ngaychot: Date;
            sltonhethong: Decimal;
            sltonthucte: Decimal;
            slhuy: Decimal;
            chenhlech: Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            sanphamId: string | null;
            chotkhoId: string | null;
            userId: string | null;
        })[];
    } & {
        id: string;
        title: string | null;
        ngaychot: Date;
        ghichu: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        userId: string | null;
        khoId: string | null;
        isActive: boolean;
        codeId: string | null;
    }) | null>;
}
