import { Module } from '@nestjs/common';
import { UserguideService } from './userguide.service';
import { UserguideController } from './userguide.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway'; // Giả định SocketGateway ở ngoài thư mục module specific
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [UserguideController],
    providers: [UserguideService],
    exports: [UserguideService, SocketGateway] // Có thể cần điều chỉnh exports
  })
  export class UserguideModule {}
