import { ThanhtoanhoahongService } from './thanhtoanhoahong.service';
export declare class ThanhtoanhoahongController {
    private readonly thanhtoanhoahongService;
    constructor(thanhtoanhoahongService: ThanhtoanhoahongService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            order: number | null;
            hoaHongId: string;
            amountPaid: number;
            paymentMethod: string | null;
            paymentDate: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            order: number | null;
            hoaHongId: string;
            amountPaid: number;
            paymentMethod: string | null;
            paymentDate: Date;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getTotalThanhtoanhoahongByUserId(userId: string): Promise<{
        total: number;
    }>;
    getLastUpdatedThanhtoanhoahong(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        order: number | null;
        hoaHongId: string;
        amountPaid: number;
        paymentMethod: string | null;
        paymentDate: Date;
    }>;
    reorder(body: {
        thanhtoanhoahongIds: string[];
    }): Promise<{
        status: string;
    }>;
}
