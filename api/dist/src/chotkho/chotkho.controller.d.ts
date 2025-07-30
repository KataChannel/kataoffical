import { ChotkhoService } from './chotkho.service';
export declare class ChotkhoController {
    private readonly chotkhoService;
    constructor(chotkhoService: ChotkhoService);
    create(data: any): Promise<{
        status: string;
        created: number;
        updated: number;
        failed: number;
        errors: any[];
        data: any[];
        summary: {
            totalProcessed: number;
            phieukhoCreated: number;
            tonkhoUpdated: number;
        };
    }>;
    findby(param: any): Promise<{
        data: {
            sanphamId: string | null;
            masp: string;
            tonkhoId: string | null;
            phieukhoId: string | null;
            ngay: Date;
            slthucte: number;
            slhethong: number;
            chenhlech: number;
            ghichu: string;
            title: string;
            dvt: string;
            sanpham: {
                id: string;
                masp: string;
                title: string;
                dvt: string | null;
            } | undefined;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findByDateRange(startDate: string, endDate: string, page?: string, limit?: string): Promise<{
        data: {
            id: any;
            title: any;
            ngay: any;
        }[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
        dateRange: {
            start: Date;
            end: Date;
        };
    } | {
        data: any[];
        total: number;
        dateRange: {
            start: Date;
            end: Date;
        };
        page?: undefined;
        limit?: undefined;
        pageCount?: undefined;
    }>;
    tonkhobylist(param: any): Promise<({
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
        sanphamId: string;
        slton: import("@prisma/client/runtime/library").Decimal;
        slchogiao: import("@prisma/client/runtime/library").Decimal;
        slchonhap: import("@prisma/client/runtime/library").Decimal;
    })[]>;
    findAll(query: any): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
    }>;
    getLastUpdatedChotkho(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        user: {
            id: string;
            profile: {
                name: string;
            } | null;
            email: string | null;
        } | null;
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        sanphamId: string | null;
        khoId: string | null;
        ngay: Date;
        tonkhoId: string | null;
        phieukhoId: string | null;
        slthucte: import("@prisma/client/runtime/library").Decimal;
        slhethong: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    update(id: string, data: any): Promise<{
        user: {
            id: string;
            profile: {
                name: string;
            } | null;
            email: string | null;
        } | null;
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        sanphamId: string | null;
        khoId: string | null;
        ngay: Date;
        tonkhoId: string | null;
        phieukhoId: string | null;
        slthucte: import("@prisma/client/runtime/library").Decimal;
        slhethong: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        userId: string | null;
        codeId: string | null;
        sanphamId: string | null;
        khoId: string | null;
        ngay: Date;
        tonkhoId: string | null;
        phieukhoId: string | null;
        slthucte: import("@prisma/client/runtime/library").Decimal;
        slhethong: import("@prisma/client/runtime/library").Decimal;
        chenhlech: import("@prisma/client/runtime/library").Decimal | null;
    }>;
    findByKho(khoId: string, page?: string, limit?: string): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
        khoId: string;
    }>;
    findBySanpham(sanphamId: string, page?: string, limit?: string): Promise<{
        data: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        total: number;
        page: number;
        limit: number;
        pageCount: number;
        sanphamId: string;
    }>;
    generateReport(query: any): Promise<{
        summary: {
            totalRecords: number;
            totalChenhLech: number;
            totalSlThucTe: number;
            totalSlHeThong: number;
            dateRange: {
                start: any;
                end: any;
            };
            filters: {
                khoId: any;
                sanphamId: any;
            };
        };
        khoStats: {};
        records: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
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
            tonkho: {
                id: string;
                sanphamId: string;
                slton: import("@prisma/client/runtime/library").Decimal;
                slchogiao: import("@prisma/client/runtime/library").Decimal;
                slchonhap: import("@prisma/client/runtime/library").Decimal;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        generatedAt: Date;
        generatedBy: string;
    } | {
        format: string;
        downloadUrl: string;
        summary: {
            totalRecords: number;
            totalChenhLech: number;
            totalSlThucTe: number;
            totalSlHeThong: number;
            dateRange: {
                start: any;
                end: any;
            };
            filters: {
                khoId: any;
                sanphamId: any;
            };
        };
        khoStats: {};
        records: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
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
            tonkho: {
                id: string;
                sanphamId: string;
                slton: import("@prisma/client/runtime/library").Decimal;
                slchogiao: import("@prisma/client/runtime/library").Decimal;
                slchonhap: import("@prisma/client/runtime/library").Decimal;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        generatedAt: Date;
        generatedBy: string;
    }>;
    reorder(body: {
        chotkhoIds: string[];
    }): Promise<{
        status: string;
        message: string;
    }>;
    generateReportPost(query: any): Promise<{
        summary: {
            totalRecords: number;
            totalChenhLech: number;
            totalSlThucTe: number;
            totalSlHeThong: number;
            dateRange: {
                start: any;
                end: any;
            };
            filters: {
                khoId: any;
                sanphamId: any;
            };
        };
        khoStats: {};
        records: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
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
            tonkho: {
                id: string;
                sanphamId: string;
                slton: import("@prisma/client/runtime/library").Decimal;
                slchogiao: import("@prisma/client/runtime/library").Decimal;
                slchonhap: import("@prisma/client/runtime/library").Decimal;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        generatedAt: Date;
        generatedBy: string;
    } | {
        format: string;
        downloadUrl: string;
        summary: {
            totalRecords: number;
            totalChenhLech: number;
            totalSlThucTe: number;
            totalSlHeThong: number;
            dateRange: {
                start: any;
                end: any;
            };
            filters: {
                khoId: any;
                sanphamId: any;
            };
        };
        khoStats: {};
        records: ({
            user: {
                id: string;
                profile: {
                    name: string;
                } | null;
                email: string | null;
            } | null;
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
            } | null;
            kho: {
                id: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                name: string;
                diachi: string | null;
                sdt: string | null;
                makho: string | null;
                congtyId: string | null;
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
            tonkho: {
                id: string;
                sanphamId: string;
                slton: import("@prisma/client/runtime/library").Decimal;
                slchogiao: import("@prisma/client/runtime/library").Decimal;
                slchonhap: import("@prisma/client/runtime/library").Decimal;
            } | null;
        } & {
            id: string;
            title: string | null;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            userId: string | null;
            codeId: string | null;
            sanphamId: string | null;
            khoId: string | null;
            ngay: Date;
            tonkhoId: string | null;
            phieukhoId: string | null;
            slthucte: import("@prisma/client/runtime/library").Decimal;
            slhethong: import("@prisma/client/runtime/library").Decimal;
            chenhlech: import("@prisma/client/runtime/library").Decimal | null;
        })[];
        generatedAt: Date;
        generatedBy: string;
    }>;
    bulkUpdateStatus(data: {
        ids: string[];
        status: string;
    }): Promise<{
        status: string;
        message: string;
        count: number;
    }>;
    bulkCreate(dataList: any[]): Promise<{
        status: string;
        message: string;
        data: any;
    }>;
    getStatistics(): Promise<{
        total: number;
        active: number;
        inactive: number;
        averageChenhLech: number | import("@prisma/client/runtime/library").Decimal;
    }>;
}
