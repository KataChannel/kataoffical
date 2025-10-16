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
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
            banggiaId: string;
            order: number | null;
            isActive: boolean;
        }[];
    } & {
        id: string;
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
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
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
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
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    removeKHfromBG(data: any): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            order: number | null;
            isActive: boolean;
            title: string;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            title2: string | null;
            slug: string | null;
            masp: string;
            subtitle: string | null;
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
            banggiaId: string | null;
            isActive: boolean;
            ghichu: string | null;
            createdAt: Date;
            updatedAt: Date;
            subtitle: string | null;
            name: string | null;
            email: string | null;
            isshowvat: boolean;
            namenn: string | null;
            makh: string;
            makhold: string | null;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenfile: string | null;
            tenkh: string | null;
        }[];
        id: string;
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
        sanpham: {
            id: string;
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
            banggiaId: string;
            order: number | null;
            isActive: boolean;
        }[];
    } & {
        id: string;
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number | null;
        isActive: boolean;
        title: string | null;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        ghichu: string | null;
        status: string | null;
        createdAt: Date;
        updatedAt: Date;
        isDefault: boolean;
    }>;
    removeBulk(body: {
        ids: string[];
    }): Promise<{
        success: number;
        fail: number;
        errors: any[];
        message: string;
    }>;
    getPriceHistory(banggiaId: string, sanphamId: string): Promise<{
        id: string;
        action: import(".prisma/client").$Enums.AuditAction;
        oldPrice: any;
        newPrice: any;
        reason: any;
        priceChange: any;
        changedAt: Date;
        changedBy: {
            id: string;
            email: string | null;
            name: string | null;
        } | null;
        banggia: {
            id: string;
            code: string | null;
            title: string | null;
        };
        sanpham: {
            id: string;
            code: string;
            title: string;
        };
    }[]>;
    getCurrentPrice(banggiaId: string, sanphamId: string): Promise<number | null>;
    bulkUpdatePrices(body: {
        updates: Array<{
            banggiaId: string;
            sanphamId: string;
            newPrice: number;
            reason?: string;
        }>;
        userId: string;
    }): Promise<{
        total: number;
        successful: number;
        failed: number;
        results: any[];
    }>;
}
