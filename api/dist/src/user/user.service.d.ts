import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
export declare class UserService {
    private prisma;
    private _SocketGateway;
    constructor(prisma: PrismaService, _SocketGateway: SocketGateway);
    createUser(dto: any): Promise<{
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        password: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUsers(): Promise<{
        name: string | undefined;
        roles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        permissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        }[];
        profile: {
            id: string;
            name: string;
            userId: string;
            avatar: string | null;
            bio: string | null;
            citizenId: string | null;
            birthDate: Date | null;
            hometown: string | null;
            address: string | null;
            companyName: string | null;
            position: string | null;
            level: string | null;
            department: string | null;
            startDate: Date | null;
            endDate: Date | null;
            companyEmail: string | null;
            companyPhone: string | null;
            softwareAccounts: import("@prisma/client/runtime/library").JsonValue | null;
            socialAccounts: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        }[];
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        roles: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        }[];
        profile: {
            id: string;
            name: string;
            userId: string;
            avatar: string | null;
            bio: string | null;
            citizenId: string | null;
            birthDate: Date | null;
            hometown: string | null;
            address: string | null;
            companyName: string | null;
            position: string | null;
            level: string | null;
            department: string | null;
            startDate: Date | null;
            endDate: Date | null;
            companyEmail: string | null;
            companyPhone: string | null;
            softwareAccounts: import("@prisma/client/runtime/library").JsonValue | null;
            socialAccounts: import("@prisma/client/runtime/library").JsonValue | null;
        } | null;
        permissions: {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
            description: string | null;
        }[];
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        password: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        email: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        password: string | null;
        id: string;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
