import { MiddlewareConsumer, Module } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { join } from 'path';
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
import { EmailModule } from './email/email.module';
// import { KhachhangModule } from './khachhang/khachhang.module';
import { NhomkhachhangModule } from './nhomkhachhang/nhomkhachhang.module';
import { DexuatModule } from './dexuat/dexuat.module';
import { QuanlydriveModule } from './quanlydrive/quanlydrive.module';
import { QuanlyqrcodeModule } from './quanlyqrcode/quanlyqrcode.module';
import { GooglesheetModule } from './googlesheet/googlesheet.module';
import { MailModule } from './mail/mail.module';
import { GraphQLResolversModule } from './graphql/graphql.module';
@Module({
  imports: [
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      sortSchema: true,
      playground: true,
      introspection: true,
      context: ({ req }) => ({ req }),
    }),
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
    LichhenModule,
    EmailModule,
    // KhachhangModule,
    NhomkhachhangModule,
    DexuatModule,
    QuanlydriveModule,
    QuanlyqrcodeModule,
    GooglesheetModule,
    MailModule,
    GraphQLResolversModule
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
