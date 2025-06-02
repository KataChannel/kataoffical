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
    findBy(param: any): Promise<{
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
    findAll(page?: number, limit?: number): Promise<{
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
    reorderSanphams(sanphamIds: string[]): Promise<{
        status: string;
    }>;
}
