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
exports.ManageKhachhangInNhomInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let ManageKhachhangInNhomInput = class ManageKhachhangInNhomInput {
};
exports.ManageKhachhangInNhomInput = ManageKhachhangInNhomInput;
__decorate([
    (0, graphql_1.Field)(() => String, { description: 'ID của nhóm khách hàng' }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsUUID)('4', { message: 'ID nhóm không hợp lệ' }),
    __metadata("design:type", String)
], ManageKhachhangInNhomInput.prototype, "nhomId", void 0);
__decorate([
    (0, graphql_1.Field)(() => [String], { description: 'Danh sách ID khách hàng' }),
    (0, class_validator_1.IsArray)(),
    (0, class_validator_1.IsString)({ each: true }),
    (0, class_validator_1.IsUUID)('4', { each: true, message: 'ID khách hàng không hợp lệ' }),
    __metadata("design:type", Array)
], ManageKhachhangInNhomInput.prototype, "khachhangIds", void 0);
exports.ManageKhachhangInNhomInput = ManageKhachhangInNhomInput = __decorate([
    (0, graphql_1.InputType)()
], ManageKhachhangInNhomInput);
//# sourceMappingURL=manage-khachhang-nhom.dto.js.map