import './polyfills.server.mjs';
import {
  RoleService
} from "./chunk-J2QHQ3JF.mjs";
import {
  SearchfilterComponent
} from "./chunk-T2GSXKIR.mjs";
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
  MatTooltip,
  MatTooltipModule
} from "./chunk-G5Q3EA6K.mjs";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-AJSGP2QM.mjs";
import {
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
  MatLabel,
  MatPrefix,
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
  CommonModule,
  DatePipe,
  NgIf
} from "./chunk-WGGH2PUJ.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-ADMXANIA.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/role/listrole/listrole.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListRoleComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 35);
    \u0275\u0275listener("click", function ListRoleComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(61);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 16);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_0_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r7);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
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
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_1_Template_button_click_0_listener($event) {
      \u0275\u0275restoreView(_r9);
      const item_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(4);
      ctx_r2.toggleColumn(item_r8);
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
    const item_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r8.value);
  }
}
function ListRoleComponent_For_56_Conditional_1_th_0_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_0_Template, 5, 3, "button", 46)(1, ListRoleComponent_For_56_Conditional_1_th_0_For_16_Conditional_1_Template, 5, 2, "button", 47);
  }
  if (rf & 2) {
    const item_r8 = ctx.$implicit;
    \u0275\u0275conditional(item_r8.key == "stt" ? 0 : 1);
  }
}
function ListRoleComponent_For_56_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 36)(1, "button", 40)(2, "mat-icon");
    \u0275\u0275text(3, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-menu", null, 4)(6, "div", 41)(7, "mat-form-field", 42)(8, "input", 43);
    \u0275\u0275listener("input", function ListRoleComponent_For_56_Conditional_1_th_0_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListRoleComponent_For_56_Conditional_1_th_0_Template_input_click_8_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "mat-icon", 44);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "button", 26);
    \u0275\u0275listener("click", function ListRoleComponent_For_56_Conditional_1_th_0_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.updateDisplayedColumns());
    });
    \u0275\u0275elementStart(12, "mat-icon");
    \u0275\u0275text(13, "check_circle");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 45);
    \u0275\u0275repeaterCreate(15, ListRoleComponent_For_56_Conditional_1_th_0_For_16_Template, 2, 1, null, null, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(5);
    const ctx_r2 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
  }
}
function ListRoleComponent_For_56_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListRoleComponent_For_56_Conditional_1_th_0_Template, 17, 1, "th", 39);
  }
}
function ListRoleComponent_For_56_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 37)(1, "span", 51);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 52);
    \u0275\u0275listener("OutFilter", function ListRoleComponent_For_56_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r11);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r12 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r12], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listrole())("fieldsearch", column_r12)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.Listrole(), column_r12));
  }
}
function ListRoleComponent_For_56_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListRoleComponent_For_56_Conditional_2_th_0_Template, 4, 6, "th", 50);
  }
}
function ListRoleComponent_For_56_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 57);
    \u0275\u0275listener("click", function ListRoleComponent_For_56_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r13);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListRoleComponent_For_56_td_3_Case_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListRoleComponent_For_56_td_3_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r16 = \u0275\u0275nextContext(2).index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(idx_r16 + 1);
  }
}
function ListRoleComponent_For_56_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275listener("click", function ListRoleComponent_For_56_td_3_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r14 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r14));
    });
    \u0275\u0275template(1, ListRoleComponent_For_56_td_3_Case_2_Conditional_1_Template, 2, 0, "mat-icon")(2, ListRoleComponent_For_56_td_3_Case_2_Conditional_2_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.CheckSelect(row_r14) ? 1 : 2);
  }
}
function ListRoleComponent_For_56_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "dd/MM/yyyy"), " ");
  }
}
function ListRoleComponent_For_56_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r14[column_r12], "dd/MM/yyyy"), " ");
  }
}
function ListRoleComponent_For_56_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r14 = \u0275\u0275nextContext().$implicit;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r14[column_r12], " ");
  }
}
function ListRoleComponent_For_56_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 53);
    \u0275\u0275template(1, ListRoleComponent_For_56_td_3_Case_1_Template, 2, 1, "span", 54)(2, ListRoleComponent_For_56_td_3_Case_2_Template, 3, 1, "span", 55)(3, ListRoleComponent_For_56_td_3_Case_3_Template, 3, 4, "span", 56)(4, ListRoleComponent_For_56_td_3_Case_4_Template, 3, 4, "span", 56)(5, ListRoleComponent_For_56_td_3_Case_5_Template, 2, 1, "span", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const column_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = column_r12) === "name" ? 1 : tmp_17_0 === "stt" ? 2 : tmp_17_0 === "createdAt" ? 3 : tmp_17_0 === "updatedAt" ? 4 : 5);
  }
}
function ListRoleComponent_For_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 31);
    \u0275\u0275template(1, ListRoleComponent_For_56_Conditional_1_Template, 1, 0, "th", 36)(2, ListRoleComponent_For_56_Conditional_2_Template, 1, 0, "th", 37)(3, ListRoleComponent_For_56_td_3_Template, 6, 1, "td", 38);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r12 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r12);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r12 == "stt" ? 1 : 2);
  }
}
function ListRoleComponent_tr_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function ListRoleComponent_tr_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r2.CheckItemInEdit(row_r17) ? "!bg-blue-50" : "", "");
  }
}
function ListRoleComponent_tr_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 61)(1, "td", 62);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListRoleComponent_ng_template_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 63)(2, "div", 64);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 65)(7, "button", 66);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 67);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 ", ctx_r2.EditList.length, " role kh\xF4ng?");
  }
}
var ListRoleComponent = class _ListRoleComponent {
  roleService;
  dialog;
  router;
  snackBar;
  displayedColumns = ["stt", "name", "description", "createdAt", "updatedAt"];
  AllColumn = ["stt", "name", "description", "createdAt", "updatedAt"];
  ColumnName = {
    stt: "#",
    name: "T\xEAn Role",
    description: "M\xF4 T\u1EA3",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = [];
  dataSource = new MatTableDataSource([]);
  paginator;
  sort;
  drawer;
  // Services
  constructor(roleService, dialog, router, snackBar) {
    this.roleService = roleService;
    this.dialog = dialog;
    this.router = router;
    this.snackBar = snackBar;
  }
  // State - initialized after constructor
  Listrole;
  ListFilter = [];
  EditList = [];
  // Pagination
  page = signal(1);
  pageSize = signal(50);
  total = signal(0);
  totalPages = signal(1);
  ngOnInit() {
    this.Listrole = this.roleService.ListRole;
    this.initializeColumns();
    this.loadRoles();
  }
  initializeColumns() {
    this.FilterColumns = this.AllColumn.map((column) => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    }));
  }
  loadRoles() {
    return __async(this, null, function* () {
      try {
        yield this.roleService.getAllRole();
        this.dataSource.data = this.Listrole();
        this.total.set(this.dataSource.data.length);
        this.updatePagination();
      } catch (error) {
        this.snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u: " + error.message, "\u0110\xF3ng", { duration: 3e3 });
      }
    });
  }
  updatePagination() {
    const totalItems = this.dataSource.data.length;
    this.total.set(totalItems);
    this.totalPages.set(Math.ceil(totalItems / this.pageSize()));
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.page.set(1);
    this.updatePagination();
  }
  onPageSizeChange(newSize, menu) {
    this.pageSize.set(newSize);
    this.page.set(1);
    this.updatePagination();
    if (menu) {
      menu.closeMenu();
    }
  }
  onNextPage() {
    if (this.page() < this.totalPages()) {
      this.page.set(this.page() + 1);
    }
  }
  onPreviousPage() {
    if (this.page() > 1) {
      this.page.set(this.page() - 1);
    }
  }
  doFilterColumns(event) {
    const filterValue = event.target.value.toLowerCase();
    this.FilterColumns = this.AllColumn.map((column) => ({
      key: column,
      value: this.ColumnName[column],
      isShow: this.displayedColumns.includes(column)
    })).filter((column) => column.value.toLowerCase().includes(filterValue));
  }
  toggleColumn(column) {
    column.isShow = !column.isShow;
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((column) => column.isShow).map((column) => column.key);
  }
  FilterHederColumn(data, field) {
    const uniqueValues = [...new Set(data.map((item) => item[field]))];
    return uniqueValues.filter((value) => value !== null && value !== void 0);
  }
  onOutFilter(filterData) {
    this.ListFilter = filterData;
    this.applyFilters();
  }
  applyFilters() {
    let filteredData = [...this.Listrole()];
    this.ListFilter.forEach((filter) => {
      if (filter.values && filter.values.length > 0) {
        filteredData = filteredData.filter((item) => filter.values.includes(item[filter.field]));
      }
    });
    this.dataSource.data = filteredData;
    this.page.set(1);
    this.updatePagination();
  }
  create() {
    this.router.navigate(["/admin/nhomuser/new"], { relativeTo: null });
  }
  goToDetail(role) {
    this.router.navigate(["/admin/nhomuser", role.id], { relativeTo: null });
  }
  AddToEdit(role) {
    const index = this.EditList.findIndex((item) => item.id === role.id);
    if (index > -1) {
      this.EditList.splice(index, 1);
    } else {
      this.EditList.push(role);
    }
  }
  CheckSelect(role) {
    return this.EditList.some((item) => item.id === role.id);
  }
  CheckItemInEdit(role) {
    return this.EditList.some((item) => item.id === role.id);
  }
  openDeleteDialog(template) {
    const dialogRef = this.dialog.open(template);
    dialogRef.afterClosed().subscribe((result) => {
      if (result) {
        this.deleteSelectedRoles();
      }
    });
  }
  deleteSelectedRoles() {
    return __async(this, null, function* () {
      try {
        for (const role of this.EditList) {
          yield this.roleService.DeleteRole(role.id);
        }
        this.snackBar.open(`\u0110\xE3 x\xF3a ${this.EditList.length} role th\xE0nh c\xF4ng`, "\u0110\xF3ng", { duration: 3e3 });
        this.EditList = [];
        yield this.loadRoles();
      } catch (error) {
        this.snackBar.open("L\u1ED7i khi x\xF3a role: " + error.message, "\u0110\xF3ng", { duration: 3e3 });
      }
    });
  }
  static \u0275fac = function ListRoleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListRoleComponent)(\u0275\u0275directiveInject(RoleService), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListRoleComponent, selectors: [["app-listrole"]], viewQuery: function ListRoleComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 62, vars: 18, consts: [["drawer", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["menu", "matMenu"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm Role...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], [1, "w-full", "flex", "flex-row", "space-x-4", "justify-end", "items-center"], [1, "flex", "items-center", "text-center"], [1, "flex", "items-center", "justify-center"], [1, "flex", "flex-row", "space-x-2", "justify-center", "items-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100", "justify-center"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100 justify-center", "mat-header-cell", "", 4, "matHeaderCellDef"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", "", 3, "disabled"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "flex", "justify-center", "items-center", "font-bold", "text-blue-600", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "border"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function ListRoleComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 7)(5, "div", 8)(6, "div", 9)(7, "div", 10)(8, "div", 11)(9, "input", 12);
      \u0275\u0275listener("keyup", function ListRoleComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 13)(11, "span", 14);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 15);
      \u0275\u0275listener("click", function ListRoleComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 16);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ListRoleComponent_button_18_Template, 5, 0, "button", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 18)(20, "div", 19)(21, "strong");
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " - ");
      \u0275\u0275elementStart(24, "strong");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd();
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 20)(28, "span");
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "span");
      \u0275\u0275text(31, "Trang");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 21)(33, "span", 22, 1);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-menu", null, 2)(38, "div", 23);
      \u0275\u0275listener("click", function ListRoleComponent_Template_div_click_38_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(39, "mat-form-field", 24)(40, "mat-label");
      \u0275\u0275text(41, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(42, "input", 25);
      \u0275\u0275twoWayListener("ngModelChange", function ListRoleComponent_Template_input_ngModelChange_42_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "button", 26);
      \u0275\u0275listener("click", function ListRoleComponent_Template_button_click_43_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r5 = \u0275\u0275reference(34);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r5));
      });
      \u0275\u0275elementStart(44, "mat-icon");
      \u0275\u0275text(45, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(46, "div", 27)(47, "button", 28);
      \u0275\u0275listener("click", function ListRoleComponent_Template_button_click_47_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(48, "mat-icon");
      \u0275\u0275text(49, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(50, "button", 28);
      \u0275\u0275listener("click", function ListRoleComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(51, "mat-icon");
      \u0275\u0275text(52, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(53, "div", 29)(54, "table", 30);
      \u0275\u0275repeaterCreate(55, ListRoleComponent_For_56_Template, 4, 2, "ng-container", 31, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(57, ListRoleComponent_tr_57_Template, 1, 0, "tr", 32)(58, ListRoleComponent_tr_58_Template, 1, 3, "tr", 33)(59, ListRoleComponent_tr_59_Template, 3, 0, "tr", 34);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(60, ListRoleComponent_ng_template_60_Template, 11, 1, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu1_r18 = \u0275\u0275reference(37);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" / ", ctx.total(), " m\u1EE5c ");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate2("", ctx.page(), "/", ctx.totalPages(), " ");
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu1_r18);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.totalPages());
      \u0275\u0275advance(4);
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
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListRoleComponent, { className: "ListRoleComponent", filePath: "src/app/admin/role/listrole/listrole.component.ts", lineNumber: 45 });
})();

export {
  ListRoleComponent
};
//# sourceMappingURL=chunk-NAA5AXPA.mjs.map
