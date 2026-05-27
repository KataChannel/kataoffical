import {
  utils,
  writeFileSync
} from "./chunk-P2TQI6AF.js";
import {
  CancelOrderService
} from "./chunk-V74AJ6W4.js";
import {
  TrangThaiDon
} from "./chunk-JX4EGZQX.js";
import {
  KhoService
} from "./chunk-WSPM3ROW.js";
import {
  BanggiaService
} from "./chunk-KR6X3Z2G.js";
import {
  DathangService
} from "./chunk-QA4Y3GND.js";
import {
  NhacungcapService
} from "./chunk-QEWHOYUO.js";
import {
  SanphamService
} from "./chunk-OYBNSF2S.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-4I62SID5.js";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-DR2JAJDC.js";
import {
  TimezoneService
} from "./chunk-WNHP5LA7.js";
import {
  readExcelFileNoWorker,
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
import {
  MatProgressSpinnerModule
} from "./chunk-DGYBLSTA.js";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
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
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-RYTJZHDX.js";
import {
  MatTabsModule
} from "./chunk-VXRXYM4Q.js";
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
  MatChip,
  MatChipsModule
} from "./chunk-4Q2WCKDS.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TAPSLW5I.js";
import {
  MatSelect,
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
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import {
  BreakpointObserver,
  Breakpoints,
  MatNativeDateModule,
  MatOption
} from "./chunk-EPU6HK6I.js";
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
  ɵɵpureFunction2,
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
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/dathang/listdathang/listdathang.component.ts
var import_moment = __toESM(require_moment());
var _c0 = ["drawer"];
var _c1 = ["dialogImportExcel"];
var _c2 = ["dialogImportExcelCu"];
var _c3 = ["dialogComparePrice"];
var _c4 = () => ({ standalone: true });
var _c5 = (a0) => ({ "text-red-600": a0 });
var _c6 = (a0, a1) => ({ "text-green-600 font-semibold": a0, "text-yellow-600 font-semibold": a1 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.id;
var _forTrack2 = ($index, $item) => ($item.sanpham == null ? null : $item.sanpham.id) || $index;
function ListDathangComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 66);
    \u0275\u0275listener("click", function ListDathangComponent_For_39_Template_button_click_0_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      ctx_r4.toggleColumn(item_r4);
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
function ListDathangComponent_Conditional_43_button_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 69);
    \u0275\u0275listener("click", function ListDathangComponent_Conditional_43_button_0_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext(2);
      const DeleteDialog_r7 = \u0275\u0275reference(123);
      return \u0275\u0275resetView(ctx_r4.openDeleteDialog(DeleteDialog_r7));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 26);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_Conditional_43_button_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 70);
    \u0275\u0275listener("click", function ListDathangComponent_Conditional_43_button_1_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.DoDanhan());
    });
    \u0275\u0275elementStart(1, "span", 26);
    \u0275\u0275text(2, "\u0110\xE3 Nh\u1EADn");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_Conditional_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListDathangComponent_Conditional_43_button_0_Template, 5, 0, "button", 67)(1, ListDathangComponent_Conditional_43_button_1_Template, 3, 0, "button", 68);
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r4.EditList.length > 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.EditList.length > 0);
  }
}
function ListDathangComponent_For_87_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 73)(1, "span", 74);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.ColumnName[column_r9], " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r10 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r10 + 1, " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275listener("click", function ListDathangComponent_For_87_td_2_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const row_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.goToDetail(row_r12));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12[column_r9], " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12[column_r9].length, " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", row_r12[column_r9].mancc, ") ", row_r12[column_r9].name, " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 78);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12.ngaynhan, "dd/MM/yyyy"), " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 80);
    \u0275\u0275element(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", ctx_r4.getStatusStyle(row_r12[column_r9]));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.getStatusLabel(row_r12[column_r9]), " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_8_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 84);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListDathangComponent_For_87_td_2_Case_8_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 85);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListDathangComponent_For_87_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275template(1, ListDathangComponent_For_87_td_2_Case_8_Conditional_1_Template, 2, 0, "mat-icon", 84)(2, ListDathangComponent_For_87_td_2_Case_8_Conditional_2_Template, 2, 0, "mat-icon", 85);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r12[column_r9] ? 1 : 2);
  }
}
function ListDathangComponent_For_87_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 79);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r9], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 86);
    \u0275\u0275listener("click", function ListDathangComponent_For_87_td_2_Case_10_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "button", 87);
    \u0275\u0275listener("click", function ListDathangComponent_For_87_td_2_Case_10_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r13);
      const row_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.handleCancelDathang(row_r12));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r4.cancelOrderService.canCancelOrder(row_r12))("matTooltip", ctx_r4.cancelOrderService.getCancelButtonTooltip(row_r12));
  }
}
function ListDathangComponent_For_87_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(2, _c5, row_r12.status === "huy" || row_r12.status === "dahuy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12.lydohuy || "-", " ");
  }
}
function ListDathangComponent_For_87_td_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 76);
  }
}
function ListDathangComponent_For_87_td_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12[column_r9], " ");
  }
}
function ListDathangComponent_For_87_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 75);
    \u0275\u0275template(1, ListDathangComponent_For_87_td_2_Case_1_Template, 2, 1, "span", 76)(2, ListDathangComponent_For_87_td_2_Case_2_Template, 2, 1, "span", 77)(3, ListDathangComponent_For_87_td_2_Case_3_Template, 2, 1, "span", 76)(4, ListDathangComponent_For_87_td_2_Case_4_Template, 2, 2, "span", 76)(5, ListDathangComponent_For_87_td_2_Case_5_Template, 3, 4, "span", 78)(6, ListDathangComponent_For_87_td_2_Case_6_Template, 3, 4, "span", 79)(7, ListDathangComponent_For_87_td_2_Case_7_Template, 3, 2, "div", 80)(8, ListDathangComponent_For_87_td_2_Case_8_Template, 3, 1, "span", 76)(9, ListDathangComponent_For_87_td_2_Case_9_Template, 3, 4, "span", 79)(10, ListDathangComponent_For_87_td_2_Case_10_Template, 4, 2, "div", 81)(11, ListDathangComponent_For_87_td_2_Case_11_Template, 2, 4, "span", 82)(12, ListDathangComponent_For_87_td_2_Case_12_Template, 1, 0, "span", 76)(13, ListDathangComponent_For_87_td_2_Case_13_Template, 2, 1, "span", 76);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_25_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_25_0 = column_r9) === "STT" ? 1 : tmp_25_0 === "madncc" ? 2 : tmp_25_0 === "sanpham" ? 3 : tmp_25_0 === "nhacungcap" ? 4 : tmp_25_0 === "ngaynhan" ? 5 : tmp_25_0 === "createdAt" ? 6 : tmp_25_0 === "status" ? 7 : tmp_25_0 === "isActive" ? 8 : tmp_25_0 === "updatedAt" ? 9 : tmp_25_0 === "actions" ? 10 : tmp_25_0 === "lydohuy" ? 11 : tmp_25_0 === "action" ? 12 : 13);
  }
}
function ListDathangComponent_For_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 52);
    \u0275\u0275template(1, ListDathangComponent_For_87_th_1_Template, 3, 1, "th", 71)(2, ListDathangComponent_For_87_td_2_Template, 14, 1, "td", 72);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
  }
}
function ListDathangComponent_tr_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 88);
  }
}
function ListDathangComponent_tr_89_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 89);
    \u0275\u0275listener("click", function ListDathangComponent_tr_89_Template_tr_click_0_listener() {
      const row_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.AddToEdit(row_r15));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r4.CheckItemInEdit(row_r15) ? "!bg-slate-200" : "", "");
  }
}
function ListDathangComponent_tr_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 90)(1, "td", 91);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_ng_template_122_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 92)(2, "div", 93);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 94)(7, "button", 95);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 96);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListDathangComponent_ng_template_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 92)(2, "div", 93);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 94)(7, "button", 95);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 96);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListDathangComponent_ng_template_126_tr_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275text(0);
    \u0275\u0275elementStart(1, "button", 122);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_126_tr_30_Conditional_2_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const detail_r19 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeItemImport(detail_r19));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const i_r20 = \u0275\u0275nextContext().index;
    \u0275\u0275textInterpolate1(" ", i_r20 + 1, " ");
  }
}
function ListDathangComponent_ng_template_126_tr_30_Conditional_4_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r22 = ctx.$implicit;
    \u0275\u0275property("value", item_r22.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r22.name);
  }
}
function ListDathangComponent_ng_template_126_tr_30_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 32)(1, "mat-label");
    \u0275\u0275text(2, "Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 123);
    \u0275\u0275listener("selectionChange", function ListDathangComponent_ng_template_126_tr_30_Conditional_4_Template_mat_select_selectionChange_3_listener($event) {
      \u0275\u0275restoreView(_r21);
      const detail_r19 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.SelectNhacungcap(detail_r19, $event));
    });
    \u0275\u0275elementStart(4, "div", 124)(5, "mat-form-field", 125)(6, "input", 126);
    \u0275\u0275listener("input", function ListDathangComponent_ng_template_126_tr_30_Conditional_4_Template_input_input_6_listener($event) {
      \u0275\u0275restoreView(_r21);
      const i_r20 = \u0275\u0275nextContext().index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.DoFindNhacungcap($event, i_r20));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 127);
    \u0275\u0275repeaterCreate(8, ListDathangComponent_ng_template_126_tr_30_Conditional_4_For_9_Template, 2, 2, "mat-option", 128, _forTrack1);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const i_r20 = \u0275\u0275nextContext().index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(8);
    \u0275\u0275repeater(ctx_r4.FilterNhacungcap[i_r20]);
  }
}
function ListDathangComponent_ng_template_126_tr_30_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r23 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 32)(1, "mat-label");
    \u0275\u0275text(2, "Ng\xE0y Nh\u1EADn ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 129);
    \u0275\u0275listener("dateChange", function ListDathangComponent_ng_template_126_tr_30_Conditional_6_Template_input_dateChange_3_listener($event) {
      \u0275\u0275restoreView(_r23);
      const detail_r19 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.DoChonNgaynhan($event, detail_r19));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 40)(5, "mat-datepicker", null, 12);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const picker_r24 = \u0275\u0275reference(6);
    const i_r20 = \u0275\u0275nextContext().index;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngModel", ctx_r4.statusDetails[i_r20] == null ? null : ctx_r4.statusDetails[i_r20].ngaynhan)("matDatepicker", picker_r24);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r24);
  }
}
function ListDathangComponent_ng_template_126_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 115);
    \u0275\u0275template(2, ListDathangComponent_ng_template_126_tr_30_Conditional_2_Template, 4, 1);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 116);
    \u0275\u0275template(4, ListDathangComponent_ng_template_126_tr_30_Conditional_4_Template, 10, 0, "mat-form-field", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 117);
    \u0275\u0275template(6, ListDathangComponent_ng_template_126_tr_30_Conditional_6_Template, 7, 3, "mat-form-field", 32);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 118);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 118);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 119)(12, "span", 120);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "td", 121);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r19 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(detail_r19.status === "Processed" ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(detail_r19.status === "Processed" ? 4 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(detail_r19.status === "Processed" ? 6 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r19.fileName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r19.tenkhongdau);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(8, _c6, detail_r19.status === "Processed" || detail_r19.status === "Success", detail_r19.status === "Skipped"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", detail_r19.status, " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r19.message);
  }
}
function ListDathangComponent_ng_template_126_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 97);
    \u0275\u0275text(1, "Import \u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 98)(3, "div", 99)(4, "div", 100)(5, "table", 101)(6, "thead", 102)(7, "tr")(8, "th", 103);
    \u0275\u0275text(9, " # ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 104);
    \u0275\u0275text(11, " Nh\xE0 Cung C\u1EA5p ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 105);
    \u0275\u0275text(13, " Ng\xE0y Nh\u1EADn ");
    \u0275\u0275elementStart(14, "mat-form-field", 62)(15, "mat-label");
    \u0275\u0275text(16, "Ng\xE0y Nh\u1EADn All ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "input", 106);
    \u0275\u0275listener("dateChange", function ListDathangComponent_ng_template_126_Template_input_dateChange_17_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.DoChonNgaynhan($event, "All"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(18, "mat-datepicker-toggle", 40)(19, "mat-datepicker", null, 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "th", 107);
    \u0275\u0275text(22, " File Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "th", 107);
    \u0275\u0275text(24, " T\xEAn Kh\xF4ng D\u1EA5u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "th", 108);
    \u0275\u0275text(26, " Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "th", 109);
    \u0275\u0275text(28, " Message");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "tbody", 110);
    \u0275\u0275template(30, ListDathangComponent_ng_template_126_tr_30_Template, 16, 11, "tr", 111);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "mat-dialog-actions", 112)(32, "button", 113);
    \u0275\u0275text(33, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "button", 114);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_126_Template_button_click_34_listener() {
      \u0275\u0275restoreView(_r17);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.DoImportNhacungcapCu());
    });
    \u0275\u0275text(35, "C\u1EADp Nh\u1EADt");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const picker_r25 = \u0275\u0275reference(20);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(17);
    \u0275\u0275property("matDatepicker", picker_r25);
    \u0275\u0275advance();
    \u0275\u0275property("for", picker_r25);
    \u0275\u0275advance(12);
    \u0275\u0275property("ngForOf", ctx_r4.statusDetails);
  }
}
function ListDathangComponent_ng_template_128_For_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kho_r27 = ctx.$implicit;
    \u0275\u0275property("value", kho_r27.makho);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", kho_r27.makho, " (", kho_r27.name, ") ");
  }
}
function ListDathangComponent_ng_template_128_For_32_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 141);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const kho_r30 = ctx.$implicit;
    \u0275\u0275property("value", kho_r30);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", kho_r30.makho, " (", kho_r30.name, ") ");
  }
}
function ListDathangComponent_ng_template_128_For_32_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 158)(1, "span", 164);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 165);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r29 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("Excel: ", order_r29.originalMakho, "");
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r4.getKhoMatchStatusColor(order_r29.configOptions == null ? null : order_r29.configOptions.khoMatchStatus));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getKhoMatchStatusText(order_r29.configOptions == null ? null : order_r29.configOptions.khoMatchStatus), " ");
  }
}
function ListDathangComponent_ng_template_128_For_32_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 163)(1, "td", 166);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 167);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 166);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 166);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 168);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 166);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 166);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 169);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const sp_r31 = ctx.$implicit;
    const \u0275$index_618_r32 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_618_r32 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((sp_r31.sanpham == null ? null : sp_r31.sanpham.masp) || sp_r31.masp || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((sp_r31.sanpham == null ? null : sp_r31.sanpham.title) || sp_r31.title || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate((sp_r31.sanpham == null ? null : sp_r31.sanpham.dvt) || sp_r31.dvt || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sp_r31.sldat || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sp_r31.slgiao || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sp_r31.slnhan || 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(sp_r31.ghichu || "");
  }
}
function ListDathangComponent_ng_template_128_For_32_ForEmpty_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 170);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_ng_template_128_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r28 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 144)(1, "div", 151)(2, "div", 152)(3, "mat-checkbox", 153);
    \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_ng_template_128_For_32_Template_mat_checkbox_ngModelChange_3_listener($event) {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(order_r29.configOptions.confirmed, $event) || (order_r29.configOptions.confirmed = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("change", function ListDathangComponent_ng_template_128_For_32_Template_mat_checkbox_change_3_listener() {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.toggleOrderConfirmation(order_r29));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 154);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 148);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(9, "button", 155);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_128_For_32_Template_button_click_9_listener() {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeOrderFromImport(order_r29));
    });
    \u0275\u0275elementStart(10, "mat-icon");
    \u0275\u0275text(11, "delete");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "div", 156)(13, "mat-form-field", 62)(14, "mat-label");
    \u0275\u0275text(15, "Ng\xE0y nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 138);
    \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_ng_template_128_For_32_Template_input_ngModelChange_16_listener($event) {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(order_r29.configOptions.selectedDate, $event) || (order_r29.configOptions.selectedDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("dateChange", function ListDathangComponent_ng_template_128_For_32_Template_input_dateChange_16_listener($event) {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.updateOrderDate(order_r29, $event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(17, "mat-datepicker-toggle", 40)(18, "mat-datepicker", null, 14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 157)(21, "mat-form-field", 62)(22, "mat-label");
    \u0275\u0275text(23, "Kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-select", 140);
    \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_ng_template_128_For_32_Template_mat_select_ngModelChange_24_listener($event) {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      \u0275\u0275twoWayBindingSet(order_r29.khoSelected, $event) || (order_r29.khoSelected = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function ListDathangComponent_ng_template_128_For_32_Template_mat_select_selectionChange_24_listener($event) {
      const order_r29 = \u0275\u0275restoreView(_r28).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.updateOrderKhoSelection(order_r29, $event.value));
    });
    \u0275\u0275repeaterCreate(25, ListDathangComponent_ng_template_128_For_32_For_26_Template, 2, 3, "mat-option", 141, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(27, ListDathangComponent_ng_template_128_For_32_Conditional_27_Template, 5, 3, "div", 158);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(28, "div", 100)(29, "table", 159)(30, "thead", 160)(31, "tr")(32, "th", 161);
    \u0275\u0275text(33, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "th", 161);
    \u0275\u0275text(35, "M\xE3 SP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(36, "th", 161);
    \u0275\u0275text(37, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "th", 161);
    \u0275\u0275text(39, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "th", 161);
    \u0275\u0275text(41, "SL \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(42, "th", 161);
    \u0275\u0275text(43, "SL Giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "th", 161);
    \u0275\u0275text(45, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "th", 161);
    \u0275\u0275text(47, "Ghi ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(48, "tbody", 162);
    \u0275\u0275repeaterCreate(49, ListDathangComponent_ng_template_128_For_32_For_50_Template, 17, 8, "tr", 163, _forTrack2, false, ListDathangComponent_ng_template_128_For_32_ForEmpty_51_Template, 3, 0, "tr");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const order_r29 = ctx.$implicit;
    const orderDatePicker_r33 = \u0275\u0275reference(19);
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", (order_r29.configOptions == null ? null : order_r29.configOptions.confirmed) ? "border-green-500 bg-green-50" : "border-gray-300");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", order_r29.configOptions.confirmed);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", (order_r29.summary == null ? null : order_r29.summary.supplierName) || (order_r29.nhacungcap == null ? null : order_r29.nhacungcap.name) || "N/A", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate3(" M\xE3 NCC: ", (order_r29.summary == null ? null : order_r29.summary.supplierCode) || (order_r29.nhacungcap == null ? null : order_r29.nhacungcap.mancc) || "N/A", " | ", (order_r29.summary == null ? null : order_r29.summary.totalProducts) || (order_r29.sanpham == null ? null : order_r29.sanpham.length) || 0, " s\u1EA3n ph\u1EA9m | T\u1ED5ng SL: ", (order_r29.summary == null ? null : order_r29.summary.totalQuantity) || ctx_r4.getTotalQuantity(order_r29), " ");
    \u0275\u0275advance(8);
    \u0275\u0275property("matDatepicker", orderDatePicker_r33);
    \u0275\u0275twoWayProperty("ngModel", order_r29.configOptions.selectedDate);
    \u0275\u0275advance();
    \u0275\u0275property("for", orderDatePicker_r33);
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", order_r29.khoSelected);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.ImportConfig.ListKho);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(order_r29.originalMakho ? 27 : -1);
    \u0275\u0275advance(22);
    \u0275\u0275repeater(order_r29.sanpham);
  }
}
function ListDathangComponent_ng_template_128_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 145)(1, "div", 171);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 import");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 172);
    \u0275\u0275text(4, "Vui l\xF2ng ch\u1ECDn file Excel h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_ng_template_128_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 130)(1, "span");
    \u0275\u0275text(2, "Import \u0110\u1EB7t H\xE0ng t\u1EEB Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 131)(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 132);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(8, "mat-dialog-content", 133)(9, "div", 134)(10, "div", 135)(11, "div", 136)(12, "mat-form-field", 137)(13, "mat-label");
    \u0275\u0275text(14, "Ng\xE0y nh\u1EADn (T\u1EA5t c\u1EA3)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "input", 138);
    \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_ng_template_128_Template_input_ngModelChange_15_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.ImportConfig.selectedDate, $event) || (ctx_r4.ImportConfig.selectedDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("dateChange", function ListDathangComponent_ng_template_128_Template_input_dateChange_15_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.updateAllOrdersDate($event.value));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(16, "mat-datepicker-toggle", 40)(17, "mat-datepicker", null, 13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "mat-form-field", 139)(20, "mat-label");
    \u0275\u0275text(21, "Kho (T\u1EA5t c\u1EA3)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "mat-select", 140);
    \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_ng_template_128_Template_mat_select_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r4.ImportConfig.selectedKho, $event) || (ctx_r4.ImportConfig.selectedKho = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function ListDathangComponent_ng_template_128_Template_mat_select_selectionChange_22_listener($event) {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.updateAllOrdersKho($event.value));
    });
    \u0275\u0275repeaterCreate(23, ListDathangComponent_ng_template_128_For_24_Template, 2, 3, "mat-option", 141, _forTrack1);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "button", 114);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_128_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.toggleAllOrdersConfirmation());
    });
    \u0275\u0275elementStart(26, "mat-icon");
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(29, "div", 142)(30, "div", 143);
    \u0275\u0275repeaterCreate(31, ListDathangComponent_ng_template_128_For_32_Template, 52, 12, "div", 144, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(33, ListDathangComponent_ng_template_128_Conditional_33_Template, 5, 0, "div", 145);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(34, "mat-dialog-actions", 146)(35, "div", 147)(36, "div", 148);
    \u0275\u0275text(37);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "div", 149)(39, "button", 96);
    \u0275\u0275text(40, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "button", 150);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_128_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ImportConfirmedDathang());
    });
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const globalDatePicker_r34 = \u0275\u0275reference(18);
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r4.ListImportExcel.length, " \u0111\u01A1n h\xE0ng");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", ctx_r4.getConfirmedOrdersCount(), " \u0111\xE3 x\xE1c nh\u1EADn");
    \u0275\u0275advance(8);
    \u0275\u0275property("matDatepicker", globalDatePicker_r34);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.ImportConfig.selectedDate);
    \u0275\u0275advance();
    \u0275\u0275property("for", globalDatePicker_r34);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r4.ImportConfig.selectedKho);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.ImportConfig.ListKho);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r4.getConfirmedOrdersCount() === ctx_r4.ListImportExcel.length ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getConfirmedOrdersCount() === ctx_r4.ListImportExcel.length ? "B\u1ECF ch\u1ECDn t\u1EA5t c\u1EA3" : "Ch\u1ECDn t\u1EA5t c\u1EA3", " ");
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.ListImportExcel);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.ListImportExcel.length === 0 ? 33 : -1);
    \u0275\u0275advance();
    \u0275\u0275property("align", "end");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate2(" \u0110\xE3 ch\u1ECDn ", ctx_r4.getConfirmedOrdersCount(), " / ", ctx_r4.ListImportExcel.length, " \u0111\u01A1n h\xE0ng ");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r4.getConfirmedOrdersCount() === 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Import ", ctx_r4.getConfirmedOrdersCount(), " \u0111\u01A1n h\xE0ng ");
  }
}
function ListDathangComponent_ng_template_130_For_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 187)(1, "div", 191);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const dateCol_r36 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dateCol_r36);
  }
}
function ListDathangComponent_ng_template_130_For_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 192)(1, "div", 193);
    \u0275\u0275text(2, "SL \u0111\u1EB7t");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(3, "th", 192)(4, "div", 193);
    \u0275\u0275text(5, "Gi\xE1 nh\u1EADp");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_ng_template_130_For_44_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 194);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("rowspan", element_r37._rowspanMasp);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r37["M\xE3 SP"], " ");
  }
}
function ListDathangComponent_ng_template_130_For_44_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 195);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275attribute("rowspan", element_r37._rowspanTensp);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", element_r37["T\xEAn SP"], " ");
  }
}
function ListDathangComponent_ng_template_130_For_44_For_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 198);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dateCol_r38 = \u0275\u0275nextContext().$implicit;
    const element_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, element_r37[dateCol_r38].sldat, "1.0-0"));
  }
}
function ListDathangComponent_ng_template_130_For_44_For_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 172);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ListDathangComponent_ng_template_130_For_44_For_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 199);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dateCol_r38 = \u0275\u0275nextContext().$implicit;
    const element_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, element_r37[dateCol_r38].gianhap, "1.0-0"), " \u0111 ");
  }
}
function ListDathangComponent_ng_template_130_For_44_For_6_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 172);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ListDathangComponent_ng_template_130_For_44_For_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 197);
    \u0275\u0275template(1, ListDathangComponent_ng_template_130_For_44_For_6_Conditional_1_Template, 3, 4, "span", 198)(2, ListDathangComponent_ng_template_130_For_44_For_6_Conditional_2_Template, 2, 0, "span", 172);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 197);
    \u0275\u0275template(4, ListDathangComponent_ng_template_130_For_44_For_6_Conditional_4_Template, 3, 4, "span", 199)(5, ListDathangComponent_ng_template_130_For_44_For_6_Conditional_5_Template, 2, 0, "span", 172);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const dateCol_r38 = ctx.$implicit;
    const element_r37 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(element_r37[dateCol_r38] && element_r37[dateCol_r38].sldat > 0 ? 1 : 2);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(element_r37[dateCol_r38] && element_r37[dateCol_r38].gianhap > 0 ? 4 : 5);
  }
}
function ListDathangComponent_ng_template_130_For_44_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 163);
    \u0275\u0275template(1, ListDathangComponent_ng_template_130_For_44_Conditional_1_Template, 2, 2, "td", 194)(2, ListDathangComponent_ng_template_130_For_44_Conditional_2_Template, 2, 2, "td", 195);
    \u0275\u0275elementStart(3, "td", 196);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(5, ListDathangComponent_ng_template_130_For_44_For_6_Template, 6, 2, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const element_r37 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(element_r37._showMasp ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(element_r37._showTensp ? 2 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", element_r37["T\xEAn NCC"], " ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.comparePriceDateColumns);
  }
}
function ListDathangComponent_ng_template_130_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 188)(1, "mat-icon", 200);
    \u0275\u0275text(2, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 201);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 202);
    \u0275\u0275text(6, "Vui l\xF2ng ch\u1ECDn kho\u1EA3ng th\u1EDDi gian kh\xE1c");
    \u0275\u0275elementEnd()();
  }
}
function ListDathangComponent_ng_template_130_Template(rf, ctx) {
  if (rf & 1) {
    const _r35 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 173)(1, "div")(2, "h2", 174);
    \u0275\u0275text(3, "So S\xE1nh Gi\xE1 Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 175);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "date");
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 176)(9, "mat-icon");
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "mat-dialog-content", 177)(12, "div", 178)(13, "div", 179)(14, "div", 180);
    \u0275\u0275text(15, " Hi\u1EC3n th\u1ECB ");
    \u0275\u0275elementStart(16, "span", 93);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " / ");
    \u0275\u0275elementStart(19, "span", 93);
    \u0275\u0275text(20);
    \u0275\u0275elementEnd();
    \u0275\u0275text(21, " d\xF2ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "button", 114);
    \u0275\u0275listener("click", function ListDathangComponent_ng_template_130_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r35);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.exportComparePriceExcel());
    });
    \u0275\u0275elementStart(23, "mat-icon");
    \u0275\u0275text(24, "download");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 181)(28, "table", 182)(29, "thead", 183)(30, "tr")(31, "th", 184);
    \u0275\u0275text(32, "M\xE3 SP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "th", 185);
    \u0275\u0275text(34, "T\xEAn SP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "th", 186);
    \u0275\u0275text(36, "T\xEAn NCC");
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(37, ListDathangComponent_ng_template_130_For_38_Template, 3, 1, "th", 187, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "tr");
    \u0275\u0275repeaterCreate(40, ListDathangComponent_ng_template_130_For_41_Template, 6, 0, null, null, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "tbody");
    \u0275\u0275repeaterCreate(43, ListDathangComponent_ng_template_130_For_44_Template, 7, 3, "tr", 163, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(45, ListDathangComponent_ng_template_130_Conditional_45_Template, 7, 0, "div", 188);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "mat-dialog-actions", 189)(47, "button", 190);
    \u0275\u0275text(48, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate2(" T\u1EEB ", \u0275\u0275pipeBind2(6, 6, ctx_r4.searchParam.Batdau, "dd/MM/yyyy"), " \u0111\u1EBFn ", \u0275\u0275pipeBind2(7, 9, ctx_r4.searchParam.Ketthuc, "dd/MM/yyyy"), " ");
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r4.getDisplayedComparePriceData().length);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.comparePriceTotalRecords);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1("Xu\u1EA5t Excel (To\xE0n b\u1ED9 ", ctx_r4.comparePriceTotalRecords, " d\xF2ng)");
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r4.comparePriceDateColumns);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.comparePriceDateColumns);
    \u0275\u0275advance(3);
    \u0275\u0275repeater(ctx_r4.getDisplayedComparePriceData());
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.comparePriceData.length === 0 ? 45 : -1);
  }
}
var ListDathangComponent = class _ListDathangComponent {
  Detail = {};
  displayedColumns = [
    "STT",
    // 'title',
    "madncc",
    "nhacungcap",
    "sanpham",
    "ngaynhan",
    "status",
    "ghichu",
    "createdAt",
    "updatedAt",
    "actions",
    "lydohuy"
  ];
  ColumnName = {
    STT: "STT",
    //  title: 'Tiêu Đề',
    madncc: "M\xE3 \u0110\u01A1n Nh\u1EADp",
    nhacungcap: "Nh\xE0 Cung C\u1EA5p",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    ngaynhan: "Ng\xE0y Nh\u1EADn",
    status: "Tr\u1EA1ng Th\xE1i",
    ghichu: "Ghi Ch\xFA",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt",
    actions: "Thao T\xE1c",
    lydohuy: "L\xFD Do H\u1EE7y"
  };
  FilterColumns = JSON.parse(localStorage.getItem("DathangColFilter") || "[]");
  Columns = [];
  isFilter = false;
  Trangthaidon = TrangThaiDon;
  paginator;
  sort;
  drawer;
  dialogImportExcel;
  dialogImportExcelCu;
  filterValues = {};
  _DathangService = inject(DathangService);
  _breakpointObserver = inject(BreakpointObserver);
  _NhacungcapService = inject(NhacungcapService);
  _SanphamService = inject(SanphamService);
  _BanggiaService = inject(BanggiaService);
  _KhoService = inject(KhoService);
  _router = inject(Router);
  _timezoneService = inject(TimezoneService);
  cancelOrderService = inject(CancelOrderService);
  Listdathang = this._DathangService.ListDathang;
  page = this._DathangService.page;
  pageCount = this._DathangService.pageCount;
  total = this._DathangService.total;
  pageSize = this._DathangService.pageSize;
  dathangId = this._DathangService.dathangId;
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  suppliers = [];
  // List of suppliers for import
  dialog = inject(MatDialog);
  ListImportExcel = [];
  // Import data from Excel
  searchParam = {
    Batdau: (0, import_moment.default)().toDate(),
    // These are for datepicker - keep as Date objects
    Ketthuc: (0, import_moment.default)().toDate(),
    // These are for datepicker - keep as Date objects
    page: this.page(),
    pageSize: this.pageSize()
  };
  totalItems = 0;
  constructor() {
    effect(() => __async(this, null, function* () {
      this.dataSource.data = this.Listdathang();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    }));
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
  onPageSizeChange(size, menuHienthi) {
    if (size > this.total()) {
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.total()}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      size = this.total();
    }
    this._DathangService.page.set(1);
    this._DathangService.getDathangBy(this.searchParam);
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.page() > 1) {
      this._DathangService.page.set(this.page() - 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }
  onNextPage() {
    if (this.page() < this.pageCount()) {
      this._DathangService.page.set(this.page() + 1);
      this.searchParam.page = this.page();
      this._DathangService.getDathangBy(this.searchParam);
    }
  }
  onDateChange() {
    this.ngOnInit();
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._DathangService.getDathangBy(this.searchParam);
      this.displayedColumns = Object.keys(this.ColumnName);
      this.dataSource = new MatTableDataSource(this.Listdathang());
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
      yield this._NhacungcapService.getAllNhacungcap();
      this.FilterNhacungcap = Array(20).fill(null).map(() => this._NhacungcapService.ListNhacungcap());
      yield this._KhoService.getAllKho();
      this.ImportConfig.ListKho = this._KhoService.ListKho();
      this.FilterKho = Array(20).fill(null).map(() => this._KhoService.ListKho());
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({
      key,
      value,
      isShow: true
    }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("DathangColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    if (!filterValue) {
      this.searchParam = {
        page: this.page(),
        pageSize: this.pageSize()
      };
      this._DathangService.getDathangBy(this.searchParam);
      return;
    }
    this.searchParam.subtitle = filterValue.trim().toLowerCase();
    this._DathangService.getDathangBy(this.searchParam);
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
    this.dataSource.filteredData = this.Listdathang().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("DathangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/dathang", "new"]);
  }
  goToDetail(item) {
    this._DathangService.setDathangId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/dathang", item.id]);
  }
  UpdateDathang(item) {
    item.status = "dagiao";
    this._DathangService.updateDathang(item).then(() => {
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  ExportExcel() {
    return __async(this, null, function* () {
      this.searchParam.pageSize = 99999;
      yield this._DathangService.getDathangBy(this.searchParam);
      const exportData = this.Listdathang();
      const exportTitle = `Danh S\xE1ch \u0110\u1EB7t H\xE0ng ${this._timezoneService.formatForDisplay(/* @__PURE__ */ new Date(), "DD-MM-YYYY")}`;
      yield this._NhacungcapService.getAllNhacungcap();
      yield this._SanphamService.getAllSanpham({ pageSize: 99999 });
      yield this._BanggiaService.getAllBanggia();
      const ListDathang = Array.isArray(exportData) && exportData.length > 0 ? exportData.flatMap((record) => {
        if (!Array.isArray(record.sanpham))
          return [];
        return record.sanpham.map((sp) => ({
          ngaynhan: this._timezoneService.formatForDisplay(record.ngaynhan, "DD/MM/YYYY"),
          mancc: record.nhacungcap?.mancc,
          name: record.nhacungcap?.name,
          masp: sp?.sanpham?.masp,
          tensp: sp?.sanpham?.title,
          sldat: Number(sp?.sldat) || 0,
          slgiao: Number(sp?.slgiao) || 0,
          slnhan: Number(sp?.slnhan) || 0,
          ghichu: sp?.ghichu,
          makho: record?.kho?.makho
        }));
      }) : [
        {
          ngaynhan: this._timezoneService.nowLocal("DD/MM/YYYY"),
          mancc: "",
          name: "",
          masp: "",
          tensp: "",
          sldat: 0,
          slgiao: 0,
          slnhan: 0,
          ghichu: "",
          makho: ""
        }
      ];
      console.log(ListDathang);
      console.log(this.Listdathang());
      writeExcelFile(ListDathang, exportTitle);
    });
  }
  EditList = [];
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
  DoDanhan() {
    Promise.all(this.EditList.map((item) => {
      item.status = "danhan";
      return this._DathangService.updateDathang(item);
    })).then(() => {
      this.EditList = [];
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  dialogCreateRef;
  openDeleteDialog(template, item) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => __async(this, null, function* () {
      if (result == "true") {
        if (item) {
          yield this._DathangService.DeleteDathang(item);
          return;
        }
        this.DeleteListItem();
      }
    }));
  }
  openDathangDialog(template) {
    const dialogDeleteRef = this.dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => __async(this, null, function* () {
      if (result == "true") {
      }
    }));
  }
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
        const result = yield this._DathangService.DeleteBulkDathang(this.EditList.map((v) => v.id));
        this._snackBar.open(`X\xF3a th\xE0nh c\xF4ng ${result.success} \u0111\u1EB7t h\xE0ng ${result.fail} l\u1ED7i`, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a \u0111\u1EB7t h\xE0ng:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi x\xF3a \u0111\u1EB7t h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.EditList = [];
        yield this.ngOnInit();
      }
    });
  }
  // Excel Import functionality for Dathang - similar to Donhang
  statusDetails = [];
  ListImportData = [];
  FilterNhacungcap = [];
  FilterKho = [];
  // For kho filtering in dialog
  ImportConfig = {
    selectedDate: /* @__PURE__ */ new Date(),
    // This stays as Date object for date picker
    selectedKho: "",
    ListKho: []
  };
  ImporExcel(event) {
    return __async(this, null, function* () {
      const files = Array.from(event.target.files);
      let processedCount = 0;
      let skippedCount = 0;
      let errorCount = 0;
      this.ListImportData = [];
      this.statusDetails = [];
      this.ListImportExcel = [];
      yield this._NhacungcapService.getAllNhacungcap({ pageSize: 99999 });
      yield this._SanphamService.getAllSanpham({ pageSize: 99999 });
      yield this._KhoService.getAllKho();
      for (let i = 0; i < files.length; i++) {
        const file = files[i];
        try {
          const data = yield readExcelFileNoWorker(file);
          console.log("Excel data:", data);
          const sheetData = data.Sheet1 || data.dathang;
          if (sheetData && sheetData.length > 0) {
            const processedData = this.processImportData(sheetData, file.name);
            if (processedData.length > 0) {
              this.ListImportExcel.push(...processedData);
              processedCount++;
            } else {
              skippedCount++;
            }
          } else {
            skippedCount++;
            this.statusDetails.push({
              fileName: file.name,
              status: "Skipped",
              message: "No valid data found in Sheet1 or dathang sheet"
            });
          }
        } catch (error) {
          console.error("Error processing file:", error);
          errorCount++;
          this.statusDetails.push({
            fileName: file.name,
            status: "Error",
            message: error.message
          });
        }
      }
      if (this.ListImportExcel.length > 0) {
        this.ImportConfig.selectedDate = /* @__PURE__ */ new Date();
        this.setDefaultKhoForOrders();
        this.dialog.open(this.dialogImportExcel, {
          width: "95vw",
          maxWidth: "1400px",
          height: "95vh",
          disableClose: true
        });
      } else {
        this.dialog.open(this.dialogImportExcelCu, {
          width: "90vw",
          maxWidth: "1200px",
          height: "90vh"
        });
      }
      this._snackBar.open(`X\u1EED l\xFD ${files.length} file: ${processedCount} th\xE0nh c\xF4ng, ${skippedCount} b\u1ECF qua, ${errorCount} l\u1ED7i`, "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      event.target.value = "";
    });
  }
  // Method mới để xử lý dữ liệu import theo format mới
  processImportData(data, fileName) {
    const suppliers = this._NhacungcapService.ListNhacungcap();
    const products = this._SanphamService.ListSanpham();
    const khoList = this._KhoService.ListKho();
    const processedOrders = [];
    try {
      const groupedBySupplier = {};
      for (const row of data) {
        if (!row.mancc || !row.masp)
          continue;
        if (!groupedBySupplier[row.mancc]) {
          groupedBySupplier[row.mancc] = [];
        }
        groupedBySupplier[row.mancc].push(row);
      }
      for (const [mancc, rows] of Object.entries(groupedBySupplier)) {
        const supplier = suppliers.find((s) => s.mancc === mancc);
        if (!supplier) {
          this.statusDetails.push({
            fileName,
            status: "Error",
            message: `Kh\xF4ng t\xECm th\u1EA5y nh\xE0 cung c\u1EA5p: ${mancc}`,
            mancc
          });
          continue;
        }
        const validProducts = [];
        let hasErrors = false;
        for (const row of rows) {
          const product = products.find((p) => p.masp === row.masp);
          if (!product) {
            this.statusDetails.push({
              fileName,
              status: "Error",
              message: `Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m: ${row.masp}`,
              mancc,
              masp: row.masp
            });
            hasErrors = true;
            continue;
          }
          validProducts.push({
            sanpham: {
              id: product.id,
              masp: product.masp,
              title: product.title,
              dvt: product.dvt || ""
            },
            sldat: Number(row.sldat) || 0,
            slgiao: Number(row.sldat) || 0,
            slnhan: Number(row.sldat) || 0,
            ghichu: row.ghichu || "",
            // Preserve original row data for reference
            originalData: row
          });
          this.statusDetails.push({
            fileName,
            status: "Processed",
            message: `\u0110\xE3 x\u1EED l\xFD: ${product.title} - SL: ${row.sldat}`,
            mancc,
            masp: row.masp
          });
        }
        if (validProducts.length > 0) {
          const firstRow = rows[0];
          let ngaynhan = /* @__PURE__ */ new Date();
          if (firstRow.ngaynhan) {
            try {
              const [day, month, year] = firstRow.ngaynhan.split("/");
              ngaynhan = (0, import_moment.default)(`${year}-${month}-${day}`, "YYYY-MM-DD").toDate();
            } catch (dateError) {
              console.warn("Error parsing date, using current date:", dateError);
            }
          }
          const dathangOrder = {
            id: `temp_${mancc}_${Date.now()}`,
            // Temporary ID for tracking
            title: `\u0110\u01A1n h\xE0ng ${firstRow.ngaynhan || this._timezoneService.nowLocal("DD/MM/YYYY")} - ${supplier.name}`,
            ngaynhan,
            nhacungcapId: supplier.id,
            nhacungcap: supplier,
            makho: this.autoSelectKho(firstRow.makho, khoList),
            // Auto-select kho
            khoSelected: this.getKhoByMakho(firstRow.makho, khoList),
            // Selected kho object
            originalMakho: firstRow.makho || "",
            // Preserve original makho from Excel
            status: "dadat",
            sanpham: validProducts,
            ghichu: "",
            fileName,
            // Config options for user to modify
            configOptions: {
              canChangeDate: true,
              canChangeKho: true,
              selectedDate: ngaynhan,
              selectedKho: this.autoSelectKho(firstRow.makho, khoList),
              confirmed: false,
              khoMatchStatus: this.getKhoMatchStatus(firstRow.makho, khoList)
            },
            // Summary info
            summary: {
              totalProducts: validProducts.length,
              totalQuantity: validProducts.reduce((sum, p) => sum + p.sldat, 0),
              supplierCode: mancc,
              supplierName: supplier.name
            }
          };
          processedOrders.push(dathangOrder);
        }
      }
    } catch (error) {
      console.error("Error processing import data:", error);
      this.statusDetails.push({
        fileName,
        status: "Error",
        message: error.message
      });
    }
    return processedOrders;
  }
  // Generate order code
  generateOrderCode(mancc) {
    const today = this._timezoneService.formatForDisplay(/* @__PURE__ */ new Date(), "YYYYMMDD");
    const random = Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
    return `DH${mancc}-${today}-${random}`;
  }
  // Update date for specific order
  updateOrderDate(order, newDate) {
    order.ngaynhan = newDate;
    order.configOptions.selectedDate = newDate;
    order.title = `\u0110\u01A1n h\xE0ng ${this._timezoneService.formatForDisplay(newDate, "DD/MM/YYYY")} - ${order.nhacungcap.name}`;
  }
  // Update makho for specific order
  updateOrderKho(order, newKho) {
    order.makho = newKho;
    order.configOptions.selectedKho = newKho;
  }
  // Method to update kho selection for order
  updateOrderKhoSelection(order, newKho) {
    order.makho = newKho.makho;
    order.khoSelected = newKho;
    order.configOptions.selectedKho = newKho.makho;
    order.configOptions.khoMatchStatus = "manual";
  }
  // Update global date for all orders
  updateAllOrdersDate(newDate) {
    this.ImportConfig.selectedDate = newDate;
    this.ListImportExcel.forEach((order) => {
      this.updateOrderDate(order, newDate);
    });
  }
  // Update global kho for all orders
  updateAllOrdersKho(newKhoMakho) {
    this.ImportConfig.selectedKho = newKhoMakho;
    const selectedKho = this.ImportConfig.ListKho.find((k) => k.makho === newKhoMakho);
    this.ListImportExcel.forEach((order) => {
      if (selectedKho) {
        this.updateOrderKhoSelection(order, selectedKho);
      }
    });
  }
  // Toggle confirmation for specific order
  toggleOrderConfirmation(order) {
    order.configOptions.confirmed = !order.configOptions.confirmed;
  }
  // Toggle confirmation for all orders
  toggleAllOrdersConfirmation() {
    const allConfirmed = this.ListImportExcel.every((order) => order.configOptions.confirmed);
    this.ListImportExcel.forEach((order) => {
      order.configOptions.confirmed = !allConfirmed;
    });
  }
  // Get confirmed orders count
  getConfirmedOrdersCount() {
    return this.ListImportExcel.filter((order) => order.configOptions.confirmed).length;
  }
  // Method to get kho match status display text
  getKhoMatchStatusText(status) {
    switch (status) {
      case "exact":
        return "Kh\u1EDBp ch\xEDnh x\xE1c";
      case "partial":
        return "Kh\u1EDBp m\u1ED9t ph\u1EA7n";
      case "name":
        return "Kh\u1EDBp theo t\xEAn";
      case "default":
        return "M\u1EB7c \u0111\u1ECBnh";
      case "manual":
        return "\u0110\xE3 ch\u1EC9nh s\u1EEDa";
      default:
        return "Kh\xF4ng t\xECm th\u1EA5y";
    }
  }
  // Method to get kho match status color
  getKhoMatchStatusColor(status) {
    switch (status) {
      case "exact":
        return "success";
      case "partial":
        return "warn";
      case "name":
        return "accent";
      case "manual":
        return "primary";
      default:
        return "warn";
    }
  }
  // Import only confirmed orders
  ImportConfirmedDathang() {
    return __async(this, null, function* () {
      const confirmedOrders = this.ListImportExcel.filter((order) => order.configOptions.confirmed);
      if (confirmedOrders.length === 0) {
        this._snackBar.open("Vui l\xF2ng x\xE1c nh\u1EADn \xEDt nh\u1EA5t m\u1ED9t \u0111\u01A1n h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      yield this._KhoService.getAllKho();
      try {
        const ordersToImport = confirmedOrders.map((order) => {
          const Kho = this._KhoService.ListKho().find((k) => k.makho === order.makho);
          const mergedProducts = this.mergeProductsByMasp(order.sanpham);
          return {
            ngaynhan: (0, import_moment.default)(order.ngaynhan).format("YYYY-MM-DD"),
            mancc: order?.nhacungcap.mancc,
            makho: order.makho,
            khoId: Kho?.id,
            status: order.status,
            sanpham: mergedProducts.map((sp) => ({
              masp: sp.masp,
              sldat: Number(sp.sldat),
              slgiao: Number(sp.slgiao),
              slnhan: Number(sp.slnhan),
              ghichu: sp.ghichu
            })),
            ghichu: order.ghichu
          };
        });
        const result = yield this._DathangService.ImportDathang(ordersToImport);
        this._snackBar.open(`Import th\xE0nh c\xF4ng: ${result.success} \u0111\u01A1n h\xE0ng, ${result.fail} l\u1ED7i`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.dialog.closeAll();
        yield this.ngOnInit();
      } catch (error) {
        console.error("L\u1ED7i khi import \u0111\u1EB7t h\xE0ng:", error);
        this._snackBar.open(`L\u1ED7i khi import: ${error.message}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Remove order from import list
  removeOrderFromImport(order) {
    this.ListImportExcel = this.ListImportExcel.filter((o) => o.id !== order.id);
    if (this.ListImportExcel.length === 0) {
      this.dialog.closeAll();
    }
  }
  // Handle date selection for import
  DoChonNgaynhan(event, detail) {
    const selectedDate = event.value;
    if (detail && detail !== "All") {
      detail.ngaynhan = this._timezoneService.formatForDisplay(selectedDate, "YYYY-MM-DD");
    } else {
      this.ListImportExcel.forEach((item) => {
        item.details?.forEach((d) => {
          d.ngaynhan = this._timezoneService.formatForDisplay(selectedDate, "YYYY-MM-DD");
        });
      });
    }
  }
  // Remove item from import list
  removeItemImport(detail) {
    this.ListImportExcel.forEach((order) => {
      if (order.details) {
        order.details = order.details.filter((d) => d !== detail);
      }
    });
    this.ListImportExcel = this.ListImportExcel.filter((order) => order.details && order.details.length > 0);
  }
  // Select supplier for item
  SelectNhacungcap(detail, event) {
    const selectedSupplier = event.value;
    detail.nhacungcap = selectedSupplier;
    detail.manhacungcap = selectedSupplier?.id || selectedSupplier?.manhacungcap;
  }
  // Find supplier by typing
  DoFindNhacungcap(event, index) {
    const searchTerm = event.target.value.toLowerCase();
    this.suppliers = this.suppliers.filter((supplier) => supplier.name?.toLowerCase().includes(searchTerm) || supplier.manhacungcap?.toLowerCase().includes(searchTerm));
  }
  // Import existing supplier orders
  DoImportNhacungcapCu() {
    this.ImportConfirmedDathang();
  }
  // Merge products with same masp by summing quantities
  mergeProductsByMasp(sanphamArray) {
    const mergedMap = /* @__PURE__ */ new Map();
    sanphamArray.forEach((sp) => {
      const masp = sp.sanpham?.masp || sp.masp;
      if (mergedMap.has(masp)) {
        const existing = mergedMap.get(masp);
        existing.sldat = (Number(existing.sldat) || 0) + (Number(sp.sldat) || 0);
        existing.slgiao = (Number(existing.slgiao) || 0) + (Number(sp.slgiao) || 0);
        existing.slnhan = (Number(existing.slnhan) || 0) + (Number(sp.slnhan) || 0);
        const existingNote = existing.ghichu || "";
        const newNote = sp.ghichu || "";
        if (newNote && existingNote !== newNote) {
          existing.ghichu = existingNote ? `${existingNote}; ${newNote}` : newNote;
        }
      } else {
        mergedMap.set(masp, {
          masp,
          sanpham: sp.sanpham || { masp },
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          ghichu: sp.ghichu || "",
          title: sp.sanpham?.title || sp.title || "",
          dvt: sp.sanpham?.dvt || sp.dvt || ""
        });
      }
    });
    return Array.from(mergedMap.values());
  }
  // Get total quantity for an order
  getTotalQuantity(order) {
    if (!order.details || !Array.isArray(order.details)) {
      return 0;
    }
    return order.details.reduce((total, detail) => {
      return total + (parseFloat(detail.soluong || "0") || 0);
    }, 0);
  }
  // Helper methods for kho auto-selection
  autoSelectKho(makho, khoList) {
    if (!makho || !khoList?.length) {
      return khoList?.[0]?.makho || "";
    }
    const exactMatch = khoList.find((k) => k.makho === makho);
    if (exactMatch) {
      return exactMatch.makho;
    }
    const partialMatch = khoList.find((k) => k.makho?.toLowerCase().includes(makho.toLowerCase()) || makho.toLowerCase().includes(k.makho?.toLowerCase()));
    if (partialMatch) {
      return partialMatch.makho;
    }
    const nameMatch = khoList.find((k) => k.name?.toLowerCase().includes(makho.toLowerCase()) || makho.toLowerCase().includes(k.name?.toLowerCase()));
    if (nameMatch) {
      return nameMatch.makho;
    }
    return khoList[0]?.makho || "";
  }
  getKhoByMakho(makho, khoList) {
    const selectedMakho = this.autoSelectKho(makho, khoList);
    return khoList.find((k) => k.makho === selectedMakho) || khoList[0] || null;
  }
  getKhoMatchStatus(makho, khoList) {
    if (!makho || !khoList?.length) {
      return khoList?.length ? "default" : "none";
    }
    if (khoList.find((k) => k.makho === makho)) {
      return "exact";
    }
    if (khoList.find((k) => k.makho?.toLowerCase().includes(makho.toLowerCase()) || makho.toLowerCase().includes(k.makho?.toLowerCase()))) {
      return "partial";
    }
    if (khoList.find((k) => k.name?.toLowerCase().includes(makho.toLowerCase()) || makho.toLowerCase().includes(k.name?.toLowerCase()))) {
      return "name";
    }
    return "default";
  }
  // Set default kho for orders that don't have kho selection
  setDefaultKhoForOrders() {
    const defaultKho = this.ImportConfig.ListKho?.[0];
    if (!defaultKho)
      return;
    this.ListImportExcel.forEach((order) => {
      if (!order.khoSelected && order.configOptions.khoMatchStatus === "default") {
        order.khoSelected = defaultKho;
        order.makho = defaultKho.makho;
        order.configOptions.selectedKho = defaultKho.makho;
      }
    });
  }
  // Get orders statistics
  getOrdersStatistics() {
    const total = this.ListImportExcel.length;
    const confirmed = this.getConfirmedOrdersCount();
    const exactMatch = this.ListImportExcel.filter((o) => o.configOptions?.khoMatchStatus === "exact").length;
    const partialMatch = this.ListImportExcel.filter((o) => o.configOptions?.khoMatchStatus === "partial").length;
    const nameMatch = this.ListImportExcel.filter((o) => o.configOptions?.khoMatchStatus === "name").length;
    const defaultMatch = this.ListImportExcel.filter((o) => o.configOptions?.khoMatchStatus === "default").length;
    const manualMatch = this.ListImportExcel.filter((o) => o.configOptions?.khoMatchStatus === "manual").length;
    return {
      total,
      confirmed,
      exactMatch,
      partialMatch,
      nameMatch,
      defaultMatch,
      manualMatch
    };
  }
  /**
   * Xử lý hủy đơn đặt hàng
   * Sử dụng CancelOrderService để mở dialog và xử lý toàn bộ flow
   */
  handleCancelDathang(order) {
    return __async(this, null, function* () {
      const success = yield this.cancelOrderService.cancelDathang(order);
      if (success) {
        console.log("\u0110\u01A1n \u0111\u1EB7t h\xE0ng \u0111\xE3 \u0111\u01B0\u1EE3c h\u1EE7y th\xE0nh c\xF4ng");
      }
    });
  }
  /**
   * Lấy class CSS cho status badge
   */
  getStatusClass(status) {
    const classes = {
      "hoanthanh": "bg-green-100 text-green-800",
      "dangxuly": "bg-blue-100 text-blue-800",
      "choxuly": "bg-yellow-100 text-yellow-800",
      "huy": "bg-red-100 text-red-800",
      "dahuy": "bg-red-100 text-red-800"
    };
    return classes[status] || "bg-gray-100 text-gray-800";
  }
  /**
   * Mở dialog so sánh giá từ các nhà cung cấp
   */
  dialogComparePrice;
  comparePriceData = [];
  comparePriceColumns = [];
  comparePriceDateColumns = [];
  // Các cột ngày
  comparePriceTotalRecords = 0;
  openComparePriceDialog() {
    return __async(this, null, function* () {
      try {
        console.log("[COMPARE-PRICE] Opening dialog...");
        console.log("[COMPARE-PRICE] Date range:", this.searchParam.Batdau, "->", this.searchParam.Ketthuc);
        const loadingSnackBar = this._snackBar.open("\u0110ang t\u1EA3i d\u1EEF li\u1EC7u so s\xE1nh gi\xE1...", "", {
          duration: 0,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
        const allData = yield this.fetchComparePriceData();
        loadingSnackBar.dismiss();
        if (!allData || allData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u trong kho\u1EA3ng th\u1EDDi gian n\xE0y", "\u0110\xF3ng", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        this.comparePriceData = allData;
        this.comparePriceTotalRecords = allData.length;
        this.buildComparePriceColumns();
        console.log("[COMPARE-PRICE] Data loaded:", allData.length, "rows");
        console.log("[COMPARE-PRICE] Columns:", this.comparePriceColumns);
        this.dialog.open(this.dialogComparePrice, {
          width: "95vw",
          maxWidth: "95vw",
          height: "90vh",
          maxHeight: "90vh",
          panelClass: "compare-price-dialog"
        });
      } catch (error) {
        console.error("[COMPARE-PRICE] Error:", error);
        this._snackBar.open("L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u so s\xE1nh gi\xE1", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Fetch data cho so sánh giá - Format mới
   * Mỗi row: Mã SP | Tên SP | Tên NCC | [Ngày 1] | [Ngày 2] | ...
   */
  fetchComparePriceData() {
    return __async(this, null, function* () {
      const originalPageSize = this.searchParam.pageSize;
      this.searchParam.pageSize = 99999;
      yield this._DathangService.getDathangBy(this.searchParam);
      this.searchParam.pageSize = originalPageSize;
      const dathangList = this._DathangService.ListDathang();
      const dataMap = /* @__PURE__ */ new Map();
      dathangList.forEach((dathang) => {
        const nhacungcap = dathang.nhacungcap?.name || "N/A";
        const ngaynhan = dathang.ngaynhan ? (0, import_moment.default)(dathang.ngaynhan).format("D/M/YYYY") : null;
        if (!ngaynhan)
          return;
        dathang.sanpham?.forEach((sp) => {
          const masp = sp.sanpham?.masp || sp.masp || "N/A";
          const tensp = sp.sanpham?.title || sp.title || "N/A";
          const gianhap = parseFloat(sp.gianhap) || 0;
          const sldat = parseFloat(sp.sldat) || 0;
          const key = `${masp}_${nhacungcap}`;
          if (!dataMap.has(key)) {
            dataMap.set(key, {
              "M\xE3 SP": masp,
              "T\xEAn SP": tensp,
              "T\xEAn NCC": nhacungcap,
              dates: {}
              // { "1/1/2025": { sldat, gianhap }, "2/1/2025": { sldat, gianhap } }
            });
          }
          const row = dataMap.get(key);
          if (!row.dates[ngaynhan]) {
            row.dates[ngaynhan] = { sldat: 0, gianhap: 0 };
          }
          row.dates[ngaynhan].sldat += sldat;
          if (gianhap > 0) {
            row.dates[ngaynhan].gianhap = gianhap;
          }
        });
      });
      const result = [];
      dataMap.forEach((row) => {
        const flatRow = {
          "M\xE3 SP": row["M\xE3 SP"],
          "T\xEAn SP": row["T\xEAn SP"],
          "T\xEAn NCC": row["T\xEAn NCC"]
        };
        Object.keys(row.dates).forEach((date) => {
          flatRow[date] = row.dates[date];
        });
        result.push(flatRow);
      });
      return result;
    });
  }
  /**
   * Build dynamic columns: Mã SP, Tên SP, Tên NCC, [Date1_SL], [Date1_GIA], [Date2_SL], [Date2_GIA], ...
   */
  buildComparePriceColumns() {
    const dateSet = /* @__PURE__ */ new Set();
    this.comparePriceData.forEach((row) => {
      Object.keys(row).forEach((key) => {
        if (key !== "M\xE3 SP" && key !== "T\xEAn SP" && key !== "T\xEAn NCC") {
          dateSet.add(key);
        }
      });
    });
    this.comparePriceDateColumns = Array.from(dateSet).sort((a, b) => {
      const dateA = (0, import_moment.default)(a, "D/M/YYYY");
      const dateB = (0, import_moment.default)(b, "D/M/YYYY");
      return dateA.valueOf() - dateB.valueOf();
    });
    const dynamicColumns = [];
    this.comparePriceDateColumns.forEach((date) => {
      dynamicColumns.push(`${date}_SL`);
      dynamicColumns.push(`${date}_GIA`);
    });
    this.comparePriceColumns = ["M\xE3 SP", "T\xEAn SP", "T\xEAn NCC", ...dynamicColumns];
    this.calculateRowspans();
  }
  /**
   * Calculate rowspan values for merging rows with same Mã SP + Tên SP
   * Tên NCC sẽ hiển thị riêng trên mỗi row (không merge)
   */
  calculateRowspans() {
    if (!this.comparePriceData || this.comparePriceData.length === 0) {
      return;
    }
    this.comparePriceData.sort((a, b) => {
      if (a["M\xE3 SP"] !== b["M\xE3 SP"]) {
        return a["M\xE3 SP"].localeCompare(b["M\xE3 SP"]);
      }
      if (a["T\xEAn SP"] !== b["T\xEAn SP"]) {
        return a["T\xEAn SP"].localeCompare(b["T\xEAn SP"]);
      }
      return a["T\xEAn NCC"].localeCompare(b["T\xEAn NCC"]);
    });
    const groups = {};
    this.comparePriceData.forEach((row) => {
      const key = `${row["M\xE3 SP"]}_${row["T\xEAn SP"]}`;
      groups[key] = (groups[key] || 0) + 1;
    });
    const processedKeys = /* @__PURE__ */ new Set();
    this.comparePriceData.forEach((row) => {
      const key = `${row["M\xE3 SP"]}_${row["T\xEAn SP"]}`;
      if (!processedKeys.has(key)) {
        row._rowspanMasp = groups[key];
        row._rowspanTensp = groups[key];
        row._showMasp = true;
        row._showTensp = true;
        processedKeys.add(key);
      } else {
        row._rowspanMasp = 0;
        row._rowspanTensp = 0;
        row._showMasp = false;
        row._showTensp = false;
      }
    });
  }
  /**
   * Get displayed data (first 10 rows)
   */
  getDisplayedComparePriceData() {
    return this.comparePriceData.slice(0, 10);
  }
  /**
   * Export Excel with full data - Format mới giống y hệt table hiển thị
   */
  exportComparePriceExcel() {
    return __async(this, null, function* () {
      try {
        console.log("[EXPORT] Exporting", this.comparePriceData.length, "rows...");
        const workbook = utils.book_new();
        const wsData = [];
        const headerRow1 = [
          "M\xE3 SP",
          // A1
          "T\xEAn SP",
          // B1
          "T\xEAn NCC"
          // C1
        ];
        this.comparePriceDateColumns.forEach((date) => {
          headerRow1.push(date);
          headerRow1.push("");
        });
        wsData.push(headerRow1);
        const headerRow2 = [
          "",
          // A2 - merged from A1
          "",
          // B2 - merged from B1
          ""
          // C2 - merged from C1
        ];
        this.comparePriceDateColumns.forEach(() => {
          headerRow2.push("SL \u0111\u1EB7t");
          headerRow2.push("Gi\xE1 nh\u1EADp");
        });
        wsData.push(headerRow2);
        this.comparePriceData.forEach((row) => {
          const dataRow = [];
          dataRow.push(row["M\xE3 SP"] || "");
          dataRow.push(row["T\xEAn SP"] || "");
          dataRow.push(row["T\xEAn NCC"] || "");
          this.comparePriceDateColumns.forEach((date) => {
            const data = row[date];
            if (data && typeof data === "object") {
              dataRow.push(data.sldat || 0);
              dataRow.push(data.gianhap || 0);
            } else {
              dataRow.push("");
              dataRow.push("");
            }
          });
          wsData.push(dataRow);
        });
        const worksheet = utils.aoa_to_sheet(wsData);
        const merges = [];
        merges.push(
          { s: { r: 0, c: 0 }, e: { r: 1, c: 0 } },
          // Mã SP: A1:A2
          { s: { r: 0, c: 1 }, e: { r: 1, c: 1 } },
          // Tên SP: B1:B2
          { s: { r: 0, c: 2 }, e: { r: 1, c: 2 } }
          // Tên NCC: C1:C2
        );
        this.comparePriceDateColumns.forEach((date, index) => {
          const colIndex = 3 + index * 2;
          merges.push({
            s: { r: 0, c: colIndex },
            // Start cell
            e: { r: 0, c: colIndex + 1 }
            // End cell (next column)
          });
        });
        let currentRow = 2;
        let rowIndex = 0;
        while (rowIndex < this.comparePriceData.length) {
          const row = this.comparePriceData[rowIndex];
          if (row._showMasp && row._rowspanMasp > 1) {
            merges.push({
              s: { r: currentRow, c: 0 },
              e: { r: currentRow + row._rowspanMasp - 1, c: 0 }
            });
          }
          if (row._showTensp && row._rowspanTensp > 1) {
            merges.push({
              s: { r: currentRow, c: 1 },
              e: { r: currentRow + row._rowspanTensp - 1, c: 1 }
            });
          }
          if (row._rowspanMasp > 1) {
            currentRow += row._rowspanMasp;
            rowIndex += row._rowspanMasp;
          } else {
            currentRow++;
            rowIndex++;
          }
        }
        worksheet["!merges"] = merges;
        const colWidths = [
          { wch: 15 },
          // Mã SP
          { wch: 40 },
          // Tên SP
          { wch: 30 }
          // Tên NCC
        ];
        this.comparePriceDateColumns.forEach(() => {
          colWidths.push({ wch: 12 });
          colWidths.push({ wch: 15 });
        });
        worksheet["!cols"] = colWidths;
        const range = utils.decode_range(worksheet["!ref"] || "A1");
        for (let R = range.s.r; R <= range.e.r; ++R) {
          for (let C = range.s.c; C <= range.e.c; ++C) {
            const cellAddress = utils.encode_cell({ r: R, c: C });
            if (!worksheet[cellAddress])
              continue;
            if (R === 0 || R === 1) {
              worksheet[cellAddress].s = {
                font: { bold: true, color: { rgb: "000000" } },
                fill: { fgColor: { rgb: R === 0 && C >= 3 ? "DBEAFE" : "F3F4F6" } },
                alignment: { horizontal: "center", vertical: "center", wrapText: true },
                border: {
                  top: { style: "thin", color: { rgb: "000000" } },
                  bottom: { style: "thin", color: { rgb: "000000" } },
                  left: { style: "thin", color: { rgb: "000000" } },
                  right: { style: "thin", color: { rgb: "000000" } }
                }
              };
            } else {
              const alignment = { vertical: "center", wrapText: true };
              if (C === 0 || C === 1 || C === 2) {
                alignment.horizontal = "left";
              } else {
                alignment.horizontal = "right";
              }
              worksheet[cellAddress].s = {
                alignment,
                border: {
                  top: { style: "thin", color: { rgb: "D1D5DB" } },
                  bottom: { style: "thin", color: { rgb: "D1D5DB" } },
                  left: { style: "thin", color: { rgb: "D1D5DB" } },
                  right: { style: "thin", color: { rgb: "D1D5DB" } }
                }
              };
              if (C >= 3 && worksheet[cellAddress].v !== "") {
                const colOffset = (C - 3) % 2;
                if (colOffset === 0) {
                  worksheet[cellAddress].z = "#,##0";
                } else {
                  worksheet[cellAddress].z = "#,##0";
                }
              }
            }
          }
        }
        utils.book_append_sheet(workbook, worksheet, "So s\xE1nh gi\xE1");
        const fileName = `So_sanh_gia_${(0, import_moment.default)(this.searchParam.Batdau).format("DDMMYYYY")}_${(0, import_moment.default)(this.searchParam.Ketthuc).format("DDMMYYYY")}.xlsx`;
        writeFileSync(workbook, fileName);
        this._snackBar.open("\u2713 Xu\u1EA5t Excel th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("[EXPORT] Error:", error);
        this._snackBar.open("L\u1ED7i xu\u1EA5t Excel", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Status style helper for New York badges
   */
  getStatusStyle(status) {
    const s = status?.toLowerCase();
    switch (s) {
      case "dadat":
        return "status-dadat";
      case "dagiao":
        return "status-dagiao";
      case "danhan":
        return "status-danhan";
      case "hoanthanh":
        return "status-hoanthanh";
      case "choxuly":
        return "status-choxuly";
      case "khonggiao":
        return "status-khonggiao";
      case "huy":
      case "dahuy":
        return "status-huy";
      default:
        return "status-khonggiao";
    }
  }
  /**
   * Get display label for status
   */
  getStatusLabel(status) {
    return this.Trangthaidon[status?.toLowerCase()] || status;
  }
  /**
   * Count orders by status
   */
  countByStatus(status) {
    const orders = this.Listdathang();
    if (!Array.isArray(orders))
      return 0;
    return orders.filter((item) => item.status === status).length;
  }
  /**
   * Filter orders by status
   */
  filterByStatus(status) {
    const orders = this.Listdathang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders.filter((item) => item.status === status);
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  /**
   * Reset filter to show all orders
   */
  resetStatusFilter() {
    const orders = this.Listdathang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders;
    if (this.paginator) {
      this.paginator.firstPage();
    }
  }
  static \u0275fac = function ListDathangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListDathangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListDathangComponent, selectors: [["app-listdathang"]], viewQuery: function ListDathangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(_c2, 5);
      \u0275\u0275viewQuery(_c3, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogImportExcel = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogImportExcelCu = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogComparePrice = _t.first);
    }
  }, decls: 132, vars: 39, consts: [["drawer", ""], ["uploadfile", ""], ["menu", "matMenu"], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["DathangDialog", ""], ["dialogImportExcelCu", ""], ["dialogImportExcel", ""], ["dialogComparePrice", ""], ["picker", ""], ["globalDatePicker", ""], ["orderDatePicker", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "items-start", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "flex", "flex-col", "space-y-2", "w-full"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["multiple", "", "type", "file", 1, "hidden", 3, "change"], ["mat-icon-button", "", "color", "primary", 3, "click"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "So S\xE1nh Gi\xE1", "mat-icon-button", "", "color", "primary", 3, "click"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], [1, "flex", "flex-row", "flex-wrap", "gap-2", "items-center", "whitespace-nowrap", "overflow-x-auto", "w-full"], ["matTooltip", "Hi\u1EC3n th\u1ECB t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng", 1, "status-badge", "status-secondary", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], [1, "status-dot"], ["matTooltip", "\u0110\u01A1n h\xE0ng ch\u1EDD x\u1EED l\xFD", 1, "status-badge", "status-choxuly", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], ["matTooltip", "\u0110\u01A1n h\xE0ng m\u1EDBi", 1, "status-badge", "status-dadat", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], ["matTooltip", "\u0110\u01A1n h\xE0ng \u0111ang giao", 1, "status-badge", "status-dagiao", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], ["matTooltip", "\u0110\u01A1n h\xE0ng \u0111\xE3 nh\u1EADn", 1, "status-badge", "status-danhan", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], ["matTooltip", "\u0110\u01A1n h\xE0ng \u0111\xE3 ho\xE0n th\xE0nh", 1, "status-badge", "status-hoanthanh", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], ["matTooltip", "\u0110\u01A1n h\xE0ng \u0111\xE3 h\u1EE7y", 1, "status-badge", "status-huy", "!cursor-pointer", "hover:brightness-95", "transition-all", "shadow-sm", 3, "click"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["mat-flat-button", "", "color", "primary", "matTooltip", "\u0110\xE3 Nh\u1EADn", 3, "click", 4, "ngIf"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-flat-button", "", "color", "primary", "matTooltip", "\u0110\xE3 Nh\u1EADn", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-xs", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "status-badge", "shadow-sm", 3, "ngClass"], [1, "flex", "items-center", "gap-2"], [1, "max-w-40", "line-clamp-4", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], [1, "flex", "items-center", "gap-2", 3, "click"], ["mat-icon-button", "", "color", "warn", 1, "text-red-600", 3, "click", "disabled", "matTooltip"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["mat-dialog-title", ""], [1, "mat-typography"], [1, "w-full"], [1, "overflow-x-auto"], [1, "min-w-full", "divide-y", "divide-gray-200", "shadow-md", "rounded-lg"], [1, "bg-gray-50"], [1, "w-16", "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "min-w-[350px]", "px-6", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "w-48", "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], ["matInput", "", 3, "dateChange", "matDatepicker"], [1, "w-40", "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "w-24", "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "w-32", "px-4", "py-3", "text-left", "text-xs", "font-medium", "text-gray-500", "uppercase", "tracking-wider"], [1, "bg-white", "divide-y", "divide-gray-200"], [4, "ngFor", "ngForOf"], ["align", "end"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", ""], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "w-16", "px-4", "py-4", "whitespace-nowrap", "text-gray-900", "items-center"], [1, "min-w-[350px]", "px-6", "py-4", "whitespace-nowrap", "text-gray-900"], [1, "w-48", "px-4", "py-4", "whitespace-nowrap", "text-gray-900"], [1, "w-40", "px-4", "py-4", "whitespace-nowrap", "text-sm", "text-gray-900", "truncate"], [1, "w-24", "px-4", "py-4", "whitespace-nowrap", "text-sm"], [3, "ngClass"], [1, "w-32", "px-4", "py-4", "whitespace-nowrap", "text-sm", "text-gray-500", "truncate"], ["mat-icon-button", "", "color", "warn", 3, "click"], [3, "selectionChange"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [1, "!whitespace-normal", "!h-auto", "!py-2", 3, "value"], ["matInput", "", 3, "dateChange", "ngModel", "matDatepicker"], ["mat-dialog-title", "", 1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-normal", "text-gray-600", "flex", "items-center", "gap-4"], [1, "text-green-600"], [1, "!max-h-[90vh]", "h-[90vh]", "!p-0"], [1, "h-full", "flex", "flex-col"], [1, "border-b", "p-4", "bg-gray-50"], [1, "flex", "flex-wrap", "gap-4", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "min-w-[200px]"], ["matInput", "", 3, "ngModelChange", "dateChange", "matDatepicker", "ngModel"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "min-w-[250px]"], [3, "ngModelChange", "selectionChange", "ngModel"], [3, "value"], [1, "flex-1", "overflow-auto", "p-4"], [1, "grid", "gap-4"], [1, "border", "rounded-lg", "p-4", 3, "ngClass"], [1, "text-center", "py-8"], [1, "border-t", "p-4", 3, "align"], [1, "flex", "items-center", "justify-between", "w-full"], [1, "text-sm", "text-gray-600"], [1, "flex", "gap-2"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-3"], [3, "ngModelChange", "change", "ngModel"], [1, "font-semibold", "text-lg"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a \u0111\u01A1n h\xE0ng n\xE0y", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4", "mb-4"], [1, "flex", "flex-col", "gap-2"], [1, "flex", "items-center", "gap-2", "text-xs"], [1, "min-w-full", "border", "border-gray-200", "text-sm"], [1, "bg-gray-100"], [1, "px-3", "py-2", "text-left", "font-medium", "text-gray-700"], [1, "divide-y", "divide-gray-200"], [1, "hover:bg-gray-50"], [1, "text-gray-600"], [1, "!text-xs", "!py-0", "!px-2", "!min-h-[20px]", 3, "color"], [1, "px-3", "py-2"], [1, "px-3", "py-2", "font-mono"], [1, "px-3", "py-2", "font-semibold", "text-blue-600"], [1, "px-3", "py-2", "text-gray-600"], ["colspan", "8", 1, "px-3", "py-4", "text-center", "text-gray-500"], [1, "text-gray-500", "text-lg", "mb-2"], [1, "text-gray-400"], ["mat-dialog-title", "", 1, "flex", "justify-between", "items-center", "border-b", "pb-3", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-800"], [1, "text-sm", "text-gray-500", "mt-1"], ["mat-icon-button", "", "mat-dialog-close", ""], [1, "!p-0"], [1, "flex", "flex-col", "h-full"], [1, "flex", "justify-between", "items-center", "px-4", "py-3", "bg-blue-50", "border-b"], [1, "text-sm", "font-medium", "text-blue-900"], [1, "overflow-auto", "flex-1", 2, "max-height", "calc(90vh - 200px)"], [1, "w-full", "border-collapse", "border", "border-gray-300"], [1, "sticky", "top-0", "z-10"], ["rowspan", "2", 1, "!font-semibold", "!bg-gray-100", "!border", "!sticky", "!left-0", "!z-20", "!min-w-[120px]", "!p-2"], ["rowspan", "2", 1, "!font-semibold", "!bg-gray-100", "!border", "!sticky", "!left-[120px]", "!z-20", "!min-w-[250px]", "!p-2"], ["rowspan", "2", 1, "!font-semibold", "!bg-gray-100", "!border", "!sticky", "!left-[370px]", "!z-20", "!min-w-[200px]", "!p-2"], ["colspan", "2", 1, "!font-semibold", "!bg-blue-100", "!border", "!text-center", "!p-2", "!min-w-[180px]"], [1, "flex", "flex-col", "items-center", "justify-center", "py-12"], ["align", "end", 1, "border-t", "px-4", "py-3"], ["mat-stroked-button", "", "mat-dialog-close", ""], [1, "font-bold", "text-blue-800"], [1, "!font-semibold", "!bg-gray-100", "!border", "!text-center", "!p-2", "!min-w-[90px]"], [1, "text-xs", "text-gray-700"], [1, "!border", "!font-mono", "!text-sm", "!sticky", "!left-0", "!z-10", "!bg-white", "!p-2", "!align-top"], [1, "!border", "!sticky", "!left-[120px]", "!z-10", "!bg-white", "!p-2", "!align-top"], [1, "!border", "!sticky", "!left-[370px]", "!z-10", "!bg-white", "!p-2"], [1, "!border", "!text-right", "!p-2"], [1, "font-semibold", "text-blue-600"], [1, "font-semibold", "text-green-600"], [1, "text-gray-300", "!text-6xl", "mb-4"], [1, "text-gray-500", "text-lg"], [1, "text-gray-400", "text-sm", "mt-1"]], template: function ListDathangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 15)(1, "mat-drawer", 16, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 17)(5, "div", 18)(6, "div", 19)(7, "div", 20)(8, "div", 21)(9, "input", 22);
      \u0275\u0275listener("keyup", function ListDathangComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 23)(11, "span", 24);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 25);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 26);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 20)(19, "button", 27);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_19_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r2 = \u0275\u0275reference(23);
        return \u0275\u0275resetView(uploadfile_r2.click());
      });
      \u0275\u0275elementStart(20, "mat-icon");
      \u0275\u0275text(21, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "input", 28, 1);
      \u0275\u0275listener("change", function ListDathangComponent_Template_input_change_22_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 29);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel());
      });
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "button", 30)(28, "mat-icon");
      \u0275\u0275text(29, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "mat-menu", null, 2)(32, "div", 31)(33, "mat-form-field", 32)(34, "input", 33);
      \u0275\u0275listener("input", function ListDathangComponent_Template_input_input_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListDathangComponent_Template_input_click_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-icon", 34);
      \u0275\u0275text(36, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(37, "div", 35);
      \u0275\u0275repeaterCreate(38, ListDathangComponent_For_39_Template, 5, 2, "button", 36, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "button", 37);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.openComparePriceDialog());
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "compare");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(43, ListDathangComponent_Conditional_43_Template, 2, 2);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "div", 20)(45, "mat-form-field", 38)(46, "mat-label");
      \u0275\u0275text(47, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_Template_input_ngModelChange_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchParam.Batdau, $event) || (ctx.searchParam.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(49, "mat-datepicker-toggle", 40)(50, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "mat-form-field", 38)(53, "mat-label");
      \u0275\u0275text(54, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "input", 39);
      \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_Template_input_ngModelChange_55_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchParam.Ketthuc, $event) || (ctx.searchParam.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(56, "mat-datepicker-toggle", 40)(57, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "button", 29);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_59_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange());
      });
      \u0275\u0275elementStart(60, "mat-icon");
      \u0275\u0275text(61, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(62, "div", 41)(63, "div", 42);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_63_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetStatusFilter());
      });
      \u0275\u0275element(64, "span", 43);
      \u0275\u0275text(65);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 44);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_66_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("choxuly"));
      });
      \u0275\u0275element(67, "span", 43);
      \u0275\u0275text(68);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 45);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_69_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("dadat"));
      });
      \u0275\u0275element(70, "span", 43);
      \u0275\u0275text(71);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 46);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_72_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("dagiao"));
      });
      \u0275\u0275element(73, "span", 43);
      \u0275\u0275text(74);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "div", 47);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_75_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("danhan"));
      });
      \u0275\u0275element(76, "span", 43);
      \u0275\u0275text(77);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(78, "div", 48);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_78_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("hoanthanh"));
      });
      \u0275\u0275element(79, "span", 43);
      \u0275\u0275text(80);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(81, "div", 49);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_81_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterByStatus("huy"));
      });
      \u0275\u0275element(82, "span", 43);
      \u0275\u0275text(83);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(84, "div", 50)(85, "table", 51);
      \u0275\u0275repeaterCreate(86, ListDathangComponent_For_87_Template, 3, 1, "ng-container", 52, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(88, ListDathangComponent_tr_88_Template, 1, 0, "tr", 53)(89, ListDathangComponent_tr_89_Template, 1, 3, "tr", 54)(90, ListDathangComponent_tr_90_Template, 3, 0, "tr", 55);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(91, "div", 56)(92, "div", 57)(93, "span", 58);
      \u0275\u0275text(94, "\u0110ang Xem ");
      \u0275\u0275elementStart(95, "strong");
      \u0275\u0275text(96);
      \u0275\u0275elementEnd();
      \u0275\u0275text(97, " - ");
      \u0275\u0275elementStart(98, "strong");
      \u0275\u0275text(99);
      \u0275\u0275elementEnd();
      \u0275\u0275text(100);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(101, "div", 59)(102, "span", 60, 5);
      \u0275\u0275text(104);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "mat-menu", null, 6)(107, "div", 61);
      \u0275\u0275listener("click", function ListDathangComponent_Template_div_click_107_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(108, "mat-form-field", 62)(109, "mat-label");
      \u0275\u0275text(110, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(111, "input", 63);
      \u0275\u0275twoWayListener("ngModelChange", function ListDathangComponent_Template_input_ngModelChange_111_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(112, "button", 29);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_112_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r16 = \u0275\u0275reference(103);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r16));
      });
      \u0275\u0275elementStart(113, "mat-icon");
      \u0275\u0275text(114, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(115, "div", 64)(116, "button", 65);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_116_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(117, "mat-icon");
      \u0275\u0275text(118, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(119, "button", 65);
      \u0275\u0275listener("click", function ListDathangComponent_Template_button_click_119_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(120, "mat-icon");
      \u0275\u0275text(121, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(122, ListDathangComponent_ng_template_122_Template, 11, 0, "ng-template", null, 7, \u0275\u0275templateRefExtractor)(124, ListDathangComponent_ng_template_124_Template, 11, 0, "ng-template", null, 8, \u0275\u0275templateRefExtractor)(126, ListDathangComponent_ng_template_126_Template, 36, 3, "ng-template", null, 9, \u0275\u0275templateRefExtractor)(128, ListDathangComponent_ng_template_128_Template, 43, 14, "ng-template", null, 10, \u0275\u0275templateRefExtractor)(130, ListDathangComponent_ng_template_130_Template, 49, 12, "ng-template", null, 11, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r39 = \u0275\u0275reference(31);
      const pickerBatdau_r40 = \u0275\u0275reference(51);
      const pickerKetthuc_r41 = \u0275\u0275reference(58);
      const menu1_r42 = \u0275\u0275reference(106);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(26);
      \u0275\u0275property("matMenuTriggerFor", menu_r39);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.EditList.length > 0 ? 43 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r40);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchParam.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(36, _c4));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r40);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r41);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchParam.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(37, _c4));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r41);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" T\u1EA5t c\u1EA3: ", ctx.Listdathang().length, " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" Ch\u1EDD x\u1EED l\xFD: ", ctx.countByStatus("choxuly"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" M\u1EDBi: ", ctx.countByStatus("dadat"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \u0110ang giao: ", ctx.countByStatus("dagiao"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \u0110\xE3 nh\u1EADn: ", ctx.countByStatus("danhan"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" Ho\xE0n th\xE0nh: ", ctx.countByStatus("hoanthanh"), " ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \u0110\xE3 h\u1EE7y: ", ctx.countByStatus("huy"), " ");
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.total(), " m\u1EE5c, ", ctx.page(), "/", ctx.pageCount(), " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r42);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(38, _c4));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.pageCount());
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
    MatCheckboxModule,
    MatCheckbox,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    MatTabsModule,
    MatProgressSpinnerModule,
    MatChipsModule,
    MatChip
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  Debounce(500)
], ListDathangComponent.prototype, "applyFilter", null);
__decorate([
  memoize()
], ListDathangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListDathangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListDathangComponent, { className: "ListDathangComponent", filePath: "src/app/admin/dathang/listdathang/listdathang.component.ts", lineNumber: 82 });
})();

export {
  ListDathangComponent
};
//# sourceMappingURL=chunk-PCFYYDPK.js.map
