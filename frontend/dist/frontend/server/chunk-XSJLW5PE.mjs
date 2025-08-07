import './polyfills.server.mjs';
import {
  ListMenuComponent
} from "./chunk-P76NS7V3.mjs";
import {
  MenuService
} from "./chunk-WEPH3ABC.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-J322K7NT.mjs";
import "./chunk-C4Q5BIA5.mjs";
import "./chunk-TGADPWSB.mjs";
import "./chunk-DWV2CVG4.mjs";
import {
  MatDialogModule
} from "./chunk-7O7BZAOJ.mjs";
import "./chunk-RGTCKLO2.mjs";
import "./chunk-GOLLTURE.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  GenId,
  convertToSlug
} from "./chunk-I23Q342N.mjs";
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
  NgModel,
  NumberValueAccessor
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
import {
  MatOption
} from "./chunk-7GJ6SLXG.mjs";
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
  ɵɵdefer,
  ɵɵdeferOnIdle,
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
  __async,
  __objRest
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/menu/menu/detailmenu/detailmenu.component.ts
var DetailMenuComponent_ng_container_14_Defer_16_DepsFn = () => [MatFormField, MatLabel, MatInput, NgControlStatus, NgModel, MatSelect, MatOption];
var _forTrack0 = ($index, $item) => $item.id;
function DetailMenuComponent_button_7_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailMenuComponent_button_7_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleMenuAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailMenuComponent_button_8_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailMenuComponent_button_8_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailMenuComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "button", 11);
    \u0275\u0275listener("click", function DetailMenuComponent_ng_container_13_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function DetailMenuComponent_ng_container_13_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailMenuComponent_ng_container_14_Defer_15_For_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 24);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275property("value", item_r7.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r7.title);
  }
}
function DetailMenuComponent_ng_container_14_Defer_15_ForEmpty_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 25);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u.");
    \u0275\u0275elementEnd();
  }
}
function DetailMenuComponent_ng_container_14_Defer_15_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 14)(1, "mat-label");
    \u0275\u0275text(2, "Th\u01B0 M\u1EE5c Cha");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Defer_15_Template_mat_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().parentId, $event) || (ctx_r1.DetailMenu().parentId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(4, "div", 20)(5, "mat-form-field", 21)(6, "input", 22);
    \u0275\u0275listener("keyup", function DetailMenuComponent_ng_container_14_Defer_15_Template_input_keyup_6_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.DoFilterMenu($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "div", 23);
    \u0275\u0275repeaterCreate(8, DetailMenuComponent_ng_container_14_Defer_15_For_9_Template, 2, 2, "mat-option", 24, _forTrack0, false, DetailMenuComponent_ng_container_14_Defer_15_ForEmpty_10_Template, 2, 0, "span", 25);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().parentId);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(5);
    \u0275\u0275repeater(ctx_r1.ListMenu);
  }
}
function DetailMenuComponent_ng_container_14_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0)(1);
    \u0275\u0275elementStart(2, "div", 13)(3, "mat-form-field", 14)(4, "mat-label");
    \u0275\u0275text(5, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Template_input_ngModelChange_6_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().title, $event) || (ctx_r1.DetailMenu().title = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function DetailMenuComponent_ng_container_14_Template_input_input_6_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.FillSlug());
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-form-field", 14)(8, "mat-label");
    \u0275\u0275text(9, "Slug");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Template_input_ngModelChange_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().slug, $event) || (ctx_r1.DetailMenu().slug = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "mat-form-field", 14)(12, "mat-label");
    \u0275\u0275text(13, "Icon");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Template_input_ngModelChange_14_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().icon, $event) || (ctx_r1.DetailMenu().icon = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275template(15, DetailMenuComponent_ng_container_14_Defer_15_Template, 11, 3);
    \u0275\u0275defer(16, 15, DetailMenuComponent_ng_container_14_Defer_16_DepsFn);
    \u0275\u0275deferOnIdle();
    \u0275\u0275elementStart(18, "mat-form-field", 14)(19, "mat-label");
    \u0275\u0275text(20, "V\u1ECB Tr\xED");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 18);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Template_input_ngModelChange_21_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().order, $event) || (ctx_r1.DetailMenu().order = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "mat-slide-toggle", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailMenuComponent_ng_container_14_Template_mat_slide_toggle_ngModelChange_22_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailMenu().isActive, $event) || (ctx_r1.DetailMenu().isActive = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementContainerEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().title);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().slug);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().icon);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(7);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().order);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailMenu().isActive);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r1.DetailMenu().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
  }
}
var DetailMenuComponent = class _DetailMenuComponent {
  _ListmenuComponent = inject(ListMenuComponent);
  _MenuService = inject(MenuService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  ListMenu = [];
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._MenuService.setMenuId(id);
      yield this._MenuService.getAllMenu();
      this.ListMenu = this._MenuService.ListMenu();
    }));
    effect(() => __async(this, null, function* () {
      const id = this._MenuService.menuId();
      if (!id) {
        this._router.navigate(["/admin/menu"]);
        this._ListmenuComponent.drawer.close();
      }
      if (id === "0") {
        this.DetailMenu.set({ title: GenId(8, false), slug: GenId(8, false) });
        this._ListmenuComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/menu", "0"]);
      } else {
        yield this._MenuService.getMenuByid(id);
        this._ListmenuComponent.drawer.open();
        this._router.navigate(["/admin/menu", id]);
      }
    }));
  }
  DetailMenu = this._MenuService.DetailMenu;
  isEdit = signal(false);
  isDelete = signal(false);
  menuId = this._MenuService.menuId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handleMenuAction() {
    return __async(this, null, function* () {
      if (this.menuId() === "0") {
        yield this.createMenu();
      } else {
        yield this.updateMenu();
      }
    });
  }
  createMenu() {
    return __async(this, null, function* () {
      try {
        yield this._MenuService.CreateMenu(this.DetailMenu());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o menu:", error);
      }
    });
  }
  updateMenu() {
    return __async(this, null, function* () {
      try {
        this.DetailMenu.update((v) => {
          const _a = v, { children } = _a, rest = __objRest(_a, ["children"]);
          return rest;
        });
        yield this._MenuService.updateMenu(this.DetailMenu());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt menu:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._MenuService.DeleteMenu(this.DetailMenu());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/menu"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a menu:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/menu"]);
    this._ListmenuComponent.drawer.close();
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
    this.DetailMenu.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoFilterMenu(event) {
    const query = event.target.value.toLowerCase();
    this.ListMenu = this._MenuService.ListMenu().filter((v) => v.title.toLowerCase().includes(query));
  }
  static \u0275fac = function DetailMenuComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailMenuComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailMenuComponent, selectors: [["app-detailmenu"]], decls: 15, vars: 5, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-icon-button", "", "color", "warn", 3, "click"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "input", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Slug", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Icon", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "type", "number", "placeholder", "Vui l\xF2ng nh\u1EADp V\u1ECB Tr\xED", 3, "ngModelChange", "ngModel", "disabled"], [3, "ngModelChange", "ngModel", "disabled"], [1, "w-full", "flex", "flex-col"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "p-2"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "keyup"], [1, "overflow-y-auto", "max-h-44"], [3, "value"], [1, "p-2", "text-center"]], template: function DetailMenuComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailMenuComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3);
      \u0275\u0275template(7, DetailMenuComponent_button_7_Template, 3, 0, "button", 4)(8, DetailMenuComponent_button_8_Template, 3, 0, "button", 4);
      \u0275\u0275elementStart(9, "button", 5);
      \u0275\u0275listener("click", function DetailMenuComponent_Template_button_click_9_listener() {
        return ctx.toggleDelete();
      });
      \u0275\u0275elementStart(10, "mat-icon");
      \u0275\u0275text(11, "delete");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "div", 6);
      \u0275\u0275template(13, DetailMenuComponent_ng_container_13_Template, 9, 0, "ng-container", 7)(14, DetailMenuComponent_ng_container_14_Template, 24, 11, "ng-container", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailMenu()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
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
    NumberValueAccessor,
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailMenuComponent, { className: "DetailMenuComponent", filePath: "src/app/admin/menu/menu/detailmenu/detailmenu.component.ts", lineNumber: 32 });
})();
export {
  DetailMenuComponent
};
//# sourceMappingURL=chunk-XSJLW5PE.mjs.map
