import { Module } from '@nestjs/common';
import { KhoService } from './kho.service'; 
import { KhoController } from './kho.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [KhoController],
  providers: [KhoService, SocketGateway], 
  exports: [KhoService] 
})
export class KhoModule {}
