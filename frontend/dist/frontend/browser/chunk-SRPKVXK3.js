import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-W6W5IZUE.js";
import {
  RouterOutlet
} from "./chunk-I3HWRSST.js";
import {
  StorageService
} from "./chunk-S5TWTPVL.js";
import "./chunk-7TLPKC3B.js";
import "./chunk-PBFAMPOS.js";
import "./chunk-C5TB4WSU.js";
import "./chunk-EXJ7KYIY.js";
import "./chunk-JCKTSD6E.js";
import "./chunk-2QF354AD.js";
import "./chunk-WSR5IJUW.js";
import "./chunk-2VHAU5LM.js";
import {
  ɵsetClassDebugInfo,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵtext
} from "./chunk-FWM3YOMT.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

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
//# sourceMappingURL=chunk-SRPKVXK3.js.map
