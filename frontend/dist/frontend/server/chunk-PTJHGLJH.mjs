import './polyfills.server.mjs';
import {
  Baiviets
} from "./chunk-UN64IF4W.mjs";
import {
  MatExpansionModule
} from "./chunk-HTMQ7XDS.mjs";
import {
  SwiperComponent
} from "./chunk-42LDZAIG.mjs";
import {
  BreadscrumbComponent
} from "./chunk-GOPZFVLD.mjs";
import {
  MatTabsModule
} from "./chunk-WTPRJMZS.mjs";
import "./chunk-TGETIOQI.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-MGLNC3ZQ.mjs";
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
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵsanitizeHtml,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/baiviet/baiviet.component.ts
var BaivietComponent = class _BaivietComponent {
  route;
  Baiviet = {};
  ListBaiviet = Baiviets;
  Breadcrumbs = [];
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
    const result = slugSP?.split("-v3")[0];
    console.log(result);
    this.Baiviet = this.ListBaiviet.find((v) => v.Slug == result);
    console.log(this.Baiviet);
    if (!this.Baiviet) {
      location.href = "/404";
      return;
    }
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/danh-muc" },
      { name: this.Baiviet?.Title, link: `${this.Baiviet?.slug}-v3` }
    ];
    console.log(this.Breadcrumbs);
  }
  static \u0275fac = function BaivietComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BaivietComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BaivietComponent, selectors: [["app-baiviet"]], decls: 17, vars: 6, consts: [[1, "w-full", "flex", "flex-col", "space-y-8", "items-center", "bg-slate-100"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-20", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "bg-white", "flex", "flex-col", "space-y-4", "justify-center", "p-8"], [1, "w-full", "h-60", "flex", "justify-center"], ["src", "https://matdash-nextjs-main.vercel.app/_next/image?url=%2Fimages%2Fproducts%2Fteddybear.jpg&w=640&q=75", "alt", "", "srcset", "", 1, "rounded-lg", "object-cover"], [1, "flex", "flex-col", "space-y-4"], [1, "!m-0"], [3, "innerHTML"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "text-center", "text-2xl", "font-bold", "text-gray-800", "pt-8"], [1, "p-8", 3, "Config", "Type", "slides"]], template: function BaivietComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "app-breadscrumb", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7);
      \u0275\u0275element(8, "img", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 9)(10, "h2", 10);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275element(12, "div", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(13, "div", 12)(14, "h2", 13);
      \u0275\u0275text(15, "B\xE0i Vi\u1EBFt Li\xEAn Quan");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "app-swiper", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.Baiviet == null ? null : ctx.Baiviet.Title);
      \u0275\u0275advance();
      \u0275\u0275property("innerHTML", ctx.Baiviet.Mota, \u0275\u0275sanitizeHtml);
      \u0275\u0275advance(4);
      \u0275\u0275property("Config", ctx.Config)("Type", "Baiviet")("slides", ctx.ListBaiviet);
    }
  }, dependencies: [
    CommonModule,
    BreadscrumbComponent,
    MatTabsModule,
    MatExpansionModule,
    SwiperComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BaivietComponent, { className: "BaivietComponent", filePath: "src/app/site/baiviet/baiviet.component.ts", lineNumber: 22 });
})();
export {
  BaivietComponent
};
//# sourceMappingURL=chunk-PTJHGLJH.mjs.map
