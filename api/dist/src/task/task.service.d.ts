import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class taskService {
    private readonly prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    findAll(): Promise<{
        NguoitaoEmail: string | null;
        NguoitaoSDT: string | null;
        NguoinhanEmail: string | null | undefined;
        NguoinhanSDT: string | null | undefined;
        NguoilienquanEmail: string | null | undefined;
        NguoilienquanSDT: string | null | undefined;
        comments: {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            taskId: string | null;
            supportId: string | null;
        }[];
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }[]>;
    search(params: any): Promise<({
        [x: string]: {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            taskId: string | null;
            supportId: string | null;
        }[] | ({
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            taskId: string | null;
            supportId: string | null;
        } | {
            id: string;
            createdAt: Date;
            userId: string;
            content: string;
            taskId: string | null;
            supportId: string | null;
        })[];
        [x: number]: never;
        [x: symbol]: never;
    } & {
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    })[]>;
    findby(param: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        userId: string;
        description: string | null;
        title: string;
        status: string;
        assigneeId: string | null;
        relatedUserId: string | null;
    }>;
}
