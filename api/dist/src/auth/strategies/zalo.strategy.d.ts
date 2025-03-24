import { AuthService } from '../auth.service';
declare const ZaloStrategy_base: any;
export declare class ZaloStrategy extends ZaloStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(accessToken: string, refreshToken: string, profile: any, done: Function): Promise<void>;
}
export {};
