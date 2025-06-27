import { Module } from '@nestjs/common';
import { DonhangService } from './donhang.service'; 
import { DonhangController } from './donhang.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [DonhangController],
  providers: [DonhangService, SocketGateway], 
  exports: [DonhangService] 
})
export class DonhangModule {}
