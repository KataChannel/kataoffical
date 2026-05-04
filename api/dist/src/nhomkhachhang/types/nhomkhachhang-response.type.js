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
exports.NhomkhachhangMutationResponse = exports.NhomkhachhangConnection = void 0;
const graphql_1 = require("@nestjs/graphql");
const nhomkhachhang_entity_1 = require("../entities/nhomkhachhang.entity");
let NhomkhachhangConnection = class NhomkhachhangConnection {
};
exports.NhomkhachhangConnection = NhomkhachhangConnection;
__decorate([
    (0, graphql_1.Field)(() => [nhomkhachhang_entity_1.Nhomkhachhang], { description: 'Danh sách nhóm khách hàng' }),
    __metadata("design:type", Array)
], NhomkhachhangConnection.prototype, "data", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Tổng số bản ghi' }),
    __metadata("design:type", Number)
], NhomkhachhangConnection.prototype, "total", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Trang hiện tại' }),
    __metadata("design:type", Number)
], NhomkhachhangConnection.prototype, "page", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Số lượng mỗi trang' }),
    __metadata("design:type", Number)
], NhomkhachhangConnection.prototype, "limit", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Int, { description: 'Tổng số trang' }),
    __metadata("design:type", Number)
], NhomkhachhangConnection.prototype, "totalPages", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: 'Có trang tiếp theo' }),
    __metadata("design:type", Boolean)
], NhomkhachhangConnection.prototype, "hasNextPage", void 0);
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: 'Có trang trước' }),
    __metadata("design:type", Boolean)
], NhomkhachhangConnection.prototype, "hasPreviousPage", void 0);
exports.NhomkhachhangConnection = NhomkhachhangConnection = __decorate([
    (0, graphql_1.ObjectType)('NhomkhachhangConnection', { description: 'Kết nối phân trang cho nhóm khách hàng' })
], NhomkhachhangConnection);
let NhomkhachhangMutationResponse = class NhomkhachhangMutationResponse {
};
exports.NhomkhachhangMutationResponse = NhomkhachhangMutationResponse;
__decorate([
    (0, graphql_1.Field)(() => Boolean, { description: 'Trạng thái thành công' }),
    __metadata("design:type", Boolean)
], NhomkhachhangMutationResponse.prototype, "success", void 0);
__decorate([
    (0, graphql_1.Field)(() => String, { nullable: true, description: 'Thông báo' }),
    __metadata("design:type", String)
], NhomkhachhangMutationResponse.prototype, "message", void 0);
__decorate([
    (0, graphql_1.Field)(() => nhomkhachhang_entity_1.Nhomkhachhang, { nullable: true, description: 'Dữ liệu nhóm khách hàng' }),
    __metadata("design:type", nhomkhachhang_entity_1.Nhomkhachhang)
], NhomkhachhangMutationResponse.prototype, "data", void 0);
exports.NhomkhachhangMutationResponse = NhomkhachhangMutationResponse = __decorate([
    (0, graphql_1.ObjectType)('NhomkhachhangMutationResponse', { description: 'Response cho các mutation' })
], NhomkhachhangMutationResponse);
//# sourceMappingURL=nhomkhachhang-response.type.js.map