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
import { DichvuModule } from './dichvu/dichvu.module';
import { DoanhsoModule } from './doanhso/doanhso.module';
import { DoanhthuModule } from './doanhthu/doanhthu.module';
import { HoahongModule } from './hoahong/hoahong.module';
import { ThanhtoanhoahongModule } from './thanhtoanhoahong/thanhtoanhoahong.module';
import { LichhenModule } from './lichhen/lichhen.module';
import { KhoahocModule } from './khoahoc/khoahoc.module';
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
    AffiliatelinkModule,
    DichvuModule,
    DoanhsoModule,
    DoanhthuModule,
    HoahongModule,
    ThanhtoanhoahongModule,
    KhoahocModule,
    LichhenModule
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
