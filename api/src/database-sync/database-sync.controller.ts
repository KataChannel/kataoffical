import { Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DatabaseSyncService } from '../services/database-sync.service';

@Controller('database-sync')
export class DatabaseSyncController {
  constructor(private readonly databaseSyncService: DatabaseSyncService) {}

  @Post('manual-sync')
  @UseGuards(JwtAuthGuard)
  async triggerManualSync() {
    await this.databaseSyncService.manualSync();
    return {
      success: true,
      message: 'Đồng bộ database đã được kích hoạt',
      timestamp: new Date().toISOString(),
    };
  }

  @Get('test-connection')
  async testConnection() {
    return {
      success: true,
      message: 'Database sync service is running',
      timestamp: new Date().toISOString(),
    };
  }
}
