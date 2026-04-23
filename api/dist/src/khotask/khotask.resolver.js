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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.KhotaskResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_type_json_1 = require("graphql-type-json");
const khotask_service_1 = require("./khotask.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
let KhotaskResolver = class KhotaskResolver {
    constructor(khotaskService) {
        this.khotaskService = khotaskService;
    }
    async findMany(filters) {
        return await this.khotaskService.findAll(filters || {});
    }
    async getDailyChecklist(khoId, date) {
        return await this.khotaskService.getDailyChecklist(khoId, date ? new Date(date) : new Date());
    }
    async create(data) {
        return await this.khotaskService.create(data);
    }
    async update(id, data) {
        return await this.khotaskService.update(id, data);
    }
    async remove(id) {
        return await this.khotaskService.remove(id);
    }
};
exports.KhotaskResolver = KhotaskResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, { name: 'khotaskFindMany' }),
    __param(0, (0, graphql_1.Args)('filters', { type: () => graphql_type_json_1.GraphQLJSON, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhotaskResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, { name: 'khotaskDailyChecklist' }),
    __param(0, (0, graphql_1.Args)('khoId', { type: () => String })),
    __param(1, (0, graphql_1.Args)('date', { type: () => String, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], KhotaskResolver.prototype, "getDailyChecklist", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'khotaskCreate' }),
    (0, audit_decorator_1.Audit)({ entity: 'KhoTask', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('data', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], KhotaskResolver.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'khotaskUpdate' }),
    (0, audit_decorator_1.Audit)({ entity: 'KhoTask', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __param(1, (0, graphql_1.Args)('data', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], KhotaskResolver.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, { name: 'khotaskDelete' }),
    (0, audit_decorator_1.Audit)({ entity: 'KhoTask', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], KhotaskResolver.prototype, "remove", null);
exports.KhotaskResolver = KhotaskResolver = __decorate([
    (0, graphql_1.Resolver)('Khotask'),
    __metadata("design:paramtypes", [khotask_service_1.KhotaskService])
], KhotaskResolver);
//# sourceMappingURL=khotask.resolver.js.map