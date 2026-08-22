import { PrismaService } from '../../prisma/prisma.service';
export declare class NhuCauDatHangResolver {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toNum;
    getNhuCauDatHang(startDate: string, endDate: string): Promise<{
        data: {
            Donhangs: any[];
            id: string;
            masp: string;
            title: string;
            dvt: string | null;
            haohut: number;
            mancc: string;
            name: string;
            slton: number;
            sltontt: number;
            slchogiao: number;
            slchonhap: number;
            updatedAt: any;
            SLDat: number;
            xSLDat: number;
            khachdat: number;
            khachgiao: number;
            khachhuy: number;
            slsnapshot: number;
            kho1: number;
            kho2: number;
            kho3: number;
            kho4: number;
            kho5: number;
            kho6: number;
            Dathangs: any[];
            ghichu: string;
        }[];
        totalCount: number;
    }>;
    saveNhucauNote(sanphamId: string, content: string): Promise<{
        success: boolean;
        data: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            sanphamId: string;
            content: string;
        };
        message?: undefined;
    } | {
        success: boolean;
        message: any;
        data?: undefined;
    }>;
}
