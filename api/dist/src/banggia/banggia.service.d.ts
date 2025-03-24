import { PrismaService } from 'prisma/prisma.service';
export declare class BanggiaService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    create(data: any): Promise<any>;
    createBanggia(data: any): Promise<any>;
    reorderBanggias(banggiaIds: string[]): Promise<void>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    addKHtoBG(banggiaId: string, khachhangIds: any[]): Promise<any>;
    removeKHfromBG(banggiaId: string, khachhangIds: any[]): Promise<any>;
}
