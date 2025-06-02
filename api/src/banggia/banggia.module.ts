import { Module } from '@nestjs/common';
import { BanggiaService } from './banggia.service'; 
import { BanggiaController } from './banggia.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [BanggiaController],
  providers: [BanggiaService, SocketGateway], 
  exports: [BanggiaService] 
})
export class BanggiaModule {}
