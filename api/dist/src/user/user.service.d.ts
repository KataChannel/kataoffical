import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class UserService {
    private prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    createUser(dto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
    }>;
    getUsers(): Promise<{
        roles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        permissions: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
    }[]>;
    findAll(): Promise<{
        roles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        permissions: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
    }[]>;
    findOne(id: string): Promise<{
        roles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        permissions: {
            id: string;
            order: number | null;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            codeId: string | null;
            group: string | null;
            description: string | null;
        }[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
    }>;
    assignRoleToUser(data: {
        userId: string;
        roleId: any;
    }): Promise<{
        id: string;
        userId: string;
        roleId: string;
    }>;
    removeRoleFromUser(data: {
        userId: string;
        roleId: any;
    }): Promise<{
        id: string;
        userId: string;
        roleId: string;
    }>;
}
