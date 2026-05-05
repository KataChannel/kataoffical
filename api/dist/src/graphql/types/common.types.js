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
exports.FilterInput = exports.SortInput = exports.PaginationInput = exports.PaginationInfo = void 0;
const graphql_1 = require("@nestjs/graphql");
let PaginationInfo = class PaginationInfo {
};
exports.PaginationInfo = PaginationInfo;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "pageSize", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int),
    __metadata("design:type", Number)
], PaginationInfo.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginationInfo.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PaginationInfo.prototype, "hasPreviousPage", void 0);
exports.PaginationInfo = PaginationInfo = __decorate([
    (0, graphql_1.ObjectType)()
], PaginationInfo);
let PaginationInput = class PaginationInput {
};
exports.PaginationInput = PaginationInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 1 }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { defaultValue: 10 }),
    __metadata("design:type", Number)
], PaginationInput.prototype, "pageSize", void 0);
exports.PaginationInput = PaginationInput = __decorate([
    (0, graphql_1.InputType)()
], PaginationInput);
let SortInput = class SortInput {
};
exports.SortInput = SortInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SortInput.prototype, "field", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: 'desc' }),
    __metadata("design:type", String)
], SortInput.prototype, "direction", void 0);
exports.SortInput = SortInput = __decorate([
    (0, graphql_1.InputType)()
], SortInput);
let FilterInput = class FilterInput {
};
exports.FilterInput = FilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], FilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], FilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Date)
], FilterInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], FilterInput.prototype, "ids", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], FilterInput.prototype, "isActive", void 0);
exports.FilterInput = FilterInput = __decorate([
    (0, graphql_1.InputType)()
], FilterInput);
//# sourceMappingURL=common.types.js.map