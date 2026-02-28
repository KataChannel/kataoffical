import './polyfills.server.mjs';
import {
  ListNhomnccComponent
} from "./chunk-3XCTJ7WJ.mjs";
import "./chunk-QE2YIIVZ.mjs";
import "./chunk-XJHVYA25.mjs";
import "./chunk-RT23KED7.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-OLFDOXYK.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import "./chunk-JNHRISVT.mjs";
import {
  RouterModule
} from "./chunk-HRPVH7WR.mjs";
import "./chunk-VF45CXPP.mjs";
import "./chunk-3I55OMWU.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import "./chunk-LPLDGY7B.mjs";
import "./chunk-GDGUHJEW.mjs";
import "./chunk-UCMTPX2K.mjs";
import "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import "./chunk-27SFIHK6.mjs";
import "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import "./chunk-RDBGA3AP.mjs";
import "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import "./chunk-VNUZ7HP6.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/nhomncc/nhomncc.route.ts
var routes = [
  {
    path: "",
    component: ListNhomnccComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-USY5RXX2.mjs").then((c) => c.DetailNhomnccComponent)
      }, true ? { \u0275entryName: "src/app/admin/nhomncc/detailnhomncc/detailnhomncc.component.ts" } : {})
    ]
  }
];
var NhomnccRoutingModule = class _NhomnccRoutingModule {
  static \u0275fac = function NhomnccRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhomnccRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _NhomnccRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  NhomnccRoutingModule
};
//# sourceMappingURL=chunk-IY56HFSV.mjs.map
