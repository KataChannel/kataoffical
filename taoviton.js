const fs = require('fs');
const { execSync } = require('child_process');
const path = require('path');

// Tạo thư mục cấu trúc
function createDirectories() {
  const dir = path.join(process.cwd(), 'src', 'ton');
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir, { recursive: true });
    console.log('✅ Đã tạo thư mục src/ton');
  } else {
    console.log('ℹ️ Thư mục src/ton đã tồn tại');
  }
}

// Cài đặt các thư viện cần thiết
function installDependencies() {
  console.log('📦 Đang cài đặt các thư viện cần thiết...');
  try {
    execSync('npm install @ton/ton @ton/crypto @ton/core', { stdio: 'inherit' });
    console.log('✅ Đã cài đặt các thư viện');
  } catch (error) {
    console.error('❌ Lỗi khi cài đặt thư viện:', error.message);
    process.exit(1);
  }
}

// Tạo file
function createFile(filePath, content) {
  fs.writeFileSync(filePath, content);
  console.log(`✅ Đã tạo file ${filePath}`);
}

// Nội dung file ton.module.ts
const tonModuleContent = `import { Module } from '@nestjs/common';
import { TonService } from './ton.service';
import { TonController } from './ton.controller';

@Module({
  providers: [TonService],
  controllers: [TonController],
  exports: [TonService],
})
export class TonModule {}
`;

// Nội dung file ton.service.ts
const tonServiceContent = `import { Injectable } from '@nestjs/common';
import { TonClient, WalletContractV4 } from '@ton/ton';
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
      throw new Error(\`Không thể khởi tạo ví TON: \${error.message}\`);
    }
  }

  // Lấy số dư ví
  async getWalletBalance(address: string) {
    try {
      const balance = await this.tonClient.getBalance(address);
      return balance;
    } catch (error) {
      throw new Error(\`Không thể lấy số dư ví: \${error.message}\`);
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
      throw new Error(\`Không thể gửi giao dịch: \${error.message}\`);
    }
  }
}
`;

// Nội dung file ton.controller.ts
const tonControllerContent = `import { Controller, Post, Body, Get, Param } from '@nestjs/common';
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
`;

// Nội dung file app.module.ts
const appModuleContent = `import { Module } from '@nestjs/common';
import { TonModule } from './ton/ton.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

@Module({
  imports: [TonModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
`;

// Cập nhật app.module.ts nếu đã tồn tại
function updateAppModule() {
  const appModulePath = path.join(process.cwd(), 'src', 'app.module.ts');
  
  if (fs.existsSync(appModulePath)) {
    let content = fs.readFileSync(appModulePath, 'utf8');
    
    // Kiểm tra xem TonModule đã được thêm vào chưa
    if (!content.includes('TonModule')) {
      // Thêm import statement
      if (!content.includes("import { TonModule } from './ton/ton.module';")) {
        content = `import { TonModule } from './ton/ton.module';\n${content}`;
      }
      
      // Thêm TonModule vào imports
      content = content.replace(/imports: \[([\s\S]*?)\]/g, (match, p1) => {
        if (p1.trim() === '') {
          return 'imports: [TonModule]';
        } else {
          return `imports: [TonModule, ${p1.trim()}]`;
        }
      });
      
      fs.writeFileSync(appModulePath, content);
      console.log('✅ Đã cập nhật app.module.ts để thêm TonModule');
    } else {
      console.log('ℹ️ TonModule đã có trong app.module.ts');
    }
  } else {
    createFile(appModulePath, appModuleContent);
  }
}

// Thực thi các hàm
function main() {
  console.log('🚀 Bắt đầu tạo các file cho tích hợp TON Wallet với NestJS...');
  
  createDirectories();
  installDependencies();
  
  // Tạo các file
  createFile(path.join(process.cwd(), 'src', 'ton', 'ton.module.ts'), tonModuleContent);
  createFile(path.join(process.cwd(), 'src', 'ton', 'ton.service.ts'), tonServiceContent);
  createFile(path.join(process.cwd(), 'src', 'ton', 'ton.controller.ts'), tonControllerContent);
  
  // Cập nhật hoặc tạo app.module.ts
  updateAppModule();
  
  console.log('\n✨ Hoàn thành! Đã tạo tất cả các file cần thiết cho tích hợp TON Wallet.');
  console.log('📝 Đừng quên cập nhật API key trong file src/ton/ton.service.ts');
}

main();