import { Module } from '@nestjs/common';
import { LichhenService } from './lichhen.service'; 
import { LichhenController } from './lichhen.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [LichhenController],
  providers: [LichhenService, SocketGateway], 
  exports: [LichhenService] 
})
export class LichhenModule {}
