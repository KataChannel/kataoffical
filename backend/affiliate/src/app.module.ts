import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MenuModule } from './menu/menu.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuditLogModule } from './auditlog/auditlog.module';
import { LandingPageModule } from './landingpage/landingpage.module';
import { TrackingeventModule } from './trackingevent/trackingevent.module';
import { ResourceModule } from './resource/resource.module';
import { FilemanagerModule } from './filemanager/filemanager.module';
import { AffiliatelinkModule } from './affiliatelink/affiliatelink.module';
@Module({
  imports: [
    AuthModule, 
    UserModule,
    PrismaModule,
    MenuModule,
    RoleModule,
    PermissionModule,
    ChatbotModule,
    AuditLogModule,
    LandingPageModule,
    TrackingeventModule,
    ResourceModule,
    FilemanagerModule,
    AffiliatelinkModule
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService],  
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuthMiddleware).forRoutes('*');
  }
}
