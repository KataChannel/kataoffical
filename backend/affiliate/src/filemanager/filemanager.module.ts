import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { FilemanagerController } from './filemanager.controller';
import { fileManagerService } from './filemanager.service';
import { MinioModule } from 'src/minio/minio.module';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule,MinioModule], 
  controllers: [FilemanagerController],
  providers: [fileManagerService, SocketGateway], 
  exports: [fileManagerService] 
})
export class FilemanagerModule {}
