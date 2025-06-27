import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class DonhangService {
    private readonly prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    getLastUpdatedDonhang(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(payload: any): Promise<{
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
        donhangsanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            donhangId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        khachhangId: string;
    }>;
    findBy(param: {
        isOne?: boolean;
        page?: number;
        limit?: number;
        [key: string]: any;
    }): Promise<({
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
        donhangsanpham: ({
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
            donhangId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        khachhangId: string;
    }) | {
        data: ({
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
            donhangsanpham: ({
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
                donhangId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            status: string;
            order: number | null;
            codeId: string;
            khachhangId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
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
            donhangsanpham: ({
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
                donhangId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            total: number;
            status: string;
            order: number | null;
            codeId: string;
            khachhangId: string;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
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
        donhangsanpham: ({
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
            donhangId: string;
        })[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        khachhangId: string;
    }>;
    update(id: string, payload: any): Promise<{
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
        donhangsanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sldat: number;
            slgiao: number;
            slnhan: number;
            slhuy: number;
            giaban: number;
            sanphamId: string;
            donhangId: string;
        }[];
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        khachhangId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        total: number;
        status: string;
        order: number | null;
        codeId: string;
        khachhangId: string;
    }>;
    reorderDonhangs(donhangIds: string[]): Promise<{
        status: string;
    }>;
}
