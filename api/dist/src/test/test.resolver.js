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
exports.TestResolver = exports.TestItem = void 0;
const graphql_1 = require("@nestjs/graphql");
let TestItem = class TestItem {
};
exports.TestItem = TestItem;
__decorate([
    (0, graphql_1.Field)(() => String),
    __metadata("design:type", String)
], TestItem.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_1.Float),
    __metadata("design:type", Number)
], TestItem.prototype, "value", void 0);
exports.TestItem = TestItem = __decorate([
    (0, graphql_1.ObjectType)()
], TestItem);
let TestResolver = class TestResolver {
    async testQuery() {
        return [
            {
                name: "test",
                value: 100,
            }
        ];
    }
};
exports.TestResolver = TestResolver;
__decorate([
    (0, graphql_1.Query)(() => [TestItem]),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], TestResolver.prototype, "testQuery", null);
exports.TestResolver = TestResolver = __decorate([
    (0, graphql_1.Resolver)()
], TestResolver);
//# sourceMappingURL=test.resolver.js.map