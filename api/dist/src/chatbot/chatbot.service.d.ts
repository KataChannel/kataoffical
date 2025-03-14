import { PrismaService } from 'prisma/prisma.service';
export declare class ChatbotService {
    private readonly prisma;
    private readonly apiUrl;
    private readonly apiKey;
    private genAI;
    constructor(prisma: PrismaService);
    analyzeImage(fileUrl: any): Promise<any>;
    chatWithAI(userId: string, message: string): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
    create(data: any): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
    findAll(): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
    update(id: string, data: any): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
    remove(id: string): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
}
