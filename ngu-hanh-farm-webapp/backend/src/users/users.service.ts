import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { TelegramService } from '../telegram/telegram.service';
import * as TonWeb from 'tonweb';

@Injectable()
export class UsersService {
    private tonweb = new TonWeb(new TonWeb.HttpProvider('https://testnet.toncenter.com/api/v2/jsonRPC', {
        apiKey: process.env.TON_API_KEY
    }));
    private crops = {
        'truc vang': { time: 60, xp: 20, tokenChances: { 0.7: 0.02, 0.2: 0.05, 0.1: 0.1 }, premium: true }, // Kim
        'tre': { time: 60, xp: 15, tokenChances: { 0.7: 0.01, 0.2: 0.03, 0.1: 0.08 }, premium: false }, // Mộc
        'sen': { time: 60, xp: 25, tokenChances: { 0.7: 0.015, 0.2: 0.04, 0.1: 0.09 }, premium: true }, // Thủy
        'phuong vi': { time: 60, xp: 30, tokenChances: { 0.7: 0.02, 0.2: 0.06, 0.1: 0.12 }, premium: true }, // Hỏa
        'lua': { time: 60, xp: 18, tokenChances: { 0.7: 0.01, 0.2: 0.04, 0.1: 0.07 }, premium: false } // Thổ
    };

    constructor(private prisma: PrismaService, private telegramService: TelegramService) {}

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

        user.crops.forEach(crop => { crop.time_to_mature *= 0.9; });
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
        const matureCrops = user.crops.filter(crop => currentTime - crop.planted_at >= crop.time_to_mature);
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
            let tokenAmount = 0;
            let cumulative = 0;
            for (const [prob, amount] of Object.entries(this.crops[cropName].tokenChances)) {
                cumulative += parseFloat(prob);
                if (tokenChance <= cumulative) {
                    tokenAmount = amount;
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
                const wallet = this.tonweb.wallet.create({ publicKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))) });
                const seqno = await wallet.methods.seqno().call() || 0;
                await wallet.methods.transfer({
                    secretKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))),
                    toAddress: user.wallet,
                    amount: TonWeb.utils.toNano(totalTon.toString()),
                    seqno: seqno,
                    payload: `Harvest ${matureCrops.length} crops (Testnet)`
                }).send();
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
            user.crops.forEach(crop => crop.time_to_mature *= 0.8);
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
        try {
            const wallet = this.tonweb.wallet.create({ publicKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))) });
            const seqno = await wallet.methods.seqno().call() || 0;
            await wallet.methods.transfer({
                secretKey: TonWeb.utils.hexToBytes(await this.tonweb.utils.mnemonicToHex(process.env.MASTER_WALLET_SEED.split(' '))),
                toAddress: user.wallet,
                amount: TonWeb.utils.toNano((amount - fee).toString()),
                seqno: seqno,
                payload: `Withdraw from Ngu Hanh Farm (Testnet)`
            }).send();
            user.balance -= amount;
            await this.prisma.user.update({ where: { userId }, data: { balance: user.balance } });
            if (user.telegramChatId) {
                await this.telegramService.sendNotification(user.telegramChatId, `Rút ${amount - fee} TON testnet thành công!`);
            }
            return { message: `Withdrew ${amount - fee} TON testnet`, user };
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
