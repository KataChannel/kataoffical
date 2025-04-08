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
exports.TrackingeventController = void 0;
const common_1 = require("@nestjs/common");
const trackingevent_service_1 = require("./trackingevent.service");
const trackingevent_dto_1 = require("./dto/trackingevent.dto");
let TrackingeventController = class TrackingeventController {
    constructor(trackingeventService) {
        this.trackingeventService = trackingeventService;
    }
    create(createTrackingeventDto) {
        return this.trackingeventService.create(createTrackingeventDto);
    }
    findBy(param) {
        return this.trackingeventService.findBy(param);
    }
    findAll() {
        return this.trackingeventService.findAll();
    }
    findOne(id) {
        return this.trackingeventService.findOne(id);
    }
    update(id, updateTrackingeventDto) {
        return this.trackingeventService.update(id, updateTrackingeventDto);
    }
    remove(id) {
        return this.trackingeventService.remove(id);
    }
};
exports.TrackingeventController = TrackingeventController;
__decorate([
    (0, common_1.Post)(),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trackingevent_dto_1.CreateTrackingeventDto]),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "create", null);
__decorate([
    (0, common_1.Post)('findby'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [trackingevent_dto_1.FindByDto]),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "findBy", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)('findid/:id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, common_1.UsePipes)(new common_1.ValidationPipe()),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, trackingevent_dto_1.UpdateTrackingeventDto]),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], TrackingeventController.prototype, "remove", null);
exports.TrackingeventController = TrackingeventController = __decorate([
    (0, common_1.Controller)('trackingevent'),
    __metadata("design:paramtypes", [trackingevent_service_1.TrackingEventService])
], TrackingeventController);
//# sourceMappingURL=trackingevent.controller.js.map