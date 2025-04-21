import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaModule } from 'prisma/prisma.module';
import { PrismaService } from 'prisma/prisma.service';
import { AuditLogModule } from './auditlog/auditlog.module';
import { MenuModule } from './menu/menu.module';
@Module({
  imports: [
    PrismaModule,
    MenuModule,
    AuditLogModule,
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService],  
  exports: [PrismaService],
})
export class AppModule {

}
