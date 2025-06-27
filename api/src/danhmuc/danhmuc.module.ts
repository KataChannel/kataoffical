import { Module } from '@nestjs/common';
import { DanhmucService } from './danhmuc.service'; 
import { DanhmucController } from './danhmuc.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [DanhmucController],
  providers: [DanhmucService, SocketGateway], 
  exports: [DanhmucService] 
})
export class DanhmucModule {}
