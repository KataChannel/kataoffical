import { Module } from '@nestjs/common';
import { DoanhthuService } from './doanhthu.service'; 
import { DoanhthuController } from './doanhthu.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DoanhthuController],
  providers: [DoanhthuService, SocketGateway], 
  exports: [DoanhthuService] 
})
export class DoanhthuModule {}
