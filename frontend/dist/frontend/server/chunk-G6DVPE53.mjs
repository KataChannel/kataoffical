import './polyfills.server.mjs';
import {
  DathangService
} from "./chunk-VX6D2TRX.mjs";
import {
  NhacungcapService
} from "./chunk-HVVVXKUA.mjs";
import {
  SanphamService
} from "./chunk-ESYIALWJ.mjs";
import {
  KhachhangService
} from "./chunk-FOXQ7452.mjs";
import {
  BanggiaService
} from "./chunk-UXO2SBGM.mjs";
import {
  excelSerialDateToJSDate,
  readExcelFileNoWorker,
  writeExcelFileSheets
} from "./chunk-C4Q5BIA5.mjs";
import {
  GoogleSheetService
} from "./chunk-TGADPWSB.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatPaginator,
  MatPaginatorModule,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-DWV2CVG4.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix
} from "./chunk-BTD2ENWJ.mjs";
import {
  MatSnackBar
} from "./chunk-A6W66WDU.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-7GJ6SLXG.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  inject,
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction1,
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
  ɵɵviewQuery
} from "./chunk-4EQURZBD.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/banggia/listbanggia/listbanggia.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = (a0) => [100, a0];
var _forTrack0 = ($index, $item) => $item.key;
function ListBanggiaComponent_div_5_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_5_For_19_Template_button_click_0_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleColumn(item_r4);
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
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.value);
  }
}
function ListBanggiaComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16)(1, "div", 17)(2, "button", 18);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_5_Template_button_click_2_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.create());
    });
    \u0275\u0275elementStart(3, "mat-icon");
    \u0275\u0275text(4, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 19);
    \u0275\u0275text(6, "T\u1EA1o M\u1EDBi");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 20)(8, "mat-icon");
    \u0275\u0275text(9, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-menu", null, 1)(12, "div", 21)(13, "mat-form-field", 22)(14, "input", 23);
    \u0275\u0275listener("input", function ListBanggiaComponent_div_5_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterColumns($event));
    })("click", function ListBanggiaComponent_div_5_Template_input_click_14_listener($event) {
      \u0275\u0275restoreView(_r1);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-icon", 24);
    \u0275\u0275text(16, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 25);
    \u0275\u0275repeaterCreate(18, ListBanggiaComponent_div_5_For_19_Template, 5, 2, "button", 26, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "button", 27);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_5_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(23, "button", 28);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_5_Template_button_click_23_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ExportExcel(ctx_r1.Listbanggia(), "Banggia"));
    });
    \u0275\u0275elementStart(24, "mat-icon");
    \u0275\u0275text(25, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 29);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_5_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r1);
      const uploadfile_r5 = \u0275\u0275reference(30);
      return \u0275\u0275resetView(uploadfile_r5.click());
    });
    \u0275\u0275elementStart(27, "mat-icon");
    \u0275\u0275text(28, "file_upload");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(29, "input", 30, 2);
    \u0275\u0275listener("change", function ListBanggiaComponent_div_5_Template_input_change_29_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ImportExcel($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "span", 31);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r6 = \u0275\u0275reference(11);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("matMenuTriggerFor", menu_r6);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.FilterColumns);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1(" ", ctx_r1.CountItem, " B\u1EA3ng Gi\xE1 ");
  }
}
function ListBanggiaComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "mat-form-field", 22)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 34);
    \u0275\u0275listener("keyup", function ListBanggiaComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 35);
    \u0275\u0275listener("click", function ListBanggiaComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isSearch = !ctx_r1.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r11[column_r9], "dd/MM/yyyy"));
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r11[column_r9], "dd/MM/yyyy"));
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r11[column_r9], "%");
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r11 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r11[column_r9] || "Tr\u1ED1ng", "");
  }
}
function ListBanggiaComponent_For_10_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 53);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_div_23_Template_div_click_0_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const column_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r11, column_r9));
    });
    \u0275\u0275template(1, ListBanggiaComponent_For_10_th_1_div_23_span_1_Template, 2, 0, "span", 54)(2, ListBanggiaComponent_For_10_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListBanggiaComponent_For_10_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListBanggiaComponent_For_10_th_1_div_23_Case_4_Template, 2, 1, "span")(5, ListBanggiaComponent_For_10_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const item_r11 = ctx.$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r11));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = column_r9) === "createdAt" ? 2 : tmp_17_0 === "updatedAt" ? 3 : tmp_17_0 === "haohut" ? 4 : 5);
  }
}
function ListBanggiaComponent_For_10_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 38)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 40, 3);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 41);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 42)(10, "input", 43);
    \u0275\u0275listener("keyup", function ListBanggiaComponent_For_10_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterHederColumn($event, column_r9));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 44)(12, "span", 45);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 46)(15, "div", 17)(16, "span", 47);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenAll(ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r9)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 47);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 47);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 48);
    \u0275\u0275template(23, ListBanggiaComponent_For_10_th_1_div_23_Template, 6, 2, "div", 49);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 50)(25, "button", 51);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r12.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 52);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r12));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r13 = \u0275\u0275reference(7);
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r9], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r13);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r9).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r9))("ngForTrackBy", ctx_r1.trackByFn);
  }
}
function ListBanggiaComponent_For_10_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r14 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r14 + 1, " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 58)(1, "mat-icon", 61);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_td_2_Case_2_Template_mat_icon_click_1_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.Banggiamacdinh(row_r16));
    });
    \u0275\u0275text(2, "bookmark");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("!z-10 ", row_r16.isDefault ? "!text-blue-600" : "text-gray-600", "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r16[column_r9]);
  }
}
function ListBanggiaComponent_For_10_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 59)(1, "span", 61);
    \u0275\u0275listener("click", function ListBanggiaComponent_For_10_td_2_Case_3_Template_span_click_1_listener() {
      \u0275\u0275restoreView(_r17);
      const row_r16 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.goToDetail(row_r16));
    });
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r16[column_r9]);
  }
}
function ListBanggiaComponent_For_10_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r9], " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_15_0 = ctx_r1.getName(ctx_r1.ListStatus, "value", row_r16[column_r9])) == null ? null : tmp_15_0.title, " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r9], "dd/MM/yyyy"), " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r9], "dd/MM/yyyy"), " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 62);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListBanggiaComponent_For_10_td_2_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 63);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListBanggiaComponent_For_10_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275template(1, ListBanggiaComponent_For_10_td_2_Case_9_Conditional_1_Template, 2, 0, "mat-icon", 62)(2, ListBanggiaComponent_For_10_td_2_Case_9_Conditional_2_Template, 2, 0, "mat-icon", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r16[column_r9] ? 1 : 2);
  }
}
function ListBanggiaComponent_For_10_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r9], " ");
  }
}
function ListBanggiaComponent_For_10_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 56);
    \u0275\u0275template(1, ListBanggiaComponent_For_10_td_2_Case_1_Template, 2, 1, "span", 57)(2, ListBanggiaComponent_For_10_td_2_Case_2_Template, 5, 4, "span", 58)(3, ListBanggiaComponent_For_10_td_2_Case_3_Template, 3, 1, "span", 59)(4, ListBanggiaComponent_For_10_td_2_Case_4_Template, 2, 1, "span", 57)(5, ListBanggiaComponent_For_10_td_2_Case_5_Template, 2, 1, "span", 57)(6, ListBanggiaComponent_For_10_td_2_Case_6_Template, 3, 4, "span", 57)(7, ListBanggiaComponent_For_10_td_2_Case_7_Template, 3, 4, "span", 57)(8, ListBanggiaComponent_For_10_td_2_Case_8_Template, 3, 4, "span", 60)(9, ListBanggiaComponent_For_10_td_2_Case_9_Template, 3, 1, "span", 57)(10, ListBanggiaComponent_For_10_td_2_Case_10_Template, 3, 4, "span", 60)(11, ListBanggiaComponent_For_10_td_2_Case_11_Template, 2, 1, "span", 57);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_14_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_14_0 = column_r9) === "STT" ? 1 : tmp_14_0 === "mabanggia" ? 2 : tmp_14_0 === "title" ? 3 : tmp_14_0 === "sanpham" ? 4 : tmp_14_0 === "status" ? 5 : tmp_14_0 === "batdau" ? 6 : tmp_14_0 === "ketthuc" ? 7 : tmp_14_0 === "createdAt" ? 8 : tmp_14_0 === "isActive" ? 9 : tmp_14_0 === "updatedAt" ? 10 : 11);
  }
}
function ListBanggiaComponent_For_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 11);
    \u0275\u0275template(1, ListBanggiaComponent_For_10_th_1_Template, 29, 5, "th", 36)(2, ListBanggiaComponent_For_10_td_2_Template, 12, 1, "td", 37);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function ListBanggiaComponent_tr_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 64);
  }
}
function ListBanggiaComponent_tr_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r1.banggiaId() == row_r18.id ? "!bg-slate-200" : "", "");
  }
}
function ListBanggiaComponent_tr_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 66)(1, "td", 67);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var ListBanggiaComponent = class _ListBanggiaComponent {
  Detail = {};
  displayedColumns = [
    "mabanggia",
    "title",
    "type",
    "sanpham",
    "khachhang",
    "batdau",
    "ketthuc",
    //  'order',
    "status",
    // 'isActive',
    "createdAt"
  ];
  ColumnName = {
    mabanggia: "M\xE3 B\u1EA3ng Gi\xE1",
    title: "Ti\xEAu \u0110\u1EC1",
    type: "Lo\u1EA1i",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    khachhang: "Kh\xE1ch H\xE0ng",
    batdau: "B\u1EAFt \u0110\u1EA7u",
    ketthuc: "K\u1EBFt Th\xFAc",
    status: "T\xECnh Tr\u1EA1ng",
    createdAt: "Ng\xE0y T\u1EA1o"
  };
  FilterColumns = JSON.parse(localStorage.getItem("BanggiaColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  filterValues = {};
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _KhachhangService = inject(KhachhangService);
  _NhacungcapService = inject(NhacungcapService);
  _DonhangService = inject(DonhangService);
  _DathangService = inject(DathangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  Listbanggia = this._BanggiaService.ListBanggia;
  dataSource = new MatTableDataSource([]);
  banggiaId = this._BanggiaService.banggiaId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  isSearch = false;
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
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
      yield this._BanggiaService.getAllBanggia();
      this.CountItem = this.Listbanggia().length;
      this.dataSource = new MatTableDataSource(this.Listbanggia());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
      this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
      this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
      this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
      this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
      this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._BanggiaService.getAllBanggia();
    });
  }
  Banggiamacdinh(item) {
    return __async(this, null, function* () {
      const result = yield this._SanphamService.Banggiamacdinh({ banggiaid: item.id });
      if (result && result.status === "success") {
        this._snackBar.open(result.message, "\u0110\xF3ng", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } else {
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi c\u1EADp nh\u1EADt gi\xE1 b\xE1n", "\u0110\xF3ng", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
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
      localStorage.setItem("BanggiaColFilter", JSON.stringify(this.FilterColumns));
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
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    this.dataSource.filteredData = this.Listbanggia().filter((v) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase()) || v[column].toLowerCase().includes(event.target.value.toLowerCase()));
    const query = event.target.value.toLowerCase();
  }
  ListFilter = [];
  ChosenItem(item, column) {
    const CheckItem = this.dataSource.filteredData.filter((v) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
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
    this.ListFilter = this.Listbanggia();
    this.dataSource.data = this.Listbanggia();
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
    this.dataSource.data = this.Listbanggia().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("BanggiaColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/banggia", 0]);
  }
  goToDetail(item) {
    this._BanggiaService.setBanggiaId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/banggia", item.id]);
  }
  convertDataToData1(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const boardKeys = Object.keys(data[0]).filter((key) => !["masp", "title", "giagoc"].includes(key));
    const data1 = boardKeys.map((boardKey) => ({
      mabanggia: boardKey,
      title: `B\u1EA3ng gi\xE1 ${boardKey.replace("BG", "")}`,
      sanpham: data.map((sp) => ({
        masp: sp.masp,
        title: sp.title,
        giagoc: sp.giagoc,
        giaban: sp[boardKey] || 0
      }))
    }));
    return data1;
  }
  DoImportData(data) {
    if (!data.SPBG || !data.BG || !data.BGKH) {
      this._snackBar.open("SPBG ho\u1EB7c BG ho\u1EB7c BGKH kh\xF4ng t\u1ED3n t\u1EA1i", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      return;
    }
    const ListBG = (data.BG || []).map((v) => ({
      id: v.mabanggia,
      mabanggia: v.mabanggia,
      type: v.type,
      batdau: (0, import_moment.default)(excelSerialDateToJSDate(v.batdau)).toDate(),
      ketthuc: (0, import_moment.default)(excelSerialDateToJSDate(v.ketthuc)).toDate(),
      ghichu: v.ghichu,
      status: v.status
    })).filter((v) => v.mabanggia !== void 0 && v.mabanggia !== null && v.mabanggia !== "");
    this._BanggiaService.ImportBanggia(ListBG);
    const ListData = this.convertDataToData1(data.SPBG);
    this._BanggiaService.importSPBG(ListData);
    const BGKH = (data.BGKH || []).map((v) => ({
      mabanggia: v.mabanggia,
      name: v.name,
      makh: v.makh
    }));
    this._BanggiaService.importBGKH(BGKH);
    this._snackBar.open("Import Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  ImportExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFileNoWorker(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
      const ListSP = this._SanphamService.ListSanpham();
      const result = this.convertToData3(data, ListSP);
      yield this._BanggiaService.getAllBanggia();
      let Banggia = this._BanggiaService.ListBanggia();
      const ListKH = Banggia.reduce((acc, v) => {
        if (Array.isArray(v.ListKH)) {
          v.ListKH.forEach((kh) => {
            acc.push({
              mabanggia: v.mabanggia,
              makh: kh.makh,
              name: kh.name
            });
          });
        }
        return acc;
      }, []);
      Banggia = Banggia.map((v) => {
        return {
          mabanggia: v.mabanggia,
          type: v.type,
          batdau: (0, import_moment.default)(v.batdau).format("DD/MM/YYYY"),
          ketthuc: (0, import_moment.default)(v.ketthuc).format("DD/MM/YYYY"),
          ghichu: v.ghichu,
          status: v.status
        };
      });
      writeExcelFileSheets({ "SPBG": { data: result }, "BG": { data: Banggia }, "BGKH": { data: ListKH } }, title);
    });
  }
  convertToData3(data, data2) {
    const pricingTables = new Set(data.map((item) => item.mabanggia));
    return data2.map((product) => __spreadValues({
      masp: product.masp,
      title: product.title,
      giaban: product.giaban.toString()
    }, Array.from(pricingTables).reduce((acc, table) => {
      acc[table] = product.giaban.toString();
      return acc;
    }, {})));
  }
  trackByFn(index, item) {
    return item.id;
  }
  ListStatus = [
    { value: "baogia", title: "B\xE1o Gi\xE1" },
    { value: "dangban", title: "\u0110ang B\xE1n" },
    { value: "ngungban", title: "Ng\u1EEBng B\xE1n" }
  ];
  getName(list, field, value) {
    return list.find((v) => v[field] === value);
  }
  static \u0275fac = function ListBanggiaComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListBanggiaComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListBanggiaComponent, selectors: [["app-listbanggia"]], viewQuery: function ListBanggiaComponent_Query(rf, ctx) {
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
  }, decls: 15, vars: 10, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center p-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "h-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["pageSize", "100", 3, "pageSizeOptions"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "btn-primary", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["mat-menu-item", "", 3, "click"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "flex", "gap-2", "max-w-40", "line-clamp-4", "items-center"], [1, "flex", "max-w-40", "line-clamp-4", "font-bold", "text-blue-700"], [1, "max-w-40", "line-clamp-4", "text-xs"], [3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function ListBanggiaComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-drawer-container", 4)(1, "mat-drawer", 5, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 6);
      \u0275\u0275template(5, ListBanggiaComponent_div_5_Template, 33, 2, "div", 7)(6, ListBanggiaComponent_div_6_Template, 8, 0, "div", 8);
      \u0275\u0275elementStart(7, "div", 9)(8, "table", 10);
      \u0275\u0275repeaterCreate(9, ListBanggiaComponent_For_10_Template, 3, 1, "ng-container", 11, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(11, ListBanggiaComponent_tr_11_Template, 1, 0, "tr", 12)(12, ListBanggiaComponent_tr_12_Template, 1, 3, "tr", 13)(13, ListBanggiaComponent_tr_13_Template, 3, 0, "tr", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(14, "mat-paginator", 15);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(8, _c1, ctx.dataSource.data.length));
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
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
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    MatTooltipModule,
    MatTooltip
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], ListBanggiaComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListBanggiaComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListBanggiaComponent, { className: "ListBanggiaComponent", filePath: "src/app/admin/banggia/listbanggia/listbanggia.component.ts", lineNumber: 51 });
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
  ListBanggiaComponent
};
//# sourceMappingURL=chunk-G6DVPE53.mjs.map
