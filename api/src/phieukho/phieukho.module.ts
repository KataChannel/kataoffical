import { Module } from '@nestjs/common';
  import { PhieukhoService } from './phieukho.service';
  import { PhieukhoController } from './phieukho.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { ImportdataModule } from 'src/importdata/importdata.module';
  @Module({
    imports: [PrismaModule,ImportdataModule],
    controllers: [PhieukhoController],
    providers: [PhieukhoService],
    exports:[PhieukhoService]
  })
  export class PhieukhoModule {}