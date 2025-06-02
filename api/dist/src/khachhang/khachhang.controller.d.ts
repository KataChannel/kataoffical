import { KhachhangService } from './khachhang.service';
export declare class KhachhangController {
    private readonly khachhangService;
    constructor(khachhangService: KhachhangService);
    create(data: any): Promise<{
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
    }>;
    findby(param: any): Promise<{
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
    } | {
        data: {
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
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
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
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedKhachhang(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
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
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
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
    }>;
    reorder(body: {
        khachhangIds: string[];
    }): Promise<{
        status: string;
    }>;
}
