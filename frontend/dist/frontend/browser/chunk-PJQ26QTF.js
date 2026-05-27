import {
  ActivatedRoute,
  Router
} from "./chunk-2GXGFE2W.js";
import {
  MatCard,
  MatCardActions,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-M6ODRG7P.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-FL6G6YYX.js";
import "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule
} from "./chunk-TAI2MURD.js";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵtext,
  ɵɵtextInterpolate1
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/admin/dashboard/baocaodoanhthu.component.ts
var BaocaodoanhtuComponent = class _BaocaodoanhtuComponent {
  route;
  router;
  timeFrame = "";
  startDate = "";
  endDate = "";
  constructor(route, router) {
    this.route = route;
    this.router = router;
  }
  ngOnInit() {
    this.route.queryParams.subscribe((params) => {
      this.timeFrame = params["timeFrame"] || "Kh\xF4ng x\xE1c \u0111\u1ECBnh";
      this.startDate = params["startDate"] || "";
      this.endDate = params["endDate"] || "";
    });
  }
  goBack() {
    this.router.navigate(["/admin/dashboard"]);
  }
  static \u0275fac = function BaocaodoanhtuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaocaodoanhtuComponent)(\u0275\u0275directiveInject(ActivatedRoute), \u0275\u0275directiveInject(Router));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BaocaodoanhtuComponent, selectors: [["app-baocaodoanhthu"]], decls: 44, vars: 3, consts: [[1, "revenue-report-container"], [1, "report-info"], [1, "under-development"], ["mat-raised-button", "", "color", "primary", 3, "click"]], template: function BaocaodoanhtuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title");
      \u0275\u0275text(4, "B\xE1o C\xE1o Doanh Thu Chi Ti\u1EBFt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "mat-card-subtitle");
      \u0275\u0275text(6, "Ph\xE2n t\xEDch chi ti\u1EBFt doanh thu theo th\u1EDDi gian");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 1)(9, "p")(10, "strong");
      \u0275\u0275text(11, "Kho\u1EA3ng th\u1EDDi gian:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "p")(14, "strong");
      \u0275\u0275text(15, "T\u1EEB ng\xE0y:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "p")(18, "strong");
      \u0275\u0275text(19, "\u0110\u1EBFn ng\xE0y:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "div", 2)(22, "mat-icon");
      \u0275\u0275text(23, "construction");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "h3");
      \u0275\u0275text(25, "\u0110ang ph\xE1t tri\u1EC3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "p");
      \u0275\u0275text(27, "Trang b\xE1o c\xE1o doanh thu chi ti\u1EBFt \u0111ang \u0111\u01B0\u1EE3c ph\xE1t tri\u1EC3n.");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "p");
      \u0275\u0275text(29, "S\u1EBD bao g\u1ED3m:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "ul")(31, "li");
      \u0275\u0275text(32, "B\xE1o c\xE1o doanh thu theo s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "li");
      \u0275\u0275text(34, "B\xE1o c\xE1o doanh thu theo kh\xE1ch h\xE0ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "li");
      \u0275\u0275text(36, "Bi\u1EC3u \u0111\u1ED3 ph\xE2n t\xEDch xu h\u01B0\u1EDBng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "li");
      \u0275\u0275text(38, "Xu\u1EA5t b\xE1o c\xE1o Excel/PDF");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(39, "mat-card-actions")(40, "button", 3);
      \u0275\u0275listener("click", function BaocaodoanhtuComponent_Template_button_click_40_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "arrow_back");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " Quay l\u1EA1i Dashboard ");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275textInterpolate1(" ", ctx.timeFrame, "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.startDate, "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.endDate, "");
    }
  }, dependencies: [
    CommonModule,
    MatCardModule,
    MatCard,
    MatCardActions,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n.revenue-report-container[_ngcontent-%COMP%] {\n  padding: 24px;\n  max-width: 800px;\n  margin: 0 auto;\n}\n.report-info[_ngcontent-%COMP%] {\n  background-color: #f5f5f5;\n  padding: 16px;\n  border-radius: 8px;\n  margin-bottom: 24px;\n}\n.under-development[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 48px 24px;\n  color: #666;\n}\n.under-development[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 64px;\n  width: 64px;\n  height: 64px;\n  color: #ff9800;\n  margin-bottom: 16px;\n}\n.under-development[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 16px;\n}\n.under-development[_ngcontent-%COMP%]   ul[_ngcontent-%COMP%] {\n  text-align: left;\n  display: inline-block;\n  margin-top: 16px;\n}\n.under-development[_ngcontent-%COMP%]   li[_ngcontent-%COMP%] {\n  margin-bottom: 8px;\n}\n/*# sourceMappingURL=baocaodoanhthu.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BaocaodoanhtuComponent, { className: "BaocaodoanhtuComponent", filePath: "src/app/admin/dashboard/baocaodoanhthu.component.ts", lineNumber: 97 });
})();
export {
  BaocaodoanhtuComponent
};
//# sourceMappingURL=chunk-PJQ26QTF.js.map
