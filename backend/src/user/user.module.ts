import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
@Module({
  imports: [AuthModule, ErrorlogModule],
  controllers: [UserController],
  providers: [UserService, PrismaService,SocketGateway],
  exports: [UserService],
})
export class UserModule {}
