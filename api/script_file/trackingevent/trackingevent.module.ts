import { Module } from '@nestjs/common';
import { TrackingeventService } from './trackingevent.service';
import { TrackingeventController } from './trackingevent.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [TrackingeventController],
  providers: [TrackingeventService, SocketGateway],
  exports: [TrackingeventService],
})
export class TrackingeventModule {}