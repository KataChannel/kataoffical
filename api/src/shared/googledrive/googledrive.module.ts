import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { GoogleDriveController } from './googledrive.controller';
import { GoogleDriveService } from './googledrive.service';
  @Module({
    imports: [PrismaModule],
    controllers: [GoogleDriveController],
    providers: [GoogleDriveService],
    exports:[GoogleDriveService]
  })
  export class GoogledriveModule {}