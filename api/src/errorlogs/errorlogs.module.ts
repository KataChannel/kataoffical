import { Module } from '@nestjs/common';
import { ErrorlogsService } from './errorlogs.service';
import { ErrorlogsController } from './errorlogs.controller';
import { PrismaModule } from 'prisma/prisma.module';
  @Module({
    imports: [PrismaModule],
    controllers: [ErrorlogsController],
    providers: [ErrorlogsService],
    exports:[ErrorlogsService]
  })
  export class ErrorlogsModule {}