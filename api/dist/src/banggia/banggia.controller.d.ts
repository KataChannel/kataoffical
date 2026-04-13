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
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        isDefault: boolean;
    }>;
    removeKHfromBG(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        isDefault: boolean;
    }>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            banggiasanphamId: string;
            sanphamId: string;
            id: string;
            createdAt: Date;
            updatedAt: Date;
            order: number | null;
            title: string;
            ghichu: string | null;
            isActive: boolean;
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
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            isActive: boolean;
            subtitle: string | null;
            diachi: string | null;
            email: string | null;
            sdt: string | null;
            isshowvat: boolean;
            tenfile: string | null;
            namenn: string | null;
            makh: string;
            makhold: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
            hiengia: boolean;
            istitle2: boolean;
            tenkh: string | null;
            banggiaId: string | null;
            machuyen: string | null;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        isDefault: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string | null;
        title: string | null;
        type: string | null;
        ghichu: string | null;
        isActive: boolean;
        mabanggia: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
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
        oldPrice: number;
        newPrice: number;
        difference: number;
        percentChange: number;
        reason: string | null;
        changedAt: Date;
        changedBy: string | null;
        changedByName: any;
        changedByUserId: any;
        sourceType: string | null;
        batchId: string | null;
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
        metadata: import("@prisma/client/runtime/library").JsonValue;
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
