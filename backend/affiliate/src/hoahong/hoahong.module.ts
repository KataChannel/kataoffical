import { Module } from '@nestjs/common';
import { HoahongService } from './hoahong.service'; 
import { HoahongController } from './hoahong.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [HoahongController],
  providers: [HoahongService, SocketGateway], 
  exports: [HoahongService] 
})
export class HoahongModule {}
