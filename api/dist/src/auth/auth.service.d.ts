import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<any>;
    login(SDT: string, email: string, password: string): Promise<{
        access_token: any;
        user: any;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<any>;
    generateRandomPassword(userId: string): Promise<{
        newPassword: string;
    }>;
    validateOAuthLogin(provider: string, providerId: string, email?: string): Promise<{
        token: any;
        user: any;
    }>;
    getUserRoles(userId: string): Promise<any>;
    hasPermission(userId: string, permissionName: string): Promise<boolean>;
    checkPermission(userId: string, permissionName: string): Promise<void>;
}
