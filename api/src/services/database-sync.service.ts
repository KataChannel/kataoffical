import { Injectable, Logger } from '@nestjs/common';
import { CronJobStatus } from '@prisma/client';
import { exec } from 'child_process';
import * as cron from 'node-cron';
import * as path from 'path';
import { PrismaService } from 'prisma/prisma.service';
import { promisify } from 'util';

const execAsync = promisify(exec);

export interface SyncStats {
  success: boolean;
  timestamp: Date;
  duration?: number;
  databaseSize?: string;
  tableStats?: { name: string; count: number }[];
  error?: string;
}

@Injectable()
export class DatabaseSyncService {
  private readonly logger = new Logger(DatabaseSyncService.name);

  constructor(private readonly prisma: PrismaService) {}

  onModuleInit() {
    this.setupScheduledSync();
    // Test cron - chỉ chạy ở local, không chạy production
    if (process.env.NODE_ENV !== 'production') {
      this.setupTestCron();
    }
  }

  private setupScheduledSync() {
    // Cron job chạy vào 7h sáng giờ Việt Nam (0h UTC)
    cron.schedule('0 0 * * *', async () => {
      this.logger.log('Bắt đầu đồng bộ database định kỳ - 7h sáng VN');
      await this.syncDatabase();
    }, {
      timezone: 'Asia/Ho_Chi_Minh'
    });

    // Cron job chạy vào 17h chiều giờ Việt Nam (10h UTC)
    cron.schedule('0 10 * * *', async () => {
      this.logger.log('Bắt đầu đồng bộ database định kỳ - 17h chiều VN');
      await this.syncDatabase();
    }, {
      timezone: 'Asia/Ho_Chi_Minh'
    });

    this.logger.log('Đã thiết lập lịch đồng bộ database: 7h sáng và 17h chiều (giờ VN)');
  }

  private setupTestCron() {
    // Test cron - chạy mỗi phút để kiểm tra hoạt động
    // XÓA HOẶC COMMENT SAU KHI TEST XONG
    cron.schedule('* * * * *', () => {
      const now = new Date();
      this.logger.log(
        `⏰ Test cron đang chạy - ${now.toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`,
      );
    }, {
      timezone: 'Asia/Ho_Chi_Minh'
    });
    this.logger.log('🧪 Test cron đã được thiết lập (chạy mỗi phút để test)');
  }

  async syncDatabase(): Promise<SyncStats> {
    const startTime = Date.now();
    const jobId = 'DATABASE_SYNC_DAILY';
    const jobName = 'Đồng bộ Database định kỳ';
    
    // Khởi tạo log trong database
    const log = await this.prisma.cronExecutionLog.create({
      data: {
        jobId,
        jobName,
        category: 'Sync',
        status: CronJobStatus.running,
        startTime: new Date(),
        triggeredBy: 'system',
        message: 'Bắt đầu quá trình đồng bộ database...',
      },
    });
    
    try {
      this.logger.log('🚀 Đang thực thi script đồng bộ database...');
      
      const isProduction = process.env.NODE_ENV === 'production';
      const projectRoot = path.resolve(__dirname, '..', '..');
      const apiRoot = projectRoot.replace('/dist', '');
      
      const scriptPath = isProduction
        ? '/app/scripts/sync-database-optimized.sh'
        : path.join(apiRoot, 'scripts', 'sync-database-optimized.sh');
      
      this.logger.log(`📁 Script path: ${scriptPath}`);
      
      const fs = await import('fs');
      if (!fs.existsSync(scriptPath)) {
        throw new Error(`Script không tồn tại: ${scriptPath}`);
      }
      
      const { stdout, stderr } = await execAsync(`bash ${scriptPath}`, {
        cwd: path.dirname(scriptPath),
        timeout: 300000,
        maxBuffer: 50 * 1024 * 1024
      });
      
      let importantOutput = '';
      if (stdout) {
        importantOutput = stdout
          .split('\n')
          .filter(line => !line.match(/^(COPY \d+|SET|ALTER TABLE|CREATE|DROP|TRUNCATE|DO|\s*)$/))
          .join('\n');
      }
      
      const duration = Date.now() - startTime;
      const stats = await this.getDatabaseStats();
      this.logSyncSuccess(duration, stats);

      // Cập nhật log thành công
      await this.prisma.cronExecutionLog.update({
        where: { id: log.id },
        data: {
          status: CronJobStatus.success,
          endTime: new Date(),
          executionTime: Math.round(duration / 1000),
          message: `Đồng bộ thành công (${stats.databaseSize})`,
          details: {
            duration: this.formatDuration(duration),
            databaseSize: stats.databaseSize,
            tableStats: stats.tableStats,
            output: importantOutput.substring(0, 2000), // Giới hạn kích thước output
          } as any,
        },
      });
      
      return { 
        success: true, 
        timestamp: new Date(), 
        duration,
        ...stats
      };
    } catch (error) {
      const duration = Date.now() - startTime;
      this.logger.error(`❌ Lỗi khi đồng bộ database: ${error.message}`);
      
      // Cập nhật log thất bại
      await this.prisma.cronExecutionLog.update({
        where: { id: log.id },
        data: {
          status: CronJobStatus.failed,
          endTime: new Date(),
          executionTime: Math.round(duration / 1000),
          error: error.message,
          message: 'Đồng bộ thất bại',
          details: {
            stack: error.stack,
            duration: this.formatDuration(duration),
          } as any,
        },
      });

      return { success: false, timestamp: new Date(), duration, error: error.message };
    }
  }

  /**
   * Lấy thống kê chi tiết về database
   */
  private async getDatabaseStats(): Promise<{ databaseSize: string; tableStats: { name: string; count: number }[] }> {
    try {
      // Lấy dung lượng database
      const sizeResult = await this.prisma.$queryRaw<{ size: string }[]>`
        SELECT pg_size_pretty(pg_database_size(current_database())) as size
      `;
      const databaseSize = sizeResult[0]?.size || 'N/A';

      // Lấy số lượng records của các bảng quan trọng
      const tableStats: { name: string; count: number }[] = [];
      
      const tables = [
        { name: 'Khachhang', model: () => this.prisma.khachhang.count() },
        { name: 'Sanpham', model: () => this.prisma.sanpham.count() },
        { name: 'Donhang', model: () => this.prisma.donhang.count() },
        { name: 'Donhangsanpham', model: () => this.prisma.donhangsanpham.count() },
        { name: 'Banggia', model: () => this.prisma.banggia.count() },
        { name: 'Banggiasanpham', model: () => this.prisma.banggiasanpham.count() },
        { name: 'Nhacungcap', model: () => this.prisma.nhacungcap.count() },
        { name: 'Dathang', model: () => this.prisma.dathang.count() },
        { name: 'User', model: () => this.prisma.user.count() },
        { name: 'Kho', model: () => this.prisma.kho.count() },
        { name: 'Nhanvien', model: () => this.prisma.nhanvien.count() },
        { name: 'Menu', model: () => this.prisma.menu.count() },
        { name: 'Permission', model: () => this.prisma.permission.count() },
        { name: 'Role', model: () => this.prisma.role.count() },
      ];

      for (const table of tables) {
        try {
          const count = await table.model();
          tableStats.push({ name: table.name, count });
        } catch {
          tableStats.push({ name: table.name, count: -1 });
        }
      }

      return { databaseSize, tableStats };
    } catch (error) {
      this.logger.warn(`⚠️ Không thể lấy thống kê database: ${error.message}`);
      return { databaseSize: 'N/A', tableStats: [] };
    }
  }

  /**
   * Log kết quả sync thành công với chi tiết
   */
  private logSyncSuccess(duration: number, stats: { databaseSize: string; tableStats: { name: string; count: number }[] }) {
    const divider = '═'.repeat(50);
    
    this.logger.log(`\n${divider}`);
    this.logger.log(`✅ ĐỒNG BỘ DATABASE THÀNH CÔNG`);
    this.logger.log(`${divider}`);
    this.logger.log(`⏱️  Thời gian thực thi: ${this.formatDuration(duration)}`);
    this.logger.log(`💾 Dung lượng database: ${stats.databaseSize}`);
    this.logger.log(`📅 Thời điểm hoàn thành: ${new Date().toLocaleString('vi-VN', { timeZone: 'Asia/Ho_Chi_Minh' })}`);
    
    if (stats.tableStats.length > 0) {
      this.logger.log(`\n📊 THỐNG KÊ DỮ LIỆU:`);
      this.logger.log(`${'─'.repeat(35)}`);
      
      // Tính tổng records
      const totalRecords = stats.tableStats
        .filter(t => t.count >= 0)
        .reduce((sum, t) => sum + t.count, 0);
      
      // Hiển thị theo nhóm
      const businessTables = stats.tableStats.filter(t => 
        ['Khachhang', 'Sanpham', 'Donhang', 'Donhangsanpham', 'Nhacungcap', 'Dathang'].includes(t.name)
      );
      const priceTables = stats.tableStats.filter(t => 
        ['Banggia', 'Banggiasanpham'].includes(t.name)
      );
      const systemTables = stats.tableStats.filter(t => 
        ['User', 'Kho', 'Nhanvien', 'Menu', 'Permission', 'Role'].includes(t.name)
      );

      this.logger.log(`\n🏢 Dữ liệu kinh doanh:`);
      businessTables.forEach(t => {
        this.logger.log(`   ${t.name.padEnd(18)} : ${t.count >= 0 ? t.count.toLocaleString('vi-VN').padStart(10) : 'N/A'.padStart(10)} records`);
      });

      this.logger.log(`\n💰 Bảng giá:`);
      priceTables.forEach(t => {
        this.logger.log(`   ${t.name.padEnd(18)} : ${t.count >= 0 ? t.count.toLocaleString('vi-VN').padStart(10) : 'N/A'.padStart(10)} records`);
      });

      this.logger.log(`\n⚙️ Hệ thống:`);
      systemTables.forEach(t => {
        this.logger.log(`   ${t.name.padEnd(18)} : ${t.count >= 0 ? t.count.toLocaleString('vi-VN').padStart(10) : 'N/A'.padStart(10)} records`);
      });

      this.logger.log(`\n📈 TỔNG CỘNG: ${totalRecords.toLocaleString('vi-VN')} records`);
    }
    
    this.logger.log(`${divider}\n`);
  }

  /**
   * Format duration sang string dễ đọc
   */
  private formatDuration(ms: number): string {
    if (ms < 1000) return `${ms}ms`;
    if (ms < 60000) return `${(ms / 1000).toFixed(2)}s`;
    const minutes = Math.floor(ms / 60000);
    const seconds = ((ms % 60000) / 1000).toFixed(1);
    return `${minutes}m ${seconds}s`;
  }

  // Manual trigger endpoint (optional)
  async manualSync(): Promise<SyncStats> {
    this.logger.log('🔧 Đồng bộ thủ công được kích hoạt');
    return await this.syncDatabase();
  }

  /**
   * Lấy thông tin tổng quan database mà không sync
   */
  async getDatabaseInfo(): Promise<{ databaseSize: string; tableStats: { name: string; count: number }[] }> {
    return await this.getDatabaseStats();
  }
}
