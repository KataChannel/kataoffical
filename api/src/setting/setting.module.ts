import { Module } from '@nestjs/common';
import { SettingService } from './setting.service'; 
import { SettingController } from './setting.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { ErrorlogModule } from 'src/errorlog/errorlog.module'; 
import { AuthModule } from 'src/auth/auth.module'; 
@Module({
  imports: [PrismaModule, ErrorlogModule, AuthModule], 
  controllers: [SettingController],
  providers: [SettingService, SocketGateway], 
  exports: [SettingService] 
})
export class SettingModule {}
