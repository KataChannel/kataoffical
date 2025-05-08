import { Module } from '@nestjs/common';
import { hoadonChitietService } from './hoadonchitiet.service';
import { HoadonchitietController } from './hoadonchitiet.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { SocketGateway } from './socket.gateway';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [HoadonchitietController],
    providers: [hoadonChitietService,SocketGateway],
    exports: [hoadonChitietService] // Có thể cần điều chỉnh exports
  })
  export class HoadonchitietModule {}
