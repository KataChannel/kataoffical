import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class UserService {
    private prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    createUser(dto: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }>;
    getUsers(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }[]>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        updatedAt: Date;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
    }>;
}
