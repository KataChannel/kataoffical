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
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    findBy(param: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    } | {
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            order: number | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            affiliateLinkId: string | null;
            doanhthuId: string;
            tienhoahong: number;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(query: any): Promise<{
        data: {
            id: string;
            codeId: string | null;
            createdAt: Date;
            updatedAt: Date;
            userId: string;
            description: string | null;
            order: number | null;
            status: import(".prisma/client").$Enums.CommissionStatus;
            affiliateLinkId: string | null;
            doanhthuId: string;
            tienhoahong: number;
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
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    remove(id: string): Promise<{
        id: string;
        codeId: string | null;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        order: number | null;
        status: import(".prisma/client").$Enums.CommissionStatus;
        affiliateLinkId: string | null;
        doanhthuId: string;
        tienhoahong: number;
    }>;
    reorderHoahongs(hoahongIds: string[]): Promise<{
        status: string;
    }>;
}
