import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
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
    login(SDT: string, email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
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
    generateRandomPassword(userId: string): Promise<{
        newPassword: string;
    }>;
    validateOAuthLogin(provider: string, providerId: string, email?: string, SDT?: string): Promise<{
        token: string;
        user: {
            id: string;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            email: string | null;
            SDT: string | null;
            password: string;
            provider: string | null;
            providerId: string | null;
        };
    }>;
    getUserRoles(userId: string): Promise<({
        role: {
            permissions: ({
                permission: {
                    id: string;
                    order: number | null;
                    createdAt: Date;
                    updatedAt: Date;
                    name: string;
                    codeId: string | null;
                    description: string | null;
                    group: string | null;
                };
            } & {
                id: string;
                roleId: string;
                permissionId: string;
            })[];
        } & {
            id: string;
            createdAt: Date;
            updatedAt: Date;
            name: string;
        };
    } & {
        id: string;
        userId: string;
        roleId: string;
    })[]>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    checkPermission(userId: string, permissionName: string): Promise<void>;
}
