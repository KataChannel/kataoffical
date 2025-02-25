import { khoService } from './kho.service';
export declare class khoController {
    private readonly khoService;
    constructor(khoService: khoService);
    create(createkhoDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    update(id: string, updatekhoDto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        makho: string | null;
        congtyId: string | null;
    }>;
}
