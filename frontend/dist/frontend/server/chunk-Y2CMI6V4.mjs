import './polyfills.server.mjs';
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-RUJ72W7P.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-YOUETZOR.mjs";
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
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import "./chunk-DRJRGOAY.mjs";
import "./chunk-AVOXPLBL.mjs";
import "./chunk-MGLNC3ZQ.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-2QXHUJNF.mjs";
import "./chunk-7GJ6SLXG.mjs";
import "./chunk-CE5R7E7Z.mjs";
import "./chunk-HCNIBG7Y.mjs";
import {
  CommonModule,
  DecimalPipe,
  NgIf,
  isPlatformBrowser
} from "./chunk-H3GF4RFC.mjs";
import {
  ChangeDetectionStrategy,
  Component,
  NgModule,
  NgZone,
  PLATFORM_ID,
  asapScheduler,
  inject,
  input,
  output,
  setClassMetadata,
  signal,
  viewChild,
  ɵsetClassDebugInfo,
  ɵɵNgOnChangesFeature,
  ɵɵadvance,
  ɵɵdefer,
  ɵɵdeferOnIdle,
  ɵɵdefineComponent,
  ɵɵdefineInjector,
  ɵɵdefineNgModule,
  ɵɵelement,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryAdvance,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate2,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery,
  ɵɵviewQuerySignal
} from "./chunk-4EQURZBD.mjs";
import "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/dashboard/dashboardblock/dashboardblock.component.ts
var _c0 = () => ({ standalone: true });
function DashboardblockComponent_div_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("T\u0103ng: ", ctx_r2.value, "", ctx_r2.type == "percent" ? "%" : "\u0111", "");
  }
}
function DashboardblockComponent_div_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 26);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Kh\xF4ng t\u0103ng/gi\u1EA3m: ", ctx_r2.value, "", ctx_r2.type == "percent" ? "%" : "\u0111", "");
  }
}
function DashboardblockComponent_div_66_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 27);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2("Gi\u1EA3m: ", ctx_r2.value, "", ctx_r2.type == "percent" ? "%" : "\u0111", "");
  }
}
var DashboardblockComponent = class _DashboardblockComponent {
  title = "Ti\xEAu \u0110\u1EC1";
  value = 0;
  type = "value";
  // 'percent' hoặc 'value'
  startDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Ngày bắt đầu
  endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Ngày kết thúc
  applyDateRange(menu) {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    menu.closeMenu();
  }
  static \u0275fac = function DashboardblockComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboardblockComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboardblockComponent, selectors: [["app-dashboardblock"]], inputs: { title: "title", value: "value", type: "type" }, decls: 67, vars: 21, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["dataRangeMenu", "matMenu"], ["startPicker", ""], ["endPicker", ""], [1, "w-full", "flex", "flex-col", "space-y-2", "bg-white", "shadow", "rounded-md", "p-4"], [1, "cursor-pointer", "flex", "flex-row", "space-x-2", "justify-between", "items-center"], [1, "text-lg", "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "gap-3", "p-4", 3, "click"], ["appearance", "fill", 1, "w-full"], ["matInput", "", "placeholder", "Ng\xE0y B\u1EAFt \u0110\u1EA7u", 3, "ngModelChange", "ngModel", "ngModelOptions", "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "placeholder", "Ng\xE0y K\u1EBFt Th\xFAc", 3, "ngModelChange", "ngModel", "ngModelOptions", "matDatepicker"], ["mat-raised-button", "", "color", "primary", 1, "w-full", 3, "click"], [1, "flex", "flex-row", "space-x-4", "items-center"], [1, "material-symbols-outlined", "!text-2xl", "!text-white", "p-4", "!bg-blue-300", "rounded-lg"], [1, "flex", "flex-col", "space-y-2"], [1, "text-start", "text-xl", "font-bold"], ["class", "text-green-600", 4, "ngIf"], ["class", "text-gray-600", 4, "ngIf"], ["class", "text-red-600", 4, "ngIf"], [1, "text-green-600"], [1, "text-gray-600"], [1, "text-red-600"]], template: function DashboardblockComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 5)(1, "div", 6)(2, "div", 7);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 8)(5, "div");
      \u0275\u0275text(6, "H\xF4m Nay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 9, 0)(9, "mat-icon");
      \u0275\u0275text(10, "more_vert");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-menu", null, 1)(13, "button", 10)(14, "mat-icon");
      \u0275\u0275text(15, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17, "T\u1EA3i Xu\u1ED1ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "button", 10)(19, "mat-icon");
      \u0275\u0275text(20, "share");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "Chia S\u1EBD");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "button", 10)(24, "mat-icon");
      \u0275\u0275text(25, "today");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "H\xF4m Nay");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 10)(29, "mat-icon");
      \u0275\u0275text(30, "calendar_month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32, "Th\xE1ng N\xE0y");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "button", 11)(34, "mat-icon");
      \u0275\u0275text(35, "date_range");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "span");
      \u0275\u0275text(37, "Tu\u1EF3 Ch\u1ECDn");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "mat-menu", null, 2)(40, "div", 12);
      \u0275\u0275listener("click", function DashboardblockComponent_Template_div_click_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(41, "mat-form-field", 13)(42, "mat-label");
      \u0275\u0275text(43, "Ng\xE0y B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "input", 14);
      \u0275\u0275twoWayListener("ngModelChange", function DashboardblockComponent_Template_input_ngModelChange_44_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "mat-datepicker-toggle", 15)(46, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-form-field", 13)(49, "mat-label");
      \u0275\u0275text(50, "Ng\xE0y K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "input", 16);
      \u0275\u0275twoWayListener("ngModelChange", function DashboardblockComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.endDate, $event) || (ctx.endDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "mat-datepicker-toggle", 15)(53, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "button", 17);
      \u0275\u0275listener("click", function DashboardblockComponent_Template_button_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        const menuTrigger_r2 = \u0275\u0275reference(8);
        return \u0275\u0275resetView(ctx.applyDateRange(menuTrigger_r2));
      });
      \u0275\u0275text(56, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(57, "div", 18)(58, "span", 19);
      \u0275\u0275text(59, "paid");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(60, "div", 20)(61, "div", 21);
      \u0275\u0275text(62);
      \u0275\u0275pipe(63, "number");
      \u0275\u0275elementEnd();
      \u0275\u0275template(64, DashboardblockComponent_div_64_Template, 2, 2, "div", 22)(65, DashboardblockComponent_div_65_Template, 2, 2, "div", 23)(66, DashboardblockComponent_div_66_Template, 2, 2, "div", 24);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      const menu_r4 = \u0275\u0275reference(12);
      const dataRangeMenu_r5 = \u0275\u0275reference(39);
      const startPicker_r6 = \u0275\u0275reference(47);
      const endPicker_r7 = \u0275\u0275reference(54);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu_r4);
      \u0275\u0275advance(26);
      \u0275\u0275property("matMenuTriggerFor", dataRangeMenu_r5);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.startDate);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c0))("matDatepicker", startPicker_r6);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r6);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.endDate);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(20, _c0))("matDatepicker", endPicker_r7);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r7);
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate2("", \u0275\u0275pipeBind2(63, 16, ctx.value, "1.0-2"), " ", ctx.type == "percent" ? "%" : "\u0111", "");
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.value > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.value == 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.value < 0);
    }
  }, dependencies: [MatFormFieldModule, MatFormField, MatLabel, MatSuffix, MatInputModule, MatInput, FormsModule, DefaultValueAccessor, NgControlStatus, NgModel, CommonModule, NgIf, DecimalPipe, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatMenuModule, MatMenu, MatMenuItem, MatMenuTrigger, MatDatepickerModule, MatDatepicker, MatDatepickerInput, MatDatepickerToggle], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboardblockComponent, { className: "DashboardblockComponent", filePath: "src/app/admin/dashboard/dashboardblock/dashboardblock.component.ts", lineNumber: 25 });
})();

// node_modules/ng-apexcharts/fesm2022/ng-apexcharts.mjs
var _c02 = ["chart"];
var ChartComponent = class _ChartComponent {
  constructor() {
    this.chart = input();
    this.annotations = input();
    this.colors = input();
    this.dataLabels = input();
    this.series = input();
    this.stroke = input();
    this.labels = input();
    this.legend = input();
    this.markers = input();
    this.noData = input();
    this.fill = input();
    this.tooltip = input();
    this.plotOptions = input();
    this.responsive = input();
    this.xaxis = input();
    this.yaxis = input();
    this.forecastDataPoints = input();
    this.grid = input();
    this.states = input();
    this.title = input();
    this.subtitle = input();
    this.theme = input();
    this.autoUpdateSeries = input(true);
    this.chartReady = output();
    this.chartInstance = signal(null);
    this.chartElement = viewChild.required("chart");
    this.ngZone = inject(NgZone);
    this.isBrowser = isPlatformBrowser(inject(PLATFORM_ID));
  }
  ngOnChanges(changes) {
    if (!this.isBrowser) return;
    this.ngZone.runOutsideAngular(() => {
      asapScheduler.schedule(() => this.hydrate(changes));
    });
  }
  ngOnDestroy() {
    this.destroy();
  }
  hydrate(changes) {
    const shouldUpdateSeries = this.autoUpdateSeries() && Object.keys(changes).filter((c) => c !== "series").length === 0;
    if (shouldUpdateSeries) {
      this.updateSeries(this.series(), true);
      return;
    }
    this.createElement();
  }
  createElement() {
    return __async(this, null, function* () {
      const {
        default: ApexCharts
      } = yield import("./chunk-BDTPLUMN.mjs");
      window.ApexCharts ||= ApexCharts;
      const options = {};
      const properties = ["annotations", "chart", "colors", "dataLabels", "series", "stroke", "labels", "legend", "fill", "tooltip", "plotOptions", "responsive", "markers", "noData", "xaxis", "yaxis", "forecastDataPoints", "grid", "states", "title", "subtitle", "theme"];
      properties.forEach((property) => {
        const value = this[property]();
        if (value) {
          options[property] = value;
        }
      });
      this.destroy();
      const chartInstance = this.ngZone.runOutsideAngular(() => new ApexCharts(this.chartElement().nativeElement, options));
      this.chartInstance.set(chartInstance);
      this.render();
      this.chartReady.emit({
        chartObj: chartInstance
      });
    });
  }
  render() {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.render());
  }
  updateOptions(options, redrawPaths, animate, updateSyncedCharts) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateOptions(options, redrawPaths, animate, updateSyncedCharts));
  }
  updateSeries(newSeries, animate) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.updateSeries(newSeries, animate));
  }
  appendSeries(newSeries, animate) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendSeries(newSeries, animate));
  }
  appendData(newData) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.appendData(newData));
  }
  highlightSeries(seriesName) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.highlightSeries(seriesName));
  }
  toggleSeries(seriesName) {
    return this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleSeries(seriesName));
  }
  showSeries(seriesName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.showSeries(seriesName));
  }
  hideSeries(seriesName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.hideSeries(seriesName));
  }
  resetSeries() {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.resetSeries());
  }
  zoomX(min, max) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.zoomX(min, max));
  }
  toggleDataPointSelection(seriesIndex, dataPointIndex) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.toggleDataPointSelection(seriesIndex, dataPointIndex));
  }
  destroy() {
    this.chartInstance()?.destroy();
    this.chartInstance.set(null);
  }
  setLocale(localeName) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.setLocale(localeName));
  }
  paper() {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.paper());
  }
  addXaxisAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addXaxisAnnotation(options, pushToMemory, context));
  }
  addYaxisAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addYaxisAnnotation(options, pushToMemory, context));
  }
  addPointAnnotation(options, pushToMemory, context) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.addPointAnnotation(options, pushToMemory, context));
  }
  removeAnnotation(id, options) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.removeAnnotation(id, options));
  }
  clearAnnotations(options) {
    this.ngZone.runOutsideAngular(() => this.chartInstance()?.clearAnnotations(options));
  }
  dataURI(options) {
    return this.chartInstance()?.dataURI(options);
  }
  static {
    this.\u0275fac = function ChartComponent_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _ChartComponent)();
    };
  }
  static {
    this.\u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({
      type: _ChartComponent,
      selectors: [["apx-chart"]],
      viewQuery: function ChartComponent_Query(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275viewQuerySignal(ctx.chartElement, _c02, 5);
        }
        if (rf & 2) {
          \u0275\u0275queryAdvance();
        }
      },
      inputs: {
        chart: [1, "chart"],
        annotations: [1, "annotations"],
        colors: [1, "colors"],
        dataLabels: [1, "dataLabels"],
        series: [1, "series"],
        stroke: [1, "stroke"],
        labels: [1, "labels"],
        legend: [1, "legend"],
        markers: [1, "markers"],
        noData: [1, "noData"],
        fill: [1, "fill"],
        tooltip: [1, "tooltip"],
        plotOptions: [1, "plotOptions"],
        responsive: [1, "responsive"],
        xaxis: [1, "xaxis"],
        yaxis: [1, "yaxis"],
        forecastDataPoints: [1, "forecastDataPoints"],
        grid: [1, "grid"],
        states: [1, "states"],
        title: [1, "title"],
        subtitle: [1, "subtitle"],
        theme: [1, "theme"],
        autoUpdateSeries: [1, "autoUpdateSeries"]
      },
      outputs: {
        chartReady: "chartReady"
      },
      features: [\u0275\u0275NgOnChangesFeature],
      decls: 2,
      vars: 0,
      consts: [["chart", ""]],
      template: function ChartComponent_Template(rf, ctx) {
        if (rf & 1) {
          \u0275\u0275element(0, "div", null, 0);
        }
      },
      encapsulation: 2,
      changeDetection: 0
    });
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(ChartComponent, [{
    type: Component,
    args: [{
      selector: "apx-chart",
      template: `<div #chart></div>`,
      changeDetection: ChangeDetectionStrategy.OnPush,
      standalone: true
    }]
  }], null, null);
})();
var declarations = [ChartComponent];
var NgApexchartsModule = class _NgApexchartsModule {
  static {
    this.\u0275fac = function NgApexchartsModule_Factory(__ngFactoryType__) {
      return new (__ngFactoryType__ || _NgApexchartsModule)();
    };
  }
  static {
    this.\u0275mod = /* @__PURE__ */ \u0275\u0275defineNgModule({
      type: _NgApexchartsModule
    });
  }
  static {
    this.\u0275inj = /* @__PURE__ */ \u0275\u0275defineInjector({});
  }
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && setClassMetadata(NgApexchartsModule, [{
    type: NgModule,
    args: [{
      imports: [declarations],
      exports: [declarations]
    }]
  }], null, null);
})();

// src/app/admin/dashboard/revenuechart/revenuechart.component.ts
var _c03 = ["chart"];
var RevenuechartComponent_Defer_59_DepsFn = () => [ChartComponent];
var _c1 = () => ({ standalone: true });
function RevenuechartComponent_Defer_58_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 20);
    \u0275\u0275element(1, "apx-chart", 21, 5);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("series", ctx_r2.finalChartOptions.series)("chart", ctx_r2.finalChartOptions.chart)("xaxis", ctx_r2.finalChartOptions.xaxis)("stroke", ctx_r2.finalChartOptions.stroke)("tooltip", ctx_r2.finalChartOptions.tooltip)("dataLabels", ctx_r2.finalChartOptions.dataLabels)("legend", ctx_r2.finalChartOptions.legend)("fill", ctx_r2.finalChartOptions.fill)("yaxis", ctx_r2.finalChartOptions.yaxis)("title", ctx_r2.finalChartOptions.title);
  }
}
var RevenuechartComponent = class _RevenuechartComponent {
  chartInstance;
  chartOptions = {};
  seriesData = [];
  categories = [];
  chartHeight = 350;
  // Chiều cao mặc định
  chartTitle = "";
  title = "Ti\xEAu \u0110\u1EC1";
  finalChartOptions;
  constructor() {
    this.finalChartOptions = this.getDefaultOptions();
  }
  startDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Ngày bắt đầu
  endDate = (/* @__PURE__ */ new Date()).toISOString().split("T")[0];
  // Ngày kết thúc
  applyDateRange(menu) {
    const startDate = new Date(this.startDate).getTime();
    const endDate = new Date(this.endDate).getTime();
    menu.closeMenu();
  }
  ngOnInit() {
    this.prepareChartOptions();
  }
  ngOnChanges(changes) {
    if (changes["chartOptions"] || changes["seriesData"] || changes["categories"] || changes["chartHeight"] || changes["chartTitle"]) {
      this.prepareChartOptions();
    }
  }
  getDefaultOptions() {
    return {
      series: [{
        name: "D\u1EEF li\u1EC7u M\u1EB7c \u0111\u1ECBnh",
        data: []
      }],
      chart: {
        type: "area",
        // Quan trọng: Loại biểu đồ là area
        height: this.chartHeight,
        zoom: {
          enabled: false
          // Tắt zoom mặc định cho gọn
        },
        toolbar: {
          show: true
          // Hiển thị thanh công cụ (download, zoom...)
        }
      },
      dataLabels: {
        enabled: false
        // Tắt nhãn dữ liệu trên các điểm cho đỡ rối
      },
      stroke: {
        curve: "smooth",
        // Vẽ đường cong mượt mà
        width: 2
      },
      xaxis: {
        // type: 'datetime', // Phổ biến cho area chart theo thời gian
        categories: []
      },
      yaxis: {
        title: {
          text: "Gi\xE1 tr\u1ECB"
        }
      },
      tooltip: {
        // x: {
        //   format: 'dd MMM yyyy' // Định dạng hiển thị tooltip trục X (nếu là datetime)
        // }
      },
      fill: {
        type: "gradient",
        // Tô màu kiểu gradient cho đẹp
        gradient: {
          shadeIntensity: 1,
          opacityFrom: 0.7,
          opacityTo: 0.9,
          stops: [0, 90, 100]
        }
      },
      title: {
        text: "Bi\u1EC3u \u0111\u1ED3 Area",
        align: "left"
      },
      legend: {
        position: "top",
        horizontalAlign: "right",
        floating: true,
        offsetY: -25,
        offsetX: -5
      }
    };
  }
  // Hàm chuẩn bị cấu hình cuối cùng dựa trên Input
  prepareChartOptions() {
    if (this.chartOptions && Object.keys(this.chartOptions).length > 0) {
      this.finalChartOptions = __spreadValues(__spreadValues({}, this.getDefaultOptions()), this.chartOptions);
      this.finalChartOptions.xaxis = __spreadValues(__spreadValues({}, this.getDefaultOptions().xaxis), this.chartOptions.xaxis);
    } else {
      const defaultOpts = this.getDefaultOptions();
      this.finalChartOptions = __spreadProps(__spreadValues({}, defaultOpts), {
        // Bắt đầu với mặc định
        series: this.seriesData && this.seriesData.length > 0 ? this.seriesData : defaultOpts.series,
        chart: __spreadProps(__spreadValues({}, defaultOpts.chart), {
          height: this.chartHeight || defaultOpts.chart?.height,
          // Cập nhật chiều cao
          type: defaultOpts.chart?.type || "area"
          // Đảm bảo luôn có giá trị type hợp lệ
        }),
        xaxis: __spreadProps(__spreadValues({}, defaultOpts.xaxis), {
          categories: this.categories && this.categories.length > 0 ? this.categories : defaultOpts.xaxis?.categories
          // Cập nhật categories
        }),
        title: __spreadProps(__spreadValues({}, defaultOpts.title), {
          text: this.chartTitle || defaultOpts.title?.text
          // Cập nhật tiêu đề
        })
      });
    }
    if (!this.finalChartOptions.series || this.finalChartOptions.series.length === 0) {
      this.finalChartOptions.series = [{ name: "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u", data: [] }];
    }
  }
  static \u0275fac = function RevenuechartComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _RevenuechartComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _RevenuechartComponent, selectors: [["app-revenuechart"]], viewQuery: function RevenuechartComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(_c03, 5);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.chartInstance = _t.first);
    }
  }, inputs: { chartOptions: "chartOptions", seriesData: "seriesData", categories: "categories", chartHeight: "chartHeight", chartTitle: "chartTitle", title: "title" }, features: [\u0275\u0275NgOnChangesFeature], decls: 61, vars: 13, consts: [["menuTrigger", "matMenuTrigger"], ["menu", "matMenu"], ["dataRangeMenu", "matMenu"], ["startPicker", ""], ["endPicker", ""], ["chart", ""], [1, "w-full", "flex", "flex-col", "space-y-2", "bg-white", "shadow", "rounded-md", "p-4"], [1, "cursor-pointer", "flex", "flex-row", "space-x-2", "justify-between", "items-center"], [1, "text-lg", "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], ["mat-menu-item", ""], ["mat-menu-item", "", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "gap-3", "p-4", 3, "click"], ["appearance", "fill", 1, "w-full"], ["matInput", "", "placeholder", "Ng\xE0y B\u1EAFt \u0110\u1EA7u", 3, "ngModelChange", "ngModel", "ngModelOptions", "matDatepicker"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "placeholder", "Ng\xE0y K\u1EBFt Th\xFAc", 3, "ngModelChange", "ngModel", "ngModelOptions", "matDatepicker"], ["mat-raised-button", "", "color", "primary", 1, "w-full", 3, "click"], [1, "flex", "flex-row", "space-x-4", "items-center"], ["id", "chart-container", 1, "w-full", "h-96"], [3, "series", "chart", "xaxis", "stroke", "tooltip", "dataLabels", "legend", "fill", "yaxis", "title"]], template: function RevenuechartComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 6)(1, "div", 7)(2, "div", 8);
      \u0275\u0275text(3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 9)(5, "div");
      \u0275\u0275text(6, "H\xF4m Nay");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(7, "button", 10, 0)(9, "mat-icon");
      \u0275\u0275text(10, "more_vert");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(11, "mat-menu", null, 1)(13, "button", 11)(14, "mat-icon");
      \u0275\u0275text(15, "download");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span");
      \u0275\u0275text(17, "T\u1EA3i Xu\u1ED1ng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(18, "button", 11)(19, "mat-icon");
      \u0275\u0275text(20, "share");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "span");
      \u0275\u0275text(22, "Chia S\u1EBD");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "button", 11)(24, "mat-icon");
      \u0275\u0275text(25, "today");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(26, "span");
      \u0275\u0275text(27, "H\xF4m Nay");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "button", 11)(29, "mat-icon");
      \u0275\u0275text(30, "calendar_month");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "span");
      \u0275\u0275text(32, "Th\xE1ng N\xE0y");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "button", 12)(34, "mat-icon");
      \u0275\u0275text(35, "date_range");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(36, "span");
      \u0275\u0275text(37, "Tu\u1EF3 Ch\u1ECDn");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(38, "mat-menu", null, 2)(40, "div", 13);
      \u0275\u0275listener("click", function RevenuechartComponent_Template_div_click_40_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(41, "mat-form-field", 14)(42, "mat-label");
      \u0275\u0275text(43, "Ng\xE0y B\u1EAFt \u0110\u1EA7u");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "input", 15);
      \u0275\u0275twoWayListener("ngModelChange", function RevenuechartComponent_Template_input_ngModelChange_44_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.startDate, $event) || (ctx.startDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(45, "mat-datepicker-toggle", 16)(46, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-form-field", 14)(49, "mat-label");
      \u0275\u0275text(50, "Ng\xE0y K\u1EBFt Th\xFAc");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(51, "input", 17);
      \u0275\u0275twoWayListener("ngModelChange", function RevenuechartComponent_Template_input_ngModelChange_51_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.endDate, $event) || (ctx.endDate = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(52, "mat-datepicker-toggle", 16)(53, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "button", 18);
      \u0275\u0275listener("click", function RevenuechartComponent_Template_button_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        const menuTrigger_r2 = \u0275\u0275reference(8);
        return \u0275\u0275resetView(ctx.applyDateRange(menuTrigger_r2));
      });
      \u0275\u0275text(56, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()()()()();
      \u0275\u0275elementStart(57, "div", 19);
      \u0275\u0275template(58, RevenuechartComponent_Defer_58_Template, 3, 10);
      \u0275\u0275defer(59, 58, RevenuechartComponent_Defer_59_DepsFn);
      \u0275\u0275deferOnIdle();
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const menu_r4 = \u0275\u0275reference(12);
      const dataRangeMenu_r5 = \u0275\u0275reference(39);
      const startPicker_r6 = \u0275\u0275reference(47);
      const endPicker_r7 = \u0275\u0275reference(54);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.title);
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu_r4);
      \u0275\u0275advance(26);
      \u0275\u0275property("matMenuTriggerFor", dataRangeMenu_r5);
      \u0275\u0275advance(11);
      \u0275\u0275twoWayProperty("ngModel", ctx.startDate);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(11, _c1))("matDatepicker", startPicker_r6);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r6);
      \u0275\u0275advance(6);
      \u0275\u0275twoWayProperty("ngModel", ctx.endDate);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(12, _c1))("matDatepicker", endPicker_r7);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r7);
    }
  }, dependencies: [
    CommonModule,
    NgApexchartsModule,
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatInput,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatIconModule,
    MatIcon,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle
  ], styles: ["\n\n.chart-container[_ngcontent-%COMP%] {\n  width: 100%;\n  max-width: 800px;\n  margin: 0 auto;\n}\nsvg[_ngcontent-%COMP%] {\n  width: 100%;\n  height: 400px;\n}\n.bar[_ngcontent-%COMP%] {\n  fill: steelblue;\n}\n.line[_ngcontent-%COMP%] {\n  fill: none;\n  stroke: orange;\n  stroke-width: 2;\n}\n.tooltip[_ngcontent-%COMP%] {\n  position: absolute;\n  background: rgba(0, 0, 0, 0.8);\n  color: white;\n  padding: 5px 10px;\n  border-radius: 4px;\n  pointer-events: none;\n}\n/*# sourceMappingURL=revenuechart.component.css.map */"] });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(RevenuechartComponent, { className: "RevenuechartComponent", filePath: "src/app/admin/dashboard/revenuechart/revenuechart.component.ts", lineNumber: 60 });
})();

// src/app/admin/khachhang/dashboarkhachhang/dashboarkhachhang.component.ts
var DashboarkhachhangComponent = class _DashboarkhachhangComponent {
  sampleAreaChartOptions2;
  sampleAreaChartOptions;
  sampleCategories;
  constructor() {
  }
  generateRandomData(count, min = 10, max = 100) {
    const data = [];
    for (let i = 0; i < count; i++) {
      data.push(Math.floor(Math.random() * (max - min + 1)) + min);
    }
    return data;
  }
  static \u0275fac = function DashboarkhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DashboarkhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DashboarkhachhangComponent, selectors: [["app-dashboarkhachhang"]], decls: 8, vars: 13, consts: [[1, "w-full", "flex", "flex-col", "gap-4", "mx-auto", "p-8"], [1, "grid", "lg:grid-cols-3", "gap-4"], [3, "title", "value", "type"], [1, "grid", "lg:grid-cols-2", "gap-4"], [3, "title", "chartOptions"]], template: function DashboarkhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1);
      \u0275\u0275element(2, "app-dashboardblock", 2)(3, "app-dashboardblock", 2)(4, "app-dashboardblock", 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div", 3);
      \u0275\u0275element(6, "app-revenuechart", 4)(7, "app-revenuechart", 4);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(2);
      \u0275\u0275property("title", "T\u1ED5ng Doanh Thu")("value", 123456789)("type", "value");
      \u0275\u0275advance();
      \u0275\u0275property("title", "T\u1ED5ng S\u1ED1 \u0110\u01A1n H\xE0ng")("value", 1500)("type", "percent");
      \u0275\u0275advance();
      \u0275\u0275property("title", "Kh\xE1ch H\xE0ng M\u1EDBi")("value", 300)("type", "percent");
      \u0275\u0275advance(2);
      \u0275\u0275property("title", "Doanh Thu Th\xE1ng N\xE0y")("chartOptions", ctx.sampleAreaChartOptions2);
      \u0275\u0275advance();
      \u0275\u0275property("title", "Tr\u1EA1ng Th\xE1i \u0110\u01A1n h\xE0ng")("chartOptions", ctx.sampleAreaChartOptions2);
    }
  }, dependencies: [
    DashboardblockComponent,
    RevenuechartComponent
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DashboarkhachhangComponent, { className: "DashboarkhachhangComponent", filePath: "src/app/admin/khachhang/dashboarkhachhang/dashboarkhachhang.component.ts", lineNumber: 14 });
})();
export {
  DashboarkhachhangComponent
};
//# sourceMappingURL=chunk-Y2CMI6V4.mjs.map
