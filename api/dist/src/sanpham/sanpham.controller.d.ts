import { SanphamService } from './sanpham.service';
export declare class SanphamController {
    private readonly sanphamService;
    constructor(sanphamService: SanphamService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
        price: number;
        inStock: boolean;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
        price: number;
        inStock: boolean;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
            status: string;
            price: number;
            inStock: boolean;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(): Promise<{
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
            status: string;
            price: number;
            inStock: boolean;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedSanpham(): Promise<{
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
        status: string;
        price: number;
        inStock: boolean;
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
        status: string;
        price: number;
        inStock: boolean;
    }>;
    reorder(body: {
        sanphamIds: string[];
    }): Promise<{
        status: string;
    }>;
}
