import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway';
import { ErrorlogsModule } from '../errorlogs/errorlogs.module';
import { ImportdataModule } from '../importdata/importdata.module';
import { SharedModule } from '../shared/shared.module';
import { AuthModule } from '../auth/auth.module';
  @Module({
    imports: [PrismaModule, ErrorlogsModule, ImportdataModule, SharedModule, AuthModule],
    controllers: [SanphamController],
    providers: [SanphamService,SocketGateway],
    exports:[SanphamService]
  })
  export class SanphamModule {}