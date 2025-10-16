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
exports.TonKhoFilterInput = exports.PhieuKhoFilterInput = exports.KhoFilterInput = exports.UpdatePhieuKhoSanphamInput = exports.UpdatePhieuKhoInput = exports.CreatePhieuKhoSanphamInput = exports.CreatePhieuKhoInput = exports.UpdateKhoInput = exports.CreateKhoInput = exports.TonKhoPaginated = exports.PhieuKhoPaginated = exports.KhoPaginated = exports.TonKho = exports.PhieuKhoSanpham = exports.PhieuKho = exports.SanphamKho = exports.Kho = exports.Congty = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_types_1 = require("./common.types");
const donhang_types_1 = require("./donhang.types");
const sanpham_types_1 = require("./sanpham.types");
let Congty = class Congty {
};
exports.Congty = Congty;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Congty.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Congty.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Congty.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Congty.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Congty.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Congty.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Congty.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Congty.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Kho]),
    __metadata("design:type", Array)
], Congty.prototype, "kho", void 0);
exports.Congty = Congty = __decorate([
    (0, graphql_1.ObjectType)()
], Congty);
let Kho = class Kho {
};
exports.Kho = Kho;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Kho.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Kho.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Kho.prototype, "makho", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Kho.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Kho.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Kho.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Kho.prototype, "congtyId", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Kho.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Kho.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Kho.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Congty, { nullable: true }),
    __metadata("design:type", Congty)
], Kho.prototype, "congty", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SanphamKho]),
    __metadata("design:type", Array)
], Kho.prototype, "sanphamKho", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PhieuKho]),
    __metadata("design:type", Array)
], Kho.prototype, "phieukho", void 0);
exports.Kho = Kho = __decorate([
    (0, graphql_1.ObjectType)()
], Kho);
let SanphamKho = class SanphamKho {
};
exports.SanphamKho = SanphamKho;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SanphamKho.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SanphamKho.prototype, "khoId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SanphamKho.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], SanphamKho.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SanphamKho.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], SanphamKho.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], SanphamKho.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Kho),
    __metadata("design:type", Kho)
], SanphamKho.prototype, "kho", void 0);
__decorate([
    (0, graphql_1.Field)(() => sanpham_types_1.Sanpham),
    __metadata("design:type", sanpham_types_1.Sanpham)
], SanphamKho.prototype, "sanpham", void 0);
exports.SanphamKho = SanphamKho = __decorate([
    (0, graphql_1.ObjectType)()
], SanphamKho);
let PhieuKho = class PhieuKho {
};
exports.PhieuKho = PhieuKho;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], PhieuKho.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "maphieu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "madonhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "madncc", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "madathang", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], PhieuKho.prototype, "ngay", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PhieuKho.prototype, "isChotkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "khoId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKho.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], PhieuKho.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PhieuKho.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PhieuKho.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => donhang_types_1.Donhang, { nullable: true }),
    __metadata("design:type", donhang_types_1.Donhang)
], PhieuKho.prototype, "donhang", void 0);
__decorate([
    (0, graphql_1.Field)(() => Kho, { nullable: true }),
    __metadata("design:type", Kho)
], PhieuKho.prototype, "kho", void 0);
__decorate([
    (0, graphql_1.Field)(() => [PhieuKhoSanpham]),
    __metadata("design:type", Array)
], PhieuKho.prototype, "sanpham", void 0);
exports.PhieuKho = PhieuKho = __decorate([
    (0, graphql_1.ObjectType)()
], PhieuKho);
let PhieuKhoSanpham = class PhieuKhoSanpham {
};
exports.PhieuKhoSanpham = PhieuKhoSanpham;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], PhieuKhoSanpham.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], PhieuKhoSanpham.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], PhieuKhoSanpham.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKhoSanpham.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], PhieuKhoSanpham.prototype, "phieuKhoId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PhieuKhoSanpham.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], PhieuKhoSanpham.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => sanpham_types_1.Sanpham),
    __metadata("design:type", sanpham_types_1.Sanpham)
], PhieuKhoSanpham.prototype, "sanpham", void 0);
__decorate([
    (0, graphql_1.Field)(() => PhieuKho),
    __metadata("design:type", PhieuKho)
], PhieuKhoSanpham.prototype, "phieuKho", void 0);
exports.PhieuKhoSanpham = PhieuKhoSanpham = __decorate([
    (0, graphql_1.ObjectType)()
], PhieuKhoSanpham);
let TonKho = class TonKho {
};
exports.TonKho = TonKho;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TonKho.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], TonKho.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TonKho.prototype, "slton", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TonKho.prototype, "slchogiao", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TonKho.prototype, "slchonhap", void 0);
__decorate([
    (0, graphql_1.Field)(() => sanpham_types_1.Sanpham),
    __metadata("design:type", sanpham_types_1.Sanpham)
], TonKho.prototype, "sanpham", void 0);
exports.TonKho = TonKho = __decorate([
    (0, graphql_1.ObjectType)()
], TonKho);
let KhoPaginated = class KhoPaginated {
};
exports.KhoPaginated = KhoPaginated;
__decorate([
    (0, graphql_1.Field)(() => [Kho]),
    __metadata("design:type", Array)
], KhoPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], KhoPaginated.prototype, "pagination", void 0);
exports.KhoPaginated = KhoPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], KhoPaginated);
let PhieuKhoPaginated = class PhieuKhoPaginated {
};
exports.PhieuKhoPaginated = PhieuKhoPaginated;
__decorate([
    (0, graphql_1.Field)(() => [PhieuKho]),
    __metadata("design:type", Array)
], PhieuKhoPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], PhieuKhoPaginated.prototype, "pagination", void 0);
exports.PhieuKhoPaginated = PhieuKhoPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], PhieuKhoPaginated);
let TonKhoPaginated = class TonKhoPaginated {
};
exports.TonKhoPaginated = TonKhoPaginated;
__decorate([
    (0, graphql_1.Field)(() => [TonKho]),
    __metadata("design:type", Array)
], TonKhoPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], TonKhoPaginated.prototype, "pagination", void 0);
exports.TonKhoPaginated = TonKhoPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], TonKhoPaginated);
let CreateKhoInput = class CreateKhoInput {
};
exports.CreateKhoInput = CreateKhoInput;
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "makho", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreateKhoInput.prototype, "congtyId", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], CreateKhoInput.prototype, "isActive", void 0);
exports.CreateKhoInput = CreateKhoInput = __decorate([
    (0, graphql_1.InputType)()
], CreateKhoInput);
let UpdateKhoInput = class UpdateKhoInput {
};
exports.UpdateKhoInput = UpdateKhoInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "makho", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateKhoInput.prototype, "congtyId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateKhoInput.prototype, "isActive", void 0);
exports.UpdateKhoInput = UpdateKhoInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateKhoInput);
let CreatePhieuKhoInput = class CreatePhieuKhoInput {
};
exports.CreatePhieuKhoInput = CreatePhieuKhoInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "maphieu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "madonhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "madncc", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "madathang", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], CreatePhieuKhoInput.prototype, "ngay", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreatePhieuKhoInput.prototype, "isChotkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "khoId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], CreatePhieuKhoInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => [CreatePhieuKhoSanphamInput]),
    __metadata("design:type", Array)
], CreatePhieuKhoInput.prototype, "sanpham", void 0);
exports.CreatePhieuKhoInput = CreatePhieuKhoInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePhieuKhoInput);
let CreatePhieuKhoSanphamInput = class CreatePhieuKhoSanphamInput {
};
exports.CreatePhieuKhoSanphamInput = CreatePhieuKhoSanphamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], CreatePhieuKhoSanphamInput.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], CreatePhieuKhoSanphamInput.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreatePhieuKhoSanphamInput.prototype, "ghichu", void 0);
exports.CreatePhieuKhoSanphamInput = CreatePhieuKhoSanphamInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePhieuKhoSanphamInput);
let UpdatePhieuKhoInput = class UpdatePhieuKhoInput {
};
exports.UpdatePhieuKhoInput = UpdatePhieuKhoInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "maphieu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "madonhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "madncc", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "madathang", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], UpdatePhieuKhoInput.prototype, "ngay", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdatePhieuKhoInput.prototype, "isChotkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "khoId", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdatePhieuKhoInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => [UpdatePhieuKhoSanphamInput], { nullable: true }),
    __metadata("design:type", Array)
], UpdatePhieuKhoInput.prototype, "sanpham", void 0);
exports.UpdatePhieuKhoInput = UpdatePhieuKhoInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePhieuKhoInput);
let UpdatePhieuKhoSanphamInput = class UpdatePhieuKhoSanphamInput {
};
exports.UpdatePhieuKhoSanphamInput = UpdatePhieuKhoSanphamInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoSanphamInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdatePhieuKhoSanphamInput.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], UpdatePhieuKhoSanphamInput.prototype, "soluong", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdatePhieuKhoSanphamInput.prototype, "ghichu", void 0);
exports.UpdatePhieuKhoSanphamInput = UpdatePhieuKhoSanphamInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePhieuKhoSanphamInput);
let KhoFilterInput = class KhoFilterInput {
};
exports.KhoFilterInput = KhoFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], KhoFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], KhoFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], KhoFilterInput.prototype, "congtyId", void 0);
exports.KhoFilterInput = KhoFilterInput = __decorate([
    (0, graphql_1.InputType)()
], KhoFilterInput);
let PhieuKhoFilterInput = class PhieuKhoFilterInput {
};
exports.PhieuKhoFilterInput = PhieuKhoFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKhoFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], PhieuKhoFilterInput.prototype, "type", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], PhieuKhoFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], PhieuKhoFilterInput.prototype, "isChotkho", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], PhieuKhoFilterInput.prototype, "khoId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], PhieuKhoFilterInput.prototype, "startDate", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date, { nullable: true }),
    __metadata("design:type", Date)
], PhieuKhoFilterInput.prototype, "endDate", void 0);
exports.PhieuKhoFilterInput = PhieuKhoFilterInput = __decorate([
    (0, graphql_1.InputType)()
], PhieuKhoFilterInput);
let TonKhoFilterInput = class TonKhoFilterInput {
};
exports.TonKhoFilterInput = TonKhoFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], TonKhoFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], TonKhoFilterInput.prototype, "sanphamId", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], TonKhoFilterInput.prototype, "minSlton", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float, { nullable: true }),
    __metadata("design:type", Number)
], TonKhoFilterInput.prototype, "maxSlton", void 0);
exports.TonKhoFilterInput = TonKhoFilterInput = __decorate([
    (0, graphql_1.InputType)()
], TonKhoFilterInput);
//# sourceMappingURL=kho.types.js.map