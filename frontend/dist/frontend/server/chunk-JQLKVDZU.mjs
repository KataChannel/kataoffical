import './polyfills.server.mjs';
import {
  TrangThaiDon
} from "./chunk-23PZ27G5.mjs";
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
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogModule
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
  ConvertDriveData,
  GenId,
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import {
  SearchService
} from "./chunk-DZF5RARC.mjs";
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
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  MatSnackBar,
  StorageService
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
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
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

// src/app/admin/phieuchiahang/listphieuchiahang/listphieuchiahang.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = () => ({ id: 1, Title: "\u0110\u01A1n S\u1EC9", value: "donsi" });
var _c3 = () => ({ id: 2, Title: "\u0110\u01A1n L\u1EBB", value: "donle" });
var _c4 = (a0, a1) => [a0, a1];
var _c5 = (a0) => [100, a0];
var _c6 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieuchiahangComponent_div_5_For_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 42);
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
    \u0275\u0275elementStart(0, "div", 43)(1, "div", 44);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(2, "svg", 45);
    \u0275\u0275element(3, "path", 46)(4, "path", 47);
    \u0275\u0275elementEnd();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(5, "span", 48);
    \u0275\u0275text(6, "Loading...");
    \u0275\u0275elementEnd()();
    \u0275\u0275text(7, " \u0110ang upload... ");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "button", 30)(3, "mat-icon");
    \u0275\u0275text(4, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-menu", null, 5)(7, "div", 31)(8, "mat-form-field", 32)(9, "input", 33);
    \u0275\u0275listener("input", function ListPhieuchiahangComponent_div_5_Template_input_input_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieuchiahangComponent_div_5_Template_input_click_9_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-icon", 34);
    \u0275\u0275text(11, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 35);
    \u0275\u0275repeaterCreate(13, ListPhieuchiahangComponent_div_5_For_14_Template, 5, 2, "button", 36, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "button", 37);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_5_Template_button_click_15_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(16, "mat-icon");
    \u0275\u0275text(17, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "span", 38);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 39);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_div_5_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const dialogXembill_r6 = \u0275\u0275reference(47);
      return \u0275\u0275resetView(ctx_r2.openXembillDialog(dialogXembill_r6));
    });
    \u0275\u0275text(21, "Xem Bill");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "input", 40, 6);
    \u0275\u0275listener("change", function ListPhieuchiahangComponent_div_5_Template_input_change_22_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onFileSelected($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(24, ListPhieuchiahangComponent_div_5_div_24_Template, 8, 0, "div", 41);
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
    \u0275\u0275property("ngIf", ctx_r2.isLoading);
  }
}
function ListPhieuchiahangComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 49)(1, "mat-form-field", 32)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 50);
    \u0275\u0275listener("keyup", function ListPhieuchiahangComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 51);
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
function ListPhieuchiahangComponent_For_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
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
function ListPhieuchiahangComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 16);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = ctx.$implicit;
    \u0275\u0275property("value", item_r10.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r10.Title);
  }
}
function ListPhieuchiahangComponent_button_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_button_35_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext();
      const dialogCreateTemplate_r12 = \u0275\u0275reference(45);
      return \u0275\u0275resetView(ctx_r2.openCreateDialog(dialogCreateTemplate_r12));
    });
    \u0275\u0275text(1, "T\u1EA1o Phi\u1EBFu Chia");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_39_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_39_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
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
function ListPhieuchiahangComponent_For_39_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
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
function ListPhieuchiahangComponent_For_39_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r16[column_r14], "%");
  }
}
function ListPhieuchiahangComponent_For_39_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r16 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r16[column_r14] || "Tr\u1ED1ng", "");
  }
}
function ListPhieuchiahangComponent_For_39_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 69);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_div_23_Template_div_click_0_listener() {
      const item_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const column_r14 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r16, column_r14));
    });
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_39_th_1_div_23_span_1_Template, 2, 0, "span", 70)(2, ListPhieuchiahangComponent_For_39_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListPhieuchiahangComponent_For_39_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListPhieuchiahangComponent_For_39_th_1_div_23_Case_4_Template, 2, 1, "span")(5, ListPhieuchiahangComponent_For_39_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_21_0;
    const item_r16 = ctx.$implicit;
    const column_r14 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItem(item_r16));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_21_0 = column_r14) === "createdAt" ? 2 : tmp_21_0 === "updatedAt" ? 3 : tmp_21_0 === "haohut" ? 4 : 5);
  }
}
function ListPhieuchiahangComponent_For_39_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 55)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 57, 7);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 5)(8, "div", 58);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 59)(10, "input", 60);
    \u0275\u0275listener("keyup", function ListPhieuchiahangComponent_For_39_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r13);
      const column_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r14));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 61)(12, "span", 62);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 63)(15, "div", 29)(16, "span", 64);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r13);
      const column_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r14)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 64);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 64);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r13);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 65);
    \u0275\u0275template(23, ListPhieuchiahangComponent_For_39_th_1_div_23_Template, 6, 2, "div", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 67)(25, "button", 68);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r13);
      const menuTrigger_r17 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r17.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 52);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r13);
      const menuTrigger_r17 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r17));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
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
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r14).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r14))("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_For_39_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r19);
      const row_r20 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.toggleDonhang(row_r20));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListPhieuchiahangComponent_For_39_td_2_Case_1_span_2_Template, 2, 0, "span", 79);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 74);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 81);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 82);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_39_td_2_Case_7_Conditional_1_Template, 2, 0, "mat-icon", 81)(2, ListPhieuchiahangComponent_For_39_td_2_Case_7_Conditional_2_Template, 2, 0, "mat-icon", 82);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r20[column_r14] ? 1 : 2);
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 77);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = \u0275\u0275nextContext().$implicit;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c6, row_r20[column_r14] === "dadat", row_r20[column_r14] === "dagiao", row_r20[column_r14] === "danhan", row_r20[column_r14] === "hoanthanh", row_r20[column_r14] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.Trangthaidon[row_r20[column_r14]], " ");
  }
}
function ListPhieuchiahangComponent_For_39_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 75);
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
function ListPhieuchiahangComponent_For_39_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
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
function ListPhieuchiahangComponent_For_39_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 72);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_39_td_2_Case_1_Template, 3, 2, "span", 73)(2, ListPhieuchiahangComponent_For_39_td_2_Case_2_Template, 2, 1, "span", 74)(3, ListPhieuchiahangComponent_For_39_td_2_Case_3_Template, 3, 4, "span", 75)(4, ListPhieuchiahangComponent_For_39_td_2_Case_4_Template, 3, 4, "span", 75)(5, ListPhieuchiahangComponent_For_39_td_2_Case_5_Template, 2, 1, "span", 76)(6, ListPhieuchiahangComponent_For_39_td_2_Case_6_Template, 2, 1, "span", 76)(7, ListPhieuchiahangComponent_For_39_td_2_Case_7_Template, 3, 1, "span", 76)(8, ListPhieuchiahangComponent_For_39_td_2_Case_8_Template, 2, 8, "span", 77)(9, ListPhieuchiahangComponent_For_39_td_2_Case_9_Template, 3, 4, "span", 75)(10, ListPhieuchiahangComponent_For_39_td_2_Case_10_Template, 2, 1, "span", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_18_0;
    const column_r14 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_18_0 = column_r14) === "STT" ? 1 : tmp_18_0 === "madonhang" ? 2 : tmp_18_0 === "createdAt" ? 3 : tmp_18_0 === "ngaygiao" ? 4 : tmp_18_0 === "khachhang" ? 5 : tmp_18_0 === "sanpham" ? 6 : tmp_18_0 === "isActive" ? 7 : tmp_18_0 === "status" ? 8 : tmp_18_0 === "updatedAt" ? 9 : 10);
  }
}
function ListPhieuchiahangComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 23);
    \u0275\u0275template(1, ListPhieuchiahangComponent_For_39_th_1_Template, 29, 5, "th", 53)(2, ListPhieuchiahangComponent_For_39_td_2_Template, 11, 1, "td", 54);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r14 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r14);
  }
}
function ListPhieuchiahangComponent_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 83);
  }
}
function ListPhieuchiahangComponent_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 84);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_tr_41_Template_tr_click_0_listener() {
      const row_r24 = \u0275\u0275restoreView(_r23).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleDonhang(row_r24));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r24 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r2.CheckItemInDonhang(row_r24) ? "!bg-slate-200" : "", "");
  }
}
function ListPhieuchiahangComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 85)(1, "td", 86);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPhieuchiahangComponent_ng_template_44_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 99)(1, "div", 100)(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const kh_r26 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kh_r26.name);
  }
}
function ListPhieuchiahangComponent_ng_template_44_tr_18_td_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 106)(1, "div", 107);
    \u0275\u0275element(2, "span", 108);
    \u0275\u0275elementStart(3, "span", 109);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_11_0;
    const kh_r27 = ctx.$implicit;
    const product_r28 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(((tmp_11_0 = ctx_r2.getProductQuantity(ctx_r2.Phieuchia, product_r28, kh_r27.makh)) == null ? null : tmp_11_0.slgiao) || "");
  }
}
function ListPhieuchiahangComponent_ng_template_44_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 101)(1, "td", 102);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 103);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 104);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ListPhieuchiahangComponent_ng_template_44_tr_18_td_7_Template, 5, 1, "td", 105);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_11_0;
    const product_r28 = ctx.$implicit;
    const idx_r29 = ctx.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", idx_r29 + 1, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", product_r28, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx_r2.getDvtForProduct(ctx_r2.Phieuchia, product_r28)) == null ? null : tmp_11_0.dvt, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.Phieuchia);
  }
}
function ListPhieuchiahangComponent_ng_template_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r25 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2, "Phi\u1EBFu Chia H\xE0ng ");
    \u0275\u0275elementStart(3, "button", 89);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_44_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printContent());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 90)(7, "table", 91)(8, "thead", 92)(9, "tr")(10, "th", 93);
    \u0275\u0275text(11, " STT ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 94);
    \u0275\u0275text(13, " T\xEAn SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 94);
    \u0275\u0275text(15, " \u0110VT ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ListPhieuchiahangComponent_ng_template_44_th_16_Template, 4, 1, "th", 95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ListPhieuchiahangComponent_ng_template_44_tr_18_Template, 8, 4, "tr", 96);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-dialog-actions", 97)(20, "button", 98);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_44_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r25);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.editDonhang = []);
    });
    \u0275\u0275text(21, "\u0110\xF3ng");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275property("ngForOf", ctx_r2.Phieuchia);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r2.getUniqueProducts(ctx_r2.Phieuchia));
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
  }
}
function ListPhieuchiahangComponent_ng_template_46_th_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 94)(1, "div", 114)(2, "span");
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
    const kh_r31 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(kh_r31.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(kh_r31.madonhang);
  }
}
function ListPhieuchiahangComponent_ng_template_46_tr_18_td_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r32 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 117)(1, "div", 118);
    \u0275\u0275listener("keydown.enter", function ListPhieuchiahangComponent_ng_template_46_tr_18_td_7_Template_div_keydown_enter_1_listener($event) {
      const j_r33 = \u0275\u0275restoreView(_r32).index;
      const i_r34 = \u0275\u0275nextContext().index;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.updateValue($event, j_r33, i_r34, "slgiao", "number"));
    });
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const j_r33 = ctx.index;
    const i_r34 = \u0275\u0275nextContext().index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classMapInterpolate1("slgiao-input-", j_r33, " px-2 min-w-28 text-end bg-slate-200 focus:border rounded-lg focus:border-blue-600 focus:bg-slate-100 focus:outline-none");
    \u0275\u0275property("contentEditable", true);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 5, (ctx_r2.ListBillXuly[j_r33] == null ? null : ctx_r2.ListBillXuly[j_r33].sanpham[i_r34] == null ? null : ctx_r2.ListBillXuly[j_r33].sanpham[i_r34].slgiao) || 0, "1.0-2"), " ");
  }
}
function ListPhieuchiahangComponent_ng_template_46_tr_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 115)(1, "td", 103);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 103);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 104);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, ListPhieuchiahangComponent_ng_template_46_tr_18_td_7_Template, 4, 8, "td", 116);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_9_0;
    let tmp_11_0;
    const product_r35 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_9_0 = ctx_r2.getDvtForProduct(ctx_r2.ListBillXuly, product_r35)) == null ? null : tmp_9_0.masp, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", product_r35, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", (tmp_11_0 = ctx_r2.getDvtForProduct(ctx_r2.ListBillXuly, product_r35)) == null ? null : tmp_11_0.dvt, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r2.ListBillXuly)("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieuchiahangComponent_ng_template_46_Template(rf, ctx) {
  if (rf & 1) {
    const _r30 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 87)(1, "div", 88);
    \u0275\u0275text(2, "X\xE1c Nh\u1EADn \u0110\u01A1n H\xE0ng ");
    \u0275\u0275elementStart(3, "button", 89);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_46_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r30);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.printContent());
    });
    \u0275\u0275elementStart(4, "mat-icon");
    \u0275\u0275text(5, "print");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 90)(7, "table", 91)(8, "thead", 110)(9, "tr")(10, "th", 94);
    \u0275\u0275text(11, " M\xE3 SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 94);
    \u0275\u0275text(13, " T\xEAn SP ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 94);
    \u0275\u0275text(15, " \u0110\u01A1n v\u1ECB ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(16, ListPhieuchiahangComponent_ng_template_46_th_16_Template, 8, 2, "th", 111);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "tbody");
    \u0275\u0275template(18, ListPhieuchiahangComponent_ng_template_46_tr_18_Template, 8, 5, "tr", 112);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(19, "mat-dialog-actions", 97)(20, "button", 113);
    \u0275\u0275text(21, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 52);
    \u0275\u0275listener("click", function ListPhieuchiahangComponent_ng_template_46_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r30);
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
  Detail = {};
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
  isFilter = false;
  Trangthaidon = TrangThaiDon;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _DonhangService = inject(DonhangService);
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
    Batdau: (0, import_moment.default)().toDate(),
    Ketthuc: (0, import_moment.default)().toDate(),
    Type: "donsi",
    Status: "dadat",
    pageSize: 100
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
    this.ngOnInit();
  }
  onDateChange(event) {
    this.ngOnInit();
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
      yield this._DonhangService.searchDonhang(this.SearchParams);
      this.CountItem = this.Listdonhang().length;
      this.initializeColumns();
      this.setupDrawer();
      this.dataSource = new MatTableDataSource(this.Listdonhang());
      console.log(this.dataSource.data);
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.filterPredicate = this.createFilter();
      this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
      this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
      this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
      this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
      this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
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
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    this.dataSource.filteredData = this.Listdonhang().filter((v) => removeVietnameseAccents(v[column]).includes(event.target.value.toLowerCase()) || v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listdonhang();
    this.dataSource.data = this.Listdonhang();
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
    this.dataSource.data = this.Listdonhang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
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
    return Array.from(products);
  }
  getProductQuantity(list, product, makh) {
    const customer = list.find((kh) => kh.makh === makh);
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
    const printContent = document.getElementById("printContent");
    if (printContent) {
      const newWindow = window.open("", "_blank");
      const tailwindCSS = `
    <script src="https://cdn.tailwindcss.com"></script>
    <script>
      tailwind.config = {
        theme: { extend: {} }
      };
    </script>
  `;
      if (newWindow) {
        newWindow.document.write(`
        <html>
        <head>
          <title>In B\u1EA3ng</title>
                 ${tailwindCSS}
          <style>
            body { font-size: 12px; font-family: Arial, sans-serif; }
            table { width: auto;
    border-collapse: collapse;
    margin-left: auto;
    margin-right: auto; }
            th, td { border: 1px solid #000; padding: 4px; text-align: left; }
            @media print { body { margin: 0; } }
          </style>
        </head>
        <body>
          ${printContent.outerHTML}
          <script>
            window.onload = function() { window.print(); window.close(); }
          </script>
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
  }
  trackByFn(index, item) {
    return item.id;
  }
  selectedFile;
  ListBill = this._StorageService.getItem("ListBill") || [];
  isLoading = false;
  // Biến để kiểm tra trạng thái loading
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
      this.isLoading = true;
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
        this.isLoading = false;
      }
    });
  }
  GetDonhang(items) {
    return __async(this, null, function* () {
      const query = {
        "model": "donhang",
        "filters": {
          "madonhang": { "value": items, "type": "in" }
        },
        "relations": {
          "sanpham": { "include": { "sanpham": true } },
          "khachhang": {
            "include": true
          }
        },
        "orderBy": { "field": "createdAt", "direction": "desc" },
        "take": 10
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
      const allowedKeys = ["Backspace", "Delete", "ArrowLeft", "ArrowRight", "Tab"];
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
  UpdateListBill() {
    console.log(this.ListBillXuly);
    const updatePromises = this.ListBillXuly.map((v) => __async(this, null, function* () {
      const v1 = yield this._DonhangService.SearchField({ madonhang: v.madonhang });
      v1.sanpham.forEach((v2) => {
        const item = v.sanpham.find((v3) => v3.masp === v2.masp);
        if (item) {
          v2.slgiao = item.slgiao;
        }
      });
      console.log(v1);
      yield this._DonhangService.updateDonhang(v1);
    }));
    Promise.all(updatePromises).then(() => {
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
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
  }, decls: 48, vars: 40, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["dialogCreateTemplate", ""], ["dialogXembill", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "px-2"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center px-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "grid", "lg:grid-cols-4", "grid-cols-2", "gap-2", "items-center"], [3, "appearance", "subscriptSizing"], [3, "ngModelChange", "selectionChange", "ngModel", "ngModelOptions"], [3, "value"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "flex", "flex-row", "space-x-2"], ["mat-flat-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions", "pageSize"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "px-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], ["hidden", "", "type", "file", 3, "change"], ["class", "flex flex-row items-center space-x-2", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], [1, "flex", "flex-row", "items-center", "space-x-2"], ["role", "status"], ["aria-hidden", "true", "viewBox", "0 0 100 101", "fill", "none", "xmlns", "http://www.w3.org/2000/svg", 1, "w-8", "h-8", "text-gray-200", "animate-spin", "dark:text-gray-600", "fill-blue-600"], ["d", "M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z", "fill", "currentColor"], ["d", "M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z", "fill", "currentFill"], [1, "sr-only"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center px-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "px-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "relative", "flex", "flex-col", "!w-screen", "!h-screen"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "font-bold", "p-4"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "w-full", "h-full", "flex", "flex-col", "space-y-8", "items-center", "p-4", "relative", "overflow-x-auto"], ["id", "printContent", 1, "text-left", "rtl:text-right", "leading-none", "p-4"], [1, "p-2", "border", "uppercase", "text-center", "text-[10px]"], ["scope", "col", 1, "w-5", "px-2", "border"], ["scope", "col", 1, "w-20", "px-2", "border"], ["scope", "col", "class", "px-2 border", 4, "ngFor", "ngForOf"], ["class", "px-2 border", 4, "ngFor", "ngForOf"], [1, "relative", 3, "align"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false", 3, "click"], ["scope", "col", 1, "px-2", "border"], [1, "!w-16", "flex", "flex-col", "space-y-1", "justify-between"], [1, "px-2", "border"], ["scope", "row", 1, "w-5", "px-2", "border", "font-medium", "text-gray-900", "whitespace-nowrap"], ["scope", "row", 1, "w-20", "px-2", "border", "font-medium", "text-gray-900", "whitespace-nowrap"], [1, "w-20", "px-2", "border", "text-start"], ["class", "text-end px-2 border", 4, "ngFor", "ngForOf"], [1, "text-end", "px-2", "border"], [1, "!w-16", "flex", "justify-between", "items-center"], [1, "w-1/2", "px-2", "h-8"], [1, "w-1/2", "flex", "items-center", "justify-end", "px-2", "h-8"], [1, "p-2", "border", "uppercase", "text-center"], ["scope", "col", "class", "w-20 px-2 border", 4, "ngFor", "ngForOf"], ["class", "p-2 border", 4, "ngFor", "ngForOf"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "w-full", "flex", "flex-col", "space-y-1", "justify-between"], [1, "p-2", "border"], ["class", "w-20 text-end px-2 border", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "w-20", "text-end", "px-2", "border"], [3, "keydown.enter", "contentEditable"]], template: function ListPhieuchiahangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 8)(1, "mat-drawer", 9, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 10);
      \u0275\u0275template(5, ListPhieuchiahangComponent_div_5_Template, 25, 4, "div", 11)(6, ListPhieuchiahangComponent_div_6_Template, 8, 0, "div", 12);
      \u0275\u0275elementStart(7, "div", 13)(8, "mat-form-field", 14)(9, "mat-label");
      \u0275\u0275text(10, "Lo\u1EA1i \u0110\u01A1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_mat_select_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhieuchiahangComponent_Template_mat_select_selectionChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSelectionChange($event));
      });
      \u0275\u0275repeaterCreate(12, ListPhieuchiahangComponent_For_13_Template, 2, 2, "mat-option", 16, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-form-field", 14)(15, "mat-label");
      \u0275\u0275text(16, "Ch\u1ECDn Th\u1EDDi Gian");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_mat_select_ngModelChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.Chonthoigian, $event) || (ctx.Chonthoigian = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function ListPhieuchiahangComponent_Template_mat_select_selectionChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSelectionChange($event));
      });
      \u0275\u0275repeaterCreate(18, ListPhieuchiahangComponent_For_19_Template, 2, 2, "mat-option", 16, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "mat-form-field", 14)(21, "mat-label");
      \u0275\u0275text(22, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "input", 17);
      \u0275\u0275listener("dateChange", function ListPhieuchiahangComponent_Template_input_dateChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_input_ngModelChange_23_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "mat-datepicker-toggle", 18)(25, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-form-field", 14)(28, "mat-label");
      \u0275\u0275text(29, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "input", 17);
      \u0275\u0275listener("dateChange", function ListPhieuchiahangComponent_Template_input_dateChange_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieuchiahangComponent_Template_input_ngModelChange_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(31, "mat-datepicker-toggle", 18)(32, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 19);
      \u0275\u0275template(35, ListPhieuchiahangComponent_button_35_Template, 2, 0, "button", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "div", 21)(37, "table", 22);
      \u0275\u0275repeaterCreate(38, ListPhieuchiahangComponent_For_39_Template, 3, 1, "ng-container", 23, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(40, ListPhieuchiahangComponent_tr_40_Template, 1, 0, "tr", 24)(41, ListPhieuchiahangComponent_tr_41_Template, 1, 3, "tr", 25)(42, ListPhieuchiahangComponent_tr_42_Template, 3, 0, "tr", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(43, "mat-paginator", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(44, ListPhieuchiahangComponent_ng_template_44_Template, 22, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor)(46, ListPhieuchiahangComponent_ng_template_46_Template, 24, 3, "ng-template", null, 4, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const pickerBatdau_r36 = \u0275\u0275reference(26);
      const pickerKetthuc_r37 = \u0275\u0275reference(33);
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
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(29, _c1));
      \u0275\u0275advance();
      \u0275\u0275repeater(\u0275\u0275pureFunction2(32, _c4, \u0275\u0275pureFunction0(30, _c2), \u0275\u0275pureFunction0(31, _c3)));
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275twoWayProperty("ngModel", ctx.Chonthoigian);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c1));
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.ListDate);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r36);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(36, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r36);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r37);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(37, _c1));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r37);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.editDonhang.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction1(38, _c5, ctx.dataSource.data.length))("pageSize", 100);
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
  ], encapsulation: 2 });
};
__decorate([
  memoize()
], ListPhieuchiahangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListPhieuchiahangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieuchiahangComponent, { className: "ListPhieuchiahangComponent", filePath: "src/app/admin/phieuchiahang/listphieuchiahang/listphieuchiahang.component.ts", lineNumber: 71 });
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
//# sourceMappingURL=chunk-JQLKVDZU.mjs.map
