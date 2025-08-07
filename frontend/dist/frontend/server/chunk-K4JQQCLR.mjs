import './polyfills.server.mjs';
import {
  PhieukhoService
} from "./chunk-HIZ2UIRP.mjs";
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
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  ConvertDriveData,
  GenId,
  convertToSlug
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
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  computed,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
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
  __async,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phieukho/listphieukho/listphieukho.component.ts
var _c0 = ["drawer"];
var _c1 = () => [10, 25, 100];
var _c2 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieukhoComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 31);
    \u0275\u0275listener("click", function ListPhieukhoComponent_For_24_Template_button_click_0_listener($event) {
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
function ListPhieukhoComponent_div_41_mat_form_field_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 34)(1, "mat-label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 35);
    \u0275\u0275listener("keyup", function ListPhieukhoComponent_div_41_mat_form_field_1_Template_input_keyup_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.applyFilter());
    });
    \u0275\u0275twoWayListener("ngModelChange", function ListPhieukhoComponent_div_41_mat_form_field_1_Template_input_ngModelChange_3_listener($event) {
      const column_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r3.filterValues[column_r7], $event) || (ctx_r3.filterValues[column_r7] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.ColumnName[column_r7]);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate1("placeholder", "Vui l\xF2ng Nh\u1EADp ", column_r7, "");
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.filterValues[column_r7]);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c2));
  }
}
function ListPhieukhoComponent_div_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 32);
    \u0275\u0275template(1, ListPhieukhoComponent_div_41_mat_form_field_1_Template, 4, 6, "mat-form-field", 33);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r3.displayedColumns);
  }
}
function ListPhieukhoComponent_For_45_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 38)(1, "span", 39);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r8], " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r9 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r9 + 1, " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", (tmp_17_0 = ctx_r3.getName(row_r10[column_r8])) == null ? null : tmp_17_0.title, " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r8] == null ? null : row_r10[column_r8].name, " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8], "dd/MM/yyyy"), " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 43);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 44);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275template(1, ListPhieukhoComponent_For_45_td_2_Case_6_Conditional_1_Template, 2, 0, "mat-icon", 43)(2, ListPhieukhoComponent_For_45_td_2_Case_6_Conditional_2_Template, 2, 0, "mat-icon", 44);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r10[column_r8] ? 1 : 2);
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 42);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r8], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r8], " ");
  }
}
function ListPhieukhoComponent_For_45_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 40);
    \u0275\u0275template(1, ListPhieukhoComponent_For_45_td_2_Case_1_Template, 2, 1, "span", 41)(2, ListPhieukhoComponent_For_45_td_2_Case_2_Template, 2, 1, "span", 41)(3, ListPhieukhoComponent_For_45_td_2_Case_3_Template, 2, 1, "span", 41)(4, ListPhieukhoComponent_For_45_td_2_Case_4_Template, 3, 4, "span", 41)(5, ListPhieukhoComponent_For_45_td_2_Case_5_Template, 3, 4, "span", 42)(6, ListPhieukhoComponent_For_45_td_2_Case_6_Template, 3, 1, "span", 41)(7, ListPhieukhoComponent_For_45_td_2_Case_7_Template, 3, 4, "span", 42)(8, ListPhieukhoComponent_For_45_td_2_Case_8_Template, 2, 1, "span", 41);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r8 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r8) === "STT" ? 1 : tmp_16_0 === "type" ? 2 : tmp_16_0 === "kho" ? 3 : tmp_16_0 === "ngay" ? 4 : tmp_16_0 === "createdAt" ? 5 : tmp_16_0 === "isActive" ? 6 : tmp_16_0 === "updatedAt" ? 7 : 8);
  }
}
function ListPhieukhoComponent_For_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 26);
    \u0275\u0275template(1, ListPhieukhoComponent_For_45_th_1_Template, 3, 1, "th", 36)(2, ListPhieukhoComponent_For_45_td_2_Template, 9, 1, "td", 37);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r8 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r8);
  }
}
function ListPhieukhoComponent_tr_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 45);
  }
}
function ListPhieukhoComponent_tr_47_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 46);
    \u0275\u0275listener("click", function ListPhieukhoComponent_tr_47_Template_tr_click_0_listener() {
      const row_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToDetail(row_r12));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-100 ", ctx_r3.phieukhoId() == row_r12.id ? "!bg-slate-200" : "", "");
  }
}
function ListPhieukhoComponent_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 47)(1, "td", 48);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var ListPhieukhoComponent = class _ListPhieukhoComponent {
  Detail = {};
  displayedColumns = [
    "STT",
    "maphieu",
    "ngay",
    "type",
    "kho",
    "ghichu",
    "isActive",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    STT: "STT",
    maphieu: "M\xE3 Phi\u1EBFu",
    ngay: "Ng\xE0y",
    type: "Lo\u1EA1i Phi\u1EBFu",
    kho: "Kho",
    ghichu: "Ghi Ch\xFA",
    isActive: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PhieukhoColFilter") || "[]");
  Columns = [];
  LoaiPhieu = [
    { title: "Phi\u1EBFu Nh\u1EADp", value: "nhap" },
    { title: "Phi\u1EBFu Xu\u1EA5t", value: "xuat" },
    { title: "Chuy\u1EC3n Kho", value: "chuyenkho" },
    { title: "\u0110i\u1EC1u Ch\u1EC9nh", value: "dieuchinh" }
  ];
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _PhieukhoService = inject(PhieukhoService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  Listphieukho = this._PhieukhoService.ListPhieukho;
  dataSource = computed(() => {
    const ds = new MatTableDataSource(this.Listphieukho());
    ds.filterPredicate = this.createFilter();
    ds.paginator = this.paginator;
    ds.sort = this.sort;
    return ds;
  });
  phieukhoId = this._PhieukhoService.phieukhoId;
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
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
  applyFilter() {
    this.dataSource().filter = JSON.stringify(this.filterValues);
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._PhieukhoService.getAllPhieukho();
      this.CountItem = this.Listphieukho().length;
      this.initializeColumns();
      this.setupDrawer();
      this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
      this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
      this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
      this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
      this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
    });
  }
  refresh() {
    return __async(this, null, function* () {
      yield this._PhieukhoService.getAllPhieukho();
    });
  }
  getName(type) {
    return this.LoaiPhieu.find((v) => v.value === type);
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
      localStorage.setItem("PhieukhoColFilter", JSON.stringify(this.FilterColumns));
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
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("PhieukhoColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/phieukho", 0]);
  }
  goToDetail(item) {
    this._PhieukhoService.setPhieukhoId(item.id);
    this.drawer.open();
    this._router.navigate(["admin/phieukho", item.id]);
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
    const listId1 = this._PhieukhoService.ListPhieukho().map((v) => v.masp);
    const listId3 = listId2.filter((item) => !listId1.includes(item));
    const createuppdateitem = uniqueData.map((v) => __async(this, null, function* () {
      const item = this._PhieukhoService.ListPhieukho().find((v1) => v1.masp === v.masp);
      if (item) {
        const item1 = __spreadValues(__spreadValues({}, item), v);
        yield this._PhieukhoService.updatePhieukho(item1);
      } else {
        yield this._PhieukhoService.CreatePhieukho(v);
      }
    }));
    const disableItem = listId3.map((v) => __async(this, null, function* () {
      const item = this._PhieukhoService.ListPhieukho().find((v1) => v1.masp === v);
      item.isActive = false;
      yield this._PhieukhoService.updatePhieukho(item);
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
  static \u0275fac = function ListPhieukhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhieukhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhieukhoComponent, selectors: [["app-listphieukho"]], viewQuery: function ListPhieukhoComponent_Query(rf, ctx) {
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
  }, decls: 50, vars: 12, consts: [["drawer", ""], ["menu", "matMenu"], ["uploadfile", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "btn-primary", 3, "click"], [1, "whitespace-nowrap"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "B\u1ED9 L\u1ECDc", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click"], ["matTooltip", "T\u1EA3i l\xEAn file excel", "color", "primary", "mat-icon-button", "", 3, "click"], ["type", "file", 1, "hidden", 3, "change"], ["matTooltip", "T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB drive", "color", "primary", "mat-icon-button", "", 3, "click"], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200"], ["class", "w-full grid grid-cols-2 gap-2 lg:flex lg:flex-row lg:space-x-2 items-center", 4, "ngIf"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], ["mat-menu-item", "", 3, "click"], [1, "w-full", "grid", "grid-cols-2", "gap-2", "lg:flex", "lg:flex-row", "lg:space-x-2", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 4, "ngFor", "ngForOf"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", 3, "keyup", "ngModelChange", "ngModel", "ngModelOptions", "placeholder"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function ListPhieukhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 3)(1, "mat-drawer", 4, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 5)(5, "div", 6)(6, "div", 7)(7, "button", 8);
      \u0275\u0275listener("click", function ListPhieukhoComponent_Template_button_click_7_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "span", 9);
      \u0275\u0275text(11, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "button", 10)(13, "mat-icon");
      \u0275\u0275text(14, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-menu", null, 1)(17, "div", 11)(18, "mat-form-field", 12)(19, "input", 13);
      \u0275\u0275listener("input", function ListPhieukhoComponent_Template_input_input_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListPhieukhoComponent_Template_input_click_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "mat-icon", 14);
      \u0275\u0275text(21, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(22, "div", 15);
      \u0275\u0275repeaterCreate(23, ListPhieukhoComponent_For_24_Template, 5, 2, "button", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(25, "button", 17);
      \u0275\u0275listener("click", function ListPhieukhoComponent_Template_button_click_25_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.isFilter = !ctx.isFilter);
      });
      \u0275\u0275elementStart(26, "mat-icon");
      \u0275\u0275text(27, "filter_list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 18);
      \u0275\u0275listener("click", function ListPhieukhoComponent_Template_button_click_28_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.Listphieukho(), "Phieukho"));
      });
      \u0275\u0275elementStart(29, "mat-icon");
      \u0275\u0275text(30, "file_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "button", 19);
      \u0275\u0275listener("click", function ListPhieukhoComponent_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r5 = \u0275\u0275reference(35);
        return \u0275\u0275resetView(uploadfile_r5.click());
      });
      \u0275\u0275elementStart(32, "mat-icon");
      \u0275\u0275text(33, "file_upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "input", 20, 2);
      \u0275\u0275listener("change", function ListPhieukhoComponent_Template_input_change_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 21);
      \u0275\u0275listener("click", function ListPhieukhoComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.LoadDrive());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "cloud_download");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "span", 22);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(41, ListPhieukhoComponent_div_41_Template, 2, 1, "div", 23);
      \u0275\u0275elementStart(42, "div", 24)(43, "table", 25);
      \u0275\u0275repeaterCreate(44, ListPhieukhoComponent_For_45_Template, 3, 1, "ng-container", 26, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(46, ListPhieukhoComponent_tr_46_Template, 1, 0, "tr", 27)(47, ListPhieukhoComponent_tr_47_Template, 1, 3, "tr", 28)(48, ListPhieukhoComponent_tr_48_Template, 3, 0, "tr", 29);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(49, "mat-paginator", 30);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const menu_r13 = \u0275\u0275reference(16);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(11);
      \u0275\u0275property("matMenuTriggerFor", menu_r13);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(2);
      \u0275\u0275classMap(ctx.isFilter ? "!bg-slate-200" : "");
      \u0275\u0275advance(15);
      \u0275\u0275textInterpolate1(" ", ctx.CountItem, " S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isFilter);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource());
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(11, _c1));
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
    CommonModule,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieukhoComponent, { className: "ListPhieukhoComponent", filePath: "src/app/admin/phieukho/listphieukho/listphieukho.component.ts", lineNumber: 43 });
})();

export {
  ListPhieukhoComponent
};
//# sourceMappingURL=chunk-K4JQQCLR.mjs.map
