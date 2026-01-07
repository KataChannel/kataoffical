import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { ARDocumentController } from './ar-document.controller';
import { ARDocumentService } from './ar-document.service';

@Module({
  imports: [PrismaModule],
  controllers: [ARDocumentController],
  providers: [ARDocumentService],
  exports: [ARDocumentService],
})
export class ARDocumentModule {}
