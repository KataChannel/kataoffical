import { Module } from '@nestjs/common';
import { NhacungcapService } from './nhacungcap.service'; 
import { NhacungcapController } from './nhacungcap.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [NhacungcapController],
  providers: [NhacungcapService, SocketGateway], 
  exports: [NhacungcapService] 
})
export class NhacungcapModule {}
