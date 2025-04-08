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
exports.AffiliatelinkController = void 0;
const common_1 = require("@nestjs/common");
const affiliatelink_service_1 = require("./affiliatelink.service");
const affiliatelink_dto_1 = require("./dto/affiliatelink.dto");
const trackingevent_service_1 = require("../trackingevent/trackingevent.service");
let AffiliatelinkController = class AffiliatelinkController {
    constructor(affiliatelinkService, trackingEventService) {
        this.affiliatelinkService = affiliatelinkService;
        this.trackingEventService = trackingEventService;
    }
    async handleTrack(codeId, res, ipAddress, req) {
        const affiliateLink = await this.affiliatelinkService.findByCode(codeId);
        if (affiliateLink) {
            this.trackingEventService.logEvent({
                affiliateLinkId: affiliateLink.id,
                type: 'view',
                ipAddress: ipAddress,
                userAgent: req.headers['user-agent'] || '',
            }).catch(err => console.error("Failed to log view event:", err));
            res.status(common_1.HttpStatus.OK).json(affiliateLink);
        }
        else {
            res.status(common_1.HttpStatus.NOT_FOUND).json({ message: 'Affiliate link not found' });
        }
    }
    create(createAffiliatelinkDto) {
        return this.affiliatelinkService.create(createAffiliatelinkDto);
    }
    findBy(param) {
        return this.affiliatelinkService.findOneBy(param);
    }
    findListBy(param) {
        return this.affiliatelinkService.findListBy(param);
    }
    findAll() {
        return this.affiliatelinkService.findAll();
    }
    findOne(id) {
        return this.affiliatelinkService.findOne(id);
    }
    update(id, updateAffiliatelinkDto) {
        return this.affiliatelinkService.update(id, updateAffiliatelinkDto);
    }
    remove(id) {
        return this.affiliatelinkService.remove(id);
    }
    reorder(reorderAffiliatelinkDto) {
        return this.affiliatelinkService.reorderAffiliatelinks(reorderAffiliatelinkDto.affiliatelinkIds);
    }
};
exports.AffiliatelinkController = AffiliatelinkController;
__decorate([
    (0, common_1.Get)('track/:codeId'),
    __param(0, (0, common_1.Param)('codeId')),
    __param(1, (0, common_1.Res)()),
    __param(2, (0, common_1.Ip)()),
    __param(3, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, String, Object]),
    __metadata("design:returntype", Promise)
], AffiliatelinkController.prototype, "handleTrack", null);
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findBy", null);
__decorate([
    (0, common_1.Post)('findlistby'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findListBy", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('reorder'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [affiliatelink_dto_1.ReorderAffiliatelinkDto]),
    __metadata("design:returntype", void 0)
], AffiliatelinkController.prototype, "reorder", null);
exports.AffiliatelinkController = AffiliatelinkController = __decorate([
    (0, common_1.Controller)('affiliatelink'),
    __metadata("design:paramtypes", [affiliatelink_service_1.AffiliatelinkService,
        trackingevent_service_1.TrackingEventService])
], AffiliatelinkController);
//# sourceMappingURL=affiliatelink.controller.js.map