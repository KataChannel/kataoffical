import './polyfills.server.mjs';
import {
  ListKhachhangComponent
} from "./chunk-27R3XQP5.mjs";
import "./chunk-CJ3CJXAJ.mjs";
import "./chunk-2FMT7VQU.mjs";
import "./chunk-L2YTN2QG.mjs";
import "./chunk-QE2YIIVZ.mjs";
import "./chunk-XJHVYA25.mjs";
import "./chunk-RT23KED7.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-BLREHDPM.mjs";
import "./chunk-OLFDOXYK.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-AESSWZ4W.mjs";
import "./chunk-JNHRISVT.mjs";
import "./chunk-NU7WWMYS.mjs";
import {
  RouterModule
} from "./chunk-HRPVH7WR.mjs";
import "./chunk-VF45CXPP.mjs";
import "./chunk-3I55OMWU.mjs";
import "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import "./chunk-6GML6PCL.mjs";
import "./chunk-LPLDGY7B.mjs";
import "./chunk-E2GALVII.mjs";
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

// src/app/admin/khachhang/khachhang.route.ts
var routes = [
  {
    path: "",
    component: ListKhachhangComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-4O7R3VGI.mjs").then((c) => c.DetailKhachhangComponent)
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
//# sourceMappingURL=chunk-MH3HQMFS.mjs.map
