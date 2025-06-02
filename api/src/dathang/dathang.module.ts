import { Module } from '@nestjs/common';
import { DathangService } from './dathang.service'; 
import { DathangController } from './dathang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DathangController],
  providers: [DathangService, SocketGateway], 
  exports: [DathangService] 
})
export class DathangModule {}
