import {
  ListNhacungcapComponent
} from "./chunk-RMYMZ4LO.js";
import "./chunk-VRWIKL3Q.js";
import "./chunk-2XNI5BG3.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-U6AGDL5A.js";
import "./chunk-YK4IEOL5.js";
import "./chunk-TVYI4UUP.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-XY2N6Z76.js";
import "./chunk-RUSDLITN.js";
import {
  RouterModule
} from "./chunk-AGKEHWOL.js";
import "./chunk-SSKGL4JO.js";
import "./chunk-5F4VG3UZ.js";
import "./chunk-EWUH5CQR.js";
import "./chunk-FL27G2EY.js";
import "./chunk-43IDDEVP.js";
import "./chunk-Z46IZ3PI.js";
import "./chunk-TUEMV45J.js";
import "./chunk-E3N2TZ4N.js";
import "./chunk-JNSSVLJO.js";
import "./chunk-65RDCWJI.js";
import "./chunk-XDPJU2GK.js";
import "./chunk-SOPKJ4GV.js";
import "./chunk-ZRMLZ234.js";
import "./chunk-4ERWVCO4.js";
import "./chunk-U5KYXYKC.js";
import "./chunk-FZT2LBIG.js";
import "./chunk-BRETK2KI.js";
import "./chunk-EMBYIBW3.js";
import "./chunk-HCACJZKN.js";
import "./chunk-RKTFENMZ.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-RBDY2J7V.js";
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
        loadComponent: () => import("./chunk-AMANPCIA.js").then((c) => c.DetailNhacungcapComponent)
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
//# sourceMappingURL=chunk-AYYQJS2W.js.map
