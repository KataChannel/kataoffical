import { Module } from '@nestjs/common';
import { BanggiaService } from './banggia.service';
import { BanggiaController } from './banggia.controller';
import { BanggiaPriceHistoryService } from './banggia-price-history.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogsModule } from '../errorlogs/errorlogs.module';
import { SocketGateway } from '../socket.gateway';
import { ImportdataModule } from '../importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, ErrorlogsModule, ImportdataModule, SharedModule, AuthModule],
  controllers: [BanggiaController],
  providers: [BanggiaService, BanggiaPriceHistoryService, SocketGateway],
  exports: [BanggiaService, BanggiaPriceHistoryService]
})
export class BanggiaModule {}