import { PrismaService } from 'prisma/prisma.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
import { Phongban, Prisma } from '@prisma/client';
export declare class PhongbanService {
    private prisma;
    constructor(prisma: PrismaService);
    create(createPhongbanDto: CreatePhongbanDto): Promise<Phongban>;
    findAll(options?: {
        level?: number;
        loai?: string;
        parentId?: string;
        includeChildren?: boolean;
    }): Promise<Phongban[]>;
    findOne(id: string): Promise<Phongban>;
    findByMa(ma: string): Promise<Phongban>;
    getTree(): Promise<Phongban[]>;
    update(id: string, updatePhongbanDto: UpdatePhongbanDto): Promise<Phongban>;
    remove(id: string): Promise<{
        message: string;
    }>;
    getStatistics(): Promise<{
        total: number;
        byLevel: (Prisma.PickEnumerable<Prisma.PhongbanGroupByOutputType, "level"[]> & {
            _count: number;
        })[];
        byLoai: (Prisma.PickEnumerable<Prisma.PhongbanGroupByOutputType, "loai"[]> & {
            _count: number;
        })[];
        topByNhanvien: {
            id: string;
            ma: string;
            ten: string;
            nhanvienCount: number;
        }[];
    }>;
}
