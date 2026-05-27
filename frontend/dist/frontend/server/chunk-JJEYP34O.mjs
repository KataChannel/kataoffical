import './polyfills.server.mjs';
import {
  DateHelpers
} from "./chunk-EL3N5X44.mjs";
import {
  TrangThaiDon
} from "./chunk-KRKNRXDC.mjs";
import {
  DonhangGraphqlService
} from "./chunk-VATJDZHC.mjs";
import {
  MatProgressBar,
  MatProgressBarModule
} from "./chunk-K3I5UUJH.mjs";
import {
  DonhangService
} from "./chunk-KJDLSRZI.mjs";
import "./chunk-VL2LVL37.mjs";
import "./chunk-NLBLBHTR.mjs";
import {
  GoogleSheetService
} from "./chunk-7OSI4ORM.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-PFX6ZNS2.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-EB4UUH73.mjs";
import "./chunk-5FENH2CU.mjs";
import {
  readExcelFile,
  readExcelFileNoWorkerArray,
  writeExcelFile
} from "./chunk-KMEFW6OC.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import "./chunk-233BLFDB.mjs";
import {
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-TACHADZV.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-DX7YIIY5.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-IQORQLD3.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-AM3BBS5E.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-TLYIA537.mjs";
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
import "./chunk-SLWHV4LF.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
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
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
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
  BreakpointObserver,
  Breakpoints
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
  computed,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-I6KZCWLZ.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import "./chunk-3RMAAFYO.mjs";
import {
  __async,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/donhang/vandon/vandon.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = (a0) => [50, 100, a0];
var _c3 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function VandonComponent_mat_progress_bar_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-progress-bar", 29);
  }
}
function VandonComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 30)(1, "span", 31);
    \u0275\u0275text(2, "L\u1ED7i:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.error(), " ");
  }
}
function VandonComponent_div_7_span_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1, "(\u0110ang t\u1EA3i...)");
    \u0275\u0275elementEnd();
  }
}
function VandonComponent_div_7_For_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function VandonComponent_div_7_For_17_Template_button_click_0_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleColumn(item_r5);
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
function VandonComponent_div_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 32)(1, "div", 33)(2, "span", 34);
    \u0275\u0275text(3);
    \u0275\u0275template(4, VandonComponent_div_7_span_4_Template, 2, 0, "span", 35);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 36)(6, "mat-icon");
    \u0275\u0275text(7, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "mat-menu", null, 3)(10, "div", 37)(11, "mat-form-field", 38)(12, "input", 39);
    \u0275\u0275listener("input", function VandonComponent_div_7_Template_input_input_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterColumns($event));
    })("click", function VandonComponent_div_7_Template_input_click_12_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "mat-icon", 40);
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(15, "div", 41);
    \u0275\u0275repeaterCreate(16, VandonComponent_div_7_For_17_Template, 5, 2, "button", 42, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 43);
    \u0275\u0275listener("click", function VandonComponent_div_7_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 44);
    \u0275\u0275listener("click", function VandonComponent_div_7_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportVandonToExcel());
    });
    \u0275\u0275elementStart(22, "mat-icon");
    \u0275\u0275text(23, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "input", 45, 4);
    \u0275\u0275listener("change", function VandonComponent_div_7_Template_input_change_24_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ImportPhieuChuyenExcel($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(26, "button", 46);
    \u0275\u0275listener("click", function VandonComponent_div_7_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r3);
      const uploadPhieuChuyen_r6 = \u0275\u0275reference(25);
      return \u0275\u0275resetView(uploadPhieuChuyen_r6.click());
    });
    \u0275\u0275elementStart(27, "mat-icon");
    \u0275\u0275text(28, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 47, 5);
    \u0275\u0275listener("change", function VandonComponent_div_7_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ImporExcel($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 48)(32, "button", 49);
    \u0275\u0275listener("click", function VandonComponent_div_7_Template_button_click_32_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.exportF2ToExcel());
    });
    \u0275\u0275elementStart(33, "mat-icon");
    \u0275\u0275text(34, "file_download");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const menu_r7 = \u0275\u0275reference(9);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r1.CountItem, " \u0110\u01A1n H\xE0ng ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.loading());
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r7);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.FilterColumns);
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance(5);
    \u0275\u0275property("disabled", ctx_r1.loading());
    \u0275\u0275advance(6);
    \u0275\u0275property("disabled", ctx_r1.loading());
  }
}
function VandonComponent_div_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 52)(1, "mat-form-field", 38)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 53);
    \u0275\u0275listener("keyup", function VandonComponent_div_8_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 54);
    \u0275\u0275listener("click", function VandonComponent_div_8_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function VandonComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 19);
  }
}
function VandonComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function VandonComponent_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon", 55);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 56);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 57);
    \u0275\u0275text(6, " Vui l\xF2ng ch\u1ECDn th\u1EDDi gian t\xECm ki\u1EBFm");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " v\xE0 nh\u1EA5n n\xFAt ");
    \u0275\u0275elementStart(9, "strong", 58);
    \u0275\u0275text(10, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u v\u1EADn \u0111\u01A1n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 59);
    \u0275\u0275listener("click", function VandonComponent_Conditional_28_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchData());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 60);
    \u0275\u0275text(16, "T\xECm Ki\u1EBFm Ngay");
    \u0275\u0275elementEnd()()();
  }
}
function VandonComponent_div_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 61)(1, "div", 62);
    \u0275\u0275element(2, "mat-spinner", 63);
    \u0275\u0275elementStart(3, "p", 64);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function VandonComponent_For_32_th_1_div_17_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "dd/MM/yyyy"));
  }
}
function VandonComponent_For_32_th_1_div_17_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "dd/MM/yyyy"));
  }
}
function VandonComponent_For_32_th_1_div_17_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "1.0-0"));
  }
}
function VandonComponent_For_32_th_1_div_17_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "1.0-0"));
  }
}
function VandonComponent_For_32_th_1_div_17_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r13[column_r11] || "Tr\u1ED1ng");
  }
}
function VandonComponent_For_32_th_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_div_17_Template_div_click_0_listener() {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const column_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r13, column_r11));
    });
    \u0275\u0275element(1, "input", 81);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275template(3, VandonComponent_For_32_th_1_div_17_Case_3_Template, 3, 4, "span", 82)(4, VandonComponent_For_32_th_1_div_17_Case_4_Template, 3, 4, "span", 82)(5, VandonComponent_For_32_th_1_div_17_Case_5_Template, 3, 4, "span", 82)(6, VandonComponent_For_32_th_1_div_17_Case_6_Template, 3, 4, "span", 82)(7, VandonComponent_For_32_th_1_div_17_Case_7_Template, 2, 1, "span", 82);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_19_0;
    const item_r13 = ctx.$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r1.CheckItem(item_r13));
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_19_0 = column_r11) === "ngaygiao" ? 3 : tmp_19_0 === "ngaydat" ? 4 : tmp_19_0 === "tongtien" ? 5 : tmp_19_0 === "thanhtien" ? 6 : 7);
  }
}
function VandonComponent_For_32_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 67)(1, "span", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 69, 6);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 3)(8, "div", 70);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "input", 71);
    \u0275\u0275listener("keyup", function VandonComponent_For_32_th_1_Template_input_keyup_9_listener($event) {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterHederColumn($event, column_r11));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 72);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenAll(ctx_r1.FilterHederColumn(ctx_r1.dataSource().filteredData, column_r11)));
    });
    \u0275\u0275text(11, "Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 73);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_span_click_12_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(13, "B\u1ECF Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 74);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_span_click_14_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(15, "Reset");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 75);
    \u0275\u0275template(17, VandonComponent_For_32_th_1_div_17_Template, 8, 2, "div", 76);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 77)(19, "button", 78);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r14));
    });
    \u0275\u0275text(20, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 79);
    \u0275\u0275listener("click", function VandonComponent_For_32_th_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r14.closeMenu());
    });
    \u0275\u0275text(22, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r15 = \u0275\u0275reference(7);
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r11], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r15);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r1.FilterHederColumn(ctx_r1.dataSource().filteredData, column_r11))("ngForTrackBy", ctx_r1.trackByFn);
  }
}
function VandonComponent_For_32_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r16 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r16 + 1, " ");
  }
}
function VandonComponent_For_32_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "dd/MM/yyyy"), " ");
  }
}
function VandonComponent_For_32_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c3, row_r17[column_r11] === "dadat", row_r17[column_r11] === "dagiao", row_r17[column_r11] === "danhan", row_r17[column_r11] === "hoanthanh", row_r17[column_r11] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.Trangthaidon[row_r17[column_r11]], " ");
  }
}
function VandonComponent_For_32_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "1.0-2"), " ");
  }
}
function VandonComponent_For_32_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 87);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "1.0-2"), " ");
  }
}
function VandonComponent_For_32_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "1.0-2"), " ");
  }
}
function VandonComponent_For_32_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11], " ");
  }
}
function VandonComponent_For_32_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 83);
    \u0275\u0275template(1, VandonComponent_For_32_td_2_Case_1_Template, 2, 1, "span", 84)(2, VandonComponent_For_32_td_2_Case_2_Template, 3, 4, "span", 84)(3, VandonComponent_For_32_td_2_Case_3_Template, 2, 8, "span", 85)(4, VandonComponent_For_32_td_2_Case_4_Template, 3, 4, "span", 86)(5, VandonComponent_For_32_td_2_Case_5_Template, 3, 4, "span", 87)(6, VandonComponent_For_32_td_2_Case_6_Template, 3, 4, "span", 88)(7, VandonComponent_For_32_td_2_Case_7_Template, 2, 1, "span", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r11) === "STT" ? 1 : tmp_16_0 === "ngaygiao" ? 2 : tmp_16_0 === "status" ? 3 : tmp_16_0 === "sldat" ? 4 : tmp_16_0 === "slgiao" ? 5 : tmp_16_0 === "slnhan" ? 6 : 7);
  }
}
function VandonComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 24);
    \u0275\u0275template(1, VandonComponent_For_32_th_1_Template, 23, 4, "th", 65)(2, VandonComponent_For_32_td_2_Template, 8, 1, "td", 66);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r11 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r11);
  }
}
function VandonComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 89);
  }
}
function VandonComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 90);
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r1.donhangId() == row_r18.id ? "!bg-slate-200" : "", "");
    \u0275\u0275attribute("data-id", row_r18.id);
  }
}
function VandonComponent_tr_35_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 93);
    \u0275\u0275element(1, "mat-spinner", 94);
    \u0275\u0275elementStart(2, "p", 95);
    \u0275\u0275text(3, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
function VandonComponent_tr_35_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0, " Kh\xF4ng t\xECm th\u1EA5y ");
  }
}
function VandonComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 91)(1, "td", 92);
    \u0275\u0275template(2, VandonComponent_tr_35_Conditional_2_Template, 4, 0, "div", 93)(3, VandonComponent_tr_35_Conditional_3_Template, 1, 0);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r1.loading() ? 2 : 3);
  }
}
var VandonComponent = class _VandonComponent {
  DateHelpers = DateHelpers;
  Detail = {};
  displayedColumns = [
    "madonhang",
    "khachhang",
    "title",
    "dvt",
    "sldat",
    "slgiao",
    "slnhan",
    "ngaygiao",
    "status"
  ];
  ColumnName = {
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    khachhang: "Kh\xE1ch H\xE0ng",
    diachi: "\u0110\u1ECBa Ch\u1EC9",
    sdt: "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i",
    status: "Tr\u1EA1ng Th\xE1i",
    masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
    title: "T\xEAn S\u1EA3n Ph\u1EA9m",
    giagoc: "Gi\xE1 G\u1ED1c",
    giaban: "Gi\xE1 B\xE1n",
    dvt: "\u0110\u01A1n V\u1ECB T\xEDnh",
    sldat: "SL \u0110\u1EB7t",
    slgiao: "SL Giao",
    slnhan: "SL Nh\u1EADn",
    slhuy: "SL H\u1EE7y",
    ttdat: "TT \u0110\u1EB7t",
    ttgiao: "TT Giao",
    ttnhan: "TT Nh\u1EADn",
    ttsauvat: "TT Sau VAT",
    vat: "VAT (%)",
    order: "Th\u1EE9 T\u1EF1",
    ghichu: "Ghi Ch\xFA",
    ngaygiao: "Ng\xE0y Giao",
    shipper: "Shipper",
    phieuve: "Phi\u1EBFu V\u1EC1",
    giodi: "Gi\u1EDD \u0110i",
    giove: "Gi\u1EDD V\u1EC1",
    kynhan: "K\xFD Nh\u1EADn"
  };
  FilterColumns = JSON.parse(localStorage.getItem("VandonColFilter") || "[]");
  Columns = [];
  Trangthaidon = TrangThaiDon;
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  // GraphQL Service injection
  _DonhangGraphqlService = inject(DonhangGraphqlService);
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  // Computed data source using GraphQL service với lazy loading
  dataSource = computed(() => {
    const ds = new MatTableDataSource(this.Listvandon);
    ds.filterPredicate = this.createFilter();
    if (this.sort) {
      ds.sort = this.sort;
    }
    return ds;
  });
  // Get signals from GraphQL service
  donhangId = this._DonhangGraphqlService.donhangId;
  loading = this._DonhangGraphqlService.loading;
  error = this._DonhangGraphqlService.error;
  CountItem = 0;
  SearchParams = {
    Batdau: (0, import_moment.default)().startOf("day").toDate(),
    // 00:00:00 ngày hiện tại
    Ketthuc: (0, import_moment.default)().endOf("day").toDate(),
    // 23:59:59 ngày hiện tại
    pageSize: 9999
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
  // Get vandon list from GraphQL service
  get Listvandon() {
    return this._DonhangGraphqlService.ListVandon();
  }
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  searchData() {
    return __async(this, null, function* () {
      yield this.loadData();
    });
  }
  onSelectionChange(event) {
  }
  onDateChange(event) {
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
    this.dataSource().filter = filterValue.trim().toLowerCase();
    if (this.dataSource().paginator) {
      this.dataSource()?.paginator?.firstPage();
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
      yield this.loadData();
    });
  }
  loadData() {
    return __async(this, null, function* () {
      try {
        setTimeout(() => __async(this, null, function* () {
          yield this._DonhangGraphqlService.searchDonhang(this.SearchParams);
          yield this._DonhangService.Phieuchuyen(this.SearchParams);
          this.CountItem = this._DonhangGraphqlService.ListDonhang().length;
          requestAnimationFrame(() => {
            const dataSource = this.dataSource();
            dataSource.data = this.Listvandon;
            dataSource.paginator = this.paginator;
          });
        }), 0);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u:", error);
      }
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._DonhangGraphqlService.searchDonhang(this.SearchParams);
      yield this._DonhangService.Phieuchuyen(this.SearchParams);
    });
  }
  initializeColumns() {
    const allowedColumns = [
      "madonhang",
      "khachhang",
      "title",
      "dvt",
      "sldat",
      "slgiao",
      "slnhan",
      "ngaygiao",
      "status"
    ];
    this.Columns = allowedColumns.map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: this.displayedColumns.includes(key)
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      this.FilterColumns = this.FilterColumns.filter((col) => allowedColumns.includes(col.key));
      localStorage.setItem("VandonColFilter", JSON.stringify(this.FilterColumns));
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
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("VandonColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
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
    const listId1 = this._DonhangGraphqlService.ListDonhang().map((v) => v.masp);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._DonhangGraphqlService.ListDonhang().find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._DonhangGraphqlService.updateDonhang(item1);
      } else {
        yield this._DonhangGraphqlService.CreateDonhang(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._DonhangGraphqlService.ListDonhang().find((v1) => v1.masp === v);
      if (item) {
        item.isActive = false;
        yield this._DonhangGraphqlService.updateDonhang(item);
      }
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
  /**
   * Import Excel phiếu chuyển - Update shipper, phieuve, giodi, giove, kynhan
   */
  ImportPhieuChuyenExcel(event) {
    return __async(this, null, function* () {
      const startTime = Date.now();
      try {
        this._snackBar.open("\u{1F4C2} \u0110ang \u0111\u1ECDc file Excel...", "", {
          duration: void 0,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
        const data = yield readExcelFileNoWorkerArray(event, "Phi\u1EBFu Chuy\u1EC3n");
        if (!data || data.length === 0) {
          this._snackBar.open("\u26A0\uFE0F File kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", "\u0110\xF3ng", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        console.log(`[IMPORT] \u0110\u1ECDc \u0111\u01B0\u1EE3c ${data.length} d\xF2ng t\u1EEB Excel`);
        const result = yield this._DonhangGraphqlService.importPhieuChuyenFromExcel(data);
        const duration = ((Date.now() - startTime) / 1e3).toFixed(1);
        yield this.refresh();
        console.log(`[IMPORT] Ho\xE0n th\xE0nh trong ${duration}s:`, result);
      } catch (error) {
        console.error("[IMPORT] Error:", error);
        this._snackBar.open(`\u274C ${error.message || "L\u1ED7i import"}`, "\u0110\xF3ng", {
          duration: 4e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        event.target.value = "";
      }
    });
  }
  ExportExcel(data, title) {
    writeExcelFile(data, title);
  }
  /**
   * Xuất Excel danh sách vận đơn với loading
   */
  exportVandonToExcel() {
    return __async(this, null, function* () {
      yield this._DonhangGraphqlService.exportVandonToExcel(this.dataSource().filteredData || this.Listvandon);
    });
  }
  /**
   * Xuất Excel cho các sản phẩm theo Hình 2 (Đối soát tồn kho)
   */
  exportF2ToExcel() {
    return __async(this, null, function* () {
      const filterMaSPs = [
        "I100233",
        "I100479",
        "I100164",
        "I100165",
        "I100166",
        "I100003",
        "I100002",
        "I100113",
        "I100207",
        "I100004",
        "I100256"
      ];
      yield this._DonhangGraphqlService.exportFig2InventoryToExcel(filterMaSPs);
    });
  }
  /**
   * Xuất Excel toàn bộ danh sách
   */
  exportAllToExcel() {
    return __async(this, null, function* () {
      yield this._DonhangGraphqlService.exportVandonToExcel();
    });
  }
  FilterHederColumn(list, column) {
    if (!list || list.length === 0)
      return [];
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column])).slice(0, 100);
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    if (!this.Listvandon || this.Listvandon.length === 0)
      return;
    const query = event.target.value.toLowerCase();
    if (query.length < 2 && query.length > 0)
      return;
    requestAnimationFrame(() => {
      this.dataSource().filteredData = this.Listvandon.filter((v) => removeVietnameseAccents(v[column] || "").toLowerCase().includes(query) || (v[column] || "").toString().toLowerCase().includes(query));
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  ListFilter = [];
  ChosenItem(item, column) {
    if (!this.dataSource().filteredData)
      return;
    const CheckItem = this.dataSource().filteredData.filter((v) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list) {
    if (!list)
      return;
    list.forEach((v) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((item) => item.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listvandon || [];
    this.dataSource().data = this.Listvandon || [];
    this.dataSource().sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    if (this.ListFilter.length === 0) {
      this.dataSource().data = [];
    } else {
      this.dataSource().data = this.Listvandon.filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    }
    this.dataSource().sort = this.sort;
    menu.closeMenu();
  }
  static \u0275fac = function VandonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _VandonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _VandonComponent, selectors: [["app-vandon"]], viewQuery: function VandonComponent_Query(rf, ctx) {
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
  }, decls: 37, vars: 30, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menu", "matMenu"], ["uploadPhieuChuyen", ""], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], ["mode", "indeterminate", "color", "primary", 4, "ngIf"], ["class", "bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-4", 4, "ngIf"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center p-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Nh\u1EA5n \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u v\u1EADn \u0111\u01A1n", 1, "!h-12", 3, "click", "disabled"], ["diameter", "20"], [1, "w-full", "overflow-auto", "relative"], [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-gray-50", "rounded-lg"], ["class", "absolute inset-0 bg-white bg-opacity-75 z-10 flex items-center justify-center", 4, "ngIf"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions", "pageSize"], ["mode", "indeterminate", "color", "primary"], [1, "bg-red-100", "border", "border-red-400", "text-red-700", "px-4", "py-3", "rounded", "mb-4"], [1, "font-bold"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", "mr-2"], ["class", "ml-2 animate-pulse text-blue-600", 4, "ngIf"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "Xu\u1EA5t Excel SI\xCAU TH\u1ECA (3 sheet: V\u1EADn \u0111\u01A1n + H\xE0ng Si\xEAu Th\u1ECB + Phi\u1EBFu Chuy\u1EBFn)", "mat-icon-button", "", "color", "accent", 3, "click", "disabled"], ["type", "file", "accept", ".xlsx,.xls", 1, "hidden", 3, "change"], ["matTooltip", "Import Phi\u1EBFu Chuy\u1EC3n (C\u1EADp nh\u1EADt Shipper, Gi\u1EDD \u0111i/v\u1EC1, v.v.)", "mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["type", "file", 1, "hidden", 3, "change"], [1, "flex", "items-center"], ["matTooltip", "Xu\u1EA5t Excel (S\u1EA3n Ph\u1EA9m H\xECnh 2 - \u0110\u1ED1i so\xE1t t\u1ED3n kho)", "mat-icon-button", "", "color", "warn", 3, "click", "disabled"], [1, "ml-2", "animate-pulse", "text-blue-600"], ["mat-menu-item", "", 3, "click"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "!text-6xl", "!w-24", "!h-24", "text-gray-400", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-4"], [1, "text-blue-600"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "ml-2"], [1, "absolute", "inset-0", "bg-white", "bg-opacity-75", "z-10", "flex", "items-center", "justify-center"], [1, "text-center"], ["diameter", "40"], [1, "mt-2", "text-gray-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], ["type", "text", "placeholder", "Search", 1, "rounded", "border", "px-2", "py-1", 3, "keyup"], [1, "text-blue-500", "hover:underline", 3, "click"], [1, "text-red-500", "hover:underline", 3, "click"], [1, "text-gray-500", "hover:underline", 3, "click"], [1, "max-h-64", "overflow-y-auto"], ["class", "flex items-center space-x-2 p-2 hover:bg-gray-100 rounded", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "justify-end", "space-x-2", "pt-2", "border-t"], [1, "bg-blue-500", "text-white", "px-4", "py-1", "rounded", "hover:bg-blue-600", 3, "click"], [1, "bg-gray-300", "px-4", "py-1", "rounded", "hover:bg-gray-400", 3, "click"], [1, "flex", "items-center", "space-x-2", "p-2", "hover:bg-gray-100", "rounded", 3, "click"], ["type", "checkbox", 1, "cursor-pointer", 3, "checked"], [1, "whitespace-nowrap"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "text-right", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-right", "text-orange-600"], [1, "max-w-40", "line-clamp-4", "text-right", "text-green-600"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "text-center", "py-4"], ["diameter", "30"], [1, "mt-2"]], template: function VandonComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 7)(1, "mat-drawer", 8, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9);
      \u0275\u0275template(5, VandonComponent_mat_progress_bar_5_Template, 1, 0, "mat-progress-bar", 10)(6, VandonComponent_div_6_Template, 4, 1, "div", 11)(7, VandonComponent_div_7_Template, 35, 6, "div", 12)(8, VandonComponent_div_8_Template, 8, 0, "div", 13);
      \u0275\u0275elementStart(9, "div", 14)(10, "mat-form-field", 15)(11, "mat-label");
      \u0275\u0275text(12, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 16);
      \u0275\u0275listener("dateChange", function VandonComponent_Template_input_dateChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function VandonComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(14, "mat-datepicker-toggle", 17)(15, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-form-field", 15)(18, "mat-label");
      \u0275\u0275text(19, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "input", 16);
      \u0275\u0275listener("dateChange", function VandonComponent_Template_input_dateChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function VandonComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(21, "mat-datepicker-toggle", 17)(22, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 18);
      \u0275\u0275listener("click", function VandonComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchData());
      });
      \u0275\u0275template(25, VandonComponent_Conditional_25_Template, 1, 0, "mat-spinner", 19)(26, VandonComponent_Conditional_26_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 20);
      \u0275\u0275template(28, VandonComponent_Conditional_28_Template, 17, 0, "div", 21)(29, VandonComponent_div_29_Template, 5, 0, "div", 22);
      \u0275\u0275elementStart(30, "table", 23);
      \u0275\u0275repeaterCreate(31, VandonComponent_For_32_Template, 3, 1, "ng-container", 24, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(33, VandonComponent_tr_33_Template, 1, 0, "tr", 25)(34, VandonComponent_tr_34_Template, 1, 4, "tr", 26)(35, VandonComponent_tr_35_Template, 4, 1, "tr", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(36, "mat-paginator", 28);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const pickerBatdau_r19 = \u0275\u0275reference(16);
      const pickerKetthuc_r20 = \u0275\u0275reference(23);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.error());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r19);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(26, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r19);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r20);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(27, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r20);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 25 : 26);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.loading() && ctx.Listvandon.length === 0 ? 28 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.loading());
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(28, _c2, ctx.dataSource().data.length))("pageSize", 50);
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
    MatSelectModule,
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
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatProgressBarModule,
    MatProgressBar
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], VandonComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(500)
  // Tăng debounce để giảm số lần gọi
], VandonComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(VandonComponent, { className: "VandonComponent", filePath: "src/app/admin/donhang/vandon/vandon.component.ts", lineNumber: 55 });
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
  VandonComponent
};
//# sourceMappingURL=chunk-JJEYP34O.mjs.map
