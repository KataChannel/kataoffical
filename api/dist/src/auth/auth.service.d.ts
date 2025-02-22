import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        id: string;
        email: string;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    generateRandomPassword(userId: string): Promise<{
        newPassword: string;
    }>;
    validateOAuthLogin(provider: string, providerId: string, email?: string): Promise<{
        token: string;
        user: {
            id: string;
            email: string;
            password: string;
            provider: string | null;
            providerId: string | null;
            createdAt: Date;
            updatedAt: Date;
        };
    }>;
}
