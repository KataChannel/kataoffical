import { Module } from '@nestjs/common';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from '../auth/auth.module';
import { ARDocumentController } from './ar-document.controller';
import { ARDocumentService } from './ar-document.service';

@Module({
  imports: [PrismaModule, AuthModule],
  controllers: [ARDocumentController],
  providers: [ARDocumentService],
  exports: [ARDocumentService],
})
export class ARDocumentModule {}
