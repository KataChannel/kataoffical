"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UpdateNhanvienDto = void 0;
const mapped_types_1 = require("@nestjs/mapped-types");
const create_nhanvien_dto_1 = require("./create-nhanvien.dto");
class UpdateNhanvienDto extends (0, mapped_types_1.PartialType)(create_nhanvien_dto_1.CreateNhanvienDto) {
}
exports.UpdateNhanvienDto = UpdateNhanvienDto;
//# sourceMappingURL=update-nhanvien.dto.js.map