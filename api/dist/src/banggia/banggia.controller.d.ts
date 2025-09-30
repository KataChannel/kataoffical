import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    import(data: any): Promise<any[]>;
    importspbg(data: any): Promise<{}>;
    importbgkh(data: any): Promise<any[]>;
    create(createBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    findAll(): Promise<{
        sanpham: number;
        khachhang: number;
        ListKH: {
            makh: string;
            name: string | null;
        }[];
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }[]>;
    getbgsp(): Promise<{
        mabanggia: string | null;
        masp: string;
        title: string;
        giaban: number;
    }[]>;
    getbgkh(): Promise<{
        mabanggia: string | null;
        makh: string;
    }[]>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<null>;
    addMultipleKhachhangToBanggia(data: any): Promise<{
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    removeKHfromBG(data: any): Promise<{
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            title: string;
            order: number | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            subtitle: string | null;
            title2: string | null;
            slug: string | null;
            masp: string;
            giagoc: import("@prisma/client/runtime/library").Decimal;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: import("@prisma/client/runtime/library").Decimal | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: import("@prisma/client/runtime/library").Decimal;
            vat: import("@prisma/client/runtime/library").Decimal | null;
        }[];
        khachhang: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            banggiaId: string | null;
            namenn: string | null;
            subtitle: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            email: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
            isshowvat: boolean;
        }[];
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        order: number | null;
        ghichu: string | null;
        status: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    remove(id: string): void;
}
