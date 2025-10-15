import { PrismaService } from '../../prisma/prisma.service';
import { Prisma } from '@prisma/client';
export declare class OptimizedCongnoService {
    private prisma;
    constructor(prisma: PrismaService);
    getCongnoKhachHangOptimized(params: any): Promise<{
        id: string;
        madonhang: string;
        ngaygiao: Date | null;
        tong: string;
        soluong: string;
        tongtien: Prisma.Decimal;
        tongvat: Prisma.Decimal;
        name: string | null | undefined;
        makh: string | undefined;
    }[]>;
    getCongnoKhachHangWithAggregation(params: any): Promise<{
        id: any;
        madonhang: any;
        ngaygiao: any;
        tong: string;
        soluong: string;
        tongtien: any;
        tongvat: any;
        name: any;
        makh: any;
    }[]>;
    getCongnoKhachHangCached(params: any): Promise<{
        id: any;
        madonhang: any;
        ngaygiao: any;
        tong: string;
        soluong: string;
        tongtien: any;
        tongvat: any;
        name: any;
        makh: any;
    }[]>;
}
