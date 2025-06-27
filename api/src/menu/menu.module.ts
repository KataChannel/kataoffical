import { Module } from '@nestjs/common';
import { MenuService } from './menu.service';
import { MenuController } from './menu.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [MenuController],
    providers: [MenuService,SocketGateway],
    exports:[MenuService]
  })
  export class MenuModule {}