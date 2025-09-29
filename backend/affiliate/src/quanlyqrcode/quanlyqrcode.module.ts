import { Module } from '@nestjs/common';
import { QuanlyqrcodeService } from './quanlyqrcode.service';
import { QuanlyqrcodeController } from './quanlyqrcode.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ErrorlogModule } from 'src/errorlog/errorlog.module';
@Module({
    imports: [PrismaModule,ErrorlogModule],
    controllers: [QuanlyqrcodeController],
    providers: [QuanlyqrcodeService],
    exports:[QuanlyqrcodeService]
  })
  export class QuanlyqrcodeModule {}