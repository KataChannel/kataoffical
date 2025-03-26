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
    } | null>;
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
