import { UserService } from './user.service';
import { AuthService } from '../auth/auth.service';
export declare class UserController {
    private readonly userService;
    private readonly authService;
    constructor(userService: UserService, authService: AuthService);
    create(dto: any): Promise<any>;
    findby(param: any): Promise<any>;
    findAll(): Promise<any>;
    getLastUpdated(): Promise<{
        updatedAt: any;
    }>;
    leaderboard(): Promise<any>;
    getProfile(req: any): Promise<any>;
    assignRoleToUser(data: any): Promise<any>;
    removeRoleFromUser(data: any): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
