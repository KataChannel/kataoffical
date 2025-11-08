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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.SupportResolver = void 0;
const graphql_1 = require("@nestjs/graphql");
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../auth/jwt-auth.guard");
const support_service_1 = require("./support.service");
const currentUser_decorator_1 = require("../auth/decorators/currentUser.decorator");
const support_input_1 = require("./dto/support.input");
const support_entity_1 = require("./entities/support.entity");
let SupportResolver = class SupportResolver {
    constructor(supportService) {
        this.supportService = supportService;
    }
    async tickets(user, status, priority) {
        return this.supportService.findTickets(user, status, priority);
    }
    async ticket(id) {
        return this.supportService.findTicketById(id);
    }
    async createTicket(user, input) {
        return this.supportService.createTicket(user, input);
    }
    async updateTicket(id, input) {
        return this.supportService.updateTicket(id, input);
    }
    async addResponse(user, ticketId, input) {
        return this.supportService.addResponse(user, ticketId, input);
    }
    async deleteTicket(id) {
        return this.supportService.deleteTicket(id);
    }
    async assignTicket(ticketId, technicianId) {
        return this.supportService.assignTicket(ticketId, technicianId);
    }
};
exports.SupportResolver = SupportResolver;
__decorate([
    (0, graphql_1.Query)(() => [support_entity_1.SupportTicket]),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('status', { nullable: true })),
    __param(2, (0, graphql_1.Args)('priority', { nullable: true })),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, String]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "tickets", null);
__decorate([
    (0, graphql_1.Query)(() => support_entity_1.SupportTicket, { nullable: true }),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "ticket", null);
__decorate([
    (0, graphql_1.Mutation)(() => support_entity_1.SupportTicket),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, support_input_1.CreateTicketInput]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "createTicket", null);
__decorate([
    (0, graphql_1.Mutation)(() => support_entity_1.SupportTicket),
    __param(0, (0, graphql_1.Args)('id')),
    __param(1, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, support_input_1.UpdateTicketInput]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "updateTicket", null);
__decorate([
    (0, graphql_1.Mutation)(() => support_entity_1.SupportResponse),
    __param(0, (0, currentUser_decorator_1.CurrentUser)()),
    __param(1, (0, graphql_1.Args)('ticketId')),
    __param(2, (0, graphql_1.Args)('input')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, String, support_input_1.CreateResponseInput]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "addResponse", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "deleteTicket", null);
__decorate([
    (0, graphql_1.Mutation)(() => Boolean),
    __param(0, (0, graphql_1.Args)('ticketId')),
    __param(1, (0, graphql_1.Args)('technicianId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], SupportResolver.prototype, "assignTicket", null);
exports.SupportResolver = SupportResolver = __decorate([
    (0, graphql_1.Resolver)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [support_service_1.SupportService])
], SupportResolver);
//# sourceMappingURL=support.resolver.js.map