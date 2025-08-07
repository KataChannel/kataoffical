import {
  NgxFileDropModule
} from "./chunk-KK6GX724.js";
import {
  require_html2canvas
} from "./chunk-65WN44DK.js";
import {
  UploadService
} from "./chunk-GW3FSJBW.js";
import "./chunk-WMRPSYJH.js";
import {
  HotrosService,
  ListHotro,
  ListHotroComponent,
  ListType,
  conver
} from "./chunk-SP3HFGCL.js";
import "./chunk-PKPIUWLZ.js";
import "./chunk-7VZTPIES.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-LRV7H3NQ.js";
import "./chunk-YSHAUWVW.js";
import "./chunk-3FX3VELS.js";
import {
  UserService
} from "./chunk-XGCTO3IF.js";
import "./chunk-UV2EYCAL.js";
import "./chunk-YS6BOFHA.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-S32RIQSG.js";
import "./chunk-BP2JQXJN.js";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortModule,
  MatTableModule
} from "./chunk-JFLWRVXN.js";
import "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenuModule
} from "./chunk-3J77SWWE.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-GWKJMKCD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf,
  isPlatformBrowser
} from "./chunk-E6DSVUBK.js";
import {
  PLATFORM_ID,
  Renderer2,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵresolveWindow,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/hotro/listhotro/detailhotro/detailhotro.component.ts
var import_html2canvas = __toESM(require_html2canvas());

// src/app/shared/utils/tiente.utils.ts
function toVietnameseWords(number) {
  if (isNaN(number))
    return "Kh\xF4ng ph\u1EA3i s\u1ED1 h\u1EE3p l\u1EC7";
  const units = ["", "m\u1ED9t", "hai", "ba", "b\u1ED1n", "n\u0103m", "s\xE1u", "b\u1EA3y", "t\xE1m", "ch\xEDn"];
  const tens = ["l\u1EBB", "m\u01B0\u1EDDi", "hai m\u01B0\u01A1i", "ba m\u01B0\u01A1i", "b\u1ED1n m\u01B0\u01A1i", "n\u0103m m\u01B0\u01A1i", "s\xE1u m\u01B0\u01A1i", "b\u1EA3y m\u01B0\u01A1i", "t\xE1m m\u01B0\u01A1i", "ch\xEDn m\u01B0\u01A1i"];
  const scales = ["", "ngh\xECn", "tri\u1EC7u", "t\u1EF7", "ngh\xECn t\u1EF7", "tri\u1EC7u t\u1EF7"];
  let result = "";
  let numberStr = number?.toString();
  let groups = [];
  while (numberStr?.length > 0) {
    groups.unshift(numberStr.slice(-3));
    numberStr = numberStr.slice(0, -3);
  }
  for (let i = 0; i < groups.length; i++) {
    let group = parseInt(groups[i]);
    if (group === 0)
      continue;
    let [hundreds, tensDigit, unitsDigit] = groups[i].padStart(3, "0").split("").map(Number);
    let groupText = "";
    if (hundreds) {
      groupText += units[hundreds] + " tr\u0103m ";
    }
    if (tensDigit > 1) {
      groupText += tens[tensDigit] + " ";
      if (unitsDigit !== 0) {
        groupText += (unitsDigit === 5 ? "l\u0103m" : units[unitsDigit]) + " ";
      }
    } else if (tensDigit === 1) {
      groupText += "m\u01B0\u1EDDi ";
      if (unitsDigit !== 0) {
        groupText += (unitsDigit === 5 ? "l\u0103m" : units[unitsDigit]) + " ";
      }
    } else if (unitsDigit !== 0) {
      groupText += (hundreds ? "l\u1EBB " : "") + (unitsDigit === 5 ? "n\u0103m" : units[unitsDigit]) + " ";
    }
    result += groupText + scales[groups.length - 1 - i] + " ";
  }
  return result.trim() + " \u0110\u1ED3ng";
}

// src/app/admin/hotro/listhotro/detailhotro/detailhotro.component.ts
var _c0 = ["drawer"];
var _c1 = ["editable"];
var _c2 = ["viewChat"];
var DetailHotroComponent_div_3_Defer_4_DepsFn = () => [MatFormField, MatLabel, MatSuffix, MatInput, MatIcon, MatButton, MatSelect, MatOption, DefaultValueAccessor, NumberValueAccessor, NgControlStatus, NgModel, MatDatepicker, MatDatepickerInput, MatDatepickerToggle];
var _c3 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function DetailHotroComponent_div_3_Defer_3_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275property("value", item_r5.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r5.Title);
  }
}
function DetailHotroComponent_div_3_Defer_3_ForEmpty_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 39);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u.");
    \u0275\u0275elementEnd();
  }
}
function DetailHotroComponent_div_3_Defer_3_For_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-form-field", 31)(4, "mat-label");
    \u0275\u0275text(5, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_For_51_Template_input_ngModelChange_6_listener($event) {
      const \u0275$index_104_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Title, $event) || (ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 31)(8, "mat-label");
    \u0275\u0275text(9, "Th\xE0nh Ti\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_For_51_Template_input_ngModelChange_10_listener($event) {
      const \u0275$index_104_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Thanhtien, $event) || (ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Thanhtien = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "mat-form-field", 31)(12, "mat-label");
    \u0275\u0275text(13, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_For_51_Template_input_ngModelChange_14_listener($event) {
      const \u0275$index_104_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Ghichu, $event) || (ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 25);
    \u0275\u0275listener("click", function DetailHotroComponent_div_3_Defer_3_For_51_Template_button_click_15_listener() {
      const \u0275$index_104_r7 = \u0275\u0275restoreView(_r6).$index;
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.RemoveItem(\u0275$index_104_r7));
    });
    \u0275\u0275text(16, "Xo\xE1 ");
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const \u0275$index_104_r7 = ctx.$index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_104_r7 + 1);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Title);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Thanhtien);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Chitiet[\u0275$index_104_r7].Ghichu);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c3));
  }
}
function DetailHotroComponent_div_3_Defer_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-form-field", 28)(2, "mat-label");
    \u0275\u0275text(3, "Ng\xE0y T\u1EA1o");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 29);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_4_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Ngaytao, $event) || (ctx_r3.Detail.Dexuat.Ngaytao = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(5, "mat-datepicker-toggle", 30)(6, "mat-datepicker", null, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-form-field", 31)(9, "mat-label");
    \u0275\u0275text(10, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 32);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Title, $event) || (ctx_r3.Detail.Title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "mat-form-field", 31)(13, "mat-label");
    \u0275\u0275text(14, "Danh M\u1EE5c");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-select", 33);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_mat_select_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Type, $event) || (ctx_r3.Detail.Type = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(16, "div", 34)(17, "mat-form-field", 35)(18, "input", 36);
    \u0275\u0275listener("input", function DetailHotroComponent_div_3_Defer_3_Template_input_input_18_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.DoFindKhachhang($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 37);
    \u0275\u0275repeaterCreate(20, DetailHotroComponent_div_3_Defer_3_For_21_Template, 2, 2, "mat-option", 38, _forTrack0, false, DetailHotroComponent_div_3_Defer_3_ForEmpty_22_Template, 2, 0, "div", 39);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(23, "mat-form-field", 31)(24, "mat-label");
    \u0275\u0275text(25, "Ng\u01B0\u1EDDi Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "input", 40);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_26_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Nguoinhan, $event) || (ctx_r3.Detail.Dexuat.Nguoinhan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "mat-form-field", 31)(28, "mat-label");
    \u0275\u0275text(29, "Tr\u01B0\u1EDFng b\u1ED9 ph\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "input", 41);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_30_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Truongbophan, $event) || (ctx_r3.Detail.Dexuat.Truongbophan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "mat-form-field", 31)(32, "mat-label");
    \u0275\u0275text(33, "Gi\xE1m \u0111\u1ED1c K\u1EBF to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 42);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Ketoan, $event) || (ctx_r3.Detail.Dexuat.Ketoan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(35, "mat-form-field", 31)(36, "mat-label");
    \u0275\u0275text(37, "Ng\u01B0\u1EDDi \u0110\u1EC1 Xu\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_38_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Nguoidexuat, $event) || (ctx_r3.Detail.Dexuat.Nguoidexuat = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(39, "mat-form-field", 31)(40, "mat-label");
    \u0275\u0275text(41, "B\u1ED9 Ph\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_42_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Bophan, $event) || (ctx_r3.Detail.Dexuat.Bophan = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "mat-form-field", 31)(44, "mat-label");
    \u0275\u0275text(45, "V\u1ECB Tr\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_46_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Vitri, $event) || (ctx_r3.Detail.Dexuat.Vitri = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(47, "div", 46)(48, "div", 47)(49, "div", 48);
    \u0275\u0275repeaterCreate(50, DetailHotroComponent_div_3_Defer_3_For_51_Template, 19, 10, "div", 49, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "div")(53, "button", 26);
    \u0275\u0275listener("click", function DetailHotroComponent_div_3_Defer_3_Template_button_click_53_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.Detail.Dexuat.Chitiet.push({ Title: "", Thanhtien: 0, Ghichu: "" }));
    });
    \u0275\u0275text(54, "Th\xEAm ");
    \u0275\u0275elementStart(55, "mat-icon");
    \u0275\u0275text(56, "add");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(57, "mat-form-field", 31)(58, "mat-label");
    \u0275\u0275text(59, "T\u1EA1m \u1EE8ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "input", 50);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_60_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Tamung, $event) || (ctx_r3.Detail.Dexuat.Tamung = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(61, "mat-form-field", 31)(62, "mat-label");
    \u0275\u0275text(63, "Ti\u1EC1n B\u1EB1ng Ch\u1EEF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(64, "input", 45);
    \u0275\u0275twoWayListener("ngModelChange", function DetailHotroComponent_div_3_Defer_3_Template_input_ngModelChange_64_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.Detail.Dexuat.Tienbangchu, $event) || (ctx_r3.Detail.Dexuat.Tienbangchu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const picker_r8 = \u0275\u0275reference(7);
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", picker_r8);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Ngaytao);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(27, _c3));
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r8);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Title);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(28, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Type);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(29, _c3));
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.FilterListType);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Nguoinhan);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(30, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Truongbophan);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(31, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Ketoan);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(32, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Nguoidexuat);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(33, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Bophan);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Vitri);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275repeater(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Chitiet);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Tamung);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(36, _c3));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.Detail.Dexuat.Tienbangchu);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(37, _c3));
  }
}
function DetailHotroComponent_div_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 23);
    \u0275\u0275text(2, "Th\xF4ng Tin \u0110\u1EC1 Xu\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, DetailHotroComponent_div_3_Defer_3_Template, 65, 38);
    \u0275\u0275defer(4, 3, DetailHotroComponent_div_3_Defer_4_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementStart(6, "div", 24)(7, "button", 25);
    \u0275\u0275listener("click", function DetailHotroComponent_div_3_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r2);
      \u0275\u0275nextContext();
      const drawer_r9 = \u0275\u0275reference(2);
      return \u0275\u0275resetView(drawer_r9.toggle());
    });
    \u0275\u0275text(8, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 26);
    \u0275\u0275listener("click", function DetailHotroComponent_div_3_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.saveContent());
    });
    \u0275\u0275text(10, "L\u01B0u");
    \u0275\u0275elementEnd()()();
  }
}
function DetailHotroComponent_div_31_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 78);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 64);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 79);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    const i_r11 = ctx.index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r11 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r10.Title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(7, 4, item_r10.Thanhtien), "\u0111");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r10.Ghichu);
  }
}
function DetailHotroComponent_div_31_li_126_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 80)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 81);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const task_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r12.Title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(task_r12.Ghichu);
  }
}
function DetailHotroComponent_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 53)(2, "div", 54);
    \u0275\u0275text(3, "BM-04-QT-KT-02");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 54);
    \u0275\u0275text(5, "Ng\xE0y hi\u1EC7u l\u1EF1c: 10/01/2018");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 55);
    \u0275\u0275text(7, "PHI\u1EBEU \u0110\u1EC0 NGH\u1ECA THANH TO\xC1N, QUY\u1EBET TO\xC1N");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 54);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 56)(12, "span")(13, "strong");
    \u0275\u0275text(14, "K\xEDnh g\u1EEDi:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span")(17, "strong");
    \u0275\u0275text(18, "H\u1ECD v\xE0 t\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "span")(21, "strong");
    \u0275\u0275text(22, "B\u1ED9 ph\u1EADn:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span")(25, "strong");
    \u0275\u0275text(26, "Ch\u1EE9c v\u1EE5:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span")(29, "strong");
    \u0275\u0275text(30, "\u0110\u1EC1 Ngh\u1ECB Chi S\u1ED1 Ti\u1EC1n:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(33, "div", 57)(34, "table", 58)(35, "thead")(36, "tr", 59)(37, "th", 60);
    \u0275\u0275text(38, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "th", 61);
    \u0275\u0275text(40, "N\u1ED9i dung");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "th", 61);
    \u0275\u0275text(42, "S\u1ED1 ti\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(43, "th", 61);
    \u0275\u0275text(44, "Ghi ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(45, "tbody");
    \u0275\u0275template(46, DetailHotroComponent_div_31_tr_46_Template, 10, 6, "tr", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "tfoot")(48, "tr", 62)(49, "td", 63);
    \u0275\u0275text(50, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(51, "td", 64);
    \u0275\u0275text(52);
    \u0275\u0275pipe(53, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(54, "td", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "tr", 62)(56, "td", 63);
    \u0275\u0275text(57, "S\u1ED1 \u0111\xE3 t\u1EA1m \u1EE9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "td", 64)(59, "span");
    \u0275\u0275text(60);
    \u0275\u0275pipe(61, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275element(62, "td", 61);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(63, "tr", 62)(64, "td", 63);
    \u0275\u0275text(65, "S\u1ED1 ti\u1EC1n (C\xF2n l\u1EA1i) \u0111\u1EC1 ngh\u1ECB chi:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(66, "td", 64);
    \u0275\u0275text(67);
    \u0275\u0275pipe(68, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275element(69, "td", 61);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(70, "p", 65)(71, "strong");
    \u0275\u0275text(72, "S\u1ED1 Ti\u1EC1n B\u1EB1ng Ch\u1EEF:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(73);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(74, "div", 66)(75, "div", 67)(76, "span")(77, "strong");
    \u0275\u0275text(78, "Gi\xE1m \u0111\u1ED1c K\u1EBF to\xE1n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(79, "br");
    \u0275\u0275text(80, "(K\xFD v\xE0 Ghi r\xF5 H\u1ECD T\xEAn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(81, "span", 68);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(83, "div", 67)(84, "span")(85, "strong");
    \u0275\u0275text(86, "Tr\u01B0\u1EDFng b\u1ED9 ph\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275element(87, "br");
    \u0275\u0275text(88, "(K\xFD v\xE0 Ghi r\xF5 H\u1ECD T\xEAn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(89, "span", 68);
    \u0275\u0275text(90);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(91, "div", 67)(92, "span")(93, "strong");
    \u0275\u0275text(94, "Ng\u01B0\u1EDDi \u0111\u1EC1 ngh\u1ECB");
    \u0275\u0275elementEnd();
    \u0275\u0275element(95, "br");
    \u0275\u0275text(96, "(K\xFD v\xE0 Ghi r\xF5 H\u1ECD T\xEAn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(97, "span", 68);
    \u0275\u0275text(98);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(99, "div", 53)(100, "div", 69);
    \u0275\u0275text(101, "BM-01-QT-KT-02");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(102, "div", 69);
    \u0275\u0275text(103, "Ng\xE0y hi\u1EC7u l\u1EF1c: 10/01/2018");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(104, "div", 70);
    \u0275\u0275text(105, "PHI\u1EBEU \u0110\u1EC0 XU\u1EA4T C\xD4NG VI\u1EC6C");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(106, "div", 71)(107, "div")(108, "strong");
    \u0275\u0275text(109, "H\u1ECD v\xE0 t\xEAn:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(110);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(111, "div")(112, "strong");
    \u0275\u0275text(113, "B\u1ED9 ph\u1EADn:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(114);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(115, "div")(116, "strong");
    \u0275\u0275text(117, "Ch\u1EE9c danh:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(118);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(119, "div", 72)(120, "strong");
    \u0275\u0275text(121, "\u0110\u1EC1 xu\u1EA5t c\xF4ng vi\u1EC7c nh\u01B0 sau: ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(122, "span", 62);
    \u0275\u0275text(123);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(124, "div", 73)(125, "ul", 74);
    \u0275\u0275template(126, DetailHotroComponent_div_31_li_126_Template, 5, 2, "li", 75);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(127, "div", 76);
    \u0275\u0275text(128);
    \u0275\u0275pipe(129, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(130, "div", 69);
    \u0275\u0275text(131);
    \u0275\u0275pipe(132, "date");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(133, "div", 77)(134, "div", 67)(135, "span")(136, "strong");
    \u0275\u0275text(137, "BG\u0110/Tr\u01B0\u1EDFng B\u1ED9 ph\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275element(138, "br");
    \u0275\u0275text(139, "(K\xFD v\xE0 Ghi r\xF5 H\u1ECD T\xEAn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(140, "span", 68);
    \u0275\u0275text(141);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(142, "div", 67)(143, "span")(144, "strong");
    \u0275\u0275text(145, "Ng\u01B0\u1EDDi \u0111\u1EC1 ngh\u1ECB");
    \u0275\u0275elementEnd();
    \u0275\u0275element(146, "br");
    \u0275\u0275text(147, "(K\xFD v\xE0 Ghi r\xF5 H\u1ECD T\xEAn)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(148, "span", 68);
    \u0275\u0275text(149);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 23, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Ngaytao, "dd/MM/yyyy"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Nguoinhan, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Nguoidexuat, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Bophan, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Vitri, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind1(32, 26, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Tongtien), "\u0111");
    \u0275\u0275advance(15);
    \u0275\u0275property("ngForOf", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Chitiet);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(53, 28, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Tongtien), "\u0111");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(61, 30, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Tamung), "\u0111");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind1(68, 32, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.TongChi), "\u0111");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Tienbangchu, "");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Ketoan);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Truongbophan);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Nguoidexuat);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Nguoidexuat, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Bophan, "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Vitri, "");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Title);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngForOf", ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Chitiet);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("D\u1EF1 to\xE1n kinh ph\xED: ", \u0275\u0275pipeBind1(129, 34, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Tongtien), "\u0111");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("Ng\xE0y ", \u0275\u0275pipeBind2(132, 36, ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Ngaytao, "dd/MM/yyyy"), "");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Truongbophan);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.Detail == null ? null : ctx_r3.Detail.Dexuat == null ? null : ctx_r3.Detail.Dexuat.Nguoidexuat);
  }
}
function DetailHotroComponent_div_33_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "span", 83);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.idUser);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r13.Content, \u0275\u0275sanitizeHtml);
  }
}
function DetailHotroComponent_div_33_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "img", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.idUser);
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r13.Content, \u0275\u0275sanitizeUrl);
  }
}
function DetailHotroComponent_div_33_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 82)(1, "span", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "a", 85);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.idUser);
    \u0275\u0275advance();
    \u0275\u0275property("href", item_r13.Content, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r13.FileName);
  }
}
function DetailHotroComponent_div_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", null, 5);
    \u0275\u0275template(2, DetailHotroComponent_div_33_Conditional_2_Template, 4, 2, "div", 82)(3, DetailHotroComponent_div_33_Conditional_3_Template, 4, 2, "div", 82)(4, DetailHotroComponent_div_33_Conditional_4_Template, 5, 3, "div", 82);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r13.Type === "text" ? 2 : item_r13.Type === "image" ? 3 : item_r13.Type === "file" ? 4 : -1);
  }
}
var DetailHotroComponent = class _DetailHotroComponent {
  _breakpointObserver;
  renderer;
  platformId;
  Detail = {};
  dataSource;
  displayedColumns = [];
  ColumnName = { STT: "STT" };
  FilterColumns = [];
  Columns = [];
  Listhotro = ListHotro;
  toolbar = [
    "heading",
    "alignment",
    "|",
    "bold",
    "italic",
    "link",
    "bulletedList",
    "numberedList",
    "blockQuote",
    "undo",
    "redo"
  ];
  tickets = conver.tickets;
  users = conver.users;
  channels = conver.channels;
  replies = conver.replies;
  ListItem = [{ Title: "", Thanhtien: 0, Ghichu: "" }];
  profile = {};
  paginator;
  sort;
  drawer;
  constructor(_breakpointObserver, renderer, platformId) {
    this._breakpointObserver = _breakpointObserver;
    this.renderer = renderer;
    this.platformId = platformId;
    if (isPlatformBrowser(this.platformId)) {
      this.FilterColumns = JSON.parse(localStorage.getItem("hotro_FilterColumns") || "[]");
    }
  }
  _hotrosService = inject(HotrosService);
  _router = inject(ActivatedRoute);
  _route = inject(Router);
  _ListHotroComponent = inject(ListHotroComponent);
  _UploadService = inject(UploadService);
  _UserService = inject(UserService);
  _snackBar = inject(MatSnackBar);
  editable;
  viewChat;
  handleShortcut(event) {
    if (event.ctrlKey && event.key.toLowerCase() === "i") {
      event.preventDefault();
      if (this.editable) {
        this.editable.nativeElement.focus();
        this.moveCursorToEnd(this.editable.nativeElement);
      }
    }
  }
  scrollToBottom() {
    console.log(this.viewChat);
    setTimeout(() => {
      if (this.viewChat && this.viewChat.length > 0) {
        const lastChat = this.viewChat.last.nativeElement;
        lastChat.scrollIntoView({ behavior: "smooth" });
      }
    }, 100);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this._router.paramMap.subscribe((data) => __async(this, null, function* () {
        const paramsId = data.get("id");
        if (paramsId) {
          yield this._hotrosService.getHotroByid(paramsId).then((data2) => {
            if (data2) {
              this.Detail = this._hotrosService.Hotro();
              this.Detail.Dexuat.Chitiet = this.Detail.Dexuat.Chitiet || [];
              this.Detail.Dexuat.Tienbangchu = toVietnameseWords(this.Detail.Dexuat.TongChi) || "Ki\u1EC3m tra l\u1EA1i s\u1ED1 ti\u1EC1n";
              this.Detail.Chat = this.Detail.idChat || [];
              console.log(this.Detail);
              this._UserService.getProfile().then((data3) => {
                this.profile = data3;
              });
              this._ListHotroComponent.drawer.open();
            }
          });
        } else {
          this._ListHotroComponent.drawer.close();
        }
      }));
    });
  }
  editableDiv;
  editiorValue = "";
  ngAfterViewInit() {
    this.scrollToBottom();
    this.editableDiv.nativeElement.innerHTML = this.editiorValue;
    this.renderer.listen(this.editableDiv.nativeElement, "keydown", (event) => {
      if (event.key === "Enter" && !event.shiftKey) {
        if (this.editiorValue.trim() === "")
          return;
        event.preventDefault();
        this.SendMess();
        document.execCommand("insertHTML", false, "<br><br>");
      }
    });
    this.renderer.listen(this.editableDiv.nativeElement, "input", () => {
      let html = this.editableDiv.nativeElement.innerHTML;
      if (html.trim() === "<br>" || html.trim() === "<br><br>" || !this.editableDiv.nativeElement.innerText.trim()) {
        html = "";
        this.editableDiv.nativeElement.innerHTML = html;
      }
      this.editiorValue = html;
    });
  }
  getUserName(userId) {
    const user = this.users.find((u) => u.id === userId);
    return user ? user.username : "Unknown";
  }
  GetNameType(item) {
    return ListType.find((type) => type.value === item);
  }
  printContent() {
    const element = document.getElementById("printContent");
    if (!element)
      return;
    (0, import_html2canvas.default)(element, { scale: 2 }).then((canvas) => {
      const imageData = canvas.toDataURL("image/png");
      const printWindow = window.open("", "_blank");
      if (!printWindow)
        return;
      printWindow.document.write(`
        <html>
          <head>
            <title>${this.Detail?.Title}</title>
          </head>
          <body style="text-align: center;">
            <img src="${imageData}" style="max-width: 100%;"/>
            <script>
              window.onload = function() {
                window.print();
                window.onafterprint = function() { window.close(); };
              };
            <\/script>
          </body>
        </html>
      `);
      printWindow.document.close();
    });
  }
  CopyContent() {
    this._snackBar.open("\u0110ang Coppy \u0110\u1EC1 Xu\u1EA5t", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-warning"]
    });
    delete this.Detail.id;
    this.Detail.Title = `Copy ${this.Detail.Title}`;
    this._hotrosService.CreateHotro(this.Detail).then((data) => {
      console.log(data);
      setTimeout(() => {
      }, 1e3);
    });
  }
  getChannelName(channelId) {
    const channel = this.channels.find((c) => c.id === channelId);
    return channel ? channel.name : "Unknown";
  }
  onEditorChange(event) {
    console.log(event);
  }
  RemoveItem(index) {
    this.Detail.Dexuat.Chitiet.splice(index, 1);
  }
  saveContent() {
    this.Detail.Dexuat.Tongtien = this.Detail.Dexuat.Chitiet.reduce((sum, item) => sum + item.Thanhtien, 0);
    this.Detail.Dexuat.TongChi = this.Detail.Dexuat.Tongtien - this.Detail.Dexuat.Tamung;
    this.drawer.close();
    this._hotrosService.updateOneHotro(this.Detail).then(() => {
      this.ngOnInit();
    });
  }
  DeleteItem() {
    this._hotrosService.DeleteHotro(this.Detail).then(() => {
      this._snackBar.open("\u0110\xE3 X\xF3a", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      this._ListHotroComponent.drawer.close();
      this._route.navigate(["admin/hotro"]);
    });
  }
  getReplies(ticketId) {
    return this.replies.filter((reply) => reply.ticket_id === ticketId);
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "side";
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  onContentChange(event) {
    this.Detail = event;
  }
  FilterListType = ListType;
  DoFindKhachhang(event) {
    const query = event.target.value.toLowerCase();
    this.FilterListType = ListType.filter((v) => v.Title.toLowerCase().includes(query));
  }
  uploadfile(event) {
    const file = event.target.files[0];
  }
  filePreview = null;
  isImage = false;
  onFileSelected(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => {
      this.filePreview = e.target.result;
      this.isImage = file.type.startsWith("image");
      this.TempMess("image", e.target.result);
    };
    reader.readAsDataURL(file);
  }
  uploadDriver(event) {
    const file = event.target.files[0];
    this._UploadService.uploadDriver(file).then((data) => {
      console.log(data);
    });
  }
  isDragging = false;
  onDragOver(event) {
    this.isDragging = true;
    event.preventDefault();
  }
  onDragLeave(event) {
    this.isDragging = false;
  }
  ListtempsMess = [];
  TempMess(type, content) {
    const item = {
      idUser: this.profile?.id,
      Type: type || "text",
      Content: content
    };
    this.ListtempsMess.push(item);
  }
  SendMess() {
    if (this.editiorValue.trim() !== "") {
      this.ListtempsMess.push({
        idUser: this.profile?.id,
        Type: "text",
        Content: this.editiorValue
      });
    }
    if (this.ListtempsMess.length > 0) {
      this.Detail.Chat = [...this.Detail.Chat, ...this.ListtempsMess];
      this.Detail.idChat = [...this.Detail.idChat, ...this.ListtempsMess];
      this.ListtempsMess = [];
    }
    this.editableDiv.nativeElement.innerHTML = "";
    this.scrollToBottom();
    this._hotrosService.updateOneHotro(this.Detail).then(() => {
      this.ngOnInit();
    });
  }
  onInput(event) {
    const target = event.target;
    this.editiorValue = target.innerHTML;
  }
  onDrop(event) {
    event.preventDefault();
    const items = event.dataTransfer?.items;
    const target = event.target;
    if (!items)
      return;
    for (const item of items) {
      if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          if (file.type.startsWith("image/")) {
            this.handleImageDrop(file, target);
          } else {
            this.handleFileUpload(file, target);
          }
        }
      } else if (item.kind === "string") {
        item.getAsString((text) => {
          this.editableDiv.nativeElement.innerHTML += text;
          this.moveCursorToEnd(target);
        });
      }
    }
    this.isDragging = false;
  }
  handleImageDrop(file, target) {
    const reader = new FileReader();
    reader.onload = (e) => {
      const img = document.createElement("img");
      img.src = e.target?.result;
      img.style.maxWidth = "100%";
      img.style.margin = "5px 0";
      target.appendChild(img);
      this.editableDiv.nativeElement.innerHTML += img;
      this.ListtempsMess.push({
        idUser: this.profile?.id,
        Type: "image",
        Content: img.src
      });
      this.moveCursorToEnd(target);
    };
    reader.readAsDataURL(file);
  }
  handlePaste(event) {
    event.preventDefault();
    const clipboardData = event.clipboardData || window.clipboardData;
    const items = clipboardData.items;
    const target = event.target;
    for (const item of items) {
      if (item.type.startsWith("image/")) {
        const blob = item.getAsFile();
        const reader = new FileReader();
        reader.onload = (e) => {
          const img = document.createElement("img");
          img.src = e.target?.result;
          img.style.maxWidth = "100%";
          img.style.margin = "5px 0";
          target.appendChild(img);
          const space = document.createTextNode(" ");
          target.appendChild(space);
          this.ListtempsMess.push({
            idUser: this.profile?.id,
            Type: "image",
            Content: img.src
          });
          this.moveCursorToEnd(target);
        };
        reader.readAsDataURL(blob);
      } else if (item.type === "text/plain") {
        const plainText = clipboardData.getData("text/plain");
        this.editableDiv.nativeElement.innerHTML += plainText;
        this.moveCursorToEnd(target);
      } else if (item.kind === "file") {
        const file = item.getAsFile();
        if (file) {
          this.handleFileUpload(file, target);
        }
      }
    }
  }
  handleFileUpload(file, target) {
    const fileLink = document.createElement("a");
    fileLink.href = URL.createObjectURL(file);
    fileLink.textContent = `\u{1F4CE} ${file.name}`;
    fileLink.download = file.name;
    fileLink.style.display = "block";
    fileLink.style.margin = "5px 0";
    target.appendChild(fileLink);
    const space = document.createTextNode(" ");
    target.appendChild(space);
    this.ListtempsMess.push({
      idUser: this.profile?.id,
      Type: "file",
      Content: fileLink.download
    });
    this.moveCursorToEnd(target);
  }
  moveCursorToEnd(element) {
    const range = document.createRange();
    const selection = window.getSelection();
    range.selectNodeContents(element);
    range.collapse(false);
    selection?.removeAllRanges();
    selection?.addRange(range);
  }
  goBack() {
    this._route.navigate(["admin/hotro"]);
    this._ListHotroComponent.drawer.close();
  }
  static \u0275fac = function DetailHotroComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailHotroComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(Renderer2), \u0275\u0275directiveInject(PLATFORM_ID));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailHotroComponent, selectors: [["app-detailhotro"]], viewQuery: function DetailHotroComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(_c2, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.editable = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.editableDiv = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.viewChat = _t);
    }
  }, hostBindings: function DetailHotroComponent_HostBindings(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275listener("keydown", function DetailHotroComponent_keydown_HostBindingHandler($event) {
        return ctx.handleShortcut($event);
      }, false, \u0275\u0275resolveWindow);
    }
  }, decls: 52, vars: 12, consts: [["drawer", ""], ["editable", ""], ["fileInput", ""], ["fileDrive", ""], ["picker", ""], ["viewChat", ""], ["autosize", "", 1, "w-full", "h-screen-16"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", "p-4", "z-10", 3, "position"], ["class", "relative w-full h-full flex flex-col space-y-2", 4, "ngIf"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-4"], [1, "w-full", "relative", "flex", "lg:flex-row", "flex-col", "space-x-2", "items-center", "justify-between", "p-2"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "text-[16px]", "font-bold"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "space-y-2", "h-full", "w-full", "overflow-auto", "cursor-pointer"], ["id", "printContent", "class", "flex flex-row space-x-2 justify-between w-full", 4, "ngIf"], [1, "w-full", "h-full", "flex", "flex-col", "space-y-2", "items-start", "p-2"], [4, "ngFor", "ngForOf"], [1, "relative", "w-full", "flex", "flex-col"], ["contenteditable", "true", "data-placeholder", "Nh\u1EADp n\u1ED9i dung \u1EDF \u0111\xE2y...", "autofocus", "", 3, "paste", "dragover", "dragleave", "drop", "input"], ["type", "file", 1, "hidden", 3, "change"], [1, "relative", "w-full", "h-full", "flex", "flex-col", "space-y-2"], [1, "relative", "text-xl", "text-center", "font-bold"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "relative", "mx-auto", "lg:max-w-[780px]", "w-full", "h-full", "flex", "flex-col", "space-y-2", "p-4", "overflow-auto"], [1, "w-full", 3, "appearance", "subscriptSizing"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "ngModelOptions"], [3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [3, "value"], [1, "p-2", "text-center", "text-red-700", "font-bold"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ng\u01B0\u1EDDi Nh\u1EADn", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Tr\u01B0\u1EDFng b\u1ED9 ph\u1EADn", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Gi\xE1m \u0111\u1ED1c K\u1EBF to\xE1n", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ng\u01B0\u1EDDi \u0110\u1EC1 Xu\u1EA5t", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp B\u1ED9 Ph\u1EADn", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp V\u1ECB Tr\xED", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "flex-col", "space-y-2", "p-2", "border", "rounded-lg"], [1, "overflow-auto"], [1, "lg:w-full", "w-[780px]", "flex", "flex-col", "space-y-2", "items-center", "p-4"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng Nh\u1EADp V\u1ECB Tr\xED", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Ghi Ch\xFA", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["id", "printContent", 1, "flex", "flex-row", "space-x-2", "justify-between", "w-full"], [1, "w-full", "p-2", "border"], [1, "text-end"], [1, "text-[16px]", "font-bold", "text-center"], [1, "flex", "flex-col", "space-y-2"], [1, "overflow-x-auto"], [1, "w-full", "mt-4", "border", "border-gray-300"], [1, "bg-gray-100"], [1, "border", "px-2", "py-1", "w-10"], [1, "border", "px-2", "py-1"], [1, "font-bold"], ["colspan", "2", 1, "border", "px-2", "py-1", "text-right"], [1, "border", "px-2", "py-1", "text-right"], [1, "mt-4", "capitalize"], [1, "grid", "grid-cols-3", "gap-4", "text-center", "mt-6"], [1, "flex", "flex-col", "space-y-16", "text-center"], [1, "uppercase", "font-bold"], [1, "text-right", "text-sm"], [1, "text-center", "font-bold", "text-lg", "my-2"], [1, "grid", "grid-cols-3", "gap-4", "text-sm"], [1, "mt-4", "p-2", "border", "rounded", "bg-gray-100"], [1, "mt-4"], [1, "border", "rounded", "divide-y"], ["class", "p-2 flex justify-between", 4, "ngFor", "ngForOf"], [1, "mt-4", "font-bold"], [1, "flex", "justify-between", "text-sm"], [1, "border", "px-2", "py-1", "text-center", "w-10"], [1, "border", "px-2", "py-1", "text-center"], [1, "p-2", "flex", "justify-between"], [1, "text-gray-600"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "border", "w-2/3"], [3, "innerHTML"], [1, "max-h-24", "max-w-24", "rounded-lg", "border", "p-2", 3, "src"], ["target", "_blank", 3, "href"]], template: function DetailHotroComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 6)(1, "mat-drawer", 7, 0);
      \u0275\u0275template(3, DetailHotroComponent_div_3_Template, 11, 0, "div", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9)(5, "div", 10)(6, "div", 11)(7, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "span");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "div", 13);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 11)(15, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.CopyContent());
      });
      \u0275\u0275elementStart(16, "mat-icon");
      \u0275\u0275text(17, "content_copy");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.printContent());
      });
      \u0275\u0275elementStart(19, "mat-icon");
      \u0275\u0275text(20, "print");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        const drawer_r9 = \u0275\u0275reference(2);
        return \u0275\u0275resetView(drawer_r9.open());
      });
      \u0275\u0275elementStart(22, "mat-icon");
      \u0275\u0275text(23, "edit");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx._ListHotroComponent.isFullScreen = !ctx._ListHotroComponent.isFullScreen);
      });
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "fullscreen");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "button", 14);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.DeleteItem());
      });
      \u0275\u0275elementStart(28, "mat-icon");
      \u0275\u0275text(29, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(30, "div", 15);
      \u0275\u0275template(31, DetailHotroComponent_div_31_Template, 150, 39, "div", 16);
      \u0275\u0275elementStart(32, "div", 17);
      \u0275\u0275template(33, DetailHotroComponent_div_33_Template, 5, 1, "div", 18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 19)(35, "div", 11)(36, "div", 20, 1);
      \u0275\u0275listener("paste", function DetailHotroComponent_Template_div_paste_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.handlePaste($event));
      })("dragover", function DetailHotroComponent_Template_div_dragover_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragOver($event));
      })("dragleave", function DetailHotroComponent_Template_div_dragleave_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDragLeave($event));
      })("drop", function DetailHotroComponent_Template_div_drop_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDrop($event));
      })("input", function DetailHotroComponent_Template_div_input_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onInput($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_38_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.SendMess());
      });
      \u0275\u0275elementStart(39, "mat-icon");
      \u0275\u0275text(40, "send");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(41, "div", 11)(42, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_42_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r14 = \u0275\u0275reference(49);
        return \u0275\u0275resetView(fileInput_r14.click());
      });
      \u0275\u0275elementStart(43, "mat-icon");
      \u0275\u0275text(44, "image");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(45, "button", 12);
      \u0275\u0275listener("click", function DetailHotroComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        const fileDrive_r15 = \u0275\u0275reference(51);
        return \u0275\u0275resetView(fileDrive_r15.click());
      });
      \u0275\u0275elementStart(46, "mat-icon");
      \u0275\u0275text(47, "cloud_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "input", 21, 2);
      \u0275\u0275listener("change", function DetailHotroComponent_Template_input_change_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "input", 21, 3);
      \u0275\u0275listener("change", function DetailHotroComponent_Template_input_change_50_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.uploadDriver($event));
      });
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      let tmp_6_0;
      let tmp_7_0;
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.Detail.Type == "dexuat");
      \u0275\u0275advance(7);
      \u0275\u0275classMapInterpolate1("whitespace-nowrap rounded-lg p-1 text-white ", ((tmp_6_0 = ctx.GetNameType(ctx.Detail.Type)) == null ? null : tmp_6_0.bg) || "bg-slate-600", "");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate((tmp_7_0 = ctx.GetNameType(ctx.Detail.Type)) == null ? null : tmp_7_0.Title);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.Detail.Title);
      \u0275\u0275advance(18);
      \u0275\u0275property("ngIf", ctx.Detail.Type == "dexuat");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.Detail.Chat);
      \u0275\u0275advance(3);
      \u0275\u0275classMapInterpolate1("w-full border p-4 editable rounded-lg ", ctx.isDragging ? "h-40 border-2 border-dashed border-blue-500 bg-slate-100" : "", "");
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    CommonModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    MatDatepickerModule,
    NgxFileDropModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailHotroComponent, { className: "DetailHotroComponent", filePath: "src/app/admin/hotro/listhotro/detailhotro/detailhotro.component.ts", lineNumber: 65 });
})();
export {
  DetailHotroComponent
};
//# sourceMappingURL=chunk-4MMZJLGB.js.map
