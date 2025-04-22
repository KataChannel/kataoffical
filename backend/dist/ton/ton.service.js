"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonService = void 0;
const common_1 = require("@nestjs/common");
const ton_1 = require("@ton/ton");
const crypto_1 = require("@ton/crypto");
let TonService = class TonService {
    constructor() {
        this.tonClient = new ton_1.TonClient({
            endpoint: 'https://toncenter.com/api/v2/jsonRPC',
            apiKey: 'YOUR_TONCENTER_API_KEY',
        });
    }
    async initializeWallet(mnemonic) {
        try {
            const keyPair = await (0, crypto_1.mnemonicToPrivateKey)(mnemonic);
            const wallet = ton_1.WalletContractV4.create({
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
        }
        catch (error) {
            throw new Error(`Không thể khởi tạo ví TON: ${error.message}`);
        }
    }
    async getWalletBalance(address) {
        try {
            const addressObj = ton_1.Address.parse(address);
            const balance = await this.tonClient.getBalance(addressObj);
            return balance;
        }
        catch (error) {
            throw new Error(`Không thể lấy số dư ví: ${error.message}`);
        }
    }
    async sendTransaction(walletInfo, toAddress, amount, message) {
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
        }
        catch (error) {
            throw new Error(`Không thể gửi giao dịch: ${error.message}`);
        }
    }
};
exports.TonService = TonService;
exports.TonService = TonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [])
], TonService);
//# sourceMappingURL=ton.service.js.map