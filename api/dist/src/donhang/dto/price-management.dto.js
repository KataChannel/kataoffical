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
exports.GetDonhangPriceAuditDto = exports.GetPriceHistoryDto = exports.BulkUpdatePriceDto = exports.UpdateProductPriceDto = void 0;
const class_validator_1 = require("class-validator");
const swagger_1 = require("@nestjs/swagger");
class UpdateProductPriceDto {
}
exports.UpdateProductPriceDto = UpdateProductPriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của đơn hàng' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "donhangId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của sản phẩm trong đơn hàng' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "donhangsanphamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của sản phẩm' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "sanphamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Giá mới', example: 12000 }),
    (0, class_validator_1.IsNumber)(),
    (0, class_validator_1.Min)(0),
    __metadata("design:type", Number)
], UpdateProductPriceDto.prototype, "newPrice", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do thay đổi giá', example: 'Điều chỉnh theo thỏa thuận khách hàng' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "changeReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'User ID người thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "changedBy", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Email người thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "changedByEmail", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'IP Address' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "ipAddress", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'User Agent' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateProductPriceDto.prototype, "userAgent", void 0);
class BulkUpdatePriceDto {
}
exports.BulkUpdatePriceDto = BulkUpdatePriceDto;
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'ID của bảng giá' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkUpdatePriceDto.prototype, "banggiaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Phần trăm tăng/giảm', example: 10 }),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], BulkUpdatePriceDto.prototype, "percentage", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ description: 'Lý do thay đổi' }),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkUpdatePriceDto.prototype, "changeReason", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'User ID người thay đổi' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], BulkUpdatePriceDto.prototype, "changedBy", void 0);
class GetPriceHistoryDto {
}
exports.GetPriceHistoryDto = GetPriceHistoryDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'ID của bảng giá' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPriceHistoryDto.prototype, "banggiaId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'ID của sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetPriceHistoryDto.prototype, "sanphamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Số lượng records', example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetPriceHistoryDto.prototype, "limit", void 0);
class GetDonhangPriceAuditDto {
}
exports.GetDonhangPriceAuditDto = GetDonhangPriceAuditDto;
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'ID của đơn hàng' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDonhangPriceAuditDto.prototype, "donhangId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'ID của sản phẩm' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], GetDonhangPriceAuditDto.prototype, "sanphamId", void 0);
__decorate([
    (0, swagger_1.ApiProperty)({ required: false, description: 'Số lượng records', example: 50 }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsNumber)(),
    __metadata("design:type", Number)
], GetDonhangPriceAuditDto.prototype, "limit", void 0);
//# sourceMappingURL=price-management.dto.js.map