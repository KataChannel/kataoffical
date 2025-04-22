import { Controller, Get, Post, Body, Param, HttpException, HttpStatus } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('users')
export class UsersController {
    constructor(private readonly usersService: UsersService) {}
    @Get(':userId')
    async getUser(@Param('userId') userId: string) {
        return this.usersService.getUser(userId);
    }

    @Post('plant')
    async plantCrop(@Body() body: { userId: string; cropName: string }) {
        try {
            return await this.usersService.plantCrop(body.userId, body.cropName);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('water')
    async waterCrops(@Body() body: { userId: string }) {
        try {
            return await this.usersService.waterCrops(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('harvest')
    async harvestCrops(@Body() body: { userId: string }) {
        try {
            return await this.usersService.harvestCrops(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('connect_wallet')
    async connectWallet(@Body() body: { userId: string; walletAddress: string }) {
        try {
            return await this.usersService.connectWallet(body.userId, body.walletAddress);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('buy')
    async buyItem(@Body() body: { userId: string; item: string }) {
        try {
            return await this.usersService.buyItem(body.userId, body.item);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('deposit')
    async deposit(@Body() body: { userId: string; amount: number }) {
        try {
            return await this.usersService.deposit(body.userId, body.amount);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('withdraw')
    async withdraw(@Body() body: { userId: string; amount: number }) {
        try {
            return await this.usersService.withdraw(body.userId, body.amount);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('link_telegram')
    async linkTelegram(@Body() body: { userId: string; telegramChatId: string }) {
        try {
            return await this.usersService.linkTelegram(body.userId, body.telegramChatId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }

    @Post('ad')
    async adReward(@Body() body: { userId: string }) {
        try {
            return await this.usersService.adReward(body.userId);
        } catch (error: any) {
            throw new HttpException(error.message, HttpStatus.BAD_REQUEST);
        }
    }
}
