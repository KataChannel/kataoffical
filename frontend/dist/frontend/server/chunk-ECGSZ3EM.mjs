import './polyfills.server.mjs';
import {
  UserService
} from "./chunk-KPXPV3IG.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  MatDatepickerModule
} from "./chunk-RUJ72W7P.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-TGETIOQI.mjs";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule,
  ReactiveFormsModule
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-QFPTY5IH.mjs";
import "./chunk-A6W66WDU.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatAnchor,
  MatButtonModule
} from "./chunk-2QXHUJNF.mjs";
import {
  MatNativeDateModule
} from "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import {
  RouterLink,
  RouterLinkActive,
  RouterOutlet
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  NgForOf
} from "./chunk-H3GF4RFC.mjs";
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
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

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
//# sourceMappingURL=chunk-ECGSZ3EM.mjs.map
