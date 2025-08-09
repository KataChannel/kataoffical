import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { TimezoneUtilService } from '../shared/services/timezone-util.service';
export declare class PhieukhoService {
    private readonly prisma;
    private _ImportdataService;
    private readonly timezoneUtil;
    constructor(prisma: PrismaService, _ImportdataService: ImportdataService, timezoneUtil: TimezoneUtilService);
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
                soluong: import("@prisma/client/runtime/library").Decimal | null;
                soluongkho: import("@prisma/client/runtime/library").Decimal | null;
                haohut: number;
                ghichu: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
            };
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        } | null;
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
        kho: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            diachi: string | null;
            sdt: string | null;
            makho: string | null;
            congtyId: string | null;
        } | null;
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
    create(data: any): Promise<any>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            soluong: import("@prisma/client/runtime/library").Decimal;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            phieuKhoId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        madonhang: string | null;
        madncc: string | null;
        khoId: string | null;
        maphieu: string | null;
        madathang: string | null;
        ngay: Date | null;
        isChotkho: boolean;
    }>;
}
