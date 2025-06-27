import { Module } from '@nestjs/common';
import { KhachhangService } from './khachhang.service'; 
import { KhachhangController } from './khachhang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [KhachhangController],
  providers: [KhachhangService, SocketGateway], 
  exports: [KhachhangService] 
})
export class KhachhangModule {}
