import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class SettingService {
    private readonly prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    private parseValue;
    getLastUpdatedSetting(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<any>;
    findBy(param: any): Promise<{
        value: any;
        type: string | null;
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        description: string | null;
        title: string | null;
        order: number | null;
        codeId: string | null;
        createdById: string | null;
        key: string | null;
        data?: undefined;
        total?: undefined;
        page?: undefined;
        pageCount?: undefined;
    } | {
        data: {
            value: any;
            type: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            createdById: string | null;
            key: string | null;
        }[];
        total: number;
        page: any;
        pageCount: number;
    } | null>;
    findAll(page?: number, pageSize?: number): Promise<{
        data: {
            value: any;
            type: string | null;
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            description: string | null;
            title: string | null;
            order: number | null;
            codeId: string | null;
            createdById: string | null;
            key: string | null;
        }[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
    reorderSettings(settingIds: string[]): Promise<{
        status: string;
    }>;
}
