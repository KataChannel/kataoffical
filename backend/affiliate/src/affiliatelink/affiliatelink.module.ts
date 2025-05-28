import { Module } from '@nestjs/common';
import { affiliateLinkService } from './affiliatelink.service'; 
import { AffiliatelinkController } from './affiliatelink.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [AffiliatelinkController],
  providers: [affiliateLinkService, SocketGateway], 
  exports: [affiliateLinkService] 
})
export class AffiliatelinkModule {}
