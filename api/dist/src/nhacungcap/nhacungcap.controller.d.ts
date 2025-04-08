import { NhacungcapService } from './nhacungcap.service';
export declare class NhacungcapController {
    private readonly nhacungcapService;
    constructor(nhacungcapService: NhacungcapService);
    create(createNhacungcapDto: any): Promise<{
        email: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    findAll(): Promise<{
        email: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }[]>;
    findOne(id: string): Promise<{
        email: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    update(id: string, updateNhacungcapDto: any): Promise<{
        email: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
    remove(id: string): Promise<{
        email: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        ghichu: string | null;
        diachi: string | null;
        sdt: string | null;
        mancc: string;
    }>;
}
