import { PaginationInfo } from './common.types';
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
    sanphamIds?: string[];
}
export declare class BanggiaPaginated {
    data: Banggia[];
    pagination: PaginationInfo;
}
export declare class CreateBanggiaInput {
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
}
export declare class UpdateBanggiaInput {
    id: string;
    title?: string;
    mabanggia?: string;
    type?: string;
    batdau?: Date;
    ketthuc?: Date;
    order?: number;
    ghichu?: string;
    status?: string;
    isActive?: boolean;
    isDefault?: boolean;
}
export declare class BanggiaFilterInput {
    search?: string;
    isActive?: boolean;
    isDefault?: boolean;
    type?: string;
    status?: string;
}
