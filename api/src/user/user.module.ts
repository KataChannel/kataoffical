import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { SocketGateway } from '../socket.gateway';
import { AuthModule } from '../auth/auth.module';
@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, SocketGateway],
  exports: [UserService],
})
export class UserModule { }
