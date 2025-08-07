import {
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import {
  MatDatepickerModule
} from "./chunk-S32RIQSG.js";
import {
  MatPaginatorModule,
  MatSortModule,
  MatTableModule
} from "./chunk-JFLWRVXN.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenu,
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
  MatFormFieldModule,
  MatInputModule,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import {
  EventEmitter,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-IHZ7YO24.js";

// src/app/shared/common/searchfilter/searchfilter.component.ts
function SearchfilterComponent_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 2, 1);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const menu_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("matMenuTriggerFor", menu_r3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2(" ", ctx_r1.CountItems, " ", ctx_r1.title, " ");
  }
}
function SearchfilterComponent_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "button", 3, 1)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    const menu_r3 = \u0275\u0275reference(3);
    \u0275\u0275property("matMenuTriggerFor", menu_r3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.icon);
  }
}
function SearchfilterComponent_For_20_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function SearchfilterComponent_For_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275listener("click", function SearchfilterComponent_For_20_Template_div_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r5));
    });
    \u0275\u0275template(1, SearchfilterComponent_For_20_Conditional_1_Template, 2, 0, "span", 18);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.CheckItem(item_r5) ? 1 : -1);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r5[ctx_r1.fieldsearch] || "(Tr\u1ED1ng)", " ");
  }
}
var SearchfilterComponent = class _SearchfilterComponent {
  ListItem = [];
  filterItem = [];
  ListFilter = [];
  CountItems = 0;
  icon = "";
  title = "Items";
  fieldsearch = "title";
  isEdit = signal(false);
  isDelete = signal(false);
  OutFilter = new EventEmitter();
  menuTrigger;
  searchText = "";
  initFilter = [];
  ngOnInit() {
    this.initFilter = this.filterItem;
  }
  trackByFn(index, item) {
    return item.id;
  }
  ChosenAll() {
    this.ListFilter = this.ListItem;
    this.filterItem = this.initFilter;
  }
  RemoveAll() {
    this.ListFilter = [];
    this.filterItem = this.initFilter;
    this.searchText = "";
  }
  CheckItem(item) {
    return this.ListFilter?.find((v) => v.id === item.id) ? true : false;
  }
  doFilterItem(event, field) {
    const value = event.target.value;
    this.searchText = value;
    if (!value) {
      this.filterItem = this.initFilter;
      return;
    }
    this.filterItem = this.initFilter.filter((v) => removeVietnameseAccents(v[field]).includes(value.toLowerCase()) || v[field].toLowerCase().includes(value.toLowerCase()));
  }
  DoListFilter() {
    const uniqueMap = /* @__PURE__ */ new Map();
    this.ListFilter.forEach((item) => {
      const key = item[this.fieldsearch];
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    this.filterItem = Array.from(uniqueMap.values());
  }
  getChosen() {
    const uniqueMap = /* @__PURE__ */ new Map();
    this.ListFilter.forEach((item) => {
      const key = item[this.fieldsearch];
      if (!uniqueMap.has(key)) {
        uniqueMap.set(key, item);
      }
    });
    return Array.from(uniqueMap.values()).length;
  }
  ChosenItem(item) {
    console.log("ListFilter", this.ListFilter);
    const value = item[this.fieldsearch];
    const CheckItem = this.ListItem.filter((v) => v[this.fieldsearch] === value);
    const CheckItem1 = this.ListFilter.filter((v) => v[this.fieldsearch] === value);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter?.filter((v) => v[this.fieldsearch] !== value);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ApplyFilterColum(menu) {
    this.OutFilter.emit(this.ListFilter);
    menu.closeMenu();
  }
  static \u0275fac = function SearchfilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchfilterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchfilterComponent, selectors: [["app-searchfilter"]], viewQuery: function SearchfilterComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatMenuTrigger, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.menuTrigger = _t.first);
    }
  }, inputs: { ListItem: "ListItem", filterItem: "filterItem", ListFilter: "ListFilter", CountItems: "CountItems", icon: "icon", title: "title", fieldsearch: "fieldsearch", isEdit: "isEdit", isDelete: "isDelete" }, outputs: { OutFilter: "OutFilter" }, decls: 26, vars: 4, consts: [["menu", "matMenu"], ["menuTrigger", "matMenuTrigger"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], ["mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "ngModelChange", "keyup", "ngModel"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], [1, "material-symbols-outlined", "text-blue-600"]], template: function SearchfilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275template(0, SearchfilterComponent_Conditional_0_Template, 3, 4, "button", 2)(1, SearchfilterComponent_Conditional_1_Template, 4, 2, "button", 3);
      \u0275\u0275elementStart(2, "mat-menu", null, 0)(4, "div", 4);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_div_click_4_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(5, "div", 5)(6, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function SearchfilterComponent_Template_input_ngModelChange_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.searchText, $event) || (ctx.searchText = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("keyup", function SearchfilterComponent_Template_input_keyup_6_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterItem($event, ctx.fieldsearch));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 7)(8, "span", 8);
      \u0275\u0275text(9, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "span", 11);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_12_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ChosenAll());
      });
      \u0275\u0275text(13, "Ch\u1ECDn T\u1EA5t C\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span", 11);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.RemoveAll());
      });
      \u0275\u0275text(15, "Xo\xE1");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "span", 11);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_16_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.DoListFilter());
      });
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "div", 12);
      \u0275\u0275repeaterCreate(19, SearchfilterComponent_For_20_Template, 3, 2, "div", 13, ctx.trackByFn, true);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 14)(22, "button", 15);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.menuTrigger.closeMenu());
      });
      \u0275\u0275text(23, "\u0110\xF3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 16);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ApplyFilterColum(ctx.menuTrigger));
      });
      \u0275\u0275text(25, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275conditional(!ctx.icon ? 0 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.icon ? 1 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchText);
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate1("", ctx.getChosen(), " \u0110ang ch\u1ECDn");
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.filterItem);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatSortModule,
    MatPaginatorModule,
    MatTableModule,
    MatMenuModule,
    MatMenu,
    MatMenuTrigger
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchfilterComponent, { className: "SearchfilterComponent", filePath: "src/app/shared/common/searchfilter/searchfilter.component.ts", lineNumber: 39 });
})();

export {
  SearchfilterComponent
};
//# sourceMappingURL=chunk-X7ROAIMK.js.map
