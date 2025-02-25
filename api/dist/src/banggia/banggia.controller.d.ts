import { BanggiaService } from './banggia.service';
export declare class BanggiaController {
    private readonly banggiaService;
    constructor(banggiaService: BanggiaService);
    create(createBanggiaDto: any): Promise<{
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
        order: number | null;
        title: string;
        isActive: boolean;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    findAll(): Promise<({
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
        order: number | null;
        title: string;
        isActive: boolean;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
    })[]>;
    findOne(id: string): Promise<{
        sanpham: {
            id: string;
            order: number | null;
            title: string;
            slug: string | null;
            isActive: boolean;
            masp: string;
            giagoc: number;
            dvt: string | null;
            hinhanh: string | null;
            soluong: number;
            soluongkho: number;
            ghichu: string | null;
            giaban: number;
        }[];
        id: string;
        order: number | null;
        title: string;
        isActive: boolean;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    update(id: string, updateBanggiaDto: any): Promise<{
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
        order: number | null;
        title: string;
        isActive: boolean;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        order: number | null;
        title: string;
        isActive: boolean;
        type: string;
        batdau: Date | null;
        ketthuc: Date | null;
    }>;
    reorder(body: {
        banggiaIds: string[];
    }): Promise<void>;
}
