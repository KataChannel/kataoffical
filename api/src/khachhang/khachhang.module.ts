import { Module } from '@nestjs/common';
import { KhachhangService } from './khachhang.service'; 
import { KhachhangController } from './khachhang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [KhachhangController],
  providers: [KhachhangService, SocketGateway], 
  exports: [KhachhangService] 
})
export class KhachhangModule {}
