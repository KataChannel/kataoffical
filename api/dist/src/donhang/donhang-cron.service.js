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
var DonhangCronService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.DonhangCronService = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const prisma_service_1 = require("../../prisma/prisma.service");
const timezone_util_service_1 = require("../shared/services/timezone-util.service");
let DonhangCronService = DonhangCronService_1 = class DonhangCronService {
    constructor(prisma, timezoneUtil) {
        this.prisma = prisma;
        this.timezoneUtil = timezoneUtil;
        this.logger = new common_1.Logger(DonhangCronService_1.name);
    }
    async autoCompleteOrdersDaily() {
        try {
            this.logger.log('Starting auto-complete orders cron job at 14:00 Vietnam time');
            const today = new Date();
            const vietnamToday = this.convertToVietnamTime(today);
            const startOfDay = new Date(vietnamToday);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(vietnamToday);
            endOfDay.setHours(23, 59, 59, 999);
            const startOfDayUTC = this.timezoneUtil.toUTC(startOfDay);
            const endOfDayUTC = this.timezoneUtil.toUTC(endOfDay);
            this.logger.log(`Processing orders from ${startOfDayUTC} to ${endOfDayUTC}`);
            const ordersToUpdate = await this.prisma.donhang.findMany({
                where: {
                    status: 'dagiao',
                    ngaygiao: {
                        gte: new Date(startOfDayUTC),
                        lte: new Date(endOfDayUTC),
                    },
                },
                select: {
                    id: true,
                    madonhang: true,
                    ngaygiao: true,
                    status: true,
                    khachhang: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (ordersToUpdate.length === 0) {
                this.logger.log('No orders found to auto-complete for today');
                return;
            }
            this.logger.log(`Found ${ordersToUpdate.length} orders to auto-complete`);
            const updateResult = await this.prisma.donhang.updateMany({
                where: {
                    id: {
                        in: ordersToUpdate.map(order => order.id),
                    },
                },
                data: {
                    status: 'danhan',
                    updatedAt: new Date(),
                },
            });
            this.logger.log(`Successfully updated ${updateResult.count} orders to 'danhan' status`);
            ordersToUpdate.forEach(order => {
                this.logger.log(`Order updated: ${order.madonhang} - Customer: ${order.khachhang?.name || 'N/A'} - Delivery Date: ${order.ngaygiao}`);
            });
            await this.createAuditLog(ordersToUpdate, updateResult.count);
        }
        catch (error) {
            this.logger.error('Error in auto-complete orders cron job:', error);
        }
    }
    convertToVietnamTime(date) {
        return this.timezoneUtil.fromUTC(date.toISOString(), 'Asia/Ho_Chi_Minh');
    }
    async createAuditLog(orders, updateCount) {
        try {
            await this.prisma.auditLog.create({
                data: {
                    userId: null,
                    action: 'UPDATE',
                    entityName: 'Donhang Auto-Complete',
                    entityId: null,
                    newValues: {
                        action: 'auto-complete-orders-cron',
                        ordersProcessed: updateCount,
                        timestamp: new Date().toISOString(),
                        vietnamTime: this.convertToVietnamTime(new Date()).toLocaleString('vi-VN'),
                        orderDetails: orders.map(order => ({
                            id: order.id,
                            madonhang: order.madonhang,
                            customer: order.khachhang?.name,
                            deliveryDate: order.ngaygiao,
                        })),
                    },
                    createdAt: new Date(),
                },
            });
        }
        catch (error) {
            this.logger.warn('Failed to create audit log for auto-complete orders:', error);
        }
    }
    async manualAutoComplete(dateString) {
        try {
            const targetDate = dateString ? new Date(dateString) : new Date();
            const vietnamDate = this.convertToVietnamTime(targetDate);
            const startOfDay = new Date(vietnamDate);
            startOfDay.setHours(0, 0, 0, 0);
            const endOfDay = new Date(vietnamDate);
            endOfDay.setHours(23, 59, 59, 999);
            const startOfDayUTC = this.timezoneUtil.toUTC(startOfDay);
            const endOfDayUTC = this.timezoneUtil.toUTC(endOfDay);
            const ordersToUpdate = await this.prisma.donhang.findMany({
                where: {
                    status: 'dagiao',
                    ngaygiao: {
                        gte: new Date(startOfDayUTC),
                        lte: new Date(endOfDayUTC),
                    },
                },
                include: {
                    khachhang: {
                        select: {
                            name: true,
                        },
                    },
                },
            });
            if (ordersToUpdate.length === 0) {
                return {
                    success: true,
                    message: `No orders found to auto-complete for date: ${vietnamDate.toDateString()}`,
                    count: 0,
                    orders: [],
                };
            }
            const updateResult = await this.prisma.donhang.updateMany({
                where: {
                    id: {
                        in: ordersToUpdate.map(order => order.id),
                    },
                },
                data: {
                    status: 'danhan',
                    updatedAt: new Date(),
                },
            });
            await this.createAuditLog(ordersToUpdate, updateResult.count);
            return {
                success: true,
                message: `Successfully updated ${updateResult.count} orders to 'danhan' status`,
                count: updateResult.count,
                orders: ordersToUpdate.map(order => ({
                    id: order.id,
                    madonhang: order.madonhang,
                    customer: order.khachhang?.name,
                    deliveryDate: order.ngaygiao,
                })),
            };
        }
        catch (error) {
            this.logger.error('Error in manual auto-complete:', error);
            return {
                success: false,
                message: 'Failed to auto-complete orders',
                error: error.message,
            };
        }
    }
};
exports.DonhangCronService = DonhangCronService;
__decorate([
    (0, schedule_1.Cron)('0 15 * * *', {
        name: 'auto-complete-orders',
        timeZone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonhangCronService.prototype, "autoCompleteOrdersDaily", null);
exports.DonhangCronService = DonhangCronService = DonhangCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        timezone_util_service_1.TimezoneUtilService])
], DonhangCronService);
//# sourceMappingURL=donhang-cron.service.js.map