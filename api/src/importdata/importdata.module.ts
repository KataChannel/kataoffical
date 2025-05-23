import { Module } from '@nestjs/common';
import { ImportdataService } from './importdata.service'; 
import { ImportdataController } from './importdata.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
import { ErrorlogsModule } from 'src/errorlogs/errorlogs.module';
import { SocketGateway } from './socket.gateway';
@Module({
  imports: [PrismaModule, ErrorlogsModule, AuthModule], 
  controllers: [ImportdataController],
  providers: [ImportdataService,SocketGateway], 
  exports: [ImportdataService] 
})
export class ImportdataModule {}
