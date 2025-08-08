"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createContext = createContext;
function createContext(services) {
    return (req) => ({
        ...services,
        request: req,
        user: req.user,
    });
}
//# sourceMappingURL=context.js.map