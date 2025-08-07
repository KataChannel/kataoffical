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
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  EventEmitter,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/shared/common/searchfilter123/searchfilter.component.ts
function SearchfilterComponent_div_20_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 18);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function SearchfilterComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 16);
    \u0275\u0275listener("click", function SearchfilterComponent_div_20_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r3));
    });
    \u0275\u0275template(1, SearchfilterComponent_div_20_span_1_Template, 2, 0, "span", 17);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r3));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r3[ctx_r3.fieldsearch], " ");
  }
}
var SearchfilterComponent = class _SearchfilterComponent {
  ListItem = [];
  filterItem = [];
  ListFilter = [];
  CountItems = 0;
  title = "Items";
  fieldsearch = "title";
  isEdit = signal(false);
  isDelete = signal(false);
  OutFilter = new EventEmitter();
  trackByFn(index, item) {
    return item.id;
  }
  ChosenAll() {
    this.ListFilter = this.ListItem;
  }
  RemoveAll() {
    this.ListFilter = [];
    this.filterItem = this.ListItem;
  }
  doFilterItem(event, field) {
    const value = event.target.value;
    this.filterItem = this.ListItem.filter((v) => removeVietnameseAccents(v[field]).includes(value.toLowerCase()) || v[field].toLowerCase().includes(value.toLowerCase()));
  }
  DoListFilter() {
    this.filterItem = this.ListFilter;
  }
  ChosenItem(item) {
    const CheckItem = this.filterItem.filter((v) => v.id === item.id);
    const CheckItem1 = this.ListFilter.filter((v) => v.id === item.id);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter?.filter((v) => v.id !== item.id);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  CheckItem(item) {
    return this.ListFilter?.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.OutFilter.emit(this.ListFilter);
    menu.closeMenu();
  }
  static \u0275fac = function SearchfilterComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SearchfilterComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SearchfilterComponent, selectors: [["app-searchfilter"]], inputs: { ListItem: "ListItem", filterItem: "filterItem", ListFilter: "ListFilter", CountItems: "CountItems", title: "title", fieldsearch: "fieldsearch", isEdit: "isEdit", isDelete: "isDelete" }, outputs: { OutFilter: "OutFilter" }, decls: 26, vars: 7, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["mat-flat-button", "", "color", "primary", 3, "disabled", "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"]], template: function SearchfilterComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "button", 2, 0);
      \u0275\u0275text(2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "mat-menu", null, 1)(5, "div", 3);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_div_click_5_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(6, "div", 4)(7, "input", 5);
      \u0275\u0275listener("keyup", function SearchfilterComponent_Template_input_keyup_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterItem($event, ctx.fieldsearch));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6)(9, "span", 7);
      \u0275\u0275text(10, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "div", 8)(12, "div", 9)(13, "span", 10);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ChosenAll());
      });
      \u0275\u0275text(14, "Ch\u1ECDn T\u1EA5t C\u1EA3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "span", 10);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.RemoveAll());
      });
      \u0275\u0275text(16, "Xo\xE1");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "span", 10);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_span_click_17_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.DoListFilter());
      });
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 11);
      \u0275\u0275template(20, SearchfilterComponent_div_20_Template, 3, 2, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 13)(22, "button", 14);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_button_click_22_listener() {
        \u0275\u0275restoreView(_r1);
        const menuTrigger_r5 = \u0275\u0275reference(1);
        return \u0275\u0275resetView(menuTrigger_r5.closeMenu());
      });
      \u0275\u0275text(23, "\u0110\xF3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "button", 15);
      \u0275\u0275listener("click", function SearchfilterComponent_Template_button_click_24_listener() {
        \u0275\u0275restoreView(_r1);
        const menuTrigger_r5 = \u0275\u0275reference(1);
        return \u0275\u0275resetView(ctx.ApplyFilterColum(menuTrigger_r5));
      });
      \u0275\u0275text(25, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      const menu_r6 = \u0275\u0275reference(4);
      \u0275\u0275property("disabled", !ctx.isEdit())("matMenuTriggerFor", menu_r6);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate2(" ", ctx.CountItems, " ", ctx.title, "\n");
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1("", ctx.ListFilter.length || 0, " \u0110ang ch\u1ECDn");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.filterItem)("ngForTrackBy", ctx.trackByFn);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    MatButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SearchfilterComponent, { className: "SearchfilterComponent", filePath: "src/app/shared/common/searchfilter123/searchfilter.component.ts", lineNumber: 39 });
})();
export {
  SearchfilterComponent
};
//# sourceMappingURL=chunk-HOSLV6EC.js.map
