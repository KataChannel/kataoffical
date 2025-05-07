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
        user: any;
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
        result: any;
    }>;
    randomPassword(req: any): Promise<{
        newPassword: string;
    }>;
}
