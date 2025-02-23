import { DonhangService } from './donhang.service';
export declare class DonhangController {
    private readonly donhangService;
    constructor(donhangService: DonhangService);
    create(createDonhangDto: any): Promise<{
        id: string;
        order: number | null;
        title: string;
        slug: string | null;
        masp: string;
        giagoc: number;
        dvt: string | null;
        hinhanh: string | null;
        soluong: number;
        soluongkho: number;
        ghichu: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
    update(id: string, updateDonhangDto: any): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number;
        title: string;
        ghichu: string | null;
        type: string;
        madonhang: string;
        ngaygiao: Date;
        khachhang: string;
    }>;
    reorder(body: {
        donhangIds: string[];
    }): Promise<void>;
}
