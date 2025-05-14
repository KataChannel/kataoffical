import { Module } from '@nestjs/common';
import { PermissionService } from './permission.service';
import { PermissionController } from './permission.controller';
import { PrismaModule } from 'prisma/prisma.module'; // Giả sử đường dẫn này là cố định
import { SocketGateway } from './socket.gateway'; // Nằm trong cùng thư mục module
import { AuthModule } from 'src/auth/auth.module'; // Giả sử đường dẫn này là cố định
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';

@Module({
  imports: [PrismaModule, ErrorlogsModule, AuthModule],
  controllers: [PermissionController],
  providers: [PermissionService, SocketGateway],
  exports: [PermissionService]
})
export class PermissionModule {}