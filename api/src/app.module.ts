import { Module } from '@nestjs/common';
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
    NhacungcapModule,
    DathangModule,
    khoModule,
    PhieukhoModule
  ],
  controllers: [AppController],
  providers: [AppService,PrismaService],  
  exports: [PrismaService],
})
export class AppModule {}
