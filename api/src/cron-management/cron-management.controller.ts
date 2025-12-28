import {
    Body,
    Controller,
    Get,
    Post,
    UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DonhangCronService } from '../donhang/donhang-cron.service';
import { DatabaseSyncService } from '../services/database-sync.service';

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
    try {
      const result = await this.databaseSyncService.manualSync();
      return {
        success: true,
        jobId: 'database-sync',
        jobName: 'Đồng bộ Database',
        message: 'Đã kích hoạt job đồng bộ database',
        executionTime: Date.now() - startTime,
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        jobId: 'database-sync',
        message: 'Lỗi khi chạy đồng bộ database',
        error: error.message,
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('trigger/auto-complete-orders')
  async triggerAutoCompleteOrders() {
    const startTime = Date.now();
    try {
      const result = await this.donhangCronService.autoCompleteOrdersDaily();
      return {
        success: true,
        jobId: 'auto-complete-orders',
        jobName: 'Tự động hoàn thành đơn hàng',
        message: 'Đã kích hoạt job tự động hoàn thành đơn hàng',
        executionTime: Date.now() - startTime,
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        jobId: 'auto-complete-orders',
        message: 'Lỗi khi chạy tự động hoàn thành đơn hàng',
        error: error.message,
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
  }

  @Post('trigger/manual-auto-complete')
  async triggerManualAutoComplete(@Body() body: { date?: string }) {
    const startTime = Date.now();
    try {
      const result = await this.donhangCronService.manualAutoComplete(body.date);
      return {
        success: true,
        jobId: 'manual-auto-complete',
        jobName: 'Hoàn thành đơn theo ngày',
        message: `Đã kích hoạt job hoàn thành đơn hàng cho ngày ${body.date || 'hôm nay'}`,
        executionTime: Date.now() - startTime,
        result,
        timestamp: new Date().toISOString(),
      };
    } catch (error) {
      return {
        success: false,
        jobId: 'manual-auto-complete',
        message: 'Lỗi khi chạy hoàn thành đơn hàng theo ngày',
        error: error.message,
        executionTime: Date.now() - startTime,
        timestamp: new Date().toISOString(),
      };
    }
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
