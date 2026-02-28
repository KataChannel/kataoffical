import { PrismaService } from 'prisma/prisma.service';
import { CreateNhanvienDto, UpdateNhanvienDto } from './dto';
import { Nhanvien, Prisma } from '@prisma/client';
export declare class NhanvienService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createNhanvienDto: CreateNhanvienDto): Promise<Nhanvien>;
    findAll(options?: {
        phongbanId?: string;
        trangThai?: string;
        chucVu?: string;
        search?: string;
        page?: number;
        limit?: number;
    }): Promise<{
        data: Nhanvien[];
        total: number;
        page: number;
        limit: number;
    }>;
    findOne(id: string): Promise<Nhanvien>;
    findByMaNV(maNV: string): Promise<Nhanvien>;
    update(id: string, updateNhanvienDto: UpdateNhanvienDto): Promise<Nhanvien>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getStatistics(): Promise<{
        total: number;
        byPhongban: {
            phongbanId: string | null;
            phongbanMa: string;
            phongbanTen: string;
            count: number;
        }[];
        byTrangThai: (Prisma.PickEnumerable<Prisma.NhanvienGroupByOutputType, "trangThai"[]> & {
            _count: number;
        })[];
        byChucVu: (Prisma.PickEnumerable<Prisma.NhanvienGroupByOutputType, "chucVu"[]> & {
            _count: number;
        })[];
        withUser: number;
        withoutPhongban: number;
    }>;
    linkToUser(nhanvienId: string, userId: string): Promise<Nhanvien>;
    unlinkFromUser(nhanvienId: string): Promise<Nhanvien>;
}
