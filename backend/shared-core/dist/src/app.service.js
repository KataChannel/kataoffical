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
exports.AppService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../prisma/prisma.service");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
        this.allowedModels = [
            'sanpham',
            'banggia',
            'khachhang',
            'donhang',
            'nhacungcap',
            'dathang',
            'kho',
            'phieukho',
            'role',
            'permission',
            'nhomkhachhang',
        ];
    }
    getHello() {
        return 'Hello World!';
    }
    async search(searchDto) {
        const { model, filters = {}, relations = {}, orderBy, skip = 0, take, } = searchDto;
        if (!this.allowedModels.includes(model)) {
            throw new common_1.BadRequestException(`Model "${model}" không tồn tại`);
        }
        const where = this.buildWhereClause(filters);
        console.log(JSON.stringify(where));
        const prismaQuery = { where, skip: Number(skip) };
        if (take !== undefined && take !== -1) {
            prismaQuery.take = Number(take);
        }
        const include = this.buildIncludeClause(relations);
        if (include)
            prismaQuery.include = include;
        if (orderBy?.field && orderBy?.direction) {
            prismaQuery.orderBy = {
                [orderBy.field]: orderBy.direction.toLowerCase() === 'desc' ? 'desc' : 'asc',
            };
        }
        const result = await this.prisma[model].findMany(prismaQuery);
        console.log(result);
        return result;
    }
    buildWhereClause(filters) {
        const where = {};
        Object.keys(filters).forEach((key) => {
            if (key === 'OR' && Array.isArray(filters[key])) {
                where.OR = filters[key].map((condition) => this.buildWhereClause(condition));
            }
            else {
                const { value, type } = filters[key];
                console.log(value, type);
                if (value !== undefined && type) {
                    where[key] = { [type]: isNaN(value) ? value : value };
                }
            }
        });
        return where;
    }
    buildIncludeClause(relations) {
        const include = {};
        Object.keys(relations).forEach((relation) => {
            if (relations[relation].include) {
                include[relation] = { include: true };
                if (relations[relation].filters) {
                    include[relation].where = this.buildWhereClause(relations[relation].filters);
                }
            }
        });
        console.log(include);
        return include;
    }
    async getLastUpdated(table) {
        const validTables = [
            'menu',
            'affiliateLink',
            'trackingEvent',
            'landingPage',
            'task',
            'googlesheet',
            'driveItem',
            'lead',
            'sanpham',
            'banggia',
            'donhang',
            'khachhang',
            'nhacungcap',
            'dathang',
            'kho',
            'phieukho',
            'role',
            'permission',
            'nhomkhachhang',
        ];
        if (!validTables.includes(table)) {
            throw new common_1.BadRequestException(`Invalid table name: ${table}`);
        }
        const lastUpdated = await this.prisma[table].aggregate({
            _max: { updatedAt: true },
        });
        return {
            table,
            updatedAt: new Date(lastUpdated._max.updatedAt).getTime() || 0,
        };
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map