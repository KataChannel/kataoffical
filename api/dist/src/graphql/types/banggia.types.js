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
exports.BanggiaFilterInput = exports.UpdateBanggiaInput = exports.CreateBanggiaInput = exports.BanggiaPaginated = exports.Banggia = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_types_1 = require("./common.types");
let Banggia = class Banggia {
};
exports.Banggia = Banggia;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Banggia.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Banggia.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Banggia.prototype, "mabanggia", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Banggia.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Banggia.prototype, "batdau", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Banggia.prototype, "ketthuc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Banggia.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Banggia.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Banggia.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Banggia.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Banggia.prototype, "isDefault", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Banggia.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Banggia.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { nullable: true }),
    __metadata("design:type", Array)
], Banggia.prototype, "sanphamIds", void 0);
exports.Banggia = Banggia = __decorate([
    (0, graphql_1.ObjectType)()
], Banggia);
let BanggiaPaginated = class BanggiaPaginated {
};
exports.BanggiaPaginated = BanggiaPaginated;
__decorate([
    (0, graphql_1.Field)(() => [Banggia]),
    __metadata("design:type", Array)
], BanggiaPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], BanggiaPaginated.prototype, "pagination", void 0);
exports.BanggiaPaginated = BanggiaPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], BanggiaPaginated);
let CreateBanggiaInput = class CreateBanggiaInput {
};
exports.CreateBanggiaInput = CreateBanggiaInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBanggiaInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBanggiaInput.prototype, "mabanggia", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBanggiaInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CreateBanggiaInput.prototype, "batdau", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CreateBanggiaInput.prototype, "ketthuc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateBanggiaInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBanggiaInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateBanggiaInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], CreateBanggiaInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateBanggiaInput.prototype, "isDefault", void 0);
exports.CreateBanggiaInput = CreateBanggiaInput = __decorate([
    (0, graphql_1.InputType)()
], CreateBanggiaInput);
let UpdateBanggiaInput = class UpdateBanggiaInput {
};
exports.UpdateBanggiaInput = UpdateBanggiaInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "mabanggia", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdateBanggiaInput.prototype, "batdau", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdateBanggiaInput.prototype, "ketthuc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateBanggiaInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateBanggiaInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateBanggiaInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateBanggiaInput.prototype, "isDefault", void 0);
exports.UpdateBanggiaInput = UpdateBanggiaInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateBanggiaInput);
let BanggiaFilterInput = class BanggiaFilterInput {
};
exports.BanggiaFilterInput = BanggiaFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BanggiaFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], BanggiaFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], BanggiaFilterInput.prototype, "isDefault", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BanggiaFilterInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], BanggiaFilterInput.prototype, "status", void 0);
exports.BanggiaFilterInput = BanggiaFilterInput = __decorate([
    (0, graphql_1.InputType)()
], BanggiaFilterInput);
//# sourceMappingURL=banggia.types.js.map