import { PrismaService } from 'prisma/prisma.service';
import { ImportdataService } from 'src/importdata/importdata.service';
import { SocketGateway } from 'src/socket.gateway';
import { BanggiaPriceHistoryService } from './banggia-price-history.service';
export declare class BanggiaService {
    private readonly prisma;
    private readonly _SocketGateway;
    private readonly _ImportdataService;
    private readonly priceHistoryService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ImportdataService: ImportdataService, priceHistoryService: BanggiaPriceHistoryService);
    private formatDateForFilename;
    importSPBG(listBanggia: any[]): Promise<{}>;
    importBanggia(data: any): Promise<any[]>;
    importBGKH(data: any[]): Promise<any[]>;
    create(data: any): Promise<{
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
    createBanggia(data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            banggiaId: string;
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
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
    reorderBanggias(banggiaIds: string[]): Promise<null>;
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
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            banggiaId: string | null;
            subtitle: string | null;
            email: string | null;
            diachi: string | null;
            sdt: string | null;
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
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            banggiaId: string;
            giaban: import("@prisma/client/runtime/library").Decimal;
            sanphamId: string;
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
    remove(id: string): Promise<{
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
    removeBulk(ids: string[]): Promise<{
        success: number;
        fail: number;
        errors: any[];
        message: string;
    }>;
    addKHtoBG(banggiaId: string, khachhangIds: any[]): Promise<{
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
    removeKHfromBG(banggiaId: string, khachhangIds: any[]): Promise<{
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
    bulkUpdatePrices(updates: Array<{
        banggiaId: string;
        sanphamId: string;
        newPrice: number;
        reason?: string;
    }>, userId: string): Promise<{
        total: number;
        successful: number;
        failed: number;
        results: any[];
    }>;
}
