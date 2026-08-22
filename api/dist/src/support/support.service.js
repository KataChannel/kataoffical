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
exports.SupportService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let SupportService = class SupportService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findTickets(user, status, priority) {
        const where = {};
        if (status)
            where.status = status;
        if (priority)
            where.priority = priority;
        const userRoles = user?.roles || [];
        const isAdminOrTech = userRoles.some((r) => ['ADMIN', 'TECH_SUPPORT'].includes(r));
        if (!isAdminOrTech) {
            where.createdBy = user.id;
        }
        return this.prisma.supportTicket.findMany({
            where,
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                responses: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                        attachments: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                attachments: true,
            },
            orderBy: {
                updatedAt: 'desc',
            },
        });
    }
    async findTicketById(id) {
        return this.prisma.supportTicket.findUnique({
            where: { id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                technician: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                responses: {
                    include: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                        attachments: true,
                    },
                    orderBy: {
                        createdAt: 'asc',
                    },
                },
                attachments: true,
            },
        });
    }
    async createTicket(user, input) {
        const { attachmentUrls, ...ticketData } = input;
        const ticket = await this.prisma.supportTicket.create({
            data: {
                ...ticketData,
                createdBy: user.id,
                priority: input.priority || 'medium',
            },
        });
        if (attachmentUrls && attachmentUrls.length > 0) {
            await this.prisma.supportAttachment.createMany({
                data: attachmentUrls.map(url => ({
                    fileUrl: url,
                    fileName: url.split('/').pop() || 'file',
                    fileType: this.getFileTypeFromUrl(url),
                    fileSize: 0,
                    ticketId: ticket.id,
                })),
            });
        }
        return this.findTicketById(ticket.id);
    }
    async updateTicket(id, input) {
        await this.prisma.supportTicket.update({
            where: { id },
            data: input,
        });
        return this.findTicketById(id);
    }
    async addResponse(user, ticketId, input) {
        const { attachmentUrls, ...responseData } = input;
        const response = await this.prisma.supportResponse.create({
            data: {
                ...responseData,
                createdBy: user.id,
                ticketId,
            },
        });
        if (attachmentUrls && attachmentUrls.length > 0) {
            await this.prisma.supportAttachment.createMany({
                data: attachmentUrls.map(url => ({
                    fileUrl: url,
                    fileName: url.split('/').pop() || 'file',
                    fileType: this.getFileTypeFromUrl(url),
                    fileSize: 0,
                    responseId: response.id,
                })),
            });
        }
        await this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: { updatedAt: new Date() },
        });
        return this.prisma.supportResponse.findUnique({
            where: { id: response.id },
            include: {
                user: {
                    select: {
                        id: true,
                        name: true,
                        email: true,
                    },
                },
                attachments: true,
            },
        });
    }
    async deleteTicket(id) {
        await this.prisma.supportTicket.delete({
            where: { id },
        });
        return true;
    }
    async assignTicket(ticketId, technicianId) {
        await this.prisma.supportTicket.update({
            where: { id: ticketId },
            data: {
                assignedTo: technicianId,
                status: 'inProgress',
            },
        });
        return true;
    }
    getFileTypeFromUrl(url) {
        const ext = url.split('.').pop()?.toLowerCase();
        const imageExts = ['jpg', 'jpeg', 'png', 'gif', 'webp'];
        const videoExts = ['mp4', 'webm', 'mov'];
        if (imageExts.includes(ext || ''))
            return 'image/*';
        if (videoExts.includes(ext || ''))
            return 'video/*';
        return 'application/octet-stream';
    }
};
exports.SupportService = SupportService;
exports.SupportService = SupportService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], SupportService);
//# sourceMappingURL=support.service.js.map