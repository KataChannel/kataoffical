import { SanphamService } from './sanpham.service';
export declare class SanphamController {
    private readonly sanphamService;
    constructor(sanphamService: SanphamService);
    create(createSanphamDto: any): Promise<{
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
    }[]>;
    findOne(id: string): Promise<{
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
    update(id: string, updateSanphamDto: any): Promise<{
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
    remove(id: string): Promise<{
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
    reorder(body: {
        sanphamIds: string[];
    }): Promise<void>;
}
