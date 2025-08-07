import './polyfills.server.mjs';
import {
  SharepaginationComponent
} from "./chunk-KG6RBMPF.mjs";
import {
  TrangThaiDon
} from "./chunk-23PZ27G5.mjs";
import {
  DateHelpers
} from "./chunk-KIQNTD6X.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PVLDU33E.mjs";
import {
  readExcelFile,
  writeExcelFile
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
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  ConvertDriveData
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
  NgClass,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵcomponentInstance,
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
} from "./chunk-4EQURZBD.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phieugiaohang/listphieugiaohang/listphieugiaohang.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = () => ({ id: 1, Title: "\u0110\u01A1n S\u1EC9", value: "donsi" });
var _c3 = () => ({ id: 2, Title: "\u0110\u01A1n L\u1EBB", value: "donle" });
var _c4 = (a0, a1) => [a0, a1];
var _c5 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieugiaohangComponent_div_5_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_For_19_Template_button_click_0_listener($event) {
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
function ListPhieugiaohangComponent_div_5_button_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_button_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.UpdateBulk());
    });
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u0110\xE3 Nh\u1EADn");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieugiaohangComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "div", 26)(3, "input", 27);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_div_5_Template_input_keyup_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 28)(5, "span", 29);
    \u0275\u0275text(6, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "button", 30)(8, "mat-icon");
    \u0275\u0275text(9, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-menu", null, 3)(12, "div", 31)(13, "mat-form-field", 32)(14, "input", 33);
    \u0275\u0275listener("input", function ListPhieugiaohangComponent_div_5_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieugiaohangComponent_div_5_Template_input_click_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-icon", 34);
    \u0275\u0275text(16, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 35);
    \u0275\u0275repeaterCreate(18, ListPhieugiaohangComponent_div_5_For_19_Template, 5, 2, "button", 36, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 37);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ToggleAll());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, ListPhieugiaohangComponent_div_5_button_22_Template, 3, 0, "button", 38);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const menu_r7 = \u0275\u0275reference(11);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("matMenuTriggerFor", menu_r7);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.total(), " Phi\u1EBFu giao h\xE0ng ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.EditList.length > 0);
  }
}
function ListPhieugiaohangComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 41)(1, "mat-form-field", 32)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 42);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 43);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieugiaohangComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 13);
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
function ListPhieugiaohangComponent_Conditional_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17)(1, "div", 44);
    \u0275\u0275element(2, "mat-spinner", 45);
    \u0275\u0275elementStart(3, "span", 46);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieugiaohangComponent_For_32_th_1_For_24_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_32_th_1_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 60);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_For_24_Template_div_click_0_listener() {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r13));
    });
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_32_th_1_For_24_span_1_Template, 2, 0, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = ctx.$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItem(item_r13));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r13[column_r11] || "Tr\u1ED1ng", " ");
  }
}
function ListPhieugiaohangComponent_For_32_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 49)(1, "span", 50);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 51, 4);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 3)(8, "div", 52);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 26)(10, "input", 27);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_For_32_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r11));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 28)(12, "span", 29);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 53)(15, "div", 25)(16, "span", 54);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 54);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 54);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 55);
    \u0275\u0275repeaterCreate(23, ListPhieugiaohangComponent_For_32_th_1_For_24_Template, 3, 2, "div", 56, \u0275\u0275componentInstance().trackByFn, true);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "div", 57)(26, "button", 58);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r14.closeMenu());
    });
    \u0275\u0275text(27, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "button", 59);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_th_1_Template_button_click_28_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r14));
    });
    \u0275\u0275text(29, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r15 = \u0275\u0275reference(7);
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r11], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r15);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275repeater(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11));
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.togglePhieugiaohang(row_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListPhieugiaohangComponent_For_32_td_2_Case_1_span_2_Template, 2, 0, "span", 70);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r17 = \u0275\u0275nextContext();
    const row_r17 = ctx_r17.$implicit;
    const idx_r19 = ctx_r17.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r19 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItemInPhieugiaohang(row_r17));
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 72);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_32_td_2_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r17));
    });
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
function ListPhieugiaohangComponent_For_32_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11].name, " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c5, row_r17[column_r11] === "dadat", row_r17[column_r11] === "dagiao", row_r17[column_r11] === "danhan", row_r17[column_r11] === "hoanthanh", row_r17[column_r11] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.Trangthaidon[row_r17[column_r11]], " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11].length, " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 73);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 74);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_32_td_2_Case_8_Conditional_1_Template, 2, 0, "mat-icon", 73)(2, ListPhieugiaohangComponent_For_32_td_2_Case_8_Conditional_2_Template, 2, 0, "mat-icon", 74);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r17[column_r11] ? 1 : 2);
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_32_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 67);
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
function ListPhieugiaohangComponent_For_32_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 63);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_32_td_2_Case_1_Template, 3, 2, "span", 64)(2, ListPhieugiaohangComponent_For_32_td_2_Case_2_Template, 2, 1, "span", 65)(3, ListPhieugiaohangComponent_For_32_td_2_Case_3_Template, 3, 4, "span", 66)(4, ListPhieugiaohangComponent_For_32_td_2_Case_4_Template, 3, 4, "span", 66)(5, ListPhieugiaohangComponent_For_32_td_2_Case_5_Template, 2, 1, "span", 67)(6, ListPhieugiaohangComponent_For_32_td_2_Case_6_Template, 2, 8, "span", 68)(7, ListPhieugiaohangComponent_For_32_td_2_Case_7_Template, 2, 1, "span", 67)(8, ListPhieugiaohangComponent_For_32_td_2_Case_8_Template, 3, 1, "span", 67)(9, ListPhieugiaohangComponent_For_32_td_2_Case_9_Template, 3, 4, "span", 66)(10, ListPhieugiaohangComponent_For_32_td_2_Case_10_Template, 2, 1, "span", 67);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r11) === "STT" ? 1 : tmp_16_0 === "madonhang" ? 2 : tmp_16_0 === "createdAt" ? 3 : tmp_16_0 === "ngaygiao" ? 4 : tmp_16_0 === "khachhang" ? 5 : tmp_16_0 === "status" ? 6 : tmp_16_0 === "sanpham" ? 7 : tmp_16_0 === "isActive" ? 8 : tmp_16_0 === "updatedAt" ? 9 : 10);
  }
}
function ListPhieugiaohangComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 19);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_32_th_1_Template, 30, 3, "th", 47)(2, ListPhieugiaohangComponent_For_32_td_2_Template, 11, 1, "td", 48);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r11 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r11);
  }
}
function ListPhieugiaohangComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 75);
  }
}
function ListPhieugiaohangComponent_tr_34_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 76);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_tr_34_Template_tr_click_0_listener() {
      const row_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r22));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r2.CheckItemInEdit(row_r22) ? "!bg-slate-200" : "", "");
  }
}
function ListPhieugiaohangComponent_tr_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 77)(1, "td", 78);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var ListPhieugiaohangComponent = class _ListPhieugiaohangComponent {
  Detail = {};
  displayedColumns = [
    "STT",
    "madonhang",
    "khachhang",
    "sanpham",
    "ngaygiao",
    "status",
    "ghichu",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    STT: "STT",
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    khachhang: "Kh\xE1ch H\xE0ng",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    ngaygiao: "Ng\xE0y Giao",
    status: "Tr\u1EA1ng Th\xE1i",
    ghichu: "Ghi Ch\xFA",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PhieugiaohangColFilter") || "[]");
  Columns = [];
  isFilter = false;
  isLoading = signal(false);
  paginator;
  sort;
  drawer;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  Listphieugiaohang = signal({});
  dataSource = new MatTableDataSource([]);
  donhangId = this._DonhangService.donhangId;
  _snackBar = inject(MatSnackBar);
  isSearch = false;
  CountItem = 0;
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(10);
  Trangthaidon = TrangThaiDon;
  SearchParams = {
    Batdau: DateHelpers.now(),
    Ketthuc: DateHelpers.now(),
    Type: "donsi",
    Status: ["dadat", "dagiao", "danhan", "hoanthanh"],
    pageSize: 10,
    pageNumber: 1
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
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
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.LoadData();
      this.initializeColumns();
      this.setupDrawer();
      if (this.paginator) {
        this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
        this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
        this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
        this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
        this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
      }
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
        const data = yield this._DonhangService.searchDonhang(this.SearchParams);
        this.Listphieugiaohang.set(data);
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
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        this.total.set(0);
        this.pageSize.set(10);
        this.page.set(1);
        this.pageCount.set(0);
        this.dataSource = new MatTableDataSource([]);
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  applyFilter(event) {
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      this.SearchParams.query = filterValue;
      this.SearchParams.pageNumber = 1;
      yield this.LoadData();
    });
  }
  onSelectionChange(event) {
    this.SearchParams.pageNumber = 1;
    this.LoadData();
  }
  onDateChange(event) {
    this.SearchParams.pageNumber = 1;
    this.LoadData();
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
      localStorage.setItem("PhieugiaohangColFilter", JSON.stringify(this.FilterColumns));
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
    const dataToFilter = this.dataSource.data || [];
    const uniqueList = dataToFilter.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    const filteredData = this.dataSource.data.filter((v) => {
      const value = v[column];
      if (value) {
        return removeVietnameseAccents(value.toString()).toLowerCase().includes(query) || value.toString().toLowerCase().includes(query);
      }
      return false;
    });
    this.dataSource.filteredData = filteredData;
    console.log(query, column, filteredData);
  }
  ListFilter = [];
  ChosenItem(item) {
    if (this.ListFilter.includes(item.id)) {
      this.ListFilter = this.ListFilter.filter((v) => v !== item.id);
    } else {
      this.ListFilter.push(item.id);
    }
    console.log(this.ListFilter);
  }
  ChosenAll(list) {
    list.forEach((v) => {
      if (this.ListFilter.includes(v.id)) {
        this.ListFilter = this.ListFilter.filter((v2) => v2 !== v2.id);
      } else {
        this.ListFilter.push(v.id);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.dataSource.data.map((v) => v.id);
    this.dataSource.filteredData = this.dataSource.data;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.includes(item.id);
  }
  EditList = [];
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
    console.log(this.EditList);
  }
  ToggleAll() {
    this.EditList.length == this.dataSource.data.length ? this.EditList = [] : this.EditList = [...this.dataSource.data];
  }
  togglePhieugiaohang(row) {
    this.AddToEdit(row);
  }
  CheckItemInPhieugiaohang(item) {
    return this.CheckItemInEdit(item);
  }
  trackByFn(index, item) {
    return item.id || index;
  }
  UpdateBulk() {
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
        const result = yield this._DonhangService.UpdateBulkDonhang(this.EditList.map((v) => v.id));
        this._snackBar.open(`C\u1EADp nh\u1EADt th\xE0nh c\xF4ng ${result.success} \u0111\u01A1n h\xE0ng ${result.fail} l\u1ED7i`, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a \u0111\u01A1n h\xE0ng:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi x\xF3a \u0111\u01A1n h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.EditList = [];
        yield this.LoadData();
      }
    });
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  ApplyFilterColum(menu) {
    this.dataSource.filteredData = this.dataSource.data.filter((v) => this.ListFilter.includes(v.id));
    console.log(this.dataSource.filteredData);
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("PhieugiaohangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/phieugiaohang", 0]);
  }
  goToDetail(item) {
    this._DonhangService.setDonhangId(item.id);
    window.open(this._router.serializeUrl(this._router.createUrlTree(["admin/phieugiaohang", item.id])), "_blank");
  }
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
        SheetName: "PGHImport",
        ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      const data = ConvertDriveData(result.values);
      console.log(data);
      this.DoImportData(data);
    });
  }
  DoImportData(data) {
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
  static \u0275fac = function ListPhieugiaohangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhieugiaohangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhieugiaohangComponent, selectors: [["app-listphieugiaohang"]], viewQuery: function ListPhieugiaohangComponent_Query(rf, ctx) {
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
  }, decls: 37, vars: 36, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menu", "matMenu"], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center p-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "w-full", "overflow-auto", "relative"], [1, "absolute", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-10"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "emitChange", "pageSize", "page", "total", "pageCount"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], ["class", "flex flex-row items-center", "color", "primary", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["color", "primary", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-col", "items-center", "space-y-4"], ["diameter", "40"], [1, "text-sm", "text-gray-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function ListPhieugiaohangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275template(5, ListPhieugiaohangComponent_div_5_Template, 23, 3, "div", 8)(6, ListPhieugiaohangComponent_div_6_Template, 8, 0, "div", 9);
      \u0275\u0275elementStart(7, "div", 10)(8, "mat-form-field", 11)(9, "mat-label");
      \u0275\u0275text(10, "Lo\u1EA1i \u0110\u01A1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-select", 12);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_mat_select_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhieugiaohangComponent_Template_mat_select_selectionChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSelectionChange($event));
      });
      \u0275\u0275repeaterCreate(12, ListPhieugiaohangComponent_For_13_Template, 2, 2, "mat-option", 13, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-form-field", 11)(15, "mat-label");
      \u0275\u0275text(16, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "input", 14);
      \u0275\u0275listener("dateChange", function ListPhieugiaohangComponent_Template_input_dateChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_input_ngModelChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(18, "mat-datepicker-toggle", 15)(19, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-form-field", 11)(22, "mat-label");
      \u0275\u0275text(23, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "input", 14);
      \u0275\u0275listener("dateChange", function ListPhieugiaohangComponent_Template_input_dateChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_input_ngModelChange_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "mat-datepicker-toggle", 15)(26, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "div", 16);
      \u0275\u0275template(29, ListPhieugiaohangComponent_Conditional_29_Template, 5, 0, "div", 17);
      \u0275\u0275elementStart(30, "table", 18);
      \u0275\u0275repeaterCreate(31, ListPhieugiaohangComponent_For_32_Template, 3, 1, "ng-container", 19, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(33, ListPhieugiaohangComponent_tr_33_Template, 1, 0, "tr", 20)(34, ListPhieugiaohangComponent_tr_34_Template, 1, 3, "tr", 21)(35, ListPhieugiaohangComponent_tr_35_Template, 3, 0, "tr", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "app-sharepagination", 23);
      \u0275\u0275listener("emitChange", function ListPhieugiaohangComponent_Template_app_sharepagination_emitChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const pickerBatdau_r23 = \u0275\u0275reference(20);
      const pickerKetthuc_r24 = \u0275\u0275reference(27);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Type);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(28, _c1));
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pureFunction2(31, _c4, \u0275\u0275pureFunction0(29, _c2), \u0275\u0275pureFunction0(30, _c3)));
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r23);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(34, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r23);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r24);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r24);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isLoading() ? 29 : -1);
      \u0275\u0275advance();
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
    NgIf,
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
    SharepaginationComponent,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieugiaohangComponent, { className: "ListPhieugiaohangComponent", filePath: "src/app/admin/phieugiaohang/listphieugiaohang/listphieugiaohang.component.ts", lineNumber: 69 });
})();

export {
  ListPhieugiaohangComponent
};
//# sourceMappingURL=chunk-3PVDO5MG.mjs.map
