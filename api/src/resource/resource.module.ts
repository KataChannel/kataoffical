import { Module } from '@nestjs/common';
import { ResourceService } from './resource.service';
import { ResourceController } from './resource.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { MinioModule } from 'src/minio/minio.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ErrorlogModule,MinioModule,AuthModule],
  controllers: [ResourceController],
    providers: [ResourceService, SocketGateway],
    exports: [ResourceService]
})
export class ResourceModule {}