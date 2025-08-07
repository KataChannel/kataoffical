import './polyfills.server.mjs';
import {
  RouterLink
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule
} from "./chunk-H3GF4RFC.mjs";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-4EQURZBD.mjs";

// src/app/shared/common/breadscrumb/breadscrumb.component.ts
function BreadscrumbComponent_For_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 2);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.name);
  }
}
function BreadscrumbComponent_For_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 3);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("routerLink", item_r1.link);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r1.name, " ");
  }
}
function BreadscrumbComponent_For_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "/");
    \u0275\u0275elementEnd();
  }
}
function BreadscrumbComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275template(1, BreadscrumbComponent_For_2_Conditional_1_Template, 2, 1, "span", 2)(2, BreadscrumbComponent_For_2_Conditional_2_Template, 2, 2, "a", 3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, BreadscrumbComponent_For_2_Conditional_3_Template, 2, 0, "span");
  }
  if (rf & 2) {
    const \u0275$index_3_r2 = ctx.$index;
    const \u0275$count_3_r3 = ctx.$count;
    \u0275\u0275advance();
    \u0275\u0275conditional(\u0275$index_3_r2 === \u0275$count_3_r3 - 1 ? 1 : 2);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(\u0275$index_3_r2 === \u0275$count_3_r3 - 1) ? 3 : -1);
  }
}
var BreadscrumbComponent = class _BreadscrumbComponent {
  Breadcrumbs = [];
  constructor() {
    console.log("Breadcrumbs", this.Breadcrumbs);
  }
  static \u0275fac = function BreadscrumbComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BreadscrumbComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BreadscrumbComponent, selectors: [["app-breadscrumb"]], inputs: { Breadcrumbs: "Breadcrumbs" }, decls: 3, vars: 0, consts: [[1, "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2", "px-8"], [1, "lg:max-w-40", "max-w-32", "breadcrumb-item", "truncate"], [1, "truncate", "p-2", "font-bold", "text-red-500"], [1, "truncate", 3, "routerLink"]], template: function BreadscrumbComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, BreadscrumbComponent_For_2_Template, 4, 2, null, null, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.Breadcrumbs);
    }
  }, dependencies: [
    RouterLink,
    CommonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BreadscrumbComponent, { className: "BreadscrumbComponent", filePath: "src/app/shared/common/breadscrumb/breadscrumb.component.ts", lineNumber: 14 });
})();

export {
  BreadscrumbComponent
};
//# sourceMappingURL=chunk-GOPZFVLD.mjs.map
