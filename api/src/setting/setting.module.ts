import { Module } from '@nestjs/common';
import { SettingService } from './setting.service';
import { SettingController } from './setting.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { SocketGateway } from './socket.gateway';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [SettingController],
    providers: [SettingService, SocketGateway],
    exports: [SettingService]
  })
  export class SettingModule {}