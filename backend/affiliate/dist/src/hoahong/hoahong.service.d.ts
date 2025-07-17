import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class HoahongService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedHoahong(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    findBy(param: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    } | {
        data: {
            type: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            doanhthuId: string;
            affiliateLinkId: string | null;
            tienhoahong: number;
            refphone: string | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            order: number | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            type: string | null;
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            doanhthuId: string;
            affiliateLinkId: string | null;
            tienhoahong: number;
            refphone: string | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            order: number | null;
        }[];
        total: number;
        page: number;
        pageSize: number;
        totalPages: number;
    }>;
    getTotalHoahongByUserId(userId: string): Promise<{
        total: number;
    }>;
    findOne(id: string): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    update(id: string, data: any): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    remove(id: string): Promise<{
        type: string | null;
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        doanhthuId: string;
        affiliateLinkId: string | null;
        tienhoahong: number;
        refphone: string | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        order: number | null;
    }>;
    reorderHoahongs(hoahongIds: string[]): Promise<{
        status: string;
    }>;
}
