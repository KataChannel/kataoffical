import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-RYTJZHDX.js";
import {
  MatTab,
  MatTabGroup,
  MatTabLabel,
  MatTabsModule
} from "./chunk-VXRXYM4Q.js";
import {
  GraphqlService
} from "./chunk-FEROIANE.js";
import "./chunk-QEGCNOFQ.js";
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
} from "./chunk-SP2Z3Q73.js";
import {
  MatChip,
  MatChipsModule
} from "./chunk-4Q2WCKDS.js";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-TAPSLW5I.js";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GQA7LESQ.js";
import {
  MatInputModule
} from "./chunk-FRF6QBEZ.js";
import {
  FormsModule,
  MatFormField,
  MatLabel,
  NgControlStatus,
  NgModel
} from "./chunk-TMSN764N.js";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardTitle
} from "./chunk-M6ODRG7P.js";
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
  NgForOf
} from "./chunk-TAI2MURD.js";
import {
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
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
  ɵɵpureFunction0,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵstyleProp,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty
} from "./chunk-SEHLAVZZ.js";
import "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/price-comparison/price-comparison.component.ts
var _c0 = () => ["sanphamTitle", "currentPrice", "predicted30", "predicted60", "predicted90", "trend", "confidence"];
function PriceComparisonComponent_mat_checkbox_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-checkbox", 37);
    \u0275\u0275listener("change", function PriceComparisonComponent_mat_checkbox_19_Template_mat_checkbox_change_0_listener($event) {
      const banggia_r2 = \u0275\u0275restoreView(_r1).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.toggleBanggiaSelection(banggia_r2.id, $event.checked));
    });
    \u0275\u0275elementStart(1, "span", 38);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const banggia_r2 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275property("checked", ctx_r2.selectedBanggiaIds().includes(banggia_r2.id));
    \u0275\u0275advance();
    \u0275\u0275styleProp("color", banggia_r2.color);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", banggia_r2.title, " ");
  }
}
function PriceComparisonComponent_mat_option_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-option", 39);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const sanpham_r4 = ctx.$implicit;
    \u0275\u0275property("value", sanpham_r4.id);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", sanpham_r4.title, " ");
  }
}
function PriceComparisonComponent_ng_template_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "compare_arrows");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " So S\xE1nh Gi\xE1 ");
  }
}
function PriceComparisonComponent_th_38_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_39_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r5.sanphamTitle);
  }
}
function PriceComparisonComponent_ng_container_40_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const banggiaId_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275styleProp("color", ctx_r2.getBanggiaColor(banggiaId_r6));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.getBanggiaTitle(banggiaId_r6), " ");
  }
}
function PriceComparisonComponent_ng_container_40_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r7 = ctx.$implicit;
    const banggiaId_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getPriceComparisonClass(row_r7.banggiaPrice[banggiaId_r6], row_r7));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(row_r7.banggiaPrice[banggiaId_r6] || 0), " ");
  }
}
function PriceComparisonComponent_ng_container_40_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 42);
    \u0275\u0275template(1, PriceComparisonComponent_ng_container_40_th_1_Template, 2, 3, "th", 43)(2, PriceComparisonComponent_ng_container_40_td_2_Template, 3, 3, "td", 16);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const banggiaId_r6 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", "price_" + banggiaId_r6);
  }
}
function PriceComparisonComponent_th_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Gi\xE1 th\u1EA5p nh\u1EA5t");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "mat-chip", 44);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r8 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r8.minPrice));
  }
}
function PriceComparisonComponent_th_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Gi\xE1 cao nh\u1EA5t");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_46_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "mat-chip", 45);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r9 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r9.maxPrice));
  }
}
function PriceComparisonComponent_th_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Gi\xE1 trung b\xECnh");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_49_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(row_r10.avgPrice), " ");
  }
}
function PriceComparisonComponent_th_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Ch\xEAnh l\u1EC7ch");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "div", 46)(2, "span", 47);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "mat-chip");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r11.priceRange));
    \u0275\u0275advance();
    \u0275\u0275classMap(row_r11.priceRangePercent > 20 ? "high-range" : row_r11.priceRangePercent > 10 ? "medium-range" : "low-range");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatPercent(row_r11.priceRangePercent), " ");
  }
}
function PriceComparisonComponent_th_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Thao t\xE1c");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_55_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 41)(1, "button", 48);
    \u0275\u0275listener("click", function PriceComparisonComponent_td_55_Template_button_click_1_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.showHistoricalChart(row_r13.sanphamId));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "timeline");
    \u0275\u0275elementEnd()()();
  }
}
function PriceComparisonComponent_tr_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 49);
  }
}
function PriceComparisonComponent_tr_57_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 50);
  }
}
function PriceComparisonComponent_ng_template_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "trending_up");
    \u0275\u0275elementEnd();
    \u0275\u0275text(2, " D\u1EF1 \u0110o\xE1n Xu H\u01B0\u1EDBng ");
  }
}
function PriceComparisonComponent_th_77_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "S\u1EA3n ph\u1EA9m");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_78_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r14 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(row_r14.sanphamTitle);
  }
}
function PriceComparisonComponent_th_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Gi\xE1 hi\u1EC7n t\u1EA1i");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "strong");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r15 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.formatCurrency(row_r15.currentPrice));
  }
}
function PriceComparisonComponent_th_83_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "D\u1EF1 \u0111o\xE1n 30 ng\xE0y");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r16 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("price-up", row_r16.predictedPrice30Days > row_r16.currentPrice)("price-down", row_r16.predictedPrice30Days < row_r16.currentPrice);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(row_r16.predictedPrice30Days), " ");
  }
}
function PriceComparisonComponent_th_86_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "D\u1EF1 \u0111o\xE1n 60 ng\xE0y");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_87_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r17 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("price-up", row_r17.predictedPrice60Days > row_r17.currentPrice)("price-down", row_r17.predictedPrice60Days < row_r17.currentPrice);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(row_r17.predictedPrice60Days), " ");
  }
}
function PriceComparisonComponent_th_89_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "D\u1EF1 \u0111o\xE1n 90 ng\xE0y");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r18 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classProp("price-up", row_r18.predictedPrice90Days > row_r18.currentPrice)("price-down", row_r18.predictedPrice90Days < row_r18.currentPrice);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r2.formatCurrency(row_r18.predictedPrice90Days), " ");
  }
}
function PriceComparisonComponent_th_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "Xu h\u01B0\u1EDBng");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "mat-chip")(2, "mat-icon");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r19 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275classMap(ctx_r2.getTrendClass(row_r19.trend));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.getTrendIcon(row_r19.trend));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r19.trend === "increasing" ? "T\u0103ng" : row_r19.trend === "decreasing" ? "Gi\u1EA3m" : "\u1ED4n \u0111\u1ECBnh", " ");
  }
}
function PriceComparisonComponent_th_95_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 40);
    \u0275\u0275text(1, "\u0110\u1ED9 tin c\u1EADy");
    \u0275\u0275elementEnd();
  }
}
function PriceComparisonComponent_td_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 41)(1, "div", 51);
    \u0275\u0275element(2, "div", 52);
    \u0275\u0275elementStart(3, "span", 53);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r20 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275styleProp("width", row_r20.confidence, "%");
    \u0275\u0275classProp("high", row_r20.confidence >= 80)("medium", row_r20.confidence >= 60 && row_r20.confidence < 80)("low", row_r20.confidence < 60);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", row_r20.confidence, "%");
  }
}
function PriceComparisonComponent_tr_97_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 49);
  }
}
function PriceComparisonComponent_tr_98_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 50);
  }
}
var PriceComparisonComponent = class _PriceComparisonComponent {
  graphqlService;
  // Signals
  loading = signal(false);
  selectedBanggiaIds = signal([]);
  selectedSanphamIds = signal([]);
  // Data
  banggiaList = signal([]);
  sanphamList = signal([]);
  priceComparisons = signal([]);
  historicalData = signal({});
  trendPredictions = signal([]);
  // Display columns (dynamic based on selected banggia)
  displayedColumns = signal(["sanphamTitle"]);
  // Selected product for chart view
  selectedProductForChart = signal("");
  constructor(graphqlService) {
    this.graphqlService = graphqlService;
  }
  ngOnInit() {
    this.loadBanggiaList();
    this.loadSanphamList();
  }
  loadBanggiaList() {
    return __async(this, null, function* () {
      try {
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
        const colors = ["#1976d2", "#388e3c", "#f57c00", "#d32f2f", "#7b1fa2", "#0097a7"];
        const banggia = (result.data || []).map((bg, idx) => __spreadProps(__spreadValues({}, bg), {
          color: colors[idx % colors.length]
        }));
        this.banggiaList.set(banggia);
        if (banggia.length > 0) {
          this.selectedBanggiaIds.set(banggia.slice(0, 2).map((bg) => bg.id));
          this.updateDisplayColumns();
        }
      } catch (error) {
        console.error("Error loading banggia list:", error);
      }
    });
  }
  loadSanphamList() {
    return __async(this, null, function* () {
      try {
        const result = yield this.graphqlService.findAll("sanpham", {
          select: {
            id: true,
            title: true,
            masp: true,
            dvt: true
          },
          where: { isActive: true },
          orderBy: { title: "asc" },
          take: 100,
          aggressiveCache: true
        });
        this.sanphamList.set(result.data || []);
        if (result.data && result.data.length > 0) {
          this.selectedSanphamIds.set(result.data.slice(0, 5).map((sp) => sp.id));
          this.loadComparisons();
        }
      } catch (error) {
        console.error("Error loading sanpham list:", error);
      }
    });
  }
  loadComparisons() {
    return __async(this, null, function* () {
      this.loading.set(true);
      try {
        yield Promise.all([
          this.loadPriceComparisons(),
          this.loadHistoricalData(),
          this.loadTrendPredictions()
        ]);
      } catch (error) {
        console.error("Error loading comparisons:", error);
      } finally {
        this.loading.set(false);
      }
    });
  }
  loadPriceComparisons() {
    return __async(this, null, function* () {
      const mockComparisons = [
        {
          sanphamId: "sp-1",
          sanphamTitle: "Rau xanh",
          banggiaPrice: {
            "bg-1": 12e3,
            "bg-2": 1e4,
            "bg-3": 11500
          },
          minPrice: 1e4,
          maxPrice: 12e3,
          avgPrice: 11167,
          priceRange: 2e3,
          priceRangePercent: 20
        },
        {
          sanphamId: "sp-2",
          sanphamTitle: "Rau c\u1EA3i",
          banggiaPrice: {
            "bg-1": 15e3,
            "bg-2": 13500,
            "bg-3": 14e3
          },
          minPrice: 13500,
          maxPrice: 15e3,
          avgPrice: 14167,
          priceRange: 1500,
          priceRangePercent: 11.1
        },
        {
          sanphamId: "sp-3",
          sanphamTitle: "C\xE0 chua",
          banggiaPrice: {
            "bg-1": 9200,
            "bg-2": 8500,
            "bg-3": 9e3
          },
          minPrice: 8500,
          maxPrice: 9200,
          avgPrice: 8900,
          priceRange: 700,
          priceRangePercent: 8.2
        }
      ];
      this.priceComparisons.set(mockComparisons);
    });
  }
  loadHistoricalData() {
    return __async(this, null, function* () {
      const mockData = {
        "sp-1": this.generateMockHistoricalData(1e4, 30),
        "sp-2": this.generateMockHistoricalData(14e3, 30),
        "sp-3": this.generateMockHistoricalData(8500, 30)
      };
      this.historicalData.set(mockData);
    });
  }
  generateMockHistoricalData(basePrice, days) {
    const data = [];
    let price = basePrice;
    for (let i = days; i >= 0; i--) {
      const date = /* @__PURE__ */ new Date();
      date.setDate(date.getDate() - i);
      price += (Math.random() - 0.5) * 500;
      data.push({
        date,
        price: Math.round(price)
      });
    }
    return data;
  }
  loadTrendPredictions() {
    return __async(this, null, function* () {
      const mockPredictions = [
        {
          sanphamId: "sp-1",
          sanphamTitle: "Rau xanh",
          currentPrice: 12e3,
          predictedPrice30Days: 12500,
          predictedPrice60Days: 13e3,
          predictedPrice90Days: 13200,
          trend: "increasing",
          confidence: 85
        },
        {
          sanphamId: "sp-2",
          sanphamTitle: "Rau c\u1EA3i",
          currentPrice: 15e3,
          predictedPrice30Days: 14800,
          predictedPrice60Days: 14500,
          predictedPrice90Days: 14300,
          trend: "decreasing",
          confidence: 72
        },
        {
          sanphamId: "sp-3",
          sanphamTitle: "C\xE0 chua",
          currentPrice: 9200,
          predictedPrice30Days: 9150,
          predictedPrice60Days: 9200,
          predictedPrice90Days: 9250,
          trend: "stable",
          confidence: 68
        }
      ];
      this.trendPredictions.set(mockPredictions);
    });
  }
  updateDisplayColumns() {
    const columns = ["sanphamTitle"];
    this.selectedBanggiaIds().forEach((id) => {
      columns.push(`price_${id}`);
    });
    columns.push("minPrice", "maxPrice", "avgPrice", "priceRange", "actions");
    this.displayedColumns.set(columns);
  }
  toggleBanggiaSelection(banggiaId, checked) {
    if (checked) {
      this.selectedBanggiaIds.update((ids) => [...ids, banggiaId]);
    } else {
      this.selectedBanggiaIds.update((ids) => ids.filter((id) => id !== banggiaId));
    }
    this.onBanggiaSelectionChange();
  }
  onBanggiaSelectionChange() {
    this.updateDisplayColumns();
    this.loadComparisons();
  }
  onSanphamSelectionChange() {
    this.loadComparisons();
  }
  getBanggiaTitle(banggiaId) {
    return this.banggiaList().find((b) => b.id === banggiaId)?.title || banggiaId;
  }
  getBanggiaColor(banggiaId) {
    return this.banggiaList().find((b) => b.id === banggiaId)?.color || "#666";
  }
  getPriceComparisonClass(price, comparison) {
    if (price === comparison.minPrice)
      return "lowest-price";
    if (price === comparison.maxPrice)
      return "highest-price";
    return "";
  }
  getTrendIcon(trend) {
    switch (trend) {
      case "increasing":
        return "trending_up";
      case "decreasing":
        return "trending_down";
      case "stable":
        return "trending_flat";
      default:
        return "remove";
    }
  }
  getTrendClass(trend) {
    switch (trend) {
      case "increasing":
        return "trend-up";
      case "decreasing":
        return "trend-down";
      case "stable":
        return "trend-stable";
      default:
        return "";
    }
  }
  showHistoricalChart(sanphamId) {
    this.selectedProductForChart.set(sanphamId);
    console.log("Show chart for:", sanphamId);
  }
  exportComparison() {
    console.log("Exporting comparison...");
  }
  formatCurrency(value) {
    return new Intl.NumberFormat("vi-VN", {
      style: "currency",
      currency: "VND"
    }).format(value);
  }
  formatPercent(value) {
    return `${value.toFixed(1)}%`;
  }
  static \u0275fac = function PriceComparisonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceComparisonComponent)(\u0275\u0275directiveInject(GraphqlService));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PriceComparisonComponent, selectors: [["app-price-comparison"]], decls: 99, vars: 12, consts: [[1, "price-comparison-container"], [1, "header-card"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "filters-card"], [1, "filter-section"], [1, "banggia-selection"], [3, "checked", "change", 4, "ngFor", "ngForOf"], ["appearance", "outline", 1, "full-width"], ["multiple", "", 3, "ngModelChange", "ngModel"], [3, "value", 4, "ngFor", "ngForOf"], ["mat-tab-label", ""], [1, "table-card"], [1, "table-container"], ["mat-table", "", 1, "comparison-table", 3, "dataSource"], ["matColumnDef", "sanphamTitle"], ["mat-header-cell", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], [3, "matColumnDef", 4, "ngFor", "ngForOf"], ["matColumnDef", "minPrice"], ["matColumnDef", "maxPrice"], ["matColumnDef", "avgPrice"], ["matColumnDef", "priceRange"], ["matColumnDef", "actions"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], [1, "legend"], [1, "legend-item"], [1, "color-box", "lowest"], [1, "color-box", "highest"], [1, "info-box"], ["mat-table", "", 1, "trend-table", 3, "dataSource"], ["matColumnDef", "currentPrice"], ["matColumnDef", "predicted30"], ["matColumnDef", "predicted60"], ["matColumnDef", "predicted90"], ["matColumnDef", "trend"], ["matColumnDef", "confidence"], [3, "change", "checked"], [1, "banggia-checkbox-label"], [3, "value"], ["mat-header-cell", ""], ["mat-cell", ""], [3, "matColumnDef"], ["mat-header-cell", "", 3, "color", 4, "matHeaderCellDef"], [1, "min-chip"], [1, "max-chip"], [1, "price-range-cell"], [1, "range-amount"], ["mat-icon-button", "", "matTooltip", "Xem bi\u1EC3u \u0111\u1ED3 l\u1ECBch s\u1EED", 3, "click"], ["mat-header-row", ""], ["mat-row", ""], [1, "confidence-bar"], [1, "confidence-fill"], [1, "confidence-text"]], template: function PriceComparisonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "mat-card", 1)(2, "mat-card-header")(3, "mat-card-title")(4, "mat-icon");
      \u0275\u0275text(5, "compare");
      \u0275\u0275elementEnd();
      \u0275\u0275text(6, " So S\xE1nh Gi\xE1 & D\u1EF1 \u0110o\xE1n Xu H\u01B0\u1EDBng ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 2);
      \u0275\u0275listener("click", function PriceComparisonComponent_Template_button_click_7_listener() {
        return ctx.exportComparison();
      });
      \u0275\u0275elementStart(8, "mat-icon");
      \u0275\u0275text(9, "file_download");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10, " Xu\u1EA5t b\xE1o c\xE1o ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "mat-card", 3)(12, "mat-card-content")(13, "div", 4)(14, "h3")(15, "mat-icon");
      \u0275\u0275text(16, "list");
      \u0275\u0275elementEnd();
      \u0275\u0275text(17, " Ch\u1ECDn b\u1EA3ng gi\xE1 \u0111\u1EC3 so s\xE1nh ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 5);
      \u0275\u0275template(19, PriceComparisonComponent_mat_checkbox_19_Template, 3, 4, "mat-checkbox", 6);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(20, "div", 4)(21, "h3")(22, "mat-icon");
      \u0275\u0275text(23, "inventory");
      \u0275\u0275elementEnd();
      \u0275\u0275text(24, " Ch\u1ECDn s\u1EA3n ph\u1EA9m ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "mat-form-field", 7)(26, "mat-label");
      \u0275\u0275text(27, "S\u1EA3n ph\u1EA9m");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-select", 8);
      \u0275\u0275twoWayListener("ngModelChange", function PriceComparisonComponent_Template_mat_select_ngModelChange_28_listener($event) {
        \u0275\u0275twoWayBindingSet(ctx.selectedSanphamIds, $event) || (ctx.selectedSanphamIds = $event);
        return $event;
      });
      \u0275\u0275listener("ngModelChange", function PriceComparisonComponent_Template_mat_select_ngModelChange_28_listener() {
        return ctx.onSanphamSelectionChange();
      });
      \u0275\u0275template(29, PriceComparisonComponent_mat_option_29_Template, 2, 2, "mat-option", 9);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(30, "mat-tab-group")(31, "mat-tab");
      \u0275\u0275template(32, PriceComparisonComponent_ng_template_32_Template, 3, 0, "ng-template", 10);
      \u0275\u0275elementStart(33, "mat-card", 11)(34, "mat-card-content")(35, "div", 12)(36, "table", 13);
      \u0275\u0275elementContainerStart(37, 14);
      \u0275\u0275template(38, PriceComparisonComponent_th_38_Template, 2, 0, "th", 15)(39, PriceComparisonComponent_td_39_Template, 3, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(40, PriceComparisonComponent_ng_container_40_Template, 3, 1, "ng-container", 17);
      \u0275\u0275elementContainerStart(41, 18);
      \u0275\u0275template(42, PriceComparisonComponent_th_42_Template, 2, 0, "th", 15)(43, PriceComparisonComponent_td_43_Template, 3, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(44, 19);
      \u0275\u0275template(45, PriceComparisonComponent_th_45_Template, 2, 0, "th", 15)(46, PriceComparisonComponent_td_46_Template, 3, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(47, 20);
      \u0275\u0275template(48, PriceComparisonComponent_th_48_Template, 2, 0, "th", 15)(49, PriceComparisonComponent_td_49_Template, 2, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(50, 21);
      \u0275\u0275template(51, PriceComparisonComponent_th_51_Template, 2, 0, "th", 15)(52, PriceComparisonComponent_td_52_Template, 6, 4, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(53, 22);
      \u0275\u0275template(54, PriceComparisonComponent_th_54_Template, 2, 0, "th", 15)(55, PriceComparisonComponent_td_55_Template, 4, 0, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(56, PriceComparisonComponent_tr_56_Template, 1, 0, "tr", 23)(57, PriceComparisonComponent_tr_57_Template, 1, 0, "tr", 24);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(58, "div", 25)(59, "span", 26);
      \u0275\u0275element(60, "span", 27);
      \u0275\u0275text(61, " Gi\xE1 th\u1EA5p nh\u1EA5t ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "span", 26);
      \u0275\u0275element(63, "span", 28);
      \u0275\u0275text(64, " Gi\xE1 cao nh\u1EA5t ");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(65, "mat-tab");
      \u0275\u0275template(66, PriceComparisonComponent_ng_template_66_Template, 3, 0, "ng-template", 10);
      \u0275\u0275elementStart(67, "mat-card", 11)(68, "mat-card-content")(69, "div", 29)(70, "mat-icon");
      \u0275\u0275text(71, "info");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(72, "span");
      \u0275\u0275text(73, "D\u1EF1 \u0111o\xE1n d\u1EF1a tr\xEAn ph\xE2n t\xEDch d\u1EEF li\u1EC7u l\u1ECBch s\u1EED v\xE0 xu h\u01B0\u1EDBng th\u1ECB tr\u01B0\u1EDDng. \u0110\u1ED9 tin c\u1EADy \u0111\u01B0\u1EE3c t\xEDnh to\xE1n d\u1EF1a tr\xEAn \u0111\u1ED9 \u1ED5n \u0111\u1ECBnh c\u1EE7a gi\xE1 trong qu\xE1 kh\u1EE9.");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(74, "div", 12)(75, "table", 30);
      \u0275\u0275elementContainerStart(76, 14);
      \u0275\u0275template(77, PriceComparisonComponent_th_77_Template, 2, 0, "th", 15)(78, PriceComparisonComponent_td_78_Template, 3, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(79, 31);
      \u0275\u0275template(80, PriceComparisonComponent_th_80_Template, 2, 0, "th", 15)(81, PriceComparisonComponent_td_81_Template, 3, 1, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(82, 32);
      \u0275\u0275template(83, PriceComparisonComponent_th_83_Template, 2, 0, "th", 15)(84, PriceComparisonComponent_td_84_Template, 3, 5, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(85, 33);
      \u0275\u0275template(86, PriceComparisonComponent_th_86_Template, 2, 0, "th", 15)(87, PriceComparisonComponent_td_87_Template, 3, 5, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(88, 34);
      \u0275\u0275template(89, PriceComparisonComponent_th_89_Template, 2, 0, "th", 15)(90, PriceComparisonComponent_td_90_Template, 3, 5, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(91, 35);
      \u0275\u0275template(92, PriceComparisonComponent_th_92_Template, 2, 0, "th", 15)(93, PriceComparisonComponent_td_93_Template, 5, 4, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275elementContainerStart(94, 36);
      \u0275\u0275template(95, PriceComparisonComponent_th_95_Template, 2, 0, "th", 15)(96, PriceComparisonComponent_td_96_Template, 5, 9, "td", 16);
      \u0275\u0275elementContainerEnd();
      \u0275\u0275template(97, PriceComparisonComponent_tr_97_Template, 1, 0, "tr", 23)(98, PriceComparisonComponent_tr_98_Template, 1, 0, "tr", 24);
      \u0275\u0275elementEnd()()()()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(19);
      \u0275\u0275property("ngForOf", ctx.banggiaList());
      \u0275\u0275advance(9);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedSanphamIds);
      \u0275\u0275advance();
      \u0275\u0275property("ngForOf", ctx.sanphamList());
      \u0275\u0275advance(7);
      \u0275\u0275property("dataSource", ctx.priceComparisons());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngForOf", ctx.selectedBanggiaIds());
      \u0275\u0275advance(16);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns());
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns());
      \u0275\u0275advance(18);
      \u0275\u0275property("dataSource", ctx.trendPredictions());
      \u0275\u0275advance(22);
      \u0275\u0275property("matHeaderRowDef", \u0275\u0275pureFunction0(10, _c0));
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", \u0275\u0275pureFunction0(11, _c0));
    }
  }, dependencies: [
    CommonModule,
    NgForOf,
    FormsModule,
    NgControlStatus,
    NgModel,
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
    MatSelectModule,
    MatFormField,
    MatLabel,
    MatSelect,
    MatOption,
    MatInputModule,
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
    MatTooltipModule,
    MatTooltip,
    MatTabsModule,
    MatTabLabel,
    MatTab,
    MatTabGroup,
    MatCheckboxModule,
    MatCheckbox
  ], styles: ["\n\n.price-comparison-container[_ngcontent-%COMP%] {\n  padding: 20px;\n  max-width: 1600px;\n  margin: 0 auto;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n  display: flex;\n  justify-content: space-between;\n  align-items: center;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 10px;\n  font-size: 24px;\n  color: #1976d2;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   mat-card-title[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 32px;\n  width: 32px;\n  height: 32px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 5px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]:last-child {\n  margin-bottom: 0;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  margin: 0 0 15px;\n  color: #333;\n  font-size: 16px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]   h3[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  font-size: 20px;\n  width: 20px;\n  height: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]   .banggia-selection[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]   .banggia-selection[_ngcontent-%COMP%]   mat-checkbox[_ngcontent-%COMP%]   .banggia-checkbox-label[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .filters-card[_ngcontent-%COMP%]   .filter-section[_ngcontent-%COMP%]   .full-width[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.price-comparison-container[_ngcontent-%COMP%]   mat-tab-group[_ngcontent-%COMP%] {\n  margin-bottom: 20px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .info-box[_ngcontent-%COMP%] {\n  background: #e3f2fd;\n  border-left: 4px solid #1976d2;\n  padding: 15px;\n  margin-bottom: 20px;\n  border-radius: 4px;\n  display: flex;\n  align-items: flex-start;\n  gap: 10px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .info-box[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #1976d2;\n  margin-top: 2px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .info-box[_ngcontent-%COMP%]   span[_ngcontent-%COMP%] {\n  color: #0d47a1;\n  line-height: 1.5;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%] {\n  overflow-x: auto;\n  max-height: 600px;\n  overflow-y: auto;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%] {\n  width: 100%;\n  min-width: 900px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  font-weight: 600;\n  color: #333;\n  padding: 12px;\n  white-space: nowrap;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 12px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .lowest-price[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .lowest-price[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-weight: 600;\n  padding: 4px 8px;\n  background: #e8f5e9;\n  border-radius: 4px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .highest-price[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .highest-price[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 600;\n  padding: 4px 8px;\n  background: #ffebee;\n  border-radius: 4px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip[_ngcontent-%COMP%] {\n  font-weight: 600;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip.min-chip[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip.min-chip[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip.max-chip[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip.max-chip[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip.high-range[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip.high-range[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip.medium-range[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip.medium-range[_ngcontent-%COMP%] {\n  background: #fff3e0;\n  color: #e65100;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   mat-chip.low-range[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   mat-chip.low-range[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .price-range-cell[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .price-range-cell[_ngcontent-%COMP%] {\n  display: flex;\n  flex-direction: column;\n  gap: 5px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .price-range-cell[_ngcontent-%COMP%]   .range-amount[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .price-range-cell[_ngcontent-%COMP%]   .range-amount[_ngcontent-%COMP%] {\n  font-weight: 500;\n  color: #666;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .price-up[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .price-up[_ngcontent-%COMP%] {\n  color: #c62828;\n  font-weight: 600;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .price-down[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .price-down[_ngcontent-%COMP%] {\n  color: #2e7d32;\n  font-weight: 600;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-up[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-up[_ngcontent-%COMP%] {\n  background: #ffebee;\n  color: #c62828;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-up[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-up[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #c62828;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-down[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-down[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  color: #2e7d32;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-down[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-down[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #2e7d32;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-stable[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-stable[_ngcontent-%COMP%] {\n  background: #f5f5f5;\n  color: #666;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .trend-stable[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .trend-stable[_ngcontent-%COMP%]   mat-icon[_ngcontent-%COMP%] {\n  color: #666;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%] {\n  position: relative;\n  width: 100%;\n  height: 24px;\n  background: #f5f5f5;\n  border-radius: 4px;\n  overflow: hidden;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill[_ngcontent-%COMP%] {\n  position: absolute;\n  height: 100%;\n  transition: width 0.3s ease;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.high[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.high[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #2e7d32 0%,\n      #4caf50 100%);\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.medium[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.medium[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #f57c00 0%,\n      #ff9800 100%);\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.low[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-fill.low[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      90deg,\n      #c62828 0%,\n      #f44336 100%);\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .comparison-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-text[_ngcontent-%COMP%], \n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .table-container[_ngcontent-%COMP%]   .trend-table[_ngcontent-%COMP%]   .confidence-bar[_ngcontent-%COMP%]   .confidence-text[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  height: 100%;\n  font-weight: 600;\n  font-size: 12px;\n  color: #333;\n  text-shadow: 0 0 2px rgba(255, 255, 255, 0.8);\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 20px;\n  margin-top: 15px;\n  padding-top: 15px;\n  border-top: 1px solid #e0e0e0;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  font-size: 14px;\n  color: #666;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .color-box[_ngcontent-%COMP%] {\n  width: 20px;\n  height: 20px;\n  border-radius: 4px;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .color-box.lowest[_ngcontent-%COMP%] {\n  background: #e8f5e9;\n  border: 2px solid #2e7d32;\n}\n.price-comparison-container[_ngcontent-%COMP%]   .table-card[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%]   .legend-item[_ngcontent-%COMP%]   .color-box.highest[_ngcontent-%COMP%] {\n  background: #ffebee;\n  border: 2px solid #c62828;\n}\n@media (max-width: 768px) {\n  .price-comparison-container[_ngcontent-%COMP%] {\n    padding: 10px;\n  }\n  .price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%] {\n    flex-direction: column;\n    align-items: flex-start !important;\n    gap: 15px;\n  }\n  .price-comparison-container[_ngcontent-%COMP%]   .header-card[_ngcontent-%COMP%]   mat-card-header[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n    width: 100%;\n  }\n  .price-comparison-container[_ngcontent-%COMP%]   .banggia-selection[_ngcontent-%COMP%] {\n    flex-direction: column !important;\n  }\n  .price-comparison-container[_ngcontent-%COMP%]   .legend[_ngcontent-%COMP%] {\n    flex-direction: column !important;\n    gap: 10px !important;\n  }\n}\n/*# sourceMappingURL=price-comparison.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PriceComparisonComponent, { className: "PriceComparisonComponent", filePath: "src/app/admin/banggia/price-comparison/price-comparison.component.ts", lineNumber: 63 });
})();
export {
  PriceComparisonComponent
};
//# sourceMappingURL=chunk-KF2LVJN7.js.map
