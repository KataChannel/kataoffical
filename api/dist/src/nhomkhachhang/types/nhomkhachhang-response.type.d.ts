import { Nhomkhachhang } from '../entities/nhomkhachhang.entity';
export declare class NhomkhachhangConnection {
    data: Nhomkhachhang[];
    total: number;
    page: number;
    limit: number;
    totalPages: number;
    hasNextPage: boolean;
    hasPreviousPage: boolean;
}
export declare class NhomkhachhangMutationResponse {
    success: boolean;
    message?: string;
    data?: Nhomkhachhang;
}
