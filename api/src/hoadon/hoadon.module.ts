import { Module } from '@nestjs/common';
import { HoadonService } from './hoadon.service';
import { HoadonController } from './hoadon.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from './socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [HoadonController],
    providers: [HoadonService, SocketGateway],
    exports: [HoadonService] // Có thể cần điều chỉnh exports
  })
  export class HoadonModule {}
