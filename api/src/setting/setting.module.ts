import { Module } from '@nestjs/common';
import { SettingService } from './setting.service'; 
import { SettingController } from './setting.controller'; 
import { PrismaModule } from 'prisma/prisma.module'; 
import { SocketGateway } from 'src/socket.gateway'; 
import { AuthModule } from 'src/shared/auth/auth.module'; 
@Module({
  imports: [PrismaModule, AuthModule], 
  controllers: [SettingController],
  providers: [SettingService, SocketGateway], 
  exports: [SettingService] 
})
export class SettingModule {}
