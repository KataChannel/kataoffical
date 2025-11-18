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
exports.NhanvienResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const graphql_type_json_1 = require("graphql-type-json");
const nhanvien_service_1 = require("./nhanvien.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NhanvienResolver = class NhanvienResolver {
    constructor(nhanvienService) {
        this.nhanvienService = nhanvienService;
    }
    create(createNhanvienDto) {
        return this.nhanvienService.create(createNhanvienDto);
    }
    findAll(phongbanId, trangThai, chucVu, search, page, limit) {
        return this.nhanvienService.findAll({
            phongbanId,
            trangThai,
            chucVu,
            search,
            page,
            limit
        });
    }
    getStatistics() {
        return this.nhanvienService.getStatistics();
    }
    findOne(id) {
        return this.nhanvienService.findOne(id);
    }
    findByMaNV(maNV) {
        return this.nhanvienService.findByMaNV(maNV);
    }
    update(id, updateNhanvienDto) {
        return this.nhanvienService.update(id, updateNhanvienDto);
    }
    remove(id) {
        return this.nhanvienService.remove(id);
    }
    linkToUser(nhanvienId, userId) {
        return this.nhanvienService.linkToUser(nhanvienId, userId);
    }
    unlinkFromUser(nhanvienId) {
        return this.nhanvienService.unlinkFromUser(nhanvienId);
    }
};
exports.NhanvienResolver = NhanvienResolver;
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default, { name: 'createNhanvien' }),
    __param(0, (0, graphql_1.Args)('input', { type: () => graphql_type_json_1.default })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNhanvienDto]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "create", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.default, { name: 'nhanviens' }),
    __param(0, (0, graphql_1.Args)('phongbanId', { nullable: true })),
    __param(1, (0, graphql_1.Args)('trangThai', { nullable: true })),
    __param(2, (0, graphql_1.Args)('chucVu', { nullable: true })),
    __param(3, (0, graphql_1.Args)('search', { nullable: true })),
    __param(4, (0, graphql_1.Args)('page', { type: () => graphql_1.Int, nullable: true })),
    __param(5, (0, graphql_1.Args)('limit', { type: () => graphql_1.Int, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, Number, Number]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "findAll", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.default, { name: 'nhanvienStatistics' }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "getStatistics", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.default, { name: 'nhanvien' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "findOne", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.default, { name: 'nhanvienByMaNV' }),
    __param(0, (0, graphql_1.Args)('maNV')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "findByMaNV", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default, { name: 'updateNhanvien' }),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input', { type: () => graphql_type_json_1.default })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateNhanvienDto]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "update", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default, { name: 'deleteNhanvien' }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "remove", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default, { name: 'linkNhanvienToUser' }),
    __param(0, (0, graphql_1.Args)('nhanvienId')),
    __param(1, (0, graphql_1.Args)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "linkToUser", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.default, { name: 'unlinkNhanvienFromUser' }),
    __param(0, (0, graphql_1.Args)('nhanvienId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienResolver.prototype, "unlinkFromUser", null);
exports.NhanvienResolver = NhanvienResolver = __decorate([
    (0, graphql_1.Resolver)('Nhanvien'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [nhanvien_service_1.NhanvienService])
], NhanvienResolver);
//# sourceMappingURL=nhanvien.resolver.js.map