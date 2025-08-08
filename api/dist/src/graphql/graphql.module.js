"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLUniversalModule = void 0;
const common_1 = require("@nestjs/common");
const prisma_module_1 = require("../../prisma/prisma.module");
const auth_module_1 = require("../auth/auth.module");
const universal_resolver_1 = require("./universal.resolver");
const universal_service_1 = require("./universal.service");
const enhanced_universal_resolver_1 = require("./enhanced-universal.resolver");
const enhanced_universal_service_1 = require("./enhanced-universal.service");
const dataloader_service_1 = require("./dataloader.service");
const field_selection_service_1 = require("./field-selection.service");
const performance_service_1 = require("./performance.service");
let GraphQLUniversalModule = class GraphQLUniversalModule {
};
exports.GraphQLUniversalModule = GraphQLUniversalModule;
exports.GraphQLUniversalModule = GraphQLUniversalModule = __decorate([
    (0, common_1.Module)({
        imports: [
            prisma_module_1.PrismaModule,
            auth_module_1.AuthModule,
        ],
        providers: [
            universal_resolver_1.UniversalResolver,
            universal_service_1.UniversalService,
            enhanced_universal_resolver_1.EnhancedUniversalResolver,
            enhanced_universal_service_1.EnhancedUniversalService,
            dataloader_service_1.DataLoaderService,
            field_selection_service_1.FieldSelectionService,
            performance_service_1.GraphQLPerformanceService,
        ],
        exports: [
            universal_service_1.UniversalService,
            enhanced_universal_service_1.EnhancedUniversalService,
            dataloader_service_1.DataLoaderService,
            field_selection_service_1.FieldSelectionService,
            performance_service_1.GraphQLPerformanceService,
        ],
    })
], GraphQLUniversalModule);
//# sourceMappingURL=graphql.module.js.map