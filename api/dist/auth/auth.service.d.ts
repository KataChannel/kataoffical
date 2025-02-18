import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma.service';
export declare class AuthService {
    private prisma;
    private jwtService;
    constructor(prisma: PrismaService, jwtService: JwtService);
    register(email: string, password: string): Promise<{
        id: string;
        email: string;
        password: string;
        createdAt: Date;
    }>;
    login(email: string, password: string): Promise<{
        token: string;
    }>;
}
