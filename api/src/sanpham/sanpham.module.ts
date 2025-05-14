import { Module } from '@nestjs/common';
import { SanphamService } from './sanpham.service';
import { SanphamController } from './sanpham.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from '../socket.gateway';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { AuthModule } from 'src/auth/auth.module';

@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule],
  controllers: [SanphamController],
  providers: [SanphamService, SocketGateway],
  exports: [SanphamService]
})
export class SanphamModule {}