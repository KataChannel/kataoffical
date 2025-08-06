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
exports.SanphamFilterInput = exports.UpdateSanphamInput = exports.CreateSanphamInput = exports.SanphamPaginated = exports.Nhacungcap = exports.Banggiasanpham = exports.Sanpham = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_types_1 = require("./common.types");
const banggia_types_1 = require("./banggia.types");
let Sanpham = class Sanpham {
};
exports.Sanpham = Sanpham;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Sanpham.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Sanpham.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "title2", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Sanpham.prototype, "masp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Sanpham.prototype, "giagoc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Sanpham.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "dvt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "hinhanh", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Sanpham.prototype, "loadpoint", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Sanpham.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Sanpham.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], Sanpham.prototype, "soluongkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Sanpham.prototype, "haohut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Sanpham.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Sanpham.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Sanpham.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Sanpham.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Sanpham.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Banggiasanpham], { nullable: true }),
    __metadata("design:type", Array)
], Sanpham.prototype, "banggia", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Nhacungcap], { nullable: true }),
    __metadata("design:type", Array)
], Sanpham.prototype, "nhacungcap", void 0);
exports.Sanpham = Sanpham = __decorate([
    (0, graphql_1.ObjectType)()
], Sanpham);
let Banggiasanpham = class Banggiasanpham {
};
exports.Banggiasanpham = Banggiasanpham;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Banggiasanpham.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Banggiasanpham.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Banggiasanpham.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Banggiasanpham.prototype, "banggiaId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Banggiasanpham.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Banggiasanpham.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Sanpham),
    __metadata("design:type", Sanpham)
], Banggiasanpham.prototype, "sanpham", void 0);
__decorate([
    (0, graphql_1.Field)(() => banggia_types_1.Banggia),
    __metadata("design:type", banggia_types_1.Banggia)
], Banggiasanpham.prototype, "banggia", void 0);
exports.Banggiasanpham = Banggiasanpham = __decorate([
    (0, graphql_1.ObjectType)()
], Banggiasanpham);
let Nhacungcap = class Nhacungcap {
};
exports.Nhacungcap = Nhacungcap;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Nhacungcap.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "tenfile", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Nhacungcap.prototype, "mancc", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "manccold", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhacungcap.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Nhacungcap.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Nhacungcap.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Nhacungcap.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Nhacungcap.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Sanpham]),
    __metadata("design:type", Array)
], Nhacungcap.prototype, "sanpham", void 0);
exports.Nhacungcap = Nhacungcap = __decorate([
    (0, graphql_1.ObjectType)()
], Nhacungcap);
let SanphamPaginated = class SanphamPaginated {
};
exports.SanphamPaginated = SanphamPaginated;
__decorate([
    (0, graphql_1.Field)(() => [Sanpham]),
    __metadata("design:type", Array)
], SanphamPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], SanphamPaginated.prototype, "pagination", void 0);
exports.SanphamPaginated = SanphamPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], SanphamPaginated);
let CreateSanphamInput = class CreateSanphamInput {
};
exports.CreateSanphamInput = CreateSanphamInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "title2", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "masp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "giagoc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "dvt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "hinhanh", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "loadpoint", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "soluongkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "haohut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateSanphamInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateSanphamInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateSanphamInput.prototype, "isActive", void 0);
exports.CreateSanphamInput = CreateSanphamInput = __decorate([
    (0, graphql_1.InputType)()
], CreateSanphamInput);
let UpdateSanphamInput = class UpdateSanphamInput {
};
exports.UpdateSanphamInput = UpdateSanphamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "title2", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "slug", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "masp", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "giagoc", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "dvt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "hinhanh", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "loadpoint", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "soluongkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "haohut", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateSanphamInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateSanphamInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateSanphamInput.prototype, "isActive", void 0);
exports.UpdateSanphamInput = UpdateSanphamInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateSanphamInput);
let SanphamFilterInput = class SanphamFilterInput {
};
exports.SanphamFilterInput = SanphamFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SanphamFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], SanphamFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SanphamFilterInput.prototype, "dvt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], SanphamFilterInput.prototype, "minPrice", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], SanphamFilterInput.prototype, "maxPrice", void 0);
exports.SanphamFilterInput = SanphamFilterInput = __decorate([
    (0, graphql_1.InputType)()
], SanphamFilterInput);
//# sourceMappingURL=sanpham.types.js.map