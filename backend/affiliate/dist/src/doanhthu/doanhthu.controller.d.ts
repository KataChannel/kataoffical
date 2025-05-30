import { DoanhthuService } from './doanhthu.service';
export declare class DoanhthuController {
    private readonly doanhthuService;
    constructor(doanhthuService: DoanhthuService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            status: string;
            doanhsoId: string;
            amount: number;
            commission: number;
            completedAt: Date | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            status: string;
            doanhsoId: string;
            amount: number;
            commission: number;
            completedAt: Date | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedDoanhthu(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        doanhsoId: string;
        amount: number;
        commission: number;
        completedAt: Date | null;
    }>;
    reorder(body: {
        doanhthuIds: string[];
    }): Promise<{
        status: string;
    }>;
}
