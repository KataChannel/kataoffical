import { Module } from '@nestjs/common'; 
import { KhachhangController } from './khachhang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { SocketGateway } from 'src/socket.gateway';
import { khachHangService } from './khachhang.service';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [KhachhangController],
  providers: [khachHangService, SocketGateway], 
  exports: [khachHangService] 
})
export class KhachhangModule {}
