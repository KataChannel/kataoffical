import { Module } from '@nestjs/common';
  import { BanggiaService } from './banggia.service';
  import { BanggiaController } from './banggia.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { SocketGateway } from 'src/socket.gateway';
import { ImportdataModule } from 'src/importdata/importdata.module';
  @Module({
    imports: [PrismaModule,ErrorlogsModule,ImportdataModule],
    controllers: [BanggiaController],
    providers: [BanggiaService,SocketGateway],
    exports:[BanggiaService]
  })
  export class BanggiaModule {}