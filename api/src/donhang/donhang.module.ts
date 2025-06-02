import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service'; 
import { DonhangController } from './donhang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [DonhangController],
  providers: [DonhangService, SocketGateway], 
  exports: [DonhangService] 
})
export class DonhangModule {}
