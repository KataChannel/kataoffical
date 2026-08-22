"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ImportdataModule = void 0;
const common_1 = require("@nestjs/common");
const importdata_service_1 = require("./importdata.service");
const importdata_controller_1 = require("./importdata.controller");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
const errorlogs_module_1 = require("../errorlogs/errorlogs.module");
const socket_gateway_1 = require("./socket.gateway");
let ImportdataModule = class ImportdataModule {
};
exports.ImportdataModule = ImportdataModule;
exports.ImportdataModule = ImportdataModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlogs_module_1.ErrorlogsModule, auth_module_1.AuthModule],
        controllers: [importdata_controller_1.ImportdataController],
        providers: [importdata_service_1.ImportdataService, socket_gateway_1.SocketGateway],
        exports: [importdata_service_1.ImportdataService]
    })
], ImportdataModule);
//# sourceMappingURL=importdata.module.js.map