import { Module } from '@nestjs/common';
  import { DonhangService } from './donhang.service';
  import { DonhangController } from './donhang.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { RedisModule } from 'src/redis/redis.module';
  @Module({
    imports: [PrismaModule,RedisModule],
    controllers: [DonhangController],
    providers: [DonhangService],
    exports:[DonhangService]
  })
  export class DonhangModule {}