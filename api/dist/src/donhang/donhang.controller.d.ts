import { DonhangService } from './donhang.service';
export declare class DonhangController {
    private readonly donhangService;
    constructor(donhangService: DonhangService);
    create(createDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean | null;
            order: number | null;
            ghichu: string | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            donhangId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }>;
    search(params: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }[]>;
    findAll(): Promise<{
        sanpham: any[];
        khachhang: {
            id: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
        };
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }[]>;
    findOne(id: string): Promise<{
        sanpham: {
            idSP: string;
            giaban: number | undefined;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            ghichu: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            title: string;
            slug: string | null;
            order: number | null;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
            haohut: number;
        }[];
        khachhang: {
            banggia: ({
                sanpham: {
                    id: string;
                    isActive: boolean;
                    order: number | null;
                    giaban: number;
                    sanphamId: string;
                    banggiaId: string;
                }[];
            } & {
                id: string;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                title: string;
                order: number | null;
                ghichu: string | null;
                type: string;
                batdau: Date | null;
                ketthuc: Date | null;
                status: string | null;
            })[];
        } & {
            id: string;
            email: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            ghichu: string | null;
            namenn: string | null;
            makh: string;
            diachi: string | null;
            sdt: string | null;
            mst: string | null;
            gionhanhang: string | null;
            quan: string | null;
            phone: string | null;
            address: string | null;
            loaikh: string | null;
        };
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }>;
    update(id: string, updateDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            isActive: boolean | null;
            order: number | null;
            ghichu: string | null;
            idSP: string;
            sldat: number | null;
            slgiao: number | null;
            slnhan: number | null;
            ttdat: number | null;
            ttgiao: number | null;
            ttnhan: number | null;
            donhangId: string;
        }[];
    } & {
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        title: string;
        order: number | null;
        ghichu: string | null;
        type: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        madonhang: string;
        ngaygiao: Date | null;
        khachhangId: string;
    }>;
    reorder(body: {
        donhangIds: string[];
    }): Promise<void>;
}
