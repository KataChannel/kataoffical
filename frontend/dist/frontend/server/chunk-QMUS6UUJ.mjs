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
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  MatFormFieldModule,
  MatInputModule
} from "./chunk-BTD2ENWJ.mjs";
import {
  MatButtonModule
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
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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

// src/app/admin/listbaiviet/listbaiviet.component.ts
var _c0 = ["drawer"];
var _c1 = () => [5, 10, 25, 100];
function ListbaivietComponent_For_19_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 22)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r2 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r2], " ");
  }
}
function ListbaivietComponent_For_19_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 24)(1, "span", 23);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r4 = ctx.$implicit;
    const idx_r5 = ctx.index;
    const column_r2 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", column_r2 === "STT" ? idx_r5 + 1 : row_r4[column_r2], " ");
  }
}
function ListbaivietComponent_For_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 15);
    \u0275\u0275template(1, ListbaivietComponent_For_19_th_1_Template, 3, 1, "th", 20)(2, ListbaivietComponent_For_19_td_2_Template, 3, 1, "td", 21);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r2 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r2);
  }
}
function ListbaivietComponent_tr_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 25);
  }
}
function ListbaivietComponent_tr_21_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 26);
    \u0275\u0275listener("click", function ListbaivietComponent_tr_21_Template_tr_click_0_listener() {
      const row_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r7));
    });
    \u0275\u0275elementEnd();
  }
}
function ListbaivietComponent_tr_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 27)(1, "td", 28);
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
var ListbaivietComponent = class _ListbaivietComponent {
  _breakpointObserver;
  _router;
  Detail = {};
  dataSource;
  displayedColumns = [
    "STT",
    "Title",
    "author",
    "category",
    "createdAt",
    "status"
  ];
  ColumnName = {
    "STT": "STT",
    "Title": "Ti\xEAu \u0110\u1EC1",
    "author": "T\xE1c Gi\u1EA3",
    "category": "Danh M\u1EE5c",
    "createdAt": "Ng\xE0y T\u1EA1o",
    "status": "Tr\u1EA1ng Th\xE1i"
  };
  paginator;
  sort;
  drawer;
  _GoogleSheetService = inject(GoogleSheetService);
  ListBaiviet = [];
  constructor(_breakpointObserver, _router) {
    this._breakpointObserver = _breakpointObserver;
    this._router = _router;
  }
  ngOnInit() {
    const ListSheets = JSON.parse(localStorage.getItem("ListSheets") || "[]");
    console.log(ListSheets);
    if (ListSheets.length > 0) {
      const CheckSheet = ListSheets.find((v) => v.SheetName === "Baiviet");
      if (CheckSheet) {
        this._GoogleSheetService.getDrive(CheckSheet).then((result) => {
          if (result.values.length > 0) {
            this.displayedColumns = result.values[0].map((item) => item);
            this.ColumnName = ConvertDriveColumnName(result.values);
            this.dataSource = new MatTableDataSource(ConvertDriveData(result.values));
            this.ListBaiviet = ConvertDriveData(result.values);
            console.log(this.ListBaiviet);
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
    this._router.navigate(["admin/baiviet", 0]);
  }
  goToDetail(item) {
    this.drawer.open();
    this.Detail = item;
    this._router.navigate(["admin/baiviet", item.id]);
  }
  static \u0275fac = function ListbaivietComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListbaivietComponent)(\u0275\u0275directiveInject(BreakpointObserver), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListbaivietComponent, selectors: [["app-listbaiviet"]], viewQuery: function ListbaivietComponent_Query(rf, ctx) {
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
  }, decls: 24, vars: 7, consts: [["drawer", ""], ["input", ""], ["autosize", "", 1, "w-full", "h-screen-16"], [1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-full", "w-full", "justify-between", "p-2"], [1, "flex", "flex-col", "space-y-2", "w-full", "p-2"], [1, "cursor-pointer", "w-full", "relative", "grid", "lg:grid-cols-2", "gap-2", "justify-between", "items-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "cursor-pointer", "material-symbols-outlined", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], [1, "w-full"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], ["aria-label", "Select page of baiviets", 3, "pageSizeOptions"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["class", "", "mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4"], ["mat-cell", "", 1, ""], ["mat-header-row", ""], ["mat-row", "", 3, "click"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell"]], template: function ListbaivietComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 2)(1, "mat-drawer", 3, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 4)(5, "div", 5)(6, "div", 6)(7, "div", 7)(8, "div", 8)(9, "input", 9, 1);
      \u0275\u0275listener("keyup", function ListbaivietComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 10)(12, "span", 11);
      \u0275\u0275text(13, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "span", 12);
      \u0275\u0275listener("click", function ListbaivietComponent_Template_span_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.Create());
      });
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(16, "div", 13)(17, "table", 14);
      \u0275\u0275repeaterCreate(18, ListbaivietComponent_For_19_Template, 3, 1, "ng-container", 15, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(20, ListbaivietComponent_tr_20_Template, 1, 0, "tr", 16)(21, ListbaivietComponent_tr_21_Template, 1, 0, "tr", 17)(22, ListbaivietComponent_tr_22_Template, 3, 1, "tr", 18);
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "mat-paginator", 19);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275property("@.disabled", true);
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
    MatButtonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListbaivietComponent, { className: "ListbaivietComponent", filePath: "src/app/admin/listbaiviet/listbaiviet.component.ts", lineNumber: 34 });
})();

export {
  ListbaivietComponent
};
//# sourceMappingURL=chunk-QMUS6UUJ.mjs.map
