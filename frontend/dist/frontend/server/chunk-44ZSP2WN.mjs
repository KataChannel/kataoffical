import './polyfills.server.mjs';
import {
  PhieukhoService
} from "./chunk-HIZ2UIRP.mjs";
import {
  MatCheckbox,
  MatCheckboxModule
} from "./chunk-7QWUG222.mjs";
import {
  MatProgressSpinner,
  MatProgressSpinnerModule
} from "./chunk-PVLDU33E.mjs";
import {
  KhoService
} from "./chunk-GHPWMJNO.mjs";
import {
  DathangService
} from "./chunk-VX6D2TRX.mjs";
import {
  NhacungcapService
} from "./chunk-HVVVXKUA.mjs";
import {
  SanphamService
} from "./chunk-ESYIALWJ.mjs";
import {
  KhachhangService
} from "./chunk-FOXQ7452.mjs";
import {
  BanggiaService
} from "./chunk-UXO2SBGM.mjs";
import {
  SharedSocketService
} from "./chunk-6R25CFXQ.mjs";
import {
  UserService
} from "./chunk-KPXPV3IG.mjs";
import {
  excelSerialDateToJSDate,
  readExcelFileNoWorker,
  writeExcelFileSheets
} from "./chunk-C4Q5BIA5.mjs";
import {
  MatPaginator,
  MatPaginatorModule,
  MatSort,
  MatSortModule,
  MatTableModule,
  MatTooltipModule
} from "./chunk-DWV2CVG4.mjs";
import {
  ErrorLogService
} from "./chunk-RCQ574CW.mjs";
import {
  MAT_DIALOG_DATA,
  MatDialog,
  MatDialogModule,
  MatDialogRef
} from "./chunk-7O7BZAOJ.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatSidenavModule
} from "./chunk-GOLLTURE.mjs";
import {
  MatSelectModule
} from "./chunk-Z7QVUZWX.mjs";
import {
  DonhangService
} from "./chunk-HQOWTRL4.mjs";
import {
  MatDateRangeInput,
  MatDateRangePicker,
  MatDatepickerActions,
  MatDatepickerApply,
  MatDatepickerCancel,
  MatDatepickerModule,
  MatDatepickerToggle,
  MatEndDate,
  MatStartDate
} from "./chunk-RUJ72W7P.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  MatMenuModule
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
  MatInputModule,
  MatLabel,
  MatSuffix,
  NgControlStatus,
  NgModel
} from "./chunk-BTD2ENWJ.mjs";
import {
  environment
} from "./chunk-QFPTY5IH.mjs";
import {
  MatSnackBar,
  StorageService
} from "./chunk-A6W66WDU.mjs";
import {
  MatButton,
  MatButtonModule
} from "./chunk-2QXHUJNF.mjs";
import {
  MatNativeDateModule
} from "./chunk-7GJ6SLXG.mjs";
import {
  Router
} from "./chunk-PLFAEF4K.mjs";
import {
  CommonModule,
  DatePipe,
  NgForOf,
  NgIf
} from "./chunk-H3GF4RFC.mjs";
import {
  effect,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵclassMapInterpolate1,
  ɵɵclassMapInterpolate3,
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
  ɵɵpipeBind2,
  ɵɵproperty,
  ɵɵpureFunction0,
  ɵɵqueryRefresh,
  ɵɵreference,
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
} from "./chunk-4EQURZBD.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/importdata/importdata.service.ts
var ImportdataService = class _ImportdataService {
  _StorageService;
  router;
  _ErrorLogService;
  _sharedSocketService;
  socket;
  constructor(_StorageService, router, _ErrorLogService, _sharedSocketService) {
    this._StorageService = _StorageService;
    this.router = router;
    this._ErrorLogService = _ErrorLogService;
    this._sharedSocketService = _sharedSocketService;
    this.socket = this._sharedSocketService.getSocket();
    this.listenImportdataUpdates();
  }
  _snackBar = inject(MatSnackBar);
  ListImportdata = signal([]);
  DetailImportdata = signal({});
  page = signal(1);
  pageCount = signal(1);
  total = signal(0);
  pageSize = signal(9999);
  // Mặc định 10 mục mỗi trang
  importdataId = signal(null);
  // Khởi tạo IndexedDB
  setImportdataId(id) {
    this.importdataId.set(id);
  }
  CreateImportdata(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/importdata`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        this.getAllImportdata(this.pageSize());
        this.importdataId.set(data.id);
      } catch (error) {
        this._ErrorLogService.logError("Failed to CreateImportdata", error);
        console.error(error);
      }
    });
  }
  getAllImportdata() {
    return __async(this, arguments, function* (pageSize = this.pageSize(), forceRefresh = false) {
      this.pageSize.set(pageSize);
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
        const response = yield fetch(`${environment.APIURL}/importdata?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.ListImportdata.set(data.data);
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
        const response = yield fetch(`${environment.APIURL}/importdata/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllImportdata(this.pageSize());
        return data.data;
      } catch (error) {
        this._ErrorLogService.logError("Failed to getUpdatedCodeIds", error);
        console.error(error);
      }
    });
  }
  listenImportdataUpdates() {
    this.socket.off("importdata-updated");
    this.socket.on("importdata-updated", () => __async(this, null, function* () {
      console.log("\u{1F504} D\u1EEF li\u1EC7u s\u1EA3n ph\u1EA9m thay \u0111\u1ED5i, c\u1EADp nh\u1EADt l\u1EA1i cache...");
      this._StorageService.removeItem("importdatas_updatedAt");
      yield this.getAllImportdata();
    }));
  }
  getImportdataBy(_0) {
    return __async(this, arguments, function* (param, pageSize = this.pageSize()) {
      this.pageSize.set(pageSize);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(__spreadProps(__spreadValues({}, param), { page: this.page(), limit: pageSize }))
        };
        const response = yield fetch(`${environment.APIURL}/importdata/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailImportdata.set(data);
        } else {
          this._StorageService.setItem("importdatas_updatedAt", (/* @__PURE__ */ new Date()).toISOString());
          this.ListImportdata.set(data.data);
          this.page.set(data.page || 1);
          this.pageCount.set(data.pageCount || 1);
          this.total.set(data.total || data.data.length);
          this.pageSize.set(pageSize);
        }
      } catch (error) {
        console.error(error);
      }
    });
  }
  updateImportdata(dulieu) {
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
        const response = yield fetch(`${environment.APIURL}/importdata/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllImportdata(this.pageSize());
        this.getImportdataBy({ id: data.id, isOne: true }, this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to updateImportdata", error);
        console.error(error);
      }
    });
  }
  DeleteImportdata(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/importdata/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllImportdata(this.pageSize());
      } catch (error) {
        this._ErrorLogService.logError("Failed to DeleteImportdata", error);
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
  static \u0275fac = function ImportdataService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportdataService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router), \u0275\u0275inject(ErrorLogService), \u0275\u0275inject(SharedSocketService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImportdataService, factory: _ImportdataService.\u0275fac, providedIn: "root" });
};

// src/app/admin/importdata/listimportdata/listimportdata.component.ts
var import_moment = __toESM(require_moment());

// src/app/admin/importdata/import-confirmation-dialog.component.ts
function ImportConfirmationDialogComponent_div_19_li_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r1 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.getItemDisplayName(item_r1), " ");
  }
}
function ImportConfirmationDialogComponent_div_19_li_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "li", 17);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ... v\xE0 ", ctx_r1.data.duplicateItems.length - 5, " m\u1EE5c kh\xE1c ");
  }
}
function ImportConfirmationDialogComponent_div_19_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 11)(1, "p", 12)(2, "mat-icon", 13);
    \u0275\u0275text(3, "error");
    \u0275\u0275elementEnd();
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "ul", 14);
    \u0275\u0275template(6, ImportConfirmationDialogComponent_div_19_li_6_Template, 2, 1, "li", 15)(7, ImportConfirmationDialogComponent_div_19_li_7_Template, 2, 1, "li", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate1(" Ph\xE1t hi\u1EC7n ", ctx_r1.data.duplicateItems.length, " m\u1EE5c tr\xF9ng l\u1EB7p: ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", ctx_r1.data.duplicateItems.slice(0, 5));
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.data.duplicateItems.length > 5);
  }
}
function ImportConfirmationDialogComponent_div_20_div_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 23);
    \u0275\u0275text(1, " \u26A0\uFE0F D\u1EEF li\u1EC7u c\u0169 s\u1EBD b\u1ECB thay th\u1EBF b\u1EDFi d\u1EEF li\u1EC7u m\u1EDBi ");
    \u0275\u0275elementEnd();
  }
}
function ImportConfirmationDialogComponent_div_20_div_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 17);
    \u0275\u0275text(1, " \u2139\uFE0F Ch\u1EC9 th\xEAm m\u1EDBi c\xE1c m\u1EE5c ch\u01B0a t\u1ED3n t\u1EA1i, b\u1ECF qua c\xE1c m\u1EE5c tr\xF9ng l\u1EB7p ");
    \u0275\u0275elementEnd();
  }
}
function ImportConfirmationDialogComponent_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 18)(1, "mat-checkbox", 19);
    \u0275\u0275twoWayListener("ngModelChange", function ImportConfirmationDialogComponent_div_20_Template_mat_checkbox_ngModelChange_1_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.data.isOverwrite, $event) || (ctx_r1.data.isOverwrite = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementStart(2, "span", 20);
    \u0275\u0275text(3, "Ghi \u0111\xE8 l\xEAn d\u1EEF li\u1EC7u c\u0169 (c\xE1c m\u1EE5c tr\xF9ng l\u1EB7p s\u1EBD \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt)");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "div", 21);
    \u0275\u0275template(5, ImportConfirmationDialogComponent_div_20_div_5_Template, 2, 0, "div", 22)(6, ImportConfirmationDialogComponent_div_20_div_6_Template, 2, 0, "div", 16);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.data.isOverwrite);
    \u0275\u0275advance(4);
    \u0275\u0275property("ngIf", ctx_r1.data.isOverwrite);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", !ctx_r1.data.isOverwrite);
  }
}
function ImportConfirmationDialogComponent_div_21_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 24)(1, "div", 25)(2, "mat-icon", 26);
    \u0275\u0275text(3, "check_circle");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "span");
    \u0275\u0275text(5, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u tr\xF9ng l\u1EB7p. T\u1EA5t c\u1EA3 s\u1EBD \u0111\u01B0\u1EE3c th\xEAm m\u1EDBi.");
    \u0275\u0275elementEnd()()();
  }
}
var ImportConfirmationDialogComponent = class _ImportConfirmationDialogComponent {
  dialogRef;
  data;
  constructor(dialogRef, data) {
    this.dialogRef = dialogRef;
    this.data = data;
  }
  getItemDisplayName(item) {
    switch (this.data.dataType) {
      case "S\u1EA3n Ph\u1EA9m":
        return `${item.masp} - ${item.title}`;
      case "Kh\xE1ch H\xE0ng":
        return `${item.makh} - ${item.name}`;
      case "Nh\xE0 Cung C\u1EA5p":
        return `${item.mancc} - ${item.name}`;
      case "B\u1EA3ng Gi\xE1":
        return `${item.mabanggia} - ${item.title}`;
      default:
        return item.name || item.title || item.id || "N/A";
    }
  }
  onConfirm() {
    this.dialogRef.close({
      confirmed: true,
      overwrite: this.data.isOverwrite
    });
  }
  onCancel() {
    this.dialogRef.close({
      confirmed: false,
      overwrite: false
    });
  }
  static \u0275fac = function ImportConfirmationDialogComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportConfirmationDialogComponent)(\u0275\u0275directiveInject(MatDialogRef), \u0275\u0275directiveInject(MAT_DIALOG_DATA));
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ImportConfirmationDialogComponent, selectors: [["app-import-confirmation-dialog"]], decls: 31, vars: 7, consts: [[1, "p-6", "min-w-96"], [1, "flex", "items-center", "mb-4"], [1, "text-orange-500", "mr-2"], [1, "text-lg", "font-semibold"], [1, "mb-4", "text-gray-700"], ["class", "mt-3", 4, "ngIf"], ["class", "mb-6", 4, "ngIf"], ["class", "mb-4 p-3 bg-green-50 border border-green-200 rounded", 4, "ngIf"], [1, "flex", "justify-end", "space-x-3", "mt-6"], ["mat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "mt-3"], [1, "text-red-600", "font-medium"], [1, "text-red-500", "text-sm"], [1, "list-disc", "list-inside", "text-sm", "text-gray-600", "mt-2", "max-h-32", "overflow-y-auto"], [4, "ngFor", "ngForOf"], ["class", "text-blue-600", 4, "ngIf"], [1, "text-blue-600"], [1, "mb-6"], [1, "text-sm", 3, "ngModelChange", "ngModel"], [1, "ml-2"], [1, "mt-2", "text-sm", "text-gray-600"], ["class", "text-orange-600", 4, "ngIf"], [1, "text-orange-600"], [1, "mb-4", "p-3", "bg-green-50", "border", "border-green-200", "rounded"], [1, "flex", "items-center", "text-green-700"], [1, "text-green-500", "mr-2"]], template: function ImportConfirmationDialogComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "div", 0)(1, "div", 1)(2, "mat-icon", 2);
      \u0275\u0275text(3, "warning");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "h2", 3);
      \u0275\u0275text(5, "X\xE1c nh\u1EADn Import D\u1EEF li\u1EC7u");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(6, "div", 4)(7, "p")(8, "strong");
      \u0275\u0275text(9, "Lo\u1EA1i d\u1EEF li\u1EC7u:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(10);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "p")(12, "strong");
      \u0275\u0275text(13, "D\u1EEF li\u1EC7u hi\u1EC7n t\u1EA1i:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(14);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(15, "p")(16, "strong");
      \u0275\u0275text(17, "D\u1EEF li\u1EC7u m\u1EDBi:");
      \u0275\u0275elementEnd();
      \u0275\u0275text(18);
      \u0275\u0275elementEnd();
      \u0275\u0275template(19, ImportConfirmationDialogComponent_div_19_Template, 8, 3, "div", 5);
      \u0275\u0275elementEnd();
      \u0275\u0275template(20, ImportConfirmationDialogComponent_div_20_Template, 7, 3, "div", 6)(21, ImportConfirmationDialogComponent_div_21_Template, 6, 0, "div", 7);
      \u0275\u0275elementStart(22, "div", 8)(23, "button", 9);
      \u0275\u0275listener("click", function ImportConfirmationDialogComponent_Template_button_click_23_listener() {
        return ctx.onCancel();
      });
      \u0275\u0275elementStart(24, "mat-icon");
      \u0275\u0275text(25, "cancel");
      \u0275\u0275elementEnd();
      \u0275\u0275text(26, " H\u1EE7y b\u1ECF ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 10);
      \u0275\u0275listener("click", function ImportConfirmationDialogComponent_Template_button_click_27_listener() {
        return ctx.onConfirm();
      });
      \u0275\u0275elementStart(28, "mat-icon");
      \u0275\u0275text(29, "file_upload");
      \u0275\u0275elementEnd();
      \u0275\u0275text(30);
      \u0275\u0275elementEnd()()();
    }
    if (rf & 2) {
      \u0275\u0275advance(10);
      \u0275\u0275textInterpolate1(" ", ctx.data.dataType, "");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.data.existingCount, " m\u1EE5c");
      \u0275\u0275advance(4);
      \u0275\u0275textInterpolate1(" ", ctx.data.newCount, " m\u1EE5c");
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.data.duplicateItems.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.data.duplicateItems.length > 0);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.data.duplicateItems.length === 0);
      \u0275\u0275advance(9);
      \u0275\u0275textInterpolate1(" ", ctx.data.duplicateItems.length > 0 ? ctx.data.isOverwrite ? "Import & Ghi \u0111\xE8" : "Import & B\u1ECF qua tr\xF9ng l\u1EB7p" : "Import", " ");
    }
  }, dependencies: [
    MatDialogModule,
    MatButtonModule,
    MatButton,
    MatIconModule,
    MatIcon,
    CommonModule,
    NgForOf,
    NgIf,
    MatCheckboxModule,
    MatCheckbox,
    FormsModule,
    NgControlStatus,
    NgModel
  ], encapsulation: 2 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ImportConfirmationDialogComponent, { className: "ImportConfirmationDialogComponent", filePath: "src/app/admin/importdata/import-confirmation-dialog.component.ts", lineNumber: 93 });
})();

// src/app/shared/services/import-data-validation.service.ts
var ImportDataValidationService = class _ImportDataValidationService {
  /**
   * Check for duplicate items between new data and existing data
   * @param newData - Array of new items to import
   * @param existingData - Array of existing items
   * @param keyField - Field to use for comparison
   * @returns Array of duplicate items
   */
  static checkDuplicates(newData, existingData, keyField) {
    const existingKeys = new Set(existingData.map((item) => item[keyField]));
    return newData.filter((item) => existingKeys.has(item[keyField]));
  }
  /**
   * Prepare product data for import
   * @param data - Array of new products
   * @param existingData - Array of existing products
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of products to import
   */
  static prepareSanphamData(data, existingData, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.masp));
      return data.filter((item) => !existingCodes.has(item.masp));
    }
  }
  /**
   * Prepare customer data for import
   * @param data - Array of new customers
   * @param existingData - Array of existing customers
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of customers to import
   */
  static prepareKhachhangData(data, existingData, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.makh));
      return data.filter((item) => !existingCodes.has(item.makh));
    }
  }
  /**
   * Prepare supplier data for import
   * @param data - Array of new suppliers
   * @param existingData - Array of existing suppliers
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of suppliers to import
   */
  static prepareNhacungcapData(data, existingData, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.mancc));
      return data.filter((item) => !existingCodes.has(item.mancc));
    }
  }
  /**
   * Prepare price list data for import
   * @param data - Array of new price lists
   * @param existingData - Array of existing price lists
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of price lists to import
   */
  static prepareBanggiaData(data, existingData, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.mabanggia));
      return data.filter((item) => !existingCodes.has(item.mabanggia));
    }
  }
  /**
   * Prepare warehouse data for import
   * @param data - Array of new warehouses
   * @param existingData - Array of existing warehouses
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of warehouses to import
   */
  static prepareKhoData(data, existingData, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item.makho));
      return data.filter((item) => !existingCodes.has(item.makho));
    }
  }
  /**
   * Generic method to prepare data for import
   * @param data - Array of new items
   * @param existingData - Array of existing items
   * @param keyField - Field to use for comparison
   * @param overwrite - Whether to overwrite existing data
   * @returns Filtered array of items to import
   */
  static prepareGenericData(data, existingData, keyField, overwrite) {
    if (overwrite) {
      return data;
    } else {
      const existingCodes = new Set(existingData.map((item) => item[keyField]));
      return data.filter((item) => !existingCodes.has(item[keyField]));
    }
  }
  /**
   * Validate required fields in data
   * @param data - Array of items to validate
   * @param requiredFields - Array of required field names
   * @returns Validation result with valid and invalid items
   */
  static validateRequiredFields(data, requiredFields) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const missingFields = requiredFields.filter((field) => item[field] === void 0 || item[field] === null || item[field] === "");
      if (missingFields.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: missingFields.map((field) => `Missing required field: ${field}`)
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate data format for specific data types
   * @param data - Array of items to validate
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Validation result
   */
  static validateDataFormat(data, dataType) {
    switch (dataType) {
      case "sanpham":
        return this.validateSanphamFormat(data);
      case "khachhang":
        return this.validateKhachhangFormat(data);
      case "nhacungcap":
        return this.validateNhacungcapFormat(data);
      case "banggia":
        return this.validateBanggiaFormat(data);
      case "kho":
        return this.validateKhoFormat(data);
      default:
        return { valid: data, invalid: [] };
    }
  }
  /**
   * Validate product data format
   */
  static validateSanphamFormat(data) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const errors = [];
      if (!item.masp || typeof item.masp !== "string") {
        errors.push("Invalid product code (masp)");
      }
      if (item.giaban && isNaN(Number(item.giaban))) {
        errors.push("Invalid selling price (giaban)");
      }
      if (item.giagoc && isNaN(Number(item.giagoc))) {
        errors.push("Invalid cost price (giagoc)");
      }
      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: errors
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate customer data format
   */
  static validateKhachhangFormat(data) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const errors = [];
      if (!item.makh || typeof item.makh !== "string") {
        errors.push("Invalid customer code (makh)");
      }
      if (!item.name || typeof item.name !== "string") {
        errors.push("Invalid customer name");
      }
      if (item.email && !this.isValidEmail(item.email)) {
        errors.push("Invalid email format");
      }
      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: errors
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate supplier data format
   */
  static validateNhacungcapFormat(data) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const errors = [];
      if (!item.mancc || typeof item.mancc !== "string") {
        errors.push("Invalid supplier code (mancc)");
      }
      if (!item.name || typeof item.name !== "string") {
        errors.push("Invalid supplier name");
      }
      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: errors
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate price list data format
   */
  static validateBanggiaFormat(data) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const errors = [];
      if (!item.mabanggia || typeof item.mabanggia !== "string") {
        errors.push("Invalid price list code (mabanggia)");
      }
      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: errors
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate warehouse data format
   */
  static validateKhoFormat(data) {
    const valid = [];
    const invalid = [];
    data.forEach((item) => {
      const errors = [];
      if (!item.makho || typeof item.makho !== "string") {
        errors.push("Invalid warehouse code (makho)");
      }
      if (!item.tenkho || typeof item.tenkho !== "string") {
        errors.push("Invalid warehouse name (tenkho)");
      }
      if (errors.length === 0) {
        valid.push(item);
      } else {
        invalid.push(__spreadProps(__spreadValues({}, item), {
          _validationErrors: errors
        }));
      }
    });
    return { valid, invalid };
  }
  /**
   * Validate email format
   */
  static isValidEmail(email) {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  }
  /**
   * Get summary of validation results
   */
  static getValidationSummary(totalItems, validItems, invalidItems, duplicateItems) {
    return `
      T\u1ED5ng s\u1ED1 d\xF2ng: ${totalItems}
      D\u1EEF li\u1EC7u h\u1EE3p l\u1EC7: ${validItems}
      D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7: ${invalidItems}
      D\u1EEF li\u1EC7u tr\xF9ng l\u1EB7p: ${duplicateItems}
    `;
  }
  /**
   * Transform data before import
   * @param data - Array of items to transform
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Transformed data
   */
  static transformDataForImport(data, dataType) {
    switch (dataType) {
      case "sanpham":
        return this.transformSanphamData(data);
      case "khachhang":
        return this.transformKhachhangData(data);
      case "nhacungcap":
        return this.transformNhacungcapData(data);
      case "banggia":
        return this.transformBanggiaData(data);
      case "kho":
        return this.transformKhoData(data);
      default:
        return data;
    }
  }
  /**
   * Transform product data for import
   */
  static transformSanphamData(data) {
    return data.map((item) => __spreadProps(__spreadValues({}, item), {
      masp: item.masp?.toString().trim() || "",
      subtitle: removeVietnameseAccents((item.title || "") + (item.title2 || "")),
      title: item.title?.toString().trim() || "",
      title2: item.title2?.toString().trim() || "",
      giaban: Number(item.giaban) || Number(item.giagoc) || 0,
      giagoc: Number(item.giagoc) || 0,
      vat: Number(item.vat) || 0,
      dvt: item.dvt?.toString().trim() || "",
      haohut: Number(item.haohut) || 0,
      ghichu: item.ghichu?.toString().trim() || ""
    }));
  }
  /**
   * Transform customer data for import
   */
  static transformKhachhangData(data) {
    return data.map((item) => __spreadProps(__spreadValues({}, item), {
      makh: item.makh?.toString().trim() || "",
      name: item.name?.toString().trim() || "",
      tenfile: removeVietnameseAccents(item.tenfile?.toString() || item.name?.toString() || ""),
      subtitle: removeVietnameseAccents((item.name?.toString() || "") + (item.namenn?.toString() || "")),
      namenn: item.namenn?.toString().trim() || "",
      diachi: item.diachi?.toString().trim() || "",
      quan: item.quan?.toString().trim() || "",
      email: item.email?.toString().trim() || "",
      sdt: item.sdt?.toString().trim() || "",
      mst: item.mst?.toString().trim() || "",
      gionhanhang: item.gionhanhang?.toString().trim() || "",
      loaikh: item.loaikh?.toString().trim() || "khachsi",
      hiengia: item.hiengia !== void 0 ? Boolean(item.hiengia) : true,
      ghichu: item.ghichu?.toString().trim() || "",
      mabanggia: item.mabanggia?.toString().trim() || ""
    }));
  }
  /**
   * Transform supplier data for import
   */
  static transformNhacungcapData(data) {
    return data.map((item) => __spreadProps(__spreadValues({}, item), {
      mancc: item.mancc?.toString().trim() || "",
      name: item.name?.toString().trim() || "",
      tenfile: removeVietnameseAccents(item.tenfile?.toString() || item.name?.toString() || ""),
      diachi: item.diachi?.toString().trim() || "",
      email: item.email?.toString().trim() || "",
      sdt: item.sdt?.toString().trim() || "",
      ghichu: item.ghichu?.toString().trim() || ""
    }));
  }
  /**
   * Transform price list data for import
   */
  static transformBanggiaData(data) {
    return data.map((item) => __spreadProps(__spreadValues({}, item), {
      mabanggia: item.mabanggia?.toString().trim() || "",
      title: item.title?.toString().trim() || "",
      type: item.type?.toString().trim() || "",
      ghichu: item.ghichu?.toString().trim() || "",
      status: item.status?.toString().trim() || "active"
    }));
  }
  /**
   * Transform warehouse data for import
   */
  static transformKhoData(data) {
    return data.map((item) => __spreadProps(__spreadValues({}, item), {
      makho: item.makho?.toString().trim() || "",
      tenkho: item.tenkho?.toString().trim() || "",
      diachi: item.diachi?.toString().trim() || "",
      ghichu: item.ghichu?.toString().trim() || "",
      status: item.status?.toString().trim() || "active"
    }));
  }
  /**
   * Filter out invalid data before processing
   * @param data - Array of items to filter
   * @param requiredFields - Array of required field names
   * @returns Filtered data with only valid items
   */
  static filterValidData(data, requiredFields) {
    return data.filter((item) => {
      return requiredFields.every((field) => item[field] !== void 0 && item[field] !== null && item[field] !== "");
    });
  }
  /**
   * Get entity-specific required fields
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Array of required field names
   */
  static getRequiredFields(dataType) {
    switch (dataType) {
      case "sanpham":
        return ["masp", "title"];
      case "khachhang":
        return ["makh", "name"];
      case "nhacungcap":
        return ["mancc", "name"];
      case "banggia":
        return ["mabanggia", "title"];
      case "kho":
        return ["makho", "tenkho"];
      default:
        return [];
    }
  }
  /**
   * Get unique identifier field for entity type
   * @param dataType - Type of data (sanpham, khachhang, etc.)
   * @returns Field name used as unique identifier
   */
  static getUniqueField(dataType) {
    switch (dataType) {
      case "sanpham":
        return "masp";
      case "khachhang":
        return "makh";
      case "nhacungcap":
        return "mancc";
      case "banggia":
        return "mabanggia";
      case "kho":
        return "makho";
      default:
        return "id";
    }
  }
  static \u0275fac = function ImportDataValidationService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ImportDataValidationService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ImportDataValidationService, factory: _ImportDataValidationService.\u0275fac, providedIn: "root" });
};

// src/app/admin/importdata/listimportdata/listimportdata.component.ts
var _c0 = ["drawer"];
var _c1 = () => ({ standalone: true });
var _c2 = () => [1, 2, 3, 4, 5];
function ListImportdataComponent_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 42)(1, "div", 43);
    \u0275\u0275element(2, "mat-progress-spinner", 44);
    \u0275\u0275elementStart(3, "span", 45);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.loadingMessage());
  }
}
function ListImportdataComponent_span_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "T\u1EA3i Xu\u1ED1ng");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_span_51_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275element(1, "mat-progress-spinner", 47);
    \u0275\u0275text(2, " \u0110ang xu\u1EA5t... ");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_mat_icon_52_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 48);
    \u0275\u0275text(1, "download");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_span_54_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1, "T\u1EA3i L\xEAn");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_span_55_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 46);
    \u0275\u0275element(1, "mat-progress-spinner", 47);
    \u0275\u0275text(2, " \u0110ang nh\u1EADp... ");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_mat_icon_56_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 48);
    \u0275\u0275text(1, "upload");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_div_61_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 49)(1, "div", 23);
    \u0275\u0275element(2, "mat-progress-spinner", 50);
    \u0275\u0275elementStart(3, "span", 51);
    \u0275\u0275text(4);
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(4);
    \u0275\u0275textInterpolate(ctx_r1.loadingMessage());
  }
}
function ListImportdataComponent_span_63_mat_icon_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon");
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_span_63_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 52);
    \u0275\u0275listener("click", function ListImportdataComponent_span_63_Template_span_click_0_listener() {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(!ctx_r1.isLoading() && !ctx_r1.isImporting() && !ctx_r1.isExporting() && item_r5.status && ctx_r1.toggleItem(item_r5));
    });
    \u0275\u0275template(1, ListImportdataComponent_span_63_mat_icon_1_Template, 2, 0, "mat-icon", 29);
    \u0275\u0275elementStart(2, "span");
    \u0275\u0275text(3);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r5 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate3("", !item_r5.status ? "hidden" : "", " \n                   ", ctx_r1.CheckItem(item_r5) ? "bg-blue-100" : "", " \n                   ", ctx_r1.isLoading() || ctx_r1.isImporting() || ctx_r1.isExporting() ? "opacity-50 cursor-not-allowed" : "cursor-pointer", " \n                   flex flex-row space-x-2 items-center p-4 rounded-lg border transition-all duration-200");
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r5));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.title);
  }
}
function ListImportdataComponent_ng_container_70_div_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 55);
    \u0275\u0275element(1, "div", 56)(2, "div", 57)(3, "div", 58);
    \u0275\u0275elementEnd();
  }
}
function ListImportdataComponent_ng_container_70_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275elementStart(1, "div", 53);
    \u0275\u0275template(2, ListImportdataComponent_ng_container_70_div_2_Template, 4, 0, "div", 54);
    \u0275\u0275elementEnd();
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    \u0275\u0275advance(2);
    \u0275\u0275property("ngForOf", \u0275\u0275pureFunction0(1, _c2));
  }
}
function ListImportdataComponent_ng_template_71_ng_container_0_div_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div")(1, "span", 60);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span");
    \u0275\u0275text(4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "span", 61);
    \u0275\u0275text(6);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r6 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(3);
    \u0275\u0275classMapInterpolate1("w-full flex flex-row space-x-2 items-center border p-4 rounded-lg\n                    ", ctx_r1.isImporting() || ctx_r1.isExporting() ? "opacity-50" : "", "");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.type);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.description);
  }
}
function ListImportdataComponent_ng_template_71_ng_container_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0);
    \u0275\u0275template(1, ListImportdataComponent_ng_template_71_ng_container_0_div_1_Template, 7, 6, "div", 59);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngForOf", ctx_r1.ListImportdata());
  }
}
function ListImportdataComponent_ng_template_71_ng_template_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "div", 62)(1, "span", 63);
    \u0275\u0275text(2, "Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u");
    \u0275\u0275elementEnd()();
  }
}
function ListImportdataComponent_ng_template_71_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListImportdataComponent_ng_template_71_ng_container_0_Template, 2, 1, "ng-container", 41)(1, ListImportdataComponent_ng_template_71_ng_template_1_Template, 3, 0, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
  }
  if (rf & 2) {
    const noData_r7 = \u0275\u0275reference(2);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275property("ngIf", ctx_r1.ListImportdata().length > 0)("ngIfElse", noData_r7);
  }
}
var ListImportdataComponent = class _ListImportdataComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    codeId: "Code",
    name: "Ti\xEAu \u0110\u1EC1",
    group: "Nh\xF3m",
    description: "M\xF4 T\u1EA3",
    status: "Tr\u1EA1ng Th\xE1i",
    order: "Th\u1EE9 T\u1EF1",
    createdAt: "Ng\xE0y T\u1EA1o",
    updatedAt: "Ng\xE0y C\u1EADp Nh\u1EADt"
  };
  FilterColumns = JSON.parse(localStorage.getItem("ImportdataColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  _BanggiaService = inject(BanggiaService);
  _SanphamService = inject(SanphamService);
  _KhachhangService = inject(KhachhangService);
  _NhacungcapService = inject(NhacungcapService);
  _DonhangService = inject(DonhangService);
  _DathangService = inject(DathangService);
  _PhieukhoService = inject(PhieukhoService);
  _UserService = inject(UserService);
  _KhoService = inject(KhoService);
  _ImportdataService = inject(ImportdataService);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  // Loading states using signals
  isLoading = signal(false);
  isImporting = signal(false);
  isExporting = signal(false);
  loadingMessage = signal("");
  // Date range properties
  batdau = /* @__PURE__ */ new Date();
  ketthuc = /* @__PURE__ */ new Date();
  ListImportType = signal([
    { id: 1, title: "S\u1EA3n Ph\u1EA9m", value: "sanpham", status: true },
    { id: 2, title: "Kh\xE1ch H\xE0ng", value: "khachhang", status: true },
    { id: 3, title: "Nh\xE0 Cung C\u1EA5p", value: "nhacungcap", status: true },
    { id: 4, title: "B\u1EA3ng Gi\xE1", value: "banggia", status: true },
    { id: 5, title: "\u0110\u01A1n H\xE0ng", value: "donhang", status: true },
    { id: 6, title: "\u0110\u1EB7t H\xE0ng", value: "dathang", status: true },
    {
      id: 7,
      title: "B\u1EA3ng Gi\xE1 Kh\xE1ch H\xE0ng",
      value: "banggiakhachhang",
      status: true
    },
    {
      id: 8,
      title: "B\u1EA3ng Gi\xE1 S\u1EA3n Ph\u1EA9m",
      value: "banggiasanpham",
      status: true
    },
    {
      id: 9,
      title: "Nh\xE0 Cung C\u1EA5p S\u1EA3n Ph\u1EA9m",
      value: "nhacungcapsanpham",
      status: true
    },
    { id: 10, title: "Xu\u1EA5t Nh\u1EADp T\u1ED3n", value: "xuatnhapton", status: true },
    { id: 11, title: "Kho", value: "kho", status: true }
  ]);
  ListEdit = signal([]);
  ListImportdata = this._ImportdataService.ListImportdata;
  TitleExport = "export";
  rawListSP = [];
  rawListKH = [];
  rawListNCC = [];
  rawListBG = [];
  rawListDH = [];
  rawListDathang = [];
  rawListTonkho = [];
  rawListKho = [];
  constructor() {
    const today = /* @__PURE__ */ new Date();
    this.ketthuc = new Date(today);
    this.batdau = new Date(today);
    effect(() => __async(this, null, function* () {
      this.isLoading.set(true);
      this.loadingMessage.set("\u0110ang t\u1EA3i d\u1EEF li\u1EC7u...");
      try {
        yield this._ImportdataService.getAllImportdata(100, true);
        yield this.loadDataWithDateRange();
        this.loadingMessage.set("\u0110ang ki\u1EC3m tra quy\u1EC1n...");
        yield this._UserService.getProfile();
        const permissions = this._UserService.profile()?.permissions?.map((item) => item.name) || [];
        this.ListImportType.update((items) => items.map((item) => __spreadProps(__spreadValues({}, item), {
          status: permissions.includes("importdata." + item.value)
        })));
      } catch (error) {
        console.error("Error loading data:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi t\u1EA3i d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isLoading.set(false);
        this.loadingMessage.set("");
      }
    }));
  }
  // Date filtering methods
  loadDataWithDateRange() {
    return __async(this, null, function* () {
      try {
        const dateParams = {
          Batdau: this.batdau,
          Ketthuc: this.ketthuc,
          pageSize: 9999
        };
        this.loadingMessage.set("\u0110ang t\u1EA3i danh s\xE1ch s\u1EA3n ph\u1EA9m...");
        yield this._SanphamService.getSanphamBy({ pageSize: 99999 });
        this.rawListSP = this._SanphamService.ListSanpham();
        this.loadingMessage.set("\u0110ang t\u1EA3i danh s\xE1ch kh\xE1ch h\xE0ng...");
        yield this._KhachhangService.getKhachhangBy({ pageSize: 99999 });
        this.rawListKH = this._KhachhangService.ListKhachhang();
        this.loadingMessage.set("\u0110ang t\u1EA3i danh s\xE1ch nh\xE0 cung c\u1EA5p...");
        yield this._NhacungcapService.getNhacungcapBy({ pageSize: 99999 });
        this.rawListNCC = this._NhacungcapService.ListNhacungcap();
        this.loadingMessage.set("\u0110ang t\u1EA3i b\u1EA3ng gi\xE1...");
        yield this._BanggiaService.getAllBanggia();
        this.rawListBG = this._BanggiaService.ListBanggia();
        this.loadingMessage.set("\u0110ang t\u1EA3i \u0111\u01A1n h\xE0ng...");
        yield this._DonhangService.searchDonhang(dateParams);
        this.rawListDH = this._DonhangService.ListDonhang();
        this.loadingMessage.set("\u0110ang t\u1EA3i \u0111\u1EB7t h\xE0ng...");
        yield this._DathangService.searchDathang(dateParams);
        this.rawListDathang = this._DathangService.ListDathang();
        this.loadingMessage.set("\u0110ang t\u1EA3i t\u1ED3n kho...");
        yield this._KhoService.getTonKho("1", "1000").then((res) => {
          this.rawListTonkho = res.data;
        });
        this.loadingMessage.set("\u0110ang t\u1EA3i danh s\xE1ch kho...");
        yield this._KhoService.getAllKho();
        this.rawListKho = this._KhoService.ListKho();
      } catch (error) {
        console.error("Error loading data with date range:", error);
        throw error;
      }
    });
  }
  // Date change handler
  onDateChange() {
    return __async(this, null, function* () {
      if (!this.isLoading()) {
        this.isLoading.set(true);
        this.loadingMessage.set("\u0110ang c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u theo ng\xE0y...");
        try {
          yield this.loadDataWithDateRange();
        } catch (error) {
          console.error("Error updating data with new date range:", error);
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi c\u1EADp nh\u1EADt d\u1EEF li\u1EC7u", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        } finally {
          this.isLoading.set(false);
          this.loadingMessage.set("");
        }
      }
    });
  }
  // Apply date filter
  applyDateFilter() {
    return __async(this, null, function* () {
      yield this.onDateChange();
    });
  }
  // Quick date range methods
  setDateRange(range) {
    return __async(this, null, function* () {
      const today = /* @__PURE__ */ new Date();
      switch (range) {
        case "today":
          this.batdau = new Date(today);
          this.ketthuc = new Date(today);
          break;
        case "yesterday":
          const yesterday = new Date(today);
          yesterday.setDate(yesterday.getDate() - 1);
          this.batdau = new Date(yesterday);
          this.ketthuc = new Date(yesterday);
          break;
        case "last7days":
          this.ketthuc = new Date(today);
          this.batdau = new Date(today);
          this.batdau.setDate(this.batdau.getDate() - 6);
          break;
        case "last30days":
          this.ketthuc = new Date(today);
          this.batdau = new Date(today);
          this.batdau.setDate(this.batdau.getDate() - 29);
          break;
        case "thisMonth":
          this.batdau = new Date(today.getFullYear(), today.getMonth(), 1);
          this.ketthuc = new Date(today);
          break;
        case "lastMonth":
          const lastMonth = new Date(today.getFullYear(), today.getMonth() - 1, 1);
          this.batdau = new Date(lastMonth);
          this.ketthuc = new Date(today.getFullYear(), today.getMonth(), 0);
          break;
        case "thisWeek":
          const startOfWeek = new Date(today);
          startOfWeek.setDate(today.getDate() - today.getDay());
          this.batdau = new Date(startOfWeek);
          this.ketthuc = new Date(today);
          break;
      }
      yield this.applyDateFilter();
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.loadDataWithDateRange();
    });
  }
  applyFilter(event) {
  }
  toggleAll() {
    const allSelected = this.ListEdit().length === this.ListImportType().length;
    if (allSelected) {
      this.ListEdit.set([]);
      this.TitleExport = "export";
    } else {
      this.ListEdit.set(this.ListImportType());
      this.TitleExport = "export_all";
    }
  }
  toggleItem(item) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
      this.TitleExport += "_" + item.value;
      this.ListEdit.update((prev) => [...prev, item]);
    } else {
      this.TitleExport = this.TitleExport.replace("_" + item.value, "");
      this.ListEdit.update((prev) => prev.filter((i) => i.id !== item.id));
    }
  }
  CheckItem(item) {
    const index = this.ListEdit().findIndex((i) => i.id === item.id);
    if (index === -1) {
      return false;
    } else {
      return true;
    }
  }
  ExportExcel(title) {
    return __async(this, null, function* () {
      if (this.isExporting())
        return;
      this.isExporting.set(true);
      this.loadingMessage.set("\u0110ang chu\u1EA9n b\u1ECB d\u1EEF li\u1EC7u xu\u1EA5t theo kho\u1EA3ng th\u1EDDi gian...");
      try {
        const filteredData = this.getFilteredExportData();
        const ListSP = Array.isArray(filteredData.ListSP) && filteredData.ListSP.length ? filteredData.ListSP.map((item) => ({
          masp: item.masp,
          subtitle: item.subtitle,
          title: item.title,
          title2: item.title2,
          giaban: item.giaban,
          giagoc: item.giagoc,
          vat: item.vat,
          dvt: item.dvt,
          haohut: item.haohut,
          ghichu: item.ghichu
        })) : [
          {
            masp: "",
            subtitle: "",
            title: "",
            title2: "",
            giaban: "",
            giagoc: "",
            vat: "",
            dvt: "",
            haohut: "",
            ghichu: ""
          }
        ];
        const ListKH = Array.isArray(filteredData.ListKH) && filteredData.ListKH.length ? filteredData.ListKH.map((v) => ({
          name: v.name?.trim() || "",
          tenfile: v.tenfile?.trim() || "",
          makh: v.makh?.trim() || "",
          namenn: v.namenn?.trim() || "",
          mabanggia: v.banggia?.mabanggia?.trim() || "",
          diachi: v.diachi?.trim() || "",
          quan: v.quan?.trim() || "",
          email: v.email?.trim() || "",
          sdt: v.sdt?.toString().trim() || "",
          mst: v.mst?.toString().trim() || "",
          gionhanhang: v.gionhanhang?.toString().trim() || "",
          loaikh: v.loaikh?.toString().trim() || "khachsi",
          hiengia: v.hiengia || true,
          ghichu: v.ghichu?.toString().trim() || ""
        })) : [
          {
            name: "",
            tenfile: "",
            makh: "",
            namenn: "",
            diachi: "",
            quan: "",
            email: "",
            sdt: "",
            mst: "",
            gionhanhang: "",
            loaikh: "khachsi",
            hiengia: true,
            ghichu: ""
          }
        ];
        const ListNCC = Array.isArray(filteredData.ListNCC) && filteredData.ListNCC.length > 0 ? filteredData.ListNCC.map((v) => ({
          name: v.name?.trim() || "",
          tenfile: v.tenfile?.trim() || "",
          mancc: v.mancc?.trim() || "",
          diachi: v.diachi?.trim() || "",
          email: v.email?.trim() || "",
          sdt: v.sdt?.toString().trim() || "",
          ghichu: v.ghichu?.toString().trim() || ""
        })) : [
          {
            name: "",
            tenfile: "",
            mancc: "",
            diachi: "",
            email: "",
            sdt: "",
            ghichu: ""
          }
        ];
        const ListBG = Array.isArray(filteredData.ListBG) && filteredData.ListBG.length > 0 ? filteredData.ListBG.map((v) => ({
          title: v.title?.trim() || "",
          mabanggia: v.mabanggia?.trim() || "",
          type: v.type?.trim() || "",
          batdau: (0, import_moment.default)(v.batdau).format("DD/MM/YYYY") || "",
          ketthuc: (0, import_moment.default)(v.ketthuc).format("DD/MM/YYYY") || "",
          ghichu: v.ghichu?.trim() || "",
          status: v.status?.trim() || ""
        })) : [
          {
            title: "",
            mabanggia: "",
            type: "",
            batdau: "",
            ketthuc: "",
            ghichu: "",
            status: ""
          }
        ];
        const ListDH = Array.isArray(filteredData.ListDH) && filteredData.ListDH.length > 0 ? filteredData.ListDH.flatMap((record) => {
          if (!Array.isArray(record.sanpham))
            return [];
          return record.sanpham.map((sp) => ({
            ngaygiao: (0, import_moment.default)(record.ngaygiao).format("DD/MM/YYYY"),
            makh: record.khachhang?.makh,
            name: record.khachhang?.name,
            mabanggia: record.khachhang?.banggia?.[0]?.mabanggia,
            masp: sp.masp,
            tensp: sp.title,
            sldat: sp.sldat,
            slgiao: sp.slgiao,
            slnhan: sp.slnhan,
            ghichu: sp.ghichu
          }));
        }) : [
          {
            ngaygiao: (0, import_moment.default)().format("DD/MM/YYYY"),
            makh: "",
            mabanggia: "",
            masp: "",
            tensp: "",
            sldat: 0,
            slgiao: 0,
            slnhan: 0,
            ghichu: ""
          }
        ];
        const ListDathang = Array.isArray(filteredData.ListDathang) && filteredData.ListDathang.length > 0 ? filteredData.ListDathang.flatMap((record) => {
          if (!Array.isArray(record.sanpham))
            return [];
          return record.sanpham.map((sp) => ({
            ngaynhan: (0, import_moment.default)(record.ngaynhan).format("DD/MM/YYYY"),
            mancc: record.nhacungcap?.mancc,
            name: record.nhacungcap?.name,
            mabanggia: record.banggia?.[0]?.mabanggia,
            masp: sp.masp,
            tensp: sp.title,
            sldat: Number(sp.sldat) || 0,
            slgiao: Number(sp.slgiao) || 0,
            slnhan: Number(sp.slnhan) || 0,
            ghichu: sp.ghichu,
            makho: record?.kho?.makho || ""
          }));
        }) : [
          {
            ngaynhan: (0, import_moment.default)().format("DD/MM/YYYY"),
            mancc: "",
            name: "",
            mabanggia: "",
            masp: "",
            tensp: "",
            sldat: 0,
            slgiao: 0,
            slnhan: 0,
            ghichu: "",
            makho: ""
          }
        ];
        const ListBGSP = this.convertBGSPToExport(filteredData.ListBG, filteredData.ListSP);
        const ListBGKH = filteredData.ListKH.map((v) => {
          const result = {
            makh: v.makh || "",
            name: v.name || "",
            mabanggia: v.banggia?.mabanggia || ""
          };
          return result;
        });
        const dynamicKeys = filteredData.ListSP.reduce((acc, v) => {
          if (v && v.masp) {
            acc[v.masp] = "";
          }
          return acc;
        }, {});
        const ListNCCSP = filteredData.ListNCC.map((supplier) => {
          const result = {
            mancc: supplier.mancc || "",
            name: supplier.name || ""
          };
          let i = 1;
          for (const masp of Object.keys(dynamicKeys)) {
            const productExists = supplier.Sanpham?.some((sp) => sp.masp === masp);
            if (productExists) {
              result[i] = masp;
              i++;
            }
          }
          return result;
        });
        const ListTonkho = filteredData.ListTonkho.map((v) => ({
          masp: v.masp,
          title: v.title,
          dvt: v.dvt,
          slton: v.slton
        }));
        const ListKho = Array.isArray(filteredData.ListKho) && filteredData.ListKho.length ? filteredData.ListKho.map((item) => ({
          makho: item.makho || "",
          tenkho: item.tenkho || "",
          diachi: item.diachi || "",
          ghichu: item.ghichu || "",
          status: item.status || "active"
        })) : [
          {
            makho: "",
            tenkho: "",
            diachi: "",
            ghichu: "",
            status: "active"
          }
        ];
        const Exportdata = {};
        if (this.ListEdit().some((item) => item.value === "sanpham")) {
          Exportdata["sanpham"] = { data: ListSP };
        }
        if (this.ListEdit().some((item) => item.value === "khachhang")) {
          Exportdata["khachhang"] = { data: ListKH };
        }
        if (this.ListEdit().some((item) => item.value === "nhacungcap")) {
          Exportdata["nhacungcap"] = { data: ListNCC };
        }
        if (this.ListEdit().some((item) => item.value === "banggia")) {
          Exportdata["banggia"] = { data: ListBG };
        }
        if (this.ListEdit().some((item) => item.value === "donhang")) {
          Exportdata["donhang"] = { data: ListDH };
        }
        if (this.ListEdit().some((item) => item.value === "dathang")) {
          Exportdata["dathang"] = { data: ListDathang };
        }
        if (this.ListEdit().some((item) => item.value === "banggiasanpham")) {
          Exportdata["banggiasanpham"] = { data: ListBGSP };
        }
        if (this.ListEdit().some((item) => item.value === "banggiakhachhang")) {
          Exportdata["banggiakhachhang"] = { data: ListBGKH };
        }
        if (this.ListEdit().some((item) => item.value === "nhacungcapsanpham")) {
          Exportdata["nhacungcapsanpham"] = { data: ListNCCSP };
        }
        if (this.ListEdit().some((item) => item.value === "xuatnhapton")) {
          Exportdata["xuatnhapton"] = { data: ListTonkho };
        }
        if (this.ListEdit().some((item) => item.value === "kho")) {
          Exportdata["kho"] = { data: ListKho };
        }
        if (Object.keys(Exportdata).length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        this.loadingMessage.set("\u0110ang t\u1EA1o file Excel...");
        const dateRangeStr = `${this.batdau.toLocaleDateString("vi-VN").replace(/\//g, "-")}_${this.ketthuc.toLocaleDateString("vi-VN").replace(/\//g, "-")}`;
        const exportFileName = `${title}_${dateRangeStr}`;
        writeExcelFileSheets(Exportdata, exportFileName);
        this._snackBar.open("Xu\u1EA5t d\u1EEF li\u1EC7u th\xE0nh c\xF4ng!", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Error exporting Excel:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi xu\u1EA5t d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isExporting.set(false);
        this.loadingMessage.set("");
      }
    });
  }
  convertBGSPToExport(listbanggia, listsp) {
    const pricingTables = new Set(listbanggia.map((item) => item.mabanggia));
    return listsp.map((product) => __spreadValues({
      masp: product.masp,
      title: product.title,
      giaban: product.giaban.toString()
    }, Array.from(pricingTables).reduce((acc, table) => {
      acc[table] = product.giaban.toString();
      return acc;
    }, {})));
  }
  convertBGSPToImport(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const boardKeys = Object.keys(data[0]).filter((key) => !["masp", "title", "giagoc"].includes(key));
    const data1 = boardKeys.map((boardKey) => ({
      mabanggia: boardKey,
      title: `B\u1EA3ng gi\xE1 ${boardKey.replace("BG", "")}`,
      sanpham: data.map((sp) => ({
        masp: sp.masp?.toString().trim() || "",
        title: sp.title?.toString().trim() || "",
        giagoc: sp.giagoc || 0,
        giaban: sp[boardKey] || 0
      }))
    }));
    return data1;
  }
  // convertBGKHToImport(data: any){
  //   if (!data || data.length === 0) {
  //     return [];
  //   }
  //   // Extract keys representing price boards (excluding makh, name)
  //   const boardKeys = Object.keys(data[0]).filter(
  //     (key) => !['makh', 'name'].includes(key)
  //   );
  //   data.forEach((v:any) => {
  //     v.banggia = [];
  //     for (const key of boardKeys) {
  //       if (v[key] !== undefined && v[key] !== null && v[key] !== '') {
  //         v.banggia.push(v[key]);
  //       }
  //       delete v[key];
  //     }
  //   });
  //   return data;
  // }
  convertNCCSPToImport(data) {
    if (!data || data.length === 0) {
      return [];
    }
    const boardKeys = Object.keys(data[0]).filter((key) => !["mancc", "name"].includes(key));
    data.forEach((v) => {
      v.Sanpham = [];
      for (const key of boardKeys) {
        if (v[key] !== void 0 && v[key] !== null && v[key] !== "") {
          v.Sanpham.push(v[key]);
        }
        delete v[key];
      }
    });
    return data;
  }
  ImportExcel(event) {
    return __async(this, null, function* () {
      if (this.isImporting())
        return;
      this.isImporting.set(true);
      this.loadingMessage.set("\u0110ang \u0111\u1ECDc file Excel...");
      try {
        const data = yield readExcelFileNoWorker(event);
        this.loadingMessage.set("\u0110ang x\u1EED l\xFD d\u1EEF li\u1EC7u...");
        yield this.DoImportData(data);
      } catch (error) {
        console.error("Error importing Excel:", error);
        this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi \u0111\u1ECDc file Excel", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.isImporting.set(false);
        this.loadingMessage.set("");
      }
    });
  }
  // Method để hiển thị dialog xác nhận import
  showImportConfirmDialog(dataType, existingCount, newCount, duplicateItems) {
    return __async(this, null, function* () {
      return new Promise((resolve) => {
        const dialogData = {
          dataType,
          existingCount,
          newCount,
          duplicateItems,
          isOverwrite: false
        };
        const dialogRef = this._dialog.open(ImportConfirmationDialogComponent, {
          width: "500px",
          data: dialogData,
          disableClose: true
        });
        dialogRef.afterClosed().subscribe((result) => {
          resolve(result || { confirmed: false, overwrite: false });
        });
      });
    });
  }
  DoImportData(data) {
    return __async(this, null, function* () {
      if (Object.keys(this.ListEdit()).length === 0) {
        this._snackBar.open("Ch\u01B0a Ch\u1ECDn Lo\u1EA1i D\u1EEF Li\u1EC7u", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      if (Object.keys(data).length === 0) {
        this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 nh\u1EADp", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        return;
      }
      if (data.sanpham && data.sanpham.length > 0 && this.ListEdit().some((item) => item.value === "sanpham")) {
        const transformedData = ImportDataValidationService.transformDataForImport(data.sanpham, "sanpham");
        const validData = ImportDataValidationService.filterValidData(transformedData, ImportDataValidationService.getRequiredFields("sanpham"));
        const duplicates = ImportDataValidationService.checkDuplicates(validData, this.rawListSP, ImportDataValidationService.getUniqueField("sanpham"));
        const result = yield this.showImportConfirmDialog("S\u1EA3n Ph\u1EA9m", this.rawListSP.length, validData.length, duplicates);
        if (!result.confirmed)
          return;
        const finalData = ImportDataValidationService.prepareSanphamData(validData, this.rawListSP, result.overwrite);
        if (finalData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u m\u1EDBi \u0111\u1EC3 import", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const importSnackbar = this._snackBar.open(`\u0110ang import ${finalData.length} s\u1EA3n ph\u1EA9m...`, "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        try {
          yield this._SanphamService.ImportSanpham(finalData);
          importSnackbar.dismiss();
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${finalData.length} s\u1EA3n ph\u1EA9m${result.overwrite ? " (ghi \u0111\xE8)" : " (th\xEAm m\u1EDBi)"}!`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          importSnackbar.dismiss();
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi import s\u1EA3n ph\u1EA9m", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      if (data.khachhang && data.khachhang.length > 0 && this.ListEdit().some((item) => item.value === "khachhang")) {
        const transformedData = ImportDataValidationService.transformDataForImport(data.khachhang, "khachhang");
        const validData = ImportDataValidationService.filterValidData(transformedData, ImportDataValidationService.getRequiredFields("khachhang"));
        const duplicates = ImportDataValidationService.checkDuplicates(validData, this.rawListKH, ImportDataValidationService.getUniqueField("khachhang"));
        const result = yield this.showImportConfirmDialog("Kh\xE1ch H\xE0ng", this.rawListKH.length, validData.length, duplicates);
        if (!result.confirmed)
          return;
        const finalData = ImportDataValidationService.prepareKhachhangData(validData, this.rawListKH, result.overwrite);
        if (finalData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u m\u1EDBi \u0111\u1EC3 import", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const importSnackbar = this._snackBar.open(`\u0110ang import ${finalData.length} kh\xE1ch h\xE0ng...`, "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        try {
          yield this._KhachhangService.ImportKhachhang(finalData);
          importSnackbar.dismiss();
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${finalData.length} kh\xE1ch h\xE0ng${result.overwrite ? " (ghi \u0111\xE8)" : " (th\xEAm m\u1EDBi)"}!`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          importSnackbar.dismiss();
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi import kh\xE1ch h\xE0ng", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      if (data.nhacungcap && data.nhacungcap.length > 0 && this.ListEdit().some((item) => item.value === "nhacungcap")) {
        const ListNCC = (data.nhacungcap || []).map((v) => ({
          name: v.name,
          tenfile: removeVietnameseAccents(v.tenfile.toString() || v.name || ""),
          mancc: v.mancc,
          diachi: v.diachi,
          email: v.email,
          sdt: v.sdt.toString(),
          ghichu: v.ghichu
        })).filter((v) => v.mancc !== void 0 && v.mancc !== null && v.mancc !== "");
        const duplicates = ImportDataValidationService.checkDuplicates(ListNCC, this.rawListNCC, "mancc");
        const result = yield this.showImportConfirmDialog("Nh\xE0 Cung C\u1EA5p", this.rawListNCC.length, ListNCC.length, duplicates);
        if (!result.confirmed)
          return;
        const finalData = ImportDataValidationService.prepareNhacungcapData(ListNCC, this.rawListNCC, result.overwrite);
        if (finalData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u m\u1EDBi \u0111\u1EC3 import", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const importSnackbar = this._snackBar.open(`\u0110ang import ${finalData.length} nh\xE0 cung c\u1EA5p...`, "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        try {
          yield this._NhacungcapService.ImportNhacungcap(finalData);
          importSnackbar.dismiss();
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${finalData.length} nh\xE0 cung c\u1EA5p${result.overwrite ? " (ghi \u0111\xE8)" : " (th\xEAm m\u1EDBi)"}!`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          importSnackbar.dismiss();
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi import nh\xE0 cung c\u1EA5p", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      if (data.banggia && data.banggia.length > 0 && this.ListEdit().some((item) => item.value === "banggia")) {
        const ListBG = (data.banggia || []).map((v) => ({
          title: "B\u1EA3ng Gi\xE1 " + v.mabanggia,
          mabanggia: v.mabanggia,
          type: v.type,
          batdau: (0, import_moment.default)(v.batdau, "DD/MM/YYYY").toDate(),
          ketthuc: (0, import_moment.default)(v.ketthuc, "DD/MM/YYYY").toDate(),
          ghichu: v.ghichu,
          status: v.status
        })).filter((v) => v.mabanggia !== void 0 && v.mabanggia !== null && v.mabanggia !== "");
        const duplicates = ImportDataValidationService.checkDuplicates(ListBG, this.rawListBG, "mabanggia");
        const result = yield this.showImportConfirmDialog("B\u1EA3ng Gi\xE1", this.rawListBG.length, ListBG.length, duplicates);
        if (!result.confirmed)
          return;
        const finalData = ImportDataValidationService.prepareBanggiaData(ListBG, this.rawListBG, result.overwrite);
        if (finalData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u m\u1EDBi \u0111\u1EC3 import", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const importSnackbar = this._snackBar.open(`\u0110ang import ${finalData.length} b\u1EA3ng gi\xE1...`, "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        try {
          yield this._BanggiaService.ImportBanggia(finalData);
          importSnackbar.dismiss();
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${finalData.length} b\u1EA3ng gi\xE1${result.overwrite ? " (ghi \u0111\xE8)" : " (th\xEAm m\u1EDBi)"}!`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          importSnackbar.dismiss();
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi import b\u1EA3ng gi\xE1", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      if (data.kho && data.kho.length > 0 && this.ListEdit().some((item) => item.value === "kho")) {
        const ListKho = (data.kho || []).map((v) => ({
          makho: v.makho?.toString().trim() || "",
          tenkho: v.tenkho?.toString().trim() || "",
          diachi: v.diachi?.toString().trim() || "",
          ghichu: v.ghichu?.toString().trim() || "",
          status: v.status?.toString().trim() || "active"
        })).filter((v) => v.makho !== void 0 && v.makho !== null && v.makho !== "");
        const duplicates = ImportDataValidationService.checkDuplicates(ListKho, this.rawListKho, "makho");
        const result = yield this.showImportConfirmDialog("Kho", this.rawListKho.length, ListKho.length, duplicates);
        if (!result.confirmed)
          return;
        const finalData = ImportDataValidationService.prepareKhoData(ListKho, this.rawListKho, result.overwrite);
        if (finalData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u m\u1EDBi \u0111\u1EC3 import", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const importSnackbar = this._snackBar.open(`\u0110ang import ${finalData.length} kho...`, "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        try {
          const createUpdatePromises = finalData.map((v) => __async(this, null, function* () {
            const existingItem = this.rawListKho.find((v1) => v1.makho === v.makho);
            if (existingItem) {
              const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
              yield this._KhoService.updateKho(updatedItem);
            } else {
              yield this._KhoService.CreateKho(v);
            }
          }));
          yield Promise.all(createUpdatePromises);
          yield this._KhoService.getAllKho();
          this.rawListKho = this._KhoService.ListKho();
          importSnackbar.dismiss();
          this._snackBar.open(`Import th\xE0nh c\xF4ng ${finalData.length} kho${duplicates.length > 0 ? ` (${duplicates.length} tr\xF9ng l\u1EB7p)` : ""}!`, "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        } catch (error) {
          importSnackbar.dismiss();
          this._snackBar.open("C\xF3 l\u1ED7i x\u1EA3y ra khi import kho", "", {
            duration: 2e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
      if (data.donhang && data.donhang.length > 0 && this.ListEdit().some((item) => item.value === "donhang")) {
        const ListDH = (data.donhang || []).map((v) => ({
          ngay: v.ngay,
          makh: v.makh,
          mabangia: v.mabangia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.slgiao),
          slnhan: Number(v.slnhan),
          ghichu: v.ghichu
        })).filter((v) => v.makh !== void 0 && v.makh !== null && v.makh !== "" && v.masp !== void 0 && v.masp !== null && v.masp !== "");
        const importSnackbar = this._snackBar.open("\u0110ang import \u0110\u01A1n h\xE0ng...", "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        yield this._DonhangService.ImportDonhang(ListDH);
        importSnackbar.dismiss();
        this._snackBar.open("Import \u0110\u01A1n h\xE0ng th\xE0nh c\xF4ng!", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (data.banggiasanpham && data.banggiasanpham.length > 0 && this.ListEdit().some((item) => item.value === "banggiasanpham")) {
        const listBGSP = this.convertBGSPToImport(data.banggiasanpham);
        const giabanList = listBGSP.find((item) => item.mabanggia === "giaban");
        if (!giabanList) {
          return;
        }
        const fixedListBGSP = listBGSP.map((banggia) => {
          if (banggia.mabanggia === "giaban") {
            return banggia;
          }
          const fixedSanpham = banggia.sanpham.map((sp) => {
            if (sp.giaban === "0") {
              const match = giabanList.sanpham.find((giabanSp) => giabanSp.masp === sp.masp);
              return __spreadProps(__spreadValues({}, sp), {
                giaban: match ? match.giaban : sp.giaban
              });
            }
            return sp;
          });
          return __spreadProps(__spreadValues({}, banggia), { sanpham: fixedSanpham });
        });
        yield this._BanggiaService.importSPBG(fixedListBGSP);
      }
      if (data.banggiakhachhang && data.banggiakhachhang.length > 0 && this.ListEdit().some((item) => item.value === "banggiakhachhang")) {
        console.log("Importing banggiakhachhang data:", data.banggiakhachhang);
        const ListBGKH = (data.banggiakhachhang || []).map((v) => ({
          makh: v.makh,
          name: v.name,
          mabanggia: v.mabanggia
        })).filter((v) => v.mabanggia !== void 0 && v.mabanggia !== null && v.mabanggia !== "");
        console.log("Importing ListBGKH data:", ListBGKH);
        yield this._KhachhangService.ImportKhachhang(ListBGKH);
        this._snackBar.open("C\u1EADp Nh\u1EADt Th\xE0nh C\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (data.nhacungcapsanpham && data.nhacungcapsanpham.length > 0 && this.ListEdit().some((item) => item.value === "nhacungcapsanpham")) {
        const convertedSuppliers = this.convertNCCSPToImport(data.nhacungcapsanpham);
        console.log(convertedSuppliers);
        const ListNCCSP = convertedSuppliers.filter((supplier) => supplier?.Sanpham?.length > 0).map((supplier) => __spreadProps(__spreadValues({}, supplier), {
          Sanpham: supplier?.Sanpham?.map((spId) => this.rawListSP.find((product) => product?.masp === spId))
        }));
        const importSnackbar = this._snackBar.open("\u0110ang import Nh\xE0 cung c\u1EA5p s\u1EA3n ph\u1EA9m...", "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        yield this._NhacungcapService.ImportNhacungcap(ListNCCSP);
        importSnackbar.dismiss();
        this._snackBar.open("Import Nh\xE0 cung c\u1EA5p s\u1EA3n ph\u1EA9m th\xE0nh c\xF4ng!", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (data.xuatnhapton && data.xuatnhapton.length > 0 && this.ListEdit().some((item) => item.value === "xuatnhapton")) {
        const phieuNhapDetails = [];
        const phieuXuatDetails = [];
        data.xuatnhapton.forEach((v) => {
          const exitItem = this.rawListTonkho.find((item) => item.masp === v.masp);
          if (exitItem) {
            if (v.slton > exitItem.slton) {
              phieuNhapDetails.push({
                sanphamId: this.rawListSP.find((item) => item.masp === v.masp).id,
                soluong: v.slton - exitItem.slton
                // thêm các trường cần thiết
              });
            } else if (v.slton < exitItem.slton) {
              phieuXuatDetails.push({
                sanphamId: this.rawListSP.find((item) => item.masp === v.masp).id,
                soluong: exitItem.slton - v.slton
                // thêm các trường cần thiết
              });
            }
          }
        });
        if (phieuNhapDetails.length > 0) {
          yield this._PhieukhoService.CreatePhieukho({
            title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${(0, import_moment.default)().format("DD/MM/YYYY ")}`,
            type: "nhap",
            sanpham: phieuNhapDetails,
            ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${(0, import_moment.default)().format("HH:mm:ss DD/MM/YYYY ")}`,
            ngay: (0, import_moment.default)()
          });
          this._snackBar.open("C\u1EADp nh\u1EADt t\u1ED3n kho th\xE0nh c\xF4ng Th\xEAm phi\u1EBFu Nh\u1EADp Kho", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
        if (phieuXuatDetails.length > 0) {
          yield this._PhieukhoService.CreatePhieukho({
            title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${(0, import_moment.default)().format("DD/MM/YYYY ")}`,
            type: "xuat",
            sanpham: phieuXuatDetails,
            ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${(0, import_moment.default)().format("HH:mm:ss DD/MM/YYYY ")}`,
            ngay: (0, import_moment.default)()
          });
          this._snackBar.open("C\u1EADp nh\u1EADt t\u1ED3n kho th\xE0nh c\xF4ng Th\xEAm phi\u1EBFu Xu\u1EA5t Kho", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
        if (phieuNhapDetails.length === 0 && phieuXuatDetails.length === 0) {
          this._snackBar.open("Kho kh\xF4ng thay \u0111\u1ED5i", "", {
            duration: 1e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
        }
      }
      if (data.dathang && this.ListEdit().some((item) => item.value === "dathang")) {
        const ListDH = (data.dathang || []).filter((v) => v.mancc && v.masp).map((v) => ({
          ngaynhan: (0, import_moment.default)(excelSerialDateToJSDate(v.ngaynhan)).toDate(),
          mancc: v.mancc,
          mabanggia: v.mabanggia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.sldat),
          slnhan: Number(v.sldat),
          ghichu: v.ghichu
        }));
        const importSnackbar = this._snackBar.open("\u0110ang import \u0110\u1EB7t h\xE0ng...", "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        yield this._DathangService.ImportDathang(ListDH);
        importSnackbar.dismiss();
        this._snackBar.open("Import \u0110\u1EB7t h\xE0ng th\xE0nh c\xF4ng!", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (data.donhang && this.ListEdit().some((item) => item.value === "donhang")) {
        const ListDH = (data.donhang || []).filter((v) => v.makh && v.masp).map((v) => ({
          ngaygiao: (0, import_moment.default)(excelSerialDateToJSDate(v.ngaygiao)).toDate(),
          makh: v.makh,
          mabanggia: v.mabangia,
          masp: v.masp,
          sldat: Number(v.sldat),
          slgiao: Number(v.slgiao),
          slnhan: Number(v.slnhan),
          ghichu: v.ghichu
        }));
        const importSnackbar = this._snackBar.open("\u0110ang import \u0110\u01A1n h\xE0ng...", "", {
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-warning"]
        });
        yield this._DonhangService.ImportDonhang(ListDH);
        importSnackbar.dismiss();
        this._snackBar.open("Import \u0110\u01A1n h\xE0ng th\xE0nh c\xF4ng!", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
    });
  }
  // TrackBy function for performance optimization
  trackByFn(index, item) {
    return item.id || index;
  }
  // Filter data based on selected date range
  filterDataByDateRange(data, dateField = "createdAt") {
    if (!data || !Array.isArray(data))
      return [];
    const startDate = new Date(this.batdau);
    startDate.setHours(0, 0, 0, 0);
    const endDate = new Date(this.ketthuc);
    endDate.setHours(23, 59, 59, 999);
    return data.filter((item) => {
      if (!item[dateField])
        return true;
      let itemDate;
      if (typeof item[dateField] === "string") {
        itemDate = new Date(item[dateField]);
      } else if (item[dateField] instanceof Date) {
        itemDate = item[dateField];
      } else {
        return true;
      }
      return itemDate >= startDate && itemDate <= endDate;
    });
  }
  // Get filtered export data with date range applied
  getFilteredExportData() {
    const dateInfo = {
      batdau: this.batdau,
      ketthuc: this.ketthuc,
      dateRange: `${this.batdau.toLocaleDateString("vi-VN")} - ${this.ketthuc.toLocaleDateString("vi-VN")}`
    };
    return {
      ListSP: this.rawListSP,
      ListKH: this.rawListKH,
      ListNCC: this.rawListNCC,
      ListBG: this.rawListBG,
      ListDH: this.filterDataByDateRange(this.rawListDH, "ngaygiao"),
      ListDathang: this.filterDataByDateRange(this.rawListDathang, "ngaynhan"),
      ListTonkho: this.filterDataByDateRange(this.rawListTonkho, "createdAt"),
      ListKho: this.filterDataByDateRange(this.rawListKho, "createdAt"),
      dateInfo
    };
  }
  static \u0275fac = function ListImportdataComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListImportdataComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListImportdataComponent, selectors: [["app-listimportdata"]], viewQuery: function ListImportdataComponent_Query(rf, ctx) {
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
  }, decls: 73, vars: 42, consts: [["dateRangePicker", ""], ["uploadfile", ""], ["dataContent", ""], ["noData", ""], [1, "grid", "grid-cols-1", "lg:grid-cols-2", "gap-4"], ["class", "fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50", 4, "ngIf"], [1, "col-span-full", "mb-6", "p-6", "bg-white", "rounded-lg", "shadow-sm", "border"], [1, "flex", "flex-col", "items-center", "gap-4"], [1, "flex", "flex-col", "lg:flex-row", "lg:items-center", "gap-4"], [1, "flex", "flex-col", "lg:flex-row", "items-center", "gap-2"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full", "lg:w-auto"], [3, "rangePicker"], ["matStartDate", "", "placeholder", "T\u1EEB ng\xE0y", 3, "ngModelChange", "dateChange", "ngModel", "ngModelOptions", "disabled"], ["matEndDate", "", "placeholder", "\u0110\u1EBFn ng\xE0y", 3, "ngModelChange", "dateChange", "ngModel", "ngModelOptions", "disabled"], ["matIconSuffix", "", 3, "for"], ["mat-button", "", "matDatepickerCancel", ""], ["mat-raised-button", "", "color", "primary", "matDatepickerApply", "", 3, "click"], ["mat-raised-button", "", "color", "primary", 1, "h-14", 3, "click", "disabled"], [1, "mr-2"], [1, "flex", "flex-wrap", "gap-2"], [1, "text-sm", "text-gray-600", "mr-2", "self-center"], ["mat-button", "", 1, "text-sm", 3, "click", "disabled"], [1, "mt-4", "p-3", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], [1, "flex", "items-center", "space-x-2"], [1, "text-blue-600"], [1, "text-blue-700", "font-medium"], [1, "flex", "flex-col", "space-y-2", "p-8"], [1, "flex", "flex-row", "space-x-2", "items-center"], ["mat-flat-button", "", "color", "primary", 3, "click", "disabled"], [4, "ngIf"], ["class", "flex items-center", 4, "ngIf"], ["class", "ml-1", 4, "ngIf"], ["type", "file", "accept", ".xlsx,.xls", 1, "hidden", 3, "change", "disabled"], ["class", "w-full p-4 bg-blue-50 rounded-lg border border-blue-200", 4, "ngIf"], [1, "grid", "grid-cols-3", "gap-4"], [3, "class", "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "w-full", "flex", "flex-col", "space-y-2", "p-8"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", "disabled:bg-gray-100", "disabled:cursor-not-allowed", 3, "keyup", "disabled"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [4, "ngIf", "ngIfElse"], [1, "fixed", "inset-0", "bg-black", "bg-opacity-50", "flex", "items-center", "justify-center", "z-50"], [1, "bg-white", "p-6", "rounded-lg", "shadow-lg", "flex", "flex-col", "items-center", "space-y-4"], ["diameter", "50", "mode", "indeterminate"], [1, "text-lg", "font-medium"], [1, "flex", "items-center"], ["diameter", "20", "mode", "indeterminate", 1, "mr-2"], [1, "ml-1"], [1, "w-full", "p-4", "bg-blue-50", "rounded-lg", "border", "border-blue-200"], ["diameter", "20", "mode", "indeterminate"], [1, "text-blue-700"], [3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2"], ["class", "w-full flex flex-row space-x-2 items-center border p-4 rounded-lg bg-gray-100 animate-pulse", 4, "ngFor", "ngForOf"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "border", "p-4", "rounded-lg", "bg-gray-100", "animate-pulse"], [1, "rounded-lg", "p-2", "bg-gray-300", "w-16", "h-8"], [1, "bg-gray-300", "h-4", "w-1/3", "rounded"], [1, "bg-gray-300", "h-3", "w-1/2", "rounded"], [3, "class", 4, "ngFor", "ngForOf"], [1, "rounded-lg", "p-2", "bg-blue-100"], [1, "text-sm", "text-gray-600"], [1, "w-full", "flex", "flex-row", "items-center", "justify-center", "border", "p-4", "rounded-lg", "bg-gray-100"], [1, "text-gray-600"]], template: function ListImportdataComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "div", 4);
      \u0275\u0275template(1, ListImportdataComponent_div_1_Template, 5, 1, "div", 5);
      \u0275\u0275elementStart(2, "div", 6)(3, "div", 7)(4, "div", 8)(5, "div", 9)(6, "mat-form-field", 10)(7, "mat-label");
      \u0275\u0275text(8, "Ch\u1ECDn kho\u1EA3ng th\u1EDDi gian");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(9, "mat-date-range-input", 11)(10, "input", 12);
      \u0275\u0275twoWayListener("ngModelChange", function ListImportdataComponent_Template_input_ngModelChange_10_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.batdau, $event) || (ctx.batdau = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("dateChange", function ListImportdataComponent_Template_input_dateChange_10_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(11, "input", 13);
      \u0275\u0275twoWayListener("ngModelChange", function ListImportdataComponent_Template_input_ngModelChange_11_listener($event) {
        \u0275\u0275restoreView(_r1);
        \u0275\u0275twoWayBindingSet(ctx.ketthuc, $event) || (ctx.ketthuc = $event);
        return \u0275\u0275resetView($event);
      });
      \u0275\u0275listener("dateChange", function ListImportdataComponent_Template_input_dateChange_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onDateChange());
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275element(12, "mat-datepicker-toggle", 14);
      \u0275\u0275elementStart(13, "mat-date-range-picker", null, 0)(15, "mat-datepicker-actions")(16, "button", 15);
      \u0275\u0275text(17, "H\u1EE7y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(18, "button", 16);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_18_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyDateFilter());
      });
      \u0275\u0275text(19, "\xC1p d\u1EE5ng");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(20, "button", 17);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_20_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyDateFilter());
      });
      \u0275\u0275elementStart(21, "mat-icon", 18);
      \u0275\u0275text(22, "refresh");
      \u0275\u0275elementEnd();
      \u0275\u0275text(23, " L\xE0m m\u1EDBi ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(24, "div", 19)(25, "span", 20);
      \u0275\u0275text(26, "Ch\u1ECDn nhanh:");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(27, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_27_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("today"));
      });
      \u0275\u0275text(28, " H\xF4m nay ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(29, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_29_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("yesterday"));
      });
      \u0275\u0275text(30, " H\xF4m qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(31, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_31_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("last7days"));
      });
      \u0275\u0275text(32, " 7 ng\xE0y qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(33, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("last30days"));
      });
      \u0275\u0275text(34, " 30 ng\xE0y qua ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(35, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_35_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("thisMonth"));
      });
      \u0275\u0275text(36, " Th\xE1ng n\xE0y ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(37, "button", 21);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_37_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.setDateRange("lastMonth"));
      });
      \u0275\u0275text(38, " Th\xE1ng tr\u01B0\u1EDBc ");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(39, "div", 22)(40, "div", 23)(41, "mat-icon", 24);
      \u0275\u0275text(42, "date_range");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(43, "span", 25);
      \u0275\u0275text(44);
      \u0275\u0275pipe(45, "date");
      \u0275\u0275pipe(46, "date");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(47, "div", 26)(48, "div", 27)(49, "button", 28);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_49_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ExportExcel(ctx.TitleExport));
      });
      \u0275\u0275template(50, ListImportdataComponent_span_50_Template, 2, 0, "span", 29)(51, ListImportdataComponent_span_51_Template, 3, 0, "span", 30)(52, ListImportdataComponent_mat_icon_52_Template, 2, 0, "mat-icon", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(53, "button", 28);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_53_listener() {
        \u0275\u0275restoreView(_r1);
        const uploadfile_r3 = \u0275\u0275reference(60);
        return \u0275\u0275resetView(uploadfile_r3.click());
      });
      \u0275\u0275template(54, ListImportdataComponent_span_54_Template, 2, 0, "span", 29)(55, ListImportdataComponent_span_55_Template, 3, 0, "span", 30)(56, ListImportdataComponent_mat_icon_56_Template, 2, 0, "mat-icon", 31);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(57, "button", 28);
      \u0275\u0275listener("click", function ListImportdataComponent_Template_button_click_57_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.toggleAll());
      });
      \u0275\u0275text(58, " Ch\u1ECDn T\u1EA5t C\u1EA3 ");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(59, "input", 32, 1);
      \u0275\u0275listener("change", function ListImportdataComponent_Template_input_change_59_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.ImportExcel($event));
      });
      \u0275\u0275elementEnd()();
      \u0275\u0275template(61, ListImportdataComponent_div_61_Template, 5, 1, "div", 33);
      \u0275\u0275elementStart(62, "div", 34);
      \u0275\u0275template(63, ListImportdataComponent_span_63_Template, 4, 7, "span", 35);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(64, "div", 36)(65, "div", 37)(66, "input", 38);
      \u0275\u0275listener("keyup", function ListImportdataComponent_Template_input_keyup_66_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(67, "div", 39)(68, "span", 40);
      \u0275\u0275text(69, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275template(70, ListImportdataComponent_ng_container_70_Template, 3, 2, "ng-container", 41)(71, ListImportdataComponent_ng_template_71_Template, 3, 2, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
      \u0275\u0275elementEnd()();
    }
    if (rf & 2) {
      const dateRangePicker_r8 = \u0275\u0275reference(14);
      const dataContent_r9 = \u0275\u0275reference(72);
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(8);
      \u0275\u0275property("rangePicker", dateRangePicker_r8);
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.batdau);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(40, _c1))("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275twoWayProperty("ngModel", ctx.ketthuc);
      \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(41, _c1))("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("for", dateRangePicker_r8);
      \u0275\u0275advance(8);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(7);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate2(" \u0110ang hi\u1EC3n th\u1ECB d\u1EEF li\u1EC7u t\u1EEB ", \u0275\u0275pipeBind2(45, 34, ctx.batdau, "dd/MM/yyyy"), " \u0111\u1EBFn ", \u0275\u0275pipeBind2(46, 37, ctx.ketthuc, "dd/MM/yyyy"), " ");
      \u0275\u0275advance(5);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isImporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", ctx.isImporting());
      \u0275\u0275advance();
      \u0275\u0275property("ngIf", !ctx.isImporting());
      \u0275\u0275advance();
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngIf", ctx.isLoading());
      \u0275\u0275advance(2);
      \u0275\u0275property("ngForOf", ctx.ListImportType())("ngForTrackBy", ctx.trackByFn);
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", ctx.isLoading() || ctx.isImporting() || ctx.isExporting());
      \u0275\u0275advance(4);
      \u0275\u0275property("ngIf", ctx.isLoading())("ngIfElse", dataContent_r9);
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
    MatLabel,
    MatSuffix,
    MatInputModule,
    MatTableModule,
    MatSortModule,
    MatPaginatorModule,
    MatMenuModule,
    MatSidenavModule,
    MatIconModule,
    MatIcon,
    MatButtonModule,
    MatButton,
    MatSelectModule,
    CommonModule,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatDialogModule,
    MatProgressSpinnerModule,
    MatProgressSpinner,
    MatDatepickerModule,
    MatDatepickerToggle,
    MatDateRangeInput,
    MatStartDate,
    MatEndDate,
    MatDateRangePicker,
    MatDatepickerActions,
    MatDatepickerCancel,
    MatDatepickerApply,
    MatNativeDateModule
  ], encapsulation: 2, changeDetection: 0 });
};
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListImportdataComponent, { className: "ListImportdataComponent", filePath: "src/app/admin/importdata/listimportdata/listimportdata.component.ts", lineNumber: 102 });
})();

export {
  ImportdataService,
  ListImportdataComponent
};
//# sourceMappingURL=chunk-44ZSP2WN.mjs.map
