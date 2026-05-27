import {
  ListNhacungcapComponent
} from "./chunk-HY4XXK66.js";
import "./chunk-QEWHOYUO.js";
import "./chunk-W2AEWQA4.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-7SCXXJPI.js";
import "./chunk-4I62SID5.js";
import "./chunk-DR2JAJDC.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-QY5L4FGH.js";
import "./chunk-D7PAKJDY.js";
import {
  RouterModule
} from "./chunk-2GXGFE2W.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-2WTGXRSQ.js";
import "./chunk-Y6PF6L3J.js";
import "./chunk-3D4DVDG5.js";
import "./chunk-5Z5IQRCP.js";
import "./chunk-SP2Z3Q73.js";
import "./chunk-TAPSLW5I.js";
import "./chunk-GQA7LESQ.js";
import "./chunk-FRF6QBEZ.js";
import "./chunk-TMSN764N.js";
import "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import "./chunk-FL6G6YYX.js";
import "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import "./chunk-TAI2MURD.js";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-SEHLAVZZ.js";
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
        loadComponent: () => import("./chunk-2IGXGFA6.js").then((c) => c.DetailNhacungcapComponent)
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
//# sourceMappingURL=chunk-NGQ2VBVV.js.map
