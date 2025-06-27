import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service'; 
import { SanphamController } from './sanpham.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [SanphamController],
  providers: [SanphamService, SocketGateway], 
  exports: [SanphamService] 
})
export class SanphamModule {}
