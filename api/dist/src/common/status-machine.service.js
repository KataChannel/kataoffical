"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusMachineService = void 0;
const common_1 = require("@nestjs/common");
let StatusMachineService = class StatusMachineService {
    constructor() {
        this.validTransitions = {
            donhang: {
                'dadat': ['dagiao', 'huy'],
                'dagiao': ['danhan', 'huy'],
                'danhan': ['hoanthanh'],
                'huy': [],
                'hoanthanh': []
            },
            dathang: {
                'dadat': ['dagiao', 'huy'],
                'dagiao': ['danhan', 'huy'],
                'danhan': ['hoanthanh'],
                'huy': [],
                'hoanthanh': []
            }
        };
        this.reverseTransitions = {
            donhang: {
                'dagiao': ['dadat'],
                'danhan': ['dagiao'],
                'huy': ['dadat', 'dagiao'],
            },
            dathang: {
                'dagiao': ['dadat'],
                'danhan': ['dagiao'],
                'huy': ['dadat', 'dagiao'],
            }
        };
    }
    validateTransition(entity, fromStatus, toStatus, allowReverse = false) {
        const validForward = this.validTransitions[entity][fromStatus]?.includes(toStatus);
        if (validForward) {
            return {
                from: fromStatus,
                to: toStatus,
                entity,
                isValid: true
            };
        }
        if (allowReverse) {
            const validReverse = this.reverseTransitions[entity][fromStatus]?.includes(toStatus);
            if (validReverse) {
                return {
                    from: fromStatus,
                    to: toStatus,
                    entity,
                    isValid: true,
                    reason: 'Reverse transition'
                };
            }
        }
        return {
            from: fromStatus,
            to: toStatus,
            entity,
            isValid: false,
            reason: `Invalid transition from ${fromStatus} to ${toStatus} for ${entity}`
        };
    }
    getValidNextStatuses(entity, currentStatus, includeReverse = false) {
        const forward = this.validTransitions[entity][currentStatus] || [];
        if (!includeReverse) {
            return forward;
        }
        const reverse = this.reverseTransitions[entity][currentStatus] || [];
        return [...forward, ...reverse];
    }
    isFinalStatus(entity, status) {
        const validNext = this.validTransitions[entity][status];
        return !validNext || validNext.length === 0;
    }
    getStatusFlow(entity) {
        return this.validTransitions[entity];
    }
};
exports.StatusMachineService = StatusMachineService;
exports.StatusMachineService = StatusMachineService = __decorate([
    (0, common_1.Injectable)()
], StatusMachineService);
//# sourceMappingURL=status-machine.service.js.map