import {
  SearchService
} from "./chunk-7IP7U4YY.js";
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-NRONELDE.js";
import {
  DateHelpers
} from "./chunk-CU6ECT62.js";
import {
  TrangThaiDon
} from "./chunk-T6TCKYMX.js";
import {
  NhanvienService,
  TrangThaiNhanvien
} from "./chunk-VSXZ7WDU.js";
import {
  DonhangService
} from "./chunk-3RK5O7D3.js";
import {
  GoogleSheetService
} from "./chunk-7CDWZLNJ.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-S6K43KTV.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-UBU6BPOA.js";
import {
  readExcelFile,
  writeExcelFile
} from "./chunk-DOJR6IHP.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-EMT3PHD4.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-W6W5IZUE.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-BLSCHC3G.js";
import {
  Router,
  RouterOutlet
} from "./chunk-I3HWRSST.js";
import {
  StorageService
} from "./chunk-S5TWTPVL.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  readSync,
  utils
} from "./chunk-P2TQI6AF.js";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule
} from "./chunk-PQ5C5V7E.js";
import {
  MatSnackBar
} from "./chunk-7TLPKC3B.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-FQNHKKYV.js";
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
} from "./chunk-SSCVWHZW.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-FCO3RLCX.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-JUAFAJ2Y.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-EOVYE2CD.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-ZGUYOD2D.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OB46FS5W.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-JCKTSD6E.js";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-2QF354AD.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-2VHAU5LM.js";
import {
  computed,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction1,
  ɵɵpureFunction5,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-FWM3YOMT.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieuchiahang/listphieuchiahang/listphieuchiahang.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = (a0) => [10, a0];
var _c3 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _c4 = (a0) => ({ "hover:bg-slate-100": true, "!bg-slate-200": a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
function ListPhieuchiahangComponent_div_5_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_5_For_14_Template_button_click_0_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      ctx_r2.toggleColumn(item_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.value);
  }
}
function ListPhieuchiahangComponent_div_5_div_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 50);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 51);
    \u0275\u0275element(3, "path", 52)(4, "path", 53);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 54);
    \u0275\u0275text(6, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(7, " \u0110ang upload... ");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 34)(1, "div", 35)(2, "button", 36)(3, "mat-icon");
    \u0275\u0275text(4, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-menu", null, 5)(7, "div", 37)(8, "mat-form-field", 38)(9, "input", 39);
    \u0275\u0275listener("input", function ListPhieuchiahangComponent_div_5_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieuchiahangComponent_div_5_Template_input_click_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-icon", 40);
    \u0275\u0275text(11, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 41);
    \u0275\u0275repeaterCreate(13, ListPhieuchiahangComponent_div_5_For_14_Template, 5, 2, "button", 42, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 43);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_5_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "span", 44);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 45);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_5_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const dialogXembill_r6 = \u0275\u0275reference(52);
      return \u0275\u0275resetView(ctx_r2.openXembillDialog(dialogXembill_r6));
    });
    \u0275\u0275text(21, "Xem Bill");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 46, 6);
    \u0275\u0275listener("change", function ListPhieuchiahangComponent_div_5_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, ListPhieuchiahangComponent_div_5_div_24_Template, 8, 0, "div", 47);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const menu_r7 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", menu_r7);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.CountItem, " \u0110\u01A1n H\xE0ng ");
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r2.ListBill.length === 0);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r2.isLoading());
  }
}
function ListPhieuchiahangComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 55)(1, "mat-form-field", 38)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 56);
    \u0275\u0275listener("keyup", function ListPhieuchiahangComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 57);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieuchiahangComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 20);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = ctx.$implicit;
    \u0275\u0275property("value", item_r9.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r9.Title);
  }
}
function ListPhieuchiahangComponent_button_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_button_39_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext();
      const dialogCreateTemplate_r11 = \u0275\u0275reference(50);
      return \u0275\u0275resetView(ctx_r2.openCreateDialog(dialogCreateTemplate_r11));
    });
    \u0275\u0275text(1, "T\u1EA1o Phi\u1EBFu Chia");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_Conditional_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 27)(1, "mat-icon", 59);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 60);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 61);
    \u0275\u0275text(6, " Vui l\xF2ng ch\u1ECDn \u0111i\u1EC1u ki\u1EC7n t\xECm ki\u1EBFm (ng\xE0y, lo\u1EA1i kh\xE1ch h\xE0ng)");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " v\xE0 nh\u1EA5n n\xFAt ");
    \u0275\u0275elementStart(9, "strong", 62);
    \u0275\u0275text(10, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu chia h\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 58);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_Conditional_41_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchData());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 63);
    \u0275\u0275text(16, "T\xECm Ki\u1EBFm Ngay");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r16[column_r14], "dd/MM/yyyy"));
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r16[column_r14], "dd/MM/yyyy"));
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r16[column_r14], "1.0-0"));
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r16[column_r14], "1.0-0"));
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", (item_r16[column_r14] == null ? null : item_r16[column_r14].length) || 0, " s\u1EA3n ph\u1EA9m");
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r16[column_r14] || "Tr\u1ED1ng");
  }
}
function ListPhieuchiahangComponent_For_44_th_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 79);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_div_17_Template_div_click_0_listener() {
      const item_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const column_r14 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r16, column_r14));
    });
    \u0275\u0275element(1, "input", 80);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275template(3, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_3_Template, 3, 4, "span", 81)(4, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_4_Template, 3, 4, "span", 81)(5, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_5_Template, 3, 4, "span", 81)(6, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_6_Template, 3, 4, "span", 81)(7, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_7_Template, 2, 1, "span", 81)(8, ListPhieuchiahangComponent_For_44_th_1_div_17_Case_8_Template, 2, 1, "span", 81);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_21_0;
    const item_r16 = ctx.$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.CheckItem(item_r16));
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_21_0 = column_r14) === "ngaygiao" ? 3 : tmp_21_0 === "ngaydat" ? 4 : tmp_21_0 === "tongtien" ? 5 : tmp_21_0 === "thanhtien" ? 6 : tmp_21_0 === "sanpham" ? 7 : 8);
  }
}
function ListPhieuchiahangComponent_For_44_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 66)(1, "span", 67);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 68, 7);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 5)(8, "div", 69);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "input", 70);
    \u0275\u0275listener("keyup", function ListPhieuchiahangComponent_For_44_th_1_Template_input_keyup_9_listener($event) {
      \u0275\u0275restoreView(_r13);
      const column_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r14));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 71);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r13);
      const column_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r14)));
    });
    \u0275\u0275text(11, "Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 72);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_span_click_12_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(13, "B\u1ECF Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 73);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_span_click_14_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(15, "Reset");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 74);
    \u0275\u0275template(17, ListPhieuchiahangComponent_For_44_th_1_div_17_Template, 9, 2, "div", 75);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 76)(19, "button", 77);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r13);
      const menuTrigger_r17 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r17));
    });
    \u0275\u0275text(20, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 78);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_th_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r13);
      const menuTrigger_r17 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r17.closeMenu());
    });
    \u0275\u0275text(22, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r18 = \u0275\u0275reference(7);
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r14], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r18);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r14))("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 89);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const row_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleDonhang(row_r20));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListPhieuchiahangComponent_For_44_td_2_Case_1_span_2_Template, 2, 0, "span", 90);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r20 = \u0275\u0275nextContext();
    const row_r20 = ctx_r20.$implicit;
    const idx_r22 = ctx_r20.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r22 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItemInDonhang(row_r20));
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r14], " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r14], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r14], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r14].name, " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r14].length, " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 20)(1, "span", 104);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const nv_r24 = ctx.$implicit;
    \u0275\u0275property("value", nv_r24.id);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(nv_r24.hoTen);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 99)(1, "span", 105);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 92)(1, "mat-select", 94);
    \u0275\u0275listener("selectionChange", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template_mat_select_selectionChange_1_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.onNhanvienSelect($event.value));
    });
    \u0275\u0275elementStart(2, "mat-option", 95)(3, "div", 96)(4, "input", 97);
    \u0275\u0275listener("input", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.onSearchNhanvien($event.target.value));
    })("keydown", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template_input_keydown_4_listener($event) {
      \u0275\u0275restoreView(_r23);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(5, "mat-option", 20)(6, "span", 98);
    \u0275\u0275text(7, "-- B\u1ECF ch\u1ECDn --");
    \u0275\u0275elementEnd()();
    \u0275\u0275repeaterCreate(8, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_For_9_Template, 3, 2, "mat-option", 20, _forTrack1);
    \u0275\u0275template(10, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Conditional_10_Template, 3, 0, "mat-option", 99);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 100);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r23);
      const row_r20 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.confirmEditNhanvien(row_r20));
    });
    \u0275\u0275elementStart(12, "mat-icon", 101);
    \u0275\u0275text(13, "check");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "button", 102);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r23);
      const ctx_r2 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r2.cancelEditNhanvien());
    });
    \u0275\u0275elementStart(15, "mat-icon", 103);
    \u0275\u0275text(16, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(4);
    \u0275\u0275advance();
    \u0275\u0275property("value", ctx_r2.selectedNhanvienId);
    \u0275\u0275advance(3);
    \u0275\u0275property("value", ctx_r2.searchNhanvienText());
    \u0275\u0275advance();
    \u0275\u0275property("value", null);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r2.filteredNhanvien());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r2.filteredNhanvien().length === 0 && ctx_r2.searchNhanvienText() ? 10 : -1);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r20.nhanvienchiahang);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1, "(Click \u0111\u1EC3 ch\u1ECDn)");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 106);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r25);
      const row_r20 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.startEditNhanvien(row_r20));
    });
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Conditional_1_Template, 2, 1, "span", 107)(2, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Conditional_2_Template, 2, 0, "span", 105);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r20.nhanvienchiahang ? 1 : 2);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 87);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_1_Template, 17, 4, "div", 92)(2, ListPhieuchiahangComponent_For_44_td_2_Case_7_Conditional_2_Template, 3, 1, "span", 93);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.editingNhanvienId === row_r20.id ? 1 : 2);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 108);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 109);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_td_2_Case_8_Conditional_1_Template, 2, 0, "mat-icon", 108)(2, ListPhieuchiahangComponent_For_44_td_2_Case_8_Conditional_2_Template, 2, 0, "mat-icon", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r20[column_r14] ? 1 : 2);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.getTrangthaiInLabel(row_r20), " (", row_r20[column_r14], ") ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext(2).$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r2.getTrangthaiInLabel(row_r20), " (", row_r20[column_r14], ")");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_td_2_Case_9_Conditional_1_Template, 2, 2, "span", 108)(2, ListPhieuchiahangComponent_For_44_td_2_Case_9_Conditional_2_Template, 2, 2, "span", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.getTrangthaiIn(row_r20) ? 1 : 2);
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c3, row_r20[column_r14] === "dadat", row_r20[column_r14] === "dagiao", row_r20[column_r14] === "danhan", row_r20[column_r14] === "hoanthanh", row_r20[column_r14] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.Trangthaidon[row_r20[column_r14]], " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r20[column_r14], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r20[column_r14], " ");
  }
}
function ListPhieuchiahangComponent_For_44_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 82);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_td_2_Case_1_Template, 3, 2, "span", 83)(2, ListPhieuchiahangComponent_For_44_td_2_Case_2_Template, 2, 1, "span", 84)(3, ListPhieuchiahangComponent_For_44_td_2_Case_3_Template, 3, 4, "span", 85)(4, ListPhieuchiahangComponent_For_44_td_2_Case_4_Template, 3, 4, "span", 85)(5, ListPhieuchiahangComponent_For_44_td_2_Case_5_Template, 2, 1, "span", 86)(6, ListPhieuchiahangComponent_For_44_td_2_Case_6_Template, 2, 1, "span", 86)(7, ListPhieuchiahangComponent_For_44_td_2_Case_7_Template, 3, 1, "div", 87)(8, ListPhieuchiahangComponent_For_44_td_2_Case_8_Template, 3, 1, "span", 86)(9, ListPhieuchiahangComponent_For_44_td_2_Case_9_Template, 3, 1, "span", 86)(10, ListPhieuchiahangComponent_For_44_td_2_Case_10_Template, 2, 8, "span", 88)(11, ListPhieuchiahangComponent_For_44_td_2_Case_11_Template, 3, 4, "span", 85)(12, ListPhieuchiahangComponent_For_44_td_2_Case_12_Template, 2, 1, "span", 86);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = column_r14) === "STT" ? 1 : tmp_18_0 === "madonhang" ? 2 : tmp_18_0 === "createdAt" ? 3 : tmp_18_0 === "ngaygiao" ? 4 : tmp_18_0 === "khachhang" ? 5 : tmp_18_0 === "sanpham" ? 6 : tmp_18_0 === "nhanvienchiahang" ? 7 : tmp_18_0 === "isActive" ? 8 : tmp_18_0 === "printCount" ? 9 : tmp_18_0 === "status" ? 10 : tmp_18_0 === "updatedAt" ? 11 : 12);
  }
}
function ListPhieuchiahangComponent_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 29);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_44_th_1_Template, 23, 4, "th", 64)(2, ListPhieuchiahangComponent_For_44_td_2_Template, 13, 1, "td", 65);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r14 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r14);
  }
}
function ListPhieuchiahangComponent_tr_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 110);
  }
}
function ListPhieuchiahangComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 111);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_tr_46_Template_tr_click_0_listener() {
      const row_r27 = \u0275\u0275restoreView(_r26).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDonhang(row_r27));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r27 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(1, _c4, ctx_r2.CheckItemInDonhang(row_r27)));
  }
}
function ListPhieuchiahangComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 112)(1, "td", 113);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieuchiahangComponent_ng_template_49_th_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 127)(1, "div", 128)(2, "span", 129);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const kh_r29 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kh_r29.name);
  }
}
function ListPhieuchiahangComponent_ng_template_49_tr_20_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 135)(1, "div", 136);
    \u0275\u0275element(2, "span", 137);
    \u0275\u0275elementStart(3, "span", 138);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const kh_r30 = ctx.$implicit;
    const product_r31 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_11_0 = ctx_r2.getProductQuantity(ctx_r2.Phieuchia, product_r31, kh_r30.makh, kh_r30.madonhang)) == null ? null : tmp_11_0.slgiao) || "");
  }
}
function ListPhieuchiahangComponent_ng_template_49_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 130)(1, "td", 131);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 132);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 133);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ListPhieuchiahangComponent_ng_template_49_tr_20_td_7_Template, 5, 1, "td", 134);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    const product_r31 = ctx.$implicit;
    const idx_r32 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", idx_r32 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", product_r31, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx_r2.getDvtForProduct(ctx_r2.Phieuchia, product_r31)) == null ? null : tmp_11_0.dvt, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.Phieuchia);
  }
}
function ListPhieuchiahangComponent_ng_template_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 115);
    \u0275\u0275element(2, "div");
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "Phi\u1EBFu Chia H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 116);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_49_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printContent());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "div", 117)(9, "table", 118)(10, "thead", 119)(11, "tr")(12, "th", 120);
    \u0275\u0275text(13, " STT ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 121);
    \u0275\u0275text(15, " T\xEAn SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 122);
    \u0275\u0275text(17, " \u0110VT ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(18, ListPhieuchiahangComponent_ng_template_49_th_18_Template, 4, 1, "th", 123);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "tbody");
    \u0275\u0275template(20, ListPhieuchiahangComponent_ng_template_49_tr_20_Template, 8, 4, "tr", 124);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(21, "mat-dialog-actions", 125)(22, "button", 126);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_49_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r28);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editDonhang = []);
    });
    \u0275\u0275text(23, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(18);
    \u0275\u0275property("ngForOf", ctx_r2.Phieuchia);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getUniqueProducts(ctx_r2.Phieuchia));
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
  }
}
function ListPhieuchiahangComponent_ng_template_51_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 121)(1, "div", 144)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const kh_r34 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kh_r34.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kh_r34.madonhang);
  }
}
function ListPhieuchiahangComponent_ng_template_51_tr_18_td_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 148)(1, "div", 149);
    \u0275\u0275listener("keydown.enter", function ListPhieuchiahangComponent_ng_template_51_tr_18_td_7_Template_div_keydown_enter_1_listener($event) {
      const j_r36 = \u0275\u0275restoreView(_r35).index;
      const i_r37 = \u0275\u0275nextContext().index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, j_r36, i_r37, "slgiao", "number"));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const j_r36 = ctx.index;
    const i_r37 = \u0275\u0275nextContext().index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("slgiao-input-", j_r36, " px-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none");
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 5, (ctx_r2.ListBillXuly[j_r36] == null ? null : ctx_r2.ListBillXuly[j_r36].sanpham[i_r37] == null ? null : ctx_r2.ListBillXuly[j_r36].sanpham[i_r37].slgiao) || 0, "1.0-2"), " ");
  }
}
function ListPhieuchiahangComponent_ng_template_51_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 145)(1, "td", 132);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 132);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 146);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ListPhieuchiahangComponent_ng_template_51_tr_18_td_7_Template, 4, 8, "td", 147);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_11_0;
    const product_r38 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx_r2.getDvtForProduct(ctx_r2.ListBillXuly, product_r38)) == null ? null : tmp_9_0.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", product_r38, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx_r2.getDvtForProduct(ctx_r2.ListBillXuly, product_r38)) == null ? null : tmp_11_0.dvt, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.ListBillXuly)("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchiahangComponent_ng_template_51_Template(rf, ctx) {
  if (rf & 1) {
    const _r33 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 139);
    \u0275\u0275text(2, "X\xE1c Nh\u1EADn \u0110\u01A1n H\xE0ng ");
    \u0275\u0275elementStart(3, "button", 116);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_51_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printContent());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 117)(7, "table", 118)(8, "thead", 140)(9, "tr")(10, "th", 121);
    \u0275\u0275text(11, " M\xE3 SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 121);
    \u0275\u0275text(13, " T\xEAn SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 121);
    \u0275\u0275text(15, " \u0110\u01A1n v\u1ECB ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ListPhieuchiahangComponent_ng_template_51_th_16_Template, 8, 2, "th", 141);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ListPhieuchiahangComponent_ng_template_51_tr_18_Template, 8, 5, "tr", 142);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-dialog-actions", 125)(20, "button", 143);
    \u0275\u0275text(21, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 58);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_51_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r33);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.UpdateListBill());
    });
    \u0275\u0275text(23, "C\u1EADp Nh\u1EADt");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r2.ListBillXuly);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getUniqueProducts(ctx_r2.ListBillXuly));
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
  }
}
var ListPhieuchiahangComponent = class _ListPhieuchiahangComponent {
  DateHelpers = DateHelpers;
  Detail = {};
  displayedColumns = [
    "madonhang",
    "name",
    "nhanvienchiahang",
    "sanpham",
    "ngaygiao",
    "ghichu",
    "printCount",
    "status",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    name: "Kh\xE1ch H\xE0ng",
    nhanvienchiahang: "Nh\xE2n Vi\xEAn Chia H\xE0ng",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    ngaygiao: "Ng\xE0y Giao",
    ghichu: "Ghi Ch\xFA",
    printCount: "S\u1ED1 L\u01B0\u1EE3ng In",
    status: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("DonhangColFilter") || "[]");
  Columns = [];
  isFilter = false;
  Trangthaidon = TrangThaiDon;
  // Track edit mode for nhanvienchiahang
  editingNhanvienId = null;
  tempNhanvienValue = "";
  // Danh sách nhân viên cho dropdown
  listNhanvien = signal([]);
  selectedNhanvienId = null;
  // Search nhân viên
  searchNhanvienText = signal("");
  filteredNhanvien = computed(() => {
    const searchText = this.searchNhanvienText().toLowerCase().trim();
    const list = this.listNhanvien();
    if (!searchText)
      return list;
    return list.filter((nv) => nv.hoTen.toLowerCase().includes(searchText) || nv.maLamViec && nv.maLamViec.toLowerCase().includes(searchText) || nv.maNV.toLowerCase().includes(searchText));
  });
  paginator;
  sort;
  drawer;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _NhanvienService = inject(NhanvienService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _SearchService = inject(SearchService);
  _StorageService = inject(StorageService);
  _router = inject(Router);
  Listdonhang = this._DonhangService.ListDonhang;
  dataSource = new MatTableDataSource([]);
  donhangId = this._DonhangService.donhangId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    Batdau: (0, import_moment.default)().startOf("day").toDate(),
    // 00:00:00 ngày hiện tại
    Ketthuc: (0, import_moment.default)().endOf("day").toDate(),
    // 23:59:59 ngày hiện tại
    Type: "all",
    pageSize: 99999
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
  isSearch = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
  }
  onSelectionChange(event) {
    const timeFrames = {
      day: () => {
        this.SearchParams.Batdau = (0, import_moment.default)().startOf("day").format("YYYY-MM-DD");
        this.SearchParams.Ketthuc = (0, import_moment.default)().endOf("day").add(1, "day").format("YYYY-MM-DD");
      },
      week: () => {
        this.SearchParams.Batdau = (0, import_moment.default)().startOf("week").format("YYYY-MM-DD");
        this.SearchParams.Ketthuc = (0, import_moment.default)().endOf("week").format("YYYY-MM-DD");
      },
      month: () => {
        this.SearchParams.Batdau = (0, import_moment.default)().startOf("month").format("YYYY-MM-DD");
        this.SearchParams.Ketthuc = (0, import_moment.default)().endOf("month").format("YYYY-MM-DD");
      },
      year: () => {
        this.SearchParams.Batdau = (0, import_moment.default)().startOf("year").format("YYYY-MM-DD");
        this.SearchParams.Ketthuc = (0, import_moment.default)().endOf("year").format("YYYY-MM-DD");
      }
    };
    timeFrames[event.value]?.();
  }
  onDateChange(event) {
  }
  onTypeChange(value) {
    return __async(this, null, function* () {
      this.SearchParams.Type = value;
      this.SearchParams.pageNumber = 1;
      yield this.loadData();
    });
  }
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  searchData() {
    return __async(this, null, function* () {
      yield this.loadData();
    });
  }
  createFilter() {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : "";
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.initializeColumns();
      this.setupDrawer();
      if (this.paginator) {
        this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
        this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
        this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
        this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
        this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
      }
      yield this.loadNhanvien();
      yield this.loadData();
    });
  }
  /**
   * Load danh sách nhân viên đang làm việc
   */
  loadNhanvien() {
    return __async(this, null, function* () {
      try {
        const response = yield this._NhanvienService.getAllNhanvien({
          trangThai: TrangThaiNhanvien.DANGLAMVIEC,
          limit: 1e3
        });
        this.listNhanvien.set(response.data);
      } catch (error) {
        console.error("Error loading nhanvien:", error);
      }
    });
  }
  loadData() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        yield this._DonhangService.searchDonhang(this.SearchParams);
        const listData = this.Listdonhang();
        if (!Array.isArray(listData)) {
          console.error("Listdonhang kh\xF4ng ph\u1EA3i l\xE0 array:", listData);
          this.CountItem = 0;
          this.dataSource = new MatTableDataSource([]);
        } else {
          this.CountItem = listData.length;
          this.dataSource = new MatTableDataSource(listData);
        }
        console.log(this.dataSource.data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.dataSource.filterPredicate = this.createFilter();
      } catch (error) {
        console.error("Error loading data:", error);
        this._snackBar.open("\u274C L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  initializeColumns() {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem("DonhangColFilter", JSON.stringify(this.FilterColumns));
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "over";
        this.paginator.hidePageSize = true;
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("DonhangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  FilterHederColumn(list, column) {
    if (column === "sanpham") {
      const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => (t[column]?.length || 0) === (obj[column]?.length || 0)));
      return uniqueList;
    } else {
      const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
      return uniqueList;
    }
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    const listData = this.Listdonhang();
    if (!Array.isArray(listData)) {
      console.error("Listdonhang kh\xF4ng ph\u1EA3i l\xE0 array:", listData);
      this.dataSource.filteredData = [];
      return;
    }
    this.dataSource.filteredData = listData.filter((v) => {
      let value;
      if (column === "sanpham") {
        value = `${v[column]?.length || 0} s\u1EA3n ph\u1EA9m`;
      } else {
        value = v[column];
      }
      if (value) {
        return removeVietnameseAccents(value.toString()).toLowerCase().includes(query) || value.toString().toLowerCase().includes(query);
      }
      return false;
    });
  }
  ListFilter = [];
  ChosenItem(item, column) {
    let CheckItem = [];
    let CheckItem1 = [];
    if (column === "sanpham") {
      CheckItem = this.dataSource.filteredData.filter((v) => (v[column]?.length || 0) === (item[column]?.length || 0));
      CheckItem1 = this.ListFilter.filter((v) => (v[column]?.length || 0) === (item[column]?.length || 0));
    } else {
      CheckItem = this.dataSource.filteredData.filter((v) => v[column] === item[column]);
      CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    }
    if (CheckItem1.length > 0) {
      if (column === "sanpham") {
        this.ListFilter = this.ListFilter.filter((v) => (v[column]?.length || 0) !== (item[column]?.length || 0));
      } else {
        this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
      }
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list) {
    list.forEach((v) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v2) => v2.id !== v2.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    const listData = this.Listdonhang();
    if (!Array.isArray(listData)) {
      console.error("Listdonhang kh\xF4ng ph\u1EA3i l\xE0 array:", listData);
      return;
    }
    this.ListFilter = listData;
    this.dataSource.data = listData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    const listData = this.Listdonhang();
    if (!Array.isArray(listData)) {
      console.error("Listdonhang kh\xF4ng ph\u1EA3i l\xE0 array:", listData);
      this._snackBar.open("L\u1ED7i: D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7", "", {
        duration: 2e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      menu.closeMenu();
      return;
    }
    this.dataSource.data = listData.filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/donhang", 0]);
  }
  goToDetail(item) {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/donhang", item.id]);
  }
  editDonhang = [];
  toggleDonhang(item) {
    const index = this.editDonhang.findIndex((v) => v.id === item.id);
    if (index !== -1) {
      this.editDonhang.splice(index, 1);
    } else {
      this.editDonhang.push(item);
    }
  }
  dialog = inject(MatDialog);
  dialogCreateRef;
  Phieuchia = [];
  openCreateDialog(teamplate) {
    console.log(this.editDonhang);
    this.Phieuchia = this.editDonhang.map((v) => ({
      makh: v.khachhang?.makh,
      name: v.khachhang?.name,
      madonhang: v.madonhang,
      sanpham: v.sanpham.map((v1) => ({
        title: v1.title,
        masp: v1.masp,
        dvt: v1.dvt,
        slgiao: v1.slgiao
      }))
    }));
    console.log(this.Phieuchia);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
  }
  ListBillXuly = [];
  openXembillDialog(teamplate) {
    this.ListBillXuly = this.ListBill;
    this.ListBillXuly.forEach((v) => {
      v.sanpham.forEach((v1) => {
        v1.slgiao = v1.sltt ? v1.sltt : v1.sld;
      });
    });
    console.log(this.ListBillXuly);
    this.dialogCreateRef = this.dialog.open(teamplate, {
      hasBackdrop: true,
      disableClose: true
    });
  }
  getUniqueProducts(list) {
    const products = /* @__PURE__ */ new Set();
    list.forEach((kh) => kh.sanpham.forEach((sp) => products.add(sp.title)));
    return Array.from(products).sort((a, b) => a.localeCompare(b, "vi"));
  }
  getProductQuantity(list, product, makh, madonhang) {
    const customer = list.find((kh) => kh.makh === makh && kh.madonhang === madonhang);
    const item = customer?.sanpham.find((sp) => sp.title === product);
    return item ? item : "";
  }
  getDvtForProduct(list, product) {
    const uniqueProducts = Array.from(new Map(list.flatMap((c) => c.sanpham.map((sp) => __spreadProps(__spreadValues({}, sp), { makh: c.makh, name: c.name }))).map((p) => [p.title, p])).values());
    const item = uniqueProducts.find((sp) => sp.title === product);
    return item ? item : "";
  }
  CheckItemInDonhang(item) {
    return this.editDonhang.findIndex((v) => v.id === item.id) !== -1;
  }
  DeleteDonhang() {
  }
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "SPImport",
        ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      console.log(data);
      this.DoImportData(data);
    });
  }
  DoImportData(data) {
    console.log(data);
    const transformedData = data.map((v) => ({
      title: v.title?.trim() || "",
      masp: v.masp?.trim() || "",
      slug: `${convertToSlug(v?.title?.trim() || "")}_${GenId(5, false)}`,
      giagoc: Number(v.giagoc) || 0,
      dvt: v.dvt || "",
      soluong: Number(v.soluong) || 0,
      soluongkho: Number(v.soluongkho) || 0,
      ghichu: v.ghichu || "",
      order: Number(v.order) || 0
    }));
    const uniqueData = transformedData.filter((value, index, self) => index === self.findIndex((t) => t.masp === value.masp));
    const listId2 = uniqueData.map((v) => v.masp);
    const listId1 = this._DonhangService.ListDonhang().map((v) => v.masp);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._DonhangService.ListDonhang().find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._DonhangService.updateDonhang(item1);
      } else {
        yield this._DonhangService.CreateDonhang(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._DonhangService.ListDonhang().find((v1) => v1.masp === v);
      item.isActive = false;
      yield this._DonhangService.updateDonhang(item);
    }));
    Promise.all([...createuppdateitem, ...disableItem]).then(() => {
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFile(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    writeExcelFile(data, title);
  }
  printContent() {
    return __async(this, null, function* () {
      const printContent = document.getElementById("printContent");
      if (printContent) {
        console.log("\u{1F50D} [printContent] B\u1EAFt \u0111\u1EA7u ki\u1EC3m tra editDonhang:", this.editDonhang);
        console.log("\u{1F50D} [printContent] S\u1ED1 \u0111\u01A1n \u0111\u01B0\u1EE3c ch\u1ECDn:", this.editDonhang?.length || 0);
        if (this.editDonhang && this.editDonhang.length > 0) {
          console.log("\u2705 [printContent] \u0110ang c\u1EADp nh\u1EADt printCount v\xE0 chuy\u1EC3n dagiao cho", this.editDonhang.length, "\u0111\u01A1n h\xE0ng");
          try {
            for (const order of this.editDonhang) {
              order.printCount = (order.printCount || 0) + 1;
              console.log(`\u{1F4DD} [printContent] \u0110\u01A1n ${order.madonhang}: printCount \u2192 ${order.printCount}`);
              const updateData = {
                id: order.id,
                printCount: order.printCount
              };
              console.log("\u{1F680} [printContent] G\u1EEDi update printCount l\xEAn server:", updateData);
              const result = yield this._DonhangService.updateDonhang(updateData);
              console.log("\u2705 [printContent] Server response:", result);
            }
            console.log("\u{1F504} [printContent] Refresh dataSource");
            this.dataSource.data = [...this.dataSource.data];
            this._snackBar.open(`\u2705 \u0110\xE3 c\u1EADp nh\u1EADt s\u1ED1 l\u1EA7n in cho ${this.editDonhang.length} \u0111\u01A1n h\xE0ng`, "", {
              duration: 2e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-success"]
            });
          } catch (error) {
            console.error("\u274C [printContent] Error updating printCount:", error);
            this._snackBar.open("\u26A0\uFE0F L\u1ED7i khi c\u1EADp nh\u1EADt s\u1ED1 l\u1EA7n in", "", {
              duration: 3e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
          }
        } else {
          console.warn("\u26A0\uFE0F [printContent] Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn \u0111\u1EC3 c\u1EADp nh\u1EADt printCount");
        }
        const newWindow = window.open("", "_blank");
        const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"><\/script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    <\/script>
  `;
        if (newWindow) {
          newWindow.document.write(`
        <html>
        <head>
          <title>In B\u1EA3ng</title>
                 ${tailwindCSS}
          <style>
            body { font-size: 10px!important; font-family: Arial, sans-serif; }
            table { width: auto;
            padding: 1px !important;
              border-collapse: collapse;
              margin-left: auto;
              margin-right: auto; }
            th, td { border: 1px solid #000; padding: 1px!important; text-align: left; }
            @media print { 
            body { margin: 0; } 
          table { width: auto;
            padding: 1px !important;
            border-collapse: collapse;
            margin-left: auto;
            margin-right: auto; }
            th, td { border: 1px solid #000; padding: 1px!important; text-align: left; }
            }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
          <script>
            window.onload = function() { window.print(); window.close(); }
          <\/script>
        </body>
        </html>
      `);
          newWindow.document.close();
        } else {
          console.error("Kh\xF4ng th\u1EC3 m\u1EDF c\u1EEDa s\u1ED5 in");
        }
      } else {
        console.error("Kh\xF4ng t\xECm th\u1EA5y ph\u1EA7n t\u1EED printContent");
      }
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  selectedFile;
  ListBill = this._StorageService.getItem("ListBill") || [];
  isLoading = signal(false);
  // 🔥 Loading indicator (signal)
  uploadMessage = "";
  // Hiển thị thông báo sau khi upload
  onFileSelected(event) {
    this.selectedFile = event.target.files[0];
    this.uploadMessage = "";
    this.uploadFile();
  }
  uploadFile() {
    return __async(this, null, function* () {
      if (!this.selectedFile) {
        alert("Ch\u1ECDn file tr\u01B0\u1EDBc khi upload!");
        return;
      }
      this.isLoading.set(true);
      this.uploadMessage = "";
      const formData = new FormData();
      formData.append("file", this.selectedFile);
      try {
        const response = yield fetch(`${environment.APIURL}/googledrive/upload`, {
          method: "POST",
          body: formData
        });
        if (!response.ok) {
          throw new Error(`L\u1ED7i upload: ${response.statusText}`);
        }
        const data = yield response.json();
        this.ListBill = data.jsonData;
        this._StorageService.setItem("ListBill", this.ListBill);
        console.log(this.ListBill);
        this.uploadMessage = "Upload th\xE0nh c\xF4ng!";
        console.log("Upload th\xE0nh c\xF4ng", data);
      } catch (error) {
        this.uploadMessage = "L\u1ED7i khi upload file!";
        console.error("L\u1ED7i upload file", error);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  GetDonhang(items) {
    return __async(this, null, function* () {
      const query = {
        model: "donhang",
        filters: {
          madonhang: { value: items, type: "in" }
        },
        relations: {
          sanpham: { include: { sanpham: true } },
          khachhang: {
            include: true
          }
        },
        orderBy: { field: "createdAt", direction: "desc" },
        take: 10
      };
      return yield this._SearchService.Search(query);
    });
  }
  updateValue(event, j, i, field, type) {
    const newValue = type === "number" ? Number(event.target.innerText.trim()) || 0 : event.target.innerText.trim();
    const keyboardEvent = event;
    if (keyboardEvent.key === "Enter" && !keyboardEvent.shiftKey) {
      event.preventDefault();
    }
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab"
      ];
      if (!/^\d$/.test(keyboardEvent.key) && !allowedKeys.includes(keyboardEvent.key)) {
        event.preventDefault();
      }
    }
    this.ListBillXuly[j].sanpham[i][field] = newValue;
    const inputs = document.querySelectorAll(".slgiao-input-" + j);
    console.log(inputs);
    if (i < this.getUniqueProducts(this.ListBillXuly).length - 1) {
      const nextInput = inputs[i + 1];
      if (nextInput) {
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
          nextInput.select();
        }
        setTimeout(() => {
          if (document.createRange && window.getSelection) {
            const range = document.createRange();
            range.selectNodeContents(nextInput);
            const selection = window.getSelection();
            selection?.removeAllRanges();
            selection?.addRange(range);
          }
        }, 10);
      }
    }
  }
  /**
   * Update hàng loạt từ Excel Template
   * File Excel cần có sheet "data" với columns: id, nhanvienchiahang, trangthaiin
   */
  UpdateListBill(event) {
    return __async(this, null, function* () {
      try {
        if (event && event.target && event.target.files && event.target.files.length > 0) {
          const file = event.target.files[0];
          if (!file) {
            this._snackBar.open("\u26A0\uFE0F Vui l\xF2ng ch\u1ECDn file Excel", "", {
              duration: 2e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            return;
          }
          console.log("\u{1F4C1} [UpdateListBill] Reading file:", file.name);
          this.isLoading.set(true);
          const reader = new FileReader();
          reader.onload = (e) => __async(this, null, function* () {
            try {
              const data = e.target.result;
              const workbook = readSync(data, { type: "binary" });
              const worksheetName = "data";
              const worksheet = workbook.Sheets[worksheetName];
              if (!worksheet) {
                throw new Error(`Sheet "${worksheetName}" kh\xF4ng t\u1ED3n t\u1EA1i trong file Excel`);
              }
              const jsonData = utils.sheet_to_json(worksheet);
              console.log("\u{1F4CA} [UpdateListBill] Parsed data:", jsonData);
              console.log("\u{1F4CA} [UpdateListBill] Total rows:", jsonData.length);
              if (jsonData.length === 0) {
                throw new Error("File Excel kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
              }
              const firstRow = jsonData[0];
              const hasId = "id" in firstRow;
              const hasNhanvien = "nhanvienchiahang" in firstRow;
              const hasTrangthaiin = "trangthaiin" in firstRow;
              console.log("\u2705 [UpdateListBill] Columns found:", {
                id: hasId,
                nhanvienchiahang: hasNhanvien,
                trangthaiin: hasTrangthaiin
              });
              if (!hasId) {
                throw new Error('File Excel thi\u1EBFu c\u1ED9t "id"');
              }
              let successCount = 0;
              let errorCount = 0;
              const errors = [];
              for (const row of jsonData) {
                try {
                  console.log(`\u{1F50D} [UpdateListBill] Searching order: ${row["id"]}`);
                  const orderData = yield this._DonhangService.SearchField({
                    id: row["id"]
                  });
                  if (!orderData) {
                    const errorMsg = `Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n h\xE0ng: ${row["id"]}`;
                    console.warn(`\u26A0\uFE0F [UpdateListBill] ${errorMsg}`);
                    errors.push(errorMsg);
                    errorCount++;
                    continue;
                  }
                  if (hasNhanvien && row["nhanvienchiahang"] !== void 0 && row["nhanvienchiahang"] !== null) {
                    orderData.nhanvienchiahang = String(row["nhanvienchiahang"]).trim();
                    console.log(`\u{1F4DD} [UpdateListBill] Updating order ${orderData.madonhang}: nhanvienchiahang = "${orderData.nhanvienchiahang}"`);
                  }
                  if (hasTrangthaiin && row["trangthaiin"] !== void 0 && row["trangthaiin"] !== null) {
                    orderData.trangthaiin = String(row["trangthaiin"]).trim();
                    console.log(`\u{1F4DD} [UpdateListBill] Updating order ${orderData.madonhang}: trangthaiin = "${orderData.trangthaiin}"`);
                  }
                  yield this._DonhangService.updateDonhang(orderData);
                  successCount++;
                  console.log(`\u2705 [UpdateListBill] Updated order ${orderData.madonhang}`);
                } catch (err) {
                  const errorMsg = `L\u1ED7i c\u1EADp nh\u1EADt ${row["id"]}: ${err instanceof Error ? err.message : "Unknown error"}`;
                  console.error(`\u274C [UpdateListBill] ${errorMsg}`, err);
                  errors.push(errorMsg);
                  errorCount++;
                }
              }
              console.log("\u{1F4C8} [UpdateListBill] Summary:", { successCount, errorCount, errors });
              let message = `\u2705 C\u1EADp nh\u1EADt th\xE0nh c\xF4ng ${successCount}/${jsonData.length} \u0111\u01A1n h\xE0ng`;
              if (errorCount > 0) {
                message += ` (${errorCount} l\u1ED7i)`;
                if (errors.length > 0 && errors.length <= 3) {
                  message += `
${errors.join("\n")}`;
                }
              }
              this._snackBar.open(message, "", {
                duration: errorCount > 0 ? 5e3 : 3e3,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: successCount > 0 ? ["snackbar-success"] : ["snackbar-error"]
              });
              if (successCount > 0) {
                yield this.loadData();
              }
            } catch (error) {
              console.error("\u274C [UpdateListBill] Error processing Excel:", error);
              this._snackBar.open(`\u274C L\u1ED7i: ${error instanceof Error ? error.message : "Kh\xF4ng th\u1EC3 x\u1EED l\xFD file Excel"}`, "", {
                duration: 4e3,
                horizontalPosition: "end",
                verticalPosition: "top",
                panelClass: ["snackbar-error"]
              });
            } finally {
              this.isLoading.set(false);
            }
          });
          reader.onerror = () => {
            this._snackBar.open("\u274C L\u1ED7i khi \u0111\u1ECDc file Excel", "", {
              duration: 3e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            this.isLoading.set(false);
          };
          reader.readAsBinaryString(file);
        } else {
          console.log("\u{1F4CB} [UpdateListBill] Updating from ListBillXuly:", this.ListBillXuly);
          const updatePromises = this.ListBillXuly.map((v) => __async(this, null, function* () {
            const v1 = yield this._DonhangService.SearchField({
              madonhang: v.madonhang
            });
            v1.sanpham.forEach((v2) => {
              const item = v.sanpham.find((v3) => v3.masp === v2.masp);
              if (item) {
                v2.slgiao = item.slgiao;
              }
            });
            if (v.nhanvienchiahang !== void 0 && v.nhanvienchiahang !== null) {
              v1.nhanvienchiahang = v.nhanvienchiahang;
            }
            console.log("\u{1F4DD} [UpdateListBill] Updating:", v1);
            yield this._DonhangService.updateDonhang(v1);
          }));
          yield Promise.all(updatePromises);
          this._snackBar.open("\u2705 C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (error) {
        console.error("\u274C [UpdateListBill] Error:", error);
        this._snackBar.open("\u274C L\u1ED7i khi c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        this.isLoading.set(false);
      }
    });
  }
  /**
   * Start editing nhân viên chia hàng (select mode)
   */
  startEditNhanvien(row) {
    this.editingNhanvienId = row.id;
    this.searchNhanvienText.set("");
    const currentNhanvien = this.listNhanvien().find((nv) => nv.hoTen === row.nhanvienchiahang || nv.maNV === row.nhanvienchiahang);
    this.selectedNhanvienId = currentNhanvien?.id || null;
    this.tempNhanvienValue = row.nhanvienchiahang || "";
  }
  /**
   * Search nhân viên với debounce để tối ưu hiệu suất
   */
  searchTimeout = null;
  onSearchNhanvien(value) {
    if (this.searchTimeout) {
      clearTimeout(this.searchTimeout);
    }
    this.searchTimeout = setTimeout(() => {
      this.searchNhanvienText.set(value);
    }, 150);
  }
  /**
   * Khi chọn nhân viên từ dropdown
   */
  onNhanvienSelect(nhanvienId) {
    this.selectedNhanvienId = nhanvienId;
    this.searchNhanvienText.set("");
    if (nhanvienId) {
      const nhanvien = this.listNhanvien().find((nv) => nv.id === nhanvienId);
      if (nhanvien) {
        this.tempNhanvienValue = nhanvien.hoTen;
      }
    } else {
      this.tempNhanvienValue = "";
    }
  }
  /**
   * Confirm and save nhân viên chia hàng
   */
  confirmEditNhanvien(row) {
    return __async(this, null, function* () {
      try {
        let nhanvienchiahang = "";
        if (this.selectedNhanvienId) {
          const selectedNhanvien = this.listNhanvien().find((nv) => nv.id === this.selectedNhanvienId);
          if (selectedNhanvien) {
            nhanvienchiahang = selectedNhanvien.hoTen;
          }
        }
        const updateData = {
          id: row.id,
          nhanvienchiahang
        };
        console.log("\u{1F4DD} Updating nhanvienchiahang:", updateData);
        yield this._DonhangService.updateDonhang(updateData);
        row.nhanvienchiahang = nhanvienchiahang;
        this.editingNhanvienId = null;
        this.selectedNhanvienId = null;
        this.tempNhanvienValue = "";
        this.searchNhanvienText.set("");
        this._snackBar.open("\u2705 C\u1EADp nh\u1EADt nh\xE2n vi\xEAn chia h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error updating nhanvienchiahang:", error);
        this._snackBar.open("\u274C L\u1ED7i khi c\u1EADp nh\u1EADt nh\xE2n vi\xEAn", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Cancel editing nhân viên chia hàng
   */
  cancelEditNhanvien() {
    this.editingNhanvienId = null;
    this.selectedNhanvienId = null;
    this.tempNhanvienValue = "";
    this.searchNhanvienText.set("");
  }
  /**
   * Get Nhanvien display name
   */
  getNhanvienName(nhanvienName) {
    return nhanvienName || "";
  }
  /**
   * Get trạng thái in based on printCount
   */
  getTrangthaiIn(row) {
    return (row.printCount || 0) > 0;
  }
  /**
   * Get trạng thái in label
   */
  getTrangthaiInLabel(row) {
    return this.getTrangthaiIn(row) ? "\u0110\xE3 in" : "Ch\u01B0a in";
  }
  static \u0275fac = function ListPhieuchiahangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhieuchiahangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhieuchiahangComponent, selectors: [["app-listphieuchiahang"]], viewQuery: function ListPhieuchiahangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 53, vars: 38, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["dialogCreateTemplate", ""], ["dialogXembill", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "px-2"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center px-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "flex", "flex-row", "flex-wrap", "gap-2", "items-center"], [3, "ngModelChange", "change", "ngModel", "ngModelOptions", "disabled"], ["value", "all", 3, "disabled"], ["value", "khachsi", 3, "disabled"], ["value", "khachle", 3, "disabled"], [3, "appearance", "subscriptSizing"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Nh\u1EA5n \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu chia h\xE0ng", 1, "!h-12", 3, "click"], [1, "flex", "flex-row", "space-x-2"], ["mat-flat-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "w-full", "overflow-auto", "relative"], [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-gray-50", "rounded-lg"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions", "pageSize"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "px-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["hidden", "", "type", "file", 3, "change"], ["class", "flex flex-row items-center space-x-2", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], [1, "flex", "flex-row", "items-center", "space-x-2"], ["role", "status"], ["aria-hidden", "true", "viewBox", "0 0 100 101", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "w-8", "h-8", "text-gray-200", "animate-spin", "dark:text-gray-600", "fill-blue-600"], ["d", "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", "fill", "currentColor"], ["d", "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", "fill", "currentFill"], [1, "sr-only"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "!text-6xl", "!w-24", "!h-24", "text-gray-400", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-4"], [1, "text-blue-600"], [1, "ml-2"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], ["type", "text", "placeholder", "Search", 1, "rounded", "border", "px-2", "py-1", 3, "keyup"], [1, "text-blue-500", "hover:underline", 3, "click"], [1, "text-red-500", "hover:underline", 3, "click"], [1, "text-gray-500", "hover:underline", 3, "click"], [1, "max-h-64", "overflow-y-auto"], ["class", "flex items-center space-x-2 p-2 hover:bg-gray-100 rounded", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "justify-end", "space-x-2", "pt-2", "border-t"], [1, "bg-blue-500", "text-white", "px-4", "py-1", "rounded", "hover:bg-blue-600", 3, "click"], [1, "bg-gray-300", "px-4", "py-1", "rounded", "hover:bg-gray-400", 3, "click"], [1, "flex", "items-center", "space-x-2", "p-2", "hover:bg-gray-100", "rounded", 3, "click"], ["type", "checkbox", 1, "cursor-pointer", 3, "checked"], [1, "whitespace-nowrap"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "min-w-44", "max-w-56"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "flex", "items-center", "gap-1"], ["matTooltip", "Click \u0111\u1EC3 ch\u1ECDn nh\xE2n vi\xEAn", 1, "cursor-pointer", "hover:bg-blue-50", "px-3", "py-2", "rounded-md", "block", "text-sm", "border", "border-dashed", "border-blue-400", "hover:border-blue-600", "transition-colors", "truncate"], ["placeholder", "Ch\u1ECDn nh\xE2n vi\xEAn", "panelClass", "nhanvien-select-panel", 1, "flex-1", "text-sm", "!min-h-8", "nhanvien-select-trigger", 3, "selectionChange", "value"], ["disabled", "", 1, "!sticky", "!top-0", "!z-10", "!bg-white", "!p-0"], [1, "px-3", "py-2", "border-b"], ["type", "text", "placeholder", "\u{1F50D} T\xECm nh\xE2n vi\xEAn...", 1, "w-full", "px-3", "py-2", "text-sm", "border", "border-gray-300", "rounded-md", "focus:outline-none", "focus:ring-2", "focus:ring-blue-500", "focus:border-blue-500", 3, "input", "keydown", "value"], [1, "text-gray-400"], ["disabled", ""], ["mat-icon-button", "", "matTooltip", "X\xE1c nh\u1EADn", 1, "!w-7", "!h-7", "!min-w-7", "!p-0", "!flex", "!items-center", "!justify-center", 3, "click"], [1, "!text-base", "!text-green-600", "!w-4", "!h-4", "!leading-4"], ["mat-icon-button", "", "matTooltip", "H\u1EE7y", 1, "!w-7", "!h-7", "!min-w-7", "!p-0", "!flex", "!items-center", "!justify-center", 3, "click"], [1, "!text-base", "!text-red-600", "!w-4", "!h-4", "!leading-4"], [1, "font-medium"], [1, "text-gray-400", "italic"], ["matTooltip", "Click \u0111\u1EC3 ch\u1ECDn nh\xE2n vi\xEAn", 1, "cursor-pointer", "hover:bg-blue-50", "px-3", "py-2", "rounded-md", "block", "text-sm", "border", "border-dashed", "border-blue-400", "hover:border-blue-600", "transition-colors", "truncate", 3, "click"], [1, "text-gray-800"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click", "ngClass"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "relative", "flex", "flex-col", "!w-screen", "!h-screen"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "font-bold", "p-4", "justify-between"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "w-full", "h-full", "flex", "flex-col", "space-y-8", "items-center", "p-4", "relative", "overflow-x-auto"], ["id", "printContent", 1, "text-left", "rtl:text-right", "leading-none", "p-4"], [1, "p-2", "border", "uppercase", "text-center", "text-[12px]"], ["scope", "col", 1, "w-5", "px-2", "border"], ["scope", "col", 1, "w-20", "px-2", "border"], ["scope", "col", 1, "!w-10", "px-2", "border"], ["scope", "col", "class", "px-2 border", 4, "ngFor", "ngForOf"], ["class", "px-2 border", 4, "ngFor", "ngForOf"], [1, "relative", 3, "align"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false", 3, "click"], ["scope", "col", 1, "px-2", "border"], [1, "!w-20", "flex", "flex-col", "space-y-1", "justify-between"], [1, "!text-[15px]"], [1, "px-2", "border"], ["scope", "row", 1, "w-5", "px-2", "border", "font-medium", "text-gray-900", "whitespace-nowrap"], ["scope", "row", 1, "w-20", "px-2", "border", "font-medium", "text-gray-900", "whitespace-nowrap"], [1, "w-!10", "px-2", "border", "text-start"], ["class", "text-end px-2 border", 4, "ngFor", "ngForOf"], [1, "text-end", "px-2", "border"], [1, "!w-20", "flex", "justify-between", "items-center"], [1, "w-1/2", "px-2", "h-8"], [1, "w-1/2", "flex", "items-center", "justify-end", "px-2", "h-8"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "font-bold", "p-4"], [1, "p-2", "border", "uppercase", "text-center"], ["scope", "col", "class", "w-20 px-2 border", 4, "ngFor", "ngForOf"], ["class", "p-2 border", 4, "ngFor", "ngForOf"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "w-full", "flex", "flex-col", "space-y-1", "justify-between"], [1, "p-2", "border"], [1, "w-20", "px-2", "border", "text-start"], ["class", "w-20 text-end px-2 border", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "w-20", "text-end", "px-2", "border"], [3, "keydown.enter", "contentEditable"]], template: function ListPhieuchiahangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 8)(1, "mat-drawer", 9, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 10);
      \u0275\u0275template(5, ListPhieuchiahangComponent_div_5_Template, 25, 4, "div", 11)(6, ListPhieuchiahangComponent_div_6_Template, 8, 0, "div", 12);
      \u0275\u0275elementStart(7, "div", 13)(8, "mat-button-toggle-group", 14);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_mat_button_toggle_group_ngModelChange_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function ListPhieuchiahangComponent_Template_mat_button_toggle_group_change_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTypeChange($event.value));
      });
      \u0275\u0275elementStart(9, "mat-button-toggle", 15);
      \u0275\u0275text(10, " All ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-button-toggle", 16);
      \u0275\u0275text(12, " S\u1EC9 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-button-toggle", 17);
      \u0275\u0275text(14, " L\u1EBB ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 18)(16, "mat-label");
      \u0275\u0275text(17, "Ch\u1ECDn Th\u1EDDi Gian");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "mat-select", 19);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_mat_select_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.Chonthoigian, $event) || (ctx.Chonthoigian = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhieuchiahangComponent_Template_mat_select_selectionChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSelectionChange($event));
      });
      \u0275\u0275repeaterCreate(19, ListPhieuchiahangComponent_For_20_Template, 2, 2, "mat-option", 20, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "mat-form-field", 18)(22, "mat-label");
      \u0275\u0275text(23, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 21);
      \u0275\u0275listener("dateChange", function ListPhieuchiahangComponent_Template_input_dateChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "mat-datepicker-toggle", 22)(26, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-form-field", 18)(29, "mat-label");
      \u0275\u0275text(30, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "input", 21);
      \u0275\u0275listener("dateChange", function ListPhieuchiahangComponent_Template_input_dateChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_input_ngModelChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "mat-datepicker-toggle", 22)(33, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "button", 23);
      \u0275\u0275listener("click", function ListPhieuchiahangComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchData());
      });
      \u0275\u0275elementStart(36, "mat-icon");
      \u0275\u0275text(37, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "div", 24);
      \u0275\u0275template(39, ListPhieuchiahangComponent_button_39_Template, 2, 0, "button", 25);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div", 26);
      \u0275\u0275template(41, ListPhieuchiahangComponent_Conditional_41_Template, 17, 0, "div", 27);
      \u0275\u0275elementStart(42, "table", 28);
      \u0275\u0275repeaterCreate(43, ListPhieuchiahangComponent_For_44_Template, 3, 1, "ng-container", 29, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(45, ListPhieuchiahangComponent_tr_45_Template, 1, 0, "tr", 30)(46, ListPhieuchiahangComponent_tr_46_Template, 1, 3, "tr", 31)(47, ListPhieuchiahangComponent_tr_47_Template, 3, 0, "tr", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(48, "mat-paginator", 33);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(49, ListPhieuchiahangComponent_ng_template_49_Template, 24, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(51, ListPhieuchiahangComponent_ng_template_51_Template, 24, 3, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r39 = \u0275\u0275reference(27);
      const pickerKetthuc_r40 = \u0275\u0275reference(34);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Type);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(32, _c1))("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.Chonthoigian);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(33, _c1));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.ListDate);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r39);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r39);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r40);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r40);
      \u0275\u0275advance(7);
      \u0275\u0275property("ngIf", ctx.editDonhang.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.Listdonhang().length === 0 ? 41 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(36, _c2, ctx.dataSource.data.length))("pageSize", 10);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatInputModule,
    MatInput,
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
    MatPaginatorModule,
    MatPaginator,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
    MatSelectModule,
    MatSelect,
    MatOption,
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogModule,
    MatDialogClose,
    MatDialogActions
  ], styles: ["\n\n  .nhanvien-select-panel {\n  min-width: 280px !important;\n  max-height: 350px !important;\n}\n  .nhanvien-select-panel .mat-mdc-option {\n  height: auto !important;\n  min-height: 40px;\n  padding: 6px 12px;\n}\n  .nhanvien-select-panel .mat-mdc-option.mdc-list-item--disabled {\n  opacity: 1;\n}\n  .nhanvien-select-panel .mat-mdc-option.mdc-list-item--disabled:first-child {\n  position: sticky;\n  top: 0;\n  z-index: 10;\n  background: white;\n  padding: 0;\n  min-height: auto;\n}\n  .nhanvien-select-panel .mat-mdc-select-panel {\n  max-height: 350px;\n  overflow-y: auto;\n}\n.mat-mdc-option.mdc-list-item--disabled[_ngcontent-%COMP%]   input[_ngcontent-%COMP%] {\n  pointer-events: all !important;\n  cursor: text !important;\n}\n.nhanvien-select-trigger[_ngcontent-%COMP%] {\n  max-width: 140px !important;\n}\n.nhanvien-select-trigger[_ngcontent-%COMP%]     .mat-mdc-select-value {\n  max-width: 120px;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.nhanvien-select-trigger[_ngcontent-%COMP%]     .mat-mdc-select-value-text {\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n  .mat-mdc-icon-button {\n  display: flex !important;\n  align-items: center;\n  justify-content: center;\n}\n  .mat-mdc-icon-button .mat-mdc-button-persistent-ripple, \n  .mat-mdc-icon-button .mat-mdc-button-ripple {\n  display: none;\n}\n  .mat-mdc-icon-button .mat-icon {\n  margin: 0 !important;\n}\n/*# sourceMappingURL=listphieuchiahang.component.css.map */"] });
};
__decorate([
  memoize()
], ListPhieuchiahangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListPhieuchiahangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieuchiahangComponent, { className: "ListPhieuchiahangComponent", filePath: "src/app/admin/phieuchiahang/listphieuchiahang/listphieuchiahang.component.ts", lineNumber: 79 });
})();
function memoize() {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    const cache = /* @__PURE__ */ new Map();
    descriptor.value = function(...args) {
      const key = JSON.stringify(args);
      if (cache.has(key)) {
        return cache.get(key);
      }
      const result = originalMethod.apply(this, args);
      cache.set(key, result);
      return result;
    };
    return descriptor;
  };
}
function Debounce(delay = 300) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let timeoutId;
    descriptor.value = function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
    return descriptor;
  };
}

export {
  ListPhieuchiahangComponent
};
//# sourceMappingURL=chunk-3GCOC5JL.js.map
