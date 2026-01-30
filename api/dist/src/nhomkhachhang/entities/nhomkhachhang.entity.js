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
exports.KhachhangBasic = exports.Nhomkhachhang = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
let Nhomkhachhang = class Nhomkhachhang {
};
exports.Nhomkhachhang = Nhomkhachhang;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { description: 'ID của nhóm khách hàng' }),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'Tên nhóm khách hàng' }),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Mô tả nhóm khách hàng' }),
    __metadata("design:type", String)
], Nhomkhachhang.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime, { description: 'Ngày tạo' }),
    __metadata("design:type", Date)
], Nhomkhachhang.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime, { description: 'Ngày cập nhật' }),
    __metadata("design:type", Date)
], Nhomkhachhang.prototype, "updatedAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => [KhachhangBasic], { nullable: true, description: 'Danh sách khách hàng trong nhóm' }),
    __metadata("design:type", Array)
], Nhomkhachhang.prototype, "khachhang", void 0);
exports.Nhomkhachhang = Nhomkhachhang = __decorate([
    (0, graphql_1.ObjectType)('Nhomkhachhang', { description: 'Nhóm khách hàng entity' })
], Nhomkhachhang);
let KhachhangBasic = class KhachhangBasic {
};
exports.KhachhangBasic = KhachhangBasic;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID, { description: 'ID khách hàng' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Tên khách hàng' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Tên khách hàng (tenkh)' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "tenkh", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Địa chỉ khách hàng' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "diachi", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Số điện thoại' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "sdt", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Email' }),
    __metadata("design:type", String)
], KhachhangBasic.prototype, "email", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: 'Trạng thái hoạt động' }),
    __metadata("design:type", Boolean)
], KhachhangBasic.prototype, "isActive", void 0);
exports.KhachhangBasic = KhachhangBasic = __decorate([
    (0, graphql_1.ObjectType)('KhachhangBasic', { description: 'Thông tin cơ bản của khách hàng' })
], KhachhangBasic);
//# sourceMappingURL=nhomkhachhang.entity.js.map