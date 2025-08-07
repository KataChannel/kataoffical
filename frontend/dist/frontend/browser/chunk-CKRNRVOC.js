import {
  SearchfilterComponent
} from "./chunk-X7ROAIMK.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  ErrorLogService
} from "./chunk-UV2EYCAL.js";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-YS6BOFHA.js";
import {
  GoogleSheetService
} from "./chunk-CB53OP7A.js";
import {
  readExcelFile,
  writeExcelFile
} from "./chunk-OZX2XR6T.js";
import {
  MatCell,
  MatCellDef,
  MatColumnDef,
  MatHeaderCell,
  MatHeaderCellDef,
  MatHeaderRow,
  MatHeaderRowDef,
  MatNoDataRow,
  MatPaginator,
  MatPaginatorModule,
  MatRow,
  MatRowDef,
  MatSort,
  MatSortHeader,
  MatSortModule,
  MatTable,
  MatTableDataSource,
  MatTableModule,
  MatTooltip,
  MatTooltipModule
} from "./chunk-JFLWRVXN.js";
import {
  ConvertDriveData
} from "./chunk-657A73EG.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-3J77SWWE.js";
import {
  MatIcon,
  MatIconModule
} from "./chunk-ZAANGQNB.js";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatInput,
  MatInputModule,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-WEAWHMFJ.js";
import {
  environment
} from "./chunk-U3IXXJDR.js";
import {
  MatSnackBar,
  StorageService
} from "./chunk-WD36GM3Q.js";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-HICNAP2H.js";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-GWKJMKCD.js";
import {
  Router,
  RouterOutlet
} from "./chunk-JGMWTFVW.js";
import {
  CommonModule,
  DatePipe
} from "./chunk-E6DSVUBK.js";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵconditional,
  ɵɵdefineComponent,
  ɵɵdefineInjectable,
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
  ɵɵpipeBind2,
  ɵɵproperty,
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
} from "./chunk-IHZ7YO24.js";
import {
  __decorate
} from "./chunk-E3MB3462.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/auditlog/auditlog.service.ts
var AuditlogService = class _AuditlogService {
  _StorageService;
  router;
  _ErrorLogService;
  constructor(_StorageService, router, _ErrorLogService) {
    this._StorageService = _StorageService;
    this.router = router;
    this._ErrorLogService = _ErrorLogService;
  }
  _snackBar = inject(MatSnackBar);
  ListAuditlog = signal([]);
  DetailAuditlog = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(50);
  // Mặc định 50 mục mỗi trang
  auditlogId = signal(null);
  setAuditlogId(id) {
    this.auditlogId.set(id);
  }
  CreateAuditlog(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/auditlog`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllAuditlog(this.pageSize());
        this.auditlogId.set(data.id);
      } catch (error) {
        this._ErrorLogService.logError("Failed to CreateAuditlog", error);
        console.error(error);
      }
    });
  }
  getAllAuditlog() {
    return __async(this, arguments, function* (pageSize = this.pageSize(), forceRefresh = false) {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const query = new URLSearchParams({
          page: this.page().toString(),
          limit: pageSize.toString()
        });
        const response = yield fetch(`${environment.APIURL}/auditlog?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListAuditlog.set(data.data);
        this.page.set(data.page || 1);
        this.pageCount.set(data.pageCount || 1);
        this.total.set(data.total || data.data.length);
        this.pageSize.set(pageSize);
        return data.data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/auditlog/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllAuditlog(this.pageSize());
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError("Failed to getUpdatedCodeIds", error);
        console.error(error);
      }
    });
  }
  getAuditlogBy(param) {
    return __async(this, null, function* () {
      param.pageSize = Number(this.pageSize());
      param.page = Number(this.page());
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(param)
        };
        const response = yield fetch(`${environment.APIURL}/auditlog/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailAuditlog.set(data);
        } else {
          this._StorageService.setItem("auditlogs_updatedAt", (/* @__PURE__ */ new Date()).toISOString());
          this.ListAuditlog.set(data.data);
          this.page.set(data.page || 1);
          this.pageCount.set(data.pageCount || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(this.pageSize());
        }
      } catch (error) {
      }
    });
  }
  updateAuditlog(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/auditlog/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllAuditlog(this.pageSize());
        this.getAuditlogBy({ id: data.id, isOne: true, pageSize: this.pageSize() });
      } catch (error) {
        this._ErrorLogService.logError("Failed to updateAuditlog", error);
        console.error(error);
      }
    });
  }
  DeleteAuditlog(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/auditlog/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllAuditlog(this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to DeleteAuditlog", error);
        console.error(error);
      }
    });
  }
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    switch (status) {
      case 400:
        message = "Th\xF4ng tin \u0111\xE3 t\u1ED3n t\u1EA1i";
        break;
      case 401:
      case 404:
        message = "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp";
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        break;
    }
    this._snackBar.open(message, "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    });
  }
  static \u0275fac = function AuditlogService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _AuditlogService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(ErrorLogService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _AuditlogService, factory: _AuditlogService.\u0275fac, providedIn: "root" });
};

// src/app/admin/auditlog/listauditlog/listauditlog.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListAuditlogComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 40);
    \u0275\u0275listener("click", function ListAuditlogComponent_For_25_Template_button_click_0_listener($event) {
      const item_r3 = \u0275\u0275restoreView(_r2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      ctx_r3.toggleColumn(item_r3);
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
    const item_r3 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r3.value);
  }
}
function ListAuditlogComponent_For_30_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 41)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.ColumnName[column_r5]);
  }
}
function ListAuditlogComponent_For_30_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListAuditlogComponent_For_30_Conditional_1_th_0_Template, 3, 1, "th", 44);
  }
}
function ListAuditlogComponent_For_30_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 42)(1, "span", 46);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 47);
    \u0275\u0275listener("OutFilter", function ListAuditlogComponent_For_30_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r6);
      const ctx_r3 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r3.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r5 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r5], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r3.Listauditlog())("fieldsearch", column_r5)("ListFilter", ctx_r3.ListFilter)("filterItem", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r5));
  }
}
function ListAuditlogComponent_For_30_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListAuditlogComponent_For_30_Conditional_2_th_0_Template, 4, 6, "th", 45);
  }
}
function ListAuditlogComponent_For_30_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 54);
    \u0275\u0275listener("click", function ListAuditlogComponent_For_30_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r7);
      const row_r8 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.goToDetail(row_r8));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r8[column_r5], " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r9 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r9 + 1, " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r8[column_r5], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate2(" ", row_r8[column_r5] == null ? null : row_r8[column_r5].name, " ", row_r8[column_r5] == null ? null : row_r8[column_r5].email, " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListAuditlogComponent_For_30_td_3_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 56);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListAuditlogComponent_For_30_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275template(1, ListAuditlogComponent_For_30_td_3_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 55)(2, ListAuditlogComponent_For_30_td_3_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 56);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r8[column_r5] ? 1 : 2);
  }
}
function ListAuditlogComponent_For_30_td_3_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 57);
    \u0275\u0275text(3, "Th\xE0nh c\xF4ng");
    \u0275\u0275elementEnd();
  }
}
function ListAuditlogComponent_For_30_td_3_Case_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 56);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 58);
    \u0275\u0275text(3, "L\u1ED7i");
    \u0275\u0275elementEnd();
  }
}
function ListAuditlogComponent_For_30_td_3_Case_6_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 59);
    \u0275\u0275text(1, "warning");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 60);
    \u0275\u0275text(3, "C\u1EA3nh b\xE1o");
    \u0275\u0275elementEnd();
  }
}
function ListAuditlogComponent_For_30_td_3_Case_6_Conditional_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 61);
    \u0275\u0275text(1, "help");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "span", 62);
    \u0275\u0275text(3);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext(2).$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate(row_r8[column_r5]);
  }
}
function ListAuditlogComponent_For_30_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275template(1, ListAuditlogComponent_For_30_td_3_Case_6_Conditional_1_Template, 4, 0)(2, ListAuditlogComponent_For_30_td_3_Case_6_Conditional_2_Template, 4, 0)(3, ListAuditlogComponent_For_30_td_3_Case_6_Conditional_3_Template, 4, 0)(4, ListAuditlogComponent_For_30_td_3_Case_6_Conditional_4_Template, 4, 1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r8[column_r5] === "SUCCESS" ? 1 : row_r8[column_r5] === "ERROR" ? 2 : row_r8[column_r5] === "WARNING" ? 3 : 4);
  }
}
function ListAuditlogComponent_For_30_td_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 51);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r8[column_r5], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r8 = \u0275\u0275nextContext().$implicit;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r8[column_r5], " ");
  }
}
function ListAuditlogComponent_For_30_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 48);
    \u0275\u0275template(1, ListAuditlogComponent_For_30_td_3_Case_1_Template, 2, 1, "span", 49)(2, ListAuditlogComponent_For_30_td_3_Case_2_Template, 2, 1, "span", 50)(3, ListAuditlogComponent_For_30_td_3_Case_3_Template, 3, 4, "span", 51)(4, ListAuditlogComponent_For_30_td_3_Case_4_Template, 2, 2, "span", 52)(5, ListAuditlogComponent_For_30_td_3_Case_5_Template, 3, 1, "span", 52)(6, ListAuditlogComponent_For_30_td_3_Case_6_Template, 5, 1, "span", 53)(7, ListAuditlogComponent_For_30_td_3_Case_7_Template, 3, 4, "span", 51)(8, ListAuditlogComponent_For_30_td_3_Case_8_Template, 2, 1, "span", 52);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_19_0;
    const column_r5 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_19_0 = column_r5) === "codeId" ? 1 : tmp_19_0 === "stt" ? 2 : tmp_19_0 === "createdAt" ? 3 : tmp_19_0 === "user" ? 4 : tmp_19_0 === "isActive" ? 5 : tmp_19_0 === "status" ? 6 : tmp_19_0 === "updatedAt" ? 7 : 8);
  }
}
function ListAuditlogComponent_For_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 25);
    \u0275\u0275template(1, ListAuditlogComponent_For_30_Conditional_1_Template, 1, 0, "th", 41)(2, ListAuditlogComponent_For_30_Conditional_2_Template, 1, 0, "th", 42)(3, ListAuditlogComponent_For_30_td_3_Template, 9, 1, "td", 43);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r5 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r5);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r5 == "stt" ? 1 : 2);
  }
}
function ListAuditlogComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 63);
  }
}
function ListAuditlogComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r10 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 64);
    \u0275\u0275listener("click", function ListAuditlogComponent_tr_32_Template_tr_click_0_listener() {
      const row_r11 = \u0275\u0275restoreView(_r10).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.goToDetail(row_r11));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r11 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r3.CheckItemInEdit(row_r11) ? "!bg-blue-50" : "", "");
  }
}
function ListAuditlogComponent_tr_33_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 65)(1, "td", 66);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListAuditlogComponent_ng_template_65_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 67)(2, "div", 68);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 69)(7, "button", 70);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 71);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListAuditlogComponent_ng_template_67_Template(rf, ctx) {
  if (rf & 1) {
    const _r13 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 72)(1, "div", 73)(2, "mat-form-field", 18)(3, "mat-label");
    \u0275\u0275text(4, "IdSheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 74);
    \u0275\u0275twoWayListener("ngModelChange", function ListAuditlogComponent_ng_template_67_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.IdSheet, $event) || (ctx_r3.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 18)(7, "mat-label");
    \u0275\u0275text(8, "SheetName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ListAuditlogComponent_ng_template_67_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r13);
      const ctx_r3 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r3.SheetName, $event) || (ctx_r3.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(10, "div", 76);
    \u0275\u0275elementStart(11, "div", 77)(12, "button", 70);
    \u0275\u0275text(13, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 71);
    \u0275\u0275text(15, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.IdSheet);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c1));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r3.SheetName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c1));
  }
}
var ListAuditlogComponent = class _ListAuditlogComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    entityName: "Module",
    action: "H\xE0nh \u0110\u1ED9ng",
    status: "Tr\u1EA1ng Th\xE1i",
    user: "Ng\u01B0\u1EDDi D\xF9ng",
    ipAddress: "\u0110\u1ECBa Ch\u1EC9 IP",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("AuditlogColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  _AuditlogService = inject(AuditlogService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  Listauditlog = this._AuditlogService.ListAuditlog;
  page = this._AuditlogService.page;
  pageCount = this._AuditlogService.pageCount;
  total = this._AuditlogService.total;
  pageSize = this._AuditlogService.pageSize;
  auditlogId = this._AuditlogService.auditlogId;
  dataSource = new MatTableDataSource([]);
  EditList = [];
  isSearch = signal(false);
  param = {};
  isLoading = signal(false);
  constructor() {
    effect(() => {
      this.dataSource.data = this.Listauditlog();
      this.dataSource.sort = this.sort;
      if (this.paginator) {
        this.paginator.pageIndex = this.page() - 1;
        this.paginator.pageSize = this.pageSize();
        this.paginator.length = this.total();
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._AuditlogService.getAuditlogBy(this.param);
      this.displayedColumns = Object.keys(this.ColumnName);
      this.dataSource = new MatTableDataSource(this.Listauditlog());
      this.dataSource.sort = this.sort;
      this.initializeColumns();
      this.setupDrawer();
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("AuditlogColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      this.param.status = filterValue;
      yield this._AuditlogService.getAuditlogBy(this.param);
    });
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      yield this._AuditlogService.getUpdatedCodeIds();
    });
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
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    this.dataSource.filteredData = this.Listauditlog().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
  }
  ListFilter = [];
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
      const CheckItem = this.ListFilter.find((v1) => v1.id === v.id) ? true : false;
      if (CheckItem) {
        this.ListFilter = this.ListFilter.filter((v1) => v1.id !== v.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Listauditlog();
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listauditlog().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  onOutFilter(event) {
    this.dataSource.data = event;
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("AuditlogColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/auditlog", "new"]);
  }
  openDeleteDialog(template) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
        this.DeleteListItem();
      }
    });
  }
  DeleteListItem() {
    this.EditList.forEach((item) => {
      this._AuditlogService.DeleteAuditlog(item);
    });
    this.EditList = [];
    this._snackBar.open("X\xF3a Th\xE0nh C\xF4ng", "", {
      duration: 1e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  AddToEdit(item) {
    const existingItem = this.EditList.find((v) => v.id === item.id);
    if (existingItem) {
      this.EditList = this.EditList.filter((v) => v.id !== item.id);
    } else {
      this.EditList.push(item);
    }
  }
  CheckItemInEdit(item) {
    return this.EditList.some((v) => v.id === item.id);
  }
  goToDetail(item) {
    this.drawer.open();
    this._AuditlogService.setAuditlogId(item.id);
    this._router.navigate(["admin/auditlog", item.id]);
  }
  OpenLoadDrive(template) {
    const dialogDeleteRef = this._dialog.open(template, {
      hasBackdrop: true,
      disableClose: true
    });
    dialogDeleteRef.afterClosed().subscribe((result) => {
      if (result === "true") {
      }
    });
  }
  IdSheet = "15npo25qyH5FmfcEjl1uyqqyFMS_vdFnmxM_kt0KYmZk";
  SheetName = "SPImport";
  ImportIteam = [];
  ImportColumnName = {};
  ImportdisplayedColumns = [];
  LoadDrive() {
    return __async(this, null, function* () {
      const DriveInfo = {
        IdSheet: this.IdSheet,
        SheetName: this.SheetName,
        ApiKey: environment.GSApiKey
      };
      const result = yield this._GoogleSheetService.getDrive(DriveInfo);
      this.ImportIteam = ConvertDriveData(result.values);
      this.ImportColumnName = Object.fromEntries(result.values[0].map((key, i) => [key, result.values[1][i]]));
      this.ImportdisplayedColumns = result.values[0];
    });
  }
  DoImportData(data) {
    return __async(this, null, function* () {
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
      const existingAuditlog = this._AuditlogService.ListAuditlog();
      const existingMasp = existingAuditlog.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingAuditlog.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._AuditlogService.updateAuditlog(updatedItem);
        } else {
          yield this._AuditlogService.CreateAuditlog(v);
        }
      })));
      yield Promise.all(existingAuditlog.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._AuditlogService.updateAuditlog(__spreadProps(__spreadValues({}, sp), { isActive: false }))));
      this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const data = yield readExcelFile(event);
      this.DoImportData(data);
    });
  }
  ExportExcel(data, title) {
    const dulieu = data.map((v) => ({
      title: v.title,
      masp: v.masp,
      giagoc: v.giagoc,
      dvt: v.dvt,
      soluong: v.soluong,
      soluongkho: v.soluongkho,
      haohut: v.haohut,
      ghichu: v.ghichu
    }));
    writeExcelFile(dulieu, title);
  }
  trackByFn(index, item) {
    return item.id;
  }
  onPageSizeChange(size, menuHienthi) {
    if (size > this.total()) {
      this._snackBar.open(`S\u1ED1 l\u01B0\u1EE3ng t\u1ED1i \u0111a ${this.total()}`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      size = this.total();
    }
    this._AuditlogService.page.set(1);
    this._AuditlogService.getAuditlogBy(this.param);
    menuHienthi.closeMenu();
  }
  onPreviousPage() {
    if (this.page() > 1) {
      this._AuditlogService.page.set(this.page() - 1);
      this._AuditlogService.getAuditlogBy(this.param);
    }
  }
  onNextPage() {
    if (this.page() < this.pageCount()) {
      this._AuditlogService.page.set(this.page() + 1);
      this._AuditlogService.getAuditlogBy(this.param);
    }
  }
  static \u0275fac = function ListAuditlogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListAuditlogComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListAuditlogComponent, selectors: [["app-listauditlog"]], viewQuery: function ListAuditlogComponent_Query(rf, ctx) {
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
  }, decls: 69, vars: 18, consts: [["drawer", ""], ["menu", "matMenu"], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["DeleteDialog", ""], ["LoadDriveDialog", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["mat-menu-item", "", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, ""], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "flex", "items-center"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], [1, "text-green-600", "font-semibold", "ms-1"], [1, "text-red-600", "font-semibold", "ms-1"], [1, "text-yellow-500"], [1, "text-yellow-600", "font-semibold", "ms-1"], [1, "text-gray-400"], [1, "text-gray-500", "ms-1"], ["mat-header-row", ""], ["mat-row", "", 1, "border", 3, "click"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!w-screen", "!h-screen", "!max-h-screen", "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp IdSheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp SheetName", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "relative", "h-full", "w-full", "overflow-auto"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"]], template: function ListAuditlogComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 6)(1, "mat-drawer", 7, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 8)(5, "div", 9)(6, "div", 10)(7, "div", 11)(8, "div", 12)(9, "input", 13);
      \u0275\u0275listener("keyup", function ListAuditlogComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 14)(11, "span", 15);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 16)(14, "mat-icon");
      \u0275\u0275text(15, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "mat-menu", null, 1)(18, "div", 17)(19, "mat-form-field", 18)(20, "input", 19);
      \u0275\u0275listener("input", function ListAuditlogComponent_Template_input_input_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListAuditlogComponent_Template_input_click_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-icon", 20);
      \u0275\u0275text(22, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 21);
      \u0275\u0275repeaterCreate(24, ListAuditlogComponent_For_25_Template, 5, 2, "button", 22, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275element(26, "div", 11);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(27, "div", 23)(28, "table", 24);
      \u0275\u0275repeaterCreate(29, ListAuditlogComponent_For_30_Template, 4, 2, "ng-container", 25, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(31, ListAuditlogComponent_tr_31_Template, 1, 0, "tr", 26)(32, ListAuditlogComponent_tr_32_Template, 1, 3, "tr", 27)(33, ListAuditlogComponent_tr_33_Template, 3, 0, "tr", 28);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(34, "div", 29)(35, "div", 30)(36, "span", 31);
      \u0275\u0275text(37, "\u0110ang Xem ");
      \u0275\u0275elementStart(38, "strong");
      \u0275\u0275text(39);
      \u0275\u0275elementEnd();
      \u0275\u0275text(40, " - ");
      \u0275\u0275elementStart(41, "strong");
      \u0275\u0275text(42);
      \u0275\u0275elementEnd();
      \u0275\u0275text(43);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(44, "div", 32)(45, "span", 33, 2);
      \u0275\u0275text(47);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "mat-menu", null, 3)(50, "div", 34);
      \u0275\u0275listener("click", function ListAuditlogComponent_Template_div_click_50_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(51, "mat-form-field", 35)(52, "mat-label");
      \u0275\u0275text(53, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(54, "input", 36);
      \u0275\u0275twoWayListener("ngModelChange", function ListAuditlogComponent_Template_input_ngModelChange_54_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.pageSize, $event) || (ctx.pageSize = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(55, "button", 37);
      \u0275\u0275listener("click", function ListAuditlogComponent_Template_button_click_55_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r12 = \u0275\u0275reference(46);
        return \u0275\u0275resetView(ctx.onPageSizeChange(ctx.pageSize(), menuHienthi_r12));
      });
      \u0275\u0275elementStart(56, "mat-icon");
      \u0275\u0275text(57, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(58, "div", 38)(59, "button", 39);
      \u0275\u0275listener("click", function ListAuditlogComponent_Template_button_click_59_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(60, "mat-icon");
      \u0275\u0275text(61, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(62, "button", 39);
      \u0275\u0275listener("click", function ListAuditlogComponent_Template_button_click_62_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(63, "mat-icon");
      \u0275\u0275text(64, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(65, ListAuditlogComponent_ng_template_65_Template, 11, 0, "ng-template", null, 4, \u0275\u0275templateRefExtractor)(67, ListAuditlogComponent_ng_template_67_Template, 16, 6, "ng-template", null, 5, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r14 = \u0275\u0275reference(17);
      const menu1_r15 = \u0275\u0275reference(49);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(12);
      \u0275\u0275property("matMenuTriggerFor", menu_r14);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(4);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate((ctx.page() - 1) * ctx.pageSize() + 1);
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.page() * ctx.pageSize() > ctx.total() ? ctx.total() : ctx.page() * ctx.pageSize());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.total(), " m\u1EE5c, ", ctx.page(), "/", ctx.pageCount(), " Trang");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r15);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.pageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275twoWayProperty("ngModel", ctx.pageSize);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(17, _c1));
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.page() === 1);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.page() === ctx.pageCount());
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatPrefix,
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
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDialogModule,
    MatDialogClose,
    MatDialogContent,
    SearchfilterComponent
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  memoize()
], ListAuditlogComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListAuditlogComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListAuditlogComponent, { className: "ListAuditlogComponent", filePath: "src/app/admin/auditlog/listauditlog/listauditlog.component.ts", lineNumber: 50 });
})();

export {
  AuditlogService,
  ListAuditlogComponent
};
//# sourceMappingURL=chunk-CKRNRVOC.js.map
