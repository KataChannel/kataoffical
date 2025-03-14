import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    create(createChatbotDto: any): Promise<{
        id: string;
        userId: string;
        message: string;
        reply: string;
        createdAt: Date;
    }>;
    ask(userId: string, message: string): Promise<{
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
