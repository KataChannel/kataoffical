import { PrismaService } from 'prisma/prisma.service';
export declare class BanggiaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    reorderBanggias(banggiaIds: string[]): Promise<void>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        type: string;
        batdau: Date;
        ketthuc: Date;
    }>;
}
