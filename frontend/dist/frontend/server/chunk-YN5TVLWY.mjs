import './polyfills.server.mjs';
import {
  ChotkhoService
} from "./chunk-NJA7P42H.mjs";
import {
  MatTableModule
} from "./chunk-3VZFOMYA.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-5PWX7G23.mjs";
import {
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormFieldModule,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import {
  MatButtonModule
} from "./chunk-K6ADGRHN.mjs";
import {
  CommonModule,
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
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
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction2,
  ɵɵpureFunction4,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate4,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-I6KZCWLZ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/chotkho/product-timeline-dialog/product-timeline-dialog.component.ts
var _c0 = (a0, a1) => ({ "bg-slate-50/40 font-semibold border-y border-slate-100/80": a0, "border-b border-slate-100/60 hover:bg-slate-50/30 transition-all": a1 });
var _c1 = (a0, a1, a2, a3) => ({ "bg-slate-100 text-slate-600 border-slate-200": a0, "bg-emerald-50 text-emerald-700 border-emerald-200": a1, "bg-rose-50 text-rose-700 border-rose-200": a2, "bg-indigo-50 text-indigo-700 border-indigo-200": a3 });
var _forTrack0 = ($index, $item) => $item.id || $index;
function ProductTimelineDialogComponent_Conditional_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41);
    \u0275\u0275element(1, "div", 46);
    \u0275\u0275elementStart(2, "span", 17);
    \u0275\u0275text(3, "\u0110ang l\u1EA5y d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()();
  }
}
function ProductTimelineDialogComponent_Conditional_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "mat-icon", 47);
    \u0275\u0275text(2, "history_toggle_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 48);
    \u0275\u0275text(4, "Kh\xF4ng c\xF3 bi\u1EBFn \u0111\u1ED9ng n\xE0o trong kho\u1EA3ng th\u1EDDi gian n\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 49);
    \u0275\u0275text(6, "Vui l\xF2ng thay \u0111\u1ED5i kho\u1EA3ng l\u1ECDc ng\xE0y");
    \u0275\u0275elementEnd()();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r1.time, "HH:mm:ss dd/MM/yyyy"));
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 64);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 65);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.code);
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 66);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.code);
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("+", \u0275\u0275pipeBind2(2, 1, item_r1.qty, "1.0-3"), "");
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind2(2, 1, item_r1.qty, "1.0-3"), "");
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 70);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r1.qty, "1.0-3"));
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r1.slhuy, "1.0-3"));
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 73);
    \u0275\u0275text(1, "0");
    \u0275\u0275elementEnd();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 71);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 16)(1, "span", 76);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 77);
    \u0275\u0275text(4);
    \u0275\u0275pipe(5, "number");
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "number");
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.ghichu || "Ch\u1ED1t \u0111i\u1EC1u ch\u1EC9nh");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate4(" (H\u1EC7:", \u0275\u0275pipeBind2(5, 5, item_r1.sltonhethong, "1.0-2"), "|Th\u1EF1c:", \u0275\u0275pipeBind2(6, 8, item_r1.qty, "1.0-2"), "|H\u1EE7y:", \u0275\u0275pipeBind2(7, 11, item_r1.slhuy, "1.0-2"), "|L\u1EC7ch:", \u0275\u0275pipeBind2(8, 14, item_r1.chenhlech, "1.0-2"), ") ");
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r1.ghichu || "-");
  }
}
function ProductTimelineDialogComponent_Conditional_104_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 59)(1, "td", 60);
    \u0275\u0275template(2, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_2_Template, 2, 0, "span")(3, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_3_Template, 3, 4, "span");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "td", 61)(5, "span", 62);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "td", 63);
    \u0275\u0275template(8, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_8_Template, 2, 0, "span", 64)(9, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_9_Template, 2, 1, "span", 65)(10, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_10_Template, 2, 1, "span", 66);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 67);
    \u0275\u0275template(12, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_12_Template, 3, 4, "span", 68)(13, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_13_Template, 3, 4, "span", 69)(14, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_14_Template, 3, 4, "span", 70)(15, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_15_Template, 2, 0, "span", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 72);
    \u0275\u0275template(17, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_17_Template, 3, 4, "span", 69)(18, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_18_Template, 2, 0, "span", 73)(19, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_19_Template, 2, 0, "span", 71);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "td", 74);
    \u0275\u0275text(21);
    \u0275\u0275pipe(22, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "td", 75);
    \u0275\u0275template(24, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_24_Template, 9, 17, "div", 16)(25, ProductTimelineDialogComponent_Conditional_104_For_20_Conditional_25_Template, 2, 1, "span");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction2(13, _c0, item_r1.type === "T\u1ED2N \u0110\u1EA6U K\u1EF2", item_r1.type !== "T\u1ED2N \u0110\u1EA6U K\u1EF2"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r1.type === "T\u1ED2N \u0110\u1EA6U K\u1EF2" ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction4(16, _c1, item_r1.type === "T\u1ED2N \u0110\u1EA6U K\u1EF2", item_r1.type === "NH\u1EACP", item_r1.type === "XU\u1EA4T", item_r1.type === "CH\u1ED0T KHO"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.type, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r1.type === "T\u1ED2N \u0110\u1EA6U K\u1EF2" ? 8 : item_r1.type === "CH\u1ED0T KHO" ? 9 : 10);
    \u0275\u0275advance(4);
    \u0275\u0275conditional(item_r1.type === "NH\u1EACP" ? 12 : item_r1.type === "XU\u1EA4T" ? 13 : item_r1.type === "CH\u1ED0T KHO" ? 14 : 15);
    \u0275\u0275advance(5);
    \u0275\u0275conditional(item_r1.slhuy > 0 ? 17 : item_r1.type === "CH\u1ED0T KHO" ? 18 : 19);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(22, 10, item_r1.balance, "1.0-3"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("title", item_r1.ghichu || "");
    \u0275\u0275advance();
    \u0275\u0275conditional(item_r1.type === "CH\u1ED0T KHO" ? 24 : 25);
  }
}
function ProductTimelineDialogComponent_Conditional_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 43)(1, "table", 50)(2, "thead")(3, "tr", 51)(4, "th", 52);
    \u0275\u0275text(5, "Th\u1EDDi Gian");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 53);
    \u0275\u0275text(7, "H\xE0nh \u0110\u1ED9ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 54);
    \u0275\u0275text(9, "S\u1ED1 Ch\u1EE9ng T\u1EEB / M\xE3");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 55);
    \u0275\u0275text(11, "S\u1ED1 L\u01B0\u1EE3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 56);
    \u0275\u0275text(13, "SL H\u1EE7y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 57);
    \u0275\u0275text(15, "T\u1ED3n L\u0169y K\u1EBF");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 58);
    \u0275\u0275text(17, "Ghi Ch\xFA");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody");
    \u0275\u0275repeaterCreate(19, ProductTimelineDialogComponent_Conditional_104_For_20_Template, 26, 21, "tr", 59, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(19);
    \u0275\u0275repeater(ctx_r1.timelineData);
  }
}
var ProductTimelineDialogComponent = class _ProductTimelineDialogComponent {
  dialogRef;
  chotkhoService;
  data;
  fromDate;
  toDate;
  timelineData = [];
  startQty = 0;
  totalImport = 0;
  totalExport = 0;
  endQty = 0;
  isLoading = false;
  constructor(dialogRef, chotkhoService, data) {
    this.dialogRef = dialogRef;
    this.chotkhoService = chotkhoService;
    this.data = data;
  }
  ngOnInit() {
    const now = /* @__PURE__ */ new Date();
    this.fromDate = this.formatLocalDate(now);
    this.toDate = this.formatLocalDate(now);
    this.loadTimeline();
  }
  formatLocalDate(date) {
    const year = date.getFullYear();
    const month = String(date.getMonth() + 1).padStart(2, "0");
    const day = String(date.getDate()).padStart(2, "0");
    return `${year}-${month}-${day}`;
  }
  loadTimeline() {
    return __async(this, null, function* () {
      if (!this.data.sanphamId)
        return;
      this.isLoading = true;
      try {
        const defaultKhoId = "4cc01811-61f5-4bdc-83de-a493764e9258";
        const khoId = this.data.khoId || defaultKhoId;
        const fromStr = `${this.fromDate}T00:00:00.000Z`;
        const toStr = `${this.toDate}T23:59:59.999Z`;
        const result = yield this.chotkhoService.getProductTimeline(this.data.sanphamId, khoId, fromStr, toStr);
        if (result) {
          this.startQty = Number(result.startQty || 0);
          this.timelineData = result.timeline || [];
          this.totalImport = 0;
          this.totalExport = 0;
          this.timelineData.forEach((item) => {
            if (item.type === "NH\u1EACP") {
              this.totalImport += Number(item.qty || 0);
            } else if (item.type === "XU\u1EA4T") {
              this.totalExport += Number(item.qty || 0);
            }
          });
          if (this.timelineData.length > 0) {
            this.endQty = this.timelineData[this.timelineData.length - 1].balance;
          } else {
            this.endQty = this.startQty;
          }
        }
      } catch (error) {
        console.error("Error loading product timeline:", error);
      } finally {
        this.isLoading = false;
      }
    });
  }
  onClose() {
    this.dialogRef.close();
  }
  static \u0275fac = function ProductTimelineDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ProductTimelineDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(ChotkhoService), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ProductTimelineDialogComponent, selectors: [["app-product-timeline-dialog"]], decls: 108, vars: 37, consts: [[1, "product-timeline-dialog", "bg-slate-50", "text-slate-900", "rounded-xl", "overflow-hidden", "border", "border-slate-200", "shadow-2xl", "flex", "flex-col", "h-full", "max-h-[92vh]"], [1, "flex", "items-center", "justify-between", "px-4", "py-2.5", "bg-gradient-to-r", "from-slate-950", "via-slate-900", "to-slate-950", "text-white", "shadow-sm", "border-b", "border-slate-800"], [1, "flex", "items-center", "gap-2.5"], [1, "bg-blue-500/10", "p-1.5", "rounded-lg", "text-blue-400", "flex", "items-center", "justify-center", "border", "border-blue-500/20"], [1, "scale-90", "!w-5", "!h-5", "text-[18px]"], [1, "text-sm", "font-bold", "m-0", "tracking-tight", "text-white", "uppercase"], [1, "text-[11px]", "text-slate-400", "m-0", "mt-0.5", "flex", "items-center", "gap-1.5"], [1, "font-bold", "text-blue-400"], [1, "text-slate-600"], [1, "font-mono", "text-white", "bg-slate-850", "px-1.5", "py-0.5", "rounded", "border", "border-slate-800", "text-[10px]"], [1, "text-slate-200"], [1, "p-1", "hover:bg-white/10", "active:bg-white/15", "rounded-md", "text-slate-400", "hover:text-white", "transition-all", "cursor-pointer", 3, "click"], [1, "scale-95", "!w-5", "!h-5", "text-[18px]"], [1, "px-4", "py-2", "bg-white", "border-b", "border-slate-200/60", "flex", "flex-col", "gap-2", "shadow-sm", "shrink-0"], [1, "flex", "flex-wrap", "items-center", "justify-between", "gap-3", "bg-slate-50/80", "px-3", "py-1.5", "rounded-lg", "border", "border-slate-200/50"], [1, "flex", "flex-wrap", "items-center", "gap-3"], [1, "flex", "items-center", "gap-1.5"], [1, "text-[10px]", "font-bold", "text-slate-500", "uppercase", "tracking-wider"], ["type", "date", 1, "h-7", "px-2", "bg-white", "border", "border-slate-200", "rounded-md", "text-xs", "font-semibold", "text-slate-700", "focus:border-blue-500", "focus:outline-none", "transition-all", "cursor-pointer", "shadow-sm", 3, "ngModelChange", "ngModel"], [1, "h-7", "bg-blue-600", "hover:bg-blue-700", "active:scale-95", "disabled:opacity-50", "text-white", "font-bold", "text-[11px]", "px-3.5", "rounded-md", "shadow-sm", "transition-all", "flex", "items-center", "gap-1", "cursor-pointer", 3, "click", "disabled"], [1, "scale-75", "!w-3.5", "!h-3.5", "text-[14px]", "!m-0"], [1, "flex", "items-center", "gap-1.5", "text-[10px]", "text-slate-500", "font-bold", "uppercase", "tracking-wider"], [1, "text-slate-400", "scale-75", "!w-3.5", "!h-3.5", "text-[14px]"], [1, "text-slate-700"], [1, "grid", "grid-cols-2", "md:grid-cols-4", "gap-2.5", "mt-0.5"], [1, "bg-blue-50/20", "border", "border-blue-100/70", "rounded-lg", "px-3", "py-1.5", "hover:bg-blue-50/30", "transition-all", "flex", "items-center", "justify-between"], [1, "text-[9px]", "font-bold", "text-blue-600/90", "uppercase", "tracking-wider", "block"], [1, "text-[8px]", "text-slate-400", "block", "mt-0.5"], [1, "flex", "items-baseline", "gap-1"], [1, "text-base", "font-extrabold", "text-blue-800", "font-mono"], [1, "text-[9px]", "font-bold", "text-slate-400"], [1, "bg-emerald-50/20", "border", "border-emerald-100/70", "rounded-lg", "px-3", "py-1.5", "hover:bg-emerald-50/30", "transition-all", "flex", "items-center", "justify-between"], [1, "text-[9px]", "font-bold", "text-emerald-600/90", "uppercase", "tracking-wider", "block"], [1, "text-base", "font-extrabold", "text-emerald-800", "font-mono"], [1, "bg-rose-50/20", "border", "border-rose-100/70", "rounded-lg", "px-3", "py-1.5", "hover:bg-rose-50/30", "transition-all", "flex", "items-center", "justify-between"], [1, "text-[9px]", "font-bold", "text-rose-600/90", "uppercase", "tracking-wider", "block"], [1, "text-base", "font-extrabold", "text-rose-800", "font-mono"], [1, "bg-indigo-50/20", "border", "border-indigo-100/70", "rounded-lg", "px-3", "py-1.5", "hover:bg-indigo-50/30", "transition-all", "flex", "items-center", "justify-between"], [1, "text-[9px]", "font-bold", "text-indigo-600/90", "uppercase", "tracking-wider", "block"], [1, "text-base", "font-extrabold", "text-indigo-800", "font-mono"], [1, "flex-1", "overflow-auto", "px-4", "py-3", "relative"], [1, "absolute", "inset-0", "bg-slate-50/60", "backdrop-blur-[1px]", "z-20", "flex", "items-center", "justify-center", "flex-col", "gap-2"], [1, "flex", "flex-col", "items-center", "justify-center", "py-8", "text-slate-400"], [1, "overflow-hidden", "border", "border-slate-200/60", "rounded-lg", "bg-white", "shadow-sm"], [1, "flex", "items-center", "justify-end", "gap-3", "px-4", "py-2", "bg-white", "border-t", "border-slate-200", "shrink-0"], [1, "px-4", "py-1.5", "text-xs", "font-bold", "text-slate-700", "hover:text-slate-900", "hover:bg-slate-100", "bg-white", "border", "border-slate-200", "rounded-lg", "transition-all", "cursor-pointer", "shadow-sm", "active:scale-95", 3, "click"], [1, "w-8", "h-8", "border-3", "border-blue-600", "border-t-transparent", "rounded-full", "animate-spin"], [1, "scale-150", "mb-3", "text-slate-300"], [1, "text-xs", "font-semibold", "m-0"], [1, "text-[10px]", "text-slate-400", "m-0", "mt-0.5"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50", "border-b", "border-slate-200", "text-[10px]", "font-bold", "text-slate-500", "uppercase", "tracking-wider"], [1, "py-2", "px-3", "w-[140px]"], [1, "py-2", "px-3", "w-[100px]", "text-center"], [1, "py-2", "px-3", "w-[180px]"], [1, "py-2", "px-3", "text-right", "w-[110px]"], [1, "py-2", "px-3", "text-right", "w-[100px]"], [1, "py-2", "px-3", "text-right", "w-[120px]"], [1, "py-2", "px-3"], [3, "ngClass"], [1, "py-1.5", "px-3", "text-[11px]", "font-medium", "text-slate-500"], [1, "py-1.5", "px-2", "text-center"], [1, "px-2", "py-0.5", "rounded-full", "text-[9px]", "font-bold", "border", "inline-block", "text-center", "uppercase", "tracking-wide", "min-w-[70px]", 3, "ngClass"], [1, "py-1.5", "px-3", "text-[11px]", "font-mono", "font-bold", "text-slate-700"], [1, "text-slate-400", "font-normal", "italic"], [1, "text-indigo-600", "bg-indigo-50/40", "px-1.5", "py-0.5", "rounded", "border", "border-indigo-100/50"], [1, "text-slate-800"], [1, "py-1.5", "px-3", "text-xs", "text-right", "font-mono", "font-bold"], [1, "text-emerald-600"], [1, "text-rose-600"], ["title", "S\u1ED1 l\u01B0\u1EE3ng ch\u1ED1t th\u1EF1c t\u1EBF", 1, "text-indigo-600"], [1, "text-slate-400", "font-normal"], [1, "py-1.5", "px-3", "text-xs", "text-right", "font-mono", "font-bold", "text-rose-650"], [1, "text-slate-300"], [1, "py-1.5", "px-3", "text-xs", "text-right", "font-mono", "font-bold", "text-slate-800"], [1, "py-1.5", "px-3", "text-[11px]", "text-slate-500", "max-w-[280px]", "truncate", 3, "title"], [1, "text-slate-600", "font-medium", "truncate", "max-w-[120px]"], [1, "text-[9px]", "text-slate-400", "font-mono"]], template: function ProductTimelineDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon", 4);
      \u0275\u0275text(5, "history");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h2", 5);
      \u0275\u0275text(8, "Ti\u1EBFn tr\xECnh bi\u1EBFn \u0111\u1ED9ng Xu\u1EA5t - Nh\u1EADp - T\u1ED3n");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6)(10, "span", 7);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "span", 8);
      \u0275\u0275text(13, "|");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "span");
      \u0275\u0275text(15, "M\xE3: ");
      \u0275\u0275elementStart(16, "strong", 9);
      \u0275\u0275text(17);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "span", 8);
      \u0275\u0275text(19, "|");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "span");
      \u0275\u0275text(21, "\u0110VT: ");
      \u0275\u0275elementStart(22, "strong", 10);
      \u0275\u0275text(23);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(24, "button", 11);
      \u0275\u0275listener("click", function ProductTimelineDialogComponent_Template_button_click_24_listener() {
        return ctx.onClose();
      });
      \u0275\u0275elementStart(25, "mat-icon", 12);
      \u0275\u0275text(26, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(27, "div", 13)(28, "div", 14)(29, "div", 15)(30, "div", 16)(31, "span", 17);
      \u0275\u0275text(32, "T\u1EEB");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function ProductTimelineDialogComponent_Template_input_ngModelChange_33_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.fromDate, $event) || (ctx.fromDate = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 16)(35, "span", 17);
      \u0275\u0275text(36, "\u0110\u1EBFn");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "input", 18);
      \u0275\u0275twoWayListener("ngModelChange", function ProductTimelineDialogComponent_Template_input_ngModelChange_37_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.toDate, $event) || (ctx.toDate = $event);
        return $event;
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "button", 19);
      \u0275\u0275listener("click", function ProductTimelineDialogComponent_Template_button_click_38_listener() {
        return ctx.loadTimeline();
      });
      \u0275\u0275elementStart(39, "mat-icon", 20);
      \u0275\u0275text(40);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(41, "span");
      \u0275\u0275text(42, "L\u1ECDc");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(43, "div", 21)(44, "mat-icon", 22);
      \u0275\u0275text(45, "store");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "span");
      \u0275\u0275text(47, "Kho: ");
      \u0275\u0275elementStart(48, "strong", 23);
      \u0275\u0275text(49, "Kho ch\xEDnh HCM");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(50, "div", 24)(51, "div", 25)(52, "div")(53, "span", 26);
      \u0275\u0275text(54, "T\u1ED3n \u0110\u1EA7u K\u1EF3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "span", 27);
      \u0275\u0275text(56);
      \u0275\u0275pipe(57, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 28)(59, "span", 29);
      \u0275\u0275text(60);
      \u0275\u0275pipe(61, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "span", 30);
      \u0275\u0275text(63);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(64, "div", 31)(65, "div")(66, "span", 32);
      \u0275\u0275text(67, "T\u1ED5ng Nh\u1EADp");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(68, "span", 27);
      \u0275\u0275text(69, "L\u0169y k\u1EBF nh\u1EADp");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(70, "div", 28)(71, "span", 33);
      \u0275\u0275text(72);
      \u0275\u0275pipe(73, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(74, "span", 30);
      \u0275\u0275text(75);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(76, "div", 34)(77, "div")(78, "span", 35);
      \u0275\u0275text(79, "T\u1ED5ng Xu\u1EA5t");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(80, "span", 27);
      \u0275\u0275text(81, "L\u0169y k\u1EBF xu\u1EA5t");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(82, "div", 28)(83, "span", 36);
      \u0275\u0275text(84);
      \u0275\u0275pipe(85, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "span", 30);
      \u0275\u0275text(87);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(88, "div", 37)(89, "div")(90, "span", 38);
      \u0275\u0275text(91, "T\u1ED3n Cu\u1ED1i K\u1EF3");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(92, "span", 27);
      \u0275\u0275text(93);
      \u0275\u0275pipe(94, "date");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(95, "div", 28)(96, "span", 39);
      \u0275\u0275text(97);
      \u0275\u0275pipe(98, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(99, "span", 30);
      \u0275\u0275text(100);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(101, "div", 40);
      \u0275\u0275template(102, ProductTimelineDialogComponent_Conditional_102_Template, 4, 0, "div", 41)(103, ProductTimelineDialogComponent_Conditional_103_Template, 7, 0, "div", 42)(104, ProductTimelineDialogComponent_Conditional_104_Template, 21, 0, "div", 43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(105, "div", 44)(106, "button", 45);
      \u0275\u0275listener("click", function ProductTimelineDialogComponent_Template_button_click_106_listener() {
        return ctx.onClose();
      });
      \u0275\u0275text(107, " \u0110\xF3ng ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(11);
      \u0275\u0275textInterpolate(ctx.data.title);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.masp);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.dvt || "-");
      \u0275\u0275advance(10);
      \u0275\u0275twoWayProperty("ngModel", ctx.fromDate);
      \u0275\u0275advance(4);
      \u0275\u0275twoWayProperty("ngModel", ctx.toDate);
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.isLoading ? "sync" : "search");
      \u0275\u0275advance(16);
      \u0275\u0275textInterpolate1("Tr\u01B0\u1EDBc ", \u0275\u0275pipeBind2(57, 19, ctx.fromDate, "dd/MM"), "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(61, 22, ctx.startQty, "1.0-3"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.dvt);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("+", \u0275\u0275pipeBind2(73, 25, ctx.totalImport, "1.0-3"), "");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.dvt);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind2(85, 28, ctx.totalExport, "1.0-3"), "");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.dvt);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate1("\u0110\u1EBFn cu\u1ED1i ", \u0275\u0275pipeBind2(94, 31, ctx.toDate, "dd/MM"), "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(98, 34, ctx.endQty, "1.0-3"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.dvt);
      \u0275\u0275advance(2);
      \u0275\u0275conditional(ctx.isLoading ? 102 : -1);
      \u0275\u0275advance();
      \u0275\u0275conditional(!ctx.isLoading && ctx.timelineData.length === 0 ? 103 : 104);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    DecimalPipe,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    MatButtonModule,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: transparent;\n  height: 100%;\n}\n.product-timeline-dialog[_ngcontent-%COMP%] {\n  height: 100%;\n}\n/*# sourceMappingURL=product-timeline-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ProductTimelineDialogComponent, { className: "ProductTimelineDialogComponent", filePath: "src/app/admin/chotkho/product-timeline-dialog/product-timeline-dialog.component.ts", lineNumber: 285 });
})();

// src/app/admin/chotkho/reconciliation-dialog/reconciliation-dialog.component.ts
function ReconciliationDialogComponent_mat_icon_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_60_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_mat_icon_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 35);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.sortDirection === "asc" ? "arrow_upward" : "arrow_downward", " ");
  }
}
function ReconciliationDialogComponent_tr_68_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 36)(1, "td", 37)(2, "span", 38);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "td", 39);
    \u0275\u0275listener("click", function ReconciliationDialogComponent_tr_68_Template_td_click_4_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.openProductTimeline(item_r3));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "td", 40);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 41);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 42)(12, "input", 43);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationDialogComponent_tr_68_Template_input_ngModelChange_12_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r3.sltonthucte, $event) || (item_r3.sltonthucte = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ReconciliationDialogComponent_tr_68_Template_input_ngModelChange_12_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAdjustmentChange(item_r3));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "td", 42)(14, "input", 44);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationDialogComponent_tr_68_Template_input_ngModelChange_14_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r3.slhuy, $event) || (item_r3.slhuy = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function ReconciliationDialogComponent_tr_68_Template_input_ngModelChange_14_listener() {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r0 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r0.onAdjustmentChange(item_r3));
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "td", 45)(16, "span", 46);
    \u0275\u0275text(17);
    \u0275\u0275pipe(18, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "td", 47);
    \u0275\u0275text(20);
    \u0275\u0275pipe(21, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "td", 42)(23, "input", 48);
    \u0275\u0275twoWayListener("ngModelChange", function ReconciliationDialogComponent_tr_68_Template_input_ngModelChange_23_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      \u0275\u0275twoWayBindingSet(item_r3.ghichuDieuChinh, $event) || (item_r3.ghichuDieuChinh = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(item_r3.masp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.dvt || "-");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(10, 10, item_r3.sltonhethong, "1.0-3"));
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", item_r3.sltonthucte);
    \u0275\u0275advance(2);
    \u0275\u0275twoWayProperty("ngModel", item_r3.slhuy);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", item_r3.chenhlech > 0 ? "text-emerald-700 bg-emerald-50 border border-emerald-100 px-2 py-0.5 rounded" : item_r3.chenhlech < 0 ? "text-rose-700 bg-rose-50 border border-rose-100 px-2 py-0.5 rounded" : "text-slate-500 bg-slate-50 px-2 py-0.5 rounded");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(18, 13, item_r3.chenhlech, "1.0-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(21, 16, item_r3.slDieuChinh, "1.0-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", item_r3.ghichuDieuChinh);
  }
}
function ReconciliationDialogComponent_tr_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr")(1, "td", 49);
    \u0275\u0275text(2, " Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m tr\xF9ng kh\u1EDBp. ");
    \u0275\u0275elementEnd()();
  }
}
var ReconciliationDialogComponent = class _ReconciliationDialogComponent {
  dialogRef;
  dialog;
  data;
  items = [];
  filteredItems = [];
  searchTerm = "";
  sortField = "masp";
  sortDirection = "asc";
  constructor(dialogRef, dialog, data) {
    this.dialogRef = dialogRef;
    this.dialog = dialog;
    this.data = data;
    if (data?.items) {
      this.items = data.items.filter((item) => (Number(item.sltonhethong) || 0) > 0).map((item) => {
        const slhuy = item.slhuy !== void 0 ? Number(item.slhuy) : 0;
        const sltonthucte = Number(item.sltonthucte) || 0;
        return __spreadProps(__spreadValues({}, item), {
          slhuy,
          slDieuChinh: sltonthucte,
          ghichuDieuChinh: item.ghichuDieuChinh || ""
        });
      });
      this.applyFilterAndSort();
    }
  }
  openProductTimeline(item) {
    this.dialog.open(ProductTimelineDialogComponent, {
      data: {
        sanphamId: item.sanphamId,
        masp: item.masp,
        title: item.title,
        dvt: item.dvt
      },
      width: "90vw",
      maxWidth: "1200px",
      maxHeight: "92vh",
      height: "90vh"
    });
  }
  ngOnInit() {
  }
  applyFilterAndSort() {
    let result = [...this.items];
    if (this.searchTerm && this.searchTerm.trim() !== "") {
      const term = this.searchTerm.toLowerCase().trim();
      result = result.filter((item) => item.masp && item.masp.toLowerCase().includes(term) || item.title && item.title.toLowerCase().includes(term));
    }
    if (this.sortField) {
      result.sort((a, b) => {
        let valA = a[this.sortField];
        let valB = b[this.sortField];
        if (valA === void 0 || valA === null)
          valA = "";
        if (valB === void 0 || valB === null)
          valB = "";
        if (typeof valA === "string") {
          return this.sortDirection === "asc" ? valA.toLowerCase().localeCompare(valB.toLowerCase(), "vi") : valB.toLowerCase().localeCompare(valA.toLowerCase(), "vi");
        } else {
          return this.sortDirection === "asc" ? valA - valB : valB - valA;
        }
      });
    }
    this.filteredItems = result;
  }
  changeSort(field) {
    if (this.sortField === field) {
      this.sortDirection = this.sortDirection === "asc" ? "desc" : "asc";
    } else {
      this.sortField = field;
      this.sortDirection = "asc";
    }
    this.applyFilterAndSort();
  }
  onAdjustmentChange(item) {
    const sltonthucte = Number(item.sltonthucte) || 0;
    const slhuy = Number(item.slhuy) || 0;
    item.slDieuChinh = sltonthucte;
    const sltonhethong = Number(item.sltonhethong) || 0;
    item.chenhlech = sltonhethong - item.slDieuChinh;
  }
  onCancel() {
    this.dialogRef.close();
  }
  onConfirm() {
    this.dialogRef.close(this.items);
  }
  static \u0275fac = function ReconciliationDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ReconciliationDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MatDialog), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ReconciliationDialogComponent, selectors: [["app-reconciliation-dialog"]], decls: 77, vars: 11, consts: [[1, "reconciliation-dialog", "bg-white", "text-slate-900", "rounded-xl", "overflow-hidden", "border", "border-slate-200", "shadow-2xl", "p-6", "max-w-4xl"], [1, "flex", "items-center", "justify-between", "pb-4", "border-b", "border-slate-100"], [1, "flex", "items-center", "gap-3"], [1, "bg-indigo-50", "p-2.5", "rounded-lg", "text-indigo-600", "flex", "items-center", "justify-center"], [1, "scale-110"], [1, "text-xl", "font-bold", "m-0", "tracking-tight", "text-slate-900"], [1, "text-xs", "text-slate-500", "m-0", "mt-1"], [1, "p-1.5", "hover:bg-slate-100", "rounded-lg", "text-slate-400", "hover:text-slate-700", "transition-colors", 3, "click"], [1, "dialog-content", "py-4", "max-h-[60vh]", "overflow-y-auto"], [1, "mb-4", "relative"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm m\xE3 s\u1EA3n ph\u1EA9m ho\u1EB7c t\xEAn s\u1EA3n ph\u1EA9m...", 1, "w-full", "pl-10", "pr-4", "py-2", "border", "border-slate-200", "rounded-lg", "text-sm", "bg-slate-50", "focus:bg-white", "focus:border-indigo-500", "focus:outline-none", "transition-all", "shadow-sm", 3, "ngModelChange", "input", "ngModel"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "text-slate-400", "!text-lg", "!w-5", "!h-5", "leading-none"], [1, "mb-4", "p-3.5", "bg-amber-50", "border", "border-amber-200/80", "rounded-lg", "flex", "items-start", "gap-3"], [1, "text-amber-600", "mt-0.5"], [1, "text-xs", "text-amber-900", "leading-relaxed", "font-medium"], [1, "overflow-hidden", "border", "border-slate-200", "rounded-lg", "bg-white", "shadow-sm"], [1, "w-full", "text-left", "border-collapse"], [1, "bg-slate-50", "border-b", "border-slate-200", "select-none"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "cursor-pointer", "hover:bg-slate-100/80", "transition-colors", 3, "click"], [1, "flex", "items-center", "gap-1"], ["class", "text-[14px] !w-3.5 !h-3.5 leading-none !m-0", 4, "ngIf"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "text-center"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "text-right", "cursor-pointer", "hover:bg-slate-100/80", "transition-colors", 3, "click"], [1, "flex", "items-center", "justify-end", "gap-1"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "text-center", "w-28", "cursor-pointer", "hover:bg-slate-100/80", "transition-colors", 3, "click"], [1, "flex", "items-center", "justify-center", "gap-1"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "text-center", "w-24", "cursor-pointer", "hover:bg-slate-100/80", "transition-colors", 3, "click"], [1, "p-3", "text-xs", "font-semibold", "uppercase", "tracking-wider", "text-slate-500", "w-44"], ["class", "border-b border-slate-100 hover:bg-slate-50/50 transition-colors", 4, "ngFor", "ngForOf"], [4, "ngIf"], [1, "flex", "items-center", "justify-end", "gap-3", "pt-4", "border-t", "border-slate-100"], [1, "px-4", "py-2", "text-xs", "font-bold", "text-slate-600", "hover:text-slate-900", "bg-white", "hover:bg-slate-100", "border", "border-slate-200", "rounded-lg", "transition-all", 3, "click"], [1, "bg-indigo-600", "hover:bg-indigo-500", "text-white", "text-xs", "font-bold", "px-6", "py-2", "rounded-lg", "shadow-md", "hover:shadow-indigo-500/25", "transition-all", "flex", "items-center", "justify-center", "gap-1.5", "active:scale-95", 3, "click"], [1, "scale-90", "!m-0"], [1, "text-[14px]", "!w-3.5", "!h-3.5", "leading-none", "!m-0"], [1, "border-b", "border-slate-100", "hover:bg-slate-50/50", "transition-colors"], [1, "p-3", "text-xs", "font-mono", "text-slate-500"], [1, "bg-slate-100", "px-2", "py-0.5", "rounded", "border", "border-slate-200", "font-semibold"], [1, "p-3", "text-sm", "font-semibold", "text-slate-800", "hover:text-indigo-600", "hover:underline", "cursor-pointer", 3, "click"], [1, "p-3", "text-sm", "text-slate-500", "text-center"], [1, "p-3", "text-sm", "text-slate-600", "text-right", "font-mono"], [1, "p-2"], ["type", "number", 1, "w-full", "px-2.5", "py-1", "bg-white", "border", "border-slate-200", "rounded-md", "text-sm", "text-slate-800", "font-bold", "focus:border-indigo-500", "focus:ring-1", "focus:ring-indigo-500", "focus:outline-none", "text-center", "font-mono", "shadow-sm", 3, "ngModelChange", "ngModel"], ["type", "number", 1, "w-full", "px-2.5", "py-1", "bg-white", "border", "border-slate-200", "rounded-md", "text-sm", "text-rose-700", "font-bold", "focus:border-rose-500", "focus:ring-1", "focus:ring-rose-500", "focus:outline-none", "text-center", "font-mono", "shadow-sm", 3, "ngModelChange", "ngModel"], [1, "p-3", "text-sm", "text-right", "font-mono", "font-bold"], [3, "ngClass"], [1, "p-3", "text-sm", "text-emerald-700", "font-bold", "text-center", "font-mono", "bg-emerald-50/40", "border-x", "border-emerald-100/50"], ["type", "text", "placeholder", "L\xFD do \u0111i\u1EC1u ch\u1EC9nh...", 1, "w-full", "px-2.5", "py-1", "bg-white", "border", "border-slate-200", "rounded-md", "text-xs", "text-slate-800", "focus:border-indigo-500", "focus:ring-1", "focus:ring-indigo-500", "focus:outline-none", "placeholder:text-slate-400", "shadow-sm", 3, "ngModelChange", "ngModel"], ["colspan", "9", 1, "p-6", "text-center", "text-sm", "text-slate-500"]], template: function ReconciliationDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "mat-icon", 4);
      \u0275\u0275text(5, "warehouse");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div")(7, "h2", 5);
      \u0275\u0275text(8, "\u0110\u1ED0I SO\xC1T & \u0110I\u1EC0U CH\u1EC8NH CH\xCANH L\u1EC6CH CH\u1ED0T KHO");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "p", 6);
      \u0275\u0275text(10, "\u0110i\u1EC1u ch\u1EC9nh s\u1ED1 li\u1EC7u t\u1ED3n kho cho c\xE1c s\u1EA3n ph\u1EA9m l\u1EC7ch Baseline");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "button", 7);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_button_click_11_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(12, "mat-icon");
      \u0275\u0275text(13, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(14, "div", 8)(15, "div", 9)(16, "input", 10);
      \u0275\u0275twoWayListener("ngModelChange", function ReconciliationDialogComponent_Template_input_ngModelChange_16_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.searchTerm, $event) || (ctx.searchTerm = $event);
        return $event;
      });
      \u0275\u0275listener("input", function ReconciliationDialogComponent_Template_input_input_16_listener() {
        return ctx.applyFilterAndSort();
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "div", 11)(18, "mat-icon", 12);
      \u0275\u0275text(19, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(20, "div", 13)(21, "mat-icon", 14);
      \u0275\u0275text(22, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "div", 15);
      \u0275\u0275text(24, " H\u1EC7 th\u1ED1ng ph\xE1t hi\u1EC7n c\xF3 ");
      \u0275\u0275elementStart(25, "strong");
      \u0275\u0275text(26);
      \u0275\u0275elementEnd();
      \u0275\u0275text(27, " c\xF3 ch\xEAnh l\u1EC7ch gi\u1EEFa T\u1ED3n H\u1EC7 Th\u1ED1ng (Baseline) v\xE0 T\u1ED3n Th\u1EF1c T\u1EBF. Vui l\xF2ng xem x\xE9t c\u1ED9t ");
      \u0275\u0275elementStart(28, "strong");
      \u0275\u0275text(29, "\u0110i\u1EC1u Ch\u1EC9nh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30, " (m\u1EB7c \u0111\u1ECBnh b\u1EB1ng T\u1ED3n Th\u1EF1c T\u1EBF) v\xE0 c\u1EADp nh\u1EADt s\u1ED1 li\u1EC7u ch\xEDnh x\xE1c \u0111\u1EC3 ch\u1ED1t phi\xEAn. ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(31, "div", 16)(32, "table", 17)(33, "thead")(34, "tr", 18)(35, "th", 19);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_35_listener() {
        return ctx.changeSort("masp");
      });
      \u0275\u0275elementStart(36, "span", 20);
      \u0275\u0275text(37, " M\xE3 SP ");
      \u0275\u0275template(38, ReconciliationDialogComponent_mat_icon_38_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(39, "th", 19);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_39_listener() {
        return ctx.changeSort("title");
      });
      \u0275\u0275elementStart(40, "span", 20);
      \u0275\u0275text(41, " T\xEAn S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275template(42, ReconciliationDialogComponent_mat_icon_42_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(43, "th", 22);
      \u0275\u0275text(44, "\u0110VT");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(45, "th", 23);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_45_listener() {
        return ctx.changeSort("sltonhethong");
      });
      \u0275\u0275elementStart(46, "span", 24);
      \u0275\u0275text(47, " SL H\u1EC7 Th\u1ED1ng ");
      \u0275\u0275template(48, ReconciliationDialogComponent_mat_icon_48_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "th", 25);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_49_listener() {
        return ctx.changeSort("sltonthucte");
      });
      \u0275\u0275elementStart(50, "span", 26);
      \u0275\u0275text(51, " SL Th\u1EF1c T\u1EBF ");
      \u0275\u0275template(52, ReconciliationDialogComponent_mat_icon_52_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(53, "th", 27);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_53_listener() {
        return ctx.changeSort("slhuy");
      });
      \u0275\u0275elementStart(54, "span", 26);
      \u0275\u0275text(55, " SL H\u1EE7y ");
      \u0275\u0275template(56, ReconciliationDialogComponent_mat_icon_56_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(57, "th", 23);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_57_listener() {
        return ctx.changeSort("chenhlech");
      });
      \u0275\u0275elementStart(58, "span", 24);
      \u0275\u0275text(59, " L\u1EC7ch ");
      \u0275\u0275template(60, ReconciliationDialogComponent_mat_icon_60_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(61, "th", 25);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_th_click_61_listener() {
        return ctx.changeSort("slDieuChinh");
      });
      \u0275\u0275elementStart(62, "span", 26);
      \u0275\u0275text(63, " \u0110i\u1EC1u Ch\u1EC9nh ");
      \u0275\u0275template(64, ReconciliationDialogComponent_mat_icon_64_Template, 2, 1, "mat-icon", 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(65, "th", 28);
      \u0275\u0275text(66, "Ghi Ch\xFA");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(67, "tbody");
      \u0275\u0275template(68, ReconciliationDialogComponent_tr_68_Template, 24, 19, "tr", 29)(69, ReconciliationDialogComponent_tr_69_Template, 3, 0, "tr", 30);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(70, "div", 31)(71, "button", 32);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_button_click_71_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(72, " H\u1EE7y b\u1ECF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(73, "button", 33);
      \u0275\u0275listener("click", function ReconciliationDialogComponent_Template_button_click_73_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(74, "mat-icon", 34);
      \u0275\u0275text(75, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(76, " X\xE1c Nh\u1EADn & \u0110i\u1EC1u Ch\u1EC9nh ");
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(16);
      \u0275\u0275twoWayProperty("ngModel", ctx.searchTerm);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1("", ctx.items.length, " s\u1EA3n ph\u1EA9m");
      \u0275\u0275advance(12);
      \u0275\u0275property("ngIf", ctx.sortField === "masp");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.sortField === "title");
      \u0275\u0275advance(6);
      \u0275\u0275property("ngIf", ctx.sortField === "sltonhethong");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.sortField === "sltonthucte");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.sortField === "slhuy");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.sortField === "chenhlech");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.sortField === "slDieuChinh");
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.filteredItems);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.filteredItems.length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    DecimalPipe,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgModel,
    MatDialogModule,
    MatButtonModule,
    MatFormFieldModule,
    MatInputModule,
    MatTableModule,
    MatIconModule,
    MatIcon
  ], styles: ["\n\n[_nghost-%COMP%] {\n  display: block;\n  background: transparent;\n}\n.reconciliation-dialog[_ngcontent-%COMP%] {\n  box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.08), 0 8px 10px -6px rgba(0, 0, 0, 0.08);\n  -webkit-backdrop-filter: blur(8px);\n  backdrop-filter: blur(8px);\n}\ninput[type=number][_ngcontent-%COMP%]::-webkit-inner-spin-button, \ninput[type=number][_ngcontent-%COMP%]::-webkit-outer-spin-button {\n  -webkit-appearance: none;\n  margin: 0;\n}\n/*# sourceMappingURL=reconciliation-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ReconciliationDialogComponent, { className: "ReconciliationDialogComponent", filePath: "src/app/admin/chotkho/reconciliation-dialog/reconciliation-dialog.component.ts", lineNumber: 220 });
})();

export {
  ProductTimelineDialogComponent,
  ReconciliationDialogComponent
};
//# sourceMappingURL=chunk-YN5TVLWY.mjs.map
