import { PrismaService } from 'prisma/prisma.service';
export declare class NhacungcapService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateMancc(): Promise<string>;
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
