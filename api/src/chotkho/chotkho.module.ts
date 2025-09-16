import { Module } from '@nestjs/common';
import { ChotkhoService } from './chotkho.service'; 
import { ChotkhoController } from './chotkho.controller'; 
import { ChotkhoResolver } from './chotkho.resolver';
import { PrismaModule } from '../../prisma/prisma.module'; 
import { SocketGateway } from '../socket.gateway'; 
import { AuthModule } from '../auth/auth.module'; 
import { ErrorlogsService } from '../errorlogs/errorlogs.service';
import { SharedModule } from '../shared/shared.module';

@Module({
  imports: [PrismaModule, AuthModule, SharedModule], 
  controllers: [ChotkhoController],
  providers: [ChotkhoService, ChotkhoResolver, SocketGateway, ErrorlogsService], 
  exports: [ChotkhoService] 
})
export class ChotkhoModule {}
