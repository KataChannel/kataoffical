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
            giaban: number;
            order: number | null;
            isActive: boolean;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    removeKHfromBG(data: any): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            title: string;
            title2: string | null;
            slug: string | null;
            masp: string;
            subtitle: string | null;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            loadpoint: number | null;
            soluong: import("@prisma/client/runtime/library").Decimal | null;
            soluongkho: import("@prisma/client/runtime/library").Decimal | null;
            haohut: number;
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
        }[];
        khachhang: {
            id: string;
            subtitle: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            tenfile: string | null;
            tenkh: string | null;
            name: string | null;
            namenn: string | null;
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
        }[];
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            giaban: number;
            order: number | null;
            isActive: boolean;
            sanphamId: string;
            banggiaId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        type: string | null;
        status: string | null;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    remove(id: string): void;
}
