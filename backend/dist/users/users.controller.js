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
exports.UsersController = void 0;
const common_1 = require("@nestjs/common");
const users_service_1 = require("./users.service");
let UsersController = class UsersController {
    constructor(usersService) {
        this.usersService = usersService;
    }
    async getUser(userId) {
        return this.usersService.getUser(userId);
    }
    async plantCrop(body) {
        try {
            return await this.usersService.plantCrop(body.userId, body.cropName);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async waterCrops(body) {
        try {
            return await this.usersService.waterCrops(body.userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async harvestCrops(body) {
        try {
            return await this.usersService.harvestCrops(body.userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async connectWallet(body) {
        try {
            return await this.usersService.connectWallet(body.userId, body.walletAddress);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async buyItem(body) {
        try {
            return await this.usersService.buyItem(body.userId, body.item);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async deposit(body) {
        try {
            return await this.usersService.deposit(body.userId, body.amount);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async withdraw(body) {
        try {
            return await this.usersService.withdraw(body.userId, body.amount);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async linkTelegram(body) {
        try {
            return await this.usersService.linkTelegram(body.userId, body.telegramChatId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
    async adReward(body) {
        try {
            return await this.usersService.adReward(body.userId);
        }
        catch (error) {
            throw new common_1.HttpException(error.message, common_1.HttpStatus.BAD_REQUEST);
        }
    }
};
exports.UsersController = UsersController;
__decorate([
    (0, common_1.Get)(':userId'),
    __param(0, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "getUser", null);
__decorate([
    (0, common_1.Post)('plant'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "plantCrop", null);
__decorate([
    (0, common_1.Post)('water'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "waterCrops", null);
__decorate([
    (0, common_1.Post)('harvest'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "harvestCrops", null);
__decorate([
    (0, common_1.Post)('connect_wallet'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "connectWallet", null);
__decorate([
    (0, common_1.Post)('buy'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "buyItem", null);
__decorate([
    (0, common_1.Post)('deposit'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "deposit", null);
__decorate([
    (0, common_1.Post)('withdraw'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "withdraw", null);
__decorate([
    (0, common_1.Post)('link_telegram'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "linkTelegram", null);
__decorate([
    (0, common_1.Post)('ad'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], UsersController.prototype, "adReward", null);
exports.UsersController = UsersController = __decorate([
    (0, common_1.Controller)('users'),
    __metadata("design:paramtypes", [users_service_1.UsersService])
], UsersController);
//# sourceMappingURL=users.controller.js.map