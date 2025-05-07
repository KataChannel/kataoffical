import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from './socket.gateway';
export declare class SettingService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdatedSetting(): Promise<{
        updatedAt: number | Date;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    findBy(param: any): Promise<{
        data: {
            type: string;
            value: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            codeId: string;
            createdById: string | null;
            key: string;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            type: string;
            value: string;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            order: number | null;
            codeId: string;
            createdById: string | null;
            key: string;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        type: string;
        value: string;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        order: number | null;
        codeId: string;
        createdById: string | null;
        key: string;
    }>;
    reorderSettings(settingIds: string[]): Promise<{
        status: string;
    }>;
}
