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
exports.DonhangFilterInput = exports.UpdateDonhangsanphamInput = exports.UpdateDonhangInput = exports.CreateDonhangsanphamInput = exports.CreateDonhangInput = exports.DonhangPaginated = exports.Donhangsanpham = exports.Donhang = void 0;
const graphql_1 = require("@nestjs/graphql");
const enums_1 = require("../enums");
const common_types_1 = require("./common.types");
const khachhang_types_1 = require("./khachhang.types");
const sanpham_types_1 = require("./sanpham.types");
let Donhang = class Donhang {
};
exports.Donhang = Donhang;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Donhang.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Donhang.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Donhang.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Donhang.prototype, "madonhang", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], Donhang.prototype, "ngaygiao", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Donhang.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Donhang.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.StatusDonhang),
    __metadata("design:type", String)
], Donhang.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Donhang.prototype, "khachhangId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Donhang.prototype, "printCount", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Donhang.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Donhang.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Donhang.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Donhang.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhang.prototype, "tongvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhang.prototype, "tongtien", void 0);
__decorate([
    (0, graphql_1.Field)(() => khachhang_types_1.Khachhang),
    __metadata("design:type", khachhang_types_1.Khachhang)
], Donhang.prototype, "khachhang", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Donhangsanpham]),
    __metadata("design:type", Array)
], Donhang.prototype, "sanpham", void 0);
exports.Donhang = Donhang = __decorate([
    (0, graphql_1.ObjectType)()
], Donhang);
let Donhangsanpham = class Donhangsanpham {
};
exports.Donhangsanpham = Donhangsanpham;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Donhangsanpham.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Donhangsanpham.prototype, "idSP", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "sldat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "slgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "slnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "slhuy", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "ttdat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "ttgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "ttnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "ttsauvat", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Donhangsanpham.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Donhangsanpham.prototype, "donhangId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], Donhangsanpham.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], Donhangsanpham.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => sanpham_types_1.Sanpham),
    __metadata("design:type", sanpham_types_1.Sanpham)
], Donhangsanpham.prototype, "sanpham", void 0);
__decorate([
    (0, graphql_1.Field)(() => Donhang),
    __metadata("design:type", Donhang)
], Donhangsanpham.prototype, "donhang", void 0);
exports.Donhangsanpham = Donhangsanpham = __decorate([
    (0, graphql_1.ObjectType)()
], Donhangsanpham);
let DonhangPaginated = class DonhangPaginated {
};
exports.DonhangPaginated = DonhangPaginated;
__decorate([
    (0, graphql_1.Field)(() => [Donhang]),
    __metadata("design:type", Array)
], DonhangPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], DonhangPaginated.prototype, "pagination", void 0);
exports.DonhangPaginated = DonhangPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], DonhangPaginated);
let CreateDonhangInput = class CreateDonhangInput {
};
exports.CreateDonhangInput = CreateDonhangInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDonhangInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDonhangInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CreateDonhangInput.prototype, "ngaygiao", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDonhangInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateDonhangInput.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.StatusDonhang, { defaultValue: enums_1.StatusDonhang.DADAT }),
    __metadata("design:type", String)
], CreateDonhangInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateDonhangInput.prototype, "khachhangId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateDonhangInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateDonhangInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangInput.prototype, "tongvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangInput.prototype, "tongtien", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreateDonhangsanphamInput]),
    __metadata("design:type", Array)
], CreateDonhangInput.prototype, "sanpham", void 0);
exports.CreateDonhangInput = CreateDonhangInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDonhangInput);
let CreateDonhangsanphamInput = class CreateDonhangsanphamInput {
};
exports.CreateDonhangsanphamInput = CreateDonhangsanphamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreateDonhangsanphamInput.prototype, "idSP", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "sldat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "slgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "slnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "slhuy", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "ttdat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "ttgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "ttnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { defaultValue: 0 }),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "ttsauvat", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateDonhangsanphamInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], CreateDonhangsanphamInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], CreateDonhangsanphamInput.prototype, "isActive", void 0);
exports.CreateDonhangsanphamInput = CreateDonhangsanphamInput = __decorate([
    (0, graphql_1.InputType)()
], CreateDonhangsanphamInput);
let UpdateDonhangInput = class UpdateDonhangInput {
};
exports.UpdateDonhangInput = UpdateDonhangInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdateDonhangInput.prototype, "ngaygiao", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateDonhangInput.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.StatusDonhang, { nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangInput.prototype, "khachhangId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateDonhangInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangInput.prototype, "tongvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangInput.prototype, "tongtien", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UpdateDonhangsanphamInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdateDonhangInput.prototype, "sanpham", void 0);
exports.UpdateDonhangInput = UpdateDonhangInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDonhangInput);
let UpdateDonhangsanphamInput = class UpdateDonhangsanphamInput {
};
exports.UpdateDonhangsanphamInput = UpdateDonhangsanphamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangsanphamInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateDonhangsanphamInput.prototype, "idSP", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "giaban", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "sldat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "slgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "slnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "slhuy", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "ttdat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "ttgiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "ttnhan", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "vat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "ttsauvat", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateDonhangsanphamInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { nullable: true }),
    __metadata("design:type", Number)
], UpdateDonhangsanphamInput.prototype, "order", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateDonhangsanphamInput.prototype, "isActive", void 0);
exports.UpdateDonhangsanphamInput = UpdateDonhangsanphamInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateDonhangsanphamInput);
let DonhangFilterInput = class DonhangFilterInput {
};
exports.DonhangFilterInput = DonhangFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], DonhangFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)(() => enums_1.StatusDonhang, { nullable: true }),
    __metadata("design:type", String)
], DonhangFilterInput.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(() => [enums_1.StatusDonhang], { nullable: true }),
    __metadata("design:type", Array)
], DonhangFilterInput.prototype, "statuses", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], DonhangFilterInput.prototype, "khachhangId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], DonhangFilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], DonhangFilterInput.prototype, "endDate", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], DonhangFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], DonhangFilterInput.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], DonhangFilterInput.prototype, "minTongtien", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], DonhangFilterInput.prototype, "maxTongtien", void 0);
exports.DonhangFilterInput = DonhangFilterInput = __decorate([
    (0, graphql_1.InputType)()
], DonhangFilterInput);
//# sourceMappingURL=donhang.types.js.map