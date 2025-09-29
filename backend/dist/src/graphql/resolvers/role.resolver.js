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
exports.PermissionResolver = exports.RoleResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const base_resolver_1 = require("../base/base.resolver");
const role_type_1 = require("../types/role.type");
const role_input_1 = require("../inputs/role.input");
const prisma_service_1 = require("../../../prisma/prisma.service");
const BaseRoleResolver = (0, base_resolver_1.createBaseResolver)(role_type_1.Role, role_input_1.CreateRoleInput, role_input_1.UpdateRoleInput, role_input_1.RoleWhereInput, role_input_1.RoleWhereUniqueInput, 'Role');
let RoleResolver = class RoleResolver extends BaseRoleResolver {
    constructor(prisma) {
        super(prisma);
    }
};
exports.RoleResolver = RoleResolver;
exports.RoleResolver = RoleResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_type_1.Role),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], RoleResolver);
const BasePermissionResolver = (0, base_resolver_1.createBaseResolver)(role_type_1.Permission, role_input_1.CreatePermissionInput, role_input_1.UpdatePermissionInput, role_input_1.PermissionWhereInput, role_input_1.PermissionWhereUniqueInput, 'Permission');
let PermissionResolver = class PermissionResolver extends BasePermissionResolver {
    constructor(prisma) {
        super(prisma);
    }
};
exports.PermissionResolver = PermissionResolver;
exports.PermissionResolver = PermissionResolver = __decorate([
    (0, graphql_1.Resolver)(() => role_type_1.Permission),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PermissionResolver);
//# sourceMappingURL=role.resolver.js.map