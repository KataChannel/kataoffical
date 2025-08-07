import './polyfills.server.mjs';
import {
  MatMenu,
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
  EventEmitter,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";

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

export {
  SharepaginationComponent
};
//# sourceMappingURL=chunk-KG6RBMPF.mjs.map
