import { Module, Global } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { RedisModule } from '../src/redis/redis.module';

@Global()
@Module({
  imports: [RedisModule],
  providers: [PrismaService],
  exports: [PrismaService],
})
export class PrismaModule { }