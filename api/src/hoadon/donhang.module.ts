import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
import { HoadonController } from './donhang.controller';
import { HoadonService } from './donhang.service';
import { SocketGateway } from 'src/socket.gateway';
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [HoadonController],
  providers: [HoadonService, SocketGateway], 
  exports: [HoadonService] 
})
export class HoadonModule {}
