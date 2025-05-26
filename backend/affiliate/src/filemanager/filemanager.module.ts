import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { FilemanagerController } from './filemanager.controller';
import { fileManagerService } from './filemanager.service';
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [FilemanagerController],
  providers: [fileManagerService, SocketGateway], 
  exports: [fileManagerService] 
})
export class FilemanagerModule {}
