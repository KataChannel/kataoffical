import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MenuModule } from './menu/menu.module';
import { KhachhangModule } from './khachhang/khachhang.module';
import { AuthMiddleware } from './middleware/auth.middleware';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NhomkhachhangModule } from './nhomkhachhang/nhomkhachhang.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuditLogModule } from './auditlog/auditlog.module';
import { MailModule } from './mail/mail.module';
import { QuanlyqrcodeModule } from './quanlyqrcode/quanlyqrcode.module';
import { QuanlydriveModule } from './quanlydrive/quanlydrive.module';
import { GooglesheetModule } from './googlesheet/googlesheet.module';
import { DexuatModule } from './dexuat/dexuat.module';
import { LandingPageModule } from './landingpage/landingpage.module';
import { SettingModule } from './setting/setting.module';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
import { HoadonModule } from './hoadon/hoadon.module';
@Module({
  imports: [
    AuthModule, 
    UserModule,
    PrismaModule,
    MenuModule,
    KhachhangModule,
    NhomkhachhangModule,
    RoleModule,
    PermissionModule,
    ChatbotModule,
    AuditLogModule,
    QuanlyqrcodeModule,
    MailModule,
    QuanlydriveModule,
    GooglesheetModule,
    DexuatModule,
    LandingPageModule,
    SettingModule,
    HoadonchitietModule,
    HoadonModule
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
