import './polyfills.server.mjs';
import {
  ListImportdataComponent
} from "./chunk-BZYY4D5N.mjs";
import "./chunk-ZQQZITWM.mjs";
import "./chunk-D62AO4VY.mjs";
import "./chunk-YBTIEM5M.mjs";
import "./chunk-OVGT4KIA.mjs";
import "./chunk-KJDLSRZI.mjs";
import "./chunk-DA5VIJEH.mjs";
import "./chunk-AP5UZC4F.mjs";
import "./chunk-U3P3IJ6Z.mjs";
import "./chunk-VL2LVL37.mjs";
import "./chunk-PFX6ZNS2.mjs";
import "./chunk-EB4UUH73.mjs";
import "./chunk-5FENH2CU.mjs";
import "./chunk-KMEFW6OC.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-ZVEFRUHR.mjs";
import "./chunk-233BLFDB.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-DX7YIIY5.mjs";
import "./chunk-IQORQLD3.mjs";
import "./chunk-AM3BBS5E.mjs";
import "./chunk-XHRWGDIX.mjs";
import {
  RouterModule
} from "./chunk-TLYIA537.mjs";
import "./chunk-3VZFOMYA.mjs";
import "./chunk-5PWX7G23.mjs";
import "./chunk-SLWHV4LF.mjs";
import "./chunk-KJH76OSC.mjs";
import "./chunk-PQY5STY2.mjs";
import "./chunk-KU7CK3YB.mjs";
import "./chunk-4QEJTP76.mjs";
import "./chunk-K4777VIL.mjs";
import "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
import "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import "./chunk-K6ADGRHN.mjs";
import "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import "./chunk-UP6A7POK.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-3RMAAFYO.mjs";
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/importdata/importdata.route.ts
var routes = [
  {
    path: "",
    component: ListImportdataComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-JB7CHKEL.mjs").then((c) => c.DetailImportdataComponent)
      }, true ? { \u0275entryName: "src/app/admin/importdata/detailimportdata/detailimportdata.component.ts" } : {})
    ]
  }
];
var ImportdataRoutingModule = class _ImportdataRoutingModule {
  static \u0275fac = function ImportdataRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportdataRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _ImportdataRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  ImportdataRoutingModule
};
//# sourceMappingURL=chunk-B372NYIN.mjs.map
