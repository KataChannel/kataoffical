import { Module } from '@nestjs/common';
import { leadService } from './lead.service';
import { leadController } from './lead.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [leadController],
    providers: [leadService,SocketGateway],
    exports:[leadService]
  })
  export class leadModule {}