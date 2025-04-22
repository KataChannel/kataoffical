import { Injectable } from '@nestjs/common';
import { TonClient, WalletContractV4, Address } from '@ton/ton';
import { mnemonicToPrivateKey } from '@ton/crypto';
@Injectable()
export class TonService {
  private tonClient: TonClient;
  constructor() {
    // Khởi tạo kết nối đến TON Blockchain
    this.tonClient = new TonClient({
      endpoint: 'https://toncenter.com/api/v2/jsonRPC', // Hoặc bạn có thể sử dụng testnet: 'https://testnet.toncenter.com/api/v2/jsonRPC'
      apiKey: 'YOUR_TONCENTER_API_KEY', // Lấy API key từ @toncenter_bot trên Telegram
    });
  }

  // Khởi tạo ví từ mnemonic (seed phrase)
  async initializeWallet(mnemonic: string[]) {
    try {
      const keyPair = await mnemonicToPrivateKey(mnemonic);
      const wallet = WalletContractV4.create({ 
        publicKey: keyPair.publicKey, 
        workchain: 0 
      });
      
      const walletContract = this.tonClient.open(wallet);
      const walletAddress = walletContract.address.toString();
      
      return {
        address: walletAddress,
        contract: walletContract,
        keyPair
      };
    } catch (error) {
      throw new Error(`Không thể khởi tạo ví TON: ${error.message}`);
    }
  }

  // Lấy số dư ví
  async getWalletBalance(address: string) {
    try {
      const addressObj = Address.parse(address);
      const balance = await this.tonClient.getBalance(addressObj);
      return balance;
    } catch (error) {
      throw new Error(`Không thể lấy số dư ví: ${error.message}`);
    }
  }

  // Gửi giao dịch
  async sendTransaction(walletInfo: any, toAddress: string, amount: string, message?: string) {
    try {
      const seqno = await walletInfo.contract.getSeqno();
      
      await walletInfo.contract.sendTransfer({
        secretKey: walletInfo.keyPair.secretKey,
        seqno: seqno,
        messages: [
          {
            address: toAddress,
            amount: amount,
            payload: message ? message : '',
          },
        ],
      });

      return { success: true };
    } catch (error) {
      throw new Error(`Không thể gửi giao dịch: ${error.message}`);
    }
  }
}
