"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ThanhtoanhoahongModule = void 0;
const common_1 = require("@nestjs/common");
const thanhtoanhoahong_service_1 = require("./thanhtoanhoahong.service");
const thanhtoanhoahong_controller_1 = require("./thanhtoanhoahong.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("../socket.gateway");
const errorlog_module_1 = require("../errorlog/errorlog.module");
const auth_module_1 = require("../auth/auth.module");
let ThanhtoanhoahongModule = class ThanhtoanhoahongModule {
};
exports.ThanhtoanhoahongModule = ThanhtoanhoahongModule;
exports.ThanhtoanhoahongModule = ThanhtoanhoahongModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule, auth_module_1.AuthModule],
        controllers: [thanhtoanhoahong_controller_1.ThanhtoanhoahongController],
        providers: [thanhtoanhoahong_service_1.ThanhtoanhoahongService, socket_gateway_1.SocketGateway],
        exports: [thanhtoanhoahong_service_1.ThanhtoanhoahongService]
    })
], ThanhtoanhoahongModule);
//# sourceMappingURL=thanhtoanhoahong.module.js.map