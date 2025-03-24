import { PrismaService } from 'prisma/prisma.service';
export declare class DonhangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    generateNextOrderCode(): Promise<string>;
    private incrementOrderCode;
    private incrementLetters;
    reorderDonHangs(donhangIds: string[]): Promise<void>;
    search(params: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(dto: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
