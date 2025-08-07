import {
  NgxFileDropComponent,
  NgxFileDropContentTemplateDirective,
  NgxFileDropModule
} from "./chunk-KK6GX724.js";
import {
  UploadService
} from "./chunk-GW3FSJBW.js";
import "./chunk-WMRPSYJH.js";
import "./chunk-PKPIUWLZ.js";
import "./chunk-7VZTPIES.js";
import "./chunk-R5HFYA7U.js";
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
  NgModel
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
import {
  DomSanitizer
} from "./chunk-KJMZCM3Q.js";
import "./chunk-E6DSVUBK.js";
import {
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵproperty,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import "./chunk-SXK72SKC.js";

// src/app/shared/common/users/account/general/general.component.ts
function GeneralComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 23)(1, "span");
    \u0275\u0275text(2, "Drop file Here");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 24);
    \u0275\u0275listener("click", function GeneralComponent_ng_template_9_Template_span_click_3_listener() {
      const openFileSelector_r2 = \u0275\u0275restoreView(_r1).openFileSelector;
      return \u0275\u0275resetView(openFileSelector_r2());
    });
    \u0275\u0275text(4, "Ch\u1ECDn File");
    \u0275\u0275elementEnd()();
  }
}
var GeneralComponent = class _GeneralComponent {
  sanitizer;
  isLoading = false;
  account = {};
  isEditAvatar = false;
  files = [];
  profile = signal({});
  hideCurrentPassword = true;
  hideNewPassword = true;
  hideConfirmPassword = true;
  user = {
    oldpass: "",
    newpass: "",
    confirmnewpass: ""
  };
  _UserService = inject(UserService);
  _uploadService = inject(UploadService);
  Detail = {};
  constructor(sanitizer) {
    this.sanitizer = sanitizer;
  }
  getTrustUrl(url) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }
  handlePaste(event) {
    this.isLoading = true;
    const clipboardItems = event.clipboardData?.items;
    if (clipboardItems) {
      for (let i = 0; i < clipboardItems.length; i++) {
        const item = clipboardItems[i];
        if (item.type.indexOf("image") !== -1) {
          const blob = item.getAsFile();
          if (blob) {
            console.log("Pasted image:", blob);
            const file = new File([blob], `${this.account.email.split("@")[0]}_${(/* @__PURE__ */ new Date()).getTime()}.png`, {
              type: blob.type
            });
            this._uploadService.uploadDriver(file).then((res) => {
              console.log(res);
              this.account.Avatar = res.fileId;
              this.isLoading = false;
              this.isEditAvatar = false;
              this._UserService.updateUser(this.account);
            });
          }
        }
      }
    }
  }
  dropped(files) {
    this.isLoading = true;
    this.files = files;
    for (const droppedFile of files) {
      if (droppedFile.fileEntry.isFile) {
        const fileEntry = droppedFile.fileEntry;
        fileEntry.file((file) => {
          this._uploadService.uploadDriver(file).then((res) => {
            console.log(res);
            this.account.Avatar = res.fileId;
            this.isLoading = false;
            this.isEditAvatar = false;
            this._UserService.updateUser(this.account);
          });
        });
      }
    }
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
  static \u0275fac = function GeneralComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _GeneralComponent)(\u0275\u0275directiveInject(DomSanitizer));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _GeneralComponent, selectors: [["app-general"]], decls: 47, vars: 16, consts: [[1, "w-full", "h-full", "lg:grid", "lg:grid-cols-2", "gap-8", "p-2"], [1, "w-full", "flex", "flex-col", "gap-4", "rounded-lg", "p-4", "bg-slate-50"], [1, "text-lg", "font-bold"], [1, "relative", "w-40", "h-40", "cursor-pointer", "rounded-full", "bg-slate-300", "p-2", "mx-auto"], [1, "w-full", "h-full"], [1, "w-full", "h-full", "rounded-full", "absolute", "opacity-0", "group-hover:!opacity-80", "bg-black", "top-0", "right-0", "flex", "flex-row", "justify-center", "space-x-2", "items-center", "py-3", 3, "paste"], [1, "!relative"], ["browseBtnLabel", "Browse files", "dropZoneLabel", "Drag and drop your files here", 1, "whitespace-nowrap", 3, "onFileDrop", "showBrowseBtn"], ["ngx-file-drop-content-tmp", ""], [1, "flex", "flex-row", "justify-center", "items-center", "gap-2"], ["mat-flat-button", "", "color", "primary", 1, "flex", "flex-row", "gap-2"], ["mat-flat-button", "", "color", "warn", 1, "flex", "flex-row", "gap-2"], [1, "w-full", "rounded-lg", "p-4", "bg-slate-50"], [1, "w-full", "flex", "flex-col", "gap-4"], [1, "grid", "grid-cols-1", "gap-2"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "id", "currentPassword", "name", "currentPassword", 3, "ngModelChange", "type", "ngModel"], ["mat-icon-button", "", "color", "primary", "matSuffix", "", 3, "click"], ["matInput", "", "id", "newPassword", "name", "newPassword", 3, "ngModelChange", "type", "ngModel"], ["matInput", "", "id", "confirmPassword", "name", "confirmPassword", 3, "ngModelChange", "type", "ngModel"], [1, "flex", "justify-end"], ["mat-flat-button", "", "color", "primary", "type", "submit", 1, "w-full", "sm:w-auto", 3, "click"], [1, "w-full", "col-span-2", "gap-4", "rounded-lg", "p-4", "bg-slate-50"], [1, "!text-white", "p-4", "flex", "flex-col", "space-y-3"], [1, "font-bold", "p-2", "rounded-lg", "border", 3, "click"]], template: function GeneralComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "span", 2);
      \u0275\u0275text(3, "H\xECnh \u0110\u1EA1i di\u1EC7n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 3);
      \u0275\u0275element(5, "div", 4);
      \u0275\u0275elementStart(6, "div", 5);
      \u0275\u0275listener("paste", function GeneralComponent_Template_div_paste_6_listener($event) {
        return ctx.handlePaste($event);
      });
      \u0275\u0275elementStart(7, "div", 6)(8, "ngx-file-drop", 7);
      \u0275\u0275listener("onFileDrop", function GeneralComponent_Template_ngx_file_drop_onFileDrop_8_listener($event) {
        return ctx.dropped($event);
      });
      \u0275\u0275template(9, GeneralComponent_ng_template_9_Template, 5, 0, "ng-template", 8);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "div", 9)(11, "button", 10)(12, "span");
      \u0275\u0275text(13, "Upload");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "button", 11)(15, "span");
      \u0275\u0275text(16, "Reset");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(17, "div", 12)(18, "div", 13)(19, "span", 2);
      \u0275\u0275text(20, "Thay \u0111\u1ED5i m\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "div", 14)(22, "mat-form-field", 15)(23, "mat-label");
      \u0275\u0275text(24, "M\u1EADt kh\u1EA9u hi\u1EC7n t\u1EA1i");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function GeneralComponent_Template_input_ngModelChange_25_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.oldpass, $event) || (ctx.user.oldpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "button", 17);
      \u0275\u0275listener("click", function GeneralComponent_Template_button_click_26_listener() {
        return ctx.hideCurrentPassword = !ctx.hideCurrentPassword;
      });
      \u0275\u0275elementStart(27, "mat-icon");
      \u0275\u0275text(28);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(29, "mat-form-field", 15)(30, "mat-label");
      \u0275\u0275text(31, "M\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function GeneralComponent_Template_input_ngModelChange_32_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.newpass, $event) || (ctx.user.newpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 17);
      \u0275\u0275listener("click", function GeneralComponent_Template_button_click_33_listener() {
        return ctx.hideNewPassword = !ctx.hideNewPassword;
      });
      \u0275\u0275elementStart(34, "mat-icon");
      \u0275\u0275text(35);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(36, "mat-form-field", 15)(37, "mat-label");
      \u0275\u0275text(38, "X\xE1c nh\u1EADn m\u1EADt kh\u1EA9u m\u1EDBi");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "input", 19);
      \u0275\u0275twoWayListener("ngModelChange", function GeneralComponent_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.user.confirmnewpass, $event) || (ctx.user.confirmnewpass = $event);
        return $event;
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 17);
      \u0275\u0275listener("click", function GeneralComponent_Template_button_click_40_listener() {
        return ctx.hideConfirmPassword = !ctx.hideConfirmPassword;
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 20)(44, "button", 21);
      \u0275\u0275listener("click", function GeneralComponent_Template_button_click_44_listener() {
        return ctx.ChangePass();
      });
      \u0275\u0275text(45, "\u0110\u1ED5i m\u1EADt kh\u1EA9u");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275element(46, "div", 22);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275property("showBrowseBtn", true);
      \u0275\u0275advance(17);
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
  }, dependencies: [NgxFileDropModule, NgxFileDropComponent, NgxFileDropContentTemplateDirective, MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, MatButtonModule, MatButton, MatIconButton, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, MatIconModule, MatIcon], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(GeneralComponent, { className: "GeneralComponent", filePath: "src/app/shared/common/users/account/general/general.component.ts", lineNumber: 26 });
})();
export {
  GeneralComponent
};
//# sourceMappingURL=chunk-LZNFL4S4.js.map
