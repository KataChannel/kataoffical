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
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
        isDefault: boolean;
    }>;
    createBanggia(data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: import("@prisma/client/runtime/library").Decimal;
            banggiaId: string;
            sanphamId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
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
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
        isDefault: boolean;
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            giaban: number;
            id: string;
            title: string;
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
            ghichu: string | null;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            vat: import("@prisma/client/runtime/library").Decimal | null;
        }[];
        khachhang: {
            id: string;
            subtitle: string | null;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            name: string | null;
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
            banggiaId: string | null;
            isshowvat: boolean;
        }[];
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
        isDefault: boolean;
    }>;
    update(id: string, data: any): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            isActive: boolean;
            giaban: import("@prisma/client/runtime/library").Decimal;
            banggiaId: string;
            sanphamId: string;
        }[];
    } & {
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
        isDefault: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
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
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
        isDefault: boolean;
    }>;
    removeKHfromBG(banggiaId: string, khachhangIds: any[]): Promise<{
        id: string;
        title: string | null;
        ghichu: string | null;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        mabanggia: string | null;
        type: string | null;
        batdau: Date | null;
        ketthuc: Date | null;
        status: string | null;
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
