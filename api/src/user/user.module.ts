import { Module } from '@nestjs/common';
import { UserService } from './user.service';
import { UserController } from './user.controller';
import { PrismaService } from 'prisma/prisma.service';
import { SocketGateway } from 'src/socket.gateway';
import { AuthModule } from 'src/auth/auth.module';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
import { AuditService } from 'src/auditlog/auditlog.service';
@Module({
  imports: [AuthModule, ErrorlogModule],
  controllers: [UserController],
  providers: [UserService, PrismaService,SocketGateway,AuditService],
  exports: [UserService],
})
export class UserModule {}
