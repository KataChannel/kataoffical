import { Module } from '@nestjs/common';
import { UserguideService } from './userguide.service';
import { UserguideController } from './userguide.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsModule } from '../errorlogs/errorlogs.module';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [AuthModule,PrismaModule, ErrorlogsModule],
  controllers: [UserguideController],
  providers: [UserguideService, SocketGateway],
  exports: [UserguideService]
})
export class UserguideModule {}