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
exports.LichSuTonKhoController = void 0;
const common_1 = require("@nestjs/common");
const lichsu_tonkho_service_1 = require("./lichsu-tonkho.service");
const client_1 = require("@prisma/client");
let LichSuTonKhoController = class LichSuTonKhoController {
    constructor(lichSuTonKhoService) {
        this.lichSuTonKhoService = lichSuTonKhoService;
    }
    async createLichSuTonKho(createDto) {
        try {
            return await this.lichSuTonKhoService.createLichSuTonKho(createDto);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getLichSuTonKho(page = 1, limit = 10, sanphamId, loaiGiaoDich, tuNgay, denNgay, userId) {
        try {
            return await this.lichSuTonKhoService.getLichSuTonKho({
                page,
                limit,
                sanphamId,
                loaiGiaoDich,
                tuNgay: tuNgay ? new Date(tuNgay) : undefined,
                denNgay: denNgay ? new Date(denNgay) : undefined,
                userId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getThongKeGiaoDich(tuNgay, denNgay, sanphamId) {
        try {
            return await this.lichSuTonKhoService.getThongKeGiaoDich({
                tuNgay: tuNgay ? new Date(tuNgay) : undefined,
                denNgay: denNgay ? new Date(denNgay) : undefined,
                sanphamId
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async createChotKho(createDto) {
        try {
            return await this.lichSuTonKhoService.createChotKho({
                ...createDto,
                tuNgay: new Date(createDto.tuNgay),
                denNgay: new Date(createDto.denNgay)
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async thucHienChotKho(chotKhoId, body) {
        try {
            return await this.lichSuTonKhoService.thucHienChotKho(chotKhoId, body.userId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getDanhSachChotKho(page = 1, limit = 10, trangThai, tuNgay, denNgay) {
        try {
            return await this.lichSuTonKhoService.getDanhSachChotKho({
                page,
                limit,
                trangThai,
                tuNgay: tuNgay ? new Date(tuNgay) : undefined,
                denNgay: denNgay ? new Date(denNgay) : undefined,
            });
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async getChiTietChotKho(chotKhoId) {
        try {
            return await this.lichSuTonKhoService.getChiTietChotKho(chotKhoId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
    async xoaChotKho(chotKhoId) {
        try {
            return await this.lichSuTonKhoService.xoaChotKho(chotKhoId);
        }
        catch (error) {
            throw new common_1.BadRequestException(error.message);
        }
    }
};
exports.LichSuTonKhoController = LichSuTonKhoController;
__decorate([
    (0, common_1.Post)('create'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "createLichSuTonKho", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('sanphamId')),
    __param(3, (0, common_1.Query)('loaiGiaoDich')),
    __param(4, (0, common_1.Query)('tuNgay')),
    __param(5, (0, common_1.Query)('denNgay')),
    __param(6, (0, common_1.Query)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String, String, String]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "getLichSuTonKho", null);
__decorate([
    (0, common_1.Get)('thong-ke'),
    __param(0, (0, common_1.Query)('tuNgay')),
    __param(1, (0, common_1.Query)('denNgay')),
    __param(2, (0, common_1.Query)('sanphamId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String, String]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "getThongKeGiaoDich", null);
__decorate([
    (0, common_1.Post)('chot-kho'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "createChotKho", null);
__decorate([
    (0, common_1.Put)('chot-kho/:id/thuc-hien'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "thucHienChotKho", null);
__decorate([
    (0, common_1.Get)('chot-kho'),
    __param(0, (0, common_1.Query)('page', common_1.ParseIntPipe)),
    __param(1, (0, common_1.Query)('limit', common_1.ParseIntPipe)),
    __param(2, (0, common_1.Query)('trangThai')),
    __param(3, (0, common_1.Query)('tuNgay')),
    __param(4, (0, common_1.Query)('denNgay')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Number, String, String, String]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "getDanhSachChotKho", null);
__decorate([
    (0, common_1.Get)('chot-kho/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "getChiTietChotKho", null);
__decorate([
    (0, common_1.Delete)('chot-kho/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], LichSuTonKhoController.prototype, "xoaChotKho", null);
exports.LichSuTonKhoController = LichSuTonKhoController = __decorate([
    (0, common_1.Controller)('lichsu-tonkho'),
    __metadata("design:paramtypes", [lichsu_tonkho_service_1.LichSuTonKhoService])
], LichSuTonKhoController);
//# sourceMappingURL=lichsu-tonkho.controller.js.map