import { PrismaService } from 'prisma/prisma.service';
import { ErrorlogService } from 'src/errorlog/errorlog.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class UserService {
    private prisma;
    private _SocketGateway;
    private _ErrorlogService;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway, _ErrorlogService: ErrorlogService);
    getLastUpdated(): Promise<{
        updatedAt: any;
    }>;
    createUser(dto: any): Promise<any>;
    getUsers(): Promise<any>;
    findAll(): Promise<any>;
    findby(param: any): Promise<any>;
    leaderboard(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: Partial<Omit<any, 'id' | 'roles' | 'permissions'>>): Promise<any>;
    remove(id: string): Promise<any>;
    assignRoleToUser(data: {
        userId: string;
        roleId: any;
    }): Promise<any>;
    removeRoleFromUser(data: {
        userId: string;
        roleId: any;
    }): Promise<any>;
}
