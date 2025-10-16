import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';
export declare class UserguideService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogsService);
    getLastUpdatedUserguide(): Promise<{
        updatedAt: number;
    }>;
    generateCodeId(): Promise<string>;
    create(data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        description: string | null;
        time: string | null;
    }>;
    findBy(param: any): Promise<{
        data: ({
            UserguidBlocks: {
                id: string;
                title: string | null;
                type: string;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                codeId: string | null;
                description: string | null;
                listItems: string | null;
                imageUrl: string | null;
                imageAlt: string | null;
                videoUrl: string | null;
                videoType: string | null;
                stepId: string | null;
            }[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            description: string | null;
            time: string | null;
        })[];
        total: number;
        page: any;
        pageCount: number;
    }>;
    findAll(page?: number, limit?: number): Promise<{
        data: ({
            UserguidBlocks: {
                id: string;
                title: string | null;
                type: string;
                order: number | null;
                isActive: boolean;
                createdAt: Date;
                updatedAt: Date;
                codeId: string | null;
                description: string | null;
                listItems: string | null;
                imageUrl: string | null;
                imageAlt: string | null;
                videoUrl: string | null;
                videoType: string | null;
                stepId: string | null;
            }[];
        } & {
            id: string;
            title: string | null;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            codeId: string | null;
            description: string | null;
            time: string | null;
        })[];
        total: number;
        page: number;
        pageCount: number;
    }>;
    findOne(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        description: string | null;
        time: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        description: string | null;
        time: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        title: string | null;
        order: number | null;
        createdAt: Date;
        updatedAt: Date;
        codeId: string | null;
        description: string | null;
        time: string | null;
    }>;
    reorderUserguides(userguideIds: string[]): Promise<{
        status: string;
    }>;
}
