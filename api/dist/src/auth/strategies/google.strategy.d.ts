import { VerifyCallback } from 'passport-google-oauth20';
import { AuthService } from '../auth.service';
declare const GoogleStrategy_base: any;
export declare class GoogleStrategy extends GoogleStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(req: Request, accessToken: string, refreshToken: string, profile: any, done: VerifyCallback): Promise<void>;
}
export {};
