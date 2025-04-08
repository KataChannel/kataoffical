import { Module } from '@nestjs/common';
import { AffiliatelinkService } from './affiliatelink.service';
import { AffiliatelinkController } from './affiliatelink.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { TrackingeventModule } from 'src/trackingevent/trackingevent.module';

@Module({
  imports: [PrismaModule, ErrorlogModule, TrackingeventModule],
  controllers: [AffiliatelinkController],
  providers: [AffiliatelinkService, SocketGateway],
  exports: [AffiliatelinkService],
})
export class AffiliatelinkModule {}