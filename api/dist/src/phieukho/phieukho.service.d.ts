import { PrismaService } from 'prisma/prisma.service';
export declare class PhieukhoService {
    private readonly prisma;
    constructor(prisma: PrismaService);
    findAll(): Promise<({
        kho: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        };
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    })[]>;
    findOne(id: string): Promise<{
        kho: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            ghichu: string | null;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        };
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    create(data: any): Promise<{
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        type: string;
        maphieu: string;
        ngay: Date;
        khoId: string;
    }>;
}
