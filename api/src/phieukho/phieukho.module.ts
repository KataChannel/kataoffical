import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
import { TonkhoManagerService } from 'src/common/tonkho-manager.service';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { PhieukhoController } from './phieukho.controller';
import { PhieukhoService } from './phieukho.service';
@Module({
  imports: [PrismaModule, ImportdataModule, SharedModule, AuthModule],
  controllers: [PhieukhoController],
  providers: [PhieukhoService, TonkhoManagerService],
  exports: [PhieukhoService],
})
export class PhieukhoModule {}
