import { Module } from '@nestjs/common';
import { KhoahocService } from './khoahoc.service'; 
import { KhoahocController } from './khoahoc.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [KhoahocController],
  providers: [KhoahocService, SocketGateway], 
  exports: [KhoahocService] 
})
export class KhoahocModule {}
