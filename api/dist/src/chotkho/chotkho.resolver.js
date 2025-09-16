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
exports.ChotkhoResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_type_json_1 = require("graphql-type-json");
const chotkho_service_1 = require("./chotkho.service");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const client_1 = require("@prisma/client");
const audit_decorator_1 = require("../auditlog/audit.decorator");
let ChotkhoResolver = class ChotkhoResolver {
    constructor(chotkhoService) {
        this.chotkhoService = chotkhoService;
    }
    async findMany(page, limit) {
        return await this.chotkhoService.findAll(page, limit);
    }
    async findOne(id) {
        return await this.chotkhoService.findOne(id);
    }
    async getProductsByWarehouse(khoId) {
        return await this.chotkhoService.getAllProductsByKho(khoId);
    }
    async getAllProducts() {
        return await this.chotkhoService.getAllProducts();
    }
    async getAllWarehouses() {
        return await this.chotkhoService.getAllKho();
    }
    async create(data) {
        return await this.chotkhoService.create(data);
    }
    async update(id, data) {
        return await this.chotkhoService.update(id, data);
    }
    async remove(id) {
        return await this.chotkhoService.remove(id);
    }
    async search(filters) {
        return await this.chotkhoService.search(filters || {});
    }
};
exports.ChotkhoResolver = ChotkhoResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoFindMany',
        description: 'Find many chotkho records with pagination'
    }),
    __param(0, (0, graphql_1.Args)('page', { type: () => Number, nullable: true, defaultValue: 1 })),
    __param(1, (0, graphql_1.Args)('limit', { type: () => Number, nullable: true, defaultValue: 10 })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoFindOne',
        description: 'Find one chotkho record by ID'
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String, description: 'Chotkho ID' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoGetProductsByWarehouse',
        description: '🎯 NEW: Get all products with inventory by warehouse for inventory check'
    }),
    __param(0, (0, graphql_1.Args)('khoId', { type: () => String, description: 'Warehouse ID' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "getProductsByWarehouse", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoGetAllProducts',
        description: '🎯 NEW: Get all products with inventory information (no warehouse filter)'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "getAllProducts", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoGetAllWarehouses',
        description: '🎯 NEW: Get all active warehouses for selection'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "getAllWarehouses", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoCreate',
        description: '🎯 Create inventory check with master-detail structure'
    }),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.CREATE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('data', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Inventory check data with master info and details array'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoUpdate',
        description: 'Update chotkho record by ID'
    }),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.UPDATE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String, description: 'Chotkho ID' })),
    __param(1, (0, graphql_1.Args)('data', { type: () => graphql_type_json_1.GraphQLJSON })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoDelete',
        description: 'Delete chotkho record by ID'
    }),
    (0, audit_decorator_1.Audit)({ entity: 'Chotkho', action: client_1.AuditAction.DELETE, includeResponse: true }),
    __param(0, (0, graphql_1.Args)('id', { type: () => String, description: 'Chotkho ID' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "remove", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'chotkhoSearch',
        description: 'Search chotkho records with filters'
    }),
    __param(0, (0, graphql_1.Args)('filters', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Search filters: khoId, sanphamId, fromDate, toDate, page, limit'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], ChotkhoResolver.prototype, "search", null);
exports.ChotkhoResolver = ChotkhoResolver = __decorate([
    (0, common_1.Injectable)(),
    (0, graphql_1.Resolver)('Chotkho'),
    __metadata("design:paramtypes", [chotkho_service_1.ChotkhoService])
], ChotkhoResolver);
//# sourceMappingURL=chotkho.resolver.js.map