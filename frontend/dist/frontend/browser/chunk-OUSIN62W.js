import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-FQNHKKYV.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableModule
} from "./chunk-SSCVWHZW.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-CCRHIKR4.js";
import {
  MatTooltipModule
} from "./chunk-FCO3RLCX.js";
import {
  MatSelect,
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
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-ZGUYOD2D.js";
import "./chunk-QKOCOOG3.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-3MF2DL6U.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-OB46FS5W.js";
import "./chunk-PBFAMPOS.js";
import "./chunk-C5TB4WSU.js";
import "./chunk-EXJ7KYIY.js";
import {
  MatButton,
  MatButtonModule
} from "./chunk-JCKTSD6E.js";
import {
  MatNativeDateModule,
  MatOption
} from "./chunk-2QF354AD.js";
import "./chunk-WSR5IJUW.js";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-2VHAU5LM.js";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵnextContext,
  ɵɵproperty,
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
} from "./chunk-FWM3YOMT.js";
import "./chunk-E3MB3462.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/price-analytics/price-analytics.component.ts
function PriceAnalyticsComponent_mat_option_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banggia_r1 = ctx.$implicit;
    \u0275\u0275property("value", banggia_r1.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banggia_r1.title, " ");
  }
}
function PriceAnalyticsComponent_mat_form_field_42_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 9)(1, "mat-label");
    \u0275\u0275text(2, "T\u1EEB ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function PriceAnalyticsComponent_mat_form_field_42_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateFrom, $event) || (ctx_r2.dateFrom = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function PriceAnalyticsComponent_mat_form_field_42_Template_input_ngModelChange_3_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCustomDateChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 52)(5, "mat-datepicker", null, 0);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pickerFrom_r4 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", pickerFrom_r4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateFrom);
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerFrom_r4);
  }
}
function PriceAnalyticsComponent_mat_form_field_43_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 9)(1, "mat-label");
    \u0275\u0275text(2, "\u0110\u1EBFn ng\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "input", 51);
    \u0275\u0275twoWayListener("ngModelChange", function PriceAnalyticsComponent_mat_form_field_43_Template_input_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.dateTo, $event) || (ctx_r2.dateTo = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("ngModelChange", function PriceAnalyticsComponent_mat_form_field_43_Template_input_ngModelChange_3_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.onCustomDateChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(4, "mat-datepicker-toggle", 52)(5, "mat-datepicker", null, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const pickerTo_r6 = \u0275\u0275reference(6);
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", pickerTo_r6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.dateTo);
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerTo_r6);
  }
}
function PriceAnalyticsComponent_div_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon");
    \u0275\u0275text(2, "lightbulb");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "S\u1EA3n ph\u1EA9m bi\u1EBFn \u0111\u1ED9ng nh\u1EA5t: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.summaryStats().mostVolatileProduct);
  }
}
function PriceAnalyticsComponent_th_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r7.sanphamTitle);
  }
}
function PriceAnalyticsComponent_th_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\xE1 TB");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_88_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r8.avgPrice));
  }
}
function PriceAnalyticsComponent_th_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\xE1 th\u1EA5p nh\u1EA5t");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_91_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 56);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r9.minPrice));
  }
}
function PriceAnalyticsComponent_th_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\xE1 cao nh\u1EA5t");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_94_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 57);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r10.maxPrice));
  }
}
function PriceAnalyticsComponent_th_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "\u0110\u1ED9 bi\u1EBFn \u0111\u1ED9ng");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getVolatilityClass(row_r11.volatility));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r11.volatility.toFixed(1), "% ");
  }
}
function PriceAnalyticsComponent_th_99_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "S\u1ED1 l\u1EA7n thay \u0111\u1ED5i");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip", 58);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.changeCount);
  }
}
function PriceAnalyticsComponent_th_102_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Thay \u0111\u1ED5i g\u1EA7n nh\u1EA5t");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatDate(row_r13.lastChange));
  }
}
function PriceAnalyticsComponent_tr_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function PriceAnalyticsComponent_tr_105_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
}
function PriceAnalyticsComponent_div_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 53)(1, "mat-icon");
    \u0275\u0275text(2, "lightbulb");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4, "\u0110\u01A1n h\xE0ng \u1EA3nh h\u01B0\u1EDFng l\u1EDBn nh\u1EA5t: ");
    \u0275\u0275elementStart(5, "strong");
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r2.summaryStats().highestImpactOrder);
  }
}
function PriceAnalyticsComponent_th_117_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "M\xE3 \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r14 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r14.donhangCode);
  }
}
function PriceAnalyticsComponent_th_120_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Ng\xE0y \u0111\u1EB7t");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatDate(row_r15.orderDate));
  }
}
function PriceAnalyticsComponent_th_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\xE1 tr\u01B0\u1EDBc");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_124_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r16.totalBefore));
  }
}
function PriceAnalyticsComponent_th_126_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Gi\xE1 sau");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_127_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r17.totalAfter));
  }
}
function PriceAnalyticsComponent_th_129_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Ch\xEAnh l\u1EC7ch");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_130_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", row_r18.difference > 0)("negative", row_r18.difference < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r18.difference > 0 ? "+" : "", "", ctx_r2.formatCurrency(row_r18.difference), " ");
  }
}
function PriceAnalyticsComponent_th_132_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "%");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_133_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("increase", row_r19.differencePercent > 0)("decrease", row_r19.differencePercent < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r19.differencePercent > 0 ? "+" : "", "", row_r19.differencePercent, "% ");
  }
}
function PriceAnalyticsComponent_th_135_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "SP \u1EA3nh h\u01B0\u1EDFng");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_136_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r20 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(row_r20.itemsAffected);
  }
}
function PriceAnalyticsComponent_tr_137_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function PriceAnalyticsComponent_tr_138_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
}
function PriceAnalyticsComponent_th_149_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Th\xE1ng");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_150_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r21 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r21.month);
  }
}
function PriceAnalyticsComponent_th_152_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Doanh thu th\u1EF1c t\u1EBF");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_153_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r22 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r22.actualRevenue));
  }
}
function PriceAnalyticsComponent_th_155_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "D\u1EF1 ki\u1EBFn (kh\xF4ng \u0111\u1ED5i gi\xE1)");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_156_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r23 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r23.projectedRevenue));
  }
}
function PriceAnalyticsComponent_th_158_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "Ch\xEAnh l\u1EC7ch");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_159_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "span", 61);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r24 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", row_r24.difference > 0)("negative", row_r24.difference < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r24.difference > 0 ? "+" : "", "", ctx_r2.formatCurrency(row_r24.difference), " ");
  }
}
function PriceAnalyticsComponent_th_161_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "L\u1EA7n t\u0103ng gi\xE1");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_162_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip", 62);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r25 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2197\uFE0F ", row_r25.priceIncreases, "");
  }
}
function PriceAnalyticsComponent_th_164_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 54);
    \u0275\u0275text(1, "L\u1EA7n gi\u1EA3m gi\xE1");
    \u0275\u0275elementEnd();
  }
}
function PriceAnalyticsComponent_td_165_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 55)(1, "mat-chip", 63);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r26 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("\u2198\uFE0F ", row_r26.priceDecreases, "");
  }
}
function PriceAnalyticsComponent_tr_166_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 59);
  }
}
function PriceAnalyticsComponent_tr_167_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 60);
  }
}
var PriceAnalyticsComponent = class _PriceAnalyticsComponent {
  // Signals
  loading = signal(false);
  selectedBanggiaId = signal("");
  selectedPeriod = signal("30days");
  dateFrom = signal(new Date(Date.now() - 30 * 24 * 60 * 60 * 1e3));
  dateTo = signal(/* @__PURE__ */ new Date());
  // Data
  banggiaList = signal([]);
  volatilityData = signal([]);
  orderImpacts = signal([]);
  revenueImpacts = signal([]);
  // Summary Stats
  summaryStats = signal({
    totalPriceChanges: 0,
    avgVolatility: 0,
    ordersAffected: 0,
    revenueImpact: 0,
    mostVolatileProduct: "",
    highestImpactOrder: ""
  });
  // Table columns
  volatilityColumns = ["sanphamTitle", "avgPrice", "minPrice", "maxPrice", "volatility", "changeCount", "lastChange"];
  orderImpactColumns = ["donhangCode", "orderDate", "totalBefore", "totalAfter", "difference", "differencePercent", "itemsAffected"];
  revenueImpactColumns = ["month", "actualRevenue", "projectedRevenue", "difference", "priceIncreases", "priceDecreases"];
  constructor() {
  }
  ngOnInit() {
    this.loadBanggiaList();
    this.loadAnalytics();
  }
  loadBanggiaList() {
    return __async(this, null, function* () {
      this.banggiaList.set([
        { id: "all", title: "T\u1EA5t c\u1EA3 b\u1EA3ng gi\xE1" },
        { id: "bg-1", title: "B\u1EA3ng gi\xE1 b\xE1n l\u1EBB" },
        { id: "bg-2", title: "B\u1EA3ng gi\xE1 b\xE1n s\u1EC9" },
        { id: "bg-3", title: "B\u1EA3ng gi\xE1 kh\xE1ch VIP" }
      ]);
      this.selectedBanggiaId.set("all");
    });
  }
  loadAnalytics() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield Promise.all([
          this.loadVolatilityData(),
          this.loadOrderImpacts(),
          this.loadRevenueImpacts(),
          this.calculateSummaryStats()
        ]);
      } catch (error) {
        console.error("Error loading analytics:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  loadVolatilityData() {
    return __async(this, null, function* () {
      const mockData = [
        {
          sanphamId: "sp-1",
          sanphamTitle: "Rau xanh",
          avgPrice: 11e3,
          minPrice: 9e3,
          maxPrice: 13e3,
          volatility: 44.4,
          changeCount: 5,
          lastChange: /* @__PURE__ */ new Date()
        },
        {
          sanphamId: "sp-2",
          sanphamTitle: "Rau c\u1EA3i",
          avgPrice: 14e3,
          minPrice: 12e3,
          maxPrice: 16e3,
          volatility: 33.3,
          changeCount: 3,
          lastChange: new Date(Date.now() - 864e5)
        },
        {
          sanphamId: "sp-3",
          sanphamTitle: "C\xE0 chua",
          avgPrice: 8500,
          minPrice: 8e3,
          maxPrice: 9500,
          volatility: 18.8,
          changeCount: 2,
          lastChange: new Date(Date.now() - 1728e5)
        }
      ];
      this.volatilityData.set(mockData);
    });
  }
  loadOrderImpacts() {
    return __async(this, null, function* () {
      const mockData = [
        {
          donhangId: "dh-1",
          donhangCode: "DH0001",
          priceChangeDate: new Date(Date.now() - 864e5),
          orderDate: /* @__PURE__ */ new Date(),
          totalBefore: 5e5,
          totalAfter: 52e4,
          difference: 2e4,
          differencePercent: 4,
          itemsAffected: 3
        },
        {
          donhangId: "dh-2",
          donhangCode: "DH0002",
          priceChangeDate: new Date(Date.now() - 1728e5),
          orderDate: new Date(Date.now() - 864e5),
          totalBefore: 75e4,
          totalAfter: 735e3,
          difference: -15e3,
          differencePercent: -2,
          itemsAffected: 2
        }
      ];
      this.orderImpacts.set(mockData);
    });
  }
  loadRevenueImpacts() {
    return __async(this, null, function* () {
      const mockData = [
        {
          month: "Th\xE1ng 1/2025",
          actualRevenue: 45e6,
          projectedRevenue: 42e6,
          difference: 3e6,
          priceIncreases: 12,
          priceDecreases: 5
        },
        {
          month: "Th\xE1ng 12/2024",
          actualRevenue: 38e6,
          projectedRevenue: 4e7,
          difference: -2e6,
          priceIncreases: 4,
          priceDecreases: 8
        },
        {
          month: "Th\xE1ng 11/2024",
          actualRevenue: 42e6,
          projectedRevenue: 41e6,
          difference: 1e6,
          priceIncreases: 7,
          priceDecreases: 6
        }
      ];
      this.revenueImpacts.set(mockData);
    });
  }
  calculateSummaryStats() {
    return __async(this, null, function* () {
      const volatilityData = this.volatilityData();
      const orderImpacts = this.orderImpacts();
      const revenueImpacts = this.revenueImpacts();
      const totalPriceChanges = volatilityData.reduce((sum, item) => sum + item.changeCount, 0);
      const avgVolatility = volatilityData.length > 0 ? volatilityData.reduce((sum, item) => sum + item.volatility, 0) / volatilityData.length : 0;
      const mostVolatile = volatilityData.reduce((max, item) => item.volatility > max.volatility ? item : max, { volatility: 0, sanphamTitle: "" });
      const highestImpact = orderImpacts.reduce((max, item) => Math.abs(item.difference) > Math.abs(max.difference) ? item : max, { difference: 0, donhangCode: "" });
      const totalRevenueImpact = revenueImpacts.reduce((sum, item) => sum + item.difference, 0);
      this.summaryStats.set({
        totalPriceChanges,
        avgVolatility: Math.round(avgVolatility * 10) / 10,
        ordersAffected: orderImpacts.length,
        revenueImpact: totalRevenueImpact,
        mostVolatileProduct: mostVolatile.sanphamTitle,
        highestImpactOrder: highestImpact.donhangCode
      });
    });
  }
  onPeriodChange() {
    const period = this.selectedPeriod();
    const now = /* @__PURE__ */ new Date();
    switch (period) {
      case "7days":
        this.dateFrom.set(new Date(now.getTime() - 7 * 24 * 60 * 60 * 1e3));
        break;
      case "30days":
        this.dateFrom.set(new Date(now.getTime() - 30 * 24 * 60 * 60 * 1e3));
        break;
      case "90days":
        this.dateFrom.set(new Date(now.getTime() - 90 * 24 * 60 * 60 * 1e3));
        break;
      case "1year":
        this.dateFrom.set(new Date(now.getTime() - 365 * 24 * 60 * 60 * 1e3));
        break;
    }
    this.dateTo.set(now);
    this.loadAnalytics();
  }
  onCustomDateChange() {
    this.loadAnalytics();
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  }
  formatDate(date) {
    return new Intl.DateTimeFormat("vi-VN", {
      year: "numeric",
      month: "2-digit",
      day: "2-digit"
    }).format(new Date(date));
  }
  getVolatilityClass(volatility) {
    if (volatility >= 40)
      return "high-volatility";
    if (volatility >= 20)
      return "medium-volatility";
    return "low-volatility";
  }
  exportToExcel() {
    console.log("Exporting to Excel...");
  }
  downloadReport() {
    console.log("Downloading report...");
  }
  static \u0275fac = function PriceAnalyticsComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceAnalyticsComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PriceAnalyticsComponent, selectors: [["app-price-analytics"]], decls: 168, vars: 25, consts: [["pickerFrom", ""], ["pickerTo", ""], [1, "price-analytics-container"], [1, "header-card"], [1, "header-actions"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "filters-card"], [1, "filters-row"], ["appearance", "outline"], [3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["matPrefix", ""], ["value", "7days"], ["value", "30days"], ["value", "90days"], ["value", "1year"], ["value", "custom"], ["appearance", "outline", 4, "ngIf"], [1, "summary-grid"], [1, "stat-card"], [1, "stat-value"], [1, "stat-label"], [1, "table-card"], ["class", "insights-box", 4, "ngIf"], [1, "table-container"], ["mat-table", "", 1, "analytics-table", 3, "dataSource"], ["matColumnDef", "sanphamTitle"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "avgPrice"], ["matColumnDef", "minPrice"], ["matColumnDef", "maxPrice"], ["matColumnDef", "volatility"], ["matColumnDef", "changeCount"], ["matColumnDef", "lastChange"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["matColumnDef", "donhangCode"], ["matColumnDef", "orderDate"], ["matColumnDef", "totalBefore"], ["matColumnDef", "totalAfter"], ["matColumnDef", "difference"], ["matColumnDef", "differencePercent"], ["matColumnDef", "itemsAffected"], ["matColumnDef", "month"], ["matColumnDef", "actualRevenue"], ["matColumnDef", "projectedRevenue"], ["matColumnDef", "priceIncreases"], ["matColumnDef", "priceDecreases"], [3, "value"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel"], ["matSuffix", "", 3, "for"], [1, "insights-box"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "price-min"], [1, "price-max"], [1, "count-chip"], ["mat-header-row", ""], ["mat-row", ""], [1, "difference"], [1, "increase"], [1, "decrease"]], template: function PriceAnalyticsComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 2)(1, "mat-card", 3)(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
      \u0275\u0275text(5, "analytics");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " Ph\xE2n T\xEDch Gi\xE1 & Doanh Thu ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "div", 4)(8, "button", 5);
      \u0275\u0275listener("click", function PriceAnalyticsComponent_Template_button_click_8_listener() {
        return ctx.exportToExcel();
      });
      \u0275\u0275elementStart(9, "mat-icon");
      \u0275\u0275text(10, "file_download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(11, " Xu\u1EA5t Excel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(12, "button", 6);
      \u0275\u0275listener("click", function PriceAnalyticsComponent_Template_button_click_12_listener() {
        return ctx.downloadReport();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "picture_as_pdf");
      \u0275\u0275elementEnd();
      \u0275\u0275text(15, " T\u1EA3i b\xE1o c\xE1o ");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(16, "mat-card", 7)(17, "mat-card-content")(18, "div", 8)(19, "mat-form-field", 9)(20, "mat-label");
      \u0275\u0275text(21, "B\u1EA3ng gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(22, "mat-select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function PriceAnalyticsComponent_Template_mat_select_ngModelChange_22_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedBanggiaId, $event) || (ctx.selectedBanggiaId = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function PriceAnalyticsComponent_Template_mat_select_ngModelChange_22_listener() {
        return ctx.loadAnalytics();
      });
      \u0275\u0275template(23, PriceAnalyticsComponent_mat_option_23_Template, 2, 2, "mat-option", 11);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-icon", 12);
      \u0275\u0275text(25, "list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(26, "mat-form-field", 9)(27, "mat-label");
      \u0275\u0275text(28, "Kho\u1EA3ng th\u1EDDi gian");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function PriceAnalyticsComponent_Template_mat_select_ngModelChange_29_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedPeriod, $event) || (ctx.selectedPeriod = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function PriceAnalyticsComponent_Template_mat_select_ngModelChange_29_listener() {
        return ctx.onPeriodChange();
      });
      \u0275\u0275elementStart(30, "mat-option", 13);
      \u0275\u0275text(31, "7 ng\xE0y qua");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-option", 14);
      \u0275\u0275text(33, "30 ng\xE0y qua");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-option", 15);
      \u0275\u0275text(35, "90 ng\xE0y qua");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "mat-option", 16);
      \u0275\u0275text(37, "1 n\u0103m qua");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(38, "mat-option", 17);
      \u0275\u0275text(39, "T\xF9y ch\u1EC9nh");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(40, "mat-icon", 12);
      \u0275\u0275text(41, "date_range");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(42, PriceAnalyticsComponent_mat_form_field_42_Template, 7, 3, "mat-form-field", 18)(43, PriceAnalyticsComponent_mat_form_field_43_Template, 7, 3, "mat-form-field", 18);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(44, "div", 19)(45, "mat-card", 20)(46, "mat-icon");
      \u0275\u0275text(47, "trending_up");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 21);
      \u0275\u0275text(49);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 22);
      \u0275\u0275text(51, "T\u1ED5ng thay \u0111\u1ED5i gi\xE1");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(52, "mat-card", 20)(53, "mat-icon");
      \u0275\u0275text(54, "show_chart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "div", 21);
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "div", 22);
      \u0275\u0275text(58, "\u0110\u1ED9 bi\u1EBFn \u0111\u1ED9ng TB");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "mat-card", 20)(60, "mat-icon");
      \u0275\u0275text(61, "shopping_cart");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "div", 21);
      \u0275\u0275text(63);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(64, "div", 22);
      \u0275\u0275text(65, "\u0110\u01A1n h\xE0ng b\u1ECB \u1EA3nh h\u01B0\u1EDFng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(66, "mat-card", 20)(67, "mat-icon");
      \u0275\u0275text(68);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(69, "div", 21);
      \u0275\u0275text(70);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(71, "div", 22);
      \u0275\u0275text(72, "\u1EA2nh h\u01B0\u1EDFng doanh thu");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(73, "mat-card", 23)(74, "mat-card-header")(75, "mat-card-title")(76, "mat-icon");
      \u0275\u0275text(77, "timeline");
      \u0275\u0275elementEnd();
      \u0275\u0275text(78, " \u0110\u1ED9 Bi\u1EBFn \u0110\u1ED9ng Gi\xE1 S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(79, "mat-card-content");
      \u0275\u0275template(80, PriceAnalyticsComponent_div_80_Template, 7, 1, "div", 24);
      \u0275\u0275elementStart(81, "div", 25)(82, "table", 26);
      \u0275\u0275elementContainerStart(83, 27);
      \u0275\u0275template(84, PriceAnalyticsComponent_th_84_Template, 2, 0, "th", 28)(85, PriceAnalyticsComponent_td_85_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(86, 30);
      \u0275\u0275template(87, PriceAnalyticsComponent_th_87_Template, 2, 0, "th", 28)(88, PriceAnalyticsComponent_td_88_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(89, 31);
      \u0275\u0275template(90, PriceAnalyticsComponent_th_90_Template, 2, 0, "th", 28)(91, PriceAnalyticsComponent_td_91_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(92, 32);
      \u0275\u0275template(93, PriceAnalyticsComponent_th_93_Template, 2, 0, "th", 28)(94, PriceAnalyticsComponent_td_94_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(95, 33);
      \u0275\u0275template(96, PriceAnalyticsComponent_th_96_Template, 2, 0, "th", 28)(97, PriceAnalyticsComponent_td_97_Template, 3, 3, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(98, 34);
      \u0275\u0275template(99, PriceAnalyticsComponent_th_99_Template, 2, 0, "th", 28)(100, PriceAnalyticsComponent_td_100_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(101, 35);
      \u0275\u0275template(102, PriceAnalyticsComponent_th_102_Template, 2, 0, "th", 28)(103, PriceAnalyticsComponent_td_103_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(104, PriceAnalyticsComponent_tr_104_Template, 1, 0, "tr", 36)(105, PriceAnalyticsComponent_tr_105_Template, 1, 0, "tr", 37);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(106, "mat-card", 23)(107, "mat-card-header")(108, "mat-card-title")(109, "mat-icon");
      \u0275\u0275text(110, "receipt_long");
      \u0275\u0275elementEnd();
      \u0275\u0275text(111, " \u0110\u01A1n H\xE0ng B\u1ECB \u1EA2nh H\u01B0\u1EDFng B\u1EDFi Thay \u0110\u1ED5i Gi\xE1 ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(112, "mat-card-content");
      \u0275\u0275template(113, PriceAnalyticsComponent_div_113_Template, 7, 1, "div", 24);
      \u0275\u0275elementStart(114, "div", 25)(115, "table", 26);
      \u0275\u0275elementContainerStart(116, 38);
      \u0275\u0275template(117, PriceAnalyticsComponent_th_117_Template, 2, 0, "th", 28)(118, PriceAnalyticsComponent_td_118_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(119, 39);
      \u0275\u0275template(120, PriceAnalyticsComponent_th_120_Template, 2, 0, "th", 28)(121, PriceAnalyticsComponent_td_121_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(122, 40);
      \u0275\u0275template(123, PriceAnalyticsComponent_th_123_Template, 2, 0, "th", 28)(124, PriceAnalyticsComponent_td_124_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(125, 41);
      \u0275\u0275template(126, PriceAnalyticsComponent_th_126_Template, 2, 0, "th", 28)(127, PriceAnalyticsComponent_td_127_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(128, 42);
      \u0275\u0275template(129, PriceAnalyticsComponent_th_129_Template, 2, 0, "th", 28)(130, PriceAnalyticsComponent_td_130_Template, 3, 6, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(131, 43);
      \u0275\u0275template(132, PriceAnalyticsComponent_th_132_Template, 2, 0, "th", 28)(133, PriceAnalyticsComponent_td_133_Template, 3, 6, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(134, 44);
      \u0275\u0275template(135, PriceAnalyticsComponent_th_135_Template, 2, 0, "th", 28)(136, PriceAnalyticsComponent_td_136_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(137, PriceAnalyticsComponent_tr_137_Template, 1, 0, "tr", 36)(138, PriceAnalyticsComponent_tr_138_Template, 1, 0, "tr", 37);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(139, "mat-card", 23)(140, "mat-card-header")(141, "mat-card-title")(142, "mat-icon");
      \u0275\u0275text(143, "attach_money");
      \u0275\u0275elementEnd();
      \u0275\u0275text(144, " \u1EA2nh H\u01B0\u1EDFng Doanh Thu Theo Th\xE1ng ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(145, "mat-card-content")(146, "div", 25)(147, "table", 26);
      \u0275\u0275elementContainerStart(148, 45);
      \u0275\u0275template(149, PriceAnalyticsComponent_th_149_Template, 2, 0, "th", 28)(150, PriceAnalyticsComponent_td_150_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(151, 46);
      \u0275\u0275template(152, PriceAnalyticsComponent_th_152_Template, 2, 0, "th", 28)(153, PriceAnalyticsComponent_td_153_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(154, 47);
      \u0275\u0275template(155, PriceAnalyticsComponent_th_155_Template, 2, 0, "th", 28)(156, PriceAnalyticsComponent_td_156_Template, 2, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(157, 42);
      \u0275\u0275template(158, PriceAnalyticsComponent_th_158_Template, 2, 0, "th", 28)(159, PriceAnalyticsComponent_td_159_Template, 3, 6, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(160, 48);
      \u0275\u0275template(161, PriceAnalyticsComponent_th_161_Template, 2, 0, "th", 28)(162, PriceAnalyticsComponent_td_162_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(163, 49);
      \u0275\u0275template(164, PriceAnalyticsComponent_th_164_Template, 2, 0, "th", 28)(165, PriceAnalyticsComponent_td_165_Template, 3, 1, "td", 29);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(166, PriceAnalyticsComponent_tr_166_Template, 1, 0, "tr", 36)(167, PriceAnalyticsComponent_tr_167_Template, 1, 0, "tr", 37);
      \u0275\u0275elementEnd()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(22);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedBanggiaId);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.banggiaList());
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedPeriod);
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.selectedPeriod() === "custom");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.selectedPeriod() === "custom");
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.summaryStats().totalPriceChanges);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate1("", ctx.summaryStats().avgVolatility, "%");
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.summaryStats().ordersAffected);
      \u0275\u0275advance(3);
      \u0275\u0275classProp("positive", ctx.summaryStats().revenueImpact > 0)("negative", ctx.summaryStats().revenueImpact < 0);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.summaryStats().revenueImpact >= 0 ? "arrow_upward" : "arrow_downward");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.formatCurrency(ctx.summaryStats().revenueImpact));
      \u0275\u0275advance(10);
      \u0275\u0275property("ngIf", ctx.summaryStats().mostVolatileProduct);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.volatilityData());
      \u0275\u0275advance(22);
      \u0275\u0275property("matHeaderRowDef", ctx.volatilityColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.volatilityColumns);
      \u0275\u0275advance(8);
      \u0275\u0275property("ngIf", ctx.summaryStats().highestImpactOrder);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.orderImpacts());
      \u0275\u0275advance(22);
      \u0275\u0275property("matHeaderRowDef", ctx.orderImpactColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.orderImpactColumns);
      \u0275\u0275advance(9);
      \u0275\u0275property("dataSource", ctx.revenueImpacts());
      \u0275\u0275advance(19);
      \u0275\u0275property("matHeaderRowDef", ctx.revenueImpactColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.revenueImpactColumns);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon,
    MatSelectModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatSelect,
    MatOption,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatInputModule,
    MatInput,
    MatTableModule,
    MatTable,
    MatHeaderCellDef,
    MatHeaderRowDef,
    MatColumnDef,
    MatCellDef,
    MatRowDef,
    MatHeaderCell,
    MatCell,
    MatHeaderRow,
    MatRow,
    MatChipsModule,
    MatChip,
    MatTooltipModule
  ], styles: ["\n\n.price-analytics-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  color: #1976d2;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filters-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 15px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 20px;\n  margin-bottom: 20px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 30px 20px;\n  text-align: center;\n  transition: transform 0.2s, box-shadow 0.2s;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]:hover {\n  transform: translateY(-4px);\n  box-shadow: 0 8px 16px rgba(0, 0, 0, 0.15);\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  color: #1976d2;\n  margin-bottom: 15px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: bold;\n  color: #333;\n  margin-bottom: 8px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card[_ngcontent-%COMP%]   .stat-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.positive[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #e8f5e9 0%,\n      #fff 100%);\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.positive[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.positive[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.negative[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #ffebee 0%,\n      #fff 100%);\n}\n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.negative[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .stat-card.negative[_ngcontent-%COMP%]   .stat-value[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 18px;\n  color: #333;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 24px;\n  width: 24px;\n  height: 24px;\n  color: #1976d2;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .insights-box[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  border-left: 4px solid #f57c00;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-radius: 4px;\n  display: flex;\n  align-items: center;\n  gap: 10px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .insights-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #f57c00;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .insights-box[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #e65100;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  max-height: 600px;\n  overflow-y: auto;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 800px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 12px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   .price-min[_ngcontent-%COMP%] {\n  color: #4caf50;\n  font-weight: 500;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   .price-max[_ngcontent-%COMP%] {\n  color: #f44336;\n  font-weight: 500;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.high-volatility[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.medium-volatility[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.low-volatility[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.count-chip[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  color: #1565c0;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.increase[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   mat-chip.decrease[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   .difference[_ngcontent-%COMP%] {\n  font-weight: 600;\n  font-size: 14px;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   .difference.positive[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.price-analytics-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .analytics-table[_ngcontent-%COMP%]   .difference.negative[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n@media (max-width: 1200px) {\n  .price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: repeat(2, 1fr);\n  }\n}\n@media (max-width: 768px) {\n  .price-analytics-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 15px;\n  }\n  .price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .price-analytics-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   .header-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n  .price-analytics-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .price-analytics-container[_ngcontent-%COMP%]   .filters-row[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr !important;\n  }\n}\n/*# sourceMappingURL=price-analytics.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PriceAnalyticsComponent, { className: "PriceAnalyticsComponent", filePath: "src/app/admin/banggia/price-analytics/price-analytics.component.ts", lineNumber: 67 });
})();
export {
  PriceAnalyticsComponent
};
//# sourceMappingURL=chunk-OUSIN62W.js.map
