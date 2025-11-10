import { PrismaService } from 'prisma/prisma.service';
import { Prisma, Nhanvien } from '@prisma/client';
export declare class NhanvienService {
    private prisma;
    constructor(prisma: PrismaService);
    create(data: Prisma.NhanvienCreateInput): Promise<Nhanvien>;
    findAll(query?: any): Promise<Nhanvien[]>;
    findAllForSelect(): Promise<Pick<Nhanvien, 'id' | 'manv' | 'tennv'>[]>;
    findOne(id: string): Promise<Nhanvien>;
    findByManv(manv: string): Promise<Nhanvien>;
    searchfield(searchParams: Record<string, any>): Promise<Nhanvien>;
    update(id: string, data: Prisma.NhanvienUpdateInput): Promise<Nhanvien>;
    remove(id: string): Promise<Nhanvien>;
    import(data: any[]): Promise<{
        success: number;
        failed: number;
        errors: {
            manv: string;
            error: string;
        }[];
    }>;
    getLastUpdated(): Promise<{
        lastUpdated: Date;
    }>;
}
