import { Module } from '@nestjs/common';
import { DoanhsoService } from './doanhso.service'; 
import { DoanhsoController } from './doanhso.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DoanhsoController],
  providers: [DoanhsoService, SocketGateway], 
  exports: [DoanhsoService] 
})
export class DoanhsoModule {}
