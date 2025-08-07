import './polyfills.server.mjs';
import {
  ListdanhmucComponent
} from "./chunk-FYXI7UZY.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-GOLLTURE.mjs";
import "./chunk-Z7QVUZWX.mjs";
import "./chunk-I23Q342N.mjs";
import "./chunk-YOUETZOR.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
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
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-QFPTY5IH.mjs";
import "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  ActivatedRoute
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import "./chunk-H3GF4RFC.mjs";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/listdanhmuc/listdanhmuc.ts
var ListDanhmuc = [
  {
    "id": "1a2b3c4d-1234-5678-9101-112131415161",
    "Title": "Danh m\u1EE5c 1",
    "Slug": "danh-muc-1",
    "CreatedAt": "2024-01-01T10:00:00Z"
  },
  {
    "id": "2b3c4d5e-2345-6789-1011-121314151617",
    "Title": "Danh m\u1EE5c 2",
    "Slug": "danh-muc-2",
    "CreatedAt": "2024-01-02T11:00:00Z"
  },
  {
    "id": "3c4d5e6f-3456-7891-0111-213141516171",
    "Title": "Danh m\u1EE5c 3",
    "Slug": "danh-muc-3",
    "CreatedAt": "2024-01-03T12:00:00Z"
  },
  {
    "id": "4d5e6f7g-4567-8910-1112-314151617181",
    "Title": "Danh m\u1EE5c 4",
    "Slug": "danh-muc-4",
    "CreatedAt": "2024-01-04T13:00:00Z"
  },
  {
    "id": "5e6f7g8h-5678-9101-1213-415161718191",
    "Title": "Danh m\u1EE5c 5",
    "Slug": "danh-muc-5",
    "CreatedAt": "2024-01-05T14:00:00Z"
  }
];
var Forms = [
  {
    "id": 1,
    "Title": "Ti\xEAu \u0110\u1EC1",
    "value": "Title",
    "Type": "text",
    "required": true,
    "isShow": true
  },
  {
    "id": 2,
    "Title": "Slug",
    "value": "Slug",
    "Type": "text",
    "required": true,
    "isShow": true
  },
  {
    "id": 3,
    "Title": "Ng\xE0y T\u1EA1o",
    "value": "createdAt",
    "Type": "date",
    "required": false,
    "isShow": true
  },
  {
    "id": 4,
    "Title": "M\xF4 T\u1EA3",
    "value": "description",
    "Type": "textarea",
    "required": false,
    "isShow": true
  },
  {
    "id": 5,
    "Title": "Tr\u1EA1ng Th\xE1i",
    "value": "status",
    "Type": "toggle",
    "required": true,
    "isShow": true
  }
];

// src/app/admin/listdanhmuc/detaildanhmuc/detaildanhmuc.component.ts
var _c0 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.id;
function DetailDanhmucComponent_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailDanhmucComponent_Conditional_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.SaveData());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailDanhmucComponent_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailDanhmucComponent_Conditional_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isEdit = true);
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailDanhmucComponent_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div");
    \u0275\u0275text(1, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "div", 7)(3, "button", 8);
    \u0275\u0275listener("click", function DetailDanhmucComponent_Conditional_13_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isDelete = false);
    });
    \u0275\u0275text(4, " \u0110\u1ED3ng \xDD ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 9);
    \u0275\u0275listener("click", function DetailDanhmucComponent_Conditional_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isDelete = false);
    });
    \u0275\u0275text(6, " Hu\u1EF7 B\u1ECF ");
    \u0275\u0275elementEnd()();
  }
}
function DetailDanhmucComponent_Conditional_14_For_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 10)(1, "mat-label");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 12);
    \u0275\u0275twoWayListener("ngModelChange", function DetailDanhmucComponent_Conditional_14_For_1_Template_input_ngModelChange_3_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.Detail == null ? null : ctx_r1.Detail.Data[item_r6.value], $event) || ((ctx_r1.Detail == null ? null : ctx_r1.Detail.Data)[item_r6.value] = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.Title);
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.Detail == null ? null : ctx_r1.Detail.Data[item_r6.value]);
    \u0275\u0275property("disabled", !ctx_r1.isEdit)("ngModelOptions", \u0275\u0275pureFunction0(5, _c0))("placeholder", item_r6.Title);
  }
}
function DetailDanhmucComponent_Conditional_14_ForEmpty_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 11);
    \u0275\u0275text(1, "There are no items.");
    \u0275\u0275elementEnd();
  }
}
function DetailDanhmucComponent_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275repeaterCreate(0, DetailDanhmucComponent_Conditional_14_For_1_Template, 4, 6, "mat-form-field", 10, _forTrack0, false, DetailDanhmucComponent_Conditional_14_ForEmpty_2_Template, 2, 0, "span", 11);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275repeater(ctx_r1.Detail == null ? null : ctx_r1.Detail.Forms);
  }
}
var DetailDanhmucComponent = class _DetailDanhmucComponent {
  _ListdanhmucComponent = inject(ListdanhmucComponent);
  _router = inject(ActivatedRoute);
  constructor() {
  }
  Detail = { Data: {}, Forms: [] };
  isEdit = false;
  isDelete = false;
  idDanhmuc;
  ngOnInit() {
    this._router.paramMap.subscribe((data) => __async(this, null, function* () {
      this.idDanhmuc = data.get("id");
      this.Detail.Forms = Forms;
      this.isEdit = this.idDanhmuc === "0";
      if (this.idDanhmuc) {
        this._ListdanhmucComponent.drawer.open();
        this.Detail.Data = ListDanhmuc.find((v) => v.id === this.idDanhmuc) || {};
      } else {
        this.Detail.Data = {};
      }
    }));
  }
  SaveData() {
    if (this.idDanhmuc == "0") {
      ListDanhmuc.push(this.Detail.Data);
    } else {
      ListDanhmuc[this.idDanhmuc] = this.Detail.Data;
    }
    this.isEdit = false;
  }
  static \u0275fac = function DetailDanhmucComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailDanhmucComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailDanhmucComponent, selectors: [["app-detaildanhmuc"]], decls: 15, vars: 3, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [1, "flex", "flex-row", "space-x-2", "mt-4", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["appearance", "outline", 1, "w-full"], [1, "p-2", "text-center"], ["matInput", "", 3, "ngModelChange", "ngModel", "disabled", "ngModelOptions", "placeholder"]], template: function DetailDanhmucComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailDanhmucComponent_Template_button_click_1_listener() {
        return ctx._ListdanhmucComponent.drawer.close();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275template(7, DetailDanhmucComponent_Conditional_7_Template, 3, 0, "button", 4)(8, DetailDanhmucComponent_Conditional_8_Template, 3, 0, "button", 4);
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function DetailDanhmucComponent_Template_button_click_9_listener() {
        return ctx.isDelete = true;
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 6);
      \u0275\u0275template(13, DetailDanhmucComponent_Conditional_13_Template, 7, 0)(14, DetailDanhmucComponent_Conditional_14_Template, 3, 1);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.Detail == null ? null : ctx.Detail.Hoten) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isEdit == true ? 7 : 8);
      \u0275\u0275advance(6);
      \u0275\u0275conditional(ctx.isDelete == true ? 13 : 14);
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatInputModule, MatInput, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatIconModule, MatIcon, MatButtonModule, MatButton, MatIconButton], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailDanhmucComponent, { className: "DetailDanhmucComponent", filePath: "src/app/admin/listdanhmuc/detaildanhmuc/detaildanhmuc.component.ts", lineNumber: 23 });
})();
export {
  DetailDanhmucComponent
};
//# sourceMappingURL=chunk-W3H2QUY5.mjs.map
