import { PrismaService } from 'prisma/prisma.service';
export declare class OptimizedCongnoccService {
    private prisma;
    constructor(prisma: PrismaService);
    congnoccSelectiveFields(params: any): Promise<{
        id: any;
        madathang: any;
        ngaynhan: any;
        tong: string;
        soluong: string;
        tonnhap: string;
        tennhacungcap: any;
        manhacungcap: any;
    }[]>;
    congnoccRawSQL(params: any): Promise<{
        id: any;
        madathang: any;
        ngaynhan: any;
        tong: string;
        soluong: string;
        tonnhap: string;
        tennhacungcap: any;
        manhacungcap: any;
    }[]>;
    congnoccCached(params: any): Promise<{
        id: any;
        madathang: any;
        ngaynhan: any;
        tong: string;
        soluong: string;
        tonnhap: string;
        tennhacungcap: any;
        manhacungcap: any;
    }[]>;
}
