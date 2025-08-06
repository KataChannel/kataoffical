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
exports.UniversalResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const universal_service_1 = require("./universal.service");
const graphql_type_json_1 = require("graphql-type-json");
let UniversalResolver = class UniversalResolver {
    constructor(universalService) {
        this.universalService = universalService;
    }
    async findMany(modelName, where, orderBy, skip, take, include, select) {
        return await this.universalService.findMany(modelName, {
            where,
            orderBy,
            skip,
            take,
            include,
            select,
        });
    }
    async findUnique(modelName, where, include, select) {
        const args = { where };
        if (select) {
            args.select = select;
        }
        else if (include) {
            args.include = include;
        }
        return await this.universalService.findUnique(modelName, args);
    }
    async createRecord(modelName, data) {
        return await this.universalService.create(modelName, data);
    }
    async updateRecord(modelName, where, data) {
        return await this.universalService.update(modelName, where, data);
    }
    async deleteRecord(modelName, where) {
        return await this.universalService.delete(modelName, where);
    }
    async upsertRecord(modelName, where, create, update) {
        return await this.universalService.upsert(modelName, where, create, update);
    }
    async aggregateRecords(modelName, args) {
        return await this.universalService.aggregate(modelName, args);
    }
    async groupByRecords(modelName, args) {
        return await this.universalService.groupBy(modelName, args);
    }
    async getAvailableModels() {
        return this.universalService.getAvailableModels();
    }
    async getModelInfo(modelName) {
        return await this.universalService.getModelInfo(modelName);
    }
};
exports.UniversalResolver = UniversalResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Lấy danh sách records của bất kỳ model nào với pagination và filtering'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model (ví dụ: User, Sanpham, Donhang...)' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Điều kiện lọc (JSON format)'
    })),
    __param(2, (0, graphql_1.Args)('orderBy', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Sắp xếp (JSON format)'
    })),
    __param(3, (0, graphql_1.Args)('skip', {
        nullable: true,
        defaultValue: 0,
        description: 'Số records bỏ qua (pagination)'
    })),
    __param(4, (0, graphql_1.Args)('take', {
        nullable: true,
        defaultValue: 10,
        description: 'Số records lấy ra (pagination)'
    })),
    __param(5, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Include relations (JSON format)'
    })),
    __param(6, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Select specific fields (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Number, Number, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findMany", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Lấy một record cụ thể của bất kỳ model nào'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Điều kiện tìm kiếm (JSON format)'
    })),
    __param(2, (0, graphql_1.Args)('include', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Include relations (JSON format)'
    })),
    __param(3, (0, graphql_1.Args)('select', {
        type: () => graphql_type_json_1.GraphQLJSON,
        nullable: true,
        description: 'Select specific fields (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "findUnique", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Tạo record mới cho bất kỳ model nào'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('data', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Dữ liệu tạo record (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "createRecord", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Cập nhật record của bất kỳ model nào'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Điều kiện tìm record cần update (JSON format)'
    })),
    __param(2, (0, graphql_1.Args)('data', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Dữ liệu cập nhật (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "updateRecord", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Xóa record của bất kỳ model nào'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Điều kiện tìm record cần xóa (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "deleteRecord", null);
__decorate([
    (0, graphql_1.Mutation)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Upsert record (update nếu tồn tại, create nếu chưa tồn tại)'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('where', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Điều kiện tìm record (JSON format)'
    })),
    __param(2, (0, graphql_1.Args)('create', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Dữ liệu tạo mới nếu chưa tồn tại (JSON format)'
    })),
    __param(3, (0, graphql_1.Args)('update', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Dữ liệu cập nhật nếu đã tồn tại (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, Object, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "upsertRecord", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Aggregate dữ liệu (count, sum, avg, min, max...)'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('args', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Arguments cho aggregate (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "aggregateRecords", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Group by dữ liệu'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __param(1, (0, graphql_1.Args)('args', {
        type: () => graphql_type_json_1.GraphQLJSON,
        description: 'Arguments cho group by (JSON format)'
    })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "groupByRecords", null);
__decorate([
    (0, graphql_1.Query)(() => [String], {
        description: 'Lấy danh sách tất cả models có sẵn trong hệ thống'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getAvailableModels", null);
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        description: 'Lấy thông tin về model (operations có sẵn...)'
    }),
    __param(0, (0, graphql_1.Args)('modelName', { description: 'Tên model' })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], UniversalResolver.prototype, "getModelInfo", null);
exports.UniversalResolver = UniversalResolver = __decorate([
    (0, graphql_1.Resolver)(),
    __metadata("design:paramtypes", [universal_service_1.UniversalService])
], UniversalResolver);
//# sourceMappingURL=universal.resolver.js.map