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
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    findBy(param: any): Promise<{
        data: {
            updatedAt: Date;
            id: string;
            title: string | null;
            codeId: string | null;
            key: string | null;
            value: string | null;
            type: string | null;
            description: string | null;
            order: number | null;
            isActive: boolean;
            createdById: string | null;
            createdAt: Date;
        }[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: {
            updatedAt: Date;
            id: string;
            title: string | null;
            codeId: string | null;
            key: string | null;
            value: string | null;
            type: string | null;
            description: string | null;
            order: number | null;
            isActive: boolean;
            createdById: string | null;
            createdAt: Date;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<{
        updatedAt: Date;
        id: string;
        title: string | null;
        codeId: string | null;
        key: string | null;
        value: string | null;
        type: string | null;
        description: string | null;
        order: number | null;
        isActive: boolean;
        createdById: string | null;
        createdAt: Date;
    }>;
    reorderSettings(settingIds: string[]): Promise<{
        status: string;
    }>;
}
