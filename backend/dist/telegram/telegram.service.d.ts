export declare class TelegramService {
    private bot;
    constructor();
    sendNotification(chatId: string, message: string): Promise<void>;
}
