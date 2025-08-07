import {
  Sanphams
} from "./chunk-XRPFU7HF.js";
import {
  Baiviets
} from "./chunk-KO6TNRE6.js";
import {
  SwiperComponent
} from "./chunk-ZUYWZY77.js";
import "./chunk-ZAANGQNB.js";
import "./chunk-GWKJMKCD.js";
import "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵsanitizeHtml,
  ɵɵsanitizeUrl,
  ɵɵtext
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/site/home/keyfigures/keyfigures.component.ts
var _forTrack0 = ($index, $item) => $item.id;
function KeyfiguresComponent_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 1);
    \u0275\u0275element(1, "img", 2)(2, "p", 3)(3, "p", 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("src", item_r1.Image, \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r1.Title, \u0275\u0275sanitizeHtml);
    \u0275\u0275advance();
    \u0275\u0275property("innerHTML", item_r1.Desc, \u0275\u0275sanitizeHtml);
  }
}
var KeyfiguresComponent = class _KeyfiguresComponent {
  Heading;
  Listkeyfigures = [
    { id: 1, Title: "100% S\u1EA2N PH\u1EA8M N\u1ED8I \u0110\u1ECAA TIN C\u1EACY H\xC0NG \u0110\u1EA6U", Desc: "", Image: "keyfigures/keyfigures1.png" },
    { id: 2, Title: "\u0110\u1ED8T PH\xC1 C\xD4NG NGH\u1EC6 K\xC9P 2IN1", Desc: "", Image: "keyfigures/keyfigures2.png" },
    { id: 3, Title: "KI\u1EC2M \u0110\u1ECANH L\xC2M S\xC0NG T\u1EA0I C\xC1C VI\u1EC6N H\xC0N QU\u1ED0C", Desc: "", Image: "keyfigures/keyfigures3.png" },
    { id: 4, Title: "NH\u1EACP KH\u1EA8U TR\u1EF0C TI\u1EBEP PH\xC2N PH\u1ED0I \u0110\u1ED8C QUY\u1EC0N", Desc: "", Image: "keyfigures/keyfigures4.png" }
  ];
  static \u0275fac = function KeyfiguresComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KeyfiguresComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _KeyfiguresComponent, selectors: [["app-keyfigures"]], inputs: { Heading: "Heading" }, decls: 3, vars: 0, consts: [[1, "grid", "lg:grid-cols-4", "grid-cols-2", "gap-8", "p-8"], [1, "flex", "flex-col", "space-y-2", "items-center", "text-center"], ["alt", "", "srcset", "", 3, "src"], [1, "mt-4", "max-w-[15rem]", "text-lg", "font-semibold", "text-[#57A345]", 3, "innerHTML"], [1, "mt-4", "text-lg", "font-semibold", "text-[#57A345]", 3, "innerHTML"]], template: function KeyfiguresComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275repeaterCreate(1, KeyfiguresComponent_For_2_Template, 4, 3, "div", 1, _forTrack0);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.Listkeyfigures);
    }
  }, encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(KeyfiguresComponent, { className: "KeyfiguresComponent", filePath: "src/app/site/home/keyfigures/keyfigures.component.ts", lineNumber: 10 });
})();

// src/app/shared/mockdata/review.ts
var Reviews = [
  {
    id: "1",
    background: "/demo/bg_reviews.png",
    avatar: "/demo/feedback-user.jpg",
    Title: "Nguy\u1EC5n Th\u1ECB B\xE9 Ba - 25 tu\u1ED5i - H\xE0 N\u1ED9i",
    Review: "S\u1EA3n ph\u1EA9m r\u1EA5t t\u1ED1t, m\xECnh \u0111\xE3 s\u1EED d\u1EE5ng \u0111\u01B0\u1EE3c 1 th\xE1ng v\xE0 th\u1EA5y hi\u1EC7u qu\u1EA3 r\xF5 r\u1EC7t. Da m\xECnh tr\u1EDF n\xEAn m\u1ECBn m\xE0ng h\u01A1n, s\xE1ng h\u01A1n v\xE0 gi\u1EA3m \u0111\u01B0\u1EE3c m\u1EE5n \u0111\xE1ng k\u1EC3. M\xECnh r\u1EA5t h\xE0i l\xF2ng v\u1EDBi s\u1EA3n ph\u1EA9m n\xE0y."
  },
  {
    id: "2",
    background: "/demo/bg_reviews.png",
    avatar: "/demo/feedback-user.jpg",
    Title: "Tr\u1EA7n V\u0103n A - 30 tu\u1ED5i - TP. H\u1ED3 Ch\xED Minh",
    Review: "S\u1EA3n ph\u1EA9m n\xE0y th\u1EADt tuy\u1EC7t v\u1EDDi! T\xF4i \u0111\xE3 d\xF9ng th\u1EED v\xE0 th\u1EA5y da m\xECnh c\u1EA3i thi\u1EC7n r\xF5 r\u1EC7t. S\u1EBD ti\u1EBFp t\u1EE5c s\u1EED d\u1EE5ng v\xE0 gi\u1EDBi thi\u1EC7u cho b\u1EA1n b\xE8."
  },
  {
    id: "3",
    background: "/demo/bg_reviews.png",
    avatar: "/demo/feedback-user.jpg",
    Title: "L\xEA Th\u1ECB C - 28 tu\u1ED5i - \u0110\xE0 N\u1EB5ng",
    Review: "T\xF4i r\u1EA5t h\xE0i l\xF2ng v\u1EDBi s\u1EA3n ph\u1EA9m n\xE0y. Da t\xF4i tr\u1EDF n\xEAn m\u1EC1m m\u1EA1i v\xE0 s\xE1ng h\u01A1n sau khi s\u1EED d\u1EE5ng. C\u1EA3m \u01A1n v\xEC s\u1EA3n ph\u1EA9m tuy\u1EC7t v\u1EDDi n\xE0y!"
  },
  {
    id: "4",
    background: "/demo/bg_reviews.png",
    avatar: "/demo/feedback-user.jpg",
    Title: "Ph\u1EA1m V\u0103n B - 35 tu\u1ED5i - C\u1EA7n Th\u01A1",
    Review: "S\u1EA3n ph\u1EA9m n\xE0y th\u1EF1c s\u1EF1 hi\u1EC7u qu\u1EA3. T\xF4i \u0111\xE3 th\u1EA5y s\u1EF1 thay \u0111\u1ED5i r\xF5 r\u1EC7t tr\xEAn da m\xECnh ch\u1EC9 sau v\xE0i tu\u1EA7n s\u1EED d\u1EE5ng. R\u1EA5t \u0111\xE1ng \u0111\u1EC3 th\u1EED!"
  }
];

// src/app/site/home/home.component.ts
var HomeComponent = class _HomeComponent {
  ListSanpham = Sanphams;
  ListReview = Reviews;
  ListBaiviet = Baiviets;
  ChuyenGiaConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
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
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 1,
        spaceBetween: 40
      }
    }
  };
  SanphamNoibatConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
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
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 5,
        spaceBetween: 40
      }
    }
  };
  BaivietConfig = {
    // Các tùy chọn của Swiper
    slidesPerView: 1,
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
      // when window width is >= 320px
      320: {
        slidesPerView: 1,
        spaceBetween: 20
      },
      // when window width is >= 480px
      480: {
        slidesPerView: 1,
        spaceBetween: 30
      },
      // when window width is >= 640px
      640: {
        slidesPerView: 3,
        spaceBetween: 40
      }
    }
  };
  static \u0275fac = function HomeComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _HomeComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _HomeComponent, selectors: [["app-home"]], decls: 24, vars: 9, consts: [[1, "flex", "flex-col", "space-y-16", "justify-center", "text-center"], [1, "bg-[#57A345]/50"], [1, "container", "mx-auto"], [1, "container", "m-auto", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white", "py-8"], [1, "text-center", "!text-2xl", "text-primary", "!mb-0", "font-bold", "text-gray-800", "uppercase"], [3, "Type", "Config", "slides"], [1, "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "text-center", "!text-2xl", "text-primary", "!mb-0", "font-bold", "text-gray-800"], [3, "Config", "Type", "slides"], [1, "w-full", "relative", "lg:!-my-16"], ["src", "/demo/dangkydemo.png", "alt", "Banner", 1, "opacity-50", "w-full", "object-cover"], [1, "max-w-md", "absolute", "top-1/2", "lg:left-1/2", "transform", "lg:-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "lg:block", "hidden", "text-2xl", "font-bold", "text-[#57A345]"], [1, "px-6", "py-2", "bg-[#57A345]", "text-white", "font-bold", "rounded-full"], [1, "text-[#57A345]", "text-sm", "!mt-4"]], template: function HomeComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0);
      \u0275\u0275element(1, "app-swiper", 1)(2, "app-keyfigures", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "h2", 4);
      \u0275\u0275text(5, "S\u1EA3n Ph\u1EA9m N\u1ED5i B\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "app-swiper", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 6)(8, "h2", 7);
      \u0275\u0275text(9, "CHUY\xCAN GIA DA LI\u1EC4U H\xC0NG \u0110\u1EA6U N\xD3I G\xCC V\u1EC0 Rau S\u1EA1ch Tr\u1EA7n Gia");
      \u0275\u0275elementEnd();
      \u0275\u0275element(10, "app-swiper", 8);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "div", 9);
      \u0275\u0275element(12, "img", 10);
      \u0275\u0275elementStart(13, "div", 11)(14, "h2", 12);
      \u0275\u0275text(15, "\u0110\u0102NG K\xDD DEMO S\u1EA2N PH\u1EA8M Rau S\u1EA1ch Tr\u1EA7n Gia");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 13);
      \u0275\u0275text(17, "G\u1EECI TIN NH\u1EAEN NGAY");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "p", 14);
      \u0275\u0275text(19, "* L\u01B0u \xFD: Ch\u01B0\u01A1ng tr\xECnh ch\u1EC9 \xE1p d\u1EE5ng cho \u0111\u1ED1i t\xE1c ch\u1EE7 spa/ chuy\xEAn gia/ b\xE1c s\u0129 trong ng\xE0nh y khoa th\u1EA9m m\u1EF9 v\xE0 l\xE0m \u0111\u1EB9p.");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 3)(21, "h2", 4);
      \u0275\u0275text(22, "Tin T\u1EE9c S\u1EF1 Ki\u1EC7n");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-swiper", 8);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(6);
      \u0275\u0275property("Type", "sanpham")("Config", ctx.SanphamNoibatConfig)("slides", ctx.ListSanpham);
      \u0275\u0275advance(4);
      \u0275\u0275property("Config", ctx.ChuyenGiaConfig)("Type", "review")("slides", ctx.ListReview);
      \u0275\u0275advance(13);
      \u0275\u0275property("Config", ctx.BaivietConfig)("Type", "Baiviet")("slides", ctx.ListBaiviet);
    }
  }, dependencies: [
    SwiperComponent,
    KeyfiguresComponent
  ], styles: ["\n\napp-home[_ngcontent-%COMP%] {\n  background-color: gray;\n}\n/*# sourceMappingURL=home.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(HomeComponent, { className: "HomeComponent", filePath: "src/app/site/home/home.component.ts", lineNumber: 17 });
})();
export {
  HomeComponent
};
//# sourceMappingURL=chunk-OPA4C5XU.js.map
