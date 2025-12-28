import { Module } from '@nestjs/common';
import { AuthModule } from '../auth/auth.module';
import { DatabaseSyncService } from '../services/database-sync.service';
import { DatabaseSyncController } from './database-sync.controller';

@Module({
  imports: [AuthModule],
  controllers: [DatabaseSyncController],
  providers: [DatabaseSyncService],
  exports: [DatabaseSyncService],
})
export class DatabaseSyncModule {}
