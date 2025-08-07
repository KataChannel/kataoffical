import {
  AuditlogService,
  ListAuditlogComponent
} from "./chunk-CKRNRVOC.js";
import "./chunk-X7ROAIMK.js";
import "./chunk-FTMLWTPE.js";
import {
  MatSlideToggleModule
} from "./chunk-OTAJRW5P.js";
import "./chunk-UV2EYCAL.js";
import {
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import "./chunk-S32RIQSG.js";
import "./chunk-CB53OP7A.js";
import "./chunk-OZX2XR6T.js";
import "./chunk-JFLWRVXN.js";
import {
  convertToSlug
} from "./chunk-657A73EG.js";
import "./chunk-MKCJCKWI.js";
import "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import "./chunk-LIKOVN7R.js";
import "./chunk-3J77SWWE.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  FormsModule,
  MatFormFieldModule,
  MatInputModule
} from "./chunk-WEAWHMFJ.js";
import "./chunk-44ZKFD54.js";
import "./chunk-U3IXXJDR.js";
import {
  MatSnackBar
} from "./chunk-WD36GM3Q.js";
import "./chunk-2AWV6PYA.js";
import "./chunk-4E5W4BJX.js";
import {
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import "./chunk-LD5X4C2B.js";
import "./chunk-GWKJMKCD.js";
import {
  ActivatedRoute,
  Router
} from "./chunk-JGMWTFVW.js";
import "./chunk-KJMZCM3Q.js";
import {
  CommonModule,
  DatePipe,
  JsonPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction3,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1
} from "./chunk-IHZ7YO24.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/auditlog/detailauditlog/detailauditlog.component.ts
var _c0 = (a0, a1, a2) => ({ "bg-green-100 text-green-800": a0, "bg-red-100 text-red-800": a1, "bg-yellow-100 text-yellow-800": a2 });
function DetailAuditlogComponent_ng_container_63_li_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const field_r2 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(field_r2);
  }
}
function DetailAuditlogComponent_ng_container_63_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "ul", 17);
    \u0275\u0275template(2, DetailAuditlogComponent_ng_container_63_li_2_Template, 2, 1, "li", 18);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", (tmp_4_0 = ctx_r2.DetailAuditlog()) == null ? null : tmp_4_0.changedFields);
  }
}
function DetailAuditlogComponent_ng_template_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "No changed fields");
    \u0275\u0275elementEnd();
  }
}
function DetailAuditlogComponent_ng_container_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "pre", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "json");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, (tmp_4_0 = ctx_r2.DetailAuditlog()) == null ? null : tmp_4_0.oldValues));
  }
}
function DetailAuditlogComponent_ng_template_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "No old values");
    \u0275\u0275elementEnd();
  }
}
function DetailAuditlogComponent_ng_container_75_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "pre", 20);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "json");
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    let tmp_4_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(3, 1, (tmp_4_0 = ctx_r2.DetailAuditlog()) == null ? null : tmp_4_0.newValues));
  }
}
function DetailAuditlogComponent_ng_template_76_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 19);
    \u0275\u0275text(1, "No new values");
    \u0275\u0275elementEnd();
  }
}
function DetailAuditlogComponent_div_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 21)(1, "h2", 22);
    \u0275\u0275text(2, "Error Details");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div")(4, "strong");
    \u0275\u0275text(5, "Message:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div")(8, "strong");
    \u0275\u0275text(9, "Status Code:");
    \u0275\u0275elementEnd();
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    let tmp_4_0;
    let tmp_5_0;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate1(" ", ((tmp_4_0 = ctx_r2.DetailAuditlog()) == null ? null : tmp_4_0.errorDetails == null ? null : tmp_4_0.errorDetails.message) || "N/A", " ");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", ((tmp_5_0 = ctx_r2.DetailAuditlog()) == null ? null : tmp_5_0.errorDetails == null ? null : tmp_5_0.errorDetails.statusCode) || "N/A", " ");
  }
}
var DetailAuditlogComponent = class _DetailAuditlogComponent {
  _ListAuditlogComponent = inject(ListAuditlogComponent);
  _AuditlogService = inject(AuditlogService);
  _route = inject(ActivatedRoute);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  constructor() {
    this._route.paramMap.subscribe((params) => {
      const id = params.get("id");
      this._AuditlogService.setAuditlogId(id);
    });
    effect(() => __async(this, null, function* () {
      const id = this._AuditlogService.auditlogId();
      if (!id) {
        this._router.navigate(["/admin/auditlog"]);
        this._ListAuditlogComponent.drawer.close();
      }
      if (id === "new") {
        this.DetailAuditlog.set({});
        this._ListAuditlogComponent.drawer.open();
        this.isEdit.update((value) => !value);
        this._router.navigate(["/admin/auditlog", "new"]);
      } else {
        yield this._AuditlogService.getAuditlogBy({ id, isOne: true });
        this._ListAuditlogComponent.drawer.open();
        this._router.navigate(["/admin/auditlog", id]);
      }
    }));
  }
  DetailAuditlog = this._AuditlogService.DetailAuditlog;
  isEdit = signal(false);
  isDelete = signal(false);
  auditlogId = this._AuditlogService.auditlogId;
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._AuditlogService.getAuditlogBy({ id: this.auditlogId(), isOne: true });
      console.log("DetailAuditlogComponent initialized", this.DetailAuditlog());
    });
  }
  handleAuditlogAction() {
    return __async(this, null, function* () {
      if (this.auditlogId() === "new") {
        yield this.createAuditlog();
      } else {
        yield this.updateAuditlog();
      }
    });
  }
  createAuditlog() {
    return __async(this, null, function* () {
      try {
        yield this._AuditlogService.CreateAuditlog(this.DetailAuditlog());
        this._snackBar.open("T\u1EA1o M\u1EDBi Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi t\u1EA1o auditlog:", error);
      }
    });
  }
  updateAuditlog() {
    return __async(this, null, function* () {
      try {
        yield this._AuditlogService.updateAuditlog(this.DetailAuditlog());
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.isEdit.update((value) => !value);
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt auditlog:", error);
      }
    });
  }
  DeleteData() {
    return __async(this, null, function* () {
      try {
        yield this._AuditlogService.DeleteAuditlog(this.DetailAuditlog());
        this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this._router.navigate(["/admin/auditlog"]);
      } catch (error) {
        console.error("L\u1ED7i khi x\xF3a auditlog:", error);
      }
    });
  }
  goBack() {
    this._router.navigate(["/admin/auditlog"]);
    this._ListAuditlogComponent.drawer.close();
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
    this.DetailAuditlog.update((v) => {
      v.slug = convertToSlug(v.title);
      return v;
    });
  }
  static \u0275fac = function DetailAuditlogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetailAuditlogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetailAuditlogComponent, selectors: [["app-detailauditlog"]], decls: 79, vars: 28, consts: [["noChangedFields", ""], ["noOldValues", ""], ["noNewValues", ""], [1, "flex", "flex-row", "justify-between", "items-center", "space-x-2", "p-2"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "font-bold"], [1, "flex-grow"], [1, "relative", "flex", "flex-col", "w-full", "p-4", "overflow-auto"], [1, "bg-white", "border", "rounded", "p-4"], [1, "flex", "items-center", "gap-2"], [1, "text-xl", "font-semibold"], [1, "px-2", "py-1", "rounded", "text-xs", "font-bold", 3, "ngClass"], [1, "grid", "md:grid-cols-2", "gap-4", "mt-2"], [1, "bg-white", "border", "rounded", "p-4", "mt-4"], [1, "text-lg", "font-semibold", "mb-2"], [4, "ngIf", "ngIfElse"], ["class", "bg-red-50 border border-red-200 rounded p-4 mt-4", 4, "ngIf"], [1, "list-disc", "pl-5"], [4, "ngFor", "ngForOf"], [1, "text-gray-500"], [1, "whitespace-pre-wrap"], [1, "bg-red-50", "border", "border-red-200", "rounded", "p-4", "mt-4"], [1, "text-lg", "font-semibold", "mb-2", "text-red-700"]], template: function DetailAuditlogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 3)(1, "button", 4);
      \u0275\u0275listener("click", function DetailAuditlogComponent_Template_button_click_1_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.goBack());
      });
      \u0275\u0275elementStart(2, "mat-icon");
      \u0275\u0275text(3, "arrow_back");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(4, "div", 5);
      \u0275\u0275text(5);
      \u0275\u0275elementEnd();
      \u0275\u0275element(6, "div", 6);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 7)(8, "div", 8)(9, "div", 9)(10, "span", 10);
      \u0275\u0275text(11, "Audit Log Detail");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 11);
      \u0275\u0275text(13);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(14, "div", 12)(15, "div")(16, "strong");
      \u0275\u0275text(17, "ID:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div")(20, "strong");
      \u0275\u0275text(21, "Entity Name:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(22);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div")(24, "strong");
      \u0275\u0275text(25, "Action:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div")(28, "strong");
      \u0275\u0275text(29, "Entity ID:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "div")(32, "strong");
      \u0275\u0275text(33, "IP Address:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(34);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div")(36, "strong");
      \u0275\u0275text(37, "Created At:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(38);
      \u0275\u0275pipe(39, "date");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "div")(41, "strong");
      \u0275\u0275text(42, "User Email:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div")(45, "strong");
      \u0275\u0275text(46, "User Agent:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div")(49, "strong");
      \u0275\u0275text(50, "Endpoint:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(51);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "div")(53, "strong");
      \u0275\u0275text(54, "Method:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(55);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(56, "div")(57, "strong");
      \u0275\u0275text(58, "Response Time:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(59);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(60, "div", 13)(61, "h2", 14);
      \u0275\u0275text(62, "Changed Fields");
      \u0275\u0275elementEnd();
      \u0275\u0275template(63, DetailAuditlogComponent_ng_container_63_Template, 3, 1, "ng-container", 15)(64, DetailAuditlogComponent_ng_template_64_Template, 2, 0, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(66, "div", 13)(67, "h2", 14);
      \u0275\u0275text(68, "Old Values");
      \u0275\u0275elementEnd();
      \u0275\u0275template(69, DetailAuditlogComponent_ng_container_69_Template, 4, 3, "ng-container", 15)(70, DetailAuditlogComponent_ng_template_70_Template, 2, 0, "ng-template", null, 1, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "div", 13)(73, "h2", 14);
      \u0275\u0275text(74, "New Values");
      \u0275\u0275elementEnd();
      \u0275\u0275template(75, DetailAuditlogComponent_ng_container_75_Template, 4, 3, "ng-container", 15)(76, DetailAuditlogComponent_ng_template_76_Template, 2, 0, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd();
      \u0275\u0275template(78, DetailAuditlogComponent_div_78_Template, 11, 2, "div", 16);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      let tmp_3_0;
      let tmp_4_0;
      let tmp_5_0;
      let tmp_6_0;
      let tmp_7_0;
      let tmp_8_0;
      let tmp_9_0;
      let tmp_10_0;
      let tmp_11_0;
      let tmp_12_0;
      let tmp_13_0;
      let tmp_14_0;
      let tmp_15_0;
      let tmp_16_0;
      let tmp_17_0;
      let tmp_19_0;
      let tmp_21_0;
      let tmp_23_0;
      const noChangedFields_r4 = \u0275\u0275reference(65);
      const noOldValues_r5 = \u0275\u0275reference(71);
      const noNewValues_r6 = \u0275\u0275reference(77);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(((tmp_3_0 = ctx.DetailAuditlog()) == null ? null : tmp_3_0.codeId) || "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
      \u0275\u0275advance(7);
      \u0275\u0275property("ngClass", \u0275\u0275pureFunction3(24, _c0, ((tmp_4_0 = ctx.DetailAuditlog()) == null ? null : tmp_4_0.status) === "SUCCESS", ((tmp_4_0 = ctx.DetailAuditlog()) == null ? null : tmp_4_0.status) === "ERROR", ((tmp_4_0 = ctx.DetailAuditlog()) == null ? null : tmp_4_0.status) === "WARNING"));
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ((tmp_5_0 = ctx.DetailAuditlog()) == null ? null : tmp_5_0.status) || "N/A", " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ((tmp_6_0 = ctx.DetailAuditlog()) == null ? null : tmp_6_0.id) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_7_0 = ctx.DetailAuditlog()) == null ? null : tmp_7_0.entityName) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_8_0 = ctx.DetailAuditlog()) == null ? null : tmp_8_0.action) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_9_0 = ctx.DetailAuditlog()) == null ? null : tmp_9_0.entityId) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_10_0 = ctx.DetailAuditlog()) == null ? null : tmp_10_0.ipAddress) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(39, 21, (tmp_11_0 = ctx.DetailAuditlog()) == null ? null : tmp_11_0.createdAt, "HH:mm:ss - dd/MM/yyyy"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ((tmp_12_0 = ctx.DetailAuditlog()) == null ? null : tmp_12_0.userEmail) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_13_0 = ctx.DetailAuditlog()) == null ? null : tmp_13_0.userAgent) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_14_0 = ctx.DetailAuditlog()) == null ? null : tmp_14_0.metadata == null ? null : tmp_14_0.metadata.endpoint) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_15_0 = ctx.DetailAuditlog()) == null ? null : tmp_15_0.metadata == null ? null : tmp_15_0.metadata.method) || "N/A", " ");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ((tmp_16_0 = ctx.DetailAuditlog()) == null ? null : tmp_16_0.metadata == null ? null : tmp_16_0.metadata.responseTime) || "N/A", " ms ");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", (tmp_17_0 = ctx.DetailAuditlog()) == null ? null : tmp_17_0.changedFields == null ? null : tmp_17_0.changedFields.length)("ngIfElse", noChangedFields_r4);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_19_0 = ctx.DetailAuditlog()) == null ? null : tmp_19_0.oldValues)("ngIfElse", noOldValues_r5);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", (tmp_21_0 = ctx.DetailAuditlog()) == null ? null : tmp_21_0.newValues)("ngIfElse", noNewValues_r6);
      \u0275\u0275advance(3);
      \u0275\u0275property("ngIf", ((tmp_23_0 = ctx.DetailAuditlog()) == null ? null : tmp_23_0.status) === "ERROR");
    }
  }, dependencies: [
    MatFormFieldModule,
    MatInputModule,
    FormsModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatIconButton,
    MatSelectModule,
    MatDialogModule,
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    JsonPipe,
    DatePipe,
    MatSlideToggleModule
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetailAuditlogComponent, { className: "DetailAuditlogComponent", filePath: "src/app/admin/auditlog/detailauditlog/detailauditlog.component.ts", lineNumber: 33 });
})();
export {
  DetailAuditlogComponent
};
//# sourceMappingURL=chunk-XCCNEVFW.js.map
