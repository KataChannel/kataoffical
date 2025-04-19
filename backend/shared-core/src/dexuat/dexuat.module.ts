import { Module } from '@nestjs/common';
import { DexuatService } from './dexuat.service';
import { DexuatController } from './dexuat.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
  @Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [DexuatController],
    providers: [DexuatService,SocketGateway],
    exports:[DexuatService]
  })
  export class DexuatModule {}