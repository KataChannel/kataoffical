import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class SanphamService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedSanpham(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    import(data: any[]): Promise<{
        message: string;
        results: {
            codeId: any;
            status: string;
            action?: string;
            error?: string;
        }[];
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    findBy(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
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
            order: number | null;
            codeId: string;
            status: string;
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
        order: number | null;
        codeId: string;
        status: string;
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
            order: number | null;
            codeId: string;
            status: string;
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
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string;
        order: number | null;
        codeId: string;
        status: string;
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
        order: number | null;
        codeId: string;
        status: string;
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
        order: number | null;
        codeId: string;
        status: string;
        donvitinh: string | null;
        bienthe: string | null;
        giagoc: number;
        inStock: boolean;
        danhmucId: string | null;
        bacgia: import(".prisma/client/runtime/library").JsonValue | null;
    }>;
    reorderSanphams(sanphamIds: string[]): Promise<{
        status: string;
    }>;
}
