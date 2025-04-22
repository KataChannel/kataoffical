import { UsersService } from './users.service';
export declare class UsersController {
    private readonly usersService;
    constructor(usersService: UsersService);
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
    plantCrop(body: {
        userId: string;
        cropName: string;
    }): Promise<{
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
    waterCrops(body: {
        userId: string;
    }): Promise<{
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
    harvestCrops(body: {
        userId: string;
    }): Promise<{
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
    connectWallet(body: {
        userId: string;
        walletAddress: string;
    }): Promise<{
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
    buyItem(body: {
        userId: string;
        item: string;
    }): Promise<{
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
    deposit(body: {
        userId: string;
        amount: number;
    }): Promise<{
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
    withdraw(body: {
        userId: string;
        amount: number;
    }): Promise<{
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
    linkTelegram(body: {
        userId: string;
        telegramChatId: string;
    }): Promise<{
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
    adReward(body: {
        userId: string;
    }): Promise<{
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
