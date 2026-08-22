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
exports.DonhangPriceController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const donhang_service_1 = require("./donhang.service");
const price_history_service_1 = require("./price-history.service");
const price_management_dto_1 = require("./dto/price-management.dto");
let DonhangPriceController = class DonhangPriceController {
    constructor(donhangService, priceHistoryService) {
        this.donhangService = donhangService;
        this.priceHistoryService = priceHistoryService;
    }
    async updateProductPrice(dto, req) {
        if (req.user) {
            dto.changedBy = req.user.id;
            dto.changedByEmail = req.user.email;
        }
        dto.ipAddress = req.ip || req.connection.remoteAddress;
        dto.userAgent = req.headers['user-agent'];
        return await this.donhangService.updateProductPrice(dto);
    }
    async getDonhangPriceAudit(donhangId) {
        return await this.priceHistoryService.getDonhangPriceAudit({
            donhangId,
            limit: 100
        });
    }
    async verifyOrderPrices(donhangId) {
        return await this.donhangService.verifyOrderPrices(donhangId);
    }
    async getProductPriceAudit(sanphamId, limit) {
        return await this.priceHistoryService.getDonhangPriceAudit({
            sanphamId,
            limit: limit || 50
        });
    }
    async getBanggiaPriceHistory(banggiaId, dto) {
        dto.banggiaId = banggiaId;
        return await this.priceHistoryService.getBanggiaPriceHistory(dto);
    }
    async getPriceComparison(banggiaId, sanphamId) {
        return await this.priceHistoryService.getPriceComparison(sanphamId, banggiaId);
    }
    async getPriceStatistics(sanphamId, days) {
        return await this.priceHistoryService.getPriceStatistics(sanphamId, days || 30);
    }
};
exports.DonhangPriceController = DonhangPriceController;
__decorate([
    (0, common_1.Post)('update'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    (0, swagger_1.ApiOperation)({ summary: 'Cập nhật giá sản phẩm trong đơn hàng' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Cập nhật thành công' }),
    (0, swagger_1.ApiResponse)({ status: 400, description: 'Dữ liệu không hợp lệ' }),
    (0, swagger_1.ApiResponse)({ status: 404, description: 'Đơn hàng hoặc sản phẩm không tồn tại' }),
    __param(0, (0, common_1.Body)()),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [price_management_dto_1.UpdateProductPriceDto, Object]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "updateProductPrice", null);
__decorate([
    (0, common_1.Get)(':donhangId/audit'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử thay đổi giá của đơn hàng' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trả về lịch sử audit' }),
    __param(0, (0, common_1.Param)('donhangId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "getDonhangPriceAudit", null);
__decorate([
    (0, common_1.Get)(':donhangId/verify'),
    (0, swagger_1.ApiOperation)({ summary: 'Xác minh giá đơn hàng so với bảng giá hiện tại' }),
    (0, swagger_1.ApiResponse)({ status: 200, description: 'Trả về kết quả xác minh' }),
    __param(0, (0, common_1.Param)('donhangId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "verifyOrderPrices", null);
__decorate([
    (0, common_1.Get)('audit/product/:sanphamId'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử giá của sản phẩm trong tất cả đơn hàng' }),
    __param(0, (0, common_1.Param)('sanphamId')),
    __param(1, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "getProductPriceAudit", null);
__decorate([
    (0, common_1.Get)('banggia/:banggiaId/history'),
    (0, swagger_1.ApiOperation)({ summary: 'Lấy lịch sử thay đổi giá trong bảng giá' }),
    __param(0, (0, common_1.Param)('banggiaId')),
    __param(1, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, price_management_dto_1.GetPriceHistoryDto]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "getBanggiaPriceHistory", null);
__decorate([
    (0, common_1.Get)('banggia/:banggiaId/product/:sanphamId/comparison'),
    (0, swagger_1.ApiOperation)({ summary: 'So sánh giá hiện tại vs lịch sử' }),
    __param(0, (0, common_1.Param)('banggiaId')),
    __param(1, (0, common_1.Param)('sanphamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "getPriceComparison", null);
__decorate([
    (0, common_1.Get)('product/:sanphamId/statistics'),
    (0, swagger_1.ApiOperation)({ summary: 'Thống kê biến động giá sản phẩm' }),
    __param(0, (0, common_1.Param)('sanphamId')),
    __param(1, (0, common_1.Query)('days')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Number]),
    __metadata("design:returntype", Promise)
], DonhangPriceController.prototype, "getPriceStatistics", null);
exports.DonhangPriceController = DonhangPriceController = __decorate([
    (0, swagger_1.ApiTags)('Price Management'),
    (0, common_1.Controller)('donhang/price'),
    __metadata("design:paramtypes", [donhang_service_1.DonhangService,
        price_history_service_1.PriceHistoryService])
], DonhangPriceController);
//# sourceMappingURL=donhang-price.controller.js.map