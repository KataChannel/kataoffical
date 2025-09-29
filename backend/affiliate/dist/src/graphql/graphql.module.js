"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.GraphQLResolversModule = void 0;
const common_1 = require("@nestjs/common");
const user_resolver_1 = require("./resolvers/user.resolver");
const role_resolver_1 = require("./resolvers/role.resolver");
const affiliate_link_resolver_1 = require("./resolvers/affiliate-link.resolver");
const universal_resolver_1 = require("./resolvers/universal.resolver");
const prisma_module_1 = require("../../prisma/prisma.module");
const model_configs_1 = require("./dynamic/model-configs");
(0, model_configs_1.registerAllModels)();
let GraphQLResolversModule = class GraphQLResolversModule {
};
exports.GraphQLResolversModule = GraphQLResolversModule;
exports.GraphQLResolversModule = GraphQLResolversModule = __decorate([
    (0, common_1.Module)({
        imports: [prisma_module_1.PrismaModule],
        providers: [
            user_resolver_1.UserResolver,
            role_resolver_1.RoleResolver,
            role_resolver_1.PermissionResolver,
            affiliate_link_resolver_1.AffiliateLinkResolver,
            universal_resolver_1.UniversalResolver,
        ],
    })
], GraphQLResolversModule);
//# sourceMappingURL=graphql.module.js.map