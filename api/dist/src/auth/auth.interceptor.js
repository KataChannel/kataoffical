"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CreateByInterceptor = void 0;
const common_1 = require("@nestjs/common");
let CreateByInterceptor = class CreateByInterceptor {
    intercept(context, next) {
        const request = context.switchToHttp().getRequest();
        console.log(request.user);
        if (request.user?.id) {
            if (!request.body.createdBy) {
                request.body.createdBy = request.user.id;
            }
        }
        return next.handle();
    }
};
exports.CreateByInterceptor = CreateByInterceptor;
exports.CreateByInterceptor = CreateByInterceptor = __decorate([
    (0, common_1.Injectable)()
], CreateByInterceptor);
//# sourceMappingURL=auth.interceptor.js.map