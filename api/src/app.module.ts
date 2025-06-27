import { MiddlewareConsumer, Module, NestModule } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './shared/auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MenuModule } from './menu/menu.module';
import { KhachhangModule } from './khachhang/khachhang.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NhomkhachhangModule } from './nhomkhachhang/nhomkhachhang.module';
import { ChatbotModule } from './chatbot/chatbot.module';
import { AuditLogModule } from './shared/auditlog/auditlog.module';
import { MailModule } from './mail/mail.module';
import { QuanlydriveModule } from './quanlydrive/quanlydrive.module';
import { GooglesheetModule } from './googlesheet/googlesheet.module';
import { DexuatModule } from './dexuat/dexuat.module';
import { LandingPageModule } from './landingpage/landingpage.module';
import { SettingModule } from './setting/setting.module';
import { MinioModule } from './minio/minio.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { ResourceModule } from './resource/resource.module';
import { HoadonModule } from './hoadon/donhang.module';
import { HoadonchitietModule } from './hoadonchitiet/hoadonchitiet.module';
import { DanhmucModule } from './danhmuc/danhmuc.module';
import { DonhangModule } from './donhang/donhang.module';
import { BanggiaModule } from './banggia/banggia.module';
import { NhacungcapModule } from './nhacungcap/nhacungcap.module';
import { PhieukhoModule } from './phieukho/phieukho.module';
import { DathangModule } from './dathang/dathang.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './shared/interceptor/audit.interceptor';
import { AuditService } from './shared/auditlog/auditlog.service';
import { AuditMiddleware } from './shared/middleware/audit.middleware';
import { KhoModule } from './kho/kho.module';
import { CacheModule } from './shared/redis/cache.module';

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
    MailModule,
    QuanlydriveModule,
    GooglesheetModule,
    DexuatModule,
    LandingPageModule,
    SettingModule,
    HoadonchitietModule,
    HoadonModule,
    MinioModule,
    SanphamModule,
    ResourceModule,
    DanhmucModule,
    DonhangModule,
    BanggiaModule,
    NhacungcapModule,
    DathangModule,
    PhieukhoModule,
    KhoModule,
    CacheModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    AuditService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
  ],
  exports: [PrismaService],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
