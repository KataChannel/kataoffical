import { PaginationInfo } from './common.types';
import { Donhang } from './donhang.types';
import { Sanpham } from './sanpham.types';
export declare class Congty {
    id: string;
    name: string;
    diachi?: string;
    email?: string;
    sdt?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    kho: Kho[];
}
export declare class Kho {
    id: string;
    name: string;
    makho?: string;
    diachi?: string;
    sdt?: string;
    ghichu?: string;
    congtyId?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    congty?: Congty;
    sanphamKho: SanphamKho[];
    phieukho: PhieuKho[];
}
export declare class SanphamKho {
    id: string;
    khoId: string;
    sanphamId: string;
    soluong: number;
    ghichu?: string;
    createdAt: Date;
    updatedAt: Date;
    kho: Kho;
    sanpham: Sanpham;
}
export declare class PhieuKho {
    id: string;
    title?: string;
    maphieu?: string;
    madonhang?: string;
    madncc?: string;
    madathang?: string;
    ngay?: Date;
    type?: string;
    isChotkho: boolean;
    khoId?: string;
    ghichu?: string;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    donhang?: Donhang;
    kho?: Kho;
    sanpham: PhieuKhoSanpham[];
}
export declare class PhieuKhoSanpham {
    id: string;
    sanphamId: string;
    soluong: number;
    ghichu?: string;
    phieuKhoId: string;
    createdAt: Date;
    updatedAt: Date;
    sanpham: Sanpham;
    phieuKho: PhieuKho;
}
export declare class TonKho {
    id: string;
    sanphamId: string;
    slton: number;
    slchogiao: number;
    slchonhap: number;
    sanpham: Sanpham;
}
export declare class KhoPaginated {
    data: Kho[];
    pagination: PaginationInfo;
}
export declare class PhieuKhoPaginated {
    data: PhieuKho[];
    pagination: PaginationInfo;
}
export declare class TonKhoPaginated {
    data: TonKho[];
    pagination: PaginationInfo;
}
export declare class CreateKhoInput {
    name: string;
    makho?: string;
    diachi?: string;
    sdt?: string;
    ghichu?: string;
    congtyId?: string;
    isActive: boolean;
}
export declare class UpdateKhoInput {
    id: string;
    name?: string;
    makho?: string;
    diachi?: string;
    sdt?: string;
    ghichu?: string;
    congtyId?: string;
    isActive?: boolean;
}
export declare class CreatePhieuKhoInput {
    title?: string;
    maphieu?: string;
    madonhang?: string;
    madncc?: string;
    madathang?: string;
    ngay?: Date;
    type?: string;
    isChotkho: boolean;
    khoId?: string;
    ghichu?: string;
    isActive: boolean;
    sanpham: CreatePhieuKhoSanphamInput[];
}
export declare class CreatePhieuKhoSanphamInput {
    sanphamId: string;
    soluong: number;
    ghichu?: string;
}
export declare class UpdatePhieuKhoInput {
    id: string;
    title?: string;
    maphieu?: string;
    madonhang?: string;
    madncc?: string;
    madathang?: string;
    ngay?: Date;
    type?: string;
    isChotkho?: boolean;
    khoId?: string;
    ghichu?: string;
    isActive?: boolean;
    sanpham?: UpdatePhieuKhoSanphamInput[];
}
export declare class UpdatePhieuKhoSanphamInput {
    id?: string;
    sanphamId: string;
    soluong?: number;
    ghichu?: string;
}
export declare class KhoFilterInput {
    search?: string;
    isActive?: boolean;
    congtyId?: string;
}
export declare class PhieuKhoFilterInput {
    search?: string;
    type?: string;
    isActive?: boolean;
    isChotkho?: boolean;
    khoId?: string;
    startDate?: Date;
    endDate?: Date;
}
export declare class TonKhoFilterInput {
    search?: string;
    sanphamId?: string;
    minSlton?: number;
    maxSlton?: number;
}
