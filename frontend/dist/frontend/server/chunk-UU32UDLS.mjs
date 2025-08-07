import './polyfills.server.mjs';
import {
  KhachhangService
} from "./chunk-FOXQ7452.mjs";
import {
  SearchfilterComponent
} from "./chunk-UCGC4G46.mjs";
import {
  Debounce,
  memoize
} from "./chunk-2FMT7VQU.mjs";
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
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  ConvertDriveData
} from "./chunk-I23Q342N.mjs";
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
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
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
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  effect,
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
} from "./chunk-4EQURZBD.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/khachhang/listkhachhang/listkhachhang.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListKhachhangComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 44);
    \u0275\u0275listener("click", function ListKhachhangComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(75);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 17);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListKhachhangComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 45);
    \u0275\u0275listener("click", function ListKhachhangComponent_For_32_Template_button_click_0_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.toggleColumn(item_r6);
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
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.value);
  }
}
function ListKhachhangComponent_For_39_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 46)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.ColumnName[column_r7]);
  }
}
function ListKhachhangComponent_For_39_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListKhachhangComponent_For_39_Conditional_1_th_0_Template, 3, 1, "th", 49);
  }
}
function ListKhachhangComponent_For_39_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 47)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 52);
    \u0275\u0275listener("OutFilter", function ListKhachhangComponent_For_39_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listkhachhang())("fieldsearch", column_r7)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r7));
  }
}
function ListKhachhangComponent_For_39_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListKhachhangComponent_For_39_Conditional_2_th_0_Template, 4, 6, "th", 50);
  }
}
function ListKhachhangComponent_For_39_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275listener("click", function ListKhachhangComponent_For_39_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const row_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r11 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r11 + 1, " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r7], "dd/MM/yyyy"), " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7] == null ? null : row_r10[column_r7].mabanggia, " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], "% ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 58);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListKhachhangComponent_For_39_td_3_Case_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 59);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListKhachhangComponent_For_39_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275template(1, ListKhachhangComponent_For_39_td_3_Case_6_Conditional_1_Template, 2, 0, "mat-icon", 58)(2, ListKhachhangComponent_For_39_td_3_Case_6_Conditional_2_Template, 2, 0, "mat-icon", 59);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r10[column_r7] ? 1 : 2);
  }
}
function ListKhachhangComponent_For_39_td_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r7], "dd/MM/yyyy"), " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], " ");
  }
}
function ListKhachhangComponent_For_39_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275template(1, ListKhachhangComponent_For_39_td_3_Case_1_Template, 2, 1, "span", 54)(2, ListKhachhangComponent_For_39_td_3_Case_2_Template, 2, 1, "span", 55)(3, ListKhachhangComponent_For_39_td_3_Case_3_Template, 3, 4, "span", 56)(4, ListKhachhangComponent_For_39_td_3_Case_4_Template, 2, 1, "span", 56)(5, ListKhachhangComponent_For_39_td_3_Case_5_Template, 2, 1, "span", 56)(6, ListKhachhangComponent_For_39_td_3_Case_6_Template, 3, 1, "span", 56)(7, ListKhachhangComponent_For_39_td_3_Case_7_Template, 3, 4, "span", 56)(8, ListKhachhangComponent_For_39_td_3_Case_8_Template, 2, 1, "span", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_19_0;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = column_r7) === "makh" ? 1 : tmp_19_0 === "stt" ? 2 : tmp_19_0 === "createdAt" ? 3 : tmp_19_0 === "banggia" ? 4 : tmp_19_0 === "haohut" ? 5 : tmp_19_0 === "isActive" ? 6 : tmp_19_0 === "updatedAt" ? 7 : 8);
  }
}
function ListKhachhangComponent_For_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 29);
    \u0275\u0275template(1, ListKhachhangComponent_For_39_Conditional_1_Template, 1, 0, "th", 46)(2, ListKhachhangComponent_For_39_Conditional_2_Template, 1, 0, "th", 47)(3, ListKhachhangComponent_For_39_td_3_Template, 9, 1, "td", 48);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r7);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r7 == "stt" ? 1 : 2);
  }
}
function ListKhachhangComponent_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
}
function ListKhachhangComponent_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 61);
    \u0275\u0275listener("click", function ListKhachhangComponent_tr_41_Template_tr_click_0_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r13));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r2.CheckItemInEdit(row_r13) ? "!bg-blue-50" : "", "");
  }
}
function ListKhachhangComponent_tr_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 62)(1, "td", 63);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListKhachhangComponent_ng_template_74_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 64)(2, "div", 65);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 66)(7, "button", 67);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 68);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListKhachhangComponent_ng_template_76_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 69)(1, "div", 70)(2, "mat-form-field", 21)(3, "mat-label");
    \u0275\u0275text(4, "IdSheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 71);
    \u0275\u0275twoWayListener("ngModelChange", function ListKhachhangComponent_ng_template_76_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.IdSheet, $event) || (ctx_r2.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 21)(7, "mat-label");
    \u0275\u0275text(8, "SheetName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 72);
    \u0275\u0275twoWayListener("ngModelChange", function ListKhachhangComponent_ng_template_76_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r15);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.SheetName, $event) || (ctx_r2.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(10, "div", 73);
    \u0275\u0275elementStart(11, "div", 74)(12, "button", 67);
    \u0275\u0275text(13, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 68);
    \u0275\u0275text(15, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.IdSheet);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.SheetName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c1));
  }
}
var ListKhachhangComponent = class _ListKhachhangComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    makh: "M\xE3 KH",
    name: "T\xEAn KH",
    banggia: "B\u1EA3ng Gi\xE1",
    diachi: "\u0110\u1ECBa Ch\u1EC9",
    quan: "Qu\u1EADn",
    email: "Email",
    sdt: "SDT",
    mst: "MST",
    gionhanhang: "Gi\u1EDD Nh\u1EADn H\xE0ng",
    loaikh: "Lo\u1EA1i KH",
    ghichu: "Ghi Ch\xFA",
    isActive: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o"
  };
  FilterColumns = JSON.parse(localStorage.getItem("KhachhangColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  _KhachhangService = inject(KhachhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  Listkhachhang = this._KhachhangService.ListKhachhang;
  page = this._KhachhangService.page;
  totalPages = this._KhachhangService.totalPages;
  total = this._KhachhangService.total;
  pageSize = this._KhachhangService.pageSize;
  khachhangId = this._KhachhangService.khachhangId;
  dataSource = new MatTableDataSource([]);
  EditList = [];
  isSearch = signal(false);
  searchParam = {};
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listkhachhang();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this._KhachhangService.listenKhachhangUpdates();
      yield this._KhachhangService.getAllKhachhang(this.searchParam);
      this.displayedColumns = Object.keys(this.ColumnName);
      this.dataSource = new MatTableDataSource(this.Listkhachhang());
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("KhachhangColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    if (!filterValue) {
      this.searchParam = {};
      this._KhachhangService.getKhachhangBy(this.searchParam);
      return;
    }
    this.searchParam.subtitle = filterValue.trim().toLowerCase();
    this._KhachhangService.getKhachhangBy(this.searchParam);
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      yield this._KhachhangService.getUpdatedCodeIds();
    });
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
    this.dataSource.filteredData = this.Listkhachhang().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listkhachhang();
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listkhachhang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  onOutFilter(event) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("KhachhangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/khachhang", "new"]);
  }
  openDeleteDialog(template) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }
  DeleteListItem() {
    this.EditList.forEach((item) => {
      this._KhachhangService.DeleteKhachhang(item);
    });
    this.EditList = [];
    this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
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
  goToDetail(item) {
    this.drawer.open();
    this._KhachhangService.setKhachhangId(item.id);
    this._router.navigate(["admin/khachhang", item.id]);
  }
  OpenLoadDrive(template) {
  }
  IdSheet = "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk";
  SheetName = "SPImport";
  ImportIteam = [];
  ImportColumnName = {};
  ImportdisplayedColumns = [];
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: this.IdSheet,
        SheetName: this.SheetName,
        ApiKey: environment.GSApiKey
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      this.ImportIteam = ConvertDriveData(result.values);
      this.ImportColumnName = Object.fromEntries(result.values[0].map((key, i) => [key, result.values[1][i]]));
      this.ImportdisplayedColumns = result.values[0];
    });
  }
  DoImportData(data) {
    return __async(this, null, function* () {
      const transformedData = data.map((v) => ({
        title: v.title?.trim() || "",
        masp: v.masp?.trim() || "",
        giagoc: Number(v.giagoc) || 0,
        dvt: v.dvt?.trim() || "",
        soluong: Number(v.soluong) || 0,
        soluongkho: Number(v.soluongkho) || 0,
        haohut: Number(v.haohut) || 0,
        ghichu: v.ghichu?.trim() || ""
      }));
      const uniqueData = Array.from(new Map(transformedData.map((item) => [item.masp, item])).values());
      const existingKhachhang = this._KhachhangService.ListKhachhang();
      const existingMasp = existingKhachhang.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingKhachhang.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._KhachhangService.updateKhachhang(updatedItem);
        } else {
          yield this._KhachhangService.CreateKhachhang(v);
        }
      })));
      yield Promise.all(existingKhachhang.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._KhachhangService.updateKhachhang(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
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
    const dulieu = data.map((v) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu
    }));
    writeExcelFile(dulieu, title);
  }
  trackByFn(index, item) {
    return item.id;
  }
  onPageSizeChange(size, menuHienthi) {
    return __async(this, null, function* () {
      if (size > this.total()) {
        this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.total()}`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        size = this.total();
        this.searchParam.pageSize = size;
      }
      this._KhachhangService.page.set(1);
      this._KhachhangService.pageSize.set(size);
      yield this._KhachhangService.getAllKhachhang(this.searchParam, true);
      menuHienthi.closeMenu();
    });
  }
  onPreviousPage() {
    return __async(this, null, function* () {
      if (this.page() > 1) {
        this._KhachhangService.page.set(this.page() - 1);
        yield this._KhachhangService.getAllKhachhang(this.searchParam, true);
      }
    });
  }
  onNextPage() {
    return __async(this, null, function* () {
      if (this.page() < this.totalPages()) {
        this._KhachhangService.page.set(this.page() + 1);
        yield this._KhachhangService.getAllKhachhang(this.searchParam, true);
      }
    });
  }
  static \u0275fac = function ListKhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListKhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListKhachhangComponent, selectors: [["app-listkhachhang"]], viewQuery: function ListKhachhangComponent_Query(rf, ctx) {
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
  }, decls: 78, vars: 19, consts: [["drawer", ""], ["menu", "matMenu"], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["LoadDriveDialog", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["mat-icon-button", "", "color", "primary", "matTooltip", "C\u1EADp Nh\u1EADt L\u1EA1i Code", 3, "click"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-menu-item", "", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "flex", "text-center"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 1, "border", 3, "click"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!w-screen", "!h-screen", "!max-h-screen", "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp IdSheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp SheetName", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "relative", "h-full", "w-full", "overflow-auto"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"]], template: function ListKhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 6)(1, "mat-drawer", 7, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 8)(5, "div", 9)(6, "div", 10)(7, "div", 11)(8, "div", 12)(9, "input", 13);
      \u0275\u0275listener("keyup", function ListKhachhangComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 14)(11, "span", 15);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 16);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 17);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ListKhachhangComponent_button_18_Template, 5, 0, "button", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 11)(20, "button", 19)(21, "mat-icon");
      \u0275\u0275text(22, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-menu", null, 1)(25, "div", 20)(26, "mat-form-field", 21)(27, "input", 22);
      \u0275\u0275listener("input", function ListKhachhangComponent_Template_input_input_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListKhachhangComponent_Template_input_click_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-icon", 23);
      \u0275\u0275text(29, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 24);
      \u0275\u0275repeaterCreate(31, ListKhachhangComponent_For_32_Template, 5, 2, "button", 25, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "button", 26);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.getUpdatedCodeIds());
      });
      \u0275\u0275elementStart(34, "mat-icon");
      \u0275\u0275text(35, "cached");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(36, "div", 27)(37, "table", 28);
      \u0275\u0275repeaterCreate(38, ListKhachhangComponent_For_39_Template, 4, 2, "ng-container", 29, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(40, ListKhachhangComponent_tr_40_Template, 1, 0, "tr", 30)(41, ListKhachhangComponent_tr_41_Template, 1, 3, "tr", 31)(42, ListKhachhangComponent_tr_42_Template, 3, 0, "tr", 32);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "div", 33)(44, "div", 34)(45, "span", 35);
      \u0275\u0275text(46, "\u0110ang Xem ");
      \u0275\u0275elementStart(47, "strong");
      \u0275\u0275text(48);
      \u0275\u0275elementEnd();
      \u0275\u0275text(49, " - ");
      \u0275\u0275elementStart(50, "strong");
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275text(52);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "div", 36)(54, "span", 37, 2);
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "mat-menu", null, 3)(59, "div", 38);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_div_click_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(60, "mat-form-field", 39)(61, "mat-label");
      \u0275\u0275text(62, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(63, "input", 40);
      \u0275\u0275twoWayListener("ngModelChange", function ListKhachhangComponent_Template_input_ngModelChange_63_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "button", 41);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_64_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r14 = \u0275\u0275reference(55);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r14));
      });
      \u0275\u0275elementStart(65, "mat-icon");
      \u0275\u0275text(66, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(67, "div", 42)(68, "button", 43);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_68_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(69, "mat-icon");
      \u0275\u0275text(70, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(71, "button", 43);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_71_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(72, "mat-icon");
      \u0275\u0275text(73, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(74, ListKhachhangComponent_ng_template_74_Template, 11, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(76, ListKhachhangComponent_ng_template_76_Template, 16, 6, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r16 = \u0275\u0275reference(24);
      const menu1_r17 = \u0275\u0275reference(58);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r16);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(6);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.total(), " m\u1EE5c, ", ctx.page(), "/", ctx.totalPages(), " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r17);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.totalPages());
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
    NgIf,
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
    SearchfilterComponent
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  Debounce(500)
], ListKhachhangComponent.prototype, "applyFilter", null);
__decorate([
  memoize()
], ListKhachhangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListKhachhangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListKhachhangComponent, { className: "ListKhachhangComponent", filePath: "src/app/admin/khachhang/listkhachhang/listkhachhang.component.ts", lineNumber: 51 });
})();

export {
  ListKhachhangComponent
};
//# sourceMappingURL=chunk-UU32UDLS.mjs.map
