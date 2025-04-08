import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
export declare class QuanlyqrcodeService {
    private readonly prisma;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _ErrorlogService: ErrorlogService);
    getLastUpdatedquanlyqrcode(): Promise<{
        updatedAt: number | Date;
    }>;
    create(data: any): Promise<{
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
