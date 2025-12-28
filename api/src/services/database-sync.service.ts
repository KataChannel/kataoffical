import { Injectable, Logger } from '@nestjs/common';
import { exec } from 'child_process';
import * as cron from 'node-cron';
import * as path from 'path';
import { promisify } from 'util';

const execAsync = promisify(exec);

@Injectable()
export class DatabaseSyncService {
  private readonly logger = new Logger(DatabaseSyncService.name);

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

  async syncDatabase() {
    try {
      this.logger.log('🚀 Đang thực thi script đồng bộ database...');
      
      // Auto-detect script path: Docker hoặc Local
      // Use absolute path to avoid working directory issues
      const isProduction = process.env.NODE_ENV === 'production';
      const scriptPath = isProduction
        ? '/app/scripts/sync-database.sh'   // Docker container
        : path.resolve(__dirname, '../../scripts/sync-database.sh');  // Local development - absolute path
      
      this.logger.log(`📁 Script path: ${scriptPath}`);
      
      // Check if script exists
      const fs = await import('fs');
      if (!fs.existsSync(scriptPath)) {
        throw new Error(`Script không tồn tại: ${scriptPath}`);
      }
      
      const { stdout, stderr } = await execAsync(`bash ${scriptPath}`, {
        cwd: path.dirname(scriptPath),  // Set working directory to script's folder
        timeout: 300000  // 5 minutes timeout
      });
      
      if (stdout) {
        this.logger.log(`📋 Output: ${stdout}`);
      }
      
      if (stderr) {
        this.logger.warn(`⚠️  Warnings: ${stderr}`);
      }
      
      this.logger.log('✅ Hoàn thành đồng bộ database');
      return { success: true, timestamp: new Date(), output: stdout };
    } catch (error) {
      this.logger.error(`❌ Lỗi khi đồng bộ database: ${error.message}`);
      this.logger.error(error.stack);
      return { success: false, error: error.message };
    }
  }

  // Manual trigger endpoint (optional)
  async manualSync() {
    this.logger.log('🔧 Đồng bộ thủ công được kích hoạt');
    return await this.syncDatabase();
  }
}
