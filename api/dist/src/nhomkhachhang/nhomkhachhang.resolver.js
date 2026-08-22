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
exports.NhomkhachhangResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const nhomkhachhang_service_1 = require("./nhomkhachhang.service");
const nhomkhachhang_entity_1 = require("./entities/nhomkhachhang.entity");
const create_nhomkhachhang_dto_1 = require("./dto/create-nhomkhachhang.dto");
const update_nhomkhachhang_dto_1 = require("./dto/update-nhomkhachhang.dto");
const manage_khachhang_nhom_dto_1 = require("./dto/manage-khachhang-nhom.dto");
const filter_nhomkhachhang_dto_1 = require("./dto/filter-nhomkhachhang.dto");
const nhomkhachhang_response_type_1 = require("./types/nhomkhachhang-response.type");
const common_1 = require("@nestjs/common");
let NhomkhachhangResolver = class NhomkhachhangResolver {
    constructor(nhomkhachhangService) {
        this.nhomkhachhangService = nhomkhachhangService;
    }
    async getNhomkhachhang(filter, pagination, sort) {
        return this.nhomkhachhangService.findAllNhomkhachhang(filter, pagination, sort);
    }
    async getNhomkhachhangById(id) {
        return this.nhomkhachhangService.findOneNhomkhachhang(id);
    }
    async createNhomkhachhang(input) {
        try {
            const data = await this.nhomkhachhangService.createNhomkhachhang(input);
            return {
                success: true,
                message: 'Tạo nhóm khách hàng thành công',
                data
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async updateNhomkhachhang(id, input) {
        try {
            const data = await this.nhomkhachhangService.updateNhomkhachhang(id, input);
            return {
                success: true,
                message: 'Cập nhật nhóm khách hàng thành công',
                data
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async deleteNhomkhachhang(id) {
        try {
            await this.nhomkhachhangService.removeNhomkhachhang(id);
            return {
                success: true,
                message: 'Xóa nhóm khách hàng thành công'
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async addKhachhangToNhom(input) {
        try {
            const data = await this.nhomkhachhangService.addKhachhangToNhom(input.nhomId, input.khachhangIds);
            return {
                success: true,
                message: `Đã thêm ${input.khachhangIds.length} khách hàng vào nhóm`,
                data
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async removeKhachhangFromNhom(input) {
        try {
            const data = await this.nhomkhachhangService.removeKhachhangFromNhom(input.nhomId, input.khachhangIds);
            return {
                success: true,
                message: `Đã xóa ${input.khachhangIds.length} khách hàng khỏi nhóm`,
                data
            };
        }
        catch (error) {
            return {
                success: false,
                message: error.message
            };
        }
    }
    async getAllNhomkhachhangSimple() {
        const result = await this.nhomkhachhangService.findAllNhomkhachhang(undefined, { page: 1, limit: 1000 }, { field: 'name', direction: 'asc' });
        return result.data;
    }
};
exports.NhomkhachhangResolver = NhomkhachhangResolver;
__decorate([
    (0, graphql_1.Query)(() => nhomkhachhang_response_type_1.NhomkhachhangConnection, {
        name: 'getNhomkhachhang',
        description: 'Lấy danh sách nhóm khách hàng với phân trang và lọc'
    }),
    __param(0, (0, graphql_1.Args)('filter', { type: () => filter_nhomkhachhang_dto_1.NhomkhachhangFilterInput, nullable: true })),
    __param(1, (0, graphql_1.Args)('pagination', { type: () => filter_nhomkhachhang_dto_1.NhomkhachhangPaginationInput, nullable: true })),
    __param(2, (0, graphql_1.Args)('sort', { type: () => filter_nhomkhachhang_dto_1.NhomkhachhangSortInput, nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [filter_nhomkhachhang_dto_1.NhomkhachhangFilterInput,
        filter_nhomkhachhang_dto_1.NhomkhachhangPaginationInput,
        filter_nhomkhachhang_dto_1.NhomkhachhangSortInput]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "getNhomkhachhang", null);
__decorate([
    (0, graphql_1.Query)(() => nhomkhachhang_entity_1.Nhomkhachhang, {
        name: 'getNhomkhachhangById',
        description: 'Lấy nhóm khách hàng theo ID'
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "getNhomkhachhangById", null);
__decorate([
    (0, graphql_1.Mutation)(() => nhomkhachhang_response_type_1.NhomkhachhangMutationResponse, {
        name: 'createNhomkhachhang',
        description: 'Tạo nhóm khách hàng mới'
    }),
    __param(0, (0, graphql_1.Args)('input', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_nhomkhachhang_dto_1.CreateNhomkhachhangInput]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "createNhomkhachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => nhomkhachhang_response_type_1.NhomkhachhangMutationResponse, {
        name: 'updateNhomkhachhang',
        description: 'Cập nhật nhóm khách hàng'
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __param(1, (0, graphql_1.Args)('input', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_nhomkhachhang_dto_1.UpdateNhomkhachhangInput]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "updateNhomkhachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => nhomkhachhang_response_type_1.NhomkhachhangMutationResponse, {
        name: 'deleteNhomkhachhang',
        description: 'Xóa nhóm khách hàng'
    }),
    __param(0, (0, graphql_1.Args)('id', { type: () => graphql_1.ID })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "deleteNhomkhachhang", null);
__decorate([
    (0, graphql_1.Mutation)(() => nhomkhachhang_response_type_1.NhomkhachhangMutationResponse, {
        name: 'addKhachhangToNhom',
        description: 'Thêm khách hàng vào nhóm'
    }),
    __param(0, (0, graphql_1.Args)('input', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_khachhang_nhom_dto_1.ManageKhachhangInNhomInput]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "addKhachhangToNhom", null);
__decorate([
    (0, graphql_1.Mutation)(() => nhomkhachhang_response_type_1.NhomkhachhangMutationResponse, {
        name: 'removeKhachhangFromNhom',
        description: 'Xóa khách hàng khỏi nhóm'
    }),
    __param(0, (0, graphql_1.Args)('input', new common_1.ValidationPipe({ transform: true }))),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [manage_khachhang_nhom_dto_1.ManageKhachhangInNhomInput]),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "removeKhachhangFromNhom", null);
__decorate([
    (0, graphql_1.Query)(() => [nhomkhachhang_entity_1.Nhomkhachhang], {
        name: 'getAllNhomkhachhangSimple',
        description: 'Lấy tất cả nhóm khách hàng đơn giản (cho dropdown)'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], NhomkhachhangResolver.prototype, "getAllNhomkhachhangSimple", null);
exports.NhomkhachhangResolver = NhomkhachhangResolver = __decorate([
    (0, graphql_1.Resolver)(() => nhomkhachhang_entity_1.Nhomkhachhang),
    __metadata("design:paramtypes", [nhomkhachhang_service_1.NhomkhachhangService])
], NhomkhachhangResolver);
//# sourceMappingURL=nhomkhachhang.resolver.js.map