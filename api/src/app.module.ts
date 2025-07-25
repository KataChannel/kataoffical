import { MiddlewareConsumer, Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { UserModule } from './user/user.module';
import { PrismaModule } from '../prisma/prisma.module';
import { PrismaService } from '../prisma/prisma.service';
import { MenuModule } from './menu/menu.module';
import { SanphamModule } from './sanpham/sanpham.module';
import { BanggiaModule } from './banggia/banggia.module';
import { DonhangModule } from './donhang/donhang.module';
import { KhachhangModule } from './khachhang/khachhang.module';
import { NhacungcapModule } from './nhacungcap/nhacungcap.module';
import { DathangModule } from './dathang/dathang.module';
import { khoModule } from './kho/kho.module';
import { PhieukhoModule } from './phieukho/phieukho.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NhomkhachhangModule } from './nhomkhachhang/nhomkhachhang.module';
import { GoogledriveModule } from './shared/googledrive/googledrive.module';
import { ErrorlogsModule } from './errorlogs/errorlogs.module';
import { CallbackModule } from './callback/callback.module';
import { DashboardModule } from './dashboard/dashboard.module';
import { UserguideModule } from './userguide/userguide.module';
import { ImportdataModule } from './importdata/importdata.module';
import { APP_INTERCEPTOR } from '@nestjs/core';
import { AuditInterceptor } from './auditlog/audit.interceptor';
import { AuditService } from './auditlog/auditlog.service';
import { AuditLogModule } from './auditlog/auditlog.module';
import { AuditMiddleware } from './auditlog/audit.middleware';
import { ChotkhoModule } from './chotkho/chotkho.module';

@Module({
  imports: [
    AuthModule, 
    UserModule,
    PrismaModule,
    MenuModule,
    SanphamModule,
    BanggiaModule,
    DonhangModule,
    KhachhangModule,
    NhomkhachhangModule,
    NhacungcapModule,
    DathangModule,
    khoModule,
    PhieukhoModule,
    RoleModule,
    PermissionModule,
    GoogledriveModule,
    ErrorlogsModule,
    CallbackModule,
    DashboardModule,
    UserguideModule,
    ImportdataModule,
    AuditLogModule,
    ChotkhoModule
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    AuditService,
  ],
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(AuditMiddleware).forRoutes('*');
  }
}
