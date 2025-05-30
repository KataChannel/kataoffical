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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const bcrypt = require("bcryptjs");
const jwt_1 = require("@nestjs/jwt");
const prisma_service_1 = require("../../prisma/prisma.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
    }
    async generateCodeId() {
        try {
            const latest = await this.prisma.user.findFirst({
                orderBy: { codeId: 'desc' },
            });
            let nextNumber = 1;
            if (latest && latest.codeId) {
                const match = latest.codeId.match(/CTV(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            return `CTV${nextNumber.toString().padStart(5, '0')}`;
        }
        catch (error) {
            throw error;
        }
    }
    async register(data, affiliateCode) {
        try {
            const { email, phone, password, facebookId, googleId, zaloId } = data;
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        { email: email || undefined },
                        { phone: phone || undefined },
                        { SDT: phone || undefined },
                        { zaloId: zaloId || undefined },
                        { facebookId: facebookId || undefined },
                        { googleId: googleId || undefined },
                    ],
                },
            });
            if (existingUser) {
                throw new common_1.UnauthorizedException('User already exists');
            }
            let referrerId;
            if (affiliateCode) {
                const referrer = await this.prisma.user.findUnique({
                    where: { inviteCode: affiliateCode },
                    select: { id: true },
                });
                referrerId = referrer?.id;
            }
            const hashedPassword = await bcrypt.hash(password, 10);
            const inviteCode = phone || Math.random().toString(36).slice(-8);
            const codeId = await this.generateCodeId();
            const user = await this.prisma.user.create({
                data: {
                    codeId,
                    email: email || null,
                    phone: phone || null,
                    password: hashedPassword,
                    inviteCode,
                    affiliateCode: affiliateCode || null,
                    referrerId,
                    facebookId: facebookId || null,
                    googleId: googleId || null,
                },
            });
            return user;
        }
        catch (error) {
            console.error('Register error:', error);
            if (error instanceof common_1.UnauthorizedException) {
                throw error;
            }
            throw new common_1.UnauthorizedException('Registration failed');
        }
    }
    async login(phone, email, password) {
        const user = await this.prisma.user.findFirst({
            where: { OR: [{ email }, { phone }, { SDT: phone }] },
            include: {
                roles: {
                    include: {
                        role: {
                            include: { permissions: { include: { permission: true } } },
                        },
                    },
                },
            },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const resultUser = {
            ...user,
            roles: user.roles.map((role) => {
                const { permissions, ...rest } = role.role;
                return rest;
            }),
            permissions: Array.from(new Set(user.roles.flatMap((role) => role.role.permissions.map((p) => p.permission)))),
        };
        const payload = {
            id: user.id,
            role: user.role,
            permissions: user.permissions,
        };
        const result = {
            access_token: this.jwtService.sign(payload),
            user: resultUser,
        };
        return result;
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({
            where: { id: userId },
        });
        if (!user ||
            !user.password ||
            !(await bcrypt.compare(oldPassword, user.password))) {
            throw new common_1.UnauthorizedException('Mật Khẩu Cũ Không Đúng');
        }
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        return this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
    }
    async generateRandomPassword(userId) {
        const newPassword = Math.random().toString(36).slice(-8);
        const hashedPassword = await bcrypt.hash(newPassword, 10);
        await this.prisma.user.update({
            where: { id: userId },
            data: { password: hashedPassword },
        });
        return { newPassword };
    }
    async validateOAuthLogin(provider, providerId, email) {
        let user = await this.prisma.user.findFirst({ where: { providerId } });
        if (!user) {
            const newPassword = Math.random().toString(36).slice(-8);
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            user = await this.prisma.user.create({
                data: {
                    provider,
                    providerId,
                    email: email || '',
                    password: hashedPassword,
                },
            });
        }
        const token = this.jwtService.sign({
            id: user.id,
            provider: user.provider,
        });
        return { token, user };
    }
    async getUserRoles(userId) {
        return this.prisma.userRole.findMany({
            where: { userId },
            include: {
                role: { include: { permissions: { include: { permission: true } } } },
            },
        });
    }
    async hasPermission(userId, permissionName) {
        const roles = await this.getUserRoles(userId);
        return roles.some((userRole) => userRole.role.permissions.some((rp) => rp.permission.name === permissionName));
    }
    async checkPermission(userId, permissionName) {
        const hasPerm = await this.hasPermission(userId, permissionName);
        if (!hasPerm) {
            throw new common_1.UnauthorizedException('Bạn không có quyền thực hiện thao tác này');
        }
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map