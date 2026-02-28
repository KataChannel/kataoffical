import './polyfills.server.mjs';
import {
  ListChotkhoComponent
} from "./chunk-KWZLRMS4.mjs";
import {
  ChotkhoService
} from "./chunk-L5J3S7SR.mjs";
import "./chunk-S3RNB2QN.mjs";
import "./chunk-P4O2AH4P.mjs";
import {
  SanphamService
} from "./chunk-3MPX6R2V.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-L2YTN2QG.mjs";
import "./chunk-XJHVYA25.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-RT23KED7.mjs";
import {
  require_xlsx_min
} from "./chunk-WJ6GNNQZ.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-77WWCF4N.mjs";
import {
  convertToSlug
} from "./chunk-OLFDOXYK.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import {
  MatMenu,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-JNHRISVT.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-NU7WWMYS.mjs";
import "./chunk-VFPWTYCL.mjs";
import {
  ActivatedRoute,
  Router
} from "./chunk-HRPVH7WR.mjs";
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
} from "./chunk-VF45CXPP.mjs";
import "./chunk-3I55OMWU.mjs";
import "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import {
  readSync,
  utils,
  writeFileSync
} from "./chunk-RQZL5MGR.mjs";
import {
  MatSlideToggleModule
} from "./chunk-6GML6PCL.mjs";
import "./chunk-UMQUK2UX.mjs";
import "./chunk-LPLDGY7B.mjs";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-E2GALVII.mjs";
import {
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  MatNativeDateModule
} from "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵconditional,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/chotkho/detailchotkho/detailchotkho.ts
var XLSXStyle = __toESM(require_xlsx_min());
var DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_2_DepsFn = () => [MatFormField, MatLabel, MatInput, MatIcon, MatButton, MatIconButton, MatMenu, MatMenuTrigger, NgForOf, NgIf];
function DetailChotkhoComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 6);
    \u0275\u0275listener("click", function DetailChotkhoComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleChotkhoAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailChotkhoComponent_ng_container_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 12)(2, "div", 13);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 14)(5, "button", 15);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_9_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 16);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_9_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 19)(1, "h3", 20);
    \u0275\u0275text(2, "Th\xF4ng tin ch\u1ED1t kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 21)(4, "mat-form-field", 22)(5, "mat-label");
    \u0275\u0275text(6, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "input", 23);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_input_ngModelChange_7_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().title, $event) || (ctx_r1.DetailChotkho().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-form-field", 22)(9, "mat-label");
    \u0275\u0275text(10, "Ng\xE0y Ch\u1ED1t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "input", 24);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_input_ngModelChange_11_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().ngaychot, $event) || (ctx_r1.DetailChotkho().ngaychot = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(12, "mat-datepicker-toggle", 25)(13, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-form-field", 26)(16, "mat-label");
    \u0275\u0275text(17, "Ghi Ch\xFA");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "textarea", 27);
    \u0275\u0275twoWayListener("ngModelChange", function DetailChotkhoComponent_ng_container_10_div_1_Template_textarea_ngModelChange_18_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailChotkho().ghichu, $event) || (ctx_r1.DetailChotkho().ghichu = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const picker_r5 = \u0275\u0275reference(14);
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", picker_r5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().ngaychot);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r5);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailChotkho().ghichu);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1, "check_box_outline_blank");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 62);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_Template_div_click_0_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r8));
    });
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_span_1_Template, 2, 0, "span", 63)(2, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_span_2_Template, 2, 0, "span", 64);
    \u0275\u0275elementStart(3, "div", 65)(4, "span", 66);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 67);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.CheckItem(item_r8));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r8.title || "Ch\u01B0a C\xF3 T\xEAn");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("M\xE3: ", item_r8.masp, " - \u0110VT: ", item_r8.dvt, "");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275text(1, " Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng ");
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 37)(1, "div", 38)(2, "button", 39, 1)(4, "mat-icon");
    \u0275\u0275text(5, "inventory");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-menu", null, 2)(9, "div", 40);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_div_click_9_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(10, "div", 41)(11, "div", 42);
    \u0275\u0275text(12, "T\xECnh tr\u1EA1ng s\u1EA3n ph\u1EA9m:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 43);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 44)(16, "input", 45, 3);
    \u0275\u0275listener("keyup", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_input_keyup_16_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.doFilterSanpham($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 46)(19, "span", 47);
    \u0275\u0275text(20, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "div", 48)(22, "div", 8)(23, "span", 49);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_span_click_23_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ChosenAll(ctx_r1.ListSanpham));
    });
    \u0275\u0275text(24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span", 50);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_span_click_25_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(26, "Xo\xE1 T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "span", 51);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_span_click_27_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(28, "L\xE0m M\u1EDBi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "div", 52);
    \u0275\u0275template(30, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_30_Template, 8, 5, "div", 53)(31, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_div_31_Template, 2, 0, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "div", 55)(33, "button", 16);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_button_click_33_listener() {
      \u0275\u0275restoreView(_r6);
      const menuTrigger_r9 = \u0275\u0275reference(3);
      return \u0275\u0275resetView(menuTrigger_r9.closeMenu());
    });
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "button", 15);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_button_click_35_listener() {
      \u0275\u0275restoreView(_r6);
      const menuTrigger_r9 = \u0275\u0275reference(3);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r9));
    });
    \u0275\u0275text(36, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(37, "div", 56)(38, "mat-form-field", 22)(39, "mat-label");
    \u0275\u0275text(40, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "input", 57);
    \u0275\u0275listener("keyup", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_input_keyup_41_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "button", 58);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_button_click_42_listener() {
      \u0275\u0275restoreView(_r6);
      const uploadfile_r10 = \u0275\u0275reference(46);
      return \u0275\u0275resetView(uploadfile_r10.click());
    });
    \u0275\u0275elementStart(43, "mat-icon");
    \u0275\u0275text(44, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(45, "input", 59, 4);
    \u0275\u0275listener("change", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_input_change_45_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ImportExcel($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(47, "button", 60);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_button_click_47_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ExportExample());
    });
    \u0275\u0275elementStart(48, "mat-icon");
    \u0275\u0275text(49, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(50, "button", 61);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template_button_click_50_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.EmptyCart());
    });
    \u0275\u0275elementStart(51, "mat-icon");
    \u0275\u0275text(52, "delete");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r11 = \u0275\u0275reference(8);
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("matMenuTriggerFor", menu_r11);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ListFilter.length, " S\u1EA3n Ph\u1EA9m \u0110\xE3 Ch\u1ECDn ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate3(" \u2022 ", ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m \u0111\xE3 ch\u1ECDn \u2022 ", ctx_r1.ListSanpham.length - ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng \u2022 ", ctx_r1.ListSanpham.length, " t\u1ED5ng s\u1EA3n ph\u1EA9m ");
    \u0275\u0275advance(10);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 (", ctx_r1.ListSanpham.length - ctx_r1.ListFilter.length, " s\u1EA3n ph\u1EA9m kh\u1EA3 d\u1EE5ng)");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.getFilteredSanpham())("ngForTrackBy", ctx_r1.trackByFn);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.ListSanpham.length === 0);
    \u0275\u0275advance(19);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_1_Template, 53, 11);
    \u0275\u0275defer(2, 1, DetailChotkhoComponent_ng_container_10_div_2_div_1_Defer_2_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementEnd();
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 73)(1, "span", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r12], " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 76)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "button", 80);
    \u0275\u0275listener("click", function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_1_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r13);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.RemoveSanpham(row_r14));
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const idx_r15 = \u0275\u0275nextContext().index;
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", idx_r15 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275listener("blur", function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_div_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r16 = \u0275\u0275nextContext(2);
      const row_r14 = ctx_r16.$implicit;
      const idx_r15 = ctx_r16.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r15, row_r14, "sltonthucte", "number"));
    })("keydown.enter", function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r16 = \u0275\u0275nextContext(2);
      const row_r14 = ctx_r16.$implicit;
      const idx_r15 = ctx_r16.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r15, row_r14, "sltonthucte", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext(2).$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r14[column_r12] || 0, "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext(2).$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_div_0_Template, 3, 5, "div", 81)(1, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_span_1_Template, 3, 4, "span", 82);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_div_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 85);
    \u0275\u0275listener("blur", function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_div_0_Template_div_blur_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r16 = \u0275\u0275nextContext(2);
      const row_r14 = ctx_r16.$implicit;
      const idx_r15 = ctx_r16.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r15, row_r14, "slhuy", "number"));
    })("keydown.enter", function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_div_0_Template_div_keydown_enter_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      const ctx_r16 = \u0275\u0275nextContext(2);
      const row_r14 = ctx_r16.$implicit;
      const idx_r15 = ctx_r16.index;
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.updateValue($event, idx_r15, row_r14, "slhuy", "number"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext(2).$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 2, row_r14[column_r12] || 0, "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext(2).$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_div_0_Template, 3, 5, "div", 84)(1, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_span_1_Template, 3, 4, "span", 82);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(5);
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isEdit());
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classMap(row_r14[column_r12] > 0 ? "text-green-600" : row_r14[column_r12] < 0 ? "text-red-600" : "text-yellow-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 3, row_r14[column_r12], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14.title || (row_r14.sanpham == null ? null : row_r14.sanpham.title), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14.masp || (row_r14.sanpham == null ? null : row_r14.sanpham.masp), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14.dvt || (row_r14.sanpham == null ? null : row_r14.sanpham.dvt), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "1.0-3"), " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 75);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_1_Template, 6, 2, "span", 76)(2, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_2_Template, 2, 2)(3, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_3_Template, 2, 2)(4, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_4_Template, 3, 6, "span", 77)(5, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_5_Template, 2, 1, "span", 78)(6, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_6_Template, 2, 1, "span", 78)(7, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_7_Template, 2, 1, "span", 78)(8, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_8_Template, 3, 4, "span", 79)(9, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Case_9_Template, 2, 1, "span", 78);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = column_r12) === "STT" ? 1 : tmp_15_0 === "sltonthucte" ? 2 : tmp_15_0 === "slhuy" ? 3 : tmp_15_0 === "chenhlech" ? 4 : tmp_15_0 === "title" ? 5 : tmp_15_0 === "masp" ? 6 : tmp_15_0 === "dvt" ? 7 : tmp_15_0 === "sltonhethong" ? 8 : 9);
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 32);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_2_For_5_th_1_Template, 3, 1, "th", 71)(2, DetailChotkhoComponent_ng_container_10_div_2_For_5_td_2_Template, 10, 1, "td", 72);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r12);
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_tr_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 86);
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_tr_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 87);
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_tr_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 88)(1, "td", 89);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()();
  }
}
function DetailChotkhoComponent_ng_container_10_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_2_div_1_Template, 4, 0, "div", 29);
    \u0275\u0275elementStart(2, "div", 30)(3, "table", 31);
    \u0275\u0275repeaterCreate(4, DetailChotkhoComponent_ng_container_10_div_2_For_5_Template, 3, 1, "ng-container", 32, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(6, DetailChotkhoComponent_ng_container_10_div_2_tr_6_Template, 1, 0, "tr", 33)(7, DetailChotkhoComponent_ng_container_10_div_2_tr_7_Template, 1, 0, "tr", 34)(8, DetailChotkhoComponent_ng_container_10_div_2_tr_8_Template, 3, 0, "tr", 35);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r1.dataSource());
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
  }
}
function DetailChotkhoComponent_ng_container_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, DetailChotkhoComponent_ng_container_10_div_1_Template, 19, 8, "div", 17)(2, DetailChotkhoComponent_ng_container_10_div_2_Template, 9, 4, "div", 18);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailChotkho());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.DetailChotkho());
  }
}
var DetailChotkhoComponent = class _DetailChotkhoComponent {
  _ListChotkhoComponent = inject(ListChotkhoComponent);
  _ChotkhoService = inject(ChotkhoService);
  _SanphamService = inject(SanphamService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _dialog = inject(MatDialog);
  sort;
  // Table configuration
  dataSource = signal(new MatTableDataSource([]));
  displayedColumns = ["STT", "title", "masp", "dvt", "sltonhethong", "sltonthucte", "slhuy", "chenhlech"];
  ColumnName = {
    STT: "STT",
    title: "T\xEAn S\u1EA3n Ph\u1EA9m",
    masp: "M\xE3 SP",
    dvt: "\u0110\u01A1n V\u1ECB",
    sltonhethong: "SL H\u1EC7 Th\u1ED1ng",
    sltonthucte: "SL Th\u1EF1c T\u1EBF",
    slhuy: "SL H\u1EE7y",
    chenhlech: "Ch\xEAnh L\u1EC7ch"
  };
  // Initialize DetailChotkho with default structure
  DetailChotkho = signal({
    id: void 0,
    title: "",
    ngaychot: /* @__PURE__ */ new Date(),
    ghichu: "",
    khoId: "",
    userId: "",
    isActive: true,
    details: []
  });
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._ChotkhoService.setChotkhoId(id);
    });
    effect(() => __async(this, null, function* () {
      const serviceDetail = this._ChotkhoService.DetailChotkho();
      if (serviceDetail) {
        this.DetailChotkho.set(serviceDetail);
        this.dataSource.update((ds) => {
          ds.data = serviceDetail.details || [];
          return ds;
        });
        this.ListFilter = serviceDetail.details || [];
        if (this.ListSanpham.length > 0) {
          this.updateAvailableProducts();
        }
      }
    }));
  }
  isEdit = signal(false);
  isDelete = signal(false);
  chotkhoId = this._ChotkhoService.chotkhoId;
  // SearchFilter properties for product selection
  ListSanpham = [];
  filterSanpham = [];
  ListFilter = [];
  searchTerm = "";
  // Get filtered products for display in dropdown
  getFilteredSanpham() {
    if (!this.searchTerm || this.searchTerm.length < 2) {
      return this.ListSanpham;
    }
    const normalizedValue = removeVietnameseAccents(this.searchTerm.toLowerCase());
    return this.ListSanpham.filter((product) => {
      const normalizedTitle = removeVietnameseAccents(product.title?.toLowerCase() || "");
      const normalizedMasp = removeVietnameseAccents(product.masp?.toLowerCase() || "");
      return normalizedTitle.includes(normalizedValue) || normalizedMasp.includes(normalizedValue) || product.title?.toLowerCase().includes(this.searchTerm) || product.masp?.toLowerCase().includes(this.searchTerm);
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const id = this._ChotkhoService.chotkhoId();
      if (!id) {
        this._router.navigate(["/admin/chotkho"]);
        this._ListChotkhoComponent.drawer.close();
      }
      if (id === "new") {
        this.loadNewSanphamList();
        const newChotkhoData = {
          title: "Ch\u1ED1t Kho Ng\xE0y " + (/* @__PURE__ */ new Date()).toLocaleDateString(),
          ngaychot: /* @__PURE__ */ new Date(),
          ghichu: "",
          khoId: "",
          userId: "",
          isActive: true,
          details: []
        };
        this.DetailChotkho.set(newChotkhoData);
        this._ChotkhoService.DetailChotkho.set(newChotkhoData);
        this._ListChotkhoComponent.drawer.open();
        this.isEdit.update((value) => true);
        this._router.navigate(["/admin/chotkho", "new"]);
      } else if (id) {
        yield this._ChotkhoService.getChotkhoById(id);
        yield this.loadSanphamList();
        setTimeout(() => {
          const serviceData = this._ChotkhoService.DetailChotkho();
        }, 1e3);
        this._ListChotkhoComponent.drawer.open();
        this._router.navigate(["/admin/chotkho", id]);
      }
    });
  }
  handleChotkhoAction() {
    return __async(this, null, function* () {
      if (this.chotkhoId() === "new") {
        yield this.createChotkho();
      } else {
        yield this.updateChotkho();
      }
    });
  }
  createChotkho() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = this.DetailChotkho();
        const result = yield this._ChotkhoService.createChotkhoWithDetails(chotkhoData);
        if (result && result.id) {
          this._router.navigate(["/admin/chotkho", result.id]);
        }
        this._snackBar.open("T\u1EA1o ch\u1ED1t kho th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => false);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  updateChotkho() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          yield this._ChotkhoService.updateChotkhoWithDetails(chotkhoData.id, chotkhoData);
          this._snackBar.open("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this.isEdit.update((value) => false);
        }
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        const chotkhoData = this.DetailChotkho();
        if (chotkhoData?.id) {
          yield this._ChotkhoService.deleteChotkho(chotkhoData.id);
          this._snackBar.open("X\xF3a th\xE0nh c\xF4ng", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          this._router.navigate(["/admin/chotkho"]);
        }
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a ch\u1ED1t kho:", error);
        this._snackBar.open("L\u1ED7i khi x\xF3a ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  onQuantityChange() {
    const detail = this.DetailChotkho();
    if (detail) {
      const sltonhethong = Number(detail.sltonhethong) || 0;
      const sltonthucte = Number(detail.sltonthucte) || 0;
      const slhuy = Number(detail.slhuy) || 0;
      const chenhlech = sltonhethong - sltonthucte - slhuy;
      this.DetailChotkho.update((v) => __spreadProps(__spreadValues({}, v), {
        chenhlech
      }));
    }
  }
  // Properties for detail table display
  detailDisplayedColumns = ["sanpham", "sltonhethong", "sltonthucte", "slhuy", "chenhlech", "actions"];
  removeDetail(detail) {
    const currentDetails = this.DetailChotkho().details || [];
    const updatedDetails = currentDetails.filter((d) => d !== detail);
    this.DetailChotkho.update((v) => __spreadProps(__spreadValues({}, v), {
      details: updatedDetails
    }));
  }
  deleteDetailFromDatabase(detail) {
    return __async(this, null, function* () {
      try {
        if (detail.id && this.DetailChotkho().id) {
          const success = yield this._ChotkhoService.deleteChotkhoDetail(detail.id, this.DetailChotkho().id);
          if (success) {
            this._snackBar.open("X\xF3a chi ti\u1EBFt th\xE0nh c\xF4ng", "", {
              duration: 1e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-success"]
            });
          }
        } else {
          this.removeDetail(detail);
        }
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a chi ti\u1EBFt:", error);
        this._snackBar.open("L\u1ED7i khi x\xF3a chi ti\u1EBFt", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  updateChenhLech(detail) {
    const sltonhethong = Number(detail.sltonhethong) || 0;
    const sltonthucte = Number(detail.sltonthucte) || 0;
    const slhuy = Number(detail.slhuy) || 0;
    detail.chenhlech = sltonhethong - sltonthucte - slhuy;
  }
  goBack() {
    this._router.navigate(["/admin/chotkho"]);
    this._ListChotkhoComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id || index;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailChotkho.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  // SearchFilter methods (similar to banggia pattern)
  loadNewSanphamList() {
    return __async(this, null, function* () {
      try {
        const products = yield this._ChotkhoService.getAllProducts();
        const allProducts = products.map((product) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.tonkho?.slton || 0,
          sltonthucte: product.tonkho?.sltinhthucte || 0,
          slhuy: product.tonkho?.slhuy || 0,
          chenhlech: (product.tonkho?.slton || 0) - (product.tonkho?.sltinhthucte || 0) - (product.slhuy || 0),
          dongia: product.dongia
        }));
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
        this.updateAvailableProducts();
      } catch (error) {
        console.error("Error loading sanpham list:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  loadSanphamList() {
    return __async(this, null, function* () {
      try {
        const products = yield this._ChotkhoService.getAllProducts();
        const allProducts = products.map((product) => ({
          id: product.id,
          sanphamId: product.id,
          title: product.title,
          masp: product.masp,
          dvt: product.dvt,
          sltonhethong: product.sltonhethong || 0,
          sltonthucte: product.sltonthucte || 0,
          slhuy: product.slhuy || 0,
          chenhlech: (product.sltonhethong || 0) - (product.sltonthucte || 0) - (product.slhuy || 0),
          dongia: product.dongia
        }));
        this.ListSanpham = allProducts;
        this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
        this.updateAvailableProducts();
      } catch (error) {
        console.error("Error loading sanpham list:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  DoOutFilter(event) {
    return __async(this, null, function* () {
      console.log("C\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m cho ch\u1ED1t kho:", event);
      try {
        this.DetailChotkho.update((v) => {
          return __spreadProps(__spreadValues({}, v), {
            details: event.map((sp) => ({
              sanphamId: sp.sanphamId || sp.id,
              sanpham: {
                id: sp.sanphamId || sp.id,
                masp: sp.masp,
                title: sp.title,
                dvt: sp.dvt,
                dongia: sp.dongia
              },
              sltonhethong: Number(sp.sltonhethong) || 0,
              sltonthucte: Number(sp.sltonthucte) || 0,
              slhuy: Number(sp.slhuy) || 0,
              chenhlech: Number(sp.chenhlech) || 0,
              ghichu: sp.ghichu || "",
              isActive: true,
              // Fields for table display
              title: sp.title,
              masp: sp.masp,
              dvt: sp.dvt
            }))
          });
        });
        this.filterSanpham = this.DetailChotkho().details;
        this.dataSource.update((ds) => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        const selectedIds = event.map((sp) => sp.sanphamId || sp.id);
        this.ListSanpham = this.ListSanpham.filter((product) => !selectedIds.includes(product.id || product.sanphamId));
        this._snackBar.open("C\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m:", error);
        this._snackBar.open("L\u1ED7i c\u1EADp nh\u1EADt s\u1EA3n ph\u1EA9m", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  EmptyCart() {
    const currentDetails = this.DetailChotkho().details || [];
    this.DetailChotkho.update((v) => {
      return __spreadProps(__spreadValues({}, v), {
        details: []
      });
    });
    this.dataSource.update((ds) => {
      ds.data = [];
      return ds;
    });
    currentDetails.forEach((detail) => {
      const productToAdd = {
        id: detail.sanphamId || detail.id,
        sanphamId: detail.sanphamId || detail.id,
        title: detail.title || detail.sanpham?.title,
        masp: detail.masp || detail.sanpham?.masp,
        dvt: detail.dvt || detail.sanpham?.dvt,
        sltonhethong: detail.sltonhethong || 0,
        sltonthucte: detail.sltonthucte || 0,
        slhuy: detail.slhuy || 0,
        chenhlech: detail.chenhlech || 0,
        dongia: detail.dongia || detail.sanpham?.dongia || 0
      };
      const existsInList = this.ListSanpham.some((p) => p.id === productToAdd.id || p.sanphamId === productToAdd.id);
      if (!existsInList) {
        this.ListSanpham.push(productToAdd);
      }
    });
    console.log("Restored products to ListSanpham:", this.ListSanpham);
    this._snackBar.open("\u0110\xE3 x\xF3a t\u1EA5t c\u1EA3 s\u1EA3n ph\u1EA9m", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  // Methods similar to banggia pattern
  RemoveSanpham(row) {
    const currentDetails = this.DetailChotkho().details || [];
    const updatedDetails = currentDetails.filter((detail) => detail.id !== row.id && detail.sanphamId !== row.sanphamId);
    this.DetailChotkho.update((v) => {
      return __spreadProps(__spreadValues({}, v), {
        details: updatedDetails
      });
    });
    this.dataSource.update((ds) => {
      ds.data = [...updatedDetails];
      return ds;
    });
    const removedProductId = row.sanphamId || row.id;
    const productToAdd = {
      id: removedProductId,
      sanphamId: removedProductId,
      title: row.title || row.sanpham?.title,
      masp: row.masp || row.sanpham?.masp,
      dvt: row.dvt || row.sanpham?.dvt,
      sltonhethong: row.sltonhethong || 0,
      sltonthucte: row.sltonthucte || 0,
      slhuy: row.slhuy || 0,
      chenhlech: row.chenhlech || 0,
      dongia: row.dongia || row.sanpham?.dongia || 0
    };
    const existsInList = this.ListSanpham.some((p) => p.id === removedProductId || p.sanphamId === removedProductId);
    if (!existsInList) {
      this.ListSanpham.push(productToAdd);
      console.log("Added product back to ListSanpham:", productToAdd);
    }
    this._snackBar.open("\u0110\xE3 x\xF3a s\u1EA3n ph\u1EA9m", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  updateValue(event, index, row, field, type) {
    event.preventDefault();
    event.stopPropagation();
    let value = event.target.innerText.trim();
    if (type === "number") {
      const numericValue = value.replace(/,/g, "").replace(/[^0-9.-]/g, "");
      value = Number(numericValue) || 0;
    }
    this.DetailChotkho.update((currentChotkho) => {
      const updatedDetails = (currentChotkho.details || []).map((detail, idx) => {
        if (idx === index || detail.sanphamId === row.sanphamId) {
          const updatedDetail = __spreadValues({}, detail);
          updatedDetail[field] = value;
          if (field === "sltonthucte" || field === "slhuy") {
            const sltonhethong = Number(updatedDetail.sltonhethong) || 0;
            const sltonthucte = Number(updatedDetail.sltonthucte) || 0;
            const slhuy = Number(updatedDetail.slhuy) || 0;
            updatedDetail.chenhlech = sltonhethong - sltonthucte - slhuy;
          }
          return updatedDetail;
        }
        return detail;
      });
      return __spreadProps(__spreadValues({}, currentChotkho), {
        details: updatedDetails
      });
    });
    const currentDetails = this.DetailChotkho().details || [];
    this.dataSource.update((ds) => {
      ds.data = [...currentDetails];
      return ds;
    });
  }
  // Product selection methods similar to detaildonhang
  doFilterSanpham(event) {
    return __async(this, null, function* () {
      const value = event.target.value.trim().toLowerCase();
      this.searchTerm = value;
      if (event.key === "Enter") {
        const filteredProducts = this.getFilteredSanpham();
        if (filteredProducts.length > 0) {
          const firstAvailable = filteredProducts.find((product) => !this.CheckItem(product));
          if (firstAvailable) {
            this.ChosenItem(firstAvailable);
            event.target.value = "";
            this.searchTerm = "";
          }
        }
      }
    });
  }
  ChosenItem(item) {
    let CheckItem = this.filterSanpham.find((v) => v.id === item.id);
    let CheckItem1 = this.ListFilter.find((v) => v.id === item.id || v.sanphamId === item.id);
    if (CheckItem1) {
      this.ListFilter = this.ListFilter.filter((v) => v.id !== item.id && v.sanphamId !== item.id);
      console.log(`Removed product: ${item.title}`);
    } else {
      if (CheckItem) {
        const itemCopy = __spreadProps(__spreadValues({}, CheckItem), {
          sanphamId: CheckItem.id,
          sltonhethong: CheckItem.sltonhethong || 0,
          sltonthucte: CheckItem.sltonthucte || 0,
          slhuy: CheckItem.slhuy || 0,
          chenhlech: CheckItem.chenhlech || 0,
          order: this.ListFilter.length + 1
        });
        const existingIndex = this.ListFilter.findIndex((existing) => existing.id === item.id || existing.sanphamId === item.id);
        if (existingIndex === -1) {
          this.ListFilter.push(itemCopy);
        }
      }
    }
  }
  ChosenAll(list) {
    return __async(this, null, function* () {
      const uniqueProducts = list.filter((item) => !this.ListFilter.find((existing) => existing.id === item.id || existing.sanphamId === item.id));
      const newProducts = uniqueProducts.map((item, index) => {
        const itemCopy = __spreadProps(__spreadValues({}, item), {
          sanphamId: item.id,
          sltonhethong: item.sltonhethong || 0,
          sltonthucte: item.sltonthucte || 0,
          slhuy: item.slhuy || 0,
          chenhlech: item.chenhlech || 0,
          order: this.ListFilter.length + index + 1
        });
        return itemCopy;
      });
      this.ListFilter = [...this.ListFilter, ...newProducts];
      console.log(`Added ${newProducts.length} unique products. Total: ${this.ListFilter.length} products`);
    });
  }
  ResetFilter() {
    this.filterSanpham = this.ListSanpham.filter((item) => !this.ListFilter.find((selected) => selected.id === item.id));
    console.log(`Reset filter. Showing ${this.filterSanpham.length} available products`);
  }
  EmptyFiter() {
    this.ListFilter = [];
    this.updateAvailableProducts();
    console.log("Cleared all selected products");
  }
  // New method to update available products (excluding already selected ones) - kept for compatibility
  updateAvailableProducts() {
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id || v.sanphamId === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.DetailChotkho.update((v) => {
      v.details = [...this.ListFilter];
      return v;
    });
    this.dataSource.update((ds) => {
      ds.data = [...this.ListFilter];
      return ds;
    });
    menu.closeMenu();
    console.log("Applied filter. Selected products:", this.ListFilter.length);
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource().filter = filterValue.trim().toLowerCase();
  }
  ImportExcel(event) {
    return __async(this, null, function* () {
      try {
        const file = event.target.files[0];
        if (!file) {
          this._snackBar.open("Vui l\xF2ng ch\u1ECDn file Excel", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        const validTypes = [
          "application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
          "application/vnd.ms-excel",
          "application/octet-stream"
        ];
        if (!validTypes.includes(file.type) && !file.name.endsWith(".xlsx") && !file.name.endsWith(".xls")) {
          this._snackBar.open("Vui l\xF2ng ch\u1ECDn file Excel (.xlsx ho\u1EB7c .xls)", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        this._snackBar.open("\u0110ang x\u1EED l\xFD file Excel...", "", {
          duration: 2e3,
          panelClass: ["snackbar-info"]
        });
        const data = yield this.readExcelFile(file);
        if (!data || data.length === 0) {
          this._snackBar.open("File Excel kh\xF4ng c\xF3 d\u1EEF li\u1EC7u ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7", "\u0110\xF3ng", {
            duration: 3e3,
            panelClass: ["snackbar-error"]
          });
          return;
        }
        if (this.ListSanpham.length === 0) {
          yield this.loadNewSanphamList();
        }
        const processedData = yield this.processExcelData(data);
        if (processedData.length === 0) {
          this._snackBar.open("Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m n\xE0o kh\u1EDBp v\u1EDBi m\xE3 s\u1EA3n ph\u1EA9m trong file Excel", "\u0110\xF3ng", {
            duration: 4e3,
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        this.DetailChotkho.update((v) => {
          const existingDetails = v.details || [];
          const combinedDetails = [...existingDetails];
          processedData.forEach((importedItem) => {
            const existingIndex = combinedDetails.findIndex((existing) => existing.sanphamId === importedItem.sanphamId);
            if (existingIndex >= 0) {
              combinedDetails[existingIndex] = __spreadProps(__spreadValues(__spreadValues({}, combinedDetails[existingIndex]), importedItem), {
                // Recalculate chenhlech
                chenhlech: this.calculateChenhLech(importedItem.sltonhethong || combinedDetails[existingIndex].sltonhethong || 0, importedItem.sltonthucte || 0, importedItem.slhuy || 0)
              });
            } else {
              combinedDetails.push(importedItem);
            }
          });
          return __spreadProps(__spreadValues({}, v), {
            details: combinedDetails
          });
        });
        this.dataSource.update((ds) => {
          ds.data = [...this.DetailChotkho().details];
          ds.sort = this.sort;
          return ds;
        });
        this.ListFilter = this.DetailChotkho().details || [];
        event.target.value = "";
        this._snackBar.open(`Import th\xE0nh c\xF4ng ${processedData.length} s\u1EA3n ph\u1EA9m t\u1EEB Excel`, "\u0110\xF3ng", {
          duration: 4e3,
          panelClass: ["snackbar-success"]
        });
        console.log("Excel import completed:", {
          importedItems: processedData.length,
          totalDetails: this.DetailChotkho().details?.length || 0
        });
      } catch (error) {
        console.error("Error importing Excel:", error);
        this._snackBar.open(`L\u1ED7i khi import Excel: ${error instanceof Error ? error.message : "Unknown error"}`, "\u0110\xF3ng", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  readExcelFile(file) {
    return __async(this, null, function* () {
      return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = (e) => {
          try {
            const data = new Uint8Array(e.target.result);
            const workbook = readSync(data, { type: "array" });
            const sheetName = workbook.SheetNames[0];
            const worksheet = workbook.Sheets[sheetName];
            const jsonData = utils.sheet_to_json(worksheet, {
              header: 1,
              defval: "",
              raw: false
            });
            resolve(jsonData);
          } catch (error) {
            reject(new Error("Kh\xF4ng th\u1EC3 \u0111\u1ECDc file Excel. Vui l\xF2ng ki\u1EC3m tra \u0111\u1ECBnh d\u1EA1ng file."));
          }
        };
        reader.onerror = () => {
          reject(new Error("L\u1ED7i khi \u0111\u1ECDc file"));
        };
        reader.readAsArrayBuffer(file);
      });
    });
  }
  processExcelData(rawData) {
    return __async(this, null, function* () {
      try {
        if (!rawData || rawData.length < 2) {
          throw new Error("File Excel ph\u1EA3i c\xF3 \xEDt nh\u1EA5t 2 d\xF2ng (header + data)");
        }
        const headers = rawData[0].map((h) => removeVietnameseAccents(String(h).toLowerCase().trim()));
        const columnIndices = {
          masp: this.findColumnIndex(headers, ["masp", "ma sp", "ma san pham", "product code"]),
          sltonthucte: this.findColumnIndex(headers, ["sltonthucte", "sl ton thuc te", "so luong ton thuc te", "actual stock"]),
          slhuy: this.findColumnIndex(headers, ["slhuy", "sl huy", "so luong huy", "damaged quantity"])
        };
        if (columnIndices.masp === -1) {
          throw new Error('Kh\xF4ng t\xECm th\u1EA5y c\u1ED9t "masp" trong file Excel');
        }
        const processedData = [];
        const notFoundProducts = [];
        for (let i = 1; i < rawData.length; i++) {
          const row = rawData[i];
          if (!row || row.length === 0)
            continue;
          const masp = String(row[columnIndices.masp] || "").trim();
          if (!masp)
            continue;
          const serverProduct = this.ListSanpham.find((p) => p.masp?.toLowerCase().trim() === masp.toLowerCase().trim());
          if (!serverProduct) {
            notFoundProducts.push(masp);
            continue;
          }
          const sltonthucte = this.parseNumber(row[columnIndices.sltonthucte]);
          const slhuy = this.parseNumber(row[columnIndices.slhuy]);
          const sltonhethong = serverProduct.sltonhethong || 0;
          const chenhlech = this.calculateChenhLech(sltonhethong, sltonthucte, slhuy);
          const detailItem = {
            id: void 0,
            // New item
            sanphamId: serverProduct.id,
            sanpham: {
              id: serverProduct.id,
              masp: serverProduct.masp,
              title: serverProduct.title,
              dvt: serverProduct.dvt,
              dongia: serverProduct.dongia
            },
            sltonhethong,
            sltonthucte,
            slhuy,
            chenhlech,
            ghichu: `Import t\u1EEB Excel - ${(/* @__PURE__ */ new Date()).toLocaleString()}`,
            isActive: true,
            // Fields for table display
            title: serverProduct.title,
            masp: serverProduct.masp,
            dvt: serverProduct.dvt
          };
          processedData.push(detailItem);
        }
        if (notFoundProducts.length > 0) {
          console.warn("Products not found in system:", notFoundProducts);
          this._snackBar.open(`C\u1EA3nh b\xE1o: ${notFoundProducts.length} s\u1EA3n ph\u1EA9m kh\xF4ng t\xECm th\u1EA5y trong h\u1EC7 th\u1ED1ng`, "Xem chi ti\u1EBFt", {
            duration: 5e3,
            panelClass: ["snackbar-warning"]
          }).onAction().subscribe(() => {
            console.log("Not found products:", notFoundProducts.join(", "));
          });
        }
        return processedData;
      } catch (error) {
        console.error("Error processing Excel data:", error);
        throw error;
      }
    });
  }
  findColumnIndex(headers, possibleNames) {
    for (const name of possibleNames) {
      const normalizedName = removeVietnameseAccents(name.toLowerCase().trim());
      const index = headers.findIndex((header) => header.includes(normalizedName));
      if (index !== -1)
        return index;
    }
    return -1;
  }
  parseNumber(value) {
    if (value === void 0 || value === null || value === "")
      return 0;
    const stringValue = String(value).replace(/,/g, "").replace(/\s/g, "");
    const parsed = parseFloat(stringValue);
    return isNaN(parsed) ? 0 : Math.floor(parsed);
  }
  calculateChenhLech(sltonhethong, sltonthucte, slhuy) {
    return (sltonhethong || 0) - (sltonthucte || 0) - (slhuy || 0);
  }
  ExportExample() {
    return __async(this, null, function* () {
      try {
        if (this.ListSanpham.length === 0) {
          yield this.loadNewSanphamList();
        }
        const exampleData = this.createExampleData();
        const workbook = utils.book_new();
        const worksheet = utils.aoa_to_sheet(exampleData);
        const columnWidths = [
          { wch: 15 },
          // masp
          { wch: 35 },
          // title (for reference)
          { wch: 10 },
          // dvt (for reference)
          { wch: 20 },
          // sltonhethong (for reference)
          { wch: 15 },
          // sltonthucte
          { wch: 15 },
          // slhuy
          { wch: 50 }
          // notes
        ];
        worksheet["!cols"] = columnWidths;
        const headerCells = ["A1", "B1", "C1", "D1", "E1", "F1", "G1"];
        headerCells.forEach((cell) => {
          if (worksheet[cell]) {
            worksheet[cell].s = {
              font: { bold: true, color: { rgb: "FFFFFF" }, sz: 12 },
              fill: { fgColor: { rgb: "4472C4" } },
              alignment: { horizontal: "center", vertical: "center" },
              border: {
                top: { style: "thin" },
                bottom: { style: "thin" },
                left: { style: "thin" },
                right: { style: "thin" }
              }
            };
          }
        });
        for (let row = 2; row <= 14; row++) {
          const cellA = `A${row}`;
          if (worksheet[cellA]) {
            worksheet[cellA].s = {
              font: { color: { rgb: "0066CC" }, sz: 10, bold: row === 2 || row === 13 },
              fill: { fgColor: { rgb: "F0F8FF" } },
              alignment: { horizontal: "left", vertical: "center" }
            };
          }
        }
        const dataStartRow = 15;
        const sampleDataRows = Math.min(10, this.ListSanpham.length || 10);
        for (let row = dataStartRow; row < dataStartRow + sampleDataRows; row++) {
          ["A", "E", "F"].forEach((col) => {
            const cell = `${col}${row}`;
            if (worksheet[cell]) {
              worksheet[cell].s = {
                fill: { fgColor: { rgb: "FFFFCC" } },
                // Light yellow for editable fields
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "thin" },
                  right: { style: "thin" }
                },
                alignment: { horizontal: "center", vertical: "center" }
              };
            }
          });
          ["B", "C", "D", "G"].forEach((col) => {
            const cell = `${col}${row}`;
            if (worksheet[cell]) {
              worksheet[cell].s = {
                fill: { fgColor: { rgb: "F5F5F5" } },
                // Light gray for reference only
                font: { color: { rgb: "666666" } },
                border: {
                  top: { style: "thin" },
                  bottom: { style: "thin" },
                  left: { style: "thin" },
                  right: { style: "thin" }
                },
                alignment: { horizontal: "left", vertical: "center" }
              };
            }
          });
        }
        utils.book_append_sheet(workbook, worksheet, "M\u1EABu Import Ch\u1ED1t Kho");
        const now = /* @__PURE__ */ new Date();
        const dateStr = now.getFullYear() + String(now.getMonth() + 1).padStart(2, "0") + String(now.getDate()).padStart(2, "0");
        const timeStr = String(now.getHours()).padStart(2, "0") + String(now.getMinutes()).padStart(2, "0");
        const filename = `Mau_Import_ChotkKho_${dateStr}_${timeStr}.xlsx`;
        try {
          XLSXStyle.writeFile(workbook, filename);
        } catch (styleError) {
          console.warn("Styled export failed, using regular export:", styleError);
          writeFileSync(workbook, filename);
        }
        this._snackBar.open(`\u0110\xE3 t\u1EA3i xu\u1ED1ng file m\u1EABu: ${filename}`, "\u0110\xF3ng", {
          duration: 4e3,
          panelClass: ["snackbar-success"]
        });
        console.log("Excel template exported successfully:", filename);
      } catch (error) {
        console.error("Error exporting Excel template:", error);
        this._snackBar.open(`L\u1ED7i khi t\u1EA1o file m\u1EABu: ${error instanceof Error ? error.message : "Unknown error"}`, "\u0110\xF3ng", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  createExampleData() {
    const headers = [
      "masp",
      "title (Tham kh\u1EA3o - kh\xF4ng import)",
      "dvt (Tham kh\u1EA3o - kh\xF4ng import)",
      "sltonhethong (Tham kh\u1EA3o - t\u1EEB h\u1EC7 th\u1ED1ng)",
      "sltonthucte",
      "slhuy",
      "Ghi ch\xFA h\u01B0\u1EDBng d\u1EABn"
    ];
    const exampleRows = [];
    if (this.ListSanpham.length > 0) {
      const sampleProducts = this.ListSanpham.slice(0, Math.min(10, this.ListSanpham.length));
      sampleProducts.forEach((product, index) => {
        const sltonhethong = product.sltonhethong || Math.floor(Math.random() * 100) + 1;
        const sltonthucte = Math.floor(sltonhethong * (0.8 + Math.random() * 0.4));
        const slhuy = Math.floor(Math.random() * 5);
        exampleRows.push([
          product.masp || `SP${String(index + 1).padStart(3, "0")}`,
          product.title || `S\u1EA3n ph\u1EA9m m\u1EABu ${index + 1}`,
          product.dvt || "C\xE1i",
          sltonhethong,
          sltonthucte,
          slhuy,
          index === 0 ? "C\u1ED9t n\xE0y ch\u1EC9 \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn, kh\xF4ng \u0111\u01B0\u1EE3c import" : ""
        ]);
      });
    } else {
      for (let i = 1; i <= 10; i++) {
        const sltonhethong = Math.floor(Math.random() * 100) + 1;
        const sltonthucte = Math.floor(sltonhethong * (0.8 + Math.random() * 0.4));
        const slhuy = Math.floor(Math.random() * 5);
        exampleRows.push([
          `SP${String(i).padStart(3, "0")}`,
          `S\u1EA3n ph\u1EA9m m\u1EABu ${i}`,
          "C\xE1i",
          sltonhethong,
          sltonthucte,
          slhuy,
          i === 1 ? "C\u1ED9t n\xE0y ch\u1EC9 \u0111\u1EC3 h\u01B0\u1EDBng d\u1EABn, kh\xF4ng \u0111\u01B0\u1EE3c import" : ""
        ]);
      }
    }
    const instructionRows = [
      [],
      ["H\u01AF\u1EDANG D\u1EAAN S\u1EEC D\u1EE4NG:"],
      ["1. Ch\u1EC9 c\u1EA7n \u0111i\u1EC1n d\u1EEF li\u1EC7u v\xE0o c\xE1c c\u1ED9t: masp, sltonthucte, slhuy"],
      ['2. C\u1ED9t "masp" l\xE0 B\u1EAET BU\u1ED8C - ph\u1EA3i kh\u1EDBp v\u1EDBi m\xE3 s\u1EA3n ph\u1EA9m trong h\u1EC7 th\u1ED1ng'],
      ['3. C\u1ED9t "sltonthucte" l\xE0 s\u1ED1 l\u01B0\u1EE3ng t\u1ED3n th\u1EF1c t\u1EBF (m\u1EB7c \u0111\u1ECBnh 0 n\u1EBFu \u0111\u1EC3 tr\u1ED1ng)'],
      ['4. C\u1ED9t "slhuy" l\xE0 s\u1ED1 l\u01B0\u1EE3ng h\u1EE7y (m\u1EB7c \u0111\u1ECBnh 0 n\u1EBFu \u0111\u1EC3 tr\u1ED1ng)'],
      ['5. C\u1ED9t "sltonhethong" s\u1EBD \u0111\u01B0\u1EE3c l\u1EA5y t\u1EEB h\u1EC7 th\u1ED1ng t\u1EF1 \u0111\u1ED9ng'],
      ["6. Ch\xEAnh l\u1EC7ch = sltonhethong - sltonthucte - slhuy (t\u1EF1 \u0111\u1ED9ng t\xEDnh)"],
      ["7. C\xE1c c\u1ED9t kh\xE1c ch\u1EC9 \u0111\u1EC3 tham kh\u1EA3o, kh\xF4ng \u0111\u01B0\u1EE3c import"],
      ["8. X\xF3a c\xE1c d\xF2ng h\u01B0\u1EDBng d\u1EABn n\xE0y tr\u01B0\u1EDBc khi import"],
      [],
      ["D\u1EEE LI\u1EC6U M\u1EAAU (B\u1EAFt \u0111\u1EA7u t\u1EEB d\xF2ng ti\u1EBFp theo):"]
    ];
    return [
      headers,
      ...instructionRows,
      ...exampleRows
    ];
  }
  static \u0275fac = function DetailChotkhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailChotkhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailChotkhoComponent, selectors: [["app-detailchotkho"]], viewQuery: function DetailChotkhoComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 11, vars: 4, consts: [["picker", ""], ["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["searchInput", ""], ["uploadfile", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["class", "p-4 rounded-lg mb-4", 4, "ngIf"], ["class", "bg-white p-4 rounded-lg border", 4, "ngIf"], [1, "p-4", "rounded-lg", "mb-4"], [1, "text-lg", "font-semibold", "mb-4"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp ti\xEAu \u0111\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Ch\u1ECDn ng\xE0y ch\u1ED1t", 3, "ngModelChange", "matDatepicker", "ngModel", "disabled"], ["matSuffix", "", 3, "for"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "md:col-span-2"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp ghi ch\xFA", "rows", "2", 3, "ngModelChange", "ngModel", "disabled"], [1, "bg-white", "p-4", "rounded-lg", "border"], ["class", "w-full flex flex-col overflow-y-auto mb-4", 4, "ngIf"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "w-full", "flex", "flex-col", "overflow-y-auto", "mb-4"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "w-full", "flex", "lg:flex-row", "flex-col", "gap-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "bg-blue-50", "p-2", "rounded-lg"], [1, "text-sm", "font-medium", "text-blue-800"], [1, "text-xs", "text-blue-600"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "text-xs", "text-red-600", "underline", 3, "click"], [1, "text-xs", "text-green-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100 cursor-pointer", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], ["class", "text-center text-gray-500 p-4", 4, "ngIf"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], [1, "flex", "flex-row", "gap-2", "justify-items-center"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "keyup"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["multiple", "", "type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i xu\u1ED1ng file m\u1EABu Excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "L\xE0m Tr\u1ED1ng Gi\u1ECF H\xE0ng", "color", "warn", "mat-icon-button", "", 3, "click", "disabled"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", "cursor-pointer", 3, "click"], ["class", "material-symbols-outlined text-green-600", 4, "ngIf"], ["class", "material-symbols-outlined text-gray-400", 4, "ngIf"], [1, "flex", "flex-col", "flex-1"], [1, "font-medium"], [1, "text-xs", "text-gray-500"], [1, "material-symbols-outlined", "text-green-600"], [1, "material-symbols-outlined", "text-gray-400"], [1, "text-center", "text-gray-500", "p-4"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-20", "line-clamp-4", "flex", "flex-row", "items-center"], [1, "max-w-20", "line-clamp-4", 3, "class"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-20", "line-clamp-4"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], ["class", "sltonthucte-input p-2 min-w-28 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none cursor-text", 3, "contentEditable", "blur", "keydown.enter", 4, "ngIf"], ["class", "max-w-20 line-clamp-4", 4, "ngIf"], [1, "sltonthucte-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "cursor-text", 3, "blur", "keydown.enter", "contentEditable"], ["class", "slhuy-input p-2 min-w-28 bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none cursor-text", 3, "contentEditable", "blur", "keydown.enter", 4, "ngIf"], [1, "slhuy-input", "p-2", "min-w-28", "bg-slate-200", "focus:border", "rounded-lg", "focus:border-blue-600", "focus:bg-slate-100", "focus:outline-none", "cursor-text", 3, "blur", "keydown.enter", "contentEditable"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "8", 1, "mat-cell", "p-4"]], template: function DetailChotkhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 5)(1, "button", 6);
      \u0275\u0275listener("click", function DetailChotkhoComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 8);
      \u0275\u0275template(7, DetailChotkhoComponent_button_7_Template, 3, 0, "button", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "div", 10);
      \u0275\u0275template(9, DetailChotkhoComponent_ng_container_9_Template, 9, 0, "ng-container", 11)(10, DetailChotkhoComponent_ng_container_10_Template, 3, 2, "ng-container", 11);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailChotkho()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
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
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatMenuModule,
    CommonModule,
    NgIf,
    DecimalPipe,
    MatSlideToggleModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailChotkhoComponent, { className: "DetailChotkhoComponent", filePath: "src/app/admin/chotkho/detailchotkho/detailchotkho.ts", lineNumber: 48 });
})();
export {
  DetailChotkhoComponent
};
//# sourceMappingURL=chunk-7C7CMWVX.mjs.map
