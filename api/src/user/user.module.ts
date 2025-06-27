import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
import { AuthModule } from 'src/shared/auth/auth.module';
import { AuditService } from 'src/shared/auditlog/auditlog.service';
@Module({
  imports: [AuthModule],
  controllers: [UserController],
  providers: [UserService, PrismaService,SocketGateway,AuditService],
  exports: [UserService],
})
export class UserModule {}
