import { DathangService } from './dathang.service';
export declare class DathangController {
    private readonly dathangService;
    constructor(dathangService: DathangService);
    create(data: any): Promise<{
        dathangsanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            dathangId: string;
        }[];
        nhacungcap: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        order: number | null;
        codeId: string;
        status: string;
        nhacungcapId: string;
    }>;
    findby(param: any): Promise<({
        dathangsanpham: ({
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
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            dathangId: string;
        })[];
        nhacungcap: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        order: number | null;
        codeId: string;
        status: string;
        nhacungcapId: string;
    }) | {
        data: ({
            dathangsanpham: ({
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
                sldat: number;
                slgiao: number;
                slnhan: number;
                slhuy: number;
                giaban: number;
                sanphamId: string;
                dathangId: string;
            })[];
            nhacungcap: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string | null;
                order: number | null;
                codeId: string;
                diachi: string | null;
                createdBy: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            order: number | null;
            codeId: string;
            status: string;
            nhacungcapId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findAll(page?: string, limit?: string): Promise<{
        data: ({
            dathangsanpham: ({
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
                sldat: number;
                slgiao: number;
                slnhan: number;
                slhuy: number;
                giaban: number;
                sanphamId: string;
                dathangId: string;
            })[];
            nhacungcap: {
                id: string;
                email: string | null;
                phone: string | null;
                createdAt: Date;
                updatedAt: Date;
                description: string | null;
                title: string | null;
                order: number | null;
                codeId: string;
                diachi: string | null;
                createdBy: string | null;
            };
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            order: number | null;
            codeId: string;
            status: string;
            nhacungcapId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedDathang(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        dathangsanpham: ({
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
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            dathangId: string;
        })[];
        nhacungcap: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        order: number | null;
        codeId: string;
        status: string;
        nhacungcapId: string;
    }>;
    update(id: string, data: any): Promise<{
        dathangsanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            dathangId: string;
        }[];
        nhacungcap: {
            id: string;
            email: string | null;
            phone: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string;
            diachi: string | null;
            createdBy: string | null;
        };
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        order: number | null;
        codeId: string;
        status: string;
        nhacungcapId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        order: number | null;
        codeId: string;
        status: string;
        nhacungcapId: string;
    }>;
    reorder(body: {
        dathangIds: string[];
    }): Promise<{
        status: string;
    }>;
}
