import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    create(data: any): Promise<{
        sanpham: ({
            sanpham: {
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
        status: string;
        order: number | null;
        codeId: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findby(param: any): Promise<({
        sanpham: ({
            sanpham: {
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
        status: string;
        order: number | null;
        codeId: string;
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
            status: string;
            order: number | null;
            codeId: string;
            batdau: Date | null;
            ketthuc: Date | null;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            sanpham: ({
                sanpham: {
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
            status: string;
            order: number | null;
            codeId: string;
            batdau: Date | null;
            ketthuc: Date | null;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedBanggia(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        sanpham: ({
            sanpham: {
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
        status: string;
        order: number | null;
        codeId: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: ({
            sanpham: {
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
        status: string;
        order: number | null;
        codeId: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        title: string | null;
        status: string;
        order: number | null;
        codeId: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<{
        status: string;
    }>;
}
