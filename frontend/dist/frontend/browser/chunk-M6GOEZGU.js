import {
  ListNhacungcapComponent
} from "./chunk-W6DTH5OP.js";
import "./chunk-MDKJ5PGV.js";
import "./chunk-KRR6EHK2.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-X7ROAIMK.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-OTAJRW5P.js";
import "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-JFLWRVXN.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import "./chunk-VZZGNK7J.js";
import "./chunk-3J77SWWE.js";
import "./chunk-ZAANGQNB.js";
import "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  RouterModule
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/nhacungcap/nhacungcap.route.ts
var routes = [
  {
    path: "",
    component: ListNhacungcapComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-QFDQ6ZLB.js").then((c) => c.DetailNhacungcapComponent)
      }, false ? { \u0275entryName: "src/app/admin/nhacungcap/detailnhacungcap/detailnhacungcap.component.ts" } : {})
    ]
  }
];
var NhacungcapRoutingModule = class _NhacungcapRoutingModule {
  static \u0275fac = function NhacungcapRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhacungcapRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _NhacungcapRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  NhacungcapRoutingModule
};
//# sourceMappingURL=chunk-M6GOEZGU.js.map
