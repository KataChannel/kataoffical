import { PrismaService } from 'prisma/prisma.service';
import { CreateUserDto } from './dto/create-user.dto';
export declare class UserService {
    private prisma;
    constructor(prisma: PrismaService);
    createUser(dto: CreateUserDto): Promise<{
        id: string;
        email: string;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }>;
    getUsers(): Promise<{
        id: string;
        email: string;
        password: string;
        provider: string | null;
        providerId: string | null;
        createdAt: Date;
        updatedAt: Date;
    }[]>;
}
