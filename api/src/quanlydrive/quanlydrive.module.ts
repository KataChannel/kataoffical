import { Module } from '@nestjs/common';
import { QuanlydriveService } from './quanlydrive.service';
import { QuanlydriveController } from './quanlydrive.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [QuanlydriveController],
    providers: [QuanlydriveService,SocketGateway],
    exports:[QuanlydriveService]
  })
  export class QuanlydriveModule {}