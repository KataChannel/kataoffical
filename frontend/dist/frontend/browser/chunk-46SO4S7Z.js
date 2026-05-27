import {
  UserService
} from "./chunk-NL7URNET.js";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-2GXGFE2W.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-3D4DVDG5.js";
import {
  MatDatepickerModule
} from "./chunk-5Z5IQRCP.js";
import {
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  FormsModule,
  MatFormFieldModule,
  ReactiveFormsModule
} from "./chunk-TMSN764N.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import {
  MatAnchor,
  MatButtonModule
} from "./chunk-FL6G6YYX.js";
import {
  MatNativeDateModule
} from "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule,
  NgForOf
} from "./chunk-TAI2MURD.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵproperty,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/common/users/account/account.component.ts
function AccountComponent_div_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "a", 5)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 6);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("routerLink", item_r1.link);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.icon);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.title);
  }
}
var AccountComponent = class _AccountComponent {
  constructor() {
  }
  profile = signal({});
  _UserService = inject(UserService);
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile();
      this.profile = this._UserService.profile;
      console.log(this.profile);
    });
  }
  AccountMenus = [
    { id: 1, title: "T\xE0i Kho\u1EA3n", link: "general", icon: "account_circle" }
    // {id:2,title:'Thông Báo',link:'notifications',icon:'notifications'},
    // {id:4,title:'Thanh Toán',link:'billing',icon:'receipt'},
    // {id:3,title:'Bảo Mật',link:'security',icon:'lock'},
  ];
  Update() {
    this._UserService.updateUser(this.profile()).then(() => {
    });
  }
  static \u0275fac = function AccountComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AccountComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _AccountComponent, selectors: [["app-account"]], decls: 6, vars: 1, consts: [[1, "relative", "w-full", "h-full", "bg-slate-200"], [1, "h-full", "relative", "flex", "flex-col", "space-y", "p-2", "bg-slate-50/70"], [1, "border-t", "p-2", "flex", "items-center", "justify-between"], [1, "flex", "flex-row", "items-center", "flex-wrap", "gap-2"], [4, "ngFor", "ngForOf"], ["mat-flat-button", "", "routerLinkActive", "!bg-[#0B9444] !text-white", 1, "flex", "items-center", 3, "routerLink"], [1, "whitespace-nowrap"]], template: function AccountComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3);
      \u0275\u0275template(4, AccountComponent_div_4_Template, 6, 3, "div", 4);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(5, "router-outlet");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.AccountMenus);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    ReactiveFormsModule,
    FormsModule,
    MatFormFieldModule,
    MatInputModule,
    MatSelectModule,
    MatButtonModule,
    MatAnchor,
    MatIconModule,
    MatIcon,
    MatDatepickerModule,
    MatNativeDateModule,
    RouterOutlet,
    RouterLink,
    RouterLinkActive
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(AccountComponent, { className: "AccountComponent", filePath: "src/app/shared/common/users/account/account.component.ts", lineNumber: 34 });
})();
export {
  AccountComponent
};
//# sourceMappingURL=chunk-46SO4S7Z.js.map
