import {
  DateHelpers
} from "./chunk-IGEDQWPE.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import {
  DonhangService
} from "./chunk-VONEIXGX.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-S32RIQSG.js";
import {
  GoogleSheetService
} from "./chunk-CB53OP7A.js";
import {
  writeExcelFile
} from "./chunk-OZX2XR6T.js";
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
} from "./chunk-JFLWRVXN.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
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
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
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
  Breakpoints
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  effect,
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
  ɵɵpureFunction0,
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
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieuchuyen/listphieuchuyen/listphieuchuyen.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieuchuyenComponent_div_5_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_div_5_For_14_Template_button_click_0_listener($event) {
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
function ListPhieuchuyenComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 33)(1, "div", 34)(2, "button", 35)(3, "mat-icon");
    \u0275\u0275text(4, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-menu", null, 4)(7, "div", 36)(8, "mat-form-field", 37)(9, "input", 38);
    \u0275\u0275listener("input", function ListPhieuchuyenComponent_div_5_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieuchuyenComponent_div_5_Template_input_click_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-icon", 39);
    \u0275\u0275text(11, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 40);
    \u0275\u0275repeaterCreate(13, ListPhieuchuyenComponent_div_5_For_14_Template, 5, 2, "button", 41, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 42);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_div_5_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "button", 43);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_div_5_Template_button_click_18_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ExportExcel(ctx_r2.Listphieuchuyen(), "Phieuchuyen"));
    });
    \u0275\u0275elementStart(19, "mat-icon");
    \u0275\u0275text(20, "file_download");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "span", 44);
    \u0275\u0275text(22);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r6 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", menu_r6);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1(" ", ctx_r2.Listphieuchuyen().length, " Chuy\u1EBFn ");
  }
}
function ListPhieuchuyenComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 46)(1, "mat-form-field", 47)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 48);
    \u0275\u0275listener("keyup", function ListPhieuchuyenComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 49);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieuchuyenComponent_For_25_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchuyenComponent_For_25_th_1_div_23_Case_2_Template(rf, ctx) {
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
function ListPhieuchuyenComponent_For_25_th_1_div_23_Case_3_Template(rf, ctx) {
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
function ListPhieuchuyenComponent_For_25_th_1_div_23_Case_4_Template(rf, ctx) {
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
function ListPhieuchuyenComponent_For_25_th_1_div_23_Case_5_Template(rf, ctx) {
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
function ListPhieuchuyenComponent_For_25_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 67);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_div_23_Template_div_click_0_listener() {
      const item_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const column_r9 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r11, column_r9));
    });
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_25_th_1_div_23_span_1_Template, 2, 0, "span", 68)(2, ListPhieuchuyenComponent_For_25_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListPhieuchuyenComponent_For_25_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListPhieuchuyenComponent_For_25_th_1_div_23_Case_4_Template, 2, 1, "span")(5, ListPhieuchuyenComponent_For_25_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_22_0;
    const item_r11 = ctx.$implicit;
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItem(item_r11));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_22_0 = column_r9) === "ngaygiao" ? 2 : tmp_22_0 === "updatedAt" ? 3 : tmp_22_0 === "haohut" ? 4 : 5);
  }
}
function ListPhieuchuyenComponent_For_25_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 52)(1, "span", 53);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 54, 6);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 4)(8, "div", 55);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r8);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 56)(10, "input", 57);
    \u0275\u0275listener("keyup", function ListPhieuchuyenComponent_For_25_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r9));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 58)(12, "span", 59);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 60)(15, "div", 61)(16, "span", 62);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r8);
      const column_r9 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r9)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 62);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 62);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 63);
    \u0275\u0275template(23, ListPhieuchuyenComponent_For_25_th_1_div_23_Template, 6, 2, "div", 64);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 65)(25, "button", 66);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r12.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 30);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_25_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r8);
      const menuTrigger_r12 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r12));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r13 = \u0275\u0275reference(7);
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r9], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r13);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r9).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r9))("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r14 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r14 + 1, " ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r15[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r15[column_r9], "% ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r15.soluongtt, "1.0-0"), " ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 73);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 74);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_25_td_2_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 73)(2, ListPhieuchuyenComponent_For_25_td_2_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r15[column_r9] ? 1 : 2);
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r15[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r15[column_r9], " ");
  }
}
function ListPhieuchuyenComponent_For_25_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 70);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_25_td_2_Case_1_Template, 2, 1, "span", 71)(2, ListPhieuchuyenComponent_For_25_td_2_Case_2_Template, 3, 4, "span", 72)(3, ListPhieuchuyenComponent_For_25_td_2_Case_3_Template, 2, 1, "span", 71)(4, ListPhieuchuyenComponent_For_25_td_2_Case_4_Template, 3, 4, "span", 71)(5, ListPhieuchuyenComponent_For_25_td_2_Case_5_Template, 3, 1, "span", 71)(6, ListPhieuchuyenComponent_For_25_td_2_Case_6_Template, 3, 4, "span", 72)(7, ListPhieuchuyenComponent_For_25_td_2_Case_7_Template, 2, 1, "span", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_19_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = column_r9) === "STT" ? 1 : tmp_19_0 === "ngaygiao" ? 2 : tmp_19_0 === "haohut" ? 3 : tmp_19_0 === "soluong" ? 4 : tmp_19_0 === "isActive" ? 5 : tmp_19_0 === "updatedAt" ? 6 : 7);
  }
}
function ListPhieuchuyenComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 18);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_25_th_1_Template, 29, 5, "th", 50)(2, ListPhieuchuyenComponent_For_25_td_2_Template, 8, 1, "td", 51);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function ListPhieuchuyenComponent_tr_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 75);
  }
}
function ListPhieuchuyenComponent_tr_27_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 76);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_tr_27_Template_tr_click_0_listener() {
      const row_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r17));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r2.CheckItemInEdit(row_r17) ? "!bg-slate-200" : "", "");
  }
}
function ListPhieuchuyenComponent_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 77)(1, "td", 78);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieuchuyenComponent_ng_template_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 79)(2, "div", 80);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 81)(7, "button", 82);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 83);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
var ListPhieuchuyenComponent = class _ListPhieuchuyenComponent {
  displayedColumns = [
    "ngaygiao",
    "name",
    "soluong",
    "chuyen",
    "diachi",
    "sdt",
    "gionhanhang",
    "tongsomon",
    "soluongtt",
    "shipper",
    "giodi",
    "giove",
    "kynhan"
  ];
  ColumnName = {
    ngaygiao: "Ng\xE0y giao",
    name: "T\xEAn kh\xE1ch h\xE0ng",
    soluong: "S\u1ED1 l\u01B0\u1EE3ng",
    chuyen: "Chuy\u1EBFn",
    sdt: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    gionhanhang: "Gi\u1EDD nh\u1EADn h\xE0ng",
    tongsomon: "T\u1ED5ng s\u1ED1 m\xF3n",
    soluongtt: "S\u1ED1 l\u01B0\u1EE3ng TT",
    diachi: "\u0110\u1ECBa ch\u1EC9",
    shipper: "Shipper",
    giodi: "Gi\u1EDD \u0111i",
    giove: "Gi\u1EDD v\u1EC1",
    kynhan: "K\xFD nh\u1EADn"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PhieuchuyenColFilter") || "[]");
  Columns = [];
  //pagination
  totalItems = 0;
  pageSize = 100;
  currentPage = 1;
  totalPages = 1;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _PhieuchuyenService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  Listphieuchuyen = this._PhieuchuyenService.ListDonhang;
  EditList = [];
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  isSearch = false;
  SearchParams = {
    Batdau: DateHelpers.now(),
    Ketthuc: DateHelpers.now(),
    Type: "donsi",
    Status: "dadat"
  };
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
    effect(() => {
      this.dataSource.data = this.Listphieuchuyen();
      this.totalItems = this.Listphieuchuyen().length;
      this.calculateTotalPages();
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  onDateChange(event) {
    this.ngOnInit();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.updateDisplayData();
      yield this._PhieuchuyenService.Phieuchuyen(this.SearchParams);
      this.dataSource = new MatTableDataSource(this.Listphieuchuyen());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
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
      localStorage.setItem("PhieuchuyenColFilter", JSON.stringify(this.FilterColumns));
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
    this.dataSource.filteredData = this.Listphieuchuyen().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listphieuchuyen();
    this.dataSource.data = this.Listphieuchuyen();
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
    this.dataSource.data = this.Listphieuchuyen().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
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
    localStorage.setItem("PhieuchuyenColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/phieuchuyen", "new"]);
  }
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  ExportExcel(data, title) {
    const dulieu = data.map((v) => ({
      ngaygiao: (0, import_moment.default)(v.ngaygiao).format("DD/MM/YYYY"),
      name: v.name,
      soluong: v.soluongtt,
      chuyen: v.chuyen,
      sdt: v.sdt,
      gionhanhang: v.gionhanhang,
      tongsomon: v.tongsomon,
      soluongtt: v.soluongtt,
      diachi: v.diachi,
      shipper: v.shipper,
      giodi: v.giodi,
      giove: v.giove,
      kynhan: v.kynhan
    }));
    writeExcelFile(dulieu, title, Object.values(this.ColumnName), this.ColumnName);
  }
  trackByFn(index, item) {
    return item.id;
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size, menuHienthi) {
    if (size > this.Listphieuchuyen().length) {
      this.pageSize = this.Listphieuchuyen().length;
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.Listphieuchuyen().length}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    } else {
      this.pageSize = size;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateDisplayData();
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }
  updateDisplayData() {
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = this.Listphieuchuyen().slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }
  static \u0275fac = function ListPhieuchuyenComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhieuchuyenComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhieuchuyenComponent, selectors: [["app-listphieuchuyen"]], viewQuery: function ListPhieuchuyenComponent_Query(rf, ctx) {
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
  }, decls: 61, vars: 33, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menuHienthi", "matMenuTrigger"], ["menu", "matMenu"], ["DeleteDialog", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], ["class", "border p-1 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg", 4, "ngIf"], ["class", "border p-1 py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "border", "rounded-lg", "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "border", "p-1", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["mat-menu-item", "", 3, "click"], [1, "border", "p-1", "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "lg:w-auto", "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function ListPhieuchuyenComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 7)(1, "mat-drawer", 8, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9);
      \u0275\u0275template(5, ListPhieuchuyenComponent_div_5_Template, 23, 2, "div", 10)(6, ListPhieuchuyenComponent_div_6_Template, 8, 0, "div", 11);
      \u0275\u0275elementStart(7, "div", 12)(8, "mat-form-field", 13)(9, "mat-label");
      \u0275\u0275text(10, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 14);
      \u0275\u0275listener("dateChange", function ListPhieuchuyenComponent_Template_input_dateChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchuyenComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "mat-datepicker-toggle", 15)(13, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "mat-form-field", 13)(16, "mat-label");
      \u0275\u0275text(17, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 14);
      \u0275\u0275listener("dateChange", function ListPhieuchuyenComponent_Template_input_dateChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchuyenComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "mat-datepicker-toggle", 15)(20, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 16)(23, "table", 17);
      \u0275\u0275repeaterCreate(24, ListPhieuchuyenComponent_For_25_Template, 3, 1, "ng-container", 18, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(26, ListPhieuchuyenComponent_tr_26_Template, 1, 0, "tr", 19)(27, ListPhieuchuyenComponent_tr_27_Template, 1, 3, "tr", 20)(28, ListPhieuchuyenComponent_tr_28_Template, 3, 0, "tr", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 22)(30, "div", 23)(31, "span", 24);
      \u0275\u0275text(32, "\u0110ang Xem ");
      \u0275\u0275elementStart(33, "strong");
      \u0275\u0275text(34);
      \u0275\u0275elementEnd();
      \u0275\u0275text(35, " - ");
      \u0275\u0275elementStart(36, "strong");
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "div", 25)(40, "span", 26, 3);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "mat-menu", null, 4)(45, "div", 27);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_div_click_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(46, "span");
      \u0275\u0275text(47, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-form-field", 28)(49, "input", 29);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchuyenComponent_Template_input_ngModelChange_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "button", 30);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r18 = \u0275\u0275reference(41);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuHienthi_r18));
      });
      \u0275\u0275text(51, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(52, "div", 31)(53, "button", 32);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(54, "mat-icon");
      \u0275\u0275text(55, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(56, "button", 32);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_56_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(57, "mat-icon");
      \u0275\u0275text(58, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(59, ListPhieuchuyenComponent_ng_template_59_Template, 11, 0, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r19 = \u0275\u0275reference(14);
      const pickerKetthuc_r20 = \u0275\u0275reference(21);
      const menu_r21 = \u0275\u0275reference(44);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r19);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(30, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r19);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r20);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(31, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r20);
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.currentPage - 1) * ctx.pageSize + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.currentPage * ctx.pageSize > ctx.totalItems ? ctx.totalItems : ctx.currentPage * ctx.pageSize);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.totalItems, " m\u1EE5c, ", ctx.currentPage, "/", ctx.totalPages, " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r21);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize, " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(32, _c1));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.currentPage === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.currentPage === ctx.totalPages);
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
    DecimalPipe,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], ListPhieuchuyenComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListPhieuchuyenComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieuchuyenComponent, { className: "ListPhieuchuyenComponent", filePath: "src/app/admin/phieuchuyen/listphieuchuyen/listphieuchuyen.component.ts", lineNumber: 50 });
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
  ListPhieuchuyenComponent
};
//# sourceMappingURL=chunk-ZLURWLWS.js.map
