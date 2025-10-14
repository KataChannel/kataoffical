import { Module } from '@nestjs/common';
import { BanggiaService } from './banggia.service';
import { BanggiaController } from './banggia.controller';
import { BanggiaPriceHistoryService } from './banggia-price-history.service';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { SocketGateway } from 'src/socket.gateway';
import { ImportdataModule } from 'src/importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ErrorlogsModule, ImportdataModule, SharedModule, AuthModule],
  controllers: [BanggiaController],
  providers: [BanggiaService, BanggiaPriceHistoryService, SocketGateway],
  exports: [BanggiaService, BanggiaPriceHistoryService]
})
export class BanggiaModule {}