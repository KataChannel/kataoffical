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
    async register(email, password) {
        const hashedPassword = await bcrypt.hash(password, 10);
        return this.prisma.user.create({
            data: { email, password: hashedPassword },
        });
    }
    async login(SDT, email, password) {
        const user = await this.prisma.user.findFirst({
            where: { OR: [{ email }, { SDT }] },
            include: {
                roles: { include: { role: { include: { permissions: { include: { permission: true } } } } } },
                userPermissions: {
                    include: {
                        permission: true
                    },
                    where: {
                        OR: [
                            { expiresAt: null },
                            { expiresAt: { gt: new Date() } },
                        ],
                    }
                }
            },
        });
        if (!user || !(await bcrypt.compare(password, user.password))) {
            throw new common_1.UnauthorizedException('Invalid credentials');
        }
        const rolePermissions = Array.from(new Set(user.roles.flatMap((role) => role.role.permissions.map((p) => p.permission))));
        const validUserPermissions = user.userPermissions
            .filter((up) => up.isGranted)
            .map((up) => up.permission);
        const deniedUserPermissions = user.userPermissions
            .filter((up) => !up.isGranted)
            .map((up) => up.permission.id);
        const allPermissions = [
            ...rolePermissions.filter((p) => !deniedUserPermissions.includes(p.id)),
            ...validUserPermissions
        ];
        const uniquePermissions = Array.from(new Map(allPermissions.map(p => [p.id, p])).values());
        const resultUser = {
            ...user,
            roles: user.roles.map((role) => {
                const { permissions, ...rest } = role.role;
                return rest.name;
            }),
            permissions: uniquePermissions,
        };
        delete resultUser.password;
        delete resultUser.userPermissions;
        const payload = {
            id: user.id,
            email: user.email,
            roles: resultUser.roles,
            permissions: uniquePermissions.map(p => p.name)
        };
        const result = {
            access_token: this.jwtService.sign(payload),
            user: resultUser,
        };
        return result;
    }
    async changePassword(userId, oldPassword, newPassword) {
        const user = await this.prisma.user.findUnique({ where: { id: userId } });
        if (!user || !(await bcrypt.compare(oldPassword, user.password))) {
            throw new common_1.UnauthorizedException('Old password is incorrect');
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
    async validateOAuthLogin(provider, providerId, email, SDT) {
        let user = await this.prisma.user.findUnique({ where: { providerId } });
        if (!user) {
            const existingUser = await this.prisma.user.findFirst({
                where: {
                    OR: [
                        ...(email ? [{ email }] : []),
                        ...(SDT ? [{ SDT }] : [])
                    ]
                }
            });
            if (existingUser) {
                user = await this.prisma.user.update({
                    where: { id: existingUser.id },
                    data: {
                        provider,
                        providerId,
                        ...(email && { email }),
                        ...(SDT && { SDT })
                    }
                });
            }
            else {
                const newPassword = Math.random().toString(36).slice(-8);
                const hashedPassword = await bcrypt.hash(newPassword, 10);
                user = await this.prisma.user.create({
                    data: {
                        provider,
                        providerId,
                        email: email || '',
                        password: hashedPassword,
                        ...(SDT && { SDT })
                    },
                });
            }
        }
        const token = this.jwtService.sign({ id: user.id, provider: user.provider });
        return { token, user };
    }
    async getUserRoles(userId) {
        return this.prisma.userRole.findMany({
            where: { userId },
            include: { role: { include: { permissions: { include: { permission: true } } } } },
        });
    }
    async hasPermission(userId, permissionName) {
        const userPermission = await this.prisma.userPermission.findFirst({
            where: {
                userId,
                permission: { name: permissionName },
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            include: { permission: true },
        });
        if (userPermission && !userPermission.isGranted) {
            return false;
        }
        if (userPermission && userPermission.isGranted) {
            return true;
        }
        const roles = await this.getUserRoles(userId);
        return roles.some((userRole) => userRole.role.permissions.some((rp) => rp.permission.name === permissionName));
    }
    async checkPermission(userId, permissionName) {
        const hasPerm = await this.hasPermission(userId, permissionName);
        if (!hasPerm) {
            throw new common_1.UnauthorizedException('Bạn không có quyền thực hiện thao tác này');
        }
    }
    async getUserPermissionsDetailed(userId) {
        const roles = await this.getUserRoles(userId);
        const rolePermissions = roles.flatMap((userRole) => userRole.role.permissions.map((rp) => ({
            ...rp.permission,
            source: 'role',
            roleName: userRole.role.name,
            isGranted: true,
            isActive: true,
        })));
        const userPermissions = await this.prisma.userPermission.findMany({
            where: { userId },
            include: {
                permission: true,
                user: { select: { name: true, email: true } },
            },
        });
        const userSpecificPermissions = userPermissions.map((up) => ({
            ...up.permission,
            source: 'user-specific',
            isGranted: up.isGranted,
            isActive: !up.expiresAt || up.expiresAt > new Date(),
            grantedBy: up.grantedBy,
            grantedAt: up.grantedAt,
            expiresAt: up.expiresAt,
            reason: up.reason,
        }));
        const allPermissions = new Map();
        rolePermissions.forEach((perm) => {
            allPermissions.set(perm.id, perm);
        });
        userSpecificPermissions.forEach((perm) => {
            if (allPermissions.has(perm.id)) {
                const existing = allPermissions.get(perm.id);
                allPermissions.set(perm.id, {
                    ...existing,
                    ...perm,
                    sources: [existing.source, perm.source],
                });
            }
            else {
                allPermissions.set(perm.id, perm);
            }
        });
        return Array.from(allPermissions.values());
    }
    async checkPermissionDetailed(userId, permissionName) {
        const userPermission = await this.prisma.userPermission.findFirst({
            where: {
                userId,
                permission: { name: permissionName },
                OR: [
                    { expiresAt: null },
                    { expiresAt: { gt: new Date() } },
                ],
            },
            include: { permission: true },
        });
        if (userPermission) {
            return {
                hasPermission: userPermission.isGranted,
                source: 'user-specific',
                reason: userPermission.reason,
                grantedBy: userPermission.grantedBy,
                expiresAt: userPermission.expiresAt,
            };
        }
        const roles = await this.getUserRoles(userId);
        const hasRolePermission = roles.some((userRole) => userRole.role.permissions.some((rp) => rp.permission.name === permissionName));
        if (hasRolePermission) {
            const roleWithPermission = roles.find((userRole) => userRole.role.permissions.some((rp) => rp.permission.name === permissionName));
            return {
                hasPermission: true,
                source: 'role',
                roleName: roleWithPermission?.role.name,
                reason: 'Inherited from role',
            };
        }
        return {
            hasPermission: false,
            source: 'none',
            reason: 'Permission not found in roles or user-specific permissions',
        };
    }
    async zaloMiniappLogin(accessToken, phoneToken, userInfo, mockPhone) {
        let phone = mockPhone || '';
        if (phoneToken && accessToken && process.env.ZALO_APP_SECRET && process.env.ZALO_APP_SECRET !== 'your-zalo-app-secret') {
            try {
                const response = await fetch('https://graph.zalo.me/v2.0/me/info', {
                    headers: {
                        access_token: accessToken,
                        code: phoneToken,
                        secret_key: process.env.ZALO_APP_SECRET
                    }
                });
                const resData = await response.json();
                if (resData && resData.data && resData.data.number) {
                    phone = resData.data.number;
                    if (phone.startsWith('84')) {
                        phone = '0' + phone.slice(2);
                    }
                }
            }
            catch (error) {
                console.error('Error decrypting Zalo phone number:', error);
            }
        }
        if (!phone && userInfo && userInfo.phone) {
            phone = userInfo.phone;
        }
        if (!phone && userInfo && userInfo.id) {
            phone = '09' + userInfo.id.slice(0, 8).replace(/[^0-9]/g, '9').padEnd(8, '0').slice(0, 8);
        }
        if (!phone) {
            phone = '0988888888';
        }
        const zaloId = userInfo?.id || 'zalo-mock-id';
        const zaloName = userInfo?.name || 'Zalo User';
        const loginResult = await this.validateOAuthLogin('zalo', zaloId, undefined, phone);
        if (loginResult.user && !loginResult.user.name) {
            await this.prisma.user.update({
                where: { id: loginResult.user.id },
                data: { name: zaloName }
            });
            loginResult.user.name = zaloName;
        }
        let khachhang = await this.prisma.khachhang.findFirst({
            where: { OR: [{ sdt: phone }, { phone: phone }] }
        });
        if (!khachhang) {
            const prefix = 'TG-KL';
            const latest = await this.prisma.khachhang.findFirst({
                where: { makh: { startsWith: prefix } },
                orderBy: { makh: 'desc' },
                select: { makh: true },
            });
            let nextNumber = 1;
            if (latest && latest.makh) {
                const lastNumber = parseInt(latest.makh.slice(prefix.length), 10);
                nextNumber = lastNumber + 1;
            }
            const makh = `${prefix}${nextNumber.toString().padStart(5, '0')}`;
            khachhang = await this.prisma.khachhang.create({
                data: {
                    makh,
                    name: zaloName,
                    sdt: phone,
                    phone: phone,
                    isActive: true,
                    loaikh: 'khachle',
                    isshowvat: true,
                }
            });
        }
        return {
            access_token: loginResult.token,
            user: {
                id: loginResult.user.id,
                email: loginResult.user.email,
                SDT: loginResult.user.SDT,
                name: loginResult.user.name,
                provider: loginResult.user.provider,
                providerId: loginResult.user.providerId,
            },
            khachhangId: khachhang.id,
            makh: khachhang.makh,
        };
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService, jwt_1.JwtService])
], AuthService);
//# sourceMappingURL=auth.service.js.map