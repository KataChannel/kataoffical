import { HttpStatus } from '@nestjs/common';
import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    googleAuth(): Promise<void>;
    googleAuthRedirect(req: any, res: any): any;
    facebookLogin(): Promise<void>;
    facebookCallback(req: any, res: any): any;
    zaloLogin(): Promise<void>;
    zaloCallback(req: any, res: any): any;
    register(data: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: {
            id: string;
            codeId: string | null;
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
            isCTV: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            registrationSource: string | null;
            inviteCode: string | null;
            affiliateCode: string | null;
            referrerId: string | null;
        };
    }>;
    registerctv(data: any): Promise<{
        statusCode: HttpStatus;
        message: string;
        user: {
            id: string;
            codeId: string | null;
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
            isCTV: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            registrationSource: string | null;
            inviteCode: string | null;
            affiliateCode: string | null;
            referrerId: string | null;
        };
    }>;
    login(body: {
        SDT: string;
        email: string;
        password: string;
    }): Promise<{
        access_token: string;
        user: any;
    }>;
    changePassword(req: any, body: {
        newpass: string;
        oldpass: string;
    }): Promise<{
        statusCode: HttpStatus;
        message: string;
        result: {
            id: string;
            codeId: string | null;
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
            isCTV: boolean;
            isActive: boolean;
            createdAt: Date;
            updatedAt: Date;
            registrationSource: string | null;
            inviteCode: string | null;
            affiliateCode: string | null;
            referrerId: string | null;
        };
    }>;
    randomPassword(req: any): Promise<{
        newPassword: string;
    }>;
}
