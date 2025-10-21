"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.StatusDonhang = exports.AuditAction = void 0;
const graphql_1 = require("@nestjs/graphql");
var AuditAction;
(function (AuditAction) {
    AuditAction["CREATE"] = "CREATE";
    AuditAction["READ"] = "READ";
    AuditAction["UPDATE"] = "UPDATE";
    AuditAction["DELETE"] = "DELETE";
    AuditAction["LOGIN"] = "LOGIN";
    AuditAction["LOGOUT"] = "LOGOUT";
    AuditAction["ACCESS"] = "ACCESS";
    AuditAction["IMPORT"] = "IMPORT";
})(AuditAction || (exports.AuditAction = AuditAction = {}));
var StatusDonhang;
(function (StatusDonhang) {
    StatusDonhang["DADAT"] = "dadat";
    StatusDonhang["DAGIAO"] = "dagiao";
    StatusDonhang["DANHAN"] = "danhan";
    StatusDonhang["HUY"] = "huy";
    StatusDonhang["HOANTHANH"] = "hoanthanh";
})(StatusDonhang || (exports.StatusDonhang = StatusDonhang = {}));
(0, graphql_1.registerEnumType)(AuditAction, {
    name: 'AuditAction',
    description: 'Các hành động audit có thể thực hiện',
});
(0, graphql_1.registerEnumType)(StatusDonhang, {
    name: 'StatusDonhang',
    description: 'Trạng thái đơn hàng',
});
//# sourceMappingURL=index.js.map