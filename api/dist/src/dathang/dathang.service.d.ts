import { PrismaService } from 'prisma/prisma.service';
export declare class DathangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    reorderDathangs(dathangIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
