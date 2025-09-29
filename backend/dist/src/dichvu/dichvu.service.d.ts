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
    findBy(param: any): Promise<{
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
    findAll(page?: number, limit?: number): Promise<{
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
    reorderDichvus(dichvuIds: string[]): Promise<{
        status: string;
    }>;
}
