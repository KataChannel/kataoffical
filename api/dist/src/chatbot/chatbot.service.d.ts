import { PrismaService } from 'prisma/prisma.service';
export declare class ChatbotService {
    private readonly prisma;
    private readonly apiUrl;
    private readonly apiKey;
    constructor(prisma: PrismaService);
    chatWithAI(userId: string, message: string): Promise<any>;
    create(data: any): Promise<any>;
    findAll(): Promise<any>;
    findOne(id: string): Promise<any>;
    update(id: string, data: any): Promise<any>;
    remove(id: string): Promise<any>;
}
