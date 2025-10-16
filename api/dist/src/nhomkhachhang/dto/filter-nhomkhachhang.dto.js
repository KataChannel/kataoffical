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
exports.NhomkhachhangSortInput = exports.NhomkhachhangPaginationInput = exports.NhomkhachhangFilterInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let NhomkhachhangFilterInput = class NhomkhachhangFilterInput {
};
exports.NhomkhachhangFilterInput = NhomkhachhangFilterInput;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Tìm kiếm theo tên' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhomkhachhangFilterInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Tìm kiếm theo mô tả' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhomkhachhangFilterInput.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Tìm kiếm chung' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhomkhachhangFilterInput.prototype, "search", void 0);
exports.NhomkhachhangFilterInput = NhomkhachhangFilterInput = __decorate([
    (0, graphql_1.InputType)()
], NhomkhachhangFilterInput);
let NhomkhachhangPaginationInput = class NhomkhachhangPaginationInput {
    constructor() {
        this.page = 1;
        this.limit = 10;
    }
};
exports.NhomkhachhangPaginationInput = NhomkhachhangPaginationInput;
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true, defaultValue: 1, description: 'Trang hiện tại' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], NhomkhachhangPaginationInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => Number, { nullable: true, defaultValue: 10, description: 'Số lượng mỗi trang' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsInt)(),
    (0, class_validator_1.Min)(1),
    __metadata("design:type", Number)
], NhomkhachhangPaginationInput.prototype, "limit", void 0);
exports.NhomkhachhangPaginationInput = NhomkhachhangPaginationInput = __decorate([
    (0, graphql_1.InputType)()
], NhomkhachhangPaginationInput);
let NhomkhachhangSortInput = class NhomkhachhangSortInput {
    constructor() {
        this.field = 'createdAt';
        this.direction = 'desc';
    }
};
exports.NhomkhachhangSortInput = NhomkhachhangSortInput;
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, defaultValue: 'createdAt', description: 'Trường sắp xếp' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhomkhachhangSortInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, defaultValue: 'desc', description: 'Hướng sắp xếp: asc hoặc desc' }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], NhomkhachhangSortInput.prototype, "direction", void 0);
exports.NhomkhachhangSortInput = NhomkhachhangSortInput = __decorate([
    (0, graphql_1.InputType)()
], NhomkhachhangSortInput);
//# sourceMappingURL=filter-nhomkhachhang.dto.js.map