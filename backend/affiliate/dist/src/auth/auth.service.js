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
const email_service_1 = require("../email/email.service");
let AuthService = class AuthService {
    constructor(prisma, jwtService, emailService) {
        this.prisma = prisma;
        this.jwtService = jwtService;
        this.emailService = emailService;
    }
    async generateCodeId() {
        try {
            let nextNumber = 1;
            let codeId = '';
            let isUnique = false;
            const latest = await this.prisma.user.findFirst({
                orderBy: { codeId: 'desc' },
            });
            if (latest && latest.codeId) {
                const match = latest.codeId.match(/CTV(\d+)/);
                if (match) {
                    nextNumber = parseInt(match[1]) + 1;
                }
            }
            while (!isUnique) {
                codeId = `CTV${nextNumber.toString().padStart(5, '0')}`;
                const existingUser = await this.prisma.user.findFirst({
                    where: { codeId },
                });
                if (!existingUser) {
                    isUnique = true;
                }
                else {
                    nextNumber++;
                }
            }
            return codeId;
        }
        catch (error) {
            throw error;
        }
    }
    async register(data, affiliateCode) {
        console.log('Register data:', data);
        try {
            const { name, email, phone, password, facebookId, googleId, zaloId, khoahoc } = data;
            console.log('Checking for existing user with email:', email, 'or phone:', phone);
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
            const hashedPassword = password
                ? await bcrypt.hash(password, 10)
                : await bcrypt.hash(Math.random().toString(36).slice(-8), 10);
            const inviteCode = phone || Math.random().toString(36).slice(-8);
            const codeId = await this.generateCodeId();
            const user = await this.prisma.user.create({
                data: {
                    codeId,
                    name: name || null,
                    email: email || null,
                    phone: phone || null,
                    password: hashedPassword,
                    inviteCode,
                    affiliateCode: affiliateCode || null,
                    referrerId,
                    facebookId: facebookId || null,
                    googleId: googleId || null,
                    ghichu: khoahoc || null,
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
    async registerctv(data, affiliateCode) {
        try {
            const { email, phone, password, facebookId, googleId, zaloId } = data;
            console.log(data);
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
            console.log('codeId', codeId);
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
            if (user.email) {
                try {
                    await this.emailService.sendWelcomeEmail(user.email, user.codeId || 'CTV');
                }
                catch (emailError) {
                    console.error('Failed to send welcome email:', emailError);
                }
            }
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
    async forgotPassword(email, phone) {
        if (!email && !phone) {
            throw new common_1.UnauthorizedException('Email hoặc số điện thoại là bắt buộc');
        }
        const user = await this.prisma.user.findFirst({
            where: {
                OR: [
                    { email: email || undefined },
                    { phone: phone || undefined },
                    { SDT: phone || undefined },
                ],
            },
        });
        if (!user) {
            throw new common_1.UnauthorizedException('Không tìm thấy người dùng');
        }
        const resetToken = this.jwtService.sign({ userId: user.id, type: 'password_reset' }, { expiresIn: '15m' });
        try {
            if (user.email) {
                await this.emailService.sendPasswordResetEmail(user.email, resetToken, user.name || user.codeId || undefined);
                return {
                    message: 'Link đặt lại mật khẩu đã được gửi qua email',
                    emailSent: true,
                    email: this.maskEmail(user.email),
                };
            }
            else {
                return {
                    message: 'Token đặt lại mật khẩu đã được tạo',
                    resetToken,
                    emailSent: false,
                    resetUrl: `${process.env.BASE_URL}/reset-password-ctv?token=${resetToken}`,
                };
            }
        }
        catch (emailError) {
            console.error('Email sending failed:', emailError);
            return {
                message: 'Có lỗi khi gửi email. Vui lòng sử dụng token bên dưới',
                resetToken,
                emailSent: false,
                resetUrl: `${process.env.BASE_URL}/reset-password-ctv?token=${resetToken}`,
                error: 'Email sending failed',
            };
        }
    }
    maskEmail(email) {
        const [localPart, domain] = email.split('@');
        const maskedLocal = localPart.length > 2
            ? localPart[0] + '*'.repeat(localPart.length - 2) + localPart[localPart.length - 1]
            : localPart;
        return `${maskedLocal}@${domain}`;
    }
    async resetPassword(token, newPassword) {
        try {
            const decoded = this.jwtService.verify(token);
            if (decoded.type !== 'password_reset') {
                throw new common_1.UnauthorizedException('Token không hợp lệ');
            }
            const hashedPassword = await bcrypt.hash(newPassword, 10);
            const user = await this.prisma.user.update({
                where: { id: decoded.userId },
                data: { password: hashedPassword },
            });
            return { message: 'Mật khẩu đã được đặt lại thành công' };
        }
        catch (error) {
            if (error.name === 'JsonWebTokenError' || error.name === 'TokenExpiredError') {
                throw new common_1.UnauthorizedException('Token không hợp lệ hoặc đã hết hạn');
            }
            throw error;
        }
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
        jwt_1.JwtService,
        email_service_1.EmailService])
], AuthService);
//# sourceMappingURL=auth.service.js.map