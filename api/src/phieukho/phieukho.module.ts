import { Module } from '@nestjs/common';
import { PhieukhoService } from './phieukho.service';
import { PhieukhoController } from './phieukho.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from '../importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
import { TonkhoManagerService } from '../common/tonkho-manager.service';

@Module({
  imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule],
  controllers: [PhieukhoController],
  providers: [PhieukhoService, TonkhoManagerService],
  exports: [PhieukhoService]
})
export class PhieukhoModule {}