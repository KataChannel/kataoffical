import { QuanlyqrcodeService } from './quanlyqrcode.service';
export declare class QuanlyqrcodeController {
    private readonly quanlyqrcodeService;
    constructor(quanlyqrcodeService: QuanlyqrcodeService);
    create(createquanlyqrcodeDto: any): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    findby(param: any): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    } | null>;
    findAll(): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }[]>;
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        email: string;
        phone: string;
        id: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
}
