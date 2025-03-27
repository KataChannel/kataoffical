import { QuanlyqrcodeService } from './quanlyqrcode.service';
export declare class QuanlyqrcodeController {
    private readonly quanlyqrcodeService;
    constructor(quanlyqrcodeService: QuanlyqrcodeService);
    create(createquanlyqrcodeDto: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    } | null>;
    findAll(): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }[]>;
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string;
        createdAt: Date;
        updatedAt: Date;
        name: string;
        phone: string;
        code: string;
        qrcode: string;
        isSentEmail: boolean;
        checkedAt: Date | null;
    }>;
}
