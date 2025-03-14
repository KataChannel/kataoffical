import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GoogleDriveController } from './googledrive.controller';
import { GoogleDriveService } from './googledrive.service';
import { ChatbotModule } from 'src/chatbot/chatbot.module';
  @Module({
    imports: [PrismaModule,ChatbotModule],
    controllers: [GoogleDriveController],
    providers: [GoogleDriveService],
    exports:[GoogleDriveService]
  })
  export class GoogledriveModule {}