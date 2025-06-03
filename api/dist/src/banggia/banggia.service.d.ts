import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class BanggiaService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedBanggia(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    validateDateRange(batdau: string | Date | undefined | null, ketthuc: string | Date | null | undefined, status: string, excludeId?: string): Promise<void>;
    create(payload: any): Promise<{
        sanpham: ({
            sanpham: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        })[];
        khachhang: ({
            khachhang: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
                diachi: string | null;
                nhomkhachhangId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
            khachhangId: string;
            banggiaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findBy(param: {
        isOne?: boolean;
        page?: number;
        limit?: number;
        [key: string]: any;
    }): Promise<({
        sanpham: ({
            sanpham: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        })[];
        khachhang: ({
            khachhang: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
                diachi: string | null;
                nhomkhachhangId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
            khachhangId: string;
            banggiaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }) | {
        data: ({
            sanpham: ({
                sanpham: {
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
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                giaban: number;
                sanphamId: string;
                banggiaId: string;
            })[];
            khachhang: ({
                khachhang: {
                    id: string;
                    email: string | null;
                    phone: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    title: string;
                    order: number | null;
                    codeId: string;
                    diachi: string | null;
                    nhomkhachhangId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: boolean;
                khachhangId: string;
                banggiaId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            order: number | null;
            codeId: string;
            status: string;
            batdau: Date | null;
            ketthuc: Date | null;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            sanpham: ({
                sanpham: {
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
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                giaban: number;
                sanphamId: string;
                banggiaId: string;
            })[];
            khachhang: ({
                khachhang: {
                    id: string;
                    email: string | null;
                    phone: string | null;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                    title: string;
                    order: number | null;
                    codeId: string;
                    diachi: string | null;
                    nhomkhachhangId: string | null;
                };
            } & {
                id: string;
                createdAt: Date;
                updatedAt: Date;
                status: boolean;
                khachhangId: string;
                banggiaId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            title: string | null;
            order: number | null;
            codeId: string;
            status: string;
            batdau: Date | null;
            ketthuc: Date | null;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        sanpham: ({
            sanpham: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        })[];
        khachhang: ({
            khachhang: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
                diachi: string | null;
                nhomkhachhangId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
            khachhangId: string;
            banggiaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    approve(id: string): Promise<{
        sanpham: ({
            sanpham: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        })[];
        khachhang: ({
            khachhang: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
                diachi: string | null;
                nhomkhachhangId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
            khachhangId: string;
            banggiaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    update(id: string, payload: any): Promise<{
        sanpham: ({
            sanpham: {
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
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            giaban: number;
            sanphamId: string;
            banggiaId: string;
        })[];
        khachhang: ({
            khachhang: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string;
                order: number | null;
                codeId: string;
                diachi: string | null;
                nhomkhachhangId: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            status: boolean;
            khachhangId: string;
            banggiaId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        order: number | null;
        codeId: string;
        status: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    reorderBanggias(banggiaIds: string[]): Promise<{
        status: string;
    }>;
}
