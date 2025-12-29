import {
    Body,
    Controller,
    Delete,
    Get,
    Param,
    Post,
    Query,
    UseGuards,
} from '@nestjs/common';
import { CronJobStatus } from '@prisma/client';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DonhangCronService } from '../donhang/donhang-cron.service';
import { DatabaseSyncService } from '../services/database-sync.service';
import { CronLogService } from './cron-log.service';

export interface CronJobInfo {
  id: string;
  name: string;
  description: string;
  schedule: string;
  scheduleDescription: string;
  lastRun?: Date | null;
  nextRun?: string;
  status: 'active' | 'inactive';
  category: string;
  endpoint: string;
  method: 'GET' | 'POST';
}

@Controller('cron-management')
@UseGuards(JwtAuthGuard)
export class CronManagementController {
  constructor(
    private readonly databaseSyncService: DatabaseSyncService,
    private readonly donhangCronService: DonhangCronService,
    private readonly cronLogService: CronLogService,
  ) {}

  @Get('jobs')
  async getCronJobs(): Promise<CronJobInfo[]> {
    const now = new Date();
    
    return [
      {
        id: 'database-sync',
        name: 'Đồng bộ Database',
        description: 'Đồng bộ dữ liệu từ hệ thống khác về database chính',
        schedule: '0 0,10 * * *',
        scheduleDescription: '7:00 sáng và 17:00 chiều (giờ VN)',
        lastRun: null,
        nextRun: this.getNextRunTime('0 0,10 * * *'),
        status: 'active',
        category: 'Database',
        endpoint: '/database-sync/manual-sync',
        method: 'POST',
      },
      {
        id: 'auto-complete-orders',
        name: 'Tự động hoàn thành đơn hàng',
        description: 'Chuyển trạng thái đơn hàng từ "Đã giao" sang "Đã nhận" sau khi giao xong',
        schedule: '0 13 * * *',
        scheduleDescription: '13:00 hàng ngày (giờ VN)',
        lastRun: null,
        nextRun: this.getNextRunTime('0 13 * * *'),
        status: 'active',
        category: 'Đơn hàng',
        endpoint: '/donhang/autoCompleteOrdersDaily',
        method: 'GET',
      },
      {
        id: 'manual-auto-complete',
        name: 'Hoàn thành đơn theo ngày',
        description: 'Chạy hoàn thành đơn hàng với ngày cụ thể (yêu cầu nhập ngày)',
        schedule: 'Thủ công',
        scheduleDescription: 'Chỉ chạy khi kích hoạt thủ công',
        lastRun: null,
        nextRun: undefined,
        status: 'active',
        category: 'Đơn hàng',
        endpoint: '/donhang/manualAutoComplete',
        method: 'POST',
      },
      {
        id: 'test-cron',
        name: 'Test Cron (Dev)',
        description: 'Job test chạy mỗi phút (chỉ hoạt động ở môi trường development)',
        schedule: '* * * * *',
        scheduleDescription: 'Mỗi phút (chỉ dev)',
        lastRun: null,
        nextRun: undefined,
        status: process.env.NODE_ENV !== 'production' ? 'active' : 'inactive',
        category: 'System',
        endpoint: '/database-sync/test-connection',
        method: 'GET',
      },
    ];
  }

  @Post('trigger/database-sync')
  async triggerDatabaseSync() {
    const startTime = Date.now();
    let logId: string | null = null;
    
    try {
      // Tạo log entry khi bắt đầu
      logId = await this.cronLogService.createLog({
        jobId: 'database-sync',
        jobName: 'Đồng bộ Database',
        category: 'Database',
        triggeredBy: 'manual',
      });

      const result = await this.databaseSyncService.manualSync();
      const executionTime = Date.now() - startTime;
      
      // Format chi tiết thống kê
      const details: string[] = [];
      
      if (result.databaseSize) {
        details.push(`💾 Dung lượng DB: ${result.databaseSize}`);
      }
      
      if (result.tableStats && result.tableStats.length > 0) {
        // Tính tổng records
        const totalRecords = result.tableStats
          .filter(t => t.count >= 0)
          .reduce((sum, t) => sum + t.count, 0);
        details.push(`📊 Tổng records: ${totalRecords.toLocaleString('vi-VN')}`);
        
        // Top 5 bảng có nhiều records nhất
        const topTables = [...result.tableStats]
          .filter(t => t.count > 0)
          .sort((a, b) => b.count - a.count)
          .slice(0, 5);
        
        if (topTables.length > 0) {
          const topTablesStr = topTables
            .map(t => `${t.name}: ${t.count.toLocaleString('vi-VN')}`)
            .join(' | ');
          details.push(`📋 Top bảng: ${topTablesStr}`);
        }
      }
      
      // Cập nhật log với kết quả
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: result.success ? 'success' : 'failed',
          message: result.success 
            ? 'Đồng bộ database thành công!' 
            : 'Đồng bộ hoàn tất với một số lỗi',
          details: {
            databaseSize: result.databaseSize,
            tableCount: result.tableStats?.length || 0,
            totalRecords: result.tableStats
              ?.filter(t => t.count >= 0)
              .reduce((sum, t) => sum + t.count, 0) || 0,
            tableStats: result.tableStats,
          },
          executionTime,
          error: result.error,
        });
      }
      
      return {
        success: true,
        jobId: 'database-sync',
        jobName: 'Đồng bộ Database',
        logId,
        message: result.success 
          ? 'Đồng bộ database thành công!' 
          : 'Đồng bộ hoàn tất với một số lỗi',
        details: details.join('\n'),
        executionTime,
        result: {
          success: result.success,
          databaseSize: result.databaseSize,
          tableCount: result.tableStats?.length || 0,
          totalRecords: result.tableStats
            ?.filter(t => t.count >= 0)
            .reduce((sum, t) => sum + t.count, 0) || 0,
          tableStats: result.tableStats,
          duration: result.duration,
          error: result.error,
        },
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      // Cập nhật log với lỗi
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: 'failed',
          message: 'Lỗi khi chạy đồng bộ database',
          error: error.message,
          executionTime,
        });
      }
      
      return {
        success: false,
        jobId: 'database-sync',
        jobName: 'Đồng bộ Database',
        logId,
        message: 'Lỗi khi chạy đồng bộ database',
        details: `❌ ${error.message}`,
        error: error.message,
        executionTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('trigger/auto-complete-orders')
  async triggerAutoCompleteOrders() {
    const startTime = Date.now();
    let logId: string | null = null;
    
    try {
      logId = await this.cronLogService.createLog({
        jobId: 'auto-complete-orders',
        jobName: 'Tự động hoàn thành đơn hàng',
        category: 'Đơn hàng',
        triggeredBy: 'manual',
      });

      const result = await this.donhangCronService.autoCompleteOrdersDaily();
      const executionTime = Date.now() - startTime;
      
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: 'success',
          message: 'Đã kích hoạt job tự động hoàn thành đơn hàng',
          details: result,
          executionTime,
        });
      }
      
      return {
        success: true,
        jobId: 'auto-complete-orders',
        jobName: 'Tự động hoàn thành đơn hàng',
        logId,
        message: 'Đã kích hoạt job tự động hoàn thành đơn hàng',
        executionTime,
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: 'failed',
          message: 'Lỗi khi chạy tự động hoàn thành đơn hàng',
          error: error.message,
          executionTime,
        });
      }
      
      return {
        success: false,
        jobId: 'auto-complete-orders',
        logId,
        message: 'Lỗi khi chạy tự động hoàn thành đơn hàng',
        error: error.message,
        executionTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('trigger/manual-auto-complete')
  async triggerManualAutoComplete(@Body() body: { date?: string }) {
    const startTime = Date.now();
    let logId: string | null = null;
    
    try {
      logId = await this.cronLogService.createLog({
        jobId: 'manual-auto-complete',
        jobName: 'Hoàn thành đơn theo ngày',
        category: 'Đơn hàng',
        triggeredBy: 'manual',
      });

      const result = await this.donhangCronService.manualAutoComplete(body.date);
      const executionTime = Date.now() - startTime;
      
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: 'success',
          message: `Đã kích hoạt job hoàn thành đơn hàng cho ngày ${body.date || 'hôm nay'}`,
          details: result,
          executionTime,
        });
      }
      
      return {
        success: true,
        jobId: 'manual-auto-complete',
        jobName: 'Hoàn thành đơn theo ngày',
        logId,
        message: `Đã kích hoạt job hoàn thành đơn hàng cho ngày ${body.date || 'hôm nay'}`,
        executionTime,
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      const executionTime = Date.now() - startTime;
      
      if (logId) {
        await this.cronLogService.updateLog(logId, {
          status: 'failed',
          message: 'Lỗi khi chạy hoàn thành đơn hàng theo ngày',
          error: error.message,
          executionTime,
        });
      }
      
      return {
        success: false,
        jobId: 'manual-auto-complete',
        logId,
        message: 'Lỗi khi chạy hoàn thành đơn hàng theo ngày',
        error: error.message,
        executionTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  // ============================================
  // CRON LOGS API ENDPOINTS
  // ============================================

  @Get('logs')
  async getLogs(
    @Query('jobId') jobId?: string,
    @Query('status') status?: CronJobStatus,
    @Query('startDate') startDate?: string,
    @Query('endDate') endDate?: string,
    @Query('limit') limit?: string,
    @Query('offset') offset?: string,
  ) {
    const filter = {
      jobId,
      status,
      startDate: startDate ? new Date(startDate) : undefined,
      endDate: endDate ? new Date(endDate) : undefined,
      limit: limit ? parseInt(limit) : 50,
      offset: offset ? parseInt(offset) : 0,
    };
    
    return this.cronLogService.getLogs(filter);
  }

  @Get('logs/stats')
  async getLogsStats() {
    return this.cronLogService.getStats();
  }

  @Get('logs/:id')
  async getLogById(@Param('id') id: string) {
    return this.cronLogService.getLogById(id);
  }

  @Delete('logs')
  async clearLogs() {
    const count = await this.cronLogService.clearAllLogs();
    return { success: true, message: `Đã xóa ${count} logs`, deletedCount: count };
  }

  @Post('logs/cleanup')
  async cleanupOldLogs(@Body() body: { daysToKeep?: number }) {
    const count = await this.cronLogService.cleanupOldLogs(body.daysToKeep || 30);
    return { success: true, message: `Đã xóa ${count} logs cũ`, deletedCount: count };
  }

  private getNextRunTime(cronExpression: string): string {
    // Simple next run time calculation
    const now = new Date();
    const vietnamTime = new Date(now.toLocaleString('en-US', { timeZone: 'Asia/Ho_Chi_Minh' }));
    
    // Parse cron expression (simplified)
    const parts = cronExpression.split(' ');
    if (parts.length !== 5) return 'N/A';
    
    const [minute, hour] = parts;
    
    if (hour.includes(',')) {
      const hours = hour.split(',').map(Number);
      const currentHour = vietnamTime.getHours();
      const currentMinute = vietnamTime.getMinutes();
      
      for (const h of hours) {
        if (h > currentHour || (h === currentHour && parseInt(minute) > currentMinute)) {
          const nextRun = new Date(vietnamTime);
          nextRun.setHours(h, parseInt(minute), 0, 0);
          return nextRun.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
        }
      }
      // Next day
      const nextRun = new Date(vietnamTime);
      nextRun.setDate(nextRun.getDate() + 1);
      nextRun.setHours(hours[0], parseInt(minute), 0, 0);
      return nextRun.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
    
    if (!isNaN(parseInt(hour))) {
      const targetHour = parseInt(hour);
      const targetMinute = parseInt(minute);
      const nextRun = new Date(vietnamTime);
      
      if (targetHour < vietnamTime.getHours() || 
          (targetHour === vietnamTime.getHours() && targetMinute <= vietnamTime.getMinutes())) {
        nextRun.setDate(nextRun.getDate() + 1);
      }
      
      nextRun.setHours(targetHour, targetMinute, 0, 0);
      return nextRun.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' });
    }
    
    return 'N/A';
  }
}
