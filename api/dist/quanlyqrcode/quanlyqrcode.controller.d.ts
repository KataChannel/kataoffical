import { QuanlyqrcodeService } from './quanlyqrcode.service';
export declare class QuanlyqrcodeController {
    private readonly quanlyqrcodeService;
    constructor(quanlyqrcodeService: QuanlyqrcodeService);
    create(createquanlyqrcodeDto: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }>;
    findby(param: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }[]>;
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: number | Date;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string;
        phone: string;
        createdAt: Date;
        updatedAt: Date;
        qrcode: string;
        code: string;
        checkedAt: Date | null;
    }>;
}
