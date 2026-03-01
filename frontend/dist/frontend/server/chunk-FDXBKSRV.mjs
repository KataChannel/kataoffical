import './polyfills.server.mjs';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-3GFI4IV4.mjs";
import {
  CancelOrderService
} from "./chunk-LTOSDJUF.mjs";
import {
  TrangThaiDon
} from "./chunk-CY65G3O7.mjs";
import {
  BanggiaService
} from "./chunk-C2TIJSZX.mjs";
import {
  DonhangService
} from "./chunk-JL4WQNZB.mjs";
import {
  KhachhangService
} from "./chunk-BT4TH55C.mjs";
import {
  SanphamService
} from "./chunk-PEEAI7OM.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-NV7NCVB6.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-QGE5RGZP.mjs";
import {
  readExcelFileNoWorker,
  writeExcelFileWithSheets
} from "./chunk-XQWRZCE6.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-HSH2C6QH.mjs";
import {
  GenId
} from "./chunk-OLFDOXYK.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-BKIOO2IQ.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-UASPM37G.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-7FHKYRY5.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-XXHMETOB.mjs";
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
} from "./chunk-LXPCAAVO.mjs";
import {
  GraphqlService
} from "./chunk-MECBLMI6.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-XEJ7KODZ.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-G5Q3EA6K.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-AJSGP2QM.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-WVX3EDL3.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-AQETVGJS.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-5444DBJD.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-DV7552T6.mjs";
import {
  MatSnackBar
} from "./chunk-WUOSISWE.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-7RV546X3.mjs";
import {
  BreakpointObserver,
  Breakpoints,
  MatOption
} from "./chunk-IKKFEUUM.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-WGGH2PUJ.mjs";
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
  ɵɵpureFunction1,
  ɵɵpureFunction5,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
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
} from "./chunk-ADMXANIA.mjs";
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
var _c2 = ["ConfirmDongboDialog"];
var _c3 = ["ConfirmDuplicateDialog"];
var _c4 = ["DuplicateMergeDialog"];
var _c5 = () => ({ standalone: true });
var _c6 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _c7 = (a0) => ({ "text-red-600": a0 });
var _forTrack0 = ($index, $item) => $item.key;
var _forTrack1 = ($index, $item) => $item.fileName;
var _forTrack2 = ($index, $item) => $item.id;
function ListDonhangComponent_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 21);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 22);
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 58);
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
function ListDonhangComponent_button_45_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 49);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_button_45_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "delete");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_button_45_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 59);
    \u0275\u0275listener("click", function ListDonhangComponent_button_45_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext();
      const DeleteDialog_r7 = \u0275\u0275reference(83);
      return \u0275\u0275resetView(ctx_r3.openDeleteDialog(DeleteDialog_r7));
    });
    \u0275\u0275template(1, ListDonhangComponent_button_45_Conditional_1_Template, 2, 0, "mat-icon", 49)(2, ListDonhangComponent_button_45_Conditional_2_Template, 2, 0, "mat-icon");
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r3.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isLoading() ? 1 : 2);
  }
}
function ListDonhangComponent_Conditional_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 49);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_Conditional_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_Conditional_72_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 51)(1, "mat-icon", 60);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 61);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 62);
    \u0275\u0275text(6, " Vui l\xF2ng ch\u1ECDn \u0111i\u1EC1u ki\u1EC7n t\xECm ki\u1EBFm (ng\xE0y, lo\u1EA1i kh\xE1ch h\xE0ng)");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " v\xE0 nh\u1EA5n n\xFAt ");
    \u0275\u0275elementStart(9, "strong", 63);
    \u0275\u0275text(10, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 64);
    \u0275\u0275listener("click", function ListDonhangComponent_Conditional_72_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.searchData());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 65);
    \u0275\u0275text(16, "T\xECm Ki\u1EBFm Ngay");
    \u0275\u0275elementEnd()()();
  }
}
function ListDonhangComponent_Conditional_73_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 52)(1, "div", 66);
    \u0275\u0275element(2, "mat-spinner", 67);
    \u0275\u0275elementStart(3, "span", 68);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListDonhangComponent_For_76_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 84);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_76_th_1_div_23_Case_2_Template(rf, ctx) {
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
function ListDonhangComponent_For_76_th_1_div_23_Case_3_Template(rf, ctx) {
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
function ListDonhangComponent_For_76_th_1_div_23_Case_4_Template(rf, ctx) {
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
function ListDonhangComponent_For_76_th_1_div_23_Case_5_Template(rf, ctx) {
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
function ListDonhangComponent_For_76_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 82);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_div_23_Template_div_click_0_listener() {
      const item_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const column_r10 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r12, column_r10));
    });
    \u0275\u0275template(1, ListDonhangComponent_For_76_th_1_div_23_span_1_Template, 2, 0, "span", 83)(2, ListDonhangComponent_For_76_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListDonhangComponent_For_76_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListDonhangComponent_For_76_th_1_div_23_Case_4_Template, 2, 1, "span")(5, ListDonhangComponent_For_76_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    const item_r12 = ctx.$implicit;
    const column_r10 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r12));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_26_0 = column_r10) === "createdAt" ? 2 : tmp_26_0 === "updatedAt" ? 3 : tmp_26_0 === "haohut" ? 4 : 5);
  }
}
function ListDonhangComponent_For_76_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 71)(1, "span", 72);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 73, 10);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 74);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r9);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 18)(10, "input", 19);
    \u0275\u0275listener("keyup", function ListDonhangComponent_For_76_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.doFilterHederColumn($event, column_r10));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 20)(12, "span", 22);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 75)(15, "div", 76)(16, "span", 77);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r9);
      const column_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenAll(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r10)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 77);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 77);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 78);
    \u0275\u0275template(23, ListDonhangComponent_For_76_th_1_div_23_Template, 6, 2, "div", 79);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 80)(25, "button", 81);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r9);
      const menuTrigger_r13 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r13.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 64);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_th_1_Template_button_click_27_listener() {
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
function ListDonhangComponent_For_76_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r15 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r15 + 1, " ");
  }
}
function ListDonhangComponent_For_76_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 93);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_td_2_Case_2_Template_span_click_0_listener() {
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
function ListDonhangComponent_For_76_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
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
function ListDonhangComponent_For_76_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
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
function ListDonhangComponent_For_76_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 89);
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
function ListDonhangComponent_For_76_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 90);
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
function ListDonhangComponent_For_76_td_2_Case_7_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 94);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_76_td_2_Case_7_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 95);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_For_76_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 89);
    \u0275\u0275template(1, ListDonhangComponent_For_76_td_2_Case_7_Conditional_1_Template, 2, 0, "mat-icon", 94)(2, ListDonhangComponent_For_76_td_2_Case_7_Conditional_2_Template, 2, 0, "mat-icon", 95);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r17[column_r10] ? 1 : 2);
  }
}
function ListDonhangComponent_For_76_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 88);
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
function ListDonhangComponent_For_76_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_td_2_Case_9_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "button", 97);
    \u0275\u0275listener("click", function ListDonhangComponent_For_76_td_2_Case_9_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r18);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.handleCancelOrder(row_r17));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "cancel");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", !ctx_r3.cancelOrderService.canCancelOrder(row_r17))("matTooltip", ctx_r3.cancelOrderService.getCancelButtonTooltip(row_r17));
  }
}
function ListDonhangComponent_For_76_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 92);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(2, _c7, row_r17.status === "huy" || row_r17.status === "dahuy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17.lydohuy || "-", " ");
  }
}
function ListDonhangComponent_For_76_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 89);
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
function ListDonhangComponent_For_76_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 85);
    \u0275\u0275template(1, ListDonhangComponent_For_76_td_2_Case_1_Template, 2, 1, "span", 86)(2, ListDonhangComponent_For_76_td_2_Case_2_Template, 2, 1, "span", 87)(3, ListDonhangComponent_For_76_td_2_Case_3_Template, 3, 4, "span", 88)(4, ListDonhangComponent_For_76_td_2_Case_4_Template, 3, 4, "span", 88)(5, ListDonhangComponent_For_76_td_2_Case_5_Template, 2, 1, "span", 89)(6, ListDonhangComponent_For_76_td_2_Case_6_Template, 2, 8, "span", 90)(7, ListDonhangComponent_For_76_td_2_Case_7_Template, 3, 1, "span", 89)(8, ListDonhangComponent_For_76_td_2_Case_8_Template, 3, 4, "span", 88)(9, ListDonhangComponent_For_76_td_2_Case_9_Template, 4, 2, "div", 91)(10, ListDonhangComponent_For_76_td_2_Case_10_Template, 2, 4, "span", 92)(11, ListDonhangComponent_For_76_td_2_Case_11_Template, 2, 1, "span", 89);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    const column_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = column_r10) === "STT" ? 1 : tmp_23_0 === "madonhang" ? 2 : tmp_23_0 === "createdAt" ? 3 : tmp_23_0 === "ngaygiao" ? 4 : tmp_23_0 === "khachhang" ? 5 : tmp_23_0 === "status" ? 6 : tmp_23_0 === "isActive" ? 7 : tmp_23_0 === "updatedAt" ? 8 : tmp_23_0 === "actions" ? 9 : tmp_23_0 === "lydohuy" ? 10 : 11);
  }
}
function ListDonhangComponent_For_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 54);
    \u0275\u0275template(1, ListDonhangComponent_For_76_th_1_Template, 29, 5, "th", 69)(2, ListDonhangComponent_For_76_td_2_Template, 12, 1, "td", 70);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r10 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r10);
  }
}
function ListDonhangComponent_tr_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 98);
  }
}
function ListDonhangComponent_tr_78_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 99);
    \u0275\u0275listener("click", function ListDonhangComponent_tr_78_Template_tr_click_0_listener() {
      const row_r20 = \u0275\u0275restoreView(_r19).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.AddToEdit(row_r20));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r3.CheckItemInEdit(row_r20) ? "!bg-slate-200" : "", "");
  }
}
function ListDonhangComponent_tr_79_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 100)(1, "td", 101);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const detail_r24 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r3.getOrderProducts(detail_r24).length, " s\u1EA3n ph\u1EA9m | T\u1ED5ng SL: ", ctx_r3.getTotalQuantity(detail_r24), " ");
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 147)(1, "div", 157)(2, "span", 153);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 158);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r25 = ctx.$implicit;
    \u0275\u0275property("value", item_r25.id);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r25.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("M\xE3: ", item_r25.makh, "");
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 160);
    \u0275\u0275text(1, "auto_fix_high");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 161);
    \u0275\u0275text(3, "T\u1EF1 \u0111\u1ED9ng: ");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-hint", 148);
    \u0275\u0275template(1, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_30_Conditional_1_Template, 4, 0);
    \u0275\u0275elementStart(2, "span", 159);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r24 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(detail_r24.autoSelected ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.getSelectedCustomer(detail_r24).name);
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 168)(1, "td", 173);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 174);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 173);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "td", 173);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "td", 175);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const product_r26 = ctx.$implicit;
    const \u0275$index_510_r27 = ctx.$index;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275$index_510_r27 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r26.masp || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r26.title || product_r26.name || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r26.dvt || "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(product_r26.slgiao || product_r26.soluong || 0);
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_ForEmpty_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 176);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 150)(1, "h4", 162);
    \u0275\u0275text(2, "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 163)(4, "table", 164)(5, "thead", 165)(6, "tr")(7, "th", 166);
    \u0275\u0275text(8, "STT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "th", 166);
    \u0275\u0275text(10, "M\xE3 SP");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "th", 166);
    \u0275\u0275text(12, "T\xEAn s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "th", 166);
    \u0275\u0275text(14, "\u0110VT");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "th", 166);
    \u0275\u0275text(16, "SL Giao");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "tbody", 167);
    \u0275\u0275repeaterCreate(18, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_For_19_Template, 11, 5, "tr", 168, \u0275\u0275repeaterTrackByIndex, false, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_ForEmpty_20_Template, 3, 0, "tr");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "tfoot", 169)(22, "tr", 170)(23, "td", 171);
    \u0275\u0275text(24, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "td", 172);
    \u0275\u0275text(26);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const detail_r24 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r3.getOrderProducts(detail_r24));
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(ctx_r3.getTotalQuantity(detail_r24));
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 156)(1, "span", 120);
    \u0275\u0275text(2, "Ghi ch\xFA:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 177);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r24 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(detail_r24.message);
  }
}
function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r22 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 131)(1, "div", 132)(2, "div", 133)(3, "mat-checkbox", 134);
    \u0275\u0275listener("change", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_mat_checkbox_change_3_listener() {
      \u0275\u0275restoreView(_r22);
      const \u0275$index_390_r23 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleOrderConfirmation(\u0275$index_390_r23));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div")(5, "h3", 135);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 126);
    \u0275\u0275text(8);
    \u0275\u0275elementStart(9, "span", 136);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(11, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_11_Template, 2, 2, "p", 137);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 91)(13, "button", 138);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_button_click_13_listener() {
      \u0275\u0275restoreView(_r22);
      const \u0275$index_390_r23 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.toggleOrderExpansion(\u0275$index_390_r23));
    });
    \u0275\u0275elementStart(14, "mat-icon");
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 139);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r22);
      const detail_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.removeItemImport(detail_r24));
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18, "delete");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(19, "div", 140)(20, "mat-form-field", 141)(21, "mat-label");
    \u0275\u0275text(22, "Kh\xE1ch h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "mat-select", 142);
    \u0275\u0275listener("selectionChange", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_mat_select_selectionChange_23_listener($event) {
      \u0275\u0275restoreView(_r22);
      const detail_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.SelectKhachhang(detail_r24, $event));
    });
    \u0275\u0275elementStart(24, "div", 143)(25, "mat-form-field", 144)(26, "input", 145);
    \u0275\u0275listener("input", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_input_input_26_listener($event) {
      \u0275\u0275restoreView(_r22);
      const \u0275$index_390_r23 = \u0275\u0275nextContext().$index;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.DoFindKhachhang($event, \u0275$index_390_r23));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "div", 146);
    \u0275\u0275repeaterCreate(28, ListDonhangComponent_ng_template_80_For_31_Conditional_0_For_29_Template, 6, 3, "mat-option", 147, _forTrack2);
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(30, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_30_Template, 4, 2, "mat-hint", 148);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 141)(32, "mat-label");
    \u0275\u0275text(33, "Ng\xE0y giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 149);
    \u0275\u0275listener("dateChange", function ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template_input_dateChange_34_listener($event) {
      \u0275\u0275restoreView(_r22);
      const detail_r24 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.DoChonNgaygiao($event, detail_r24));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "mat-datepicker-toggle", 47)(36, "mat-datepicker", null, 12);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(38, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_38_Template, 27, 2, "div", 150);
    \u0275\u0275elementStart(39, "div", 151)(40, "div", 152)(41, "div")(42, "span", 120);
    \u0275\u0275text(43, "File:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 153);
    \u0275\u0275text(45);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div")(47, "span", 120);
    \u0275\u0275text(48, "S\u1EA3n ph\u1EA9m:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(49, "div", 154);
    \u0275\u0275text(50);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(51, "div")(52, "span", 120);
    \u0275\u0275text(53, "T\u1ED5ng SL:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "div", 155);
    \u0275\u0275text(55);
    \u0275\u0275pipe(56, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(57, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Conditional_57_Template, 5, 1, "div", 156);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_32_0;
    const orderDatePicker_r28 = \u0275\u0275reference(37);
    const ctx_r28 = \u0275\u0275nextContext();
    const detail_r24 = ctx_r28.$implicit;
    const \u0275$index_390_r23 = ctx_r28.$index;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275property("ngClass", (detail_r24.configOptions == null ? null : detail_r24.configOptions.confirmed) ? "border-green-500 bg-green-50" : "border-gray-300");
    \u0275\u0275advance(3);
    \u0275\u0275property("checked", (detail_r24.configOptions == null ? null : detail_r24.configOptions.confirmed) || false);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(detail_r24.tenkhongdau || "Kh\xE1ch h\xE0ng ch\u01B0a x\xE1c \u0111\u1ECBnh");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" File: ", detail_r24.fileName, " | Tr\u1EA1ng th\xE1i: ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(detail_r24.status);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.getOrderProducts(detail_r24).length > 0 ? 11 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(detail_r24.expanded ? "expand_less" : "expand_more");
    \u0275\u0275advance(8);
    \u0275\u0275property("value", (tmp_32_0 = ctx_r3.getSelectedCustomer(detail_r24)) == null ? null : tmp_32_0.id);
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r3.FilterKhachhang[\u0275$index_390_r23]);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r3.getSelectedCustomer(detail_r24) ? 30 : -1);
    \u0275\u0275advance(4);
    \u0275\u0275property("matDatepicker", orderDatePicker_r28)("ngModel", detail_r24.ngaygiao);
    \u0275\u0275advance();
    \u0275\u0275property("for", orderDatePicker_r28);
    \u0275\u0275advance(3);
    \u0275\u0275conditional(detail_r24.expanded ? 38 : -1);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(detail_r24.fileName);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.getOrderProducts(detail_r24).length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(56, 17, ctx_r3.getTotalQuantity(detail_r24), "1.0-2"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(detail_r24.message ? 57 : -1);
  }
}
function ListDonhangComponent_ng_template_80_For_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListDonhangComponent_ng_template_80_For_31_Conditional_0_Template, 58, 20, "div", 131);
  }
  if (rf & 2) {
    const detail_r24 = ctx.$implicit;
    \u0275\u0275conditional(detail_r24.status === "Processed" ? 0 : -1);
  }
}
function ListDonhangComponent_ng_template_80_Conditional_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 114)(1, "div", 178);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng \u0111\u1EC3 import");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 179);
    \u0275\u0275text(4, "Vui l\xF2ng ch\u1ECDn file Excel h\u1EE3p l\u1EC7");
    \u0275\u0275elementEnd()();
  }
}
function ListDonhangComponent_ng_template_80_Conditional_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 130);
    \u0275\u0275text(1, "autorenew");
    \u0275\u0275elementEnd();
  }
}
function ListDonhangComponent_ng_template_80_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "h2", 102)(1, "span");
    \u0275\u0275text(2, "Import \u0110\u01A1n H\xE0ng t\u1EEB Excel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 103);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 104)(6, "div", 105)(7, "div", 106)(8, "div", 107)(9, "mat-form-field", 108)(10, "mat-label");
    \u0275\u0275text(11, "Ng\xE0y giao (T\u1EA5t c\u1EA3)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 109);
    \u0275\u0275listener("dateChange", function ListDonhangComponent_ng_template_80_Template_input_dateChange_12_listener($event) {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.DoChonNgaygiao($event, "All"));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "mat-datepicker-toggle", 47)(14, "mat-datepicker", null, 11);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 64);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleAllOrderConfirmation());
    });
    \u0275\u0275elementStart(17, "mat-icon");
    \u0275\u0275text(18);
    \u0275\u0275elementEnd();
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "button", 110);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_Template_button_click_20_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.toggleAllOrdersExpansion());
    });
    \u0275\u0275elementStart(21, "mat-icon");
    \u0275\u0275text(22);
    \u0275\u0275elementEnd();
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 111);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.autoSelectCustomersFromFilename());
    });
    \u0275\u0275elementStart(25, "mat-icon");
    \u0275\u0275text(26, "auto_fix_high");
    \u0275\u0275elementEnd();
    \u0275\u0275text(27, " T\u1EF1 \u0111\u1ED9ng ch\u1ECDn KH ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(28, "div", 112)(29, "div", 113);
    \u0275\u0275repeaterCreate(30, ListDonhangComponent_ng_template_80_For_31_Template, 1, 1, null, null, _forTrack1);
    \u0275\u0275elementEnd();
    \u0275\u0275template(32, ListDonhangComponent_ng_template_80_Conditional_32_Template, 5, 0, "div", 114);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(33, "mat-dialog-actions", 115)(34, "div", 116)(35, "div", 117)(36, "div", 118)(37, "div", 119);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "div", 120);
    \u0275\u0275text(40, "T\u1ED5ng \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "div", 121)(42, "div", 122);
    \u0275\u0275text(43);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(44, "div", 120);
    \u0275\u0275text(45, "\u0110\xE3 ch\u1ECDn");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(46, "div", 123)(47, "div", 124);
    \u0275\u0275text(48);
    \u0275\u0275pipe(49, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 120);
    \u0275\u0275text(51, "T\u1ED5ng SP");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(52, "div", 125)(53, "div", 126);
    \u0275\u0275text(54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(55, "div", 127)(56, "button", 128);
    \u0275\u0275text(57, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(58, "button", 129);
    \u0275\u0275listener("click", function ListDonhangComponent_ng_template_80_Template_button_click_58_listener() {
      \u0275\u0275restoreView(_r21);
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ImportConfirmedDonhang());
    });
    \u0275\u0275template(59, ListDonhangComponent_ng_template_80_Conditional_59_Template, 2, 0, "mat-icon", 130);
    \u0275\u0275text(60);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const globalDatePicker_r30 = \u0275\u0275reference(15);
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate2(" ", ctx_r3.statusDetails.length, " \u0111\u01A1n h\xE0ng - ", ctx_r3.getConfirmedOrdersCount(), " \u0111\xE3 x\xE1c nh\u1EADn ");
    \u0275\u0275advance(8);
    \u0275\u0275property("matDatepicker", globalDatePicker_r30);
    \u0275\u0275advance();
    \u0275\u0275property("for", globalDatePicker_r30);
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
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(49, 18, ctx_r3.getTotalProducts(), "1.0-2"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate2(" \u0110\xE3 ch\u1ECDn ", ctx_r3.getConfirmedOrdersCount(), " / ", ctx_r3.getProcessedOrdersCount(), " \u0111\u01A1n h\xE0ng ");
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r3.getConfirmedOrdersCount() === 0 || ctx_r3.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r3.isLoading() ? 59 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" Import ", ctx_r3.getConfirmedOrdersCount(), " \u0111\u01A1n h\xE0ng ");
  }
}
function ListDonhangComponent_ng_template_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 180)(2, "div", 181);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 182)(7, "button", 183);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 128);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListDonhangComponent_ng_template_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 184)(1, "mat-icon", 185);
    \u0275\u0275text(2, "currency_exchange");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 186);
    \u0275\u0275text(4, "X\xE1c nh\u1EADn \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 104)(6, "div", 187)(7, "div", 188)(8, "mat-icon", 189);
    \u0275\u0275text(9, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 190)(11, "h4", 191);
    \u0275\u0275text(12, "Th\xF4ng tin \u0111\u1ED3ng b\u1ED9");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 192);
    \u0275\u0275text(14, " \u0110\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT cho ");
    \u0275\u0275elementStart(15, "strong", 170);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " \u0111\u01B0\u1EE3c ch\u1ECDn ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "div", 193)(19, "h4", 194);
    \u0275\u0275text(20, "Thao t\xE1c s\u1EBD th\u1EF1c hi\u1EC7n:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "ul", 195)(22, "li", 196)(23, "mat-icon", 197);
    \u0275\u0275text(24, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "C\u1EADp nh\u1EADt gi\xE1 b\xE1n t\u1EEB b\u1EA3ng gi\xE1 t\u01B0\u01A1ng \u1EE9ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(27, "li", 196)(28, "mat-icon", 197);
    \u0275\u0275text(29, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "span");
    \u0275\u0275text(31, "T\xEDnh l\u1EA1i t\u1ED5ng ti\u1EC1n c\u1EE7a \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(32, "li", 196)(33, "mat-icon", 197);
    \u0275\u0275text(34, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(35, "span");
    \u0275\u0275text(36, "T\xEDnh l\u1EA1i VAT d\u1EF1a tr\xEAn t\u1ED5ng ti\u1EC1n v\xE0 t\u1EF7 l\u1EC7 VAT");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(37, "li", 196)(38, "mat-icon", 197);
    \u0275\u0275text(39, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "span");
    \u0275\u0275text(41, "C\u1EADp nh\u1EADt tr\u01B0\u1EDDng tongvat cho t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "li", 196)(43, "mat-icon", 197);
    \u0275\u0275text(44, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "span");
    \u0275\u0275text(46, "L\u01B0u thay \u0111\u1ED5i v\xE0o c\u01A1 s\u1EDF d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(47, "div", 198)(48, "mat-icon", 199);
    \u0275\u0275text(49, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "div", 190)(51, "h4", 200);
    \u0275\u0275text(52, "L\u01B0u \xFD quan tr\u1ECDng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(53, "p", 201);
    \u0275\u0275text(54, " Thao t\xE1c n\xE0y s\u1EBD thay \u0111\u1ED5i d\u1EEF li\u1EC7u hi\u1EC7n t\u1EA1i v\xE0 kh\xF4ng th\u1EC3 ho\xE0n t\xE1c. Vui l\xF2ng \u0111\u1EA3m b\u1EA3o b\u1EA1n \u0111\xE3 ki\u1EC3m tra k\u1EF9 tr\u01B0\u1EDBc khi th\u1EF1c hi\u1EC7n. ");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(55, "mat-dialog-actions", 202)(56, "button", 203)(57, "mat-icon", 204);
    \u0275\u0275text(58, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(59, " H\u1EE7y b\u1ECF ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(60, "button", 183)(61, "mat-icon", 204);
    \u0275\u0275text(62, "currency_exchange");
    \u0275\u0275elementEnd();
    \u0275\u0275text(63, " X\xE1c nh\u1EADn \u0111\u1ED3ng b\u1ED9 ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate1("", ctx_r3.EditList.length, " \u0111\u01A1n h\xE0ng");
  }
}
function ListDonhangComponent_ng_template_86_div_14_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 224)(1, "div", 196)(2, "span", 225);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 190)(5, "p", 226);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 126);
    \u0275\u0275text(8, " Ng\xE0y giao: ");
    \u0275\u0275elementStart(9, "span", 153);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "p", 126);
    \u0275\u0275text(12, " C\xF3 ");
    \u0275\u0275elementStart(13, "span", 154);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275text(15, " \u0111\u01A1n h\xE0ng hi\u1EC7n t\u1EA1i, \u0111\u01A1n m\u1EDBi c\xF3 ");
    \u0275\u0275elementStart(16, "span", 155);
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " s\u1EA3n ph\u1EA9m ");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const dup_r31 = ctx.$implicit;
    const i_r32 = ctx.index;
    const ctx_r3 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", i_r32 + 1, ".");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dup_r31.customerName);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r3.formatDate(dup_r31.deliveryDate));
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(dup_r31.existingOrderCount);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(dup_r31.newProductCount);
  }
}
function ListDonhangComponent_ng_template_86_div_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193)(1, "h4", 194);
    \u0275\u0275text(2, "Chi ti\u1EBFt \u0111\u01A1n h\xE0ng tr\xF9ng l\u1EB7p:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 222);
    \u0275\u0275template(4, ListDonhangComponent_ng_template_86_div_14_div_4_Template, 19, 5, "div", 223);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngForOf", ctx_r3.duplicateDialogData.duplicates);
  }
}
function ListDonhangComponent_ng_template_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 184)(1, "mat-icon", 205);
    \u0275\u0275text(2, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 186);
    \u0275\u0275text(4, "Ph\xE1t hi\u1EC7n \u0111\u01A1n h\xE0ng tr\xF9ng l\u1EB7p");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 104)(6, "div", 187)(7, "div", 206)(8, "mat-icon", 207);
    \u0275\u0275text(9, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 190)(11, "h4", 208);
    \u0275\u0275text(12, "C\u1EA3nh b\xE1o tr\xF9ng l\u1EB7p");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "p", 209);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(14, ListDonhangComponent_ng_template_86_div_14_Template, 5, 1, "div", 210);
    \u0275\u0275elementStart(15, "div", 193)(16, "h4", 194);
    \u0275\u0275text(17, "L\u1EF1a ch\u1ECDn x\u1EED l\xFD:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "div", 211)(19, "div", 212)(20, "mat-icon", 213);
    \u0275\u0275text(21, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 190)(23, "h5", 214);
    \u0275\u0275text(24, "T\u1EA1o th\xEAm \u0111\u01A1n h\xE0ng m\u1EDBi");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 215);
    \u0275\u0275text(26, "T\u1EA1o \u0111\u01A1n h\xE0ng m\u1EDBi v\u1EDBi c\xF9ng kh\xE1ch h\xE0ng v\xE0 ng\xE0y giao");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(27, "div", 216)(28, "mat-icon", 217);
    \u0275\u0275text(29, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(30, "div", 190)(31, "h5", 218);
    \u0275\u0275text(32, "B\u1ECF qua \u0111\u01A1n h\xE0ng tr\xF9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(33, "p", 219);
    \u0275\u0275text(34, "Kh\xF4ng t\u1EA1o \u0111\u01A1n h\xE0ng m\u1EDBi cho c\xE1c kh\xE1ch h\xE0ng tr\xF9ng l\u1EB7p");
    \u0275\u0275elementEnd()()()()()()();
    \u0275\u0275elementStart(35, "mat-dialog-actions", 202)(36, "button", 220)(37, "mat-icon", 204);
    \u0275\u0275text(38, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275text(39, " B\u1ECF qua tr\xF9ng l\u1EB7p ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "button", 221)(41, "mat-icon", 204);
    \u0275\u0275text(42, "add_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(43, " T\u1EA1o th\xEAm \u0111\u01A1n h\xE0ng m\u1EDBi ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(13);
    \u0275\u0275property("innerHTML", ctx_r3.duplicateDialogData == null ? null : ctx_r3.duplicateDialogData.message, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.duplicateDialogData == null ? null : ctx_r3.duplicateDialogData.duplicates == null ? null : ctx_r3.duplicateDialogData.duplicates.length);
  }
}
function ListDonhangComponent_ng_template_88_div_21_div_7_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 251)(1, "div", 252)(2, "div", 253)(3, "div", 254)(4, "mat-icon", 255);
    \u0275\u0275text(5, "inventory");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 256)(7, "div", 245)(8, "span", 257);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 258);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(12, "div", 259)(13, "div", 260)(14, "mat-icon", 159);
    \u0275\u0275text(15, "trending_flat");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "span");
    \u0275\u0275text(17, "Tr\u01B0\u1EDBc:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 153);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "mat-icon", 261);
    \u0275\u0275text(21, "arrow_forward");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 262)(23, "mat-icon", 159);
    \u0275\u0275text(24, "done");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "span");
    \u0275\u0275text(26, "Sau:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "span", 181);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd()()()()()();
  }
  if (rf & 2) {
    const dup_r33 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(dup_r33.productCode);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", dup_r33.count, " l\u1EA7n tr\xF9ng ");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1("", dup_r33.count, " d\xF2ng");
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate1("1 d\xF2ng (SL: ", dup_r33.mergedQty, ")");
  }
}
function ListDonhangComponent_ng_template_88_div_21_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 243)(1, "div", 244)(2, "div", 245)(3, "span", 246);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "mat-icon", 63);
    \u0275\u0275text(6, "shopping_cart");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "span", 247);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "span", 248);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 249);
    \u0275\u0275template(12, ListDonhangComponent_ng_template_88_div_21_div_7_div_12_Template, 29, 4, "div", 250);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const detail_r34 = ctx.$implicit;
    const orderIndex_r35 = ctx.index;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", orderIndex_r35 + 1, " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(detail_r34.orderName);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", detail_r34.duplicates.length, " s\u1EA3n ph\u1EA9m tr\xF9ng ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", detail_r34.duplicates);
  }
}
function ListDonhangComponent_ng_template_88_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 193)(1, "h4", 240)(2, "mat-icon", 120);
    \u0275\u0275text(3, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m \u0111\xE3 g\u1ED9p:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "div", 241);
    \u0275\u0275template(7, ListDonhangComponent_ng_template_88_div_21_div_7_Template, 13, 4, "div", 242);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngForOf", ctx_r3.duplicateMergeData == null ? null : ctx_r3.duplicateMergeData.details);
  }
}
function ListDonhangComponent_ng_template_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 227)(1, "mat-icon", 63);
    \u0275\u0275text(2, "merge_type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 228);
    \u0275\u0275text(4, "\u0110\xE3 g\u1ED9p s\u1EA3n ph\u1EA9m tr\xF9ng l\u1EB7p");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "mat-dialog-content", 104)(6, "div", 229)(7, "div", 230)(8, "mat-icon", 231);
    \u0275\u0275text(9, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 190)(11, "h4", 232);
    \u0275\u0275text(12, "G\u1ED9p th\xE0nh c\xF4ng!");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "p", 233);
    \u0275\u0275text(14, " \u0110\xE3 g\u1ED9p ");
    \u0275\u0275elementStart(15, "span", 234);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275text(17, " s\u1EA3n ph\u1EA9m tr\xF9ng l\u1EB7p trong ");
    \u0275\u0275elementStart(18, "span", 181);
    \u0275\u0275text(19);
    \u0275\u0275elementEnd();
    \u0275\u0275text(20, " \u0111\u01A1n h\xE0ng ");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(21, ListDonhangComponent_ng_template_88_div_21_Template, 8, 1, "div", 210);
    \u0275\u0275elementStart(22, "div", 235)(23, "mat-icon", 236);
    \u0275\u0275text(24, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(25, "p", 237)(26, "span", 170);
    \u0275\u0275text(27, "L\u01B0u \xFD:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(28, " C\xE1c s\u1EA3n ph\u1EA9m tr\xF9ng \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EF1 \u0111\u1ED9ng g\u1ED9p theo m\xE3 s\u1EA3n ph\u1EA9m, s\u1ED1 l\u01B0\u1EE3ng \u0111\u01B0\u1EE3c c\u1ED9ng d\u1ED3n v\xE0 ghi ch\xFA \u0111\u01B0\u1EE3c k\u1EBFt h\u1EE3p l\u1EA1i. ");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(29, "mat-dialog-actions", 238)(30, "button", 239)(31, "mat-icon", 204);
    \u0275\u0275text(32, "check");
    \u0275\u0275elementEnd();
    \u0275\u0275text(33, " \u0110\xE3 hi\u1EC3u, ti\u1EBFp t\u1EE5c ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(16);
    \u0275\u0275textInterpolate(ctx_r3.duplicateMergeData == null ? null : ctx_r3.duplicateMergeData.totalCount);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r3.duplicateMergeData == null ? null : ctx_r3.duplicateMergeData.details == null ? null : ctx_r3.duplicateMergeData.details.length);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r3.duplicateMergeData == null ? null : ctx_r3.duplicateMergeData.details == null ? null : ctx_r3.duplicateMergeData.details.length);
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
    "updatedAt",
    "actions",
    "lydohuy"
  ];
  ColumnName = {
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    name: "Kh\xE1ch H\xE0ng",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    ngaygiao: "Ng\xE0y Giao",
    ghichu: "Ghi Ch\xFA",
    status: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt",
    actions: "Thao T\xE1c",
    lydohuy: "L\xFD Do H\u1EE7y"
  };
  FilterColumns = JSON.parse(localStorage.getItem("DonhangColFilter") || "[]");
  Columns = [];
  isLoading = signal(false);
  paginator;
  sort;
  drawer;
  dialogImportExcelCu;
  confirmDongboDialog;
  confirmDuplicateDialog;
  duplicateMergeDialog;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _KhachhangService = inject(KhachhangService);
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  cancelOrderService = inject(CancelOrderService);
  Listdonhang = signal([]);
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  Trangthaidon = TrangThaiDon;
  SearchParams = {
    Batdau: (0, import_moment.default)().startOf("day").toDate(),
    Ketthuc: (0, import_moment.default)().endOf("day").toDate(),
    Type: "all",
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
  ListKhachhang = [];
  LoadListKhachhang() {
    return __async(this, null, function* () {
      const result = yield this._GraphqlService.findAll("khachhang", {
        enableParallelFetch: true,
        take: 999999,
        enableStreaming: true,
        aggressiveCache: true,
        select: {
          id: true,
          tenfile: true,
          tenkh: true,
          name: true,
          namenn: true,
          subtitle: true,
          makh: true,
          makhold: true,
          diachi: true,
          sdt: true,
          mst: true,
          gionhanhang: true,
          quan: true,
          email: true,
          phone: true,
          address: true,
          loaikh: true,
          ghichu: true,
          hiengia: true,
          isActive: true,
          istitle2: true,
          isshowvat: true,
          banggiaId: true,
          createdAt: true,
          updatedAt: true,
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true,
              type: true,
              batdau: true,
              ketthuc: true,
              order: true,
              ghichu: true,
              status: true,
              isActive: true,
              isDefault: true,
              createdAt: true,
              updatedAt: true
            }
          }
        }
      });
      this.ListKhachhang = result.data;
    });
  }
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  searchData() {
    return __async(this, null, function* () {
      yield this.LoadData();
    });
  }
  LoadData() {
    return __async(this, null, function* () {
      this.LoadListKhachhang();
      this.isLoading.set(true);
      try {
        this._GraphqlService.clearCache("donhang");
        const result = yield this._GraphqlService.findAll("donhang", {
          enableParallelFetch: true,
          maxConcurrency: 4,
          batchSize: 3e3,
          take: 999999,
          enableStreaming: true,
          aggressiveCache: true,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            ghichu: true,
            isshowvat: true,
            status: true,
            createdAt: true,
            tongvat: true,
            tongtien: true,
            vat: true,
            type: true,
            lydohuy: true,
            sanpham: {
              select: {
                sanpham: { select: { masp: true } }
              }
            },
            khachhang: {
              select: {
                makh: true,
                name: true,
                loaikh: true
              }
            }
          },
          where: __spreadValues({
            ngaygiao: {
              gte: this.SearchParams.Batdau,
              lte: this.SearchParams.Ketthuc
            }
          }, this.SearchParams.Type !== "all" && {
            khachhang: {
              loaikh: this.SearchParams.Type
            }
          })
        });
        const donhangs = result.data.map((v) => ({
          id: v.id,
          madonhang: v.madonhang,
          name: v.khachhang?.name || "",
          sanpham: v.sanpham?.length,
          ngaygiao: v.ngaygiao,
          ghichu: v.ghichu || "",
          status: v.status,
          createdAt: v.createdAt,
          updatedAt: v.updatedAt || v.createdAt,
          tongtien: v.tongtien,
          vat: v.vat,
          tongvat: v.tongvat,
          lydohuy: v.lydohuy || ""
        }));
        this.Listdonhang.set(donhangs);
        if (donhangs) {
          this.dataSource = new MatTableDataSource(donhangs);
          this.dataSource.sort = this.sort;
          this.dataSource.filterPredicate = this.createFilter();
          this.total.set(donhangs.length);
          this.pageCount.set(Math.ceil(donhangs.length / this.pageSize()));
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
  getAllKhachhang() {
    return __async(this, null, function* () {
      const result = yield this._GraphqlService.findAll("khachhang", {
        enableParallelFetch: true,
        take: 999999,
        enableStreaming: true,
        aggressiveCache: true
      });
      console.log(result);
    });
  }
  onSelectionChange(event) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        this.SearchParams.Type = event.value;
        yield this.LoadData();
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
  onTypeChange(value) {
    return __async(this, null, function* () {
      this.SearchParams.Type = value;
      this.SearchParams.pageNumber = 1;
      yield this.LoadData();
    });
  }
  onDateChange(event) {
    this.SearchParams.pageNumber = 1;
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
      if (filterValue.length === 0) {
        this.dataSource.filter = "";
        return;
      }
      this.isLoading.set(true);
      try {
        yield new Promise((resolve) => setTimeout(resolve, 0));
        const normalizedFilter = removeVietnameseAccents(filterValue.trim().toLowerCase());
        this.dataSource.filterPredicate = (data, filter) => {
          const dataStr = Object.keys(data).reduce((currentTerm, key) => {
            return currentTerm + (data[key] ? data[key].toString().toLowerCase() : "") + "\u25EC";
          }, "").toLowerCase();
          const normalizedDataStr = removeVietnameseAccents(dataStr);
          return dataStr.includes(filter) || normalizedDataStr.includes(filter);
        };
        this.dataSource.filter = normalizedFilter;
        if (this.paginator) {
          this.paginator.firstPage();
        }
      } catch (error) {
        console.error("Error applying filter:", error);
        this._snackBar.open("L\u1ED7i khi t\xECm ki\u1EBFm", "", {
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
    this.ListFilter = this.Listdonhang() || [];
    this.dataSource.data = this.Listdonhang() || [];
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listdonhang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
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
  // async Dongbogia() {
  //   // Kiểm tra có đơn hàng nào được chọn không
  //   if (this.Listdonhang().length === 0) {
  //     this._snackBar.open('Không có đơn hàng nào để đồng bộ giá', '', {
  //       duration: 3000,
  //       horizontalPosition: 'end',
  //       verticalPosition: 'top',
  //       panelClass: ['snackbar-warning'],
  //     });
  //     return;
  //   }
  //   // Hiển thị dialog xác nhận với thông tin về batch processing
  //   const batchSize = 5;
  //   const totalBatches = Math.ceil(this.Listdonhang().length / batchSize);
  //   const confirmDialog = confirm(`Bạn có chắc chắn muốn đồng bộ giá cho ${this.Listdonhang().length} đơn hàng không?\n\nThao tác sẽ được thực hiện theo ${totalBatches} lần (mỗi lần ${batchSize} đơn hàng) để đảm bảo hiệu suất.\n\nLưu ý: Thao tác này sẽ cập nhật giá bán từ bảng giá tương ứng và tính lại tổng tiền của tất cả đơn hàng.`);
  //   if (!confirmDialog) {
  //     return;
  //   }
  //   this.isLoading.set(true);
  //   // Hiển thị progress snackbar
  //   let progressSnackbar = this._snackBar.open(`Đang đồng bộ giá cho ${this.Listdonhang().length} đơn hàng...`, 'Đang xử lý', {
  //     duration: 0, // Không tự động đóng
  //     horizontalPosition: 'end',
  //     verticalPosition: 'top',
  //     panelClass: ['snackbar-success'],
  //   });
  //   try {
  //     const result = await this._DonhangService.DongboGia(this.Listdonhang());
  //     // Đóng progress snackbar
  //     progressSnackbar.dismiss();
  //     if (result && result.status === 'success') {
  //       let message = result.message || 'Đồng bộ giá thành công';
  //       // Thêm thông tin chi tiết nếu có
  //       if (result.updatedCount !== undefined) {
  //         const successRate = Math.round((result.updatedCount / result.totalProcessed) * 100);
  //         message = `✅ Đồng bộ giá hoàn tất!\n📊 Kết quả: ${result.updatedCount}/${result.totalProcessed} đơn hàng (${successRate}%)`;
  //         if (result.errorCount > 0) {
  //           message += `\n⚠️ Lỗi: ${result.errorCount} đơn hàng không thể cập nhật`;
  //         }
  //       }
  //       this._snackBar.open(message, '✅ Thành công', {
  //         duration: 6000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: ['snackbar-success'],
  //       });
  //       // Reload data sau khi sync thành công
  //       await this.LoadData();
  //       this.EditList = [];
  //     } else {
  //       this._snackBar.open(result?.message || 'Đồng bộ giá thất bại', '❌ Lỗi', {
  //         duration: 4000,
  //         horizontalPosition: 'end',
  //         verticalPosition: 'top',
  //         panelClass: ['snackbar-error'],
  //       });
  //     }
  //   } catch (error: any) {
  //     console.error('Error syncing prices:', error);
  //     // Đóng progress snackbar nếu còn mở
  //     progressSnackbar.dismiss();
  //     let errorMessage = 'Lỗi khi đồng bộ giá';
  //     // Xử lý các loại lỗi phổ biến
  //     if (error?.error?.message) {
  //       errorMessage = error.error.message;
  //       if (error.error.message.includes('Transaction already closed')) {
  //         errorMessage = '⏱️ Thao tác mất quá nhiều thời gian. Vui lòng thử lại với ít đơn hàng hơn.';
  //       }
  //     } else if (error?.message) {
  //       errorMessage = error.message;
  //       if (error.message.includes('timeout')) {
  //         errorMessage = '⏱️ Hết thời gian chờ. Hệ thống đang xử lý quá nhiều đơn hàng cùng lúc.';
  //       }
  //     }
  //     this._snackBar.open(`❌ ${errorMessage}`, 'Đóng', {
  //       duration: 6000,
  //       horizontalPosition: 'end',
  //       verticalPosition: 'top',
  //       panelClass: ['snackbar-error'],
  //     });
  //   } finally {
  //     this.isLoading.set(false);
  //   }
  // }
  /**
   * Format date for display
   */
  formatDate(date) {
    return new Date(date).toLocaleDateString("vi-VN");
  }
  /**
   * Open duplicate confirmation dialog
   */
  openDuplicateDialog(duplicateData) {
    return new Promise((resolve) => {
      this.duplicateDialogData = duplicateData;
      const dialogRef = this.dialog.open(this.confirmDuplicateDialog, {
        hasBackdrop: true,
        disableClose: true,
        width: "700px",
        maxWidth: "95vw",
        maxHeight: "90vh"
      });
      dialogRef.afterClosed().subscribe((result) => {
        this.duplicateDialogData = null;
        resolve(result || "skip");
      });
    });
  }
  DongboVat() {
    return __async(this, null, function* () {
      this.openDongboDialog();
    });
  }
  /**
   * Open sync confirmation dialog
   */
  openDongboDialog() {
    if (this.EditList.length === 0) {
      this._snackBar.open("Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u1EC3 \u0111\u1ED3ng b\u1ED9", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-warning"]
      });
      return;
    }
    const dialogRef = this.dialog.open(this.confirmDongboDialog, {
      hasBackdrop: true,
      disableClose: true,
      width: "600px",
      maxWidth: "90vw"
    });
    dialogRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.executeDongboVat();
      }
    });
  }
  /**
   * Execute the actual sync operation
   */
  executeDongboVat() {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      let progressSnackbar = this._snackBar.open(`\u0110ang \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT cho ${this.EditList.length} \u0111\u01A1n h\xE0ng...`, "\u0110ang x\u1EED l\xFD", {
        duration: 0,
        // Không tự động đóng
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      try {
        const priceResult = yield this._DonhangService.DongboGia(this.EditList);
        if (!priceResult || priceResult.status !== "success") {
          throw new Error(priceResult?.message || "L\u1ED7i \u0111\u1ED3ng b\u1ED9 gi\xE1");
        }
        let vatUpdatedCount = 0;
        let vatErrorCount = 0;
        const vatErrors = [];
        yield this.LoadData();
        for (const order of this.EditList) {
          try {
            const updatedOrder = this.dataSource.data.find((o) => o.id === order.id);
            const tongtien = Number(updatedOrder?.tongtien || order.tongtien) || 0;
            const vatRate = Number(updatedOrder?.vat || order.vat) || 0.05;
            const tongvat = tongtien * vatRate;
            yield this._GraphqlService.updateOne("donhang", { id: order.id }, {
              tongvat: Math.round(tongvat * 100) / 100,
              // Làm tròn 2 chữ số thập phân
              vat: vatRate
            });
            order.tongvat = Math.round(tongvat * 100) / 100;
            order.tongtien = tongtien;
            vatUpdatedCount++;
          } catch (error) {
            console.error(`Error updating VAT for order ${order.madonhang}:`, error);
            vatErrorCount++;
            vatErrors.push(`${order.madonhang}: ${error.message || "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh"}`);
          }
        }
        progressSnackbar.dismiss();
        if (priceResult.updatedCount > 0 || vatUpdatedCount > 0) {
          let message = `\u2705 \u0110\u1ED3ng b\u1ED9 ho\xE0n t\u1EA5t!
`;
          if (priceResult.updatedCount !== void 0) {
            const priceSuccessRate = Math.round(priceResult.updatedCount / priceResult.totalProcessed * 100);
            message += `\u{1F4CA} Gi\xE1: ${priceResult.updatedCount}/${priceResult.totalProcessed} \u0111\u01A1n h\xE0ng (${priceSuccessRate}%)
`;
            if (priceResult.errorCount > 0) {
              message += `\u26A0\uFE0F L\u1ED7i gi\xE1: ${priceResult.errorCount} \u0111\u01A1n h\xE0ng
`;
            }
          }
          const vatSuccessRate = Math.round(vatUpdatedCount / this.EditList.length * 100);
          message += `\u{1F4B0} VAT: ${vatUpdatedCount}/${this.EditList.length} \u0111\u01A1n h\xE0ng (${vatSuccessRate}%)`;
          if (vatErrorCount > 0) {
            message += `
\u26A0\uFE0F L\u1ED7i VAT: ${vatErrorCount} \u0111\u01A1n h\xE0ng`;
            console.warn("VAT sync errors:", vatErrors);
          }
          this._snackBar.open(message, "\u2705 Th\xE0nh c\xF4ng", {
            duration: 8e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          yield this.LoadData();
          this.EditList = [];
        } else {
          this._snackBar.open("\u274C Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt", "\u0110\xF3ng", {
            duration: 4e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      } catch (error) {
        console.error("Error syncing prices and VAT:", error);
        progressSnackbar.dismiss();
        let errorMessage = "L\u1ED7i khi \u0111\u1ED3ng b\u1ED9 gi\xE1 v\xE0 VAT";
        if (error?.error?.message) {
          errorMessage = error.error.message;
          if (error.error.message.includes("Transaction already closed")) {
            errorMessage = "\u23F1\uFE0F Thao t\xE1c m\u1EA5t qu\xE1 nhi\u1EC1u th\u1EDDi gian. Vui l\xF2ng th\u1EED l\u1EA1i v\u1EDBi \xEDt \u0111\u01A1n h\xE0ng h\u01A1n.";
          }
        } else if (error?.message) {
          errorMessage = error.message;
          if (error.message.includes("timeout")) {
            errorMessage = "\u23F1\uFE0F H\u1EBFt th\u1EDDi gian ch\u1EDD. H\u1EC7 th\u1ED1ng \u0111ang x\u1EED l\xFD qu\xE1 nhi\u1EC1u \u0111\u01A1n h\xE0ng c\xF9ng l\xFAc.";
          }
        }
        this._snackBar.open(`\u274C ${errorMessage}`, "\u0110\xF3ng", {
          duration: 6e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  dialog = inject(MatDialog);
  statusDetails = [];
  ListImportData = [];
  EditList = [];
  duplicateDialogData = null;
  duplicateMergeData = null;
  ImporExcel(event) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      const files = Array.from(event.target.files);
      let processedCount = 0;
      let skippedCount = 0;
      let errorCount = 0;
      try {
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
              Quantity: Number(item.Quantity) ?? 0,
              Remark: item.Remark ?? ""
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
        if (!this.ListKhachhang || this.ListKhachhang.length === 0) {
          console.log("\u{1F4CB} Loading customer list for auto-selection...");
          yield this.LoadListKhachhang();
          console.log(`\u2705 Loaded ${this.ListKhachhang?.length || 0} customers`);
        }
        this.dialog.open(this.dialogImportExcelCu, {
          disableClose: true
        });
        this.statusDetails.forEach((v, k) => {
          this.FilterKhachhang[k] = this.ListKhachhang;
        });
        this.statusDetails.sort((a, b) => {
          if (a.status === "Processed" && b.status !== "Processed")
            return -1;
          if (a.status !== "Processed" && b.status === "Processed")
            return 1;
          return 0;
        });
        this.autoSelectCustomersFromFilename();
      } catch (error) {
        console.error("Error processing Excel files:", error);
        this._snackBar.open("L\u1ED7i khi x\u1EED l\xFD file Excel", "", {
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
  removeItemImport(item) {
    this.statusDetails = this.statusDetails.filter((v) => v.tenkhongdau !== item.tenkhongdau);
    this.ListImportData = this.ListImportData.filter((v) => v.tenkh !== item.tenkhongdau);
  }
  DoImportKhachhangCu(ListImportData) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        console.log("ListImportData", ListImportData);
        const invalidItems = ListImportData.filter((item) => !item.khachhangId || !item.ngaygiao);
        console.log(ListImportData);
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
        if (result.needsConfirmation) {
          this.isLoading.set(false);
          const userChoice = yield this.openDuplicateDialog({
            message: result.message,
            duplicates: result.duplicates
          });
          this.isLoading.set(true);
          const confirmedResult = yield this._DonhangService.ImportDonhangCuConfirmed(result.pendingOrders, userChoice);
          const finalResult = {
            success: result.processResults.success + confirmedResult.success,
            fail: result.processResults.fail + confirmedResult.fail,
            skip: result.processResults.skip + confirmedResult.skip,
            message: confirmedResult.message
          };
          this.dialog.closeAll();
          this._snackBar.open(`${finalResult.message} - T\u1ED5ng k\u1EBFt: Th\xE0nh c\xF4ng ${finalResult.success}, Th\u1EA5t b\u1EA1i ${finalResult.fail}, B\u1ECF qua ${finalResult.skip}`, "", {
            duration: 6e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } else {
          this.dialog.closeAll();
          this._snackBar.open(`Nh\u1EADp \u0111\u01A1n h\xE0ng : Th\xE0nh c\xF4ng ${result.success}, Th\u1EA5t b\u1EA1i ${result.fail}, B\u1ECF qua ${result.skip}. Reload L\u1EA1i sau 3s`, "", {
            duration: 5e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      } catch (importError) {
        console.error("L\u1ED7i khi nh\u1EADp \u0111\u01A1n h\xE0ng:", importError);
        this._snackBar.open(`L\u1ED7i khi nh\u1EADp \u0111\u01A1n h\xE0ng: ${importError.message}`, "", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      } finally {
        this.isLoading.set(false);
      }
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
      this.isLoading.set(true);
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
            sldat: parseFloat(Number(item.sldat).toFixed(3)) || 0,
            slgiao: parseFloat(Number(item.sldat).toFixed(3)) || 0,
            slnhan: parseFloat(Number(item.sldat).toFixed(3)) || 0
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
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._KhachhangService.getAllKhachhang();
      yield this._SanphamService.getAllSanpham();
      yield this._BanggiaService.getAllBanggia();
      const KH = this.ListKhachhang.map((v) => ({
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
    if (!this.statusDetails?.length || !this.ListKhachhang?.length) {
      console.warn("\u274C [autoSelectCustomers] Cannot auto-select:", {
        statusDetailsLength: this.statusDetails?.length || 0,
        ListKhachhangLength: this.ListKhachhang?.length || 0
      });
      return;
    }
    const customers = this.ListKhachhang;
    console.log("\u{1F50D} [autoSelectCustomers] Starting with", customers.length, "customers");
    console.log("\u{1F50D} [autoSelectCustomers] Processing", this.statusDetails.length, "files");
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
      console.log(`
\u{1F50E} [autoSelectCustomers] File ${index + 1}/${this.statusDetails.length}: "${detail.fileName}" \u2192 "${filename}"`);
      let matchedCustomer = null;
      matchedCustomer = customers.find((customer) => {
        const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
        return customerNameNoAccent === filename;
      });
      if (matchedCustomer) {
        console.log("\u2705 [Strategy 1] Exact name match:", matchedCustomer.name);
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(customer.subtitle || "").toLowerCase();
          return customerSubtitleNoAccent === filename;
        });
        if (matchedCustomer) {
          console.log("\u2705 [Strategy 2] Exact subtitle match:", matchedCustomer.name, "(subtitle:", matchedCustomer.subtitle + ")");
        }
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerCode = (customer.makh || "").toLowerCase();
          return customerCode === filename;
        });
        if (matchedCustomer) {
          console.log("\u2705 [Strategy 3] Exact makh match:", matchedCustomer.name, "(makh:", matchedCustomer.makh + ")");
        }
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
          return customerNameNoAccent && filename.includes(customerNameNoAccent);
        });
        if (matchedCustomer) {
          console.log("\u2705 [Strategy 4] Partial match (filename contains name):", matchedCustomer.name);
        }
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerNameNoAccent = removeVietnameseAccents(customer.name || "").toLowerCase();
          return customerNameNoAccent && customerNameNoAccent.includes(filename);
        });
        if (matchedCustomer) {
          console.log("\u2705 [Strategy 5] Partial match (name contains filename):", matchedCustomer.name);
        }
      }
      if (!matchedCustomer) {
        matchedCustomer = customers.find((customer) => {
          const customerSubtitleNoAccent = removeVietnameseAccents(customer.subtitle || "").toLowerCase();
          return customerSubtitleNoAccent && (filename.includes(customerSubtitleNoAccent) || customerSubtitleNoAccent.includes(filename));
        });
        if (matchedCustomer) {
          console.log("\u2705 [Strategy 6] Partial subtitle match:", matchedCustomer.name, "(subtitle:", matchedCustomer.subtitle + ")");
        }
      }
      if (!matchedCustomer) {
        console.log("\u274C [autoSelectCustomers] No match found for:", filename);
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
        console.log(`\u2705 Auto-selected customer "${matchedCustomer.name}" (ID: ${matchedCustomer.id}) for file "${detail.fileName}"`);
      }
    });
    console.log(`
\u{1F4CA} [autoSelectCustomers] Summary: Matched=${matchedCount}, Skipped=${skippedCount}, Total=${this.statusDetails.length}`);
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
    return this.ListKhachhang.find((customer) => customer.id === importData.khachhangId);
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
   * Show duplicate merge dialog with detailed information
   */
  showDuplicateMergeDialog(totalCount, details) {
    return __async(this, null, function* () {
      return new Promise((resolve) => {
        this.duplicateMergeData = { totalCount, details };
        const dialogRef = this.dialog.open(this.duplicateMergeDialog, {
          hasBackdrop: true,
          disableClose: false,
          maxWidth: "95vw",
          maxHeight: "95vh",
          width: "80vw",
          height: "95vh"
        });
        dialogRef.afterClosed().subscribe(() => {
          this.duplicateMergeData = null;
          resolve();
        });
      });
    });
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
            slnhan: Number(item.Quantity),
            ghichu: item.Remark || ""
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
      this.isLoading.set(true);
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
      } finally {
        this.isLoading.set(false);
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
   * Count delivered orders (dagiao, danhan, hoanthanh)
   * Safely handles signal value and ensures array type
   */
  countDagiao() {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders))
      return 0;
    return orders.filter((item) => ["dagiao", "danhan", "hoanthanh"].includes(item.status)).length;
  }
  /**
   * Count undelivered orders (dadat)
   * Safely handles signal value and ensures array type
   */
  countChuagiao() {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders))
      return 0;
    return orders.filter((item) => ["dadat", "huy"].includes(item.status)).length;
  }
  /**
   * Filter by delivered status (danhan, hoanthanh)
   */
  filterDagiao() {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders.filter((item) => ["danhan", "hoanthanh"].includes(item.status));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Filter by undelivered status (dadat, dagiao, huy)
   */
  filterChuagiao() {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders.filter((item) => ["dadat", "dagiao", "huy"].includes(item.status));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Reset filter to show all orders
   */
  resetStatusFilter() {
    const orders = this.Listdonhang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
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
      this.isLoading.set(true);
      try {
        const confirmedDetails = this.statusDetails.filter((detail) => detail.status === "Processed" && detail.configOptions?.confirmed);
        if (confirmedDetails.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o \u0111\u01B0\u1EE3c x\xE1c nh\u1EADn \u0111\u1EC3 nh\u1EADp", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          this.isLoading.set(false);
          return;
        }
        const confirmedOrders = this.ListImportData.filter((order) => confirmedDetails.some((detail) => detail.tenkhongdau === order.tenkh));
        console.log("\u{1F4CB} Confirmed orders matched:", {
          confirmedDetailsCount: confirmedDetails.length,
          confirmedOrdersCount: confirmedOrders.length,
          confirmedOrders: confirmedOrders.map((o) => ({ tenkh: o.tenkh, khachhangId: o.khachhangId }))
        });
        let totalDuplicatesFound = 0;
        const mergeDetails = [];
        const processedOrders = confirmedOrders.map((order) => {
          if (!order.sanpham || !Array.isArray(order.sanpham)) {
            return order;
          }
          const productMap = /* @__PURE__ */ new Map();
          order.sanpham.forEach((item) => {
            const itemCode = item.ItemCode?.trim();
            if (!itemCode)
              return;
            if (productMap.has(itemCode)) {
              const existing = productMap.get(itemCode);
              existing.Quantity += Number(item.Quantity) || 0;
              existing.count += 1;
              existing.originalQuantities.push(Number(item.Quantity) || 0);
              if (item.Remark && !existing.Remark.includes(item.Remark)) {
                existing.Remark = existing.Remark ? `${existing.Remark}; ${item.Remark}` : item.Remark;
              }
            } else {
              productMap.set(itemCode, {
                ItemCode: itemCode,
                Quantity: Number(item.Quantity) || 0,
                Remark: item.Remark || "",
                count: 1,
                originalQuantities: [Number(item.Quantity) || 0]
              });
            }
          });
          const orderDuplicates = [];
          productMap.forEach((value, key) => {
            if (value.count > 1) {
              totalDuplicatesFound += value.count - 1;
              orderDuplicates.push({
                productCode: key,
                originalQty: value.originalQuantities.reduce((a, b) => a + b, 0) / value.count,
                // Average
                mergedQty: value.Quantity,
                count: value.count
              });
            }
          });
          if (orderDuplicates.length > 0) {
            mergeDetails.push({
              orderName: order.tenfile || order.tenkh,
              duplicates: orderDuplicates
            });
          }
          const mergedProducts = Array.from(productMap.values()).map((item) => ({
            ItemCode: item.ItemCode,
            Quantity: item.Quantity,
            Remark: item.Remark
          }));
          console.log(`\u{1F504} Order "${order.tenkh}": ${order.sanpham.length} products \u2192 ${mergedProducts.length} products (removed ${order.sanpham.length - mergedProducts.length} duplicates)`);
          return __spreadProps(__spreadValues({}, order), {
            sanpham: mergedProducts
          });
        });
        if (totalDuplicatesFound > 0) {
          let detailMessage = `\u{1F504} \u0110\xE3 g\u1ED9p ${totalDuplicatesFound} s\u1EA3n ph\u1EA9m tr\xF9ng l\u1EB7p:

`;
          mergeDetails.forEach((detail, index) => {
            detailMessage += `\u{1F4E6} ${detail.orderName}:
`;
            detail.duplicates.forEach((dup) => {
              detailMessage += `   \u2022 ${dup.productCode}: ${dup.count} l\u1EA7n \u2192 T\u1ED5ng SL: ${dup.mergedQty}
`;
            });
            if (index < mergeDetails.length - 1) {
              detailMessage += "\n";
            }
          });
          console.log(detailMessage);
          this.isLoading.set(false);
          yield this.showDuplicateMergeDialog(totalDuplicatesFound, mergeDetails);
          this.isLoading.set(true);
        } else {
          console.log("\u2705 Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m tr\xF9ng l\u1EB7p");
        }
        yield this.DoImportKhachhangCu(processedOrders);
      } catch (error) {
        console.error("Error importing confirmed orders:", error);
        this._snackBar.open(`L\u1ED7i khi nh\u1EADp \u0111\u01A1n h\xE0ng: ${error.message}`, "", {
          duration: 5e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  DoFindKhachhang(event, index) {
    return __async(this, null, function* () {
      const value = event.target.value;
      if (!value) {
        this.FilterKhachhang[index] = this.ListKhachhang;
        return;
      }
      console.log(this.ListKhachhang);
      this.FilterKhachhang[index] = this.ListKhachhang.filter((v) => v?.subtitle?.includes(removeVietnameseAccents(value)));
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
  /**
   * Xử lý hủy đơn hàng
   * Sử dụng CancelOrderService để mở dialog và xử lý toàn bộ flow
   */
  handleCancelOrder(order) {
    return __async(this, null, function* () {
      const success = yield this.cancelOrderService.cancelDonhang(order);
      if (success) {
        yield this.LoadData();
      }
    });
  }
  /**
   * Lấy label hiển thị cho status
   */
  getStatusLabel(status) {
    const labels = {
      "choxuly": "Ch\u1EDD x\u1EED l\xFD",
      "dangxuly": "\u0110ang x\u1EED l\xFD",
      "hoanthanh": "Ho\xE0n th\xE0nh",
      "huy": "\u0110\xE3 h\u1EE7y",
      "dahuy": "\u0110\xE3 h\u1EE7y"
    };
    return labels[status] || status;
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
  static \u0275fac = function ListDonhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListDonhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListDonhangComponent, selectors: [["app-listdonhang"]], viewQuery: function ListDonhangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
      \u0275\u0275viewQuery(_c1, 5);
      \u0275\u0275viewQuery(_c2, 5);
      \u0275\u0275viewQuery(_c3, 5);
      \u0275\u0275viewQuery(_c4, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.dialogImportExcelCu = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.confirmDongboDialog = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.confirmDuplicateDialog = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.duplicateMergeDialog = _t.first);
    }
  }, decls: 90, vars: 38, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["dialogImportExcelCu", ""], ["DeleteDialog", ""], ["ConfirmDongboDialog", ""], ["ConfirmDuplicateDialog", ""], ["DuplicateMergeDialog", ""], ["menuTrigger", "matMenuTrigger"], ["globalDatePicker", ""], ["orderDatePicker", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "flex-wrap", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "text-blue-500", "animate-spin"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "btn-primary", 3, "click", "disabled"], [1, "whitespace-nowrap"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["multiple", "", "type", "file", 1, "hidden", 3, "change"], [1, "flex", "flex-row", "space-x-2", "items-center", "whitespace-nowrap"], [1, "p-2", "rounded-lg", "bg-slate-200", "cursor-pointer", "hover:bg-slate-300", "transition-colors", 3, "click"], ["matTooltip", "Click \u0111\u1EC3 l\u1ECDc \u0111\u01A1n \u0111\xE3 giao", 1, "p-2", "rounded-lg", "text-white", "bg-blue-600", "cursor-pointer", "hover:bg-blue-700", "transition-colors", 3, "click"], ["matTooltip", "Click \u0111\u1EC3 l\u1ECDc \u0111\u01A1n ch\u01B0a giao", 1, "p-2", "rounded-lg", "text-white", "bg-yellow-600", "cursor-pointer", "hover:bg-yellow-700", "transition-colors", 3, "click"], ["mat-icon-button", "", "color", "primary", "matTooltip", "\u0110\u1ED3ng b\u1ED9 gi\xE1 t\u1EEB b\u1EA3ng gi\xE1 cho t\u1EA5t c\u1EA3 \u0111\u01A1n h\xE0ng", 3, "click", "disabled"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "disabled", "click", 4, "ngIf"], [1, "w-full", "flex", "lg:flex-row", "flex-col", "items-center", "gap-2"], [3, "ngModelChange", "change", "ngModel", "ngModelOptions", "disabled"], ["value", "all", 3, "disabled"], ["value", "khachsi", 3, "disabled"], ["value", "khachle", 3, "disabled"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Nh\u1EA5n \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng", 1, "!h-12", 3, "click", "disabled"], [1, "animate-spin"], [1, "w-full", "overflow-auto", "relative"], [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-gray-50", "rounded-lg"], [1, "absolute", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-50", "rounded-lg"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["mat-menu-item", "", 3, "click"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click", "disabled"], [1, "!text-6xl", "!w-24", "!h-24", "text-gray-400", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-4"], [1, "text-blue-600"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "ml-2"], [1, "flex", "flex-col", "items-center", "space-y-3", "p-6", "bg-white", "rounded-lg", "shadow-lg"], ["diameter", "40", "color", "primary"], [1, "text-sm", "text-gray-600", "font-medium"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "flex", "items-center", "gap-2"], [1, "max-w-40", "line-clamp-4", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], [1, "flex", "items-center", "gap-2", 3, "click"], ["mat-icon-button", "", "color", "warn", 1, "text-red-600", 3, "click", "disabled", "matTooltip"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], ["mat-dialog-title", "", 1, "flex", "items-center", "justify-between"], [1, "text-sm", "font-normal", "text-gray-600"], [1, "mat-typography"], [1, "w-[90vw]", "h-full", "flex", "flex-col"], [1, "border-b", "p-4", "bg-gray-50"], [1, "flex", "flex-wrap", "gap-4", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "min-w-[200px]"], ["matInput", "", 3, "dateChange", "matDatepicker"], ["mat-stroked-button", "", "color", "accent", 3, "click"], ["mat-flat-button", "", "color", "accent", "matTooltip", "T\u1EF1 \u0111\u1ED9ng ch\u1ECDn kh\xE1ch h\xE0ng d\u1EF1a tr\xEAn t\xEAn file", 3, "click"], [1, "flex-1", "overflow-auto", "p-4"], [1, "grid", "gap-4"], [1, "text-center", "py-8"], [1, "border-t", "p-4", 3, "align"], [1, "flex", "flex-col", "w-full", "gap-3"], [1, "grid", "grid-cols-1", "md:grid-cols-3", "gap-4", "text-sm"], [1, "text-center", "p-2", "bg-blue-50", "rounded"], [1, "font-semibold", "text-blue-600"], [1, "text-gray-600"], [1, "text-center", "p-2", "bg-green-50", "rounded"], [1, "font-semibold", "text-green-600"], [1, "text-center", "p-2", "bg-purple-50", "rounded"], [1, "font-semibold", "text-purple-600"], [1, "flex", "items-center", "justify-between"], [1, "text-sm", "text-gray-600"], [1, "flex", "gap-2"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [1, "animate-spin", "mr-2"], [1, "border", "rounded-lg", "p-4", 3, "ngClass"], [1, "flex", "items-center", "justify-between", "mb-3"], [1, "flex", "items-center", "gap-3"], [3, "change", "checked"], [1, "font-semibold", "text-lg"], [1, "text-green-600", "font-semibold"], [1, "text-xs", "text-blue-600", "mt-1"], ["mat-icon-button", "", "matTooltip", "Xem chi ti\u1EBFt s\u1EA3n ph\u1EA9m", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a \u0111\u01A1n h\xE0ng n\xE0y", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4", "mb-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], [3, "selectionChange", "value"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm ki\u1EBFm kh\xE1ch h\xE0ng", 3, "input"], [1, "overflow-y-auto", "max-h-44"], [1, "!whitespace-normal", "!h-auto", "!py-2", 3, "value"], [1, "flex", "items-center", "gap-1"], ["matInput", "", 3, "dateChange", "matDatepicker", "ngModel"], [1, "mt-4", "border-t", "pt-4"], [1, "bg-gray-50", "rounded", "p-3", "mt-4"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-4", "text-sm"], [1, "font-medium"], [1, "font-medium", "text-blue-600"], [1, "font-medium", "text-green-600"], [1, "mt-2", "pt-2", "border-t", "border-gray-200"], [1, "flex", "flex-col"], [1, "text-sm", "text-gray-500"], [1, "text-xs"], [1, "text-green-600", "!text-sm"], [1, "text-green-600", "text-xs"], [1, "font-medium", "text-gray-800", "mb-3"], [1, "overflow-x-auto"], [1, "min-w-full", "text-sm"], [1, "bg-gray-100"], [1, "px-3", "py-2", "text-left", "font-medium", "text-gray-700"], [1, "divide-y", "divide-gray-200"], [1, "hover:bg-gray-50"], [1, "bg-gray-50"], [1, "font-semibold"], ["colspan", "4", 1, "px-3", "py-2", "text-right"], [1, "px-3", "py-2", "text-blue-600"], [1, "px-3", "py-2"], [1, "px-3", "py-2", "font-mono", "text-xs"], [1, "px-3", "py-2", "font-semibold", "text-blue-600"], ["colspan", "7", 1, "px-3", "py-4", "text-center", "text-gray-500"], [1, "text-sm"], [1, "text-gray-500", "text-lg", "mb-2"], [1, "text-gray-400"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-dialog-title", "", 1, "flex", "items-center", "space-x-2"], ["color", "primary"], [1, "font-semibold", "text-xl"], [1, "flex", "flex-col", "space-y-4", "py-4"], [1, "flex", "items-start", "space-x-3", "p-4", "bg-blue-50", "rounded-lg", "border-l-4", "border-blue-400"], [1, "text-blue-600", "mt-1"], [1, "flex-1"], [1, "font-semibold", "text-blue-800", "mb-2"], [1, "text-sm", "text-blue-700"], [1, "space-y-3"], [1, "font-semibold", "text-gray-800"], [1, "space-y-2", "text-sm", "text-gray-700"], [1, "flex", "items-start", "space-x-2"], [1, "text-green-600", "text-base", "mt-0.5"], [1, "flex", "items-start", "space-x-3", "p-4", "bg-amber-50", "rounded-lg", "border-l-4", "border-amber-400"], [1, "text-amber-600", "mt-1"], [1, "font-semibold", "text-amber-800", "mb-2"], [1, "text-sm", "text-amber-700"], ["align", "end", 1, "border-t", "px-6", "py-4"], ["mat-button", "", "mat-dialog-close", "false", 1, "mr-2"], [1, "mr-1"], ["color", "warn"], [1, "flex", "items-start", "space-x-3", "p-4", "bg-yellow-50", "rounded-lg", "border-l-4", "border-yellow-400"], [1, "text-yellow-600", "mt-1"], [1, "font-semibold", "text-yellow-800", "mb-2"], [1, "text-sm", "text-yellow-700", 3, "innerHTML"], ["class", "space-y-3", 4, "ngIf"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-3"], [1, "flex", "items-start", "space-x-3", "p-3", "bg-green-50", "rounded-lg", "border", "border-green-200"], [1, "text-green-600", "mt-1"], [1, "font-medium", "text-green-800"], [1, "text-sm", "text-green-700"], [1, "flex", "items-start", "space-x-3", "p-3", "bg-red-50", "rounded-lg", "border", "border-red-200"], [1, "text-red-600", "mt-1"], [1, "font-medium", "text-red-800"], [1, "text-sm", "text-red-700"], ["mat-button", "", "mat-dialog-close", "skip", 1, "mr-2"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "proceed"], [1, "max-h-60", "overflow-y-auto", "border", "rounded-lg"], ["class", "p-3 border-b last:border-b-0 bg-gray-50", 4, "ngFor", "ngForOf"], [1, "p-3", "border-b", "last:border-b-0", "bg-gray-50"], [1, "font-semibold", "text-sm", "text-gray-600"], [1, "font-medium", "text-gray-800"], ["mat-dialog-title", "", 1, "flex", "items-center", "space-x-2", "bg-blue-50", "p-4", "rounded-t-lg"], [1, "font-semibold", "text-xl", "text-blue-800"], [1, "flex", "flex-col", "space-y-4", "py-4", "px-2"], [1, "flex", "items-center", "space-x-3", "p-4", "bg-green-50", "rounded-lg", "border-l-4", "border-green-500"], [1, "text-green-600", "text-3xl"], [1, "font-bold", "text-green-800", "text-lg"], [1, "text-sm", "text-green-700", "mt-1"], [1, "font-bold", "text-lg"], [1, "flex", "items-start", "space-x-2", "p-3", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "text-blue-600", "mt-0.5", "text-sm"], [1, "text-sm", "text-blue-800"], ["align", "end", 1, "border-t", "px-6", "py-4", "bg-gray-50"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "", 1, "px-6"], [1, "font-semibold", "text-gray-800", "flex", "items-center", "space-x-2"], [1, "max-h-96", "overflow-y-auto", "border", "rounded-lg", "bg-white"], ["class", "border-b last:border-b-0", 4, "ngFor", "ngForOf"], [1, "border-b", "last:border-b-0"], [1, "bg-gradient-to-r", "from-blue-50", "to-blue-100", "p-3", "sticky", "top-0", "z-10"], [1, "flex", "items-center", "space-x-2"], [1, "bg-blue-600", "text-white", "rounded-full", "w-6", "h-6", "flex", "items-center", "justify-center", "text-sm", "font-bold"], [1, "font-bold", "text-blue-800"], [1, "ml-auto", "bg-blue-600", "text-white", "px-3", "py-1", "rounded-full", "text-xs", "font-semibold"], [1, "divide-y", "divide-gray-100"], ["class", "p-3 hover:bg-gray-50 transition-colors", 4, "ngFor", "ngForOf"], [1, "p-3", "hover:bg-gray-50", "transition-colors"], [1, "flex", "items-center", "space-x-3"], [1, "flex-shrink-0"], [1, "w-10", "h-10", "rounded-lg", "bg-orange-100", "flex", "items-center", "justify-center"], [1, "text-orange-600"], [1, "flex-1", "min-w-0"], [1, "font-mono", "text-sm", "font-bold", "text-gray-800"], [1, "px-2", "py-0.5", "bg-red-100", "text-red-700", "rounded-full", "text-xs", "font-semibold"], [1, "mt-1", "flex", "items-center", "space-x-2", "text-sm"], [1, "flex", "items-center", "space-x-1", "text-gray-500"], [1, "text-green-600", "text-sm"], [1, "flex", "items-center", "space-x-1", "text-green-600"]], template: function ListDonhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 13)(1, "mat-drawer", 14, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 15)(5, "div", 16)(6, "div", 17)(7, "div", 18)(8, "input", 19);
      \u0275\u0275listener("keyup", function ListDonhangComponent_Template_input_keyup_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 20);
      \u0275\u0275template(10, ListDonhangComponent_Conditional_10_Template, 2, 0, "mat-icon", 21)(11, ListDonhangComponent_Conditional_11_Template, 2, 0, "span", 22);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 23);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 24);
      \u0275\u0275text(16, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "button", 25)(18, "mat-icon");
      \u0275\u0275text(19, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "mat-menu", null, 1)(22, "div", 26)(23, "mat-form-field", 27)(24, "input", 28);
      \u0275\u0275listener("input", function ListDonhangComponent_Template_input_input_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListDonhangComponent_Template_input_click_24_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-icon", 29);
      \u0275\u0275text(26, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 30);
      \u0275\u0275repeaterCreate(28, ListDonhangComponent_For_29_Template, 5, 2, "button", 31, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "button", 32);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_30_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r5 = \u0275\u0275reference(34);
        return \u0275\u0275resetView(uploadfile_r5.click());
      });
      \u0275\u0275elementStart(31, "mat-icon");
      \u0275\u0275text(32, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "input", 33, 2);
      \u0275\u0275listener("change", function ListDonhangComponent_Template_input_change_33_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 34)(36, "span", 35);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_span_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.resetStatusFilter());
      });
      \u0275\u0275text(37);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "span", 36);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_span_click_38_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterDagiao());
      });
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "span", 37);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_span_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.filterChuagiao());
      });
      \u0275\u0275text(41);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "button", 38);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_42_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.DongboVat());
      });
      \u0275\u0275elementStart(43, "mat-icon");
      \u0275\u0275text(44, "currency_exchange");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(45, ListDonhangComponent_button_45_Template, 5, 2, "button", 39);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(46, "div", 40)(47, "mat-button-toggle-group", 41);
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_mat_button_toggle_group_ngModelChange_47_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function ListDonhangComponent_Template_mat_button_toggle_group_change_47_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTypeChange($event.value));
      });
      \u0275\u0275elementStart(48, "mat-button-toggle", 42);
      \u0275\u0275text(49, " All ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "mat-button-toggle", 43);
      \u0275\u0275text(51, " S\u1EC9 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "mat-button-toggle", 44);
      \u0275\u0275text(53, " L\u1EBB ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "mat-form-field", 45)(55, "mat-label");
      \u0275\u0275text(56, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "input", 46);
      \u0275\u0275listener("dateChange", function ListDonhangComponent_Template_input_dateChange_57_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_input_ngModelChange_57_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(58, "mat-datepicker-toggle", 47)(59, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "mat-form-field", 45)(62, "mat-label");
      \u0275\u0275text(63, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "input", 46);
      \u0275\u0275listener("dateChange", function ListDonhangComponent_Template_input_dateChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListDonhangComponent_Template_input_ngModelChange_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(65, "mat-datepicker-toggle", 47)(66, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "button", 48);
      \u0275\u0275listener("click", function ListDonhangComponent_Template_button_click_68_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchData());
      });
      \u0275\u0275template(69, ListDonhangComponent_Conditional_69_Template, 2, 0, "mat-icon", 49)(70, ListDonhangComponent_Conditional_70_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "div", 50);
      \u0275\u0275template(72, ListDonhangComponent_Conditional_72_Template, 17, 0, "div", 51)(73, ListDonhangComponent_Conditional_73_Template, 5, 0, "div", 52);
      \u0275\u0275elementStart(74, "table", 53);
      \u0275\u0275repeaterCreate(75, ListDonhangComponent_For_76_Template, 3, 1, "ng-container", 54, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(77, ListDonhangComponent_tr_77_Template, 1, 0, "tr", 55)(78, ListDonhangComponent_tr_78_Template, 1, 3, "tr", 56)(79, ListDonhangComponent_tr_79_Template, 3, 0, "tr", 57);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(80, ListDonhangComponent_ng_template_80_Template, 61, 21, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(82, ListDonhangComponent_ng_template_82_Template, 11, 0, "ng-template", null, 6, \u0275\u0275templateRefExtractor)(84, ListDonhangComponent_ng_template_84_Template, 64, 1, "ng-template", null, 7, \u0275\u0275templateRefExtractor)(86, ListDonhangComponent_ng_template_86_Template, 44, 2, "ng-template", null, 8, \u0275\u0275templateRefExtractor)(88, ListDonhangComponent_ng_template_88_Template, 34, 3, "ng-template", null, 9, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r36 = \u0275\u0275reference(21);
      const pickerBatdau_r37 = \u0275\u0275reference(60);
      const pickerKetthuc_r38 = \u0275\u0275reference(67);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(9);
      \u0275\u0275conditional(ctx.isLoading() ? 10 : 11);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(5);
      \u0275\u0275property("matMenuTriggerFor", menu_r36);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.Listdonhang().length, " \u0110\u01A1n H\xE0ng ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" \u0110\xE3 Giao ", ctx.countDagiao(), " ");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1(" Ch\u01B0a Giao ", ctx.countChuagiao(), " ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.Listdonhang().length === 0);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Type);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(35, _c5))("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r37);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(36, _c5));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r37);
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r38);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(37, _c5));
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r38);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 69 : 70);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isLoading() && ctx.Listdonhang().length === 0 ? 72 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 73 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
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
    MatButtonToggleModule,
    MatButtonToggleGroup,
    MatButtonToggle,
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
    // SharepaginationComponent,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatCheckboxModule,
    MatCheckbox
  ], styles: ["\n\n.animate-spin[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_spin 1s linear infinite;\n}\n@keyframes _ngcontent-%COMP%_spin {\n  from {\n    transform: rotate(0deg);\n  }\n  to {\n    transform: rotate(360deg);\n  }\n}\n.loading-overlay[_ngcontent-%COMP%] {\n  transition: opacity 0.3s ease-in-out;\n}\n.mat-form-field.mat-disabled[_ngcontent-%COMP%]   .mat-form-field-underline[_ngcontent-%COMP%] {\n  background-color: rgba(0, 0, 0, 0.12);\n}\n.mat-table[_ngcontent-%COMP%] {\n  transition: opacity 0.2s ease-in-out;\n}\n.mat-table.loading[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  pointer-events: none;\n}\n/*# sourceMappingURL=listdonhang.component.css.map */"], changeDetection: 0 });
};
__decorate([
  Debounce(100)
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
  Debounce(100)
], ListDonhangComponent.prototype, "DoFindKhachhang", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListDonhangComponent, { className: "ListDonhangComponent", filePath: "src/app/admin/donhang/listdonhang/listdonhang.component.ts", lineNumber: 74 });
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
//# sourceMappingURL=chunk-FDXBKSRV.mjs.map
