import './polyfills.server.mjs';
import {
  PhongbanService
} from "./chunk-KF7MGS5H.mjs";
import {
  GioiTinhLabels,
  NhanvienService,
  TrangThaiNhanvien,
  TrangThaiNhanvienLabels
} from "./chunk-NLBLBHTR.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-PFX6ZNS2.mjs";
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-UE3XUXQM.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-EB4UUH73.mjs";
import {
  TimezoneService
} from "./chunk-5FENH2CU.mjs";
import {
  readExcelFile,
  readExcelFileNoWorkerArray,
  writeExcelFile
} from "./chunk-KMEFW6OC.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatDividerModule
} from "./chunk-DEL52QRL.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-IQORQLD3.mjs";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-BG5AZIO5.mjs";
import {
  Router
} from "./chunk-TLYIA537.mjs";
import {
  MatChipsModule
} from "./chunk-6YRKHWJL.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-3VZFOMYA.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-5PWX7G23.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
  MatCardModule
} from "./chunk-6DRHJEKQ.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-PQY5STY2.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4QEJTP76.mjs";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import {
  MatSnackBar
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-K6ADGRHN.mjs";
import {
  MatOption
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
  computed,
  firstValueFrom,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-3RMAAFYO.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/utils/data-validation.utils.ts
var import_moment = __toESM(require_moment());
var DataValidator = class {
  /**
   * Validate toàn bộ dữ liệu với các rules đã định nghĩa
   */
  static validateData(data, rules) {
    const errors = [];
    const validData = [];
    const invalidData = [];
    data.forEach((row, rowIndex) => {
      const rowErrors = [];
      const validatedRow = __spreadValues({}, row);
      rules.forEach((rule) => {
        const error = this.validateField(row[rule.field], rule, rowIndex);
        if (error) {
          rowErrors.push(error);
        } else {
          validatedRow[rule.field] = this.transformValue(row[rule.field], rule.type);
        }
      });
      if (rowErrors.length > 0) {
        errors.push(...rowErrors);
        invalidData.push(__spreadProps(__spreadValues({}, row), { _rowIndex: rowIndex, _errors: rowErrors }));
      } else {
        validData.push(validatedRow);
      }
    });
    return {
      isValid: errors.length === 0,
      errors,
      validData,
      invalidData
    };
  }
  /**
   * Validate một field theo rule
   */
  static validateField(value, rule, rowIndex) {
    if (rule.required && (value === null || value === void 0 || value === "")) {
      return {
        row: rowIndex + 1,
        field: rule.field,
        value,
        error: `${rule.field} l\xE0 b\u1EAFt bu\u1ED9c`
      };
    }
    if (!rule.required && (value === null || value === void 0 || value === "")) {
      return null;
    }
    const typeError = this.validateType(value, rule.type, rowIndex, rule.field);
    if (typeError)
      return typeError;
    if (rule.min !== void 0 || rule.max !== void 0) {
      const rangeError = this.validateRange(value, rule, rowIndex);
      if (rangeError)
        return rangeError;
    }
    if (rule.pattern) {
      const patternError = this.validatePattern(value, rule, rowIndex);
      if (patternError)
        return patternError;
    }
    if (rule.customValidator) {
      const customError = rule.customValidator(value);
      if (customError) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: customError
        };
      }
    }
    return null;
  }
  /**
   * Validate kiểu dữ liệu
   */
  static validateType(value, type, rowIndex, field) {
    switch (type) {
      case "number":
        if (!this.isValidNumber(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} ph\u1EA3i l\xE0 s\u1ED1`
          };
        }
        break;
      case "date":
        if (!this.isValidDate(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} ph\u1EA3i l\xE0 ng\xE0y h\u1EE3p l\u1EC7 (DD/MM/YYYY ho\u1EB7c YYYY-MM-DD)`
          };
        }
        break;
      case "email":
        if (!this.isValidEmail(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} ph\u1EA3i l\xE0 email h\u1EE3p l\u1EC7`
          };
        }
        break;
      case "phone":
        if (!this.isValidPhone(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} ph\u1EA3i l\xE0 s\u1ED1 \u0111i\u1EC7n tho\u1EA1i h\u1EE3p l\u1EC7`
          };
        }
        break;
      case "string":
        break;
      default:
        break;
    }
    return null;
  }
  /**
   * Validate range (min/max)
   */
  static validateRange(value, rule, rowIndex) {
    if (rule.type === "number") {
      const num = Number(value);
      if (rule.min !== void 0 && num < rule.min) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} ph\u1EA3i >= ${rule.min}`
        };
      }
      if (rule.max !== void 0 && num > rule.max) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} ph\u1EA3i <= ${rule.max}`
        };
      }
    } else if (rule.type === "string") {
      const str = String(value);
      if (rule.min !== void 0 && str.length < rule.min) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} ph\u1EA3i c\xF3 \xEDt nh\u1EA5t ${rule.min} k\xFD t\u1EF1`
        };
      }
      if (rule.max !== void 0 && str.length > rule.max) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 ${rule.max} k\xFD t\u1EF1`
        };
      }
    }
    return null;
  }
  /**
   * Validate pattern
   */
  static validatePattern(value, rule, rowIndex) {
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return {
        row: rowIndex + 1,
        field: rule.field,
        value,
        error: `${rule.field} kh\xF4ng \u0111\xFAng \u0111\u1ECBnh d\u1EA1ng`
      };
    }
    return null;
  }
  /**
   * Check if value is valid number
   */
  static isValidNumber(value) {
    if (typeof value === "number")
      return !isNaN(value);
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "")
        return false;
      return !isNaN(Number(trimmed));
    }
    return false;
  }
  /**
   * Check if value is valid date
   */
  static isValidDate(value) {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }
    if (typeof value === "string") {
      const trimmed = value.trim();
      if (trimmed === "")
        return false;
      const formats = [
        "DD/MM/YYYY",
        "DD-MM-YYYY",
        "YYYY-MM-DD",
        "YYYY/MM/DD",
        "MM/DD/YYYY"
      ];
      return formats.some((format) => (0, import_moment.default)(trimmed, format, true).isValid());
    }
    if (typeof value === "number") {
      try {
        const date = new Date((value - 25569) * 86400 * 1e3);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    }
    return false;
  }
  /**
   * Check if value is valid email
   */
  static isValidEmail(value) {
    if (typeof value !== "string")
      return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }
  /**
   * Check if value is valid phone
   */
  static isValidPhone(value) {
    if (typeof value !== "string" && typeof value !== "number")
      return false;
    const phoneStr = String(value).trim();
    const phoneRegex = /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return phoneRegex.test(phoneStr);
  }
  /**
   * Transform value to correct type
   */
  static transformValue(value, type) {
    switch (type) {
      case "number":
        return Number(value);
      case "date":
        if (value instanceof Date)
          return value;
        if (typeof value === "string") {
          const formats = ["DD/MM/YYYY", "DD-MM-YYYY", "YYYY-MM-DD", "YYYY/MM/DD"];
          for (const format of formats) {
            const parsed = (0, import_moment.default)(value.trim(), format, true);
            if (parsed.isValid()) {
              return parsed.toDate();
            }
          }
        }
        if (typeof value === "number") {
          return new Date((value - 25569) * 86400 * 1e3);
        }
        return value;
      case "string":
        return String(value || "").trim();
      case "email":
        return String(value || "").trim().toLowerCase();
      case "phone":
        return String(value || "").trim();
      default:
        return value;
    }
  }
  /**
   * Get common validation rules for different entities
   */
  static getValidationRules(entityType) {
    switch (entityType) {
      case "sanpham":
        return [
          { field: "title", type: "string", required: true, min: 2, max: 255 },
          { field: "masp", type: "string", required: true, min: 1, max: 50 },
          { field: "giagoc", type: "number", required: false, min: 0 },
          { field: "dvt", type: "string", required: false, max: 20 },
          { field: "soluong", type: "number", required: false, min: 0 },
          { field: "soluongkho", type: "number", required: false, min: 0 },
          { field: "haohut", type: "number", required: false, min: 0, max: 100 },
          { field: "ghichu", type: "string", required: false, max: 500 }
        ];
      case "khachhang":
        return [
          { field: "name", type: "string", required: true, min: 2, max: 255 },
          { field: "mancc", type: "string", required: true, min: 1, max: 50 },
          { field: "sdt", type: "phone", required: false },
          { field: "diachi", type: "string", required: false, max: 500 },
          { field: "ghichu", type: "string", required: false, max: 500 }
        ];
      case "donhang":
        return [
          { field: "ngaygiao", type: "date", required: true },
          { field: "sldat", type: "number", required: true, min: 0 },
          { field: "slgiao", type: "number", required: true, min: 0 },
          { field: "slnhan", type: "number", required: false, min: 0 },
          { field: "giaban", type: "number", required: false, min: 0 },
          { field: "ghichu", type: "string", required: false, max: 500 }
        ];
      case "nhanvien":
        return [
          { field: "M\xE3 NV", type: "string", required: true, min: 1, max: 20 },
          { field: "H\u1ECD v\xE0 T\xEAn", type: "string", required: true, min: 2, max: 200 },
          { field: "M\xE3 L\xE0m Vi\u1EC7c", type: "string", required: false, max: 50 },
          { field: "Gi\u1EDBi T\xEDnh", type: "string", required: false },
          { field: "Ng\xE0y Sinh", type: "date", required: false },
          { field: "CMND/CCCD", type: "string", required: false, max: 20 },
          { field: "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i", type: "string", required: false, max: 20 },
          { field: "Email", type: "email", required: false, max: 100 },
          { field: "\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i", type: "string", required: false, max: 500 },
          { field: "Ph\xF2ng Ban", type: "string", required: false },
          { field: "Ch\u1EE9c V\u1EE5", type: "string", required: false, max: 100 },
          { field: "V\u1ECB Tr\xED", type: "string", required: false, max: 100 },
          { field: "Ng\xE0y V\xE0o L\xE0m", type: "date", required: false },
          { field: "Tr\u1EA1ng Th\xE1i", type: "string", required: false },
          { field: "L\u01B0\u01A1ng C\u01A1 B\u1EA3n", type: "number", required: false, min: 0 },
          { field: "Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c", type: "number", required: false, min: 0 },
          { field: "Ph\u1EE5 C\u1EA5p X\u0103ng", type: "number", required: false, min: 0 },
          { field: "Ph\u1EE5 C\u1EA5p \u0110T", type: "number", required: false, min: 0 },
          { field: "H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n", type: "number", required: false, min: 0 },
          { field: "Ti\u1EC1n \u0102n Gi\u1EEFa Ca", type: "number", required: false, min: 0 },
          { field: "Th\u01B0\u1EDFng Kinh Doanh", type: "number", required: false, min: 0 },
          { field: "Ph\u1EE5 C\u1EA5p Kh\xE1c", type: "number", required: false, min: 0 },
          { field: "S\u1ED1 T\xE0i Kho\u1EA3n", type: "string", required: false, max: 50 },
          { field: "Ng\xE2n H\xE0ng", type: "string", required: false, max: 100 },
          { field: "Chi Nh\xE1nh", type: "string", required: false, max: 200 },
          { field: "Ghi Ch\xFA", type: "string", required: false, max: 1e3 }
        ];
      default:
        return [];
    }
  }
};

// src/app/shared/components/import-preview-dialog/import-preview-dialog.component.ts
var _c0 = ["validPaginator"];
var _c1 = ["invalidPaginator"];
var _c2 = () => [10, 25, 50, 100];
function ImportPreviewDialogComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 64)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 11);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.invalidRows());
  }
}
function ImportPreviewDialogComponent_ng_template_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "mat-icon", 66);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 67);
    \u0275\u0275text(4, "H\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 68);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.validRows());
  }
}
function ImportPreviewDialogComponent_th_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 69);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function ImportPreviewDialogComponent_td_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const i_r3 = ctx.index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", i_r3 + 1, " ");
  }
}
function ImportPreviewDialogComponent_ng_container_48_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getColumnDisplayName(column_r4), " ");
  }
}
function ImportPreviewDialogComponent_ng_container_48_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r5 = ctx.$implicit;
    const column_r4 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap("col-data " + ctx_r1.getCellClass(element_r5, column_r4));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCellValue(element_r5[column_r4], column_r4), " ");
  }
}
function ImportPreviewDialogComponent_ng_container_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 71);
    \u0275\u0275template(1, ImportPreviewDialogComponent_ng_container_48_th_1_Template, 2, 1, "th", 72)(2, ImportPreviewDialogComponent_ng_container_48_td_2_Template, 2, 3, "td", 73);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r4 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r4);
  }
}
function ImportPreviewDialogComponent_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 76);
  }
}
function ImportPreviewDialogComponent_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 77);
  }
}
function ImportPreviewDialogComponent_tr_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 78)(1, "td", 79)(2, "div", 80)(3, "mat-icon");
    \u0275\u0275text(4, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.getValidDisplayedColumns().length);
  }
}
function ImportPreviewDialogComponent_ng_template_56_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.invalidRows());
  }
}
function ImportPreviewDialogComponent_ng_template_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "mat-icon", 81);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 67);
    \u0275\u0275text(4, "L\u1ED7i");
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, ImportPreviewDialogComponent_ng_template_56_span_5_Template, 2, 1, "span", 82);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.invalidRows() > 0);
  }
}
function ImportPreviewDialogComponent_th_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 69);
    \u0275\u0275text(1, "#");
    \u0275\u0275elementEnd();
  }
}
function ImportPreviewDialogComponent_td_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 70);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r6 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r6.originalRowIndex + 1, " ");
  }
}
function ImportPreviewDialogComponent_th_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 84);
    \u0275\u0275text(1, "L\u1ED7i");
    \u0275\u0275elementEnd();
  }
}
function ImportPreviewDialogComponent_td_78_ng_container_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "span", 88)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const error_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", error_r7.field, ":");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", error_r7.error, " ");
  }
}
function ImportPreviewDialogComponent_td_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 85)(1, "div", 86);
    \u0275\u0275template(2, ImportPreviewDialogComponent_td_78_ng_container_2_Template, 5, 2, "ng-container", 87);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const element_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.getRowErrors(element_r8.originalRowIndex));
  }
}
function ImportPreviewDialogComponent_ng_container_79_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 74);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getColumnDisplayName(column_r9), " ");
  }
}
function ImportPreviewDialogComponent_ng_container_79_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r10 = ctx.$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMap("col-data " + ctx_r1.getCellClass(element_r10, column_r9, true));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatCellValue(element_r10[column_r9], column_r9), " ");
  }
}
function ImportPreviewDialogComponent_ng_container_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 71);
    \u0275\u0275template(1, ImportPreviewDialogComponent_ng_container_79_th_1_Template, 2, 1, "th", 72)(2, ImportPreviewDialogComponent_ng_container_79_td_2_Template, 2, 3, "td", 73);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function ImportPreviewDialogComponent_tr_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 76);
  }
}
function ImportPreviewDialogComponent_tr_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 89);
  }
}
function ImportPreviewDialogComponent_tr_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 78)(1, "td", 79)(2, "div", 80)(3, "mat-icon");
    \u0275\u0275text(4, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u l\u1ED7i");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.getInvalidDisplayedColumns().length);
  }
}
function ImportPreviewDialogComponent_ng_template_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "mat-icon", 90);
    \u0275\u0275text(2, "analytics");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 67);
    \u0275\u0275text(4, "T\xF3m t\u1EAFt");
    \u0275\u0275elementEnd()();
  }
}
function ImportPreviewDialogComponent_div_123_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 95)(1, "div", 96)(2, "span", 97);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 98);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "span", 99);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const fieldError_r11 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(fieldError_r11.field);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fieldError_r11.errorType);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(fieldError_r11.count);
  }
}
function ImportPreviewDialogComponent_div_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 91)(1, "h3", 92)(2, "mat-icon");
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Chi ti\u1EBFt l\u1ED7i theo tr\u01B0\u1EDDng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 93);
    \u0275\u0275template(6, ImportPreviewDialogComponent_div_123_div_6_Template, 8, 3, "div", 94);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.getErrorSummary());
  }
}
function ImportPreviewDialogComponent_div_131_span_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 106);
    \u0275\u0275text(1, "B\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function ImportPreviewDialogComponent_div_131_span_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rule_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Min: ", rule_r12.min, "");
  }
}
function ImportPreviewDialogComponent_div_131_span_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const rule_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("Max: ", rule_r12.max, "");
  }
}
function ImportPreviewDialogComponent_div_131_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 100)(1, "div", 101);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 102)(4, "span", 103);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, ImportPreviewDialogComponent_div_131_span_6_Template, 2, 0, "span", 104)(7, ImportPreviewDialogComponent_div_131_span_7_Template, 2, 1, "span", 105)(8, ImportPreviewDialogComponent_div_131_span_8_Template, 2, 1, "span", 105);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const rule_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(rule_r12.field);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(rule_r12.type);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", rule_r12.required);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", rule_r12.min !== void 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", rule_r12.max !== void 0);
  }
}
var ImportPreviewDialogComponent = class _ImportPreviewDialogComponent {
  dialogRef;
  data;
  snackBar;
  timezoneService;
  validPaginator;
  invalidPaginator;
  sort;
  validDataSource = new MatTableDataSource([]);
  invalidDataSource = new MatTableDataSource([]);
  validColumns = [];
  invalidColumns = [];
  // Computed properties
  totalRows = computed(() => this.data.rawData.length);
  validRows = computed(() => this.data.validationResult.validData.length);
  invalidRows = computed(() => this.data.validationResult.invalidData.length);
  totalErrors = computed(() => this.data.validationResult.errors.length);
  constructor(dialogRef, data, snackBar, timezoneService) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.snackBar = snackBar;
    this.timezoneService = timezoneService;
  }
  ngOnInit() {
    this.setupDataSources();
  }
  ngAfterViewInit() {
    this.setupPaginators();
  }
  setupDataSources() {
    this.validDataSource.data = this.data.validationResult.validData;
    if (this.data.validationResult.validData.length > 0) {
      this.validColumns = Object.keys(this.data.validationResult.validData[0]).filter((key) => key !== "originalRowIndex");
    }
    const invalidWithRowIndex = this.data.validationResult.invalidData.map((item, index) => __spreadProps(__spreadValues({}, item), {
      originalRowIndex: this.data.rawData.findIndex((row) => row === item)
    }));
    this.invalidDataSource.data = invalidWithRowIndex;
    if (this.data.validationResult.invalidData.length > 0) {
      this.invalidColumns = Object.keys(this.data.validationResult.invalidData[0]).filter((key) => key !== "originalRowIndex");
    }
  }
  setupPaginators() {
    if (this.validPaginator) {
      this.validDataSource.paginator = this.validPaginator;
    }
    if (this.invalidPaginator) {
      this.invalidDataSource.paginator = this.invalidPaginator;
    }
    if (this.sort) {
      this.validDataSource.sort = this.sort;
      this.invalidDataSource.sort = this.sort;
    }
  }
  getValidColumns() {
    return this.validColumns;
  }
  getInvalidColumns() {
    return this.invalidColumns;
  }
  getValidDisplayedColumns() {
    return ["rowNumber", ...this.validColumns];
  }
  getInvalidDisplayedColumns() {
    return ["rowNumber", "errors", ...this.invalidColumns];
  }
  getColumnDisplayName(column) {
    const displayNames = {
      masp: "M\xE3 SP",
      title: "T\xEAn s\u1EA3n ph\u1EA9m",
      sldat: "SL \u0110\u1EB7t",
      slgiao: "SL Giao",
      slnhan: "SL Nh\u1EADn",
      giaban: "Gi\xE1 b\xE1n",
      dvt: "\u0110VT",
      ngaygiao: "Ng\xE0y giao",
      ghichu: "Ghi ch\xFA"
    };
    return displayNames[column] || column;
  }
  formatCellValue(value, column) {
    if (value === null || value === void 0)
      return "";
    switch (column) {
      case "ngaygiao":
        return this.timezoneService.formatForDisplay(value, "DD/MM/YYYY");
      case "sldat":
      case "slgiao":
      case "slnhan":
      case "giaban":
        return typeof value === "number" ? value.toLocaleString("vi-VN") : value;
      default:
        return value.toString();
    }
  }
  getCellClass(element, column, isInvalid = false) {
    const baseClass = "p-2";
    if (isInvalid) {
      const hasError = this.getRowErrors(element.originalRowIndex || 0).some((error) => error.field === column);
      return hasError ? baseClass + " bg-red-100 text-red-800" : baseClass;
    }
    return baseClass;
  }
  getRowErrors(rowIndex) {
    return this.data.validationResult.errors.filter((error) => error.row === rowIndex);
  }
  getErrorSummary() {
    const errorMap = /* @__PURE__ */ new Map();
    this.data.validationResult.errors.forEach((error) => {
      if (!errorMap.has(error.field)) {
        errorMap.set(error.field, /* @__PURE__ */ new Map());
      }
      const fieldErrors = errorMap.get(error.field);
      fieldErrors.set(error.error, (fieldErrors.get(error.error) || 0) + 1);
    });
    const summary = [];
    errorMap.forEach((errorTypes, field) => {
      errorTypes.forEach((count, errorType) => {
        summary.push({ field, errorType, count });
      });
    });
    return summary.sort((a, b) => b.count - a.count);
  }
  getValidationRules() {
    return this.data.config.validationRules || [];
  }
  applyValidFilter(event) {
    const filterValue = event.target.value;
    this.validDataSource.filter = filterValue.trim().toLowerCase();
    if (this.validDataSource.paginator) {
      this.validDataSource.paginator.firstPage();
    }
  }
  applyInvalidFilter(event) {
    const filterValue = event.target.value;
    this.invalidDataSource.filter = filterValue.trim().toLowerCase();
    if (this.invalidDataSource.paginator) {
      this.invalidDataSource.paginator.firstPage();
    }
  }
  exportValidData() {
    if (this.data.validationResult.validData.length === 0) {
      this.snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u h\u1EE3p l\u1EC7 \u0111\u1EC3 export", "\u0110\xF3ng", { duration: 3e3 });
      return;
    }
    writeExcelFile(this.data.validationResult.validData, `Valid_Data_${this.data.fileName}`);
  }
  exportInvalidData() {
    if (this.data.validationResult.invalidData.length === 0) {
      this.snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u l\u1ED7i \u0111\u1EC3 export", "\u0110\xF3ng", { duration: 3e3 });
      return;
    }
    const invalidWithErrors = this.data.validationResult.invalidData.map((item, index) => {
      const rowIndex = this.data.rawData.findIndex((row) => row === item);
      const errors = this.getRowErrors(rowIndex);
      return __spreadProps(__spreadValues({}, item), {
        errors: errors.map((e) => `${e.field}: ${e.error}`).join("; ")
      });
    });
    writeExcelFile(invalidWithErrors, `Invalid_Data_${this.data.fileName}`);
  }
  onConfirm() {
    if (this.validRows() === 0) {
      this.snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u h\u1EE3p l\u1EC7 \u0111\u1EC3 import", "\u0110\xF3ng", {
        duration: 3e3,
        panelClass: ["snackbar-warning"]
      });
      return;
    }
    const result = {
      success: true,
      validData: this.data.validationResult.validData,
      invalidData: this.data.validationResult.invalidData,
      errors: this.data.validationResult.errors,
      message: `Import th\xE0nh c\xF4ng ${this.validRows()} d\xF2ng d\u1EEF li\u1EC7u`
    };
    this.dialogRef.close(result);
  }
  onCancel() {
    this.dialogRef.close(null);
  }
  static \u0275fac = function ImportPreviewDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportPreviewDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(TimezoneService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportPreviewDialogComponent, selectors: [["app-import-preview-dialog"]], viewQuery: function ImportPreviewDialogComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.validPaginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.invalidPaginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 152, vars: 30, consts: [["validPaginator", ""], ["invalidPaginator", ""], [1, "import-preview-dialog"], [1, "dialog-header"], [1, "header-row"], [1, "header-info"], [1, "dialog-title"], [1, "file-name"], [1, "file-icon"], [1, "compact-stats"], [1, "compact-stat", "total"], [1, "stat-value"], [1, "stat-label"], [1, "compact-stat", "valid"], ["class", "compact-stat invalid", 4, "ngIf"], ["mat-icon-button", "", "aria-label", "\u0110\xF3ng", 1, "close-btn", 3, "click"], [1, "dialog-content"], ["animationDuration", "200ms", 1, "custom-tab-group"], ["mat-tab-label", ""], [1, "tab-content"], [1, "tab-toolbar"], ["appearance", "outline", 1, "search-field"], ["matPrefix", ""], ["matInput", "", "placeholder", "Nh\u1EADp t\u1EEB kh\xF3a...", 3, "keyup"], ["mat-stroked-button", "", "color", "primary", 1, "export-btn", 3, "click"], [1, "btn-text"], [1, "table-wrapper"], [1, "table-scroll"], ["mat-table", "", "matSort", "", 1, "data-table", 3, "dataSource"], ["matColumnDef", "rowNumber"], ["mat-header-cell", "", "class", "col-number sticky-col", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "col-number sticky-col", 4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "data-row", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row no-data-row", 4, "matNoDataRow"], [1, "paginator-wrapper"], ["showFirstLastButtons", "", 3, "pageSizeOptions", "pageSize"], [3, "disabled"], ["mat-stroked-button", "", "color", "warn", 1, "export-btn", 3, "click"], ["mat-table", "", "matSort", "", 1, "data-table", "invalid-table", 3, "dataSource"], ["matColumnDef", "errors"], ["mat-header-cell", "", "class", "col-errors", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "col-errors", 4, "matCellDef"], ["mat-row", "", "class", "data-row invalid-row", 4, "matRowDef", "matRowDefColumns"], [1, "tab-content", "summary-tab"], [1, "summary-content"], [1, "summary-overview"], [1, "overview-card", "total"], [1, "overview-info"], [1, "overview-value"], [1, "overview-label"], [1, "overview-card", "valid"], [1, "overview-card", "invalid"], [1, "overview-card", "percent"], ["class", "error-summary-section", 4, "ngIf"], [1, "rules-panel"], [1, "rules-list"], ["class", "rule-item", 4, "ngFor", "ngForOf"], [1, "dialog-footer"], [1, "footer-info"], [1, "footer-actions"], ["mat-stroked-button", "", 1, "btn-cancel", 3, "click"], ["mat-flat-button", "", "color", "primary", 1, "btn-confirm", 3, "click", "disabled"], [1, "compact-stat", "invalid"], [1, "tab-label"], [1, "tab-icon", "success"], [1, "tab-text"], [1, "tab-badge", "success"], ["mat-header-cell", "", 1, "col-number", "sticky-col"], ["mat-cell", "", 1, "col-number", "sticky-col"], [3, "matColumnDef"], ["mat-header-cell", "", "mat-sort-header", "", "class", "col-data", 4, "matHeaderCellDef"], ["mat-cell", "", 3, "class", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "col-data"], ["mat-cell", ""], ["mat-header-row", ""], ["mat-row", "", 1, "data-row"], [1, "mat-row", "no-data-row"], [1, "mat-cell"], [1, "no-data"], [1, "tab-icon", "error"], ["class", "tab-badge error", 4, "ngIf"], [1, "tab-badge", "error"], ["mat-header-cell", "", 1, "col-errors"], ["mat-cell", "", 1, "col-errors"], [1, "error-chips"], [4, "ngFor", "ngForOf"], [1, "error-chip"], ["mat-row", "", 1, "data-row", "invalid-row"], [1, "tab-icon", "info"], [1, "error-summary-section"], [1, "section-title"], [1, "error-list"], ["class", "error-item", 4, "ngFor", "ngForOf"], [1, "error-item"], [1, "error-info"], [1, "error-field"], [1, "error-type"], [1, "error-count"], [1, "rule-item"], [1, "rule-field"], [1, "rule-details"], [1, "rule-type"], ["class", "rule-required", 4, "ngIf"], ["class", "rule-range", 4, "ngIf"], [1, "rule-required"], [1, "rule-range"]], template: function ImportPreviewDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "div", 5)(4, "h2", 6);
      \u0275\u0275text(5, "Xem tr\u01B0\u1EDBc d\u1EEF li\u1EC7u Import");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 7)(7, "mat-icon", 8);
      \u0275\u0275text(8, "description");
      \u0275\u0275elementEnd();
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "span", 11);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 12);
      \u0275\u0275text(15, "T\u1ED5ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 13)(17, "mat-icon");
      \u0275\u0275text(18, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "span", 11);
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(21, ImportPreviewDialogComponent_div_21_Template, 5, 1, "div", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 15);
      \u0275\u0275listener("click", function ImportPreviewDialogComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCancel());
      });
      \u0275\u0275elementStart(23, "mat-icon");
      \u0275\u0275text(24, "close");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(25, "div", 16)(26, "mat-tab-group", 17)(27, "mat-tab");
      \u0275\u0275template(28, ImportPreviewDialogComponent_ng_template_28_Template, 7, 1, "ng-template", 18);
      \u0275\u0275elementStart(29, "div", 19)(30, "div", 20)(31, "mat-form-field", 21)(32, "mat-label");
      \u0275\u0275text(33, "T\xECm ki\u1EBFm");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-icon", 22);
      \u0275\u0275text(35, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "input", 23);
      \u0275\u0275listener("keyup", function ImportPreviewDialogComponent_Template_input_keyup_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyValidFilter($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "button", 24);
      \u0275\u0275listener("click", function ImportPreviewDialogComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportValidData());
      });
      \u0275\u0275elementStart(38, "mat-icon");
      \u0275\u0275text(39, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 25);
      \u0275\u0275text(41, "Export");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 26)(43, "div", 27)(44, "table", 28);
      \u0275\u0275elementContainerStart(45, 29);
      \u0275\u0275template(46, ImportPreviewDialogComponent_th_46_Template, 2, 0, "th", 30)(47, ImportPreviewDialogComponent_td_47_Template, 2, 1, "td", 31);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(48, ImportPreviewDialogComponent_ng_container_48_Template, 3, 1, "ng-container", 32)(49, ImportPreviewDialogComponent_tr_49_Template, 1, 0, "tr", 33)(50, ImportPreviewDialogComponent_tr_50_Template, 1, 0, "tr", 34)(51, ImportPreviewDialogComponent_tr_51_Template, 7, 1, "tr", 35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "div", 36);
      \u0275\u0275element(53, "mat-paginator", 37, 0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(55, "mat-tab", 38);
      \u0275\u0275template(56, ImportPreviewDialogComponent_ng_template_56_Template, 6, 1, "ng-template", 18);
      \u0275\u0275elementStart(57, "div", 19)(58, "div", 20)(59, "mat-form-field", 21)(60, "mat-label");
      \u0275\u0275text(61, "T\xECm ki\u1EBFm l\u1ED7i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-icon", 22);
      \u0275\u0275text(63, "search");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "input", 23);
      \u0275\u0275listener("keyup", function ImportPreviewDialogComponent_Template_input_keyup_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyInvalidFilter($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "button", 39);
      \u0275\u0275listener("click", function ImportPreviewDialogComponent_Template_button_click_65_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportInvalidData());
      });
      \u0275\u0275elementStart(66, "mat-icon");
      \u0275\u0275text(67, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "span", 25);
      \u0275\u0275text(69, "Export");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(70, "div", 26)(71, "div", 27)(72, "table", 40);
      \u0275\u0275elementContainerStart(73, 29);
      \u0275\u0275template(74, ImportPreviewDialogComponent_th_74_Template, 2, 0, "th", 30)(75, ImportPreviewDialogComponent_td_75_Template, 2, 1, "td", 31);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(76, 41);
      \u0275\u0275template(77, ImportPreviewDialogComponent_th_77_Template, 2, 0, "th", 42)(78, ImportPreviewDialogComponent_td_78_Template, 3, 1, "td", 43);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(79, ImportPreviewDialogComponent_ng_container_79_Template, 3, 1, "ng-container", 32)(80, ImportPreviewDialogComponent_tr_80_Template, 1, 0, "tr", 33)(81, ImportPreviewDialogComponent_tr_81_Template, 1, 0, "tr", 44)(82, ImportPreviewDialogComponent_tr_82_Template, 7, 1, "tr", 35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(83, "div", 36);
      \u0275\u0275element(84, "mat-paginator", 37, 1);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(86, "mat-tab");
      \u0275\u0275template(87, ImportPreviewDialogComponent_ng_template_87_Template, 5, 0, "ng-template", 18);
      \u0275\u0275elementStart(88, "div", 45)(89, "div", 46)(90, "div", 47)(91, "div", 48)(92, "mat-icon");
      \u0275\u0275text(93, "format_list_numbered");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "div", 49)(95, "span", 50);
      \u0275\u0275text(96);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(97, "span", 51);
      \u0275\u0275text(98, "T\u1ED5ng s\u1ED1 d\xF2ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(99, "div", 52)(100, "mat-icon");
      \u0275\u0275text(101, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(102, "div", 49)(103, "span", 50);
      \u0275\u0275text(104);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "span", 51);
      \u0275\u0275text(106, "D\xF2ng h\u1EE3p l\u1EC7");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(107, "div", 53)(108, "mat-icon");
      \u0275\u0275text(109, "cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(110, "div", 49)(111, "span", 50);
      \u0275\u0275text(112);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(113, "span", 51);
      \u0275\u0275text(114, "D\xF2ng l\u1ED7i");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(115, "div", 54)(116, "mat-icon");
      \u0275\u0275text(117, "percent");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "div", 49)(119, "span", 50);
      \u0275\u0275text(120);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(121, "span", 51);
      \u0275\u0275text(122, "T\u1EF7 l\u1EC7 h\u1EE3p l\u1EC7");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(123, ImportPreviewDialogComponent_div_123_Template, 7, 1, "div", 55);
      \u0275\u0275elementStart(124, "mat-expansion-panel", 56)(125, "mat-expansion-panel-header")(126, "mat-panel-title")(127, "mat-icon");
      \u0275\u0275text(128, "rule");
      \u0275\u0275elementEnd();
      \u0275\u0275text(129, " Quy t\u1EAFc validation ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(130, "div", 57);
      \u0275\u0275template(131, ImportPreviewDialogComponent_div_131_Template, 9, 5, "div", 58);
      \u0275\u0275elementEnd()()()()()()();
      \u0275\u0275elementStart(132, "div", 59)(133, "div", 60)(134, "mat-icon");
      \u0275\u0275text(135, "info");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(136, "span");
      \u0275\u0275text(137, "S\u1EBD import ");
      \u0275\u0275elementStart(138, "strong");
      \u0275\u0275text(139);
      \u0275\u0275elementEnd();
      \u0275\u0275text(140, " d\xF2ng d\u1EEF li\u1EC7u h\u1EE3p l\u1EC7");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(141, "div", 61)(142, "button", 62);
      \u0275\u0275listener("click", function ImportPreviewDialogComponent_Template_button_click_142_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onCancel());
      });
      \u0275\u0275elementStart(143, "mat-icon");
      \u0275\u0275text(144, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(145, "span");
      \u0275\u0275text(146, "H\u1EE7y");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(147, "button", 63);
      \u0275\u0275listener("click", function ImportPreviewDialogComponent_Template_button_click_147_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onConfirm());
      });
      \u0275\u0275elementStart(148, "mat-icon");
      \u0275\u0275text(149, "cloud_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(150, "span");
      \u0275\u0275text(151);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.data.fileName, " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(ctx.totalRows());
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.validRows());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.invalidRows() > 0);
      \u0275\u0275advance(23);
      \u0275\u0275property("dataSource", ctx.validDataSource);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.getValidColumns());
      \u0275\u0275advance();
      \u0275\u0275property("matHeaderRowDef", ctx.getValidDisplayedColumns())("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.getValidDisplayedColumns());
      \u0275\u0275advance(3);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(28, _c2))("pageSize", 10);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.invalidRows() === 0);
      \u0275\u0275advance(17);
      \u0275\u0275property("dataSource", ctx.invalidDataSource);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngForOf", ctx.getInvalidColumns());
      \u0275\u0275advance();
      \u0275\u0275property("matHeaderRowDef", ctx.getInvalidDisplayedColumns())("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.getInvalidDisplayedColumns());
      \u0275\u0275advance(3);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(29, _c2))("pageSize", 10);
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate(ctx.totalRows());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.validRows());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.invalidRows());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1("", ctx.totalRows() > 0 ? (ctx.validRows() / ctx.totalRows() * 100).toFixed(1) : 0, "%");
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.getErrorSummary().length > 0);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngForOf", ctx.getValidationRules());
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate(ctx.validRows());
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.validRows() === 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1("Import (", ctx.validRows(), ")");
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    MatDialogModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTabsModule,
    MatTabLabel,
    MatTab,
    MatTabGroup,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatFormFieldModule,
    MatChipsModule,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatCardModule
  ], styles: ['\n\n[_nghost-%COMP%] {\n  --background: #ffffff;\n  --foreground: #0f172a;\n  --card: #ffffff;\n  --card-foreground: #0f172a;\n  --popover: #ffffff;\n  --popover-foreground: #0f172a;\n  --primary: #0f172a;\n  --primary-foreground: #f8fafc;\n  --secondary: #f1f5f9;\n  --secondary-foreground: #0f172a;\n  --muted: #f1f5f9;\n  --muted-foreground: #64748b;\n  --accent: #f1f5f9;\n  --accent-foreground: #0f172a;\n  --destructive: #ef4444;\n  --destructive-foreground: #f8fafc;\n  --border: #e2e8f0;\n  --input: #e2e8f0;\n  --ring: #0f172a;\n  --header-bg:\n    linear-gradient(\n      135deg,\n      #6366f1 0%,\n      #8b5cf6 100%);\n  --color-success: #22c55e;\n  --color-success-bg: #f0fdf4;\n  --color-success-border: #bbf7d0;\n  --color-success-text: #15803d;\n  --color-error: #ef4444;\n  --color-error-bg: #fef2f2;\n  --color-error-border: #fecaca;\n  --color-error-text: #dc2626;\n  --color-info: #3b82f6;\n  --color-info-bg: #eff6ff;\n  --color-info-border: #bfdbfe;\n  --color-info-text: #2563eb;\n  --color-warning: #f59e0b;\n  --color-warning-bg: #fffbeb;\n  --color-warning-border: #fde68a;\n  --color-warning-text: #d97706;\n  --spacing-1: 4px;\n  --spacing-2: 8px;\n  --spacing-3: 12px;\n  --spacing-4: 16px;\n  --spacing-5: 20px;\n  --spacing-6: 24px;\n  --spacing-8: 32px;\n  --radius: 6px;\n  --radius-sm: 4px;\n  --radius-md: 6px;\n  --radius-lg: 8px;\n  --radius-xl: 12px;\n  --shadow-sm: 0 1px 2px 0 rgb(0 0 0 / 0.05);\n  --shadow: 0 1px 3px 0 rgb(0 0 0 / 0.1), 0 1px 2px -1px rgb(0 0 0 / 0.1);\n  --shadow-md: 0 4px 6px -1px rgb(0 0 0 / 0.1), 0 2px 4px -2px rgb(0 0 0 / 0.1);\n  --shadow-lg: 0 10px 15px -3px rgb(0 0 0 / 0.1), 0 4px 6px -4px rgb(0 0 0 / 0.1);\n  --transition-fast: 150ms cubic-bezier(0.4, 0, 0.2, 1);\n  --transition-normal: 200ms cubic-bezier(0.4, 0, 0.2, 1);\n}\n.import-preview-dialog[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  max-height: 90vh;\n  background: var(--background);\n  border-radius: var(--radius-xl);\n  overflow: hidden;\n  font-family:\n    -apple-system,\n    BlinkMacSystemFont,\n    "Segoe UI",\n    Roboto,\n    "Helvetica Neue",\n    Arial,\n    sans-serif;\n}\n.dialog-header[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  background: var(--header-bg);\n  color: white;\n  padding: var(--spacing-3) var(--spacing-4);\n}\n.dialog-header[_ngcontent-%COMP%]   .header-row[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-3);\n}\n.dialog-header[_ngcontent-%COMP%]   .header-info[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 1rem;\n  font-weight: 600;\n  line-height: 1.3;\n}\n.dialog-header[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-1);\n  margin-top: 2px;\n  font-size: 0.75rem;\n  opacity: 0.85;\n  white-space: nowrap;\n  overflow: hidden;\n  text-overflow: ellipsis;\n}\n.dialog-header[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%]   .file-icon[_ngcontent-%COMP%] {\n  font-size: 14px;\n  width: 14px;\n  height: 14px;\n  flex-shrink: 0;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  color: white;\n  opacity: 0.8;\n  width: 32px;\n  height: 32px;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.dialog-header[_ngcontent-%COMP%]   .close-btn[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  background: rgba(255, 255, 255, 0.15);\n}\n.compact-stats[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-2);\n}\n.compact-stat[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-1);\n  padding: var(--spacing-1) var(--spacing-3);\n  border-radius: 9999px;\n  background: rgba(255, 255, 255, 0.2);\n  font-size: 0.8125rem;\n  font-weight: 600;\n  white-space: nowrap;\n}\n.compact-stat[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.compact-stat[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-variant-numeric: tabular-nums;\n}\n.compact-stat[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-weight: 400;\n  opacity: 0.9;\n  font-size: 0.75rem;\n}\n.compact-stat.total[_ngcontent-%COMP%] {\n  background: rgba(255, 255, 255, 0.15);\n}\n.compact-stat.valid[_ngcontent-%COMP%] {\n  background: rgba(34, 197, 94, 0.3);\n}\n.compact-stat.valid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #bbf7d0;\n}\n.compact-stat.invalid[_ngcontent-%COMP%] {\n  background: rgba(239, 68, 68, 0.3);\n}\n.compact-stat.invalid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #fecaca;\n}\n.dialog-content[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  display: flex;\n  flex-direction: column;\n}\n.custom-tab-group[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n}\n.custom-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab-header {\n  border-bottom: 1px solid var(--dialog-border);\n  background: #f8fafc;\n  flex-shrink: 0;\n}\n.custom-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab {\n  min-width: 0;\n  padding: 0 var(--spacing-md);\n  flex: 1;\n  max-width: none;\n}\n.custom-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab-body-wrapper {\n  flex: 1;\n  overflow: hidden;\n}\n.custom-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab-body {\n  height: 100%;\n}\n.custom-tab-group[_ngcontent-%COMP%]     .mat-mdc-tab-body-content {\n  height: 100%;\n  overflow: hidden;\n}\n.tab-label[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-2);\n  padding: var(--spacing-2) 0;\n}\n.tab-label[_ngcontent-%COMP%]   .tab-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.tab-label[_ngcontent-%COMP%]   .tab-icon.success[_ngcontent-%COMP%] {\n  color: var(--color-success);\n}\n.tab-label[_ngcontent-%COMP%]   .tab-icon.error[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.tab-label[_ngcontent-%COMP%]   .tab-icon.info[_ngcontent-%COMP%] {\n  color: var(--color-info);\n}\n.tab-label[_ngcontent-%COMP%]   .tab-text[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 500;\n  color: var(--foreground);\n}\n.tab-label[_ngcontent-%COMP%]   .tab-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 22px;\n  height: 22px;\n  padding: 0 8px;\n  border-radius: 9999px;\n  font-size: 0.75rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.tab-label[_ngcontent-%COMP%]   .tab-badge.success[_ngcontent-%COMP%] {\n  background: var(--color-success);\n  color: white;\n}\n.tab-label[_ngcontent-%COMP%]   .tab-badge.error[_ngcontent-%COMP%] {\n  background: var(--color-error);\n  color: white;\n}\n.tab-content[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  height: 100%;\n  overflow: hidden;\n}\n.tab-toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-2);\n  padding: var(--spacing-3);\n  flex-shrink: 0;\n  background: var(--background);\n  border-bottom: 1px solid var(--border);\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mat-mdc-text-field-wrapper {\n  background: var(--background);\n  border-radius: var(--radius-md);\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-notched-outline__leading, \n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-notched-outline__notch, \n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-notched-outline__trailing {\n  border-color: var(--border) !important;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-text-field--focused .mdc-notched-outline__leading, \n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-text-field--focused .mdc-notched-outline__notch, \n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mdc-text-field--focused .mdc-notched-outline__trailing {\n  border-color: var(--ring) !important;\n  border-width: 2px !important;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     .mat-mdc-form-field-flex {\n  height: 36px;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%]     input {\n  font-size: 0.8125rem;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .export-btn[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--spacing-2);\n  padding: 0 var(--spacing-3);\n  height: 36px;\n  border-radius: var(--radius-md);\n  font-size: 0.8125rem;\n  font-weight: 500;\n  border: 1px solid var(--border);\n  background: var(--background);\n  color: var(--foreground);\n  transition: all var(--transition-fast);\n  width: 100%;\n}\n.tab-toolbar[_ngcontent-%COMP%]   .export-btn[_ngcontent-%COMP%]:hover {\n  background: var(--accent);\n  border-color: var(--border);\n}\n.tab-toolbar[_ngcontent-%COMP%]   .export-btn[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.table-wrapper[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: hidden;\n  padding: 0 var(--spacing-md);\n  display: flex;\n  flex-direction: column;\n}\n.table-scroll[_ngcontent-%COMP%] {\n  flex: 1;\n  overflow: auto;\n  border: 1px solid var(--dialog-border);\n  border-radius: var(--radius-md);\n  background: white;\n  -webkit-overflow-scrolling: touch;\n}\n.data-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 600px;\n  border-collapse: collapse;\n}\n.data-table[_ngcontent-%COMP%]   .sticky-col[_ngcontent-%COMP%] {\n  position: sticky;\n  left: 0;\n  z-index: 2;\n  background: inherit;\n}\n.data-table[_ngcontent-%COMP%]   .col-number[_ngcontent-%COMP%] {\n  width: 44px;\n  min-width: 44px;\n  text-align: center;\n  font-weight: 500;\n  font-size: 0.75rem;\n  font-variant-numeric: tabular-nums;\n  color: var(--muted-foreground);\n  background: var(--muted) !important;\n}\n.data-table[_ngcontent-%COMP%]   .col-data[_ngcontent-%COMP%] {\n  padding: var(--spacing-2) var(--spacing-3);\n  font-size: 0.8125rem;\n  white-space: nowrap;\n  color: var(--foreground);\n}\n.data-table[_ngcontent-%COMP%]   .col-errors[_ngcontent-%COMP%] {\n  min-width: 180px;\n  max-width: 300px;\n  white-space: normal;\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-header-row {\n  background: var(--muted);\n  height: 40px;\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-header-cell {\n  font-size: 0.6875rem;\n  font-weight: 600;\n  color: var(--muted-foreground);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  padding: var(--spacing-2) var(--spacing-3);\n  border-bottom: 1px solid var(--border);\n  background: var(--muted);\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-header-cell .mat-sort-header-arrow {\n  color: var(--muted-foreground);\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-cell {\n  border-bottom: 1px solid var(--border);\n  vertical-align: middle;\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-row {\n  height: 44px;\n  transition: background var(--transition-fast);\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-row:hover {\n  background: var(--muted);\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-row:last-child .mat-mdc-cell {\n  border-bottom: none;\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-row:nth-child(even) {\n  background: rgba(0, 0, 0, 0.02);\n}\n.data-table[_ngcontent-%COMP%]     .mat-mdc-row:nth-child(even):hover {\n  background: var(--muted);\n}\n.data-table.invalid-table[_ngcontent-%COMP%]     .mat-mdc-row.invalid-row {\n  border-left: 3px solid var(--color-error);\n  background: var(--color-error-bg);\n}\n.data-table.invalid-table[_ngcontent-%COMP%]     .mat-mdc-row.invalid-row:hover {\n  background: var(--color-error-border);\n}\n.error-chips[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-1);\n  padding: var(--spacing-1) 0;\n}\n.error-chip[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 3px 8px;\n  border-radius: 9999px;\n  font-size: 0.6875rem;\n  font-weight: 500;\n  background: var(--color-error-bg);\n  color: var(--color-error-text);\n  border: 1px solid var(--color-error-border);\n  line-height: 1.4;\n}\n.error-chip[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  margin-right: 3px;\n  font-weight: 600;\n}\n.no-data[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  gap: var(--spacing-3);\n  padding: var(--spacing-8);\n  color: var(--muted-foreground);\n}\n.no-data[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  opacity: 0.4;\n}\n.no-data[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n}\n.paginator-wrapper[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  padding: var(--spacing-2) var(--spacing-3);\n  background: var(--background);\n  border-top: 1px solid var(--border);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator {\n  background: transparent;\n  font-size: 0.8125rem;\n  color: var(--muted-foreground);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-container {\n  padding: 0;\n  min-height: 36px;\n  justify-content: space-between;\n  flex-wrap: wrap;\n  gap: var(--spacing-2);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-page-size {\n  display: none;\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-page-size .mat-mdc-paginator-page-size-label {\n  font-size: 0.8125rem;\n  color: var(--muted-foreground);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-page-size .mat-mdc-select {\n  font-size: 0.8125rem;\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-range-label {\n  font-size: 0.8125rem;\n  color: var(--muted-foreground);\n  margin: 0 var(--spacing-3);\n  font-variant-numeric: tabular-nums;\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-range-actions {\n  gap: var(--spacing-1);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-previous .mat-mdc-icon-button, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-next .mat-mdc-icon-button, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-first .mat-mdc-icon-button, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-last .mat-mdc-icon-button {\n  width: 32px;\n  height: 32px;\n  padding: 4px;\n  border-radius: var(--radius-md);\n  border: 1px solid var(--border);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-previous .mat-mdc-icon-button:not([disabled]):hover, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-next .mat-mdc-icon-button:not([disabled]):hover, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-first .mat-mdc-icon-button:not([disabled]):hover, \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-last .mat-mdc-icon-button:not([disabled]):hover {\n  background: var(--accent);\n}\n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-previous .mat-mdc-icon-button[disabled], \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-next .mat-mdc-icon-button[disabled], \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-first .mat-mdc-icon-button[disabled], \n.paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-navigation-last .mat-mdc-icon-button[disabled] {\n  opacity: 0.5;\n}\n.summary-tab[_ngcontent-%COMP%] {\n  overflow-y: auto;\n  -webkit-overflow-scrolling: touch;\n}\n.summary-content[_ngcontent-%COMP%] {\n  padding: var(--spacing-4);\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-4);\n}\n.summary-overview[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(2, 1fr);\n  gap: var(--spacing-3);\n}\n.overview-card[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-3);\n  padding: var(--spacing-4);\n  border-radius: var(--radius-lg);\n  background: var(--card);\n  border: 1px solid var(--border);\n  box-shadow: var(--shadow-sm);\n  transition: all var(--transition-fast);\n}\n.overview-card[_ngcontent-%COMP%]:hover {\n  box-shadow: var(--shadow);\n}\n.overview-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n}\n.overview-card.total[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--color-info);\n}\n.overview-card.total[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--color-info);\n}\n.overview-card.valid[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--color-success);\n}\n.overview-card.valid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--color-success);\n}\n.overview-card.invalid[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--color-error);\n}\n.overview-card.invalid[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--color-error);\n}\n.overview-card.percent[_ngcontent-%COMP%] {\n  border-left: 3px solid var(--color-warning);\n}\n.overview-card.percent[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--color-warning);\n}\n.overview-card[_ngcontent-%COMP%]   .overview-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.overview-card[_ngcontent-%COMP%]   .overview-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--foreground);\n  letter-spacing: -0.025em;\n  font-variant-numeric: tabular-nums;\n}\n.overview-card[_ngcontent-%COMP%]   .overview-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--muted-foreground);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.error-summary-section[_ngcontent-%COMP%] {\n  background: var(--card);\n  border-radius: var(--radius-lg);\n  padding: var(--spacing-4);\n  border: 1px solid var(--border);\n}\n.error-summary-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-2);\n  margin: 0 0 var(--spacing-4);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--foreground);\n}\n.error-summary-section[_ngcontent-%COMP%]   .section-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--color-warning);\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-2);\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-item[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  padding: var(--spacing-3) var(--spacing-4);\n  background: var(--color-error-bg);\n  border: 1px solid var(--color-error-border);\n  border-radius: var(--radius-md);\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-item[_ngcontent-%COMP%]   .error-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 2px;\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-item[_ngcontent-%COMP%]   .error-field[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--color-error-text);\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-item[_ngcontent-%COMP%]   .error-type[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--color-error);\n}\n.error-summary-section[_ngcontent-%COMP%]   .error-item[_ngcontent-%COMP%]   .error-count[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 26px;\n  height: 26px;\n  padding: 0 8px;\n  border-radius: 9999px;\n  background: var(--color-error);\n  color: white;\n  font-size: 0.75rem;\n  font-weight: 600;\n  font-variant-numeric: tabular-nums;\n}\n.rules-panel[_ngcontent-%COMP%] {\n  border-radius: var(--radius-lg) !important;\n  box-shadow: none !important;\n  border: 1px solid var(--border);\n  background: var(--card);\n}\n.rules-panel[_ngcontent-%COMP%]     .mat-expansion-panel-header {\n  padding: var(--spacing-4);\n}\n.rules-panel[_ngcontent-%COMP%]     .mat-expansion-panel-header .mat-expansion-panel-header-title {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-2);\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--foreground);\n}\n.rules-panel[_ngcontent-%COMP%]     .mat-expansion-panel-header .mat-expansion-panel-header-title mat-icon {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n  color: var(--color-info);\n}\n.rules-panel[_ngcontent-%COMP%]     .mat-expansion-panel-body {\n  padding: 0 var(--spacing-4) var(--spacing-4);\n}\n.rules-panel[_ngcontent-%COMP%]   .rules-list[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-2);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%] {\n  padding: var(--spacing-3) var(--spacing-4);\n  background: var(--muted);\n  border-radius: var(--radius-md);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%]   .rule-field[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--foreground);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%]   .rule-details[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: var(--spacing-2);\n  margin-top: var(--spacing-1);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%]   .rule-details[_ngcontent-%COMP%]   .rule-type[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--muted-foreground);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%]   .rule-details[_ngcontent-%COMP%]   .rule-required[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  padding: 2px 8px;\n  border-radius: 9999px;\n  background: var(--color-error-bg);\n  color: var(--color-error-text);\n  border: 1px solid var(--color-error-border);\n}\n.rules-panel[_ngcontent-%COMP%]   .rule-item[_ngcontent-%COMP%]   .rule-details[_ngcontent-%COMP%]   .rule-range[_ngcontent-%COMP%] {\n  font-size: 0.6875rem;\n  padding: 2px 8px;\n  border-radius: 9999px;\n  background: var(--color-info-bg);\n  color: var(--color-info-text);\n  border: 1px solid var(--color-info-border);\n}\n.dialog-footer[_ngcontent-%COMP%] {\n  flex-shrink: 0;\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-3);\n  padding: var(--spacing-3) var(--spacing-4);\n  background: var(--muted);\n  border-top: 1px solid var(--border);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-info[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: var(--spacing-2);\n  font-size: 0.8125rem;\n  color: var(--muted-foreground);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-info[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n  color: var(--color-info);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-info[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: var(--color-success);\n  font-weight: 600;\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: var(--spacing-2);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  gap: var(--spacing-2);\n  padding: 0 var(--spacing-4);\n  height: 40px;\n  border-radius: var(--radius-md);\n  font-size: 0.875rem;\n  font-weight: 500;\n  transition: all var(--transition-fast);\n  cursor: pointer;\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 16px;\n  width: 16px;\n  height: 16px;\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%] {\n  background: var(--background);\n  border: 1px solid var(--border);\n  color: var(--foreground);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   .btn-cancel[_ngcontent-%COMP%]:hover {\n  background: var(--accent);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%] {\n  background: var(--color-success);\n  border: none;\n  color: white;\n  font-weight: 600;\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:hover:not(:disabled) {\n  background: var(--color-success-text);\n}\n.dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   .btn-confirm[_ngcontent-%COMP%]:disabled {\n  background: var(--muted);\n  color: var(--muted-foreground);\n  cursor: not-allowed;\n}\n@media (min-width: 600px) {\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: var(--spacing-4) var(--spacing-5);\n  }\n  .dialog-header[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%] {\n    font-size: 1.125rem;\n  }\n  .dialog-header[_ngcontent-%COMP%]   .file-name[_ngcontent-%COMP%] {\n    font-size: 0.8125rem;\n  }\n  .compact-stats[_ngcontent-%COMP%] {\n    gap: var(--spacing-3);\n  }\n  .compact-stat[_ngcontent-%COMP%] {\n    padding: var(--spacing-2) var(--spacing-4);\n    font-size: 0.875rem;\n  }\n  .compact-stat[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 18px;\n    width: 18px;\n    height: 18px;\n  }\n  .tab-toolbar[_ngcontent-%COMP%] {\n    flex-direction: row;\n    align-items: center;\n  }\n  .tab-toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n    flex: 1;\n    max-width: 400px;\n  }\n  .tab-toolbar[_ngcontent-%COMP%]   .export-btn[_ngcontent-%COMP%] {\n    width: auto;\n    min-width: 120px;\n  }\n  .summary-overview[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(4, 1fr);\n  }\n  .overview-card[_ngcontent-%COMP%]   .overview-value[_ngcontent-%COMP%] {\n    font-size: 1.75rem;\n  }\n  .paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-page-size {\n    display: flex;\n  }\n  .paginator-wrapper[_ngcontent-%COMP%]     .mat-mdc-paginator-container {\n    justify-content: flex-end;\n  }\n  .dialog-footer[_ngcontent-%COMP%] {\n    flex-direction: row;\n    justify-content: space-between;\n    align-items: center;\n  }\n  .dialog-footer[_ngcontent-%COMP%]   .footer-info[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%] {\n    flex-direction: row;\n    gap: var(--spacing-3);\n  }\n  .dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 120px;\n  }\n}\n@media (min-width: 960px) {\n  .dialog-header[_ngcontent-%COMP%] {\n    padding: var(--spacing-4) var(--spacing-6);\n  }\n  .dialog-header[_ngcontent-%COMP%]   .dialog-title[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n  .compact-stat[_ngcontent-%COMP%] {\n    padding: var(--spacing-2) var(--spacing-5);\n  }\n  .tab-toolbar[_ngcontent-%COMP%] {\n    padding: var(--spacing-5);\n  }\n  .table-wrapper[_ngcontent-%COMP%] {\n    padding: 0 var(--spacing-5);\n  }\n  .data-table[_ngcontent-%COMP%]   .col-data[_ngcontent-%COMP%] {\n    padding: var(--spacing-4) var(--spacing-5);\n  }\n  .summary-content[_ngcontent-%COMP%] {\n    padding: var(--spacing-5);\n    gap: var(--spacing-5);\n  }\n  .summary-overview[_ngcontent-%COMP%] {\n    gap: var(--spacing-4);\n  }\n  .overview-card[_ngcontent-%COMP%] {\n    padding: var(--spacing-5);\n  }\n  .overview-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 28px;\n    width: 28px;\n    height: 28px;\n  }\n  .overview-card[_ngcontent-%COMP%]   .overview-value[_ngcontent-%COMP%] {\n    font-size: 2rem;\n  }\n  .overview-card[_ngcontent-%COMP%]   .overview-label[_ngcontent-%COMP%] {\n    font-size: 0.75rem;\n  }\n  .dialog-footer[_ngcontent-%COMP%] {\n    padding: var(--spacing-4) var(--spacing-6);\n  }\n  .dialog-footer[_ngcontent-%COMP%]   .footer-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    min-width: 140px;\n    height: 40px;\n  }\n}\n@media (min-width: 1280px) {\n  .overview-card[_ngcontent-%COMP%]   .overview-value[_ngcontent-%COMP%] {\n    font-size: 2.25rem;\n  }\n}\n.cell-error[_ngcontent-%COMP%] {\n  background: var(--color-error-bg) !important;\n  color: var(--color-error-text) !important;\n}\n@keyframes _ngcontent-%COMP%_fadeIn {\n  from {\n    opacity: 0;\n    transform: translateY(10px);\n  }\n  to {\n    opacity: 1;\n    transform: translateY(0);\n  }\n}\n.import-preview-dialog[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_fadeIn 0.2s ease-out;\n}\n.table-scroll[_ngcontent-%COMP%]::-webkit-scrollbar, \n.summary-tab[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 10px;\n  height: 10px;\n}\n.table-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-track, \n.summary-tab[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.table-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb, \n.summary-tab[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: var(--border);\n  border-radius: 9999px;\n  border: 2px solid transparent;\n  background-clip: content-box;\n}\n.table-scroll[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover, \n.summary-tab[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: var(--muted-foreground);\n  background-clip: content-box;\n}\n@media (hover: none) and (pointer: coarse) {\n  .stat-card[_ngcontent-%COMP%], \n   .overview-card[_ngcontent-%COMP%], \n   .error-item[_ngcontent-%COMP%], \n   .rule-item[_ngcontent-%COMP%] {\n    transition: transform 0.1s ease;\n  }\n  .stat-card[_ngcontent-%COMP%]:active, \n   .overview-card[_ngcontent-%COMP%]:active, \n   .error-item[_ngcontent-%COMP%]:active, \n   .rule-item[_ngcontent-%COMP%]:active {\n    transform: scale(0.98);\n  }\n  .data-table[_ngcontent-%COMP%]     .mat-mdc-row:active {\n    background: var(--muted);\n  }\n}\n/*# sourceMappingURL=import-preview-dialog.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportPreviewDialogComponent, { className: "ImportPreviewDialogComponent", filePath: "src/app/shared/components/import-preview-dialog/import-preview-dialog.component.ts", lineNumber: 49 });
})();

// src/app/shared/services/import-data.service.ts
var ImportDataService = class _ImportDataService {
  dialog;
  snackBar;
  constructor(dialog, snackBar) {
    this.dialog = dialog;
    this.snackBar = snackBar;
  }
  /**
   * Mở dialog import với preview dữ liệu
   */
  openImportDialog(config) {
    return __async(this, null, function* () {
      try {
        const fileInput = document.createElement("input");
        fileInput.type = "file";
        fileInput.accept = config.allowedFileTypes?.join(",") || ".xlsx,.xls,.csv";
        return new Promise((resolve) => {
          fileInput.onchange = (event) => __async(this, null, function* () {
            const file = event.target.files[0];
            if (!file) {
              resolve(null);
              return;
            }
            try {
              let rawData = [];
              try {
                rawData = yield readExcelFileNoWorkerArray(event);
              } catch (workerError) {
                console.warn("readExcelFileNoWorkerArray failed, trying readExcelFile:", workerError);
                rawData = yield readExcelFile(event);
              }
              if (!rawData || rawData.length === 0) {
                this.showError("File r\u1ED7ng ho\u1EB7c kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c");
                resolve(null);
                return;
              }
              const validationRules = config.validationRules || DataValidator.getValidationRules(config.entityType);
              const validationResult = DataValidator.validateData(rawData, validationRules);
              const dialogRef = this.dialog.open(ImportPreviewDialogComponent, {
                width: "100%",
                maxWidth: "1200px",
                height: "95vh",
                maxHeight: "95vh",
                panelClass: "import-preview-dialog-panel",
                data: {
                  rawData,
                  validationResult,
                  config,
                  fileName: file.name
                },
                disableClose: true,
                autoFocus: false
              });
              const result = yield dialogRef.afterClosed().toPromise();
              resolve(result || null);
            } catch (error) {
              console.error("Error processing import file:", error);
              this.showError("L\u1ED7i khi x\u1EED l\xFD file: " + error.message);
              resolve(null);
            }
          });
          fileInput.click();
        });
      } catch (error) {
        console.error("Error opening import dialog:", error);
        this.showError("L\u1ED7i khi m\u1EDF dialog import");
        return null;
      }
    });
  }
  /**
   * Import dữ liệu trực tiếp từ file event
   */
  importFromFile(event, config) {
    return __async(this, null, function* () {
      try {
        let rawData = [];
        try {
          rawData = yield readExcelFileNoWorkerArray(event);
        } catch (workerError) {
          console.warn("readExcelFileNoWorkerArray failed, trying readExcelFile:", workerError);
          rawData = yield readExcelFile(event);
        }
        if (!rawData || rawData.length === 0) {
          return {
            success: false,
            validData: [],
            invalidData: [],
            errors: [],
            message: "File r\u1ED7ng ho\u1EB7c kh\xF4ng \u0111\u1ECDc \u0111\u01B0\u1EE3c"
          };
        }
        if (config.maxRows && rawData.length > config.maxRows) {
          return {
            success: false,
            validData: [],
            invalidData: rawData,
            errors: [{
              message: `S\u1ED1 d\xF2ng d\u1EEF li\u1EC7u (${rawData.length}) v\u01B0\u1EE3t qu\xE1 gi\u1EDBi h\u1EA1n cho ph\xE9p (${config.maxRows})`
            }],
            message: `S\u1ED1 d\xF2ng d\u1EEF li\u1EC7u v\u01B0\u1EE3t qu\xE1 gi\u1EDBi h\u1EA1n`
          };
        }
        const validationRules = config.validationRules || DataValidator.getValidationRules(config.entityType);
        const validationResult = DataValidator.validateData(rawData, validationRules);
        return {
          success: validationResult.isValid,
          validData: validationResult.validData,
          invalidData: validationResult.invalidData,
          errors: validationResult.errors,
          message: validationResult.isValid ? `Import th\xE0nh c\xF4ng ${validationResult.validData.length} d\xF2ng d\u1EEF li\u1EC7u` : `C\xF3 ${validationResult.errors.length} l\u1ED7i trong d\u1EEF li\u1EC7u`
        };
      } catch (error) {
        console.error("Error importing data:", error);
        return {
          success: false,
          validData: [],
          invalidData: [],
          errors: [{ message: error.message }],
          message: "L\u1ED7i khi import d\u1EEF li\u1EC7u"
        };
      }
    });
  }
  /**
   * Validate dữ liệu theo rules
   */
  validateImportData(data, rules) {
    return DataValidator.validateData(data, rules);
  }
  /**
   * Transform dữ liệu theo kiểu entity
   */
  transformDataForEntity(data, entityType) {
    switch (entityType) {
      case "sanpham":
        return this.transformSanphamData(data);
      case "khachhang":
        return this.transformKhachhangData(data);
      case "donhang":
        return this.transformDonhangData(data);
      case "nhanvien":
        return this.transformNhanvienData(data);
      default:
        return data;
    }
  }
  /**
   * Transform data for sanpham entity
   */
  transformSanphamData(data) {
    return data.map((item) => ({
      title: item.title?.trim() || "",
      masp: item.masp?.trim() || "",
      giagoc: Number(item.giagoc) || 0,
      dvt: item.dvt?.trim() || "",
      soluong: Number(item.soluong) || 0,
      soluongkho: Number(item.soluongkho) || 0,
      haohut: Number(item.haohut) || 0,
      ghichu: item.ghichu?.trim() || "",
      order: Number(item.order) || 0
    }));
  }
  /**
   * Transform data for khachhang entity
   */
  transformKhachhangData(data) {
    return data.map((item) => ({
      name: item.name?.trim() || "",
      mancc: item.mancc?.trim() || "",
      sdt: item.sdt?.trim() || "",
      diachi: item.diachi?.trim() || "",
      ghichu: item.ghichu?.trim() || ""
    }));
  }
  /**
   * Transform data for donhang entity
   */
  transformDonhangData(data) {
    return data.map((item) => ({
      masp: item.masp?.trim() || "",
      sldat: Number(item.sldat) || 0,
      slgiao: Number(item.slgiao) || 0,
      slnhan: Number(item.slnhan) || 0,
      giaban: Number(item.giaban) || 0,
      ttdat: Number(item.ttdat) || 0,
      ttgiao: Number(item.ttgiao) || 0,
      ttnhan: Number(item.ttnhan) || 0,
      ghichu: item.ghichu?.trim() || ""
    }));
  }
  /**
   * Transform data for nhanvien entity
   */
  transformNhanvienData(data) {
    return data.map((item) => ({
      maNV: String(item["M\xE3 NV"] || item.maNV || "").trim(),
      maLamViec: String(item["M\xE3 L\xE0m Vi\u1EC7c"] || item.maLamViec || "").trim() || null,
      hoTen: String(item["H\u1ECD v\xE0 T\xEAn"] || item.hoTen || "").trim(),
      gioiTinh: item["Gi\u1EDBi T\xEDnh"] || item.gioiTinh || null,
      ngaySinh: item["Ng\xE0y Sinh"] || item.ngaySinh || null,
      cmnd: String(item["CMND/CCCD"] || item.cmnd || "").trim() || null,
      soDienThoai: String(item["S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i"] || item.soDienThoai || "").trim() || null,
      email: String(item["Email"] || item.email || "").trim() || null,
      diaChiHienTai: String(item["\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i"] || item.diaChiHienTai || "").trim() || null,
      chucVu: String(item["Ch\u1EE9c V\u1EE5"] || item.chucVu || "").trim() || null,
      viTri: String(item["V\u1ECB Tr\xED"] || item.viTri || "").trim() || null,
      ngayVaoLam: item["Ng\xE0y V\xE0o L\xE0m"] || item.ngayVaoLam || null,
      trangThai: item["Tr\u1EA1ng Th\xE1i"] || item.trangThai || "THUVIEC",
      luongCoBan: Number(item["L\u01B0\u01A1ng C\u01A1 B\u1EA3n"] || item.luongCoBan) || 0,
      hieuSuatCongViec: Number(item["Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c"] || item.hieuSuatCongViec) || 0,
      phuCapXang: Number(item["Ph\u1EE5 C\u1EA5p X\u0103ng"] || item.phuCapXang) || 0,
      phuCapDienThoai: Number(item["Ph\u1EE5 C\u1EA5p \u0110T"] || item.phuCapDienThoai) || 0,
      hoTroChuyenCan: Number(item["H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n"] || item.hoTroChuyenCan) || 0,
      tienAnGiuaCa: Number(item["Ti\u1EC1n \u0102n Gi\u1EEFa Ca"] || item.tienAnGiuaCa) || 0,
      thuongKinhDoanh: Number(item["Th\u01B0\u1EDFng Kinh Doanh"] || item.thuongKinhDoanh) || 0,
      phuCapKhac: Number(item["Ph\u1EE5 C\u1EA5p Kh\xE1c"] || item.phuCapKhac) || 0,
      soTaiKhoan: String(item["S\u1ED1 T\xE0i Kho\u1EA3n"] || item.soTaiKhoan || "").trim() || null,
      nganHang: String(item["Ng\xE2n H\xE0ng"] || item.nganHang || "").trim() || null,
      chiNhanh: String(item["Chi Nh\xE1nh"] || item.chiNhanh || "").trim() || null,
      ghiChu: String(item["Ghi Ch\xFA"] || item.ghiChu || "").trim() || null
    }));
  }
  /**
   * Show error message
   */
  showError(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 5e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    });
  }
  /**
   * Show success message
   */
  showSuccess(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 3e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  /**
   * Get default import config for entity
   */
  getDefaultConfig(entityType) {
    const configs = {
      sanpham: {
        entityType: "sanpham",
        maxRows: 1e3,
        allowedFileTypes: [".xlsx", ".xls"],
        requiredFields: ["title", "masp"]
      },
      khachhang: {
        entityType: "khachhang",
        maxRows: 500,
        allowedFileTypes: [".xlsx", ".xls"],
        requiredFields: ["name", "mancc"]
      },
      donhang: {
        entityType: "donhang",
        maxRows: 2e3,
        allowedFileTypes: [".xlsx", ".xls"],
        requiredFields: ["masp", "sldat"]
      },
      nhanvien: {
        entityType: "nhanvien",
        maxRows: 500,
        allowedFileTypes: [".xlsx", ".xls"],
        requiredFields: ["M\xE3 NV", "H\u1ECD v\xE0 T\xEAn"]
      }
    };
    return configs[entityType] || {
      entityType,
      maxRows: 1e3,
      allowedFileTypes: [".xlsx", ".xls"]
    };
  }
  static \u0275fac = function ImportDataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportDataService)(\u0275\u0275inject(MatDialog), \u0275\u0275inject(MatSnackBar));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImportDataService, factory: _ImportDataService.\u0275fac, providedIn: "root" });
};

// src/app/admin/user/listuser/confirm-dialog.component.ts
var ConfirmDialogComponent = class _ConfirmDialogComponent {
  dialogRef;
  data;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  static \u0275fac = function ConfirmDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ConfirmDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ConfirmDialogComponent, selectors: [["app-confirm-dialog"]], decls: 10, vars: 2, consts: [[1, "p-6"], [1, "text-lg", "font-semibold", "mb-4"], [1, "text-gray-600", "mb-6"], [1, "flex", "justify-end", "gap-3"], ["mat-button", "", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"]], template: function ConfirmDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "p", 2);
      \u0275\u0275text(4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3)(6, "button", 4);
      \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_6_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(7, "H\u1EE7y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "button", 5);
      \u0275\u0275listener("click", function ConfirmDialogComponent_Template_button_click_8_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275text(9, "X\xE1c nh\u1EADn");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.data.message);
    }
  }, dependencies: [MatButtonModule, MatButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ConfirmDialogComponent, { className: "ConfirmDialogComponent", filePath: "src/app/admin/user/listuser/confirm-dialog.component.ts", lineNumber: 20 });
})();

// src/app/admin/nhanvien/listnhanvien/listnhanvien.component.ts
var _c02 = () => [10, 25, 50, 100];
function ListNhanvienComponent_div_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26)(1, "div", 27)(2, "div", 28)(3, "mat-icon");
    \u0275\u0275text(4, "groups");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div", 29)(6, "span", 30);
    \u0275\u0275text(7, "T\u1ED5ng s\u1ED1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "span", 31);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(10, "div", 32)(11, "div", 28)(12, "mat-icon");
    \u0275\u0275text(13, "check_circle");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 29)(15, "span", 30);
    \u0275\u0275text(16, "\u0110ang l\xE0m vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 31);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "div", 33)(20, "div", 28)(21, "mat-icon");
    \u0275\u0275text(22, "schedule");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "div", 29)(24, "span", 30);
    \u0275\u0275text(25, "Th\u1EED vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "span", 31);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 34)(29, "div", 28)(30, "mat-icon");
    \u0275\u0275text(31, "person_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "div", 29)(33, "span", 30);
    \u0275\u0275text(34, "\u0110\xE3 ngh\u1EC9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span", 31);
    \u0275\u0275text(36);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    let tmp_3_0;
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(((tmp_3_0 = ctx_r1.statistics()) == null ? null : tmp_3_0.total) || 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(((tmp_4_0 = ctx_r1.statistics()) == null ? null : tmp_4_0.dangLamViec) || 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(((tmp_5_0 = ctx_r1.statistics()) == null ? null : tmp_5_0.thuViec) || 0);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(((tmp_6_0 = ctx_r1.statistics()) == null ? null : tmp_6_0.daNghiViec) || 0);
  }
}
function ListNhanvienComponent_mat_option_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pb_r3 = ctx.$implicit;
    \u0275\u0275property("value", pb_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", pb_r3.ten, " ");
  }
}
function ListNhanvienComponent_mat_option_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 15);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const opt_r4 = ctx.$implicit;
    \u0275\u0275property("value", opt_r4.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", opt_r4.label, " ");
  }
}
function ListNhanvienComponent_div_63_th_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "M\xE3 NV");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.maNV);
  }
}
function ListNhanvienComponent_div_63_th_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "M\xE3 l\xE0m vi\u1EC7c");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r6.maLamViec || "\u2014");
  }
}
function ListNhanvienComponent_div_63_th_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "H\u1ECD v\xE0 t\xEAn");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_10_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r7.email);
  }
}
function ListNhanvienComponent_div_63_td_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 58)(2, "span", 59);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, ListNhanvienComponent_div_63_td_10_span_4_Template, 2, 1, "span", 60);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r7.hoTen);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", row_r7.email);
  }
}
function ListNhanvienComponent_div_63_th_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\u1EDBi t\xEDnh");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getGioiTinhLabel(row_r8.gioiTinh), " ");
  }
}
function ListNhanvienComponent_div_63_th_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "\u0110i\u1EC7n tho\u1EA1i");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r9.soDienThoai || "\u2014");
  }
}
function ListNhanvienComponent_div_63_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Email");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r10.email || "\u2014");
  }
}
function ListNhanvienComponent_div_63_th_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Ph\xF2ng ban");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_22_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r11.phongban.ten);
  }
}
function ListNhanvienComponent_div_63_td_22_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "Ch\u01B0a ph\xE2n");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275template(1, ListNhanvienComponent_div_63_td_22_span_1_Template, 2, 1, "span", 63)(2, ListNhanvienComponent_div_63_td_22_span_2_Template, 2, 0, "span", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", row_r11.phongban == null ? null : row_r11.phongban.ten);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !(row_r11.phongban == null ? null : row_r11.phongban.ten));
  }
}
function ListNhanvienComponent_div_63_th_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Ch\u1EE9c v\u1EE5");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.chucVu || "\u2014");
  }
}
function ListNhanvienComponent_div_63_th_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "V\u1ECB tr\xED");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r13.viTri || "\u2014");
  }
}
function ListNhanvienComponent_div_63_th_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
  }
}
function ListNhanvienComponent_div_63_td_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 66);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r14 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("data-status", row_r14.trangThai);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getTrangThaiLabel(row_r14.trangThai), " ");
  }
}
function ListNhanvienComponent_div_63_th_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "th", 67);
  }
}
function ListNhanvienComponent_div_63_td_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 55)(1, "div", 68)(2, "button", 69);
    \u0275\u0275listener("click", function ListNhanvienComponent_div_63_td_34_Template_button_click_2_listener() {
      const row_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewDetail(row_r16.id));
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 70);
    \u0275\u0275listener("click", function ListNhanvienComponent_div_63_td_34_Template_button_click_5_listener() {
      const row_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.editNhanvien(row_r16.id));
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 71);
    \u0275\u0275listener("click", function ListNhanvienComponent_div_63_td_34_Template_button_click_8_listener() {
      const row_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.deleteNhanvien(row_r16));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "delete");
    \u0275\u0275elementEnd()()()();
  }
}
function ListNhanvienComponent_div_63_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 72);
  }
}
function ListNhanvienComponent_div_63_tr_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 73);
  }
}
function ListNhanvienComponent_div_63_tr_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 74)(1, "td", 75)(2, "div", 76)(3, "mat-icon");
    \u0275\u0275text(4, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p");
    \u0275\u0275text(6, "Kh\xF4ng t\xECm th\u1EA5y nh\xE2n vi\xEAn n\xE0o");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.displayedColumns.length);
  }
}
function ListNhanvienComponent_div_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 35)(1, "table", 36);
    \u0275\u0275elementContainerStart(2, 37);
    \u0275\u0275template(3, ListNhanvienComponent_div_63_th_3_Template, 2, 0, "th", 38)(4, ListNhanvienComponent_div_63_td_4_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(5, 40);
    \u0275\u0275template(6, ListNhanvienComponent_div_63_th_6_Template, 2, 0, "th", 38)(7, ListNhanvienComponent_div_63_td_7_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(8, 41);
    \u0275\u0275template(9, ListNhanvienComponent_div_63_th_9_Template, 2, 0, "th", 38)(10, ListNhanvienComponent_div_63_td_10_Template, 5, 2, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(11, 42);
    \u0275\u0275template(12, ListNhanvienComponent_div_63_th_12_Template, 2, 0, "th", 38)(13, ListNhanvienComponent_div_63_td_13_Template, 2, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(14, 43);
    \u0275\u0275template(15, ListNhanvienComponent_div_63_th_15_Template, 2, 0, "th", 38)(16, ListNhanvienComponent_div_63_td_16_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(17, 44);
    \u0275\u0275template(18, ListNhanvienComponent_div_63_th_18_Template, 2, 0, "th", 38)(19, ListNhanvienComponent_div_63_td_19_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(20, 45);
    \u0275\u0275template(21, ListNhanvienComponent_div_63_th_21_Template, 2, 0, "th", 38)(22, ListNhanvienComponent_div_63_td_22_Template, 3, 2, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(23, 46);
    \u0275\u0275template(24, ListNhanvienComponent_div_63_th_24_Template, 2, 0, "th", 38)(25, ListNhanvienComponent_div_63_td_25_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(26, 47);
    \u0275\u0275template(27, ListNhanvienComponent_div_63_th_27_Template, 2, 0, "th", 38)(28, ListNhanvienComponent_div_63_td_28_Template, 3, 1, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(29, 48);
    \u0275\u0275template(30, ListNhanvienComponent_div_63_th_30_Template, 2, 0, "th", 38)(31, ListNhanvienComponent_div_63_td_31_Template, 3, 2, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(32, 49);
    \u0275\u0275template(33, ListNhanvienComponent_div_63_th_33_Template, 1, 0, "th", 50)(34, ListNhanvienComponent_div_63_td_34_Template, 11, 0, "td", 39);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(35, ListNhanvienComponent_div_63_tr_35_Template, 1, 0, "tr", 51)(36, ListNhanvienComponent_div_63_tr_36_Template, 1, 0, "tr", 52)(37, ListNhanvienComponent_div_63_tr_37_Template, 7, 1, "tr", 53);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(34);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function ListNhanvienComponent_ng_template_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 77);
    \u0275\u0275element(1, "mat-spinner", 78);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
var ListNhanvienComponent = class _ListNhanvienComponent {
  nhanvienService = inject(NhanvienService);
  phongbanService = inject(PhongbanService);
  importDataService = inject(ImportDataService);
  router = inject(Router);
  dialog = inject(MatDialog);
  snackBar = inject(MatSnackBar);
  paginator;
  sort;
  // Data source
  dataSource = new MatTableDataSource([]);
  displayedColumns = [
    "maNV",
    "maLamViec",
    "hoTen",
    "gioiTinh",
    "soDienThoai",
    "email",
    "phongban",
    "chucVu",
    "viTri",
    "trangThai",
    "actions"
  ];
  // Signals
  loading = signal(false);
  total = signal(0);
  page = signal(1);
  limit = signal(50);
  searchTerm = signal("");
  selectedPhongban = signal(null);
  selectedTrangThai = signal(null);
  // Statistics
  statistics = computed(() => {
    const stats = this.nhanvienService.Statistics();
    if (!stats)
      return null;
    const byStatus = stats.byTrangThai || [];
    const dangLamViec = byStatus.find((s) => s.trangThai === TrangThaiNhanvien.DANGLAMVIEC)?._count || 0;
    const thuViec = byStatus.find((s) => s.trangThai === TrangThaiNhanvien.THUVIEC)?._count || 0;
    const daNghiViec = byStatus.find((s) => s.trangThai === TrangThaiNhanvien.DANGHIVIEC)?._count || 0;
    return __spreadProps(__spreadValues({}, stats), {
      dangLamViec,
      thuViec,
      daNghiViec
    });
  });
  // Data
  phongbans = signal([]);
  // Enums for template
  trangThaiOptions = Object.entries(TrangThaiNhanvienLabels).map(([value, label]) => ({
    value,
    label
  }));
  ngOnInit() {
    this.loadData();
    this.loadPhongbans();
    this.loadStatistics();
  }
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "phongban":
          return item.phongban?.ten?.toLowerCase() || "";
        case "hoTen":
          return item.hoTen?.toLowerCase() || "";
        case "maNV":
          return item.maNV?.toLowerCase() || "";
        case "maLamViec":
          return item.maLamViec?.toLowerCase() || "";
        case "chucVu":
          return item.chucVu?.toLowerCase() || "";
        case "viTri":
          return item.viTri?.toLowerCase() || "";
        case "email":
          return item.email?.toLowerCase() || "";
        case "soDienThoai":
          return item.soDienThoai || "";
        case "trangThai":
          return item.trangThai || "";
        case "gioiTinh":
          return item.gioiTinh || "";
        default:
          return item[property] || "";
      }
    };
    this.dataSource.filterPredicate = (data, filter) => {
      const searchStr = filter.toLowerCase();
      return data.maNV?.toLowerCase().includes(searchStr) || false || (data.hoTen?.toLowerCase().includes(searchStr) || false) || (data.email?.toLowerCase().includes(searchStr) || false) || (data.soDienThoai?.includes(searchStr) || false) || (data.chucVu?.toLowerCase().includes(searchStr) || false) || (data.viTri?.toLowerCase().includes(searchStr) || false) || (data.phongban?.ten?.toLowerCase().includes(searchStr) || false);
    };
    if (this.sort) {
      this.dataSource.sort = this.sort;
    }
    if (this.paginator) {
      this.dataSource.paginator = this.paginator;
    }
  }
  loadData() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const response = yield this.nhanvienService.getAllNhanvien({
          page: this.page(),
          limit: this.limit(),
          search: this.searchTerm() || void 0,
          phongbanId: this.selectedPhongban() || void 0,
          trangThai: this.selectedTrangThai() || void 0
        });
        this.dataSource.data = response.data;
        this.total.set(response.total);
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
        if (this.paginator) {
          this.dataSource.paginator = this.paginator;
          this.paginator.length = response.total;
        }
      } catch (error) {
        console.error("Error loading nhanvien:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  loadPhongbans() {
    return __async(this, null, function* () {
      try {
        const phongbans = yield this.phongbanService.getAllPhongban({
          includeChildren: false
        });
        this.phongbans.set(phongbans);
      } catch (error) {
        console.error("Error loading phongbans:", error);
      }
    });
  }
  loadStatistics() {
    return __async(this, null, function* () {
      try {
        yield this.nhanvienService.getStatistics();
      } catch (error) {
        console.error("Error loading statistics:", error);
      }
    });
  }
  onSearch(event) {
    const value = event.target.value;
    this.searchTerm.set(value);
    this.page.set(1);
    this.loadData();
  }
  onPhongbanFilter(phongbanId) {
    this.selectedPhongban.set(phongbanId);
    this.page.set(1);
    this.loadData();
  }
  onTrangThaiFilter(trangThai) {
    this.selectedTrangThai.set(trangThai);
    this.page.set(1);
    this.loadData();
  }
  clearFilters() {
    this.searchTerm.set("");
    this.selectedPhongban.set(null);
    this.selectedTrangThai.set(null);
    this.page.set(1);
    this.loadData();
  }
  onPageChange(event) {
    this.page.set(event.pageIndex + 1);
    this.limit.set(event.pageSize);
    this.loadData();
  }
  getTrangThaiLabel(trangThai) {
    return TrangThaiNhanvienLabels[trangThai] || trangThai;
  }
  getTrangThaiColor(trangThai) {
    const colors = {
      [TrangThaiNhanvien.DANGLAMVIEC]: "#4CAF50",
      [TrangThaiNhanvien.NGHIPHEP]: "#2196F3",
      [TrangThaiNhanvien.THUVIEC]: "#FFC107",
      [TrangThaiNhanvien.DANGHIVIEC]: "#9E9E9E",
      [TrangThaiNhanvien.TAMNGHI]: "#FF9800",
      [TrangThaiNhanvien.KHAC]: "#9C27B0"
    };
    return colors[trangThai] || "#757575";
  }
  getGioiTinhLabel(gioiTinh) {
    if (!gioiTinh)
      return "N/A";
    return GioiTinhLabels[gioiTinh] || gioiTinh;
  }
  viewDetail(id) {
    this.router.navigate(["/admin/nhanvien/detail", id]);
  }
  editNhanvien(id) {
    this.router.navigate(["/admin/nhanvien/edit", id]);
  }
  deleteNhanvien(nhanvien) {
    return __async(this, null, function* () {
      const dialogRef = this.dialog.open(ConfirmDialogComponent, {
        width: "400px",
        data: {
          title: "X\xE1c nh\u1EADn x\xF3a nh\xE2n vi\xEAn",
          message: `B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a nh\xE2n vi\xEAn "${nhanvien.hoTen}" (${nhanvien.maNV})?

H\xE0nh \u0111\u1ED9ng n\xE0y kh\xF4ng th\u1EC3 ho\xE0n t\xE1c!`
        }
      });
      const confirmed = yield firstValueFrom(dialogRef.afterClosed());
      if (confirmed) {
        try {
          yield this.nhanvienService.deleteNhanvien(nhanvien.id);
          this.snackBar.open(`\u0110\xE3 x\xF3a nh\xE2n vi\xEAn "${nhanvien.hoTen}" th\xE0nh c\xF4ng`, "\u0110\xF3ng", { duration: 3e3, panelClass: "snackbar-success" });
          this.loadData();
          this.loadStatistics();
        } catch (error) {
          console.error("Error deleting nhanvien:", error);
          this.snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi x\xF3a nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3, panelClass: "snackbar-error" });
        }
      }
    });
  }
  createNew() {
    this.router.navigate(["/admin/nhanvien/create"]);
  }
  exportExcel() {
    return __async(this, null, function* () {
      yield this.nhanvienService.exportToExcel();
    });
  }
  exportTemplate() {
    this.nhanvienService.exportImportTemplate();
  }
  importExcel() {
    return __async(this, null, function* () {
      const result = yield this.importDataService.openImportDialog({
        entityType: "nhanvien",
        maxRows: 500,
        allowedFileTypes: [".xlsx", ".xls"],
        requiredFields: ["M\xE3 NV", "H\u1ECD v\xE0 T\xEAn"]
      });
      if (result && result.validData && result.validData.length > 0) {
        try {
          this.loading.set(true);
          const importResult = yield this.nhanvienService.importFromExcel(result.validData);
          let message = `Import th\xE0nh c\xF4ng: ${importResult.success} nh\xE2n vi\xEAn`;
          if (importResult.failed > 0) {
            message += `, th\u1EA5t b\u1EA1i: ${importResult.failed}`;
          }
          this.snackBar.open(message, "\u0110\xF3ng", {
            duration: 5e3,
            panelClass: importResult.failed > 0 ? "snackbar-warning" : "snackbar-success"
          });
          if (importResult.errors.length > 0) {
            console.error("Import errors:", importResult.errors);
          }
          this.loadData();
          this.loadStatistics();
        } catch (error) {
          console.error("Error importing:", error);
          this.snackBar.open("L\u1ED7i khi import d\u1EEF li\u1EC7u", "\u0110\xF3ng", { duration: 3e3, panelClass: "snackbar-error" });
        } finally {
          this.loading.set(false);
        }
      }
    });
  }
  static \u0275fac = function ListNhanvienComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListNhanvienComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListNhanvienComponent, selectors: [["app-listnhanvien"]], viewQuery: function ListNhanvienComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 67, vars: 16, consts: [["importMenu", "matMenu"], ["loadingTemplate", ""], [1, "container"], [1, "header-section"], [1, "page-header"], [1, "page-title"], [1, "page-description"], ["class", "stats-cards", 4, "ngIf"], [1, "toolbar-card"], [1, "toolbar"], ["appearance", "outline", 1, "search-field"], ["matInput", "", "placeholder", "T\xECm theo t\xEAn, m\xE3 NV, S\u0110T, email...", 3, "input", "value"], ["matPrefix", ""], ["appearance", "outline"], [3, "selectionChange", "value"], [3, "value"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-icon-button", "", "matTooltip", "X\xF3a b\u1ED9 l\u1ECDc", 3, "click"], [1, "spacer"], ["mat-raised-button", "", "matTooltip", "Xu\u1EA5t danh s\xE1ch nh\xE2n vi\xEAn ra Excel", 3, "click"], ["mat-raised-button", "", "matTooltip", "Nh\u1EADp d\u1EEF li\u1EC7u t\u1EEB Excel", 3, "matMenuTriggerFor"], ["mat-menu-item", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "table-card"], ["class", "table-container", 4, "ngIf", "ngIfElse"], ["showFirstLastButtons", "", 3, "page", "length", "pageSize", "pageSizeOptions", "pageIndex"], [1, "stats-cards"], [1, "stat-card"], [1, "stat-icon"], [1, "stat-info"], [1, "stat-label"], [1, "stat-value"], [1, "stat-card", "active"], [1, "stat-card", "trial"], [1, "stat-card", "inactive"], [1, "table-container"], ["mat-table", "", "matSort", "", 1, "nhanvien-table", 3, "dataSource"], ["matColumnDef", "maNV"], ["mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "maLamViec"], ["matColumnDef", "hoTen"], ["matColumnDef", "gioiTinh"], ["matColumnDef", "soDienThoai"], ["matColumnDef", "email"], ["matColumnDef", "phongban"], ["matColumnDef", "chucVu"], ["matColumnDef", "viTri"], ["matColumnDef", "trangThai"], ["matColumnDef", "actions"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["mat-header-cell", "", "mat-sort-header", ""], ["mat-cell", ""], [1, "badge-code"], [1, "badge-code", "secondary"], [1, "employee-info"], [1, "employee-name"], ["class", "employee-email", 4, "ngIf"], [1, "employee-email"], [1, "text-muted"], ["class", "badge-department", 4, "ngIf"], ["class", "text-muted", 4, "ngIf"], [1, "badge-department"], [1, "status-badge"], ["mat-header-cell", ""], [1, "action-buttons"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Xem chi ti\u1EBFt", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Ch\u1EC9nh s\u1EEDa", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], [1, "mat-cell", "no-data"], [1, "no-data-container"], [1, "loading-container"], ["diameter", "40"]], template: function ListNhanvienComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "div", 4)(3, "h1", 5)(4, "mat-icon");
      \u0275\u0275text(5, "people");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Qu\u1EA3n l\xFD nh\xE2n vi\xEAn ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "p", 6);
      \u0275\u0275text(8, "Qu\u1EA3n l\xFD th\xF4ng tin nh\xE2n vi\xEAn trong h\u1EC7 th\u1ED1ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(9, ListNhanvienComponent_div_9_Template, 37, 4, "div", 7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 8)(11, "div", 9)(12, "mat-form-field", 10)(13, "mat-label");
      \u0275\u0275text(14, "T\xECm ki\u1EBFm");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 11);
      \u0275\u0275listener("input", function ListNhanvienComponent_Template_input_input_15_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSearch($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "mat-icon", 12);
      \u0275\u0275text(17, "search");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-form-field", 13)(19, "mat-label");
      \u0275\u0275text(20, "Ph\xF2ng ban");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 14);
      \u0275\u0275listener("selectionChange", function ListNhanvienComponent_Template_mat_select_selectionChange_21_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPhongbanFilter($event.value));
      });
      \u0275\u0275elementStart(22, "mat-option", 15);
      \u0275\u0275text(23, "T\u1EA5t c\u1EA3 ph\xF2ng ban");
      \u0275\u0275elementEnd();
      \u0275\u0275template(24, ListNhanvienComponent_mat_option_24_Template, 2, 2, "mat-option", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "mat-form-field", 13)(26, "mat-label");
      \u0275\u0275text(27, "Tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-select", 14);
      \u0275\u0275listener("selectionChange", function ListNhanvienComponent_Template_mat_select_selectionChange_28_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTrangThaiFilter($event.value));
      });
      \u0275\u0275elementStart(29, "mat-option", 15);
      \u0275\u0275text(30, "T\u1EA5t c\u1EA3 tr\u1EA1ng th\xE1i");
      \u0275\u0275elementEnd();
      \u0275\u0275template(31, ListNhanvienComponent_mat_option_31_Template, 2, 2, "mat-option", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "button", 17);
      \u0275\u0275listener("click", function ListNhanvienComponent_Template_button_click_32_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearFilters());
      });
      \u0275\u0275elementStart(33, "mat-icon");
      \u0275\u0275text(34, "filter_alt_off");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(35, "div", 18);
      \u0275\u0275elementStart(36, "button", 19);
      \u0275\u0275listener("click", function ListNhanvienComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportExcel());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " Export ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 20)(41, "mat-icon");
      \u0275\u0275text(42, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " Import ");
      \u0275\u0275elementStart(44, "mat-icon");
      \u0275\u0275text(45, "arrow_drop_down");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "mat-menu", null, 0)(48, "button", 21);
      \u0275\u0275listener("click", function ListNhanvienComponent_Template_button_click_48_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.importExcel());
      });
      \u0275\u0275elementStart(49, "mat-icon");
      \u0275\u0275text(50, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "span");
      \u0275\u0275text(52, "Import t\u1EEB Excel");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "button", 21);
      \u0275\u0275listener("click", function ListNhanvienComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.exportTemplate());
      });
      \u0275\u0275elementStart(54, "mat-icon");
      \u0275\u0275text(55, "description");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "span");
      \u0275\u0275text(57, "T\u1EA3i m\u1EABu import");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(58, "button", 22);
      \u0275\u0275listener("click", function ListNhanvienComponent_Template_button_click_58_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.createNew());
      });
      \u0275\u0275elementStart(59, "mat-icon");
      \u0275\u0275text(60, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(61, " Th\xEAm m\u1EDBi ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(62, "div", 23);
      \u0275\u0275template(63, ListNhanvienComponent_div_63_Template, 38, 3, "div", 24)(64, ListNhanvienComponent_ng_template_64_Template, 4, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementStart(66, "mat-paginator", 25);
      \u0275\u0275listener("page", function ListNhanvienComponent_Template_mat_paginator_page_66_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const importMenu_r17 = \u0275\u0275reference(47);
      const loadingTemplate_r18 = \u0275\u0275reference(65);
      \u0275\u0275advance(9);
      \u0275\u0275property("ngIf", ctx.statistics());
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.searchTerm());
      \u0275\u0275advance(6);
      \u0275\u0275property("value", ctx.selectedPhongban());
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.phongbans());
      \u0275\u0275advance(4);
      \u0275\u0275property("value", ctx.selectedTrangThai());
      \u0275\u0275advance();
      \u0275\u0275property("value", null);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.trangThaiOptions);
      \u0275\u0275advance(9);
      \u0275\u0275property("matMenuTriggerFor", importMenu_r17);
      \u0275\u0275advance(23);
      \u0275\u0275property("ngIf", !ctx.loading())("ngIfElse", loadingTemplate_r18);
      \u0275\u0275advance(3);
      \u0275\u0275property("length", ctx.total())("pageSize", ctx.limit())("pageSizeOptions", \u0275\u0275pureFunction0(15, _c02))("pageIndex", ctx.page() - 1);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatNoDataRow,
    MatPaginatorModule,
    MatPaginator,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatTooltipModule,
    MatTooltip,
    MatChipsModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDialogModule,
    MatCardModule,
    MatDividerModule
  ], styles: ['\n\n[_nghost-%COMP%] {\n  --background: hsl(0 0% 100%);\n  --foreground: hsl(240 10% 3.9%);\n  --card: hsl(0 0% 100%);\n  --card-foreground: hsl(240 10% 3.9%);\n  --popover: hsl(0 0% 100%);\n  --popover-foreground: hsl(240 10% 3.9%);\n  --primary: hsl(240 5.9% 10%);\n  --primary-foreground: hsl(0 0% 98%);\n  --secondary: hsl(240 4.8% 95.9%);\n  --secondary-foreground: hsl(240 5.9% 10%);\n  --muted: hsl(240 4.8% 95.9%);\n  --muted-foreground: hsl(240 3.8% 46.1%);\n  --accent: hsl(240 4.8% 95.9%);\n  --accent-foreground: hsl(240 5.9% 10%);\n  --destructive: hsl(0 84.2% 60.2%);\n  --destructive-foreground: hsl(0 0% 98%);\n  --border: hsl(240 5.9% 90%);\n  --input: hsl(240 5.9% 90%);\n  --ring: hsl(240 5.9% 10%);\n  --radius: 0.5rem;\n  --status-success: hsl(142.1 76.2% 36.3%);\n  --status-success-bg: hsl(142.1 76.2% 96%);\n  --status-warning: hsl(38 92% 50%);\n  --status-warning-bg: hsl(38 92% 95%);\n  --status-error: hsl(0 84.2% 60.2%);\n  --status-error-bg: hsl(0 84.2% 97%);\n  --status-muted: hsl(240 3.8% 46.1%);\n  --status-muted-bg: hsl(240 4.8% 95.9%);\n}\n.container[_ngcontent-%COMP%] {\n  padding: 1.5rem 2rem;\n  max-width: 1400px;\n  margin: 0 auto;\n  background: var(--background);\n}\n.header-section[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.page-header[_ngcontent-%COMP%] {\n  margin-bottom: 1.5rem;\n}\n.page-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  font-size: 1.875rem;\n  font-weight: 700;\n  letter-spacing: -0.025em;\n  color: var(--foreground);\n  margin: 0 0 0.25rem 0;\n}\n.page-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 2rem;\n  width: 2rem;\n  height: 2rem;\n  color: var(--foreground);\n}\n.page-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--muted-foreground);\n  margin: 0;\n}\n.stats-cards[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(4, 1fr);\n  gap: 1rem;\n}\n.stat-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border) !important;\n  border-radius: var(--radius) !important;\n  box-shadow: none !important;\n  transition: all 0.2s ease;\n  background: var(--card) !important;\n}\n.stat-card[_ngcontent-%COMP%]:hover {\n  box-shadow: 0 1px 3px 0 rgba(0, 0, 0, 0.1), 0 1px 2px -1px rgba(0, 0, 0, 0.1) !important;\n}\n.stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 1rem;\n  padding: 1.25rem !important;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  width: 2.5rem;\n  height: 2.5rem;\n  border-radius: calc(var(--radius) - 2px);\n  background: var(--secondary);\n}\n.stat-card[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--muted-foreground);\n  font-size: 1.25rem;\n  width: 1.25rem;\n  height: 1.25rem;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  color: var(--muted-foreground);\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n}\n.stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 1.5rem;\n  font-weight: 700;\n  color: var(--foreground);\n  letter-spacing: -0.025em;\n}\n.stat-card.active[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background: var(--status-success-bg);\n}\n.stat-card.active[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--status-success);\n}\n.stat-card.active[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--status-success);\n}\n.stat-card.trial[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background: var(--status-warning-bg);\n}\n.stat-card.trial[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--status-warning);\n}\n.stat-card.trial[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--status-warning);\n}\n.stat-card.inactive[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%] {\n  background: var(--status-muted-bg);\n}\n.stat-card.inactive[_ngcontent-%COMP%]   .stat-icon[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--status-muted);\n}\n.stat-card.inactive[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: var(--status-muted);\n}\n.toolbar-card[_ngcontent-%COMP%] {\n  margin-bottom: 1rem;\n  border: 1px solid var(--border) !important;\n  border-radius: var(--radius) !important;\n  box-shadow: none !important;\n  background: var(--card) !important;\n}\n.toolbar-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 1rem 1.25rem !important;\n}\n.toolbar[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.75rem;\n  flex-wrap: wrap;\n}\n.toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 280px;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mat-mdc-text-field-wrapper {\n  background: var(--background) !important;\n  border-radius: var(--radius) !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mdc-notched-outline__leading, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mdc-notched-outline__notch, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mdc-notched-outline__trailing {\n  border-color: var(--input) !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__leading, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__notch, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field:hover .mdc-notched-outline__trailing {\n  border-color: var(--ring) !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__leading, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__notch, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field.mat-focused .mdc-notched-outline__trailing {\n  border-color: var(--ring) !important;\n  border-width: 2px !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mat-mdc-form-field-infix {\n  padding-top: 0.625rem !important;\n  padding-bottom: 0.625rem !important;\n  min-height: auto !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field input, \n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mat-mdc-select-trigger {\n  font-size: 0.875rem !important;\n  color: var(--foreground) !important;\n}\n.toolbar[_ngcontent-%COMP%]     .mat-mdc-form-field .mat-mdc-floating-label {\n  font-size: 0.875rem !important;\n  color: var(--muted-foreground) !important;\n}\n.toolbar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n  margin: 0;\n}\n.toolbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[_ngcontent-%COMP%], \n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-button[_ngcontent-%COMP%] {\n  border-radius: var(--radius) !important;\n  font-weight: 500 !important;\n  font-size: 0.875rem !important;\n  letter-spacing: 0 !important;\n  text-transform: none !important;\n  padding: 0 1rem !important;\n  height: 2.25rem !important;\n  box-shadow: none !important;\n  transition: all 0.2s ease !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1rem !important;\n  width: 1rem !important;\n  height: 1rem !important;\n  margin-right: 0.5rem !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[color=primary][_ngcontent-%COMP%] {\n  background: var(--primary) !important;\n  color: var(--primary-foreground) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[color=primary][_ngcontent-%COMP%]:hover {\n  background: hsl(240, 5.9%, 20%) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[_ngcontent-%COMP%]:not([color]) {\n  background: var(--secondary) !important;\n  color: var(--secondary-foreground) !important;\n  border: 1px solid var(--border) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[_ngcontent-%COMP%]:not([color]):hover {\n  background: hsl(240, 4.8%, 90%) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[color=accent][_ngcontent-%COMP%] {\n  background: var(--secondary) !important;\n  color: var(--secondary-foreground) !important;\n  border: 1px solid var(--border) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[color=accent][_ngcontent-%COMP%]:hover {\n  background: hsl(240, 4.8%, 90%) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%] {\n  border-radius: var(--radius) !important;\n  width: 2.25rem !important;\n  height: 2.25rem !important;\n  padding: 0 !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%]:hover {\n  background: var(--accent) !important;\n}\n.toolbar[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem !important;\n  color: var(--muted-foreground) !important;\n}\n.table-card[_ngcontent-%COMP%] {\n  border: 1px solid var(--border) !important;\n  border-radius: var(--radius) !important;\n  box-shadow: none !important;\n  background: var(--card) !important;\n  overflow: hidden !important;\n}\n.table-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n}\n.nhanvien-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.nhanvien-table[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  background: var(--muted) !important;\n  font-weight: 500 !important;\n  font-size: 0.75rem !important;\n  color: var(--muted-foreground) !important;\n  text-transform: uppercase !important;\n  letter-spacing: 0.05em !important;\n  padding: 0.75rem 1rem !important;\n  border-bottom: 1px solid var(--border) !important;\n}\n.nhanvien-table[_ngcontent-%COMP%]   th.mat-mdc-header-cell[_ngcontent-%COMP%]   .mat-sort-header-arrow[_ngcontent-%COMP%] {\n  color: var(--muted-foreground) !important;\n}\n.nhanvien-table[_ngcontent-%COMP%]   td.mat-mdc-cell[_ngcontent-%COMP%] {\n  padding: 0.875rem 1rem !important;\n  font-size: 0.875rem !important;\n  color: var(--foreground) !important;\n  border-bottom: 1px solid var(--border) !important;\n  vertical-align: middle !important;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%] {\n  transition: background 0.15s ease;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background: var(--muted) !important;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .mat-mdc-row[_ngcontent-%COMP%]:last-child   td.mat-mdc-cell[_ngcontent-%COMP%] {\n  border-bottom: none !important;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .employee-info[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 0.125rem;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .employee-info[_ngcontent-%COMP%]   .employee-name[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--foreground);\n}\n.nhanvien-table[_ngcontent-%COMP%]   .employee-info[_ngcontent-%COMP%]   .employee-email[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  color: var(--muted-foreground);\n}\n.nhanvien-table[_ngcontent-%COMP%]   .badge-code[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.125rem 0.5rem;\n  font-size: 0.75rem;\n  font-weight: 600;\n  font-family:\n    ui-monospace,\n    SFMono-Regular,\n    "SF Mono",\n    Menlo,\n    Consolas,\n    monospace;\n  background: var(--secondary);\n  border-radius: calc(var(--radius) - 2px);\n  color: var(--foreground);\n}\n.nhanvien-table[_ngcontent-%COMP%]   .badge-code.secondary[_ngcontent-%COMP%] {\n  background: hsl(217.2, 91.2%, 95%);\n  color: hsl(217.2, 91.2%, 45%);\n  font-weight: 500;\n}\n.nhanvien-table[_ngcontent-%COMP%]   .badge-department[_ngcontent-%COMP%] {\n  display: inline-flex;\n  padding: 0.25rem 0.625rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  background: hsl(217.2, 91.2%, 95%);\n  color: hsl(217.2, 91.2%, 45%);\n  border-radius: calc(var(--radius) - 2px);\n}\n.nhanvien-table[_ngcontent-%COMP%]   .text-muted[_ngcontent-%COMP%] {\n  color: var(--muted-foreground);\n}\n.nhanvien-table[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: var(--foreground);\n}\n.status-badge[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 0.25rem 0.625rem;\n  font-size: 0.75rem;\n  font-weight: 500;\n  border-radius: 9999px;\n  white-space: nowrap;\n  background: var(--secondary);\n  color: var(--secondary-foreground);\n}\n.status-badge[data-status=DANGLAMVIEC][_ngcontent-%COMP%] {\n  background: var(--status-success-bg);\n  color: var(--status-success);\n}\n.status-badge[data-status=THUVIEC][_ngcontent-%COMP%] {\n  background: var(--status-warning-bg);\n  color: hsl(38, 92%, 35%);\n}\n.status-badge[data-status=NGHIPHEP][_ngcontent-%COMP%] {\n  background: hsl(217.2, 91.2%, 95%);\n  color: hsl(217.2, 91.2%, 45%);\n}\n.status-badge[data-status=DANGHIVIEC][_ngcontent-%COMP%] {\n  background: var(--status-muted-bg);\n  color: var(--status-muted);\n}\n.status-badge[data-status=TAMNGHI][_ngcontent-%COMP%] {\n  background: var(--status-error-bg);\n  color: var(--destructive);\n}\n.status-badge[data-status=KHAC][_ngcontent-%COMP%] {\n  background: hsl(280, 65%, 95%);\n  color: hsl(280, 65%, 40%);\n}\n.action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 0.25rem;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%] {\n  width: 2rem !important;\n  height: 2rem !important;\n  border-radius: var(--radius) !important;\n  transition: all 0.15s ease !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.125rem !important;\n  width: 1.125rem !important;\n  height: 1.125rem !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[_ngcontent-%COMP%]:hover {\n  background: var(--accent) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=primary][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--muted-foreground) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=primary][_ngcontent-%COMP%]:hover {\n  background: var(--secondary) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=primary][_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  color: var(--foreground) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=accent][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--muted-foreground) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=accent][_ngcontent-%COMP%]:hover {\n  background: hsl(217.2, 91.2%, 95%) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=accent][_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  color: hsl(217.2, 91.2%, 59.8%) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=warn][_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: var(--muted-foreground) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=warn][_ngcontent-%COMP%]:hover {\n  background: var(--status-error-bg) !important;\n}\n.action-buttons[_ngcontent-%COMP%]   button.mat-mdc-icon-button[color=warn][_ngcontent-%COMP%]:hover   mat-icon[_ngcontent-%COMP%] {\n  color: var(--destructive) !important;\n}\n.no-data-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 1.5rem;\n  color: var(--muted-foreground);\n}\n.no-data-container[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  width: 3rem;\n  height: 3rem;\n  margin-bottom: 1rem;\n  opacity: 0.5;\n}\n.no-data-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  margin: 0;\n  font-size: 0.875rem;\n  font-weight: 500;\n}\n.loading-container[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 4rem 1.5rem;\n}\n.loading-container[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  margin: 0 auto 1rem;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--muted-foreground);\n  font-size: 0.875rem;\n}\n  mat-paginator {\n  border-top: 1px solid var(--border) !important;\n  background: var(--card) !important;\n}\n  mat-paginator .mat-mdc-paginator-container {\n  padding: 0.75rem 1rem !important;\n  min-height: auto !important;\n}\n  mat-paginator .mat-mdc-paginator-page-size-label, \n  mat-paginator .mat-mdc-paginator-range-label {\n  font-size: 0.875rem !important;\n  color: var(--muted-foreground) !important;\n}\n  mat-paginator .mat-mdc-paginator-page-size-select {\n  font-size: 0.875rem !important;\n}\n  mat-paginator .mat-mdc-icon-button {\n  width: 2rem !important;\n  height: 2rem !important;\n  border-radius: var(--radius) !important;\n}\n  mat-paginator .mat-mdc-icon-button:hover:not([disabled]) {\n  background: var(--accent) !important;\n}\n  mat-paginator .mat-mdc-icon-button[disabled] {\n  opacity: 0.5;\n}\n  mat-paginator .mat-mdc-icon-button mat-icon {\n  font-size: 1.25rem !important;\n  color: var(--foreground) !important;\n}\n@media (max-width: 1024px) {\n  .stats-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .page-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n    width: 1.5rem;\n    height: 1.5rem;\n  }\n  .toolbar[_ngcontent-%COMP%]   .search-field[_ngcontent-%COMP%] {\n    min-width: 100%;\n    order: -1;\n  }\n  .toolbar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    flex: 1;\n    min-width: calc(50% - 0.375rem);\n  }\n  .toolbar[_ngcontent-%COMP%]   .spacer[_ngcontent-%COMP%] {\n    display: none;\n  }\n  .toolbar[_ngcontent-%COMP%]   button.mat-mdc-raised-button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .stats-cards[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n  .stat-card[_ngcontent-%COMP%]   mat-card-content[_ngcontent-%COMP%] {\n    padding: 1rem !important;\n  }\n  .stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n    font-size: 1.25rem;\n  }\n}\n@media (max-width: 480px) {\n  .stats-cards[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .toolbar[_ngcontent-%COMP%]   mat-form-field[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n}\n/*# sourceMappingURL=listnhanvien.component.css.map */'] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListNhanvienComponent, { className: "ListNhanvienComponent", filePath: "src/app/admin/nhanvien/listnhanvien/listnhanvien.component.ts", lineNumber: 72 });
})();
export {
  ListNhanvienComponent
};
//# sourceMappingURL=chunk-3JDXXYIJ.mjs.map
