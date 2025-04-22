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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TonController = void 0;
const common_1 = require("@nestjs/common");
const ton_service_1 = require("./ton.service");
let TonController = class TonController {
    constructor(tonService) {
        this.tonService = tonService;
    }
    async initializeWallet(body) {
        const { mnemonic } = body;
        const wallet = await this.tonService.initializeWallet(mnemonic);
        return { address: wallet.address };
    }
    async getWalletBalance(address) {
        const balance = await this.tonService.getWalletBalance(address);
        return { balance };
    }
    async sendTransaction(body) {
        const { mnemonic, toAddress, amount, message } = body;
        const wallet = await this.tonService.initializeWallet(mnemonic);
        const result = await this.tonService.sendTransaction(wallet, toAddress, amount, message);
        return result;
    }
};
exports.TonController = TonController;
__decorate([
    (0, common_1.Post)('wallet/initialize'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TonController.prototype, "initializeWallet", null);
__decorate([
    (0, common_1.Get)('wallet/balance/:address'),
    __param(0, (0, common_1.Param)('address')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], TonController.prototype, "getWalletBalance", null);
__decorate([
    (0, common_1.Post)('wallet/send'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], TonController.prototype, "sendTransaction", null);
exports.TonController = TonController = __decorate([
    (0, common_1.Controller)('ton'),
    __metadata("design:paramtypes", [ton_service_1.TonService])
], TonController);
//# sourceMappingURL=ton.controller.js.map