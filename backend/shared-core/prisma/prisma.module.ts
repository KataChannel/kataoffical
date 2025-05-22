import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';
import { VttechPrismaService } from './vttech.prisma.service';
@Module({
  providers: [PrismaService,VttechPrismaService],
  exports: [PrismaService,VttechPrismaService],  // Quan trọng: Xuất để module khác có thể sử dụng
})
export class PrismaModule {}