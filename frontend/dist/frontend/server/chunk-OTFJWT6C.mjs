import './polyfills.server.mjs';
import {
  SharepaginationComponent
} from "./chunk-KG6RBMPF.mjs";
import {
  TrangThaiDon
} from "./chunk-23PZ27G5.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-7QWUG222.mjs";
import {
  MatProgressSpinnerModule
} from "./chunk-PVLDU33E.mjs";
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
  readExcelFileNoWorker,
  writeExcelFileWithSheets
} from "./chunk-C4Q5BIA5.mjs";
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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-7O7BZAOJ.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  GenId
} from "./chunk-I23Q342N.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-RUJ72W7P.mjs";
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
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
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
  Breakpoints,
  MatOption
} from "./chunk-7GJ6SLXG.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
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
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction2,
  ɵɵpureFunction5,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
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
} from "./chunk-4EQURZBD.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/donhang/listdonhang/listdonhang.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = ["dialogImportExcelCu"];
var _c2 = () => ({ standalone: true });
var _c3 = () => ({ id: 1, Title: "\u0110\u01A1n S\u1EC9", value: "donsi" });
var _c4 = () => ({ id: 2, Title: "\u0110\u01A1n L\u1EBB", value: "donle" });
var _c5 = (a0, a1) => [a0, a1];
var _c6 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.fileName;
var _forTrack2 = ($index, $item) => $item.id;
function ListDonhangComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function ListDonhangComponent_For_29_Template_button_click_0_listener($event) {
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
function ListDonhangComponent_button_40_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function ListDonhangComponent_button_40_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      const DeleteDialog_r7 = \u0275\u0275reference(73);
      return \u0275\u0275resetView(ctx_r3.openDeleteDialog(DeleteDialog_r7));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 20);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 36);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275property("value", item_r8.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r8.Title);
  }
}
function ListDonhangComponent_For_65_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_65_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
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
function ListDonhangComponent_For_65_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
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
function ListDonhangComponent_For_65_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r12[column_r10], "%");
  }
}
function ListDonhangComponent_For_65_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r12 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r12[column_r10] || "Tr\u1ED1ng", "");
  }
}
function ListDonhangComponent_For_65_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_div_23_Template_div_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const column_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r12, column_r10));
    });
    \u0275\u0275template(1, ListDonhangComponent_For_65_th_1_div_23_span_1_Template, 2, 0, "span", 61)(2, ListDonhangComponent_For_65_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListDonhangComponent_For_65_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListDonhangComponent_For_65_th_1_div_23_Case_4_Template, 2, 1, "span")(5, ListDonhangComponent_For_65_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    const item_r12 = ctx.$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r12));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = column_r10) === "createdAt" ? 2 : tmp_23_0 === "updatedAt" ? 3 : tmp_23_0 === "haohut" ? 4 : 5);
  }
}
function ListDonhangComponent_For_65_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 50)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 52, 7);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 53);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 15)(10, "input", 16);
    \u0275\u0275listener("keyup", function ListDonhangComponent_For_65_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.doFilterHederColumn($event, column_r10));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 17)(12, "span", 18);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 54)(15, "div", 14)(16, "span", 55);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenAll(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r10)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 55);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 55);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 56);
    \u0275\u0275template(23, ListDonhangComponent_For_65_th_1_div_23_Template, 6, 2, "div", 57);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 58)(25, "button", 59);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r9);
      const menuTrigger_r13 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r13.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 31);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r9);
      const menuTrigger_r13 = \u0275\u0275reference(4);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ApplyFilterColum(menuTrigger_r13));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r14 = \u0275\u0275reference(7);
    const column_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r10], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r14);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r10).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r10))("ngForTrackBy", ctx_r3.trackByFn);
  }
}
function ListDonhangComponent_For_65_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r15 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r15 + 1, " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275listener("click", function ListDonhangComponent_For_65_td_2_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToDetail(row_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r10], " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r10], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r10], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r10].name, " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r10].length, " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c6, row_r17[column_r10] === "dadat", row_r17[column_r10] === "dagiao", row_r17[column_r10] === "danhan", row_r17[column_r10] === "hoanthanh", row_r17[column_r10] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.Trangthaidon[row_r17[column_r10]], " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 70);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_65_td_2_Case_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 71);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_65_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275template(1, ListDonhangComponent_For_65_td_2_Case_8_Conditional_1_Template, 2, 0, "mat-icon", 70)(2, ListDonhangComponent_For_65_td_2_Case_8_Conditional_2_Template, 2, 0, "mat-icon", 71);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r17[column_r10] ? 1 : 2);
  }
}
function ListDonhangComponent_For_65_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r10], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListDonhangComponent_For_65_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r10], " ");
  }
}
function ListDonhangComponent_For_65_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63);
    \u0275\u0275template(1, ListDonhangComponent_For_65_td_2_Case_1_Template, 2, 1, "span", 64)(2, ListDonhangComponent_For_65_td_2_Case_2_Template, 2, 1, "span", 65)(3, ListDonhangComponent_For_65_td_2_Case_3_Template, 3, 4, "span", 66)(4, ListDonhangComponent_For_65_td_2_Case_4_Template, 3, 4, "span", 66)(5, ListDonhangComponent_For_65_td_2_Case_5_Template, 2, 1, "span", 67)(6, ListDonhangComponent_For_65_td_2_Case_6_Template, 2, 1, "span", 67)(7, ListDonhangComponent_For_65_td_2_Case_7_Template, 2, 8, "span", 68)(8, ListDonhangComponent_For_65_td_2_Case_8_Template, 3, 1, "span", 67)(9, ListDonhangComponent_For_65_td_2_Case_9_Template, 3, 4, "span", 66)(10, ListDonhangComponent_For_65_td_2_Case_10_Template, 2, 1, "span", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r10) === "STT" ? 1 : tmp_20_0 === "madonhang" ? 2 : tmp_20_0 === "createdAt" ? 3 : tmp_20_0 === "ngaygiao" ? 4 : tmp_20_0 === "khachhang" ? 5 : tmp_20_0 === "sanpham" ? 6 : tmp_20_0 === "status" ? 7 : tmp_20_0 === "isActive" ? 8 : tmp_20_0 === "updatedAt" ? 9 : 10);
  }
}
function ListDonhangComponent_For_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 41);
    \u0275\u0275template(1, ListDonhangComponent_For_65_th_1_Template, 29, 5, "th", 48)(2, ListDonhangComponent_For_65_td_2_Template, 11, 1, "td", 49);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r10 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r10);
  }
}
function ListDonhangComponent_tr_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 72);
  }
}
function ListDonhangComponent_tr_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 73);
    \u0275\u0275listener("click", function ListDonhangComponent_tr_67_Template_tr_click_0_listener() {
      const row_r19 = \u0275\u0275restoreView(_r18).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.AddToEdit(row_r19));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r19 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r3.CheckItemInEdit(row_r19) ? "!bg-slate-200" : "", "");
  }
}
function ListDonhangComponent_tr_68_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 74)(1, "td", 75);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 110);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const detail_r23 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r3.getOrderProducts(detail_r23).length, " s\u1EA3n ph\u1EA9m | T\u1ED5ng SL: ", ctx_r3.getTotalQuantity(detail_r23), " ");
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 121)(1, "div", 131)(2, "span", 127);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 132);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r24 = ctx.$implicit;
    \u0275\u0275property("value", item_r24.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r24.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("M\xE3: ", item_r24.makh, "");
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 134);
    \u0275\u0275text(1, "auto_fix_high");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 135);
    \u0275\u0275text(3, "T\u1EF1 \u0111\u1ED9ng: ");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint", 122);
    \u0275\u0275template(1, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_30_Conditional_1_Template, 4, 0);
    \u0275\u0275elementStart(2, "span", 133);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r23 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(detail_r23.autoSelected ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getSelectedCustomer(detail_r23).name);
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 142)(1, "td", 147);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 148);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 147);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 147);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 149);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r25 = ctx.$implicit;
    const \u0275$index_439_r26 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_439_r26 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r25.masp || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r25.title || product_r25.name || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r25.dvt || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r25.slgiao || product_r25.soluong || 0);
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 150);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 124)(1, "h4", 136);
    \u0275\u0275text(2, "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 137)(4, "table", 138)(5, "thead", 139)(6, "tr")(7, "th", 140);
    \u0275\u0275text(8, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 140);
    \u0275\u0275text(10, "M\xE3 SP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 140);
    \u0275\u0275text(12, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 140);
    \u0275\u0275text(14, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 140);
    \u0275\u0275text(16, "SL Giao");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody", 141);
    \u0275\u0275repeaterCreate(18, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_For_19_Template, 11, 5, "tr", 142, \u0275\u0275repeaterTrackByIndex, false, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_ForEmpty_20_Template, 3, 0, "tr");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "tfoot", 143)(22, "tr", 144)(23, "td", 145);
    \u0275\u0275text(24, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 146);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const detail_r23 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r3.getOrderProducts(detail_r23));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.getTotalQuantity(detail_r23));
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 130)(1, "span", 94);
    \u0275\u0275text(2, "Ghi ch\xFA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 151);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r23 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(detail_r23.message);
  }
}
function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 104)(1, "div", 105)(2, "div", 106)(3, "mat-checkbox", 107);
    \u0275\u0275listener("change", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_mat_checkbox_change_3_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_319_r22 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleOrderConfirmation(\u0275$index_319_r22));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 108);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 100);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 109);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_11_Template, 2, 2, "p", 110);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 111)(13, "button", 112);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_319_r22 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleOrderExpansion(\u0275$index_319_r22));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 113);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r21);
      const detail_r23 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeItemImport(detail_r23));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 114)(20, "mat-form-field", 115)(21, "mat-label");
    \u0275\u0275text(22, "Kh\xE1ch h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "mat-select", 116);
    \u0275\u0275listener("selectionChange", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_mat_select_selectionChange_23_listener($event) {
      \u0275\u0275restoreView(_r21);
      const detail_r23 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.SelectKhachhang(detail_r23, $event));
    });
    \u0275\u0275elementStart(24, "div", 117)(25, "mat-form-field", 118)(26, "input", 119);
    \u0275\u0275listener("input", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_input_input_26_listener($event) {
      \u0275\u0275restoreView(_r21);
      const \u0275$index_319_r22 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.DoFindKhachhang($event, \u0275$index_319_r22));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 120);
    \u0275\u0275repeaterCreate(28, ListDonhangComponent_ng_template_70_For_31_Conditional_0_For_29_Template, 6, 3, "mat-option", 121, _forTrack2);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_30_Template, 4, 2, "mat-hint", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 115)(32, "mat-label");
    \u0275\u0275text(33, "Ng\xE0y giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 123);
    \u0275\u0275listener("dateChange", function ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template_input_dateChange_34_listener($event) {
      \u0275\u0275restoreView(_r21);
      const detail_r23 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.DoChonNgaygiao($event, detail_r23));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "mat-datepicker-toggle", 38)(36, "mat-datepicker", null, 9);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_38_Template, 27, 2, "div", 124);
    \u0275\u0275elementStart(39, "div", 125)(40, "div", 126)(41, "div")(42, "span", 94);
    \u0275\u0275text(43, "File:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 127);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div")(47, "span", 94);
    \u0275\u0275text(48, "S\u1EA3n ph\u1EA9m:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 128);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "span", 94);
    \u0275\u0275text(53, "T\u1ED5ng SL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 129);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(57, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Conditional_57_Template, 5, 1, "div", 130);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_29_0;
    const orderDatePicker_r27 = \u0275\u0275reference(37);
    const ctx_r27 = \u0275\u0275nextContext();
    const detail_r23 = ctx_r27.$implicit;
    const \u0275$index_319_r22 = ctx_r27.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", (detail_r23.configOptions == null ? null : detail_r23.configOptions.confirmed) ? "border-green-500 bg-green-50" : "border-gray-300");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", (detail_r23.configOptions == null ? null : detail_r23.configOptions.confirmed) || false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(detail_r23.tenkhongdau || "Kh\xE1ch h\xE0ng ch\u01B0a x\xE1c \u0111\u1ECBnh");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" File: ", detail_r23.fileName, " | Tr\u1EA1ng th\xE1i: ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r23.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.getOrderProducts(detail_r23).length > 0 ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(detail_r23.expanded ? "expand_less" : "expand_more");
    \u0275\u0275advance(8);
    \u0275\u0275property("value", (tmp_29_0 = ctx_r3.getSelectedCustomer(detail_r23)) == null ? null : tmp_29_0.id);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.FilterKhachhang[\u0275$index_319_r22]);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.getSelectedCustomer(detail_r23) ? 30 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", orderDatePicker_r27)("ngModel", detail_r23.ngaygiao);
    \u0275\u0275advance();
    \u0275\u0275property("for", orderDatePicker_r27);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(detail_r23.expanded ? 38 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(detail_r23.fileName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getOrderProducts(detail_r23).length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(56, 17, ctx_r3.getTotalQuantity(detail_r23), "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(detail_r23.message ? 57 : -1);
  }
}
function ListDonhangComponent_ng_template_70_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListDonhangComponent_ng_template_70_For_31_Conditional_0_Template, 58, 20, "div", 104);
  }
  if (rf & 2) {
    const detail_r23 = ctx.$implicit;
    \u0275\u0275conditional(detail_r23.status === "Processed" ? 0 : -1);
  }
}
function ListDonhangComponent_ng_template_70_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 88)(1, "div", 152);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng \u0111\u1EC3 import");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 153);
    \u0275\u0275text(4, "Vui l\xF2ng ch\u1ECDn file Excel h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_70_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 76)(1, "span");
    \u0275\u0275text(2, "Import \u0110\u01A1n H\xE0ng t\u1EEB Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 77);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 78)(6, "div", 79)(7, "div", 80)(8, "div", 81)(9, "mat-form-field", 82)(10, "mat-label");
    \u0275\u0275text(11, "Ng\xE0y giao (T\u1EA5t c\u1EA3)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 83);
    \u0275\u0275listener("dateChange", function ListDonhangComponent_ng_template_70_Template_input_dateChange_12_listener($event) {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.DoChonNgaygiao($event, "All"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "mat-datepicker-toggle", 38)(14, "mat-datepicker", null, 8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 31);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleAllOrderConfirmation());
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 84);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleAllOrdersExpansion());
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 85);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.autoSelectCustomersFromFilename());
    });
    \u0275\u0275elementStart(25, "mat-icon");
    \u0275\u0275text(26, "auto_fix_high");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " T\u1EF1 \u0111\u1ED9ng ch\u1ECDn KH ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 86)(29, "div", 87);
    \u0275\u0275repeaterCreate(30, ListDonhangComponent_ng_template_70_For_31_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, ListDonhangComponent_ng_template_70_Conditional_32_Template, 5, 0, "div", 88);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "mat-dialog-actions", 89)(34, "div", 90)(35, "div", 91)(36, "div", 92)(37, "div", 93);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 94);
    \u0275\u0275text(40, "T\u1ED5ng \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 95)(42, "div", 96);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 94);
    \u0275\u0275text(45, "\u0110\xE3 ch\u1ECDn");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 97)(47, "div", 98);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 94);
    \u0275\u0275text(51, "T\u1ED5ng SP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 99)(53, "div", 100);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 101)(56, "button", 102);
    \u0275\u0275text(57, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 103);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_70_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r20);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ImportConfirmedDonhang());
    });
    \u0275\u0275text(59);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const globalDatePicker_r29 = \u0275\u0275reference(15);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r3.statusDetails.length, " \u0111\u01A1n h\xE0ng - ", ctx_r3.getConfirmedOrdersCount(), " \u0111\xE3 x\xE1c nh\u1EADn ");
    \u0275\u0275advance(8);
    \u0275\u0275property("matDatepicker", globalDatePicker_r29);
    \u0275\u0275advance();
    \u0275\u0275property("for", globalDatePicker_r29);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getConfirmedOrdersCount() === ctx_r3.getProcessedOrdersCount() ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.getConfirmedOrdersCount() === ctx_r3.getProcessedOrdersCount() ? "B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3" : "Ch\u1ECDn t\u1EA5t c\u1EA3", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.allOrdersExpanded() ? "unfold_less" : "unfold_more");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.allOrdersExpanded() ? "Thu g\u1ECDn t\u1EA5t c\u1EA3" : "M\u1EDF r\u1ED9ng t\u1EA5t c\u1EA3", " ");
    \u0275\u0275advance(7);
    \u0275\u0275repeater(ctx_r3.statusDetails);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.getProcessedOrdersCount() === 0 ? 32 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getProcessedOrdersCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getConfirmedOrdersCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(49, 17, ctx_r3.getTotalProducts(), "1.0-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" \u0110\xE3 ch\u1ECDn ", ctx_r3.getConfirmedOrdersCount(), " / ", ctx_r3.getProcessedOrdersCount(), " \u0111\u01A1n h\xE0ng ");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r3.getConfirmedOrdersCount() === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Import ", ctx_r3.getConfirmedOrdersCount(), " \u0111\u01A1n h\xE0ng ");
  }
}
function ListDonhangComponent_ng_template_72_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 154)(2, "div", 155);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 156)(7, "button", 157);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 102);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
var ListDonhangComponent = class _ListDonhangComponent {
  displayedColumns = [
    "madonhang",
    "name",
    "sanpham",
    "ngaygiao",
    "ghichu",
    "status",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    name: "Kh\xE1ch H\xE0ng",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    ngaygiao: "Ng\xE0y Giao",
    ghichu: "Ghi Ch\xFA",
    status: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("DonhangColFilter") || "[]");
  Columns = [];
  isLoading = signal(false);
  paginator;
  sort;
  drawer;
  dialogImportExcelCu;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _KhachhangService = inject(KhachhangService);
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _router = inject(Router);
  Listdonhang = signal({});
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  Trangthaidon = TrangThaiDon;
  SearchParams = {
    Batdau: (0, import_moment.default)().toDate(),
    Ketthuc: (0, import_moment.default)().toDate(),
    Type: "donsi",
    pageSize: 10,
    pageNumber: 1
  };
  pageSize = signal(10);
  page = signal(1);
  total = signal(0);
  pageCount = signal(0);
  FilterKhachhang = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
  }
  onPageChange(event) {
    return __async(this, null, function* () {
      console.log("Page change event:", event);
      this.isLoading.set(true);
      try {
        this.SearchParams.pageSize = event.pageSize;
        this.SearchParams.pageNumber = event.page;
        yield this.LoadData();
      } catch (error) {
        console.error("Error changing page:", error);
        this._snackBar.open("L\u1ED7i khi chuy\u1EC3n trang", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  LoadData() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        if (!this._KhachhangService.ListKhachhang()?.length) {
          yield this._KhachhangService.getKhachhangBy({ page: 1, pageSize: 9999 });
        }
        const data = yield this._DonhangService.searchDonhang(this.SearchParams);
        this.Listdonhang.set(data);
        if (data && data.data) {
          this.total.set(Number(data.total || 0));
          this.pageSize.set(Number(data.pageSize || 10));
          this.page.set(Number(data.pageNumber || 1));
          this.pageCount.set(Number(data.totalPages || 1));
          this.dataSource = new MatTableDataSource(data.data);
          this.dataSource.paginator = null;
          this.dataSource.sort = null;
        } else {
          this.total.set(0);
          this.pageSize.set(10);
          this.page.set(1);
          this.pageCount.set(0);
          this.dataSource = new MatTableDataSource([]);
        }
      } catch (error) {
        console.error("Error loading data:", error);
        this._snackBar.open("L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        this.total.set(0);
        this.pageCount.set(0);
        this.dataSource = new MatTableDataSource([]);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  onSelectionChange(event) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        const timeFrames = {
          day: () => {
            this.SearchParams.Batdau = (0, import_moment.default)().startOf("day").format("YYYY-MM-DD");
            this.SearchParams.Ketthuc = (0, import_moment.default)().endOf("day").format("YYYY-MM-DD");
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
        const selectedTimeFrame = timeFrames[event.value];
        if (selectedTimeFrame) {
          selectedTimeFrame();
          this.SearchParams.pageNumber = 1;
          yield this.LoadData();
        }
      } catch (error) {
        console.error("Error changing time selection:", error);
        this._snackBar.open("L\u1ED7i khi thay \u0111\u1ED5i th\u1EDDi gian", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  onDateChange(event) {
    this.isLoading.set(true);
    try {
      this.SearchParams.pageNumber = 1;
      this.LoadData();
    } catch (error) {
      console.error("Error changing date:", error);
      this._snackBar.open("L\u1ED7i khi thay \u0111\u1ED5i ng\xE0y", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
    }
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
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      console.log("filterValue", filterValue);
      this.isLoading.set(true);
      try {
        this.SearchParams.pageNumber = 1;
        this.SearchParams.query = filterValue.trim();
        yield this.LoadData();
      } catch (error) {
        console.error("Error applying filter:", error);
        this._snackBar.open("L\u1ED7i t\xECm ki\u1EBFm d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        this.initializeColumns();
        this.setupDrawer();
        yield this.LoadData();
      } catch (error) {
        console.error("Error initializing component:", error);
        this._snackBar.open("L\u1ED7i kh\u1EDFi t\u1EA1o trang", "", {
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
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    return __async(this, null, function* () {
      const query = event.target.value.toLowerCase();
      this.isLoading.set(true);
      try {
        this.SearchParams.pageNumber = 1;
        this.SearchParams[`${column}Filter`] = query;
        yield this.LoadData();
      } catch (error) {
        console.error("Error filtering column:", error);
        this._snackBar.open("L\u1ED7i khi l\u1ECDc d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  ListFilter = [];
  ChosenItem(item, column) {
    const CheckItem = this.dataSource.data.filter((v) => v[column] === item[column]);
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
    this.ListFilter = this.Listdonhang().data || [];
    this.dataSource.data = this.Listdonhang().data || [];
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listdonhang().data.filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    menu.closeMenu();
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/donhang", "new"]);
  }
  goToDetail(item) {
    this._DonhangService.setDonhangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/donhang", item.id]);
  }
  Dongbogia() {
    return __async(this, null, function* () {
      try {
        const result = yield this._DonhangService.DongboGia(this.EditList);
        if (result.status === "success") {
          this._snackBar.open(result.message || "\u0110\u1ED3ng b\u1ED9 gi\xE1 th\xE0nh c\xF4ng", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } else {
          this._snackBar.open(result.message || "\u0110\u1ED3ng b\u1ED9 gi\xE1 th\u1EA5t b\u1EA1i", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
        yield this.LoadData();
        this.EditList = [];
      } catch (error) {
        console.error("Error syncing prices:", error);
        this._snackBar.open("L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 gi\xE1", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  dialog = inject(MatDialog);
  statusDetails = [];
  ListImportData = [];
  EditList = [];
  ImporExcel(event) {
    return __async(this, null, function* () {
      const files = Array.from(event.target.files);
      let processedCount = 0;
      let skippedCount = 0;
      let errorCount = 0;
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        if (file.name.includes("~$")) {
          console.log(`Skipping temporary file: ${file.name}`);
          this._snackBar.open(`B\u1ECF qua file t\u1EA1m: ${file.name}`, "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          skippedCount++;
          this.statusDetails.push({
            fileName: file.name,
            tenkhongdau: removeVietnameseAccents(file.name.replace(".xlsx", "")),
            status: "Skipped",
            message: "File t\u1EA1m th\u1EDDi, kh\xF4ng x\u1EED l\xFD"
          });
          continue;
        }
        try {
          this._snackBar.open(`\u0110ang x\u1EED l\xFD file: ${file.name}`, "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          const TenKH = removeVietnameseAccents(file.name.replace(".xlsx", ""));
          let data = yield readExcelFileNoWorker(file, "TEM");
          if (!data || !Array.isArray(data)) {
            data = yield readExcelFileNoWorker(file, "TEMPLATE");
          }
          const editdata = data.filter((item) => {
            const validItemCode = typeof item?.ItemCode === "string" && item.ItemCode.trim() !== "";
            const validQuantity = item?.Quantity != null && item.Quantity !== "" && item.Quantity !== 0;
            return validItemCode && validQuantity;
          }).map((item) => ({
            // tenfile: file.name.replace('.xlsx', ''),
            // tenkh: TenKH,
            ItemCode: item.ItemCode ?? "",
            Quantity: Number(item.Quantity) ?? 0
          }));
          const itemEdit = {
            tenfile: removeVietnameseAccents(file.name.replace(".xlsx", "")),
            tenkh: TenKH,
            sanpham: editdata,
            ngaygiao: (0, import_moment.default)().format("YYYY-MM-DD")
          };
          this.ListImportData.push(itemEdit);
          processedCount++;
          this._snackBar.open(`X\u1EED l\xFD th\xE0nh c\xF4ng file: ${file.name}`, "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          this.statusDetails.push({
            fileName: file.name,
            ngaygiao: (0, import_moment.default)().format("YYYY-MM-DD"),
            tenkhongdau: removeVietnameseAccents(file.name.replace(".xlsx", "")),
            status: "Processed",
            message: "X\u1EED l\xFD th\xE0nh c\xF4ng"
          });
        } catch (error) {
          console.error(`Error processing file ${file.name}:`, error);
          this._snackBar.open(`L\u1ED7i x\u1EED l\xFD file ${file.name}: ${error.message}`, "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          errorCount++;
          this.statusDetails.push({
            fileName: file.name,
            tenkhongdau: removeVietnameseAccents(file.name.replace(".xlsx", "")),
            status: "Error",
            message: error.message
          });
          continue;
        }
      }
      yield this._SanphamService.getAllSanpham({ pageSize: 99999 });
      this.dialog.open(this.dialogImportExcelCu, {
        disableClose: true
      });
      this.statusDetails.forEach((v, k) => {
        this.FilterKhachhang[k] = this._KhachhangService.ListKhachhang();
      });
      this.statusDetails.sort((a, b) => {
        if (a.status === "Processed" && b.status !== "Processed")
          return -1;
        if (a.status !== "Processed" && b.status === "Processed")
          return 1;
        return 0;
      });
      this.autoSelectCustomersFromFilename();
      console.log("Status Details:", this.statusDetails);
      console.log("List Import Data:", this.ListImportData);
    });
  }
  removeItemImport(item) {
    this.statusDetails = this.statusDetails.filter((v) => v.tenkhongdau !== item.tenkhongdau);
    this.ListImportData = this.ListImportData.filter((v) => v.tenkh !== item.tenkhongdau);
  }
  DoImportKhachhangCu(ListImportData) {
    return __async(this, null, function* () {
      try {
        console.log("ListImportData", ListImportData);
        const invalidItems = ListImportData.filter((item) => !item.khachhangId || !item.ngaygiao);
        console.log("invalidItems", invalidItems);
        if (invalidItems.length > 0) {
          const invalidFiles = Array.from(new Set(invalidItems.map((item) => item.tenfile || "Unknown")));
          this._snackBar.open(`C\xE1c Kh\xE1ch h\xE0ng sau kh\xF4ng \u0111\u1EE7 d\u1EEF li\u1EC7u : ${invalidFiles.join(", ")}`, "", {
            duration: 5e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          return;
        }
        const result = yield this._DonhangService.ImportDonhangCu(ListImportData);
        this.dialog.closeAll();
        this._snackBar.open(`Nh\u1EADp \u0111\u01A1n h\xE0ng : Th\xE0nh c\xF4ng ${result.success}, Th\u1EA5t b\u1EA1i ${result.fail}, B\u1ECF qua ${result.skip}. Reload L\u1EA1i sau 3s`, "", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (importError) {
        console.error("L\u1ED7i khi nh\u1EADp \u0111\u01A1n h\xE0ng:", importError);
        this._snackBar.open(`L\u1ED7i khi nh\u1EADp \u0111\u01A1n h\xE0ng: ${importError.message}`, "", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      setTimeout(() => {
        window.location.reload();
      }, 3e3);
    });
  }
  ImportDonhang(items) {
    return __async(this, null, function* () {
      if (!items || !items.length) {
        this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 nh\u1EADp", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      console.log("Importing items:", items);
      try {
        const firstItem = items[0];
        if (!firstItem.makh) {
          throw new Error("M\xE3 kh\xE1ch h\xE0ng kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
        }
        const khachhang = yield this._KhachhangService.getKhachhangBy({
          makh: firstItem.makh,
          isOne: true
        });
        if (!khachhang) {
          throw new Error(`Kh\xF4ng t\xECm th\u1EA5y kh\xE1ch h\xE0ng v\u1EDBi m\xE3 ${firstItem.makh}`);
        }
        const sanpham = yield Promise.all(items.map((item) => __async(this, null, function* () {
          if (!item.masp) {
            throw new Error("M\xE3 s\u1EA3n ph\u1EA9m kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
          }
          const sp = yield this._SanphamService.getSanphamBy({
            masp: item.masp
          });
          if (!sp) {
            throw new Error(`Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m v\u1EDBi m\xE3 ${item.masp}`);
          }
          return __spreadProps(__spreadValues({}, sp), {
            sldat: parseFloat(Number(item.sldat).toFixed(2)) || 0,
            slgiao: parseFloat(Number(item.sldat).toFixed(2)) || 0,
            slnhan: parseFloat(Number(item.sldat).toFixed(2)) || 0
          });
        })));
        const donhangData = {
          title: `\u0110\u01A1n h\xE0ng ${GenId(4, false)}`,
          type: "donsi",
          ngaygiao: firstItem.ngay || (0, import_moment.default)().format("YYYY-MM-DD"),
          khachhangId: khachhang.id,
          khachhang,
          sanpham,
          status: "dadat",
          createdAt: /* @__PURE__ */ new Date()
        };
        console.log(donhangData);
        yield this._DonhangService.CreateDonhang(donhangData);
        this._snackBar.open("Nh\u1EADp \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.ngOnInit();
      } catch (error) {
        console.error("Error importing order:", error);
        this._snackBar.open(`L\u1ED7i: ${error.message || "Kh\xF4ng th\u1EC3 nh\u1EADp \u0111\u01A1n h\xE0ng"}`, "", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._KhachhangService.getAllKhachhang();
      yield this._SanphamService.getAllSanpham();
      yield this._BanggiaService.getAllBanggia();
      const KH = this._KhachhangService.ListKhachhang().map((v) => ({
        makhold: v.makhold,
        name: v.name,
        makh: v.makh,
        banggia: v.banggia[0]?.mabanggia
      }));
      const SP = this._SanphamService.ListSanpham().map((v) => ({
        subtitle: v.subtitle,
        masp: v.masp,
        title: v.title,
        dvt: v.dvt
      }));
      const BG = this._BanggiaService.ListBanggia().map((v) => ({
        mabanggia: v.mabanggia,
        title: v.title
      }));
      writeExcelFileWithSheets({ SP, KH, BG }, title);
    });
  }
  trackByFn(index, item) {
    return item.id;
  }
  SelectKhachhang(item, event) {
    return __async(this, null, function* () {
      const value = event.value;
      const checkItem = this.ListImportData.find((v) => v.khachhangId === value);
      if (checkItem) {
        event.source.value = null;
        event.source._value = null;
        this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach((v1) => {
          delete v1.khachhangId;
        });
        this._snackBar.open("Kh\xE1ch h\xE0ng \u0111\xE3 t\u1ED3n t\u1EA1i", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach((v1) => {
        v1.khachhangId = value;
      });
    });
  }
  /**
   * Auto-select customers based on filename matching
   * Matches filename (tenkhongdau) with customer data fields like name, subtitle, makh
   */
  autoSelectCustomersFromFilename() {
    if (!this.statusDetails?.length || !this._KhachhangService.ListKhachhang()?.length) {
      return;
    }
    const customers = this._KhachhangService.ListKhachhang();
    let matchedCount = 0;
    let skippedCount = 0;
    this.statusDetails.forEach((detail, index) => {
      if (detail.status !== "Processed" || !detail.tenkhongdau) {
        return;
      }
      const existingImportData = this.ListImportData.find((v) => v.tenkh === detail.tenkhongdau);
      if (existingImportData?.khachhangId) {
        skippedCount++;
        return;
      }
      const filename = detail.tenkhongdau.toLowerCase();
      let matchedCustomer = null;
      matchedCustomer = customers.find((customer) => {
        const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
        return customerNameNoAccent === filename;
      });
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(customer.subtitle || "").toLowerCase();
          return customerSubtitleNoAccent === filename;
        });
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerCode = (customer.makh || "").toLowerCase();
          return customerCode === filename;
        });
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
          return customerNameNoAccent && filename.includes(customerNameNoAccent);
        });
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
          return customerNameNoAccent && customerNameNoAccent.includes(filename);
        });
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(customer.subtitle || "").toLowerCase();
          return customerSubtitleNoAccent && (filename.includes(customerSubtitleNoAccent) || customerSubtitleNoAccent.includes(filename));
        });
      }
      if (matchedCustomer) {
        const existingSelection = this.ListImportData.find((v) => v.khachhangId === matchedCustomer.id);
        if (existingSelection) {
          console.warn(`Customer ${matchedCustomer.name} is already selected for another import`);
          skippedCount++;
          return;
        }
        this.ListImportData.filter((v) => v.tenkh === detail.tenkhongdau).forEach((v1) => {
          v1.khachhangId = matchedCustomer.id;
        });
        detail.autoSelected = true;
        matchedCount++;
        console.log(`Auto-selected customer "${matchedCustomer.name}" for file "${detail.fileName}"`);
      }
    });
    if (matchedCount > 0 || skippedCount > 0) {
      let message = "";
      if (matchedCount > 0) {
        message += `\u0110\xE3 t\u1EF1 \u0111\u1ED9ng ch\u1ECDn ${matchedCount} kh\xE1ch h\xE0ng`;
      }
      if (skippedCount > 0) {
        if (message)
          message += `, `;
        message += `${skippedCount} File Ch\u01B0a C\xF3 Kh\xE1ch H\xE0ng`;
      }
      this._snackBar.open(message, "", {
        duration: 4e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    }
  }
  /**
   * Get selected customer for a specific order detail
   */
  getSelectedCustomer(detail) {
    const importData = this.ListImportData.find((v) => v.tenkh === detail.tenkhongdau);
    if (!importData?.khachhangId) {
      return null;
    }
    return this._KhachhangService.ListKhachhang().find((customer) => customer.id === importData.khachhangId);
  }
  /**
   * Check if customer was auto-selected (for visual indication)
   */
  isCustomerAutoSelected(detail) {
    const selectedCustomer = this.getSelectedCustomer(detail);
    return selectedCustomer && detail.autoSelected === true;
  }
  /**
   * Toggle confirmation for all orders
   */
  toggleAllOrderConfirmation() {
    const processedOrders = this.statusDetails.filter((detail) => detail.status === "Processed");
    const allConfirmed = processedOrders.every((detail) => detail.configOptions?.confirmed);
    processedOrders.forEach((detail) => {
      if (!detail.configOptions) {
        detail.configOptions = {};
      }
      detail.configOptions.confirmed = !allConfirmed;
    });
  }
  /**
   * Toggle confirmation for a specific order
   */
  toggleOrderConfirmation(index) {
    const detail = this.statusDetails[index];
    if (!detail.configOptions) {
      detail.configOptions = {};
    }
    detail.configOptions.confirmed = !detail.configOptions.confirmed;
  }
  /**
   * Get count of confirmed orders
   */
  getConfirmedOrdersCount() {
    return this.statusDetails.filter((detail) => detail.status === "Processed" && detail.configOptions?.confirmed).length;
  }
  /**
   * Get count of processed orders
   */
  getProcessedOrdersCount() {
    return this.statusDetails.filter((detail) => detail.status === "Processed").length;
  }
  /**
   * Toggle expansion for all orders
   */
  toggleAllOrdersExpansion() {
    const allExpanded = this.allOrdersExpanded();
    this.statusDetails.forEach((detail) => {
      if (detail.status === "Processed") {
        detail.expanded = !allExpanded;
      }
    });
  }
  /**
   * Check if all orders are expanded
   */
  allOrdersExpanded() {
    const processedOrders = this.statusDetails.filter((detail) => detail.status === "Processed");
    return processedOrders.length > 0 && processedOrders.every((detail) => detail.expanded);
  }
  /**
   * Toggle expansion for a specific order
   */
  toggleOrderExpansion(index) {
    const detail = this.statusDetails[index];
    detail.expanded = !detail.expanded;
  }
  /**
   * Get products for an order
   */
  getOrderProducts(detail) {
    const orderData = this.ListImportData.filter((item) => item.tenkh === detail.tenkhongdau);
    const transformedData = orderData.map((v) => {
      const sanphamList = v.sanpham.map((item) => {
        const sanpham = this._SanphamService.ListSanpham().find((sp) => sp.masp === item.ItemCode);
        if (sanpham) {
          return {
            id: sanpham.id,
            title: sanpham.title,
            masp: sanpham.masp,
            dvt: sanpham.dvt,
            sldat: Number(item.Quantity),
            slgiao: Number(item.Quantity),
            slnhan: Number(item.Quantity)
          };
        } else {
          return null;
        }
      }).filter((item) => item !== null);
      return __spreadProps(__spreadValues({}, v), {
        sanpham: sanphamList
      });
    });
    return transformedData.flatMap((item) => item.sanpham) || [];
  }
  /**
   * Get total quantity for an order
   */
  getTotalQuantity(detail) {
    const products = this.getOrderProducts(detail);
    return products.reduce((total, product) => Number(total) + (Number(product.sldat) || 0), 0);
  }
  /**
   * Toggle all items selection
   */
  ToggleAll() {
    if (this.EditList.length === this.dataSource.filteredData.length) {
      this.EditList = [];
    } else {
      this.EditList = [...this.dataSource.filteredData];
    }
  }
  /**
   * Add item to edit list
   */
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  /**
   * Check if item is in edit list
   */
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  /**
   * Open delete confirmation dialog
   */
  openDeleteDialog(template) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result == "true") {
        this.DeleteListItem();
      }
    });
  }
  /**
   * Delete selected items
   */
  DeleteListItem() {
    return __async(this, null, function* () {
      if (!this.EditList?.length) {
        this._snackBar.open("Kh\xF4ng c\xF3 m\u1EE5c n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn \u0111\u1EC3 x\xF3a", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      try {
        const result = yield this._DonhangService.DeleteBulkDonhang(this.EditList.map((v) => v.id));
        this._snackBar.open(`X\xF3a th\xE0nh c\xF4ng ${result.success} \u0111\u01A1n h\xE0ng ${result.fail} l\u1ED7i`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.EditList = [];
        yield this.LoadData();
      } catch (error) {
        console.error("Error deleting items:", error);
        this._snackBar.open(`L\u1ED7i khi x\xF3a: ${error.message}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Get total products count
   */
  getTotalProducts() {
    return this.statusDetails.filter((detail) => detail.status === "Processed" && detail.configOptions?.confirmed).reduce((total, detail) => total + this.getOrderProducts(detail).length, 0);
  }
  /**
   * Get total amount (placeholder - needs implementation based on pricing logic)
   */
  getTotalAmount() {
    return 0;
  }
  /**
   * Format currency
   */
  formatCurrency(amount) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(amount);
  }
  /**
   * Import confirmed orders
   */
  ImportConfirmedDonhang() {
    return __async(this, null, function* () {
      const confirmedOrders = this.ListImportData.filter((_, index) => this.statusDetails[index]?.configOptions?.confirmed);
      if (confirmedOrders.length === 0) {
        this._snackBar.open("Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c x\xE1c nh\u1EADn \u0111\u1EC3 nh\u1EADp", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      yield this.DoImportKhachhangCu(confirmedOrders);
    });
  }
  DoFindKhachhang(event, index) {
    return __async(this, null, function* () {
      const value = event.target.value;
      if (!value) {
        this.FilterKhachhang[index] = this._KhachhangService.ListKhachhang();
        return;
      }
      this.FilterKhachhang[index] = this._KhachhangService.ListKhachhang().filter((v) => v.subtitle.includes(removeVietnameseAccents(value)));
    });
  }
  DoChonNgaygiao(event, item) {
    const value = event.target.value;
    if (!value) {
      this.SearchParams.ngaygiao = "";
      return;
    }
    if (item === "All") {
      this.ListImportData.forEach((v) => {
        v.ngaygiao = value;
      });
      this.statusDetails.forEach((v) => {
        if (v.status === "Processed") {
          v.ngaygiao = value;
        }
      });
      return;
    }
    this.ListImportData.filter((v) => v.tenkh === item.tenkhongdau).forEach((v1) => {
      v1.ngaygiao = value;
    });
  }
  static \u0275fac = function ListDonhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListDonhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListDonhangComponent, selectors: [["app-listdonhang"]], viewQuery: function ListDonhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
      \u0275\u0275viewQuery(_c1, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogImportExcelCu = _t.first);
    }
  }, decls: 74, vars: 36, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["dialogImportExcelCu", ""], ["DeleteDialog", ""], ["menuTrigger", "matMenuTrigger"], ["globalDatePicker", ""], ["orderDatePicker", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "btn-primary", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["multiple", "", "type", "file", 1, "hidden", 3, "change"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "w-full", "overflow-auto", "relative"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "emitChange", "pageSize", "page", "total", "pageCount"], ["mat-menu-item", "", 3, "click"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], ["mat-dialog-title", "", 1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-normal", "text-gray-600"], [1, "mat-typography"], [1, "w-[90vw]", "h-full", "flex", "flex-col"], [1, "border-b", "p-4", "bg-gray-50"], [1, "flex", "flex-wrap", "gap-4", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "min-w-[200px]"], ["matInput", "", 3, "dateChange", "matDatepicker"], ["mat-stroked-button", "", "color", "accent", 3, "click"], ["mat-flat-button", "", "color", "accent", "matTooltip", "T\u1EF1 \u0111\u1ED9ng ch\u1ECDn kh\xE1ch h\xE0ng d\u1EF1a tr\xEAn t\xEAn file", 3, "click"], [1, "flex-1", "overflow-auto", "p-4"], [1, "grid", "gap-4"], [1, "text-center", "py-8"], [1, "border-t", "p-4", 3, "align"], [1, "flex", "flex-col", "w-full", "gap-3"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4", "text-sm"], [1, "text-center", "p-2", "bg-blue-50", "rounded"], [1, "font-semibold", "text-blue-600"], [1, "text-gray-600"], [1, "text-center", "p-2", "bg-green-50", "rounded"], [1, "font-semibold", "text-green-600"], [1, "text-center", "p-2", "bg-purple-50", "rounded"], [1, "font-semibold", "text-purple-600"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "text-gray-600"], [1, "flex", "gap-2"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [1, "border", "rounded-lg", "p-4", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-3"], [3, "change", "checked"], [1, "font-semibold", "text-lg"], [1, "text-green-600", "font-semibold"], [1, "text-xs", "text-blue-600", "mt-1"], [1, "flex", "items-center", "gap-2"], ["mat-icon-button", "", "matTooltip", "Xem chi ti\u1EBFt s\u1EA3n ph\u1EA9m", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a \u0111\u01A1n h\xE0ng n\xE0y", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "mb-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "selectionChange", "value"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm ki\u1EBFm kh\xE1ch h\xE0ng", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [1, "!whitespace-normal", "!h-auto", "!py-2", 3, "value"], [1, "flex", "items-center", "gap-1"], ["matInput", "", 3, "dateChange", "matDatepicker", "ngModel"], [1, "mt-4", "border-t", "pt-4"], [1, "bg-gray-50", "rounded", "p-3", "mt-4"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "text-sm"], [1, "font-medium"], [1, "font-medium", "text-blue-600"], [1, "font-medium", "text-green-600"], [1, "mt-2", "pt-2", "border-t", "border-gray-200"], [1, "flex", "flex-col"], [1, "text-sm", "text-gray-500"], [1, "text-xs"], [1, "text-green-600", "!text-sm"], [1, "text-green-600", "text-xs"], [1, "font-medium", "text-gray-800", "mb-3"], [1, "overflow-x-auto"], [1, "min-w-full", "text-sm"], [1, "bg-gray-100"], [1, "px-3", "py-2", "text-left", "font-medium", "text-gray-700"], [1, "divide-y", "divide-gray-200"], [1, "hover:bg-gray-50"], [1, "bg-gray-50"], [1, "font-semibold"], ["colspan", "4", 1, "px-3", "py-2", "text-right"], [1, "px-3", "py-2", "text-blue-600"], [1, "px-3", "py-2"], [1, "px-3", "py-2", "font-mono", "text-xs"], [1, "px-3", "py-2", "font-semibold", "text-blue-600"], ["colspan", "7", 1, "px-3", "py-4", "text-center", "text-gray-500"], [1, "text-sm"], [1, "text-gray-500", "text-lg", "mb-2"], [1, "text-gray-400"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"]], template: function ListDonhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 10)(1, "mat-drawer", 11, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 12)(5, "div", 13)(6, "div", 14)(7, "div", 15)(8, "input", 16);
      \u0275\u0275listener("keyup", function ListDonhangComponent_Template_input_keyup_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 17)(10, "span", 18);
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "button", 19);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 20);
      \u0275\u0275text(16, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "button", 21)(18, "mat-icon");
      \u0275\u0275text(19, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "mat-menu", null, 1)(22, "div", 22)(23, "mat-form-field", 23)(24, "input", 24);
      \u0275\u0275listener("input", function ListDonhangComponent_Template_input_input_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListDonhangComponent_Template_input_click_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-icon", 25);
      \u0275\u0275text(26, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 26);
      \u0275\u0275repeaterCreate(28, ListDonhangComponent_For_29_Template, 5, 2, "button", 27, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "button", 28);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r5 = \u0275\u0275reference(34);
        return \u0275\u0275resetView(uploadfile_r5.click());
      });
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "input", 29, 2);
      \u0275\u0275listener("change", function ListDonhangComponent_Template_input_change_33_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "span", 30);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_span_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ToggleAll());
      });
      \u0275\u0275text(36);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 31);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.Dongbogia());
      });
      \u0275\u0275elementStart(38, "span", 20);
      \u0275\u0275text(39, " Gi\xE1 B\xE1n");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(40, ListDonhangComponent_button_40_Template, 5, 0, "button", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "div", 33)(42, "mat-form-field", 34)(43, "mat-label");
      \u0275\u0275text(44, "Lo\u1EA1i \u0110\u01A1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "mat-select", 35);
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_mat_select_ngModelChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListDonhangComponent_Template_mat_select_selectionChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSelectionChange($event));
      });
      \u0275\u0275repeaterCreate(46, ListDonhangComponent_For_47_Template, 2, 2, "mat-option", 36, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(48, "mat-form-field", 34)(49, "mat-label");
      \u0275\u0275text(50, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "input", 37);
      \u0275\u0275listener("dateChange", function ListDonhangComponent_Template_input_dateChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "mat-datepicker-toggle", 38)(53, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "mat-form-field", 34)(56, "mat-label");
      \u0275\u0275text(57, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "input", 37);
      \u0275\u0275listener("dateChange", function ListDonhangComponent_Template_input_dateChange_58_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_input_ngModelChange_58_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(59, "mat-datepicker-toggle", 38)(60, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "div", 39)(63, "table", 40);
      \u0275\u0275repeaterCreate(64, ListDonhangComponent_For_65_Template, 3, 1, "ng-container", 41, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(66, ListDonhangComponent_tr_66_Template, 1, 0, "tr", 42)(67, ListDonhangComponent_tr_67_Template, 1, 3, "tr", 43)(68, ListDonhangComponent_tr_68_Template, 3, 0, "tr", 44);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "app-sharepagination", 45);
      \u0275\u0275listener("emitChange", function ListDonhangComponent_Template_app_sharepagination_emitChange_69_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(70, ListDonhangComponent_ng_template_70_Template, 60, 20, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(72, ListDonhangComponent_ng_template_72_Template, 11, 0, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r30 = \u0275\u0275reference(21);
      const pickerBatdau_r31 = \u0275\u0275reference(54);
      const pickerKetthuc_r32 = \u0275\u0275reference(61);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(16);
      \u0275\u0275property("matMenuTriggerFor", menu_r30);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", ctx.Listdonhang().total, " \u0110\u01A1n H\xE0ng ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Type);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(28, _c2));
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pureFunction2(31, _c5, \u0275\u0275pureFunction0(29, _c3), \u0275\u0275pureFunction0(30, _c4)));
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r31);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c2));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r31);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r32);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c2));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r32);
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSize", ctx.pageSize())("page", ctx.page())("total", ctx.total())("pageCount", ctx.pageCount());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatHint,
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
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    SharepaginationComponent,
    MatProgressSpinnerModule,
    MatCheckboxModule,
    MatCheckbox
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  Debounce(500)
], ListDonhangComponent.prototype, "applyFilter", null);
__decorate([
  memoize()
], ListDonhangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListDonhangComponent.prototype, "doFilterHederColumn", null);
__decorate([
  Debounce(300)
], ListDonhangComponent.prototype, "SelectKhachhang", null);
__decorate([
  Debounce(500)
], ListDonhangComponent.prototype, "DoFindKhachhang", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListDonhangComponent, { className: "ListDonhangComponent", filePath: "src/app/admin/donhang/listdonhang/listdonhang.component.ts", lineNumber: 68 });
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
  ListDonhangComponent
};
//# sourceMappingURL=chunk-OTFJWT6C.mjs.map
