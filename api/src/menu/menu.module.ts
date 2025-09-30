import { Module } from '@nestjs/common';
  import { MenuService } from './menu.service';
  import { MenuController } from './menu.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
  @Module({
    imports: [PrismaModule, AuthModule],
    controllers: [MenuController],
    providers: [MenuService],
    exports:[MenuService]
  })
  export class MenuModule {}