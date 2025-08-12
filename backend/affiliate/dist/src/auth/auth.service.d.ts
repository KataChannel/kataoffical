import { JwtService } from '@nestjs/jwt';
import { PrismaService } from 'prisma/prisma.service';
import { EmailService } from '../email/email.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    private emailService;
    constructor(prisma: PrismaService, jwtService: JwtService, emailService: EmailService);
    generateCodeId(): Promise<string>;
    register(data: any, affiliateCode?: string): Promise<{
        name: string | null;
        id: string;
        codeId: string | null;
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
        isCTV: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        registrationSource: string | null;
        inviteCode: string | null;
        affiliateCode: string | null;
        referrerId: string | null;
        ghichu: string | null;
    }>;
    registerctv(data: any, affiliateCode?: string): Promise<{
        name: string | null;
        id: string;
        codeId: string | null;
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
        isCTV: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        registrationSource: string | null;
        inviteCode: string | null;
        affiliateCode: string | null;
        referrerId: string | null;
        ghichu: string | null;
    }>;
    login(phone: string, email: string, password: string): Promise<{
        access_token: string;
        user: any;
    }>;
    changePassword(userId: string, oldPassword: string, newPassword: string): Promise<{
        name: string | null;
        id: string;
        codeId: string | null;
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
        isCTV: boolean;
        isActive: boolean;
        createdAt: Date;
        updatedAt: Date;
        registrationSource: string | null;
        inviteCode: string | null;
        affiliateCode: string | null;
        referrerId: string | null;
        ghichu: string | null;
    }>;
    generateRandomPassword(userId: string): Promise<{
        newPassword: string;
    }>;
    forgotPassword(email?: string, phone?: string): Promise<{
        message: string;
        emailSent: boolean;
        email: string;
        resetToken?: undefined;
        resetUrl?: undefined;
        error?: undefined;
    } | {
        message: string;
        resetToken: string;
        emailSent: boolean;
        resetUrl: string;
        email?: undefined;
        error?: undefined;
    } | {
        message: string;
        resetToken: string;
        emailSent: boolean;
        resetUrl: string;
        error: string;
        email?: undefined;
    }>;
    private maskEmail;
    resetPassword(token: string, newPassword: string): Promise<{
        message: string;
    }>;
    validateOAuthLogin(provider: string, providerId: string, email?: string): Promise<{
        token: string;
        user: {
            name: string | null;
            id: string;
            codeId: string | null;
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
            isCTV: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            registrationSource: string | null;
            inviteCode: string | null;
            affiliateCode: string | null;
            referrerId: string | null;
            ghichu: string | null;
        };
    }>;
    getUserRoles(userId: string): Promise<({
        role: {
            permissions: ({
                permission: {
                    name: string;
                    id: string;
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
            name: string;
            id: string;
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
