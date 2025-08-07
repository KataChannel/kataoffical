import './polyfills.server.mjs';
import {
  Gioithieus
} from "./chunk-WCIZC5GU.mjs";
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
  MatDateRangeInput,
  MatDateRangePicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatEndDate,
  MatStartDate
} from "./chunk-RUJ72W7P.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-TGETIOQI.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
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
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/site/gioithieu/gioithieu.component.ts
var _c0 = () => ({ id: 1, Title: "B\xE1c s\u1EF9 ph\xF2ng kh\xE1m" });
var _c1 = () => ({ id: 2, Title: "Ch\u1EE7 spa clinic" });
var _c2 = () => ({ id: 3, Title: "Ch\u1EE7 shop kinh doanh" });
var _c3 = (a0, a1, a2) => [a0, a1, a2];
var _c4 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function GioithieuComponent_For_30_Template(rf, ctx) {
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
function GioithieuComponent_For_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("value", item_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r3.Title);
  }
}
var GioithieuComponent = class _GioithieuComponent {
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
    this.Gioithieu = this.ListGioithieu.find((v) => v.Slug == result);
    if (!this.Gioithieu) {
      location.href = "/404";
      return;
    }
    console.log(this.Gioithieu);
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/danh-muc" },
      { name: this.Gioithieu?.Title, link: `${this.Gioithieu?.slug}-v6` }
    ];
    console.log(this.Breadcrumbs);
  }
  static \u0275fac = function GioithieuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GioithieuComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GioithieuComponent, selectors: [["app-gioithieu"]], decls: 62, vars: 21, consts: [["picker", ""], [1, "w-full", "flex", "flex-col", "space-y-8", "items-center", "bg-slate-100"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-20", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center", "p-2"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "bg-white", "flex", "flex-col", "space-y-4", "justify-center", "p-1"], [1, "w-full", "h-96", "flex", "justify-center"], ["src", "/demo/banner1.jpg", "alt", "", "srcset", "", 1, "rounded-lg", "object-cover"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "grid", "grid-cols-2", "gap-4", "p-4", "mx-auto"], [1, "col-span-2", "text-center", "text-2xl", "font-bold", "text-gray-800", "pt-8"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp H\u1ECD t\xEAn"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 \u0111i\u1EC7n tho\u1EA1i"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Email"], [3, "value"], ["multiple", ""], [1, "col-span-2", 3, "appearance", "subscriptSizing"], [3, "rangePicker"], ["matStartDate", "", "placeholder", "Start date", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matEndDate", "", "placeholder", "End date", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["touchUi", ""], ["mat-stroked-button", "", "color", "warn", "matDateRangePickerCancel", ""], ["mat-stroked-button", "", "color", "primary", "matDateRangePickerApply", "", 3, "click"], [1, "col-span-2", "text-center"], ["mat-raised-button", "", "color", "primary"], [1, "text-center", "text-2xl", "font-bold", "text-gray-800", "pt-8"], [1, "p-8", 3, "Config", "Type", "slides"]], template: function GioithieuComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2);
      \u0275\u0275element(2, "img", 3);
      \u0275\u0275elementStart(3, "div", 4)(4, "div", 5);
      \u0275\u0275element(5, "app-breadscrumb", 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(6, "div", 7)(7, "div", 8);
      \u0275\u0275element(8, "img", 9);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(9, "div", 10)(10, "div", 11)(11, "h2", 12);
      \u0275\u0275text(12, "Th\xF4ng Tin Li\xEAn H\u1EC7");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "mat-form-field", 13)(14, "mat-label");
      \u0275\u0275text(15, "H\u1ECD t\xEAn qu\xFD kh\xE1ch");
      \u0275\u0275elementEnd();
      \u0275\u0275element(16, "input", 14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-form-field", 13)(18, "mat-label");
      \u0275\u0275text(19, "S\u1ED1 \u0111i\u1EC7n tho\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "input", 15);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-form-field", 13)(22, "mat-label");
      \u0275\u0275text(23, "Email");
      \u0275\u0275elementEnd();
      \u0275\u0275element(24, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field", 13)(26, "mat-label");
      \u0275\u0275text(27, "Qu\xFD Kh\xE1ch H\xE0ng L\xE0");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-select");
      \u0275\u0275repeaterCreate(29, GioithieuComponent_For_30_Template, 2, 2, "mat-option", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "mat-form-field", 13)(32, "mat-label");
      \u0275\u0275text(33, "\u0110\u1ECBa Ch\u1EC9 L\xE0m Vi\u1EC7c");
      \u0275\u0275elementEnd();
      \u0275\u0275element(34, "input", 16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "mat-form-field", 13)(36, "mat-label");
      \u0275\u0275text(37, "\u0110\u0103ng K\xFD Demo");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-select", 18);
      \u0275\u0275repeaterCreate(39, GioithieuComponent_For_40_Template, 2, 2, "mat-option", 17, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(41, "mat-form-field", 19)(42, "mat-label");
      \u0275\u0275text(43, "Th\u1EDDi Gian Mong Mu\u1ED1n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "mat-date-range-input", 20)(45, "input", 21);
      \u0275\u0275twoWayListener("ngModelChange", function GioithieuComponent_Template_input_ngModelChange_45_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Batdau, $event) || (ctx.SearchParams.Batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "input", 22);
      \u0275\u0275twoWayListener("ngModelChange", function GioithieuComponent_Template_input_ngModelChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.SearchParams.Ketthuc, $event) || (ctx.SearchParams.Ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275element(47, "mat-datepicker-toggle", 23);
      \u0275\u0275elementStart(48, "mat-date-range-picker", 24, 0)(50, "mat-date-range-picker-actions")(51, "button", 25);
      \u0275\u0275text(52, "Hu\u1EF7 B\u1ECF");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 26);
      \u0275\u0275listener("click", function GioithieuComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ApplyDate());
      });
      \u0275\u0275text(54, "\u0110\u1ED3ng \xDD");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(55, "div", 27)(56, "button", 28);
      \u0275\u0275text(57, "G\u1EEDi \u0110\u0103ng K\xFD");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 10)(59, "h2", 29);
      \u0275\u0275text(60, "B\xE0i Vi\u1EBFt Li\xEAn Quan");
      \u0275\u0275elementEnd();
      \u0275\u0275element(61, "app-swiper", 30);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const picker_r4 = \u0275\u0275reference(49);
      \u0275\u0275advance(5);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(24);
      \u0275\u0275repeater(\u0275\u0275pureFunction3(15, _c3, \u0275\u0275pureFunction0(12, _c0), \u0275\u0275pureFunction0(13, _c1), \u0275\u0275pureFunction0(14, _c2)));
      \u0275\u0275advance(10);
      \u0275\u0275repeater(ctx.ListLieutrinhs);
      \u0275\u0275advance(2);
      \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
      \u0275\u0275advance(3);
      \u0275\u0275property("rangePicker", picker_r4);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c4));
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.SearchParams.Ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(20, _c4));
      \u0275\u0275advance();
      \u0275\u0275property("for", picker_r4);
      \u0275\u0275advance(14);
      \u0275\u0275property("Config", ctx.Config)("Type", "Gioithieu")("slides", ctx.ListGioithieu);
    }
  }, dependencies: [
    CommonModule,
    BreadscrumbComponent,
    MatTabsModule,
    MatExpansionModule,
    SwiperComponent,
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatFormFieldModule,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate,
    MatDateRangePicker,
    MatDatepickerActions,
    MatDatepickerCancel,
    MatDatepickerApply,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatButtonModule,
    MatButton
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GioithieuComponent, { className: "GioithieuComponent", filePath: "src/app/site/gioithieu/gioithieu.component.ts", lineNumber: 39 });
})();
export {
  GioithieuComponent
};
//# sourceMappingURL=chunk-HGDENQTH.mjs.map
