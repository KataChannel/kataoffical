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
} from "./chunk-JFLWRVXN.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatMenuModule
} from "./chunk-3J77SWWE.js";
import {
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  StorageService
} from "./chunk-WD36GM3Q.js";
import {
  MatButtonModule
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
  isPlatformBrowser
} from "./chunk-E6DSVUBK.js";
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
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/listquanlyfile/listquanlyfile.service.ts
var QuanlyfilesService = class _QuanlyfilesService {
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
  ListQuanlyfile = signal([]);
  Quanlyfile = signal({});
  getAllQuanlyfile() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          }
        };
        const response = yield fetch(`${environment.APIURL}/upload`, options);
        if (!response.ok) {
        }
        const data = yield response.json();
        this.ListQuanlyfile.set(data);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  SearchQuanlyfile(SearchParams) {
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
        this.Quanlyfile.set(data.items);
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  getQuanlyfileByid(id) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/upload/${id}`, options);
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
        this.Quanlyfile.set(data);
      } catch (error) {
        return console.error(error);
      }
    });
  }
  updateOneQuanlyfile(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json"
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/upload/${dulieu.id}`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
        }
        this.getAllQuanlyfile();
        return data;
      } catch (error) {
        return console.error(error);
      }
    });
  }
  DeleteQuanlyfile(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json"
          }
        };
        const response = yield fetch(`${environment.APIURL}/upload/${item.id}`, options);
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
        this.getAllQuanlyfile();
        return yield response.json();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  static \u0275fac = function QuanlyfilesService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _QuanlyfilesService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(PLATFORM_ID), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _QuanlyfilesService, factory: _QuanlyfilesService.\u0275fac, providedIn: "root" });
};

// src/app/admin/listquanlyfile/listquanlyfile.component.ts
var _c0 = ["drawer"];
var _c1 = () => [5, 10, 25, 100];
function ListquanlyfileComponent_For_19_th_1_Template(rf, ctx) {
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
function ListquanlyfileComponent_For_19_Case_2_td_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r4.Metadata.mimetype, " ");
  }
}
function ListquanlyfileComponent_For_19_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListquanlyfileComponent_For_19_Case_2_td_0_Template, 2, 1, "td", 23);
  }
}
function ListquanlyfileComponent_For_19_Case_3_td_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275element(1, "img", 24);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", "https://sandbox.Rau S\u1EA1ch Tr\u1EA7n Gia.com/" + row_r5.Lienket, \u0275\u0275sanitizeUrl);
  }
}
function ListquanlyfileComponent_For_19_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListquanlyfileComponent_For_19_Case_3_td_0_Template, 2, 1, "td", 23);
  }
}
function ListquanlyfileComponent_For_19_Case_4_td_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 21);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r6 = ctx.$implicit;
    const idx_r7 = ctx.index;
    const column_r2 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", column_r2 === "STT" ? idx_r7 + 1 : row_r6[column_r2], " ");
  }
}
function ListquanlyfileComponent_For_19_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListquanlyfileComponent_For_19_Case_4_td_0_Template, 2, 1, "td", 23);
  }
}
function ListquanlyfileComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 15);
    \u0275\u0275template(1, ListquanlyfileComponent_For_19_th_1_Template, 2, 1, "th", 20)(2, ListquanlyfileComponent_For_19_Case_2_Template, 1, 0, "td", 21)(3, ListquanlyfileComponent_For_19_Case_3_Template, 1, 0, "td", 21)(4, ListquanlyfileComponent_For_19_Case_4_Template, 1, 0, "td", 21);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_13_0;
    const column_r2 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional((tmp_13_0 = column_r2) === "Metadata" ? 2 : tmp_13_0 === "Hinhanh" ? 3 : 4);
  }
}
function ListquanlyfileComponent_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 25);
  }
}
function ListquanlyfileComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 26);
    \u0275\u0275listener("click", function ListquanlyfileComponent_tr_21_Template_tr_click_0_listener() {
      const row_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r9));
    });
    \u0275\u0275elementEnd();
  }
}
function ListquanlyfileComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 27)(1, "td", 28);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const input_r10 = \u0275\u0275reference(10);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1('Kh\xF4ng t\xECm th\u1EA5y "', input_r10.value, '"');
  }
}
var ListquanlyfileComponent = class _ListquanlyfileComponent {
  _breakpointObserver;
  _router;
  Detail = {};
  dataSource;
  displayedColumns = [
    "STT",
    "Title",
    "Hinhanh",
    "Type",
    "Metadata",
    "CreateAt"
  ];
  ColumnName = {
    "STT": "STT",
    "Title": "Ti\xEAu \u0110\u1EC1",
    "Hinhanh": "H\xECnh \u1EA2nh",
    "Type": "Lo\u1EA1i l\u01B0u tr\u1EEF",
    "Metadata": "Th\xF4ng Tin",
    "CreateAt": "Ng\xE0y T\u1EA1o"
  };
  paginator;
  sort;
  drawer;
  _QuanlyfilesService = inject(QuanlyfilesService);
  ListFile = [];
  constructor(_breakpointObserver, _router) {
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._QuanlyfilesService.getAllQuanlyfile().then((data) => {
        this.ListFile = data;
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
      });
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
    this._router.navigate(["admin/quanlyfiles", 0]);
  }
  goToDetail(item) {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(["admin/quanlyfiles", item.id]);
  }
  static \u0275fac = function ListquanlyfileComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListquanlyfileComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListquanlyfileComponent, selectors: [["app-listquanlyfile"]], viewQuery: function ListquanlyfileComponent_Query(rf, ctx) {
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
  }, decls: 24, vars: 6, consts: [["drawer", ""], ["input", ""], ["autosize", "", 1, "w-full", "h-full"], [1, "flex", "flex-col", "lg:!w-1/3", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "justify-between", "p-2"], [1, "flex", "flex-col", "space-y-2", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "grid", "lg:grid-cols-2", "gap-2", "justify-between", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "cursor-pointer", "material-symbols-outlined", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 1, "whitespace-nowrap"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], ["class", "whitespace-nowrap", "mat-cell", "", 4, "matCellDef"], [1, "h-10", 3, "src"], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell"]], template: function ListquanlyfileComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 2)(1, "mat-drawer", 3, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "input", 9, 1);
      \u0275\u0275listener("keyup", function ListquanlyfileComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "span", 12);
      \u0275\u0275listener("click", function ListquanlyfileComponent_Template_span_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.Create());
      });
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 13)(17, "table", 14);
      \u0275\u0275repeaterCreate(18, ListquanlyfileComponent_For_19_Template, 5, 2, "ng-container", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(20, ListquanlyfileComponent_tr_20_Template, 1, 0, "tr", 16)(21, ListquanlyfileComponent_tr_21_Template, 1, 0, "tr", 17)(22, ListquanlyfileComponent_tr_22_Template, 3, 1, "tr", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "mat-paginator", 19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(16);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(5, _c1));
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
    MatButtonModule,
    CommonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListquanlyfileComponent, { className: "ListquanlyfileComponent", filePath: "src/app/admin/listquanlyfile/listquanlyfile.component.ts", lineNumber: 35 });
})();

export {
  ListquanlyfileComponent
};
//# sourceMappingURL=chunk-75MYDJJY.js.map
