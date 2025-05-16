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
exports.MenuService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const socket_gateway_1 = require("../socket.gateway");
let MenuService = class MenuService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdated() {
        try {
            const lastUpdated = await this.prisma.menu.aggregate({
                _max: {
                    updatedAt: true,
                },
            });
            return { updatedAt: lastUpdated._max.updatedAt || 0 };
        }
        catch (error) {
            this._ErrorlogService.logError('getLastUpdated', error);
            throw error;
        }
    }
    async create(data) {
        return this.prisma.menu.create({ data });
    }
    async findAll() {
        return this.prisma.menu.findMany({
            include: { children: true },
            orderBy: { order: 'asc' },
        });
    }
    async findby(param) {
        try {
            const menu = await this.prisma.menu.findUnique({ where: param });
            if (!menu)
                throw new common_1.NotFoundException('menu not found');
            return menu;
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async findOne(id) {
        return this.prisma.menu.findUnique({ where: { id }, include: { children: true } });
    }
    async update(id, data) {
        try {
            await this.prisma.menu.update({ where: { id }, data });
            this._SocketGateway.sendUpdate('menu');
            return this.prisma.menu.update({ where: { id }, data });
        }
        catch (error) {
            this._ErrorlogService.logError('updateMenu', error);
            throw error;
        }
    }
    async remove(id) {
        try {
            this._SocketGateway.sendUpdate('menu');
            return this.prisma.menu.delete({ where: { id } });
        }
        catch (error) {
            this._ErrorlogService.logError('removeMenu', error);
            throw error;
        }
    }
    async getTree(data) {
        const permissions = Array.isArray(data.permissions) && data.permissions.length > 0
            ? data.permissions
            : ['welcome.view'];
        const where = { isActive: true };
        if (data?.serviceType) {
            where.serviceType = data.serviceType;
        }
        const menus = await this.prisma.menu.findMany({
            where,
            include: { children: true },
            orderBy: { order: 'asc' },
        });
        const filteredMenus = menus.filter(menu => {
            const slug = menu.slug;
            const permission = `${slug?.split('/').pop()}.view`;
            menu.isActive = permissions.includes(permission);
            return menu.isActive;
        });
        const parentIds = new Set(filteredMenus.map(menu => menu.parentId).filter(Boolean));
        const parentMenus = menus.filter(menu => parentIds.has(menu.id));
        const finalMenus = [...filteredMenus, ...parentMenus];
        const uniqueMenus = Array.from(new Map(finalMenus.map(menu => [menu.id, menu])).values());
        return this.buildTree(uniqueMenus);
    }
    buildTree(menus, parentId = null) {
        return menus
            .filter(menu => menu.parentId === parentId)
            .map(menu => ({ ...menu, children: this.buildTree(menus, menu.id) }));
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], MenuService);
//# sourceMappingURL=menu.service.js.map