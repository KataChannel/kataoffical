"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.BanggiaModule = void 0;
const common_1 = require("@nestjs/common");
const banggia_service_1 = require("./banggia.service");
const banggia_controller_1 = require("./banggia.controller");
const banggia_price_history_service_1 = require("./banggia-price-history.service");
const prisma_module_1 = require("../../prisma/prisma.module");
const errorlogs_module_1 = require("../errorlogs/errorlogs.module");
const socket_gateway_1 = require("../socket.gateway");
const importdata_module_1 = require("../importdata/importdata.module");
const shared_module_1 = require("../shared/shared.module");
const auth_module_1 = require("../auth/auth.module");
let BanggiaModule = class BanggiaModule {
};
exports.BanggiaModule = BanggiaModule;
exports.BanggiaModule = BanggiaModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule, errorlogs_module_1.ErrorlogsModule, importdata_module_1.ImportdataModule, shared_module_1.SharedModule, auth_module_1.AuthModule],
        controllers: [banggia_controller_1.BanggiaController],
        providers: [banggia_service_1.BanggiaService, banggia_price_history_service_1.BanggiaPriceHistoryService, socket_gateway_1.SocketGateway],
        exports: [banggia_service_1.BanggiaService, banggia_price_history_service_1.BanggiaPriceHistoryService]
    })
], BanggiaModule);
//# sourceMappingURL=banggia.module.js.map