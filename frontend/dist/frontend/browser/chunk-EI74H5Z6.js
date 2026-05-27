import {
  DateHelpers
} from "./chunk-CU6ECT62.js";
import {
  TrangThaiDon
} from "./chunk-JX4EGZQX.js";
import {
  DonhangService
} from "./chunk-HN7XISGO.js";
import {
  GoogleSheetService
} from "./chunk-2DPLPREP.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-4I62SID5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-DR2JAJDC.js";
import "./chunk-WNHP5LA7.js";
import {
  writeExcelFile
} from "./chunk-CVAZHUNB.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-QY5L4FGH.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-D7PAKJDY.js";
import {
  Router,
  RouterOutlet
} from "./chunk-2GXGFE2W.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-Y6PF6L3J.js";
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
} from "./chunk-SP2Z3Q73.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TAPSLW5I.js";
import {
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
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
} from "./chunk-TMSN764N.js";
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
  BreakpointObserver,
  Breakpoints
} from "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-TAI2MURD.js";
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
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-SEHLAVZZ.js";
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
var _c2 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieuchuyenComponent_div_5_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
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
    \u0275\u0275elementStart(0, "div", 35)(1, "div", 36)(2, "button", 37)(3, "mat-icon");
    \u0275\u0275text(4, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-menu", null, 4)(7, "div", 38)(8, "mat-form-field", 39)(9, "input", 40);
    \u0275\u0275listener("input", function ListPhieuchuyenComponent_div_5_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieuchuyenComponent_div_5_Template_input_click_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-icon", 41);
    \u0275\u0275text(11, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 42);
    \u0275\u0275repeaterCreate(13, ListPhieuchuyenComponent_div_5_For_14_Template, 5, 2, "button", 43, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 44);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_div_5_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "span", 45);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r6 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("matMenuTriggerFor", menu_r6);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ctx_r2.Listphieuchuyen().length, " Chuy\u1EBFn ");
  }
}
function ListPhieuchuyenComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 47)(1, "mat-form-field", 48)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 49);
    \u0275\u0275listener("keyup", function ListPhieuchuyenComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r7);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 50);
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
function ListPhieuchuyenComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "mat-icon", 51);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 52);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 53);
    \u0275\u0275text(6, " Vui l\xF2ng ch\u1ECDn th\u1EDDi gian t\xECm ki\u1EBFm");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " v\xE0 nh\u1EA5n n\xFAt ");
    \u0275\u0275elementStart(9, "strong", 54);
    \u0275\u0275text(10, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu chuy\u1EC3n ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 32);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_Conditional_26_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchData());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 55);
    \u0275\u0275text(16, "T\xECm Ki\u1EBFm Ngay");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r12[column_r10], "dd/MM/yyyy"));
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r12[column_r10], "dd/MM/yyyy"));
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r12[column_r10], "1.0-0"));
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r12[column_r10], "1.0-0"));
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r12[column_r10] || "Tr\u1ED1ng");
  }
}
function ListPhieuchuyenComponent_For_29_th_1_div_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_div_17_Template_div_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const column_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r12, column_r10));
    });
    \u0275\u0275element(1, "input", 72);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275template(3, ListPhieuchuyenComponent_For_29_th_1_div_17_Case_3_Template, 3, 4, "span", 73)(4, ListPhieuchuyenComponent_For_29_th_1_div_17_Case_4_Template, 3, 4, "span", 73)(5, ListPhieuchuyenComponent_For_29_th_1_div_17_Case_5_Template, 3, 4, "span", 73)(6, ListPhieuchuyenComponent_For_29_th_1_div_17_Case_6_Template, 3, 4, "span", 73)(7, ListPhieuchuyenComponent_For_29_th_1_div_17_Case_7_Template, 2, 1, "span", 73);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_22_0;
    const item_r12 = ctx.$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("checked", ctx_r2.CheckItem(item_r12));
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_22_0 = column_r10) === "ngaygiao" ? 3 : tmp_22_0 === "ngaydat" ? 4 : tmp_22_0 === "tongtien" ? 5 : tmp_22_0 === "thanhtien" ? 6 : 7);
  }
}
function ListPhieuchuyenComponent_For_29_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 58)(1, "span", 59);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 60, 6);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 4)(8, "div", 61);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "input", 62);
    \u0275\u0275listener("keyup", function ListPhieuchuyenComponent_For_29_th_1_Template_input_keyup_9_listener($event) {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r10));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 63);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_span_click_10_listener() {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r10)));
    });
    \u0275\u0275text(11, "Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "span", 64);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_span_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(13, "B\u1ECF Ch\u1ECDn T\u1EA5t C\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 65);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_span_click_14_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(15, "Reset");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 66);
    \u0275\u0275template(17, ListPhieuchuyenComponent_For_29_th_1_div_17_Template, 8, 2, "div", 67);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 68)(19, "button", 69);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_button_click_19_listener() {
      \u0275\u0275restoreView(_r9);
      const menuTrigger_r13 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r13));
    });
    \u0275\u0275text(20, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "button", 70);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_For_29_th_1_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r9);
      const menuTrigger_r13 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r13.closeMenu());
    });
    \u0275\u0275text(22, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r14 = \u0275\u0275reference(7);
    const column_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r10], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r14);
    \u0275\u0275advance(14);
    \u0275\u0275property("ngForOf", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r10))("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r15 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r15 + 1, " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r10], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r10], "% ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16.soluongtt, "1.0-0"), " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c2, row_r16[column_r10] === "dadat", row_r16[column_r10] === "dagiao", row_r16[column_r10] === "danhan", row_r16[column_r10] === "hoanthanh", row_r16[column_r10] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.Trangthaidon[row_r16[column_r10]], " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 78);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 79);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_29_td_2_Case_6_Conditional_1_Template, 2, 0, "mat-icon", 78)(2, ListPhieuchuyenComponent_For_29_td_2_Case_6_Conditional_2_Template, 2, 0, "mat-icon", 79);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r16[column_r10] ? 1 : 2);
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r16[column_r10], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r16[column_r10], " ");
  }
}
function ListPhieuchuyenComponent_For_29_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 74);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_29_td_2_Case_1_Template, 2, 1, "span", 75)(2, ListPhieuchuyenComponent_For_29_td_2_Case_2_Template, 3, 4, "span", 76)(3, ListPhieuchuyenComponent_For_29_td_2_Case_3_Template, 2, 1, "span", 75)(4, ListPhieuchuyenComponent_For_29_td_2_Case_4_Template, 3, 4, "span", 75)(5, ListPhieuchuyenComponent_For_29_td_2_Case_5_Template, 2, 8, "span", 77)(6, ListPhieuchuyenComponent_For_29_td_2_Case_6_Template, 3, 1, "span", 75)(7, ListPhieuchuyenComponent_For_29_td_2_Case_7_Template, 3, 4, "span", 76)(8, ListPhieuchuyenComponent_For_29_td_2_Case_8_Template, 2, 1, "span", 75);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_19_0;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = column_r10) === "STT" ? 1 : tmp_19_0 === "ngaygiao" ? 2 : tmp_19_0 === "haohut" ? 3 : tmp_19_0 === "soluong" ? 4 : tmp_19_0 === "status" ? 5 : tmp_19_0 === "isActive" ? 6 : tmp_19_0 === "updatedAt" ? 7 : 8);
  }
}
function ListPhieuchuyenComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 20);
    \u0275\u0275template(1, ListPhieuchuyenComponent_For_29_th_1_Template, 23, 4, "th", 56)(2, ListPhieuchuyenComponent_For_29_td_2_Template, 9, 1, "td", 57);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r10 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r10);
  }
}
function ListPhieuchuyenComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 80);
  }
}
function ListPhieuchuyenComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 81);
    \u0275\u0275listener("click", function ListPhieuchuyenComponent_tr_31_Template_tr_click_0_listener() {
      const row_r18 = \u0275\u0275restoreView(_r17).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r18));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r2.CheckItemInEdit(row_r18) ? "!bg-slate-200" : "", "");
  }
}
function ListPhieuchuyenComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 82)(1, "td", 83);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieuchuyenComponent_ng_template_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 84)(2, "div", 85);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 86)(7, "button", 87);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 88);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
var ListPhieuchuyenComponent = class _ListPhieuchuyenComponent {
  DateHelpers = DateHelpers;
  displayedColumns = [
    "ngaygiao",
    "name",
    "tongsomon",
    "soluong",
    "soluongtt",
    "loadpoint",
    "machuyen",
    "status",
    "diachi",
    "sdt",
    "gionhanhang",
    "shipper",
    "phieuve",
    "giodi",
    "giove",
    "kynhan"
  ];
  ColumnName = {
    ngaygiao: "Ng\xE0y giao",
    name: "T\xEAn kh\xE1ch h\xE0ng",
    tongsomon: "T\u1ED5ng s\u1ED1 m\xF3n",
    soluong: "S\u1ED1 l\u01B0\u1EE3ng",
    soluongtt: "S\u1ED1 l\u01B0\u1EE3ng TT",
    loadpoint: "Tr\u1ECDng T\u1EA3i",
    machuyen: "M\xE3 Chuy\u1EBFn",
    status: "Tr\u1EA1ng Th\xE1i",
    sdt: "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i",
    gionhanhang: "Gi\u1EDD nh\u1EADn h\xE0ng",
    diachi: "\u0110\u1ECBa ch\u1EC9",
    shipper: "Shipper",
    phieuve: "Phi\u1EBFu v\u1EC1",
    giodi: "Gi\u1EDD \u0111i",
    giove: "Gi\u1EDD v\u1EC1",
    kynhan: "K\xFD nh\u1EADn"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PhieuchuyenColFilter") || "[]");
  Columns = [];
  Trangthaidon = TrangThaiDon;
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
  isLoading = false;
  // 🔥 Thêm loading indicator
  isSearch = false;
  SearchParams = {
    Batdau: (0, import_moment.default)().startOf("day").toDate(),
    // 00:00:00 ngày hiện tại
    Ketthuc: (0, import_moment.default)().endOf("day").toDate()
    // 23:59:59 ngày hiện tại
    // Status:'dadat'
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
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  searchData() {
    return __async(this, null, function* () {
      yield this.loadData();
    });
  }
  onDateChange(event) {
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.updateDisplayData();
      this.initializeColumns();
      this.setupDrawer();
      yield this.loadData();
    });
  }
  loadData() {
    return __async(this, null, function* () {
      this.isLoading = true;
      try {
        yield this._PhieuchuyenService.Phieuchuyen(this.SearchParams);
        this.dataSource = new MatTableDataSource(this.Listphieuchuyen());
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      } catch (error) {
        console.error("Error loading data:", error);
        this._snackBar.open("\u274C L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading = false;
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
      tongsomon: v.tongsomon,
      soluong: v.soluong || v.soluongtt,
      // Fallback if `soluong` is not populated
      soluongtt: v.soluongtt,
      loadpoint: v.loadpoint,
      machuyen: v.machuyen || v.chuyen,
      status: v.status,
      diachi: v.diachi,
      sdt: v.sdt,
      gionhanhang: v.gionhanhang,
      shipper: v.shipper,
      phieuve: v.phieuve,
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
  }, decls: 65, vars: 34, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menuHienthi", "matMenuTrigger"], ["menu", "matMenu"], ["DeleteDialog", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], ["class", "border p-1 cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center bg-white rounded-lg", 4, "ngIf"], ["class", "border p-1 py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Nh\u1EA5n \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu chuy\u1EC3n", 1, "!h-12", 3, "click"], [1, "border", "rounded-lg", "w-full", "h-full", "overflow-auto", "relative"], [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-gray-50", "rounded-lg"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "border", "p-1", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["mat-menu-item", "", 3, "click"], [1, "border", "p-1", "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "lg:w-auto", "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "!text-6xl", "!w-24", "!h-24", "text-gray-400", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-4"], [1, "text-blue-600"], [1, "ml-2"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], ["type", "text", "placeholder", "Search", 1, "rounded", "border", "px-2", "py-1", 3, "keyup"], [1, "text-blue-500", "hover:underline", 3, "click"], [1, "text-red-500", "hover:underline", 3, "click"], [1, "text-gray-500", "hover:underline", 3, "click"], [1, "max-h-64", "overflow-y-auto"], ["class", "flex items-center space-x-2 p-2 hover:bg-gray-100 rounded", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "justify-end", "space-x-2", "pt-2", "border-t"], [1, "bg-blue-500", "text-white", "px-4", "py-1", "rounded", "hover:bg-blue-600", 3, "click"], [1, "bg-gray-300", "px-4", "py-1", "rounded", "hover:bg-gray-400", 3, "click"], [1, "flex", "items-center", "space-x-2", "p-2", "hover:bg-gray-100", "rounded", 3, "click"], ["type", "checkbox", 1, "cursor-pointer", 3, "checked"], [1, "whitespace-nowrap"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function ListPhieuchuyenComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 7)(1, "mat-drawer", 8, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9);
      \u0275\u0275template(5, ListPhieuchuyenComponent_div_5_Template, 20, 2, "div", 10)(6, ListPhieuchuyenComponent_div_6_Template, 8, 0, "div", 11);
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
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "button", 16);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchData());
      });
      \u0275\u0275elementStart(23, "mat-icon");
      \u0275\u0275text(24, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(25, "div", 17);
      \u0275\u0275template(26, ListPhieuchuyenComponent_Conditional_26_Template, 17, 0, "div", 18);
      \u0275\u0275elementStart(27, "table", 19);
      \u0275\u0275repeaterCreate(28, ListPhieuchuyenComponent_For_29_Template, 3, 1, "ng-container", 20, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(30, ListPhieuchuyenComponent_tr_30_Template, 1, 0, "tr", 21)(31, ListPhieuchuyenComponent_tr_31_Template, 1, 3, "tr", 22)(32, ListPhieuchuyenComponent_tr_32_Template, 3, 0, "tr", 23);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "div", 24)(34, "div", 25)(35, "span", 26);
      \u0275\u0275text(36, "\u0110ang Xem ");
      \u0275\u0275elementStart(37, "strong");
      \u0275\u0275text(38);
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " - ");
      \u0275\u0275elementStart(40, "strong");
      \u0275\u0275text(41);
      \u0275\u0275elementEnd();
      \u0275\u0275text(42);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 27)(44, "span", 28, 3);
      \u0275\u0275text(46);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "mat-menu", null, 4)(49, "div", 29);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_div_click_49_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(50, "span");
      \u0275\u0275text(51, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "mat-form-field", 30)(53, "input", 31);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchuyenComponent_Template_input_ngModelChange_53_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 32);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_54_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r19 = \u0275\u0275reference(45);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuHienthi_r19));
      });
      \u0275\u0275text(55, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(56, "div", 33)(57, "button", 34);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_57_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(58, "mat-icon");
      \u0275\u0275text(59, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(60, "button", 34);
      \u0275\u0275listener("click", function ListPhieuchuyenComponent_Template_button_click_60_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(61, "mat-icon");
      \u0275\u0275text(62, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(63, ListPhieuchuyenComponent_ng_template_63_Template, 11, 0, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r20 = \u0275\u0275reference(14);
      const pickerKetthuc_r21 = \u0275\u0275reference(21);
      const menu_r22 = \u0275\u0275reference(48);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r20);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(31, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r20);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r21);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(32, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r21);
      \u0275\u0275advance(7);
      \u0275\u0275conditional(ctx.Listphieuchuyen().length === 0 ? 26 : -1);
      \u0275\u0275advance();
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
      \u0275\u0275property("matMenuTriggerFor", menu_r22);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize, " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(33, _c1));
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieuchuyenComponent, { className: "ListPhieuchuyenComponent", filePath: "src/app/admin/phieuchuyen/listphieuchuyen/listphieuchuyen.component.ts", lineNumber: 51 });
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
//# sourceMappingURL=chunk-EI74H5Z6.js.map
