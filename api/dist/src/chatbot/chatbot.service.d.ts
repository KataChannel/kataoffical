import { PrismaService } from 'prisma/prisma.service';
export declare class ChatbotService {
    private readonly prisma;
    private readonly apiUrl;
    private readonly apiKey;
    constructor(prisma: PrismaService);
    chatWithAI(userId: string, message: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
}
