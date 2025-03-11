import { DonhangService } from './donhang.service';
export declare class DonhangController {
    private readonly donhangService;
    constructor(donhangService: DonhangService);
    create(createDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
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
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    search(params: any): Promise<{
        sanpham: any[];
        khachhang: {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            namenn: string | null;
            makh: string;
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
        };
        name: string | null;
        id: string;
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findAll(): Promise<{
        sanpham: any[];
        name: string | null;
        khachhang: {
            banggia: ({
                sanpham: {
                    id: string;
                    order: number | null;
                    isActive: boolean;
                    giaban: number;
                    sanphamId: string;
                    banggiaId: string;
                }[];
            } & {
                id: string;
                title: string;
                type: string;
                ghichu: string | null;
                status: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                batdau: Date | null;
                ketthuc: Date | null;
            })[];
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            namenn: string | null;
            makh: string;
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
        };
        id: string;
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
            title: string;
            order: number | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            slug: string | null;
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
                    order: number | null;
                    isActive: boolean;
                    giaban: number;
                    sanphamId: string;
                    banggiaId: string;
                }[];
            } & {
                id: string;
                title: string;
                type: string;
                ghichu: string | null;
                status: string | null;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                batdau: Date | null;
                ketthuc: Date | null;
            })[];
        } & {
            id: string;
            ghichu: string | null;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            name: string | null;
            namenn: string | null;
            makh: string;
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
        };
        id: string;
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, updateDonhangDto: any): Promise<{
        sanpham: {
            id: string;
            ghichu: string | null;
            order: number | null;
            isActive: boolean | null;
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
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string;
        type: string | null;
        madonhang: string;
        ngaygiao: Date | null;
        ghichu: string | null;
        status: import(".prisma/client").$Enums.StatusDonhang;
        khachhangId: string;
        order: number | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    reorder(body: {
        donhangIds: string[];
    }): Promise<void>;
}
