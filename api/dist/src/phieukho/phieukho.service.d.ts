import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
export declare class PhieukhoService {
    private readonly prisma;
    private _ImportdataService;
    constructor(prisma: PrismaService, _ImportdataService: ImportdataService);
    generateNextOrderCode(type: any): Promise<string>;
    private incrementOrderCode;
    private incrementLetters;
    xuatnhapton(query: any): Promise<{
        khoname: string;
        maphieu: string | null;
        ngay: Date | null;
        type: string | null;
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            title: string;
        }[];
    }[]>;
    findAll(): Promise<{
        sanpham: {
            sanpham: {
                id: string;
                title: string;
                ghichu: string | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                title2: string | null;
                slug: string | null;
                masp: string;
                subtitle: string | null;
                giagoc: number;
                giaban: number;
                dvt: string | null;
                hinhanh: string | null;
                loadpoint: number | null;
                vat: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: number;
                order: number | null;
            };
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            makho: string | null;
            diachi: string | null;
            sdt: string | null;
            congtyId: string | null;
        } | null;
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            makho: string | null;
            diachi: string | null;
            sdt: string | null;
            congtyId: string | null;
        } | null;
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        maphieu: string | null;
        madonhang: string | null;
        madncc: string | null;
        madathang: string | null;
        ngay: Date | null;
        type: string | null;
        khoId: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
