import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class DathangService {
    private readonly prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    getLastUpdatedDathang(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(payload: any): Promise<{
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
        status: string;
        order: number | null;
        codeId: string;
        nhacungcapId: string;
    }>;
    findBy(param: {
        isOne?: boolean;
        page?: number;
        limit?: number;
        [key: string]: any;
    }): Promise<({
        dathangsanpham: ({
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
        status: string;
        order: number | null;
        codeId: string;
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
            status: string;
            order: number | null;
            codeId: string;
            nhacungcapId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            dathangsanpham: ({
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
            status: string;
            order: number | null;
            codeId: string;
            nhacungcapId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        dathangsanpham: ({
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
        status: string;
        order: number | null;
        codeId: string;
        nhacungcapId: string;
    }>;
    update(id: string, payload: any): Promise<{
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
        status: string;
        order: number | null;
        codeId: string;
        nhacungcapId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        nhacungcapId: string;
    }>;
    reorderDathangs(dathangIds: string[]): Promise<{
        status: string;
    }>;
}
