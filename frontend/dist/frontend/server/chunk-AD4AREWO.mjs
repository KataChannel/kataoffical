import './polyfills.server.mjs';
import {
  DateHelpers
} from "./chunk-EL3N5X44.mjs";
import {
  PhieukhoService
} from "./chunk-UZS2VT3J.mjs";
import {
  DathangService
} from "./chunk-6C4QP5HU.mjs";
import {
  DonhangService
} from "./chunk-G2WBPEJY.mjs";
import {
  SanphamService
} from "./chunk-3MPX6R2V.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-XJHVYA25.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-RT23KED7.mjs";
import {
  TimezoneService
} from "./chunk-WS5XWDEX.mjs";
import {
  readExcelFileNoWorker,
  readExcelFileNoWorkerArray,
  writeExcelFile,
  writeExcelFileSheets
} from "./chunk-XQWRZCE6.mjs";
import "./chunk-WJ6GNNQZ.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import "./chunk-CXFG5YDN.mjs";
import {
  GenId
} from "./chunk-OLFDOXYK.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-AESSWZ4W.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-JNHRISVT.mjs";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-NU7WWMYS.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-HRPVH7WR.mjs";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatRow,
  MatRowDef,
  MatTable,
  MatTableDataSource,
  MatTableModule
} from "./chunk-VF45CXPP.mjs";
import {
  GraphqlService
} from "./chunk-3I55OMWU.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-HAGRL2CT.mjs";
import "./chunk-ZYFSGH3S.mjs";
import "./chunk-BKGWM7TB.mjs";
import "./chunk-HJOOFARF.mjs";
import {
  MatExpansionModule
} from "./chunk-WTFWSASR.mjs";
import {
  MatSlideToggleModule
} from "./chunk-6GML6PCL.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-LPLDGY7B.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogRef
} from "./chunk-E2GALVII.mjs";
import {
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
  MatLabel,
  MatPrefix,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-VDRWKQ4T.mjs";
import "./chunk-Q2CU4U3P.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-27SFIHK6.mjs";
import {
  MatSnackBar
} from "./chunk-DZ43XGSB.mjs";
import "./chunk-BRLSQF3K.mjs";
import "./chunk-3B3VS2W4.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-RDBGA3AP.mjs";
import {
  BreakpointObserver,
  Breakpoints,
  MatNativeDateModule
} from "./chunk-KWDBPYQT.mjs";
import {
  animate,
  state,
  style,
  transition,
  trigger
} from "./chunk-7GASYLAT.mjs";
import "./chunk-Y3VBDLFR.mjs";
import {
  CommonModule,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-VNUZ7HP6.mjs";
import {
  ChangeDetectorRef,
  effect,
  inject,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
  ɵɵclassMap,
  ɵɵclassProp,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdirectiveInject,
  ɵɵelement,
  ɵɵelementContainerEnd,
  ɵɵelementContainerStart,
  ɵɵelementEnd,
  ɵɵelementStart,
  ɵɵgetCurrentView,
  ɵɵlistener,
  ɵɵloadQuery,
  ɵɵnextContext,
  ɵɵpipe,
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
  ɵɵtextInterpolate2,
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-6NXY6CBU.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __objRest,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/dathang/nhucaudathang/nested-data-dialog/nested-data-dialog.component.ts
var _forTrack0 = ($index, $item) => $item.id || $index;
function NestedDataDialogComponent_Conditional_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 9)(1, "div", 13);
    \u0275\u0275element(2, "mat-spinner", 14);
    \u0275\u0275elementStart(3, "p", 15);
    \u0275\u0275text(4, "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
    \u0275\u0275elementEnd()()();
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 29)(2, "mat-icon", 30);
    \u0275\u0275text(3, "inbox");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u \u0111\u1EB7t h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 32);
    \u0275\u0275text(7, "Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n \u0111\u1EB7t h\xE0ng n\xE0o cho s\u1EA3n ph\u1EA9m n\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 33)(9, "p");
    \u0275\u0275text(10, "M\xE3 SP: ");
    \u0275\u0275elementStart(11, "span", 34);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.data.product == null ? null : ctx_r0.data.product.masp);
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_14_For_16_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 39)(1, "td", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 42);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 43);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 44)(12, "span", 45);
    \u0275\u0275text(13);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const dathang_r2 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(dathang_r2.mancc || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDateForDisplay(dathang_r2.ngaydat || dathang_r2.createdAt, "DD/MM/YYYY"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 6, dathang_r2.sldat || dathang_r2.soluong || 0, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 9, dathang_r2.slnhan || dathang_r2.soluongnhan || 0, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.getDathangStatusClass(dathang_r2.trangthai || dathang_r2.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusText(dathang_r2.trangthai || dathang_r2.status), " ");
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "table", 35)(2, "thead")(3, "tr", 36)(4, "th", 37);
    \u0275\u0275text(5, "M\xE3 \u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 37);
    \u0275\u0275text(7, "Ng\xE0y \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 38);
    \u0275\u0275text(9, "SL \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 38);
    \u0275\u0275text(11, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 37);
    \u0275\u0275text(13, "Tr\u1EA1ng Th\xE1i");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "tbody");
    \u0275\u0275repeaterCreate(15, NestedDataDialogComponent_Conditional_17_Conditional_14_For_16_Template, 14, 12, "tr", 39, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(15);
    \u0275\u0275repeater(ctx_r0.data.dathangData);
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_27_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23)(1, "div", 46)(2, "mat-icon", 47);
    \u0275\u0275text(3, "inbox");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "p", 31);
    \u0275\u0275text(5, "Ch\u01B0a c\xF3 d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "p", 32);
    \u0275\u0275text(7, "Kh\xF4ng t\xECm th\u1EA5y \u0111\u01A1n h\xE0ng n\xE0o cho s\u1EA3n ph\u1EA9m n\xE0y");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 33)(9, "p");
    \u0275\u0275text(10, "M\xE3 SP: ");
    \u0275\u0275elementStart(11, "span", 34);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate(ctx_r0.data.product == null ? null : ctx_r0.data.product.masp);
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_28_For_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 51)(1, "td", 40);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 41);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "td", 52);
    \u0275\u0275text(6);
    \u0275\u0275pipe(7, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "td", 43);
    \u0275\u0275text(9);
    \u0275\u0275pipe(10, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 53);
    \u0275\u0275text(12);
    \u0275\u0275pipe(13, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "td", 44)(15, "span", 45);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const donhang_r3 = ctx.$implicit;
    const ctx_r0 = \u0275\u0275nextContext(3);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(donhang_r3.madonhang || donhang_r3.id || "N/A");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r0.formatDateForDisplay(donhang_r3.ngaygiao || donhang_r3.deliveryDate || donhang_r3.createdAt, "DD/MM/YYYY"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(7, 7, donhang_r3.sldat || donhang_r3.soluong || 0, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(10, 10, donhang_r3.slgiao || donhang_r3.soluonggiao || 0, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(13, 13, donhang_r3.slnhan || donhang_r3.soluongnhan || 0, "1.0-0"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275property("ngClass", ctx_r0.getDonhangStatusClass(donhang_r3.trangthai || donhang_r3.status));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r0.getStatusText(donhang_r3.trangthai || donhang_r3.status), " ");
  }
}
function NestedDataDialogComponent_Conditional_17_Conditional_28_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "table", 35)(2, "thead")(3, "tr", 48)(4, "th", 49);
    \u0275\u0275text(5, "M\xE3 \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "th", 49);
    \u0275\u0275text(7, "Ng\xE0y Giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 50);
    \u0275\u0275text(9, "SL \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 50);
    \u0275\u0275text(11, "SL Giao");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 50);
    \u0275\u0275text(13, "SL Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 49);
    \u0275\u0275text(15, "Tr\u1EA1ng Th\xE1i");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(16, "tbody");
    \u0275\u0275repeaterCreate(17, NestedDataDialogComponent_Conditional_17_Conditional_28_For_18_Template, 17, 16, "tr", 51, _forTrack0);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(17);
    \u0275\u0275repeater(ctx_r0.data.donhangData);
  }
}
function NestedDataDialogComponent_Conditional_17_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 10)(1, "div", 16)(2, "div", 17)(3, "div", 18)(4, "div", 19)(5, "button", 2)(6, "mat-icon", 3);
    \u0275\u0275text(7, "shopping_cart");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "h4", 20);
    \u0275\u0275text(9, "\u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "span", 21);
    \u0275\u0275text(11);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(12, "div", 22);
    \u0275\u0275template(13, NestedDataDialogComponent_Conditional_17_Conditional_13_Template, 13, 1, "div", 23)(14, NestedDataDialogComponent_Conditional_17_Conditional_14_Template, 17, 0, "div", 24);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(15, "div", 25)(16, "div", 26)(17, "div", 18)(18, "div", 19)(19, "button", 2)(20, "mat-icon", 3);
    \u0275\u0275text(21, "local_shipping");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "h4", 27);
    \u0275\u0275text(23, "\u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "span", 28);
    \u0275\u0275text(25);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(26, "div", 22);
    \u0275\u0275template(27, NestedDataDialogComponent_Conditional_17_Conditional_27_Template, 13, 1, "div", 23)(28, NestedDataDialogComponent_Conditional_17_Conditional_28_Template, 19, 0, "div", 24);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r0 = \u0275\u0275nextContext();
    \u0275\u0275advance(11);
    \u0275\u0275textInterpolate1(" ", ctx_r0.data.dathangData.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.data.dathangData.length === 0 ? 13 : 14);
    \u0275\u0275advance(12);
    \u0275\u0275textInterpolate1(" ", ctx_r0.data.donhangData.length, " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r0.data.donhangData.length === 0 ? 27 : 28);
  }
}
var NestedDataDialogComponent = class _NestedDataDialogComponent {
  dialogRef;
  data;
  timezoneService = inject(TimezoneService);
  cdr = inject(ChangeDetectorRef);
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  ngOnInit() {
    console.log("Dialog initialized with data:", this.data);
    if (this.data) {
      this.data.triggerChangeDetection = () => {
        console.log("Triggering change detection, loading:", this.data.loading);
        this.cdr.detectChanges();
      };
    }
  }
  /**
   * Manual trigger for change detection (can be called externally)
   */
  triggerChangeDetection() {
    this.cdr.detectChanges();
  }
  /**
   * Close the dialog
   */
  closeDialog() {
    this.dialogRef.close();
  }
  /**
   * Format date for display
   */
  formatDateForDisplay(utcDate, format = "DD/MM/YYYY") {
    return this.timezoneService.formatForDisplay(utcDate, format);
  }
  /**
   * Get status color class for dathang
   */
  getDathangStatusClass(status) {
    return {
      "bg-green-100 text-green-800": status === "completed",
      "bg-yellow-100 text-yellow-800": status === "pending",
      "bg-blue-100 text-blue-800": status === "processing",
      "bg-gray-100 text-gray-800": !status || status === "unknown"
    };
  }
  /**
   * Get status color class for donhang
   */
  getDonhangStatusClass(status) {
    return {
      "bg-green-100 text-green-800": status === "delivered",
      "bg-blue-100 text-blue-800": status === "shipping",
      "bg-yellow-100 text-yellow-800": status === "pending",
      "bg-orange-100 text-orange-800": status === "processing",
      "bg-gray-100 text-gray-800": !status || status === "unknown"
    };
  }
  /**
   * Get translated status text
   */
  getStatusText(status) {
    const statusMap = {
      "completed": "Ho\xE0n th\xE0nh",
      "pending": "Ch\u1EDD x\u1EED l\xFD",
      "processing": "\u0110ang x\u1EED l\xFD",
      "delivered": "\u0110\xE3 giao",
      "shipping": "\u0110ang giao",
      "cancelled": "\u0110\xE3 h\u1EE7y"
    };
    return statusMap[status] || status || "Kh\xF4ng x\xE1c \u0111\u1ECBnh";
  }
  static \u0275fac = function NestedDataDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NestedDataDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NestedDataDialogComponent, selectors: [["app-nested-data-dialog"]], decls: 21, vars: 3, consts: [[1, "flex", "items-center", "justify-between", "p-4"], [1, "flex", "items-center", "space-x-3"], ["mat-icon-button", ""], ["color", "primary", 1, "text-white"], [1, "text-xl", "font-bold"], [1, "text-blue-100", "text-sm"], [1, "font-mono", "bg-white", "bg-opacity-20", "px-2", "py-1", "rounded"], ["mat-icon-button", "", "matTooltip", "\u0110\xF3ng", 1, "text-white", "hover:bg-white", "hover:bg-opacity-20", "transition-colors", "duration-200", 3, "click"], [1, "mat-typography"], [1, "flex", "items-center", "justify-center", "py-16"], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-6"], ["align", "end", 1, "flex", "flex-row", "justify-end"], ["mat-button", "", "color", "warn", "mat-dialog-close", ""], [1, "text-center"], ["diameter", "50", 1, "mx-auto", "mb-4"], [1, "text-gray-600", "text-lg", "animate-pulse"], [1, "bg-blue-50", "rounded-lg", "border", "border-blue-200", "overflow-hidden"], [1, "bg-blue-100", "px-4", "py-3", "border-b", "border-blue-200"], [1, "flex", "items-center", "justify-between"], [1, "flex", "items-center", "space-x-2"], [1, "font-semibold", "text-blue-800", "!m-0", "!p-0"], [1, "bg-blue-200", "text-blue-800", "px-2", "py-1", "rounded-full", "text-xs", "font-medium"], [1, "p-4", "max-h-96", "overflow-y-auto"], [1, "text-center", "py-8"], [1, "overflow-x-auto"], [1, "bg-green-50", "rounded-lg", "border", "border-green-200", "overflow-hidden"], [1, "bg-green-100", "px-4", "py-3", "border-b", "border-green-200"], [1, "font-semibold", "text-green-800", "!m-0", "!p-0"], [1, "bg-green-200", "text-green-800", "px-2", "py-1", "rounded-full", "text-xs", "font-medium"], [1, "bg-blue-100", "p-4", "rounded-full", "w-16", "h-16", "mx-auto", "mb-4", "flex", "items-center", "justify-center"], [1, "text-4xl", "text-blue-300"], [1, "text-gray-500", "font-medium"], [1, "text-gray-400", "text-sm", "mt-1"], [1, "mt-3", "text-xs", "text-gray-400"], [1, "font-mono"], [1, "w-full", "border-collapse"], [1, "border-b", "border-blue-200"], [1, "text-left", "p-2", "text-xs", "font-semibold", "text-blue-800"], [1, "text-right", "p-2", "text-xs", "font-semibold", "text-blue-800"], [1, "border-b", "border-blue-100", "hover:bg-blue-50", "transition-colors", "duration-150"], [1, "p-2", "font-mono", "text-xs"], [1, "p-2", "text-xs"], [1, "p-2", "text-right", "text-xs", "font-semibold", "text-blue-700"], [1, "p-2", "text-right", "text-xs", "font-semibold", "text-green-600"], [1, "p-2"], [1, "px-2", "py-1", "rounded-full", "text-xs", "font-medium", 3, "ngClass"], [1, "bg-green-100", "p-4", "rounded-full", "w-16", "h-16", "mx-auto", "mb-4", "flex", "items-center", "justify-center"], [1, "text-4xl", "text-green-300"], [1, "border-b", "border-green-200"], [1, "text-left", "p-2", "text-xs", "font-semibold", "text-green-800"], [1, "text-right", "p-2", "text-xs", "font-semibold", "text-green-800"], [1, "border-b", "border-green-100", "hover:bg-green-50", "transition-colors", "duration-150"], [1, "p-2", "text-right", "text-xs", "font-semibold", "text-blue-600"], [1, "p-2", "text-right", "text-xs", "font-semibold", "text-purple-600"]], template: function NestedDataDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "button", 2)(3, "mat-icon", 3);
      \u0275\u0275text(4, "inventory_2");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(5, "div")(6, "h3", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, " M\xE3 SP: ");
      \u0275\u0275elementStart(10, "span", 6);
      \u0275\u0275text(11);
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(12, "button", 7);
      \u0275\u0275listener("click", function NestedDataDialogComponent_Template_button_click_12_listener() {
        return ctx.closeDialog();
      });
      \u0275\u0275elementStart(13, "mat-icon");
      \u0275\u0275text(14, "close");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(15, "mat-dialog-content", 8);
      \u0275\u0275template(16, NestedDataDialogComponent_Conditional_16_Template, 5, 0, "div", 9)(17, NestedDataDialogComponent_Conditional_17_Template, 29, 4, "div", 10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "div", 11)(19, "button", 12);
      \u0275\u0275text(20, "\u0110\xF3ng");
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.data.product == null ? null : ctx.data.product.title) || "Chi ti\u1EBFt s\u1EA3n ph\u1EA9m");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate((ctx.data.product == null ? null : ctx.data.product.masp) || "N/A");
      \u0275\u0275advance(5);
      \u0275\u0275conditional(ctx.data.loading ? 16 : 17);
    }
  }, dependencies: [CommonModule, NgClass, DecimalPipe, MatDialogModule, MatDialogClose, MatDialogContent, MatButtonModule, MatButton, MatIconButton, MatIconModule, MatIcon, MatProgressSpinnerModule, MatProgressSpinner, MatTooltipModule, MatTooltip], styles: ["\n\n.mat-mdc-dialog-container[_ngcontent-%COMP%] {\n  max-width: 95vw !important;\n  max-height: 95vh !important;\n}\n.p-4.max-h-96.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.p-4.max-h-96.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: rgba(0, 0, 0, 0.1);\n  border-radius: 3px;\n}\n.p-4.max-h-96.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: rgba(0, 0, 0, 0.3);\n  border-radius: 3px;\n}\n.p-4.max-h-96.overflow-y-auto[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: rgba(0, 0, 0, 0.5);\n}\n.border-b.hover\\:bg-blue-50[_ngcontent-%COMP%]:hover {\n  background-color: rgba(59, 130, 246, 0.05) !important;\n}\n.border-b.hover\\:bg-green-50[_ngcontent-%COMP%]:hover {\n  background-color: rgba(34, 197, 94, 0.05) !important;\n}\n.mat-mdc-dialog-content[_ngcontent-%COMP%] {\n  padding: 0 24px !important;\n}\n.bg-gradient-to-r.from-blue-600.to-blue-700[_ngcontent-%COMP%] {\n  background:\n    linear-gradient(\n      135deg,\n      #2563eb 0%,\n      #1d4ed8 100%);\n}\n.animate-pulse[_ngcontent-%COMP%] {\n  animation: _ngcontent-%COMP%_pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite;\n}\n@keyframes _ngcontent-%COMP%_pulse {\n  0%, 100% {\n    opacity: 1;\n  }\n  50% {\n    opacity: 0.5;\n  }\n}\n.px-2.py-1.rounded-full.text-xs.font-medium[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  justify-content: center;\n  min-width: 60px;\n  text-align: center;\n  font-weight: 600;\n  letter-spacing: 0.025em;\n}\n@media (max-width: 1024px) {\n  .grid.grid-cols-1.lg\\:grid-cols-2[_ngcontent-%COMP%] {\n    grid-template-columns: 1fr;\n  }\n  .mat-mdc-dialog-container[_ngcontent-%COMP%] {\n    max-width: 98vw !important;\n    margin: 8px;\n  }\n}\n.text-4xl.text-blue-300[_ngcontent-%COMP%], \n.text-4xl.text-green-300[_ngcontent-%COMP%] {\n  font-size: 3rem;\n  opacity: 0.6;\n}\n/*# sourceMappingURL=nested-data-dialog.component.css.map */"], changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NestedDataDialogComponent, { className: "NestedDataDialogComponent", filePath: "src/app/admin/dathang/nhucaudathang/nested-data-dialog/nested-data-dialog.component.ts", lineNumber: 32 });
})();

// src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts
var import_moment = __toESM(require_moment());

// src/app/admin/dathang/nhucaudathang/stock-warning-dialog.component.ts
var _forTrack02 = ($index, $item) => $item.masp;
function StockWarningDialogComponent_Conditional_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 15)(1, "mat-icon", 23);
    \u0275\u0275text(2, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "p", 24);
    \u0275\u0275text(4, "T\u1EA5t c\u1EA3 s\u1ED1 li\u1EC7u h\u1EE3p l\u1EC7, kh\xF4ng c\xF3 c\u1EA3nh b\xE1o b\u1EA5t th\u01B0\u1EDDng.");
    \u0275\u0275elementEnd()();
  }
}
function StockWarningDialogComponent_Conditional_34_For_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 29)(2, "div", 30)(3, "div")(4, "span", 31);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "span", 32);
    \u0275\u0275text(7);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(8, "span", 33);
    \u0275\u0275text(9);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(10, "div", 34)(11, "div")(12, "span", 35);
    \u0275\u0275text(13, "C\u0169:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "span", 36);
    \u0275\u0275text(15);
    \u0275\u0275pipe(16, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "div", 37);
    \u0275\u0275text(18, "\u2192");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(19, "div")(20, "span", 35);
    \u0275\u0275text(21, "M\u1EDBi:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(22, "span", 36);
    \u0275\u0275text(23);
    \u0275\u0275pipe(24, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(25, "div")(26, "span", 35);
    \u0275\u0275text(27, "Ch\xEAnh l\u1EC7ch:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(28, "span", 38);
    \u0275\u0275text(29);
    \u0275\u0275pipe(30, "number");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(31, "div", 39);
    \u0275\u0275text(32);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    \u0275\u0275classProp("border-red-300", item_r1.mucDoNghiemTrong === "cao")("bg-red-50", item_r1.mucDoNghiemTrong === "cao")("border-amber-300", item_r1.mucDoNghiemTrong === "trung_binh")("bg-amber-50", item_r1.mucDoNghiemTrong === "trung_binh")("border-yellow-300", item_r1.mucDoNghiemTrong === "thap")("bg-yellow-50", item_r1.mucDoNghiemTrong === "thap");
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(item_r1.masp);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r1.title);
    \u0275\u0275advance();
    \u0275\u0275classProp("bg-red-200", item_r1.mucDoNghiemTrong === "cao")("text-red-800", item_r1.mucDoNghiemTrong === "cao")("bg-amber-200", item_r1.mucDoNghiemTrong === "trung_binh")("text-amber-800", item_r1.mucDoNghiemTrong === "trung_binh")("bg-yellow-200", item_r1.mucDoNghiemTrong === "thap")("text-yellow-800", item_r1.mucDoNghiemTrong === "thap");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r1.mucDoNghiemTrong === "cao" ? "\u{1F534} Cao" : item_r1.mucDoNghiemTrong === "trung_binh" ? "\u{1F7E1} TB" : "\u{1F7E2} Th\u1EA5p", " ");
    \u0275\u0275advance(6);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(16, 40, item_r1.sltonCu, "1.0-1"));
    \u0275\u0275advance(7);
    \u0275\u0275classProp("text-red-600", item_r1.mucDoNghiemTrong === "cao")("text-amber-600", item_r1.mucDoNghiemTrong === "trung_binh");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(24, 43, item_r1.sltonMoi, "1.0-1"), " ");
    \u0275\u0275advance(5);
    \u0275\u0275classProp("text-green-600", item_r1.loaiDieuChinh === "tang")("text-red-600", item_r1.loaiDieuChinh === "giam");
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", item_r1.loaiDieuChinh === "tang" ? "+" : "-", "", \u0275\u0275pipeBind2(30, 46, item_r1.chenhLech, "1.0-1"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" \u{1F4A1} ", item_r1.lyDoCanhBao, " ");
  }
}
function StockWarningDialogComponent_Conditional_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 25)(1, "mat-icon", 26);
    \u0275\u0275text(2, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275repeaterCreate(4, StockWarningDialogComponent_Conditional_34_For_5_Template, 33, 49, "div", 27, _forTrack02);
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" Ph\xE1t hi\u1EC7n ", ctx_r1.data.danhSachCanhBao.length, " s\u1EA3n ph\u1EA9m c\xF3 s\u1ED1 li\u1EC7u b\u1EA5t th\u01B0\u1EDDng: ");
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.data.danhSachCanhBao);
  }
}
var StockWarningDialogComponent = class _StockWarningDialogComponent {
  dialogRef;
  data;
  hasCriticalWarnings;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
    this.hasCriticalWarnings = data.danhSachCanhBao.some((w) => w.mucDoNghiemTrong === "cao");
  }
  onConfirm() {
    this.dialogRef.close(true);
  }
  onCancel() {
    this.dialogRef.close(false);
  }
  static \u0275fac = function StockWarningDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StockWarningDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _StockWarningDialogComponent, selectors: [["app-stock-warning-dialog"]], decls: 53, vars: 10, consts: [[1, "p-0", "max-w-[700px]"], [1, "bg-amber-50", "border-b", "border-amber-200", "px-6", "py-4"], [1, "flex", "items-center", "gap-3"], [1, "text-amber-600", "text-3xl", 2, "font-size", "32px", "width", "32px", "height", "32px"], [1, "text-lg", "font-bold", "text-amber-800", "m-0"], [1, "text-sm", "text-amber-600", "m-0", "mt-1"], [1, "px-6", "py-4", "bg-gray-50", "border-b"], [1, "grid", "grid-cols-4", "gap-3", "text-center"], [1, "bg-white", "rounded-lg", "p-3", "shadow-sm"], [1, "text-2xl", "font-bold", "text-gray-800"], [1, "text-xs", "text-gray-500"], [1, "text-2xl", "font-bold", "text-green-600"], [1, "text-2xl", "font-bold", "text-gray-400"], [1, "text-2xl", "font-bold", "text-red-600"], [1, "px-6", "py-4", "max-h-[400px]", "overflow-auto"], [1, "text-center", "py-8", "text-green-600"], [1, "px-6", "py-4", "border-t", "bg-gray-50", "flex", "justify-between", "items-center"], [1, "font-bold", "text-blue-600"], [1, "font-bold", "text-orange-600"], [1, "flex", "gap-3"], ["mat-button", "", 1, "text-gray-600", 3, "click"], [1, "mr-1", 2, "font-size", "18px"], ["mat-flat-button", "", 3, "click", "color"], [2, "font-size", "48px", "width", "48px", "height", "48px"], [1, "mt-2", "font-medium"], [1, "text-sm", "font-semibold", "text-red-700", "mb-3", "flex", "items-center", "gap-1"], [1, "text-red-600", 2, "font-size", "18px", "width", "18px", "height", "18px"], [1, "border", "rounded-lg", "mb-3", "overflow-hidden", 3, "border-red-300", "bg-red-50", "border-amber-300", "bg-amber-50", "border-yellow-300", "bg-yellow-50"], [1, "border", "rounded-lg", "mb-3", "overflow-hidden"], [1, "px-4", "py-3"], [1, "flex", "justify-between", "items-start"], [1, "font-bold", "text-sm", "text-gray-800"], [1, "text-xs", "text-gray-500", "ml-2"], [1, "text-xs", "px-2", "py-0.5", "rounded-full", "font-medium"], [1, "mt-2", "flex", "gap-4", "text-xs"], [1, "text-gray-500"], [1, "font-semibold", "ml-1"], [1, "font-bold"], [1, "font-bold", "ml-1"], [1, "mt-1.5", "text-xs", "text-gray-600", "italic"]], template: function StockWarningDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "div", 2)(3, "mat-icon", 3);
      \u0275\u0275text(4, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(5, "div")(6, "h2", 4);
      \u0275\u0275text(7);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "p", 5);
      \u0275\u0275text(9, "Vui l\xF2ng xem x\xE9t k\u1EF9 tr\u01B0\u1EDBc khi x\xE1c nh\u1EADn");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(10, "div", 6)(11, "div", 7)(12, "div", 8)(13, "div", 9);
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "div", 10);
      \u0275\u0275text(16, "T\u1ED5ng SP");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(17, "div", 8)(18, "div", 11);
      \u0275\u0275text(19);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(20, "div", 10);
      \u0275\u0275text(21, "B\xECnh th\u01B0\u1EDDng");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(22, "div", 8)(23, "div", 12);
      \u0275\u0275text(24);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(25, "div", 10);
      \u0275\u0275text(26, "Kh\xF4ng \u0111\u1ED5i");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 8)(28, "div", 13);
      \u0275\u0275text(29);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(30, "div", 10);
      \u0275\u0275text(31, "\u26A0\uFE0F C\u1EA3nh b\xE1o");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(32, "div", 14);
      \u0275\u0275template(33, StockWarningDialogComponent_Conditional_33_Template, 5, 0, "div", 15)(34, StockWarningDialogComponent_Conditional_34_Template, 6, 1);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "div", 16)(36, "div", 10);
      \u0275\u0275text(37, " T\u0103ng: ");
      \u0275\u0275elementStart(38, "span", 17);
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275text(40, " SP | Gi\u1EA3m: ");
      \u0275\u0275elementStart(41, "span", 18);
      \u0275\u0275text(42);
      \u0275\u0275elementEnd();
      \u0275\u0275text(43, " SP ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 19)(45, "button", 20);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_45_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(46, "mat-icon", 21);
      \u0275\u0275text(47, "close");
      \u0275\u0275elementEnd();
      \u0275\u0275text(48, " H\u1EE7y b\u1ECF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(49, "button", 22);
      \u0275\u0275listener("click", function StockWarningDialogComponent_Template_button_click_49_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(50, "mat-icon", 21);
      \u0275\u0275text(51, "check");
      \u0275\u0275elementEnd();
      \u0275\u0275text(52);
      \u0275\u0275elementEnd()()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.data.title);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.data.tongSanPham);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.spBinhThuong);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.spKhongThayDoi);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate(ctx.data.danhSachCanhBao.length);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.data.danhSachCanhBao.length === 0 ? 33 : 34);
      \u0275\u0275advance(6);
      \u0275\u0275textInterpolate(ctx.data.danhSachNhap.length);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.data.danhSachXuat.length);
      \u0275\u0275advance(7);
      \u0275\u0275property("color", ctx.hasCriticalWarnings ? "warn" : "primary");
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" ", ctx.hasCriticalWarnings ? "V\u1EABn x\xE1c nh\u1EADn c\u1EADp nh\u1EADt" : "X\xE1c nh\u1EADn c\u1EADp nh\u1EADt", " ");
    }
  }, dependencies: [CommonModule, DecimalPipe, MatButtonModule, MatButton, MatIconModule, MatIcon], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(StockWarningDialogComponent, { className: "StockWarningDialogComponent", filePath: "src/app/admin/dathang/nhucaudathang/stock-warning-dialog.component.ts", lineNumber: 158 });
})();

// src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack03 = ($index, $item) => $item.key;
function NhucaudathangComponent_Conditional_64_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 40);
    \u0275\u0275text(1, " \u26A0\uFE0F C\xF3 thay \u0111\u1ED5i ng\xE0y ch\u01B0a \u0111\u01B0\u1EE3c \xE1p d\u1EE5ng ");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_79_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 73);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_79_Template_button_click_0_listener($event) {
      const item_r4 = \u0275\u0275restoreView(_r3).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      ctx_r4.toggleColumn(item_r4);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r4 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r4.value);
  }
}
function NhucaudathangComponent_Conditional_81_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 49);
  }
}
function NhucaudathangComponent_Conditional_82_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "file_download");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_Conditional_84_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 49);
  }
}
function NhucaudathangComponent_Conditional_85_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "refresh");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_Conditional_90_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" \u{1F4C5} ", ctx_r4.formatDateForDisplay(ctx_r4.batdau, "DD/MM"), " - ", ctx_r4.formatDateForDisplay(ctx_r4.ketthuc, "DD/MM"), " ");
  }
}
function NhucaudathangComponent_Conditional_92_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "mat-spinner", 74);
    \u0275\u0275elementStart(1, "span");
    \u0275\u0275text(2, "\u0110ang c\u1EADp nh\u1EADt...");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_Conditional_93_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "\u{1F4C1} C\u1EADp Nh\u1EADt T\u1ED3n Kho");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_Conditional_96_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 56)(1, "div", 75);
    \u0275\u0275element(2, "mat-spinner", 76);
    \u0275\u0275elementStart(3, "div", 77)(4, "h3", 78);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1(" ", ctx_r4.isRefreshing ? "\u0110ang l\xE0m m\u1EDBi..." : "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...", " ");
  }
}
function NhucaudathangComponent_For_100_th_1_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span");
  }
}
function NhucaudathangComponent_For_100_th_1_Conditional_2_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 94);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.ColumnSubtitle[column_r7]);
  }
}
function NhucaudathangComponent_For_100_th_1_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 28)(1, "div", 92)(2, "span", 93);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NhucaudathangComponent_For_100_th_1_Conditional_2_Conditional_4_Template, 2, 1, "span", 94);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 95, 7);
    \u0275\u0275text(7, " filter_alt ");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    \u0275\u0275nextContext();
    const filterMenu_r8 = \u0275\u0275reference(4);
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", ctx_r4.ColumnName[column_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.ColumnSubtitle[column_r7] ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275propertyInterpolate1("matTooltip", "Filter ", ctx_r4.ColumnName[column_r7], "");
    \u0275\u0275property("matMenuTriggerFor", filterMenu_r8);
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 99);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_span_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "span", 100);
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.formatDateForDisplay(item_r10[column_r7], "DD/MM/YYYY"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.formatDateForDisplay(item_r10[column_r7], "DD/MM/YYYY"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(ctx_r4.formatDateForDisplay(item_r10[column_r7], "DD/MM/YYYY"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r10[column_r7], "1.0-0"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r10[column_r7], "1.0-0"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r10[column_r7], "1.0-0"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r10[column_r7], "1.0-0"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r10[column_r7], "1.0-0"));
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(item_r10[column_r7] || "Tr\u1ED1ng");
  }
}
function NhucaudathangComponent_For_100_th_1_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 96);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_div_20_Template_div_click_0_listener() {
      const item_r10 = \u0275\u0275restoreView(_r9).$implicit;
      const column_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenItem(item_r10, column_r7));
    });
    \u0275\u0275template(1, NhucaudathangComponent_For_100_th_1_div_20_span_1_Template, 2, 0, "span", 97)(2, NhucaudathangComponent_For_100_th_1_div_20_span_2_Template, 1, 0, "span", 98)(3, NhucaudathangComponent_For_100_th_1_div_20_Case_3_Template, 2, 1, "span")(4, NhucaudathangComponent_For_100_th_1_div_20_Case_4_Template, 2, 1, "span")(5, NhucaudathangComponent_For_100_th_1_div_20_Case_5_Template, 2, 1, "span")(6, NhucaudathangComponent_For_100_th_1_div_20_Case_6_Template, 3, 4, "span")(7, NhucaudathangComponent_For_100_th_1_div_20_Case_7_Template, 3, 4, "span")(8, NhucaudathangComponent_For_100_th_1_div_20_Case_8_Template, 3, 4, "span")(9, NhucaudathangComponent_For_100_th_1_div_20_Case_9_Template, 3, 4, "span")(10, NhucaudathangComponent_For_100_th_1_div_20_Case_10_Template, 3, 4, "span")(11, NhucaudathangComponent_For_100_th_1_div_20_Case_11_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_26_0;
    const item_r10 = ctx.$implicit;
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r4.CheckItem(item_r10));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r4.CheckItem(item_r10));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_26_0 = column_r7) === "createdAt" ? 3 : tmp_26_0 === "updatedAt" ? 4 : tmp_26_0 === "ngaynhan" ? 5 : tmp_26_0 === "slton" ? 6 : tmp_26_0 === "slchogiao" ? 7 : tmp_26_0 === "slchonhap" ? 8 : tmp_26_0 === "SLDat" ? 9 : tmp_26_0 === "SLGiao" ? 10 : 11);
  }
}
function NhucaudathangComponent_For_100_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 81);
    \u0275\u0275template(1, NhucaudathangComponent_For_100_th_1_Conditional_1_Template, 1, 0, "span")(2, NhucaudathangComponent_For_100_th_1_Conditional_2_Template, 8, 5, "div", 28);
    \u0275\u0275elementStart(3, "mat-menu", 82, 10)(5, "div", 83);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_Template_div_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(6, "div", 84)(7, "input", 85);
    \u0275\u0275listener("keyup", function NhucaudathangComponent_For_100_th_1_Template_input_keyup_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const column_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.doFilterHederColumn($event, column_r7));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 18)(9, "span", 19);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 86)(12, "div", 87)(13, "span", 88);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_Template_span_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const column_r7 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.ChosenAll(ctx_r4.getCurrentFilteredData(column_r7)));
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 88);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_Template_span_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.EmptyFiter());
    });
    \u0275\u0275text(16, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "span", 88);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_Template_span_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.ResetFilter());
    });
    \u0275\u0275text(18, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 89);
    \u0275\u0275template(20, NhucaudathangComponent_For_100_th_1_div_20_Template, 12, 3, "div", 90);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 91)(22, "button", 70);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_th_1_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r4 = \u0275\u0275nextContext(2);
      const menuTrigger_r11 = \u0275\u0275reference(116);
      return \u0275\u0275resetView(ctx_r4.ApplyFilterColum(menuTrigger_r11));
    });
    \u0275\u0275text(23, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r7 === "expand" ? 1 : 2);
    \u0275\u0275advance(6);
    \u0275\u0275propertyInterpolate1("placeholder", "T\xECm ki\u1EBFm ", ctx_r4.ColumnName[column_r7], "...");
    \u0275\u0275advance(7);
    \u0275\u0275textInterpolate1(" Ch\u1ECDn T\u1EA5t C\u1EA3 (", ctx_r4.getCurrentFilteredData(column_r7).length || 0, ") ");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r4.getCurrentFilteredData(column_r7))("ngForTrackBy", ctx_r4.trackByFn);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_1_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 118);
    \u0275\u0275element(1, "div", 120);
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_td_2_Case_1_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 119);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.getTotalNestedDataCount(row_r13.masp), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 102)(1, "button", 116);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_td_2_Case_1_Template_button_click_1_listener($event) {
      \u0275\u0275restoreView(_r12);
      const row_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      ctx_r4.toggleExpanded(row_r13);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(2, "mat-icon", 117);
    \u0275\u0275text(3, " visibility ");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NhucaudathangComponent_For_100_td_2_Case_1_Conditional_4_Template, 2, 0, "div", 118);
    \u0275\u0275elementEnd();
    \u0275\u0275template(5, NhucaudathangComponent_For_100_td_2_Case_1_Conditional_5_Template, 2, 1, "span", 119);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("matTooltip", "Xem \u0111\u1EB7t h\xE0ng & \u0111\u01A1n h\xE0ng");
    \u0275\u0275attribute("aria-label", "Xem chi ti\u1EBFt");
    \u0275\u0275advance(3);
    \u0275\u0275conditional(ctx_r4.isAnyDataLoading(row_r13.masp) ? 4 : -1);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.hasNestedData(row_r13.masp) ? 5 : -1);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 103);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r14 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r14 + 1, " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 104);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("matTooltip", row_r13[column_r7]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r13[column_r7], " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 105);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r13[column_r7], " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 121);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 122);
    \u0275\u0275text(5, "t\u1ED3n t\u1EF1 \u0111\u1ED9ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275classProp("text-red-600", row_r13[column_r7] <= 0)("text-green-600", row_r13[column_r7] > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 5, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 107);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 108);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 109);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 110);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_10_Conditional_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "span", 124);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 125);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275pipe(7, "number");
    \u0275\u0275pipe(8, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 4, row_r13[column_r7], "1.0-1"));
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate3("", \u0275\u0275pipeBind2(6, 7, row_r13["khachdat"], "1.0-0"), "+", \u0275\u0275pipeBind2(7, 10, row_r13["slhaohut"], "1.0-1"), "-", \u0275\u0275pipeBind2(8, 13, row_r13["tongkho"], "1.0-0"), "");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_10_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "div", 126)(2, "mat-icon", 127);
    \u0275\u0275text(3, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "span", 128);
    \u0275\u0275text(8);
    \u0275\u0275pipe(9, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(6, 2, ctx_r4.GetAbs(row_r13[column_r7]), "1.0-1"), ")");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("D\u01B0 ", \u0275\u0275pipeBind2(9, 5, ctx_r4.GetAbs(row_r13[column_r7]), "1.0-0"), "");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_10_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "span", 129);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 130);
    \u0275\u0275text(5, "\u0110\u1EE7 h\xE0ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(3, 1, ctx_r4.GetAbs(row_r13[column_r7]), "1.0-1"), ")");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_10_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 123);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, ctx_r4.GetAbs(row_r13[column_r7]), "1.0-1"));
  }
}
function NhucaudathangComponent_For_100_td_2_Case_10_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, NhucaudathangComponent_For_100_td_2_Case_10_Conditional_0_Template, 9, 16, "div", 92)(1, NhucaudathangComponent_For_100_td_2_Case_10_Conditional_1_Template, 10, 8, "div", 92)(2, NhucaudathangComponent_For_100_td_2_Case_10_Conditional_2_Template, 6, 4, "div", 92)(3, NhucaudathangComponent_For_100_td_2_Case_10_Conditional_3_Template, 3, 4, "span", 123);
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275conditional(row_r13[column_r7] > 0 ? 0 : row_r13[column_r7] < -100 ? 1 : row_r13[column_r7] < 0 ? 2 : 3);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_11_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 132);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" \u{1F552} ", ctx_r4.formatDateForDisplay(row_r13["updatedAt"], "HH:mm DD/MM/YY"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_11_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 92)(1, "span", 131);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NhucaudathangComponent_For_100_td_2_Case_11_Conditional_4_Template, 2, 1, "span", 132);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(3, 2, row_r13[column_r7], "1.0-1"));
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r13["updatedAt"] ? 4 : -1);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_12_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatDateForDisplay(row_r13[column_r7], "DD/MM/YYYY"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_13_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatDateForDisplay(row_r13[column_r7], "DD/MM/YYYY"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_14_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 111);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r4.formatDateForDisplay(row_r13[column_r7], "DD/MM/YYYY"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_15_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 133);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_td_2_Case_15_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 134);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_td_2_Case_15_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 112);
    \u0275\u0275template(1, NhucaudathangComponent_For_100_td_2_Case_15_Conditional_1_Template, 2, 0, "mat-icon", 133)(2, NhucaudathangComponent_For_100_td_2_Case_15_Conditional_2_Template, 2, 0, "mat-icon", 134);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r13[column_r7] ? 1 : 2);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 138);
    \u0275\u0275listener("keydown", function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_1_Template_input_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onFieldKeyDown($event, row_r13, "ghichu"));
    })("blur", function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_1_Template_input_blur_0_listener($event) {
      \u0275\u0275restoreView(_r16);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onFieldBlur($event, row_r13, "ghichu"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", ctx_r4.getFieldValue(row_r13, "ghichu"));
  }
}
function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 141);
    \u0275\u0275text(1, "edit");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r17 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 139);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_td_2_Case_16_Conditional_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r17);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.startEdit(row_r13, "ghichu"));
    });
    \u0275\u0275elementStart(1, "span", 140);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, NhucaudathangComponent_For_100_td_2_Case_16_Conditional_2_Conditional_3_Template, 2, 0, "mat-icon", 141);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-yellow-50", ctx_r4.hasFieldChanged(row_r13, "ghichu"))("border-yellow-400", ctx_r4.hasFieldChanged(row_r13, "ghichu"));
    \u0275\u0275property("matTooltip", ctx_r4.getFieldValue(row_r13, "ghichu") || "Click \u0111\u1EC3 ch\u1EC9nh s\u1EEDa");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r4.getFieldValue(row_r13, "ghichu") || "---", " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.hasFieldChanged(row_r13, "ghichu") ? 3 : -1);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_16_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 135);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_td_2_Case_16_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r15);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, NhucaudathangComponent_For_100_td_2_Case_16_Conditional_1_Template, 1, 1, "input", 136)(2, NhucaudathangComponent_For_100_td_2_Case_16_Conditional_2_Template, 4, 7, "div", 137);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.isEditing(row_r13, "ghichu") ? 1 : 2);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r19 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "input", 145);
    \u0275\u0275listener("keydown", function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_1_Template_input_keydown_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onFieldKeyDown($event, row_r13, "xSLDat"));
    })("blur", function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_1_Template_input_blur_0_listener($event) {
      \u0275\u0275restoreView(_r19);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.onFieldBlur($event, row_r13, "xSLDat"));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275property("value", ctx_r4.getFieldValue(row_r13, "xSLDat"));
  }
}
function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 141);
    \u0275\u0275text(1, "edit");
    \u0275\u0275elementEnd();
  }
}
function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r20 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 146);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_td_2_Case_17_Conditional_2_Template_div_click_0_listener() {
      \u0275\u0275restoreView(_r20);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r4 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r4.startEdit(row_r13, "xSLDat"));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275template(3, NhucaudathangComponent_For_100_td_2_Case_17_Conditional_2_Conditional_3_Template, 2, 0, "mat-icon", 141);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275classProp("bg-yellow-50", ctx_r4.hasFieldChanged(row_r13, "xSLDat"))("border-yellow-400", ctx_r4.hasFieldChanged(row_r13, "xSLDat"))("text-purple-600", ctx_r4.getFieldValue(row_r13, "xSLDat") > 0);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 8, ctx_r4.getFieldValue(row_r13, "xSLDat") || 0, "1.0-0"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(ctx_r4.hasFieldChanged(row_r13, "xSLDat") ? 3 : -1);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_17_Template(rf, ctx) {
  if (rf & 1) {
    const _r18 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 142);
    \u0275\u0275listener("click", function NhucaudathangComponent_For_100_td_2_Case_17_Template_div_click_0_listener($event) {
      \u0275\u0275restoreView(_r18);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275template(1, NhucaudathangComponent_For_100_td_2_Case_17_Conditional_1_Template, 1, 1, "input", 143)(2, NhucaudathangComponent_For_100_td_2_Case_17_Conditional_2_Template, 4, 11, "div", 144);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const ctx_r4 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275conditional(ctx_r4.isEditing(row_r13, "xSLDat") ? 1 : 2);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_18_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 147);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 122);
    \u0275\u0275text(5, "\u0111\u01A1n ch\u01B0a giao");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 148);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 122);
    \u0275\u0275text(5, "\u0111\xE3 giao");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 1, row_r13[column_r7], "1.0-0"), " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_20_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 149);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span", 125);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 2, row_r13[column_r7], "1.0-1"), " ");
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(6, 5, row_r13["sltontt"], "1.0-0"), " + \u03A3kho ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 150);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 122);
    \u0275\u0275text(4, "t\u1EC9 l\u1EC7 h\u1ECFng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", row_r13[column_r7], "% ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_22_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 125);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", \u0275\u0275pipeBind2(2, 2, row_r13["khachdat"], "1.0-0"), "\xD7", row_r13["haohut"], "% ");
  }
}
function NhucaudathangComponent_For_100_td_2_Case_22_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 106)(1, "span", 150);
    \u0275\u0275text(2);
    \u0275\u0275pipe(3, "number");
    \u0275\u0275elementEnd();
    \u0275\u0275template(4, NhucaudathangComponent_For_100_td_2_Case_22_Conditional_4_Template, 3, 5, "span", 125);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(3, 2, row_r13[column_r7], "1.0-1"), " ");
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r13[column_r7] > 0 ? 4 : -1);
  }
}
function NhucaudathangComponent_For_100_td_2_Case_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 115);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275property("matTooltip", row_r13[column_r7]);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r13[column_r7], " ");
  }
}
function NhucaudathangComponent_For_100_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 101);
    \u0275\u0275template(1, NhucaudathangComponent_For_100_td_2_Case_1_Template, 6, 4, "div", 102)(2, NhucaudathangComponent_For_100_td_2_Case_2_Template, 2, 1, "span", 103)(3, NhucaudathangComponent_For_100_td_2_Case_3_Template, 2, 2, "span", 104)(4, NhucaudathangComponent_For_100_td_2_Case_4_Template, 2, 1, "span", 105)(5, NhucaudathangComponent_For_100_td_2_Case_5_Template, 6, 8, "div", 106)(6, NhucaudathangComponent_For_100_td_2_Case_6_Template, 3, 4, "span", 107)(7, NhucaudathangComponent_For_100_td_2_Case_7_Template, 3, 4, "span", 108)(8, NhucaudathangComponent_For_100_td_2_Case_8_Template, 3, 4, "span", 109)(9, NhucaudathangComponent_For_100_td_2_Case_9_Template, 3, 4, "span", 110)(10, NhucaudathangComponent_For_100_td_2_Case_10_Template, 4, 1)(11, NhucaudathangComponent_For_100_td_2_Case_11_Template, 5, 5, "div", 92)(12, NhucaudathangComponent_For_100_td_2_Case_12_Template, 2, 1, "span", 111)(13, NhucaudathangComponent_For_100_td_2_Case_13_Template, 2, 1, "span", 111)(14, NhucaudathangComponent_For_100_td_2_Case_14_Template, 2, 1, "span", 111)(15, NhucaudathangComponent_For_100_td_2_Case_15_Template, 3, 1, "span", 112)(16, NhucaudathangComponent_For_100_td_2_Case_16_Template, 3, 1, "div", 113)(17, NhucaudathangComponent_For_100_td_2_Case_17_Template, 3, 1, "div", 114)(18, NhucaudathangComponent_For_100_td_2_Case_18_Template, 6, 4, "div", 106)(19, NhucaudathangComponent_For_100_td_2_Case_19_Template, 6, 4, "div", 106)(20, NhucaudathangComponent_For_100_td_2_Case_20_Template, 7, 8, "div", 106)(21, NhucaudathangComponent_For_100_td_2_Case_21_Template, 5, 1, "div", 106)(22, NhucaudathangComponent_For_100_td_2_Case_22_Template, 5, 5, "div", 106)(23, NhucaudathangComponent_For_100_td_2_Case_23_Template, 2, 2, "span", 115);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_23_0;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_23_0 = column_r7) === "expand" ? 1 : tmp_23_0 === "STT" ? 2 : tmp_23_0 === "title" ? 3 : tmp_23_0 === "masp" ? 4 : tmp_23_0 === "slton" ? 5 : tmp_23_0 === "slchogiao" ? 6 : tmp_23_0 === "slchonhap" ? 7 : tmp_23_0 === "SLDat" ? 8 : tmp_23_0 === "SLGiao" ? 9 : tmp_23_0 === "goiy" ? 10 : tmp_23_0 === "sltontt" ? 11 : tmp_23_0 === "createdAt" ? 12 : tmp_23_0 === "updatedAt" ? 13 : tmp_23_0 === "ngaynhan" ? 14 : tmp_23_0 === "isActive" ? 15 : tmp_23_0 === "ghichu" ? 16 : tmp_23_0 === "xSLDat" ? 17 : tmp_23_0 === "khachdat" ? 18 : tmp_23_0 === "khachgiao" ? 19 : tmp_23_0 === "tongkho" ? 20 : tmp_23_0 === "haohut" ? 21 : tmp_23_0 === "slhaohut" ? 22 : 23);
  }
}
function NhucaudathangComponent_For_100_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 59);
    \u0275\u0275template(1, NhucaudathangComponent_For_100_th_1_Template, 24, 6, "th", 79)(2, NhucaudathangComponent_For_100_td_2_Template, 24, 1, "td", 80);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r7);
  }
}
function NhucaudathangComponent_tr_101_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 151);
  }
}
function NhucaudathangComponent_tr_102_Template(rf, ctx) {
  if (rf & 1) {
    const _r21 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 152);
    \u0275\u0275listener("click", function NhucaudathangComponent_tr_102_Template_tr_click_0_listener() {
      const row_r22 = \u0275\u0275restoreView(_r21).$implicit;
      const ctx_r4 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r4.AddToEdit(row_r22));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r22 = ctx.$implicit;
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275classProp("bg-slate-200", ctx_r4.CheckItemInEdit(row_r22));
  }
}
function NhucaudathangComponent_tr_103_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 153)(1, "td", 154)(2, "div", 155)(3, "mat-icon", 156);
    \u0275\u0275text(4, "search_off");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span");
    \u0275\u0275text(6, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r4 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r4.displayedColumns.length);
  }
}
function NhucaudathangComponent_ng_template_134_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 157)(2, "div", 158);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 159)(7, "button", 160);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 161);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
var NhucaudathangComponent = class _NhucaudathangComponent {
  displayedColumns = [
    "expand",
    // Add expansion column
    "title",
    "masp",
    "dvt",
    "mancc",
    "name",
    // 'slchonhap',
    "ghichu",
    "xSLDat",
    // 'SLDat',
    "goiy",
    // 'slchogiao',
    // 'SLGiao',
    "khachdat",
    "khachgiao",
    "slton",
    "sltontt",
    "tongkho",
    "kho1",
    "kho2",
    "kho3",
    "kho4",
    "kho5",
    "kho6",
    "haohut",
    "slhaohut"
  ];
  ColumnName = {
    expand: "",
    // No header for expansion column
    title: "T\xEAn S\u1EA3n Ph\u1EA9m",
    masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
    dvt: "\u0110VT",
    mancc: "M\xE3 NCC",
    name: "T\xEAn Nh\xE0 Cung C\u1EA5p",
    ghichu: "Ghi Ch\xFA",
    // slchonhap: 'SL Đặt (Chờ Nhập)',
    xSLDat: "SL \u0110\u1EB7t (Nh\xE0 CC)",
    // SLDat: 'SL Đã Đặt',
    goiy: "SL C\u1EA7n \u0110\u1EB7t (G\u1EE3i \xDD)",
    // slchogiao: 'SL Bán (Chờ Giao)',
    // SLGiao: 'SL Giao (Khách)',
    khachdat: "T\u1ED4NG \u0110\u1EB6T (KH\xC1CH)",
    khachgiao: "T\u1ED4NG B\xC1N (GIAO)",
    slton: "T\u1ED3n H\u1EC7 Th\u1ED1ng",
    sltontt: "T\u1ED3n Ch\u1ED1t Kho (Th\u1EF1c T\u1EBF)",
    tongkho: "T\u1ED4NG T\u1ED2N (C\xC1C KHO)",
    kho1: "TG-LONG AN",
    kho2: "B\u1ED5 Sung",
    kho3: "TG-\u0110\xC0 L\u1EA0T",
    kho4: "KHO T\u1ED4NG - HCM",
    kho5: "SG1",
    kho6: "SG2",
    haohut: "T\u1EC9 L\u1EC7 Hao H\u1EE5t",
    slhaohut: "SL Hao H\u1EE5t"
  };
  ColumnSubtitle = {
    khachdat: "\u0110\u01A1n ch\u01B0a giao",
    khachgiao: "\u0110\xE3 giao xong",
    slton: "T\u1ED3n tr\xEAn ph\u1EA7n m\u1EC1m",
    sltontt: "Ki\u1EC3m k\xEA l\u1EA7n cu\u1ED1i",
    tongkho: "Ch\u1ED1t kho + \u03A3 Kho NCC",
    goiy: "\u0110\u1EB7t + HaoH\u1EE5t - T\u1ED3nKho",
    haohut: "% d\u1EF1 ki\u1EBFn h\u1ECFng",
    slhaohut: "\u0110\u1EB7t \xD7 HaoH\u1EE5t%",
    xSLDat: "SL nh\u1EADp cho NCC"
  };
  // ColumnName: any = {
  //   title: 'Tên Sản Phẩm',
  //   masp: 'Mã Sản Phẩm',
  //   mancc: 'Mã NCC',
  //   name: 'Tên Nhà Cung Cấp',
  //   makho: 'Mã Kho',
  //   namekho: 'Tên Kho',
  //   slton: 'Tồn Kho',
  //   slchogiao: 'Chờ Giao',
  //   slchonhap: 'Chờ Nhập',
  //   SLDat: 'SL Đặt (Nhà CC)',
  //   SLGiao: 'SL Giao (Khách)',
  //   goiy: 'Gợi Ý',
  // };
  FilterColumns = JSON.parse(localStorage.getItem("NhucauColFilter") || "[]");
  Columns = [];
  // Pagination
  totalItems = 0;
  pageSize = 50;
  currentPage = 1;
  totalPages = 1;
  currentSort = { active: "", direction: "" };
  paginator;
  sort;
  drawer;
  _SanphamService = inject(SanphamService);
  _breakpointObserver = inject(BreakpointObserver);
  _GraphqlService = inject(GraphqlService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _timezoneService = inject(TimezoneService);
  _DathangService = inject(DathangService);
  _DonhangService = inject(DonhangService);
  _PhieukhoService = inject(PhieukhoService);
  _snackBar = inject(MatSnackBar);
  Listsanpham = this._SanphamService.ListSanpham;
  TonghopsFinal = [];
  TonghopsExportFinal = [];
  EditList = [];
  dataSource = new MatTableDataSource();
  ListFilter = [];
  ListDathang = [];
  isSubmit = false;
  quickFilter = "all";
  globalFilterValue = "";
  // Nested table properties
  expandedElementId = null;
  dathangDataMap = /* @__PURE__ */ new Map();
  donhangDataMap = /* @__PURE__ */ new Map();
  loadingDathang = /* @__PURE__ */ new Set();
  loadingDonhang = /* @__PURE__ */ new Set();
  // Loading states
  isLoading = false;
  isExportingExcel = false;
  isImportingExcel = false;
  isUpdatingStock = false;
  isRefreshing = false;
  loadingMessage = "";
  progressPercentage = 0;
  // Date range properties
  batdau = /* @__PURE__ */ new Date();
  // Start date
  ketthuc = /* @__PURE__ */ new Date();
  // End date
  isDateRangeEnabled = false;
  hasUnappliedDateChanges = false;
  // Track if there are changes not yet applied
  // Inline edit properties
  editingRows = /* @__PURE__ */ new Map();
  // Track editing state for each row
  tempStorage = /* @__PURE__ */ new Map();
  // Store temporary edits
  STORAGE_KEY = "nhucau_temp_edits";
  // LocalStorage key for temporary edits
  constructor() {
    effect(() => {
      const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
      this.dataSource.data = currentData;
      this.totalItems = currentData.length;
      this.calculateTotalPages();
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      const today = /* @__PURE__ */ new Date();
      this.batdau = new Date(today);
      this.ketthuc = new Date(today);
      this.loadTempEditsFromStorage();
      this.updateDisplayData();
      this.loadDonhangWithRelations();
      yield this._SanphamService.getNhucau();
      this.dataSource = new MatTableDataSource(this.Listsanpham());
      this.dataSource.paginator = this.paginator;
      this.dataSource.sort = this.sort;
      this.dataSource.sortingDataAccessor = (item, property) => {
        switch (property) {
          case "slton":
          case "slchogiao":
          case "slchonhap":
          case "SLDat":
          case "SLGiao":
          case "kho1":
          case "kho2":
          case "kho3":
          case "kho4":
          case "kho5":
          case "kho6":
          case "haohut":
          case "slhaohut":
            return Number(item[property]) || 0;
          case "goiy":
            return parseFloat(this.GetGoiy(item));
          case "title":
          case "masp":
          case "dvt":
          case "mancc":
          case "name":
          case "makho":
          case "namekho":
            return item[property]?.toLowerCase() || "";
          default:
            return item[property]?.toString().toLowerCase() || "";
        }
      };
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  GetGoiy(item) {
    const suggestion = Number(item.khachdat) + Number(this.GetSLHaohut(item)) - Number(item.tongkho);
    return suggestion.toFixed(3);
  }
  GetAbs(val) {
    return Math.abs(Number(val)) || 0;
  }
  GetSLHaohut(item) {
    if (item.khachdat > 0) {
      const wastageAmount = item.khachdat * (item.haohut || 0) / 100;
      return wastageAmount.toFixed(3);
    } else {
      return 0;
    }
  }
  loadDonhangWithRelations() {
    return __async(this, null, function* () {
      try {
        this.isLoading = false;
        this.loadingMessage = "\u0110ang t\u1EA3i d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng...";
        this.progressPercentage = 0;
        let startDate;
        let endDate;
        if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
          const dateRange = this._timezoneService.getAPIDateRange(this.batdau, this.ketthuc);
          startDate = dateRange.Batdau;
          endDate = dateRange.Ketthuc;
        } else {
          const today = /* @__PURE__ */ new Date();
          const todayRange = this._timezoneService.getAPIDateRange(today, today);
          startDate = todayRange.Batdau;
          endDate = todayRange.Ketthuc;
        }
        this.progressPercentage = 25;
        this.loadingMessage = "\u0110ang x\u1EED l\xFD d\u1EEF li\u1EC7u...";
        const [Donhangs, Dathangs, Tonkhos, Sanphams] = yield Promise.all([
          this._GraphqlService.findAll("donhang", {
            enableParallelFetch: true,
            batchSize: 1e3,
            take: 999999,
            aggressiveCache: true,
            orderBy: { createdAt: "desc" },
            where: {
              ngaygiao: {
                gte: startDate,
                lte: endDate
              }
            },
            select: {
              id: true,
              madonhang: true,
              ngaygiao: true,
              status: true,
              sanpham: {
                select: {
                  giaban: true,
                  sldat: true,
                  slgiao: true,
                  slnhan: true,
                  sanpham: { select: { masp: true } }
                }
              }
            }
          }),
          this._GraphqlService.findAll("dathang", {
            enableParallelFetch: true,
            batchSize: 1e3,
            take: 999999,
            aggressiveCache: true,
            orderBy: { createdAt: "desc" },
            where: {
              ngaynhan: {
                gte: startDate,
                lte: endDate
              }
            },
            select: {
              id: true,
              madncc: true,
              ngaynhan: true,
              nhacungcap: {
                select: {
                  name: true,
                  mancc: true
                }
              },
              sanpham: {
                select: {
                  sldat: true,
                  slgiao: true,
                  slnhan: true,
                  sanpham: { select: { masp: true } }
                }
              },
              kho: {
                select: {
                  name: true,
                  makho: true
                }
              }
            }
          }),
          this._GraphqlService.findAll("tonkho", {
            enableParallelFetch: true,
            aggressiveCache: true,
            batchSize: 1e3,
            take: 999999,
            select: {
              id: true,
              sanphamId: true,
              slton: true,
              sltontt: true,
              slchogiao: true,
              slchonhap: true,
              updatedAt: true,
              sanpham: {
                select: {
                  title: true,
                  masp: true,
                  dvt: true,
                  haohut: true
                }
              }
            }
          }),
          this._GraphqlService.findAll("sanpham", {
            enableParallelFetch: true,
            aggressiveCache: true,
            batchSize: 1e3,
            take: 999999,
            select: {
              id: true,
              title: true,
              masp: true,
              dvt: true,
              haohut: true,
              Nhacungcap: {
                select: { mancc: true, name: true }
              }
            }
          })
        ]);
        const DonhangsTranfer = Donhangs.data.flatMap((order) => order.sanpham.map((sp) => ({
          type: "donhang",
          status: order.status,
          madonhang: order.madonhang,
          ngaygiao: order.ngaygiao,
          masp: sp.sanpham.masp,
          giaban: Number(sp.giaban) || 0,
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0
        })));
        const DathangsTranfer = Dathangs.data.flatMap((order) => {
          return order.sanpham.map((sp) => ({
            type: "dathang",
            madncc: order.madncc,
            mancc: order.nhacungcap.mancc,
            name: order.nhacungcap.name,
            ngaynhan: order.ngaynhan,
            masp: sp.sanpham.masp,
            sldat: Number(sp.sldat) || 0,
            slgiao: Number(sp.slgiao) || 0,
            slnhan: Number(sp.slnhan) || 0,
            makho: order.kho.makho,
            namekho: order.kho.name
          }));
        });
        const TonkhosTranfer = Tonkhos.data.map((sp) => ({
          type: "tonkho",
          masp: sp.sanpham.masp,
          title: sp.sanpham.title,
          dvt: sp.sanpham.dvt,
          haohut: sp.sanpham.haohut || 0,
          slton: Number(sp.slton) || 0,
          sltontt: Number(sp.sltontt) || 0,
          slchogiao: Number(sp.slchogiao) || 0,
          slchonhap: Number(sp.slchonhap) || 0,
          updatedAt: sp.updatedAt
        }));
        const tonghopMap = /* @__PURE__ */ new Map();
        TonkhosTranfer.forEach((tonkho) => {
          tonghopMap.set(tonkho.masp, {
            id: GenId(8, false),
            ngaynhan: tonkho.ngaynhan,
            mancc: tonkho.mancc,
            name: tonkho.name,
            masp: tonkho.masp,
            title: tonkho.title,
            dvt: tonkho.dvt,
            haohut: tonkho.haohut || 0,
            slton: tonkho.slton,
            sltontt: tonkho.sltontt,
            slchogiao: tonkho.slchogiao,
            slchonhap: tonkho.slchonhap,
            SLDat: 0,
            SLGiao: 0
          });
        });
        DathangsTranfer.forEach((dathang) => {
          if (tonghopMap.has(dathang.masp)) {
            const item = tonghopMap.get(dathang.masp);
            item.SLDat += dathang.sldat;
            item.ngaynhan = dathang.ngaynhan;
            item.mancc = dathang.mancc;
            item.name = dathang.name;
            item.makho = dathang.makho;
            item.namekho = dathang.namekho;
          }
        });
        DonhangsTranfer.forEach((donhang) => {
          if (tonghopMap.has(donhang.masp)) {
            const item = tonghopMap.get(donhang.masp);
            item.SLGiao += donhang.slnhan;
          }
        });
        const SanphamsTranfer = Sanphams.data;
        const dathangMap = /* @__PURE__ */ new Map();
        const donhangMap = /* @__PURE__ */ new Map();
        const tonkhoMap = /* @__PURE__ */ new Map();
        DathangsTranfer.forEach((dh) => {
          const currentSum = dathangMap.get(dh.masp) || 0;
          dathangMap.set(dh.masp, currentSum + dh.sldat);
        });
        DonhangsTranfer.forEach((dh) => {
          const currentSum = donhangMap.get(dh.masp) || 0;
          donhangMap.set(dh.masp, currentSum + dh.slnhan);
        });
        TonkhosTranfer.forEach((tk) => {
          tonkhoMap.set(tk.masp, tk);
        });
        const transformFinalData = SanphamsTranfer.map((sp) => {
          const tonkho = tonkhoMap.get(sp.masp);
          const slDat = dathangMap.get(sp.masp) || 0;
          const slGiao = donhangMap.get(sp.masp) || 0;
          const transformedItem = __spreadProps(__spreadValues({}, sp), {
            id: sp.id || GenId(8, false),
            mancc: sp.Nhacungcap?.[0]?.mancc || "",
            name: sp.Nhacungcap?.[0]?.name || "",
            SLDat: slDat,
            SLGiao: slGiao,
            slton: tonkho?.slton || 0,
            sltontt: tonkho?.sltontt || 0,
            slchogiao: tonkho?.slchogiao || 0,
            slchonhap: tonkho?.slchonhap || 0,
            updatedAt: tonkho?.updatedAt || null,
            haohut: tonkho?.haohut || sp.haohut || 0,
            slhaohut: 0,
            Dathangs: DathangsTranfer.filter((dh) => dh.masp === sp.masp),
            Donhangs: DonhangsTranfer.filter((dh) => dh.masp === sp.masp)
          });
          transformedItem.slhaohut = this.GetSLHaohut(transformedItem);
          transformedItem.goiy = this.GetGoiy(transformedItem);
          return transformedItem;
        }).filter((sp) => sp.masp).sort((a, b) => parseFloat(b.Dathangs.length) - parseFloat(a.Dathangs.length));
        this.progressPercentage = 75;
        this.loadingMessage = "\u0110ang t\u1ED5ng h\u1EE3p d\u1EEF li\u1EC7u...";
        const Khos = yield this._GraphqlService.findAll("kho", {
          enableParallelFetch: true,
          batchSize: 1e3,
          take: 999999,
          aggressiveCache: true,
          orderBy: { createdAt: "desc" },
          select: {
            id: true,
            name: true,
            makho: true
          }
        });
        this.TonghopsFinal = this.transformFinalData(transformFinalData, Khos.data);
        this.TonghopsFinal.forEach((item) => {
          const incomingStock = (Number(item.kho1) || 0) + (Number(item.kho2) || 0) + (Number(item.kho3) || 0) + (Number(item.kho4) || 0) + (Number(item.kho5) || 0) + (Number(item.kho6) || 0);
          item.tongkho = parseFloat((incomingStock + Number(item.sltontt || 0)).toFixed(3));
          item.slhaohut = this.GetSLHaohut(item);
          item.goiy = this.GetGoiy(item);
        });
        this.TonghopsFinal.sort((a, b) => parseFloat(b.goiy) - parseFloat(a.goiy));
        const tranferTonghop = (yield this.convertData(transformFinalData)).flat();
        this.TonghopsExportFinal = this.convertKhoData(tranferTonghop);
        this.progressPercentage = 90;
        this.loadingMessage = "Ho\xE0n t\u1EA5t...";
        this.dataSource.data = this.TonghopsFinal;
        this.totalItems = this.TonghopsFinal.length;
        this.calculateTotalPages();
        this.updateDisplayData();
        this.progressPercentage = 100;
        setTimeout(() => {
          this.isLoading = false;
          this.loadingMessage = "";
          this.progressPercentage = 0;
        }, 500);
      } catch (error) {
        console.error("Error loading data:", error);
        this.isLoading = false;
        this.loadingMessage = "";
        this.progressPercentage = 0;
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  refresh() {
    return __async(this, null, function* () {
      this.isRefreshing = true;
      this.loadingMessage = "\u0110ang l\xE0m m\u1EDBi d\u1EEF li\u1EC7u...";
      try {
        this.expandedElementId = null;
        yield this._SanphamService.getAllSanpham();
        yield this.loadDonhangWithRelations();
        this._snackBar.open("L\xE0m m\u1EDBi d\u1EEF li\u1EC7u th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        this._snackBar.open("L\u1ED7i khi l\xE0m m\u1EDBi d\u1EEF li\u1EC7u", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isRefreshing = false;
        this.loadingMessage = "";
      }
    });
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  initializeColumns() {
    this.Columns = Object.keys(this.ColumnName).map((key) => ({
      key,
      value: this.ColumnName[key],
      isShow: true
    }));
    if (this.FilterColumns.length === 0) {
      this.FilterColumns = this.Columns;
    } else {
      localStorage.setItem("NhucauColFilter", JSON.stringify(this.FilterColumns));
    }
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
  }
  setupDrawer() {
    this._breakpointObserver.observe([Breakpoints.Handset]).subscribe((result) => {
      if (result.matches) {
        this.drawer.mode = "over";
      } else {
        this.drawer.mode = "side";
      }
    });
  }
  toggleColumn(item) {
    const column = this.FilterColumns.find((v) => v.key === item.key);
    if (column) {
      column.isShow = !column.isShow;
      this.updateDisplayedColumns();
    }
  }
  doFilterHederColumn(event, column) {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.filteredData = currentData.filter((v) => v[column]?.toString().toLowerCase().includes(event.target.value.toLowerCase()));
  }
  applyAdvancedColumnFilter(event, column) {
    const filterValue = event.target.value.toLowerCase();
    if (!filterValue) {
      this.getCurrentFilteredData(column);
      return;
    }
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const filteredItems = currentData.filter((item) => item[column]?.toString().toLowerCase().includes(filterValue));
    this.dataSource.filteredData = filteredItems;
  }
  ChosenItem(item, column) {
    const CheckItem = this.dataSource.filteredData.filter((v) => v[column] === item[column]);
    const CheckItem1 = this.ListFilter.filter((v) => v[column] === item[column]);
    if (CheckItem1.length > 0) {
      this.ListFilter = this.ListFilter.filter((v) => v[column] !== item[column]);
    } else {
      this.ListFilter = [...this.ListFilter, ...CheckItem];
    }
  }
  ChosenAll(list) {
    list.forEach((v) => {
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id);
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.ListFilter = currentData;
    this.dataSource.data = currentData;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.masp === item.masp || v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.currentPage = 1;
    this.updateDisplayData();
    menu.closeMenu();
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("NhucauColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.masp === item.masp || v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.masp !== item.masp && v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  ChoseAllEdit() {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.EditList = currentData;
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.masp === item.masp || v.id === item.id);
  }
  onListDathangChange(event) {
    this.isSubmit = event.isSubmit;
    this.ListDathang = event.ListDathang;
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFileNoWorker(event);
      const transformedData = data.map((v) => ({
        title: v.title?.trim() || "",
        masp: v.masp?.trim() || "",
        giagoc: Number(v.giagoc) || 0,
        dvt: v.dvt?.trim() || "",
        soluong: Number(v.soluong) || 0,
        soluongkho: Number(v.soluongkho) || 0,
        haohut: Number(v.haohut) || 0,
        ghichu: v.ghichu?.trim() || ""
      }));
      const uniqueData = Array.from(new Map(transformedData.map((item) => [item.masp, item])).values());
      const existingSanpham = this._SanphamService.ListSanpham();
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingSanpham.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._SanphamService.updateSanpham(updatedItem);
        } else {
          yield this._SanphamService.CreateSanpham(v);
        }
      })));
      yield Promise.all(existingSanpham.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._SanphamService.updateSanpham(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      try {
        this.isExportingExcel = true;
        const dulieu = this.TonghopsFinal.map((v) => ({
          title: v.title || "",
          masp: v.masp || "",
          dvt: v.dvt || "",
          ghichu: v.ghichu || "",
          haohut: Number(v.haohut || 0),
          xSLDat: Number(v.xSLDat) || 0,
          // SLDat: v.SLDat || 0,
          // SLGiao: Number(v.SLGiao || 0),
          sltontt: Number(v.sltontt || 0),
          ngaynhan: (0, import_moment.default)(v.ngaynhan).format("YYYY-MM-DD") || "",
          mancc: v.mancc || "",
          name: v.name || "",
          goiy: Number(v.goiy) || 0,
          khachdat: Number(v.khachdat || 0),
          khachgiao: Number(v.khachgiao || 0),
          tongkho: Number(v.tongkho || 0),
          kho1: Number(v.kho1 || 0),
          kho2: Number(v.kho2 || 0),
          kho3: Number(v.kho3 || 0),
          kho4: Number(v.kho4 || 0),
          kho5: Number(v.kho5 || 0),
          kho6: Number(v.kho6 || 0),
          slhaohut: Number(v.slhaohut || 0)
        }));
        const mapping = {
          ngaynhan: "NG\xC0Y",
          mancc: "M\xC3 NCC",
          name: "T\xCAN NH\xC0 CUNG C\u1EA4P",
          masp: "M\xC3 S\u1EA2N PH\u1EA8M",
          title: "T\xCAN S\u1EA2N PH\u1EA8M",
          dvt: "\u0110VT",
          xSLDat: "SL \u0110\u1EB6T (NH\xC0 CC)",
          goiy: "SL C\u1EA6N \u0110\u1EB6T (G\u1EE2I \xDD)",
          ghichu: "GHI CH\xDA",
          // SLDat: 'SL Đã Đặt',
          khachdat: "T\u1ED4NG SL KH\xC1CH \u0110\u1EB6T",
          khachgiao: "T\u1ED4NG SL B\xC1N",
          // SLGiao: 'SL GIAO (KHÁCH)',
          tongkho: "T\u1ED4NG KHO",
          sltontt: "T\u1ED2N KHO",
          kho1: "TG-LONG AN",
          kho2: "B\u1ED4 SUNG",
          kho3: "TG-\u0110\xC0 L\u1EA0T",
          kho4: "KHO T\u1ED4NG - HCM",
          kho5: "SG1",
          kho6: "SG2",
          haohut: "T\u1EC8 L\u1EC6 HAO H\u1EE4T (%)",
          slhaohut: "SL HAO H\u1EE4T"
        };
        const dulieu2 = this.TonghopsExportFinal.map((v) => ({
          title: v.title || "",
          masp: v.masp || "",
          dvt: v.dvt || "",
          haohut: v.haohut || 0,
          sldat: v.sldat || 0,
          SLDat: v.SLDat || 0,
          SLGiao: v.SLGiao || 0,
          sltontt: v.sltontt || 0,
          mancc: v.mancc || "",
          name: v.name || "",
          ngaynhan: (0, import_moment.default)(v.ngaynhan).format("YYYY-MM-DD") || "",
          goiy: v.goiy || 0,
          kho1: v.kho1 || 0,
          kho2: v.kho2 || 0,
          kho3: v.kho3 || 0,
          kho4: v.kho4 || 0,
          kho5: v.kho5 || 0,
          kho6: v.kho6 || 0,
          slhaohut: v.slhaohut || 0
        }));
        const mapping2 = {
          ngaynhan: "Ng\xE0y Nh\u1EADn",
          title: "T\xEAn S\u1EA3n Ph\u1EA9m",
          masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
          dvt: "\u0110VT",
          mancc: "M\xE3 NCC",
          name: "T\xEAn Nh\xE0 Cung C\u1EA5p",
          sldat: "SL \u0110\u1EB7t (Nh\xE0 CC)",
          SLDat: "T\u1ED5ng \u0110\u1EB7t",
          goiy: "SL C\u1EA7n \u0110\u1EB7t (G\u1EE3i \xDD)",
          SLGiao: "SL Giao (Kh\xE1ch)",
          sltontt: "T\u1ED3n Kho",
          kho1: "TG-LONG AN",
          kho2: "B\u1ED5 Sung",
          kho3: "TG-\u0110\xC0 L\u1EA0T",
          kho4: "KHO T\u1ED4NG - HCM",
          kho5: "SG1",
          kho6: "SG2",
          haohut: "T\u1EC9 L\u1EC7 Hao H\u1EE5t (%)",
          slhaohut: "SL Hao H\u1EE5t"
        };
        const result2 = dulieu2.sort((a, b) => parseFloat(b.masp) - parseFloat(a.masp));
        const sheetsData = {
          sheet1: {
            data: dulieu,
            headers: Object.values(mapping),
            mapping
          },
          sheet2: {
            data: result2,
            headers: Object.values(mapping2),
            mapping: mapping2
          }
        };
        writeExcelFileSheets(sheetsData, title);
        this._snackBar.open("Export Excel th\xE0nh c\xF4ng!", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error exporting Excel:", error);
        this._snackBar.open("L\u1ED7i khi export Excel", "\u0110\xF3ng", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isExportingExcel = false;
      }
    });
  }
  // Cập nhật tồn kho từ file Excel
  // ================================================================
  // CẢNH BÁO BẤT THƯỜNG CHỐT KHO
  // ================================================================
  detectStockAnomalies(masp, title, sltonMoi, sltonCu) {
    const chenhLech = Math.abs(sltonMoi - sltonCu);
    const loaiDieuChinh = sltonMoi > sltonCu ? "tang" : "giam";
    if (sltonCu === 0 && sltonMoi >= 1e3) {
      return {
        masp,
        title,
        sltonCu,
        sltonMoi,
        chenhLech,
        loaiDieuChinh,
        mucDoNghiemTrong: "cao",
        lyDoCanhBao: `T\u1ED3n c\u0169 = 0 nh\u01B0ng nh\u1EADp m\u1EDBi ${sltonMoi.toLocaleString()} \u2192 ki\u1EC3m tra l\u1EA1i s\u1ED1 li\u1EC7u g\u1ED1c`
      };
    }
    if (sltonMoi >= 5e3) {
      return {
        masp,
        title,
        sltonCu,
        sltonMoi,
        chenhLech,
        loaiDieuChinh,
        mucDoNghiemTrong: "cao",
        lyDoCanhBao: `S\u1ED1 l\u01B0\u1EE3ng ${sltonMoi.toLocaleString()} r\u1EA5t l\u1EDBn \u2192 c\xF3 th\u1EC3 nh\u1EADp nh\u1EA7m \u0111\u01A1n v\u1ECB (c\xE2y vs th\xF9ng)`
      };
    }
    if (sltonCu > 0 && chenhLech / sltonCu > 5) {
      return {
        masp,
        title,
        sltonCu,
        sltonMoi,
        chenhLech,
        loaiDieuChinh,
        mucDoNghiemTrong: "trung_binh",
        lyDoCanhBao: `Ch\xEAnh l\u1EC7ch ${(chenhLech / sltonCu * 100).toFixed(0)}% so v\u1EDBi t\u1ED3n c\u0169 \u2192 x\xE1c nh\u1EADn l\u1EA1i`
      };
    }
    if (loaiDieuChinh === "giam" && chenhLech >= 500) {
      return {
        masp,
        title,
        sltonCu,
        sltonMoi,
        chenhLech,
        loaiDieuChinh,
        mucDoNghiemTrong: "trung_binh",
        lyDoCanhBao: `Gi\u1EA3m ${chenhLech.toLocaleString()} \u0111\u01A1n v\u1ECB \u2192 ki\u1EC3m tra phi\u1EBFu xu\u1EA5t kho`
      };
    }
    if (sltonCu < 50 && sltonMoi > 500) {
      return {
        masp,
        title,
        sltonCu,
        sltonMoi,
        chenhLech,
        loaiDieuChinh,
        mucDoNghiemTrong: "thap",
        lyDoCanhBao: `T\u1ED3n c\u0169 ch\u1EC9 ${sltonCu} nh\u01B0ng nh\u1EADp ${sltonMoi.toLocaleString()} \u2192 x\xE1c nh\u1EADn l\u1EA1i`
      };
    }
    return null;
  }
  Capnhattonkho() {
    return __async(this, null, function* () {
      this.isUpdatingStock = true;
      const fileInput = document.createElement("input");
      fileInput.type = "file";
      fileInput.accept = ".xlsx,.xls,.csv";
      fileInput.style.display = "none";
      fileInput.onchange = (event) => __async(this, null, function* () {
        try {
          const file = event.target.files[0];
          if (!file) {
            this._snackBar.open("Kh\xF4ng c\xF3 file \u0111\u01B0\u1EE3c ch\u1ECDn", "\u0110\xF3ng", {
              duration: 3e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            this.isUpdatingStock = false;
            return;
          }
          this._snackBar.open("\u0110ang x\u1EED l\xFD file Excel...", "", {
            duration: 0,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-info"]
          });
          const excelData = yield readExcelFileNoWorkerArray(event);
          if (!excelData || excelData.length === 0) {
            this._snackBar.dismiss();
            this._snackBar.open("File Excel tr\u1ED1ng ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7", "\u0110\xF3ng", {
              duration: 3e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            return;
          }
          const validData = [];
          const errors = [];
          console.log(excelData);
          excelData.forEach((row, index) => {
            const masp = row.masp?.toString().trim() || row.ITEMCODE?.toString().trim();
            let slton = parseFloat(row.slton || row.QUANTITY || "0");
            if (!masp) {
              errors.push(`D\xF2ng ${index + 1}: Thi\u1EBFu m\xE3 s\u1EA3n ph\u1EA9m`);
              return;
            }
            if (isNaN(slton) || slton == null || slton <= 0) {
              slton = 0;
              console.log(`D\xF2ng ${index + 1} - ${masp}: slton \u0111\u01B0\u1EE3c set v\u1EC1 0 (gi\xE1 tr\u1ECB g\u1ED1c: ${row.slton})`);
            }
            validData.push({ masp, slton });
          });
          if (errors.length > 0) {
            this._snackBar.dismiss();
            this._snackBar.open(`C\xF3 ${errors.length} l\u1ED7i trong file. Xem console \u0111\u1EC3 bi\u1EBFt chi ti\u1EBFt.`, "\u0110\xF3ng", {
              duration: 5e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-error"]
            });
            console.error("Validation errors:", errors);
            return;
          }
          const [tonkhoResponse, sanphamResponse] = yield Promise.all([
            this._GraphqlService.findAll("tonkho", {
              take: 999999,
              select: {
                id: true,
                sanphamId: true,
                slton: true,
                sltontt: true,
                slchogiao: true,
                slchonhap: true,
                sanpham: {
                  select: {
                    id: true,
                    masp: true,
                    title: true
                  }
                }
              }
            }),
            this._GraphqlService.findAll("sanpham", {
              take: 999999,
              select: {
                id: true,
                masp: true,
                title: true
              }
            })
          ]);
          const allTonkho = tonkhoResponse.data || [];
          const allSanpham = sanphamResponse.data || [];
          const tonkhoMap = new Map(allTonkho.map((tk) => [tk.sanpham?.masp, tk]));
          const sanphamMap = new Map(allSanpham.map((sp) => [sp.masp, sp]));
          const processErrors = [];
          const validDataMap = new Map(validData.map((item) => [item.masp, item.slton]));
          const phieuNhapDetails = [];
          const phieuXuatDetails = [];
          let unchangedCount = 0;
          const danhSachCanhBao = [];
          for (const [masp, slton] of validDataMap.entries()) {
            const tonkho = tonkhoMap.get(masp);
            const sanpham = sanphamMap.get(masp);
            if (!sanpham) {
              processErrors.push(`Kh\xF4ng t\xECm th\u1EA5y s\u1EA3n ph\u1EA9m v\u1EDBi m\xE3: ${masp}`);
              continue;
            }
            const currentSltontt = Number(tonkho ? tonkho.sltontt || 0 : 0);
            if (slton > currentSltontt) {
              phieuNhapDetails.push({
                sanphamId: sanpham.id,
                soluong: slton - currentSltontt
              });
            } else if (slton < currentSltontt) {
              phieuXuatDetails.push({
                sanphamId: sanpham.id,
                soluong: currentSltontt - slton
              });
            } else {
              unchangedCount++;
            }
            if (slton !== currentSltontt) {
              const warning = this.detectStockAnomalies(masp, sanpham.title || masp, slton, currentSltontt);
              if (warning) {
                danhSachCanhBao.push(warning);
              }
            }
          }
          this._snackBar.dismiss();
          const spBinhThuong = phieuNhapDetails.length + phieuXuatDetails.length - danhSachCanhBao.length;
          const dialogData = {
            title: "\u26A0\uFE0F X\xE1c Nh\u1EADn C\u1EADp Nh\u1EADt Ch\u1ED1t Kho",
            tongSanPham: validDataMap.size,
            spBinhThuong: Math.max(0, spBinhThuong),
            spKhongThayDoi: unchangedCount,
            danhSachCanhBao,
            danhSachNhap: phieuNhapDetails,
            danhSachXuat: phieuXuatDetails
          };
          const dialogRef = this._dialog.open(StockWarningDialogComponent, {
            width: "700px",
            maxHeight: "90vh",
            disableClose: true,
            data: dialogData
          });
          const confirmed = yield dialogRef.afterClosed().toPromise();
          if (!confirmed) {
            this._snackBar.open("\u0110\xE3 h\u1EE7y c\u1EADp nh\u1EADt ch\u1ED1t kho.", "\u0110\xF3ng", {
              duration: 3e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-info"]
            });
            this.isUpdatingStock = false;
            return;
          }
          this._snackBar.open("\u0110ang l\u01B0u d\u1EEF li\u1EC7u ch\u1ED1t kho...", "", {
            duration: 0,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-info"]
          });
          if (phieuNhapDetails.length > 0) {
            yield this._PhieukhoService.CreatePhieukho({
              title: `\u0110I\u1EC0U CH\u1EC8NH CH\u1ED0T KHO (T\u0102NG) T\u1EF0 \u0110\u1ED8NG [EXCEL]`,
              type: "nhap",
              isChotkho: true,
              sanpham: phieuNhapDetails,
              ghichu: `\u0110i\u1EC1u ch\u1EC9nh t\u0103ng t\u1ED3n kho ch\u1ED1t t\u1EEB Excel l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
              ngay: DateHelpers.now()
            });
          }
          if (phieuXuatDetails.length > 0) {
            yield this._PhieukhoService.CreatePhieukho({
              title: `\u0110I\u1EC0U CH\u1EC8NH CH\u1ED0T KHO (GI\u1EA2M) T\u1EF0 \u0110\u1ED8NG [EXCEL]`,
              type: "xuat",
              isChotkho: true,
              sanpham: phieuXuatDetails,
              ghichu: `\u0110i\u1EC1u ch\u1EC9nh gi\u1EA3m t\u1ED3n kho ch\u1ED1t t\u1EEB Excel l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
              ngay: DateHelpers.now()
            });
          }
          this._snackBar.dismiss();
          if (processErrors.length > 0) {
            console.error("Process errors:", processErrors);
            this._snackBar.open(`Ho\xE0n th\xE0nh v\u1EDBi ${processErrors.length} l\u1ED7i. ${phieuNhapDetails.length} t\u0103ng, ${phieuXuatDetails.length} gi\u1EA3m, ${unchangedCount} gi\u1EEF nguy\xEAn. Xem console.`, "\u0110\xF3ng", {
              duration: 5e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-warning"]
            });
          } else {
            this._snackBar.open(`\u2705 C\u1EADp nh\u1EADt TonKho th\xE0nh c\xF4ng: ${phieuNhapDetails.length} t\u0103ng, ${phieuXuatDetails.length} gi\u1EA3m, ${unchangedCount} gi\u1EEF nguy\xEAn.`, "\u0110\xF3ng", {
              duration: 4e3,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-success"]
            });
          }
          this.ngOnInit();
        } catch (error) {
          this._snackBar.dismiss();
          this._snackBar.open(`L\u1ED7i x\u1EED l\xFD file: ${error.message}`, "\u0110\xF3ng", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
          console.error("Error processing Excel file:", error);
        } finally {
          this.isUpdatingStock = false;
        }
      });
      fileInput.oncancel = () => {
        this.isUpdatingStock = false;
      };
      document.body.appendChild(fileInput);
      fileInput.click();
      document.body.removeChild(fileInput);
    });
  }
  // Tải file Excel mẫu để cập nhật tồn kho
  downloadTonkhoTemplate() {
    return __async(this, null, function* () {
      const mapping = {
        masp: "masp",
        title: "title",
        slton: "slton"
      };
      const Sanphams = yield this._GraphqlService.findAll("sanpham", {
        take: 999999,
        select: {
          id: true,
          masp: true,
          title: true,
          TonKho: {
            select: {
              slton: true
            }
          }
        }
      });
      const sampleData = Sanphams.data.map((sp) => ({
        masp: sp.masp || "",
        title: sp.title || "",
        slton: sp.TonKho?.slton || 0
      }));
      writeExcelFile(sampleData, "MauCapNhatTonKho", Object.values(mapping), mapping);
      this._snackBar.open("\u0110\xE3 t\u1EA3i file Excel m\u1EABu", "\u0110\xF3ng", {
        duration: 2e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
    });
  }
  convertKhoData(inputData) {
    const warehouses = [
      { name: "kho1", label: "TG-LONG AN" },
      { name: "kho2", label: "B\u1ED5 Sung" },
      { name: "kho3", label: "TG-\u0110\xC0 L\u1EA0T" },
      { name: "kho4", label: "KHO T\u1ED4NG - HCM" },
      { name: "kho5", label: "SG1" },
      { name: "kho6", label: "SG2" }
    ];
    return inputData.map((item) => {
      const newItem = __spreadValues({}, item);
      warehouses.forEach((warehouse) => {
        newItem[warehouse.name] = "0";
      });
      const matchingWarehouse = warehouses.find((warehouse) => warehouse.label === item.namekho);
      if (matchingWarehouse) {
        newItem[matchingWarehouse.name] = item.sldat || "0";
      }
      return newItem;
    });
  }
  transformFinalData(data1, ListKho) {
    ListKho = [
      {
        id: "a118c322-ddca-444e-9e41-40602d955e93",
        value: "kho5",
        name: "SG1",
        makho: "TG-SG1"
      },
      {
        id: "3344758e-c0bc-4562-9390-d58fc5717d03",
        value: "kho6",
        name: "SG2",
        makho: "TG-SG2"
      },
      {
        id: "75933b1d-2906-4591-8a46-30db60ce9258",
        value: "kho2",
        name: "B\u1ED5 Sung",
        makho: "TG-BS"
      },
      {
        id: "4cc01811-61f5-4bdc-83de-a493764e9258",
        value: "kho4",
        name: "KHO T\u1ED4NG - HCM",
        makho: "TG-HCM"
      },
      {
        id: "929d94e9-9b05-4820-aadb-0c48b991c96c",
        value: "kho1",
        name: "TG-LONG AN",
        makho: "TG-LA"
      },
      {
        id: "a24363f8-2218-4f80-b2f9-0641ace1b245",
        value: "kho3",
        name: "TG-\u0110\xC0 L\u1EA0T",
        makho: "TG-\u0110L"
      }
    ];
    return data1.map((item) => {
      const _a = item, { Dathangs, Donhangs } = _a, baseItem = __objRest(_a, ["Dathangs", "Donhangs"]);
      const khoValues = {};
      ListKho.forEach((kho) => {
        khoValues[kho.value] = 0;
      });
      const ngaynhan = Dathangs && Dathangs.length > 0 ? Dathangs[0].ngaynhan : null;
      if (Dathangs) {
        Dathangs.forEach((dathang) => {
          const matchingKho = ListKho.find((kho) => kho.makho === dathang.makho);
          if (matchingKho) {
            khoValues[matchingKho.value] += dathang.sldat;
          }
        });
      }
      const khachdat = Donhangs.filter((v) => v.status === "dadat").reduce((acc, curr) => {
        return Number((acc + Number(curr.sldat || 0)).toFixed(3)) || 0;
      }, 0);
      const khachgiao = Donhangs.filter((v) => v.status === "dagiao" || v.status === "danhan" || v.status === "hoanthanh").reduce((acc, curr) => {
        return Number((acc + Number(curr.sldat || 0)).toFixed(2)) || 0;
      }, 0);
      return __spreadValues(__spreadValues(__spreadValues({
        khachdat,
        khachgiao
      }, baseItem), ngaynhan && { ngaynhan }), khoValues);
    });
  }
  transformFinalDataTachDathang(data1, ListKho) {
    ListKho = [
      {
        id: "a118c322-ddca-444e-9e41-40602d955e93",
        value: "kho5",
        name: "SG1",
        makho: "TG-SG1"
      },
      {
        id: "3344758e-c0bc-4562-9390-d58fc5717d03",
        value: "kho6",
        name: "SG2",
        makho: "TG-SG2"
      },
      {
        id: "75933b1d-2906-4591-8a46-30db60ce9258",
        value: "kho2",
        name: "B\u1ED5 Sung",
        makho: "TG-BS"
      },
      {
        id: "4cc01811-61f5-4bdc-83de-a493764e9258",
        value: "kho4",
        name: "KHO T\u1ED4NG - HCM",
        makho: "TG-HCM"
      },
      {
        id: "929d94e9-9b05-4820-aadb-0c48b991c96c",
        value: "kho1",
        name: "TG-LONG AN",
        makho: "TG-LA"
      },
      {
        id: "a24363f8-2218-4f80-b2f9-0641ace1b245",
        value: "kho3",
        name: "TG-\u0110\xC0 L\u1EA0T",
        makho: "TG-\u0110L"
      }
    ];
    return data1.map((item) => {
      const _a = item, { Dathangs, Donhangs } = _a, baseItem = __objRest(_a, ["Dathangs", "Donhangs"]);
      const khoValues = {};
      ListKho.forEach((kho) => {
        khoValues[kho.value] = 0;
      });
      const ngaynhan = Dathangs && Dathangs.length > 0 ? Dathangs[0].ngaynhan : null;
      if (Dathangs) {
        Dathangs.forEach((dathang) => {
          const matchingKho = ListKho.find((kho) => kho.makho === dathang.makho);
          if (matchingKho) {
            khoValues[matchingKho.value] += dathang.sldat;
          }
        });
      }
      return __spreadProps(__spreadValues(__spreadValues(__spreadValues({}, baseItem), ngaynhan && { ngaynhan }), khoValues), {
        Dathangs
      });
    });
  }
  convertData(inputData) {
    return __async(this, null, function* () {
      const Khos = yield this._GraphqlService.findAll("kho", {
        enableParallelFetch: true,
        batchSize: 1e3,
        take: 999999,
        aggressiveCache: true,
        orderBy: { createdAt: "desc" },
        select: {
          id: true,
          name: true,
          makho: true
        }
      });
      const warehouses = Khos.data;
      return inputData.map((item) => {
        const result = [...this.transformItemData(warehouses, item)];
        return result;
      });
    });
  }
  transformItemData(warehouses, item) {
    const result = [];
    const warehouseMap = {};
    warehouses.forEach((warehouse) => {
      warehouseMap[warehouse.makho] = warehouse.name;
    });
    item.Dathangs.forEach((order) => {
      const transformedItem = {
        id: item.id,
        title: item.title,
        masp: item.masp,
        dvt: item.dvt,
        haohut: item.haohut,
        slhaohut: item.slhaohut,
        SLDat: item.SLDat,
        SLGiao: item.SLGiao,
        sltontt: item.sltontt,
        slton: item.slton,
        slchogiao: item.slchogiao,
        slchonhap: item.slchonhap,
        mancc: order.mancc,
        name: order.name,
        ngaynhan: order.ngaynhan,
        sldat: order.sldat,
        makho: order.makho,
        namekho: warehouseMap[order.makho] || order.namekho,
        goiy: item.goiy
      };
      result.push(transformedItem);
    });
    return result;
  }
  trackByFn(index, item) {
    return item.masp || item.id;
  }
  calculateTotalPages() {
    this.totalPages = Math.ceil(this.totalItems / this.pageSize);
  }
  onPageSizeChange(size, menuTrigger) {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    if (size > currentData.length) {
      this.pageSize = currentData.length;
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${currentData.length}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    } else {
      this.pageSize = size;
    }
    this.currentPage = 1;
    this.calculateTotalPages();
    this.updateDisplayData();
    menuTrigger.closeMenu();
  }
  onPreviousPage() {
    if (this.currentPage > 1) {
      this.currentPage--;
      this.updateDisplayData();
    }
  }
  onNextPage() {
    if (this.currentPage < this.totalPages) {
      this.currentPage++;
      this.updateDisplayData();
    }
  }
  updateDisplayData() {
    let currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    if (this.ListFilter && this.ListFilter.length > 0 && this.ListFilter.length < (this.TonghopsFinal.length || this.Listsanpham().length)) {
      currentData = currentData.filter((v) => this.ListFilter.some((v1) => v1.masp === v.masp || v1.id === v.id));
    }
    if (this.quickFilter && this.quickFilter !== "all") {
      switch (this.quickFilter) {
        case "lowStock":
          currentData = currentData.filter((item) => (item.slton || 0) <= 10);
          break;
        case "needOrder":
          currentData = currentData.filter((item) => {
            const suggestion = parseFloat(this.GetGoiy(item));
            return suggestion > 0;
          });
          break;
        case "pendingDelivery":
          currentData = currentData.filter((item) => (item.slchogiao || 0) > 0);
          break;
      }
    }
    if (this.dataSource.filter) {
      currentData = this.applyGlobalFilterToData(currentData, this.dataSource.filter);
    }
    if (this.currentSort.active && this.currentSort.direction !== "") {
      currentData = this.applySortingToData(currentData, this.currentSort);
    }
    this.totalItems = currentData.length;
    this.calculateTotalPages();
    if (this.currentPage > this.totalPages && this.totalPages > 0) {
      this.currentPage = 1;
    }
    const startIndex = (this.currentPage - 1) * this.pageSize;
    const endIndex = startIndex + this.pageSize;
    const pageData = currentData.slice(startIndex, endIndex);
    this.dataSource.data = pageData;
  }
  applySortingToData(data, sort) {
    return data.sort((a, b) => {
      const isAsc = sort.direction === "asc";
      switch (sort.active) {
        case "title":
        case "masp":
        case "mancc":
        case "name":
        case "dvt":
          return this.compareStrings(a[sort.active] || "", b[sort.active] || "", isAsc);
        case "slton":
        case "sltontt":
        case "tongkho":
        case "khachdat":
        case "khachgiao":
        case "slchogiao":
        case "slchonhap":
        case "SLDat":
        case "SLGiao":
        case "kho1":
        case "kho2":
        case "kho3":
        case "kho4":
        case "kho5":
        case "kho6":
          return this.compareNumbers(Number(a[sort.active]) || 0, Number(b[sort.active]) || 0, isAsc);
        case "goiy":
          return this.compareNumbers(parseFloat(this.GetGoiy(a)), parseFloat(this.GetGoiy(b)), isAsc);
        default:
          return 0;
      }
    });
  }
  getCurrentFilteredData(column) {
    const currentData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    const uniqueValues = /* @__PURE__ */ new Map();
    currentData.forEach((item) => {
      const key = item[column];
      if (!uniqueValues.has(key)) {
        uniqueValues.set(key, item);
      }
    });
    return Array.from(uniqueValues.values());
  }
  parseFloat(value) {
    return parseFloat(value) || 0;
  }
  applyQuickFilter(filterType) {
    this.quickFilter = filterType;
    this.currentPage = 1;
    this.updateDisplayData();
  }
  applyGlobalFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    this.globalFilterValue = filterValue;
    this.currentPage = 1;
    this.updateDisplayData();
  }
  // applyGlobalFilter(event: Event) {
  //   const filterValue = (event.target as HTMLInputElement).value;
  //   this.globalFilterValue = filterValue;
  //   let filteredData =
  //     this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
  //   // Apply quick filter first
  //   if (this.quickFilter !== 'all') {
  //     this.applyQuickFilter(this.quickFilter);
  //     return; // applyQuickFilter will handle global filter too
  //   }
  //   // Apply global filter
  //   if (filterValue) {
  //     filteredData = this.applyGlobalFilterToData(filteredData, filterValue);
  //   }
  //   this.dataSource.data = filteredData;
  //   this.totalItems = filteredData.length;
  //   this.calculateTotalPages();
  //   this.currentPage = 1;
  //   this.updateDisplayData();
  // }
  applyGlobalFilterToData(data, filterValue) {
    const searchTerm = filterValue.trim().toLowerCase();
    return data.filter((item) => item.title?.toLowerCase().includes(searchTerm) || item.masp?.toLowerCase().includes(searchTerm) || item.name?.toLowerCase().includes(searchTerm) || item.mancc?.toLowerCase().includes(searchTerm));
  }
  // Enhanced sorting methods
  sortData(sort) {
    this.currentSort = { active: sort.active, direction: sort.direction };
    this.updateDisplayData();
  }
  compareStrings(a, b, isAsc) {
    return (a < b ? -1 : 1) * (isAsc ? 1 : -1);
  }
  compareNumbers(a, b, isAsc) {
    return (a - b) * (isAsc ? 1 : -1);
  }
  // Clear all filters
  clearAllFilters() {
    this.quickFilter = "all";
    this.globalFilterValue = "";
    this.dataSource.filter = "";
    this.ListFilter = [];
    this.currentPage = 1;
    this.updateDisplayData();
    const searchInputs = document.querySelectorAll('input[type="text"]');
    searchInputs.forEach((input) => {
      if (input.placeholder.includes("T\xECm ki\u1EBFm")) {
        input.value = "";
      }
    });
  }
  /**
   * Toggle date range filter functionality
   */
  toggleDateRangeFilter() {
    this.isDateRangeEnabled = !this.isDateRangeEnabled;
    this.hasUnappliedDateChanges = false;
    if (this.isDateRangeEnabled) {
      const today = /* @__PURE__ */ new Date();
      this.batdau = new Date(today);
      this.ketthuc = new Date(today);
      this.loadDonhangWithRelations();
    } else {
      this.loadDonhangWithRelations();
    }
  }
  /**
   * Apply date range filter - called by user action
   */
  applyDateFilter(dateMenuTrigger) {
    if (!this.isDateRangeEnabled) {
      this.isDateRangeEnabled = true;
    }
    if (!this.batdau || !this.ketthuc) {
      this._snackBar.open("Vui l\xF2ng ch\u1ECDn kho\u1EA3ng th\u1EDDi gian h\u1EE3p l\u1EC7", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      return;
    }
    if (this.batdau > this.ketthuc) {
      this._snackBar.open("Ng\xE0y b\u1EAFt \u0111\u1EA7u kh\xF4ng th\u1EC3 sau ng\xE0y k\u1EBFt th\xFAc", "", {
        duration: 3e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-error"]
      });
      return;
    }
    this.hasUnappliedDateChanges = false;
    this.loadDonhangWithRelations();
    this._snackBar.open("\u0110\xE3 \xE1p d\u1EE5ng b\u1ED9 l\u1ECDc ng\xE0y", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
    dateMenuTrigger.closeMenu();
  }
  /**
   * Handle start date change
   */
  onStartDateChange(event) {
    this.batdau = event.value;
    if (this.batdau > this.ketthuc) {
      this.ketthuc = new Date(this.batdau);
    }
    this.hasUnappliedDateChanges = true;
  }
  /**
   * Handle end date change
   */
  onEndDateChange(event) {
    this.ketthuc = event.value;
    if (this.ketthuc < this.batdau) {
      this.batdau = new Date(this.ketthuc);
    }
    this.hasUnappliedDateChanges = true;
  }
  /**
   * Set date range to today
   */
  setToday(dateMenuTrigger) {
    const today = /* @__PURE__ */ new Date();
    this.batdau = new Date(today);
    this.ketthuc = new Date(today);
    this.applyDateFilter(dateMenuTrigger);
  }
  /**
   * Set date range to this week
   */
  setThisWeek(dateMenuTrigger) {
    const today = /* @__PURE__ */ new Date();
    const firstDayOfWeek = new Date(today);
    firstDayOfWeek.setDate(today.getDate() - today.getDay());
    const lastDayOfWeek = new Date(firstDayOfWeek);
    lastDayOfWeek.setDate(firstDayOfWeek.getDate() + 6);
    this.batdau = new Date(firstDayOfWeek);
    this.ketthuc = new Date(lastDayOfWeek);
    this.applyDateFilter(dateMenuTrigger);
  }
  /**
   * Set date range to this month
   */
  setThisMonth(dateMenuTrigger) {
    const today = /* @__PURE__ */ new Date();
    const firstDayOfMonth = new Date(today.getFullYear(), today.getMonth(), 1);
    const lastDayOfMonth = new Date(today.getFullYear(), today.getMonth() + 1, 0);
    this.batdau = new Date(firstDayOfMonth);
    this.ketthuc = new Date(lastDayOfMonth);
    this.applyDateFilter(dateMenuTrigger);
  }
  /**
   * Clear date filter and reload all data
   */
  clearDateFilter() {
    this.isDateRangeEnabled = false;
    this.hasUnappliedDateChanges = false;
    const today = /* @__PURE__ */ new Date();
    this.batdau = new Date(today);
    this.ketthuc = new Date(today);
    this.loadDonhangWithRelations();
    this._snackBar.open("\u0110\xE3 x\xF3a b\u1ED9 l\u1ECDc ng\xE0y", "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  /**
   * Format ngày từ UTC database để hiển thị local time
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị (default: DD/MM/YYYY)
   * @returns Formatted string theo timezone local
   */
  formatDateForDisplay(utcDate, format = "DD/MM/YYYY") {
    return this._timezoneService.formatForDisplay(utcDate, format);
  }
  /**
   * Chuyển đổi date input từ form sang UTC để gửi API
   * @param formDate Date từ form input
   * @returns UTC ISO string
   */
  convertFormDateToUTC(formDate) {
    return this._timezoneService.formDateToUTC(formDate);
  }
  /**
   * Parse ngày tháng từ input user
   * @param userInput Input từ user
   * @param format Format của input
   * @returns UTC ISO string để lưu database
   */
  parseUserDateInput(userInput, format = "YYYY-MM-DD") {
    try {
      return this._timezoneService.parseUserInputToUTC(userInput, format);
    } catch (error) {
      console.error("Invalid date format:", error);
      return "";
    }
  }
  // ====== NESTED TABLE METHODS ======
  /**
   * Toggle expanded state for a row and load nested data if needed
   */
  toggleExpanded(element) {
    this.openNestedDataDialog(element);
  }
  /**
   * Open dialog to show nested data
   */
  openNestedDataDialog(element) {
    return __async(this, null, function* () {
      const dialogData = {
        product: element,
        dathangData: [],
        donhangData: [],
        loading: true
      };
      const dialogRef = this._dialog.open(NestedDataDialogComponent, {
        width: "95vw",
        maxWidth: "1200px",
        height: "90vh",
        maxHeight: "90vh",
        data: dialogData,
        disableClose: false,
        autoFocus: false,
        panelClass: ["nested-data-dialog-panel"]
      });
      try {
        yield this.loadNestedData(element);
        dialogData.dathangData = this.getDathangData(element.masp);
        dialogData.donhangData = this.getDonhangData(element.masp);
        dialogData.loading = false;
        if (dialogData.triggerChangeDetection) {
          dialogData.triggerChangeDetection();
        }
      } catch (error) {
        console.error("Error loading nested data:", error);
        dialogData.loading = false;
        if (dialogData.triggerChangeDetection) {
          dialogData.triggerChangeDetection();
        }
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u. Vui l\xF2ng th\u1EED l\u1EA1i.", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Load nested data for both dathang and donhang
   */
  loadNestedData(element) {
    return __async(this, null, function* () {
      const masp = element.masp || element.id;
      if (!masp) {
        console.warn("Cannot load nested data: masp is missing", element);
        return;
      }
      yield Promise.all([this.loadDathangData(masp), this.loadDonhangData(masp)]);
    });
  }
  /**
   * Load dathang data for a specific product using GraphQL
   */
  loadDathangData(masp) {
    return __async(this, null, function* () {
      if (this.dathangDataMap.has(masp) || this.loadingDathang.has(masp)) {
        return;
      }
      this.loadingDathang.add(masp);
      try {
        let startDate;
        let endDate;
        if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
          const dateRange = this._timezoneService.getAPIDateRange(this.batdau, this.ketthuc);
          startDate = dateRange.Batdau;
          endDate = dateRange.Ketthuc;
        } else {
          const today = /* @__PURE__ */ new Date();
          const todayRange = this._timezoneService.getAPIDateRange(today, today);
          startDate = todayRange.Batdau;
          endDate = todayRange.Ketthuc;
        }
        const dathangResult = yield this._GraphqlService.findAll("dathang", {
          enableParallelFetch: true,
          batchSize: 500,
          take: 999999,
          aggressiveCache: true,
          orderBy: { createdAt: "desc" },
          where: {
            sanpham: {
              some: {
                sanpham: {
                  masp: {
                    equals: masp
                  }
                }
              }
            },
            ngaynhan: {
              gte: startDate,
              lte: endDate
            }
          },
          select: {
            id: true,
            madncc: true,
            ngaynhan: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            nhacungcap: {
              select: {
                id: true,
                name: true,
                mancc: true,
                diachi: true,
                sdt: true
              }
            },
            sanpham: {
              where: {
                sanpham: {
                  masp: {
                    equals: masp
                  }
                }
              },
              select: {
                id: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                ttgiao: true,
                sanpham: {
                  select: {
                    id: true,
                    title: true,
                    masp: true,
                    dvt: true
                  }
                }
              }
            },
            kho: {
              select: {
                id: true,
                name: true,
                makho: true,
                diachi: true
              }
            }
          }
        });
        const transformedData = dathangResult.data.flatMap((dathang) => dathang.sanpham.map((sp) => ({
          id: dathang.id,
          madncc: dathang.madncc,
          ngaynhan: dathang.ngaynhan,
          createdAt: dathang.createdAt,
          updatedAt: dathang.updatedAt,
          status: dathang.status,
          // Product information
          sanphamId: sp.sanpham.id,
          title: sp.sanpham.title,
          masp: sp.sanpham.masp,
          dvt: sp.sanpham.dvt,
          // Quantities and pricing
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          giaban: Number(sp.giaban) || 0,
          ttgiao: Number(sp.ttgiao) || 0,
          // Supplier information
          nhacungcap: dathang.nhacungcap,
          mancc: dathang.nhacungcap?.mancc || "",
          name: dathang.nhacungcap?.name || "",
          // Warehouse information
          // Type identifier
          type: "dathang"
        })));
        this.dathangDataMap.set(masp, transformedData);
      } catch (error) {
        console.error("Error loading dathang data:", error);
        this.dathangDataMap.set(masp, []);
        this._snackBar.open(`L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u \u0111\u1EB7t h\xE0ng cho ${masp}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.loadingDathang.delete(masp);
      }
    });
  }
  /**
   * Load donhang data for a specific product using GraphQL
   */
  loadDonhangData(masp) {
    return __async(this, null, function* () {
      if (this.donhangDataMap.has(masp) || this.loadingDonhang.has(masp)) {
        return;
      }
      this.loadingDonhang.add(masp);
      try {
        let startDate;
        let endDate;
        if (this.isDateRangeEnabled && this.batdau && this.ketthuc) {
          const dateRange = this._timezoneService.getAPIDateRange(this.batdau, this.ketthuc);
          startDate = dateRange.Batdau;
          endDate = dateRange.Ketthuc;
        } else {
          const today = /* @__PURE__ */ new Date();
          const todayRange = this._timezoneService.getAPIDateRange(today, today);
          startDate = todayRange.Batdau;
          endDate = todayRange.Ketthuc;
        }
        const donhangResult = yield this._GraphqlService.findAll("donhang", {
          enableParallelFetch: true,
          batchSize: 500,
          take: 999999,
          aggressiveCache: true,
          orderBy: { createdAt: "desc" },
          where: {
            sanpham: {
              some: {
                sanpham: {
                  masp: {
                    equals: masp
                  }
                }
              }
            },
            ngaygiao: {
              gte: startDate,
              lte: endDate
            }
          },
          select: {
            id: true,
            madonhang: true,
            ngaygiao: true,
            createdAt: true,
            updatedAt: true,
            status: true,
            khachhang: {
              select: {
                id: true,
                name: true,
                sdt: true,
                diachi: true,
                makh: true
              }
            },
            sanpham: {
              where: {
                sanpham: {
                  masp: {
                    equals: masp
                  }
                }
              },
              select: {
                id: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                giaban: true,
                ttgiao: true,
                sanpham: {
                  select: {
                    id: true,
                    title: true,
                    masp: true,
                    dvt: true
                  }
                }
              }
            }
          }
        });
        const transformedData = donhangResult.data.flatMap((donhang) => donhang.sanpham.map((sp) => ({
          id: donhang.id,
          madonhang: donhang.madonhang,
          ngaygiao: donhang.ngaygiao,
          createdAt: donhang.createdAt,
          updatedAt: donhang.updatedAt,
          status: donhang.status,
          // Product information
          sanphamId: sp.sanpham.id,
          title: sp.sanpham.title,
          masp: sp.sanpham.masp,
          dvt: sp.sanpham.dvt,
          // Quantities and pricing
          sldat: Number(sp.sldat) || 0,
          slgiao: Number(sp.slgiao) || 0,
          slnhan: Number(sp.slnhan) || 0,
          giaban: Number(sp.giaban) || 0,
          ttgiao: Number(sp.ttgiao) || 0,
          // Customer information
          khachhang: donhang.khachhang,
          makh: donhang.khachhang?.makh || "",
          name: donhang.khachhang?.name || "",
          // Type identifier
          type: "donhang"
        })));
        this.donhangDataMap.set(masp, transformedData);
      } catch (error) {
        console.error("Error loading donhang data:", error);
        this.donhangDataMap.set(masp, []);
        this._snackBar.open(`L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng cho ${masp}`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.loadingDonhang.delete(masp);
      }
    });
  }
  /**
   * Get dathang data for a specific product
   */
  getDathangData(masp) {
    return this.dathangDataMap.get(masp) || [];
  }
  /**
   * Get donhang data for a specific product
   */
  getDonhangData(masp) {
    return this.donhangDataMap.get(masp) || [];
  }
  /**
   * Check if dathang data is loading for a specific product
   */
  isDathangLoading(masp) {
    return this.loadingDathang.has(masp);
  }
  /**
   * Check if donhang data is loading for a specific product
   */
  isDonhangLoading(masp) {
    return this.loadingDonhang.has(masp);
  }
  /**
   * Clear cached nested data (useful for refresh)
   */
  clearNestedData() {
    this.dathangDataMap.clear();
    this.donhangDataMap.clear();
    this.loadingDathang.clear();
    this.loadingDonhang.clear();
    this.expandedElementId = null;
  }
  /**
   * Check if a row is expanded (for expanded detail row)
   */
  isExpanded = (index, row) => {
    const elementId = row.id || row.masp;
    return elementId === this.expandedElementId;
  };
  /**
   * Check if element is expanded by ID - Legacy method for compatibility
   */
  isElementExpanded(element) {
    return false;
  }
  /**
   * Expand element by ID - Now opens dialog
   */
  expandById(id, masp) {
    const element = this.dataSource.data.find((item) => (item.id || item.masp) === id || item.masp === masp);
    if (element) {
      this.openNestedDataDialog(element);
    }
  }
  /**
   * Collapse expanded element
   */
  collapseExpanded() {
    this.expandedElementId = null;
  }
  /**
   * Check if any data is currently loading for a product
   */
  isAnyDataLoading(masp) {
    return this.isDathangLoading(masp) || this.isDonhangLoading(masp);
  }
  /**
   * Get total count of all nested data for a product
   */
  getTotalNestedDataCount(masp) {
    return this.getDathangData(masp).length + this.getDonhangData(masp).length;
  }
  /**
   * Check if nested data exists for a product
   */
  hasNestedData(masp) {
    return this.getTotalNestedDataCount(masp) > 0;
  }
  /**
   * Get loading state summary for debugging
   */
  getLoadingStateSummary() {
    return {
      expandedElementId: this.expandedElementId,
      loadingDathang: Array.from(this.loadingDathang),
      loadingDonhang: Array.from(this.loadingDonhang),
      cachedDathang: Array.from(this.dathangDataMap.keys()),
      cachedDonhang: Array.from(this.donhangDataMap.keys())
    };
  }
  // ====== INLINE EDIT METHODS ======
  /**
   * Load temporary edits from localStorage
   */
  loadTempEditsFromStorage() {
    try {
      const storedData = localStorage.getItem(this.STORAGE_KEY);
      if (storedData) {
        const parsedData = JSON.parse(storedData);
        this.tempStorage = new Map(Object.entries(parsedData));
      }
    } catch (error) {
      console.error("Error loading temp edits from storage:", error);
      this.tempStorage = /* @__PURE__ */ new Map();
    }
  }
  /**
   * Save temporary edits to localStorage
   */
  saveTempEditsToStorage() {
    try {
      const dataToStore = Object.fromEntries(this.tempStorage);
      localStorage.setItem(this.STORAGE_KEY, JSON.stringify(dataToStore));
    } catch (error) {
      console.error("Error saving temp edits to storage:", error);
    }
  }
  /**
   * Start editing a row
   */
  startEdit(row, field) {
    const key = this.getRowKey(row);
    if (!this.editingRows.has(key)) {
      this.editingRows.set(key, {});
    }
    this.editingRows.get(key)[field] = true;
  }
  /**
   * Stop editing a row
   */
  stopEdit(row, field) {
    const key = this.getRowKey(row);
    if (this.editingRows.has(key)) {
      delete this.editingRows.get(key)[field];
      if (Object.keys(this.editingRows.get(key)).length === 0) {
        this.editingRows.delete(key);
      }
    }
  }
  /**
   * Check if a field is being edited
   */
  isEditing(row, field) {
    const key = this.getRowKey(row);
    return this.editingRows.has(key) && this.editingRows.get(key)[field] === true;
  }
  /**
   * Save field value to temporary storage
   */
  saveFieldValue(row, field, value) {
    const key = this.getRowKey(row);
    if (!this.tempStorage.has(key)) {
      this.tempStorage.set(key, {
        masp: row.masp,
        title: row.title,
        changes: {}
      });
    }
    const tempData = this.tempStorage.get(key);
    tempData.changes[field] = value;
    tempData.lastModified = (/* @__PURE__ */ new Date()).toISOString();
    this.saveTempEditsToStorage();
    this.stopEdit(row, field);
    this._snackBar.open(`\u0110\xE3 l\u01B0u t\u1EA1m ${field}`, "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-info"]
    });
  }
  /**
   * Get value from temp storage or original row
   */
  getFieldValue(row, field) {
    const key = this.getRowKey(row);
    if (this.tempStorage.has(key) && this.tempStorage.get(key).changes[field] !== void 0) {
      return this.tempStorage.get(key).changes[field];
    }
    return row[field] || "";
  }
  /**
   * Check if field has temporary changes
   */
  hasFieldChanged(row, field) {
    const key = this.getRowKey(row);
    return this.tempStorage.has(key) && this.tempStorage.get(key).changes[field] !== void 0;
  }
  /**
   * Get row key for tracking
   */
  getRowKey(row) {
    return row.masp || row.id || "";
  }
  /**
   * Get count of items with temporary changes
   */
  getTempChangesCount() {
    return this.tempStorage.size;
  }
  /**
   * Export temp data to Excel
   */
  exportTempChanges() {
    return __async(this, null, function* () {
      if (this.tempStorage.size === 0) {
        this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u t\u1EA1m th\u1EDDi \u0111\u1EC3 xu\u1EA5t", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      try {
        const tempData = Array.from(this.tempStorage.values()).map((item) => ({
          masp: item.masp || "",
          title: item.title || "",
          ghichu_moi: item.changes.ghichu || "",
          xSLDat_moi: item.changes.xSLDat || "",
          lastModified: item.lastModified || ""
        }));
        const mapping = {
          masp: "M\xE3 S\u1EA3n Ph\u1EA9m",
          title: "T\xEAn S\u1EA3n Ph\u1EA9m",
          ghichu_moi: "Ghi Ch\xFA M\u1EDBi",
          xSLDat_moi: "SL \u0110\u1EB7t (NCC) M\u1EDBi",
          lastModified: "Th\u1EDDi Gian S\u1EEDa"
        };
        window.writeExcelFile(tempData, "DuLieuTamThoi_" + (/* @__PURE__ */ new Date()).toISOString().split("T")[0], Object.values(mapping), mapping);
        this._snackBar.open("Xu\u1EA5t d\u1EEF li\u1EC7u t\u1EA1m th\u1EDDi th\xE0nh c\xF4ng!", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error exporting temp changes:", error);
        this._snackBar.open("L\u1ED7i khi xu\u1EA5t d\u1EEF li\u1EC7u t\u1EA1m th\u1EDDi", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Apply temp changes to main data and clear storage
   */
  applyTempChanges() {
    return __async(this, null, function* () {
      if (this.tempStorage.size === 0) {
        this._snackBar.open("Kh\xF4ng c\xF3 thay \u0111\u1ED5i t\u1EA1m th\u1EDDi \u0111\u1EC3 \xE1p d\u1EE5ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      try {
        const tempCount = this.tempStorage.size;
        const currentData = [...this.dataSource.data];
        for (const [key, tempData] of this.tempStorage.entries()) {
          const rowIndex = currentData.findIndex((item) => this.getRowKey(item) === key);
          if (rowIndex !== -1) {
            Object.assign(currentData[rowIndex], tempData.changes);
          }
        }
        this.dataSource.data = currentData;
        this.tempStorage.clear();
        this.editingRows.clear();
        this._snackBar.open(`\u0110\xE3 \xE1p d\u1EE5ng ${tempCount} thay \u0111\u1ED5i v\xE0o d\u1EEF li\u1EC7u ch\xEDnh!`, "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error applying temp changes:", error);
        this._snackBar.open("L\u1ED7i khi \xE1p d\u1EE5ng thay \u0111\u1ED5i", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Clear all temporary storage and restore original data
   */
  clearTempStorage() {
    if (this.tempStorage.size === 0) {
      this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u t\u1EA1m th\u1EDDi \u0111\u1EC3 x\xF3a", "", {
        duration: 1500,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-info"]
      });
      return;
    }
    const tempCount = this.tempStorage.size;
    this.tempStorage.clear();
    this.editingRows.clear();
    localStorage.removeItem(this.STORAGE_KEY);
    const originalData = this.TonghopsFinal.length > 0 ? this.TonghopsFinal : this.Listsanpham();
    this.dataSource.data = [...originalData];
    this._snackBar.open(`\u0110\xE3 x\xF3a ${tempCount} thay \u0111\u1ED5i t\u1EA1m th\u1EDDi v\xE0 kh\xF4i ph\u1EE5c d\u1EEF li\u1EC7u g\u1ED1c`, "", {
      duration: 2e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-info"]
    });
  }
  /**
   * Handle Enter key for inline editing
   */
  onFieldKeyDown(event, row, field) {
    if (event.key === "Enter") {
      const target = event.target;
      this.saveFieldValue(row, field, target.value);
    } else if (event.key === "Escape") {
      this.stopEdit(row, field);
    }
  }
  /**
   * Handle blur for inline editing
   */
  onFieldBlur(event, row, field) {
    const target = event.target;
    this.saveFieldValue(row, field, target.value);
  }
  static \u0275fac = function NhucaudathangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhucaudathangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _NhucaudathangComponent, selectors: [["app-nhucaudathang"]], viewQuery: function NhucaudathangComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c0, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 136, vars: 46, consts: [["drawer", ""], ["dateMenuTrigger", "matMenuTrigger"], ["dateMenu", "matMenu"], ["startPicker", ""], ["endPicker", ""], ["menu", "matMenu"], ["uploadfile", ""], ["menuTrigger", "matMenuTrigger"], ["menuHienthi", "matMenu"], ["DeleteDialog", ""], ["filterMenu", "matMenu"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "lg:!w-1/2", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "border", "p-1", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-wrap", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm ki\u1EBFm s\u1EA3n ph\u1EA9m, m\xE3 s\u1EA3n ph\u1EA9m...", 1, "block", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "flex", "space-x-2", "items-center"], ["matTooltip", "\xC1p d\u1EE5ng thay \u0111\u1ED5i t\u1EA1m th\u1EDDi", "mat-raised-button", "", "color", "accent", 1, "text-sm", 3, "click", "disabled"], ["matTooltip", "X\xF3a d\u1EEF li\u1EC7u t\u1EA1m th\u1EDDi", "mat-stroked-button", "", "color", "warn", 1, "text-sm", 3, "click", "disabled"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], ["matTooltip", "L\u1ECDc theo ng\xE0y", "mat-icon-button", "", "color", "primary", "aria-label", "Date filter menu", 3, "matMenuTriggerFor"], [1, "date-filter-menu"], [1, "p-4", 3, "click"], [1, "flex", "flex-col", "space-y-4"], [1, "flex", "items-center", "justify-between"], [1, "font-semibold"], [1, "flex", "flex-col", "space-y-3"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "readonly", "", "placeholder", "Ch\u1ECDn ng\xE0y b\u1EAFt \u0111\u1EA7u", 3, "ngModelChange", "dateChange", "matDatepicker", "ngModel"], ["matIconSuffix", "", 3, "for"], ["matInput", "", "readonly", "", "placeholder", "Ch\u1ECDn ng\xE0y k\u1EBFt th\xFAc", 3, "ngModelChange", "dateChange", "matDatepicker", "ngModel"], [1, "flex", "flex-wrap", "gap-2"], ["mat-stroked-button", "", "color", "primary", 1, "text-xs", 3, "click"], ["mat-stroked-button", "", "color", "warn", 1, "text-xs", 3, "click"], [1, "flex", "justify-center"], ["mat-raised-button", "", 1, "w-full", 3, "click", "color"], [1, "text-xs", "text-orange-600", "bg-orange-50", "p-2", "rounded", "text-center"], [1, "text-sm", "text-gray-600", "bg-gray-50", "p-2", "rounded"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["matTooltip", "T\u1EA3i file excel M\u1EABu", "color", "primary", "mat-icon-button", "", 3, "click", "disabled"], ["diameter", "20"], ["matTooltip", "L\xE0m m\u1EDBi d\u1EEF li\u1EC7u", "color", "primary", "mat-icon-button", "", 3, "click", "disabled"], ["type", "file", 1, "hidden", 3, "change"], [1, "flex", "whitespace-nowrap", "p-2", "rounded-lg", "bg-slate-200", 3, "click"], [1, "ml-2", "px-2", "py-1", "bg-blue-100", "text-blue-800", "rounded", "text-xs"], ["matTooltip", "T\u1EA3i file Excel l\xEAn \u0111\u1EC3 c\u1EADp nh\u1EADt t\u1ED3n kho", 3, "click"], ["matTooltip", "T\u1EA3i file Excel m\u1EABu \u0111\u1EC3 c\u1EADp nh\u1EADt t\u1ED3n kho", 1, "whitespace-nowrap", "p-2", "border", "hover:bg-slate-50", "rounded-lg", "cursor-pointer", 3, "click"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50"], [1, "border", "rounded-lg", "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", "class", "bg-gray-50", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["mat-row", "", "class", "hover:bg-slate-100 transition-colors duration-200", 3, "bg-slate-200", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-4", 3, "click"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["diameter", "16"], [1, "bg-white", "rounded-lg", "p-6", "flex", "flex-col", "items-center", "space-y-4", "max-w-sm", "w-full", "mx-4"], ["diameter", "50", "color", "primary"], [1, "text-center"], [1, "text-lg", "font-semibold", "text-gray-800"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", "class", "cursor-pointer", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "filter-menu"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], ["type", "text", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup", "placeholder"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "text-xs", "text-blue-600", "underline", "cursor-pointer", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100 cursor-pointer", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], [1, "flex", "flex-col"], [1, "max-w-32", "line-clamp-2", "me-2"], [1, "text-[9px]", "text-gray-400", "font-normal", "leading-tight", "max-w-32", "whitespace-nowrap"], [1, "z-10", "material-symbols-outlined", "text-gray-500", "cursor-pointer", 3, "matMenuTriggerFor", "matTooltip"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", "cursor-pointer", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], ["class", "w-6", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], [1, "w-6"], ["mat-cell", "", 1, "cursor-pointer"], [1, "flex", "items-center", "space-x-2"], [1, "max-w-16", "line-clamp-1"], [1, "max-w-48", "line-clamp-2", 3, "matTooltip"], [1, "max-w-32", "line-clamp-1", "font-mono", "text-sm"], [1, "flex", "flex-col", "items-end"], [1, "max-w-20", "line-clamp-1", "text-end", "text-orange-600", "font-semibold"], [1, "max-w-20", "line-clamp-1", "text-end", "text-blue-600", "font-semibold"], [1, "max-w-20", "line-clamp-1", "text-end", "text-purple-600", "font-semibold"], [1, "max-w-20", "line-clamp-1", "text-end", "text-indigo-600", "font-semibold"], [1, "max-w-28", "line-clamp-1", "text-sm"], [1, "max-w-16", "line-clamp-1", "text-center"], [1, "max-w-48", "relative"], [1, "max-w-24", "relative"], [1, "max-w-32", "line-clamp-2", 3, "matTooltip"], ["mat-icon-button", "", "color", "primary", 1, "transition-all", "duration-300", "ease-in-out", "hover:scale-110", "relative", 3, "click", "matTooltip"], [1, "transition-transform", "duration-300", "ease-in-out", "text-blue-600"], [1, "absolute", "-top-1", "-right-1"], [1, "text-xs", "bg-blue-100", "text-blue-800", "px-2", "py-1", "rounded-full", "font-medium"], [1, "w-3", "h-3", "bg-blue-500", "rounded-full", "animate-pulse"], [1, "max-w-20", "line-clamp-1", "text-end", "font-semibold"], [1, "text-[9px]", "text-gray-400"], [1, "text-gray-400", "font-bold"], ["matTooltip", "C\u1EA7n nh\u1EADp th\xEAm h\xE0ng", 1, "text-red-600", "font-bold"], [1, "text-[9px]", "text-gray-400", "whitespace-nowrap"], ["matTooltip", "C\u1EA3nh b\xE1o: T\u1ED3n kho qu\xE1 cao so v\u1EDBi nhu c\u1EA7u", 1, "flex", "items-center", "space-x-1", "text-orange-600", "font-bold"], [1, "text-sm", "w-4", "h-4"], [1, "text-[9px]", "text-orange-400", "whitespace-nowrap"], [1, "text-green-600", "font-bold"], [1, "text-[9px]", "text-green-500"], [1, "font-bold", "text-gray-800"], [1, "text-[10px]", "text-gray-500", "whitespace-nowrap"], [1, "text-green-500"], [1, "text-red-500"], [1, "max-w-48", "relative", 3, "click"], ["type", "text", "placeholder", "Nh\u1EADp ghi ch\xFA...", "autofocus", "", 1, "w-full", "px-2", "py-1", "border", "border-blue-400", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", 3, "value"], [1, "cursor-text", "px-2", "py-1", "min-h-[28px]", "rounded", "hover:bg-gray-100", "border", "border-transparent", "hover:border-gray-300", "transition-all", 3, "bg-yellow-50", "border-yellow-400", "matTooltip"], ["type", "text", "placeholder", "Nh\u1EADp ghi ch\xFA...", "autofocus", "", 1, "w-full", "px-2", "py-1", "border", "border-blue-400", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", 3, "keydown", "blur", "value"], [1, "cursor-text", "px-2", "py-1", "min-h-[28px]", "rounded", "hover:bg-gray-100", "border", "border-transparent", "hover:border-gray-300", "transition-all", 3, "click", "matTooltip"], [1, "line-clamp-2"], [1, "text-orange-500", "text-sm", "absolute", "-top-1", "-right-1"], [1, "max-w-24", "relative", 3, "click"], ["type", "number", "placeholder", "0", "min", "0", "autofocus", "", 1, "w-full", "px-2", "py-1", "border", "border-blue-400", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "text-right", 3, "value"], ["matTooltip", "Click \u0111\u1EC3 ch\u1EC9nh s\u1EEDa SL \u0111\u1EB7t", 1, "cursor-text", "px-2", "py-1", "min-h-[28px]", "rounded", "hover:bg-gray-100", "border", "border-transparent", "hover:border-gray-300", "transition-all", "text-right", "font-semibold", 3, "bg-yellow-50", "border-yellow-400", "text-purple-600"], ["type", "number", "placeholder", "0", "min", "0", "autofocus", "", 1, "w-full", "px-2", "py-1", "border", "border-blue-400", "rounded", "focus:outline-none", "focus:ring-2", "focus:ring-blue-400", "text-right", 3, "keydown", "blur", "value"], ["matTooltip", "Click \u0111\u1EC3 ch\u1EC9nh s\u1EEDa SL \u0111\u1EB7t", 1, "cursor-text", "px-2", "py-1", "min-h-[28px]", "rounded", "hover:bg-gray-100", "border", "border-transparent", "hover:border-gray-300", "transition-all", "text-right", "font-semibold", 3, "click"], [1, "max-w-20", "line-clamp-1", "text-end", "text-blue-700", "font-semibold"], [1, "max-w-20", "line-clamp-1", "text-end", "text-teal-600", "font-semibold"], [1, "max-w-20", "line-clamp-1", "text-end", "font-bold", "text-gray-800"], [1, "max-w-20", "line-clamp-1", "text-end", "text-amber-600", "font-semibold"], ["mat-header-row", "", 1, "bg-gray-50"], ["mat-row", "", 1, "hover:bg-slate-100", "transition-colors", "duration-200", 3, "click"], [1, "mat-row"], [1, "mat-cell", "p-8", "text-center", "text-gray-500"], [1, "flex", "flex-col", "items-center", "space-y-2"], [1, "text-4xl", "text-gray-300"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"]], template: function NhucaudathangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 11)(1, "mat-drawer", 12, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 13)(5, "div", 14)(6, "div", 15)(7, "div", 16)(8, "input", 17);
      \u0275\u0275listener("keyup", function NhucaudathangComponent_Template_input_keyup_8_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyGlobalFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "div", 18)(10, "span", 19);
      \u0275\u0275text(11, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(12, "div", 20)(13, "button", 21);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyTempChanges());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "check");
      \u0275\u0275elementEnd();
      \u0275\u0275text(16);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(17, "button", 22);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_17_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearTempStorage());
      });
      \u0275\u0275elementStart(18, "mat-icon");
      \u0275\u0275text(19, "delete");
      \u0275\u0275elementEnd();
      \u0275\u0275text(20, " X\xF3a t\u1EA1m ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(21, "button", 23)(22, "mat-icon");
      \u0275\u0275text(23, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(24, "button", 24, 1)(26, "mat-icon");
      \u0275\u0275text(27, "date_range");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(28, "mat-menu", 25, 2)(30, "div", 26);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_div_click_30_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(31, "div", 27)(32, "div", 28)(33, "span", 29);
      \u0275\u0275text(34, "L\u1ECDc theo kho\u1EA3ng th\u1EDDi gian");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(35, "div", 30)(36, "mat-form-field", 31)(37, "mat-label");
      \u0275\u0275text(38, "T\u1EEB ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(39, "input", 32);
      \u0275\u0275twoWayListener("ngModelChange", function NhucaudathangComponent_Template_input_ngModelChange_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.batdau, $event) || (ctx.batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("dateChange", function NhucaudathangComponent_Template_input_dateChange_39_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onStartDateChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(40, "mat-datepicker-toggle", 33)(41, "mat-datepicker", null, 3);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "mat-form-field", 31)(44, "mat-label");
      \u0275\u0275text(45, "\u0110\u1EBFn ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(46, "input", 34);
      \u0275\u0275twoWayListener("ngModelChange", function NhucaudathangComponent_Template_input_ngModelChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.ketthuc, $event) || (ctx.ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("dateChange", function NhucaudathangComponent_Template_input_dateChange_46_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onEndDateChange($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275element(47, "mat-datepicker-toggle", 33)(48, "mat-datepicker", null, 4);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(50, "div", 35)(51, "button", 36);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_51_listener() {
        \u0275\u0275restoreView(_r1);
        const dateMenuTrigger_r2 = \u0275\u0275reference(25);
        return \u0275\u0275resetView(ctx.setToday(dateMenuTrigger_r2));
      });
      \u0275\u0275text(52, " H\xF4m nay ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 36);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        const dateMenuTrigger_r2 = \u0275\u0275reference(25);
        return \u0275\u0275resetView(ctx.setThisWeek(dateMenuTrigger_r2));
      });
      \u0275\u0275text(54, " Tu\u1EA7n n\xE0y ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(55, "button", 36);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        const dateMenuTrigger_r2 = \u0275\u0275reference(25);
        return \u0275\u0275resetView(ctx.setThisMonth(dateMenuTrigger_r2));
      });
      \u0275\u0275text(56, " Th\xE1ng n\xE0y ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "button", 37);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_57_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.clearDateFilter());
      });
      \u0275\u0275text(58, " X\xF3a l\u1ECDc ");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(59, "div", 38)(60, "button", 39);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_60_listener() {
        \u0275\u0275restoreView(_r1);
        const dateMenuTrigger_r2 = \u0275\u0275reference(25);
        return \u0275\u0275resetView(ctx.applyDateFilter(dateMenuTrigger_r2));
      });
      \u0275\u0275elementStart(61, "mat-icon");
      \u0275\u0275text(62);
      \u0275\u0275elementEnd();
      \u0275\u0275text(63);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(64, NhucaudathangComponent_Conditional_64_Template, 2, 0, "div", 40);
      \u0275\u0275elementStart(65, "div", 41)(66, "strong");
      \u0275\u0275text(67, "Kho\u1EA3ng th\u1EDDi gian:");
      \u0275\u0275elementEnd();
      \u0275\u0275element(68, "br");
      \u0275\u0275text(69);
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(70, "mat-menu", null, 5)(72, "div", 42)(73, "mat-form-field", 43)(74, "input", 44);
      \u0275\u0275listener("input", function NhucaudathangComponent_Template_input_input_74_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function NhucaudathangComponent_Template_input_click_74_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(75, "mat-icon", 45);
      \u0275\u0275text(76, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(77, "div", 46);
      \u0275\u0275repeaterCreate(78, NhucaudathangComponent_For_79_Template, 5, 2, "button", 47, _forTrack03);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(80, "button", 48);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_80_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.TonghopsExportFinal, "Tonghop"));
      });
      \u0275\u0275template(81, NhucaudathangComponent_Conditional_81_Template, 1, 0, "mat-spinner", 49)(82, NhucaudathangComponent_Conditional_82_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(83, "button", 50);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_83_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.refresh());
      });
      \u0275\u0275template(84, NhucaudathangComponent_Conditional_84_Template, 1, 0, "mat-spinner", 49)(85, NhucaudathangComponent_Conditional_85_Template, 2, 0, "mat-icon");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(86, "input", 51, 6);
      \u0275\u0275listener("change", function NhucaudathangComponent_Template_input_change_86_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImporExcel($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(88, "span", 52);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_span_click_88_listener() {
        \u0275\u0275restoreView(_r1);
        ctx.pageSize = ctx.TonghopsFinal.length;
        return \u0275\u0275resetView(ctx.updateDisplayData());
      });
      \u0275\u0275text(89);
      \u0275\u0275template(90, NhucaudathangComponent_Conditional_90_Template, 2, 2, "span", 53);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(91, "span", 54);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_span_click_91_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(!ctx.isUpdatingStock && ctx.Capnhattonkho());
      });
      \u0275\u0275template(92, NhucaudathangComponent_Conditional_92_Template, 3, 0)(93, NhucaudathangComponent_Conditional_93_Template, 2, 0, "span");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(94, "span", 55);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_span_click_94_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.downloadTonkhoTemplate());
      });
      \u0275\u0275text(95, "\u{1F4C4} M\u1EABu Excel");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(96, NhucaudathangComponent_Conditional_96_Template, 6, 1, "div", 56);
      \u0275\u0275elementStart(97, "div", 57)(98, "table", 58);
      \u0275\u0275repeaterCreate(99, NhucaudathangComponent_For_100_Template, 3, 1, "ng-container", 59, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(101, NhucaudathangComponent_tr_101_Template, 1, 0, "tr", 60)(102, NhucaudathangComponent_tr_102_Template, 1, 2, "tr", 61)(103, NhucaudathangComponent_tr_103_Template, 7, 1, "tr", 62);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(104, "div", 63)(105, "div", 64)(106, "span", 65);
      \u0275\u0275text(107, "\u0110ang Xem ");
      \u0275\u0275elementStart(108, "strong");
      \u0275\u0275text(109);
      \u0275\u0275elementEnd();
      \u0275\u0275text(110, " - ");
      \u0275\u0275elementStart(111, "strong");
      \u0275\u0275text(112);
      \u0275\u0275elementEnd();
      \u0275\u0275text(113);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(114, "div", 66)(115, "span", 67, 7);
      \u0275\u0275text(117);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(118, "mat-menu", null, 8)(120, "div", 68);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_div_click_120_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(121, "span");
      \u0275\u0275text(122, "S\u1ED1 L\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(123, "mat-form-field", 31)(124, "input", 69);
      \u0275\u0275twoWayListener("ngModelChange", function NhucaudathangComponent_Template_input_ngModelChange_124_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(125, "button", 70);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_125_listener() {
        \u0275\u0275restoreView(_r1);
        const menuTrigger_r11 = \u0275\u0275reference(116);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize, menuTrigger_r11));
      });
      \u0275\u0275text(126, "\xC1p D\u1EE5ng");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(127, "div", 71)(128, "button", 72);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_128_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(129, "mat-icon");
      \u0275\u0275text(130, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(131, "button", 72);
      \u0275\u0275listener("click", function NhucaudathangComponent_Template_button_click_131_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(132, "mat-icon");
      \u0275\u0275text(133, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(134, NhucaudathangComponent_ng_template_134_Template, 11, 0, "ng-template", null, 9, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const dateMenu_r23 = \u0275\u0275reference(29);
      const startPicker_r24 = \u0275\u0275reference(42);
      const endPicker_r25 = \u0275\u0275reference(49);
      const menu_r26 = \u0275\u0275reference(71);
      const menuHienthi_r27 = \u0275\u0275reference(119);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(12);
      \u0275\u0275property("disabled", ctx.getTempChangesCount() === 0);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate1(" \xC1p d\u1EE5ng (", ctx.getTempChangesCount(), ") ");
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.getTempChangesCount() === 0);
      \u0275\u0275advance(4);
      \u0275\u0275property("matMenuTriggerFor", menu_r26);
      \u0275\u0275advance(3);
      \u0275\u0275property("matMenuTriggerFor", dateMenu_r23);
      \u0275\u0275advance(2);
      \u0275\u0275classProp("text-blue-600", ctx.isDateRangeEnabled);
      \u0275\u0275advance(13);
      \u0275\u0275property("matDatepicker", startPicker_r24);
      \u0275\u0275twoWayProperty("ngModel", ctx.batdau);
      \u0275\u0275advance();
      \u0275\u0275property("for", startPicker_r24);
      \u0275\u0275advance(6);
      \u0275\u0275property("matDatepicker", endPicker_r25);
      \u0275\u0275twoWayProperty("ngModel", ctx.ketthuc);
      \u0275\u0275advance();
      \u0275\u0275property("for", endPicker_r25);
      \u0275\u0275advance(13);
      \u0275\u0275property("color", ctx.hasUnappliedDateChanges ? "warn" : "primary");
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate(ctx.hasUnappliedDateChanges ? "pending" : "filter_alt");
      \u0275\u0275advance();
      \u0275\u0275textInterpolate1(" ", ctx.hasUnappliedDateChanges ? "C\xF3 thay \u0111\u1ED5i - \xC1p d\u1EE5ng" : "\xC1p d\u1EE5ng l\u1ECDc", " ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.hasUnappliedDateChanges ? 64 : -1);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate2(" ", ctx.formatDateForDisplay(ctx.batdau, "DD/MM/YYYY"), " - ", ctx.formatDateForDisplay(ctx.ketthuc, "DD/MM/YYYY"), " ");
      \u0275\u0275advance(9);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isExportingExcel);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isExportingExcel ? 81 : 82);
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading || ctx.isRefreshing);
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isRefreshing ? 84 : 85);
      \u0275\u0275advance(5);
      \u0275\u0275textInterpolate1(" ", ctx.TonghopsFinal.length > 0 ? ctx.TonghopsFinal.length : ctx.Listsanpham().length, " S\u1EA3n Ph\u1EA9m ");
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isDateRangeEnabled ? 90 : -1);
      \u0275\u0275advance();
      \u0275\u0275classMap("whitespace-nowrap p-2 border rounded-lg cursor-pointer flex items-center space-x-2 " + (ctx.isUpdatingStock ? "opacity-50 cursor-not-allowed" : "hover:bg-slate-50"));
      \u0275\u0275advance();
      \u0275\u0275conditional(ctx.isUpdatingStock ? 92 : 93);
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isLoading || ctx.isRefreshing ? 96 : -1);
      \u0275\u0275advance(2);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.currentPage - 1) * ctx.pageSize + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.currentPage * ctx.pageSize > ctx.totalItems ? ctx.totalItems : ctx.currentPage * ctx.pageSize);
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.totalItems, " m\u1EE5c, ", ctx.currentPage, "/", ctx.totalPages, " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menuHienthi_r27);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize, " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(45, _c1));
      \u0275\u0275advance(4);
      \u0275\u0275property("disabled", ctx.currentPage === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.currentPage === ctx.totalPages);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
    MatSuffix,
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
    MatNoDataRow,
    MatSortModule,
    MatSort,
    MatSortHeader,
    MatPaginatorModule,
    MatMenuModule,
    MatMenu,
    MatMenuItem,
    MatMenuTrigger,
    MatSidenavModule,
    MatDrawer,
    MatDrawerContainer,
    RouterOutlet,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatIconButton,
    MatSelectModule,
    CommonModule,
    NgForOf,
    NgIf,
    DecimalPipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatNativeDateModule,
    MatSlideToggleModule,
    MatExpansionModule,
    MatProgressSpinnerModule,
    MatProgressSpinner
  ], styles: ["\n\n.mat-mdc-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n}\n.mat-mdc-header-cell[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  position: sticky;\n  top: 0;\n  background: #f8fafc;\n  border-bottom: 2px solid #e2e8f0;\n  font-weight: 600;\n  z-index: 10;\n}\n.mat-mdc-cell[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  border-bottom: 1px solid #e2e8f0;\n  vertical-align: middle;\n}\n.mat-mdc-row[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n  transition: background-color 0.2s ease;\n}\n.quick-filter-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  gap: 8px;\n  flex-wrap: wrap;\n  align-items: center;\n}\n.quick-filter-button[_ngcontent-%COMP%] {\n  padding: 4px 12px;\n  font-size: 12px;\n  min-height: 32px;\n  border-radius: 16px;\n}\n.quick-filter-button.active[_ngcontent-%COMP%] {\n  background-color: #3b82f6;\n  color: white;\n}\n.filter-menu[_ngcontent-%COMP%] {\n  max-width: 400px;\n}\n.date-filter-menu[_ngcontent-%COMP%] {\n  max-width: 350px;\n}\n.date-filter-menu[_ngcontent-%COMP%]   .mat-mdc-menu-content[_ngcontent-%COMP%] {\n  padding: 0 !important;\n}\n.date-range-indicator[_ngcontent-%COMP%] {\n  display: inline-flex;\n  align-items: center;\n  padding: 4px 8px;\n  background-color: #dbeafe;\n  color: #1e40af;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n  margin-left: 8px;\n}\n.mat-mdc-form-field.mat-mdc-form-field[_ngcontent-%COMP%] {\n  width: 100%;\n}\n.mat-mdc-form-field[_ngcontent-%COMP%]   .mat-mdc-text-field-wrapper[_ngcontent-%COMP%] {\n  background-color: white;\n}\n.date-range-status[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  border: 1px solid #e2e8f0;\n  border-radius: 6px;\n  padding: 8px;\n  font-size: 12px;\n  color: #475569;\n}\n.quick-date-buttons[_ngcontent-%COMP%] {\n  display: flex;\n  flex-wrap: wrap;\n  gap: 6px;\n}\n.quick-date-buttons[_ngcontent-%COMP%]   .mat-mdc-button[_ngcontent-%COMP%] {\n  font-size: 11px;\n  min-width: auto;\n  padding: 4px 8px;\n  height: 28px;\n  line-height: 20px;\n}\n.filter-menu[_ngcontent-%COMP%]   .mat-mdc-menu-content[_ngcontent-%COMP%] {\n  padding: 0;\n}\n.filter-search-input[_ngcontent-%COMP%] {\n  width: 100%;\n  padding: 8px 12px;\n  border: 1px solid #d1d5db;\n  border-radius: 6px;\n  font-size: 14px;\n}\n.filter-search-input[_ngcontent-%COMP%]:focus {\n  outline: none;\n  border-color: #3b82f6;\n  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.1);\n}\n.filter-options[_ngcontent-%COMP%] {\n  max-height: 200px;\n  overflow-y: auto;\n}\n.filter-option[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  cursor: pointer;\n  display: flex;\n  align-items: center;\n  gap: 8px;\n  border-radius: 4px;\n  margin: 2px 4px;\n}\n.filter-option[_ngcontent-%COMP%]:hover {\n  background-color: #f1f5f9;\n}\n.filter-option.selected[_ngcontent-%COMP%] {\n  background-color: #dbeafe;\n  color: #1d4ed8;\n}\n.column-filter-icon[_ngcontent-%COMP%] {\n  opacity: 0.6;\n  transition: opacity 0.2s ease;\n  cursor: pointer;\n}\n.column-filter-icon[_ngcontent-%COMP%]:hover {\n  opacity: 1;\n  color: #3b82f6;\n}\n@media (max-width: 768px) {\n  .mat-mdc-header-cell[_ngcontent-%COMP%], \n   .mat-mdc-cell[_ngcontent-%COMP%] {\n    padding: 6px 8px;\n    font-size: 13px;\n  }\n  .quick-filter-buttons[_ngcontent-%COMP%] {\n    gap: 4px;\n  }\n  .quick-filter-button[_ngcontent-%COMP%] {\n    padding: 3px 8px;\n    font-size: 11px;\n    min-height: 28px;\n  }\n}\n.status-low-stock[_ngcontent-%COMP%] {\n  color: #dc2626;\n  font-weight: 600;\n}\n.status-normal-stock[_ngcontent-%COMP%] {\n  color: #059669;\n  font-weight: 600;\n}\n.status-pending[_ngcontent-%COMP%] {\n  color: #d97706;\n  font-weight: 600;\n}\n.status-suggestion[_ngcontent-%COMP%] {\n  color: #7c3aed;\n  font-weight: 600;\n}\n.mat-mdc-row[_ngcontent-%COMP%] {\n  transition: all 0.2s ease;\n}\n.mat-mdc-row.filtered-out[_ngcontent-%COMP%] {\n  opacity: 0.5;\n  transform: scale(0.98);\n}\n.search-container[_ngcontent-%COMP%] {\n  position: relative;\n  display: flex;\n  align-items: center;\n}\n.search-icon[_ngcontent-%COMP%] {\n  position: absolute;\n  left: 12px;\n  color: #6b7280;\n  z-index: 1;\n}\n.search-input[_ngcontent-%COMP%] {\n  padding-left: 40px;\n}\n.pagination-info[_ngcontent-%COMP%] {\n  font-size: 14px;\n  color: #6b7280;\n}\n.pagination-controls[_ngcontent-%COMP%]   button[_ngcontent-%COMP%] {\n  margin: 0 4px;\n}\n.filter-badge[_ngcontent-%COMP%] {\n  position: absolute;\n  top: -2px;\n  right: -2px;\n  background: #dc2626;\n  color: white;\n  border-radius: 50%;\n  width: 16px;\n  height: 16px;\n  font-size: 10px;\n  display: flex;\n  align-items: center;\n  justify-content: center;\n}\n.filter-options[_ngcontent-%COMP%]::-webkit-scrollbar {\n  width: 6px;\n}\n.filter-options[_ngcontent-%COMP%]::-webkit-scrollbar-track {\n  background: #f1f1f1;\n  border-radius: 3px;\n}\n.filter-options[_ngcontent-%COMP%]::-webkit-scrollbar-thumb {\n  background: #c1c1c1;\n  border-radius: 3px;\n}\n.filter-options[_ngcontent-%COMP%]::-webkit-scrollbar-thumb:hover {\n  background: #a8a8a8;\n}\n.detail-row[_ngcontent-%COMP%] {\n  height: 0;\n}\n.mat-icon.rotate-180[_ngcontent-%COMP%] {\n  transform: rotate(180deg);\n  transition: transform 0.3s ease;\n}\n.mat-icon[_ngcontent-%COMP%]:not(.rotate-180) {\n  transition: transform 0.3s ease;\n}\n.expanded-content[_ngcontent-%COMP%] {\n  padding: 16px;\n  background-color: #f8fafc;\n  border-top: 1px solid #e2e8f0;\n}\n.nested-table[_ngcontent-%COMP%] {\n  width: 100%;\n  border-collapse: collapse;\n  font-size: 14px;\n}\n.nested-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%], \n.nested-table[_ngcontent-%COMP%]   td[_ngcontent-%COMP%] {\n  padding: 8px 12px;\n  text-align: left;\n  border: 1px solid #e2e8f0;\n}\n.nested-table[_ngcontent-%COMP%]   th[_ngcontent-%COMP%] {\n  background-color: #f1f5f9;\n  font-weight: 600;\n  font-size: 13px;\n}\n.nested-table[_ngcontent-%COMP%]   tbody[_ngcontent-%COMP%]   tr[_ngcontent-%COMP%]:hover {\n  background-color: #f8fafc;\n}\n.status-badge[_ngcontent-%COMP%] {\n  padding: 4px 8px;\n  border-radius: 12px;\n  font-size: 11px;\n  font-weight: 500;\n  text-transform: uppercase;\n}\n.status-badge.completed[_ngcontent-%COMP%], \n.status-badge.delivered[_ngcontent-%COMP%] {\n  background-color: #dcfce7;\n  color: #166534;\n}\n.status-badge.pending[_ngcontent-%COMP%] {\n  background-color: #fef3c7;\n  color: #92400e;\n}\n.status-badge.shipping[_ngcontent-%COMP%] {\n  background-color: #dbeafe;\n  color: #1e40af;\n}\n.loading-container[_ngcontent-%COMP%] {\n  display: flex;\n  align-items: center;\n  justify-content: center;\n  padding: 24px;\n}\n.loading-spinner[_ngcontent-%COMP%] {\n  margin-right: 12px;\n}\n.empty-state[_ngcontent-%COMP%] {\n  text-align: center;\n  padding: 24px;\n  color: #64748b;\n}\n.empty-state[_ngcontent-%COMP%]   .mat-icon[_ngcontent-%COMP%] {\n  font-size: 48px;\n  width: 48px;\n  height: 48px;\n  margin-bottom: 8px;\n  opacity: 0.5;\n}\n/*# sourceMappingURL=nhucaudathang.component.css.map */"], data: { animation: [
    trigger("detailExpand", [
      state("collapsed", style({ height: "0px", minHeight: "0" })),
      state("expanded", style({ height: "*" })),
      transition("expanded <=> collapsed", animate("225ms cubic-bezier(0.4, 0.0, 0.2, 1)"))
    ])
  ] }, changeDetection: 0 });
};
__decorate([
  Debounce(300)
], NhucaudathangComponent.prototype, "doFilterHederColumn", null);
__decorate([
  Debounce(300)
], NhucaudathangComponent.prototype, "applyAdvancedColumnFilter", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(NhucaudathangComponent, { className: "NhucaudathangComponent", filePath: "src/app/admin/dathang/nhucaudathang/nhucaudathang.component.ts", lineNumber: 102 });
})();
function Debounce(delay = 300) {
  return function(target, propertyKey, descriptor) {
    const originalMethod = descriptor.value;
    let timeoutId;
    descriptor.value = function(...args) {
      clearTimeout(timeoutId);
      timeoutId = setTimeout(() => {
        originalMethod.apply(this, args);
      }, delay);
    };
    return descriptor;
  };
}
export {
  NhucaudathangComponent
};
//# sourceMappingURL=chunk-AD4AREWO.mjs.map
