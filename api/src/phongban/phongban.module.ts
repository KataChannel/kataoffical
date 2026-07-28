import { Module } from '@nestjs/common';
import { PhongbanService } from './phongban.service';
import { PhongbanController } from './phongban.controller';
import { PhongbanResolver } from './phongban.resolver';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [PhongbanController],
  providers: [PhongbanService, PhongbanResolver],
  exports: [PhongbanService]
})
export class PhongbanModule {}
