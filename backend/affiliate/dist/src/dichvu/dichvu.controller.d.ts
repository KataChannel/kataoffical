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
        tabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
        price: number;
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
        tabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
        price: number;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            tabCode: string | null;
            TabCardCode: string | null;
            TabMedicineCode: string | null;
            serviceCode: string | null;
            serviceName: string | null;
            price: number;
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
            tabCode: string | null;
            TabCardCode: string | null;
            TabMedicineCode: string | null;
            serviceCode: string | null;
            serviceName: string | null;
            price: number;
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
        tabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
        price: number;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        tabCode: string | null;
        TabCardCode: string | null;
        TabMedicineCode: string | null;
        serviceCode: string | null;
        serviceName: string | null;
        price: number;
    }>;
    reorder(body: {
        dichvuIds: string[];
    }): Promise<{
        status: string;
    }>;
}
