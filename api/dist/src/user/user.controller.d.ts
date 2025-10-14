import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    create(dto: any): Promise<{
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
    }>;
    findAll(): Promise<{
        roles: string[];
        permissions: any[];
        id: string;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        name: string | null;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
    }[]>;
    getProfile(req: any): Promise<{
        roles: string[];
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
        name: string | null;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
    }>;
    assignRoleToUser(data: any): Promise<{
        id: string;
        userId: string;
        roleId: string;
    }>;
    removeRoleFromUser(data: any): Promise<{
        id: string;
        userId: string;
        roleId: string;
    }>;
    findOne(id: string): Promise<{
        roles: string[];
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
        name: string | null;
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
        name: string | null;
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
        name: string | null;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
    }>;
}
