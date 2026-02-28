import { LoaiPhongban } from '@prisma/client';
export declare class CreatePhongbanDto {
    ma: string;
    ten: string;
    loai: LoaiPhongban;
    level?: number;
    parentId?: string;
    truongPhongId?: string;
    moTa?: string;
}
