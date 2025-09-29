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
exports.AffiliateLinkResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const base_resolver_1 = require("../base/base.resolver");
const affiliate_link_type_1 = require("../types/affiliate-link.type");
const affiliate_link_input_1 = require("../inputs/affiliate-link.input");
const prisma_service_1 = require("../../../prisma/prisma.service");
const BaseAffiliateLinkResolver = (0, base_resolver_1.createBaseResolver)(affiliate_link_type_1.AffiliateLink, affiliate_link_input_1.CreateAffiliateLinkInput, affiliate_link_input_1.UpdateAffiliateLinkInput, affiliate_link_input_1.AffiliateLinkWhereInput, affiliate_link_input_1.AffiliateLinkWhereUniqueInput, 'AffiliateLink');
let AffiliateLinkResolver = class AffiliateLinkResolver extends BaseAffiliateLinkResolver {
    constructor(prisma) {
        super(prisma);
    }
};
exports.AffiliateLinkResolver = AffiliateLinkResolver;
exports.AffiliateLinkResolver = AffiliateLinkResolver = __decorate([
    (0, graphql_1.Resolver)(() => affiliate_link_type_1.AffiliateLink),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], AffiliateLinkResolver);
//# sourceMappingURL=affiliate-link.resolver.js.map