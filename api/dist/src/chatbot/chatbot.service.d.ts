import { PrismaService } from 'prisma/prisma.service';
export declare class ChatbotService {
    private readonly prisma;
    private readonly apiUrl;
    private readonly apiKey;
    private genAI;
    constructor(prisma: PrismaService);
    analyzeImage(imageUrl: string): Promise<any>;
    chatWithAI(userId: string, message: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }>;
    create(data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }>;
    findAll(): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }>;
    remove(id: string): Promise<{
        id: string;
        createdAt: Date;
        userId: string;
        message: string;
        reply: string;
    }>;
}
