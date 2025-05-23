import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
  @Module({
    imports: [PrismaModule,ErrorlogsModule,ImportdataModule],
    controllers: [SanphamController],
    providers: [SanphamService,SocketGateway],
    exports:[SanphamService]
  })
  export class SanphamModule {}