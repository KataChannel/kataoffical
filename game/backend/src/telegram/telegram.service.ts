import { Injectable } from '@nestjs/common';
import * as TelegramBot from 'node-telegram-bot-api';

@Injectable()
export class TelegramService {
    private bot: TelegramBot;

    constructor() {
        this.bot = new TelegramBot(process.env.TELEGRAM_TOKEN, { polling: false });
    }

    async sendNotification(chatId: string, message: string) {
        try {
            await this.bot.sendMessage(chatId, message);
        } catch (error) {
            console.error('Telegram notification error:', error);
        }
    }
}
