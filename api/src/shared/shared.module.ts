import { Module } from '@nestjs/common';
import { TimezoneUtilService } from './services/timezone-util.service';

@Module({
  providers: [TimezoneUtilService],
  exports: [TimezoneUtilService],
})
export class SharedModule {}
