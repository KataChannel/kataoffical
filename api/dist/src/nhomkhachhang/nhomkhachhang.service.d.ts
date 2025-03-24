import { PrismaService } from 'prisma/prisma.service';
export declare class NhomkhachhangService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    addKHtoNhom(nhomId: string, khachhangIds: any[]): Promise<any>;
    removeKHfromNhom(nhomId: string, khachhangIds: any[]): Promise<any>;
}
