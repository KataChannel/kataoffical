import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(createNhacungcapDto: any): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    update(id: string, updateNhacungcapDto: any): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        isActive: boolean;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
}
