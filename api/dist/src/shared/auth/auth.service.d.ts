import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(data: any, affiliateCode?: string): Promise<{
        id: string;
        name: string | null;
        avatar: string | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        email: string | null;
        SDT: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        password: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        affiliateCode: string | null;
        referrerId: string | null;
    }>;
    login(phone: string, email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        id: string;
        name: string | null;
        avatar: string | null;
        gender: import(".prisma/client").$Enums.Gender | null;
        email: string | null;
        SDT: string | null;
        phone: string | null;
        zaloId: string | null;
        facebookId: string | null;
        googleId: string | null;
        password: string | null;
        provider: string | null;
        providerId: string | null;
        isSuperAdmin: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        affiliateCode: string | null;
        referrerId: string | null;
    }>;
    generateRandomPassword(userId: string): Promise<{
        newPassword: string;
    }>;
    validateOAuthLogin(provider: string, providerId: string, email?: string): Promise<{
        token: string;
        user: {
            id: string;
            name: string | null;
            avatar: string | null;
            gender: import(".prisma/client").$Enums.Gender | null;
            email: string | null;
            SDT: string | null;
            phone: string | null;
            zaloId: string | null;
            facebookId: string | null;
            googleId: string | null;
            password: string | null;
            provider: string | null;
            providerId: string | null;
            isSuperAdmin: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            affiliateCode: string | null;
            referrerId: string | null;
        };
    }>;
    getUserRoles(userId: string): Promise<({
        role: {
            permissions: ({
                permission: {
                    id: string;
                    name: string;
                    createdAt: Date;
                    updatedAt: Date;
                    description: string | null;
                };
            } & {
                id: string;
                roleId: string;
                permissionId: string;
            })[];
        } & {
            id: string;
            name: string;
            createdAt: Date;
            updatedAt: Date;
        };
    } & {
        id: string;
        userId: string;
        roleId: string;
    })[]>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    checkPermission(userId: string, permissionName: string): Promise<void>;
}
