import {
  ImportdataService,
  ListImportdataComponent
} from "./chunk-KTNJRDRE.js";
import "./chunk-JEK27XAQ.js";
import "./chunk-WDJTPBJI.js";
import "./chunk-3SUZVZNG.js";
import "./chunk-EVBPRNA2.js";
import "./chunk-3RK5O7D3.js";
import "./chunk-6PLGEZYV.js";
import "./chunk-FJBGIWGZ.js";
import "./chunk-HXYVFSEQ.js";
import "./chunk-US4NF3YN.js";
import "./chunk-S6K43KTV.js";
import "./chunk-UBU6BPOA.js";
import "./chunk-QPEFXVGJ.js";
import "./chunk-DOJR6IHP.js";
import "./chunk-TF67DZTX.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import "./chunk-GODCD4GS.js";
import {
  convertToSlug
} from "./chunk-EMT3PHD4.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-W6W5IZUE.js";
import "./chunk-BLSCHC3G.js";
import "./chunk-YBZUFAQP.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-I3HWRSST.js";
import "./chunk-WP536AT4.js";
import "./chunk-S5TWTPVL.js";
import "./chunk-5F4VG3UZ.js";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-5TD47VMU.js";
import {
  MatDialogModule
} from "./chunk-PQ5C5V7E.js";
import {
  MatSnackBar
} from "./chunk-7TLPKC3B.js";
import "./chunk-FQNHKKYV.js";
import "./chunk-LJBSGEZI.js";
import "./chunk-RPDITV5T.js";
import "./chunk-4KYN7I6C.js";
import "./chunk-SSCVWHZW.js";
import "./chunk-FCO3RLCX.js";
import {
  MatSelectModule
} from "./chunk-JUAFAJ2Y.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-EOVYE2CD.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-ZGUYOD2D.js";
import "./chunk-QKOCOOG3.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OB46FS5W.js";
import "./chunk-PBFAMPOS.js";
import "./chunk-C5TB4WSU.js";
import "./chunk-EXJ7KYIY.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-JCKTSD6E.js";
import "./chunk-2QF354AD.js";
import "./chunk-WSR5IJUW.js";
import {
  CommonModule,
  NgIf
} from "./chunk-2VHAU5LM.js";
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
} from "./chunk-FWM3YOMT.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/importdata/detailimportdata/detailimportdata.component.ts
function DetailImportdataComponent_button_9_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailImportdataComponent_button_9_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.handleImportdataAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd()();
  }
}
function DetailImportdataComponent_button_10_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 1);
    \u0275\u0275listener("click", function DetailImportdataComponent_button_10_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd()();
  }
}
function DetailImportdataComponent_ng_container_12_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 8)(2, "div", 9);
    \u0275\u0275text(3, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 10)(5, "button", 11);
    \u0275\u0275listener("click", function DetailImportdataComponent_ng_container_12_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.DeleteData());
    });
    \u0275\u0275text(6, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "button", 12);
    \u0275\u0275listener("click", function DetailImportdataComponent_ng_container_12_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.toggleDelete());
    });
    \u0275\u0275text(8, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
}
function DetailImportdataComponent_ng_container_13_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 13)(2, "mat-form-field", 14)(3, "mat-label");
    \u0275\u0275text(4, "Ti\xEAu \u0110\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 15);
    \u0275\u0275twoWayListener("ngModelChange", function DetailImportdataComponent_ng_container_13_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailImportdata().name, $event) || (ctx_r1.DetailImportdata().name = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 14)(7, "mat-label");
    \u0275\u0275text(8, "Nh\xF3m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 16);
    \u0275\u0275twoWayListener("ngModelChange", function DetailImportdataComponent_ng_container_13_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailImportdata().group, $event) || (ctx_r1.DetailImportdata().group = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-form-field", 14)(11, "mat-label");
    \u0275\u0275text(12, "M\xE3 S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "input", 17);
    \u0275\u0275twoWayListener("ngModelChange", function DetailImportdataComponent_ng_container_13_Template_input_ngModelChange_13_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailImportdata().codeId, $event) || (ctx_r1.DetailImportdata().codeId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "mat-form-field", 18)(15, "mat-label");
    \u0275\u0275text(16, "M\xF4 T\u1EA3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "textarea", 19);
    \u0275\u0275twoWayListener("ngModelChange", function DetailImportdataComponent_ng_container_13_Template_textarea_ngModelChange_17_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.DetailImportdata().description, $event) || (ctx_r1.DetailImportdata().description = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailImportdata().name);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailImportdata().group);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailImportdata().codeId);
    \u0275\u0275property("disabled", true);
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.DetailImportdata().description);
    \u0275\u0275property("disabled", !ctx_r1.isEdit());
  }
}
var DetailImportdataComponent = class _DetailImportdataComponent {
  _ListImportdataComponent = inject(ListImportdataComponent);
  _ImportdataService = inject(ImportdataService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._ImportdataService.setImportdataId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._ImportdataService.importdataId();
      if (!id) {
        this._router.navigate(["/admin/importdata"]);
        this._ListImportdataComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailImportdata.set({});
        this._ListImportdataComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/importdata", "new"]);
      } else {
        yield this._ImportdataService.getImportdataBy({ id, isOne: true });
        this._ListImportdataComponent.drawer.open();
        this._router.navigate(["/admin/importdata", id]);
      }
    }));
  }
  DetailImportdata = this._ImportdataService.DetailImportdata;
  isEdit = signal(false);
  isDelete = signal(false);
  importdataId = this._ImportdataService.importdataId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handleImportdataAction() {
    return __async(this, null, function* () {
      if (this.importdataId() === "new") {
        yield this.createImportdata();
      } else {
        yield this.updateImportdata();
      }
    });
  }
  createImportdata() {
    return __async(this, null, function* () {
      try {
        yield this._ImportdataService.CreateImportdata(this.DetailImportdata());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o importdata:", error);
      }
    });
  }
  updateImportdata() {
    return __async(this, null, function* () {
      try {
        yield this._ImportdataService.updateImportdata(this.DetailImportdata());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt importdata:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._ImportdataService.DeleteImportdata(this.DetailImportdata());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/importdata"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a importdata:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/importdata"]);
    this._ListImportdataComponent.drawer.close();
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
    this.DetailImportdata.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  static \u0275fac = function DetailImportdataComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailImportdataComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailImportdataComponent, selectors: [["app-detailimportdata"]], decls: 14, vars: 8, consts: [[1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], [3, "ngModelChange", "ngModel", "disabled"], ["mat-icon-button", "", "color", "primary", 3, "click", 4, "ngIf"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [4, "ngIf"], [1, "flex", "flex-col", "space-y-4", "items-center", "justify-center"], [1, "font-bold", "text-2xl"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", 3, "click"], ["mat-flat-button", "", "color", "warn", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-4"], ["appearance", "outline"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Ti\xEAu \u0110\u1EC1", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp Nh\xF3m", 3, "ngModelChange", "ngModel", "disabled"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xE3 S\u1EA3n Ph\u1EA9m", 3, "ngModelChange", "ngModel", "disabled"], ["appearance", "outline", 1, "lg:col-span-2"], ["matInput", "", "placeholder", "Vui l\xF2ng nh\u1EADp M\xF4 T\u1EA3", 3, "ngModelChange", "ngModel", "disabled"]], template: function DetailImportdataComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "button", 1);
      \u0275\u0275listener("click", function DetailImportdataComponent_Template_button_click_1_listener() {
        return ctx.goBack();
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 2);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(6, "div", 3)(7, "mat-slide-toggle", 4);
      \u0275\u0275twoWayListener("ngModelChange", function DetailImportdataComponent_Template_mat_slide_toggle_ngModelChange_7_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.DetailImportdata().isActive, $event) || (ctx.DetailImportdata().isActive = $event);
        return $event;
      });
      \u0275\u0275text(8);
      \u0275\u0275elementEnd();
      \u0275\u0275template(9, DetailImportdataComponent_button_9_Template, 3, 0, "button", 5)(10, DetailImportdataComponent_button_10_Template, 3, 0, "button", 5);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "div", 6);
      \u0275\u0275template(12, DetailImportdataComponent_ng_container_12_Template, 9, 0, "ng-container", 7)(13, DetailImportdataComponent_ng_container_13_Template, 18, 8, "ng-container", 7);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_0_0;
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_0_0 = ctx.DetailImportdata()) == null ? null : tmp_0_0.title) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(2);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailImportdata().isActive);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate(ctx.DetailImportdata().isActive ? "Hi\u1EC3n Th\u1ECB" : "\u1EA8n");
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
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailImportdataComponent, { className: "DetailImportdataComponent", filePath: "src/app/admin/importdata/detailimportdata/detailimportdata.component.ts", lineNumber: 32 });
})();
export {
  DetailImportdataComponent
};
//# sourceMappingURL=chunk-UZ7R3L5L.js.map
