import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class leadService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedlead(): Promise<{
        updatedAt: number | Date;
    }>;
    generateCode(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    reorderleads(leadIds: string[]): Promise<void>;
    findAll(): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }[]>;
    findby(param: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        name: string;
        email: string | null;
        phone: string | null;
        createdAt: Date;
        updatedAt: Date;
        order: number | null;
        status: string;
        code: string | null;
    }>;
}
