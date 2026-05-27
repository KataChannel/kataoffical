import './polyfills.server.mjs';
import {
  ChotkhoService
} from "./chunk-NJA7P42H.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialogRef
} from "./chunk-5PWX7G23.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4QEJTP76.mjs";
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
  DecimalPipe
} from "./chunk-UP6A7POK.mjs";
import {
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
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
  ɵɵpureFunction0,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2
} from "./chunk-I6KZCWLZ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/dathang/nhucaudathang/stock-warning-dialog.component.ts
var _c0 = () => [];
var _forTrack0 = ($index, $item) => $item.id;
var _forTrack1 = ($index, $item) => $item.masp;
function StockWarningDialogComponent_Conditional_22_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_22_Conditional_5_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.tab1SearchTerm = "");
    });
    \u0275\u0275elementStart(1, "mat-icon", 27);
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd()();
  }
}
function StockWarningDialogComponent_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 22)(2, "mat-icon", 23);
    \u0275\u0275text(3, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "input", 24);
    \u0275\u0275listener("input", function StockWarningDialogComponent_Conditional_22_Template_input_input_4_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.tab1SearchTerm = $event.target.value);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, StockWarningDialogComponent_Conditional_22_Conditional_5_Template, 3, 0, "button", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275property("value", ctx_r1.tab1SearchTerm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.tab1SearchTerm ? 5 : -1);
  }
}
function StockWarningDialogComponent_Conditional_23_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Conditional_6_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setFilter("error"));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "error" ? "bg-red-600 text-white border-red-600 shadow-md" : "bg-white text-red-600 border-red-100 hover:bg-red-50 shadow-sm"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u274C M\xE3 SP L\u1ED7i (", ctx_r1.data.danhSachLoi.length, ") ");
  }
}
function StockWarningDialogComponent_Conditional_23_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 26);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Conditional_22_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.searchTerm = "");
    });
    \u0275\u0275elementStart(1, "mat-icon", 27);
    \u0275\u0275text(2, "cancel");
    \u0275\u0275elementEnd()();
  }
}
function StockWarningDialogComponent_Conditional_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 28)(2, "span", 29);
    \u0275\u0275text(3, "Ph\xE2n lo\u1EA1i:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "button", 30);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("all"));
    });
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockWarningDialogComponent_Conditional_23_Conditional_6_Template, 2, 3, "button", 31);
    \u0275\u0275elementStart(7, "button", 32);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("late"));
    });
    \u0275\u0275text(8, " \u{1F6A9} Tr\u1EC5 (>24h) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 33);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_9_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("cao"));
    });
    \u0275\u0275text(10, " \u{1F534} C\u1EA5p b\xE1ch (Cao) ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "button", 34);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("tb"));
    });
    \u0275\u0275text(12, " \u{1F7E1} Ch\xEAnh l\u1EC7ch (TB) ");
    \u0275\u0275elementEnd();
    \u0275\u0275element(13, "div", 35);
    \u0275\u0275elementStart(14, "button", 36);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_14_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("tang"));
    });
    \u0275\u0275text(15, " \u{1F4E5} \u0110i\u1EC1u ch\u1EC9nh T\u0103ng ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "button", 37);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_23_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.setFilter("giam"));
    });
    \u0275\u0275text(17, " \u{1F4E4} \u0110i\u1EC1u ch\u1EC9nh Gi\u1EA3m ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(18, "div", 22)(19, "mat-icon", 23);
    \u0275\u0275text(20, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "input", 38);
    \u0275\u0275listener("input", function StockWarningDialogComponent_Conditional_23_Template_input_input_21_listener($event) {
      \u0275\u0275restoreView(_r4);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.searchTerm = $event.target.value);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275template(22, StockWarningDialogComponent_Conditional_23_Conditional_22_Template, 3, 0, "button", 25);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "all" ? "bg-slate-800 text-white border-slate-800 shadow-md" : "bg-white text-slate-600 border-slate-200 hover:border-slate-400 shadow-sm"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" T\u1EA5t c\u1EA3 (", ctx_r1.data.danhSachCanhBao.length, ") ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.data.danhSachLoi && ctx_r1.data.danhSachLoi.length > 0 ? 6 : -1);
    \u0275\u0275advance();
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "late" ? "bg-rose-600 text-white border-rose-600 shadow-md" : "bg-white text-rose-600 border-rose-100 hover:bg-rose-50 shadow-sm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "cao" ? "bg-rose-500 text-white border-rose-500 shadow-md" : "bg-white text-rose-500 border-rose-100 hover:bg-rose-50 shadow-sm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "tb" ? "bg-amber-500 text-white border-amber-500 shadow-md" : "bg-white text-amber-600 border-amber-100 hover:bg-amber-50 shadow-sm"));
    \u0275\u0275advance(3);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "tang" ? "bg-green-600 text-white border-green-600 shadow-md" : "bg-white text-green-700 border-green-100 hover:bg-green-50 shadow-sm"));
    \u0275\u0275advance(2);
    \u0275\u0275classMap("px-3 py-1.5 rounded-full text-[10px] font-bold transition-all border flex items-center gap-1.5 whitespace-nowrap " + (ctx_r1.selectedFilter === "giam" ? "bg-rose-500 text-white border-rose-500 shadow-md" : "bg-white text-rose-700 border-rose-100 hover:bg-rose-50 shadow-sm"));
    \u0275\u0275advance(5);
    \u0275\u0275property("value", ctx_r1.searchTerm);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.searchTerm ? 22 : -1);
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275element(1, "div", 43);
    \u0275\u0275elementStart(2, "p", 44);
    \u0275\u0275text(3, "\u0110ang t\xEDnh to\xE1n d\u1EEF li\u1EC7u t\u1ED3n \xE2m t\u1EEB \u0111\u1EE3t ch\u1ED1t kho Excel g\u1EA7n nh\u1EA5t...");
    \u0275\u0275elementEnd()();
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_1_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "p", 48);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("\u0110\u01B0\u1EE3c \u0111\u1ED1i so\xE1t t\u1EEB: ", ctx_r1.latestChotkhoInfo.title, " (", \u0275\u0275pipeBind2(2, 2, ctx_r1.latestChotkhoInfo.ngaychot, "HH:mm dd/MM/yyyy"), ")");
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 41)(1, "div", 45)(2, "mat-icon", 46);
    \u0275\u0275text(3, "check_circle_outline");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 47);
    \u0275\u0275text(5, "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m n\xE0o b\u1ECB t\u1ED3n \xE2m h\u1EC7 th\u1ED1ng trong ng\xE0y!");
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockWarningDialogComponent_Conditional_25_Conditional_1_Conditional_6_Template, 3, 5, "p", 48);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(6);
    \u0275\u0275conditional(ctx_r1.latestChotkhoInfo ? 6 : -1);
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_2_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "mat-icon", 58);
    \u0275\u0275text(2, "history");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " T\xEDnh t\u1EEB phi\xEAn ch\u1ED1t kho Excel g\u1EA7n nh\u1EA5t: ");
    \u0275\u0275elementStart(4, "span", 59);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.latestChotkhoInfo.title);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" (", \u0275\u0275pipeBind2(7, 2, ctx_r1.latestChotkhoInfo.ngaychot, "HH:mm:ss dd/MM/yyyy"), ") ");
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Conditional_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 68);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, item_r7.excelQty, "1.0-3"), " ");
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Conditional_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 69);
    \u0275\u0275text(1, "0");
    \u0275\u0275elementEnd();
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 57)(1, "td", 60)(2, "div", 3)(3, "span", 61);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 62);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(7, "td", 63);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "td", 64);
    \u0275\u0275text(11);
    \u0275\u0275pipe(12, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 65);
    \u0275\u0275text(14);
    \u0275\u0275pipe(15, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "td", 54)(17, "span", 66);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "td", 67);
    \u0275\u0275template(21, StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Conditional_21_Template, 3, 4, "span", 68)(22, StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Conditional_22_Template, 2, 0, "span", 69);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r7 = ctx.$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(item_r7.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate2("", item_r7.masp, " - ", item_r7.dvt, "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(9, 8, item_r7.initialQty, "1.0-3"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("+", \u0275\u0275pipeBind2(12, 11, item_r7.receivedQty, "1.0-3"), "");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("-", \u0275\u0275pipeBind2(15, 14, item_r7.shippedQty, "1.0-3"), "");
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(19, 17, item_r7.systemQty, "1.0-3"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(item_r7.excelQty > 0 ? 21 : 22);
  }
}
function StockWarningDialogComponent_Conditional_25_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42);
    \u0275\u0275template(1, StockWarningDialogComponent_Conditional_25_Conditional_2_Conditional_1_Template, 8, 5, "div", 49);
    \u0275\u0275elementStart(2, "div", 50)(3, "table", 51)(4, "thead")(5, "tr", 52)(6, "th", 53);
    \u0275\u0275text(7, "S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 54);
    \u0275\u0275text(9, "T\u1ED3n \u0110\u1EA7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 54);
    \u0275\u0275text(11, "Nh\u1EADp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 54);
    \u0275\u0275text(13, "Xu\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 54);
    \u0275\u0275text(15, "H\u1EC7 Th\u1ED1ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 55);
    \u0275\u0275text(17, "Th\u1EF1c T\u1EBF T\u1EEB Excel");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "tbody", 56);
    \u0275\u0275repeaterCreate(19, StockWarningDialogComponent_Conditional_25_Conditional_2_For_20_Template, 23, 20, "tr", 57, _forTrack0);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r1.latestChotkhoInfo ? 1 : -1);
    \u0275\u0275advance(18);
    \u0275\u0275repeater(ctx_r1.filteredTab1List);
  }
}
function StockWarningDialogComponent_Conditional_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, StockWarningDialogComponent_Conditional_25_Conditional_0_Template, 4, 0, "div", 40)(1, StockWarningDialogComponent_Conditional_25_Conditional_1_Template, 7, 1, "div", 41)(2, StockWarningDialogComponent_Conditional_25_Conditional_2_Template, 21, 1, "div", 42);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.isLoadingNegativeStock ? 0 : ctx_r1.filteredTab1List.length === 0 ? 1 : 2);
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_0_For_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 73)(1, "div", 74)(2, "div", 75)(3, "mat-icon", 76);
    \u0275\u0275text(4, "error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(5, "div")(6, "h4", 77);
    \u0275\u0275text(7, "M\xE3 s\u1EA3n ph\u1EA9m kh\xF4ng t\u1ED3n t\u1EA1i: ");
    \u0275\u0275elementStart(8, "span", 78);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "p", 79);
    \u0275\u0275text(11, "Vui l\xF2ng ki\u1EC3m tra l\u1EA1i file Excel ho\u1EB7c th\xEAm m\u1EDBi s\u1EA3n ph\u1EA9m n\xE0y v\xE0o h\u1EC7 th\u1ED1ng tr\u01B0\u1EDBc khi ch\u1ED1t kho.");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "button", 80);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_26_Conditional_0_For_2_Template_button_click_12_listener() {
      \u0275\u0275restoreView(_r8);
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.onConfirm());
    });
    \u0275\u0275text(13, " OK, B\u1ECF qua m\xE3 n\xE0y ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const masp_r9 = ctx.$implicit;
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(masp_r9);
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 70);
    \u0275\u0275repeaterCreate(1, StockWarningDialogComponent_Conditional_26_Conditional_0_For_2_Template, 14, 1, "div", 73, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data.danhSachLoi || \u0275\u0275pureFunction0(0, _c0));
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 71)(1, "div", 45)(2, "mat-icon", 46);
    \u0275\u0275text(3, "search_off");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 81);
    \u0275\u0275text(5, "Kh\xF4ng c\xF3 s\u1EA3n ph\u1EA9m n\xE0o cho m\u1EE5c n\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "button", 82);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_26_Conditional_1_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r10);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.setFilter("all"));
    });
    \u0275\u0275text(7, "Xem t\u1EA5t c\u1EA3 c\u1EA3nh b\xE1o");
    \u0275\u0275elementEnd()();
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 91);
    \u0275\u0275text(1, "TR\u1EC4");
    \u0275\u0275elementEnd();
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Conditional_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(2, 1, order_r12.soluong, "1.0-2"), " kg)");
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Conditional_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 117);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const order_r12 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275classProp("bg-green-100", order_r12.status === "danhan" || order_r12.status === "hoanthanh")("text-green-700", order_r12.status === "danhan" || order_r12.status === "hoanthanh")("bg-amber-100", order_r12.status === "dadat" || order_r12.status === "dagiao")("text-amber-700", order_r12.status === "dadat" || order_r12.status === "dagiao");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r12.status === "dadat" ? "\u0110\xE3 \u0111\u1EB7t" : order_r12.status === "dagiao" ? "\u0110ang giao" : order_r12.status === "danhan" ? "\u0110\xE3 nh\u1EADn" : order_r12.status, " ");
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r11 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 110);
    \u0275\u0275listener("click", function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Template_div_click_0_listener() {
      const order_r12 = \u0275\u0275restoreView(_r11).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(5);
      return \u0275\u0275resetView(ctx_r1.goToDetail(order_r12));
    });
    \u0275\u0275elementStart(1, "mat-icon", 111);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 112)(4, "div", 113)(5, "span", 114);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Conditional_7_Template, 3, 4, "span", 115);
    \u0275\u0275elementEnd();
    \u0275\u0275template(8, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Conditional_8_Template, 2, 9, "span", 116);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const order_r12 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("text-blue-600", order_r12.type === "dathang")("text-orange-600", order_r12.type === "donhang");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", order_r12.type === "dathang" ? "shopping_cart" : "local_shipping", " ");
    \u0275\u0275advance(3);
    \u0275\u0275classProp("text-blue-800", order_r12.type === "dathang")("text-orange-800", order_r12.type === "donhang");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(order_r12.code);
    \u0275\u0275advance();
    \u0275\u0275conditional(order_r12.soluong ? 7 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(order_r12.status ? 8 : -1);
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1, "Kh\xF4ng t\xECm th\u1EA5y m\xE3 \u0111\u01A1n");
    \u0275\u0275elementEnd();
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 105)(1, "p", 106);
    \u0275\u0275text(2, "\u0110\u01A1n h\xE0ng c\u1EA7n x\u1EED l\xFD:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 107);
    \u0275\u0275repeaterCreate(4, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_For_5_Template, 9, 12, "div", 108, _forTrack0);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_Conditional_6_Template, 2, 0, "span", 109);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(4);
    \u0275\u0275repeater(item_r13.pendingList || \u0275\u0275pureFunction0(1, _c0));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(!(item_r13.pendingList == null ? null : item_r13.pendingList.length) ? 6 : -1);
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 83);
    \u0275\u0275element(1, "div", 84);
    \u0275\u0275elementStart(2, "div", 85)(3, "div", 86)(4, "div", 87)(5, "span", 88);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "h4", 89);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "div", 90);
    \u0275\u0275template(10, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_10_Template, 2, 0, "span", 91);
    \u0275\u0275elementStart(11, "span", 92);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(13, "div", 93)(14, "div", 94)(15, "span", 95);
    \u0275\u0275text(16, "T\u1ED3n c\u0169");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "span", 96);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "div", 97)(21, "span", 95);
    \u0275\u0275text(22, "Nh\u1EADp");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "span", 98);
    \u0275\u0275text(24);
    \u0275\u0275pipe(25, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "div", 97)(27, "span", 95);
    \u0275\u0275text(28, "L\u1EC7ch");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 99)(30, "span", 100);
    \u0275\u0275text(31);
    \u0275\u0275pipe(32, "number");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(33, "div", 101)(34, "div", 102)(35, "mat-icon", 103);
    \u0275\u0275text(36, "info");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "p", 104);
    \u0275\u0275text(38);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(39, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Conditional_39_Template, 7, 2, "div", 105);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    let tmp_36_0;
    const item_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-rose-500", item_r13.mucDoNghiemTrong === "cao" || item_r13.isLate)("bg-amber-400", item_r13.mucDoNghiemTrong === "trung_binh" && !item_r13.isLate)("bg-slate-200", item_r13.mucDoNghiemTrong === "thap");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r13.masp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r13.title);
    \u0275\u0275advance(2);
    \u0275\u0275conditional(item_r13.isLate ? 10 : -1);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-rose-50", item_r13.mucDoNghiemTrong === "cao")("text-rose-700", item_r13.mucDoNghiemTrong === "cao")("bg-amber-50", item_r13.mucDoNghiemTrong === "trung_binh")("text-amber-700", item_r13.mucDoNghiemTrong === "trung_binh");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r13.mucDoNghiemTrong === "cao" ? "\u{1F534} CAO" : "\u{1F7E1} TB", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 42, item_r13.sltonCu, "1.0-3"));
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(25, 45, item_r13.sltonMoi, "1.0-3"));
    \u0275\u0275advance(6);
    \u0275\u0275classProp("text-green-600", item_r13.loaiDieuChinh === "tang")("text-rose-600", item_r13.loaiDieuChinh === "giam")("text-slate-400", item_r13.loaiDieuChinh === "khong_doi");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r13.loaiDieuChinh === "tang" ? "+" : item_r13.loaiDieuChinh === "giam" ? "-" : "", "", \u0275\u0275pipeBind2(32, 48, item_r13.chenhLech, "1.0-3"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("bg-rose-50", item_r13.isLate || item_r13.mucDoNghiemTrong === "cao")("bg-amber-50", !item_r13.isLate && item_r13.mucDoNghiemTrong === "trung_binh");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-rose-500", item_r13.isLate || item_r13.mucDoNghiemTrong === "cao")("text-amber-500", !item_r13.isLate && item_r13.mucDoNghiemTrong === "trung_binh");
    \u0275\u0275advance(2);
    \u0275\u0275classProp("text-rose-800", item_r13.isLate || item_r13.mucDoNghiemTrong === "cao")("text-amber-800", !item_r13.isLate && item_r13.mucDoNghiemTrong === "trung_binh");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r13.lyDoCanhBao, " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(((tmp_36_0 = item_r13.slchonhap) !== null && tmp_36_0 !== void 0 ? tmp_36_0 : 0) > 0 || ((tmp_36_0 = item_r13.slchogiao) !== null && tmp_36_0 !== void 0 ? tmp_36_0 : 0) > 0 ? 39 : -1);
  }
}
function StockWarningDialogComponent_Conditional_26_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 72);
    \u0275\u0275repeaterCreate(1, StockWarningDialogComponent_Conditional_26_Conditional_2_For_2_Template, 40, 51, "div", 83, _forTrack1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.filteredList);
  }
}
function StockWarningDialogComponent_Conditional_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, StockWarningDialogComponent_Conditional_26_Conditional_0_Template, 3, 1, "div", 70)(1, StockWarningDialogComponent_Conditional_26_Conditional_1_Template, 8, 0, "div", 71)(2, StockWarningDialogComponent_Conditional_26_Conditional_2_Template, 3, 0, "div", 72);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275conditional(ctx_r1.selectedFilter === "error" ? 0 : ctx_r1.filteredList.length === 0 ? 1 : 2);
  }
}
var StockWarningDialogComponent = class _StockWarningDialogComponent {
  dialogRef;
  data;
  hasCriticalWarnings;
  searchTerm = "";
  tab1SearchTerm = "";
  selectedFilter = "all";
  // Tab properties
  activeTab = 1;
  isLoadingNegativeStock = false;
  negativeStockList = [];
  latestChotkhoInfo = null;
  chotkhoService = inject(ChotkhoService);
  get filteredList() {
    let list = this.data.danhSachCanhBao || [];
    if (this.selectedFilter !== "all") {
      switch (this.selectedFilter) {
        case "error":
          return [];
        case "late":
          list = list.filter((item) => item.isLate);
          break;
        case "cao":
          list = list.filter((item) => item.mucDoNghiemTrong === "cao");
          break;
        case "tb":
          list = list.filter((item) => item.mucDoNghiemTrong === "trung_binh");
          break;
        case "tang":
          list = list.filter((item) => item.loaiDieuChinh === "tang");
          break;
        case "giam":
          list = list.filter((item) => item.loaiDieuChinh === "giam");
          break;
      }
    }
    if (this.searchTerm.trim()) {
      const term = this.searchTerm.toLowerCase().trim();
      list = list.filter((item) => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }
  get filteredTab1List() {
    let list = this.negativeStockList || [];
    if (this.tab1SearchTerm.trim()) {
      const term = this.tab1SearchTerm.toLowerCase().trim();
      list = list.filter((item) => item.masp.toLowerCase().includes(term) || item.title.toLowerCase().includes(term));
    }
    return list;
  }
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.hasCriticalWarnings = data.danhSachCanhBao.some((w) => w.mucDoNghiemTrong === "cao");
    if (data.danhSachLoi && data.danhSachLoi.length > 0) {
      this.selectedFilter = "error";
      this.activeTab = 2;
    }
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this.loadNegativeStockReport();
    });
  }
  loadNegativeStockReport() {
    return __async(this, null, function* () {
      try {
        this.isLoadingNegativeStock = true;
        const response = yield this.chotkhoService.getNegativeStockReport();
        if (response && response.products) {
          this.latestChotkhoInfo = response.latestChotkho;
          const excelQtyMap = /* @__PURE__ */ new Map();
          if (this.data.danhSachExcel && this.data.danhSachExcel.length > 0) {
            this.data.danhSachExcel.forEach((item) => {
              excelQtyMap.set(item.sanphamId, Number(item.soluong || 0));
            });
          }
          this.negativeStockList = response.products.map((p) => {
            const excelQty = excelQtyMap.has(p.id) ? excelQtyMap.get(p.id) : 0;
            return __spreadProps(__spreadValues({}, p), { excelQty });
          });
        }
      } catch (error) {
        console.error("Error loading negative stock report:", error);
      } finally {
        this.isLoadingNegativeStock = false;
      }
    });
  }
  setFilter(filter) {
    this.selectedFilter = filter;
    this.activeTab = 2;
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  goToDetail(order) {
    const url = order.type === "dathang" ? `/admin/dathang/${order.id}` : `/admin/phieugiaohang/${order.id}`;
    if (typeof window !== "undefined") {
      window.open(url, "_blank");
    }
  }
  static \u0275fac = function StockWarningDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockWarningDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockWarningDialogComponent, selectors: [["app-stock-warning-dialog"]], decls: 44, vars: 16, consts: [[1, "flex", "flex-col", "h-full", "w-full", "bg-white", "rounded-xl", "shadow-2xl", "overflow-hidden", "border", "border-slate-200"], [1, "px-6", "py-4", "border-b", "border-slate-100", "bg-slate-50/50"], [1, "flex", "items-center", "justify-between"], [1, "flex", "flex-col", "gap-0.5"], [1, "text-xl", "font-bold", "tracking-tight", "text-slate-900", "flex", "items-center", "gap-2"], [1, "text-amber-500", "scale-110"], [1, "text-[12px]", "text-slate-500", "font-medium", "italic"], [1, "p-1.5", "hover:bg-slate-200/50", "rounded-full", "transition-colors", "font-bold", "text-slate-500", 3, "click"], [1, "text-slate-400", "scale-90"], [1, "flex", "border-b", "border-slate-200", "mt-4"], [3, "click"], [2, "font-size", "16px", "width", "16px", "height", "16px"], [1, "flex", "flex-col", "gap-3", "mt-4"], [1, "flex-1", "overflow-y-auto", "px-6", "py-4", "custom-scrollbar", "bg-slate-50/30", "shadow-inner"], [1, "px-6", "py-4", "border-t", "border-slate-100", "bg-white", "flex", "flex-col", "sm:flex-row", "justify-between", "items-center", "gap-4", "shadow-[0_-5px_15px_rgba(0,0,0,0.02)]"], [1, "flex", "items-center", "gap-4", "text-[11px]", "text-center", "sm:text-left"], [1, "font-medium", "text-slate-500", "leading-relaxed"], [1, "font-black", "text-green-600"], [1, "font-black", "text-rose-600"], [1, "flex", "w-full", "sm:w-auto", "gap-2.5"], [1, "flex-1", "sm:flex-none", "px-4", "py-2", "text-xs", "font-bold", "text-slate-500", "hover:text-slate-800", "hover:bg-slate-100", "rounded-lg", "transition-all", "border", "border-slate-200", 3, "click"], [1, "flex-1", "sm:flex-none", "px-6", "py-2", "text-xs", "font-black", "text-white", "rounded-lg", "shadow-md", "transition-all", "active:scale-95", "flex", "items-center", "justify-center", "gap-2", 3, "click"], [1, "relative", "w-full", "overflow-hidden"], [1, "absolute", "left-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "scale-75", 2, "width", "18px", "height", "18px", "font-size", "18px"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm theo m\xE3 h\xE0ng, t\xEAn s\u1EA3n ph\u1EA9m b\u1ECB \xE2m...", 1, "w-full", "pl-10", "pr-4", "py-2", "bg-white", "border", "border-slate-200", "rounded-lg", "text-xs", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "focus:border-blue-500", "transition-all", "outline-none", "shadow-sm", 3, "input", "value"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "transition-colors"], [1, "absolute", "right-3", "top-1/2", "-translate-y-1/2", "text-slate-400", "hover:text-slate-600", "transition-colors", 3, "click"], [2, "width", "14px", "height", "14px", "font-size", "14px"], [1, "flex", "items-center", "gap-2", "px-1", "overflow-x-auto", "pb-1", "no-scrollbar", "shrink-0"], [1, "text-[10px]", "font-bold", "text-slate-400", "uppercase", "tracking-widest", "mr-2"], ["matTooltip", "Hi\u1EC3n th\u1ECB t\u1EA5t c\u1EA3 c\xE1c m\xE3 h\xE0ng c\xF3 c\u1EA3nh b\xE1o", 3, "click"], ["matTooltip", "C\xE1c m\xE3 s\u1EA3n ph\u1EA9m trong Excel nh\u01B0ng kh\xF4ng t\u1ED3n t\u1EA1i trong h\u1EC7 th\u1ED1ng", 3, "class"], ["matTooltip", "C\xE1c s\u1EA3n ph\u1EA9m c\xF3 ch\u1EE9ng t\u1EEB treo ch\u01B0a x\u1EED l\xFD qu\xE1 24h", 3, "click"], ["matTooltip", "C\xE1c l\u1ED7i nghi\xEAm tr\u1ECDng: R\u1EE7i ro \u0111\u1EBFm l\u1EB7p, sai l\u1EC7ch l\u1EDBn, ho\u1EB7c t\u1ED3n c\u0169 b\u1EB1ng 0", 3, "click"], ["matTooltip", "C\xE1c s\u1EA3n ph\u1EA9m c\xF3 m\u1EE9c ch\xEAnh l\u1EC7ch cao (>500%)", 3, "click"], [1, "w-px", "h-4", "bg-slate-200", "mx-1"], ["matTooltip", "C\xE1c m\xE3 h\xE0ng s\u1EBD \u0111\u01B0\u1EE3c \u0111i\u1EC1u ch\u1EC9nh T\u0102NG s\u1ED1 l\u01B0\u1EE3ng t\u1ED3n", 3, "click"], ["matTooltip", "C\xE1c m\xE3 h\xE0ng s\u1EBD \u0111\u01B0\u1EE3c \u0111i\u1EC1u ch\u1EC9nh GI\u1EA2M s\u1ED1 l\u01B0\u1EE3ng t\u1ED3n", 3, "click"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm m\xE3 h\xE0ng, t\xEAn s\u1EA3n ph\u1EA9m...", 1, "w-full", "pl-10", "pr-4", "py-2", "bg-white", "border", "border-slate-200", "rounded-lg", "text-xs", "font-medium", "focus:ring-2", "focus:ring-blue-500/20", "focus:border-blue-500", "transition-all", "outline-none", "shadow-sm", 3, "input", "value"], ["matTooltip", "C\xE1c m\xE3 s\u1EA3n ph\u1EA9m trong Excel nh\u01B0ng kh\xF4ng t\u1ED3n t\u1EA1i trong h\u1EC7 th\u1ED1ng", 3, "click"], [1, "flex", "flex-col", "items-center", "justify-center", "py-20", "gap-3"], [1, "flex", "flex-col", "items-center", "justify-center", "py-20", "text-slate-400"], [1, "bg-white", "rounded-xl", "border", "border-slate-200", "shadow-sm", "overflow-hidden", "mb-4"], [1, "animate-spin", "rounded-full", "h-8", "w-8", "border-b-2", "border-blue-600"], [1, "text-xs", "text-slate-500", "font-bold"], [1, "bg-slate-100", "p-4", "rounded-full", "mb-4"], [1, "text-slate-400", "scale-150"], [1, "font-bold", "text-slate-600"], [1, "text-[11px]", "text-slate-400", "mt-1", "italic"], [1, "bg-amber-50/50", "px-4", "py-2.5", "border-b", "border-slate-100", "text-[11px]", "text-slate-600", "font-semibold", "italic", "flex", "items-center", "gap-1.5", "shrink-0"], [1, "overflow-x-auto"], [1, "w-full", "border-collapse", "text-left"], [1, "bg-slate-50/70", "border-b", "border-slate-100", "text-[10px]", "font-black", "uppercase", "text-slate-400", "tracking-wider"], [1, "py-3.5", "px-4"], [1, "py-3.5", "px-4", "text-center"], [1, "py-3.5", "px-4", "text-center", "bg-blue-50/30", "text-blue-700"], [1, "divide-y", "divide-slate-100", "text-xs"], [1, "hover:bg-slate-50/50", "transition-colors"], [1, "text-amber-500", "scale-90", 2, "width", "16px", "height", "16px", "font-size", "16px"], [1, "font-black", "text-slate-900"], [1, "py-3.5", "px-4", "font-bold", "text-slate-800"], [1, "text-slate-800", "text-sm", "font-semibold"], [1, "text-[10px]", "text-slate-400", "font-medium", "leading-none"], [1, "py-3.5", "px-4", "text-center", "text-slate-500", "font-medium"], [1, "py-3.5", "px-4", "text-center", "text-green-600", "font-semibold"], [1, "py-3.5", "px-4", "text-center", "text-rose-600", "font-semibold"], [1, "px-2.5", "py-0.5", "rounded-full", "text-[11px]", "font-black", "bg-rose-50", "text-rose-600", "border", "border-rose-100", "shadow-sm"], [1, "py-3.5", "px-4", "text-center", "bg-blue-50/10", "font-black", "text-blue-700"], [1, "px-2.5", "py-0.5", "rounded-full", "bg-blue-50", "text-blue-600", "border", "border-blue-100", "shadow-sm"], [1, "text-slate-400"], [1, "grid", "grid-cols-1", "gap-3"], [1, "flex", "flex-col", "items-center", "justify-center", "h-full", "text-slate-400", "py-20"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "xl:grid-cols-3", "gap-3"], [1, "bg-red-50", "border", "border-red-200", "rounded-lg", "p-4", "flex", "items-center", "justify-between", "shadow-sm"], [1, "flex", "items-center", "gap-3"], [1, "bg-red-100", "p-2", "rounded-full"], [1, "text-red-600"], [1, "font-bold", "text-red-900", "text-sm"], [1, "text-rose-600", "underline"], [1, "text-xs", "text-red-700", "mt-0.5"], [1, "px-3", "py-1.5", "bg-red-600", "text-white", "text-[10px]", "font-bold", "rounded-md", "hover:bg-red-700", "transition-colors", "shadow-sm", 3, "click"], [1, "font-bold", "text-slate-600", "capitalize"], [1, "mt-4", "text-xs", "text-blue-600", "font-bold", "hover:underline", "underline-offset-4", 3, "click"], [1, "group", "relative", "bg-white", "border", "border-slate-200", "rounded-lg", "overflow-hidden", "shadow-sm", "hover:border-slate-300", "transition-all", "duration-200"], [1, "absolute", "left-0", "top-0", "bottom-0", "w-1"], [1, "p-3", "pl-5"], [1, "flex", "justify-between", "items-center", "mb-2"], [1, "flex", "items-center", "gap-2", "overflow-hidden"], [1, "px-1.5", "py-0.5", "bg-slate-100", "text-[10px]", "font-bold", "text-slate-600", "rounded", "border", "border-slate-200", "whitespace-nowrap"], [1, "font-bold", "text-slate-800", "text-sm", "truncate", "uppercase", "tracking-tight"], [1, "flex", "gap-1", "shrink-0"], [1, "px-1.5", "py-0.5", "rounded-md", "text-[9px]", "font-black", "uppercase", "bg-rose-600", "text-white", "animate-pulse"], [1, "px-1.5", "py-0.5", "rounded-md", "text-[9px]", "font-bold", "uppercase"], [1, "grid", "grid-cols-3", "gap-2", "bg-slate-50", "p-2", "rounded", "border", "border-slate-100", "mb-2"], [1, "flex", "flex-col"], [1, "text-[8px]", "uppercase", "font-bold", "text-slate-400", "leading-tight", "tracking-wider"], [1, "text-xs", "font-bold", "text-slate-500"], [1, "flex", "flex-col", "border-l", "border-slate-200", "pl-2"], [1, "text-xs", "font-black", "text-slate-900"], [1, "flex", "items-center", "gap-1"], [1, "text-xs", "font-black"], [1, "flex", "flex-col", "gap-2", "p-2", "rounded", "italic"], [1, "flex", "gap-2", "items-start"], [1, "scale-75", "shrink-0", 2, "width", "16px", "height", "16px", "font-size", "16px"], [1, "text-[10px]", "leading-tight", "font-medium"], [1, "mt-2", "border-t", "border-slate-200/50", "pt-2"], [1, "text-[9px]", "uppercase", "font-bold", "text-slate-500", "mb-2"], [1, "flex", "gap-2", "overflow-x-auto", "custom-scrollbar", "pb-2", 2, "white-space", "nowrap"], [1, "flex-shrink-0", "flex", "items-center", "gap-2", "bg-white", "border", "border-slate-200", "rounded-lg", "px-2.5", "py-1.5", "hover:bg-slate-50", "transition-all", "shadow-sm", "cursor-pointer", "select-none"], [1, "text-[10px]", "text-slate-400", "italic"], [1, "flex-shrink-0", "flex", "items-center", "gap-2", "bg-white", "border", "border-slate-200", "rounded-lg", "px-2.5", "py-1.5", "hover:bg-slate-50", "transition-all", "shadow-sm", "cursor-pointer", "select-none", 3, "click"], [1, "scale-75", "!m-0", "-ml-1", 2, "width", "18px", "height", "18px", "font-size", "18px"], [1, "flex", "flex-col", "items-start", "leading-tight"], [1, "flex", "items-center", "gap-1.5"], [1, "text-[10px]", "font-black"], [1, "text-[9px]", "font-bold", "text-slate-400"], [1, "text-[8px]", "uppercase", "font-bold", "px-1", "rounded-sm", "mt-0.5", 3, "bg-green-100", "text-green-700", "bg-amber-100", "text-amber-700"], [1, "text-[8px]", "uppercase", "font-bold", "px-1", "rounded-sm", "mt-0.5"]], template: function StockWarningDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "div", 3)(4, "h2", 4)(5, "mat-icon", 5);
      \u0275\u0275text(6, "auto_graph");
      \u0275\u0275elementEnd();
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 6);
      \u0275\u0275text(9, "\u0110\u1ED1i so\xE1t d\u1EEF li\u1EC7u nh\u1EADp t\u1EEB Excel - Ph\xE1t hi\u1EC7n c\xE1c \u0111i\u1EC3m c\u1EA7n l\u01B0u \xFD");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(10, "button", 7);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_10_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(11, "mat-icon", 8);
      \u0275\u0275text(12, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "div", 9)(14, "button", 10);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_14_listener() {
        return ctx.activeTab = 1;
      });
      \u0275\u0275elementStart(15, "mat-icon", 11);
      \u0275\u0275text(16, "trending_down");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 10);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_18_listener() {
        return ctx.activeTab = 2;
      });
      \u0275\u0275elementStart(19, "mat-icon", 11);
      \u0275\u0275text(20, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275text(21);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(22, StockWarningDialogComponent_Conditional_22_Template, 6, 2, "div", 12)(23, StockWarningDialogComponent_Conditional_23_Template, 23, 16, "div", 12);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "div", 13);
      \u0275\u0275template(25, StockWarningDialogComponent_Conditional_25_Template, 3, 1)(26, StockWarningDialogComponent_Conditional_26_Template, 3, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "div", 14)(28, "div", 15)(29, "p", 16);
      \u0275\u0275text(30, "S\u1EBD th\u1EF1c hi\u1EC7n: ");
      \u0275\u0275elementStart(31, "span", 17);
      \u0275\u0275text(32);
      \u0275\u0275elementEnd();
      \u0275\u0275text(33, ", ");
      \u0275\u0275elementStart(34, "span", 18);
      \u0275\u0275text(35);
      \u0275\u0275elementEnd();
      \u0275\u0275text(36, " m\xE3 h\xE0ng ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(37, "div", 19)(38, "button", 20);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_38_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275text(39, " H\u1EE7y l\u1EC7nh ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(40, "button", 21);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_40_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(41, "mat-icon", 11);
      \u0275\u0275text(42, "check_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1(" ", ctx.data.title || "\u0110\u1ED1i so\xE1t t\u1ED3n kho", " ");
      \u0275\u0275advance(7);
      \u0275\u0275classMap("pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight " + (ctx.activeTab === 1 ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" T\u1ED2N \xC2M H\u1EC6 TH\u1ED0NG (", ctx.negativeStockList.length, ") ");
      \u0275\u0275advance();
      \u0275\u0275classMap("pb-3 px-6 text-xs font-black transition-all flex items-center gap-2 border-b-2 tracking-tight " + (ctx.activeTab === 2 ? "border-blue-600 text-blue-600" : "border-transparent text-slate-400 hover:text-slate-600 hover:border-slate-300"));
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" C\u1EA2NH B\xC1O & \u0110\u1ED0I SO\xC1T (", ctx.data.danhSachCanhBao.length + ((ctx.data.danhSachLoi == null ? null : ctx.data.danhSachLoi.length) || 0), ") ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.activeTab === 1 ? 22 : 23);
      \u0275\u0275advance(3);
      \u0275\u0275conditional(ctx.activeTab === 1 ? 25 : 26);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("Nh\u1EADp +", ctx.data.danhSachNhap.length, "");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1("Xu\u1EA5t -", ctx.data.danhSachXuat.length, "");
      \u0275\u0275advance(5);
      \u0275\u0275classProp("bg-slate-900", !ctx.hasCriticalWarnings)("bg-rose-600", ctx.hasCriticalWarnings);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.hasCriticalWarnings ? "V\u1EABn x\xE1c nh\u1EADn" : "X\xE1c nh\u1EADn", " ");
    }
  }, dependencies: [CommonModule, DecimalPipe, DatePipe, MatButtonModule, MatIconModule, MatIcon, MatTooltipModule, MatTooltip], styles: ["\n\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 5px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: transparent;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #e2e8f0;\n  border-radius: 10px;\n}\n.custom-scrollbar[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #cbd5e1;\n}\n/*# sourceMappingURL=stock-warning-dialog.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockWarningDialogComponent, { className: "StockWarningDialogComponent", filePath: "src/app/admin/dathang/nhucaudathang/stock-warning-dialog.component.ts", lineNumber: 398 });
})();

export {
  StockWarningDialogComponent
};
//# sourceMappingURL=chunk-22VJI7I2.mjs.map
