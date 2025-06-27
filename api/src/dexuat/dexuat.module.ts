import { Module } from '@nestjs/common';
import { DexuatService } from './dexuat.service';
import { DexuatController } from './dexuat.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from 'src/socket.gateway';
  @Module({
    imports: [PrismaModule],
    controllers: [DexuatController],
    providers: [DexuatService,SocketGateway],
    exports:[DexuatService]
  })
  export class DexuatModule {}