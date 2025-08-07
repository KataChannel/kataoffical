import {
  UserService
} from "./chunk-XGCTO3IF.js";
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
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  ɵNgNoValidate
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButton,
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
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵlistener,
  ɵɵproperty,
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

// src/app/shared/common/users/account/password/password.component.ts
var PasswordComponent = class _PasswordComponent {
  user = {
    oldpass: "",
    newpass: "",
    confirmnewpass: ""
  };
  profile = signal({});
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  _UserService = inject(UserService);
  constructor() {
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._UserService.getProfile();
      console.log(this._UserService.profile());
    });
  }
  ChangePass() {
    console.log(this.user);
    if (this.user.oldpass == "" || this.user.newpass == "" || this.user.confirmnewpass == "") {
    } else if (this.user.newpass != this.user.confirmnewpass) {
    } else {
      const data = {
        id: this._UserService.profile().id,
        oldpass: this.user.oldpass,
        newpass: this.user.newpass
      };
      this._UserService.changepass(data).then((data2) => {
        if (data2[0] == 200) {
          this.user = {
            oldpass: "",
            newpass: "",
            confirmnewpass: ""
          };
        } else {
        }
      });
    }
  }
  static \u0275fac = function PasswordComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PasswordComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PasswordComponent, selectors: [["app-password"]], decls: 29, vars: 15, consts: [[1, "w-full", "mx-auto", "bg-gray-100", "rounded-lg", "shadow", "p-4"], [1, "text-2xl", "font-bold", "mb-6"], [1, "space-y-6"], [1, "grid", "grid-cols-1", "gap-6"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "id", "currentPassword", "name", "currentPassword", 3, "ngModelChange", "type", "ngModel"], ["mat-icon-button", "", "matSuffix", "", 3, "click"], ["matInput", "", "id", "newPassword", "name", "newPassword", 3, "ngModelChange", "type", "ngModel"], ["matInput", "", "id", "confirmPassword", "name", "confirmPassword", 3, "ngModelChange", "type", "ngModel"], [1, "flex", "justify-end"], ["mat-raised-button", "", "color", "primary", "type", "submit", 1, "w-full", "sm:w-auto", 3, "click"]], template: function PasswordComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "h2", 1);
      \u0275\u0275text(2, "\u0110\u1ED5i m\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(3, "form", 2)(4, "div", 3)(5, "mat-form-field", 4)(6, "mat-label");
      \u0275\u0275text(7, "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "input", 5);
      \u0275\u0275twoWayListener("ngModelChange", function PasswordComponent_Template_input_ngModelChange_8_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.oldpass, $event) || (ctx.user.oldpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "button", 6);
      \u0275\u0275listener("click", function PasswordComponent_Template_button_click_9_listener() {
        return ctx.hideCurrentPassword = !ctx.hideCurrentPassword;
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "mat-form-field", 4)(13, "mat-label");
      \u0275\u0275text(14, "M\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function PasswordComponent_Template_input_ngModelChange_15_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.newpass, $event) || (ctx.user.newpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "button", 6);
      \u0275\u0275listener("click", function PasswordComponent_Template_button_click_16_listener() {
        return ctx.hideNewPassword = !ctx.hideNewPassword;
      });
      \u0275\u0275elementStart(17, "mat-icon");
      \u0275\u0275text(18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(19, "mat-form-field", 4)(20, "mat-label");
      \u0275\u0275text(21, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "input", 8);
      \u0275\u0275twoWayListener("ngModelChange", function PasswordComponent_Template_input_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.confirmnewpass, $event) || (ctx.user.confirmnewpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "button", 6);
      \u0275\u0275listener("click", function PasswordComponent_Template_button_click_23_listener() {
        return ctx.hideConfirmPassword = !ctx.hideConfirmPassword;
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(26, "div", 9)(27, "button", 10);
      \u0275\u0275listener("click", function PasswordComponent_Template_button_click_27_listener() {
        return ctx.ChangePass();
      });
      \u0275\u0275text(28, "\u0110\u1ED5i m\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("type", ctx.hideCurrentPassword ? "password" : "text");
      \u0275\u0275twoWayProperty("ngModel", ctx.user.oldpass);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "Hide password")("aria-pressed", ctx.hideCurrentPassword);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hideCurrentPassword ? "visibility_off" : "visibility");
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hideNewPassword ? "password" : "text");
      \u0275\u0275twoWayProperty("ngModel", ctx.user.newpass);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "Hide password")("aria-pressed", ctx.hideNewPassword);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hideNewPassword ? "visibility_off" : "visibility");
      \u0275\u0275advance(4);
      \u0275\u0275property("type", ctx.hideConfirmPassword ? "password" : "text");
      \u0275\u0275twoWayProperty("ngModel", ctx.user.confirmnewpass);
      \u0275\u0275advance();
      \u0275\u0275attribute("aria-label", "Hide password")("aria-pressed", ctx.hideConfirmPassword);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hideConfirmPassword ? "visibility_off" : "visibility");
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    NgModel,
    NgForm,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PasswordComponent, { className: "PasswordComponent", filePath: "src/app/shared/common/users/account/password/password.component.ts", lineNumber: 24 });
})();
export {
  PasswordComponent
};
//# sourceMappingURL=chunk-FRZN4ZB2.js.map
