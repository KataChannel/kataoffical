import './polyfills.server.mjs';
import {
  SupportService
} from "./chunk-RMP6DU5A.mjs";
import {
  Router,
  RouterLink,
  RouterModule
} from "./chunk-HRPVH7WR.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-HJOOFARF.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgControlStatusGroup,
  NgForm,
  NgModel,
  RequiredValidator,
  ɵNgNoValidate
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardModule
} from "./chunk-CVXRITNT.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  MatOption
} from "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule
} from "./chunk-VNUZ7HP6.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/support/support-create/support-create.component.ts
var _c0 = () => ["/admin/support"];
function SupportCreateComponent_Conditional_42_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 26);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 27);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "button", 28);
    \u0275\u0275listener("click", function SupportCreateComponent_Conditional_42_For_2_Template_button_click_8_listener() {
      const $index_r4 = \u0275\u0275restoreView(_r3).$index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeFile($index_r4));
    });
    \u0275\u0275elementStart(9, "mat-icon");
    \u0275\u0275text(10, "close");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const file_r6 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r4.getFileIcon(file_r6.type));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(file_r6.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", ctx_r4.formatFileSize(file_r6.size), ")");
  }
}
function SupportCreateComponent_Conditional_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 19);
    \u0275\u0275repeaterCreate(1, SupportCreateComponent_Conditional_42_For_2_Template, 11, 3, "div", 24, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r4.selectedFiles());
  }
}
function SupportCreateComponent_Conditional_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 22);
  }
}
function SupportCreateComponent_Conditional_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "send");
    \u0275\u0275elementEnd();
  }
}
var SupportCreateComponent = class _SupportCreateComponent {
  supportService;
  router;
  snackBar;
  title = "";
  description = "";
  priority = "medium";
  selectedFiles = signal([]);
  loading = signal(false);
  constructor(supportService, router, snackBar) {
    this.supportService = supportService;
    this.router = router;
    this.snackBar = snackBar;
  }
  onFileSelected(event) {
    const files = Array.from(event.target.files);
    this.selectedFiles.set([...this.selectedFiles(), ...files]);
  }
  removeFile(index) {
    const files = this.selectedFiles();
    files.splice(index, 1);
    this.selectedFiles.set([...files]);
  }
  onSubmit(e) {
    return __async(this, null, function* () {
      e.preventDefault();
      this.loading.set(true);
      try {
        let attachmentUrls = [];
        if (this.selectedFiles().length > 0) {
          const uploadResult = yield this.supportService.uploadFiles(this.selectedFiles()).toPromise();
          attachmentUrls = uploadResult?.map((r) => r.fileUrl) || [];
        }
        yield this.supportService.createTicket({
          title: this.title,
          description: this.description,
          priority: this.priority,
          attachmentUrls
        }).toPromise();
        this.snackBar.open("\u0110\xE3 t\u1EA1o v\u1EA5n \u0111\u1EC1 th\xE0nh c\xF4ng!", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-success"]
        });
        this.router.navigate(["/admin/support"]);
      } catch (error) {
        console.error("Error creating ticket:", error);
        this.snackBar.open("L\u1ED7i t\u1EA1o v\u1EA5n \u0111\u1EC1", "\u0110\xF3ng", {
          duration: 3e3,
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.loading.set(false);
      }
    });
  }
  getFileIcon(type) {
    if (type.startsWith("image/"))
      return "image";
    if (type.startsWith("video/"))
      return "videocam";
    return "attach_file";
  }
  formatFileSize(bytes) {
    if (bytes < 1024)
      return bytes + " B";
    if (bytes < 1024 * 1024)
      return (bytes / 1024).toFixed(1) + " KB";
    return (bytes / (1024 * 1024)).toFixed(1) + " MB";
  }
  static \u0275fac = function SupportCreateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SupportCreateComponent)(\u0275\u0275directiveInject(SupportService), \u0275\u0275directiveInject(Router), \u0275\u0275directiveInject(MatSnackBar));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _SupportCreateComponent, selectors: [["app-support-create"]], decls: 50, vars: 11, consts: [["fileInput", ""], [1, "container", "mx-auto", "p-4", "max-w-3xl"], [1, "flex", "items-center", "gap-4", "mb-6"], ["mat-icon-button", "", "color", "primary", 3, "routerLink"], [1, "text-2xl", "font-bold"], [1, "space-y-4", 3, "submit"], ["appearance", "outline", 1, "w-full"], ["matInput", "", "name", "title", "required", "", "placeholder", "M\xF4 t\u1EA3 ng\u1EAFn g\u1ECDn v\u1EA5n \u0111\u1EC1 c\u1EE7a b\u1EA1n", 3, "ngModelChange", "ngModel"], ["matInput", "", "name", "description", "required", "", "rows", "6", "placeholder", "M\xF4 t\u1EA3 chi ti\u1EBFt v\u1EA5n \u0111\u1EC1, c\xE1c b\u01B0\u1EDBc t\xE1i hi\u1EC7n l\u1ED7i...", 3, "ngModelChange", "ngModel"], ["name", "priority", 3, "ngModelChange", "ngModel"], ["value", "low"], ["value", "medium"], ["value", "high"], ["value", "urgent"], [1, "block", "text-sm", "font-medium", "mb-2"], [1, "border-2", "border-dashed", "border-gray-300", "rounded-lg", "p-6", "text-center"], ["type", "file", "multiple", "", "accept", "image/*,video/*", 1, "hidden", 3, "change"], ["mat-raised-button", "", "type", "button", 3, "click"], [1, "text-sm", "text-gray-500", "mt-2"], [1, "mt-4", "space-y-2"], [1, "flex", "gap-4"], ["mat-raised-button", "", "color", "primary", "type", "submit", 3, "disabled"], ["diameter", "20"], ["mat-stroked-button", "", "type", "button", 3, "routerLink", "disabled"], [1, "flex", "items-center", "justify-between", "p-2", "bg-gray-50", "rounded"], [1, "flex", "items-center", "gap-2"], [1, "text-sm"], [1, "text-xs", "text-gray-500"], ["mat-icon-button", "", "type", "button", 3, "click"]], template: function SupportCreateComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "button", 3)(3, "mat-icon");
      \u0275\u0275text(4, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "span", 4);
      \u0275\u0275text(6, "T\u1EA1o v\u1EA5n \u0111\u1EC1 m\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card")(8, "mat-card-content")(9, "form", 5);
      \u0275\u0275listener("submit", function SupportCreateComponent_Template_form_submit_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onSubmit($event));
      });
      \u0275\u0275elementStart(10, "mat-form-field", 6)(11, "mat-label");
      \u0275\u0275text(12, "Ti\xEAu \u0111\u1EC1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "input", 7);
      \u0275\u0275twoWayListener("ngModelChange", function SupportCreateComponent_Template_input_ngModelChange_13_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.title, $event) || (ctx.title = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "mat-form-field", 6)(15, "mat-label");
      \u0275\u0275text(16, "M\xF4 t\u1EA3 chi ti\u1EBFt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "textarea", 8);
      \u0275\u0275twoWayListener("ngModelChange", function SupportCreateComponent_Template_textarea_ngModelChange_17_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.description, $event) || (ctx.description = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "mat-form-field", 6)(19, "mat-label");
      \u0275\u0275text(20, "M\u1EE9c \u0111\u1ED9 \u01B0u ti\xEAn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-select", 9);
      \u0275\u0275twoWayListener("ngModelChange", function SupportCreateComponent_Template_mat_select_ngModelChange_21_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.priority, $event) || (ctx.priority = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementStart(22, "mat-option", 10);
      \u0275\u0275text(23, "Th\u1EA5p");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-option", 11);
      \u0275\u0275text(25, "Trung b\xECnh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-option", 12);
      \u0275\u0275text(27, "Cao");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-option", 13);
      \u0275\u0275text(29, "Kh\u1EA9n c\u1EA5p");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div")(31, "label", 14);
      \u0275\u0275text(32, "\u0110\xEDnh k\xE8m file (h\xECnh \u1EA3nh/video)");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "div", 15)(34, "input", 16, 0);
      \u0275\u0275listener("change", function SupportCreateComponent_Template_input_change_34_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "button", 17);
      \u0275\u0275listener("click", function SupportCreateComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r2 = \u0275\u0275reference(35);
        return \u0275\u0275resetView(fileInput_r2.click());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "attach_file");
      \u0275\u0275elementEnd();
      \u0275\u0275text(39, " Ch\u1ECDn file ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "p", 18);
      \u0275\u0275text(41, "H\u1ED7 tr\u1EE3 h\xECnh \u1EA3nh v\xE0 video, t\u1ED1i \u0111a 50MB/file");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(42, SupportCreateComponent_Conditional_42_Template, 3, 0, "div", 19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "div", 20)(44, "button", 21);
      \u0275\u0275template(45, SupportCreateComponent_Conditional_45_Template, 1, 0, "mat-spinner", 22)(46, SupportCreateComponent_Conditional_46_Template, 2, 0, "mat-icon");
      \u0275\u0275text(47, " G\u1EEDi v\u1EA5n \u0111\u1EC1 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "button", 23);
      \u0275\u0275text(49, " H\u1EE7y ");
      \u0275\u0275elementEnd()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(9, _c0));
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.title);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.description);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.priority);
      \u0275\u0275advance(21);
      \u0275\u0275conditional(ctx.selectedFiles().length > 0 ? 42 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.loading() || !ctx.title || !ctx.description);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.loading() ? 45 : 46);
      \u0275\u0275advance(3);
      \u0275\u0275property("routerLink", \u0275\u0275pureFunction0(10, _c0))("disabled", ctx.loading());
    }
  }, dependencies: [
    CommonModule,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    NgModel,
    NgForm,
    RouterModule,
    RouterLink,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatInputModule,
    MatInput,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatIconModule,
    MatIcon,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(SupportCreateComponent, { className: "SupportCreateComponent", filePath: "src/app/support/support-create/support-create.component.ts", lineNumber: 113 });
})();
export {
  SupportCreateComponent
};
//# sourceMappingURL=chunk-3K3KMDN4.mjs.map
