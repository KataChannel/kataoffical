import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { TonService } from 'src/ton/ton.service';
export declare class UsersService {
    private prisma;
    private telegramService;
    private tonService;
    constructor(prisma: PrismaService, telegramService: TelegramService, tonService: TonService);
    crops: {
        'truc vang': {
            time: number;
            xp: number;
            tokenChances: {
                0.7: number;
                0.2: number;
                0.1: number;
            };
            premium: boolean;
        };
        tre: {
            time: number;
            xp: number;
            tokenChances: {
                0.7: number;
                0.2: number;
                0.1: number;
            };
            premium: boolean;
        };
        sen: {
            time: number;
            xp: number;
            tokenChances: {
                0.7: number;
                0.2: number;
                0.1: number;
            };
            premium: boolean;
        };
        'phuong vi': {
            time: number;
            xp: number;
            tokenChances: {
                0.7: number;
                0.2: number;
                0.1: number;
            };
            premium: boolean;
        };
        lua: {
            time: number;
            xp: number;
            tokenChances: {
                0.7: number;
                0.2: number;
                0.1: number;
            };
            premium: boolean;
        };
    };
    getUser(userId: string): Promise<{
        id: string;
        userId: string;
        telegramChatId: string | null;
        crops: import("@prisma/client/runtime/library").JsonValue[];
        xp: number;
        lastWater: number;
        wallet: string | null;
        balance: number;
        vip: boolean;
        vipExpiry: number;
    }>;
    plantCrop(userId: string, cropName: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    waterCrops(userId: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    harvestCrops(userId: string): Promise<{
        message: string;
        results: any[];
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    connectWallet(userId: string, walletAddress: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    buyItem(userId: string, item: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    deposit(userId: string, amount: number): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    withdraw(userId: string, amount: number): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    linkTelegram(userId: string, telegramChatId: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
    adReward(userId: string): Promise<{
        message: string;
        user: {
            id: string;
            userId: string;
            telegramChatId: string | null;
            crops: import("@prisma/client/runtime/library").JsonValue[];
            xp: number;
            lastWater: number;
            wallet: string | null;
            balance: number;
            vip: boolean;
            vipExpiry: number;
        };
    }>;
}
