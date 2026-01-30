import { PhongbanService } from './phongban.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
export declare class PhongbanController {
    private readonly phongbanService;
    constructor(phongbanService: PhongbanService);
    create(createPhongbanDto: CreatePhongbanDto): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }>;
    findAll(level?: string, loai?: string, parentId?: string, includeChildren?: string): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }[]>;
    getTree(): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }[]>;
    getStatistics(): Promise<{
        total: number;
        byLevel: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PhongbanGroupByOutputType, "level"[]> & {
            _count: number;
        })[];
        byLoai: (import(".prisma/client").Prisma.PickEnumerable<import(".prisma/client").Prisma.PhongbanGroupByOutputType, "loai"[]> & {
            _count: number;
        })[];
        topByNhanvien: {
            id: string;
            ma: string;
            ten: string;
            nhanvienCount: number;
        }[];
    }>;
    findByMa(ma: string): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }>;
    update(id: string, updatePhongbanDto: UpdatePhongbanDto): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        parentId: string | null;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
