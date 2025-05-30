import { Module } from '@nestjs/common';
import { ErrorlogService } from './errorlog.service';
import { ErrorlogController } from './errorlog.controller';
import { PrismaModule } from 'prisma/prisma.module';
  @Module({
    imports: [PrismaModule],
    controllers: [ErrorlogController],
    providers: [ErrorlogService],
    exports:[ErrorlogService]
  })
  export class ErrorlogModule {}