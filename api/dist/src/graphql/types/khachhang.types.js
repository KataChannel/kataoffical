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
exports.KhachhangFilterInput = exports.UpdateKhachhangInput = exports.CreateKhachhangInput = exports.KhachhangPaginated = exports.Khachhang = exports.Nhomkhachhang = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_types_1 = require("./common.types");
const banggia_types_1 = require("./banggia.types");
let Nhomkhachhang = class Nhomkhachhang {
};
exports.Nhomkhachhang = Nhomkhachhang;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Nhomkhachhang.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Nhomkhachhang.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Khachhang]),
    __metadata("design:type", Array)
], Nhomkhachhang.prototype, "khachhang", void 0);
exports.Nhomkhachhang = Nhomkhachhang = __decorate([
    (0, graphql_1.ObjectType)()
], Nhomkhachhang);
let Khachhang = class Khachhang {
};
exports.Khachhang = Khachhang;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], Khachhang.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "tenfile", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "tenkh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "namenn", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], Khachhang.prototype, "makh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "makhold", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "mst", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "gionhanhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "quan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "loaikh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Khachhang.prototype, "hiengia", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Khachhang.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Khachhang.prototype, "istitle2", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Boolean)
], Khachhang.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], Khachhang.prototype, "banggiaId", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Khachhang.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => Date),
    __metadata("design:type", Date)
], Khachhang.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => banggia_types_1.Banggia, { nullable: true }),
    __metadata("design:type", banggia_types_1.Banggia)
], Khachhang.prototype, "banggia", void 0);
__decorate([
    (0, graphql_1.Field)(() => [Nhomkhachhang]),
    __metadata("design:type", Array)
], Khachhang.prototype, "nhomkhachhang", void 0);
exports.Khachhang = Khachhang = __decorate([
    (0, graphql_1.ObjectType)()
], Khachhang);
let KhachhangPaginated = class KhachhangPaginated {
};
exports.KhachhangPaginated = KhachhangPaginated;
__decorate([
    (0, graphql_1.Field)(() => [Khachhang]),
    __metadata("design:type", Array)
], KhachhangPaginated.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => common_types_1.PaginationInfo),
    __metadata("design:type", common_types_1.PaginationInfo)
], KhachhangPaginated.prototype, "pagination", void 0);
exports.KhachhangPaginated = KhachhangPaginated = __decorate([
    (0, graphql_1.ObjectType)()
], KhachhangPaginated);
let CreateKhachhangInput = class CreateKhachhangInput {
};
exports.CreateKhachhangInput = CreateKhachhangInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "tenfile", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "tenkh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "namenn", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "makh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "makhold", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "mst", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "gionhanhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "quan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "loaikh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateKhachhangInput.prototype, "hiengia", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateKhachhangInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: false }),
    __metadata("design:type", Boolean)
], CreateKhachhangInput.prototype, "istitle2", void 0);
__decorate([
    (0, graphql_1.Field)({ defaultValue: true }),
    __metadata("design:type", Boolean)
], CreateKhachhangInput.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], CreateKhachhangInput.prototype, "banggiaId", void 0);
exports.CreateKhachhangInput = CreateKhachhangInput = __decorate([
    (0, graphql_1.InputType)()
], CreateKhachhangInput);
let UpdateKhachhangInput = class UpdateKhachhangInput {
};
exports.UpdateKhachhangInput = UpdateKhachhangInput;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "tenfile", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "tenkh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "namenn", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "subtitle", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "makh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "makhold", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "mst", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "gionhanhang", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "quan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "phone", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "address", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "loaikh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "ghichu", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateKhachhangInput.prototype, "hiengia", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateKhachhangInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateKhachhangInput.prototype, "istitle2", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], UpdateKhachhangInput.prototype, "isshowvat", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { nullable: true }),
    __metadata("design:type", String)
], UpdateKhachhangInput.prototype, "banggiaId", void 0);
exports.UpdateKhachhangInput = UpdateKhachhangInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateKhachhangInput);
let KhachhangFilterInput = class KhachhangFilterInput {
};
exports.KhachhangFilterInput = KhachhangFilterInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], KhachhangFilterInput.prototype, "search", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], KhachhangFilterInput.prototype, "isActive", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], KhachhangFilterInput.prototype, "loaikh", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], KhachhangFilterInput.prototype, "quan", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", Boolean)
], KhachhangFilterInput.prototype, "hiengia", void 0);
exports.KhachhangFilterInput = KhachhangFilterInput = __decorate([
    (0, graphql_1.InputType)()
], KhachhangFilterInput);
//# sourceMappingURL=khachhang.types.js.map