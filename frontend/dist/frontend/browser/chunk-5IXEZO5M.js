import {
  ListKhachhangComponent
} from "./chunk-5GQ4E3DB.js";
import "./chunk-4UKCSTFJ.js";
import "./chunk-KRR6EHK2.js";
import "./chunk-56QAEOBZ.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-X7ROAIMK.js";
import "./chunk-FTMLWTPE.js";
import "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import "./chunk-VZZGNK7J.js";
import "./chunk-LIKOVN7R.js";
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

// src/app/admin/khachhang/khachhang.route.ts
var routes = [
  __spreadValues({
    path: "dashboard",
    loadComponent: () => import("./chunk-24YQYE24.js").then((c) => c.DashboarkhachhangComponent)
  }, false ? { \u0275entryName: "src/app/admin/khachhang/dashboarkhachhang/dashboarkhachhang.component.ts" } : {}),
  {
    path: "",
    component: ListKhachhangComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-6AEVIQFW.js").then((c) => c.DetailKhachhangComponent)
      }, false ? { \u0275entryName: "src/app/admin/khachhang/detailkhachhang/detailkhachhang.component.ts" } : {})
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
//# sourceMappingURL=chunk-5IXEZO5M.js.map
