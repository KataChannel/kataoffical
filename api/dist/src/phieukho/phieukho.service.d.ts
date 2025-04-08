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
    findAll(): Promise<{
        sanpham: {
            sanpham: {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                order: number | null;
                slug: string | null;
                masp: string;
                giagoc: number;
                dvt: string | null;
                hinhanh: string | null;
                soluong: number;
                soluongkho: number;
                haohut: number;
                ghichu: string | null;
            };
            id: string;
            createdAt: Date;
            updatedAt: Date;
            soluong: number;
            ghichu: string | null;
            sanphamId: string;
            sldat: number;
            phieuKhoId: string;
        }[];
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
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        khoId: string;
        maphieu: string;
        ngay: Date;
    }[]>;
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
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        khoId: string;
        maphieu: string;
        ngay: Date;
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
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        khoId: string;
        maphieu: string;
        ngay: Date;
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
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        khoId: string;
        maphieu: string;
        ngay: Date;
    }>;
    remove(id: string): Promise<{
        type: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        ghichu: string | null;
        khoId: string;
        maphieu: string;
        ngay: Date;
    }>;
}
