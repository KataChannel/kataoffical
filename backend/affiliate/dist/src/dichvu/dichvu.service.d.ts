import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class DichvuService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedDichvu(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
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
    findBy(param: any): Promise<{
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
    findAll(page?: number, limit?: number): Promise<{
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
    reorderDichvus(dichvuIds: string[]): Promise<{
        status: string;
    }>;
}
