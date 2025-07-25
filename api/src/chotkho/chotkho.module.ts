import { Module } from '@nestjs/common';
import { ChotkhoService } from './chotkho.service'; 
import { ChotkhoController } from './chotkho.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { ErrorlogsService } from 'src/errorlogs/errorlogs.service';

@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [ChotkhoController],
  providers: [ChotkhoService, SocketGateway, ErrorlogsService], 
  exports: [ChotkhoService] 
})
export class ChotkhoModule {}
