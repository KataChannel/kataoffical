import { Injectable, Logger } from '@nestjs/common';
import { Cron, CronExpression } from '@nestjs/schedule';
import { PrismaService } from 'prisma/prisma.service';

@Injectable()
export class DonhangCronService {
  private readonly logger = new Logger(DonhangCronService.name);

  constructor(
    private readonly prisma: PrismaService,
  ) {}

  // ✅ Helper methods để thay thế TimezoneUtilService (vì frontend gửi UTC)
  private getStartOfDay(date?: Date): Date {
    const d = date || new Date();
    d.setUTCHours(0, 0, 0, 0);
    return d;
  }

  private getEndOfDay(date?: Date): Date {
    const d = date || new Date();
    d.setUTCHours(23, 59, 59, 999);
    return d;
  }

  /**
   * Cron job chạy hàng ngày lúc 14:00 (2:00 PM) theo giờ Việt Nam
   * Tự động chuyển status đơn hàng từ 'dagiao' sang 'danhan' cho các đơn hàng của ngày hôm đó
   */
  @Cron('0 14 * * *', {
    name: 'auto-complete-orders',
    timeZone: 'Asia/Ho_Chi_Minh', // Giờ Việt Nam
  })
  async autoCompleteOrdersDaily() {
    try {
      this.logger.log('Starting auto-complete orders cron job at 14:00 Vietnam time');

      // Lấy ngày hiện tại theo giờ Việt Nam
      const today = new Date();
      const vietnamToday = this.convertToVietnamTime(today);
      
      // Tạo startOfDay và endOfDay theo giờ Việt Nam rồi convert sang UTC
      const startOfDay = new Date(vietnamToday);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(vietnamToday);
      endOfDay.setHours(23, 59, 59, 999);

      // Convert to UTC for database query
      const startOfDayUTC = startOfDay.toISOString();
      const endOfDayUTC = endOfDay.toISOString();

      this.logger.log(`Processing orders from ${startOfDayUTC} to ${endOfDayUTC}`);

      // Tìm các đơn hàng có status 'dagiao' trong ngày hôm nay
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

      // Cập nhật status sang 'danhan'
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

      // Log chi tiết các đơn hàng đã được cập nhật
      ordersToUpdate.forEach(order => {
        this.logger.log(
          `Order updated: ${order.madonhang} - Customer: ${order.khachhang?.name || 'N/A'} - Delivery Date: ${order.ngaygiao}`
        );
      });

      // Tạo audit log cho việc auto-complete
      await this.createAuditLog(ordersToUpdate, updateResult.count);

    } catch (error) {
      this.logger.error('Error in auto-complete orders cron job:', error);
      
      // Có thể thêm notification hoặc alert ở đây
      // await this.notificationService.sendErrorAlert('Cron job auto-complete orders failed', error);
    }
  }

  /**
   * Cron job test chạy mỗi phút để kiểm tra hoạt động (có thể bỏ comment khi cần test)
   */
  // @Cron('* * * * *', {
  //   name: 'test-cron',
  //   timeZone: 'Asia/Ho_Chi_Minh',
  // })
  // async testCron() {
  //   const now = new Date();
  //   const vietnamTime = this.convertToVietnamTime(now);
  //   this.logger.log(`Test cron running at Vietnam time: ${vietnamTime.toLocaleString('vi-VN')}`);
  // }

  /**
   * Convert date to Vietnam timezone
   */
  private convertToVietnamTime(date: Date): string {
    return date.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
  }

  /**
   * Tạo audit log chi tiết cho việc auto-complete orders
   */
  private async createAuditLog(orders: any[], updateCount: number) {
    try {
      const executionTime = new Date();
      const vietnamTime = this.convertToVietnamTime(executionTime);
      
      // Tạo audit log tổng quan cho cron job execution
      await this.prisma.auditLog.create({
        data: {
          userId: null, // System action
          action: 'UPDATE', // Using valid AuditAction enum value
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
              startOfDay: this.getStartOfDay().toISOString(),
              endOfDay: this.getEndOfDay().toISOString(),
              vietnamDate: vietnamTime.split(',')[0] // Chỉ lấy phần date
            }
          },
          createdAt: executionTime,
        },
      });

      // Tạo audit log chi tiết cho từng đơn hàng được cập nhật
      const auditLogPromises = orders.map(async (order, index) => {
        return this.prisma.auditLog.create({
          data: {
            userId: null, // System action
            action: 'UPDATE', // Using valid AuditAction enum value
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
            createdAt: new Date(executionTime.getTime() + index * 100), // Stagger để có thứ tự
          },
        });
      });

      // Execute all individual order audit logs
      await Promise.all(auditLogPromises);

      this.logger.log(`Created ${auditLogPromises.length + 1} audit log entries for auto-complete execution`);

    } catch (error) {
      this.logger.error('Failed to create detailed audit logs for auto-complete orders:', error);
      
      // Fallback: Tạo audit log đơn giản nếu lỗi
      try {
        await this.prisma.auditLog.create({
          data: {
            userId: null,
            action: 'UPDATE', // Using valid AuditAction enum value
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
      } catch (fallbackError) {
        this.logger.error('Failed to create fallback audit log:', fallbackError);
      }
    }
  }

  /**
   * Manual method để test auto-complete functionality với detailed logging
   */
  async manualAutoComplete(dateString?: string): Promise<any> {
    try {
      const targetDate = dateString ? new Date(dateString) : new Date();
      const vietnamDate = this.convertToVietnamTime(targetDate);
      
      const startOfDay = new Date(vietnamDate);
      startOfDay.setHours(0, 0, 0, 0);
      
      const endOfDay = new Date(vietnamDate);
      endOfDay.setHours(23, 59, 59, 999);

      // Convert to UTC for database query
      const startOfDayUTC = startOfDay.toISOString();
      const endOfDayUTC = endOfDay.toISOString();

      this.logger.log(`Manual auto-complete for date: ${vietnamDate} (${startOfDayUTC} to ${endOfDayUTC})`);

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
        // Log audit cho manual execution với no orders found
        await this.prisma.auditLog.create({
          data: {
            userId: null,
            action: 'UPDATE',
            entityName: 'DonhangCronService',
            entityId: null,
            oldValues: {
              executionType: 'MANUAL_EXECUTION',
              targetDate: vietnamDate,
              status: 'dagiao'
            },
            newValues: {
              result: 'NO_ORDERS_FOUND',
              message: `No orders found to auto-complete for date: ${vietnamDate}`,
              searchRange: {
                startOfDayUTC,
                endOfDayUTC,
                vietnamDate
              },
              executionTime: new Date().toISOString(),
              executionType: 'MANUAL_EXECUTION'
            },
            createdAt: new Date(),
          },
        });

        return {
          success: true,
          message: `No orders found to auto-complete for date: ${vietnamDate}`,
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

      // Tạo detailed audit logs cho manual execution
      await this.createManualAuditLog(ordersToUpdate, updateResult.count, vietnamDate);

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

    } catch (error) {
      this.logger.error('Error in manual auto-complete:', error);
      
      // Log error audit
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
      } catch (auditError) {
        this.logger.error('Failed to create error audit log:', auditError);
      }

      return {
        success: false,
        message: 'Failed to auto-complete orders',
        error: error.message,
      };
    }
  }

  /**
   * Tạo audit log chi tiết cho manual execution
   */
  private async createManualAuditLog(orders: any[], updateCount: number, vietnamDate: string) {
    try {
      const executionTime = new Date();
      
      // Tạo audit log tổng quan cho manual execution
      await this.prisma.auditLog.create({
        data: {
          userId: null, // Could be updated to include actual user ID if available
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

      // Tạo audit log cho từng đơn hàng (simplified for manual execution)
      if (orders.length <= 10) { // Only create individual logs for small batches
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
      } else {
        this.logger.log(`Created 1 summary audit log entry for manual execution (${orders.length} orders - too many for individual logs)`);
      }

    } catch (error) {
      this.logger.error('Failed to create manual execution audit logs:', error);
    }
  }
}
