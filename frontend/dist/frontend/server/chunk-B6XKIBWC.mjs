import './polyfills.server.mjs';
import {
  ListRoleComponent
} from "./chunk-STNKVAF5.mjs";
import {
  RoleService
} from "./chunk-EZXZXFXG.mjs";
import {
  PermissionService
} from "./chunk-FIJCC534.mjs";
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
import "./chunk-I23Q342N.mjs";
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
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIndex,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/role/detailrole/detailrole.component.ts
function DetailRoleComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailRoleComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleRoleAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailRoleComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailRoleComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailRoleComponent_ng_container_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 9)(2, "div", 10);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 11)(5, "button", 12);
    \u0275\u0275listener("click", function DetailRoleComponent_ng_container_15_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 13);
    \u0275\u0275listener("click", function DetailRoleComponent_ng_container_15_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailRoleComponent_ng_container_16_For_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-slide-toggle", 19);
    \u0275\u0275listener("change", function DetailRoleComponent_ng_container_16_For_8_Template_mat_slide_toggle_change_0_listener() {
      const item_r7 = \u0275\u0275restoreView(_r6).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.togglePermission(item_r7));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("disabled", !ctx_r1.isEdit())("checked", item_r7.hasPermission);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r7.name, " - (", item_r7.description || "Ch\u01B0a M\xF4 T\u1EA3", ") ");
  }
}
function DetailRoleComponent_ng_container_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 14)(2, "mat-form-field", 15)(3, "mat-label");
    \u0275\u0275text(4, "T\xEAn Nh\xF3m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailRoleComponent_ng_container_16_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailRole.name, $event) || (ctx_r1.DetailRole.name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "div", 17);
    \u0275\u0275repeaterCreate(7, DetailRoleComponent_ng_container_16_For_8_Template, 2, 4, "mat-slide-toggle", 18, \u0275\u0275repeaterTrackByIndex);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailRole.name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(2);
    \u0275\u0275repeater(ctx_r1.filterPermission);
  }
}
var DetailRoleComponent = class _DetailRoleComponent {
  _ListroleComponent = inject(ListRoleComponent);
  _RoleService = inject(RoleService);
  _PermissionService = inject(PermissionService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  ListPermission = [];
  filterPermission = [];
  idRole = 0;
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      this.idRole = params.get("id");
    }));
  }
  DetailRole = {};
  isEdit = signal(false);
  isDelete = signal(false);
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._PermissionService.getAllPermission(1e3);
      this.ListPermission = this._PermissionService.ListPermission();
      if (!this.idRole) {
        this._router.navigate(["/admin/nhomuser"]);
        this._ListroleComponent.drawer.close();
      } else if (this.idRole === "0") {
        this._ListroleComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/nhomuser", "0"]);
      } else {
        yield this._RoleService.getRoleByid(this.idRole).then(() => {
          this.DetailRole = this._RoleService.DetailRole();
          this.filterPermission = this.ListPermission.map((v) => {
            if (this.DetailRole?.permissions?.length > 0) {
              v.hasPermission = this.DetailRole?.permissions.find((p) => p.permissionId === v.id) ? true : false;
            }
            return v;
          });
        });
        this._ListroleComponent.drawer.open();
        this._router.navigate(["/admin/nhomuser", this.idRole]);
      }
      ;
    });
  }
  handleRoleAction() {
    return __async(this, null, function* () {
      if (this.idRole === "0") {
        yield this.createRole();
      } else {
        yield this.updateRole();
      }
    });
  }
  createRole() {
    return __async(this, null, function* () {
      console.log(this.DetailRole);
      try {
        yield this._RoleService.CreateRole(this.DetailRole);
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o role:", error);
      }
    });
  }
  updateRole() {
    return __async(this, null, function* () {
      try {
        yield this._RoleService.updateRole(this.DetailRole);
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt role:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._RoleService.DeleteRole(this.DetailRole);
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/nhomuser"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a role:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/nhomuser"]);
    this._ListroleComponent.drawer.close();
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
  }
  togglePermission(item) {
    item.hasPermission = !item.hasPermission;
    console.log(item);
    if (item.hasPermission) {
      this._RoleService.assignPermissionToRole({
        roleId: this.idRole,
        permissionId: item.id
      });
    } else {
      this._RoleService.removePermissionFromRole({
        roleId: this.idRole,
        permissionId: item.id
      });
    }
  }
  static \u0275fac = function DetailRoleComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailRoleComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailRoleComponent, selectors: [["app-detailrole"]], decls: 17, vars: 8, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp T\xEAn Nh\xF3m", 3, "ngModelChange", "ngModel", "disabled"], [1, "grid", "grid-cols-3", "gap-2"], [3, "disabled", "checked"], [3, "change", "disabled", "checked"]], template: function DetailRoleComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailRoleComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-slide-toggle", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DetailRoleComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailRole.isActive, $event) || (ctx.DetailRole.isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailRoleComponent_button_9_Template, 3, 0, "button", 5)(10, DetailRoleComponent_button_10_Template, 3, 0, "button", 5);
      \u0275\u0275elementStart(11, "button", 6);
      \u0275\u0275listener("click", function DetailRoleComponent_Template_button_click_11_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(14, "div", 7);
      \u0275\u0275template(15, DetailRoleComponent_ng_container_15_Template, 9, 0, "ng-container", 8)(16, DetailRoleComponent_ng_container_16_Template, 9, 2, "ng-container", 8);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate((ctx.DetailRole == null ? null : ctx.DetailRole.name) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailRole.isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailRole.isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(5);
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailRoleComponent, { className: "DetailRoleComponent", filePath: "src/app/admin/role/detailrole/detailrole.component.ts", lineNumber: 33 });
})();
export {
  DetailRoleComponent
};
//# sourceMappingURL=chunk-B6XKIBWC.mjs.map
