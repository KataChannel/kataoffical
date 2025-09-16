"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const common_1 = require("@nestjs/common");
const schedule_1 = require("@nestjs/schedule");
const graphql_1 = require("@nestjs/graphql");
const apollo_1 = require("@nestjs/apollo");
const core_1 = require("@nestjs/core");
const path_1 = require("path");
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const test_resolver_1 = require("./test/test.resolver");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const menu_module_1 = require("./menu/menu.module");
const sanpham_module_1 = require("./sanpham/sanpham.module");
const banggia_module_1 = require("./banggia/banggia.module");
const donhang_module_1 = require("./donhang/donhang.module");
const khachhang_module_1 = require("./khachhang/khachhang.module");
const nhacungcap_module_1 = require("./nhacungcap/nhacungcap.module");
const dathang_module_1 = require("./dathang/dathang.module");
const kho_module_1 = require("./kho/kho.module");
const phieukho_module_1 = require("./phieukho/phieukho.module");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const nhomkhachhang_module_1 = require("./nhomkhachhang/nhomkhachhang.module");
const googledrive_module_1 = require("./shared/googledrive/googledrive.module");
const shared_module_1 = require("./shared/shared.module");
const errorlogs_module_1 = require("./errorlogs/errorlogs.module");
const callback_module_1 = require("./callback/callback.module");
const dashboard_module_1 = require("./dashboard/dashboard.module");
const userguide_module_1 = require("./userguide/userguide.module");
const importdata_module_1 = require("./importdata/importdata.module");
const core_2 = require("@nestjs/core");
const audit_interceptor_1 = require("./auditlog/audit.interceptor");
const auditlog_service_1 = require("./auditlog/auditlog.service");
const auditlog_module_1 = require("./auditlog/auditlog.module");
const audit_middleware_1 = require("./auditlog/audit.middleware");
const cache_interceptor_1 = require("./common/cache.interceptor");
const performance_interceptor_1 = require("./shared/interceptors/performance.interceptor");
const graphql_module_1 = require("./graphql/graphql.module");
const redis_module_1 = require("./redis/redis.module");
const test_performance_controller_1 = require("./test/test-performance.controller");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(audit_middleware_1.AuditMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            schedule_1.ScheduleModule.forRoot(),
            graphql_1.GraphQLModule.forRoot({
                driver: apollo_1.ApolloDriver,
                autoSchemaFile: (0, path_1.join)(process.cwd(), 'src/schema.gql'),
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
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            menu_module_1.MenuModule,
            sanpham_module_1.SanphamModule,
            banggia_module_1.BanggiaModule,
            donhang_module_1.DonhangModule,
            khachhang_module_1.KhachhangModule,
            nhomkhachhang_module_1.NhomkhachhangModule,
            nhacungcap_module_1.NhacungcapModule,
            dathang_module_1.DathangModule,
            kho_module_1.khoModule,
            phieukho_module_1.PhieukhoModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            googledrive_module_1.GoogledriveModule,
            shared_module_1.SharedModule,
            errorlogs_module_1.ErrorlogsModule,
            callback_module_1.CallbackModule,
            dashboard_module_1.DashboardModule,
            userguide_module_1.UserguideModule,
            importdata_module_1.ImportdataModule,
            auditlog_module_1.AuditLogModule,
            redis_module_1.RedisModule,
            graphql_module_1.GraphQLUniversalModule,
        ],
        controllers: [app_controller_1.AppController, test_performance_controller_1.TestPerformanceController],
        providers: [
            app_service_1.AppService,
            prisma_service_1.PrismaService,
            test_resolver_1.TestResolver,
            core_1.Reflector,
            {
                provide: core_2.APP_INTERCEPTOR,
                useClass: audit_interceptor_1.AuditInterceptor,
            },
            {
                provide: core_2.APP_INTERCEPTOR,
                useClass: cache_interceptor_1.CacheInterceptor,
            },
            {
                provide: core_2.APP_INTERCEPTOR,
                useClass: performance_interceptor_1.PerformanceInterceptor,
            },
            auditlog_service_1.AuditService,
        ],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map