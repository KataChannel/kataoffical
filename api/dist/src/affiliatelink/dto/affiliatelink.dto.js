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
exports.FindByDto = exports.ReorderAffiliatelinkDto = exports.UpdateAffiliatelinkDto = exports.CreateAffiliatelinkDto = void 0;
const class_validator_1 = require("class-validator");
class CreateAffiliatelinkDto {
}
exports.CreateAffiliatelinkDto = CreateAffiliatelinkDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAffiliatelinkDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateAffiliatelinkDto.prototype, "content", void 0);
class UpdateAffiliatelinkDto {
}
exports.UpdateAffiliatelinkDto = UpdateAffiliatelinkDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAffiliatelinkDto.prototype, "title", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateAffiliatelinkDto.prototype, "content", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", Number)
], UpdateAffiliatelinkDto.prototype, "order", void 0);
class ReorderAffiliatelinkDto {
}
exports.ReorderAffiliatelinkDto = ReorderAffiliatelinkDto;
__decorate([
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    __metadata("design:type", Array)
], ReorderAffiliatelinkDto.prototype, "affiliatelinkIds", void 0);
class FindByDto {
}
exports.FindByDto = FindByDto;
//# sourceMappingURL=affiliatelink.dto.js.map