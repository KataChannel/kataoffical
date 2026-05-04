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
exports.HealthResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_type_json_1 = require("graphql-type-json");
let HealthResolver = class HealthResolver {
    async health() {
        return {
            status: 'ok',
            timestamp: new Date().toISOString(),
            version: '2.0.0-enhanced',
            graphql: 'active',
            features: [
                'dynamic-field-selection',
                'dataloader-optimization',
                'performance-monitoring',
                'enhanced-resolvers'
            ]
        };
    }
};
exports.HealthResolver = HealthResolver;
__decorate([
    (0, graphql_1.Query)(() => graphql_type_json_1.GraphQLJSON, {
        name: 'health',
        description: 'GraphQL health check endpoint'
    }),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], HealthResolver.prototype, "health", null);
exports.HealthResolver = HealthResolver = __decorate([
    (0, graphql_1.Resolver)()
], HealthResolver);
//# sourceMappingURL=health.resolver.js.map