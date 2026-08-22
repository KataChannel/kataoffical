import { StatusDonhang } from '../enums';
import { PaginationInfo } from './common.types';
import { Khachhang } from './khachhang.types';
import { Sanpham } from './sanpham.types';
export declare class Donhang {
    id: string;
    title?: string;
    type?: string;
    madonhang: string;
    ngaygiao?: Date;
    ghichu?: string;
    isshowvat: boolean;
    status: StatusDonhang;
    khachhangId: string;
    printCount?: number;
    order?: number;
    isActive: boolean;
    createdAt: Date;
    updatedAt: Date;
    tongvat: number;
    tongtien: number;
    khachhang: Khachhang;
    sanpham: Donhangsanpham[];
}
export declare class Donhangsanpham {
    id: string;
    idSP: string;
    giaban: number;
    sldat: number;
    slgiao: number;
    slnhan: number;
    slhuy: number;
    ttdat: number;
    ttgiao: number;
    ttnhan: number;
    vat: number;
    ttsauvat: number;
    ghichu?: string;
    donhangId: string;
    order?: number;
    isActive?: boolean;
    sanpham: Sanpham;
    donhang: Donhang;
}
export declare class DonhangPaginated {
    data: Donhang[];
    pagination: PaginationInfo;
}
export declare class CreateDonhangInput {
    title?: string;
    type?: string;
    ngaygiao?: Date;
    ghichu?: string;
    isshowvat: boolean;
    status: StatusDonhang;
    khachhangId: string;
    order?: number;
    isActive: boolean;
    tongvat: number;
    tongtien: number;
    sanpham: CreateDonhangsanphamInput[];
}
export declare class CreateDonhangsanphamInput {
    idSP: string;
    giaban: number;
    sldat: number;
    slgiao: number;
    slnhan: number;
    slhuy: number;
    ttdat: number;
    ttgiao: number;
    ttnhan: number;
    vat: number;
    ttsauvat: number;
    ghichu?: string;
    order?: number;
    isActive?: boolean;
}
export declare class UpdateDonhangInput {
    id: string;
    title?: string;
    type?: string;
    ngaygiao?: Date;
    ghichu?: string;
    isshowvat?: boolean;
    status?: StatusDonhang;
    khachhangId?: string;
    order?: number;
    isActive?: boolean;
    tongvat?: number;
    tongtien?: number;
    sanpham?: UpdateDonhangsanphamInput[];
}
export declare class UpdateDonhangsanphamInput {
    id?: string;
    idSP: string;
    giaban?: number;
    sldat?: number;
    slgiao?: number;
    slnhan?: number;
    slhuy?: number;
    ttdat?: number;
    ttgiao?: number;
    ttnhan?: number;
    vat?: number;
    ttsauvat?: number;
    ghichu?: string;
    order?: number;
    isActive?: boolean;
}
export declare class DonhangFilterInput {
    search?: string;
    status?: StatusDonhang;
    statuses?: StatusDonhang[];
    khachhangId?: string;
    startDate?: Date;
    endDate?: Date;
    isActive?: boolean;
    isshowvat?: boolean;
    minTongtien?: number;
    maxTongtien?: number;
}
