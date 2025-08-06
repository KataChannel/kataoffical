import { PaginationInfo } from './common.types';
export declare class Sanpham {
    id: string;
    title: string;
    title2?: string;
    slug?: string;
    masp: string;
    subtitle?: string;
    giagoc: number;
    giaban: number;
    dvt?: string;
    hinhanh?: string;
    loadpoint?: number;
    vat?: number;
    soluong?: number;
    soluongkho?: number;
    haohut: number;
    ghichu?: string;
    order?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    banggia?: Banggiasanpham[];
    nhacungcap?: Nhacungcap[];
}
export declare class Banggiasanpham {
    id: string;
    giaban: number;
    sanphamId: string;
    banggiaId: string;
    order?: number;
    isActive: boolean;
    sanpham: Sanpham;
    banggia: Banggia;
}
export declare class Banggia {
    id: string;
    title?: string;
    mabanggia?: string;
    type?: string;
    batdau?: Date;
    ketthuc?: Date;
    order?: number;
    ghichu?: string;
    status?: string;
    isActive: boolean;
    isDefault: boolean;
    createdAt: Date;
    updatedAt: Date;
    sanpham: Banggiasanpham[];
}
export declare class Nhacungcap {
    id: string;
    name?: string;
    tenfile?: string;
    mancc: string;
    manccold?: string;
    diachi?: string;
    email?: string;
    sdt?: string;
    ghichu?: string;
    isActive: boolean;
    isshowvat: boolean;
    createdAt: Date;
    updatedAt: Date;
    sanpham: Sanpham[];
}
export declare class SanphamPaginated {
    data: Sanpham[];
    pagination: PaginationInfo;
}
export declare class CreateSanphamInput {
    title: string;
    title2?: string;
    slug?: string;
    masp: string;
    subtitle?: string;
    giagoc: number;
    giaban: number;
    dvt?: string;
    hinhanh?: string;
    loadpoint?: number;
    vat?: number;
    soluong?: number;
    soluongkho?: number;
    haohut: number;
    ghichu?: string;
    order?: number;
    isActive: boolean;
}
export declare class UpdateSanphamInput {
    id: string;
    title?: string;
    title2?: string;
    slug?: string;
    masp?: string;
    subtitle?: string;
    giagoc?: number;
    giaban?: number;
    dvt?: string;
    hinhanh?: string;
    loadpoint?: number;
    vat?: number;
    soluong?: number;
    soluongkho?: number;
    haohut?: number;
    ghichu?: string;
    order?: number;
    isActive?: boolean;
}
export declare class SanphamFilterInput {
    search?: string;
    isActive?: boolean;
    dvt?: string;
    minPrice?: number;
    maxPrice?: number;
}
