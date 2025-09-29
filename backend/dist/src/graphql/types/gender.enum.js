"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Gender = void 0;
const graphql_1 = require("@nestjs/graphql");
var Gender;
(function (Gender) {
    Gender["MALE"] = "MALE";
    Gender["FEMALE"] = "FEMALE";
    Gender["OTHER"] = "OTHER";
})(Gender || (exports.Gender = Gender = {}));
(0, graphql_1.registerEnumType)(Gender, {
    name: 'Gender',
    description: 'User gender enum',
});
//# sourceMappingURL=gender.enum.js.map