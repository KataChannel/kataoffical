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
        subtitle: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
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
        subtitle: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
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
            subtitle: string | null;
            donvitinh: string | null;
            bienthe: string | null;
            giagoc: number;
            inStock: boolean;
            danhmucId: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            danhmuc: {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
            } | null;
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            order: number | null;
            codeId: string;
            status: string;
            subtitle: string | null;
            donvitinh: string | null;
            bienthe: string | null;
            giagoc: number;
            inStock: boolean;
            danhmucId: string | null;
        })[];
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
        subtitle: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
        subtitle: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
        subtitle: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
    }>;
    reorder(body: {
        sanphamIds: string[];
    }): Promise<{
        status: string;
    }>;
}
