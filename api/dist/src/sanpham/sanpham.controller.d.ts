import { SanphamService } from './sanpham.service';
export declare class SanphamController {
    private readonly sanphamService;
    constructor(sanphamService: SanphamService);
    import(data: any, user: any): Promise<any>;
    create(data: any, user: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            status: string;
            order: number | null;
            codeId: string;
            createdById: string | null;
            donvitinh: string | null;
            bienthe: string | null;
            giagoc: number;
            inStock: boolean;
            danhmucId: string | null;
            bacgia: import(".prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    } | {
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string;
            status: string;
            order: number | null;
            codeId: string;
            createdById: string | null;
            donvitinh: string | null;
            bienthe: string | null;
            giagoc: number;
            inStock: boolean;
            danhmucId: string | null;
            bacgia: import(".prisma/client/runtime/library").JsonValue | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    } | null>;
    getLastUpdatedSanpham(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        status: string;
        order: number | null;
        codeId: string;
        createdById: string | null;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    reorder(body: {
        sanphamIds: string[];
    }): Promise<{
        status: string;
    }>;
}
