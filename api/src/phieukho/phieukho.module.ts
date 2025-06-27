import { Module } from '@nestjs/common';
import { PhieukhoService } from './phieukho.service'; 
import { PhieukhoController } from './phieukho.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [PhieukhoController],
  providers: [PhieukhoService, SocketGateway], 
  exports: [PhieukhoService] 
})
export class PhieukhoModule {}
