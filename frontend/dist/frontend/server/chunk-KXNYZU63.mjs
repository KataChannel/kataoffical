import './polyfills.server.mjs';
import {
  Danhmucs
} from "./chunk-BQ55RXPC.mjs";
import {
  Baiviets
} from "./chunk-UN64IF4W.mjs";
import {
  BreadscrumbComponent
} from "./chunk-GOPZFVLD.mjs";
import {
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import {
  MatButtonModule
} from "./chunk-2QXHUJNF.mjs";
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  ActivatedRoute
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule
} from "./chunk-H3GF4RFC.mjs";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnamespaceHTML,
  ɵɵnamespaceSVG,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/danhmucbaiviet/danhmucbaiviet.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DanhmucbaivietComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function DanhmucbaivietComponent_For_22_Template_div_click_0_listener() {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.DoFilterDanhmuc(item_r2));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 12)(2, "g", 13);
    \u0275\u0275element(3, "path", 14)(4, "path", 15)(5, "path", 16);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("", ctx_r2.FilterDanhmuc.id == item_r2.id ? "bg-[#F7E6E9]" : "", " flex flex-row space-x-1 items-center p-2 rounded-lg hover:bg-slate-100");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r2.Title);
  }
}
function DanhmucbaivietComponent_For_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 20)(1, "div", 23);
    \u0275\u0275element(2, "img", 24);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 25)(4, "h3", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275element(6, "div", 27);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("href", item_r4.Slug + "-" + item_r4.View, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275property("src", item_r4.Image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r4.Title);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r4.Mota, \u0275\u0275sanitizeHtml);
  }
}
function DanhmucbaivietComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 11);
    \u0275\u0275listener("click", function DanhmucbaivietComponent_For_32_Template_div_click_0_listener() {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.DoFilterDanhmuc(item_r6));
    });
    \u0275\u0275element(1, "img", 28);
    \u0275\u0275elementStart(2, "span", 29);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("", ctx_r2.FilterDanhmuc.id == item_r6.id ? "bg-[#F7E6E9]" : "", " flex flex-row space-x-4 p-2 rounded-lg hover:bg-slate-100");
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r6.Image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.Title);
  }
}
var DanhmucbaivietComponent = class _DanhmucbaivietComponent {
  route;
  Baiviet = {};
  Danhmucs = Danhmucs.filter((v) => v.Type == "baiviet");
  Baiviets = Baiviets;
  FilterDanhmuc = 0;
  FilterBaiviets = Baiviets;
  FilterType = [
    { id: 1, Title: "M\u1EDBi Nh\u1EA5t", Value: "new" },
    { id: 2, Title: "Gi\xE1 Th\u1EA5p - Cao", Value: "asc" },
    { id: 3, Title: "Gi\xE1 Cao - Th\u1EA5p", Value: "desc" },
    { id: 4, Title: "Gi\u1EA3m Gi\xE1", Value: "discount" }
  ];
  Breadcrumbs = [];
  constructor(route) {
    this.route = route;
  }
  ngOnInit() {
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/listsanpham" }
    ];
    const slugDM = this.route.snapshot.paramMap.get("slug");
    const result = slugDM?.split("-v4")[0];
    console.log(result);
    const Danhmuc = this.Danhmucs.find((v) => v.Slug == result);
    console.log(Danhmuc);
    if (!Danhmuc) {
      location.href = "/404";
      return;
    }
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.FilterBaiviets = this.Baiviets.filter((v) => v.Title.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }
  DoFilterDanhmuc(item) {
    console.log(item.idSP);
    this.FilterDanhmuc = item;
    this.FilterBaiviets = this.Baiviets.filter((v) => item.idSP.includes(v.id));
  }
  static \u0275fac = function DanhmucbaivietComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DanhmucbaivietComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DanhmucbaivietComponent, selectors: [["app-danhmucbaiviet"]], decls: 33, vars: 4, consts: [[1, "w-full", "flex", "flex-col", "space-y-2", "items-center"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-96", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "text-4xl", "font-bold"], [1, "flex", "flex-row", "space-x-2", "p-2", "justify-center"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "p-2", "flex", "flex-row", "justify-center", "py-8"], [1, "flex", "flex-col", "space-y-4"], [1, "whitespace-nowrap", "border", "cursor-pointer", "rounded-lg", "p-4", "flex", "flex-col", "space-y-2"], [1, "!m-0"], [3, "click"], ["xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "aria-hidden", "true", "role", "img", "width", "18", "height", "18", "viewBox", "0 0 24 24", 1, "iconify", "iconify--solar"], ["fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877"], ["stroke-linecap", "round", "d", "M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"], ["d", "M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"], [3, "class"], [1, "w-full", "flex", "flex-col", "space-y-8", "px-8"], [1, "grid", "grid-cols-3", "gap-8"], [1, "cursor-pointer", "border", "flex", "flex-col", "space-y-2", "rounded-lg", "overflow-hidden", "w-full", 3, "href"], [1, "max-w-60", "flex", "flex-col", "space-y-4"], [1, "border", "cursor-pointer", "rounded-lg", "p-4", "flex", "flex-col", "space-y-2"], [1, "h-40", "w-full", "overflow-hidden"], ["alt", "", "srcset", "", 1, "w-full", "object-cover", "hover:scale-125", "transition-transform", "duration-300", 3, "src"], [1, "px-4", "py-2", "flex", "flex-col", "space-y-2"], [1, "!m-0", "line-clamp-2", "h-12", "text-lg", "font-bold", "hover:text-[#57A345]", "hover:font-extrabold"], [1, "line-clamp-3", "text-xs", 3, "innerHTML"], ["alt", "", "srcset", "", 1, "h-14", "w-14", "rounded-lg", "object-cover", 3, "src"], [1, "line-clamp-3", "font-bold", "hover:text-[#57A345]"]], template: function DanhmucbaivietComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5, "Tin T\u1EE9c S\u1EF1 Ki\u1EC7n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275element(7, "app-breadscrumb", 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8)(10, "div", 9)(11, "h2", 10);
      \u0275\u0275text(12, "Danh M\u1EE5c");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 11);
      \u0275\u0275listener("click", function DanhmucbaivietComponent_Template_div_click_13_listener() {
        ctx.FilterBaiviets = ctx.Baiviets;
        return ctx.FilterDanhmuc = 0;
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(14, "svg", 12)(15, "g", 13);
      \u0275\u0275element(16, "path", 14)(17, "path", 15)(18, "path", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(19, "span");
      \u0275\u0275text(20, "T\u1EA5t C\u1EA3");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(21, DanhmucbaivietComponent_For_22_Template, 8, 4, "div", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 18)(24, "div", 19);
      \u0275\u0275repeaterCreate(25, DanhmucbaivietComponent_For_26_Template, 7, 4, "a", 20, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 21)(28, "div", 22)(29, "h2", 10);
      \u0275\u0275text(30, "B\xE0i Vi\u1EBFt Hot ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(31, DanhmucbaivietComponent_For_32_Template, 4, 5, "div", 17, _forTrack0);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(6);
      \u0275\u0275classMapInterpolate1("", ctx.FilterDanhmuc == 0 ? "bg-[#F7E6E9]" : "", " flex flex-row space-x-1 items-center p-2 rounded-lg hover:bg-slate-100");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.Danhmucs);
      \u0275\u0275advance(4);
      \u0275\u0275repeater(ctx.FilterBaiviets);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.Baiviets);
    }
  }, dependencies: [
    BreadscrumbComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DanhmucbaivietComponent, { className: "DanhmucbaivietComponent", filePath: "src/app/site/danhmucbaiviet/danhmucbaiviet.component.ts", lineNumber: 28 });
})();
export {
  DanhmucbaivietComponent
};
//# sourceMappingURL=chunk-KXNYZU63.mjs.map
