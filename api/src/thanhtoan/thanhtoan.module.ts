import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { ThanhToanController } from './thanhtoan.controller';
import { ThanhToanService } from './thanhtoan.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ThanhToanController],
  providers: [ThanhToanService],
  exports: [ThanhToanService],
})
export class ThanhToanModule {}
