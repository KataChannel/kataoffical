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
exports.ErrorlogsService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ErrorlogsService = class ErrorlogsService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async logError(message, details, source = 'server') {
        const logEntry = {
            timestamp: new Date(),
            message,
            details,
            source,
        };
        try {
            await this.prisma.errorLog.create({
                data: logEntry,
            });
        }
        catch (error) {
            console.error('Failed to save log to database:', error);
        }
    }
    async create(data) {
        return this.prisma.errorLog.create({
            data: {
                ...data,
            },
        });
    }
    async findAll() {
        return this.prisma.errorLog.findMany();
    }
    async findOne(id) {
        const errorlogs = await this.prisma.errorLog.findUnique({ where: { id } });
        if (!errorlogs)
            throw new common_1.NotFoundException('Errorlogs not found');
        return errorlogs;
    }
    async update(id, data) {
        return this.prisma.errorLog.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.errorLog.delete({ where: { id } });
    }
};
exports.ErrorlogsService = ErrorlogsService;
exports.ErrorlogsService = ErrorlogsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ErrorlogsService);
//# sourceMappingURL=errorlogs.service.js.map