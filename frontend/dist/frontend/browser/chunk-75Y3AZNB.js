import {
  Danhmucs
} from "./chunk-T5HJ6LSW.js";
import {
  Baiviets
} from "./chunk-KO6TNRE6.js";
import {
  SwiperComponent
} from "./chunk-ZUYWZY77.js";
import {
  BreadscrumbComponent
} from "./chunk-ZQ36WEHJ.js";
import {
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import {
  MatButtonModule
} from "./chunk-HICNAP2H.js";
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
  ɵɵproperty,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵsanitizeUrl,
  ɵɵtext,
  ɵɵtrustConstantResourceUrl
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/site/danhmucgioithieu/danhmucgioithieu.component.ts
function DanhmucgioithieuComponent_For_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div");
    \u0275\u0275text(2, " H.DERMA \u2013 \u0110\u1ED8C QUY\u1EC0N PH\xC2N PH\u1ED0I Rau S\u1EA1ch Tr\u1EA7n Gia, TH\u01AF\u01A0NG HI\u1EC6U N\u1ED8I \u0110\u1ECAA H\xC0N QU\u1ED0C T\u1EA0I VI\u1EC6T NAM H.Derma t\u1EF1 h\xE0o l\xE0 nh\xE0 ph\xE2n ph\u1ED1i \u0111\u1ED9c quy\u1EC1n c\u1EE7a Rau S\u1EA1ch Tr\u1EA7n Gia \u2013 th\u01B0\u01A1ng hi\u1EC7u m\u1EF9 ph\u1EA9m n\u1ED9i \u0111\u1ECBa H\xE0n Qu\u1ED1c danh ti\u1EBFng, \u0111\u01B0\u1EE3c c\xE1c b\u1EC7nh vi\u1EC7n da li\u1EC5u v\xE0 th\u1EA9m m\u1EF9 vi\u1EC7n h\xE0ng \u0111\u1EA7u tin d\xF9ng. V\u1EDBi s\u1EF1 k\u1EBFt h\u1EE3p gi\u1EEFa khoa h\u1ECDc c\xF4ng ngh\u1EC7 ti\xEAn ti\u1EBFn v\xE0 s\u1EF1 am hi\u1EC3u s\xE2u s\u1EAFc v\u1EC1 l\xE0n da, Rau S\u1EA1ch Tr\u1EA7n Gia mang \u0111\u1EBFn gi\u1EA3i ph\xE1p ch\u0103m s\xF3c da to\xE0n di\u1EC7n, ph\xF9 h\u1EE3p v\u1EDBi \u0111\u1EB7c \u0111i\u1EC3m kh\xED h\u1EADu v\xE0 l\xE0n da Vi\u1EC7t Nam. ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div");
    \u0275\u0275element(4, "iframe", 15);
    \u0275\u0275elementEnd()();
  }
}
var DanhmucgioithieuComponent = class _DanhmucgioithieuComponent {
  route;
  Baiviet = {};
  Danhmucs = Danhmucs.filter((v) => v.Type == "gioithieu");
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
  Page = [
    { id: 1, Title: "N\xC2NG T\u1EA6M \u0110\u1EB2NG C\u1EA4P V\u1EDAI C\xD4NG NGH\u1EC6 S\u1EA2N XU\u1EA4T TI\xCAN TI\u1EBEN", Heading: "C\xD4NG NGH\u1EC6 LI\xCAN K\u1EBET CH\xC9O 2IN1", Mota: "<p>Rau S\u1EA1ch Tr\u1EA7n Gia \u1EE9ng d\u1EE5ng c&ocirc;ng ngh\u1EC7 li&ecirc;n k\u1EBFt ch&eacute;o 2in1 ti&ecirc;n ti\u1EBFn, c&oacute; kh\u1EA3 n\u0103ng v\u1EEBa t\u1EA5n c&ocirc;ng x\u1EED l&yacute; c&aacute;c v\u1EA5n \u0111\u1EC1 da nh\u01B0 m\u1EE5n, th&acirc;m, n&aacute;m, v\u1EEBa ph\u1EE5c h\u1ED3i v&agrave; t&aacute;i t\u1EA1o da sau \u0111i\u1EC1u tr\u1ECB. C&ocirc;ng ngh\u1EC7 n&agrave;y kh\u1EAFc ph\u1EE5c h\u1EA1n ch\u1EBF c\u1EE7a s\u1EA3n ph\u1EA9m th&ocirc;ng th\u01B0\u1EDDng, v\u1ED1n ch\u1EC9 c&oacute; th\u1EC3 th\u1EF1c hi\u1EC7n m\u1ED9t trong hai t&aacute;c d\u1EE5ng ho\u1EB7c g&acirc;y c\u1EA3m gi&aacute;c \u0111au bu\u1ED1t, kh&oacute; ch\u1ECBu.</p><p>V\u1EDBi c&ocirc;ng ngh\u1EC7 n&agrave;y, s\u1EA3n ph\u1EA9m Rau S\u1EA1ch Tr\u1EA7n Gia mang \u0111\u1EBFn gi\u1EA3i ph&aacute;p ch\u0103m s&oacute;c to&agrave;n di\u1EC7n, nh\u1EB9 nh&agrave;ng nh\u01B0ng \u0111\u1EA1t hi\u1EC7u qu\u1EA3 t\u1ED1i \u01B0u. L&agrave;n da \u0111\u01B0\u1EE3c \u0111i\u1EC1u tr\u1ECB v&agrave; ph\u1EE5c h\u1ED3i m\u1ED9t c&aacute;ch \u0111\u1ED3ng th\u1EDDi, gi&uacute;p b\u1EA1n c\u1EA3m nh\u1EADn s\u1EF1 c\u1EA3i thi\u1EC7n r&otilde; r\u1EC7t m&agrave; kh&ocirc;ng c\u1EA7n ph\u1EA3i lo l\u1EAFng v\u1EC1 c\u1EA3m gi&aacute;c \u0111au ho\u1EB7c ph\u1EA3i \u1EE7 t&ecirc; tr\u01B0\u1EDBc khi s\u1EED d\u1EE5ng.</p>", Image: "https://down-vn.img.susercontent.com/file/75937cc15391ca9e7b1fd39f2ff72af8" },
    { id: 2, Title: "T\xCDCH H\u1EE2P H\xC0M L\u01AF\u1EE2NG EXOSOME CAO", Heading: "C\xD4NG NGH\u1EC6 LI\xCAN K\u1EBET CH\xC9O 2IN1", Mota: '<p>Rau S\u1EA1ch Tr\u1EA7n Gia n\u1ED5i b\u1EADt v\u1EDBi c&ocirc;ng ngh\u1EC7 t&iacute;ch h\u1EE3p 20 t\u1EF7 h\u1EA1t Exosome trong m\u1ED7i s\u1EA3n ph\u1EA9m &ndash; m\u1ED9t th&agrave;nh t\u1EF1u \u0111\u1ED9t ph&aacute; trong y h\u1ECDc t&aacute;i t\u1EA1o. Exosome ho\u1EA1t \u0111\u1ED9ng nh\u01B0 "ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n th&ocirc;ng minh" truy\u1EC1n t\u1EA3i c&aacute;c t&iacute;n hi\u1EC7u sinh h\u1ECDc c\u1EA7n thi\u1EBFt \u0111\u1EC3 th&uacute;c \u0111\u1EA9y qu&aacute; tr&igrave;nh ph\u1EE5c h\u1ED3i v&agrave; t&aacute;i t\u1EA1o da hi\u1EC7u qu\u1EA3.</p><p>S\u1EA3n ph\u1EA9m c\u1EE7a Rau S\u1EA1ch Tr\u1EA7n Gia k&iacute;ch th&iacute;ch s\u1EA3n sinh collagen v&agrave; elastin, c\u1EA3i thi\u1EC7n \u0111\u1ED9 \u0111&agrave;n h\u1ED3i v&agrave; gi&uacute;p l&agrave;n da kh\u1EAFc ph\u1EE5c t\u1ED5n th\u01B0\u01A1ng do m\u1EE5n, n&aacute;m, th&acirc;m s\u1EA1m. C&ocirc;ng ngh\u1EC7 Exosome c&ograve;n t\u1ED1i \u01B0u h&oacute;a kh\u1EA3 n\u0103ng h\u1EA5p th\u1EE5 d\u01B0\u1EE1ng ch\u1EA5t, nu&ocirc;i d\u01B0\u1EE1ng l&agrave;n da kh\u1ECFe m\u1EA1nh t\u1EEB s&acirc;u b&ecirc;n trong. V\u1EDBi kh\u1EA3 n\u0103ng kh&aacute;ng vi&ecirc;m v&agrave; l&agrave;m d\u1ECBu v\u01B0\u1EE3t tr\u1ED9i, s\u1EA3n ph\u1EA9m \u0111\u1EB7c bi\u1EC7t ph&ugrave; h\u1EE3p v\u1EDBi l&agrave;n da nh\u1EA1y c\u1EA3m ho\u1EB7c sau c&aacute;c li\u1EC7u tr&igrave;nh \u0111i\u1EC1u tr\u1ECB.</p>', Image: "https://down-vn.img.susercontent.com/file/75937cc15391ca9e7b1fd39f2ff72af8" },
    { id: 3, Title: "QUY M\xD4 NH\xC0 M\xC1Y \u0110\u1EA0T TI\xCAU CHU\u1EA8N QU\u1ED0C T\u1EBE", Heading: "C\xD4NG NGH\u1EC6 LI\xCAN K\u1EBET CH\xC9O 2IN1", Mota: '<p>Nh&agrave; m&aacute;y s\u1EA3n xu\u1EA5t Rau S\u1EA1ch Tr\u1EA7n Gia \u0111\u01B0\u1EE3c x&acirc;y d\u1EF1ng tr&ecirc;n di\u1EC7n t&iacute;ch r\u1ED9ng l\u1EDBn v&agrave; \u0111\u1EA1t ti&ecirc;u chu\u1EA9n CGMP, gi&uacute;p \u0111\u1EA3m b\u1EA3o quy tr&igrave;nh nghi&ecirc;n c\u1EE9u v&agrave; ph&aacute;t tri\u1EC3n s\u1EA3n ph\u1EA9m \u0111\u1EA1t ch\u1EA5t l\u01B0\u1EE3ng cao nh\u1EA5t. V\u1EDBi \u0111\u1ED9i ng\u0169 chuy&ecirc;n gia h&agrave;ng \u0111\u1EA7u trong l\u0129nh v\u1EF1c m\u1EF9 ph\u1EA9m v&agrave; y h\u1ECDc t&aacute;i t\u1EA1o, nh&agrave; m&aacute;y tr\u1EDF th&agrave;nh trung t&acirc;m ph&aacute;t tri\u1EC3n s\u1EA3n ph\u1EA9m \u0111\u1EA1t ti&ecirc;u chu\u1EA9n qu\u1ED1c t\u1EBF.</p><p>Nh\u1EDD h\u1EC7 th\u1ED1ng s\u1EA3n xu\u1EA5t \u0111\u1EA1t chu\u1EA9n, Rau S\u1EA1ch Tr\u1EA7n Gia \u0111&atilde; tr\u1EDF th&agrave;nh th\u01B0\u01A1ng hi\u1EC7u n\u1ED9i \u0111\u1ECBa \u0111\u01B0\u1EE3c tin d&ugrave;ng t\u1EA1i c&aacute;c b\u1EC7nh vi\u1EC7n v&agrave; th\u1EA9m m\u1EF9 vi\u1EC7n h&agrave;ng \u0111\u1EA7u t\u1EA1i H&agrave;n Qu\u1ED1c. S\u1EF1 nghi&ecirc;m ng\u1EB7t trong quy tr&igrave;nh nghi&ecirc;n c\u1EE9u v&agrave; ki\u1EC3m so&aacute;t ch\u1EA5t l\u01B0\u1EE3ng gi&uacute;p s\u1EA3n ph\u1EA9m kh&ocirc;ng ch\u1EC9 hi\u1EC7u qu\u1EA3 m&agrave; c&ograve;n an to&agrave;n cho ng\u01B0\u1EDDi d&ugrave;ng.</p><p>Rau S\u1EA1ch Tr\u1EA7n Gia n\u1ED5i b\u1EADt v\u1EDBi c&ocirc;ng ngh\u1EC7 t&iacute;ch h\u1EE3p 20 t\u1EF7 h\u1EA1t Exosome trong m\u1ED7i s\u1EA3n ph\u1EA9m &ndash; m\u1ED9t th&agrave;nh t\u1EF1u \u0111\u1ED9t ph&aacute; trong y h\u1ECDc t&aacute;i t\u1EA1o. Exosome ho\u1EA1t \u0111\u1ED9ng nh\u01B0 "ng\u01B0\u1EDDi v\u1EADn chuy\u1EC3n th&ocirc;ng minh" truy\u1EC1n t\u1EA3i c&aacute;c t&iacute;n hi\u1EC7u sinh h\u1ECDc c\u1EA7n thi\u1EBFt \u0111\u1EC3 th&uacute;c \u0111\u1EA9y qu&aacute; tr&igrave;nh ph\u1EE5c h\u1ED3i v&agrave; t&aacute;i t\u1EA1o da hi\u1EC7u qu\u1EA3.</p><p>S\u1EA3n ph\u1EA9m c\u1EE7a Rau S\u1EA1ch Tr\u1EA7n Gia k&iacute;ch th&iacute;ch s\u1EA3n sinh collagen v&agrave; elastin, c\u1EA3i thi\u1EC7n \u0111\u1ED9 \u0111&agrave;n h\u1ED3i v&agrave; gi&uacute;p l&agrave;n da kh\u1EAFc ph\u1EE5c t\u1ED5n th\u01B0\u01A1ng do m\u1EE5n, n&aacute;m, th&acirc;m s\u1EA1m. C&ocirc;ng ngh\u1EC7 Exosome c&ograve;n t\u1ED1i \u01B0u h&oacute;a kh\u1EA3 n\u0103ng h\u1EA5p th\u1EE5 d\u01B0\u1EE1ng ch\u1EA5t, nu&ocirc;i d\u01B0\u1EE1ng l&agrave;n da kh\u1ECFe m\u1EA1nh t\u1EEB s&acirc;u b&ecirc;n trong. V\u1EDBi kh\u1EA3 n\u0103ng kh&aacute;ng vi&ecirc;m v&agrave; l&agrave;m d\u1ECBu v\u01B0\u1EE3t tr\u1ED9i, s\u1EA3n ph\u1EA9m \u0111\u1EB7c bi\u1EC7t ph&ugrave; h\u1EE3p v\u1EDBi l&agrave;n da nh\u1EA1y c\u1EA3m ho\u1EB7c sau c&aacute;c li\u1EC7u tr&igrave;nh \u0111i\u1EC1u tr\u1ECB.</p>', Image: "https://down-vn.img.susercontent.com/file/75937cc15391ca9e7b1fd39f2ff72af8" }
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
    this.Breadcrumbs = [
      { name: "Trang ch\u1EE7", link: "/" },
      { name: "Danh s\xE1ch s\u1EA3n ph\u1EA9m", link: "/listsanpham" }
    ];
    const slugDM = this.route.snapshot.paramMap.get("slug");
    const result = slugDM?.split("-v5")[0];
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
  static \u0275fac = function DanhmucgioithieuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DanhmucgioithieuComponent)(\u0275\u0275directiveInject(ActivatedRoute));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DanhmucgioithieuComponent, selectors: [["app-danhmucgioithieu"]], decls: 26, vars: 8, consts: [[1, "w-full", "flex", "flex-col", "space-y-2", "items-center", "pb-8"], [1, "w-full", "relative"], ["src", "https://demo.alhikmahsoft.com/edufu/wp-content/uploads/2023/05/bred.png", "alt", "Banner", 1, "w-full", "h-96", "object-cover"], [1, "container", "absolute", "top-1/2", "left-1/2", "transform", "-translate-x-1/2", "-translate-y-1/2", "text-center"], [1, "text-4xl", "font-bold"], [1, "flex", "flex-row", "space-x-2", "p-2", "justify-center"], [3, "Breadcrumbs"], [1, "container", "mx-auto", "w-full", "rounded-lg", "p-2", "flex", "flex-row", "justify-center", "py-8"], [1, "w-full", "flex", "flex-col", "space-y-8", "px-8"], [1, "grid", "grid-cols-2", "gap-4", "rounded-lg", "p-2", "border"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white"], [1, "text-center", "text-2xl", "font-bold", "text-gray-800", "pt-8"], [1, "p-8", 3, "Config", "Type"], [1, "container", "flex", "flex-col", "space-y-2", "rounded-lg", "bg-white", 3, "href"], ["src", "https://matdash-nextjs-main.vercel.app/_next/image?url=%2Fimages%2Fproducts%2Fteddybear.jpg&w=640&q=75", "alt", "", "srcset", "", 1, "rounded-lg", "object-cover", "h-40"], ["width", "100%", "height", "315", "src", \u0275\u0275trustConstantResourceUrl`https://www.youtube.com/embed/RyNEwlb57ZY?si=N_NqnPe6xMW9uZck`, "title", "YouTube video player", "frameborder", "0", "allow", "accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share", "referrerpolicy", "strict-origin-when-cross-origin", "allowfullscreen", "", 1, "m-auto", "rounded-lg"]], template: function DanhmucgioithieuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "img", 2);
      \u0275\u0275elementStart(3, "div", 3)(4, "h1", 4);
      \u0275\u0275text(5, "Tin T\u1EE9c S\u1EF1 Ki\u1EC7n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275element(7, "app-breadscrumb", 6);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(8, "div", 7)(9, "div", 8);
      \u0275\u0275repeaterCreate(10, DanhmucgioithieuComponent_For_11_Template, 5, 0, "div", 9, \u0275\u0275repeaterTrackByIndex);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "div", 10)(13, "h2", 11);
      \u0275\u0275text(14, "H.DERMA K\xDD K\u1EBET \u0110\u1ED8C QUY\u1EC0N PH\xC2N PH\u1ED0I Rau S\u1EA1ch Tr\u1EA7n Gia T\u1EA0I VI\u1EC6T NAM");
      \u0275\u0275elementEnd();
      \u0275\u0275element(15, "app-swiper", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "div", 10)(17, "h2", 11);
      \u0275\u0275text(18, "\u0110\u1ED8I NG\u0168 CHUY\xCAN M\xD4N Rau S\u1EA1ch Tr\u1EA7n Gia VI\u1EC6T NAM HO\xC0N TH\xC0NH KH\xD3A HU\u1EA4N LUY\u1EC6N T\u1EA0I VI\u1EC6N DA LI\u1EC4U D\u01AF\u1EDAI S\u1EF0 D\u1EAAN D\u1EAET C\u1EE6A C\xC1C B\xC1C S\u0128 H\xC0NG \u0110\u1EA6U H\xC0N QU\u1ED0C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(19, "app-swiper", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 10)(21, "h2", 11);
      \u0275\u0275text(22, "\u0110\u1ED8I NG\u0168 CHUY\xCAN M\xD4N Rau S\u1EA1ch Tr\u1EA7n Gia VI\u1EC6T NAM HO\xC0N TH\xC0NH KH\xD3A HU\u1EA4N LUY\u1EC6N T\u1EA0I VI\u1EC6N DA LI\u1EC4U D\u01AF\u1EDAI S\u1EF0 D\u1EAAN D\u1EAET C\u1EE6A C\xC1C B\xC1C S\u0128 H\xC0NG \u0110\u1EA6U H\xC0N QU\u1ED0C");
      \u0275\u0275elementEnd();
      \u0275\u0275element(23, "app-swiper", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "a", 13);
      \u0275\u0275element(25, "img", 14);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275property("Breadcrumbs", ctx.Breadcrumbs);
      \u0275\u0275advance(3);
      \u0275\u0275repeater(ctx.Page);
      \u0275\u0275advance(5);
      \u0275\u0275property("Config", ctx.Config)("Type", "Baiviet");
      \u0275\u0275advance(4);
      \u0275\u0275property("Config", ctx.Config)("Type", "Baiviet");
      \u0275\u0275advance(4);
      \u0275\u0275property("Config", ctx.Config)("Type", "Baiviet");
      \u0275\u0275advance();
      \u0275\u0275property("href", "demo-v6", \u0275\u0275sanitizeUrl);
    }
  }, dependencies: [
    BreadscrumbComponent,
    CommonModule,
    MatInputModule,
    MatFormFieldModule,
    FormsModule,
    MatIconModule,
    MatButtonModule,
    SwiperComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DanhmucgioithieuComponent, { className: "DanhmucgioithieuComponent", filePath: "src/app/site/danhmucgioithieu/danhmucgioithieu.component.ts", lineNumber: 29 });
})();
export {
  DanhmucgioithieuComponent
};
//# sourceMappingURL=chunk-75Y3AZNB.js.map
