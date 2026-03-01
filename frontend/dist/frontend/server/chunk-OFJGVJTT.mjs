import './polyfills.server.mjs';
import {
  MatButtonToggle,
  MatButtonToggleGroup,
  MatButtonToggleModule
} from "./chunk-3GFI4IV4.mjs";
import {
  TrangThaiDon
} from "./chunk-CY65G3O7.mjs";
import {
  DonhangService
} from "./chunk-JL4WQNZB.mjs";
import {
  GoogleSheetService
} from "./chunk-VO5ZZWXY.mjs";
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
  readExcelFile,
  writeExcelFile
} from "./chunk-XQWRZCE6.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  ConvertDriveData
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
  Breakpoints
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
  EventEmitter,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
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
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-ADMXANIA.mjs";
import {
  __async,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/phieugiaohang/listphieugiaohang/listphieugiaohang.component.ts
var import_moment = __toESM(require_moment());

// src/app/shared/common/sharepagination/sharepagination.component.ts
var _c0 = () => ({ standalone: true });
var SharepaginationComponent = class _SharepaginationComponent {
  pageSize = 10;
  page = 1;
  total = 1;
  pageCount = 1;
  emitChange = new EventEmitter();
  _snackBar = inject(MatSnackBar);
  onPageSizeChange(size, menuHienthi) {
    if (size > this.total) {
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.total}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      size = this.total;
    }
    this.emitChange.emit({ page: 1, pageSize: size });
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.page > 1) {
      this.emitChange.emit({ page: this.page - 1, pageSize: this.pageSize });
    }
  }
  onNextPage() {
    if (this.page < this.pageCount) {
      this.emitChange.emit({ page: this.page + 1, pageSize: this.pageSize });
    }
  }
  static \u0275fac = function SharepaginationComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharepaginationComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SharepaginationComponent, selectors: [["app-sharepagination"]], inputs: { pageSize: "pageSize", page: "page", total: "total", pageCount: "pageCount" }, outputs: { emitChange: "emitChange" }, decls: 30, vars: 12, consts: [["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"]], template: function SharepaginationComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 2)(1, "div", 3)(2, "span", 4);
      \u0275\u0275text(3, "\u0110ang Xem ");
      \u0275\u0275elementStart(4, "strong");
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " - ");
      \u0275\u0275elementStart(7, "strong");
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 5)(11, "span", 6, 0);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-menu", null, 1)(16, "div", 7);
      \u0275\u0275listener("click", function SharepaginationComponent_Template_div_click_16_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(17, "span");
      \u0275\u0275text(18, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-form-field", 8)(20, "input", 9);
      \u0275\u0275twoWayListener("ngModelChange", function SharepaginationComponent_Template_input_ngModelChange_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 10);
      \u0275\u0275listener("click", function SharepaginationComponent_Template_button_click_21_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r2 = \u0275\u0275reference(12);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuHienthi_r2));
      });
      \u0275\u0275text(22, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 11)(24, "button", 12);
      \u0275\u0275listener("click", function SharepaginationComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(25, "mat-icon");
      \u0275\u0275text(26, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "button", 12);
      \u0275\u0275listener("click", function SharepaginationComponent_Template_button_click_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(28, "mat-icon");
      \u0275\u0275text(29, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      const menu1_r3 = \u0275\u0275reference(15);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.page - 1) * ctx.pageSize + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page * ctx.pageSize > ctx.total ? ctx.total : ctx.page * ctx.pageSize);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.total, " m\u1EE5c, ", ctx.page, "/", ctx.pageCount, " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r3);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize, " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c0));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.page === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page === ctx.pageCount);
    }
  }, dependencies: [MatMenuModule, MatMenu, MatMenuTrigger, MatIconModule, MatIcon, MatFormFieldModule, MatFormField, MatButtonModule, MatButton, MatIconButton, MatInputModule, MatInput, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SharepaginationComponent, { className: "SharepaginationComponent", filePath: "src/app/shared/common/sharepagination/sharepagination.component.ts", lineNumber: 24 });
})();

// src/app/shared/utils/loading.utils.ts
var LoadingUtils = class {
  static debounceTimers = /* @__PURE__ */ new Map();
  static throttleTimers = /* @__PURE__ */ new Map();
  /**
   * Debounce function - delays execution until after wait milliseconds have passed since last call
   * Useful for search inputs, form validation
   */
  static debounce(func, wait, key) {
    return (...args) => {
      if (this.debounceTimers.has(key)) {
        clearTimeout(this.debounceTimers.get(key));
      }
      const timeoutId = setTimeout(() => {
        func(...args);
        this.debounceTimers.delete(key);
      }, wait);
      this.debounceTimers.set(key, timeoutId);
    };
  }
  /**
   * Throttle function - ensures function is called at most once per wait milliseconds
   * Useful for scroll events, resize events, API calls with user interaction
   */
  static throttle(func, wait, key) {
    return (...args) => {
      const lastCallTime = this.throttleTimers.get(key) || 0;
      const now = Date.now();
      if (now - lastCallTime >= wait) {
        this.throttleTimers.set(key, now);
        func(...args);
      }
    };
  }
  /**
   * Rate limiter - combines debounce and throttle
   * Ensures immediate execution on first call, then throttles subsequent calls
   */
  static rateLimitedDebounce(func, throttleWait, debounceWait, key) {
    let isThrottled = false;
    return (...args) => {
      if (!isThrottled) {
        func(...args);
        isThrottled = true;
        setTimeout(() => {
          isThrottled = false;
        }, throttleWait);
        return;
      }
      this.debounce(func, debounceWait, `${key}_debounced`)(...args);
    };
  }
  /**
   * Cleanup all timers for a specific component/key
   */
  static cleanup(keyPrefix) {
    for (const [key, timer] of this.debounceTimers.entries()) {
      if (key.startsWith(keyPrefix)) {
        clearTimeout(timer);
        this.debounceTimers.delete(key);
      }
    }
    for (const key of this.throttleTimers.keys()) {
      if (key.startsWith(keyPrefix)) {
        this.throttleTimers.delete(key);
      }
    }
  }
  /**
   * Request queue for handling multiple API calls
   */
  static requestQueues = /* @__PURE__ */ new Map();
  /**
   * Queue API requests to prevent concurrent calls to the same endpoint
   */
  static queueRequest(key, requestFn) {
    if (this.requestQueues.has(key)) {
      return this.requestQueues.get(key);
    }
    const request = requestFn().finally(() => {
      this.requestQueues.delete(key);
    });
    this.requestQueues.set(key, request);
    return request;
  }
};

// src/app/admin/phieugiaohang/listphieugiaohang/listphieugiaohang.component.ts
var _c02 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _c3 = (a0) => ({ "!bg-slate-200": a0 });
var _forTrack0 = ($index, $item) => $item.key;
function ListPhieugiaohangComponent_div_5_For_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 46);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_For_19_Template_button_click_0_listener($event) {
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
function ListPhieugiaohangComponent_div_5_button_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 19);
  }
}
function ListPhieugiaohangComponent_div_5_button_26_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 47);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_button_26_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.UpdateBulk());
    });
    \u0275\u0275template(1, ListPhieugiaohangComponent_div_5_button_26_Conditional_1_Template, 1, 0, "mat-spinner", 19);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", ctx_r2.isBulkUpdating() || ctx_r2.isLoading());
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r2.isBulkUpdating() ? 1 : -1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.isBulkUpdating() ? "\u0110ang x\u1EED l\xFD..." : "\u0110\xE3 Nh\u1EADn");
  }
}
function ListPhieugiaohangComponent_div_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 29)(1, "div", 30)(2, "div", 31)(3, "input", 32);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_div_5_Template_input_keyup_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 33)(5, "span", 34);
    \u0275\u0275text(6, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "button", 35)(8, "mat-icon");
    \u0275\u0275text(9, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-menu", null, 3)(12, "div", 36)(13, "mat-form-field", 37)(14, "input", 38);
    \u0275\u0275listener("input", function ListPhieugiaohangComponent_div_5_Template_input_input_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterColumns($event));
    })("click", function ListPhieugiaohangComponent_div_5_Template_input_click_14_listener($event) {
      \u0275\u0275restoreView(_r2);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-icon", 39);
    \u0275\u0275text(16, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(17, "div", 40);
    \u0275\u0275repeaterCreate(18, ListPhieugiaohangComponent_div_5_For_19_Template, 5, 2, "button", 41, _forTrack0);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 42);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ToggleAll());
    });
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 43);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_Template_span_click_22_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterDagiao());
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 44);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_5_Template_span_click_24_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.filterChuagiao());
    });
    \u0275\u0275text(25);
    \u0275\u0275elementEnd();
    \u0275\u0275template(26, ListPhieugiaohangComponent_div_5_button_26_Template, 4, 3, "button", 45);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const menu_r7 = \u0275\u0275reference(11);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275property("matMenuTriggerFor", menu_r7);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r2.FilterColumns);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r2.total(), " Phi\u1EBFu giao h\xE0ng ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" \u0110\xE3 Giao ", ctx_r2.countDagiao(), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" Ch\u01B0a Giao ", ctx_r2.countChuagiao(), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.EditList.length > 0);
  }
}
function ListPhieugiaohangComponent_div_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 48)(1, "mat-form-field", 37)(2, "mat-label");
    \u0275\u0275text(3, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 49);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_div_6_Template_input_keyup_4_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.applyFilter($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "button", 50);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_div_6_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.isSearch = !ctx_r2.isSearch);
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "cancel");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieugiaohangComponent_Conditional_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 19);
  }
}
function ListPhieugiaohangComponent_Conditional_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "search");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 21)(1, "mat-icon", 51);
    \u0275\u0275text(2, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "h3", 52);
    \u0275\u0275text(4, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 53);
    \u0275\u0275text(6, " Vui l\xF2ng ch\u1ECDn \u0111i\u1EC1u ki\u1EC7n t\xECm ki\u1EBFm (ng\xE0y, lo\u1EA1i kh\xE1ch h\xE0ng)");
    \u0275\u0275element(7, "br");
    \u0275\u0275text(8, " v\xE0 nh\u1EA5n n\xFAt ");
    \u0275\u0275elementStart(9, "strong", 54);
    \u0275\u0275text(10, "T\xECm Ki\u1EBFm");
    \u0275\u0275elementEnd();
    \u0275\u0275text(11, " \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu giao h\xE0ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "button", 55);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_Conditional_33_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.searchData());
    });
    \u0275\u0275elementStart(13, "mat-icon");
    \u0275\u0275text(14, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 56);
    \u0275\u0275text(16, "T\xECm Ki\u1EBFm Ngay");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieugiaohangComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 22)(1, "div", 57);
    \u0275\u0275element(2, "mat-spinner", 58);
    \u0275\u0275elementStart(3, "span", 59);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 76);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "dd/MM/yyyy"));
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "dd/MM/yyyy"));
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r13[column_r11], "dd/MM/yyyy"));
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", (item_r13[column_r11] == null ? null : item_r13[column_r11].length) || 0, " s\u1EA3n ph\u1EA9m");
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate((item_r13[column_r11] == null ? null : item_r13[column_r11].name) || "Tr\u1ED1ng");
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r13[column_r11] || "Tr\u1ED1ng", "");
  }
}
function ListPhieugiaohangComponent_For_37_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 74);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_div_23_Template_div_click_0_listener() {
      const item_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const column_r11 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenItem(item_r13, column_r11));
    });
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_37_th_1_div_23_span_1_Template, 2, 0, "span", 75)(2, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_2_Template, 3, 4, "span")(3, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_3_Template, 3, 4, "span")(4, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_4_Template, 3, 4, "span")(5, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_5_Template, 2, 1, "span")(6, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_6_Template, 2, 1, "span")(7, ListPhieugiaohangComponent_For_37_th_1_div_23_Case_7_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_19_0;
    const item_r13 = ctx.$implicit;
    const column_r11 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItem(item_r13));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = column_r11) === "createdAt" ? 2 : tmp_19_0 === "updatedAt" ? 3 : tmp_19_0 === "ngaygiao" ? 4 : tmp_19_0 === "sanpham" ? 5 : tmp_19_0 === "khachhang" ? 6 : 7);
  }
}
function ListPhieugiaohangComponent_For_37_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 62)(1, "span", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 64, 4);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 3)(8, "div", 65);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r10);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 31)(10, "input", 66);
    \u0275\u0275listener("keyup", function ListPhieugiaohangComponent_For_37_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.doFilterHederColumn($event, column_r11));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 33)(12, "span", 34);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 67)(15, "div", 68)(16, "span", 69);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r10);
      const column_r11 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.ChosenAll(ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 69);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 69);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 70);
    \u0275\u0275template(23, ListPhieugiaohangComponent_For_37_th_1_div_23_Template, 8, 2, "div", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 72)(25, "button", 73);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r14.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 55);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r10);
      const menuTrigger_r14 = \u0275\u0275reference(4);
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.ApplyFilterColum(menuTrigger_r14));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r15 = \u0275\u0275reference(7);
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r11], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r15);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r11))("ngForTrackBy", ctx_r2.trackByFn);
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_1_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 85);
    \u0275\u0275text(1, "check_box");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 83);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_td_2_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r16);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.togglePhieugiaohang(row_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275template(2, ListPhieugiaohangComponent_For_37_td_2_Case_1_span_2_Template, 2, 0, "span", 84);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r17 = \u0275\u0275nextContext();
    const row_r17 = ctx_r17.$implicit;
    const idx_r19 = ctx_r17.index;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r19 + 1, " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r2.CheckItemInPhieugiaohang(row_r17));
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 86);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_For_37_td_2_Case_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const row_r17 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r17));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11], " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11].name, " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 82);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(2, _c2, row_r17[column_r11] === "dadat", row_r17[column_r11] === "dagiao", row_r17[column_r11] === "danhan", row_r17[column_r11] === "hoanthanh", row_r17[column_r11] === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.Trangthaidon[row_r17[column_r11]], " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, ctx_r2.getTongdon(row_r17), "1.0-0"), " \u0111 ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11].length, " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_9_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 87);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_9_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 88);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_37_td_2_Case_9_Conditional_1_Template, 2, 0, "mat-icon", 87)(2, ListPhieugiaohangComponent_For_37_td_2_Case_9_Conditional_2_Template, 2, 0, "mat-icon", 88);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r17[column_r11] ? 1 : 2);
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 80);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r17[column_r11], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 81);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = \u0275\u0275nextContext().$implicit;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r17[column_r11], " ");
  }
}
function ListPhieugiaohangComponent_For_37_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 77);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_37_td_2_Case_1_Template, 3, 2, "span", 78)(2, ListPhieugiaohangComponent_For_37_td_2_Case_2_Template, 2, 1, "span", 79)(3, ListPhieugiaohangComponent_For_37_td_2_Case_3_Template, 3, 4, "span", 80)(4, ListPhieugiaohangComponent_For_37_td_2_Case_4_Template, 3, 4, "span", 80)(5, ListPhieugiaohangComponent_For_37_td_2_Case_5_Template, 2, 1, "span", 81)(6, ListPhieugiaohangComponent_For_37_td_2_Case_6_Template, 2, 8, "span", 82)(7, ListPhieugiaohangComponent_For_37_td_2_Case_7_Template, 3, 4, "span", 81)(8, ListPhieugiaohangComponent_For_37_td_2_Case_8_Template, 2, 1, "span", 81)(9, ListPhieugiaohangComponent_For_37_td_2_Case_9_Template, 3, 1, "span", 81)(10, ListPhieugiaohangComponent_For_37_td_2_Case_10_Template, 3, 4, "span", 80)(11, ListPhieugiaohangComponent_For_37_td_2_Case_11_Template, 2, 1, "span", 81);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_16_0;
    const column_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_16_0 = column_r11) === "STT" ? 1 : tmp_16_0 === "madonhang" ? 2 : tmp_16_0 === "createdAt" ? 3 : tmp_16_0 === "ngaygiao" ? 4 : tmp_16_0 === "khachhang" ? 5 : tmp_16_0 === "status" ? 6 : tmp_16_0 === "tongdon" ? 7 : tmp_16_0 === "sanpham" ? 8 : tmp_16_0 === "isActive" ? 9 : tmp_16_0 === "updatedAt" ? 10 : 11);
  }
}
function ListPhieugiaohangComponent_For_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 24);
    \u0275\u0275template(1, ListPhieugiaohangComponent_For_37_th_1_Template, 29, 5, "th", 60)(2, ListPhieugiaohangComponent_For_37_td_2_Template, 12, 1, "td", 61);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r11 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r11);
  }
}
function ListPhieugiaohangComponent_tr_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 89);
  }
}
function ListPhieugiaohangComponent_tr_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 90);
    \u0275\u0275listener("click", function ListPhieugiaohangComponent_tr_39_Template_tr_click_0_listener() {
      const row_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r22));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction1(1, _c3, ctx_r2.CheckItemInEdit(row_r22)));
  }
}
function ListPhieugiaohangComponent_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 91)(1, "td", 92);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
var ListPhieugiaohangComponent = class _ListPhieugiaohangComponent {
  Detail = {};
  displayedColumns = [
    "STT",
    "madonhang",
    "khachhang",
    "sanpham",
    "tongdon",
    "ngaygiao",
    "status",
    "ghichu",
    "createdAt",
    "updatedAt"
  ];
  ColumnName = {
    STT: "STT",
    madonhang: "M\xE3 \u0110\u01A1n H\xE0ng",
    khachhang: "Kh\xE1ch H\xE0ng",
    sanpham: "S\u1EA3n Ph\u1EA9m",
    tongdon: "T\u1ED5ng \u0110\u01A1n",
    ngaygiao: "Ng\xE0y Giao",
    status: "Tr\u1EA1ng Th\xE1i",
    ghichu: "Ghi Ch\xFA",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("PhieugiaohangColFilter") || "[]");
  Columns = [];
  isFilter = false;
  isLoading = signal(false);
  isBulkUpdating = signal(false);
  isSearching = signal(false);
  isExporting = signal(false);
  isImporting = signal(false);
  paginator;
  sort;
  drawer;
  filterValues = {};
  _DonhangService = inject(DonhangService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  Listphieugiaohang = signal({});
  dataSource = new MatTableDataSource([]);
  donhangId = this._DonhangService.donhangId;
  _snackBar = inject(MatSnackBar);
  isSearch = false;
  CountItem = 0;
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(10);
  Trangthaidon = TrangThaiDon;
  SearchParams = {
    Batdau: (0, import_moment.default)().startOf("day").toDate(),
    // 00:00:00 ngày hiện tại
    Ketthuc: (0, import_moment.default)().endOf("day").toDate(),
    // 23:59:59 ngày hiện tại
    Type: "all",
    Status: ["dadat", "dagiao", "danhan", "hoanthanh"],
    pageSize: 10,
    pageNumber: 1
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
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
  /**
   * Method để tìm kiếm - chỉ load data khi user nhấn nút
   */
  searchData() {
    return __async(this, null, function* () {
      yield this.LoadData();
    });
  }
  getTongdon(row) {
    return Number(row.tongtien) + Number(row.tongvat) || 0;
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.initializeColumns();
      this.setupDrawer();
      if (this.paginator) {
        this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
        this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
        this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
        this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
        this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
      }
      yield this.LoadData();
    });
  }
  ngAfterViewInit() {
    if (this.sort) {
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case "khachhang":
            return item.khachhang?.name || "";
          case "sanpham":
            return item.sanpham?.length || 0;
          case "ngaygiao":
          case "createdAt":
          case "updatedAt":
            return new Date(item[property]).getTime();
          default:
            return item[property];
        }
      };
    }
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
  LoadData() {
    return __async(this, null, function* () {
      const loadDataKey = `${this.COMPONENT_KEY}_loadData`;
      return LoadingUtils.queueRequest(loadDataKey, () => __async(this, null, function* () {
        this.isLoading.set(true);
        try {
          const data = yield this.searchDonhang();
          console.log(data);
          this.Listphieugiaohang.set(data);
          this.total.set(Number(data.length || 0));
          this.pageSize.set(10);
          this.page.set(1);
          this.pageCount.set(1);
          this.dataSource = new MatTableDataSource(data);
          this.dataSource.paginator = null;
          if (this.sort) {
            this.dataSource.sort = this.sort;
          }
          this.dataSource.sortingDataAccessor = (item, property) => {
            switch (property) {
              case "khachhang":
                return item.khachhang?.name || "";
              case "sanpham":
                return item.sanpham?.length || 0;
              case "ngaygiao":
              case "createdAt":
              case "updatedAt":
                return new Date(item[property]).getTime();
              default:
                return item[property];
            }
          };
        } catch (error) {
          console.error("Error loading data:", error);
          this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          this.total.set(0);
          this.pageSize.set(10);
          this.page.set(1);
          this.pageCount.set(0);
          this.dataSource = new MatTableDataSource([]);
        } finally {
          this.isLoading.set(false);
        }
      }));
    });
  }
  searchDonhang() {
    return __async(this, null, function* () {
      const where = {
        ngaygiao: {
          gte: (0, import_moment.default)(this.SearchParams.Batdau).startOf("day").toISOString(),
          lte: (0, import_moment.default)(this.SearchParams.Ketthuc).endOf("day").toISOString()
        },
        status: { in: this.SearchParams.Status }
      };
      if (this.SearchParams.Type && this.SearchParams.Type !== "all") {
        where.khachhang = { loaikh: this.SearchParams.Type };
      }
      const Donhangs = yield this._GraphqlService.findAll("donhang", {
        aggressiveCache: true,
        enableParallelFetch: true,
        take: 999999,
        where,
        select: {
          id: true,
          madonhang: true,
          ngaygiao: true,
          tongtien: true,
          tongvat: true,
          status: true,
          ghichu: true,
          createdAt: true,
          updatedAt: true,
          khachhang: {
            select: {
              id: true,
              name: true
            }
          },
          sanpham: {
            select: {
              id: true
            }
          }
        }
      });
      console.log(Donhangs);
      return Donhangs.data;
    });
  }
  applyFilter(event) {
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      if (!filterValue.trim()) {
        this.dataSource.filter = "";
        return;
      }
      this.isSearching.set(true);
      this.dataSource.filterPredicate = (data, filter) => {
        const searchText = removeVietnameseAccents(filter.toLowerCase().trim());
        return this.displayedColumns.some((column) => {
          let value;
          switch (column) {
            case "khachhang":
              value = data.khachhang?.name || "";
              break;
            case "sanpham":
              value = data.sanpham?.length ? `${data.sanpham.length} s\u1EA3n ph\u1EA9m` : "";
              break;
            case "ngaygiao":
            case "createdAt":
            case "updatedAt":
              value = data[column] ? (0, import_moment.default)(data[column]).format("DD/MM/YYYY HH:mm") : "";
              break;
            case "status":
              value = this.Trangthaidon[data[column]] || data[column] || "";
              break;
            default:
              value = data[column] || "";
          }
          if (value) {
            const normalizedValue = removeVietnameseAccents(value.toString().toLowerCase());
            return normalizedValue.includes(searchText);
          }
          return false;
        });
      };
      this.dataSource.filter = filterValue.trim();
      this.isSearching.set(false);
    });
  }
  searchTimeout;
  COMPONENT_KEY = "listphieugiaohang";
  // Debounced search function
  debouncedSearch = LoadingUtils.debounce(() => __async(this, null, function* () {
    try {
      this.SearchParams.pageNumber = 1;
      yield this.LoadData();
    } finally {
      this.isSearching.set(false);
    }
  }), 500, `${this.COMPONENT_KEY}_search`);
  onSelectionChange(event) {
    this.SearchParams.pageNumber = 1;
    this.LoadData();
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
  initializeColumns() {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem("PhieugiaohangColFilter", JSON.stringify(this.FilterColumns));
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
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  FilterHederColumn(list, column) {
    const dataToFilter = this.dataSource.data || [];
    if (column === "sanpham") {
      const uniqueList = dataToFilter.filter((obj, index, self) => index === self.findIndex((t) => (t[column]?.length || 0) === (obj[column]?.length || 0)));
      return uniqueList;
    } else if (column === "khachhang") {
      const uniqueList = dataToFilter.filter((obj, index, self) => index === self.findIndex((t) => (t[column]?.name || "") === (obj[column]?.name || "")));
      return uniqueList;
    } else {
      const uniqueList = dataToFilter.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
      return uniqueList;
    }
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    const filteredData = this.dataSource.data.filter((v) => {
      let value;
      if (column === "sanpham") {
        value = `${v[column]?.length || 0} s\u1EA3n ph\u1EA9m`;
      } else if (column === "khachhang") {
        value = v[column]?.name || "";
      } else {
        value = v[column];
      }
      if (value) {
        return removeVietnameseAccents(value.toString()).toLowerCase().includes(query) || value.toString().toLowerCase().includes(query);
      }
      return false;
    });
    this.dataSource.filteredData = filteredData;
    console.log(query, column, filteredData);
  }
  ListFilter = [];
  ChosenItem(item, column) {
    let CheckItem = [];
    let CheckItem1 = [];
    if (column === "sanpham") {
      CheckItem = this.dataSource.data.filter((v) => (v[column]?.length || 0) === (item[column]?.length || 0));
      CheckItem1 = this.ListFilter.filter((v) => (v[column]?.length || 0) === (item[column]?.length || 0));
    } else if (column === "khachhang") {
      CheckItem = this.dataSource.data.filter((v) => (v[column]?.name || "") === (item[column]?.name || ""));
      CheckItem1 = this.ListFilter.filter((v) => (v[column]?.name || "") === (item[column]?.name || ""));
    } else {
      CheckItem = this.dataSource.data.filter((v) => v[column] === item[column]);
      CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    }
    if (CheckItem1.length > 0) {
      if (column === "sanpham") {
        this.ListFilter = this.ListFilter.filter((v) => (v[column]?.length || 0) !== (item[column]?.length || 0));
      } else if (column === "khachhang") {
        this.ListFilter = this.ListFilter.filter((v) => (v[column]?.name || "") !== (item[column]?.name || ""));
      } else {
        this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
      }
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
    const originalData = this.Listphieugiaohang() || [];
    console.log("ResetFilter - Original data length:", originalData.length);
    this.ListFilter = [...originalData];
    this.dataSource.data = [...originalData];
    this.dataSource.filteredData = [...originalData];
    console.log("ResetFilter - After reset, dataSource.data length:", this.dataSource.data.length);
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  EditList = [];
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
    console.log(this.EditList);
  }
  ToggleAll() {
    this.EditList.length == this.dataSource.data.length ? this.EditList = [] : this.EditList = [...this.dataSource.data];
  }
  togglePhieugiaohang(row) {
    this.AddToEdit(row);
  }
  CheckItemInPhieugiaohang(item) {
    return this.CheckItemInEdit(item);
  }
  trackByFn(index, item) {
    return item.id || index;
  }
  UpdateBulk() {
    return __async(this, null, function* () {
      if (!this.EditList?.length) {
        this._snackBar.open("Kh\xF4ng c\xF3 m\u1EE5c n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn \u0111\u1EC3 c\u1EADp nh\u1EADt", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      this.isBulkUpdating.set(true);
      try {
        const result = yield this._DonhangService.UpdateBulkDonhang(this.EditList.map((v) => v.id));
        this._snackBar.open(`C\u1EADp nh\u1EADt th\xE0nh c\xF4ng ${result.success} \u0111\u01A1n h\xE0ng${result.fail ? `, ${result.fail} l\u1ED7i` : ""}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.EditList = [];
        this.isBulkUpdating.set(false);
        yield this.LoadData();
      }
    });
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  // Kiểm tra trạng thái đã in (printCount > 0)
  getTrangthaiIn(item) {
    return item.printCount && item.printCount > 0;
  }
  /**
   * Count delivered orders (danhan, hoanthanh)
   * Safely handles signal value and ensures array type
   */
  countDagiao() {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders))
      return 0;
    return orders.filter((item) => ["danhan", "hoanthanh", "dagiao"].includes(item.status)).length;
  }
  /**
   * Count undelivered orders (dadat, dagiao)
   * Safely handles signal value and ensures array type
   */
  countChuagiao() {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders))
      return 0;
    return orders.filter((item) => ["dadat", "huy"].includes(item.status)).length;
  }
  /**
   * Filter by delivered status (danhan, hoanthanh)
   */
  filterDagiao() {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders.filter((item) => ["danhan", "dagiao", "hoanthanh"].includes(item.status));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Filter by undelivered status (dadat, dagiao)
   */
  filterChuagiao() {
    const orders = this.Listphieugiaohang();
    console.log("Filtering undelivered orders", orders);
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders.filter((item) => ["dadat", "huy"].includes(item.status));
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  /**
   * Reset filter to show all orders
   */
  resetStatusFilter() {
    const orders = this.Listphieugiaohang();
    if (!Array.isArray(orders))
      return;
    this.dataSource.data = orders;
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  ApplyFilterColum(menu) {
    const originalData = this.Listphieugiaohang() || [];
    this.dataSource.data = originalData.filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    console.log("ApplyFilterColum - Filtered data length:", this.dataSource.data.length, "from", originalData.length);
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("PhieugiaohangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/phieugiaohang", 0]);
  }
  goToDetail(item) {
    this._DonhangService.setDonhangId(item.id);
    window.open(this._router.serializeUrl(this._router.createUrlTree(["admin/phieugiaohang", item.id])), "_blank");
  }
  LoadDrive() {
    return __async(this, null, function* () {
      this.isImporting.set(true);
      try {
        const DriveInfo = {
          IdSheet: "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk",
          SheetName: "PGHImport",
          ApiKey: "AIzaSyD33kgZJKdFpv1JrKHacjCQccL_O0a2Eao"
        };
        const result = yield this._GoogleSheetService.getDrive(DriveInfo);
        const data = ConvertDriveData(result.values);
        console.log(data);
        yield this.DoImportData(data);
        this._snackBar.open("T\u1EA3i d\u1EEF li\u1EC7u t\u1EEB Drive th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error loading from drive:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u t\u1EEB Drive", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isImporting.set(false);
      }
    });
  }
  DoImportData(data) {
    return __async(this, null, function* () {
      return Promise.resolve();
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      this.isImporting.set(true);
      try {
        const data = yield readExcelFile(event);
        yield this.DoImportData(data);
        this._snackBar.open("Import Excel th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        event.target.value = "";
      } catch (error) {
        console.error("Error importing excel:", error);
        this._snackBar.open("L\u1ED7i khi import Excel", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isImporting.set(false);
      }
    });
  }
  ExportExcel(data, title) {
    this.isExporting.set(true);
    try {
      writeExcelFile(data, title);
      this._snackBar.open("Export Excel th\xE0nh c\xF4ng", "", {
        duration: 2e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    } catch (error) {
      console.error("Error exporting excel:", error);
      this._snackBar.open("L\u1ED7i khi export Excel", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
    } finally {
      this.isExporting.set(false);
    }
  }
  ngOnDestroy() {
    LoadingUtils.cleanup(this.COMPONENT_KEY);
  }
  static \u0275fac = function ListPhieugiaohangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListPhieugiaohangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListPhieugiaohangComponent, selectors: [["app-listphieugiaohang"]], viewQuery: function ListPhieugiaohangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c02, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 42, vars: 40, consts: [["drawer", ""], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menu", "matMenu"], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], ["class", "cursor-pointer w-full relative flex lg:flex-row lg:space-y-2 space-y-0 flex-col space-x-2 justify-between items-center p-2 bg-white rounded-lg", 4, "ngIf"], ["class", "py-2 w-full flex flex-row space-x-2 items-center", 4, "ngIf"], [1, "w-full", "flex", "lg:flex-row", "flex-col", "items-center", "gap-2"], [3, "ngModelChange", "change", "ngModel", "ngModelOptions", "disabled"], ["value", "all", 3, "disabled"], ["value", "khachsi", 3, "disabled"], ["value", "khachle", 3, "disabled"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "dateChange", "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions", "disabled"], ["matIconSuffix", "", 3, "for", "disabled"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Nh\u1EA5n \u0111\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u phi\u1EBFu giao h\xE0ng", 1, "!h-12", 3, "click", "disabled"], ["diameter", "20"], [1, "w-full", "overflow-auto", "relative"], [1, "flex", "flex-col", "items-center", "justify-center", "p-12", "bg-gray-50", "rounded-lg"], [1, "absolute", "inset-0", "bg-white", "bg-opacity-75", "flex", "items-center", "justify-center", "z-10"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "hover:bg-slate-100", 3, "ngClass", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "emitChange", "pageSize", "page", "total", "pageCount"], [1, "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "p-2", "bg-white", "rounded-lg"], [1, "flex", "flex-row", "flex-wrap", "space-x-2", "items-center", "whitespace-nowrap"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", "disabled:bg-gray-100", "disabled:cursor-not-allowed", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], [1, "lg:flex", "hidden", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], ["matTooltip", "Click \u0111\u1EC3 l\u1ECDc \u0111\u01A1n \u0111\xE3 giao", 1, "p-2", "rounded-lg", "text-white", "bg-blue-600", "cursor-pointer", "hover:bg-blue-700", "transition-colors", 3, "click"], ["matTooltip", "Click \u0111\u1EC3 l\u1ECDc \u0111\u01A1n ch\u01B0a giao", 1, "p-2", "rounded-lg", "text-white", "bg-yellow-600", "cursor-pointer", "hover:bg-yellow-700", "transition-colors", 3, "click"], ["class", "flex flex-row items-center space-x-2", "color", "primary", "mat-flat-button", "", 3, "disabled", "click", 4, "ngIf"], ["mat-menu-item", "", 3, "click"], ["color", "primary", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", "space-x-2", 3, "click", "disabled"], [1, "py-2", "w-full", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng T\xECm Ki\u1EBFm", 3, "keyup"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "!text-6xl", "!w-24", "!h-24", "text-gray-400", "mb-4"], [1, "text-xl", "font-semibold", "text-gray-700", "mb-2"], [1, "text-gray-500", "text-center", "mb-4"], [1, "text-blue-600"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "ml-2"], [1, "flex", "flex-col", "items-center", "space-y-4"], ["diameter", "40"], [1, "text-sm", "text-gray-600"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"], [1, "max-w-40", "line-clamp-4", "flex", "items-center", 3, "click"], ["class", "material-symbols-outlined", 4, "ngIf"], [1, "material-symbols-outlined"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 1, "hover:bg-slate-100", 3, "click", "ngClass"], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"]], template: function ListPhieugiaohangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 7);
      \u0275\u0275template(5, ListPhieugiaohangComponent_div_5_Template, 27, 5, "div", 8)(6, ListPhieugiaohangComponent_div_6_Template, 8, 0, "div", 9);
      \u0275\u0275elementStart(7, "div", 10)(8, "mat-button-toggle-group", 11);
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_mat_button_toggle_group_ngModelChange_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Type, $event) || (ctx.SearchParams.Type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function ListPhieugiaohangComponent_Template_mat_button_toggle_group_change_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onTypeChange($event.value));
      });
      \u0275\u0275elementStart(9, "mat-button-toggle", 12);
      \u0275\u0275text(10, " All ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "mat-button-toggle", 13);
      \u0275\u0275text(12, " S\u1EC9 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-button-toggle", 14);
      \u0275\u0275text(14, " L\u1EBB ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "mat-form-field", 15)(16, "mat-label");
      \u0275\u0275text(17, "B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "input", 16);
      \u0275\u0275listener("dateChange", function ListPhieugiaohangComponent_Template_input_dateChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_input_ngModelChange_18_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "mat-datepicker-toggle", 17)(20, "mat-datepicker", null, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-form-field", 15)(23, "mat-label");
      \u0275\u0275text(24, "K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 16);
      \u0275\u0275listener("dateChange", function ListPhieugiaohangComponent_Template_input_dateChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange($event));
      });
      \u0275\u0275twoWayListener("ngModelChange", function ListPhieugiaohangComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(26, "mat-datepicker-toggle", 17)(27, "mat-datepicker", null, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 18);
      \u0275\u0275listener("click", function ListPhieugiaohangComponent_Template_button_click_29_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.searchData());
      });
      \u0275\u0275template(30, ListPhieugiaohangComponent_Conditional_30_Template, 1, 0, "mat-spinner", 19)(31, ListPhieugiaohangComponent_Conditional_31_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(32, "div", 20);
      \u0275\u0275template(33, ListPhieugiaohangComponent_Conditional_33_Template, 17, 0, "div", 21)(34, ListPhieugiaohangComponent_Conditional_34_Template, 5, 0, "div", 22);
      \u0275\u0275elementStart(35, "table", 23);
      \u0275\u0275repeaterCreate(36, ListPhieugiaohangComponent_For_37_Template, 3, 1, "ng-container", 24, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(38, ListPhieugiaohangComponent_tr_38_Template, 1, 0, "tr", 25)(39, ListPhieugiaohangComponent_tr_39_Template, 1, 3, "tr", 26)(40, ListPhieugiaohangComponent_tr_40_Template, 3, 0, "tr", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "app-sharepagination", 28);
      \u0275\u0275listener("emitChange", function ListPhieugiaohangComponent_Template_app_sharepagination_emitChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPageChange($event));
      });
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const pickerBatdau_r23 = \u0275\u0275reference(21);
      const pickerKetthuc_r24 = \u0275\u0275reference(28);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", !ctx.isSearch);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isSearch);
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Type);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(37, _c1))("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerBatdau_r23);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(38, _c1))("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerBatdau_r23)("disabled", ctx.isLoading());
      \u0275\u0275advance(3);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("matDatepicker", pickerKetthuc_r24);
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(39, _c1))("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275property("for", pickerKetthuc_r24)("disabled", ctx.isLoading());
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading());
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 30 : 31);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(!ctx.isLoading() && ctx.total() === 0 ? 33 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isLoading() ? 34 : -1);
      \u0275\u0275advance();
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSize", ctx.pageSize())("page", ctx.page())("total", ctx.total())("pageCount", ctx.pageCount());
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
    SharepaginationComponent,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListPhieugiaohangComponent, { className: "ListPhieugiaohangComponent", filePath: "src/app/admin/phieugiaohang/listphieugiaohang/listphieugiaohang.component.ts", lineNumber: 74 });
})();

export {
  LoadingUtils,
  ListPhieugiaohangComponent
};
//# sourceMappingURL=chunk-OFJGVJTT.mjs.map
