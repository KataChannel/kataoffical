import {
  DateHelpers
} from "./chunk-CU6ECT62.js";
import {
  TrangThaiDon
} from "./chunk-T6TCKYMX.js";
import {
  KhoService
} from "./chunk-43QJYMYB.js";
import {
  PhieukhoService
} from "./chunk-QBADE6I6.js";
import {
  DathangService
} from "./chunk-23TLPLBD.js";
import {
  DonhangService
} from "./chunk-5Z2QWFRS.js";
import {
  SanphamService
} from "./chunk-LEINIWDA.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-YK4IEOL5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-TVYI4UUP.js";
import "./chunk-JWBKJV3R.js";
import {
  readExcelFileNoWorker,
  writeExcelMultiple
} from "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-XY2N6Z76.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-RUSDLITN.js";
import {
  RouterOutlet
} from "./chunk-AGKEHWOL.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-FL27G2EY.js";
import {
  MatSnackBar
} from "./chunk-43IDDEVP.js";
import {
  MatDatepickerModule
} from "./chunk-Z46IZ3PI.js";
import {
  GraphqlService
} from "./chunk-Y4MVQOE5.js";
import "./chunk-IABB4NTX.js";
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
} from "./chunk-TUEMV45J.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-E3N2TZ4N.js";
import {
  MatSelectModule
} from "./chunk-JNSSVLJO.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-65RDCWJI.js";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatPrefix
} from "./chunk-XDPJU2GK.js";
import "./chunk-SOPKJ4GV.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZRMLZ234.js";
import "./chunk-4ERWVCO4.js";
import "./chunk-U5KYXYKC.js";
import "./chunk-FZT2LBIG.js";
import {
  MatAnchor,
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-BRETK2KI.js";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-EMBYIBW3.js";
import "./chunk-HCACJZKN.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-RKTFENMZ.js";
import {
  EventEmitter,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
} from "./chunk-RBDY2J7V.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/xuatnhapton/xuatnhapton.component.ts
var _c0 = ["drawer"];
var _c1 = (a0) => [10, 25, 100, a0];
var _forTrack0 = ($index, $item) => $item.key;
function XuatnhaptonComponent_For_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_23_Template_button_click_0_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.toggleColumn(item_r3);
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
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 43);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r8[column_r6], "dd/MM/yyyy"));
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r8[column_r6], "dd/MM/yyyy"));
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r8[column_r6], "%");
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r8[column_r6] || "Tr\u1ED1ng", "");
  }
}
function XuatnhaptonComponent_For_29_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_div_23_Template_div_click_0_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const column_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r8, column_r6));
    });
    \u0275\u0275template(1, XuatnhaptonComponent_For_29_th_1_div_23_span_1_Template, 2, 0, "span", 42)(2, XuatnhaptonComponent_For_29_th_1_div_23_Case_2_Template, 3, 4, "span")(3, XuatnhaptonComponent_For_29_th_1_div_23_Case_3_Template, 3, 4, "span")(4, XuatnhaptonComponent_For_29_th_1_div_23_Case_4_Template, 2, 1, "span")(5, XuatnhaptonComponent_For_29_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const item_r8 = ctx.$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r8));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = column_r6) === "createdAt" ? 2 : tmp_18_0 === "updatedAt" ? 3 : tmp_18_0 === "haohut" ? 4 : 5);
  }
}
function XuatnhaptonComponent_For_29_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 29)(1, "span", 30);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 31, 2);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 32);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 33)(10, "input", 8);
    \u0275\u0275listener("keyup", function XuatnhaptonComponent_For_29_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const column_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.doFilterHederColumn($event, column_r6));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 9)(12, "span", 10);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 34)(15, "div", 6)(16, "span", 35);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r5);
      const column_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenAll(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 35);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 35);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 36);
    \u0275\u0275template(23, XuatnhaptonComponent_For_29_th_1_div_23_Template, 6, 2, "div", 37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 38)(25, "button", 39);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r9 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r9.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 40);
    \u0275\u0275listener("click", function XuatnhaptonComponent_For_29_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r9 = \u0275\u0275reference(4);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ApplyFilterColum(menuTrigger_r9));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(7);
    const column_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r6], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6))("ngForTrackBy", ctx_r3.trackByFn);
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r11 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r11 + 1, " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r6], "1.0-2"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r12[column_r6], "1.0-2"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46)(1, "span", 49);
    \u0275\u0275template(2, XuatnhaptonComponent_For_29_td_2_Case_2_Conditional_2_Template, 3, 4, "span")(3, XuatnhaptonComponent_For_29_td_2_Case_2_Conditional_3_Template, 2, 4);
    \u0275\u0275elementStart(4, "span", 50);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r12[column_r6] > 0 ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(6, 2, row_r12 == null ? null : row_r12.slchonhaptt, "1.0-2"), ")");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, row_r12[column_r6], "1.0-2"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r12[column_r6], "1.0-2"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47)(1, "span", 49);
    \u0275\u0275template(2, XuatnhaptonComponent_For_29_td_2_Case_3_Conditional_2_Template, 3, 4, "span")(3, XuatnhaptonComponent_For_29_td_2_Case_3_Conditional_3_Template, 2, 4);
    \u0275\u0275elementStart(4, "span", 50);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r12[column_r6] > 0 ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(6, 2, row_r12 == null ? null : row_r12.slchogiaott, "1.0-2"), ")");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r6], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 51);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 52);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275template(1, XuatnhaptonComponent_For_29_td_2_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 51)(2, XuatnhaptonComponent_For_29_td_2_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r12[column_r6] ? 1 : 2);
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r6], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12[column_r6], " ");
  }
}
function XuatnhaptonComponent_For_29_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 44);
    \u0275\u0275template(1, XuatnhaptonComponent_For_29_td_2_Case_1_Template, 2, 1, "span", 45)(2, XuatnhaptonComponent_For_29_td_2_Case_2_Template, 7, 5, "span", 46)(3, XuatnhaptonComponent_For_29_td_2_Case_3_Template, 7, 5, "span", 47)(4, XuatnhaptonComponent_For_29_td_2_Case_4_Template, 3, 4, "span", 48)(5, XuatnhaptonComponent_For_29_td_2_Case_5_Template, 3, 1, "span", 45)(6, XuatnhaptonComponent_For_29_td_2_Case_6_Template, 3, 4, "span", 48)(7, XuatnhaptonComponent_For_29_td_2_Case_7_Template, 2, 1, "span", 45);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_15_0;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_15_0 = column_r6) === "STT" ? 1 : tmp_15_0 === "slchonhap" ? 2 : tmp_15_0 === "slchogiao" ? 3 : tmp_15_0 === "ngaygiao" ? 4 : tmp_15_0 === "isActive" ? 5 : tmp_15_0 === "updatedAt" ? 6 : 7);
  }
}
function XuatnhaptonComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 21);
    \u0275\u0275template(1, XuatnhaptonComponent_For_29_th_1_Template, 29, 5, "th", 27)(2, XuatnhaptonComponent_For_29_td_2_Template, 8, 1, "td", 28);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r6 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r6);
  }
}
function XuatnhaptonComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 53);
  }
}
function XuatnhaptonComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 54);
  }
}
function XuatnhaptonComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 55)(1, "td", 56);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var XuatnhaptonComponent = class _XuatnhaptonComponent {
  DexuatEmit = new EventEmitter();
  Detail = {};
  displayedColumns = [
    "title",
    "masp",
    "dvt",
    "slton",
    "sltontt"
  ];
  ColumnName = {
    title: "T\xEAn s\u1EA3n ph\u1EA9m",
    masp: "M\xE3 s\u1EA3n ph\u1EA9m",
    dvt: "\u0110\u01A1n v\u1ECB t\xEDnh",
    slton: "SL t\u1ED3n",
    sltontt: "T\u1ED3n th\u1EF1c t\u1EBF Cu\u1ED1i Ng\xE0y"
  };
  FilterColumns = JSON.parse(localStorage.getItem("TonkhoColFilter") || "[]");
  Columns = [];
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _PhieukhoService = inject(PhieukhoService);
  _SanphamService = inject(SanphamService);
  _DathangService = inject(DathangService);
  _DonhangService = inject(DonhangService);
  _GraphqlService = inject(GraphqlService);
  _KhoService = inject(KhoService);
  _breakpointObserver = inject(BreakpointObserver);
  Xuatnhapton = this._PhieukhoService.ListPhieukho;
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    Batdau: DateHelpers.format(DateHelpers.now(), "YYYY-MM-DD"),
    Ketthuc: DateHelpers.format(DateHelpers.add(DateHelpers.now(), 1, "day"), "YYYY-MM-DD"),
    Type: "donsi"
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
  isSearch = false;
  ListKho = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
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
      this.dataSource?.paginator?.firstPage();
    }
  }
  LoadDondathang() {
    return __async(this, null, function* () {
      const ListSLChogiao = yield this._DonhangService.getSLChogiao(this.SearchParams);
      const ListSLChonhap = yield this._DathangService.getSLChonhap(this.SearchParams);
      this.dataSource.data.forEach((v) => {
        const SLChogiao = ListSLChogiao.find((v1) => v1.idSP === v.sanphamId);
        if (SLChogiao) {
          v.slchogiaott = SLChogiao.slchogiaott;
        } else {
          v.slchogiaott = 0;
        }
        const SLChonhap = ListSLChonhap.find((v1) => v1.idSP === v.sanphamId);
        if (SLChonhap) {
          v.slchonhaptt = SLChonhap.slchonhaptt;
        } else {
          v.slchonhaptt = 0;
        }
      });
      this.dataSource.data = this.dataSource.data.filter((v) => v.slchogiaott > 0 || v.slchonhaptt > 0);
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.LoadXuatnhapton();
      this._KhoService.getTonKho("1", "99999").then((res) => {
        this.Xuatnhapton.set(res.data);
        this.dataSource.data = this.Xuatnhapton();
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
      this._GraphqlService;
      this.CountItem = this.Xuatnhapton().length;
    });
  }
  LoadXuatnhapton() {
    return __async(this, null, function* () {
      const ListXuatnhapton = yield this._GraphqlService.findAll("tonkho", {
        aggressiveCache: true,
        enableParallelFetch: true,
        take: 99999
      });
      console.log(ListXuatnhapton);
      this.Xuatnhapton.set(ListXuatnhapton.data);
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
      localStorage.setItem("TonkhoColFilter", JSON.stringify(this.FilterColumns));
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
    localStorage.setItem("TonkhoColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    console.log(column);
    this.dataSource.filteredData = this.Xuatnhapton().filter((v) => removeVietnameseAccents(v[column]).includes(query) || v[column].toLowerCase().includes(query));
  }
  trackByFn(index, item) {
    return item.id;
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
    this.ListFilter = this.Xuatnhapton();
    this.dataSource.data = this.Xuatnhapton();
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
    this.dataSource.data = this.Xuatnhapton().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
      const SP = this._SanphamService.ListSanpham().map((v) => ({
        subtitle: v.subtitle,
        masp: v.masp,
        title: v.title,
        dvt: v.dvt
      }));
      const XNT = this.Xuatnhapton().map((v) => ({
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
        slton: v.slton
      }));
      writeExcelMultiple({ SP, XNT }, title);
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const files = Array.from(event.target.files);
      const data = yield readExcelFileNoWorker(files[0], "XNT");
      const phieuNhapDetails = [];
      const phieuXuatDetails = [];
      data.forEach((v) => {
        const exitItem = this.Xuatnhapton().find((item) => item.masp === v.masp);
        if (exitItem) {
          if (v.slton > exitItem.slton) {
            phieuNhapDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: v.slton - exitItem.slton
              // thêm các trường cần thiết
            });
          } else if (v.slton < exitItem.slton) {
            phieuXuatDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: exitItem.slton - v.slton
              // thêm các trường cần thiết
            });
          }
        }
      });
      if (phieuNhapDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${DateHelpers.format(DateHelpers.now(), "DD/MM/YYYY ")}`,
          type: "nhap",
          sanpham: phieuNhapDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
          ngay: DateHelpers.now()
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${DateHelpers.format(DateHelpers.now(), "DD/MM/YYYY ")}`,
          type: "xuat",
          sanpham: phieuXuatDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
          ngay: DateHelpers.now()
        });
      }
      if (phieuNhapDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh nh\u1EADp kho v\u1EDBi ${phieuNhapDetails.length} s\u1EA3n ph\u1EA9m`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh xu\u1EA5t kho v\u1EDBi ${phieuXuatDetails.length} s\u1EA3n ph\u1EA9m`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
        this._snackBar.open("Kho kh\xF4ng thay \u0111\u1ED5i", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
    });
  }
  _dialog = inject(MatDialog);
  Trangthaidon = TrangThaiDon;
  ListDathang = [];
  ListDonhang = [];
  // Enhanced filtering and sorting properties
  FilteredDathang = [];
  FilteredDonhang = [];
  // Sort properties for Dathang
  dathangSortField = "";
  dathangSortDirection = "asc";
  selectedDathangStatus = "";
  // Sort properties for Donhang
  donhangSortField = "";
  donhangSortDirection = "asc";
  selectedDonhangStatus = "";
  // Date filtering properties
  dathangStartDate = "";
  dathangEndDate = "";
  donhangStartDate = "";
  donhangEndDate = "";
  // Debounce timers for optimized search
  dathangSearchTimeout;
  donhangSearchTimeout;
  Object = Object;
  // For template access
  XemDathang(row, template) {
    return __async(this, null, function* () {
      this.ListDathang = yield this._DathangService.findbysanpham(row.sanphamId);
      console.log(this.ListDathang);
      this.FilteredDathang = [...this.ListDathang];
      this.selectedDathangStatus = "";
      this.dathangSortField = "";
      this.dathangSortDirection = "asc";
      this.dathangStartDate = "";
      this.dathangEndDate = "";
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  XemDonhang(row, template) {
    return __async(this, null, function* () {
      this.ListDonhang = yield this._DonhangService.findbysanpham(row.sanphamId);
      console.log(this.ListDonhang);
      this.FilteredDonhang = [...this.ListDonhang];
      this.selectedDonhangStatus = "";
      this.donhangSortField = "";
      this.donhangSortDirection = "asc";
      this.donhangStartDate = "";
      this.donhangEndDate = "";
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (Number(item?.sanpham[fieldTong]) || 0), 0) || 0;
  }
  gotoDexuat() {
    this.DexuatEmit.emit(false);
  }
  ngOnDestroy() {
    if (this.dathangSearchTimeout) {
      clearTimeout(this.dathangSearchTimeout);
    }
    if (this.donhangSearchTimeout) {
      clearTimeout(this.donhangSearchTimeout);
    }
  }
  // ================== DATHANG FILTERING AND SORTING METHODS ==================
  filterDathangList(event) {
    if (this.dathangSearchTimeout) {
      clearTimeout(this.dathangSearchTimeout);
    }
    this.dathangSearchTimeout = setTimeout(() => {
      const searchTerm = event.target.value?.toLowerCase() || "";
      this.applyDathangFilters(searchTerm);
    }, 300);
  }
  filterDathangByStatus(status) {
    this.selectedDathangStatus = status;
    const searchInput = document.querySelector("#dathangSearch");
    const searchTerm = searchInput?.value?.toLowerCase() || "";
    this.applyDathangFilters(searchTerm);
  }
  clearDathangFilter() {
    this.selectedDathangStatus = "";
    this.dathangStartDate = "";
    this.dathangEndDate = "";
    this.dathangSortField = "";
    this.dathangSortDirection = "asc";
    this.applyDathangFilters("");
  }
  applyDathangFilters(searchTerm) {
    let filtered = [...this.ListDathang];
    if (this.selectedDathangStatus) {
      filtered = filtered.filter((item) => item.status === this.selectedDathangStatus);
    }
    if (this.dathangStartDate || this.dathangEndDate) {
      filtered = this.applyDateRangeFilter(filtered, this.dathangStartDate, this.dathangEndDate);
    }
    if (searchTerm) {
      filtered = this.applySearchFilter(filtered, searchTerm, "dathang");
    }
    this.FilteredDathang = filtered;
    this.applydathangCurrentSort();
  }
  // Optimized date range filter method
  applyDateRangeFilter(items, startDate, endDate) {
    if (!startDate && !endDate)
      return items;
    const start = startDate ? /* @__PURE__ */ new Date(startDate + "T00:00:00") : null;
    const end = endDate ? /* @__PURE__ */ new Date(endDate + "T23:59:59") : null;
    return items.filter((item) => {
      const itemDate = new Date(item.createdAt);
      if (start && itemDate < start)
        return false;
      if (end && itemDate > end)
        return false;
      return true;
    });
  }
  // Optimized search filter method
  applySearchFilter(items, searchTerm, type) {
    const lowerSearchTerm = searchTerm.toLowerCase();
    return items.filter((item) => {
      const searchableFields = type === "dathang" ? [
        item.title,
        item.madathang || item.madncc,
        item.khachhang?.name || item.nhacungcap?.name,
        item.sanpham?.sanpham?.title,
        this.Trangthaidon[item.status]
      ] : [
        item.title,
        item.madonhang,
        item.khachhang?.name,
        item.sanpham?.sanpham?.title,
        this.Trangthaidon[item.status]
      ];
      return searchableFields.some((field) => field?.toString().toLowerCase().includes(lowerSearchTerm));
    });
  }
  sortDathangData(field) {
    if (this.dathangSortField === field) {
      this.dathangSortDirection = this.dathangSortDirection === "asc" ? "desc" : "asc";
    } else {
      this.dathangSortField = field;
      this.dathangSortDirection = "asc";
    }
    this.applydathangCurrentSort();
  }
  applydathangCurrentSort() {
    if (!this.dathangSortField)
      return;
    this.FilteredDathang.sort((a, b) => {
      let aValue;
      let bValue;
      if (this.dathangSortField.includes(".")) {
        const keys = this.dathangSortField.split(".");
        aValue = keys.reduce((obj, key) => obj && obj[key], a);
        bValue = keys.reduce((obj, key) => obj && obj[key], b);
      } else {
        aValue = a[this.dathangSortField];
        bValue = b[this.dathangSortField];
      }
      if (aValue == null && bValue == null)
        return 0;
      if (aValue == null)
        return 1;
      if (bValue == null)
        return -1;
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
      const comparison = aValue.localeCompare(bValue, "vi", { numeric: true });
      return this.dathangSortDirection === "asc" ? comparison : -comparison;
    });
  }
  getDathangSortIcon(field) {
    if (this.dathangSortField !== field) {
      return "unfold_more";
    }
    return this.dathangSortDirection === "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down";
  }
  exportDathangData() {
    if (this.FilteredDathang.length === 0) {
      alert("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t");
      return;
    }
    const dataToExport = this.FilteredDathang.map((item) => ({
      "Ti\xEAu \u0111\u1EC1": item.title || "",
      "M\xE3 \u0110\u1EB7t H\xE0ng": item.madathang || "",
      "Tr\u1EA1ng th\xE1i": this.Trangthaidon[item.status] || "",
      "Kh\xE1ch H\xE0ng": item.khachhang?.name || "",
      "T\xEAn S\u1EA3n Ph\u1EA9m": item.sanpham?.sanpham?.title || "",
      "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t": item.sanpham?.sldat || 0,
      "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn": item.sanpham?.slnhan || 0,
      "Ng\xE0y": this.formatDate(item.createdAt)
    }));
    this.exportToExcel(dataToExport, "dathang-data");
  }
  // ================== DONHANG FILTERING AND SORTING METHODS ==================
  filterDonhangList(event) {
    if (this.donhangSearchTimeout) {
      clearTimeout(this.donhangSearchTimeout);
    }
    this.donhangSearchTimeout = setTimeout(() => {
      const searchTerm = event.target.value?.toLowerCase() || "";
      this.applyDonhangFilters(searchTerm);
    }, 300);
  }
  filterDonhangByStatus(status) {
    this.selectedDonhangStatus = status;
    const searchInput = document.querySelector("#donhangSearch");
    const searchTerm = searchInput?.value?.toLowerCase() || "";
    this.applyDonhangFilters(searchTerm);
  }
  clearDonhangFilter() {
    this.selectedDonhangStatus = "";
    this.donhangStartDate = "";
    this.donhangEndDate = "";
    this.donhangSortField = "";
    this.donhangSortDirection = "asc";
    this.applyDonhangFilters("");
  }
  applyDonhangFilters(searchTerm) {
    let filtered = [...this.ListDonhang];
    if (this.selectedDonhangStatus) {
      filtered = filtered.filter((item) => item.status === this.selectedDonhangStatus);
    }
    if (this.donhangStartDate || this.donhangEndDate) {
      filtered = this.applyDateRangeFilter(filtered, this.donhangStartDate, this.donhangEndDate);
    }
    if (searchTerm) {
      filtered = this.applySearchFilter(filtered, searchTerm, "donhang");
    }
    this.FilteredDonhang = filtered;
    this.applyDonhangCurrentSort();
  }
  sortDonhangData(field) {
    if (this.donhangSortField === field) {
      this.donhangSortDirection = this.donhangSortDirection === "asc" ? "desc" : "asc";
    } else {
      this.donhangSortField = field;
      this.donhangSortDirection = "asc";
    }
    this.applyDonhangCurrentSort();
  }
  applyDonhangCurrentSort() {
    if (!this.donhangSortField)
      return;
    this.FilteredDonhang.sort((a, b) => {
      let aValue;
      let bValue;
      if (this.donhangSortField.includes(".")) {
        const keys = this.donhangSortField.split(".");
        aValue = keys.reduce((obj, key) => obj && obj[key], a);
        bValue = keys.reduce((obj, key) => obj && obj[key], b);
      } else {
        aValue = a[this.donhangSortField];
        bValue = b[this.donhangSortField];
      }
      if (aValue == null && bValue == null)
        return 0;
      if (aValue == null)
        return 1;
      if (bValue == null)
        return -1;
      aValue = String(aValue).toLowerCase();
      bValue = String(bValue).toLowerCase();
      const comparison = aValue.localeCompare(bValue, "vi", { numeric: true });
      return this.donhangSortDirection === "asc" ? comparison : -comparison;
    });
  }
  getDonhangSortIcon(field) {
    if (this.donhangSortField !== field) {
      return "unfold_more";
    }
    return this.donhangSortDirection === "asc" ? "keyboard_arrow_up" : "keyboard_arrow_down";
  }
  exportDonhangData() {
    if (this.FilteredDonhang.length === 0) {
      alert("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t");
      return;
    }
    const dataToExport = this.FilteredDonhang.map((item) => ({
      "Ti\xEAu \u0111\u1EC1": item.title || "",
      "M\xE3 \u0110\u01A1n H\xE0ng": item.madonhang || "",
      "Tr\u1EA1ng th\xE1i": this.Trangthaidon[item.status] || "",
      "Kh\xE1ch H\xE0ng": item.khachhang?.name || "",
      "T\xEAn S\u1EA3n Ph\u1EA9m": item.sanpham?.sanpham?.title || "",
      "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t": item.sanpham?.sldat || 0,
      "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn": item.sanpham?.slnhan || 0,
      "Ng\xE0y": this.formatDate(item.createdAt)
    }));
    this.exportToExcel(dataToExport, "donhang-data");
  }
  // ================== DATE FILTERING METHODS ==================
  filterDathangByDateRange() {
    const searchInput = document.querySelector("#dathangSearch");
    const searchTerm = searchInput?.value?.toLowerCase() || "";
    this.applyDathangFilters(searchTerm);
  }
  filterDonhangByDateRange() {
    const searchInput = document.querySelector("#donhangSearch");
    const searchTerm = searchInput?.value?.toLowerCase() || "";
    this.applyDonhangFilters(searchTerm);
  }
  clearDathangDateFilter() {
    this.dathangStartDate = "";
    this.dathangEndDate = "";
    this.filterDathangByDateRange();
  }
  clearDonhangDateFilter() {
    this.donhangStartDate = "";
    this.donhangEndDate = "";
    this.filterDonhangByDateRange();
  }
  // Quick date filters for Dathang - Optimized
  setDathangDateFilter(days) {
    const today = DateHelpers.format(DateHelpers.now(), "YYYY-MM-DD");
    const startDate = DateHelpers.format(DateHelpers.subtract(DateHelpers.now(), days, "day"), "YYYY-MM-DD");
    this.dathangStartDate = startDate;
    this.dathangEndDate = today;
    this.filterDathangByDateRange();
  }
  // Quick date filters for Donhang - Optimized
  setDonhangDateFilter(days) {
    const today = DateHelpers.format(DateHelpers.now(), "YYYY-MM-DD");
    const startDate = DateHelpers.format(DateHelpers.subtract(DateHelpers.now(), days, "day"), "YYYY-MM-DD");
    this.donhangStartDate = startDate;
    this.donhangEndDate = today;
    this.filterDonhangByDateRange();
  }
  // ================== UTILITY METHODS ==================
  formatDate(date) {
    if (!date)
      return "";
    try {
      return DateHelpers.format(date, "DD/MM/YYYY HH:mm");
    } catch (error) {
      return "";
    }
  }
  exportToExcel(data, filename) {
    const csvContent = this.convertToCSV(data);
    const blob = new Blob(["\uFEFF" + csvContent], { type: "text/csv;charset=utf-8" });
    const link = document.createElement("a");
    const url = URL.createObjectURL(blob);
    link.setAttribute("href", url);
    link.setAttribute("download", `${filename}.csv`);
    link.style.visibility = "hidden";
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  }
  convertToCSV(data) {
    if (data.length === 0)
      return "";
    const headers = Object.keys(data[0]);
    const csvHeaders = headers.join(",");
    const csvRows = data.map((row) => headers.map((header) => {
      const value = row[header];
      return typeof value === "string" && (value.includes(",") || value.includes('"')) ? `"${value.replace(/"/g, '""')}"` : value;
    }).join(","));
    return [csvHeaders, ...csvRows].join("\n");
  }
  static \u0275fac = function XuatnhaptonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XuatnhaptonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _XuatnhaptonComponent, selectors: [["app-xuatnhapton"]], viewQuery: function XuatnhaptonComponent_Query(rf, ctx) {
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
  }, outputs: { DexuatEmit: "DexuatEmit" }, decls: 34, vars: 8, consts: [["drawer", ""], ["menu", "matMenu"], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-14", "w-full", "p-2"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["href", "/admin/chotkho", "matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-flat-button", "", "color", "primary", 1, "whitespace-nowrap"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "excelstyle", "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], ["mat-menu-item", "", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-green-700", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-red-700", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", "text-gray-500"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function XuatnhaptonComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 3)(1, "mat-drawer", 4, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "div", 7)(7, "input", 8);
      \u0275\u0275listener("keyup", function XuatnhaptonComponent_Template_input_keyup_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 9)(9, "span", 10);
      \u0275\u0275text(10, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "button", 11)(12, "mat-icon");
      \u0275\u0275text(13, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-menu", null, 1)(16, "div", 12)(17, "mat-form-field", 13)(18, "input", 14);
      \u0275\u0275listener("input", function XuatnhaptonComponent_Template_input_input_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function XuatnhaptonComponent_Template_input_click_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-icon", 15);
      \u0275\u0275text(20, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(21, "div", 16);
      \u0275\u0275repeaterCreate(22, XuatnhaptonComponent_For_23_Template, 5, 2, "button", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "a", 18);
      \u0275\u0275text(25, " Ch\u1ED1t Kho ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "div", 19)(27, "table", 20);
      \u0275\u0275repeaterCreate(28, XuatnhaptonComponent_For_29_Template, 3, 1, "ng-container", 21, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(30, XuatnhaptonComponent_tr_30_Template, 1, 0, "tr", 22)(31, XuatnhaptonComponent_tr_31_Template, 1, 0, "tr", 23)(32, XuatnhaptonComponent_tr_32_Template, 3, 0, "tr", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(33, "mat-paginator", 25);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const menu_r13 = \u0275\u0275reference(15);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(10);
      \u0275\u0275property("matMenuTriggerFor", menu_r13);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(5);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(6, _c1, ctx.dataSource.data.length));
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
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
    MatAnchor,
    MatButton,
    MatIconButton,
    MatSelectModule,
    CommonModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    MatTooltipModule,
    MatTooltip,
    MatDatepickerModule,
    MatDialogModule
  ], encapsulation: 2 });
};
__decorate([
  memoize()
], XuatnhaptonComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], XuatnhaptonComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(XuatnhaptonComponent, { className: "XuatnhaptonComponent", filePath: "src/app/admin/xuatnhapton/xuatnhapton.component.ts", lineNumber: 55 });
})();
export {
  XuatnhaptonComponent
};
//# sourceMappingURL=chunk-4FUANCSP.js.map
