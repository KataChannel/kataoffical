import { Controller, Post, Body, Get, Param } from '@nestjs/common';
import { TonService } from './ton.service';

@Controller('ton')
export class TonController {
  constructor(private readonly tonService: TonService) {}

  @Post('wallet/initialize')
  async initializeWallet(@Body() body: { mnemonic: string[] }) {
    const { mnemonic } = body;
    const wallet = await this.tonService.initializeWallet(mnemonic);
    return { address: wallet.address };
  }

  @Get('wallet/balance/:address')
  async getWalletBalance(@Param('address') address: string) {
    const balance = await this.tonService.getWalletBalance(address);
    return { balance };
  }

  @Post('wallet/send')
  async sendTransaction(@Body() body: { 
    mnemonic: string[],
    toAddress: string,
    amount: string,
    message?: string 
  }) {
    const { mnemonic, toAddress, amount, message } = body;
    const wallet = await this.tonService.initializeWallet(mnemonic);
    const result = await this.tonService.sendTransaction(wallet, toAddress, amount, message);
    return result;
  }
}
