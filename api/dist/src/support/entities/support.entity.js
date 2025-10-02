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
exports.SupportTicket = exports.SupportResponse = exports.SupportAttachment = exports.SupportUser = void 0;
const graphql_1 = require("@nestjs/graphql");
const graphql_scalars_1 = require("graphql-scalars");
let SupportUser = class SupportUser {
};
exports.SupportUser = SupportUser;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SupportUser.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SupportUser.prototype, "name", void 0);
__decorate([
    (0, graphql_1.Field)({ nullable: true }),
    __metadata("design:type", String)
], SupportUser.prototype, "email", void 0);
exports.SupportUser = SupportUser = __decorate([
    (0, graphql_1.ObjectType)()
], SupportUser);
let SupportAttachment = class SupportAttachment {
};
exports.SupportAttachment = SupportAttachment;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SupportAttachment.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportAttachment.prototype, "fileName", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportAttachment.prototype, "fileType", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", Number)
], SupportAttachment.prototype, "fileSize", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportAttachment.prototype, "fileUrl", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime),
    __metadata("design:type", Date)
], SupportAttachment.prototype, "createdAt", void 0);
exports.SupportAttachment = SupportAttachment = __decorate([
    (0, graphql_1.ObjectType)()
], SupportAttachment);
let SupportResponse = class SupportResponse {
};
exports.SupportResponse = SupportResponse;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SupportResponse.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportResponse.prototype, "content", void 0);
__decorate([
    (0, graphql_1.Field)(() => SupportUser),
    __metadata("design:type", SupportUser)
], SupportResponse.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SupportAttachment]),
    __metadata("design:type", Array)
], SupportResponse.prototype, "attachments", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime),
    __metadata("design:type", Date)
], SupportResponse.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime),
    __metadata("design:type", Date)
], SupportResponse.prototype, "updatedAt", void 0);
exports.SupportResponse = SupportResponse = __decorate([
    (0, graphql_1.ObjectType)()
], SupportResponse);
let SupportTicket = class SupportTicket {
};
exports.SupportTicket = SupportTicket;
__decorate([
    (0, graphql_1.Field)(() => graphql_1.ID),
    __metadata("design:type", String)
], SupportTicket.prototype, "id", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "title", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "description", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "status", void 0);
__decorate([
    (0, graphql_1.Field)(),
    __metadata("design:type", String)
], SupportTicket.prototype, "priority", void 0);
__decorate([
    (0, graphql_1.Field)(() => SupportUser),
    __metadata("design:type", SupportUser)
], SupportTicket.prototype, "user", void 0);
__decorate([
    (0, graphql_1.Field)(() => SupportUser, { nullable: true }),
    __metadata("design:type", SupportUser)
], SupportTicket.prototype, "technician", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SupportResponse]),
    __metadata("design:type", Array)
], SupportTicket.prototype, "responses", void 0);
__decorate([
    (0, graphql_1.Field)(() => [SupportAttachment]),
    __metadata("design:type", Array)
], SupportTicket.prototype, "attachments", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime),
    __metadata("design:type", Date)
], SupportTicket.prototype, "createdAt", void 0);
__decorate([
    (0, graphql_1.Field)(() => graphql_scalars_1.GraphQLDateTime),
    __metadata("design:type", Date)
], SupportTicket.prototype, "updatedAt", void 0);
exports.SupportTicket = SupportTicket = __decorate([
    (0, graphql_1.ObjectType)()
], SupportTicket);
//# sourceMappingURL=support.entity.js.map