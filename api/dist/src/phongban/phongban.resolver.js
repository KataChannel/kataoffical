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
exports.PhongbanResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const phongban_service_1 = require("./phongban.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let PhongbanResolver = class PhongbanResolver {
    constructor(phongbanService) {
        this.phongbanService = phongbanService;
    }
    create(createPhongbanDto) {
        return this.phongbanService.create(createPhongbanDto);
    }
    findAll(level, loai, parentId, includeChildren) {
        return this.phongbanService.findAll({
            level,
            loai,
            parentId,
            includeChildren
        });
    }
    getTree() {
        return this.phongbanService.getTree();
    }
    getStatistics() {
        return this.phongbanService.getStatistics();
    }
    findOne(id) {
        return this.phongbanService.findOne(id);
    }
    findByMa(ma) {
        return this.phongbanService.findByMa(ma);
    }
    update(id, updatePhongbanDto) {
        return this.phongbanService.update(id, updatePhongbanDto);
    }
    remove(id) {
        return this.phongbanService.remove(id);
    }
};
exports.PhongbanResolver = PhongbanResolver;
__decorate([
    (0, graphql_1.Mutation)('createPhongban'),
    __param(0, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreatePhongbanDto]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)('phongbans'),
    __param(0, (0, graphql_1.Args)('level', { type: () => graphql_1.Int, nullable: true })),
    __param(1, (0, graphql_1.Args)('loai', { nullable: true })),
    __param(2, (0, graphql_1.Args)('parentId', { nullable: true })),
    __param(3, (0, graphql_1.Args)('includeChildren', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, String, String, Boolean]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)('phongbanTree'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "getTree", null);
__decorate([
    (0, graphql_1.Query)('phongbanStatistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "getStatistics", null);
__decorate([
    (0, graphql_1.Query)('phongban'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)('phongbanByMa'),
    __param(0, (0, graphql_1.Args)('ma')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "findByMa", null);
__decorate([
    (0, graphql_1.Mutation)('updatePhongban'),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdatePhongbanDto]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)('deletePhongban'),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PhongbanResolver.prototype, "remove", null);
exports.PhongbanResolver = PhongbanResolver = __decorate([
    (0, graphql_1.Resolver)('Phongban'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [phongban_service_1.PhongbanService])
], PhongbanResolver);
//# sourceMappingURL=phongban.resolver.js.map