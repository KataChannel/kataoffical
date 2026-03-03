import { PrismaService } from '../../prisma/prisma.service';
export declare class NhuCauDatHangResolver {
    private readonly prisma;
    constructor(prisma: PrismaService);
    private toNum;
    getNhuCauDatHang(startDate: string, endDate: string): Promise<{
        data: {
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
            kho1: number;
            kho2: number;
            kho3: number;
            kho4: number;
            kho5: number;
            kho6: number;
            Dathangs: any[];
            Donhangs: never[];
        }[];
        meta: {
            totalProducts: number;
            startDate: string;
            endDate: string;
            generatedAt: string;
        };
    }>;
}
