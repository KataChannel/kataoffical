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
const app_controller_1 = require("./app.controller");
const app_service_1 = require("./app.service");
const auth_module_1 = require("./auth/auth.module");
const user_module_1 = require("./user/user.module");
const prisma_module_1 = require("../prisma/prisma.module");
const prisma_service_1 = require("../prisma/prisma.service");
const menu_module_1 = require("./menu/menu.module");
const auth_middleware_1 = require("./middleware/auth.middleware");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const chatbot_module_1 = require("./chatbot/chatbot.module");
const auditlog_module_1 = require("./auditlog/auditlog.module");
const landingpage_module_1 = require("./landingpage/landingpage.module");
const trackingevent_module_1 = require("./trackingevent/trackingevent.module");
const resource_module_1 = require("./resource/resource.module");
const filemanager_module_1 = require("./filemanager/filemanager.module");
let AppModule = class AppModule {
    configure(consumer) {
        consumer.apply(auth_middleware_1.AuthMiddleware).forRoutes('*');
    }
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            auth_module_1.AuthModule,
            user_module_1.UserModule,
            prisma_module_1.PrismaModule,
            menu_module_1.MenuModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            chatbot_module_1.ChatbotModule,
            auditlog_module_1.AuditLogModule,
            landingpage_module_1.LandingPageModule,
            trackingevent_module_1.TrackingeventModule,
            resource_module_1.ResourceModule,
            filemanager_module_1.FilemanagerModule
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map