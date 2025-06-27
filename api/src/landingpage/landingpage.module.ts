import { Module } from '@nestjs/common';
import { landingPageService } from './landingpage.service';
import { LandingpageController } from './landingpage.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [LandingpageController],
    providers: [landingPageService,SocketGateway],
    exports:[landingPageService]
  })
  export class LandingPageModule {}