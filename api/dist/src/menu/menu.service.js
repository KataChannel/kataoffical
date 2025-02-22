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
let MenuService = class MenuService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(data) {
        let newOrder;
        if (data.parentId) {
            const maxOrder = await this.prisma.menu.aggregate({
                _max: {
                    order: true,
                },
                where: {
                    parentId: data.parentId,
                },
            });
            newOrder = (maxOrder._max.order || 0) + 1;
        }
        else {
            const maxOrder = await this.prisma.menu.aggregate({
                _max: {
                    order: true,
                },
                where: {
                    parentId: null,
                },
            });
            newOrder = (maxOrder._max.order || 0) + 1;
        }
        return this.prisma.menu.create({
            data: {
                ...data,
                order: newOrder,
            },
        });
    }
    async reorderMenus(menuIds) {
        for (let i = 0; i < menuIds.length; i++) {
            await this.prisma.menu.update({
                where: { id: menuIds[i] },
                data: { order: i + 1 },
            });
        }
    }
    async findAll() {
        return this.prisma.menu.findMany();
    }
    async findOne(id) {
        const menu = await this.prisma.menu.findUnique({ where: { id } });
        if (!menu)
            throw new common_1.NotFoundException('Menu not found');
        return menu;
    }
    async update(id, data) {
        return this.prisma.menu.update({ where: { id }, data });
    }
    async remove(id) {
        return this.prisma.menu.delete({ where: { id } });
    }
};
exports.MenuService = MenuService;
exports.MenuService = MenuService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], MenuService);
//# sourceMappingURL=menu.service.js.map