"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.FilemanagerModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("../socket.gateway");
const errorlog_module_1 = require("../errorlog/errorlog.module");
const auth_module_1 = require("../auth/auth.module");
const filemanager_controller_1 = require("./filemanager.controller");
const filemanager_service_1 = require("./filemanager.service");
let FilemanagerModule = class FilemanagerModule {
};
exports.FilemanagerModule = FilemanagerModule;
exports.FilemanagerModule = FilemanagerModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule, auth_module_1.AuthModule],
        controllers: [filemanager_controller_1.FilemanagerController],
        providers: [filemanager_service_1.fileManagerService, socket_gateway_1.SocketGateway],
        exports: [filemanager_service_1.fileManagerService]
    })
], FilemanagerModule);
//# sourceMappingURL=filemanager.module.js.map