import './polyfills.server.mjs';
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
  MatTableModule
} from "./chunk-DWV2CVG4.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  ConvertDriveColumnName,
  ConvertDriveData
} from "./chunk-I23Q342N.mjs";
import {
  MatMenuModule
} from "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  StorageService
} from "./chunk-A6W66WDU.mjs";
import {
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
  isPlatformBrowser
} from "./chunk-H3GF4RFC.mjs";
import {
  PLATFORM_ID,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
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
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-4EQURZBD.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/listdanhmuc/listdanhmuc.service.ts
var DanhmucsService = class _DanhmucsService {
  _StorageService;
  platformId;
  router;
  _authenticated = false;
  APIURL = environment.APIURL;
  isBrowser;
  constructor(_StorageService, platformId, router) {
    this._StorageService = _StorageService;
    this.platformId = platformId;
    this.router = router;
    this.isBrowser = isPlatformBrowser(this.platformId);
  }
  ListDanhmuc = signal([]);
  Danhmuc = signal({});
  getDanhmucDrive(DriveInfo) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`https://sheets.googleapis.com/v4/spreadsheets/${DriveInfo.IdSheet}/values/${DriveInfo.SheetName}?key=${DriveInfo.ApiKey}`, options);
        const data = yield response.json();
        console.log(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getAllDanhmuc() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/danhmucs`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListDanhmuc.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  SearchDanhmuc(SearchParams) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(SearchParams)
        };
        const response = yield fetch(`${environment.APIURL}/setting/search`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.Danhmuc.set(data.items);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getDanhmucByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/danhmucs/${id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        const data = yield response.json();
        this.Danhmuc.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateOneDanhmuc(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/danhmucs/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllDanhmuc();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteDanhmuc(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/danhmucs/${item.id}`, options);
        if (!response.ok) {
          if (response.status === 401) {
            const result = JSON.stringify({ code: response.status, title: "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 403) {
            const result = JSON.stringify({ code: response.status, title: "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else if (response.status === 500) {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          } else {
            const result = JSON.stringify({ code: response.status, title: "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh" });
            this.router.navigate(["/errorserver"], { queryParams: { data: result } });
          }
        }
        this.getAllDanhmuc();
        return yield response.json();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function DanhmucsService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DanhmucsService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DanhmucsService, factory: _DanhmucsService.\u0275fac, providedIn: "root" });
};

// src/app/admin/listdanhmuc/listdanhmuc.component.ts
var _c0 = ["drawer"];
var _c1 = () => [5, 10, 25, 100];
function ListdanhmucComponent_Conditional_17_Template(rf, ctx) {
}
function ListdanhmucComponent_For_21_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", ctx_r2.ColumnName[column_r2], " ");
  }
}
function ListdanhmucComponent_For_21_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 23);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const idx_r5 = ctx.index;
    const column_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", column_r2 === "STT" ? idx_r5 + 1 : row_r4[column_r2], " ");
  }
}
function ListdanhmucComponent_For_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 15);
    \u0275\u0275template(1, ListdanhmucComponent_For_21_th_1_Template, 2, 1, "th", 20)(2, ListdanhmucComponent_For_21_td_2_Template, 2, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r2 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r2);
  }
}
function ListdanhmucComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 24);
  }
}
function ListdanhmucComponent_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 25);
    \u0275\u0275listener("click", function ListdanhmucComponent_tr_23_Template_tr_click_0_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r7));
    });
    \u0275\u0275elementEnd();
  }
}
function ListdanhmucComponent_tr_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 26)(1, "td", 27);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const input_r8 = \u0275\u0275reference(10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1('Kh\xF4ng t\xECm th\u1EA5y "', input_r8.value, '"');
  }
}
var ListdanhmucComponent = class _ListdanhmucComponent {
  _breakpointObserver;
  _router;
  Detail = {};
  dataSource;
  displayedColumns = [
    "STT",
    "Title",
    "Slug",
    "CreatedAt"
  ];
  ColumnName = {
    "STT": "STT",
    "Title": "Ti\xEAu \u0110\u1EC1",
    "Slug": "\u0110\u01B0\u1EDDng D\u1EABn",
    "CreatedAt": "Ng\xE0y T\u1EA1o"
  };
  ListDanhmuc = [];
  _GoogleSheetService = inject(GoogleSheetService);
  paginator;
  sort;
  drawer;
  _DanhmucsService = inject(DanhmucsService);
  isDownloadDrive = false;
  constructor(_breakpointObserver, _router) {
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const ListSheets = JSON.parse(localStorage.getItem("ListSheets") || "[]");
      console.log(ListSheets);
      if (ListSheets.length > 0) {
        const CheckSheet = ListSheets.find((v) => v.SheetName === "Danhmuc");
        if (CheckSheet) {
          this._GoogleSheetService.getDrive(CheckSheet).then((result) => {
            if (result.values.length > 0) {
              this.displayedColumns = result.values[0].map((item) => item);
              this.ColumnName = ConvertDriveColumnName(result.values);
              this.dataSource = new MatTableDataSource(ConvertDriveData(result.values));
              this.ListDanhmuc = ConvertDriveData(result.values);
              console.log(this.ListDanhmuc);
              this.dataSource.paginator = this.paginator;
              this.dataSource.sort = this.sort;
            }
          });
        }
      }
      this.Detail.id ? this.drawer.open() : this.drawer.close();
      this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
        if (result.matches) {
          this.drawer.mode = "over";
          this.paginator.hidePageSize = true;
        } else {
          this.drawer.mode = "side";
        }
      });
    });
  }
  GetDrive() {
    return __async(this, null, function* () {
    });
  }
  ngAfterViewInit() {
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
    this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
    this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
    this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
    this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
    this.paginator.pageSize = 30;
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  Create() {
    this.drawer.open();
    this._router.navigate(["admin/danhmuc", 0]);
  }
  goToDetail(item) {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(["admin/danhmuc", item.id]);
  }
  static \u0275fac = function ListdanhmucComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListdanhmucComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListdanhmucComponent, selectors: [["app-listdanhmuc"]], viewQuery: function ListdanhmucComponent_Query(rf, ctx) {
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
  }, decls: 26, vars: 7, consts: [["drawer", ""], ["input", ""], ["autosize", "", 1, "w-full", "h-full"], [1, "flex", "flex-col", "lg:!w-1/3", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "justify-between", "p-2"], [1, "flex", "flex-col", "space-y-2", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "grid", "lg:grid-cols-2", "gap-2", "justify-between", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "w-full"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["aria-label", "Select page of danhmucs", 3, "pageSizeOptions"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["class", "whitespace-nowrap", "mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], ["mat-cell", "", 1, "whitespace-nowrap"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell"]], template: function ListdanhmucComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 2)(1, "mat-drawer", 3, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "input", 9, 1);
      \u0275\u0275listener("keyup", function ListdanhmucComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "button", 12);
      \u0275\u0275listener("click", function ListdanhmucComponent_Template_button_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.Create());
      });
      \u0275\u0275elementStart(15, "mat-icon");
      \u0275\u0275text(16, "add_circle");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275template(17, ListdanhmucComponent_Conditional_17_Template, 0, 0);
      \u0275\u0275elementStart(18, "div", 13)(19, "table", 14);
      \u0275\u0275repeaterCreate(20, ListdanhmucComponent_For_21_Template, 3, 1, "ng-container", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(22, ListdanhmucComponent_tr_22_Template, 1, 0, "tr", 16)(23, ListdanhmucComponent_tr_23_Template, 1, 0, "tr", 17)(24, ListdanhmucComponent_tr_24_Template, 3, 1, "tr", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275element(25, "mat-paginator", 19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(16);
      \u0275\u0275conditional(ctx.isDownloadDrive ? 17 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(6, _c1));
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
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
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    FormsModule,
    CommonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListdanhmucComponent, { className: "ListdanhmucComponent", filePath: "src/app/admin/listdanhmuc/listdanhmuc.component.ts", lineNumber: 40 });
})();

export {
  ListdanhmucComponent
};
//# sourceMappingURL=chunk-FYXI7UZY.mjs.map
