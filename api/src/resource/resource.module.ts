import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';

@Module({
  imports: [PrismaModule, ErrorlogModule],
  controllers: [ResourceController],
  providers: [ResourceService, SocketGateway],
  exports: [ResourceService]
})
export class ResourceModule {}