import {
  ActivatedRoute
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext,
  ɵɵtextInterpolate2
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/site/notfound/notfound.component.ts
var NotfoundComponent = class _NotfoundComponent {
  route;
  constructor(route) {
    this.route = route;
  }
  message = {};
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      if (params["data"]) {
        this.message = JSON.parse(params["data"]);
      }
    });
  }
  static \u0275fac = function NotfoundComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NotfoundComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NotfoundComponent, selectors: [["app-notfound"]], decls: 12, vars: 2, consts: [[1, "bg-gray-100", "flex", "items-center", "justify-center", "h-screen"], [1, "text-center"], [1, "text-9xl", "font-bold", "text-gray-800"], [1, "text-2xl", "text-gray-600", "mt-4"], [1, "text-gray-500", "mt-2"], [1, "text-red-600"], ["href", "/", 1, "mt-6", "inline-block", "px-6", "py-3", "bg-blue-600", "text-white", "font-semibold", "rounded-lg", "hover:bg-blue-700", "transition", "duration-300"]], template: function NotfoundComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "404");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "R\u1EA5t ti\u1EBFc! Kh\xF4ng t\xECm th\u1EA5y trang.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Trang b\u1EA1n \u0111ang t\xECm ki\u1EBFm kh\xF4ng t\u1ED3n t\u1EA1i ho\u1EB7c \u0111\xE3 b\u1ECB di chuy\u1EC3n.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "a", 6);
      \u0275\u0275text(11, " Tr\u1EDF v\u1EC1 Trang ch\u1EE7 ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate2("", ctx.message.code, " - ", ctx.message.title, "");
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NotfoundComponent, { className: "NotfoundComponent", filePath: "src/app/site/notfound/notfound.component.ts", lineNumber: 10 });
})();
export {
  NotfoundComponent
};
//# sourceMappingURL=chunk-OL5DWLVR.js.map
