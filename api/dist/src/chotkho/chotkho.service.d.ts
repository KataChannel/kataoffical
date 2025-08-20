import { PrismaService } from 'prisma/prisma.service';
export declare class ChotkhoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private convertDateFilters;
    private getStartOfDay;
    private getEndOfDay;
    getLastUpdatedChotkho(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        success: boolean;
        data: {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            ngay: Date;
            userId: string | null;
        };
        message: string;
    }>;
    findOne(id: string): Promise<{
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            makho: string | null;
            diachi: string | null;
            sdt: string | null;
            congtyId: string | null;
        } | null;
        details: ({
            sanpham: {
                id: string;
                title: string;
                masp: string;
            } | null;
            phieukho: {
                id: string;
                title: string | null;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                type: string | null;
                madonhang: string | null;
                madncc: string | null;
                khoId: string | null;
                maphieu: string | null;
                madathang: string | null;
                ngay: Date | null;
                isChotkho: boolean;
            } | null;
        } & {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
            chotkhoId: string;
            tonkhoId: string | null;
            phieukhoId: string | null;
        })[];
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
        ngay: Date;
        userId: string | null;
    }>;
    findAll(query: any): Promise<{
        data: {
            detailCount: number;
            kho: {
                id: string;
                name: string;
            } | null;
            details: {
                id: string;
            }[];
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            khoId: string | null;
            ngay: Date;
            userId: string | null;
        }[];
        total: number;
        page: any;
        limit: any;
        pageCount: number;
    }>;
    getTonkhoWithPendingQuantities(khoId?: string): Promise<any[]>;
    createChotkhoDetails(chotkhoId: string, excelData: any[]): Promise<{
        success: boolean;
        count: number;
        message?: string;
    }>;
    updateTonkhoAfterClose(chotkhoId: string): Promise<{
        success: boolean;
        message?: string;
    }>;
    private generateNextOrderCode;
}
