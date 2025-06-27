import { Module } from '@nestjs/common';
import { KhoService } from './kho.service'; 
import { KhoController } from './kho.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [KhoController],
  providers: [KhoService, SocketGateway], 
  exports: [KhoService] 
})
export class KhoModule {}
