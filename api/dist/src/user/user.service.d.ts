import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class UserService {
    private prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    createUser(dto: any): Promise<any>;
    getUsers(): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
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
