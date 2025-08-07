import './polyfills.server.mjs';
import {
  ListPermissionComponent
} from "./chunk-3V7WYZEA.mjs";
import {
  PermissionService
} from "./chunk-FIJCC534.mjs";
import "./chunk-UCGC4G46.mjs";
import "./chunk-2FMT7VQU.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import "./chunk-RCQ574CW.mjs";
import {
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  convertToSlug
} from "./chunk-I23Q342N.mjs";
import "./chunk-RUJ72W7P.mjs";
import "./chunk-TEMMKMG5.mjs";
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
import {
  MatSnackBar
} from "./chunk-A6W66WDU.mjs";
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
  ActivatedRoute,
  Router
} from "./chunk-PLFAEF4K.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
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

// src/app/admin/permission/detailpermission/detailpermission.component.ts
function DetailPermissionComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailPermissionComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handlePermissionAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailPermissionComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailPermissionComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailPermissionComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "button", 11);
    \u0275\u0275listener("click", function DetailPermissionComponent_ng_container_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function DetailPermissionComponent_ng_container_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailPermissionComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13)(2, "mat-form-field", 14)(3, "mat-label");
    \u0275\u0275text(4, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPermissionComponent_ng_container_13_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPermission().name, $event) || (ctx_r1.DetailPermission().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 14)(7, "mat-label");
    \u0275\u0275text(8, "Nh\xF3m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPermissionComponent_ng_container_13_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPermission().group, $event) || (ctx_r1.DetailPermission().group = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 14)(11, "mat-label");
    \u0275\u0275text(12, "M\xE3 S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPermissionComponent_ng_container_13_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPermission().codeId, $event) || (ctx_r1.DetailPermission().codeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 18)(15, "mat-label");
    \u0275\u0275text(16, "M\xF4 T\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPermissionComponent_ng_container_13_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailPermission().description, $event) || (ctx_r1.DetailPermission().description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPermission().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPermission().group);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPermission().codeId);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailPermission().description);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailPermissionComponent = class _DetailPermissionComponent {
  _ListPermissionComponent = inject(ListPermissionComponent);
  _PermissionService = inject(PermissionService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._PermissionService.setPermissionId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._PermissionService.permissionId();
      if (!id) {
        this._router.navigate(["/admin/permission"]);
        this._ListPermissionComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailPermission.set({});
        this._ListPermissionComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/permission", "new"]);
      } else {
        yield this._PermissionService.getPermissionBy({ id, isOne: true });
        this._ListPermissionComponent.drawer.open();
        this._router.navigate(["/admin/permission", id]);
      }
    }));
  }
  DetailPermission = this._PermissionService.DetailPermission;
  isEdit = signal(false);
  isDelete = signal(false);
  permissionId = this._PermissionService.permissionId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handlePermissionAction() {
    return __async(this, null, function* () {
      if (this.permissionId() === "new") {
        yield this.createPermission();
      } else {
        yield this.updatePermission();
      }
    });
  }
  createPermission() {
    return __async(this, null, function* () {
      try {
        yield this._PermissionService.CreatePermission(this.DetailPermission());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o permission:", error);
      }
    });
  }
  updatePermission() {
    return __async(this, null, function* () {
      try {
        yield this._PermissionService.updatePermission(this.DetailPermission());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt permission:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._PermissionService.DeletePermission(this.DetailPermission());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/permission"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a permission:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/permission"]);
    this._ListPermissionComponent.drawer.close();
  }
  trackByFn(index, item) {
    return item.id;
  }
  toggleEdit() {
    this.isEdit.update((value) => !value);
  }
  toggleDelete() {
    this.isDelete.update((value) => !value);
  }
  FillSlug() {
    this.DetailPermission.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  static \u0275fac = function DetailPermissionComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPermissionComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPermissionComponent, selectors: [["app-detailpermission"]], decls: 14, vars: 8, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Nh\xF3m", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"], ["appearance", "outline", 1, "lg:col-span-2"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xF4 T\u1EA3", 3, "ngModelChange", "ngModel", "disabled"]], template: function DetailPermissionComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailPermissionComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-slide-toggle", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPermissionComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailPermission().isActive, $event) || (ctx.DetailPermission().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailPermissionComponent_button_9_Template, 3, 0, "button", 5)(10, DetailPermissionComponent_button_10_Template, 3, 0, "button", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 6);
      \u0275\u0275template(12, DetailPermissionComponent_ng_container_12_Template, 9, 0, "ng-container", 7)(13, DetailPermissionComponent_ng_container_13_Template, 18, 8, "ng-container", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailPermission()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPermission().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailPermission().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isDelete());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isDelete());
    }
  }, dependencies: [
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
    MatButton,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgIf,
    MatSlideToggleModule,
    MatSlideToggle
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPermissionComponent, { className: "DetailPermissionComponent", filePath: "src/app/admin/permission/detailpermission/detailpermission.component.ts", lineNumber: 32 });
})();
export {
  DetailPermissionComponent
};
//# sourceMappingURL=chunk-X4UELMR6.mjs.map
