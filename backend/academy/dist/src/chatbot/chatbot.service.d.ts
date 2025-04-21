import { PrismaService } from 'prisma/prisma.service';
export declare class ChatbotService {
    private readonly prisma;
    private readonly apiUrl;
    private readonly apiKey;
    constructor(prisma: PrismaService);
    chatWithAI(userId: string, message: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
    create(data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
}
