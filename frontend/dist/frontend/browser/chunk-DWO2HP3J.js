import {
  ListPhieukhoComponent
} from "./chunk-MNDP52WP.js";
import {
  KhoService
} from "./chunk-WSPM3ROW.js";
import {
  PhieukhoService
} from "./chunk-X4GJLDCB.js";
import {
  DathangService
} from "./chunk-QA4Y3GND.js";
import {
  DonhangService
} from "./chunk-HN7XISGO.js";
import {
  SanphamService
} from "./chunk-OYBNSF2S.js";
import "./chunk-2DPLPREP.js";
import "./chunk-4I62SID5.js";
import "./chunk-DR2JAJDC.js";
import {
  TimezoneService
} from "./chunk-WNHP5LA7.js";
import "./chunk-CVAZHUNB.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-R5HFYA7U.js";
import {
  GenId,
  convertToSlug
} from "./chunk-I2ZL5X6B.js";
import {
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import "./chunk-QY5L4FGH.js";
import "./chunk-D7PAKJDY.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-2GXGFE2W.js";
import "./chunk-F5CW4EPT.js";
import "./chunk-KFQ5QPP6.js";
import "./chunk-6ECEDFXD.js";
import {
  MatSlideToggleModule
} from "./chunk-2WTGXRSQ.js";
import {
  MatDialogModule
} from "./chunk-Y6PF6L3J.js";
import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-5Z5IQRCP.js";
import "./chunk-SP2Z3Q73.js";
import "./chunk-TAPSLW5I.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInput,
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-TMSN764N.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-GSONKL3O.js";
import "./chunk-DKLGAVRA.js";
import "./chunk-6PYLDKWR.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-FL6G6YYX.js";
import {
  MatOption
} from "./chunk-EPU6HK6I.js";
import "./chunk-XM7PTE63.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-TAI2MURD.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/phieukho/detailphieukho/detailphieukho.component.ts
var _c0 = () => ({ standalone: true });
function DetailPhieukhoComponent_mat_option_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r2 = ctx.$implicit;
    \u0275\u0275property("value", item_r2.value);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r2.title, " ");
  }
}
function DetailPhieukhoComponent_mat_option_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275property("value", item_r3.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", item_r3.makho, ") ", item_r3.name, " ");
  }
}
function DetailPhieukhoComponent_mat_option_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275property("value", item_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" (", item_r4.makho, ") ", item_r4.name, " ");
  }
}
function DetailPhieukhoComponent_tr_64_mat_option_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 38);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sp_r8 = ctx.$implicit;
    \u0275\u0275property("value", sp_r8.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sp_r8.title, " ");
  }
}
function DetailPhieukhoComponent_tr_64_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 39)(1, "td", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 41)(4, "mat-form-field", 18)(5, "mat-select", 42);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_tr_64_Template_mat_select_ngModelChange_5_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r6 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r6.DetailPhieukho().sanpham[i_r6].sanphamId, $event) || (ctx_r6.DetailPhieukho().sanpham[i_r6].sanphamId = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(6, "div", 43)(7, "mat-form-field", 18)(8, "input", 44);
    \u0275\u0275listener("input", function DetailPhieukhoComponent_tr_64_Template_input_input_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.DoFindSanpham($event));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 45);
    \u0275\u0275template(10, DetailPhieukhoComponent_tr_64_mat_option_10_Template, 2, 2, "mat-option", 16);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(11, "td", 46);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 41)(14, "mat-form-field", 18)(15, "input", 47);
    \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_tr_64_Template_input_ngModelChange_15_listener($event) {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r6 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r6.DetailPhieukho().sanpham[i_r6].soluong, $event) || (ctx_r6.DetailPhieukho().sanpham[i_r6].soluong = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "td", 48)(17, "button", 49);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_tr_64_Template_button_click_17_listener() {
      const i_r6 = \u0275\u0275restoreView(_r5).index;
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.RemoveSanpham(i_r6));
    });
    \u0275\u0275elementStart(18, "mat-icon");
    \u0275\u0275text(19, "delete");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const i_r6 = ctx.index;
    const ctx_r6 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(i_r6 + 1);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r6.DetailPhieukho().sanpham[i_r6].sanphamId);
    \u0275\u0275property("disabled", !ctx_r6.isEdit())("ngModelOptions", \u0275\u0275pureFunction0(10, _c0));
    \u0275\u0275advance(5);
    \u0275\u0275property("ngForOf", ctx_r6.filterSP);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r6.getSPUnit(ctx_r6.DetailPhieukho().sanpham[i_r6].sanphamId), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r6.DetailPhieukho().sanpham[i_r6].soluong);
    \u0275\u0275property("disabled", !ctx_r6.isEdit())("ngModelOptions", \u0275\u0275pureFunction0(11, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", !ctx_r6.isEdit());
  }
}
function DetailPhieukhoComponent_tr_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 50);
    \u0275\u0275text(2, " Ch\u01B0a c\xF3 s\u1EA3n ph\u1EA9m n\xE0o \u0111\u01B0\u1EE3c ch\u1ECDn ");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieukhoComponent_button_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 51);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_button_67_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.handlePhieukhoAction());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "save");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " L\u01B0u ");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieukhoComponent_button_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 52);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_button_68_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.toggleEdit());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "edit");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " S\u1EEDa ");
    \u0275\u0275elementEnd();
  }
}
function DetailPhieukhoComponent_button_73_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 53);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_button_73_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r11);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.toggleDelete());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd()();
  }
}
function DetailPhieukhoComponent_div_74_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54)(1, "div", 55)(2, "div", 56);
    \u0275\u0275text(3, "X\xE1c nh\u1EADn x\xF3a");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div", 57);
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 phi\u1EBFu n\xE0y kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 58)(7, "button", 59);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_div_74_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.DeleteData());
    });
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 60);
    \u0275\u0275listener("click", function DetailPhieukhoComponent_div_74_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r12);
      const ctx_r6 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r6.toggleDelete());
    });
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
var DetailPhieukhoComponent = class _DetailPhieukhoComponent {
  _ListphieukhoComponent = inject(ListPhieukhoComponent);
  _PhieukhoService = inject(PhieukhoService);
  _KhoService = inject(KhoService);
  _DonhangService = inject(DonhangService);
  _DathangService = inject(DathangService);
  _SanphamService = inject(SanphamService);
  _timezoneService = inject(TimezoneService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  filterSP = [];
  LoaiPhieu = [
    { title: "Phi\u1EBFu Nh\u1EADp", value: "nhap" },
    { title: "Phi\u1EBFu Xu\u1EA5t", value: "xuat" },
    { title: "Chuy\u1EC3n Kho", value: "chuyenkho" },
    { title: "\u0110i\u1EC1u Ch\u1EC9nh", value: "dieuchinh" }
  ];
  constructor() {
    this._route.paramMap.subscribe((params) => __async(this, null, function* () {
      const id = params.get("id");
      this._PhieukhoService.setPhieukhoId(id);
      yield this._DonhangService.getAllDonhang();
      yield this._DathangService.getAllDathang();
      yield this._SanphamService.getAllSanpham();
      yield this._KhoService.getAllKho();
      this.filterSP = this._SanphamService.ListSanpham();
    }));
    effect(() => __async(this, null, function* () {
      const id = this._PhieukhoService.phieukhoId();
      if (!id) {
        this._router.navigate(["/admin/phieukho"]);
        this._ListphieukhoComponent.drawer.close();
      }
      if (id === "0") {
        const maphieu = yield this._PhieukhoService.getNextCode("chuyenkho");
        this.DetailPhieukho.set({
          maphieu: maphieu.replace(/"/g, ""),
          // Remove quotes if returned as string
          type: "chuyenkho",
          sanpham: [],
          ngay: /* @__PURE__ */ new Date(),
          ghichu: ""
        });
        this._ListphieukhoComponent.drawer.open();
        this.isEdit.set(true);
        this._router.navigate(["/admin/phieukho", "0"]);
      } else {
        yield this._PhieukhoService.getPhieukhoByid(id);
        this._ListphieukhoComponent.drawer.open();
        this._router.navigate(["/admin/phieukho", id]);
      }
    }));
  }
  ChangeType(event) {
    return __async(this, null, function* () {
      if (this.phieukhoId() === "0") {
        const maphieu = yield this._PhieukhoService.getNextCode(event.value);
        this.DetailPhieukho.update((v) => {
          v.maphieu = maphieu.replace(/"/g, "");
          return v;
        });
      }
    });
  }
  ChosenDonhang(event, type) {
    console.log(event.value);
    if (type == "xuat") {
      this.DetailPhieukho.update((v) => {
        v.sanpham = this._DonhangService.ListDonhang().find((x) => x.id == event.value).sanpham.map((x) => {
          return {
            sanphamId: x.idSP,
            sldat: x.sldat || 0,
            soluong: x.sldat || 0,
            ghichu: x.ghichu
          };
        });
        return v;
      });
    } else {
      this.DetailPhieukho.update((v) => {
        v.sanpham = this._DathangService.ListDathang().find((x) => x.id == event.value).sanpham.map((x) => {
          return {
            sanphamId: x.idSP,
            sldat: x.sldat || 0,
            soluong: x.sldat || 0,
            ghichu: x.ghichu
          };
        });
        return v;
      });
    }
    console.log(this.DetailPhieukho());
  }
  DetailPhieukho = this._PhieukhoService.DetailPhieukho;
  isEdit = signal(false);
  isDelete = signal(false);
  phieukhoId = this._PhieukhoService.phieukhoId;
  ngOnInit() {
    return __async(this, null, function* () {
    });
  }
  handlePhieukhoAction() {
    return __async(this, null, function* () {
      if (this.phieukhoId() === "0") {
        yield this.createPhieukho();
      } else {
        yield this.updatePhieukho();
      }
    });
  }
  createPhieukho() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.CreatePhieukho(this.DetailPhieukho());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o phieukho:", error);
      }
      console.log(this.DetailPhieukho());
    });
  }
  updatePhieukho() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.updatePhieukho(this.DetailPhieukho());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt phieukho:", error);
      }
      console.log(this.DetailPhieukho());
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._PhieukhoService.DeletePhieukho(this.DetailPhieukho());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/phieukho"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a phieukho:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/phieukho"]);
    this._ListphieukhoComponent.drawer.close();
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
    this.DetailPhieukho.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  DoFindSanpham(event) {
    const query = event.target.value.toLowerCase();
    this.filterSP = this._SanphamService.ListSanpham().filter((v) => removeVietnameseAccents(v.title).includes(query) || v.title.toLowerCase().includes(query));
  }
  onChangeSoluong(item, event) {
  }
  AddSanpham() {
    this.DetailPhieukho.update((v) => {
      if (!v.sanpham)
        v.sanpham = [];
      v.sanpham.push({ id: GenId(8, false), sanphamId: "", soluong: 0, ghichu: "" });
      return v;
    });
  }
  RemoveSanpham(index) {
    this.DetailPhieukho.update((v) => {
      v.sanpham.splice(index, 1);
      return v;
    });
  }
  getSPUnit(sanphamId) {
    const sp = this._SanphamService.ListSanpham().find((x) => x.id == sanphamId);
    return sp ? sp.dvt : "";
  }
  static \u0275fac = function DetailPhieukhoComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailPhieukhoComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailPhieukhoComponent, selectors: [["app-detailphieukho"]], decls: 75, vars: 25, consts: [["picker", ""], [1, "flex", "flex-col", "h-full", "bg-white", "text-[#333]"], [1, "flex", "flex-row", "items-center", "p-4", "border-b", "border-gray-100"], ["mat-icon-button", "", "color", "primary", 1, "!text-[#2e7d32]", 3, "click"], [1, "flex-1", "text-center", "font-semibold", "text-xl"], [1, "w-10"], [1, "flex-1", "overflow-auto", "p-6", "space-y-6"], [1, "space-y-4"], [1, "flex", "flex-col"], [1, "text-sm", "font-medium", "mb-1", "text-gray-600"], [1, "bg-gray-100", "p-3", "rounded", "border", "border-gray-300", "text-gray-600"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Ch\u1ECDn ng\xE0y", 3, "ngModelChange", "matDatepicker", "ngModel", "disabled"], ["matSuffix", "", 3, "for"], [3, "ngModelChange", "selectionChange", "ngModel", "disabled"], [3, "value", 4, "ngFor", "ngForOf"], [3, "ngModelChange", "ngModel", "disabled"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "rows", "3", "placeholder", "Vui l\xF2ng nh\u1EADp ghi ch\xFA", 3, "ngModelChange", "ngModel", "disabled"], [1, "font-bold", "text-lg", "border-t", "pt-4", "mt-6"], ["mat-flat-button", "", 1, "!bg-[#2e7d32]", "!text-white", 3, "click", "disabled"], [1, "overflow-x-auto", "border", "rounded", "border-gray-200"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-gray-50", "text-sm", "font-semibold", "text-gray-600", "border-b"], [1, "p-3", "w-16", "text-center"], [1, "p-3"], [1, "p-3", "w-32"], [1, "p-3", "w-40"], [1, "p-3", "w-20", "text-center"], ["class", "border-b last:border-0", 4, "ngFor", "ngForOf", "ngForTrackBy"], [4, "ngIf"], [1, "p-4", "border-t", "flex", "flex-row", "space-x-2"], ["mat-flat-button", "", "class", "!bg-[#2e7d32] !text-white", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", "color", "primary", 3, "click", 4, "ngIf"], ["mat-stroked-button", "", 3, "click"], ["mat-icon-button", "", "color", "warn", "class", "ml-auto", 3, "click", 4, "ngIf"], ["class", "fixed inset-0 bg-black/50 z-[1000] flex items-center justify-center p-4", 4, "ngIf"], [3, "value"], [1, "border-b", "last:border-0"], [1, "p-3", "text-center", "text-sm"], [1, "p-2"], [3, "ngModelChange", "ngModel", "disabled", "ngModelOptions"], [1, "w-full", "flex", "flex-col", "p-2"], ["matInput", "", "placeholder", "T\xECm ki\u1EBFm...", 3, "input"], [1, "max-h-60", "overflow-y-auto", "mt-2"], [1, "p-3", "text-sm", "text-gray-600"], ["matInput", "", "type", "number", 3, "ngModelChange", "ngModel", "disabled", "ngModelOptions"], [1, "p-3", "text-center"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], ["colspan", "5", 1, "p-6", "text-center", "text-gray-400", "italic"], ["mat-flat-button", "", 1, "!bg-[#2e7d32]", "!text-white", 3, "click"], ["mat-stroked-button", "", "color", "primary", 3, "click"], ["mat-icon-button", "", "color", "warn", 1, "ml-auto", 3, "click"], [1, "fixed", "inset-0", "bg-black/50", "z-[1000]", "flex", "items-center", "justify-center", "p-4"], [1, "bg-white", "rounded-lg", "shadow-xl", "p-6", "w-full", "max-w-sm", "space-y-4"], [1, "text-xl", "font-bold", "text-center"], [1, "text-gray-600", "text-center"], [1, "flex", "flex-row", "space-x-2", "pt-2"], ["mat-flat-button", "", "color", "warn", 1, "flex-1", 3, "click"], ["mat-stroked-button", "", 1, "flex-1", 3, "click"]], template: function DetailPhieukhoComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "button", 3);
      \u0275\u0275listener("click", function DetailPhieukhoComponent_Template_button_click_2_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(3, "mat-icon");
      \u0275\u0275text(4, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div", 4);
      \u0275\u0275text(6);
      \u0275\u0275elementEnd();
      \u0275\u0275element(7, "div", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 6)(9, "div", 7)(10, "div", 8)(11, "label", 9);
      \u0275\u0275text(12, "M\xE3 Phi\u1EBFu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "div", 10);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(15, "div", 11)(16, "mat-form-field", 12)(17, "mat-label");
      \u0275\u0275text(18, "Ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_input_ngModelChange_19_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().ngay, $event) || (ctx.DetailPhieukho().ngay = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(20, "mat-datepicker-toggle", 14)(21, "mat-datepicker", null, 0);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-form-field", 12)(24, "mat-label");
      \u0275\u0275text(25, "Lo\u1EA1i Phi\u1EBFu");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "mat-select", 15);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_mat_select_ngModelChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().type, $event) || (ctx.DetailPhieukho().type = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function DetailPhieukhoComponent_Template_mat_select_selectionChange_26_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ChangeType($event));
      });
      \u0275\u0275template(27, DetailPhieukhoComponent_mat_option_27_Template, 2, 2, "mat-option", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "mat-form-field", 12)(29, "mat-label");
      \u0275\u0275text(30, "T\u1EEB Kho");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "mat-select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_mat_select_ngModelChange_31_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().tuKhoId, $event) || (ctx.DetailPhieukho().tuKhoId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275template(32, DetailPhieukhoComponent_mat_option_32_Template, 2, 3, "mat-option", 16);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "mat-form-field", 12)(34, "mat-label");
      \u0275\u0275text(35, "\u0110\u1EBFn Kho");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-select", 17);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_mat_select_ngModelChange_36_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().denKhoId, $event) || (ctx.DetailPhieukho().denKhoId = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275template(37, DetailPhieukhoComponent_mat_option_37_Template, 2, 3, "mat-option", 16);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(38, "mat-form-field", 18)(39, "mat-label");
      \u0275\u0275text(40, "Ghi Ch\xFA");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "textarea", 19);
      \u0275\u0275twoWayListener("ngModelChange", function DetailPhieukhoComponent_Template_textarea_ngModelChange_41_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.DetailPhieukho().ghichu, $event) || (ctx.DetailPhieukho().ghichu = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(42, "div", 7)(43, "div", 20);
      \u0275\u0275text(44, "Danh s\xE1ch s\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "button", 21);
      \u0275\u0275listener("click", function DetailPhieukhoComponent_Template_button_click_45_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.AddSanpham());
      });
      \u0275\u0275elementStart(46, "mat-icon");
      \u0275\u0275text(47, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(48, " Th\xEAm S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "div", 22)(50, "table", 23)(51, "thead")(52, "tr", 24)(53, "th", 25);
      \u0275\u0275text(54, "STT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "th", 26);
      \u0275\u0275text(56, "T\xEAn S\u1EA3n Ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "th", 27);
      \u0275\u0275text(58, "\u0110\u01A1n V\u1ECB");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "th", 28);
      \u0275\u0275text(60, "S\u1ED1 L\u01B0\u1EE3ng Chuy\u1EC3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(61, "th", 29);
      \u0275\u0275text(62, "H\xE0nh \u0110\u1ED9ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(63, "tbody");
      \u0275\u0275template(64, DetailPhieukhoComponent_tr_64_Template, 20, 12, "tr", 30)(65, DetailPhieukhoComponent_tr_65_Template, 3, 0, "tr", 31);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(66, "div", 32);
      \u0275\u0275template(67, DetailPhieukhoComponent_button_67_Template, 4, 0, "button", 33)(68, DetailPhieukhoComponent_button_68_Template, 4, 0, "button", 34);
      \u0275\u0275elementStart(69, "button", 35);
      \u0275\u0275listener("click", function DetailPhieukhoComponent_Template_button_click_69_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(70, "mat-icon");
      \u0275\u0275text(71, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275text(72, " H\u1EE7y ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(73, DetailPhieukhoComponent_button_73_Template, 3, 0, "button", 36);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(74, DetailPhieukhoComponent_div_74_Template, 11, 0, "div", 37);
    }
    if (rf & 2) {
      let tmp_2_0;
      const picker_r13 = \u0275\u0275reference(22);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1(" ", ctx.phieukhoId() === "0" ? "T\u1EA1o Phi\u1EBFu Chuy\u1EC3n Kho" : "Chi Ti\u1EBFt Phi\u1EBFu Chuy\u1EC3n Kho", " ");
      \u0275\u0275advance(8);
      \u0275\u0275textInterpolate1(" ", (tmp_2_0 = ctx.DetailPhieukho()) == null ? null : tmp_2_0.maphieu, " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("matDatepicker", picker_r13);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().ngay);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("for", picker_r13);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().type);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.LoaiPhieu);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().tuKhoId);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx._KhoService.ListKho());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().denKhoId);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx._KhoService.ListKho());
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.DetailPhieukho().ghichu);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", !ctx.isEdit());
      \u0275\u0275advance(19);
      \u0275\u0275property("ngForOf", ctx.DetailPhieukho().sanpham)("ngForTrackBy", ctx.trackByFn);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.DetailPhieukho().sanpham || ctx.DetailPhieukho().sanpham.length === 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isEdit());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isEdit());
      \u0275\u0275advance(5);
      \u0275\u0275property("ngIf", ctx.phieukhoId() !== "0");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isDelete());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
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
    MatSelect,
    MatOption,
    MatDialogModule,
    CommonModule,
    NgForOf,
    NgIf,
    MatSlideToggleModule,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  height: 100%;\n}\n  .mat-mdc-form-field {\n  width: 100%;\n}\n  .mat-mdc-form-field-subscript-wrapper {\n  display: none;\n}\n  .mat-mdc-select-value {\n  font-size: 14px;\n}\n  .mat-mdc-option .mdc-list-item__primary-text {\n  font-size: 14px;\n}\ntable[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  white-space: nowrap;\n}\ntable[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  vertical-align: middle;\n}\n.bg-gray-100[_ngcontent-%COMP%] {\n  background-color: #f5f5f5 !important;\n}\nbutton.mat-mdc-flat-button.mat-primary[_ngcontent-%COMP%] {\n  background-color: #2e7d32 !important;\n}\nlabel[_ngcontent-%COMP%] {\n  color: #666;\n  font-weight: 500;\n}\n/*# sourceMappingURL=detailphieukho.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailPhieukhoComponent, { className: "DetailPhieukhoComponent", filePath: "src/app/admin/phieukho/detailphieukho/detailphieukho.component.ts", lineNumber: 42 });
})();
export {
  DetailPhieukhoComponent
};
//# sourceMappingURL=chunk-DWO2HP3J.js.map
