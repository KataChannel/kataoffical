import { Module } from '@nestjs/common';
import { affiliateLinkService } from './affiliatelink.service'; 
import { AffiliatelinkController } from './affiliatelink.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { APP_INTERCEPTOR } from '@nestjs/core';
import { CreatedByInterceptor } from 'src/interceptor/created-by.interceptor';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [AffiliatelinkController],
  providers: [
    affiliateLinkService, 
    SocketGateway,
    {
      provide: APP_INTERCEPTOR,
      useClass: CreatedByInterceptor,
    },
  ], 
  exports: [affiliateLinkService] 
})
export class AffiliatelinkModule {}
