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
exports.PermissionWhereUniqueInput = exports.PermissionWhereInput = exports.UpdatePermissionInput = exports.CreatePermissionInput = exports.RoleWhereUniqueInput = exports.RoleWhereInput = exports.UpdateRoleInput = exports.CreateRoleInput = void 0;
const graphql_1 = require("@nestjs/graphql");
const class_validator_1 = require("class-validator");
let CreateRoleInput = class CreateRoleInput {
};
exports.CreateRoleInput = CreateRoleInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreateRoleInput.prototype, "name", void 0);
exports.CreateRoleInput = CreateRoleInput = __decorate([
    (0, graphql_1.InputType)()
], CreateRoleInput);
let UpdateRoleInput = class UpdateRoleInput {
};
exports.UpdateRoleInput = UpdateRoleInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateRoleInput.prototype, "name", void 0);
exports.UpdateRoleInput = UpdateRoleInput = __decorate([
    (0, graphql_1.InputType)()
], UpdateRoleInput);
let RoleWhereInput = class RoleWhereInput {
};
exports.RoleWhereInput = RoleWhereInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleWhereInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleWhereInput.prototype, "name", void 0);
exports.RoleWhereInput = RoleWhereInput = __decorate([
    (0, graphql_1.InputType)()
], RoleWhereInput);
let RoleWhereUniqueInput = class RoleWhereUniqueInput {
};
exports.RoleWhereUniqueInput = RoleWhereUniqueInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleWhereUniqueInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], RoleWhereUniqueInput.prototype, "name", void 0);
exports.RoleWhereUniqueInput = RoleWhereUniqueInput = __decorate([
    (0, graphql_1.InputType)()
], RoleWhereUniqueInput);
let CreatePermissionInput = class CreatePermissionInput {
};
exports.CreatePermissionInput = CreatePermissionInput;
__decorate([
    (0, graphql_1.Field)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], CreatePermissionInput.prototype, "description", void 0);
exports.CreatePermissionInput = CreatePermissionInput = __decorate([
    (0, graphql_1.InputType)()
], CreatePermissionInput);
let UpdatePermissionInput = class UpdatePermissionInput {
};
exports.UpdatePermissionInput = UpdatePermissionInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionInput.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdatePermissionInput.prototype, "description", void 0);
exports.UpdatePermissionInput = UpdatePermissionInput = __decorate([
    (0, graphql_1.InputType)()
], UpdatePermissionInput);
let PermissionWhereInput = class PermissionWhereInput {
};
exports.PermissionWhereInput = PermissionWhereInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionWhereInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionWhereInput.prototype, "name", void 0);
exports.PermissionWhereInput = PermissionWhereInput = __decorate([
    (0, graphql_1.InputType)()
], PermissionWhereInput);
let PermissionWhereUniqueInput = class PermissionWhereUniqueInput {
};
exports.PermissionWhereUniqueInput = PermissionWhereUniqueInput;
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionWhereUniqueInput.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], PermissionWhereUniqueInput.prototype, "name", void 0);
exports.PermissionWhereUniqueInput = PermissionWhereUniqueInput = __decorate([
    (0, graphql_1.InputType)()
], PermissionWhereUniqueInput);
//# sourceMappingURL=role.input.js.map