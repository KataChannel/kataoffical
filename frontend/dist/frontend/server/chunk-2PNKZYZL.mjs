import './polyfills.server.mjs';
import {
  Gioithieus
} from "./chunk-WCIZC5GU.mjs";
import {
  MatExpansionModule
} from "./chunk-HTMQ7XDS.mjs";
import {
  BreadscrumbComponent
} from "./chunk-GOPZFVLD.mjs";
import {
  DateHelpers
} from "./chunk-KIQNTD6X.mjs";
import {
  MatTabsModule
} from "./chunk-WTPRJMZS.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  MatDatepickerModule
} from "./chunk-RUJ72W7P.mjs";
import "./chunk-TEMMKMG5.mjs";
import {
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButton,
  MatButtonModule
} from "./chunk-2QXHUJNF.mjs";
import {
  MatOption
} from "./chunk-7GJ6SLXG.mjs";
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
  ɵɵpureFunction0,
  ɵɵpureFunction3,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtrustConstantResourceUrl
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/lienhe/lienhe.component.ts
var _c0 = () => ({ id: 1, Title: "B\xE1c s\u1EF9 ph\xF2ng kh\xE1m" });
var _c1 = () => ({ id: 2, Title: "Ch\u1EE7 spa clinic" });
var _c2 = () => ({ id: 3, Title: "Ch\u1EE7 shop kinh doanh" });
var _c3 = (a0, a1, a2) => [a0, a1, a2];
var _c4 = () => ({ id: 1, Title: "H\u1ED7 tr\u1EE3 s\u1EA3n ph\u1EA9m" });
var _c5 = () => ({ id: 2, Title: "H\u1EE3p t\xE1c kinh doanh" });
var _c6 = () => ({ id: 3, Title: "Kh\xE1c" });
var _forTrack0 = ($index, $item) => $item.id;
function LienheComponent_For_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("value", item_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.Title);
  }
}
function LienheComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("value", item_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r2.Title);
  }
}
var LienheComponent = class _LienheComponent {
  route;
  SearchParams = {
    Batdau: DateHelpers.startOfWeek(),
    Ketthuc: DateHelpers.endOfWeek(),
    pageSize: 9999,
    pageNumber: 0
  };
  ApplyDate() {
    this.ngOnInit();
  }
  Gioithieu = {};
  ListGioithieu = Gioithieus;
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
  ListLieutrinhs = [
    { id: 1, Title: "Li\u1EC7u tr\xECnh ph\u1EE5c h\u1ED3i da m\u1ECFng y\u1EBFu", slug: "lieu-trinh-phuc-hoi-da-mong-yeu" },
    { id: 2, Title: "Li\u1EC7u tr\xECnh thu nh\u1ECF l\u1ED7 ch\xE2n l\xF4ng", slug: "lieu-trinh-thu-nho-lo-chan-long" },
    { id: 3, Title: "Li\u1EC7u tr\xECnh d\u01B0\u1EE1ng \u1EA9m c\u1EA5p n\u01B0\u1EDBc", slug: "lieu-trinh-duong-am-cap-nuoc" },
    { id: 4, Title: "Li\u1EC7u tr\xECnh ch\u0103m s\xF3c da ch\u1EA3y x\u1EC7, n\u1EBFp nh\u0103n", slug: "lieu-trinh-cham-soc-da-chay-xe-nep-nhan" },
    { id: 5, Title: "Li\u1EC7u tr\xECnh tr\u1ECB n\xE1m, tr\u1EAFng da", slug: "lieu-trinh-tri-nam-trang-da" },
    { id: 6, Title: "Li\u1EC7u tr\xECnh n\xE2ng c\u01A1 tr\u1EBB h\xF3a d\xE2y ch\u1EB1ng Biolift", slug: "lieu-trinh-nang-co-tre-hoa-day-chang-biolift" },
    { id: 7, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB tr\u0169ng m\u1EAFt v\xE0 th\xE2m m\u1EAFt", slug: "lieu-trinh-dieu-tri-trung-mat-va-tham-mat" },
    { id: 8, Title: "Li\u1EC7u tr\xECnh x\xF3a nh\u0103n v\xE0 l\xE0m \u0111\u1EA7y tr\xE1n, mu b\xE0n tay, c\u1ED5, v\xF9ng m\xF4i, v\xF9ng k\xEDnh", slug: "lieu-trinh-xoa-nhan-va-lam-day-tran-mu-ban-tay-co-vung-moi-vung-kinh" },
    { id: 9, Title: "Li\u1EC7u tr\xECnh x\xF3a nh\u0103n tr\u1EAFng da", slug: "lieu-trinh-xoa-nhan-trang-da" },
    { id: 10, Title: "Li\u1EC7u tr\xECnh x\xF3a nh\u0103n c\u0103ng b\xF3ng", slug: "lieu-trinh-xoa-nhan-cang-bong" },
    { id: 11, Title: "Li\u1EC7u tr\xECnh ph\u1EE5c h\u1ED3i, tr\u1EAFng da, c\u0103ng b\xF3ng", slug: "lieu-trinh-phuc-hoi-trang-da-cang-bong" },
    { id: 12, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB s\u1EB9o m\u1EE5n, s\u1EB9o r\u1ED7", slug: "lieu-trinh-dieu-tri-seo-mun-seo-ro" },
    { id: 13, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB r\u1EE5ng t\xF3c", slug: "lieu-trinh-dieu-tri-rung-toc" },
    { id: 14, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB m\u1EE5n", slug: "lieu-trinh-dieu-tri-mun" },
    { id: 15, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB r\u1EA1n da", slug: "lieu-trinh-dieu-tri-ran-da" },
    { id: 16, Title: "Li\u1EC7u tr\xECnh \u0111i\u1EC1u tr\u1ECB vi\xEAm da c\u01A1 \u0111\u1ECBa", slug: "lieu-trinh-dieu-tri-viem-da-co-dia" },
    { id: 17, Title: "Li\u1EC7u tr\xECnh gi\u1EA3m m\u1EE1", slug: "lieu-trinh-giam-mo" }
  ];
  constructor(route) {
    this.route = route;
  }
  ngOnInit() {
    const slugSP = this.route.snapshot.paramMap.get("slug");
    const result = slugSP?.split("-v6")[0];
    console.log(result);
    this.Gioithieu = this.ListGioithieu.find((v) => v.Slug == result);
    console.log(this.Gioithieu);
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/danh-muc" },
      { name: this.Gioithieu?.Title, link: `${this.Gioithieu?.slug}-v6` }
    ];
    console.log(this.Breadcrumbs);
  }
  static \u0275fac = function LienheComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _LienheComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _LienheComponent, selectors: [["app-lienhe"]], decls: 50, vars: 15, consts: [[1, "w-full", "flex", "flex-col", "space-y-8", "items-center", "bg-slate-100"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-20", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "bg-white", "flex", "flex-col", "space-y-4", "justify-center", "p-1"], [1, "w-full", "h-96", "flex", "justify-center"], ["src", "/demo/banner1.jpg", "alt", "", "srcset", "", 1, "rounded-lg", "object-cover"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "grid", "grid-cols-2", "gap-4", "p-4", "mx-auto"], [1, "col-span-2", "text-center", "text-2xl", "font-bold", "text-gray-800", "pt-8"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp H\u1ECD t\xEAn"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Email"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp \u0110\u1ECBa Ch\u1EC9"], [3, "value"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "col-span-2"], ["matInput", "", "placeholder", "N\u1ED9i dung li\xEAn h\u1EC7"], [1, "col-span-2", "text-center"], ["mat-raised-button", "", "color", "primary"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white", "!mb-8", 2, "position", "relative", "overflow", "hidden", "padding-top", "56.25%"], ["src", \u0275\u0275trustConstantResourceUrl`https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3918.6250722613845!2d106.64392237457564!3d10.839977558019234!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x317529b6f6449bbd%3A0xd11143d480f7225!2zQ8O0bmcgdHkgVE5ISCBExrDhu6NjIE3hu7kgcGjhuqltIEgtRGVybWE!5e0!3m2!1svi!2s!4v1738340701519!5m2!1svi!2s`, "allowfullscreen", "", "loading", "lazy", "referrerpolicy", "no-referrer-when-downgrade", 2, "position", "absolute", "top", "0", "left", "0", "width", "100%", "height", "100%", "border", "0"]], template: function LienheComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "div", 4);
      \u0275\u0275element(5, "app-breadscrumb", 5);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 6)(7, "div", 7);
      \u0275\u0275element(8, "img", 8);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 9)(10, "div", 10)(11, "h2", 11);
      \u0275\u0275text(12, "Th\xF4ng Tin Li\xEAn H\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-form-field", 12)(14, "mat-label");
      \u0275\u0275text(15, "H\u1ECD t\xEAn qu\xFD kh\xE1ch");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 13);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-form-field", 12)(18, "mat-label");
      \u0275\u0275text(19, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-form-field", 12)(22, "mat-label");
      \u0275\u0275text(23, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field", 12)(26, "mat-label");
      \u0275\u0275text(27, "\u0110\u1ECBa Ch\u1EC9");
      \u0275\u0275elementEnd();
      \u0275\u0275element(28, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-form-field", 12)(30, "mat-label");
      \u0275\u0275text(31, "Qu\xFD Kh\xE1ch H\xE0ng L\xE0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-select");
      \u0275\u0275repeaterCreate(33, LienheComponent_For_34_Template, 2, 2, "mat-option", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "mat-form-field", 12)(36, "mat-label");
      \u0275\u0275text(37, "M\u1EE5c \u0110\xEDch Li\xEAn H\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-select");
      \u0275\u0275repeaterCreate(39, LienheComponent_For_40_Template, 2, 2, "mat-option", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "mat-form-field", 18)(42, "mat-label");
      \u0275\u0275text(43, "N\u1ED9i dung li\xEAn h\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275element(44, "textarea", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "div", 20)(46, "button", 21);
      \u0275\u0275text(47, "G\u1EEDi Tin Nh\u1EAFn");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(48, "div", 22);
      \u0275\u0275element(49, "iframe", 23);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(28);
      \u0275\u0275repeater(\u0275\u0275pureFunction3(4, _c3, \u0275\u0275pureFunction0(1, _c0), \u0275\u0275pureFunction0(2, _c1), \u0275\u0275pureFunction0(3, _c2)));
      \u0275\u0275advance(6);
      \u0275\u0275repeater(\u0275\u0275pureFunction3(11, _c3, \u0275\u0275pureFunction0(8, _c4), \u0275\u0275pureFunction0(9, _c5), \u0275\u0275pureFunction0(10, _c6)));
    }
  }, dependencies: [
    CommonModule,
    BreadscrumbComponent,
    MatTabsModule,
    MatExpansionModule,
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatFormFieldModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    FormsModule,
    MatButtonModule,
    MatButton
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(LienheComponent, { className: "LienheComponent", filePath: "src/app/site/lienhe/lienhe.component.ts", lineNumber: 38 });
})();
export {
  LienheComponent
};
//# sourceMappingURL=chunk-2PNKZYZL.mjs.map
