import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    create(dto: any): Promise<{
        id: string;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
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
        id: string;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
    getProfile(req: any): Promise<{
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
        id: string;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
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
        id: string;
        email: string | null;
        SDT: string | null;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        email: string | null;
        SDT: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
    }>;
}
