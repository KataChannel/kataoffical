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
exports.HoadonService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const socket_gateway_1 = require("../socket.gateway");
let HoadonService = class HoadonService {
    constructor(prisma, _SocketGateway) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
    }
    async getLastUpdatedHoadon() {
        try {
            const lastUpdated = await this.prisma.hoadon.aggregate({
                _max: { updatedAt: true },
            });
            return {
                updatedAt: lastUpdated._max.updatedAt
                    ? new Date(lastUpdated._max.updatedAt).getTime()
                    : 0,
            };
        }
        catch (error) {
            throw error;
        }
    }
    async create(data) {
        try {
            const { id, ...newData } = data;
            if (newData.khdon !== undefined && newData.khdon !== null && typeof newData.khdon !== 'string') {
                newData.khdon = newData.khdon.toString();
            }
            if (newData.tgtkcthue !== undefined && newData.tgtkcthue !== null && typeof newData.tgtkcthue !== 'string') {
                newData.tgtkcthue = newData.tgtkcthue.toString();
            }
            const created = await this.prisma.hoadon.create({
                data: {
                    ...newData,
                },
            });
            return created;
        }
        catch (error) {
            throw error;
        }
    }
    async findBy(param) {
        try {
            const { isOne, page = 1, limit = 20, ...where } = param;
            if (isOne) {
                const result = await this.prisma.hoadon.findFirst({
                    where,
                });
                return result;
            }
            const skip = (page - 1) * limit;
            const [data, total] = await Promise.all([
                this.prisma.hoadon.findMany({
                    where,
                    skip,
                    take: limit,
                }),
                this.prisma.hoadon.count({ where }),
            ]);
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findAll(page = 1, limit = 20, isChitiet = 'false') {
        try {
            const skip = (page - 1) * limit;
            let data, total;
            const includeChitiet = isChitiet.toLowerCase() === 'true';
            if (includeChitiet) {
                const listIdsResult = await this.prisma.hoadonChitiet.findMany({
                    distinct: ['idhoadon'],
                    select: { idhoadon: true },
                });
                const listIds = listIdsResult.map(item => item.idhoadon);
                [data, total] = await Promise.all([
                    this.prisma.hoadon.findMany({
                        where: { id: { notIn: listIds } },
                        skip,
                        take: limit,
                    }),
                    this.prisma.hoadon.count({
                        where: { id: { notIn: listIds } },
                    }),
                ]);
            }
            else {
                [data, total] = await Promise.all([
                    this.prisma.hoadon.findMany({
                        skip,
                        take: limit,
                    }),
                    this.prisma.hoadon.count(),
                ]);
            }
            return {
                data,
                total,
                page,
                pageCount: Math.ceil(total / limit),
            };
        }
        catch (error) {
            throw error;
        }
    }
    async findOne(id) {
        try {
            const item = await this.prisma.hoadon.findUnique({ where: { id } });
            if (!item)
                throw new common_1.NotFoundException('Hoadon not found');
            return item;
        }
        catch (error) {
            throw error;
        }
    }
    async update(id, data) {
        try {
            const updated = await this.prisma.hoadon.update({ where: { id }, data });
            this._SocketGateway.sendUpdate('donhang');
            return updated;
        }
        catch (error) {
            throw error;
        }
    }
    async remove(id) {
        try {
            const deleted = await this.prisma.hoadon.delete({ where: { id } });
            this._SocketGateway.sendUpdate('donhang');
            return deleted;
        }
        catch (error) {
            throw error;
        }
    }
};
exports.HoadonService = HoadonService;
exports.HoadonService = HoadonService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway])
], HoadonService);
//# sourceMappingURL=donhang.service.js.map