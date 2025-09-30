import { Module } from '@nestjs/common';
import { RoleService } from './role.service';
import { RoleController } from './role.controller';
import { PrismaModule } from 'prisma/prisma.module';
import { AuthModule } from 'src/auth/auth.module';
  @Module({
    imports: [PrismaModule, AuthModule],
    controllers: [RoleController],
    providers: [RoleService],
    exports:[RoleService]
  })
  export class RoleModule {}