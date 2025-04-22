import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import { TonService } from 'src/ton/ton.service';
import { mnemonicToPrivateKey } from '@ton/crypto';

@Injectable()
export class UsersService {
    constructor(
        private prisma: PrismaService, 
        private telegramService: TelegramService,
        private tonService: TonService,
    ) {}
    
    crops = {
        'truc vang': { time: 60, xp: 20, tokenChances: { 0.7: 0.02, 0.2: 0.05, 0.1: 0.1 }, premium: true },
        'tre': { time: 60, xp: 15, tokenChances: { 0.7: 0.01, 0.2: 0.03, 0.1: 0.08 }, premium: false },
        'sen': { time: 60, xp: 25, tokenChances: { 0.7: 0.015, 0.2: 0.04, 0.1: 0.09 }, premium: true },
        'phuong vi': { time: 60, xp: 30, tokenChances: { 0.7: 0.02, 0.2: 0.06, 0.1: 0.12 }, premium: true },
        'lua': { time: 60, xp: 18, tokenChances: { 0.7: 0.01, 0.2: 0.04, 0.1: 0.07 }, premium: false }
    };
    
    async getUser(userId: string) {
        let user = await this.prisma.user.findUnique({ where: { userId } });
        if (!user) {
            user = await this.prisma.user.create({
                data: {
                    userId,
                    crops: [{ name: 'lua', planted_at: Date.now() / 1000, time_to_mature: this.crops['lua'].time }],
                    xp: 0,
                    lastWater: 0,
                    balance: 0,
                    vip: false,
                    vipExpiry: 0
                }
            });
        }
        return user;
    }

    async plantCrop(userId: string, cropName: string) {
        const user = await this.getUser(userId);
        if (this.crops[cropName].premium && user.balance < 0.5) {
            throw new Error('Not enough TON testnet');
        }
        if (user.crops.length >= 10) {
            throw new Error('Maximum 10 crops');
        }

        user.crops.push({ name: cropName, planted_at: Date.now() / 1000, time_to_mature: this.crops[cropName].time });
        if (this.crops[cropName].premium) user.balance -= 0.5;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, `Bạn vừa trồng ${cropName}!`);
        }
        return { message: `Planted ${cropName}`, user };
    }

    async waterCrops(userId: string) {
        const user = await this.getUser(userId);
        const currentTime = Date.now() / 1000;
        if (!user.crops.length) throw new Error('No crops to water');
        if (!user.vip && currentTime - user.lastWater < 1800) {
            throw new Error('Wait 30 minutes or buy VIP');
        }

        user.crops.forEach((crop:any) => { crop.time_to_mature *= 0.9; });
        user.lastWater = currentTime;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, lastWater: user.lastWater } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, `Bạn vừa tưới nước, cây trưởng thành nhanh hơn 10%!`);
        }
        return { message: 'Watered crops', user };
    }

    async harvestCrops(userId: string) {
        const user = await this.getUser(userId);
        const currentTime = Date.now() / 1000;
        const matureCrops:any[] = user.crops.filter((crop:any) => currentTime - crop.planted_at >= crop.time_to_mature);
        if (!matureCrops.length) throw new Error('No mature crops');

        const results = [];
        let totalTon = 0;
        const fee = 0.005 * matureCrops.length;
        if (user.balance < fee) throw new Error(`Need ${fee} TON testnet`);

        user.balance -= fee;

        for (const harvestedCrop of matureCrops) {
            const cropName = harvestedCrop.name;
            const xpEarned = user.vip ? this.crops[cropName].xp * 1.2 : this.crops[cropName].xp;
            user.xp += xpEarned;

            const tokenChance = Math.random();
            let tokenAmount: number = 0;
            let cumulative = 0;
            for (const [prob, amount] of Object.entries(this.crops[cropName].tokenChances)) {
                cumulative += parseFloat(prob);
                if (tokenChance <= cumulative) {
                    tokenAmount = amount as number;
                    break;
                }
            }

            results.push({ cropName, xpEarned, tokenAmount });
            totalTon += tokenAmount;
        }

        user.crops = user.crops.filter(c => !matureCrops.includes(c));

        let tokenMessage = '';
        if (user.wallet && totalTon > 0) {
            try {
                // Sử dụng TonService để thực hiện giao dịch
                const masterWallet = await this.tonService.initializeWallet(process.env.MASTER_WALLET_SEED.split(' '));
                
                await this.tonService.sendTransaction(
                    masterWallet,
                    user.wallet, 
                    totalTon.toString(), 
                    `Harvest ${matureCrops.length} crops (Testnet)`
                );
                
                user.balance += totalTon;
                tokenMessage = `Received ${totalTon} TON testnet`;

                if (user.telegramChatId) {
                    await this.telegramService.sendNotification(
                        user.telegramChatId,
                        `Bạn vừa thu hoạch ${matureCrops.length} cây! Nhận ${user.xp} XP và ${totalTon} TON testnet.`
                    );
                }
            } catch (error) {
                console.error('TON transfer error:', error);
                tokenMessage = 'Failed to send TON testnet';
            }
        } else {
            tokenMessage = user.wallet ? 'No TON this time' : 'Wallet not connected';
        }

        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, xp: user.xp, balance: user.balance } });
        return { message: `Harvested ${matureCrops.length} crops! ${tokenMessage}`, results, user };
    }

    async connectWallet(userId: string, walletAddress: string) {
        if (!walletAddress.startsWith('EQ') && !walletAddress.startsWith('UQ')) {
            throw new Error('Invalid TON testnet address');
        }
        
        // Kiểm tra tính hợp lệ của địa chỉ (tùy chọn)
        try {
            const balance = await this.tonService.getWalletBalance(walletAddress);
            console.log(`Wallet balance: ${balance}`);
        } catch (error) {
            console.error('Error checking wallet:', error);
            throw new Error('Cannot verify wallet address');
        }
        
        const user = await this.getUser(userId);
        user.wallet = walletAddress;
        await this.prisma.user.update({ where: { userId }, data: { wallet: user.wallet } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, `Kết nối ví TON: ${walletAddress}`);
        }
        return { message: `Connected wallet ${walletAddress}`, user };
    }

    async buyItem(userId: string, item: string) {
        const user = await this.getUser(userId);
        let price = 0;
        let message = '';
        if (['truc vang', 'sen', 'phuong vi'].includes(item)) {
            price = 0.5;
            message = `Bought ${item} seed`;
        } else if (item === 'fertilizer') {
            price = 0.2;
            message = 'Bought fertilizer';
            user.crops.forEach((crop:any) => crop.time_to_mature *= 0.8);
        } else if (item === 'vip') {
            price = 1;
            message = 'Bought VIP for 30 days';
            user.vip = true;
            user.vipExpiry = Date.now() / 1000 + 30 * 24 * 60 * 60;
        }

        if (user.balance < price) throw new Error('Not enough TON testnet');
        user.balance -= price;
        await this.prisma.user.update({ where: { userId }, data: { crops: user.crops, balance: user.balance, vip: user.vip, vipExpiry: user.vipExpiry } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, message);
        }
        return { message, user };
    }

    async deposit(userId: string, amount: number) {
        const user = await this.getUser(userId);
        user.balance += amount;
        await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, `Nạp ${amount} TON testnet (demo)`);
        }
        return { message: `Deposited ${amount} TON testnet`, user };
    }

    async withdraw(userId: string, amount: number) {
        const user = await this.getUser(userId);
        if (!user.wallet) throw new Error('No wallet connected');
        if (amount <= 0 || user.balance < amount) throw new Error('Insufficient balance');

        const fee = amount * 0.1;
        const amountAfterFee = amount - fee;
        
        try {
            // Sử dụng TonService để thực hiện giao dịch rút tiền
            const masterWallet = await this.tonService.initializeWallet(process.env.MASTER_WALLET_SEED.split(' '));

            await this.tonService.sendTransaction(
                masterWallet,
                user.wallet,
                amountAfterFee.toString(),
                `Withdraw from Ngu Hanh Farm (Testnet)`
            );
            
            user.balance -= amount;
            await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
            if (user.telegramChatId) {
                await this.telegramService.sendNotification(user.telegramChatId, `Rút ${amountAfterFee} TON testnet thành công!`);
            }
            return { message: `Withdrew ${amountAfterFee} TON testnet`, user };
        } catch (error) {
            console.error('TON withdraw error:', error);
            throw new Error('Failed to withdraw TON testnet');
        }
    }

    async linkTelegram(userId: string, telegramChatId: string) {
        const user = await this.getUser(userId);
        await this.prisma.user.update({ where: { userId }, data: { telegramChatId } });
        await this.telegramService.sendNotification(telegramChatId, `Chào mừng đến với Ngũ Hành Farm!`);
        return { message: `Linked Telegram chat ${telegramChatId}`, user };
    }

    async adReward(userId: string) {
        const user = await this.getUser(userId);
        user.balance += 0.01;
        await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
        if (user.telegramChatId) {
            await this.telegramService.sendNotification(user.telegramChatId, 'Nhận 0.01 TON từ quảng cáo!');
        }
        return { message: 'Ad reward: 0.01 TON', user };
    }
}