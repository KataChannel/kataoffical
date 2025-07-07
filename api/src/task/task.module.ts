import { Module } from '@nestjs/common';
import { taskService } from './task.service';
import { taskController } from './task.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [taskController],
    providers: [taskService,SocketGateway],
    exports:[taskService]
  })
  export class taskModule {}