import './polyfills.server.mjs';
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-DX7YIIY5.mjs";
import {
  RouterOutlet
} from "./chunk-TLYIA537.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import "./chunk-K6ADGRHN.mjs";
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import "./chunk-UP6A7POK.mjs";
import {
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/sitemain/sitemain.component.ts
var SitemainComponent = class _SitemainComponent {
  storageService;
  template = 1;
  constructor(storageService) {
    this.storageService = storageService;
  }
  ngOnInit() {
    this.template = this.storageService.getItem("teamplate");
    if (this.template == null) {
      console.log("teamplate1", this.template);
    } else {
      console.log("teamplate2", this.template);
    }
  }
  static \u0275fac = function SitemainComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SitemainComponent)(\u0275\u0275directiveInject(StorageService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SitemainComponent, selectors: [["app-sitemain"]], decls: 7, vars: 0, consts: [["drawer", ""], ["autosize", "", 1, "example-container"], ["mode", "side", 1, "example-sidenav"], [1, "example-sidenav-content"], [1, "w-full", "h-full", "flex", "flex-col"]], template: function SitemainComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-drawer-container", 1)(1, "mat-drawer", 2, 0);
      \u0275\u0275text(3, " sdfsfs ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3)(5, "div", 4);
      \u0275\u0275element(6, "router-outlet");
      \u0275\u0275elementEnd()()();
    }
  }, dependencies: [
    // HeaderComponent,
    // FooterComponent,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SitemainComponent, { className: "SitemainComponent", filePath: "src/app/site/sitemain/sitemain.component.ts", lineNumber: 18 });
})();
export {
  SitemainComponent
};
//# sourceMappingURL=chunk-TT4UDW4Q.mjs.map
