import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
import { SocketGateway } from 'src/socket.gateway';
import { HoadonchitietController } from './hoadonchitiet.controller';
import { HoadonchitietService } from './hoadonchitiet.service';
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [HoadonchitietController],
  providers: [HoadonchitietService, SocketGateway], 
  exports: [HoadonchitietService] 
})
export class HoadonchitietModule {}
