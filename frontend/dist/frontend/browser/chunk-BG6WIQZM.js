import {
  PermissionService
} from "./chunk-FO6HD5GR.js";
import {
  SearchfilterComponent
} from "./chunk-X7ROAIMK.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import {
  GoogleSheetService
} from "./chunk-CB53OP7A.js";
import {
  readExcelFile,
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
  ConvertDriveData
} from "./chunk-657A73EG.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
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
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
} from "./chunk-WD36GM3Q.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import {
  CommonModule,
  DatePipe,
  NgIf
} from "./chunk-E6DSVUBK.js";
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
} from "./chunk-IHZ7YO24.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/permission/listpermission/listpermission.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListPermissionComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ListPermissionComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(85);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 18);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListPermissionComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 50);
    \u0275\u0275listener("click", function ListPermissionComponent_For_32_Template_button_click_0_listener($event) {
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
function ListPermissionComponent_For_50_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 51)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.ColumnName[column_r9]);
  }
}
function ListPermissionComponent_For_50_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListPermissionComponent_For_50_Conditional_1_th_0_Template, 3, 1, "th", 54);
  }
}
function ListPermissionComponent_For_50_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 52)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 57);
    \u0275\u0275listener("OutFilter", function ListPermissionComponent_For_50_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r9 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r9], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listpermission())("fieldsearch", column_r9)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r9));
  }
}
function ListPermissionComponent_For_50_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListPermissionComponent_For_50_Conditional_2_th_0_Template, 4, 6, "th", 55);
  }
}
function ListPermissionComponent_For_50_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 62);
    \u0275\u0275listener("click", function ListPermissionComponent_For_50_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const row_r12 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r12));
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
function ListPermissionComponent_For_50_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r13 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r13 + 1, " ");
  }
}
function ListPermissionComponent_For_50_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r9], "dd/MM/yyyy"), " ");
  }
}
function ListPermissionComponent_For_50_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r12[column_r9], "% ");
  }
}
function ListPermissionComponent_For_50_td_3_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 63);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPermissionComponent_For_50_td_3_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 64);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPermissionComponent_For_50_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275template(1, ListPermissionComponent_For_50_td_3_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 63)(2, ListPermissionComponent_For_50_td_3_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 64);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r12[column_r9] ? 1 : 2);
  }
}
function ListPermissionComponent_For_50_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = \u0275\u0275nextContext().$implicit;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r12[column_r9], "dd/MM/yyyy"), " ");
  }
}
function ListPermissionComponent_For_50_td_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 61);
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
function ListPermissionComponent_For_50_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 58);
    \u0275\u0275template(1, ListPermissionComponent_For_50_td_3_Case_1_Template, 2, 1, "span", 59)(2, ListPermissionComponent_For_50_td_3_Case_2_Template, 2, 1, "span", 60)(3, ListPermissionComponent_For_50_td_3_Case_3_Template, 3, 4, "span", 61)(4, ListPermissionComponent_For_50_td_3_Case_4_Template, 2, 1, "span", 61)(5, ListPermissionComponent_For_50_td_3_Case_5_Template, 3, 1, "span", 61)(6, ListPermissionComponent_For_50_td_3_Case_6_Template, 3, 4, "span", 61)(7, ListPermissionComponent_For_50_td_3_Case_7_Template, 2, 1, "span", 61);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const column_r9 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r9) === "codeId" ? 1 : tmp_20_0 === "stt" ? 2 : tmp_20_0 === "createdAt" ? 3 : tmp_20_0 === "haohut" ? 4 : tmp_20_0 === "isActive" ? 5 : tmp_20_0 === "updatedAt" ? 6 : 7);
  }
}
function ListPermissionComponent_For_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 34);
    \u0275\u0275template(1, ListPermissionComponent_For_50_Conditional_1_Template, 1, 0, "th", 51)(2, ListPermissionComponent_For_50_Conditional_2_Template, 1, 0, "th", 52)(3, ListPermissionComponent_For_50_td_3_Template, 8, 1, "td", 53);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r9 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r9);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r9 == "stt" ? 1 : 2);
  }
}
function ListPermissionComponent_tr_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function ListPermissionComponent_tr_52_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 66);
    \u0275\u0275listener("click", function ListPermissionComponent_tr_52_Template_tr_click_0_listener() {
      const row_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r15));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r2.CheckItemInEdit(row_r15) ? "!bg-blue-50" : "", "");
  }
}
function ListPermissionComponent_tr_53_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 67)(1, "td", 68);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListPermissionComponent_ng_template_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 69)(2, "div", 70);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 71)(7, "button", 72);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 73);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListPermissionComponent_ng_template_86_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 74)(1, "div", 75)(2, "mat-form-field", 22)(3, "mat-label");
    \u0275\u0275text(4, "IdSheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function ListPermissionComponent_ng_template_86_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.IdSheet, $event) || (ctx_r2.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 22)(7, "mat-label");
    \u0275\u0275text(8, "SheetName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 77);
    \u0275\u0275twoWayListener("ngModelChange", function ListPermissionComponent_ng_template_86_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r17);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.SheetName, $event) || (ctx_r2.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(10, "div", 78);
    \u0275\u0275elementStart(11, "div", 79)(12, "button", 72);
    \u0275\u0275text(13, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 73);
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
var ListPermissionComponent = class _ListPermissionComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    codeId: "Code",
    name: "Ti\xEAu \u0110\u1EC1",
    group: "Nh\xF3m",
    description: "M\xF4 T\u1EA3",
    status: "Tr\u1EA1ng Th\xE1i",
    order: "Th\u1EE9 T\u1EF1",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PermissionColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  _PermissionService = inject(PermissionService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  Listpermission = this._PermissionService.ListPermission;
  page = this._PermissionService.page;
  pageCount = this._PermissionService.pageCount;
  total = this._PermissionService.total;
  pageSize = this._PermissionService.pageSize;
  permissionId = this._PermissionService.permissionId;
  dataSource = new MatTableDataSource([]);
  EditList = [];
  isSearch = signal(false);
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listpermission();
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
      yield this._PermissionService.getAllPermission(this.pageSize(), true);
      this.displayedColumns = Object.keys(this.ColumnName);
      this.dataSource = new MatTableDataSource(this.Listpermission());
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("PermissionColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      yield this._PermissionService.getUpdatedCodeIds();
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
    this.dataSource.filteredData = this.Listpermission().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listpermission();
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listpermission().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
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
    localStorage.setItem("PermissionColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/permission", "new"]);
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
      this._PermissionService.DeletePermission(item);
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
    this._PermissionService.setPermissionId(item.id);
    this._router.navigate(["admin/permission", item.id]);
  }
  OpenLoadDrive(template) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
      }
    });
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
      const existingPermission = this._PermissionService.ListPermission();
      const existingMasp = existingPermission.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingPermission.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._PermissionService.updatePermission(updatedItem);
        } else {
          yield this._PermissionService.CreatePermission(v);
        }
      })));
      yield Promise.all(existingPermission.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._PermissionService.updatePermission(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
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
    if (size > this.total()) {
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.total()}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      size = this.total();
    }
    this._PermissionService.page.set(1);
    this._PermissionService.getAllPermission(size, true);
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.page() > 1) {
      this._PermissionService.page.set(this.page() - 1);
      this._PermissionService.getAllPermission(this.pageSize(), true);
    }
  }
  onNextPage() {
    if (this.page() < this.pageCount()) {
      this._PermissionService.page.set(this.page() + 1);
      this._PermissionService.getAllPermission(this.pageSize(), true);
    }
  }
  static \u0275fac = function ListPermissionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPermissionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPermissionComponent, selectors: [["app-listpermission"]], viewQuery: function ListPermissionComponent_Query(rf, ctx) {
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
  }, decls: 88, vars: 19, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["LoadDriveDialog", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-4", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB drive", "color", "primary", "mat-icon-button", "", 3, "click"], ["mat-icon-button", "", "color", "primary", "matTooltip", "C\u1EADp Nh\u1EADt L\u1EA1i Code", 3, "click"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-menu-item", "", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 1, "border", 3, "click"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!w-screen", "!h-screen", "!max-h-screen", "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp IdSheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp SheetName", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "relative", "h-full", "w-full", "overflow-auto"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"]], template: function ListPermissionComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 7)(1, "mat-drawer", 8, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9)(5, "div", 10)(6, "div", 11)(7, "div", 12)(8, "div", 13)(9, "input", 14);
      \u0275\u0275listener("keyup", function ListPermissionComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 15)(11, "span", 16);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 17);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 18);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ListPermissionComponent_button_18_Template, 5, 0, "button", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 12)(20, "button", 20)(21, "mat-icon");
      \u0275\u0275text(22, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-menu", null, 1)(25, "div", 21)(26, "mat-form-field", 22)(27, "input", 23);
      \u0275\u0275listener("input", function ListPermissionComponent_Template_input_input_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListPermissionComponent_Template_input_click_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-icon", 24);
      \u0275\u0275text(29, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 25);
      \u0275\u0275repeaterCreate(31, ListPermissionComponent_For_32_Template, 5, 2, "button", 26, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "button", 27);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.Listpermission(), "permission"));
      });
      \u0275\u0275elementStart(34, "mat-icon");
      \u0275\u0275text(35, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "button", 28);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r7 = \u0275\u0275reference(40);
        return \u0275\u0275resetView(uploadfile_r7.click());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "input", 29, 2);
      \u0275\u0275listener("change", function ListPermissionComponent_Template_input_change_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "button", 30);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_41_listener() {
        \u0275\u0275restoreView(_r1);
        const LoadDriveDialog_r8 = \u0275\u0275reference(87);
        return \u0275\u0275resetView(ctx.OpenLoadDrive(LoadDriveDialog_r8));
      });
      \u0275\u0275elementStart(42, "mat-icon");
      \u0275\u0275text(43, "cloud_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(44, "button", 31);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.getUpdatedCodeIds());
      });
      \u0275\u0275elementStart(45, "mat-icon");
      \u0275\u0275text(46, "cached");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(47, "div", 32)(48, "table", 33);
      \u0275\u0275repeaterCreate(49, ListPermissionComponent_For_50_Template, 4, 2, "ng-container", 34, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(51, ListPermissionComponent_tr_51_Template, 1, 0, "tr", 35)(52, ListPermissionComponent_tr_52_Template, 1, 3, "tr", 36)(53, ListPermissionComponent_tr_53_Template, 3, 0, "tr", 37);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "div", 38)(55, "div", 39)(56, "span", 40);
      \u0275\u0275text(57, "\u0110ang Xem ");
      \u0275\u0275elementStart(58, "strong");
      \u0275\u0275text(59);
      \u0275\u0275elementEnd();
      \u0275\u0275text(60, " - ");
      \u0275\u0275elementStart(61, "strong");
      \u0275\u0275text(62);
      \u0275\u0275elementEnd();
      \u0275\u0275text(63);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 41)(65, "span", 42, 3);
      \u0275\u0275text(67);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "mat-menu", null, 4)(70, "div", 43);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_div_click_70_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(71, "span");
      \u0275\u0275text(72, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "mat-form-field", 44)(74, "input", 45);
      \u0275\u0275twoWayListener("ngModelChange", function ListPermissionComponent_Template_input_ngModelChange_74_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(75, "button", 46);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_75_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r16 = \u0275\u0275reference(66);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r16));
      });
      \u0275\u0275text(76, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(77, "div", 47)(78, "button", 48);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_78_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(79, "mat-icon");
      \u0275\u0275text(80, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(81, "button", 48);
      \u0275\u0275listener("click", function ListPermissionComponent_Template_button_click_81_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(82, "mat-icon");
      \u0275\u0275text(83, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(84, ListPermissionComponent_ng_template_84_Template, 11, 0, "ng-template", null, 5, \u0275\u0275templateRefExtractor)(86, ListPermissionComponent_ng_template_86_Template, 16, 6, "ng-template", null, 6, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r18 = \u0275\u0275reference(24);
      const menu1_r19 = \u0275\u0275reference(69);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r18);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(17);
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
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.total(), " m\u1EE5c, ", ctx.page(), "/", ctx.pageCount(), " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r19);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c1));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.pageCount());
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
  memoize()
], ListPermissionComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListPermissionComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPermissionComponent, { className: "ListPermissionComponent", filePath: "src/app/admin/permission/listpermission/listpermission.component.ts", lineNumber: 51 });
})();

export {
  ListPermissionComponent
};
//# sourceMappingURL=chunk-BG6WIQZM.js.map
