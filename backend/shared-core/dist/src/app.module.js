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
const khachhang_module_1 = require("./khachhang/khachhang.module");
const auth_middleware_1 = require("./middleware/auth.middleware");
const role_module_1 = require("./role/role.module");
const permission_module_1 = require("./permission/permission.module");
const nhomkhachhang_module_1 = require("./nhomkhachhang/nhomkhachhang.module");
const chatbot_module_1 = require("./chatbot/chatbot.module");
const auditlog_module_1 = require("./auditlog/auditlog.module");
const mail_module_1 = require("./mail/mail.module");
const quanlyqrcode_module_1 = require("./quanlyqrcode/quanlyqrcode.module");
const quanlydrive_module_1 = require("./quanlydrive/quanlydrive.module");
const googlesheet_module_1 = require("./googlesheet/googlesheet.module");
const dexuat_module_1 = require("./dexuat/dexuat.module");
const landingpage_module_1 = require("./landingpage/landingpage.module");
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
            khachhang_module_1.KhachhangModule,
            nhomkhachhang_module_1.NhomkhachhangModule,
            role_module_1.RoleModule,
            permission_module_1.PermissionModule,
            chatbot_module_1.ChatbotModule,
            auditlog_module_1.AuditLogModule,
            quanlyqrcode_module_1.QuanlyqrcodeModule,
            mail_module_1.MailModule,
            quanlydrive_module_1.QuanlydriveModule,
            googlesheet_module_1.GooglesheetModule,
            dexuat_module_1.DexuatModule,
            landingpage_module_1.LandingPageModule,
        ],
        controllers: [app_controller_1.AppController],
        providers: [app_service_1.AppService, prisma_service_1.PrismaService],
        exports: [prisma_service_1.PrismaService],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map