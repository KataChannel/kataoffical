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
const moment = require("moment-timezone");
const prisma_service_1 = require("../../prisma/prisma.service");
let DonhangCronService = DonhangCronService_1 = class DonhangCronService {
    constructor(prisma) {
        this.prisma = prisma;
        this.logger = new common_1.Logger(DonhangCronService_1.name);
    }
    async autoCompleteOrdersDaily() {
        try {
            this.logger.log('Starting auto-complete orders cron job at 14:00 Vietnam time');
            const now = new Date();
            const startOfDay = moment().tz('Asia/Ho_Chi_Minh').startOf('day').toDate();
            const endOfDay = moment().tz('Asia/Ho_Chi_Minh').endOf('day').toDate();
            this.logger.log(`Processing orders from ${startOfDay} to ${endOfDay}`);
            const ordersToUpdate = await this.prisma.donhang.findMany({
                where: {
                    status: {
                        in: ['dadat', 'dagiao']
                    },
                    ngaygiao: {
                        gte: startOfDay,
                        lte: endOfDay,
                    },
                },
                select: {
                    id: true,
                    madonhang: true,
                    ngaygiao: true,
                    status: true,
                    ghichu: true,
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
            let updateCount = 0;
            const currentTime = new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
            for (const order of ordersToUpdate) {
                try {
                    await this.prisma.donhang.update({
                        where: { id: order.id },
                        data: {
                            status: 'danhan',
                            ghichu: `${order.ghichu ? order.ghichu + ' | ' : ''}[AUTOCOMPLETE] Tự động chuyển trạng thái lúc ${currentTime}`,
                            updatedAt: new Date(),
                        },
                    });
                    updateCount++;
                    this.logger.log(`Order updated: ${order.madonhang} - Customer: ${order.khachhang?.name || 'N/A'} - Delivery Date: ${order.ngaygiao}`);
                }
                catch (error) {
                    this.logger.error(`Failed to update order ${order.madonhang}:`, error);
                }
            }
            this.logger.log(`Successfully updated ${updateCount} orders to 'danhan' status`);
            await this.createAuditLog(ordersToUpdate, updateCount);
        }
        catch (error) {
            this.logger.error('Error in auto-complete orders cron job:', error);
        }
    }
    convertToVietnamTime(date) {
        return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
    async createAuditLog(orders, updateCount) {
        try {
            const executionTime = new Date();
            const vietnamTime = this.convertToVietnamTime(executionTime);
            await this.prisma.auditLog.create({
                data: {
                    userId: null,
                    action: 'UPDATE',
                    entityName: 'DonhangCronService',
                    entityId: null,
                    oldValues: {
                        cronJobName: 'auto-complete-orders',
                        status: 'dagiao',
                        scheduledTime: '14:00 Vietnam Time',
                        timezone: 'Asia/Ho_Chi_Minh',
                        executionType: 'CRON_EXECUTION'
                    },
                    newValues: {
                        action: 'auto-complete-orders-daily',
                        executionStatus: 'SUCCESS',
                        ordersFound: orders.length,
                        ordersProcessed: updateCount,
                        executionTime: executionTime.toISOString(),
                        vietnamTime: vietnamTime,
                        targetStatus: 'danhan',
                        executionType: 'CRON_EXECUTION',
                        processingSummary: {
                            totalOrders: orders.length,
                            successfulUpdates: updateCount,
                            failedUpdates: orders.length - updateCount,
                            processingDuration: '< 1 second',
                            affectedCustomers: [...new Set(orders.map(o => o.khachhang?.name).filter(Boolean))].length
                        },
                        dateRange: {
                            startOfDay: moment().tz('Asia/Ho_Chi_Minh').startOf('day').toDate(),
                            endOfDay: moment().tz('Asia/Ho_Chi_Minh').endOf('day').toDate(),
                            vietnamDate: vietnamTime.split(',')[0]
                        }
                    },
                    createdAt: executionTime,
                },
            });
            const auditLogPromises = orders.map(async (order, index) => {
                return this.prisma.auditLog.create({
                    data: {
                        userId: null,
                        action: 'UPDATE',
                        entityName: 'Donhang',
                        entityId: order.id,
                        oldValues: {
                            status: 'dagiao',
                            madonhang: order.madonhang,
                            ngaygiao: order.ngaygiao,
                            customer: order.khachhang?.name || 'Unknown',
                            processedBy: 'auto-complete-cron'
                        },
                        newValues: {
                            status: 'danhan',
                            madonhang: order.madonhang,
                            ngaygiao: order.ngaygiao,
                            customer: order.khachhang?.name || 'Unknown',
                            updatedAt: executionTime.toISOString(),
                            processedBy: 'auto-complete-cron',
                            cronJobExecution: {
                                jobName: 'auto-complete-orders',
                                executionTime: vietnamTime,
                                orderIndex: index + 1,
                                totalOrders: orders.length,
                                autoCompleteReason: 'Daily auto-completion at 14:00 Vietnam time'
                            }
                        },
                        createdAt: new Date(executionTime.getTime() + index * 100),
                    },
                });
            });
            await Promise.all(auditLogPromises);
            this.logger.log(`Created ${auditLogPromises.length + 1} audit log entries for auto-complete execution`);
        }
        catch (error) {
            this.logger.error('Failed to create detailed audit logs for auto-complete orders:', error);
            try {
                await this.prisma.auditLog.create({
                    data: {
                        userId: null,
                        action: 'UPDATE',
                        entityName: 'DonhangCronService',
                        entityId: null,
                        oldValues: {
                            executionType: 'CRON_ERROR',
                            cronJobName: 'auto-complete-orders'
                        },
                        newValues: {
                            error: 'Failed to create detailed audit logs',
                            errorMessage: error.message,
                            ordersProcessed: updateCount,
                            timestamp: new Date().toISOString(),
                            fallbackLog: true,
                            executionType: 'CRON_ERROR'
                        },
                        createdAt: new Date(),
                    },
                });
            }
            catch (fallbackError) {
                this.logger.error('Failed to create fallback audit log:', fallbackError);
            }
        }
    }
    async manualAutoComplete(dateString) {
        try {
            const targetDate = dateString ? new Date(dateString) : new Date();
            const startOfDay = moment().tz('Asia/Ho_Chi_Minh').startOf('day').toDate();
            const endOfDay = moment().tz('Asia/Ho_Chi_Minh').endOf('day').toDate();
            const vietnamDateString = this.convertToVietnamTime(targetDate);
            this.logger.log(`Manual auto-complete for date: ${vietnamDateString} (${startOfDay.toISOString()} to ${endOfDay.toISOString()})`);
            const ordersToUpdate = await this.prisma.donhang.findMany({
                where: {
                    status: 'dagiao',
                    ngaygiao: {
                        gte: startOfDay,
                        lte: endOfDay,
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
                await this.prisma.auditLog.create({
                    data: {
                        userId: null,
                        action: 'UPDATE',
                        entityName: 'DonhangCronService',
                        entityId: null,
                        oldValues: {
                            executionType: 'MANUAL_EXECUTION',
                            targetDate: vietnamDateString,
                            status: 'dagiao'
                        },
                        newValues: {
                            result: 'NO_ORDERS_FOUND',
                            message: `No orders found to auto-complete for date: ${vietnamDateString}`,
                            searchRange: {
                                startOfDay: startOfDay.toISOString(),
                                endOfDay: endOfDay.toISOString(),
                                vietnamDate: vietnamDateString
                            },
                            executionTime: new Date().toISOString(),
                            executionType: 'MANUAL_EXECUTION'
                        },
                        createdAt: new Date(),
                    },
                });
                return {
                    success: true,
                    message: `No orders found to auto-complete for date: ${vietnamDateString}`,
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
            await this.createManualAuditLog(ordersToUpdate, updateResult.count, vietnamDateString);
            const result = {
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
            this.logger.log(`Manual auto-complete completed: ${updateResult.count} orders updated`);
            return result;
        }
        catch (error) {
            this.logger.error('Error in manual auto-complete:', error);
            try {
                await this.prisma.auditLog.create({
                    data: {
                        userId: null,
                        action: 'UPDATE',
                        entityName: 'DonhangCronService',
                        entityId: null,
                        oldValues: {
                            executionType: 'MANUAL_EXECUTION_ERROR',
                            targetDate: dateString || 'current date'
                        },
                        newValues: {
                            error: 'Manual auto-complete failed',
                            errorMessage: error.message,
                            stackTrace: error.stack,
                            executionTime: new Date().toISOString(),
                            executionType: 'MANUAL_EXECUTION_ERROR'
                        },
                        createdAt: new Date(),
                    },
                });
            }
            catch (auditError) {
                this.logger.error('Failed to create error audit log:', auditError);
            }
            return {
                success: false,
                message: 'Failed to auto-complete orders',
                error: error.message,
            };
        }
    }
    async createManualAuditLog(orders, updateCount, vietnamDate) {
        try {
            const executionTime = new Date();
            await this.prisma.auditLog.create({
                data: {
                    userId: null,
                    action: 'UPDATE',
                    entityName: 'DonhangCronService',
                    entityId: null,
                    oldValues: {
                        executionType: 'MANUAL_EXECUTION',
                        status: 'dagiao',
                        targetDate: vietnamDate,
                        trigger: 'Manual testing/execution'
                    },
                    newValues: {
                        action: 'manual-auto-complete',
                        executionStatus: 'SUCCESS',
                        ordersFound: orders.length,
                        ordersProcessed: updateCount,
                        executionTime: executionTime.toISOString(),
                        targetDate: vietnamDate,
                        targetStatus: 'danhan',
                        executionType: 'MANUAL_EXECUTION',
                        processingSummary: {
                            totalOrders: orders.length,
                            successfulUpdates: updateCount,
                            failedUpdates: orders.length - updateCount,
                            affectedCustomers: [...new Set(orders.map(o => o.khachhang?.name).filter(Boolean))].length,
                            processingType: 'Manual execution for testing/admin purposes'
                        }
                    },
                    createdAt: executionTime,
                },
            });
            if (orders.length <= 10) {
                const auditLogPromises = orders.map(async (order, index) => {
                    return this.prisma.auditLog.create({
                        data: {
                            userId: null,
                            action: 'UPDATE',
                            entityName: 'Donhang',
                            entityId: order.id,
                            oldValues: {
                                status: 'dagiao',
                                madonhang: order.madonhang,
                                processedBy: 'manual-auto-complete'
                            },
                            newValues: {
                                status: 'danhan',
                                madonhang: order.madonhang,
                                updatedAt: executionTime.toISOString(),
                                processedBy: 'manual-auto-complete',
                                manualExecution: {
                                    executionTime: vietnamDate,
                                    orderIndex: index + 1,
                                    totalOrders: orders.length,
                                    reason: 'Manual testing/admin execution'
                                }
                            },
                            createdAt: new Date(executionTime.getTime() + index * 50),
                        },
                    });
                });
                await Promise.all(auditLogPromises);
                this.logger.log(`Created ${auditLogPromises.length + 1} audit log entries for manual execution`);
            }
            else {
                this.logger.log(`Created 1 summary audit log entry for manual execution (${orders.length} orders - too many for individual logs)`);
            }
        }
        catch (error) {
            this.logger.error('Failed to create manual execution audit logs:', error);
        }
    }
};
exports.DonhangCronService = DonhangCronService;
__decorate([
    (0, schedule_1.Cron)('0 14 * * *', {
        name: 'auto-complete-orders',
        timeZone: 'Asia/Ho_Chi_Minh',
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], DonhangCronService.prototype, "autoCompleteOrdersDaily", null);
exports.DonhangCronService = DonhangCronService = DonhangCronService_1 = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DonhangCronService);
//# sourceMappingURL=donhang-cron.service.js.map