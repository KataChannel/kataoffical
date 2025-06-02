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
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
        }[];
        total: number;
        page: number;
        pageCount: number;
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
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
    }>;
    reorder(body: {
        khoIds: string[];
    }): Promise<{
        status: string;
    }>;
}
