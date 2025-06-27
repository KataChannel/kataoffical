import { Module } from '@nestjs/common';
import { GooglesheetService } from './googlesheet.service';
import { GooglesheetController } from './googlesheet.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [GooglesheetController],
    providers: [GooglesheetService,SocketGateway],
    exports:[GooglesheetService]
  })
  export class GooglesheetModule {}