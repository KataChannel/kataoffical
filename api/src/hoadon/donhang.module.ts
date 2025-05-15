import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { HoadonController } from './donhang.controller';
import { HoadonService } from './donhang.service';
import { SocketGateway } from 'src/socket.gateway';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [HoadonController],
  providers: [HoadonService, SocketGateway], 
  exports: [HoadonService] 
})
export class HoadonModule {}
