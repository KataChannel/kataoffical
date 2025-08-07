import './polyfills.server.mjs';
import {
  Sanphams
} from "./chunk-GFYCZKXS.mjs";
import {
  BreadscrumbComponent
} from "./chunk-GOPZFVLD.mjs";
import {
  GoogleSheetService
} from "./chunk-TGADPWSB.mjs";
import {
  ConvertDriveData
} from "./chunk-I23Q342N.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatPrefix
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-QFPTY5IH.mjs";
import "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButtonModule,
  MatIconButton
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
  inject,
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
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/danhmuc/danhmuc.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function DanhmucComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12);
    \u0275\u0275listener("click", function DanhmucComponent_For_24_Template_div_click_0_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.DoFilterDanhmuc(item_r3));
    });
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13)(2, "g", 14);
    \u0275\u0275element(3, "path", 15)(4, "path", 16)(5, "path", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("", ctx_r3.FilterDanhmuc.id == item_r3.id ? "bg-[#F7E6E9]" : "", " flex flex-row space-x-1 items-center p-2 rounded-lg hover:bg-slate-100");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r3.Title);
  }
}
function DanhmucComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275namespaceSVG();
    \u0275\u0275elementStart(1, "svg", 13)(2, "g", 14);
    \u0275\u0275element(3, "path", 15)(4, "path", 16)(5, "path", 17);
    \u0275\u0275elementEnd()();
    \u0275\u0275namespaceHTML();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(item_r5.Title);
  }
}
function DanhmucComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "a", 27)(1, "div", 28);
    \u0275\u0275element(2, "img", 29);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 30)(4, "h3", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 32)(7, "span", 33);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 34)(10, "mat-icon");
    \u0275\u0275text(11, "shopping_cart");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    \u0275\u0275property("href", item_r6.Slug + "-v1", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r6.Title);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r6.Gia || "Li\xEAn H\u1EC7");
  }
}
var DanhmucComponent = class _DanhmucComponent {
  route;
  Sanpham = {};
  Danhmucs = [];
  // Danhmucs: any[]=Danhmucs.filter((v)=>v.Type=="sanpham");
  Sanphams = Sanphams;
  FilterDanhmuc = 0;
  FilterSanphams = Sanphams;
  FilterType = [
    { id: 1, Title: "M\u1EDBi Nh\u1EA5t", Value: "new" },
    { id: 2, Title: "Gi\xE1 Th\u1EA5p - Cao", Value: "asc" },
    { id: 3, Title: "Gi\xE1 Cao - Th\u1EA5p", Value: "desc" },
    { id: 4, Title: "Gi\u1EA3m Gi\xE1", Value: "discount" }
  ];
  Breadcrumbs = [];
  _GoogleSheetService = inject(GoogleSheetService);
  constructor(route) {
    this.route = route;
  }
  ngOnInit() {
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/listsanpham" }
    ];
    const ListSheets = JSON.parse(localStorage.getItem("ListSheets") || "[]");
    if (ListSheets.length > 0) {
      const CheckSheet = ListSheets.find((v) => v.SheetName === "Danhmuc");
      if (CheckSheet) {
        this._GoogleSheetService.getDrive(CheckSheet).then((result2) => {
          if (result2.values.length > 0) {
            this.Danhmucs = ConvertDriveData(result2.values).filter((v) => v.Type == "sanpham");
            ;
          }
        });
      }
    }
    const slugDM = this.route.snapshot.paramMap.get("slug");
    const result = slugDM?.split("-v2")[0];
    console.log(result);
    const Danhmuc = this.Danhmucs.find((v) => v.Slug == result);
    console.log(Danhmuc);
    if (!Danhmuc) {
      return;
    }
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.FilterSanphams = this.Sanphams.filter((v) => v.Title.toLowerCase().includes(filterValue.trim().toLowerCase()));
  }
  DoFilterDanhmuc(item) {
    console.log(item.idSP);
    this.FilterDanhmuc = item;
    this.FilterSanphams = this.Sanphams.filter((v) => item.idSP.includes(v.id));
  }
  static \u0275fac = function DanhmucComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DanhmucComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DanhmucComponent, selectors: [["app-danhmuc"]], decls: 43, vars: 5, consts: [["input", ""], [1, "w-full", "flex", "flex-col", "space-y-2", "items-center"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-96", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "text-4xl", "font-bold"], [1, "text-lg"], [1, "flex", "flex-row", "space-x-2", "p-2", "justify-center"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "p-2", "flex", "flex-row", "justify-center", "py-8"], [1, "flex", "flex-col", "space-y-4"], [1, "whitespace-nowrap", "border", "cursor-pointer", "rounded-lg", "p-4", "flex", "flex-col", "space-y-2"], [3, "click"], ["xmlns", "http://www.w3.org/2000/svg", 0, "xmlns", "xlink", "http://www.w3.org/1999/xlink", "aria-hidden", "true", "role", "img", "width", "18", "height", "18", "viewBox", "0 0 24 24", 1, "iconify", "iconify--solar"], ["fill", "none", "stroke", "currentColor", "stroke-width", "1.5"], ["d", "M16 4.002c2.175.012 3.353.109 4.121.877C21 5.758 21 7.172 21 10v6c0 2.829 0 4.243-.879 5.122C19.243 22 17.828 22 15 22H9c-2.828 0-4.243 0-5.121-.878C3 20.242 3 18.829 3 16v-6c0-2.828 0-4.242.879-5.121c.768-.768 1.946-.865 4.121-.877"], ["stroke-linecap", "round", "d", "M10.5 14H17M7 14h.5M7 10.5h.5m-.5 7h.5m3-7H17m-6.5 7H17"], ["d", "M8 3.5A1.5 1.5 0 0 1 9.5 2h5A1.5 1.5 0 0 1 16 3.5v1A1.5 1.5 0 0 1 14.5 6h-5A1.5 1.5 0 0 1 8 4.5z"], [3, "class"], [1, "flex", "flex-row", "space-x-1", "items-center", "p-2", "rounded-lg", "hover:bg-[#F7E6E9]"], [1, "w-full", "flex", "flex-col", "space-y-8", "px-8"], [1, "flex", "flex-row", "justify-between", "items-center"], [1, "text-xl", "font-bold"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "keyup"], ["matPrefix", "", 1, "text-slate-300"], [1, "grid", "grid-cols-4", "gap-8"], [1, "cursor-pointer", "border", "flex", "flex-col", "space-y-2", "rounded-lg", "overflow-hidden", "w-full", 3, "href"], [1, "h-60", "w-full", "overflow-hidden"], ["src", "https://pos.nvncdn.com/772b84-151467/ps/20230523_SPbSTsvn6w.jpeg", "alt", "", "srcset", "", 1, "w-full", "object-cover", "hover:scale-125", "transition-transform", "duration-300"], [1, "px-4", "py-2", "flex", "flex-col", "space-y-2"], [1, "!m-0", "line-clamp-2", "h-12", "text-lg", "font-bold", "hover:text-[#57A345]", "hover:font-extrabold"], [1, "flex", "justify-between", "items-center"], [1, "font-bold", "text-red-500"], ["color", "primary", "mat-icon-button", ""]], template: function DanhmucComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275element(2, "img", 3);
      \u0275\u0275elementStart(3, "div", 4)(4, "h1", 5);
      \u0275\u0275text(5, "S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "p", 6);
      \u0275\u0275text(7, "S\u1EA2N PH\u1EA8M THEO T\xCCNH TR\u1EA0NG DA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 7);
      \u0275\u0275element(9, "app-breadscrumb", 8);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "div", 9)(11, "div", 10)(12, "div", 11)(13, "h2");
      \u0275\u0275text(14, "T\xECnh Tr\u1EA1ng Da ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 12);
      \u0275\u0275listener("click", function DanhmucComponent_Template_div_click_15_listener() {
        \u0275\u0275restoreView(_r1);
        ctx.FilterSanphams = ctx.Sanphams;
        return \u0275\u0275resetView(ctx.FilterDanhmuc = 0);
      });
      \u0275\u0275namespaceSVG();
      \u0275\u0275elementStart(16, "svg", 13)(17, "g", 14);
      \u0275\u0275element(18, "path", 15)(19, "path", 16)(20, "path", 17);
      \u0275\u0275elementEnd()();
      \u0275\u0275namespaceHTML();
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "T\u1EA5t C\u1EA3");
      \u0275\u0275elementEnd()();
      \u0275\u0275repeaterCreate(23, DanhmucComponent_For_24_Template, 8, 4, "div", 18, _forTrack0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 11)(26, "h2");
      \u0275\u0275text(27, "L\u1ECDc Theo ");
      \u0275\u0275elementEnd();
      \u0275\u0275repeaterCreate(28, DanhmucComponent_For_29_Template, 8, 1, "div", 19, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(30, "div", 20)(31, "div", 21)(32, "div", 22);
      \u0275\u0275text(33);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "div")(35, "mat-form-field", 23)(36, "input", 24, 0);
      \u0275\u0275listener("keyup", function DanhmucComponent_Template_input_keyup_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-icon", 25);
      \u0275\u0275text(39, "search");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(40, "div", 26);
      \u0275\u0275repeaterCreate(41, DanhmucComponent_For_42_Template, 12, 3, "a", 27, _forTrack0);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(9);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(6);
      \u0275\u0275classMapInterpolate1("", ctx.FilterDanhmuc == 0 ? "bg-[#F7E6E9]" : "", " flex flex-row space-x-1 items-center p-2 rounded-lg hover:bg-slate-100");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.Danhmucs);
      \u0275\u0275advance(5);
      \u0275\u0275repeater(ctx.FilterType);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1("S\u1EA3n Ph\u1EA9m (", ctx.FilterSanphams.length || 0, ")");
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.FilterSanphams);
    }
  }, dependencies: [
    BreadscrumbComponent,
    CommonModule,
    MatInputModule,
    MatInput,
    MatFormField,
    MatPrefix,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DanhmucComponent, { className: "DanhmucComponent", filePath: "src/app/site/danhmuc/danhmuc.component.ts", lineNumber: 29 });
})();
export {
  DanhmucComponent
};
//# sourceMappingURL=chunk-XZMQVUBI.mjs.map
