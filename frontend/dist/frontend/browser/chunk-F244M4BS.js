import {
  Sanphams
} from "./chunk-XRPFU7HF.js";
import {
  SwiperComponent
} from "./chunk-ZUYWZY77.js";
import {
  MatAccordion,
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-UDQQ44DT.js";
import {
  BreadscrumbComponent
} from "./chunk-ZQ36WEHJ.js";
import {
  MatTab,
  MatTabGroup,
  MatTabsModule
} from "./chunk-3FX3VELS.js";
import "./chunk-ZAANGQNB.js";
import "./chunk-44ZKFD54.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  ActivatedRoute
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule
} from "./chunk-E6DSVUBK.js";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpropertyInterpolate,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/site/sanpham/sanpham.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function SanphamComponent_For_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab", 16);
    \u0275\u0275element(1, "div", 22);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275propertyInterpolate("label", item_r1.Title);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", ctx_r1.Sanpham[item_r1.Value], \u0275\u0275sanitizeHtml);
  }
}
function SanphamComponent_For_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-expansion-panel")(1, "mat-expansion-panel-header")(2, "mat-panel-title")(3, "div", 23)(4, "span", 24);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span");
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(8, "p");
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    const \u0275$index_52_r4 = ctx.$index;
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(\u0275$index_52_r4 + 1);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.Title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.Answer);
  }
}
var SanphamComponent = class _SanphamComponent {
  route;
  Sanpham = {};
  ListSanpham = Sanphams;
  Breadcrumbs = [];
  ListTabs = [
    { id: 1, Title: "Th\xE0nh Ph\u1EA7n", Value: "Thanhphan" },
    { id: 2, Title: "C\xF4ng D\u1EE5ng", Value: "Congdung" },
    { id: 3, Title: "Ch\u1EC9 \u0110\u1ECBnh", Value: "Chidinh" },
    { id: 4, Title: "H\u01B0\u1EDBng D\u1EABn", Value: "Huongdan" }
  ];
  Cauhois = [
    { id: 1, Title: "C\xE2u h\u1ECFi 1", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 1" },
    { id: 2, Title: "C\xE2u h\u1ECFi 2", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 2" },
    { id: 3, Title: "C\xE2u h\u1ECFi 3", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 3" },
    { id: 4, Title: "C\xE2u h\u1ECFi 4", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 4" },
    { id: 5, Title: "C\xE2u h\u1ECFi 5", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 5" },
    { id: 6, Title: "C\xE2u h\u1ECFi 6", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 6" },
    { id: 7, Title: "C\xE2u h\u1ECFi 7", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 7" },
    { id: 8, Title: "C\xE2u h\u1ECFi 8", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 8" },
    { id: 9, Title: "C\xE2u h\u1ECFi 9", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 9" },
    { id: 10, Title: "C\xE2u h\u1ECFi 10", Answer: "C\xE2u tr\u1EA3 l\u1EDDi 10" }
  ];
  Config = {
    slidesPerView: 2,
    spaceBetween: 30,
    loop: true,
    pagination: {
      el: ".swiper-pagination",
      clickable: true
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev"
    },
    autoplay: false,
    breakpoints: {
      640: {
        slidesPerView: 2,
        spaceBetween: 20
      },
      768: {
        slidesPerView: 3,
        spaceBetween: 40
      },
      1024: {
        slidesPerView: 4,
        spaceBetween: 50
      }
    }
  };
  constructor(route) {
    this.route = route;
  }
  ngOnInit() {
    const slugSP = this.route.snapshot.paramMap.get("slug");
    const result = slugSP?.split("-v1")[0];
    this.Sanpham = this.ListSanpham.find((v) => v.Slug == result);
    console.log(this.Sanpham);
    if (!this.Sanpham) {
      location.href = "/404";
      return;
    }
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/danh-muc" },
      { name: this.Sanpham?.Title, link: `${this.Sanpham?.slug}-v1` }
    ];
    console.log(this.Breadcrumbs);
  }
  static \u0275fac = function SanphamComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SanphamComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SanphamComponent, selectors: [["app-sanpham"]], decls: 33, vars: 7, consts: [[1, "w-full", "flex", "flex-col", "space-y-2", "items-center", "bg-slate-100"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-20", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "p-2", "flex", "flex-col", "space-y-4", "justify-center", "py-8"], [1, "grid", "grid-cols-2", "gap-8", "rounded-lg", "p-4", "bg-white"], [1, "w-full", "h-60", "flex", "justify-center"], ["src", "https://matdash-nextjs-main.vercel.app/_next/image?url=%2Fimages%2Fproducts%2Fteddybear.jpg&w=640&q=75", "alt", "", "srcset", "", 1, "rounded-lg"], [1, "flex", "flex-col", "space-y-4"], [1, "!m-0"], [1, "grid", "grid-cols-2"], [1, "font-bold"], [3, "innerHTML"], [1, "grid", "gap-8", "rounded-lg", "p-4", "bg-white"], [3, "label"], [1, "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "text-lg", "font-bold", "p-4"], [1, "p-4"], [1, "text-center", "text-2xl", "font-bold", "text-gray-800", "py-8"], [1, "p-8", 3, "Config", "Type", "slides"], [1, "p-4", 3, "innerHTML"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "p-1", "flex", "text-center", "justify-center", "items-center", "w-5", "h-5", "rounded-full", "bg-slate-100"]], template: function SanphamComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "app-breadscrumb", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7)(8, "div", 8);
      \u0275\u0275element(9, "img", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 10)(11, "h2", 11);
      \u0275\u0275text(12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 12)(14, "div", 13);
      \u0275\u0275text(15, "K\u1EBFt C\u1EA5u S\u1EA3n Ph\u1EA9m : ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 13);
      \u0275\u0275text(17, "Dung T\xEDch :");
      \u0275\u0275elementEnd()();
      \u0275\u0275element(18, "div", 14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(19, "div", 15)(20, "mat-tab-group");
      \u0275\u0275repeaterCreate(21, SanphamComponent_For_22_Template, 2, 2, "mat-tab", 16, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "div", 17)(24, "div", 18);
      \u0275\u0275text(25, "C\xE2u h\u1ECFi Th\u01B0\u1EDDng G\u1EB7p");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-accordion", 19);
      \u0275\u0275repeaterCreate(27, SanphamComponent_For_28_Template, 10, 3, "mat-expansion-panel", null, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(29, "div", 17)(30, "h2", 20);
      \u0275\u0275text(31, "S\u1EA3n Ph\u1EA9m N\u1ED5i B\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275element(32, "app-swiper", 21);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.Sanpham == null ? null : ctx.Sanpham.Title);
      \u0275\u0275advance(6);
      \u0275\u0275property("innerHTML", ctx.Sanpham.Mota, \u0275\u0275sanitizeHtml);
      \u0275\u0275advance();
      \u0275\u0275property("@.disabled", true);
      \u0275\u0275advance(2);
      \u0275\u0275repeater(ctx.ListTabs);
      \u0275\u0275advance(6);
      \u0275\u0275repeater(ctx.Cauhois);
      \u0275\u0275advance(5);
      \u0275\u0275property("Config", ctx.Config)("Type", "sanpham")("slides", ctx.ListSanpham);
    }
  }, dependencies: [
    CommonModule,
    BreadscrumbComponent,
    MatTabsModule,
    MatTab,
    MatTabGroup,
    MatExpansionModule,
    MatAccordion,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    SwiperComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SanphamComponent, { className: "SanphamComponent", filePath: "src/app/site/sanpham/sanpham.component.ts", lineNumber: 21 });
})();
export {
  SanphamComponent
};
//# sourceMappingURL=chunk-F244M4BS.js.map
