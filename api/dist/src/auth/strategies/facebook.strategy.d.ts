import { AuthService } from '../auth.service';
declare const FacebookStrategy_base: any;
export declare class FacebookStrategy extends FacebookStrategy_base {
    private authService;
    constructor(authService: AuthService);
    validate(profile: any, done: Function): Promise<void>;
}
export {};
