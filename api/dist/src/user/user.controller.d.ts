import { UserService } from './user.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserController {
    private readonly userService;
    constructor(userService: UserService);
    create(dto: CreateUserDto): Promise<{
        id: string;
        email: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        email: string | null;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
