import './polyfills.server.mjs';
import {
  ListKhachhangComponent
} from "./chunk-2SQG42NW.mjs";
import "./chunk-SJGKJCZS.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-T2GSXKIR.mjs";
import "./chunk-VO5ZZWXY.mjs";
import "./chunk-NV7NCVB6.mjs";
import "./chunk-QGE5RGZP.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-SRFBCIVI.mjs";
import "./chunk-OLFDOXYK.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-BKIOO2IQ.mjs";
import "./chunk-UASPM37G.mjs";
import "./chunk-7FHKYRY5.mjs";
import {
  RouterModule
} from "./chunk-XXHMETOB.mjs";
import "./chunk-LXPCAAVO.mjs";
import "./chunk-MECBLMI6.mjs";
import "./chunk-XEJ7KODZ.mjs";
import "./chunk-2BTDEHR6.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-UYYJQ6OX.mjs";
import "./chunk-OBYVUVCN.mjs";
import "./chunk-G5Q3EA6K.mjs";
import "./chunk-AJSGP2QM.mjs";
import "./chunk-WVX3EDL3.mjs";
import "./chunk-AQETVGJS.mjs";
import "./chunk-5444DBJD.mjs";
import "./chunk-IU3FX4W2.mjs";
import "./chunk-DV7552T6.mjs";
import "./chunk-WUOSISWE.mjs";
import "./chunk-SPQ4ZDSL.mjs";
import "./chunk-K2LNKYXW.mjs";
import "./chunk-7RV546X3.mjs";
import "./chunk-IKKFEUUM.mjs";
import "./chunk-DRZ4ITVR.mjs";
import "./chunk-2JIL42JL.mjs";
import "./chunk-WGGH2PUJ.mjs";
import {
  ɵɵdefineInjector,
  ɵɵdefineNgModule
} from "./chunk-ADMXANIA.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/khachhang/khachhang.route.ts
var routes = [
  {
    path: "",
    component: ListKhachhangComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-NQJ44ZCL.mjs").then((c) => c.DetailKhachhangComponent)
      }, true ? { \u0275entryName: "src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts" } : {})
    ]
  }
];
var KhachhangRoutingModule = class _KhachhangRoutingModule {
  static \u0275fac = function KhachhangRoutingModule_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KhachhangRoutingModule)();
  };
  static \u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({ type: _KhachhangRoutingModule });
  static \u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({ imports: [RouterModule.forChild(routes), RouterModule] });
};
export {
  KhachhangRoutingModule
};
//# sourceMappingURL=chunk-XWHELEUD.mjs.map
