import { PrismaService } from 'prisma/prisma.service';
export declare class GiohangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    reorderGiohangs(giohangIds: string[]): Promise<void>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        donhangId: string;
    }>;
}
