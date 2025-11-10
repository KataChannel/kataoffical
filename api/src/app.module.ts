import { MiddlewareConsumer, Module } from '@nestjs/common';
import { ScheduleModule } from '@nestjs/schedule';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Reflector } from '@nestjs/core';
import { join } from 'path';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TestResolver } from './test/test.resolver';
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
import { ChotkhoModule } from './chotkho/chotkho.module';
import { PhieukhoModule } from './phieukho/phieukho.module';
import { RoleModule } from './role/role.module';
import { PermissionModule } from './permission/permission.module';
import { NhomkhachhangModule } from './nhomkhachhang/nhomkhachhang.module';
import { NhanvienModule } from './nhanvien/nhanvien.module';
import { GoogledriveModule } from './shared/googledrive/googledrive.module';
import { SharedModule } from './shared/shared.module';
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
import { AuditUserValidationMiddleware } from './auditlog/audit-user-validation.middleware';
import { CacheInterceptor } from './common/cache.interceptor';
import { PerformanceInterceptor } from './shared/interceptors/performance.interceptor';
// import { UploadModule } from './upload/upload.module';
// import { MinioModule } from './minio/minio.module';
import { GraphQLUniversalModule } from './graphql/graphql.module';
import { RedisModule } from './redis/redis.module';
import { UserPermissionModule } from './user-permission/user-permission.module';
import { SupportModule } from './support/support.module';
import { CacheModule } from './cache/cache.module';
@Module({
  imports: [
    ScheduleModule.forRoot(),
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      // typePaths: ['./**/*.graphql'], // Comment out to use code-first approach
      autoSchemaFile: join(process.cwd(), 'src/schema.gql'),
      // definitions: {
      //   path: join(process.cwd(), 'src/graphql.ts'),
      //   outputAs: 'class',
      // },
      playground: true,
      introspection: true,
      context: ({ req, res }) => ({ req, res }),
      formatError: (error) => {
        console.error('GraphQL Error:', error);
        return {
          message: error.message,
          locations: error.locations,
          path: error.path,
          extensions: {
            code: error.extensions?.code,
            timestamp: new Date().toISOString(),
          },
        };
      },
    }),
    AuthModule, 
    UserModule,
    PrismaModule,
    MenuModule,
    SanphamModule,
    BanggiaModule,
    DonhangModule,
    KhachhangModule,
    NhomkhachhangModule,
    NhanvienModule,
    NhacungcapModule,
    DathangModule,
    khoModule,
    PhieukhoModule,
    RoleModule,
    PermissionModule,
    UserPermissionModule,
    GoogledriveModule,
    SharedModule,
    ErrorlogsModule,
    CallbackModule,
    DashboardModule,
    UserguideModule,
    ImportdataModule,    
    AuditLogModule,
    RedisModule,
    CacheModule,
    ChotkhoModule,
    // UploadModule,
    // MinioModule,
    GraphQLUniversalModule,
    SupportModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    PrismaService,
    TestResolver,
    Reflector,
    {
      provide: APP_INTERCEPTOR,
      useClass: AuditInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: CacheInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: PerformanceInterceptor,
    },
    AuditService,
  ],
  exports: [PrismaService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(AuditUserValidationMiddleware)
      .forRoutes('*');
    consumer
      .apply(AuditMiddleware)
      .forRoutes('*');
  }
}
