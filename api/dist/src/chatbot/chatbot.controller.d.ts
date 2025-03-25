import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    create(createChatbotDto: any): Promise<{
        id: string;
        createdAt: Date;
        message: string;
        userId: string;
        reply: string;
    }>;
    ask(userId: string, message: string): Promise<{
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
