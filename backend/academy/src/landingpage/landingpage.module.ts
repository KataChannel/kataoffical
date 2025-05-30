import { Module } from '@nestjs/common';
import { landingPageService } from './landingpage.service';
import { LandingpageController } from './landingpage.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [LandingpageController],
    providers: [landingPageService,SocketGateway],
    exports:[landingPageService]
  })
  export class LandingPageModule {}