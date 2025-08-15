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
const crypto_1 = require("crypto");
const callback_data_output_dto_1 = require("./callback/dto/callback-data-output.dto");
const callback_data_type_enum_1 = require("./callback/enums/callback-data-type.enum");
let AppService = class AppService {
    constructor(prisma) {
        this.prisma = prisma;
        this.allowedModels = ['sanpham', 'banggia', 'khachhang', 'donhang', 'nhacungcap', 'dathang', 'kho', 'phieukho', 'role', 'permission', 'nhomkhachhang'];
        this.appId = '2d4b6324-04aa-4dbc-a85c-815fb0099057';
    }
    getHello() {
        return 'Hello World!';
    }
    async search(searchDto) {
        const { model, filters = {}, relations = {}, orderBy, skip = 0, take } = searchDto;
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
        const validTables = ['sanpham', 'banggia', 'donhang', 'khachhang', 'nhacungcap', 'dathang', 'kho', 'phieukho', 'role', 'permission', 'nhomkhachhang'];
        if (!validTables.includes(table)) {
            throw new common_1.BadRequestException(`Invalid table name: ${table}`);
        }
        const lastUpdated = await this.prisma[table].aggregate({
            _max: { updatedAt: true },
        });
        return { table, updatedAt: new Date(lastUpdated._max.updatedAt).getTime() || 0 };
    }
    async getDatabaseInfo() {
        try {
            const databaseUrl = process.env.DATABASE_URL;
            if (!databaseUrl) {
                throw new common_1.BadRequestException('DATABASE_URL not found in environment variables');
            }
            const url = new URL(databaseUrl);
            const result = await this.prisma.$queryRaw `
        SELECT 
          current_database() as database_name,
          version() as database_version,
          current_user as current_user,
          inet_server_addr() as server_address,
          inet_server_port() as server_port
      `;
            const dbInfo = Array.isArray(result) ? result[0] : result;
            return {
                success: true,
                database: {
                    type: 'PostgreSQL',
                    name: dbInfo.database_name,
                    host: url.hostname,
                    port: url.port || '5432',
                    username: url.username,
                    version: dbInfo.database_version,
                    current_user: dbInfo.current_user,
                    server_address: dbInfo.server_address,
                    server_port: dbInfo.server_port,
                    ssl_mode: url.searchParams.get('sslmode') || 'prefer',
                    schema: url.searchParams.get('schema') || 'public',
                    connection_url: databaseUrl.replace(/:[^:@]*@/, ':****@')
                },
                timestamp: new Date().toISOString()
            };
        }
        catch (error) {
            console.error('Error getting database info:', error);
            return {
                success: false,
                error: error.message,
                timestamp: new Date().toISOString()
            };
        }
    }
    async processCallback(param) {
        const result = new callback_data_output_dto_1.CallbackDataOutput();
        try {
            const signature = this.generateSHA256HMAC(param.data || '', this.appId);
            console.log('signature', signature);
            console.log('param signature', param.signature);
            if (signature !== param.signature) {
                result.Success = false;
                result.ErrorCode = 'InvalidParam';
                result.ErrorMessage = 'Signature invalid';
                return result;
            }
            this.doCallBackData(param).catch((err) => console.error('Error processing callback:', err));
        }
        catch (ex) {
            result.Success = false;
            result.ErrorCode = 'Exception';
            result.ErrorMessage = ex.message;
        }
        return result;
    }
    async doCallBackData(param) {
        if (!param)
            return;
        this.saveCallBack(param);
        switch (param.data_type) {
            case callback_data_type_enum_1.CallBackDataType.SaveVoucher:
            case callback_data_type_enum_1.CallBackDataType.DeleteVoucher:
                const data = param.data
                    ? JSON.parse(param.data)
                    : [];
                if (data && data.length > 0) {
                    for (const item of data) {
                        console.log(`Processing org_refid: ${item.org_refid}`);
                    }
                }
                break;
            default:
                break;
        }
        this.deleteCallBack(param);
    }
    saveCallBack(param) {
        console.log('Saving callback:', param);
    }
    deleteCallBack(param) {
        console.log('Deleting callback:', param);
    }
    generateSHA256HMAC(input, key) {
        input = input || '';
        const hmac = (0, crypto_1.createHmac)('sha256', key);
        hmac.update(input);
        return hmac.digest('hex').toLowerCase();
    }
};
exports.AppService = AppService;
exports.AppService = AppService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AppService);
//# sourceMappingURL=app.service.js.map