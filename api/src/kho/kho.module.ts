import { Module } from '@nestjs/common';
  import { khoService } from './kho.service';
  import { khoController } from './kho.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
  @Module({
    imports: [PrismaModule, AuthModule],
    controllers: [khoController],
    providers: [khoService],
    exports:[khoService]
  })
  export class khoModule {}