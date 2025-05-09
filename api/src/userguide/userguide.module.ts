import { Module } from '@nestjs/common';
import { UserguideService } from './userguide.service';
import { UserguideController } from './userguide.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { SocketGateway } from './socket.gateway';
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { AuthModule } from 'src/auth/auth.module';
@Module({
  imports: [AuthModule,PrismaModule, ErrorlogsModule],
  controllers: [UserguideController],
  providers: [UserguideService, SocketGateway],
  exports: [UserguideService]
})
export class UserguideModule {}