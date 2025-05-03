"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.TrackingeventModule = void 0;
const common_1 = require("@nestjs/common");
const trackingevent_service_1 = require("./trackingevent.service");
const trackingevent_controller_1 = require("./trackingevent.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const socket_gateway_1 = require("../socket.gateway");
const errorlog_module_1 = require("../errorlog/errorlog.module");
let TrackingeventModule = class TrackingeventModule {
};
exports.TrackingeventModule = TrackingeventModule;
exports.TrackingeventModule = TrackingeventModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlog_module_1.ErrorlogModule],
        controllers: [trackingevent_controller_1.TrackingeventController],
        providers: [trackingevent_service_1.TrackingeventService, socket_gateway_1.SocketGateway],
        exports: [trackingevent_service_1.TrackingeventService],
    })
], TrackingeventModule);
//# sourceMappingURL=trackingevent.module.js.map