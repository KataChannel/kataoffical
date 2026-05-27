import {
  PhongbanService
} from "./chunk-VACGLYLX.js";
import {
  GioiTinh,
  GioiTinhLabels,
  NhanvienService,
  TrangThaiNhanvien,
  TrangThaiNhanvienLabels
} from "./chunk-IYLA2SGZ.js";
import "./chunk-CVAZHUNB.js";
import "./chunk-LIKOVN7R.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-2GXGFE2W.js";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-DGYBLSTA.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-5Z5IQRCP.js";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-RYTJZHDX.js";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-VXRXYM4Q.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  MatError,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  Validators,
  ɵNgNoValidate
} from "./chunk-TMSN764N.js";
import {
  MatCardModule
} from "./chunk-M6ODRG7P.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import {
  MatNativeDateModule,
  MatOption
} from "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule,
  DecimalPipe
} from "./chunk-TAI2MURD.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts
var _forTrack0 = ($index, $item) => $item.value;
var _forTrack1 = ($index, $item) => $item.id;
function FormNhanvienComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9);
    \u0275\u0275element(1, "mat-spinner", 11);
    \u0275\u0275elementStart(2, "p");
    \u0275\u0275text(3, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
function FormNhanvienComponent_Conditional_12_ng_template_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "person");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Th\xF4ng tin c\u01A1 b\u1EA3n");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "M\xE3 nh\xE2n vi\xEAn l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "M\xE3 nh\xE2n vi\xEAn kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 20 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "M\xE3 l\xE0m vi\u1EC7c kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 50 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "H\u1ECD v\xE0 t\xEAn l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "H\u1ECD v\xE0 t\xEAn kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 200 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_For_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r3 = ctx.$implicit;
    \u0275\u0275property("value", option_r3.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r3.label);
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "S\u1ED1 CMND/CCCD kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 20 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i kh\xF4ng h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Email kh\xF4ng h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Qu\xEA qu\xE1n kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 500 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "\u0110\u1ECBa ch\u1EC9 kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 500 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_ng_template_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "work");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "C\xF4ng vi\u1EC7c");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const phongban_r4 = ctx.$implicit;
    \u0275\u0275property("value", phongban_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(phongban_r4.ten);
  }
}
function FormNhanvienComponent_Conditional_12_For_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const option_r5 = ctx.$implicit;
    \u0275\u0275property("value", option_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(option_r5.label);
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Tr\u1EA1ng th\xE1i l\xE0 b\u1EAFt bu\u1ED9c");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ch\u1EE9c v\u1EE5 kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 100 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "V\u1ECB tr\xED kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 100 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_ng_template_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "payments");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "L\u01B0\u01A1ng & Ph\u1EE5 c\u1EA5p");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "L\u01B0\u01A1ng c\u01A1 b\u1EA3n ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_136_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Hi\u1EC7u su\u1EA5t c\xF4ng vi\u1EC7c ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_143_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ph\u1EE5 c\u1EA5p x\u0103ng ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ph\u1EE5 c\u1EA5p \u0111i\u1EC7n tho\u1EA1i ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_158_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "H\u1ED7 tr\u1EE3 chuy\xEAn c\u1EA7n ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_165_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ti\u1EC1n \u0103n gi\u1EEFa ca ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_172_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Th\u01B0\u1EDFng kinh doanh ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_179_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ph\u1EE5 c\u1EA5p kh\xE1c ph\u1EA3i >= 0");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_ng_template_187_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "account_balance");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Ng\xE2n h\xE0ng");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_196_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "S\u1ED1 t\xE0i kho\u1EA3n kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 50 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_202_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "T\xEAn ng\xE2n h\xE0ng kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 100 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_207_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Chi nh\xE1nh kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 200 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_ng_template_209_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "note");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3, "Ghi ch\xFA");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_218_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-error");
    \u0275\u0275text(1, "Ghi ch\xFA kh\xF4ng \u0111\u01B0\u1EE3c v\u01B0\u1EE3t qu\xE1 1000 k\xFD t\u1EF1");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_225_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 61);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u0110ang x\u1EED l\xFD...");
    \u0275\u0275elementEnd();
  }
}
function FormNhanvienComponent_Conditional_12_Conditional_226_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.mode === "create" ? "T\u1EA1o nh\xE2n vi\xEAn" : "L\u01B0u thay \u0111\u1ED5i", " ");
  }
}
function FormNhanvienComponent_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "form", 12);
    \u0275\u0275listener("ngSubmit", function FormNhanvienComponent_Conditional_12_Template_form_ngSubmit_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onSubmit());
    });
    \u0275\u0275elementStart(1, "mat-tab-group", 13)(2, "mat-tab");
    \u0275\u0275template(3, FormNhanvienComponent_Conditional_12_ng_template_3_Template, 4, 0, "ng-template", 14);
    \u0275\u0275elementStart(4, "div", 15)(5, "div", 16);
    \u0275\u0275text(6, "Th\xF4ng tin c\xE1 nh\xE2n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 17)(8, "mat-form-field", 18)(9, "mat-label");
    \u0275\u0275text(10, "M\xE3 nh\xE2n vi\xEAn");
    \u0275\u0275elementEnd();
    \u0275\u0275element(11, "input", 19);
    \u0275\u0275template(12, FormNhanvienComponent_Conditional_12_Conditional_12_Template, 2, 0, "mat-error")(13, FormNhanvienComponent_Conditional_12_Conditional_13_Template, 2, 0, "mat-error");
    \u0275\u0275elementStart(14, "mat-hint");
    \u0275\u0275text(15, "M\xE3 \u0111\u1ECBnh danh duy nh\u1EA5t");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "mat-form-field", 18)(17, "mat-label");
    \u0275\u0275text(18, "M\xE3 l\xE0m vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275element(19, "input", 20);
    \u0275\u0275template(20, FormNhanvienComponent_Conditional_12_Conditional_20_Template, 2, 0, "mat-error");
    \u0275\u0275elementStart(21, "mat-hint");
    \u0275\u0275text(22, "M\xE3 \u0111\u1ECBnh danh l\xE0m vi\u1EC7c");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "mat-form-field", 18)(24, "mat-label");
    \u0275\u0275text(25, "H\u1ECD v\xE0 t\xEAn");
    \u0275\u0275elementEnd();
    \u0275\u0275element(26, "input", 21);
    \u0275\u0275template(27, FormNhanvienComponent_Conditional_12_Conditional_27_Template, 2, 0, "mat-error")(28, FormNhanvienComponent_Conditional_12_Conditional_28_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 17)(30, "mat-form-field", 18)(31, "mat-label");
    \u0275\u0275text(32, "Gi\u1EDBi t\xEDnh");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "mat-select", 22);
    \u0275\u0275repeaterCreate(34, FormNhanvienComponent_Conditional_12_For_35_Template, 2, 2, "mat-option", 23, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(36, "mat-form-field", 18)(37, "mat-label");
    \u0275\u0275text(38, "Ng\xE0y sinh");
    \u0275\u0275elementEnd();
    \u0275\u0275element(39, "input", 24)(40, "mat-datepicker-toggle", 25)(41, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "mat-form-field", 18)(44, "mat-label");
    \u0275\u0275text(45, "CMND/CCCD");
    \u0275\u0275elementEnd();
    \u0275\u0275element(46, "input", 26);
    \u0275\u0275template(47, FormNhanvienComponent_Conditional_12_Conditional_47_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(48, "div", 16);
    \u0275\u0275text(49, "Th\xF4ng tin li\xEAn h\u1EC7");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 17)(51, "mat-form-field", 27)(52, "mat-label");
    \u0275\u0275text(53, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "input", 28);
    \u0275\u0275template(55, FormNhanvienComponent_Conditional_12_Conditional_55_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(56, "mat-form-field", 27)(57, "mat-label");
    \u0275\u0275text(58, "Email");
    \u0275\u0275elementEnd();
    \u0275\u0275element(59, "input", 29);
    \u0275\u0275template(60, FormNhanvienComponent_Conditional_12_Conditional_60_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "div", 16);
    \u0275\u0275text(62, "\u0110\u1ECBa ch\u1EC9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "div", 17)(64, "mat-form-field", 27)(65, "mat-label");
    \u0275\u0275text(66, "Qu\xEA qu\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(67, "input", 30);
    \u0275\u0275template(68, FormNhanvienComponent_Conditional_12_Conditional_68_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(69, "mat-form-field", 27)(70, "mat-label");
    \u0275\u0275text(71, "\u0110\u1ECBa ch\u1EC9 hi\u1EC7n t\u1EA1i");
    \u0275\u0275elementEnd();
    \u0275\u0275element(72, "input", 31);
    \u0275\u0275template(73, FormNhanvienComponent_Conditional_12_Conditional_73_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(74, "mat-tab");
    \u0275\u0275template(75, FormNhanvienComponent_Conditional_12_ng_template_75_Template, 4, 0, "ng-template", 14);
    \u0275\u0275elementStart(76, "div", 15)(77, "div", 16);
    \u0275\u0275text(78, "Th\xF4ng tin c\xF4ng vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(79, "div", 17)(80, "mat-form-field", 27)(81, "mat-label");
    \u0275\u0275text(82, "Ph\xF2ng ban");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "mat-select", 32)(84, "mat-option", 23);
    \u0275\u0275text(85, "Ch\u1ECDn ph\xF2ng ban");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(86, FormNhanvienComponent_Conditional_12_For_87_Template, 2, 2, "mat-option", 23, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(88, "mat-form-field", 27)(89, "mat-label");
    \u0275\u0275text(90, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(91, "mat-select", 33);
    \u0275\u0275repeaterCreate(92, FormNhanvienComponent_Conditional_12_For_93_Template, 2, 2, "mat-option", 23, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(94, FormNhanvienComponent_Conditional_12_Conditional_94_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(95, "div", 17)(96, "mat-form-field", 27)(97, "mat-label");
    \u0275\u0275text(98, "Ch\u1EE9c v\u1EE5");
    \u0275\u0275elementEnd();
    \u0275\u0275element(99, "input", 34);
    \u0275\u0275template(100, FormNhanvienComponent_Conditional_12_Conditional_100_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(101, "mat-form-field", 27)(102, "mat-label");
    \u0275\u0275text(103, "V\u1ECB tr\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275element(104, "input", 35);
    \u0275\u0275template(105, FormNhanvienComponent_Conditional_12_Conditional_105_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(106, "div", 17)(107, "mat-form-field", 27)(108, "mat-label");
    \u0275\u0275text(109, "Ng\xE0y v\xE0o l\xE0m");
    \u0275\u0275elementEnd();
    \u0275\u0275element(110, "input", 36)(111, "mat-datepicker-toggle", 25)(112, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(114, "div", 37)(115, "mat-checkbox", 38);
    \u0275\u0275text(116, " \u0110ang ho\u1EA1t \u0111\u1ED9ng ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(117, "mat-tab");
    \u0275\u0275template(118, FormNhanvienComponent_Conditional_12_ng_template_118_Template, 4, 0, "ng-template", 14);
    \u0275\u0275elementStart(119, "div", 15)(120, "div", 16);
    \u0275\u0275text(121, "Th\xF4ng tin l\u01B0\u01A1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "div", 17)(123, "mat-form-field", 39)(124, "mat-label");
    \u0275\u0275text(125, "L\u01B0\u01A1ng c\u01A1 b\u1EA3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(126, "input", 40);
    \u0275\u0275elementStart(127, "span", 41);
    \u0275\u0275text(128, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(129, FormNhanvienComponent_Conditional_12_Conditional_129_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "mat-form-field", 39)(131, "mat-label");
    \u0275\u0275text(132, "Hi\u1EC7u su\u1EA5t c\xF4ng vi\u1EC7c");
    \u0275\u0275elementEnd();
    \u0275\u0275element(133, "input", 42);
    \u0275\u0275elementStart(134, "span", 41);
    \u0275\u0275text(135, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(136, FormNhanvienComponent_Conditional_12_Conditional_136_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(137, "mat-form-field", 39)(138, "mat-label");
    \u0275\u0275text(139, "Ph\u1EE5 c\u1EA5p x\u0103ng");
    \u0275\u0275elementEnd();
    \u0275\u0275element(140, "input", 43);
    \u0275\u0275elementStart(141, "span", 41);
    \u0275\u0275text(142, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(143, FormNhanvienComponent_Conditional_12_Conditional_143_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(144, "mat-form-field", 39)(145, "mat-label");
    \u0275\u0275text(146, "Ph\u1EE5 c\u1EA5p \u0110T");
    \u0275\u0275elementEnd();
    \u0275\u0275element(147, "input", 44);
    \u0275\u0275elementStart(148, "span", 41);
    \u0275\u0275text(149, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(150, FormNhanvienComponent_Conditional_12_Conditional_150_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(151, "div", 17)(152, "mat-form-field", 39)(153, "mat-label");
    \u0275\u0275text(154, "H\u1ED7 tr\u1EE3 chuy\xEAn c\u1EA7n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(155, "input", 45);
    \u0275\u0275elementStart(156, "span", 41);
    \u0275\u0275text(157, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(158, FormNhanvienComponent_Conditional_12_Conditional_158_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(159, "mat-form-field", 39)(160, "mat-label");
    \u0275\u0275text(161, "Ti\u1EC1n \u0103n gi\u1EEFa ca");
    \u0275\u0275elementEnd();
    \u0275\u0275element(162, "input", 46);
    \u0275\u0275elementStart(163, "span", 41);
    \u0275\u0275text(164, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(165, FormNhanvienComponent_Conditional_12_Conditional_165_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(166, "mat-form-field", 39)(167, "mat-label");
    \u0275\u0275text(168, "Th\u01B0\u1EDFng kinh doanh");
    \u0275\u0275elementEnd();
    \u0275\u0275element(169, "input", 47);
    \u0275\u0275elementStart(170, "span", 41);
    \u0275\u0275text(171, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(172, FormNhanvienComponent_Conditional_12_Conditional_172_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(173, "mat-form-field", 39)(174, "mat-label");
    \u0275\u0275text(175, "Ph\u1EE5 c\u1EA5p kh\xE1c");
    \u0275\u0275elementEnd();
    \u0275\u0275element(176, "input", 48);
    \u0275\u0275elementStart(177, "span", 41);
    \u0275\u0275text(178, "VND");
    \u0275\u0275elementEnd();
    \u0275\u0275template(179, FormNhanvienComponent_Conditional_12_Conditional_179_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(180, "div", 49)(181, "div", 50);
    \u0275\u0275text(182, "T\u1ED5ng l\u01B0\u01A1ng d\u1EF1 ki\u1EBFn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(183, "div", 51);
    \u0275\u0275text(184);
    \u0275\u0275pipe(185, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(186, "mat-tab");
    \u0275\u0275template(187, FormNhanvienComponent_Conditional_12_ng_template_187_Template, 4, 0, "ng-template", 14);
    \u0275\u0275elementStart(188, "div", 15)(189, "div", 16);
    \u0275\u0275text(190, "Th\xF4ng tin t\xE0i kho\u1EA3n ng\xE2n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(191, "div", 17)(192, "mat-form-field", 52)(193, "mat-label");
    \u0275\u0275text(194, "S\u1ED1 t\xE0i kho\u1EA3n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(195, "input", 53);
    \u0275\u0275template(196, FormNhanvienComponent_Conditional_12_Conditional_196_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(197, "div", 17)(198, "mat-form-field", 27)(199, "mat-label");
    \u0275\u0275text(200, "Ng\xE2n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275element(201, "input", 54);
    \u0275\u0275template(202, FormNhanvienComponent_Conditional_12_Conditional_202_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(203, "mat-form-field", 27)(204, "mat-label");
    \u0275\u0275text(205, "Chi nh\xE1nh");
    \u0275\u0275elementEnd();
    \u0275\u0275element(206, "input", 55);
    \u0275\u0275template(207, FormNhanvienComponent_Conditional_12_Conditional_207_Template, 2, 0, "mat-error");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(208, "mat-tab");
    \u0275\u0275template(209, FormNhanvienComponent_Conditional_12_ng_template_209_Template, 4, 0, "ng-template", 14);
    \u0275\u0275elementStart(210, "div", 15)(211, "div", 16);
    \u0275\u0275text(212, "Ghi ch\xFA th\xEAm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(213, "div", 17)(214, "mat-form-field", 52)(215, "mat-label");
    \u0275\u0275text(216, "Ghi ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275element(217, "textarea", 56);
    \u0275\u0275template(218, FormNhanvienComponent_Conditional_12_Conditional_218_Template, 2, 0, "mat-error");
    \u0275\u0275elementStart(219, "mat-hint", 57);
    \u0275\u0275text(220);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275elementStart(221, "div", 58)(222, "button", 59);
    \u0275\u0275listener("click", function FormNhanvienComponent_Conditional_12_Template_button_click_222_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.goBack());
    });
    \u0275\u0275text(223, " H\u1EE7y b\u1ECF ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(224, "button", 60);
    \u0275\u0275template(225, FormNhanvienComponent_Conditional_12_Conditional_225_Template, 3, 0)(226, FormNhanvienComponent_Conditional_12_Conditional_226_Template, 1, 1);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    let tmp_6_0;
    let tmp_7_0;
    let tmp_8_0;
    let tmp_12_0;
    let tmp_13_0;
    let tmp_14_0;
    let tmp_15_0;
    let tmp_16_0;
    let tmp_20_0;
    let tmp_21_0;
    let tmp_22_0;
    let tmp_25_0;
    let tmp_26_0;
    let tmp_27_0;
    let tmp_28_0;
    let tmp_29_0;
    let tmp_30_0;
    let tmp_31_0;
    let tmp_32_0;
    let tmp_33_0;
    let tmp_34_0;
    let tmp_35_0;
    let tmp_36_0;
    let tmp_37_0;
    let tmp_38_0;
    const pickerNgaySinh_r6 = \u0275\u0275reference(42);
    const pickerNgayVaoLam_r7 = \u0275\u0275reference(113);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("formGroup", ctx_r1.nhanvienForm);
    \u0275\u0275advance(12);
    \u0275\u0275conditional(((tmp_4_0 = ctx_r1.nhanvienForm.get("maNV")) == null ? null : tmp_4_0.hasError("required")) && ((tmp_4_0 = ctx_r1.nhanvienForm.get("maNV")) == null ? null : tmp_4_0.touched) ? 12 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_5_0 = ctx_r1.nhanvienForm.get("maNV")) == null ? null : tmp_5_0.hasError("maxlength")) ? 13 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_6_0 = ctx_r1.nhanvienForm.get("maLamViec")) == null ? null : tmp_6_0.hasError("maxlength")) ? 20 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_7_0 = ctx_r1.nhanvienForm.get("hoTen")) == null ? null : tmp_7_0.hasError("required")) && ((tmp_7_0 = ctx_r1.nhanvienForm.get("hoTen")) == null ? null : tmp_7_0.touched) ? 27 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_8_0 = ctx_r1.nhanvienForm.get("hoTen")) == null ? null : tmp_8_0.hasError("maxlength")) ? 28 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.gioiTinhOptions);
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", pickerNgaySinh_r6);
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerNgaySinh_r6);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_12_0 = ctx_r1.nhanvienForm.get("cmnd")) == null ? null : tmp_12_0.hasError("maxlength")) ? 47 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(((tmp_13_0 = ctx_r1.nhanvienForm.get("soDienThoai")) == null ? null : tmp_13_0.hasError("pattern")) ? 55 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_14_0 = ctx_r1.nhanvienForm.get("email")) == null ? null : tmp_14_0.hasError("email")) ? 60 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(((tmp_15_0 = ctx_r1.nhanvienForm.get("queQuan")) == null ? null : tmp_15_0.hasError("maxlength")) ? 68 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_16_0 = ctx_r1.nhanvienForm.get("diaChiHienTai")) == null ? null : tmp_16_0.hasError("maxlength")) ? 73 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275property("value", null);
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.phongbans());
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r1.trangThaiOptions);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(((tmp_20_0 = ctx_r1.nhanvienForm.get("trangThai")) == null ? null : tmp_20_0.hasError("required")) && ((tmp_20_0 = ctx_r1.nhanvienForm.get("trangThai")) == null ? null : tmp_20_0.touched) ? 94 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_21_0 = ctx_r1.nhanvienForm.get("chucVu")) == null ? null : tmp_21_0.hasError("maxlength")) ? 100 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_22_0 = ctx_r1.nhanvienForm.get("viTri")) == null ? null : tmp_22_0.hasError("maxlength")) ? 105 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275property("matDatepicker", pickerNgayVaoLam_r7);
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerNgayVaoLam_r7);
    \u0275\u0275advance(18);
    \u0275\u0275conditional(((tmp_25_0 = ctx_r1.nhanvienForm.get("luongCoBan")) == null ? null : tmp_25_0.hasError("min")) ? 129 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_26_0 = ctx_r1.nhanvienForm.get("hieuSuatCongViec")) == null ? null : tmp_26_0.hasError("min")) ? 136 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_27_0 = ctx_r1.nhanvienForm.get("phuCapXang")) == null ? null : tmp_27_0.hasError("min")) ? 143 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_28_0 = ctx_r1.nhanvienForm.get("phuCapDienThoai")) == null ? null : tmp_28_0.hasError("min")) ? 150 : -1);
    \u0275\u0275advance(8);
    \u0275\u0275conditional(((tmp_29_0 = ctx_r1.nhanvienForm.get("hoTroChuyenCan")) == null ? null : tmp_29_0.hasError("min")) ? 158 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_30_0 = ctx_r1.nhanvienForm.get("tienAnGiuaCa")) == null ? null : tmp_30_0.hasError("min")) ? 165 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_31_0 = ctx_r1.nhanvienForm.get("thuongKinhDoanh")) == null ? null : tmp_31_0.hasError("min")) ? 172 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275conditional(((tmp_32_0 = ctx_r1.nhanvienForm.get("phuCapKhac")) == null ? null : tmp_32_0.hasError("min")) ? 179 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(185, 36, (((tmp_33_0 = ctx_r1.nhanvienForm.get("luongCoBan")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("hieuSuatCongViec")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("phuCapXang")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("phuCapDienThoai")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("hoTroChuyenCan")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("tienAnGiuaCa")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("thuongKinhDoanh")) == null ? null : tmp_33_0.value) || 0) + (((tmp_33_0 = ctx_r1.nhanvienForm.get("phuCapKhac")) == null ? null : tmp_33_0.value) || 0), "1.0-0"), " VN\u0110 ");
    \u0275\u0275advance(12);
    \u0275\u0275conditional(((tmp_34_0 = ctx_r1.nhanvienForm.get("soTaiKhoan")) == null ? null : tmp_34_0.hasError("maxlength")) ? 196 : -1);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(((tmp_35_0 = ctx_r1.nhanvienForm.get("nganHang")) == null ? null : tmp_35_0.hasError("maxlength")) ? 202 : -1);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(((tmp_36_0 = ctx_r1.nhanvienForm.get("chiNhanh")) == null ? null : tmp_36_0.hasError("maxlength")) ? 207 : -1);
    \u0275\u0275advance(11);
    \u0275\u0275conditional(((tmp_37_0 = ctx_r1.nhanvienForm.get("ghiChu")) == null ? null : tmp_37_0.hasError("maxlength")) ? 218 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ((tmp_38_0 = ctx_r1.nhanvienForm.get("ghiChu")) == null ? null : tmp_38_0.value == null ? null : tmp_38_0.value.length) || 0, "/1000");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r1.submitting());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.submitting() ? 225 : 226);
  }
}
var FormNhanvienComponent = class _FormNhanvienComponent {
  fb = inject(FormBuilder);
  route = inject(ActivatedRoute);
  router = inject(Router);
  nhanvienService = inject(NhanvienService);
  phongbanService = inject(PhongbanService);
  snackBar = inject(MatSnackBar);
  mode = "create";
  id = null;
  loading = signal(false);
  submitting = signal(false);
  phongbans = signal([]);
  nhanvienForm;
  gioiTinhOptions = Object.entries(GioiTinhLabels).map(([value, label]) => ({
    value,
    label
  }));
  trangThaiOptions = Object.entries(TrangThaiNhanvienLabels).map(([value, label]) => ({
    value,
    label
  }));
  ngOnInit() {
    this.id = this.route.snapshot.paramMap.get("id");
    this.mode = this.route.snapshot.data["mode"] || (this.id ? "edit" : "create");
    this.initForm();
    this.loadPhongbans();
    if (this.mode === "edit" && this.id) {
      this.loadNhanvien();
    }
  }
  initForm() {
    this.nhanvienForm = this.fb.group({
      // Thông tin cơ bản
      maNV: ["", [Validators.required, Validators.maxLength(20)]],
      maLamViec: ["", Validators.maxLength(50)],
      hoTen: ["", [Validators.required, Validators.maxLength(200)]],
      gioiTinh: [GioiTinh.KHAC],
      ngaySinh: [null],
      cmnd: ["", Validators.maxLength(20)],
      queQuan: ["", Validators.maxLength(500)],
      diaChiHienTai: ["", Validators.maxLength(500)],
      soDienThoai: ["", [Validators.maxLength(20), Validators.pattern(/^[0-9+\-\s()]*$/)]],
      email: ["", [Validators.email, Validators.maxLength(100)]],
      // Thông tin công việc
      phongbanId: [null],
      chucVu: ["", Validators.maxLength(100)],
      viTri: ["", Validators.maxLength(100)],
      ngayVaoLam: [null],
      trangThai: [TrangThaiNhanvien.THUVIEC, Validators.required],
      // Thông tin lương
      luongCoBan: [0, [Validators.min(0)]],
      hieuSuatCongViec: [0, [Validators.min(0)]],
      phuCapXang: [0, [Validators.min(0)]],
      phuCapDienThoai: [0, [Validators.min(0)]],
      hoTroChuyenCan: [0, [Validators.min(0)]],
      tienAnGiuaCa: [0, [Validators.min(0)]],
      thuongKinhDoanh: [0, [Validators.min(0)]],
      phuCapKhac: [0, [Validators.min(0)]],
      // Thông tin ngân hàng
      soTaiKhoan: ["", Validators.maxLength(50)],
      nganHang: ["", Validators.maxLength(100)],
      chiNhanh: ["", Validators.maxLength(200)],
      // Ghi chú
      ghiChu: ["", Validators.maxLength(1e3)],
      isActive: [true]
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
  loadNhanvien() {
    return __async(this, null, function* () {
      if (!this.id)
        return;
      try {
        this.loading.set(true);
        const nhanvien = yield this.nhanvienService.getNhanvienById(this.id);
        this.nhanvienForm.patchValue({
          maNV: nhanvien.maNV,
          maLamViec: nhanvien.maLamViec,
          hoTen: nhanvien.hoTen,
          gioiTinh: nhanvien.gioiTinh,
          ngaySinh: nhanvien.ngaySinh ? new Date(nhanvien.ngaySinh) : null,
          cmnd: nhanvien.cmnd,
          queQuan: nhanvien.queQuan,
          diaChiHienTai: nhanvien.diaChiHienTai,
          soDienThoai: nhanvien.soDienThoai,
          email: nhanvien.email,
          phongbanId: nhanvien.phongbanId,
          chucVu: nhanvien.chucVu,
          viTri: nhanvien.viTri,
          ngayVaoLam: nhanvien.ngayVaoLam ? new Date(nhanvien.ngayVaoLam) : null,
          trangThai: nhanvien.trangThai,
          luongCoBan: nhanvien.luongCoBan,
          hieuSuatCongViec: nhanvien.hieuSuatCongViec,
          phuCapXang: nhanvien.phuCapXang,
          phuCapDienThoai: nhanvien.phuCapDienThoai,
          hoTroChuyenCan: nhanvien.hoTroChuyenCan,
          tienAnGiuaCa: nhanvien.tienAnGiuaCa,
          thuongKinhDoanh: nhanvien.thuongKinhDoanh,
          phuCapKhac: nhanvien.phuCapKhac,
          soTaiKhoan: nhanvien.soTaiKhoan,
          nganHang: nhanvien.nganHang,
          chiNhanh: nhanvien.chiNhanh,
          ghiChu: nhanvien.ghiChu,
          isActive: nhanvien.isActive
        });
      } catch (error) {
        this.snackBar.open("Kh\xF4ng th\u1EC3 t\u1EA3i th\xF4ng tin nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3 });
        console.error("Error loading nhanvien:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  onSubmit() {
    return __async(this, null, function* () {
      if (!this.nhanvienForm.valid) {
        this.snackBar.open("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin b\u1EAFt bu\u1ED9c", "\u0110\xF3ng", { duration: 3e3 });
        Object.keys(this.nhanvienForm.controls).forEach((key) => {
          const control = this.nhanvienForm.get(key);
          if (control?.invalid) {
            control.markAsTouched();
          }
        });
        return;
      }
      try {
        this.submitting.set(true);
        const formValue = this.nhanvienForm.value;
        if (formValue.ngaySinh) {
          formValue.ngaySinh = new Date(formValue.ngaySinh).toISOString();
        }
        if (formValue.ngayVaoLam) {
          formValue.ngayVaoLam = new Date(formValue.ngayVaoLam).toISOString();
        }
        if (this.mode === "create") {
          yield this.nhanvienService.createNhanvien(formValue);
          this.snackBar.open("T\u1EA1o nh\xE2n vi\xEAn th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
            panelClass: ["snackbar-success"],
            duration: 3e3
          });
        } else if (this.id) {
          yield this.nhanvienService.updateNhanvien(this.id, formValue);
          this.snackBar.open("C\u1EADp nh\u1EADt nh\xE2n vi\xEAn th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
            panelClass: ["snackbar-success"],
            duration: 3e3
          });
        }
        this.router.navigate(["/admin/nhanvien/list"]);
      } catch (error) {
        const message = error?.error?.message || "C\xF3 l\u1ED7i x\u1EA3y ra. Vui l\xF2ng th\u1EED l\u1EA1i.";
        this.snackBar.open(message, "\u0110\xF3ng", {
          panelClass: ["snackbar-error"],
          duration: 5e3
        });
        console.error("Error submitting form:", error);
      } finally {
        this.submitting.set(false);
      }
    });
  }
  goBack() {
    this.router.navigate(["/admin/nhanvien/list"]);
  }
  static \u0275fac = function FormNhanvienComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _FormNhanvienComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _FormNhanvienComponent, selectors: [["app-formnhanvien"]], decls: 13, vars: 3, consts: [["pickerNgaySinh", ""], ["pickerNgayVaoLam", ""], [1, "form-container"], [1, "form-header"], ["mat-icon-button", "", "type", "button", 1, "back-button", 3, "click"], [1, "header-content"], [1, "page-title"], [1, "page-description"], [1, "form-card"], [1, "loading-container"], [3, "formGroup"], ["diameter", "40"], [3, "ngSubmit", "formGroup"], ["animationDuration", "200ms"], ["mat-tab-label", ""], [1, "tab-content"], [1, "section-title"], [1, "form-row"], ["appearance", "outline", 1, "form-field-third"], ["matInput", "", "formControlName", "maNV", "placeholder", "VD: NV001"], ["matInput", "", "formControlName", "maLamViec", "placeholder", "VD: MLV001"], ["matInput", "", "formControlName", "hoTen", "placeholder", "VD: Nguy\u1EC5n V\u0103n A"], ["formControlName", "gioiTinh"], [3, "value"], ["matInput", "", "formControlName", "ngaySinh", "placeholder", "dd/mm/yyyy", 3, "matDatepicker"], ["matSuffix", "", 3, "for"], ["matInput", "", "formControlName", "cmnd", "placeholder", "VD: 012345678901"], ["appearance", "outline", 1, "form-field-half"], ["matInput", "", "formControlName", "soDienThoai", "placeholder", "VD: 0901234567"], ["matInput", "", "formControlName", "email", "placeholder", "VD: email@company.com", "type", "email"], ["matInput", "", "formControlName", "queQuan", "placeholder", "VD: H\xE0 N\u1ED9i"], ["matInput", "", "formControlName", "diaChiHienTai", "placeholder", "VD: 123 \u0110\u01B0\u1EDDng ABC, Qu\u1EADn XYZ"], ["formControlName", "phongbanId"], ["formControlName", "trangThai"], ["matInput", "", "formControlName", "chucVu", "placeholder", "VD: Nh\xE2n vi\xEAn"], ["matInput", "", "formControlName", "viTri", "placeholder", "VD: K\u1EBF to\xE1n"], ["matInput", "", "formControlName", "ngayVaoLam", "placeholder", "dd/mm/yyyy", 3, "matDatepicker"], [1, "form-field-half", "checkbox-wrapper"], ["formControlName", "isActive", 1, "checkbox-field"], ["appearance", "outline", 1, "form-field-quarter"], ["matInput", "", "formControlName", "luongCoBan", "type", "number", "placeholder", "0"], ["matSuffix", ""], ["matInput", "", "formControlName", "hieuSuatCongViec", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "phuCapXang", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "phuCapDienThoai", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "hoTroChuyenCan", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "tienAnGiuaCa", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "thuongKinhDoanh", "type", "number", "placeholder", "0"], ["matInput", "", "formControlName", "phuCapKhac", "type", "number", "placeholder", "0"], [1, "salary-summary"], [1, "summary-label"], [1, "summary-value"], ["appearance", "outline", 1, "form-field-full"], ["matInput", "", "formControlName", "soTaiKhoan", "placeholder", "VD: 1234567890"], ["matInput", "", "formControlName", "nganHang", "placeholder", "VD: Vietcombank"], ["matInput", "", "formControlName", "chiNhanh", "placeholder", "VD: Chi nh\xE1nh H\xE0 N\u1ED9i"], ["matInput", "", "formControlName", "ghiChu", "rows", "6", "placeholder", "Nh\u1EADp ghi ch\xFA v\u1EC1 nh\xE2n vi\xEAn..."], ["align", "end"], [1, "form-actions"], ["mat-button", "", "type", "button", 1, "btn-secondary", 3, "click", "disabled"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "btn-primary", 3, "disabled"], ["diameter", "18"]], template: function FormNhanvienComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "button", 4);
      \u0275\u0275listener("click", function FormNhanvienComponent_Template_button_click_2_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(3, "mat-icon");
      \u0275\u0275text(4, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 5)(6, "h1", 6);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 7);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 8);
      \u0275\u0275template(11, FormNhanvienComponent_Conditional_11_Template, 4, 0, "div", 9)(12, FormNhanvienComponent_Conditional_12_Template, 227, 39, "form", 10);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.mode === "create" ? "Th\xEAm nh\xE2n vi\xEAn m\u1EDBi" : "Ch\u1EC9nh s\u1EEDa nh\xE2n vi\xEAn");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.mode === "create" ? "\u0110i\u1EC1n th\xF4ng tin \u0111\u1EC3 t\u1EA1o nh\xE2n vi\xEAn m\u1EDBi" : "C\u1EADp nh\u1EADt th\xF4ng tin nh\xE2n vi\xEAn");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.loading() ? 11 : 12);
    }
  }, dependencies: [
    CommonModule,
    DecimalPipe,
    ReactiveFormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    FormGroupDirective,
    FormControlName,
    MatCardModule,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatError,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatTabsModule,
    MatTabLabel,
    MatTab,
    MatTabGroup,
    MatCheckboxModule,
    MatCheckbox
  ], styles: ["\n\n[_nghost-%COMP%] {\n  --background: hsl(0 0% 100%);\n  --foreground: hsl(240 10% 3.9%);\n  --card: hsl(0 0% 100%);\n  --card-foreground: hsl(240 10% 3.9%);\n  --primary: hsl(240 5.9% 10%);\n  --primary-foreground: hsl(0 0% 98%);\n  --secondary: hsl(240 4.8% 95.9%);\n  --secondary-foreground: hsl(240 5.9% 10%);\n  --muted: hsl(240 4.8% 95.9%);\n  --muted-foreground: hsl(240 3.8% 46.1%);\n  --accent: hsl(240 4.8% 95.9%);\n  --accent-foreground: hsl(240 5.9% 10%);\n  --destructive: hsl(0 84.2% 60.2%);\n  --border: hsl(240 5.9% 90%);\n  --input: hsl(240 5.9% 90%);\n  --ring: hsl(240 5.9% 10%);\n  --radius: 0.5rem;\n}\n.form-container[_ngcontent-%COMP%] {\n  max-width: 900px;\n  margin: 0 auto;\n  padding: 1.5rem 2rem;\n}\n.form-header[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: flex-start;\n  gap: 1rem;\n  margin-bottom: 1.5rem;\n}\n.back-button[_ngcontent-%COMP%] {\n  margin-top: 0.25rem;\n  width: 2.25rem !important;\n  height: 2.25rem !important;\n  border-radius: var(--radius) !important;\n}\n.back-button[_ngcontent-%COMP%]:hover {\n  background: var(--accent) !important;\n}\n.back-button[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 1.25rem !important;\n  width: 1.25rem !important;\n  height: 1.25rem !important;\n  color: var(--muted-foreground) !important;\n}\n.header-content[_ngcontent-%COMP%] {\n  flex: 1;\n}\n.page-title[_ngcontent-%COMP%] {\n  font-size: 1.875rem;\n  font-weight: 700;\n  letter-spacing: -0.025em;\n  color: var(--foreground);\n  margin: 0 0 0.25rem 0;\n}\n.page-description[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  color: var(--muted-foreground);\n  margin: 0;\n}\n.form-card[_ngcontent-%COMP%] {\n  background: var(--card);\n  border: 1px solid var(--border);\n  border-radius: var(--radius);\n  padding: 0;\n  overflow: hidden;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  justify-content: center;\n  padding: 4rem 1.5rem;\n  gap: 1rem;\n}\n.loading-container[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: var(--muted-foreground);\n  font-size: 0.875rem;\n  margin: 0;\n}\n  .mat-mdc-tab-group .mat-mdc-tab-header {\n  border-bottom: 1px solid var(--border);\n  background: var(--muted);\n}\n  .mat-mdc-tab-group .mat-mdc-tab-labels {\n  padding: 0 1rem;\n}\n  .mat-mdc-tab-group .mat-mdc-tab {\n  min-width: auto;\n  padding: 0 1rem;\n  height: 3rem;\n  opacity: 1;\n}\n  .mat-mdc-tab-group .mat-mdc-tab .mdc-tab__text-label {\n  display: flex;\n  align-items: center;\n  gap: 0.5rem;\n  font-weight: 500;\n  font-size: 0.875rem;\n  color: var(--muted-foreground);\n  letter-spacing: 0;\n}\n  .mat-mdc-tab-group .mat-mdc-tab .mdc-tab__text-label mat-icon {\n  font-size: 1.125rem;\n  width: 1.125rem;\n  height: 1.125rem;\n}\n  .mat-mdc-tab-group .mat-mdc-tab.mdc-tab--active .mdc-tab__text-label {\n  color: var(--foreground);\n}\n  .mat-mdc-tab-group .mdc-tab-indicator__content--underline {\n  border-color: var(--foreground) !important;\n  border-width: 2px !important;\n}\n  .mat-mdc-tab-group .mat-mdc-tab-body-wrapper {\n  padding: 0;\n}\n.tab-content[_ngcontent-%COMP%] {\n  padding: 1.5rem;\n  min-height: 350px;\n}\n.section-title[_ngcontent-%COMP%] {\n  font-size: 0.875rem;\n  font-weight: 600;\n  color: var(--foreground);\n  margin-bottom: 1rem;\n  padding-bottom: 0.5rem;\n  border-bottom: 1px solid var(--border);\n}\n.section-title[_ngcontent-%COMP%]:not(:first-child) {\n  margin-top: 1.5rem;\n}\n.form-row[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 1rem;\n  margin-bottom: 0.75rem;\n}\n.form-row[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.form-field-full[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: 100%;\n}\n.form-field-half[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: calc(50% - 0.5rem);\n}\n.form-field-third[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: calc(33.333% - 0.67rem);\n}\n.form-field-quarter[_ngcontent-%COMP%] {\n  flex: 1;\n  min-width: calc(25% - 0.75rem);\n}\n  mat-form-field {\n  width: 100%;\n}\n  mat-form-field .mat-mdc-text-field-wrapper {\n  background: var(--background) !important;\n  border-radius: var(--radius) !important;\n}\n  mat-form-field .mdc-notched-outline__leading, \n  mat-form-field .mdc-notched-outline__notch, \n  mat-form-field .mdc-notched-outline__trailing {\n  border-color: var(--input) !important;\n}\n  mat-form-field:hover .mdc-notched-outline__leading, \n  mat-form-field:hover .mdc-notched-outline__notch, \n  mat-form-field:hover .mdc-notched-outline__trailing {\n  border-color: hsl(240, 5.9%, 70%) !important;\n}\n  mat-form-field.mat-focused .mdc-notched-outline__leading, \n  mat-form-field.mat-focused .mdc-notched-outline__notch, \n  mat-form-field.mat-focused .mdc-notched-outline__trailing {\n  border-color: var(--ring) !important;\n  border-width: 2px !important;\n}\n  mat-form-field .mat-mdc-form-field-infix {\n  padding-top: 0.75rem !important;\n  padding-bottom: 0.75rem !important;\n  min-height: auto !important;\n}\n  mat-form-field input, \n  mat-form-field textarea, \n  mat-form-field .mat-mdc-select-trigger {\n  font-size: 0.875rem !important;\n  color: var(--foreground) !important;\n}\n  mat-form-field textarea {\n  resize: vertical;\n  min-height: 120px;\n}\n  mat-form-field .mat-mdc-floating-label {\n  font-size: 0.875rem !important;\n  color: var(--muted-foreground) !important;\n}\n  mat-form-field .mat-mdc-form-field-hint {\n  font-size: 0.75rem;\n  color: var(--muted-foreground);\n}\n  mat-form-field .mat-mdc-form-field-error {\n  font-size: 0.75rem;\n}\n  mat-form-field [matSuffix] {\n  font-size: 0.75rem;\n  color: var(--muted-foreground);\n  margin-right: 0.5rem;\n}\n  mat-form-field .mat-datepicker-toggle {\n  color: var(--muted-foreground);\n}\n  mat-form-field .mat-datepicker-toggle .mat-mdc-icon-button {\n  width: 2rem;\n  height: 2rem;\n  padding: 0;\n}\n  mat-form-field.mat-form-field-invalid .mdc-notched-outline__leading, \n  mat-form-field.mat-form-field-invalid .mdc-notched-outline__notch, \n  mat-form-field.mat-form-field-invalid .mdc-notched-outline__trailing {\n  border-color: var(--destructive) !important;\n}\n.checkbox-wrapper[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  padding: 0.75rem 0;\n}\n.checkbox-field[_ngcontent-%COMP%]     .mdc-checkbox {\n  --mdc-checkbox-selected-checkmark-color: var(--primary-foreground);\n  --mdc-checkbox-selected-focus-icon-color: var(--primary);\n  --mdc-checkbox-selected-hover-icon-color: var(--primary);\n  --mdc-checkbox-selected-icon-color: var(--primary);\n  --mdc-checkbox-selected-pressed-icon-color: var(--primary);\n  --mdc-checkbox-unselected-focus-icon-color: var(--input);\n  --mdc-checkbox-unselected-hover-icon-color: var(--muted-foreground);\n  --mdc-checkbox-unselected-icon-color: var(--input);\n  --mdc-checkbox-unselected-pressed-icon-color: var(--muted-foreground);\n}\n.checkbox-field[_ngcontent-%COMP%]     .mdc-label {\n  font-size: 0.875rem;\n  color: var(--foreground);\n}\n.salary-summary[_ngcontent-%COMP%] {\n  margin-top: 1.5rem;\n  padding: 1.25rem;\n  background: var(--muted);\n  border-radius: var(--radius);\n  border: 1px solid var(--border);\n}\n.salary-summary[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  font-size: 0.75rem;\n  font-weight: 500;\n  text-transform: uppercase;\n  letter-spacing: 0.05em;\n  color: var(--muted-foreground);\n  margin-bottom: 0.25rem;\n}\n.salary-summary[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n  font-size: 1.75rem;\n  font-weight: 700;\n  color: var(--foreground);\n  letter-spacing: -0.025em;\n}\n.form-actions[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: flex-end;\n  gap: 0.75rem;\n  padding: 1.25rem 1.5rem;\n  border-top: 1px solid var(--border);\n  background: var(--muted);\n}\n.btn-secondary[_ngcontent-%COMP%] {\n  border-radius: var(--radius) !important;\n  font-weight: 500 !important;\n  font-size: 0.875rem !important;\n  letter-spacing: 0 !important;\n  text-transform: none !important;\n  padding: 0 1rem !important;\n  height: 2.5rem !important;\n  color: var(--secondary-foreground) !important;\n}\n.btn-secondary[_ngcontent-%COMP%]:hover {\n  background: var(--accent) !important;\n}\n.btn-primary[_ngcontent-%COMP%] {\n  border-radius: var(--radius) !important;\n  font-weight: 500 !important;\n  font-size: 0.875rem !important;\n  letter-spacing: 0 !important;\n  text-transform: none !important;\n  padding: 0 1.25rem !important;\n  height: 2.5rem !important;\n  background: var(--primary) !important;\n  color: var(--primary-foreground) !important;\n  box-shadow: none !important;\n  display: flex !important;\n  align-items: center !important;\n  gap: 0.5rem !important;\n}\n.btn-primary[_ngcontent-%COMP%]:hover:not([disabled]) {\n  background: hsl(240, 5.9%, 20%) !important;\n}\n.btn-primary[disabled][_ngcontent-%COMP%] {\n  opacity: 0.5;\n  cursor: not-allowed;\n}\n.btn-primary[_ngcontent-%COMP%]   mat-spinner[_ngcontent-%COMP%] {\n  --mdc-circular-progress-active-indicator-color: var(--primary-foreground);\n}\n@media (max-width: 768px) {\n  .form-container[_ngcontent-%COMP%] {\n    padding: 1rem;\n  }\n  .page-title[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .form-row[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 0.5rem;\n  }\n  .form-field-half[_ngcontent-%COMP%], \n   .form-field-third[_ngcontent-%COMP%], \n   .form-field-quarter[_ngcontent-%COMP%] {\n    min-width: 100%;\n  }\n  .tab-content[_ngcontent-%COMP%] {\n    padding: 1rem;\n    min-height: 300px;\n  }\n    .mat-mdc-tab {\n    padding: 0 0.75rem !important;\n  }\n    .mat-mdc-tab .mdc-tab__text-label {\n    font-size: 0.75rem;\n  }\n    .mat-mdc-tab .mdc-tab__text-label span {\n    display: none;\n  }\n    .mat-mdc-tab .mdc-tab__text-label mat-icon {\n    margin: 0;\n  }\n  .salary-summary[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n    font-size: 1.5rem;\n  }\n  .form-actions[_ngcontent-%COMP%] {\n    flex-direction: column-reverse;\n  }\n  .form-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n}\n@media (max-width: 480px) {\n  .form-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start;\n    gap: 0.5rem;\n  }\n  .back-button[_ngcontent-%COMP%] {\n    margin-top: 0;\n  }\n}\n/*# sourceMappingURL=formnhanvien.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(FormNhanvienComponent, { className: "FormNhanvienComponent", filePath: "src/app/admin/nhanvien/formnhanvien/formnhanvien.component.ts", lineNumber: 49 });
})();
export {
  FormNhanvienComponent
};
//# sourceMappingURL=chunk-5OXJR3QB.js.map
