import { khoService } from './kho.service';
export declare class khoController {
    private readonly khoService;
    constructor(khoService: khoService);
    create(createkhoDto: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    getPaginated(page: string, limit: string): Promise<{
        data: {
            slchogiao: number;
            slchonhap: number;
            slton: number;
            masp: string;
            dvt: string | null;
            title: string;
            subtitle: string;
            haohut: number;
            goiy: number;
            id: string;
            sanphamId: string;
        }[];
        meta: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findAll(): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    update(id: string, updatekhoDto: any): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        makho: string | null;
        diachi: string | null;
        sdt: string | null;
        congtyId: string | null;
    }>;
}
