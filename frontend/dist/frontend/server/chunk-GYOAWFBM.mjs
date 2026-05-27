import './polyfills.server.mjs';
import {
  PriceHistoryService
} from "./chunk-AQ5QTCLM.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-6YRKHWJL.mjs";
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
} from "./chunk-3VZFOMYA.mjs";
import {
  MatDialog,
  MatDialogModule
} from "./chunk-5PWX7G23.mjs";
import {
  GraphqlService
} from "./chunk-SLWHV4LF.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-KJH76OSC.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-6DRHJEKQ.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-PQY5STY2.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-KU7CK3YB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-4QEJTP76.mjs";
import {
  DefaultValueAccessor,
  FormBuilder,
  FormControlName,
  FormGroupDirective,
  FormsModule,
  MatFormField,
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgControlStatusGroup,
  NumberValueAccessor,
  ReactiveFormsModule,
  RequiredValidator,
  Validators,
  ɵNgNoValidate
} from "./chunk-K4777VIL.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-VOLHFDBH.mjs";
import "./chunk-A5AQV4K7.mjs";
import "./chunk-OWHCCJ6T.mjs";
import "./chunk-ZZDECD7O.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-AF3EHXCM.mjs";
import "./chunk-LOJIWTVC.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-K6ADGRHN.mjs";
import {
  MatOption
} from "./chunk-VMLPK7VD.mjs";
import "./chunk-RILUB63S.mjs";
import "./chunk-AJDW274Y.mjs";
import {
  CommonModule,
  NgForOf,
  NgIf
} from "./chunk-UP6A7POK.mjs";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassProp,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
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
  ɵɵtextInterpolate2
} from "./chunk-I6KZCWLZ.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  require_xlsx_min
} from "./chunk-3RMAAFYO.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/banggia/bulk-price-update/bulk-price-update.component.ts
var XLSX = __toESM(require_xlsx_min());
function BulkPriceUpdateComponent_mat_option_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 28);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banggia_r2 = ctx.$implicit;
    \u0275\u0275property("value", banggia_r2.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banggia_r2.title, " ");
  }
}
function BulkPriceUpdateComponent_mat_form_field_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 11)(1, "mat-label");
    \u0275\u0275text(2, "Thay \u0111\u1ED5i (%)");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 29);
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5, "%");
    \u0275\u0275elementEnd()();
  }
}
function BulkPriceUpdateComponent_mat_form_field_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-form-field", 11)(1, "mat-label");
    \u0275\u0275text(2, "S\u1ED1 ti\u1EC1n");
    \u0275\u0275elementEnd();
    \u0275\u0275element(3, "input", 31);
    \u0275\u0275elementStart(4, "span", 30);
    \u0275\u0275text(5, "\u0111");
    \u0275\u0275elementEnd()();
  }
}
function BulkPriceUpdateComponent_button_54_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 32);
    \u0275\u0275listener("click", function BulkPriceUpdateComponent_button_54_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r4);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.applyBulkChange());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "calculate");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " \xC1p d\u1EE5ng thay \u0111\u1ED5i ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275property("disabled", ctx_r4.priceUpdates().length === 0);
  }
}
function BulkPriceUpdateComponent_mat_card_59_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 33)(1, "mat-card-content")(2, "div", 34)(3, "div", 35)(4, "mat-icon", 36);
    \u0275\u0275text(5, "inventory");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 37);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 38);
    \u0275\u0275text(9, "T\u1ED5ng s\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 39)(11, "mat-icon", 40);
    \u0275\u0275text(12, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "div", 37);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "div", 38);
    \u0275\u0275text(16, "Th\xE0nh c\xF4ng");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 41)(18, "mat-icon", 42);
    \u0275\u0275text(19, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "div", 37);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 38);
    \u0275\u0275text(23, "Th\u1EA5t b\u1EA1i");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "div", 43)(25, "mat-icon");
    \u0275\u0275text(26);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "div", 37);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "div", 38);
    \u0275\u0275text(30, "T\u1ED5ng thay \u0111\u1ED5i");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r4.summary().total);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r4.summary().success);
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(ctx_r4.summary().failed);
    \u0275\u0275advance(4);
    \u0275\u0275classProp("positive", ctx_r4.summary().totalChange >= 0)("negative", ctx_r4.summary().totalChange < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.summary().totalChange >= 0 ? "trending_up" : "trending_down", " ");
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", ctx_r4.summary().totalChange >= 0)("negative", ctx_r4.summary().totalChange < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatCurrency(ctx_r4.summary().totalChange), " ");
  }
}
function BulkPriceUpdateComponent_mat_card_60_mat_spinner_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 65);
  }
}
function BulkPriceUpdateComponent_mat_card_60_mat_icon_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "save");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67)(1, "div", 68)(2, "strong");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "small");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r7.sanphamTitle);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r7.sanphamId);
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "Gi\xE1 hi\u1EC7n t\u1EA1i");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatCurrency(row_r8.currentPrice), " ");
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "Gi\xE1 m\u1EDBi");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("price-increase", row_r9.change > 0)("price-decrease", row_r9.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatCurrency(row_r9.newPrice), " ");
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "Ch\xEAnh l\u1EC7ch");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67)(1, "span", 69);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275classProp("positive", row_r10.change > 0)("negative", row_r10.change < 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r10.change > 0 ? "+" : "", "", ctx_r4.formatCurrency(row_r10.change), " ");
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "%");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67)(1, "mat-chip")(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("increase-chip", row_r11.changePercent > 0)("decrease-chip", row_r11.changePercent < 0);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r11.changePercent > 0 ? "trending_up" : row_r11.changePercent < 0 ? "trending_down" : "remove");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r11.changePercent > 0 ? "+" : "", "", row_r11.changePercent.toFixed(1), "% ");
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "L\xFD do");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67)(1, "span", 70);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r12 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r12.reason);
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_35_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 74)(1, "mat-icon");
    \u0275\u0275text(2, "schedule");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Ch\u1EDD x\u1EED l\xFD ");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 75)(1, "mat-icon");
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Th\xE0nh c\xF4ng ");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 76)(1, "mat-icon");
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3, " Th\u1EA5t b\u1EA1i ");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("matTooltip", row_r13.error || "");
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 67);
    \u0275\u0275template(1, BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_1_Template, 4, 0, "mat-chip", 71)(2, BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_2_Template, 4, 0, "mat-chip", 72)(3, BulkPriceUpdateComponent_mat_card_60_td_36_mat_chip_3_Template, 4, 1, "mat-chip", 73);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", row_r13.status === "pending");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", row_r13.status === "success");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", row_r13.status === "error");
  }
}
function BulkPriceUpdateComponent_mat_card_60_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 66);
    \u0275\u0275text(1, "Thao t\xE1c");
    \u0275\u0275elementEnd();
  }
}
function BulkPriceUpdateComponent_mat_card_60_td_39_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 67)(1, "button", 77);
    \u0275\u0275listener("click", function BulkPriceUpdateComponent_mat_card_60_td_39_Template_button_click_1_listener() {
      const i_r15 = \u0275\u0275restoreView(_r14).index;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.removeRow(i_r15));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "delete");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("disabled", ctx_r4.processing());
  }
}
function BulkPriceUpdateComponent_mat_card_60_tr_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 78);
  }
}
function BulkPriceUpdateComponent_mat_card_60_tr_41_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 79);
  }
}
function BulkPriceUpdateComponent_mat_card_60_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-card", 44)(1, "mat-card-content")(2, "div", 45)(3, "h3");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 46)(6, "button", 47);
    \u0275\u0275listener("click", function BulkPriceUpdateComponent_mat_card_60_Template_button_click_6_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.previewChanges());
    });
    \u0275\u0275elementStart(7, "mat-icon");
    \u0275\u0275text(8, "visibility");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Xem tr\u01B0\u1EDBc ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 48);
    \u0275\u0275listener("click", function BulkPriceUpdateComponent_mat_card_60_Template_button_click_10_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.applyChanges());
    });
    \u0275\u0275template(11, BulkPriceUpdateComponent_mat_card_60_mat_spinner_11_Template, 1, 0, "mat-spinner", 49)(12, BulkPriceUpdateComponent_mat_card_60_mat_icon_12_Template, 2, 0, "mat-icon", 50);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 51)(15, "table", 52);
    \u0275\u0275elementContainerStart(16, 53);
    \u0275\u0275template(17, BulkPriceUpdateComponent_mat_card_60_th_17_Template, 2, 0, "th", 54)(18, BulkPriceUpdateComponent_mat_card_60_td_18_Template, 6, 2, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 56);
    \u0275\u0275template(20, BulkPriceUpdateComponent_mat_card_60_th_20_Template, 2, 0, "th", 54)(21, BulkPriceUpdateComponent_mat_card_60_td_21_Template, 2, 1, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 57);
    \u0275\u0275template(23, BulkPriceUpdateComponent_mat_card_60_th_23_Template, 2, 0, "th", 54)(24, BulkPriceUpdateComponent_mat_card_60_td_24_Template, 3, 5, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(25, 58);
    \u0275\u0275template(26, BulkPriceUpdateComponent_mat_card_60_th_26_Template, 2, 0, "th", 54)(27, BulkPriceUpdateComponent_mat_card_60_td_27_Template, 3, 6, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(28, 59);
    \u0275\u0275template(29, BulkPriceUpdateComponent_mat_card_60_th_29_Template, 2, 0, "th", 54)(30, BulkPriceUpdateComponent_mat_card_60_td_30_Template, 5, 7, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(31, 60);
    \u0275\u0275template(32, BulkPriceUpdateComponent_mat_card_60_th_32_Template, 2, 0, "th", 54)(33, BulkPriceUpdateComponent_mat_card_60_td_33_Template, 3, 1, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(34, 61);
    \u0275\u0275template(35, BulkPriceUpdateComponent_mat_card_60_th_35_Template, 2, 0, "th", 54)(36, BulkPriceUpdateComponent_mat_card_60_td_36_Template, 4, 3, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(37, 62);
    \u0275\u0275template(38, BulkPriceUpdateComponent_mat_card_60_th_38_Template, 2, 0, "th", 54)(39, BulkPriceUpdateComponent_mat_card_60_td_39_Template, 4, 1, "td", 55);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(40, BulkPriceUpdateComponent_mat_card_60_tr_40_Template, 1, 0, "tr", 63)(41, BulkPriceUpdateComponent_mat_card_60_tr_41_Template, 1, 0, "tr", 64);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1("Danh s\xE1ch c\u1EADp nh\u1EADt (", ctx_r4.priceUpdates().length, " s\u1EA3n ph\u1EA9m)");
    \u0275\u0275advance(2);
    \u0275\u0275property("disabled", ctx_r4.previewing());
    \u0275\u0275advance(4);
    \u0275\u0275property("disabled", ctx_r4.processing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.processing());
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r4.processing());
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.processing() ? "\u0110ang x\u1EED l\xFD..." : "\xC1p d\u1EE5ng thay \u0111\u1ED5i", " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("dataSource", ctx_r4.priceUpdates());
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r4.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r4.displayedColumns);
  }
}
function BulkPriceUpdateComponent_mat_card_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 80)(1, "mat-card-content")(2, "mat-icon");
    \u0275\u0275text(3, "inbox");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "h3");
    \u0275\u0275text(5, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p");
    \u0275\u0275text(7, "Nh\u1EADp file Excel ho\u1EB7c th\xEAm s\u1EA3n ph\u1EA9m th\u1EE7 c\xF4ng \u0111\u1EC3 b\u1EAFt \u0111\u1EA7u");
    \u0275\u0275elementEnd()()();
  }
}
var BulkPriceUpdateComponent = class _BulkPriceUpdateComponent {
  fb;
  priceService;
  graphqlService;
  snackBar;
  dialog;
  updateForm;
  // Signals
  loading = signal(false);
  previewing = signal(false);
  processing = signal(false);
  // Data
  priceUpdates = signal([]);
  displayedColumns = ["sanphamTitle", "currentPrice", "newPrice", "change", "changePercent", "reason", "status", "actions"];
  banggiaList = signal([]);
  selectedBanggiaId = signal("");
  summary = signal({
    total: 0,
    success: 0,
    failed: 0,
    totalChange: 0
  });
  constructor(fb, priceService, graphqlService, snackBar, dialog) {
    this.fb = fb;
    this.priceService = priceService;
    this.graphqlService = graphqlService;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.initForm();
    this.loadBanggiaList();
  }
  initForm() {
    this.updateForm = this.fb.group({
      banggiaId: ["", Validators.required],
      updateType: ["manual", Validators.required],
      percentChange: [0],
      fixedAmount: [0],
      reason: ["", Validators.required]
    });
  }
  loadBanggiaList() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const result = yield this.graphqlService.findAll("banggia", {
          select: {
            id: true,
            title: true,
            mabanggia: true,
            status: true,
            type: true,
            isActive: true
          },
          where: { isActive: true },
          orderBy: { title: "asc" },
          take: 100,
          aggressiveCache: true
        });
        this.banggiaList.set(result.data || []);
        if (result.data && result.data.length > 0) {
          this.updateForm.patchValue({ banggiaId: result.data[0].id });
          this.selectedBanggiaId.set(result.data[0].id);
        }
      } catch (error) {
        console.error("Error loading banggia list:", error);
        this.snackBar.open("L\u1ED7i t\u1EA3i danh s\xE1ch b\u1EA3ng gi\xE1", "\u0110\xF3ng", { duration: 3e3 });
      } finally {
        this.loading.set(false);
      }
    });
  }
  // Excel Import
  onFileSelected(event) {
    const file = event.target.files[0];
    if (!file)
      return;
    const reader = new FileReader();
    reader.onload = (e) => {
      try {
        const data = new Uint8Array(e.target.result);
        const workbook = XLSX.read(data, { type: "array" });
        const firstSheet = workbook.Sheets[workbook.SheetNames[0]];
        const jsonData = XLSX.utils.sheet_to_json(firstSheet);
        this.processExcelData(jsonData);
      } catch (error) {
        this.snackBar.open("L\u1ED7i \u0111\u1ECDc file Excel", "\u0110\xF3ng", { duration: 3e3 });
      }
    };
    reader.readAsArrayBuffer(file);
  }
  processExcelData(data) {
    const updates = data.map((row) => ({
      sanphamId: row["M\xE3 s\u1EA3n ph\u1EA9m"] || row["sanphamId"] || "",
      sanphamTitle: row["T\xEAn s\u1EA3n ph\u1EA9m"] || row["sanphamTitle"] || "",
      currentPrice: parseFloat(row["Gi\xE1 hi\u1EC7n t\u1EA1i"] || row["currentPrice"] || 0),
      newPrice: parseFloat(row["Gi\xE1 m\u1EDBi"] || row["newPrice"] || 0),
      change: 0,
      changePercent: 0,
      reason: row["L\xFD do"] || row["reason"] || this.updateForm.value.reason || "",
      status: "pending"
    }));
    updates.forEach((update) => {
      update.change = update.newPrice - update.currentPrice;
      update.changePercent = update.currentPrice > 0 ? update.change / update.currentPrice * 100 : 0;
    });
    this.priceUpdates.set(updates);
    this.calculateSummary();
    this.snackBar.open(`\u0110\xE3 t\u1EA3i ${updates.length} s\u1EA3n ph\u1EA9m t\u1EEB Excel`, "\u0110\xF3ng", { duration: 3e3 });
  }
  // Download Excel Template
  downloadTemplate() {
    const template = [
      {
        "M\xE3 s\u1EA3n ph\u1EA9m": "SP001",
        "T\xEAn s\u1EA3n ph\u1EA9m": "V\xED d\u1EE5 s\u1EA3n ph\u1EA9m",
        "Gi\xE1 hi\u1EC7n t\u1EA1i": 1e4,
        "Gi\xE1 m\u1EDBi": 12e3,
        "L\xFD do": "T\u0103ng gi\xE1 theo th\u1ECB tr\u01B0\u1EDDng"
      }
    ];
    const ws = XLSX.utils.json_to_sheet(template);
    const range = XLSX.utils.decode_range(ws["!ref"] || "A1");
    for (let R = range.s.r; R <= range.e.r; ++R) {
      for (let C = range.s.c; C <= range.e.c; ++C) {
        const cell_address = { c: C, r: R };
        const cell_ref = XLSX.utils.encode_cell(cell_address);
        if (!ws[cell_ref])
          ws[cell_ref] = { t: "z", v: "" };
        if (!ws[cell_ref].s)
          ws[cell_ref].s = {};
        ws[cell_ref].s.border = {
          top: { style: "thin", color: { rgb: "000000" } },
          bottom: { style: "thin", color: { rgb: "000000" } },
          left: { style: "thin", color: { rgb: "000000" } },
          right: { style: "thin", color: { rgb: "000000" } }
        };
      }
    }
    const wb = XLSX.utils.book_new();
    XLSX.utils.book_append_sheet(wb, ws, "C\u1EADp nh\u1EADt gi\xE1");
    XLSX.writeFile(wb, "mau-cap-nhat-gia.xlsx");
  }
  // Manual Add Row
  addManualRow() {
    const newRow = {
      sanphamId: "",
      sanphamTitle: "",
      currentPrice: 0,
      newPrice: 0,
      change: 0,
      changePercent: 0,
      reason: this.updateForm.value.reason || "",
      status: "pending"
    };
    this.priceUpdates.update((updates) => [...updates, newRow]);
  }
  // Remove Row
  removeRow(index) {
    this.priceUpdates.update((updates) => updates.filter((_, i) => i !== index));
    this.calculateSummary();
  }
  // Apply Bulk Change (% or fixed amount)
  applyBulkChange() {
    const { updateType, percentChange, fixedAmount } = this.updateForm.value;
    this.priceUpdates.update((updates) => {
      return updates.map((update) => {
        if (updateType === "percent") {
          update.newPrice = update.currentPrice * (1 + percentChange / 100);
        } else if (updateType === "fixed") {
          update.newPrice = update.currentPrice + fixedAmount;
        }
        update.change = update.newPrice - update.currentPrice;
        update.changePercent = update.currentPrice > 0 ? update.change / update.currentPrice * 100 : 0;
        return update;
      });
    });
    this.calculateSummary();
  }
  // Preview Changes
  previewChanges() {
    return __async(this, null, function* () {
      if (this.priceUpdates().length === 0) {
        this.snackBar.open("Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xem tr\u01B0\u1EDBc", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      this.previewing.set(true);
      this.calculateSummary();
      this.snackBar.open("Xem tr\u01B0\u1EDBc thay \u0111\u1ED5i", "\u0110\xF3ng", { duration: 2e3 });
      setTimeout(() => {
        this.previewing.set(false);
      }, 100);
    });
  }
  // Apply Changes
  applyChanges() {
    return __async(this, null, function* () {
      if (!this.updateForm.valid) {
        this.snackBar.open("Vui l\xF2ng \u0111i\u1EC1n \u0111\u1EA7y \u0111\u1EE7 th\xF4ng tin", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      if (this.priceUpdates().length === 0) {
        this.snackBar.open("Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 c\u1EADp nh\u1EADt", "\u0110\xF3ng", { duration: 3e3 });
        return;
      }
      const confirmed = confirm(`B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n c\u1EADp nh\u1EADt ${this.priceUpdates().length} s\u1EA3n ph\u1EA9m?`);
      if (!confirmed)
        return;
      this.processing.set(true);
      try {
        const banggiaId = this.updateForm.value.banggiaId;
        const reason = this.updateForm.value.reason;
        for (let i = 0; i < this.priceUpdates().length; i++) {
          const update = this.priceUpdates()[i];
          try {
            yield this.priceService.bulkUpdatePrices({
              updates: [{
                banggiaId,
                sanphamId: update.sanphamId,
                newPrice: update.newPrice,
                reason: update.reason || reason
              }],
              userId: "current-user"
              // TODO: Get from auth service
            });
            this.priceUpdates.update((updates) => {
              updates[i].status = "success";
              return [...updates];
            });
            this.summary.update((s) => __spreadProps(__spreadValues({}, s), {
              success: s.success + 1
            }));
          } catch (error) {
            this.priceUpdates.update((updates) => {
              updates[i].status = "error";
              updates[i].error = error.message || "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
              return [...updates];
            });
            this.summary.update((s) => __spreadProps(__spreadValues({}, s), {
              failed: s.failed + 1
            }));
          }
        }
        this.snackBar.open(`Ho\xE0n th\xE0nh! Th\xE0nh c\xF4ng: ${this.summary().success}, Th\u1EA5t b\u1EA1i: ${this.summary().failed}`, "\u0110\xF3ng", { duration: 5e3 });
      } catch (error) {
        this.snackBar.open(`L\u1ED7i: ${error.message}`, "\u0110\xF3ng", { duration: 5e3 });
      } finally {
        this.processing.set(false);
      }
    });
  }
  // Calculate Summary
  calculateSummary() {
    const updates = this.priceUpdates();
    const summary = {
      total: updates.length,
      success: updates.filter((u) => u.status === "success").length,
      failed: updates.filter((u) => u.status === "error").length,
      totalChange: updates.reduce((sum, u) => sum + u.change, 0)
    };
    this.summary.set(summary);
  }
  // Format currency
  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  }
  // Clear all
  clearAll() {
    this.priceUpdates.set([]);
    this.summary.set({ total: 0, success: 0, failed: 0, totalChange: 0 });
  }
  static \u0275fac = function BulkPriceUpdateComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BulkPriceUpdateComponent)(\u0275\u0275directiveInject(FormBuilder), \u0275\u0275directiveInject(PriceHistoryService), \u0275\u0275directiveInject(GraphqlService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _BulkPriceUpdateComponent, selectors: [["app-bulk-price-update"]], decls: 62, vars: 9, consts: [["fileInput", ""], [1, "bulk-price-update-container"], [1, "header-card"], [1, "description"], [1, "config-card"], [3, "formGroup"], [1, "form-row"], ["appearance", "outline", 1, "full-width"], ["formControlName", "banggiaId", "required", ""], [3, "value", 4, "ngFor", "ngForOf"], ["matPrefix", ""], ["appearance", "outline"], ["formControlName", "updateType"], ["value", "manual"], ["value", "percent"], ["value", "fixed"], ["appearance", "outline", 4, "ngIf"], ["matInput", "", "formControlName", "reason", "required", ""], [1, "action-buttons"], ["mat-raised-button", "", "color", "primary", 3, "click"], ["mat-raised-button", "", "color", "accent", 3, "click"], ["type", "file", "accept", ".xlsx,.xls", 2, "display", "none", 3, "change"], ["mat-raised-button", "", 3, "click"], ["mat-raised-button", "", 3, "disabled", "click", 4, "ngIf"], ["mat-raised-button", "", "color", "warn", 3, "click", "disabled"], ["class", "summary-card", 4, "ngIf"], ["class", "table-card", 4, "ngIf"], ["class", "empty-state", 4, "ngIf"], [3, "value"], ["matInput", "", "type", "number", "formControlName", "percentChange"], ["matSuffix", ""], ["matInput", "", "type", "number", "formControlName", "fixedAmount"], ["mat-raised-button", "", 3, "click", "disabled"], [1, "summary-card"], [1, "summary-grid"], [1, "summary-item"], ["color", "primary"], [1, "summary-value"], [1, "summary-label"], [1, "summary-item", "success"], ["color", "accent"], [1, "summary-item", "failed"], ["color", "warn"], [1, "summary-item", "change"], [1, "table-card"], [1, "table-header"], [1, "preview-actions"], ["mat-button", "", 3, "click", "disabled"], ["mat-raised-button", "", "color", "primary", 3, "click", "disabled"], ["diameter", "20", 4, "ngIf"], [4, "ngIf"], [1, "table-container"], ["mat-table", "", 1, "price-table", 3, "dataSource"], ["matColumnDef", "sanphamTitle"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "currentPrice"], ["matColumnDef", "newPrice"], ["matColumnDef", "change"], ["matColumnDef", "changePercent"], ["matColumnDef", "reason"], ["matColumnDef", "status"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["diameter", "20"], ["mat-header-cell", ""], ["mat-cell", ""], [1, "product-cell"], [1, "change-badge"], [1, "reason-text"], ["class", "status-pending", 4, "ngIf"], ["class", "status-success", 4, "ngIf"], ["class", "status-error", 3, "matTooltip", 4, "ngIf"], [1, "status-pending"], [1, "status-success"], [1, "status-error", 3, "matTooltip"], ["mat-icon-button", "", "color", "warn", 3, "click", "disabled"], ["mat-header-row", ""], ["mat-row", ""], [1, "empty-state"]], template: function BulkPriceUpdateComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "mat-card", 2)(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
      \u0275\u0275text(5, "upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " C\u1EADp Nh\u1EADt Gi\xE1 H\xE0ng Lo\u1EA1t ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "mat-card-content")(8, "p", 3);
      \u0275\u0275text(9, " C\u1EADp nh\u1EADt gi\xE1 cho nhi\u1EC1u s\u1EA3n ph\u1EA9m c\xF9ng l\xFAc b\u1EB1ng c\xE1ch nh\u1EADp Excel ho\u1EB7c th\xEAm th\u1EE7 c\xF4ng ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(10, "mat-card", 4)(11, "mat-card-content")(12, "form", 5)(13, "div", 6)(14, "mat-form-field", 7)(15, "mat-label");
      \u0275\u0275text(16, "B\u1EA3ng gi\xE1");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-select", 8);
      \u0275\u0275template(18, BulkPriceUpdateComponent_mat_option_18_Template, 2, 2, "mat-option", 9);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-icon", 10);
      \u0275\u0275text(20, "list");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "mat-form-field", 11)(22, "mat-label");
      \u0275\u0275text(23, "Lo\u1EA1i c\u1EADp nh\u1EADt");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(24, "mat-select", 12)(25, "mat-option", 13);
      \u0275\u0275text(26, "Th\u1EE7 c\xF4ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "mat-option", 14);
      \u0275\u0275text(28, "Theo %");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "mat-option", 15);
      \u0275\u0275text(30, "S\u1ED1 ti\u1EC1n c\u1ED1 \u0111\u1ECBnh");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(31, BulkPriceUpdateComponent_mat_form_field_31_Template, 6, 0, "mat-form-field", 16)(32, BulkPriceUpdateComponent_mat_form_field_32_Template, 6, 0, "mat-form-field", 16);
      \u0275\u0275elementStart(33, "mat-form-field", 7)(34, "mat-label");
      \u0275\u0275text(35, "L\xFD do thay \u0111\u1ED5i");
      \u0275\u0275elementEnd();
      \u0275\u0275element(36, "input", 17);
      \u0275\u0275elementStart(37, "mat-icon", 10);
      \u0275\u0275text(38, "edit");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 18)(40, "button", 19);
      \u0275\u0275listener("click", function BulkPriceUpdateComponent_Template_button_click_40_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadTemplate());
      });
      \u0275\u0275elementStart(41, "mat-icon");
      \u0275\u0275text(42, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " T\u1EA3i m\u1EABu Excel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "button", 20);
      \u0275\u0275listener("click", function BulkPriceUpdateComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        const fileInput_r3 = \u0275\u0275reference(49);
        return \u0275\u0275resetView(fileInput_r3.click());
      });
      \u0275\u0275elementStart(45, "mat-icon");
      \u0275\u0275text(46, "upload_file");
      \u0275\u0275elementEnd();
      \u0275\u0275text(47, " Nh\u1EADp t\u1EEB Excel ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "input", 21, 0);
      \u0275\u0275listener("change", function BulkPriceUpdateComponent_Template_input_change_48_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onFileSelected($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "button", 22);
      \u0275\u0275listener("click", function BulkPriceUpdateComponent_Template_button_click_50_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.addManualRow());
      });
      \u0275\u0275elementStart(51, "mat-icon");
      \u0275\u0275text(52, "add");
      \u0275\u0275elementEnd();
      \u0275\u0275text(53, " Th\xEAm th\u1EE7 c\xF4ng ");
      \u0275\u0275elementEnd();
      \u0275\u0275template(54, BulkPriceUpdateComponent_button_54_Template, 4, 1, "button", 23);
      \u0275\u0275elementStart(55, "button", 24);
      \u0275\u0275listener("click", function BulkPriceUpdateComponent_Template_button_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearAll());
      });
      \u0275\u0275elementStart(56, "mat-icon");
      \u0275\u0275text(57, "clear");
      \u0275\u0275elementEnd();
      \u0275\u0275text(58, " X\xF3a t\u1EA5t c\u1EA3 ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(59, BulkPriceUpdateComponent_mat_card_59_Template, 31, 13, "mat-card", 25)(60, BulkPriceUpdateComponent_mat_card_60_Template, 42, 9, "mat-card", 26)(61, BulkPriceUpdateComponent_mat_card_61_Template, 8, 0, "mat-card", 27);
      \u0275\u0275elementEnd();
    }
    if (rf & 2) {
      \u0275\u0275advance(12);
      \u0275\u0275property("formGroup", ctx.updateForm);
      \u0275\u0275advance(6);
      \u0275\u0275property("ngForOf", ctx.banggiaList());
      \u0275\u0275advance(13);
      \u0275\u0275property("ngIf", ctx.updateForm.value.updateType === "percent");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.updateForm.value.updateType === "fixed");
      \u0275\u0275advance(22);
      \u0275\u0275property("ngIf", ctx.updateForm.value.updateType !== "manual");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.priceUpdates().length === 0);
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.priceUpdates().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceUpdates().length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.priceUpdates().length === 0);
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    NgIf,
    FormsModule,
    \u0275NgNoValidate,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgControlStatusGroup,
    RequiredValidator,
    ReactiveFormsModule,
    FormGroupDirective,
    FormControlName,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardTitle,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
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
    MatInputModule,
    MatInput,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
    MatSelectModule,
    MatSelect,
    MatOption,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatChipsModule,
    MatChip,
    MatTooltipModule,
    MatTooltip,
    MatSnackBarModule,
    MatDialogModule
  ], styles: ["\n\n.bulk-price-update-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1400px;\n  margin: 0 auto;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  color: #1976d2;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   .description[_ngcontent-%COMP%] {\n  color: #666;\n  margin: 10px 0 0;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(250px, 1fr));\n  gap: 15px;\n  margin-bottom: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .form-row[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  grid-column: 1/-1;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 10px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .config-card[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {\n  display: grid;\n  grid-template-columns: repeat(auto-fit, minmax(200px, 1fr));\n  gap: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  align-items: center;\n  padding: 15px;\n  border-radius: 8px;\n  background: #f5f5f5;\n  transition: transform 0.2s;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]:hover {\n  transform: translateY(-2px);\n  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 40px;\n  width: 40px;\n  height: 40px;\n  margin-bottom: 10px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value[_ngcontent-%COMP%] {\n  font-size: 32px;\n  font-weight: bold;\n  margin-bottom: 5px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value.positive[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-value.negative[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item[_ngcontent-%COMP%]   .summary-label[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #666;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item.success[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item.failed[_ngcontent-%COMP%] {\n  background: #ffebee;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item.change[_ngcontent-%COMP%]   mat-icon.positive[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .summary-card[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%]   .summary-item.change[_ngcontent-%COMP%]   mat-icon.negative[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n  margin-bottom: 15px;\n  padding-bottom: 15px;\n  border-bottom: 1px solid #e0e0e0;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  margin: 0;\n  color: #333;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .preview-actions[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 10px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  max-height: 600px;\n  overflow-y: auto;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 1000px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .product-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .product-cell[_ngcontent-%COMP%]   strong[_ngcontent-%COMP%] {\n  color: #333;\n  margin-bottom: 3px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .product-cell[_ngcontent-%COMP%]   small[_ngcontent-%COMP%] {\n  color: #999;\n  font-size: 12px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .price-increase[_ngcontent-%COMP%] {\n  color: #f44336;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .price-decrease[_ngcontent-%COMP%] {\n  color: #4caf50;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .change-badge[_ngcontent-%COMP%] {\n  display: inline-block;\n  padding: 4px 8px;\n  border-radius: 4px;\n  font-weight: 600;\n  font-size: 14px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .change-badge.positive[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #f44336;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .change-badge.negative[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #4caf50;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   mat-chip.increase-chip[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #f44336;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   mat-chip.decrease-chip[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #4caf50;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 18px;\n  width: 18px;\n  height: 18px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .reason-text[_ngcontent-%COMP%] {\n  max-width: 200px;\n  display: inline-block;\n  overflow: hidden;\n  text-overflow: ellipsis;\n  white-space: nowrap;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .status-pending[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #f57c00;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .status-success[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .price-table[_ngcontent-%COMP%]   .status-error[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 60px 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 80px;\n  width: 80px;\n  height: 80px;\n  color: #bdbdbd;\n  margin-bottom: 20px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  color: #666;\n  margin-bottom: 10px;\n}\n.bulk-price-update-container[_ngcontent-%COMP%]   .empty-state[_ngcontent-%COMP%]   p[_ngcontent-%COMP%] {\n  color: #999;\n}\n@media (max-width: 768px) {\n  .bulk-price-update-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .summary-grid[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr 1fr !important;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%] {\n    flex-direction: column;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .action-buttons[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    gap: 10px;\n    align-items: flex-start !important;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .preview-actions[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .bulk-price-update-container[_ngcontent-%COMP%]   .table-header[_ngcontent-%COMP%]   .preview-actions[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    flex: 1;\n  }\n}\n/*# sourceMappingURL=bulk-price-update.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(BulkPriceUpdateComponent, { className: "BulkPriceUpdateComponent", filePath: "src/app/admin/banggia/bulk-price-update/bulk-price-update.component.ts", lineNumber: 60 });
})();
export {
  BulkPriceUpdateComponent
};
//# sourceMappingURL=chunk-GYOAWFBM.mjs.map
