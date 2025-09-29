import { DichvuService } from './dichvu.service';
export declare class DichvuController {
    private readonly dichvuService;
    constructor(dichvuService: DichvuService);
    create(data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        price: number;
        TabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
    }>;
    syncsdichvu(param: any): Promise<{
        success: number;
        failure: number;
    }>;
    findby(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        price: number;
        TabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            price: number;
            TabCode: string | null;
            TabCardCode: string | null;
            TabMedicineCode: string | null;
            serviceCode: string | null;
            serviceName: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: string, limit?: string): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            price: number;
            TabCode: string | null;
            TabCardCode: string | null;
            TabMedicineCode: string | null;
            serviceCode: string | null;
            serviceName: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    getLastUpdatedDichvu(): Promise<{
        updatedAt: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        price: number;
        TabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        price: number;
        TabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
    }>;
    reorder(body: {
        dichvuIds: string[];
    }): Promise<{
        status: string;
    }>;
}
