import { PrismaService } from 'prisma/prisma.service';
export declare class PhieukhoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    xuatnhapton(query: any): Promise<{
        id: string;
        khoname: string;
        title: string;
        slxuat: number;
        slnhap: number;
        soluong: number;
        chitiet: any[];
    }[]>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
