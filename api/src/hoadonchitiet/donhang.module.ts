import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { SocketGateway } from 'src/socket.gateway';
import { HoadonchitietController } from './donhang.controller';
import { HoadonchitietService } from './donhang.service';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [HoadonchitietController],
  providers: [HoadonchitietService, SocketGateway], 
  exports: [HoadonchitietService] 
})
export class HoadonchitietModule {}
