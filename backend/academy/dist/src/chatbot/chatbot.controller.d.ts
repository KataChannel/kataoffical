import { ChatbotService } from './chatbot.service';
export declare class ChatbotController {
    private readonly chatbotService;
    constructor(chatbotService: ChatbotService);
    create(createChatbotDto: any): Promise<{
        id: string;
        userId: string;
        createdAt: Date;
        message: string;
        reply: string;
    }>;
    ask(userId: string, message: string): Promise<{
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
