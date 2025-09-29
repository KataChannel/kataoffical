"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.UserResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const base_resolver_1 = require("../base/base.resolver");
const user_type_1 = require("../types/user.type");
const user_input_1 = require("../inputs/user.input");
const prisma_service_1 = require("../../../prisma/prisma.service");
const BaseUserResolver = (0, base_resolver_1.createBaseResolver)(user_type_1.User, user_input_1.CreateUserInput, user_input_1.UpdateUserInput, user_input_1.UserWhereInput, user_input_1.UserWhereUniqueInput, 'User');
let UserResolver = class UserResolver extends BaseUserResolver {
    constructor(prisma) {
        super(prisma);
    }
};
exports.UserResolver = UserResolver;
exports.UserResolver = UserResolver = __decorate([
    (0, graphql_1.Resolver)(() => user_type_1.User),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserResolver);
//# sourceMappingURL=user.resolver.js.map