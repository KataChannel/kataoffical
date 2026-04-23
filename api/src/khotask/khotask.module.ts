import { Module } from '@nestjs/common';
import { KhotaskService } from './khotask.service';
import { KhotaskResolver } from './khotask.resolver';
import { PrismaModule } from '../../prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  providers: [KhotaskService, KhotaskResolver],
  exports: [KhotaskService]
})
export class KhotaskModule {}
