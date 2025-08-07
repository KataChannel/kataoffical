import {
  DateHelpers
} from "./chunk-IGEDQWPE.js";
import {
  TrangThaiDon
} from "./chunk-75A5UKLJ.js";
import {
  PhieukhoService
} from "./chunk-JHPERFEP.js";
import {
  KhoService
} from "./chunk-P65SF2KI.js";
import {
  DathangService
} from "./chunk-542P3TXC.js";
import {
  SharedSocketService
} from "./chunk-KRR6EHK2.js";
import {
  SanphamService
} from "./chunk-H3SQLGMC.js";
import {
  Debounce,
  memoize
} from "./chunk-FTMLWTPE.js";
import {
  MatDialog,
  MatDialogActions,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule,
  MatDialogTitle
} from "./chunk-YS6BOFHA.js";
import {
  DonhangService
} from "./chunk-VONEIXGX.js";
import {
  MatDatepicker,
  MatDatepickerInput,
  MatDatepickerModule,
  MatDatepickerToggle
} from "./chunk-S32RIQSG.js";
import {
  readExcelFileNoWorker,
  writeExcelMultiple
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
  removeVietnameseAccents
} from "./chunk-MKCJCKWI.js";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-KRIHICU6.js";
import {
  MatSelectModule
} from "./chunk-VZZGNK7J.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
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
  MatSuffix,
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
  DatePipe,
  DecimalPipe,
  NgClass,
  NgForOf,
  NgIf
} from "./chunk-E6DSVUBK.js";
import {
  EventEmitter,
  inject,
  signal,
  ɵsetClassDebugInfo,
  ɵɵadvance,
  ɵɵattribute,
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
  ɵɵpropertyInterpolate1,
  ɵɵpureFunction0,
  ɵɵpureFunction5,
  ɵɵqueryRefresh,
  ɵɵreference,
  ɵɵrepeater,
  ɵɵrepeaterCreate,
  ɵɵrepeaterTrackByIdentity,
  ɵɵresetView,
  ɵɵrestoreView,
  ɵɵsanitizeUrl,
  ɵɵtemplate,
  ɵɵtemplateRefExtractor,
  ɵɵtext,
  ɵɵtextInterpolate,
  ɵɵtextInterpolate1,
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
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/xuatnhapton/xuatnhapton.component.ts
var import_moment = __toESM(require_moment());

// src/app/admin/chotkho/chotkho.service.ts
var ChotkhoService = class _ChotkhoService {
  _StorageService;
  _sharedSocketService;
  socket;
  CACHE_DURATION = 5 * 60 * 1e3;
  // 5 phút cache cho performance
  constructor(_StorageService, _sharedSocketService) {
    this._StorageService = _StorageService;
    this._sharedSocketService = _sharedSocketService;
    this.socket = this._sharedSocketService.getSocket();
  }
  _snackBar = inject(MatSnackBar);
  // Signals for state management
  ListChotkho = signal([]);
  DetailChotkho = signal({});
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  chotkhoId = signal(null);
  // Loading states for better UX
  isLoading = signal(false);
  isRefreshing = signal(false);
  lastUpdated = signal(null);
  setChotkhoId(id) {
    this.chotkhoId.set(id);
  }
  getListSanphamTonKho(maspList) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(maspList)
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/tonkhobylist`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const data = yield response.json();
        return data || [];
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y danh s\xE1ch s\u1EA3n ph\u1EA9m t\u1ED3n kho:", error);
        this.handleError(500);
        return [];
      }
    });
  }
  CreateChotkho(dulieu) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/create`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const data = yield response.json();
        yield this.getAllChotkho();
        this.chotkhoId.set(data.id);
        this._snackBar.open("T\u1EA1o ch\u1ED1t kho th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return data;
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o ch\u1ED1t kho:", error);
        this.handleError(500);
        return null;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  // Tạo chốt kho hàng loạt cho nhiều sản phẩm
  bulkCreateChotkho(dataList) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(dataList)
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/bulk-create`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const data = yield response.json();
        yield this.getAllChotkho();
        this._snackBar.open(`T\u1EA1o th\xE0nh c\xF4ng ${data?.data?.length || 0} b\u1EA3n ghi ch\u1ED1t kho`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return data;
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o ch\u1ED1t kho h\xE0ng lo\u1EA1t:", error);
        this.handleError(500);
        return null;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getChotkhoByDateRange(params) {
    return __async(this, null, function* () {
      this.isLoading.set(true);
      try {
        const { startDate, endDate, page = 1, limit = this.pageSize() } = params;
        const query = new URLSearchParams({
          startDate: startDate || "",
          endDate: endDate || "",
          page: page.toString(),
          limit: limit.toString()
        });
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          }
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/bydate?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const data = yield response.json();
        this.ListChotkho.set(data.data || []);
        this.page.set(data.page || page);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || 0);
        this.pageSize.set(limit);
        this.lastUpdated.set(/* @__PURE__ */ new Date());
        return data;
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y ch\u1ED1t kho theo kho\u1EA3ng th\u1EDDi gian:", error);
        this.handleError(500);
        return null;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getAllChotkho() {
    return __async(this, arguments, function* (queryParams = {}) {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          }
        };
        queryParams = __spreadValues({
          page: this.page().toString(),
          pageSize: this.pageSize().toString()
        }, queryParams);
        const query = new URLSearchParams();
        Object.entries(queryParams).forEach(([key, value]) => {
          if (value !== null && value !== void 0 && value !== "") {
            query.append(key, String(value));
          }
        });
        const response = yield fetch(`${environment.APIURL}/chotkho?${query}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return [];
        }
        const data = yield response.json();
        this.ListChotkho.set(data.data || []);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || 0);
        this.pageSize.set(data.pageSize || this.pageSize());
        this.lastUpdated.set(/* @__PURE__ */ new Date());
        return data.data || [];
      } catch (error) {
        console.error("L\u1ED7i t\u1EA3i d\u1EEF li\u1EC7u ch\u1ED1t kho:", error);
        this.handleError(500);
        return [];
      } finally {
        this.isRefreshing.set(false);
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
        const response = yield fetch(`${environment.APIURL}/chotkho/updateCodeIds`, options);
        if (!response.ok) {
          this.handleError(response.status);
        }
        const data = yield response.json();
        this.getAllChotkho(this.pageSize());
        return data.data;
      } catch (error) {
        console.error(error);
      }
    });
  }
  getChotkhoBy(_0) {
    return __async(this, arguments, function* (param, pageSize = this.pageSize()) {
      this.pageSize.set(pageSize);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache, no-store, must-revalidate",
            "Pragma": "no-cache",
            "Expires": "0"
          },
          body: JSON.stringify(__spreadProps(__spreadValues({}, param), {
            page: this.page(),
            limit: pageSize
          }))
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/findby`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return;
        }
        const data = yield response.json();
        if (param.isOne === true) {
          this.DetailChotkho.set(data);
        } else {
          this.ListChotkho.set(data.data || []);
          this.page.set(data.page || 1);
          this.totalPages.set(data.totalPages || 1);
          this.total.set(data.total || 0);
          this.pageSize.set(pageSize);
        }
      } catch (error) {
        console.error("L\u1ED7i t\xECm ki\u1EBFm ch\u1ED1t kho:", error);
        this.handleError(500);
      }
    });
  }
  updateChotkho(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(__spreadValues({}, dulieu))
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/update/${dulieu.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const data = yield response.json();
        yield this.getAllChotkho();
        if (data?.id) {
          yield this.getChotkhoBy({ id: data.id, isOne: true });
        }
        return data;
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt ch\u1ED1t kho:", error);
        this.handleError(500);
        return null;
      }
    });
  }
  DeleteChotkho(item) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "DELETE",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache"
          }
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/delete/${item.id}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        yield this.getAllChotkho();
        return true;
      } catch (error) {
        console.error("L\u1ED7i x\xF3a ch\u1ED1t kho:", error);
        this.handleError(500);
        return false;
      }
    });
  }
  // Phương thức tạo báo cáo chốt kho
  generateReport() {
    return __async(this, arguments, function* (queryParams = {}) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(queryParams)
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/report`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o b\xE1o c\xE1o:", error);
        return null;
      }
    });
  }
  // Phương thức cập nhật hàng loạt trạng thái chốt kho
  bulkUpdateStatus(ids, status) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify({ ids, status })
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/bulk-update-status`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        yield this.getAllChotkho();
        return true;
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt h\xE0ng lo\u1EA1t:", error);
        return false;
      }
    });
  }
  // Phương thức lấy thống kê chốt kho
  getStatistics() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/statistics`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y th\u1ED1ng k\xEA:", error);
        return null;
      }
    });
  }
  // Phương thức tìm chốt kho theo sản phẩm
  findBySanpham(sanphamId, page = 1, limit = 20) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/by-sanpham/${sanphamId}?page=${page}&limit=${limit}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i t\xECm ch\u1ED1t kho theo s\u1EA3n ph\u1EA9m:", error);
        return null;
      }
    });
  }
  // Phương thức tìm chốt kho theo kho
  findByKho(khoId, page = 1, limit = 20) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "GET",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/by-kho/${khoId}?page=${page}&limit=${limit}`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i t\xECm ch\u1ED1t kho theo kho:", error);
        return null;
      }
    });
  }
  // Phương thức tìm kiếm nâng cao với tối ưu hóa
  advancedSearch(criteria) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Cache-Control": "no-cache"
          },
          body: JSON.stringify(__spreadValues({}, criteria))
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/advanced-search`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return [];
        }
        const data = yield response.json();
        this.ListChotkho.set(data.data || []);
        this.page.set(data.page || 1);
        this.totalPages.set(data.totalPages || 1);
        this.total.set(data.total || 0);
        return data.data || [];
      } catch (error) {
        console.error("L\u1ED7i t\xECm ki\u1EBFm n\xE2ng cao:", error);
        return [];
      }
    });
  }
  // Phương thức refresh dữ liệu nhanh
  quickRefresh() {
    return __async(this, null, function* () {
      try {
        yield this.getAllChotkho();
        this._snackBar.open("D\u1EEF li\u1EC7u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i refresh:", error);
      }
    });
  }
  // Phương thức validate dữ liệu trước khi gửi
  validateChotkhoData(data) {
    const errors = [];
    if (!data.title || data.title.trim() === "") {
      errors.push("Ti\xEAu \u0111\u1EC1 kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
    }
    if (!data.ngayChot) {
      errors.push("Ng\xE0y ch\u1ED1t kho kh\xF4ng \u0111\u01B0\u1EE3c \u0111\u1EC3 tr\u1ED1ng");
    }
    if (data.slThucTe && data.slThucTe < 0) {
      errors.push("S\u1ED1 l\u01B0\u1EE3ng th\u1EF1c t\u1EBF kh\xF4ng \u0111\u01B0\u1EE3c \xE2m");
    }
    return {
      isValid: errors.length === 0,
      errors
    };
  }
  // Phương thức tính toán chênh lệch tự động
  calculateChenhLech(slHeThong, slThucTe) {
    return (slThucTe || 0) - (slHeThong || 0);
  }
  // Phương thức export dữ liệu
  exportData() {
    return __async(this, arguments, function* (format = "excel", filters = {}) {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify({
            format,
            filters
          })
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/export`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const blob = yield response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `chot-kho-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.${format}`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      } catch (error) {
        console.error("L\u1ED7i export d\u1EEF li\u1EC7u:", error);
        return false;
      }
    });
  }
  // Phương thức thông minh kiểm tra chênh lệch
  smartCheckChenhLech(chotKhoId) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify({
            chotKhoId,
            autoCorrect: true
          })
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/smart-check-chenhlech`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i ki\u1EC3m tra ch\xEAnh l\u1EC7ch th\xF4ng minh:", error);
        return null;
      }
    });
  }
  // Phương thức tạo mẫu import
  generateImportTemplate(templateType = "standard") {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${environment.APIURL}/chotkho/import-template?type=${templateType}`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        });
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        const blob = yield response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `mau-import-chot-kho-${templateType}.xlsx`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o m\u1EABu import:", error);
        return false;
      }
    });
  }
  // Phương thức import từ Excel
  importFromExcel(_0) {
    return __async(this, arguments, function* (file, options = {}) {
      try {
        const formData = new FormData();
        formData.append("file", file);
        formData.append("options", JSON.stringify(options));
        const response = yield fetch(`${environment.APIURL}/chotkho/import`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: formData
        });
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        const result = yield response.json();
        yield this.getAllChotkho();
        this._snackBar.open(`Import th\xE0nh c\xF4ng ${result.successCount} m\u1EE5c`, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return result;
      } catch (error) {
        console.error("L\u1ED7i import:", error);
        return null;
      }
    });
  }
  // Phương thức sao lưu dữ liệu
  backupData(backupType = "full") {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify({
            type: backupType
          })
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/backup`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        const blob = yield response.blob();
        const url = window.URL.createObjectURL(blob);
        const a = document.createElement("a");
        a.href = url;
        a.download = `backup-chot-kho-${backupType}-${(/* @__PURE__ */ new Date()).toISOString().split("T")[0]}.zip`;
        a.click();
        window.URL.revokeObjectURL(url);
        return true;
      } catch (error) {
        console.error("L\u1ED7i sao l\u01B0u:", error);
        return false;
      }
    });
  }
  // Phương thức phục hồi từ backup
  restoreFromBackup(file) {
    return __async(this, null, function* () {
      try {
        const formData = new FormData();
        formData.append("backup", file);
        const response = yield fetch(`${environment.APIURL}/chotkho/restore`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: formData
        });
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        yield this.getAllChotkho();
        this._snackBar.open("Ph\u1EE5c h\u1ED3i d\u1EEF li\u1EC7u th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return true;
      } catch (error) {
        console.error("L\u1ED7i ph\u1EE5c h\u1ED3i:", error);
        return false;
      }
    });
  }
  // Phương thức kiểm tra trùng lặp
  checkDuplicates(data) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify(data)
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/check-duplicates`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i ki\u1EC3m tra tr\xF9ng l\u1EB7p:", error);
        return null;
      }
    });
  }
  // Phương thức tối ưu hóa hiệu suất
  optimizePerformance() {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          },
          body: JSON.stringify({
            action: "optimize"
          })
        };
        const response = yield fetch(`${environment.APIURL}/chotkho/optimize`, options);
        if (!response.ok) {
          this.handleError(response.status);
          return false;
        }
        const result = yield response.json();
        this._snackBar.open("T\u1ED1i \u01B0u h\xF3a th\xE0nh c\xF4ng", "", {
          duration: 2e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return result;
      } catch (error) {
        console.error("L\u1ED7i t\u1ED1i \u01B0u h\xF3a:", error);
        return false;
      }
    });
  }
  // Phương thức debug và monitoring
  getSystemHealth() {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${environment.APIURL}/chotkho/health`, {
          method: "GET",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`
          }
        });
        if (!response.ok) {
          this.handleError(response.status);
          return null;
        }
        return yield response.json();
      } catch (error) {
        console.error("L\u1ED7i ki\u1EC3m tra s\u1EE9c kh\u1ECFe h\u1EC7 th\u1ED1ng:", error);
        return null;
      }
    });
  }
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    let panelClass = "snackbar-error";
    switch (status) {
      case 400:
        message = "Th\xF4ng tin \u0111\xE3 t\u1ED3n t\u1EA1i ho\u1EB7c kh\xF4ng h\u1EE3p l\u1EC7";
        break;
      case 401:
        message = "Phi\xEAn \u0111\u0103ng nh\u1EADp \u0111\xE3 h\u1EBFt h\u1EA1n, vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n th\u1EF1c hi\u1EC7n thao t\xE1c n\xE0y";
        break;
      case 404:
        message = "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u y\xEAu c\u1EA7u";
        break;
      case 422:
        message = "D\u1EEF li\u1EC7u kh\xF4ng h\u1EE3p l\u1EC7";
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        break;
      case 503:
        message = "D\u1ECBch v\u1EE5 t\u1EA1m th\u1EDDi kh\xF4ng kh\u1EA3 d\u1EE5ng";
        break;
      default:
        message = `L\u1ED7i HTTP ${status}`;
    }
    this._snackBar.open(message, "\u0110\xF3ng", {
      duration: 4e3,
      horizontalPosition: "end",
      verticalPosition: "top",
      panelClass: [panelClass]
    });
  }
  static \u0275fac = function ChotkhoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChotkhoService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(SharedSocketService));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChotkhoService, factory: _ChotkhoService.\u0275fac, providedIn: "root" });
};

// src/app/admin/xuatnhapton/detaildexuat/detaildexuat.ts
var _c0 = ["drawer"];
var _c1 = () => [10, 25, 100];
var _c2 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack0 = ($index, $item) => $item.key;
function DetaildexuatComponent_For_25_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 28);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_25_Template_button_click_0_listener($event) {
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
function DetaildexuatComponent_For_29_th_1_div_23_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 45);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function DetaildexuatComponent_For_29_th_1_div_23_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r8[column_r6], "dd/MM/yyyy"));
  }
}
function DetaildexuatComponent_For_29_th_1_div_23_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r8[column_r6], "dd/MM/yyyy"));
  }
}
function DetaildexuatComponent_For_29_th_1_div_23_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", item_r8[column_r6], "%");
  }
}
function DetaildexuatComponent_For_29_th_1_div_23_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r8 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r8[column_r6] || "Tr\u1ED1ng", "");
  }
}
function DetaildexuatComponent_For_29_th_1_div_23_Template(rf, ctx) {
  if (rf & 1) {
    const _r7 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 43);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_div_23_Template_div_click_0_listener() {
      const item_r8 = \u0275\u0275restoreView(_r7).$implicit;
      const column_r6 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenItem(item_r8, column_r6));
    });
    \u0275\u0275template(1, DetaildexuatComponent_For_29_th_1_div_23_span_1_Template, 2, 0, "span", 44)(2, DetaildexuatComponent_For_29_th_1_div_23_Case_2_Template, 3, 4, "span")(3, DetaildexuatComponent_For_29_th_1_div_23_Case_3_Template, 3, 4, "span")(4, DetaildexuatComponent_For_29_th_1_div_23_Case_4_Template, 2, 1, "span")(5, DetaildexuatComponent_For_29_th_1_div_23_Case_5_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const item_r8 = ctx.$implicit;
    const column_r6 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r3.CheckItem(item_r8));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r6) === "createdAt" ? 2 : tmp_20_0 === "updatedAt" ? 3 : tmp_20_0 === "haohut" ? 4 : 5);
  }
}
function DetaildexuatComponent_For_29_th_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 31)(1, "span", 32);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 33, 4);
    \u0275\u0275text(5, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "mat-menu", null, 1)(8, "div", 34);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_div_click_8_listener($event) {
      \u0275\u0275restoreView(_r5);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(9, "div", 35)(10, "input", 10);
    \u0275\u0275listener("keyup", function DetaildexuatComponent_For_29_th_1_Template_input_keyup_10_listener($event) {
      \u0275\u0275restoreView(_r5);
      const column_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.doFilterHederColumn($event, column_r6));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "div", 11)(12, "span", 12);
    \u0275\u0275text(13, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(14, "div", 36)(15, "div", 8)(16, "span", 37);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_span_click_16_listener() {
      \u0275\u0275restoreView(_r5);
      const column_r6 = \u0275\u0275nextContext().$implicit;
      const ctx_r3 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r3.ChosenAll(ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6)));
    });
    \u0275\u0275text(17);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "span", 37);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_span_click_18_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.EmptyFiter());
    });
    \u0275\u0275text(19, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(20, "span", 37);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_span_click_20_listener() {
      \u0275\u0275restoreView(_r5);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ResetFilter());
    });
    \u0275\u0275text(21, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(22, "div", 38);
    \u0275\u0275template(23, DetaildexuatComponent_For_29_th_1_div_23_Template, 6, 2, "div", 39);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "div", 40)(25, "button", 41);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_button_click_25_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r9 = \u0275\u0275reference(4);
      return \u0275\u0275resetView(menuTrigger_r9.closeMenu());
    });
    \u0275\u0275text(26, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "button", 42);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_th_1_Template_button_click_27_listener() {
      \u0275\u0275restoreView(_r5);
      const menuTrigger_r9 = \u0275\u0275reference(4);
      const ctx_r3 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r3.ApplyFilterColum(menuTrigger_r9));
    });
    \u0275\u0275text(28, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()()();
  }
  if (rf & 2) {
    const menu_r10 = \u0275\u0275reference(7);
    const column_r6 = \u0275\u0275nextContext().$implicit;
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r3.ColumnName[column_r6], " ");
    \u0275\u0275advance();
    \u0275\u0275property("matMenuTriggerFor", menu_r10);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r3.FilterHederColumn(ctx_r3.dataSource.filteredData, column_r6))("ngForTrackBy", ctx_r3.trackByFn);
  }
}
function DetaildexuatComponent_For_29_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r11 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r11 + 1, " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_2_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_td_2_Case_2_Conditional_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r12);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      const DathangDialog_r14 = \u0275\u0275reference(35);
      return \u0275\u0275resetView(ctx_r3.XemDathang(row_r13, DathangDialog_r14));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" + ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r6], "1.0-2"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_2_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r13[column_r6], "1.0-2"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 48)(1, "span", 51);
    \u0275\u0275template(2, DetaildexuatComponent_For_29_td_2_Case_2_Conditional_2_Template, 3, 4, "span")(3, DetaildexuatComponent_For_29_td_2_Case_2_Conditional_3_Template, 2, 4);
    \u0275\u0275elementStart(4, "span", 52);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r13[column_r6] > 0 ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(6, 2, row_r13 == null ? null : row_r13.slchonhaptt, "1.0-2"), ")");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_3_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 53);
    \u0275\u0275listener("click", function DetaildexuatComponent_For_29_td_2_Case_3_Conditional_2_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r15);
      const row_r13 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r3 = \u0275\u0275nextContext(2);
      const DonhangDialog_r16 = \u0275\u0275reference(37);
      return \u0275\u0275resetView(ctx_r3.XemDonhang(row_r13, DonhangDialog_r16));
    });
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "number");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1("", \u0275\u0275pipeBind2(2, 1, row_r13[column_r6], "1.0-2"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_3_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275text(0);
    \u0275\u0275pipe(1, "number");
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext(2).$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(1, 1, row_r13[column_r6], "1.0-2"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 49)(1, "span", 51);
    \u0275\u0275template(2, DetaildexuatComponent_For_29_td_2_Case_3_Conditional_2_Template, 3, 4, "span")(3, DetaildexuatComponent_For_29_td_2_Case_3_Conditional_3_Template, 2, 4);
    \u0275\u0275elementStart(4, "span", 52);
    \u0275\u0275text(5);
    \u0275\u0275pipe(6, "number");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275conditional(row_r13[column_r6] > 0 ? 2 : 3);
    \u0275\u0275advance(3);
    \u0275\u0275textInterpolate1("(", \u0275\u0275pipeBind2(6, 2, row_r13 == null ? null : row_r13.slchogiaott, "1.0-2"), ")");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r6], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_5_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 54);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function DetaildexuatComponent_For_29_td_2_Case_5_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 55);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function DetaildexuatComponent_For_29_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275template(1, DetaildexuatComponent_For_29_td_2_Case_5_Conditional_1_Template, 2, 0, "mat-icon", 54)(2, DetaildexuatComponent_For_29_td_2_Case_5_Conditional_2_Template, 2, 0, "mat-icon", 55);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r13[column_r6] ? 1 : 2);
  }
}
function DetaildexuatComponent_For_29_td_2_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 50);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13[column_r6], "HH:mm:ss dd/MM/yyyy"), " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 47);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r13[column_r6], " ");
  }
}
function DetaildexuatComponent_For_29_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 46);
    \u0275\u0275template(1, DetaildexuatComponent_For_29_td_2_Case_1_Template, 2, 1, "span", 47)(2, DetaildexuatComponent_For_29_td_2_Case_2_Template, 7, 5, "span", 48)(3, DetaildexuatComponent_For_29_td_2_Case_3_Template, 7, 5, "span", 49)(4, DetaildexuatComponent_For_29_td_2_Case_4_Template, 3, 4, "span", 50)(5, DetaildexuatComponent_For_29_td_2_Case_5_Template, 3, 1, "span", 47)(6, DetaildexuatComponent_For_29_td_2_Case_6_Template, 3, 4, "span", 50)(7, DetaildexuatComponent_For_29_td_2_Case_7_Template, 2, 1, "span", 47);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_17_0;
    const column_r6 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_17_0 = column_r6) === "STT" ? 1 : tmp_17_0 === "slchonhap" ? 2 : tmp_17_0 === "slchogiao" ? 3 : tmp_17_0 === "ngaygiao" ? 4 : tmp_17_0 === "isActive" ? 5 : tmp_17_0 === "updatedAt" ? 6 : 7);
  }
}
function DetaildexuatComponent_For_29_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 23);
    \u0275\u0275template(1, DetaildexuatComponent_For_29_th_1_Template, 29, 5, "th", 29)(2, DetaildexuatComponent_For_29_td_2_Template, 8, 1, "td", 30);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r6 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r6);
  }
}
function DetaildexuatComponent_tr_30_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 56);
  }
}
function DetaildexuatComponent_tr_31_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 57);
  }
}
function DetaildexuatComponent_tr_32_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 58)(1, "td", 59);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function DetaildexuatComponent_ng_template_34_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 71)(1, "td", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 72)(4, "a", 73);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 68)(7, "span", 74);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 68);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 68);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 68);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 68);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 68);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r17 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.title);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("href", "/admin/dathang/", item_r17.id, "", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r17.madncc, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(14, _c2, item_r17.status === "dadat", item_r17.status === "dagiao", item_r17.status === "danhan", item_r17.status === "hoanthanh", item_r17.status === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.Trangthaidon[item_r17.status], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.nhacungcap.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.sanpham.sanpham.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.sanpham.sldat);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r17.sanpham.slnhan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 11, item_r17.createdAt, "dd/MM/yyyy"));
  }
}
function DetaildexuatComponent_ng_template_34_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 60);
    \u0275\u0275text(1, "Chi Ti\u1EBFt \u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 61)(3, "table", 62)(4, "thead")(5, "tr", 63)(6, "th", 64);
    \u0275\u0275text(7, "Ti\xEAu \u0111\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 64);
    \u0275\u0275text(9, "M\xE3 \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 64);
    \u0275\u0275text(11, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 64);
    \u0275\u0275text(13, "Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 64);
    \u0275\u0275text(15, "T\xEAn S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 64);
    \u0275\u0275text(17, "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 64);
    \u0275\u0275text(19, "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 64);
    \u0275\u0275text(21, "Ng\xE0y");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275template(23, DetaildexuatComponent_ng_template_34_tr_23_Template, 20, 20, "tr", 65);
    \u0275\u0275elementStart(24, "tr", 66)(25, "td", 67);
    \u0275\u0275text(26, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 68);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 68);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "td", 68);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-dialog-actions", 69)(33, "button", 70);
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r3.ListDathang);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.TinhTong(ctx_r3.ListDathang, "sldat"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.TinhTong(ctx_r3.ListDathang, "slnhan"));
  }
}
function DetaildexuatComponent_ng_template_36_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 71)(1, "td", 68);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 72)(4, "a", 73);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 68)(7, "span", 74);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 68);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 68);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 68);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 68);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 68);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r18 = ctx.$implicit;
    const ctx_r3 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.title);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("href", "/admin/donhang/", item_r18.id, "", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r18.madonhang, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(14, _c2, item_r18.status === "dadat", item_r18.status === "dagiao", item_r18.status === "danhan", item_r18.status === "hoanthanh", item_r18.status === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r3.Trangthaidon[item_r18.status], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.khachhang.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.sanpham.sanpham.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.sanpham.sldat);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r18.sanpham.slnhan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 11, item_r18.createdAt, "dd/MM/yyyy"));
  }
}
function DetaildexuatComponent_ng_template_36_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 60);
    \u0275\u0275text(1, "Chi Ti\u1EBFt \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 61)(3, "table", 62)(4, "thead")(5, "tr", 63)(6, "th", 64);
    \u0275\u0275text(7, "Ti\xEAu \u0111\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 64);
    \u0275\u0275text(9, "M\xE3 \u0110\u01A1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 64);
    \u0275\u0275text(11, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 64);
    \u0275\u0275text(13, "Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 64);
    \u0275\u0275text(15, "T\xEAn S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 64);
    \u0275\u0275text(17, "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 64);
    \u0275\u0275text(19, "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 64);
    \u0275\u0275text(21, "Ng\xE0y");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275template(23, DetaildexuatComponent_ng_template_36_tr_23_Template, 20, 20, "tr", 65);
    \u0275\u0275elementStart(24, "tr", 66)(25, "td", 67);
    \u0275\u0275text(26, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 68);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 68);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "td", 68);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-dialog-actions", 69)(33, "button", 70);
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r3 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r3.ListDonhang);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r3.TinhTong(ctx_r3.ListDonhang, "sldat"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r3.TinhTong(ctx_r3.ListDonhang, "slnhan"));
  }
}
var DetaildexuatComponent = class _DetaildexuatComponent {
  DexuatEmit = new EventEmitter();
  Detail = {};
  displayedColumns = [
    "title",
    "masp",
    "dvt",
    "slton",
    "slchogiao",
    "slchonhap",
    "haohut",
    "goiy"
  ];
  ColumnName = {
    title: "T\xEAn s\u1EA3n ph\u1EA9m",
    masp: "M\xE3 s\u1EA3n ph\u1EA9m",
    dvt: "\u0110\u01A1n v\u1ECB t\xEDnh",
    slton: "SL t\u1ED3n",
    slchogiao: "SL ch\u1EDD giao",
    slchonhap: "SL ch\u1EDD nh\u1EADp",
    haohut: "Hao h\u1EE5t",
    goiy: "G\u1EE3i \xFD"
  };
  FilterColumns = JSON.parse(localStorage.getItem("TonkhoColFilter") || "[]");
  Columns = [];
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _PhieukhoService = inject(PhieukhoService);
  _SanphamService = inject(SanphamService);
  _DathangService = inject(DathangService);
  _DonhangService = inject(DonhangService);
  _KhoService = inject(KhoService);
  _breakpointObserver = inject(BreakpointObserver);
  Xuatnhapton = this._PhieukhoService.ListPhieukho;
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    Batdau: DateHelpers.format(DateHelpers.now(), "YYYY-MM-DD"),
    Ketthuc: DateHelpers.format(DateHelpers.add(DateHelpers.now(), 1, "day"), "YYYY-MM-DD"),
    Type: "donsi"
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "day";
  isSearch = false;
  ListKho = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
  }
  createFilter() {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : "";
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource?.paginator?.firstPage();
    }
  }
  LoadDondathang() {
    return __async(this, null, function* () {
      const ListSLChogiao = yield this._DonhangService.getSLChogiao(this.SearchParams);
      const ListSLChonhap = yield this._DathangService.getSLChonhap(this.SearchParams);
      this.dataSource.data.forEach((v) => {
        const SLChogiao = ListSLChogiao.find((v1) => v1.idSP === v.sanphamId);
        if (SLChogiao) {
          v.slchogiaott = SLChogiao.slchogiaott;
        } else {
          v.slchogiaott = 0;
        }
        const SLChonhap = ListSLChonhap.find((v1) => v1.idSP === v.sanphamId);
        if (SLChonhap) {
          v.slchonhaptt = SLChonhap.slchonhaptt;
        } else {
          v.slchonhaptt = 0;
        }
      });
      this.dataSource.data = this.dataSource.data.filter((v) => v.slchogiaott > 0 || v.slchonhaptt > 0);
      this.dataSource.sort = this.sort;
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
      this._KhoService.getTonKho("1", "1000").then((res) => {
        this.Xuatnhapton.set(res.data);
        this.dataSource.data = this.Xuatnhapton();
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeColumns();
        this.setupDrawer();
        this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
        this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
        this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
        this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
        this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
      });
      this.CountItem = this.Xuatnhapton().length;
    });
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
      localStorage.setItem("TonkhoColFilter", JSON.stringify(this.FilterColumns));
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
        this.paginator.hidePageSize = true;
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
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("TonkhoColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    console.log(column);
    this.dataSource.filteredData = this.Xuatnhapton().filter((v) => removeVietnameseAccents(v[column]).includes(query) || v[column].toLowerCase().includes(query));
  }
  trackByFn(index, item) {
    return item.id;
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
        this.ListFilter = this.ListFilter.filter((v2) => v2.id !== v2.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.Xuatnhapton();
    this.dataSource.data = this.Xuatnhapton();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Xuatnhapton().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
      const SP = this._SanphamService.ListSanpham().map((v) => ({
        subtitle: v.subtitle,
        masp: v.masp,
        title: v.title,
        dvt: v.dvt
      }));
      const XNT = this.Xuatnhapton().map((v) => ({
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
        slton: v.slton
      }));
      writeExcelMultiple({ SP, XNT }, title);
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const files = Array.from(event.target.files);
      const data = yield readExcelFileNoWorker(files[0], "XNT");
      const phieuNhapDetails = [];
      const phieuXuatDetails = [];
      data.forEach((v) => {
        const exitItem = this.Xuatnhapton().find((item) => item.masp === v.masp);
        if (exitItem) {
          if (v.slton > exitItem.slton) {
            phieuNhapDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: v.slton - exitItem.slton
              // thêm các trường cần thiết
            });
          } else if (v.slton < exitItem.slton) {
            phieuXuatDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: exitItem.slton - v.slton
              // thêm các trường cần thiết
            });
          }
        }
      });
      if (phieuNhapDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${DateHelpers.format(DateHelpers.now(), "DD/MM/YYYY ")}`,
          type: "nhap",
          sanpham: phieuNhapDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
          ngay: DateHelpers.now()
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${DateHelpers.format(DateHelpers.now(), "DD/MM/YYYY ")}`,
          type: "xuat",
          sanpham: phieuXuatDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${DateHelpers.format(DateHelpers.now(), "HH:mm:ss DD/MM/YYYY ")}`,
          ngay: DateHelpers.now()
        });
      }
      if (phieuNhapDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh nh\u1EADp kho v\u1EDBi ${phieuNhapDetails.length} s\u1EA3n ph\u1EA9m`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh xu\u1EA5t kho v\u1EDBi ${phieuXuatDetails.length} s\u1EA3n ph\u1EA9m`, "", {
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
    });
  }
  _dialog = inject(MatDialog);
  Trangthaidon = TrangThaiDon;
  ListDathang = [];
  ListDonhang = [];
  XemDathang(row, template) {
    return __async(this, null, function* () {
      this.ListDathang = yield this._DathangService.findbysanpham(row.sanphamId);
      console.log(this.ListDathang);
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  XemDonhang(row, template) {
    return __async(this, null, function* () {
      this.ListDonhang = yield this._DonhangService.findbysanpham(row.sanphamId);
      console.log(this.ListDonhang);
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (Number(item?.sanpham[fieldTong]) || 0), 0) || 0;
  }
  gotoDexuat() {
    this.DexuatEmit.emit(false);
  }
  static \u0275fac = function DetaildexuatComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DetaildexuatComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _DetaildexuatComponent, selectors: [["app-detaildexuat"]], viewQuery: function DetaildexuatComponent_Query(rf, ctx) {
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
  }, outputs: { DexuatEmit: "DexuatEmit" }, decls: 38, vars: 7, consts: [["drawer", ""], ["menu", "matMenu"], ["DathangDialog", ""], ["DonhangDialog", ""], ["menuTrigger", "matMenuTrigger"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-14", "w-full", "p-2"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "cursor-pointer", "p-2", "rounded-lg", "border", "hover:bg-slate-50", 3, "click"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "excelstyle", "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions"], ["mat-menu-item", "", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "text-green-700", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-red-700", "font-bold"], [1, "max-w-40", "line-clamp-4", "text-xs"], [1, "flex", "items-center", "justify-between"], [1, "text-xs", "text-gray-500"], [3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", ""], [1, "mat-row"], ["colspan", "4", 1, "mat-cell", "p-4"], ["mat-dialog-title", ""], [1, "mat-typography"], [1, "w-full", "border-collapse", "border", "border-gray-300"], [1, "bg-gray-100"], [1, "border", "border-gray-300", "px-4", "py-2", "text-left"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "bg-gray-100", "font-bold"], ["colspan", "5", 1, "border", "border-gray-300", "px-4", "py-2"], [1, "border", "border-gray-300", "px-4", "py-2"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], [1, "hover:bg-gray-50"], [1, "border", "px-4", "py-2", "font-bold"], ["target", "_blank", 1, "text-blue-500", 3, "href"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"]], template: function DetaildexuatComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 5)(1, "mat-drawer", 6, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 7)(5, "div", 8)(6, "div", 9)(7, "input", 10);
      \u0275\u0275listener("keyup", function DetaildexuatComponent_Template_input_keyup_7_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(8, "div", 11)(9, "span", 12);
      \u0275\u0275text(10, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(11, "span", 13);
      \u0275\u0275listener("click", function DetaildexuatComponent_Template_span_click_11_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.gotoDexuat());
      });
      \u0275\u0275text(12, "Xu\u1EA5t Nh\u1EADp T\xF4n Theo Ng\xE0y");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(13, "button", 14)(14, "mat-icon");
      \u0275\u0275text(15, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(16, "mat-menu", null, 1)(18, "div", 15)(19, "mat-form-field", 16)(20, "input", 17);
      \u0275\u0275listener("input", function DetaildexuatComponent_Template_input_input_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function DetaildexuatComponent_Template_input_click_20_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(21, "mat-icon", 18);
      \u0275\u0275text(22, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(23, "div", 19);
      \u0275\u0275repeaterCreate(24, DetaildexuatComponent_For_25_Template, 5, 2, "button", 20, _forTrack0);
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(26, "div", 21)(27, "table", 22);
      \u0275\u0275repeaterCreate(28, DetaildexuatComponent_For_29_Template, 3, 1, "ng-container", 23, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(30, DetaildexuatComponent_tr_30_Template, 1, 0, "tr", 24)(31, DetaildexuatComponent_tr_31_Template, 1, 0, "tr", 25)(32, DetaildexuatComponent_tr_32_Template, 3, 0, "tr", 26);
      \u0275\u0275elementEnd()();
      \u0275\u0275element(33, "mat-paginator", 27);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(34, DetaildexuatComponent_ng_template_34_Template, 35, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor)(36, DetaildexuatComponent_ng_template_36_Template, 35, 3, "ng-template", null, 3, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r19 = \u0275\u0275reference(17);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(12);
      \u0275\u0275property("matMenuTriggerFor", menu_r19);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(3);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(6, _c1));
    }
  }, dependencies: [
    MatFormFieldModule,
    MatFormField,
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
    MatPaginator,
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
    NgClass,
    NgForOf,
    NgIf,
    DecimalPipe,
    DatePipe,
    FormsModule,
    MatTooltipModule,
    MatTooltip,
    MatDatepickerModule,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent
  ], encapsulation: 2 });
};
__decorate([
  memoize()
], DetaildexuatComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], DetaildexuatComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(DetaildexuatComponent, { className: "DetaildexuatComponent", filePath: "src/app/admin/xuatnhapton/detaildexuat/detaildexuat.ts", lineNumber: 56 });
})();

// src/app/admin/xuatnhapton/xuatnhapton.component.ts
var _c02 = ["drawer"];
var _c12 = () => ({ standalone: true });
var _c22 = () => [10, 25, 50, 100];
var _c3 = (a0, a1, a2, a3, a4) => ({ "text-blue-500": a0, "text-yellow-500": a1, "text-green-500": a2, "text-purple-500": a3, "text-red-500": a4 });
var _forTrack02 = ($index, $item) => $item.key;
function XuatnhaptonComponent_Conditional_5_Template(rf, ctx) {
  if (rf & 1) {
    const _r1 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "app-detaildexuat", 11);
    \u0275\u0275listener("DexuatEmit", function XuatnhaptonComponent_Conditional_5_Template_app_detaildexuat_DexuatEmit_0_listener($event) {
      \u0275\u0275restoreView(_r1);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isDexuat = $event);
    });
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_Conditional_6_For_22_Template(rf, ctx) {
  if (rf & 1) {
    const _r4 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 39);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_22_Template_button_click_0_listener($event) {
      const item_r5 = \u0275\u0275restoreView(_r4).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      ctx_r1.toggleColumn(item_r5);
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
    const item_r5 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r5.value);
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_span_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 56);
    \u0275\u0275text(1, "check");
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(2, 1, item_r9[column_r7], "dd/MM/yyyy"));
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span");
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const item_r9 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext(3).$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r9[column_r7] || "Tr\u1ED1ng", "");
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 54);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Template_div_click_0_listener() {
      const item_r9 = \u0275\u0275restoreView(_r8).$implicit;
      const column_r7 = \u0275\u0275nextContext(3).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenItem(item_r9, column_r7));
    });
    \u0275\u0275template(1, XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_span_1_Template, 2, 0, "span", 55)(2, XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Case_2_Template, 3, 4, "span")(3, XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Case_3_Template, 2, 1, "span");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_24_0;
    const item_r9 = ctx.$implicit;
    const column_r7 = \u0275\u0275nextContext(3).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275property("ngIf", ctx_r1.CheckItem(item_r9));
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_24_0 = column_r7) === "ngay" ? 2 : 3);
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template(rf, ctx) {
  if (rf & 1) {
    const _r6 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 44, 6);
    \u0275\u0275text(2, " filter_alt ");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "mat-menu", null, 7)(5, "div", 45);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_div_click_5_listener($event) {
      \u0275\u0275restoreView(_r6);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementStart(6, "div", 46)(7, "input", 14);
    \u0275\u0275listener("keyup", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_input_keyup_7_listener($event) {
      \u0275\u0275restoreView(_r6);
      const column_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.doFilterHederColumn($event, column_r7));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "div", 15)(9, "span", 16);
    \u0275\u0275text(10, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(11, "div", 47)(12, "div", 12)(13, "span", 48);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_span_click_13_listener() {
      \u0275\u0275restoreView(_r6);
      const column_r7 = \u0275\u0275nextContext(2).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.ChosenAll(ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r7)));
    });
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "span", 48);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_span_click_15_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.EmptyFiter());
    });
    \u0275\u0275text(16, "Xo\xE1");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(17, "span", 48);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_span_click_17_listener() {
      \u0275\u0275restoreView(_r6);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ResetFilter());
    });
    \u0275\u0275text(18, "Reset");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(19, "div", 49);
    \u0275\u0275template(20, XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_div_20_Template, 4, 2, "div", 50);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(21, "div", 51)(22, "button", 52);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_button_click_22_listener() {
      \u0275\u0275restoreView(_r6);
      const menuTrigger_r10 = \u0275\u0275reference(1);
      return \u0275\u0275resetView(menuTrigger_r10.closeMenu());
    });
    \u0275\u0275text(23, "\u0110\xF3ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(24, "button", 53);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template_button_click_24_listener() {
      \u0275\u0275restoreView(_r6);
      const menuTrigger_r10 = \u0275\u0275reference(1);
      const ctx_r1 = \u0275\u0275nextContext(4);
      return \u0275\u0275resetView(ctx_r1.ApplyFilterColum(menuTrigger_r10));
    });
    \u0275\u0275text(25, "\xC1p D\u1EE5ng");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const filterMenu_r11 = \u0275\u0275reference(4);
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275property("matMenuTriggerFor", filterMenu_r11);
    \u0275\u0275advance(14);
    \u0275\u0275textInterpolate1("Ch\u1ECDn T\u1EA5t C\u1EA3 ", ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r7).length || 0, "");
    \u0275\u0275advance(6);
    \u0275\u0275property("ngForOf", ctx_r1.FilterHederColumn(ctx_r1.dataSource.filteredData, column_r7))("ngForTrackBy", ctx_r1.trackByFn);
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_th_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 42)(1, "span", 43);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275template(3, XuatnhaptonComponent_Conditional_6_For_47_th_1_Conditional_3_Template, 26, 4);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext().$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r1.ColumnName[column_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r7 !== "STT" && column_r7 !== "actions" ? 3 : -1);
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r12 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r12 + 1, " ");
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r13.title, " ");
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r13.ngay, "dd/MM/yyyy HH:mm"), " ");
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    const _r14 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 61)(1, "button", 62);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_4_Template_button_click_1_listener() {
      \u0275\u0275restoreView(_r14);
      const row_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.viewChotkhoDetail(row_r13));
    });
    \u0275\u0275elementStart(2, "mat-icon");
    \u0275\u0275text(3, "visibility");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(4, "button", 63);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_4_Template_button_click_4_listener() {
      \u0275\u0275restoreView(_r14);
      const row_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.editChotkho(row_r13));
    });
    \u0275\u0275elementStart(5, "mat-icon");
    \u0275\u0275text(6, "edit");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(7, "button", 64);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_4_Template_button_click_7_listener() {
      \u0275\u0275restoreView(_r14);
      const row_r13 = \u0275\u0275nextContext().$implicit;
      const ctx_r1 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r1.deleteChotkho(row_r13));
    });
    \u0275\u0275elementStart(8, "mat-icon");
    \u0275\u0275text(9, "delete");
    \u0275\u0275elementEnd()()();
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 58);
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
function XuatnhaptonComponent_Conditional_6_For_47_td_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 57);
    \u0275\u0275template(1, XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_1_Template, 2, 1, "span", 58)(2, XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_2_Template, 2, 1, "span", 59)(3, XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_3_Template, 3, 4, "span", 60)(4, XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_4_Template, 10, 0, "div", 61)(5, XuatnhaptonComponent_Conditional_6_For_47_td_2_Case_5_Template, 2, 1, "span", 58);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_20_0;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_20_0 = column_r7) === "STT" ? 1 : tmp_20_0 === "title" ? 2 : tmp_20_0 === "ngay" ? 3 : tmp_20_0 === "actions" ? 4 : 5);
  }
}
function XuatnhaptonComponent_Conditional_6_For_47_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 34);
    \u0275\u0275template(1, XuatnhaptonComponent_Conditional_6_For_47_th_1_Template, 4, 2, "th", 40)(2, XuatnhaptonComponent_Conditional_6_For_47_td_2_Template, 6, 1, "td", 41);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r7);
  }
}
function XuatnhaptonComponent_Conditional_6_tr_48_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 65);
  }
}
function XuatnhaptonComponent_Conditional_6_tr_49_Template(rf, ctx) {
  if (rf & 1) {
    const _r15 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 66);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_tr_49_Template_tr_click_0_listener() {
      const row_r16 = \u0275\u0275restoreView(_r15).$implicit;
      const ctx_r1 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r1.viewChotkhoDetail(row_r16));
    });
    \u0275\u0275elementEnd();
  }
}
function XuatnhaptonComponent_Conditional_6_tr_50_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 67)(1, "td", 68)(2, "div", 69)(3, "mat-icon", 70);
    \u0275\u0275text(4, "inventory_2");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "p", 71);
    \u0275\u0275text(6, "Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u ch\u1ED1t kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(7, "p", 72);
    \u0275\u0275text(8, "Th\u1EED thay \u0111\u1ED5i b\u1ED9 l\u1ECDc ho\u1EB7c t\u1EA1o ch\u1ED1t kho m\u1EDBi");
    \u0275\u0275elementEnd()()()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance();
    \u0275\u0275attribute("colspan", ctx_r1.displayedColumns.length);
  }
}
function XuatnhaptonComponent_Conditional_6_Template(rf, ctx) {
  if (rf & 1) {
    const _r3 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "div", 12)(1, "div", 13)(2, "input", 14);
    \u0275\u0275listener("keyup", function XuatnhaptonComponent_Conditional_6_Template_input_keyup_2_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.applyFilter($event));
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "div", 15)(4, "span", 16);
    \u0275\u0275text(5, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(6, "span", 17);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_Template_span_click_6_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.isDexuat = !ctx_r1.isDexuat);
    });
    \u0275\u0275text(7, "\u0110\u1EC1 Xu\u1EA5t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "a", 18);
    \u0275\u0275text(9, "T\u1EA1o Ch\u1ED1t Kho");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "button", 19)(11, "mat-icon");
    \u0275\u0275text(12, "tune");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(13, "mat-menu", null, 3)(15, "div", 20)(16, "mat-form-field", 21)(17, "input", 22);
    \u0275\u0275listener("input", function XuatnhaptonComponent_Conditional_6_Template_input_input_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.doFilterColumns($event));
    })("click", function XuatnhaptonComponent_Conditional_6_Template_input_click_17_listener($event) {
      \u0275\u0275restoreView(_r3);
      return \u0275\u0275resetView($event.stopPropagation());
    });
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "mat-icon", 23);
    \u0275\u0275text(19, "search");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(20, "div", 24);
    \u0275\u0275repeaterCreate(21, XuatnhaptonComponent_Conditional_6_For_22_Template, 5, 2, "button", 25, _forTrack02);
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(23, "div", 26)(24, "mat-form-field", 27)(25, "mat-label");
    \u0275\u0275text(26, "B\u1EAFt \u0110\u1EA7u");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function XuatnhaptonComponent_Conditional_6_Template_input_ngModelChange_27_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.SearchParams.startDate, $event) || (ctx_r1.SearchParams.startDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(28, "mat-datepicker-toggle", 29)(29, "mat-datepicker", null, 4);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(31, "mat-form-field", 27)(32, "mat-label");
    \u0275\u0275text(33, "K\u1EBFt Th\xFAc");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(34, "input", 28);
    \u0275\u0275twoWayListener("ngModelChange", function XuatnhaptonComponent_Conditional_6_Template_input_ngModelChange_34_listener($event) {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r1.SearchParams.endDate, $event) || (ctx_r1.SearchParams.endDate = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd();
    \u0275\u0275element(35, "mat-datepicker-toggle", 29)(36, "mat-datepicker", null, 5);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(38, "button", 30);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_Template_button_click_38_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.LoadDondathang());
    });
    \u0275\u0275elementStart(39, "mat-icon");
    \u0275\u0275text(40, "search");
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(41, "button", 31);
    \u0275\u0275listener("click", function XuatnhaptonComponent_Conditional_6_Template_button_click_41_listener() {
      \u0275\u0275restoreView(_r3);
      const ctx_r1 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r1.ngOnInit());
    });
    \u0275\u0275elementStart(42, "mat-icon");
    \u0275\u0275text(43, "cached");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(44, "div", 32)(45, "table", 33);
    \u0275\u0275repeaterCreate(46, XuatnhaptonComponent_Conditional_6_For_47_Template, 3, 1, "ng-container", 34, \u0275\u0275repeaterTrackByIdentity);
    \u0275\u0275template(48, XuatnhaptonComponent_Conditional_6_tr_48_Template, 1, 0, "tr", 35)(49, XuatnhaptonComponent_Conditional_6_tr_49_Template, 1, 0, "tr", 36)(50, XuatnhaptonComponent_Conditional_6_tr_50_Template, 9, 1, "tr", 37);
    \u0275\u0275elementEnd()();
    \u0275\u0275element(51, "mat-paginator", 38);
  }
  if (rf & 2) {
    const menu_r17 = \u0275\u0275reference(14);
    const pickerBatdau_r18 = \u0275\u0275reference(30);
    const pickerKetthuc_r19 = \u0275\u0275reference(37);
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(10);
    \u0275\u0275property("matMenuTriggerFor", menu_r17);
    \u0275\u0275advance(11);
    \u0275\u0275repeater(ctx_r1.FilterColumns);
    \u0275\u0275advance(3);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", pickerBatdau_r18);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.SearchParams.startDate);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(18, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerBatdau_r18);
    \u0275\u0275advance(3);
    \u0275\u0275property("appearance", "outline")("subscriptSizing", "dynamic");
    \u0275\u0275advance(3);
    \u0275\u0275property("matDatepicker", pickerKetthuc_r19);
    \u0275\u0275twoWayProperty("ngModel", ctx_r1.SearchParams.endDate);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(19, _c12));
    \u0275\u0275advance();
    \u0275\u0275property("for", pickerKetthuc_r19);
    \u0275\u0275advance(10);
    \u0275\u0275property("dataSource", ctx_r1.dataSource);
    \u0275\u0275advance();
    \u0275\u0275repeater(ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("matHeaderRowDef", ctx_r1.displayedColumns);
    \u0275\u0275advance();
    \u0275\u0275property("matRowDefColumns", ctx_r1.displayedColumns);
    \u0275\u0275advance(2);
    \u0275\u0275property("pageSizeOptions", \u0275\u0275pureFunction0(20, _c22))("showFirstLastButtons", true);
  }
}
function XuatnhaptonComponent_ng_template_7_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 84)(1, "td", 81);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85)(4, "a", 86);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 81)(7, "span", 87);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 81);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 81);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 81);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 81);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r20 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r20.title);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("href", "/admin/dathang/", item_r20.id, "", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r20.madncc, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(14, _c3, item_r20.status === "dadat", item_r20.status === "dagiao", item_r20.status === "danhan", item_r20.status === "hoanthanh", item_r20.status === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.Trangthaidon[item_r20.status], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r20.nhacungcap.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r20.sanpham.sanpham.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r20.sanpham.sldat);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r20.sanpham.slnhan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 11, item_r20.createdAt, "dd/MM/yyyy"));
  }
}
function XuatnhaptonComponent_ng_template_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 73);
    \u0275\u0275text(1, "Chi Ti\u1EBFt \u0110\u1EB7t H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 74)(3, "table", 75)(4, "thead")(5, "tr", 76)(6, "th", 77);
    \u0275\u0275text(7, "Ti\xEAu \u0111\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 77);
    \u0275\u0275text(9, "M\xE3 \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 77);
    \u0275\u0275text(11, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 77);
    \u0275\u0275text(13, "Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 77);
    \u0275\u0275text(15, "T\xEAn S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 77);
    \u0275\u0275text(17, "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 77);
    \u0275\u0275text(19, "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 77);
    \u0275\u0275text(21, "Ng\xE0y");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275template(23, XuatnhaptonComponent_ng_template_7_tr_23_Template, 20, 20, "tr", 78);
    \u0275\u0275elementStart(24, "tr", 79)(25, "td", 80);
    \u0275\u0275text(26, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 81);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 81);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "td", 81);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-dialog-actions", 82)(33, "button", 83);
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r1.ListDathang);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.TinhTong(ctx_r1.ListDathang, "sldat"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.TinhTong(ctx_r1.ListDathang, "slnhan"));
  }
}
function XuatnhaptonComponent_ng_template_9_tr_23_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 84)(1, "td", 81);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "td", 85)(4, "a", 86);
    \u0275\u0275text(5);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "td", 81)(7, "span", 87);
    \u0275\u0275text(8);
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(9, "td", 81);
    \u0275\u0275text(10);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(11, "td", 81);
    \u0275\u0275text(12);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(13, "td", 81);
    \u0275\u0275text(14);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(15, "td", 81);
    \u0275\u0275text(16);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(17, "td", 81);
    \u0275\u0275text(18);
    \u0275\u0275pipe(19, "date");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const item_r21 = ctx.$implicit;
    const ctx_r1 = \u0275\u0275nextContext(2);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.title);
    \u0275\u0275advance(2);
    \u0275\u0275propertyInterpolate1("href", "/admin/donhang/", item_r21.id, "", \u0275\u0275sanitizeUrl);
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", item_r21.madonhang, " ");
    \u0275\u0275advance(2);
    \u0275\u0275property("ngClass", \u0275\u0275pureFunction5(14, _c3, item_r21.status === "dadat", item_r21.status === "dagiao", item_r21.status === "danhan", item_r21.status === "hoanthanh", item_r21.status === "huy"));
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", ctx_r1.Trangthaidon[item_r21.status], " ");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.khachhang.name);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.sanpham.sanpham.title);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.sanpham.sldat);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r21.sanpham.slnhan);
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(\u0275\u0275pipeBind2(19, 11, item_r21.createdAt, "dd/MM/yyyy"));
  }
}
function XuatnhaptonComponent_ng_template_9_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "h2", 73);
    \u0275\u0275text(1, "Chi Ti\u1EBFt \u0110\u01A1n H\xE0ng");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(2, "mat-dialog-content", 74)(3, "table", 75)(4, "thead")(5, "tr", 76)(6, "th", 77);
    \u0275\u0275text(7, "Ti\xEAu \u0111\u1EC1");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(8, "th", 77);
    \u0275\u0275text(9, "M\xE3 \u0110\u01A1n");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(10, "th", 77);
    \u0275\u0275text(11, "Tr\u1EA1ng th\xE1i");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(12, "th", 77);
    \u0275\u0275text(13, "Nh\xE0 Cung C\u1EA5p");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "th", 77);
    \u0275\u0275text(15, "T\xEAn S\u1EA3n Ph\u1EA9m");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(16, "th", 77);
    \u0275\u0275text(17, "S\u1ED1 L\u01B0\u1EE3ng \u0110\u1EB7t");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(18, "th", 77);
    \u0275\u0275text(19, "S\u1ED1 L\u01B0\u1EE3ng Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(20, "th", 77);
    \u0275\u0275text(21, "Ng\xE0y");
    \u0275\u0275elementEnd()()();
    \u0275\u0275elementStart(22, "tbody");
    \u0275\u0275template(23, XuatnhaptonComponent_ng_template_9_tr_23_Template, 20, 20, "tr", 78);
    \u0275\u0275elementStart(24, "tr", 79)(25, "td", 80);
    \u0275\u0275text(26, "T\u1ED5ng c\u1ED9ng:");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(27, "td", 81);
    \u0275\u0275text(28);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(29, "td", 81);
    \u0275\u0275text(30);
    \u0275\u0275elementEnd();
    \u0275\u0275element(31, "td", 81);
    \u0275\u0275elementEnd()()()();
    \u0275\u0275elementStart(32, "mat-dialog-actions", 82)(33, "button", 83);
    \u0275\u0275text(34, "\u0110\xF3ng");
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const ctx_r1 = \u0275\u0275nextContext();
    \u0275\u0275advance(23);
    \u0275\u0275property("ngForOf", ctx_r1.ListDonhang);
    \u0275\u0275advance(5);
    \u0275\u0275textInterpolate(ctx_r1.TinhTong(ctx_r1.ListDonhang, "sldat"));
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r1.TinhTong(ctx_r1.ListDonhang, "slnhan"));
  }
}
var XuatnhaptonComponent = class _XuatnhaptonComponent {
  isDexuat = true;
  Detail = {};
  displayedColumns = [
    "STT",
    "title",
    "ngay",
    "actions"
  ];
  ColumnName = {
    STT: "STT",
    title: "Ti\xEAu \u0111\u1EC1 ch\u1ED1t kho",
    ngay: "Ng\xE0y ch\u1ED1t",
    actions: "Thao t\xE1c"
  };
  FilterColumns = JSON.parse(localStorage.getItem("ChotkhoColFilter") || "[]");
  Columns = [];
  isFilter = false;
  paginator;
  sort;
  drawer;
  filterValues = {};
  _PhieukhoService = inject(PhieukhoService);
  _SanphamService = inject(SanphamService);
  _DathangService = inject(DathangService);
  _DonhangService = inject(DonhangService);
  _KhoService = inject(KhoService);
  _ChotkhoService = inject(ChotkhoService);
  _breakpointObserver = inject(BreakpointObserver);
  _router = inject(Router);
  // Update to use chot kho data
  Xuatnhapton = this._ChotkhoService.ListChotkho;
  ListChotkho = this._ChotkhoService.ListChotkho;
  dataSource = new MatTableDataSource([]);
  _snackBar = inject(MatSnackBar);
  CountItem = 0;
  SearchParams = {
    startDate: (0, import_moment.default)().subtract(7, "days").format("YYYY-MM-DD"),
    endDate: (0, import_moment.default)().format("YYYY-MM-DD"),
    page: 1,
    limit: 20
  };
  ListDate = [
    { id: 1, Title: "1 Ng\xE0y", value: "day" },
    { id: 2, Title: "1 Tu\u1EA7n", value: "week" },
    { id: 3, Title: "1 Th\xE1ng", value: "month" },
    { id: 4, Title: "1 N\u0103m", value: "year" }
  ];
  Chonthoigian = "week";
  isSearch = false;
  ListKho = [];
  constructor() {
    this.displayedColumns.forEach((column) => {
      this.filterValues[column] = "";
    });
  }
  createFilter() {
    return (data, filter) => {
      const filterObject = JSON.parse(filter);
      let isMatch = true;
      this.displayedColumns.forEach((column) => {
        if (filterObject[column]) {
          const value = data[column] ? data[column].toString().toLowerCase() : "";
          isMatch = isMatch && value.includes(filterObject[column].toLowerCase());
        }
      });
      return isMatch;
    };
  }
  applyFilter(event) {
    const filterValue = event.target.value;
    this.dataSource.filter = filterValue.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource?.paginator?.firstPage();
    }
  }
  LoadDondathang() {
    return __async(this, null, function* () {
      try {
        const result = yield this._ChotkhoService.getChotkhoByDateRange(this.SearchParams);
        console.log("Chot kho result:", result);
        if (result && result.data) {
          this.ListChotkho.set(result.data);
          this.dataSource.data = result.data;
          this.CountItem = result.total || result.data.length;
          if (this.paginator) {
            this.paginator.length = result.total || result.data.length;
            this.paginator.pageIndex = (result.page || 1) - 1;
            this.paginator.pageSize = result.limit || 20;
          }
        }
        this.dataSource.sort = this.sort;
      } catch (error) {
        console.error("Error loading chot kho data:", error);
        this._snackBar.open("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u ch\u1ED1t kho", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      try {
        const result = yield this._ChotkhoService.getChotkhoByDateRange(this.SearchParams);
        console.log("Initial chot kho result:", result);
        if (result && result.data) {
          this.ListChotkho.set(result.data);
          this.dataSource.data = result.data;
          this.CountItem = result.total || result.data.length;
        }
        this.dataSource.paginator = this.paginator;
        this.dataSource.sort = this.sort;
        this.initializeColumns();
        this.setupDrawer();
        if (this.paginator) {
          this.paginator._intl.itemsPerPageLabel = "S\u1ED1 l\u01B0\u1EE3ng 1 trang";
          this.paginator._intl.nextPageLabel = "Ti\u1EBFp Theo";
          this.paginator._intl.previousPageLabel = "V\u1EC1 Tr\u01B0\u1EDBc";
          this.paginator._intl.firstPageLabel = "Trang \u0110\u1EA7u";
          this.paginator._intl.lastPageLabel = "Trang Cu\u1ED1i";
        }
      } catch (error) {
        console.error("Error in ngOnInit:", error);
        this._snackBar.open("L\u1ED7i khi kh\u1EDFi t\u1EA1o d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  createchotkho() {
    this.drawer.open();
    this._router.navigate(["admin/xuatnhapton", "new"]);
  }
  // Method to view chot kho details
  viewChotkhoDetail(row) {
    this.drawer.open();
    window.location.href = `/admin/xuatnhapton/${(0, import_moment.default)(row.ngay).format("YYYY-MM-DD")}`;
  }
  // Method to edit chot kho
  editChotkho(row) {
    this.drawer.open();
    window.location.href = `/admin/xuatnhapton/${(0, import_moment.default)(row.ngay).format("YYYY-MM-DD")}`;
  }
  // Method to delete chot kho
  deleteChotkho(row) {
    return __async(this, null, function* () {
      if (confirm("B\u1EA1n c\xF3 ch\u1EAFc ch\u1EAFn mu\u1ED1n x\xF3a ch\u1ED1t kho n\xE0y?")) {
        try {
          yield this._ChotkhoService.DeleteChotkho(row);
          this._snackBar.open("X\xF3a ch\u1ED1t kho th\xE0nh c\xF4ng", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-success"]
          });
          yield this.LoadDondathang();
        } catch (error) {
          console.error("Error deleting chot kho:", error);
          this._snackBar.open("L\u1ED7i khi x\xF3a ch\u1ED1t kho", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-error"]
          });
        }
      }
    });
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
      localStorage.setItem("ChotkhoColFilter", JSON.stringify(this.FilterColumns));
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
        if (this.paginator) {
          this.paginator.hidePageSize = true;
        }
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
  updateDisplayedColumns() {
    this.displayedColumns = this.FilterColumns.filter((v) => v.isShow).map((item) => item.key);
    this.ColumnName = this.FilterColumns.reduce((obj, item) => {
      if (item.isShow)
        obj[item.key] = item.value;
      return obj;
    }, {});
    localStorage.setItem("ChotkhoColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  FilterHederColumn(list, column) {
    const uniqueList = list.filter((obj, index, self) => index === self.findIndex((t) => t[column] === obj[column]));
    return uniqueList;
  }
  doFilterHederColumn(event, column) {
    const query = event.target.value.toLowerCase();
    console.log(query);
    console.log(column);
    this.dataSource.filteredData = this.ListChotkho().filter((v) => removeVietnameseAccents(v[column]?.toString() || "").includes(query) || (v[column]?.toString() || "").toLowerCase().includes(query));
  }
  trackByFn(index, item) {
    return item.id;
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
        this.ListFilter = this.ListFilter.filter((v2) => v2.id !== v2.id);
      } else {
        this.ListFilter.push(v);
      }
    });
  }
  ResetFilter() {
    this.ListFilter = this.ListChotkho();
    this.dataSource.data = this.ListChotkho();
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.ListChotkho().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
    this.dataSource.paginator = this.paginator;
    this.dataSource.sort = this.sort;
    menu.closeMenu();
  }
  ExportExcel(data, title) {
    return __async(this, null, function* () {
      yield this._SanphamService.getAllSanpham();
      const SP = this._SanphamService.ListSanpham().map((v) => ({
        subtitle: v.subtitle,
        masp: v.masp,
        title: v.title,
        dvt: v.dvt
      }));
      const XNT = this.Xuatnhapton().map((v) => ({
        masp: v.masp,
        title: v.title,
        dvt: v.dvt,
        slton: v.slton
      }));
      writeExcelMultiple({ SP, XNT }, title);
    });
  }
  ImporExcel(event) {
    return __async(this, null, function* () {
      const files = Array.from(event.target.files);
      const data = yield readExcelFileNoWorker(files[0], "XNT");
      const phieuNhapDetails = [];
      const phieuXuatDetails = [];
      data.forEach((v) => {
        const exitItem = this.Xuatnhapton().find((item) => item.masp === v.masp);
        if (exitItem) {
          if (v.slton > exitItem.slton) {
            phieuNhapDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: v.slton - exitItem.slton
              // thêm các trường cần thiết
            });
          } else if (v.slton < exitItem.slton) {
            phieuXuatDetails.push({
              sanphamId: this._SanphamService.ListSanpham().find((item) => item.masp === v.masp).id,
              soluong: exitItem.slton - v.slton
              // thêm các trường cần thiết
            });
          }
        }
      });
      if (phieuNhapDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${(0, import_moment.default)().format("DD/MM/YYYY ")}`,
          type: "nhap",
          sanpham: phieuNhapDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${(0, import_moment.default)().format("HH:mm:ss DD/MM/YYYY ")}`,
          ngay: (0, import_moment.default)()
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._PhieukhoService.CreatePhieukho({
          title: `\u0110i\u1EC1u Ch\u1EC9nh Kho Ng\xE0y ${(0, import_moment.default)().format("DD/MM/YYYY ")}`,
          type: "xuat",
          sanpham: phieuXuatDetails,
          ghichu: `C\u1EADp nh\u1EADt t\u1ED3n kho l\xFAc ${(0, import_moment.default)().format("HH:mm:ss DD/MM/YYYY ")}`,
          ngay: (0, import_moment.default)()
        });
      }
      if (phieuNhapDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh nh\u1EADp kho v\u1EDBi ${phieuNhapDetails.length} s\u1EA3n ph\u1EA9m`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      }
      if (phieuXuatDetails.length > 0) {
        this._snackBar.open(`\u0110i\u1EC1u ch\u1EC9nh xu\u1EA5t kho v\u1EDBi ${phieuXuatDetails.length} s\u1EA3n ph\u1EA9m`, "", {
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
    });
  }
  _dialog = inject(MatDialog);
  Trangthaidon = TrangThaiDon;
  ListDathang = [];
  ListDonhang = [];
  XemDathang(row, template) {
    return __async(this, null, function* () {
      this.ListDathang = yield this._DathangService.findbysanpham(row.sanphamId);
      console.log(this.ListDathang);
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  XemDonhang(row, template) {
    return __async(this, null, function* () {
      this.ListDonhang = yield this._DonhangService.findbysanpham(row.sanphamId);
      console.log(this.ListDonhang);
      const dialogDeleteRef = this._dialog.open(template, {
        hasBackdrop: true,
        disableClose: true
      });
      dialogDeleteRef.afterClosed().subscribe((result) => {
        if (result === "true") {
        }
      });
    });
  }
  TinhTong(items, fieldTong) {
    return items?.reduce((sum, item) => sum + (Number(item?.sanpham[fieldTong]) || 0), 0) || 0;
  }
  static \u0275fac = function XuatnhaptonComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _XuatnhaptonComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _XuatnhaptonComponent, selectors: [["app-xuatnhapton"]], viewQuery: function XuatnhaptonComponent_Query(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275viewQuery(MatPaginator, 5);
      \u0275\u0275viewQuery(MatSort, 5);
      \u0275\u0275viewQuery(_c02, 7);
    }
    if (rf & 2) {
      let _t;
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.paginator = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.sort = _t.first);
      \u0275\u0275queryRefresh(_t = \u0275\u0275loadQuery()) && (ctx.drawer = _t.first);
    }
  }, decls: 11, vars: 2, consts: [["drawer", ""], ["DathangDialog", ""], ["DonhangDialog", ""], ["menu", "matMenu"], ["pickerBatdau", ""], ["pickerKetthuc", ""], ["menuTrigger", "matMenuTrigger"], ["filterMenu", "matMenu"], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-12", "w-full", "p-2"], [3, "DexuatEmit"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], [1, "cursor-pointer", "p-2", "rounded-lg", "border", "hover:bg-slate-50", 3, "click"], ["href", "/admin/xuatnhapton/new", 1, "cursor-pointer", "p-2", "rounded-lg", "border", "hover:bg-slate-50"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", "aria-label", "Example icon-button with a menu", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], [1, "flex", "flex-row", "gap-2", "items-center", "w-full"], [3, "appearance", "subscriptSizing"], ["matInput", "", 3, "ngModelChange", "matDatepicker", "ngModel", "ngModelOptions"], ["matIconSuffix", "", 3, "for"], ["matTooltip", "T\xECm Ki\u1EBFm", "color", "primary", "mat-icon-button", "", 3, "click"], ["color", "primary", "mat-icon-button", "", 3, "click"], [1, "w-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "excelstyle", "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef"], ["mat-row", "", "class", "hover:bg-gray-50 cursor-pointer", 3, "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row", 4, "matNoDataRow"], [3, "pageSizeOptions", "showFirstLastButtons"], ["mat-menu-item", "", 3, "click"], ["class", "whitespace-nowrap", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], ["mat-cell", "", 4, "matCellDef"], ["mat-header-cell", "", "mat-sort-header", "", 1, "whitespace-nowrap"], [1, "max-w-40", "line-clamp-4", "me-4"], [1, "z-10", "material-symbols-outlined", "text-gray-500", 3, "matMenuTriggerFor"], [1, "cursor-pointer", "flex", "flex-col", "space-y-4", "p-3", 3, "click"], [1, "relative", "w-full"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "text-xs", "text-blue-600", "underline", 3, "click"], [1, "w-full", "flex", "flex-col", "space-y-2", "max-h-44", "overflow-auto"], ["class", "flex flex-row space-x-2 items-center p-2 rounded-lg hover:bg-slate-100", 3, "click", 4, "ngFor", "ngForOf", "ngForTrackBy"], [1, "flex", "flex-row", "space-x-2", "items-end", "justify-end"], ["mat-flat-button", "", "color", "warn", 3, "click"], ["mat-flat-button", "", "color", "primary", 3, "click"], [1, "flex", "flex-row", "space-x-2", "items-center", "p-2", "rounded-lg", "hover:bg-slate-100", 3, "click"], ["class", "material-symbols-outlined text-blue-600", 4, "ngIf"], [1, "material-symbols-outlined", "text-blue-600"], ["mat-cell", ""], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-medium", "text-gray-900"], [1, "max-w-40", "line-clamp-4", "text-sm", "text-gray-600"], [1, "flex", "space-x-2"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Xem chi ti\u1EBFt", 3, "click"], ["mat-icon-button", "", "color", "accent", "matTooltip", "Ch\u1EC9nh s\u1EEDa", 3, "click"], ["mat-icon-button", "", "color", "warn", "matTooltip", "X\xF3a", 3, "click"], ["mat-header-row", ""], ["mat-row", "", 1, "hover:bg-gray-50", "cursor-pointer", 3, "click"], [1, "mat-row"], [1, "mat-cell", "p-4"], [1, "text-center", "py-8"], [1, "text-gray-400", "text-4xl"], [1, "mt-2", "text-gray-500"], [1, "text-sm", "text-gray-400"], ["mat-dialog-title", ""], [1, "mat-typography"], [1, "w-full", "border-collapse", "border", "border-gray-300"], [1, "bg-gray-100"], [1, "border", "border-gray-300", "px-4", "py-2", "text-left"], ["class", "hover:bg-gray-50", 4, "ngFor", "ngForOf"], [1, "bg-gray-100", "font-bold"], ["colspan", "5", 1, "border", "border-gray-300", "px-4", "py-2"], [1, "border", "border-gray-300", "px-4", "py-2"], ["align", "end"], ["mat-button", "", "mat-dialog-close", ""], [1, "hover:bg-gray-50"], [1, "border", "px-4", "py-2", "font-bold"], ["target", "_blank", 1, "text-blue-500", 3, "href"], [1, "max-w-40", "line-clamp-4", "font-bold", 3, "ngClass"]], template: function XuatnhaptonComponent_Template(rf, ctx) {
    if (rf & 1) {
      \u0275\u0275elementStart(0, "mat-drawer-container", 8)(1, "mat-drawer", 9, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 10);
      \u0275\u0275template(5, XuatnhaptonComponent_Conditional_5_Template, 1, 0, "app-detaildexuat")(6, XuatnhaptonComponent_Conditional_6_Template, 52, 21);
      \u0275\u0275elementEnd()();
      \u0275\u0275template(7, XuatnhaptonComponent_ng_template_7_Template, 35, 3, "ng-template", null, 1, \u0275\u0275templateRefExtractor)(9, XuatnhaptonComponent_ng_template_9_Template, 35, 3, "ng-template", null, 2, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(4);
      \u0275\u0275conditional(ctx.isDexuat ? 5 : 6);
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
    MatPaginator,
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
    NgClass,
    NgForOf,
    NgIf,
    DatePipe,
    FormsModule,
    DefaultValueAccessor,
    NgControlStatus,
    NgModel,
    MatTooltipModule,
    MatTooltip,
    MatDatepickerModule,
    MatDatepicker,
    MatDatepickerInput,
    MatDatepickerToggle,
    MatDialogModule,
    MatDialogClose,
    MatDialogTitle,
    MatDialogActions,
    MatDialogContent,
    DetaildexuatComponent
  ], encapsulation: 2 });
};
__decorate([
  memoize()
], XuatnhaptonComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], XuatnhaptonComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(XuatnhaptonComponent, { className: "XuatnhaptonComponent", filePath: "src/app/admin/xuatnhapton/xuatnhapton.component.ts", lineNumber: 57 });
})();

export {
  ChotkhoService,
  XuatnhaptonComponent
};
//# sourceMappingURL=chunk-GEUJGEES.js.map
