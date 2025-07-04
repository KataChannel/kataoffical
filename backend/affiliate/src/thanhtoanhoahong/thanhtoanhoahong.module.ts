import { Module } from '@nestjs/common';
import { ThanhtoanhoahongService } from './thanhtoanhoahong.service'; 
import { ThanhtoanhoahongController } from './thanhtoanhoahong.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [ThanhtoanhoahongController],
  providers: [ThanhtoanhoahongService, SocketGateway], 
  exports: [ThanhtoanhoahongService] 
})
export class ThanhtoanhoahongModule {}
