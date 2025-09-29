import { Module } from '@nestjs/common';
import { DichvuService } from './dichvu.service'; 
import { DichvuController } from './dichvu.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DichvuController],
  providers: [DichvuService, SocketGateway], 
  exports: [DichvuService] 
})
export class DichvuModule {}
