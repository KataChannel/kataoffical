import { Module } from '@nestjs/common';
import { BanggiaService } from './banggia.service'; 
import { BanggiaController } from './banggia.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [BanggiaController],
  providers: [BanggiaService, SocketGateway], 
  exports: [BanggiaService] 
})
export class BanggiaModule {}
