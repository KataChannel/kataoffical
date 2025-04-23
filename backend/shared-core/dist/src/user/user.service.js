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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const errorlog_service_1 = require("../errorlog/errorlog.service");
const bcrypt = require("bcryptjs");
const socket_gateway_1 = require("../socket.gateway");
let UserService = class UserService {
    constructor(prisma, _SocketGateway, _ErrorlogService) {
        this.prisma = prisma;
        this._SocketGateway = _SocketGateway;
        this._ErrorlogService = _ErrorlogService;
    }
    async getLastUpdated() {
        try {
            const lastUpdated = await this.prisma.user.aggregate({
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
    async createUser(dto) {
        const hashedPassword = await bcrypt.hash(dto.password, 10);
        return this.prisma.user.create({
            data: {
                email: dto.email,
                password: hashedPassword,
            },
        });
    }
    async getUsers() {
        const users = await this.prisma.user.findMany({
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: { include: { permission: true } },
                            },
                        },
                    },
                },
            },
        });
        return users.map(({ password, roles, ...userWithoutPassword }) => ({
            ...userWithoutPassword,
            name: userWithoutPassword?.name,
            roles: roles.map(({ role }) => {
                const { permissions, ...roleWithoutPermissions } = role;
                return roleWithoutPermissions;
            }),
            permissions: Array.from(new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))),
        }));
    }
    async findAll() {
        const users = await this.prisma.user.findMany({
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: { include: { permission: true } },
                            },
                        },
                    },
                },
            },
        });
        return users.map(({ password, roles, ...userWithoutPassword }) => ({
            ...userWithoutPassword,
            roles: roles.map(({ role }) => {
                const { permissions, ...roleWithoutPermissions } = role;
                return roleWithoutPermissions;
            }),
            permissions: Array.from(new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission)))),
        }));
    }
    async findby(param) {
        try {
            const user = await this.prisma.user.findUnique({
                where: param,
                include: {
                    roles: {
                        include: {
                            role: {
                                include: {
                                    permissions: { include: { permission: true } },
                                },
                            },
                        },
                    },
                },
            });
            if (!user)
                throw new common_1.NotFoundException('User not found');
            const { password, roles, ...userWithoutPassword } = user;
            const formattedRoles = roles.map(({ role }) => {
                const { permissions, ...roleWithoutPermissions } = role;
                return roleWithoutPermissions;
            });
            const permissions = Array.from(new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission))));
            return {
                ...userWithoutPassword,
                roles: formattedRoles,
                permissions,
            };
        }
        catch (error) {
            this._ErrorlogService.logError('findby', error);
            throw error;
        }
    }
    async leaderboard() {
        const users = await this.prisma.user.findMany({
            include: {
                referrals: true,
            },
            orderBy: {
                referrals: {
                    _count: 'desc',
                },
            },
            take: 10,
        });
        return users
            .filter(user => user.referrals.length > 0)
            .map(({ password, ...user }) => {
            const maskedPhone = user?.phone ?
                `${user.phone.slice(0, 3)}${'*'.repeat(Math.max(0, user.phone.length - 6))}${user.phone.slice(-3)}` :
                null;
            const maskedSDT = user?.SDT ?
                `${user.SDT.slice(0, 3)}${'*'.repeat(Math.max(0, user.SDT.length - 6))}${user.SDT.slice(-3)}` :
                null;
            const maskedEmail = user?.email ?
                `${user.email.slice(0, 3)}${'*'.repeat(Math.max(0, user.email.indexOf('@') - 3))}${user.email.slice(user.email.indexOf('@') - 3)}` :
                null;
            return {
                ...user,
                name: user.name,
                phone: maskedPhone,
                SDT: maskedSDT,
                email: maskedEmail,
                referralsCount: user.referrals.length,
            };
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            include: {
                roles: {
                    include: {
                        role: {
                            include: {
                                permissions: { include: { permission: true } },
                            },
                        },
                    },
                },
                referrals: true,
                referrer: true,
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const { password, roles, ...userWithoutPassword } = user;
        const formattedRoles = roles.map(({ role }) => {
            const { permissions, ...roleWithoutPermissions } = role;
            return roleWithoutPermissions;
        });
        const permissions = Array.from(new Set(roles.flatMap(({ role }) => role.permissions.map(({ permission }) => permission))));
        return {
            ...userWithoutPassword,
            roles: formattedRoles,
            permissions,
        };
    }
    async update(id, data) {
        try {
            const { roles, permissions, ...updateData } = data;
            if (updateData.password) {
                updateData.password = await bcrypt.hash(updateData.password, 10);
            }
            const updatedUser = await this.prisma.user.update({
                where: { id },
                data: updateData
            });
            this._SocketGateway.senduserUpdate();
            const { password, ...userWithoutPassword } = updatedUser;
            return userWithoutPassword;
        }
        catch (error) {
            this._ErrorlogService.logError('update', error);
            if (error.code === 'P2025') {
                throw new common_1.NotFoundException(`User with ID ${id} not found`);
            }
            throw error;
        }
    }
    async remove(id) {
        return this.prisma.user.delete({ where: { id } });
    }
    async assignRoleToUser(data) {
        const { userId, roleId } = data;
        const role = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!role) {
            throw new common_1.NotFoundException(`Role with ID ${userId} not found`);
        }
        const permission = await this.prisma.role.findUnique({
            where: { id: roleId },
        });
        if (!permission) {
            throw new common_1.NotFoundException(`Permission with ID ${roleId} not found`);
        }
        return this.prisma.userRole.create({
            data: {
                userId,
                roleId,
            },
        });
    }
    async removeRoleFromUser(data) {
        const { userId, roleId } = data;
        const rolePermission = await this.prisma.userRole.findFirst({
            where: {
                userId,
                roleId,
            },
        });
        if (!rolePermission) {
            throw new common_1.NotFoundException(`Permission with ID ${roleId} is not assigned to Role with ID ${userId}`);
        }
        return this.prisma.userRole.delete({
            where: {
                id: rolePermission.id,
            },
        });
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        socket_gateway_1.SocketGateway,
        errorlog_service_1.ErrorlogService])
], UserService);
//# sourceMappingURL=user.service.js.map