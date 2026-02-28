import './polyfills.server.mjs';
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-RT23KED7.mjs";
import {
  MatTab,
  MatTabContent,
  MatTabGroup,
  MatTabsModule
} from "./chunk-SLRFY45H.mjs";
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
  MatTableDataSource,
  MatTableModule
} from "./chunk-VF45CXPP.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HAGRL2CT.mjs";
import {
  environment
} from "./chunk-BKGWM7TB.mjs";
import {
  MatExpansionModule,
  MatExpansionPanel,
  MatExpansionPanelDescription,
  MatExpansionPanelHeader,
  MatExpansionPanelTitle
} from "./chunk-WTFWSASR.mjs";
import {
  MatSlideToggle,
  MatSlideToggleModule
} from "./chunk-6GML6PCL.mjs";
import {
  MatChip,
  MatChipsModule
} from "./chunk-UMQUK2UX.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LPLDGY7B.mjs";
import {
  MatDialog,
  MatDialogActions,
  MatDialogContent,
  MatDialogModule
} from "./chunk-E2GALVII.mjs";
import {
  MatSelect,
  MatSelectModule
} from "./chunk-GDGUHJEW.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-UCMTPX2K.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatHint,
  MatLabel,
  NgControlStatus,
  NgModel,
  NumberValueAccessor
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatCard,
  MatCardContent,
  MatCardHeader,
  MatCardModule,
  MatCardSubtitle,
  MatCardTitle
} from "./chunk-CVXRITNT.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar,
  MatSnackBarModule
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  MatOption
} from "./chunk-KWDBPYQT.mjs";
import "./chunk-7GASYLAT.mjs";
import {
  HttpClient,
  HttpParams
} from "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule,
  JsonPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  interval,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMap,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵinject,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind1,
  ɵɵproperty,
  ɵɵqueryRefresh,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6NXY6CBU.mjs";
import "./chunk-QS2IQGEQ.mjs";
import "./chunk-FMEBT56H.mjs";

// src/app/shared/services/performance.service.ts
var API_URL = environment.APIURL;
var PerformanceService = class _PerformanceService {
  http;
  baseUrl = `${API_URL}/performance`;
  constructor(http) {
    this.http = http;
  }
  // Lấy real-time stats từ memory
  getRealTimeStats() {
    return this.http.get(`${this.baseUrl}/stats`);
  }
  // Lấy database stats với filtering
  getDatabaseStats(hours = 24) {
    const params = new HttpParams().set("hours", hours.toString());
    return this.http.get(`${this.baseUrl}/db-stats`, { params });
  }
  // Lấy filtered logs
  getLogs(filter = {}) {
    let params = new HttpParams();
    if (filter.limit)
      params = params.set("limit", filter.limit.toString());
    if (filter.offset)
      params = params.set("offset", filter.offset.toString());
    if (filter.operation)
      params = params.set("operation", filter.operation);
    if (filter.success !== void 0)
      params = params.set("success", filter.success.toString());
    if (filter.minDuration)
      params = params.set("minDuration", filter.minDuration.toString());
    if (filter.hours)
      params = params.set("hours", filter.hours.toString());
    return this.http.get(`${this.baseUrl}/logs`, { params });
  }
  // Lấy performance trends
  getTrends(hours = 24) {
    const params = new HttpParams().set("hours", hours.toString());
    return this.http.get(`${this.baseUrl}/trends`, { params });
  }
  // Lấy summary dashboard
  getSummary(hours = 24) {
    const params = new HttpParams().set("hours", hours.toString());
    return this.http.get(`${this.baseUrl}/summary`, { params });
  }
  // Cleanup old logs
  cleanupLogs(days = 30) {
    const params = new HttpParams().set("days", days.toString());
    return this.http.get(`${this.baseUrl}/cleanup`, { params });
  }
  // Clear memory metrics
  clearMemoryMetrics() {
    return this.http.get(`${this.baseUrl}/clear`);
  }
  // Test endpoints
  testFastOperation() {
    return this.http.get(`${API_URL}/test-performance/fast`);
  }
  testSlowOperation() {
    return this.http.get(`${API_URL}/test-performance/slow`);
  }
  testErrorOperation() {
    return this.http.get(`${API_URL}/test-performance/error`);
  }
  testBulkOperations() {
    return this.http.post(`${API_URL}/test-performance/bulk`, {});
  }
  static \u0275fac = function PerformanceService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PerformanceService)(\u0275\u0275inject(HttpClient));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PerformanceService, factory: _PerformanceService.\u0275fac, providedIn: "root" });
};

// src/app/admin/performance/performance.component.ts
var _c0 = ["logDetailsModal"];
function PerformanceComponent_mat_card_25_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 31)(1, "mat-card-content", 32)(2, "mat-icon", 33);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.errorMessage);
  }
}
function PerformanceComponent_div_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 34);
    \u0275\u0275element(1, "mat-spinner", 35);
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_29_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "h2", 45)(2, "mat-icon", 46);
    \u0275\u0275text(3, "flash_on");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4, " Real-time Performance ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 47)(6, "mat-card", 48)(7, "mat-card-content", 49)(8, "div", 50);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 51);
    \u0275\u0275text(11, "Total Operations");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "mat-card", 52)(13, "mat-card-content", 49)(14, "div", 50);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 53);
    \u0275\u0275text(17, "Success Rate (5m)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-card", 54)(19, "mat-card-content", 49)(20, "div", 50);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 55);
    \u0275\u0275text(23, "Avg Response (5m)");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "mat-card", 56)(25, "mat-card-content", 49)(26, "div", 50);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 57);
    \u0275\u0275text(29, "Error Rate");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(9);
    \u0275\u0275textInterpolate(ctx_r1.summary.realTime.totalOperations);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx_r1.summary.realTime.recent == null ? null : ctx_r1.summary.realTime.recent.last5Minutes == null ? null : ctx_r1.summary.realTime.recent.last5Minutes.successRate) || "100%");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate((ctx_r1.summary.realTime.recent == null ? null : ctx_r1.summary.realTime.recent.last5Minutes == null ? null : ctx_r1.summary.realTime.recent.last5Minutes.averageResponseTime) || "0ms");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.summary.realTime.errorRate);
  }
}
function PerformanceComponent_ng_template_29_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 44)(1, "h2", 45)(2, "mat-icon", 58);
    \u0275\u0275text(3, "storage");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 47)(6, "mat-card", 59)(7, "mat-card-content", 49)(8, "div", 60);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "div", 61);
    \u0275\u0275text(11, "Total Operations");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(12, "mat-card", 59)(13, "mat-card-content", 49)(14, "div", 62);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "div", 61);
    \u0275\u0275text(17, "Success Rate");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(18, "mat-card", 59)(19, "mat-card-content", 49)(20, "div", 63);
    \u0275\u0275text(21);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "div", 61);
    \u0275\u0275text(23, "Avg Duration");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(24, "mat-card", 59)(25, "mat-card-content", 49)(26, "div", 64);
    \u0275\u0275text(27);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "div", 61);
    \u0275\u0275text(29, "Max Duration");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Historical Performance (", ctx_r1.dbStats.timeRange, ") ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.dbStats.overview.totalOperations);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.dbStats.overview.successRate);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.dbStats.overview.avgDuration);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.dbStats.overview.maxDuration);
  }
}
function PerformanceComponent_ng_template_29_div_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "mat-icon", 66);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No slow operations found");
    \u0275\u0275elementEnd()();
  }
}
function PerformanceComponent_ng_template_29_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "div", 70);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 71);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-chip", 72);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const op_r3 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(op_r3.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTimestamp(op_r3.timestamp));
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getDurationColor(op_r3.duration));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", op_r3.duration, " ");
  }
}
function PerformanceComponent_ng_template_29_div_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 65)(1, "mat-icon", 73);
    \u0275\u0275text(2, "verified");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p");
    \u0275\u0275text(4, "No recent errors");
    \u0275\u0275elementEnd()();
  }
}
function PerformanceComponent_ng_template_29_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 67)(1, "div", 68)(2, "div", 69)(3, "div", 74);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "div", 75);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "div", 76);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-chip", 77);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const error_r4 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(error_r4.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(error_r4.error);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTimestamp(error_r4.timestamp));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(error_r4.duration);
  }
}
function PerformanceComponent_ng_template_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36);
    \u0275\u0275template(1, PerformanceComponent_ng_template_29_div_1_Template, 30, 4, "div", 37)(2, PerformanceComponent_ng_template_29_div_2_Template, 30, 5, "div", 37);
    \u0275\u0275elementStart(3, "div", 38)(4, "mat-card")(5, "mat-card-header", 39)(6, "mat-card-title", 25)(7, "mat-icon", 40);
    \u0275\u0275text(8, "hourglass_bottom");
    \u0275\u0275elementEnd();
    \u0275\u0275text(9, " Slowest Operations ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "mat-card-content", 26);
    \u0275\u0275template(11, PerformanceComponent_ng_template_29_div_11_Template, 5, 0, "div", 41)(12, PerformanceComponent_ng_template_29_div_12_Template, 9, 4, "div", 42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-card")(14, "mat-card-header", 39)(15, "mat-card-title", 25)(16, "mat-icon", 43);
    \u0275\u0275text(17, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(18, " Recent Errors ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "mat-card-content", 26);
    \u0275\u0275template(20, PerformanceComponent_ng_template_29_div_20_Template, 5, 0, "div", 41)(21, PerformanceComponent_ng_template_29_div_21_Template, 11, 4, "div", 42);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.summary == null ? null : ctx_r1.summary.realTime);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dbStats);
    \u0275\u0275advance(9);
    \u0275\u0275property("ngIf", (ctx_r1.dbStats == null ? null : ctx_r1.dbStats.slowestOperations == null ? null : ctx_r1.dbStats.slowestOperations.length) === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.dbStats == null ? null : ctx_r1.dbStats.slowestOperations);
    \u0275\u0275advance(8);
    \u0275\u0275property("ngIf", (ctx_r1.dbStats == null ? null : ctx_r1.dbStats.recentErrors == null ? null : ctx_r1.dbStats.recentErrors.length) === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.dbStats == null ? null : ctx_r1.dbStats.recentErrors);
  }
}
function PerformanceComponent_ng_template_31_mat_form_field_19_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-form-field", 80)(1, "mat-label");
    \u0275\u0275text(2, "GraphQL Operation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_mat_form_field_19_Template_mat_select_ngModelChange_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedOperationType, $event) || (ctx_r1.selectedOperationType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PerformanceComponent_ng_template_31_mat_form_field_19_Template_mat_select_selectionChange_3_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementStart(4, "mat-option", 81);
    \u0275\u0275text(5, "All Operations");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-option", 124);
    \u0275\u0275text(7, "Query");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "mat-option", 125);
    \u0275\u0275text(9, "Mutation");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "mat-option", 126);
    \u0275\u0275text(11, "Subscription");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedOperationType);
  }
}
function PerformanceComponent_ng_template_31_th_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 127);
    \u0275\u0275text(1, "Timestamp");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r7 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatTimestamp(log_r7.timestamp), " ");
  }
}
function PerformanceComponent_ng_template_31_th_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 129);
    \u0275\u0275text(1, "Operation");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_104_mat_icon_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 135);
    \u0275\u0275text(1, " graphql ");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_104_mat_icon_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 136);
    \u0275\u0275text(1, " http ");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_104_div_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 137);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r8 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", ctx_r1.getOperationType(log_r8), " ", ctx_r1.getFieldName(log_r8), " ");
  }
}
function PerformanceComponent_ng_template_31_td_104_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 130)(1, "div", 25);
    \u0275\u0275template(2, PerformanceComponent_ng_template_31_td_104_mat_icon_2_Template, 2, 0, "mat-icon", 131)(3, PerformanceComponent_ng_template_31_td_104_mat_icon_3_Template, 2, 0, "mat-icon", 132);
    \u0275\u0275elementStart(4, "div")(5, "div", 133);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275template(7, PerformanceComponent_ng_template_31_td_104_div_7_Template, 2, 2, "div", 134);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const log_r8 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", ctx_r1.isGraphQLLog(log_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isGraphQLLog(log_r8));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getOperationName(log_r8));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.getOperationType(log_r8));
  }
}
function PerformanceComponent_ng_template_31_th_106_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 127);
    \u0275\u0275text(1, "Duration");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_107_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138)(1, "mat-chip", 139);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r9 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getDurationColor(log_r9.duration + "ms"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r9.duration.toFixed(2), "ms ");
  }
}
function PerformanceComponent_ng_template_31_th_109_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 140);
    \u0275\u0275text(1, "Status");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_110_mat_icon_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 145);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_110_mat_icon_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 146);
    \u0275\u0275text(1, "error");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_110_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 147);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r10 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r10.error, " ");
  }
}
function PerformanceComponent_ng_template_31_td_110_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138)(1, "div", 25)(2, "mat-chip", 141);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, PerformanceComponent_ng_template_31_td_110_mat_icon_4_Template, 2, 0, "mat-icon", 142)(5, PerformanceComponent_ng_template_31_td_110_mat_icon_5_Template, 2, 0, "mat-icon", 143);
    \u0275\u0275elementEnd();
    \u0275\u0275template(6, PerformanceComponent_ng_template_31_td_110_div_6_Template, 2, 1, "div", 144);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r10 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275property("color", log_r10.success ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r10.statusCode || (log_r10.success ? "200" : "ERROR"), " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", log_r10.success);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !log_r10.success);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !log_r10.success && log_r10.error);
  }
}
function PerformanceComponent_ng_template_31_th_112_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 127);
    \u0275\u0275text(1, "Type");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_113_mat_chip_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 150);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r11 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getOperationType(log_r11) || "GraphQL", " ");
  }
}
function PerformanceComponent_ng_template_31_td_113_mat_chip_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-chip", 151);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r11 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r11.method || "HTTP", " ");
  }
}
function PerformanceComponent_ng_template_31_td_113_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138);
    \u0275\u0275template(1, PerformanceComponent_ng_template_31_td_113_mat_chip_1_Template, 2, 1, "mat-chip", 148)(2, PerformanceComponent_ng_template_31_td_113_mat_chip_2_Template, 2, 1, "mat-chip", 149);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r11 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isGraphQLLog(log_r11));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isGraphQLLog(log_r11));
  }
}
function PerformanceComponent_ng_template_31_th_115_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 127);
    \u0275\u0275text(1, "Endpoint");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_116_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 128)(1, "div", 152);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r12 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("title", ctx_r1.getEndpointPath(log_r12));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getEndpointPath(log_r12), " ");
  }
}
function PerformanceComponent_ng_template_31_th_118_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 153);
    \u0275\u0275text(1, "Memory");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_119_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 156);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", log_r13.memoryUsage.toFixed(1), "MB ");
  }
}
function PerformanceComponent_ng_template_31_td_119_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 157);
    \u0275\u0275text(1, "-");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_119_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 128);
    \u0275\u0275template(1, PerformanceComponent_ng_template_31_td_119_span_1_Template, 2, 1, "span", 154)(2, PerformanceComponent_ng_template_31_td_119_span_2_Template, 2, 0, "span", 155);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const log_r13 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", log_r13.memoryUsage);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !log_r13.memoryUsage);
  }
}
function PerformanceComponent_ng_template_31_th_121_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Details");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_122_span_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 161);
    \u0275\u0275text(1, " Args ");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_td_122_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "td", 138)(1, "div", 25)(2, "button", 159);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_31_td_122_Template_button_click_2_listener() {
      const log_r15 = \u0275\u0275restoreView(_r14).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showLogDetails(log_r15));
    });
    \u0275\u0275elementStart(3, "mat-icon", 8);
    \u0275\u0275text(4, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275template(5, PerformanceComponent_ng_template_31_td_122_span_5_Template, 2, 0, "span", 160);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const log_r15 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275property("ngIf", ctx_r1.hasGraphQLArgs(log_r15));
  }
}
function PerformanceComponent_ng_template_31_tr_123_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 162);
  }
}
function PerformanceComponent_ng_template_31_tr_124_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 163);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_31_tr_124_Template_tr_click_0_listener() {
      const row_r17 = \u0275\u0275restoreView(_r16).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.showLogDetails(row_r17));
    });
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_31_div_125_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 164)(1, "mat-icon", 165);
    \u0275\u0275text(2, "list_alt");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 166);
    \u0275\u0275text(4, "No performance logs found");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 8);
    \u0275\u0275text(6, "Try adjusting your filters or time range");
    \u0275\u0275elementEnd()();
  }
}
function PerformanceComponent_ng_template_31_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "mat-card", 78)(2, "mat-card-header")(3, "mat-card-title", 25)(4, "mat-icon");
    \u0275\u0275text(5, "filter_list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Filters ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-card-content", 26)(8, "div", 79)(9, "mat-form-field", 80)(10, "mat-label");
    \u0275\u0275text(11, "Request Type");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_Template_mat_select_ngModelChange_12_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedRequestType, $event) || (ctx_r1.selectedRequestType = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PerformanceComponent_ng_template_31_Template_mat_select_selectionChange_12_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementStart(13, "mat-option", 81);
    \u0275\u0275text(14, "All Types");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "mat-option", 82);
    \u0275\u0275text(16, "GraphQL Only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "mat-option", 83);
    \u0275\u0275text(18, "HTTP Only");
    \u0275\u0275elementEnd()()();
    \u0275\u0275template(19, PerformanceComponent_ng_template_31_mat_form_field_19_Template, 12, 1, "mat-form-field", 84);
    \u0275\u0275elementStart(20, "mat-form-field", 80)(21, "mat-label");
    \u0275\u0275text(22, "Operation/Field Filter");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(23, "input", 85);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_Template_input_ngModelChange_23_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedOperation, $event) || (ctx_r1.selectedOperation = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PerformanceComponent_ng_template_31_Template_input_input_23_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "mat-hint");
    \u0275\u0275text(25, "Search by operation name or service");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "mat-form-field", 80)(27, "mat-label");
    \u0275\u0275text(28, "Success Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "mat-select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_Template_mat_select_ngModelChange_29_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.selectedSuccess, $event) || (ctx_r1.selectedSuccess = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PerformanceComponent_ng_template_31_Template_mat_select_selectionChange_29_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementStart(30, "mat-option", 81);
    \u0275\u0275text(31, "All Status");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(32, "mat-option", 86);
    \u0275\u0275text(33, "Success Only");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "mat-option", 87);
    \u0275\u0275text(35, "Errors Only");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(36, "mat-form-field", 80)(37, "mat-label");
    \u0275\u0275text(38, "Min Duration (ms)");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(39, "input", 88);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_Template_input_ngModelChange_39_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.minDuration, $event) || (ctx_r1.minDuration = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("input", function PerformanceComponent_ng_template_31_Template_input_input_39_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(40, "mat-hint");
    \u0275\u0275text(41, "Filter slow operations");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(42, "mat-form-field", 80)(43, "mat-label");
    \u0275\u0275text(44, "Results Limit");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(45, "mat-select", 10);
    \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_ng_template_31_Template_mat_select_ngModelChange_45_listener($event) {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.logLimit, $event) || (ctx_r1.logLimit = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275listener("selectionChange", function PerformanceComponent_ng_template_31_Template_mat_select_selectionChange_45_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.onFilterChange());
    });
    \u0275\u0275elementStart(46, "mat-option", 89);
    \u0275\u0275text(47, "25");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(48, "mat-option", 90);
    \u0275\u0275text(49, "50");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(50, "mat-option", 91);
    \u0275\u0275text(51, "100");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(52, "mat-option", 92);
    \u0275\u0275text(53, "200");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(54, "mat-option", 93);
    \u0275\u0275text(55, "500");
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(56, "div", 94)(57, "button", 30);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_31_Template_button_click_57_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadLogs());
    });
    \u0275\u0275elementStart(58, "mat-icon");
    \u0275\u0275text(59, "search");
    \u0275\u0275elementEnd();
    \u0275\u0275text(60, " Search Logs ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(61, "button", 95);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_31_Template_button_click_61_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.loadAllData());
    });
    \u0275\u0275elementStart(62, "mat-icon");
    \u0275\u0275text(63, "refresh");
    \u0275\u0275elementEnd();
    \u0275\u0275text(64, " Refresh All ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(65, "button", 29);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_31_Template_button_click_65_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.resetFilters());
    });
    \u0275\u0275elementStart(66, "mat-icon");
    \u0275\u0275text(67, "clear");
    \u0275\u0275elementEnd();
    \u0275\u0275text(68, " Clear Filters ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(69, "div", 96)(70, "div", 49)(71, "div", 97);
    \u0275\u0275text(72);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(73, "div", 98);
    \u0275\u0275text(74, "Total Logs");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(75, "div", 49)(76, "div", 99);
    \u0275\u0275text(77);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(78, "div", 98);
    \u0275\u0275text(79, "GraphQL");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(80, "div", 49)(81, "div", 100);
    \u0275\u0275text(82);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(83, "div", 98);
    \u0275\u0275text(84, "Successful");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(85, "div", 49)(86, "div", 101);
    \u0275\u0275text(87);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(88, "div", 98);
    \u0275\u0275text(89, "Avg Duration");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(90, "mat-card")(91, "mat-card-header")(92, "mat-card-title", 25)(93, "mat-icon");
    \u0275\u0275text(94, "list");
    \u0275\u0275elementEnd();
    \u0275\u0275text(95);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(96, "mat-card-content", 102)(97, "div", 103)(98, "table", 104);
    \u0275\u0275elementContainerStart(99, 105);
    \u0275\u0275template(100, PerformanceComponent_ng_template_31_th_100_Template, 2, 0, "th", 106)(101, PerformanceComponent_ng_template_31_td_101_Template, 2, 1, "td", 107);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(102, 108);
    \u0275\u0275template(103, PerformanceComponent_ng_template_31_th_103_Template, 2, 0, "th", 109)(104, PerformanceComponent_ng_template_31_td_104_Template, 8, 4, "td", 110);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(105, 111);
    \u0275\u0275template(106, PerformanceComponent_ng_template_31_th_106_Template, 2, 0, "th", 106)(107, PerformanceComponent_ng_template_31_td_107_Template, 3, 2, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(108, 113);
    \u0275\u0275template(109, PerformanceComponent_ng_template_31_th_109_Template, 2, 0, "th", 114)(110, PerformanceComponent_ng_template_31_td_110_Template, 7, 5, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(111, 115);
    \u0275\u0275template(112, PerformanceComponent_ng_template_31_th_112_Template, 2, 0, "th", 106)(113, PerformanceComponent_ng_template_31_td_113_Template, 3, 2, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(114, 116);
    \u0275\u0275template(115, PerformanceComponent_ng_template_31_th_115_Template, 2, 0, "th", 106)(116, PerformanceComponent_ng_template_31_td_116_Template, 3, 2, "td", 107);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(117, 117);
    \u0275\u0275template(118, PerformanceComponent_ng_template_31_th_118_Template, 2, 0, "th", 118)(119, PerformanceComponent_ng_template_31_td_119_Template, 3, 2, "td", 107);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(120, 119);
    \u0275\u0275template(121, PerformanceComponent_ng_template_31_th_121_Template, 2, 0, "th", 120)(122, PerformanceComponent_ng_template_31_td_122_Template, 6, 1, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(123, PerformanceComponent_ng_template_31_tr_123_Template, 1, 0, "tr", 121)(124, PerformanceComponent_ng_template_31_tr_124_Template, 1, 0, "tr", 122);
    \u0275\u0275elementEnd();
    \u0275\u0275template(125, PerformanceComponent_ng_template_31_div_125_Template, 7, 0, "div", 123);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(12);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedRequestType);
    \u0275\u0275advance(7);
    \u0275\u0275property("ngIf", ctx_r1.selectedRequestType === "all" || ctx_r1.selectedRequestType === "graphql");
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedOperation);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.selectedSuccess);
    \u0275\u0275advance(10);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.minDuration);
    \u0275\u0275advance(6);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.logLimit);
    \u0275\u0275advance(27);
    \u0275\u0275textInterpolate(ctx_r1.logs.length);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getGraphQLLogsCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getSuccessfulLogsCount());
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("", ctx_r1.getAverageDuration(), "ms");
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate1(" Performance Logs (", ctx_r1.logs.length, ") ");
    \u0275\u0275advance(3);
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance(25);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.dataSource.data.length === 0);
  }
}
function PerformanceComponent_ng_template_33_th_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Hour");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trend_r18 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatTimestamp(trend_r18.hour), " ");
  }
}
function PerformanceComponent_ng_template_33_th_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Total Operations");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 130);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trend_r19 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trend_r19.totalOperations, " ");
  }
}
function PerformanceComponent_ng_template_33_th_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Avg Duration");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138)(1, "mat-chip", 139);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trend_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getDurationColor(trend_r20.avgDuration));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trend_r20.avgDuration, " ");
  }
}
function PerformanceComponent_ng_template_33_th_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Max Duration");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138)(1, "mat-chip", 139);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trend_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngClass", ctx_r1.getDurationColor(trend_r21.maxDuration));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trend_r21.maxDuration, " ");
  }
}
function PerformanceComponent_ng_template_33_th_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Error Count");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 138)(1, "mat-chip", 175);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const trend_r22 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275property("color", trend_r22.errorCount > 0 ? "warn" : "primary");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trend_r22.errorCount, " ");
  }
}
function PerformanceComponent_ng_template_33_th_26_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 158);
    \u0275\u0275text(1, "Error Rate");
    \u0275\u0275elementEnd();
  }
}
function PerformanceComponent_ng_template_33_td_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 128);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const trend_r23 = ctx.$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", trend_r23.errorRate, " ");
  }
}
function PerformanceComponent_ng_template_33_tr_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 162);
  }
}
function PerformanceComponent_ng_template_33_tr_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 176);
  }
}
function PerformanceComponent_ng_template_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 36)(1, "mat-card")(2, "mat-card-header")(3, "mat-card-title", 25)(4, "mat-icon");
    \u0275\u0275text(5, "trending_up");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Performance Trends ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-card-content", 102)(8, "div", 103)(9, "table", 167);
    \u0275\u0275elementContainerStart(10, 168);
    \u0275\u0275template(11, PerformanceComponent_ng_template_33_th_11_Template, 2, 0, "th", 120)(12, PerformanceComponent_ng_template_33_td_12_Template, 2, 1, "td", 107);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(13, 169);
    \u0275\u0275template(14, PerformanceComponent_ng_template_33_th_14_Template, 2, 0, "th", 120)(15, PerformanceComponent_ng_template_33_td_15_Template, 2, 1, "td", 110);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(16, 170);
    \u0275\u0275template(17, PerformanceComponent_ng_template_33_th_17_Template, 2, 0, "th", 120)(18, PerformanceComponent_ng_template_33_td_18_Template, 3, 2, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(19, 171);
    \u0275\u0275template(20, PerformanceComponent_ng_template_33_th_20_Template, 2, 0, "th", 120)(21, PerformanceComponent_ng_template_33_td_21_Template, 3, 2, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(22, 172);
    \u0275\u0275template(23, PerformanceComponent_ng_template_33_th_23_Template, 2, 0, "th", 120)(24, PerformanceComponent_ng_template_33_td_24_Template, 3, 2, "td", 112);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275elementContainerStart(25, 173);
    \u0275\u0275template(26, PerformanceComponent_ng_template_33_th_26_Template, 2, 0, "th", 120)(27, PerformanceComponent_ng_template_33_td_27_Template, 2, 1, "td", 107);
    \u0275\u0275elementContainerEnd();
    \u0275\u0275template(28, PerformanceComponent_ng_template_33_tr_28_Template, 1, 0, "tr", 121)(29, PerformanceComponent_ng_template_33_tr_29_Template, 1, 0, "tr", 174);
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(9);
    \u0275\u0275property("dataSource", ctx_r1.trends);
    \u0275\u0275advance(19);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedTrendColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedTrendColumns);
  }
}
function PerformanceComponent_ng_template_35_div_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 186)(1, "mat-icon", 165);
    \u0275\u0275text(2, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 166);
    \u0275\u0275text(4, "No test results yet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 8);
    \u0275\u0275text(6, "Run some tests above to see results");
    \u0275\u0275elementEnd()();
  }
}
function PerformanceComponent_ng_template_35_mat_expansion_panel_43_div_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 192)(1, "div", 193)(2, "mat-icon", 8);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 133);
    \u0275\u0275text(5, "Error:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "p", 194);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r25 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(result_r25.error);
  }
}
function PerformanceComponent_ng_template_35_mat_expansion_panel_43_div_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 195)(1, "div", 196)(2, "mat-icon", 8);
    \u0275\u0275text(3, "code");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 133);
    \u0275\u0275text(5, "Result:");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "pre", 197);
    \u0275\u0275text(7);
    \u0275\u0275pipe(8, "json");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r25 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(8, 1, result_r25.result));
  }
}
function PerformanceComponent_ng_template_35_mat_expansion_panel_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-expansion-panel", 187)(1, "mat-expansion-panel-header")(2, "mat-panel-title", 3)(3, "mat-icon");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 188);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-chip", 175);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-panel-description");
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(11, "div", 189);
    \u0275\u0275template(12, PerformanceComponent_ng_template_35_mat_expansion_panel_43_div_12_Template, 8, 1, "div", 190)(13, PerformanceComponent_ng_template_35_mat_expansion_panel_43_div_13_Template, 9, 3, "div", 191);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const result_r25 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(3);
    \u0275\u0275classMap(result_r25.success ? "text-green-600" : "text-red-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", result_r25.success ? "check_circle" : "error", " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("", result_r25.type, " Test");
    \u0275\u0275advance();
    \u0275\u0275property("color", result_r25.success ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(result_r25.duration);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.formatTimestamp(result_r25.timestamp), " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngIf", result_r25.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", result_r25.result);
  }
}
function PerformanceComponent_ng_template_35_Template(rf, ctx) {
  if (rf & 1) {
    const _r24 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 36)(1, "mat-card", 78)(2, "mat-card-header")(3, "mat-card-title", 25)(4, "mat-icon");
    \u0275\u0275text(5, "science");
    \u0275\u0275elementEnd();
    \u0275\u0275text(6, " Test Operations ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "mat-card-subtitle");
    \u0275\u0275text(8, "Use these operations to test the performance logging system");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "mat-card-content", 26)(10, "div", 47)(11, "button", 177);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_35_Template_button_click_11_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest("fast"));
    });
    \u0275\u0275elementStart(12, "mat-icon", 178);
    \u0275\u0275text(13, "flash_on");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span");
    \u0275\u0275text(15, "Test Fast (~100ms)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(16, "button", 179);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_35_Template_button_click_16_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest("slow"));
    });
    \u0275\u0275elementStart(17, "mat-icon", 178);
    \u0275\u0275text(18, "hourglass_bottom");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "span");
    \u0275\u0275text(20, "Test Slow (~2000ms)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(21, "button", 180);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_35_Template_button_click_21_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest("error"));
    });
    \u0275\u0275elementStart(22, "mat-icon", 178);
    \u0275\u0275text(23, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span");
    \u0275\u0275text(25, "Test Error");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(26, "button", 181);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_35_Template_button_click_26_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.runTest("bulk"));
    });
    \u0275\u0275elementStart(27, "mat-icon", 178);
    \u0275\u0275text(28, "layers");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "span");
    \u0275\u0275text(30, "Test Bulk (10 ops)");
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(31, "mat-card")(32, "mat-card-header", 182)(33, "mat-card-title", 25)(34, "mat-icon");
    \u0275\u0275text(35, "assignment_turned_in");
    \u0275\u0275elementEnd();
    \u0275\u0275text(36, " Test Results ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(37, "button", 183);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_35_Template_button_click_37_listener() {
      \u0275\u0275restoreView(_r24);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.testResults = []);
    });
    \u0275\u0275elementStart(38, "mat-icon");
    \u0275\u0275text(39, "clear_all");
    \u0275\u0275elementEnd();
    \u0275\u0275text(40, " Clear Results ");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "mat-card-content", 26);
    \u0275\u0275template(42, PerformanceComponent_ng_template_35_div_42_Template, 7, 0, "div", 184)(43, PerformanceComponent_ng_template_35_mat_expansion_panel_43_Template, 14, 9, "mat-expansion-panel", 185);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(42);
    \u0275\u0275property("ngIf", ctx_r1.testResults.length === 0);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.testResults);
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_div_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 215)(1, "span", 133);
    \u0275\u0275text(2, "Method:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 151);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.selectedLog.method || "Unknown");
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_div_37_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 215)(1, "span", 133);
    \u0275\u0275text(2, "Operation:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-chip", 150);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.getOperationType(ctx_r1.selectedLog));
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_card_69_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card", 222)(1, "mat-card-header")(2, "mat-card-title", 223);
    \u0275\u0275text(3, "Error Details");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "pre", 224);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(ctx_r1.selectedLog.error);
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_70_mat_card_24_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-card")(1, "mat-card-header")(2, "mat-card-title");
    \u0275\u0275text(3, "Arguments");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "mat-card-content")(5, "pre", 227);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "json");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(4);
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(7, 1, ctx_r1.getGraphQLArgs(ctx_r1.selectedLog)));
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab", 225)(1, "div", 212)(2, "div", 38)(3, "mat-card")(4, "mat-card-header")(5, "mat-card-title");
    \u0275\u0275text(6, "Operation Details");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "mat-card-content")(8, "div", 214)(9, "div", 215)(10, "span", 133);
    \u0275\u0275text(11, "Operation Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "mat-chip", 150);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(14, "div", 215)(15, "span", 133);
    \u0275\u0275text(16, "Field Name:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "code", 216);
    \u0275\u0275text(18);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 215)(20, "span", 133);
    \u0275\u0275text(21, "Parent Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span");
    \u0275\u0275text(23);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275template(24, PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_70_mat_card_24_Template, 8, 3, "mat-card", 226);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(13);
    \u0275\u0275textInterpolate(ctx_r1.getOperationType(ctx_r1.selectedLog));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getFieldName(ctx_r1.selectedLog));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getParentType(ctx_r1.selectedLog));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.hasGraphQLArgs(ctx_r1.selectedLog));
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-tab", 228)(1, "div", 212)(2, "mat-card")(3, "mat-card-header")(4, "mat-card-title");
    \u0275\u0275text(5, "Request Context");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-card-content")(7, "pre", 229);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "json");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(8);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind1(9, 1, ctx_r1.selectedLog.context));
  }
}
function PerformanceComponent_ng_template_59_mat_dialog_content_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content", 102)(1, "div", 203)(2, "div", 204)(3, "div", 3)(4, "mat-icon", 205);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div")(7, "h2", 206);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "p", 51);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 207)(12, "div", 208);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "mat-chip", 209);
    \u0275\u0275text(15);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(16, "mat-tab-group", 210)(17, "mat-tab", 211)(18, "div", 212)(19, "div", 213)(20, "mat-card")(21, "mat-card-header")(22, "mat-card-title");
    \u0275\u0275text(23, "Request Information");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(24, "mat-card-content")(25, "div", 214)(26, "div", 215)(27, "span", 133);
    \u0275\u0275text(28, "Request ID:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "code", 216);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(31, "div", 215)(32, "span", 133);
    \u0275\u0275text(33, "Type:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "span");
    \u0275\u0275text(35);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(36, PerformanceComponent_ng_template_59_mat_dialog_content_1_div_36_Template, 5, 1, "div", 217)(37, PerformanceComponent_ng_template_59_mat_dialog_content_1_div_37_Template, 5, 1, "div", 217);
    \u0275\u0275elementStart(38, "div", 215)(39, "span", 133);
    \u0275\u0275text(40, "Status Code:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(41, "span");
    \u0275\u0275text(42);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(43, "div", 215)(44, "span", 133);
    \u0275\u0275text(45, "Endpoint:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(46, "code", 218);
    \u0275\u0275text(47);
    \u0275\u0275elementEnd()()()()();
    \u0275\u0275elementStart(48, "mat-card")(49, "mat-card-header")(50, "mat-card-title");
    \u0275\u0275text(51, "Performance Metrics");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(52, "mat-card-content")(53, "div", 214)(54, "div", 182)(55, "span", 133);
    \u0275\u0275text(56, "Duration:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(57, "mat-chip", 139);
    \u0275\u0275text(58);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(59, "div", 215)(60, "span", 133);
    \u0275\u0275text(61, "Memory Usage:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(62, "span");
    \u0275\u0275text(63);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(64, "div", 215)(65, "span", 133);
    \u0275\u0275text(66, "Success:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(67, "mat-icon");
    \u0275\u0275text(68);
    \u0275\u0275elementEnd()()()()()();
    \u0275\u0275template(69, PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_card_69_Template, 7, 1, "mat-card", 219);
    \u0275\u0275elementEnd()();
    \u0275\u0275template(70, PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_70_Template, 25, 4, "mat-tab", 220)(71, PerformanceComponent_ng_template_59_mat_dialog_content_1_mat_tab_71_Template, 10, 3, "mat-tab", 221);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r1.isGraphQLLog(ctx_r1.selectedLog) ? "graphql" : "http", " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(ctx_r1.getOperationName(ctx_r1.selectedLog));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.formatTimestamp(ctx_r1.selectedLog.timestamp));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("", ctx_r1.selectedLog.duration.toFixed(2), "ms");
    \u0275\u0275advance();
    \u0275\u0275property("color", ctx_r1.selectedLog.success ? "primary" : "warn");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedLog.success ? "SUCCESS" : "ERROR", " ");
    \u0275\u0275advance(15);
    \u0275\u0275textInterpolate(ctx_r1.selectedLog.id || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.isGraphQLLog(ctx_r1.selectedLog) ? "GraphQL" : "HTTP");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.isGraphQLLog(ctx_r1.selectedLog));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isGraphQLLog(ctx_r1.selectedLog));
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedLog.statusCode || "N/A");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.getEndpointPath(ctx_r1.selectedLog));
    \u0275\u0275advance(10);
    \u0275\u0275property("ngClass", ctx_r1.getDurationColor(ctx_r1.selectedLog.duration + "ms"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedLog.duration.toFixed(2), "ms ");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.selectedLog.memoryUsage ? ctx_r1.selectedLog.memoryUsage.toFixed(1) + "MB" : "N/A");
    \u0275\u0275advance(4);
    \u0275\u0275classMap(ctx_r1.selectedLog.success ? "text-green-600" : "text-red-600");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.selectedLog.success ? "check_circle" : "error", " ");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.selectedLog.success && ctx_r1.selectedLog.error);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.isGraphQLLog(ctx_r1.selectedLog));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedLog.context);
  }
}
function PerformanceComponent_ng_template_59_Template(rf, ctx) {
  if (rf & 1) {
    const _r26 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 198);
    \u0275\u0275template(1, PerformanceComponent_ng_template_59_mat_dialog_content_1_Template, 72, 21, "mat-dialog-content", 199);
    \u0275\u0275elementStart(2, "mat-dialog-actions", 200)(3, "button", 201);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_59_Template_button_click_3_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.closeLogDetails());
    });
    \u0275\u0275text(4, "Close");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "button", 202);
    \u0275\u0275listener("click", function PerformanceComponent_ng_template_59_Template_button_click_5_listener() {
      \u0275\u0275restoreView(_r26);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.copyLogDetails());
    });
    \u0275\u0275elementStart(6, "mat-icon");
    \u0275\u0275text(7, "content_copy");
    \u0275\u0275elementEnd();
    \u0275\u0275text(8, " Copy Details ");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.selectedLog);
  }
}
var PerformanceComponent = class _PerformanceComponent {
  performanceService;
  snackBar;
  dialog;
  // Data properties
  summary = null;
  dbStats = null;
  logs = [];
  dataSource = new MatTableDataSource([]);
  trends = [];
  selectedLog = null;
  // Filter properties
  selectedHours = 24;
  selectedOperation = "";
  selectedSuccess = "all";
  selectedOperationType = "all";
  selectedRequestType = "all";
  // 'all', 'graphql', 'http'
  minDuration = null;
  logLimit = 50;
  // UI state
  activeTab = "dashboard";
  isLoading = false;
  errorMessage = "";
  autoRefresh = false;
  refreshInterval = null;
  // Test results
  testResults = [];
  // Modal template reference
  logDetailsModalTemplate;
  // Sort reference
  sort;
  // Table columns
  displayedColumns = ["timestamp", "operation", "duration", "status", "method", "url", "memory", "context"];
  displayedTrendColumns = ["hour", "totalOperations", "avgDuration", "maxDuration", "errorCount", "errorRate"];
  constructor(performanceService, snackBar, dialog) {
    this.performanceService = performanceService;
    this.snackBar = snackBar;
    this.dialog = dialog;
  }
  ngOnInit() {
    this.loadAllData();
  }
  ngAfterViewInit() {
    this.dataSource.sortingDataAccessor = (item, property) => {
      switch (property) {
        case "operation":
          return this.getOperationName(item);
        case "status":
          return item.success;
        case "memory":
          return item.memoryUsage || 0;
        case "duration":
          return item.duration;
        case "timestamp":
          return new Date(item.timestamp).getTime();
        case "method":
          return this.isGraphQLLog(item) ? this.getOperationType(item) : item.method;
        case "url":
          return this.getEndpointPath(item);
        default:
          return item[property];
      }
    };
    this.dataSource.sort = this.sort;
    if (this.dataSource.data.length > 0) {
      this.dataSource._updateChangeSubscription();
    }
  }
  ngOnDestroy() {
    if (this.refreshInterval) {
      this.refreshInterval.unsubscribe();
    }
  }
  loadAllData() {
    this.isLoading = true;
    this.errorMessage = "";
    this.performanceService.getSummary(this.selectedHours).subscribe({
      next: (data) => {
        this.summary = data;
      },
      error: (error) => {
        console.error("Error loading summary:", error);
        this.errorMessage = "Failed to load performance summary";
        this.showSnackBar("Failed to load performance summary", "error");
      }
    });
    this.performanceService.getDatabaseStats(this.selectedHours).subscribe({
      next: (data) => {
        this.dbStats = data;
      },
      error: (error) => {
        console.error("Error loading database stats:", error);
      }
    });
    this.performanceService.getTrends(this.selectedHours).subscribe({
      next: (data) => {
        this.trends = data;
      },
      error: (error) => {
        console.error("Error loading trends:", error);
      }
    });
    this.loadLogs();
    this.isLoading = false;
  }
  loadLogs() {
    const filter = {
      hours: this.selectedHours,
      limit: this.logLimit,
      operation: this.selectedOperation || void 0,
      success: this.selectedSuccess === "all" ? void 0 : this.selectedSuccess === "true",
      minDuration: this.minDuration || void 0,
      requestType: this.selectedRequestType === "all" ? void 0 : this.selectedRequestType,
      operationType: this.selectedOperationType === "all" ? void 0 : this.selectedOperationType
    };
    this.performanceService.getLogs(filter).subscribe({
      next: (data) => {
        let filteredData = data;
        if (this.selectedRequestType === "graphql") {
          filteredData = filteredData.filter((log) => this.isGraphQLLog(log));
        } else if (this.selectedRequestType === "http") {
          filteredData = filteredData.filter((log) => !this.isGraphQLLog(log));
        }
        if (this.selectedOperationType !== "all") {
          filteredData = filteredData.filter((log) => this.isGraphQLLog(log) && this.getOperationType(log).toLowerCase() === this.selectedOperationType);
        }
        this.logs = filteredData;
        this.dataSource.data = filteredData;
        if (this.sort) {
          this.dataSource.sort = this.sort;
        }
      },
      error: (error) => {
        console.error("Error loading logs:", error);
        this.showSnackBar("Error loading performance logs", "error");
      }
    });
  }
  onFilterChange() {
    this.loadLogs();
  }
  onHoursChange() {
    this.loadAllData();
  }
  toggleAutoRefresh() {
    if (this.autoRefresh) {
      this.refreshInterval = interval(3e4).subscribe(() => {
        this.loadAllData();
      });
    } else {
      if (this.refreshInterval) {
        this.refreshInterval.unsubscribe();
        this.refreshInterval = null;
      }
    }
  }
  // Test operations
  runTest(type) {
    let testObservable;
    switch (type) {
      case "fast":
        testObservable = this.performanceService.testFastOperation();
        break;
      case "slow":
        testObservable = this.performanceService.testSlowOperation();
        break;
      case "error":
        testObservable = this.performanceService.testErrorOperation();
        break;
      case "bulk":
        testObservable = this.performanceService.testBulkOperations();
        break;
      default:
        return;
    }
    const startTime = Date.now();
    testObservable.subscribe({
      next: (result) => {
        const duration = Date.now() - startTime;
        this.testResults.unshift({
          type,
          success: true,
          duration: duration + "ms",
          result,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
        setTimeout(() => this.loadAllData(), 1e3);
      },
      error: (error) => {
        const duration = Date.now() - startTime;
        this.testResults.unshift({
          type,
          success: false,
          duration: duration + "ms",
          error: error.message,
          timestamp: (/* @__PURE__ */ new Date()).toISOString()
        });
      }
    });
  }
  // Utility methods
  showSnackBar(message, type = "info") {
    const config = {
      duration: 3e3,
      panelClass: [`snack-${type}`]
    };
    this.snackBar.open(message, "Close", config);
  }
  getDurationColor(duration) {
    const ms = parseFloat(duration.replace("ms", ""));
    if (ms > 1e3)
      return "text-red-600 bg-red-100";
    if (ms > 500)
      return "text-orange-600 bg-orange-100";
    return "text-green-600 bg-green-100";
  }
  formatTimestamp(timestamp) {
    return new Date(timestamp).toLocaleString();
  }
  // Management operations
  cleanupLogs() {
    this.performanceService.cleanupLogs(30).subscribe({
      next: (result) => {
        this.showSnackBar(result.message, "success");
        this.loadAllData();
      },
      error: (error) => {
        this.showSnackBar("Error cleaning up logs: " + error.message, "error");
      }
    });
  }
  clearMemoryMetrics() {
    this.performanceService.clearMemoryMetrics().subscribe({
      next: (result) => {
        this.showSnackBar(result.message, "success");
        this.loadAllData();
      },
      error: (error) => {
        this.showSnackBar("Error clearing metrics: " + error.message, "error");
      }
    });
  }
  // GraphQL helper methods
  isGraphQLLog(log) {
    return log.context && (log.context.method === "GRAPHQL" || log.context.operation || log.context.fieldName || log.url?.includes("/graphql"));
  }
  getOperationName(log) {
    if (this.isGraphQLLog(log)) {
      return log.context?.fieldName || log.name || "GraphQL Operation";
    }
    return log.name || log.url || "HTTP Request";
  }
  getOperationType(log) {
    return log.context?.operation || "query";
  }
  getFieldName(log) {
    return log.context?.fieldName || "unknown";
  }
  getParentType(log) {
    return log.context?.parentType || "Query";
  }
  getEndpointPath(log) {
    if (this.isGraphQLLog(log)) {
      const fieldName = this.getFieldName(log);
      const operation = this.getOperationType(log);
      return `/graphql/${fieldName} (${operation})`;
    }
    return log.url || log.context?.url || "-";
  }
  hasGraphQLArgs(log) {
    return log.context && log.context.args && Object.keys(log.context.args).length > 0;
  }
  getGraphQLArgs(log) {
    return log.context?.args || {};
  }
  // Modal dialog methods
  showLogDetails(log) {
    this.selectedLog = log;
    const dialogRef = this.dialog.open(this.logDetailsModalTemplate, {
      width: "90vw",
      maxWidth: "1200px",
      maxHeight: "90vh"
    });
  }
  closeLogDetails() {
    this.selectedLog = null;
    this.dialog.closeAll();
  }
  copyLogDetails() {
    if (this.selectedLog) {
      const details = {
        id: this.selectedLog.id,
        name: this.selectedLog.name,
        duration: this.selectedLog.duration,
        timestamp: this.selectedLog.timestamp,
        success: this.selectedLog.success,
        error: this.selectedLog.error,
        context: this.selectedLog.context
      };
      navigator.clipboard.writeText(JSON.stringify(details, null, 2)).then(() => {
        this.showSnackBar("Log details copied to clipboard", "success");
      }).catch(() => {
        this.showSnackBar("Failed to copy to clipboard", "error");
      });
    }
  }
  // Filter and stats methods
  resetFilters() {
    this.selectedOperation = "";
    this.selectedSuccess = "all";
    this.selectedOperationType = "all";
    this.selectedRequestType = "all";
    this.minDuration = null;
    this.logLimit = 50;
    this.onFilterChange();
  }
  getGraphQLLogsCount() {
    return this.logs.filter((log) => this.isGraphQLLog(log)).length;
  }
  getSuccessfulLogsCount() {
    return this.logs.filter((log) => log.success).length;
  }
  getAverageDuration() {
    if (this.logs.length === 0)
      return "0";
    const avg = this.logs.reduce((sum, log) => sum + log.duration, 0) / this.logs.length;
    return avg.toFixed(1);
  }
  static \u0275fac = function PerformanceComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PerformanceComponent)(\u0275\u0275directiveInject(PerformanceService), \u0275\u0275directiveInject(MatSnackBar), \u0275\u0275directiveInject(MatDialog));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _PerformanceComponent, selectors: [["app-performance"]], viewQuery: function PerformanceComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c0, 5);
      \u0275\u0275viewQuery(MatSort, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.logDetailsModalTemplate = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
    }
  }, decls: 61, vars: 4, consts: [["logDetailsModal", ""], [1, "p-6", "w-full", "mx-auto"], [1, "flex", "flex-col", "lg:flex-row", "justify-between", "items-start", "lg:items-center", "mb-8", "gap-4"], [1, "flex", "items-center", "gap-3"], [1, "text-blue-600", "text-3xl"], [1, "text-3xl", "font-bold", "text-gray-800"], [1, "flex", "flex-col", "sm:flex-row", "items-start", "sm:items-center", "gap-3"], ["color", "primary", 3, "ngModelChange", "change", "ngModel"], [1, "text-sm"], ["appearance", "outline", 1, "w-40"], [3, "ngModelChange", "selectionChange", "ngModel"], ["value", "1"], ["value", "6"], ["value", "24"], ["value", "72"], ["value", "168"], ["class", "mb-6 border-l-4 border-red-500 bg-red-50", 4, "ngIf"], ["class", "flex justify-center items-center py-12", 4, "ngIf"], ["mat-align-tabs", "start", 1, "mb-8"], ["label", "Dashboard"], ["matTabContent", ""], ["label", "Performance Logs"], ["label", "Trends"], ["label", "Test Operations"], [1, "mt-8"], [1, "flex", "items-center", "gap-2"], [1, "p-4"], [1, "flex", "flex-wrap", "gap-3"], ["mat-raised-button", "", "color", "warn", 1, "flex", "items-center", "gap-2", 3, "click"], ["mat-stroked-button", "", 1, "flex", "items-center", "gap-2", 3, "click"], ["mat-raised-button", "", "color", "primary", 1, "flex", "items-center", "gap-2", 3, "click"], [1, "mb-6", "border-l-4", "border-red-500", "bg-red-50"], [1, "flex", "items-center", "gap-3", "text-red-700"], [1, "text-red-500"], [1, "flex", "justify-center", "items-center", "py-12"], ["diameter", "60"], [1, "py-6"], ["class", "mb-8", 4, "ngIf"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], [1, "bg-gray-50"], [1, "text-orange-600"], ["class", "text-center text-gray-500 py-8", 4, "ngIf"], ["class", "border-b border-gray-200 py-3 last:border-b-0", 4, "ngFor", "ngForOf"], [1, "text-red-600"], [1, "mb-8"], [1, "text-xl", "font-semibold", "mb-4", "flex", "items-center", "gap-2"], [1, "text-yellow-600"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-4", "gap-4"], [1, "bg-gradient-to-r", "from-blue-500", "to-blue-600", "text-white"], [1, "text-center"], [1, "text-3xl", "font-bold"], [1, "text-blue-100"], [1, "bg-gradient-to-r", "from-green-500", "to-green-600", "text-white"], [1, "text-green-100"], [1, "bg-gradient-to-r", "from-cyan-500", "to-cyan-600", "text-white"], [1, "text-cyan-100"], [1, "bg-gradient-to-r", "from-orange-500", "to-orange-600", "text-white"], [1, "text-orange-100"], [1, "text-purple-600"], [1, "hover:shadow-lg", "transition-shadow"], [1, "text-2xl", "font-bold", "text-blue-600"], [1, "text-gray-600"], [1, "text-2xl", "font-bold", "text-green-600"], [1, "text-2xl", "font-bold", "text-cyan-600"], [1, "text-2xl", "font-bold", "text-red-600"], [1, "text-center", "text-gray-500", "py-8"], [1, "text-4xl", "mb-2", "text-gray-400"], [1, "border-b", "border-gray-200", "py-3", "last:border-b-0"], [1, "flex", "justify-between", "items-start"], [1, "flex-1"], [1, "font-medium", "text-gray-900"], [1, "text-sm", "text-gray-500"], [1, "ml-2", 3, "ngClass"], [1, "text-4xl", "mb-2", "text-green-400"], [1, "font-medium", "text-red-600"], [1, "text-sm", "text-gray-600", "mt-1"], [1, "text-xs", "text-gray-500", "mt-1"], ["color", "warn", 1, "ml-2"], [1, "mb-6"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "lg:grid-cols-3", "xl:grid-cols-6", "gap-4"], ["appearance", "outline"], ["value", "all"], ["value", "graphql"], ["value", "http"], ["appearance", "outline", 4, "ngIf"], ["matInput", "", "placeholder", "e.g., findMany, DonhangService", 3, "ngModelChange", "input", "ngModel"], ["value", "true"], ["value", "false"], ["matInput", "", "type", "number", "placeholder", "1000", 3, "ngModelChange", "input", "ngModel"], ["value", "25"], ["value", "50"], ["value", "100"], ["value", "200"], ["value", "500"], [1, "flex", "flex-wrap", "gap-3", "mt-4"], ["mat-raised-button", "", "color", "accent", 1, "flex", "items-center", "gap-2", 3, "click"], [1, "grid", "grid-cols-1", "md:grid-cols-4", "gap-4", "mt-4", "pt-4", "border-t"], [1, "text-lg", "font-bold", "text-blue-600"], [1, "text-sm", "text-gray-600"], [1, "text-lg", "font-bold", "text-purple-600"], [1, "text-lg", "font-bold", "text-green-600"], [1, "text-lg", "font-bold", "text-orange-600"], [1, "p-0"], [1, "overflow-x-auto"], ["mat-table", "", "matSort", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "timestamp"], ["mat-header-cell", "", "mat-sort-header", "", "class", "font-semibold", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "text-sm", 4, "matCellDef"], ["matColumnDef", "operation"], ["mat-header-cell", "", "mat-sort-header", "operation", "class", "font-semibold", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "font-medium", 4, "matCellDef"], ["matColumnDef", "duration"], ["mat-cell", "", 4, "matCellDef"], ["matColumnDef", "status"], ["mat-header-cell", "", "mat-sort-header", "status", "class", "font-semibold", 4, "matHeaderCellDef"], ["matColumnDef", "method"], ["matColumnDef", "url"], ["matColumnDef", "memory"], ["mat-header-cell", "", "mat-sort-header", "memory", "class", "font-semibold", 4, "matHeaderCellDef"], ["matColumnDef", "context"], ["mat-header-cell", "", "class", "font-semibold", 4, "matHeaderCellDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-gray-50 transition-colors cursor-pointer", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "text-center py-12 text-gray-500", 4, "ngIf"], ["value", "query"], ["value", "mutation"], ["value", "subscription"], ["mat-header-cell", "", "mat-sort-header", "", 1, "font-semibold"], ["mat-cell", "", 1, "text-sm"], ["mat-header-cell", "", "mat-sort-header", "operation", 1, "font-semibold"], ["mat-cell", "", 1, "font-medium"], ["class", "text-purple-600 text-sm", 4, "ngIf"], ["class", "text-blue-600 text-sm", 4, "ngIf"], [1, "font-medium"], ["class", "text-xs text-gray-500", 4, "ngIf"], [1, "text-purple-600", "text-sm"], [1, "text-blue-600", "text-sm"], [1, "text-xs", "text-gray-500"], ["mat-cell", ""], [3, "ngClass"], ["mat-header-cell", "", "mat-sort-header", "status", 1, "font-semibold"], [1, "text-xs", 3, "color"], ["class", "text-green-600 text-sm", 4, "ngIf"], ["class", "text-red-600 text-sm", 4, "ngIf"], ["class", "text-red-600 text-xs mt-1 truncate max-w-xs", 4, "ngIf"], [1, "text-green-600", "text-sm"], [1, "text-red-600", "text-sm"], [1, "text-red-600", "text-xs", "mt-1", "truncate", "max-w-xs"], ["class", "bg-purple-100 text-purple-800", 4, "ngIf"], ["color", "accent", 4, "ngIf"], [1, "bg-purple-100", "text-purple-800"], ["color", "accent"], [1, "max-w-xs", "truncate", 3, "title"], ["mat-header-cell", "", "mat-sort-header", "memory", 1, "font-semibold"], ["class", "px-2 py-1 bg-gray-100 rounded text-xs", 4, "ngIf"], ["class", "text-gray-400", 4, "ngIf"], [1, "px-2", "py-1", "bg-gray-100", "rounded", "text-xs"], [1, "text-gray-400"], ["mat-header-cell", "", 1, "font-semibold"], ["mat-icon-button", "", "color", "primary", "matTooltip", "View detailed information", 3, "click"], ["class", "text-xs bg-blue-100 text-blue-800 px-2 py-1 rounded", 4, "ngIf"], [1, "text-xs", "bg-blue-100", "text-blue-800", "px-2", "py-1", "rounded"], ["mat-header-row", ""], ["mat-row", "", 1, "hover:bg-gray-50", "transition-colors", "cursor-pointer", 3, "click"], [1, "text-center", "py-12", "text-gray-500"], [1, "text-6xl", "mb-4", "text-gray-300"], [1, "text-lg"], ["mat-table", "", 1, "w-full", 3, "dataSource"], ["matColumnDef", "hour"], ["matColumnDef", "totalOperations"], ["matColumnDef", "avgDuration"], ["matColumnDef", "maxDuration"], ["matColumnDef", "errorCount"], ["matColumnDef", "errorRate"], ["mat-row", "", "class", "hover:bg-gray-50 transition-colors", 4, "matRowDef", "matRowDefColumns"], [3, "color"], ["mat-row", "", 1, "hover:bg-gray-50", "transition-colors"], ["mat-raised-button", "", "color", "primary", 1, "h-20", "flex", "flex-col", "justify-center", 3, "click"], [1, "mb-2"], ["mat-raised-button", "", "color", "accent", 1, "h-20", "flex", "flex-col", "justify-center", 3, "click"], ["mat-raised-button", "", "color", "warn", 1, "h-20", "flex", "flex-col", "justify-center", 3, "click"], ["mat-raised-button", "", 1, "h-20", "flex", "flex-col", "justify-center", "bg-purple-600", "text-white", 3, "click"], [1, "flex", "justify-between", "items-center"], ["mat-stroked-button", "", "color", "warn", 3, "click"], ["class", "text-center text-gray-500 py-12", 4, "ngIf"], ["class", "mb-3", 4, "ngFor", "ngForOf"], [1, "text-center", "text-gray-500", "py-12"], [1, "mb-3"], [1, "capitalize", "font-medium"], [1, "pt-4"], ["class", "bg-red-50 border border-red-200 rounded p-3 mb-4", 4, "ngIf"], ["class", "bg-gray-50 border border-gray-200 rounded p-3", 4, "ngIf"], [1, "bg-red-50", "border", "border-red-200", "rounded", "p-3", "mb-4"], [1, "flex", "items-center", "gap-2", "text-red-700"], [1, "text-red-600", "mt-1"], [1, "bg-gray-50", "border", "border-gray-200", "rounded", "p-3"], [1, "flex", "items-center", "gap-2", "text-gray-700", "mb-2"], [1, "text-sm", "bg-white", "p-3", "rounded", "border", "overflow-auto", "max-h-40"], [1, "max-w-4xl", "w-full"], ["class", "p-0", 4, "ngIf"], ["align", "end", 1, "p-4", "bg-gray-50"], ["mat-button", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 3, "click"], [1, "bg-gradient-to-r", "from-blue-600", "to-purple-600", "text-white", "p-6"], [1, "flex", "items-center", "justify-between"], [1, "text-2xl"], [1, "text-xl", "font-bold"], [1, "text-right"], [1, "text-2xl", "font-bold"], [1, "mt-2", 3, "color"], [1, "min-h-96"], ["label", "Overview"], [1, "p-6"], [1, "grid", "grid-cols-1", "md:grid-cols-2", "gap-6"], [1, "space-y-3"], [1, "flex", "justify-between"], [1, "text-sm", "bg-gray-100", "px-2", "py-1", "rounded"], ["class", "flex justify-between", 4, "ngIf"], [1, "text-sm", "break-all"], ["class", "mt-6 border-l-4 border-red-500", 4, "ngIf"], ["label", "GraphQL Details", 4, "ngIf"], ["label", "Full Context", 4, "ngIf"], [1, "mt-6", "border-l-4", "border-red-500"], [1, "text-red-700"], [1, "bg-red-50", "p-4", "rounded", "overflow-auto", "text-sm", "text-red-800"], ["label", "GraphQL Details"], [4, "ngIf"], [1, "bg-gray-50", "p-4", "rounded", "overflow-auto", "text-sm", "max-h-64"], ["label", "Full Context"], [1, "bg-gray-50", "p-4", "rounded", "overflow-auto", "text-sm", "max-h-96"]], template: function PerformanceComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 1)(1, "div", 2)(2, "div", 3)(3, "mat-icon", 4);
      \u0275\u0275text(4, "speed");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "h1", 5);
      \u0275\u0275text(6, "Performance Dashboard");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(7, "div", 6)(8, "mat-slide-toggle", 7);
      \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_Template_mat_slide_toggle_ngModelChange_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.autoRefresh, $event) || (ctx.autoRefresh = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("change", function PerformanceComponent_Template_mat_slide_toggle_change_8_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleAutoRefresh());
      });
      \u0275\u0275elementStart(9, "span", 8);
      \u0275\u0275text(10, "Auto Refresh (30s)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-form-field", 9)(12, "mat-label");
      \u0275\u0275text(13, "Time Range");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(14, "mat-select", 10);
      \u0275\u0275twoWayListener("ngModelChange", function PerformanceComponent_Template_mat_select_ngModelChange_14_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.selectedHours, $event) || (ctx.selectedHours = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("selectionChange", function PerformanceComponent_Template_mat_select_selectionChange_14_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onHoursChange());
      });
      \u0275\u0275elementStart(15, "mat-option", 11);
      \u0275\u0275text(16, "Last Hour");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "mat-option", 12);
      \u0275\u0275text(18, "Last 6 Hours");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "mat-option", 13);
      \u0275\u0275text(20, "Last 24 Hours");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-option", 14);
      \u0275\u0275text(22, "Last 3 Days");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(23, "mat-option", 15);
      \u0275\u0275text(24, "Last Week");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275template(25, PerformanceComponent_mat_card_25_Template, 6, 1, "mat-card", 16)(26, PerformanceComponent_div_26_Template, 2, 0, "div", 17);
      \u0275\u0275elementStart(27, "mat-tab-group", 18)(28, "mat-tab", 19);
      \u0275\u0275template(29, PerformanceComponent_ng_template_29_Template, 22, 6, "ng-template", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "mat-tab", 21);
      \u0275\u0275template(31, PerformanceComponent_ng_template_31_Template, 126, 15, "ng-template", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(32, "mat-tab", 22);
      \u0275\u0275template(33, PerformanceComponent_ng_template_33_Template, 30, 3, "ng-template", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(34, "mat-tab", 23);
      \u0275\u0275template(35, PerformanceComponent_ng_template_35_Template, 44, 2, "ng-template", 20);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "mat-card", 24)(37, "mat-card-header")(38, "mat-card-title", 25)(39, "mat-icon");
      \u0275\u0275text(40, "settings");
      \u0275\u0275elementEnd();
      \u0275\u0275text(41, " Management Actions ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(42, "mat-card-content", 26)(43, "div", 27)(44, "button", 28);
      \u0275\u0275listener("click", function PerformanceComponent_Template_button_click_44_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.cleanupLogs());
      });
      \u0275\u0275elementStart(45, "mat-icon");
      \u0275\u0275text(46, "delete_sweep");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(47, "span");
      \u0275\u0275text(48, "Cleanup Old Logs (30 days)");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(49, "button", 29);
      \u0275\u0275listener("click", function PerformanceComponent_Template_button_click_49_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearMemoryMetrics());
      });
      \u0275\u0275elementStart(50, "mat-icon");
      \u0275\u0275text(51, "memory");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(52, "span");
      \u0275\u0275text(53, "Clear Memory Metrics");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(54, "button", 30);
      \u0275\u0275listener("click", function PerformanceComponent_Template_button_click_54_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.loadAllData());
      });
      \u0275\u0275elementStart(55, "mat-icon");
      \u0275\u0275text(56, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "span");
      \u0275\u0275text(58, "Refresh All Data");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275template(59, PerformanceComponent_ng_template_59_Template, 9, 1, "ng-template", null, 0, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance(8);
      \u0275\u0275twoWayProperty("ngModel", ctx.autoRefresh);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.selectedHours);
      \u0275\u0275advance(11);
      \u0275\u0275property("ngIf", ctx.errorMessage);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading);
    }
  }, dependencies: [
    CommonModule,
    NgClass,
    NgForOf,
    NgIf,
    JsonPipe,
    FormsModule,
    DefaultValueAccessor,
    NumberValueAccessor,
    NgControlStatus,
    NgModel,
    MatCardModule,
    MatCard,
    MatCardContent,
    MatCardHeader,
    MatCardSubtitle,
    MatCardTitle,
    MatTabsModule,
    MatTabContent,
    MatTab,
    MatTabGroup,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatSelectModule,
    MatFormField,
    MatLabel,
    MatHint,
    MatSelect,
    MatOption,
    MatInputModule,
    MatInput,
    MatFormFieldModule,
    MatSlideToggleModule,
    MatSlideToggle,
    MatChipsModule,
    MatChip,
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
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatSnackBarModule,
    MatDialogModule,
    MatDialogActions,
    MatDialogContent,
    MatExpansionModule,
    MatExpansionPanel,
    MatExpansionPanelHeader,
    MatExpansionPanelTitle,
    MatExpansionPanelDescription,
    MatTooltipModule,
    MatTooltip
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(PerformanceComponent, { className: "PerformanceComponent", filePath: "src/app/admin/performance/performance.component.ts", lineNumber: 51 });
})();
export {
  PerformanceComponent
};
//# sourceMappingURL=chunk-OLEOQMG4.mjs.map
