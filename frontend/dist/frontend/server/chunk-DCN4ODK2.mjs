import './polyfills.server.mjs';
import {
  ListImportdataComponent
} from "./chunk-RGAE2D6N.mjs";
import "./chunk-6M3CKL4Z.mjs";
import "./chunk-C2TIJSZX.mjs";
import "./chunk-3BFDZXX3.mjs";
import "./chunk-3PYZ6K7Q.mjs";
import "./chunk-JL4WQNZB.mjs";
import "./chunk-KWEUPIGK.mjs";
import "./chunk-BT4TH55C.mjs";
import "./chunk-SJGKJCZS.mjs";
import "./chunk-PEEAI7OM.mjs";
import "./chunk-NV7NCVB6.mjs";
import "./chunk-QGE5RGZP.mjs";
import "./chunk-V5JTJVVY.mjs";
import "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import "./chunk-HSH2C6QH.mjs";
import "./chunk-SRFBCIVI.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-BKIOO2IQ.mjs";
import "./chunk-UASPM37G.mjs";
import "./chunk-7FHKYRY5.mjs";
import "./chunk-LRQVYHIC.mjs";
import {
  RouterModule
} from "./chunk-XXHMETOB.mjs";
import "./chunk-LXPCAAVO.mjs";
import "./chunk-MECBLMI6.mjs";
import "./chunk-XEJ7KODZ.mjs";
import "./chunk-2BTDEHR6.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-UYYJQ6OX.mjs";
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

// src/app/admin/importdata/importdata.route.ts
var routes = [
  {
    path: "",
    component: ListImportdataComponent,
    children: [
      __spreadValues({
        path: ":id",
        loadComponent: () => import("./chunk-PPY4LVM3.mjs").then((c) => c.DetailImportdataComponent)
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
//# sourceMappingURL=chunk-DCN4ODK2.mjs.map
