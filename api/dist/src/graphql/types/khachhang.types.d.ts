import { PaginationInfo } from './common.types';
import { Banggia } from './sanpham.types';
export declare class Nhomkhachhang {
    id: string;
    name: string;
    description?: string;
    createdAt: Date;
    updatedAt: Date;
    khachhang: Khachhang[];
}
export declare class Khachhang {
    id: string;
    tenfile?: string;
    tenkh?: string;
    name?: string;
    namenn?: string;
    subtitle?: string;
    makh: string;
    makhold?: string;
    diachi?: string;
    sdt?: string;
    mst?: string;
    gionhanhang?: string;
    quan?: string;
    email?: string;
    phone?: string;
    address?: string;
    loaikh?: string;
    ghichu?: string;
    hiengia: boolean;
    isActive: boolean;
    istitle2: boolean;
    isshowvat: boolean;
    banggiaId?: string;
    createdAt: Date;
    updatedAt: Date;
    banggia?: Banggia;
    nhomkhachhang: Nhomkhachhang[];
}
export declare class KhachhangPaginated {
    data: Khachhang[];
    pagination: PaginationInfo;
}
export declare class CreateKhachhangInput {
    tenfile?: string;
    tenkh?: string;
    name?: string;
    namenn?: string;
    subtitle?: string;
    makh: string;
    makhold?: string;
    diachi?: string;
    sdt?: string;
    mst?: string;
    gionhanhang?: string;
    quan?: string;
    email?: string;
    phone?: string;
    address?: string;
    loaikh?: string;
    ghichu?: string;
    hiengia: boolean;
    isActive: boolean;
    istitle2: boolean;
    isshowvat: boolean;
    banggiaId?: string;
}
export declare class UpdateKhachhangInput {
    id: string;
    tenfile?: string;
    tenkh?: string;
    name?: string;
    namenn?: string;
    subtitle?: string;
    makh?: string;
    makhold?: string;
    diachi?: string;
    sdt?: string;
    mst?: string;
    gionhanhang?: string;
    quan?: string;
    email?: string;
    phone?: string;
    address?: string;
    loaikh?: string;
    ghichu?: string;
    hiengia?: boolean;
    isActive?: boolean;
    istitle2?: boolean;
    isshowvat?: boolean;
    banggiaId?: string;
}
export declare class KhachhangFilterInput {
    search?: string;
    isActive?: boolean;
    loaikh?: string;
    quan?: string;
    hiengia?: boolean;
}
