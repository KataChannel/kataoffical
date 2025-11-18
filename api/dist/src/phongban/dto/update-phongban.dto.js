"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdatePhongbanDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_phongban_dto_1 = require("./create-phongban.dto");
class UpdatePhongbanDto extends (0, mapped_types_1.PartialType)(create_phongban_dto_1.CreatePhongbanDto) {
}
exports.UpdatePhongbanDto = UpdatePhongbanDto;
//# sourceMappingURL=update-phongban.dto.js.map