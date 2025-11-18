import { PhongbanService } from './phongban.service';
import { CreatePhongbanDto, UpdatePhongbanDto } from './dto';
export declare class PhongbanResolver {
    private readonly phongbanService;
    constructor(phongbanService: PhongbanService);
    create(createPhongbanDto: CreatePhongbanDto): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(level?: number, loai?: string, parentId?: string, includeChildren?: boolean): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getTree(): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
    findOne(id: string): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findByMa(ma: string): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updatePhongbanDto: UpdatePhongbanDto): Promise<{
        id: string;
        ma: string;
        ten: string;
        loai: import(".prisma/client").$Enums.LoaiPhongban;
        level: number;
        moTa: string | null;
        dienThoai: string | null;
        email: string | null;
        diaChi: string | null;
        truongPhongId: string | null;
        parentId: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
