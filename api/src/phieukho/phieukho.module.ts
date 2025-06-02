import { Module } from '@nestjs/common';
import { PhieukhoService } from './phieukho.service'; 
import { PhieukhoController } from './phieukho.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [PhieukhoController],
  providers: [PhieukhoService, SocketGateway], 
  exports: [PhieukhoService] 
})
export class PhieukhoModule {}
