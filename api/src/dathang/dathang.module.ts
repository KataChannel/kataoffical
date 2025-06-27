import { Module } from '@nestjs/common';
import { DathangService } from './dathang.service'; 
import { DathangController } from './dathang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [DathangController],
  providers: [DathangService, SocketGateway], 
  exports: [DathangService] 
})
export class DathangModule {}
