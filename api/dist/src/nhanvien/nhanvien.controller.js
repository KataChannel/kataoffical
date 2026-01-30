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
exports.NhanvienController = void 0;
const common_1 = require("@nestjs/common");
const nhanvien_service_1 = require("./nhanvien.service");
const dto_1 = require("./dto");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
let NhanvienController = class NhanvienController {
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
            page: page ? parseInt(page) : undefined,
            limit: limit ? parseInt(limit) : undefined
        });
    }
    getStatistics() {
        return this.nhanvienService.getStatistics();
    }
    findByMaNV(maNV) {
        return this.nhanvienService.findByMaNV(maNV);
    }
    findOne(id) {
        return this.nhanvienService.findOne(id);
    }
    update(id, updateNhanvienDto) {
        return this.nhanvienService.update(id, updateNhanvienDto);
    }
    remove(id) {
        return this.nhanvienService.remove(id);
    }
    linkToUser(id, userId) {
        return this.nhanvienService.linkToUser(id, userId);
    }
    unlinkFromUser(id) {
        return this.nhanvienService.unlinkFromUser(id);
    }
};
exports.NhanvienController = NhanvienController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.HttpCode)(common_1.HttpStatus.CREATED),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [dto_1.CreateNhanvienDto]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('phongbanId')),
    __param(1, (0, common_1.Query)('trangThai')),
    __param(2, (0, common_1.Query)('chucVu')),
    __param(3, (0, common_1.Query)('search')),
    __param(4, (0, common_1.Query)('page')),
    __param(5, (0, common_1.Query)('limit')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String, String, String, String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('statistics'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "getStatistics", null);
__decorate([
    (0, common_1.Get)('ma/:maNV'),
    __param(0, (0, common_1.Param)('maNV')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "findByMaNV", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, dto_1.UpdateNhanvienDto]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)(':id/link-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "linkToUser", null);
__decorate([
    (0, common_1.Post)(':id/unlink-user'),
    (0, common_1.HttpCode)(common_1.HttpStatus.OK),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], NhanvienController.prototype, "unlinkFromUser", null);
exports.NhanvienController = NhanvienController = __decorate([
    (0, common_1.Controller)('nhanvien'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [nhanvien_service_1.NhanvienService])
], NhanvienController);
//# sourceMappingURL=nhanvien.controller.js.map