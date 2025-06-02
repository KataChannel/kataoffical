import { Module } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service'; 
import { DanhmucController } from './danhmuc.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DanhmucController],
  providers: [DanhmucService, SocketGateway], 
  exports: [DanhmucService] 
})
export class DanhmucModule {}
