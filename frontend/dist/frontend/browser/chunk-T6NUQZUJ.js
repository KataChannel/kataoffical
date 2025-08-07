import {
  StorageService
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  Router
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/site/lienheadmin/lienheadmin.component.ts
var LienheadminComponent = class _LienheadminComponent {
  _StorageService = inject(StorageService);
  _route = inject(Router);
  constructor() {
  }
  ngOnInit() {
    const permission = this._StorageService.getItem("permissions");
    console.log(JSON.parse(permission));
    const target = JSON.parse(permission)[0];
    console.log(target);
    if (target !== null) {
      this._route.navigate(["admin/", target.split(".")[0]]);
    }
  }
  static \u0275fac = function LienheadminComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LienheadminComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LienheadminComponent, selectors: [["app-lienheadmin"]], decls: 8, vars: 0, consts: [[1, "bg-gray-100", "flex", "items-center", "justify-center", "h-screen"], [1, "text-center"], [1, "text-9xl", "font-bold", "text-gray-800"], [1, "text-2xl", "text-gray-600", "mt-4"], [1, "text-gray-500", "mt-2"]], template: function LienheadminComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "h1", 2);
      \u0275\u0275text(3, "Th\xF4ng B\xE1o");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "p", 3);
      \u0275\u0275text(5, "R\u1EA5t ti\u1EBFc! B\u1EA1n Ch\u01B0a \u0110\u01B0\u1EE3c Ph\xE2n Quy\u1EC1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 4);
      \u0275\u0275text(7, "Vui l\xF2ng li\xEAn h\u1EC7 admin \u0111\u1EC3 \u0111\u01B0\u1EE3c c\u1EA5p quy\u1EC1n. Zalo : 0977272967");
      \u0275\u0275elementEnd()()();
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LienheadminComponent, { className: "LienheadminComponent", filePath: "src/app/site/lienheadmin/lienheadmin.component.ts", lineNumber: 11 });
})();
export {
  LienheadminComponent
};
//# sourceMappingURL=chunk-T6NUQZUJ.js.map
