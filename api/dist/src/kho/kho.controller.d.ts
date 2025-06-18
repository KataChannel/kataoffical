import { KhoService } from './kho.service';
export declare class KhoController {
    private readonly khoService;
    constructor(khoService: KhoService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        createdBy: string | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        createdBy: string | null;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
            createdBy: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
            createdBy: string | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getLastUpdatedKho(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        createdBy: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        createdBy: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        createdBy: string | null;
    }>;
    reorder(body: {
        khoIds: string[];
    }): Promise<{
        status: string;
    }>;
}
