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
exports.SocketGateway = exports.SocketEvents = void 0;
const websockets_1 = require("@nestjs/websockets");
const socket_io_1 = require("socket.io");
var SocketEvents;
(function (SocketEvents) {
    SocketEvents["SANPHAM"] = "sanpham";
    SocketEvents["KHACHHANG"] = "khachhang";
    SocketEvents["USER"] = "user";
    SocketEvents["LEAD"] = "lead";
    SocketEvents["TASK"] = "task";
    SocketEvents["DEXUAT"] = "dexuat";
    SocketEvents["LANDING_PAGE"] = "landingPage";
    SocketEvents["TRACKING_EVENT"] = "trackingevent";
    SocketEvents["AFFILIATE_LINK"] = "affiliatelink";
    SocketEvents["MENU"] = "menu";
})(SocketEvents || (exports.SocketEvents = SocketEvents = {}));
let SocketGateway = class SocketGateway {
    sendUpdate(event, data) {
        if (!this.server) {
            console.error('WebSocket server not initialized');
            return;
        }
        this.server.emit(`${event}-updated`, data);
    }
};
exports.SocketGateway = SocketGateway;
__decorate([
    (0, websockets_1.WebSocketServer)(),
    __metadata("design:type", socket_io_1.Server)
], SocketGateway.prototype, "server", void 0);
exports.SocketGateway = SocketGateway = __decorate([
    (0, websockets_1.WebSocketGateway)({
        cors: {
            origin: '*',
        },
    })
], SocketGateway);
//# sourceMappingURL=socket.gateway.js.map