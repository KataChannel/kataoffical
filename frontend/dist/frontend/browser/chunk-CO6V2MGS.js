import {
  GoogleSheetService
} from "./chunk-CB53OP7A.js";
import {
  ConvertDriveData
} from "./chunk-657A73EG.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  StorageService
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule
} from "./chunk-E6DSVUBK.js";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/googlesheets/googlesheets.component.ts
var _c0 = () => ({ standalone: true });
function GooglesheetsComponent_For_24_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 9)(1, "div")(2, "span", 10);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 11)(5, "mat-form-field", 3)(6, "mat-label");
    \u0275\u0275text(7, "API Key");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "input", 4);
    \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_For_24_Template_input_ngModelChange_8_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(item_r2.ApiKey, $event) || (item_r2.ApiKey = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-form-field", 3)(10, "mat-label");
    \u0275\u0275text(11, "ID Google Sheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "input", 5);
    \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_For_24_Template_input_ngModelChange_12_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(item_r2.IdSheet, $event) || (item_r2.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-form-field", 3)(14, "mat-label");
    \u0275\u0275text(15, "Sheet Name");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "input", 6);
    \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_For_24_Template_input_ngModelChange_16_listener($event) {
      const item_r2 = \u0275\u0275restoreView(_r1).$implicit;
      \u0275\u0275twoWayBindingSet(item_r2.SheetName, $event) || (item_r2.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r2.Title);
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", item_r2.ApiKey);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r2.IdSheet);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", item_r2.SheetName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(9, _c0));
  }
}
var GooglesheetsComponent = class _GooglesheetsComponent {
  DriveInfo = {
    ApiKey: environment.GSApiKey || "",
    IdSheet: "12Mjlh55kVxdX_12bgITi-zHDsa8EO9Puc6bSOkleIjg",
    SheetName: "ListSheets"
  };
  ListSheets = JSON.parse(localStorage.getItem("ListSheets") || "[]");
  constructor() {
  }
  _GoogleSheetService = inject(GoogleSheetService);
  _StorageService = inject(StorageService);
  ngOnInit() {
  }
  GetDrive() {
    return __async(this, null, function* () {
      const result = yield this._GoogleSheetService.getDrive(this.DriveInfo);
      console.log(result);
      if (result.values.length > 0) {
        this.ListSheets = ConvertDriveData(result.values);
        this._StorageService.setItem("ListSheets", this.ListSheets);
        this.ngOnInit();
      }
    });
  }
  RemoveDrive() {
    localStorage.removeItem("ListSheets");
    this.ListSheets = [];
  }
  static \u0275fac = function GooglesheetsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GooglesheetsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GooglesheetsComponent, selectors: [["app-googlesheets"]], decls: 25, vars: 9, consts: [[1, "w-full", "flex", "flex-col", "space-y-8", "p-4"], [1, "font-bold", "text-xl", "p-2", "text-center"], [1, "w-full", "flex", "lg:flex-row", "flex-col", "lg:space-x-2", "lg:space-y-0", "space-y-2", "items-center"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng API Key", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp ID Google Sheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp Sheet Name", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-4"], [1, "font-bold", "p-2", "rounded-lg", "bg-slate-100"], [1, "w-full", "grid", "lg:grid-cols-3", "gap-2", "items-center"]], template: function GooglesheetsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275text(2, "C\u1EA5u h\xECnh File Google Sheets");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "div", 2)(4, "mat-form-field", 3)(5, "mat-label");
      \u0275\u0275text(6, "API Key");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "input", 4);
      \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_Template_input_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DriveInfo.ApiKey, $event) || (ctx.DriveInfo.ApiKey = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(8, "mat-form-field", 3)(9, "mat-label");
      \u0275\u0275text(10, "ID Google Sheet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DriveInfo.IdSheet, $event) || (ctx.DriveInfo.IdSheet = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(12, "mat-form-field", 3)(13, "mat-label");
      \u0275\u0275text(14, "Sheet Name");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 6);
      \u0275\u0275twoWayListener("ngModelChange", function GooglesheetsComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DriveInfo.SheetName, $event) || (ctx.DriveInfo.SheetName = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "div", 7)(17, "button", 8);
      \u0275\u0275listener("click", function GooglesheetsComponent_Template_button_click_17_listener() {
        return ctx.GetDrive();
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "sync");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "button", 8);
      \u0275\u0275listener("click", function GooglesheetsComponent_Template_button_click_20_listener() {
        return ctx.RemoveDrive();
      });
      \u0275\u0275elementStart(21, "mat-icon");
      \u0275\u0275text(22, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275repeaterCreate(23, GooglesheetsComponent_For_24_Template, 17, 10, "div", 9, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.DriveInfo.ApiKey);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(6, _c0));
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DriveInfo.IdSheet);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(7, _c0));
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DriveInfo.SheetName);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(8, _c0));
      \u0275\u0275advance(8);
      \u0275\u0275repeater(ctx.ListSheets);
    }
  }, dependencies: [
    CommonModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GooglesheetsComponent, { className: "GooglesheetsComponent", filePath: "src/app/shared/googlesheets/googlesheets.component.ts", lineNumber: 26 });
})();
export {
  GooglesheetsComponent
};
//# sourceMappingURL=chunk-CO6V2MGS.js.map
