import './polyfills.server.mjs';
import {
  SharedSocketService
} from "./chunk-SJGKJCZS.mjs";
import {
  Debounce,
  memoize
} from "./chunk-2FMT7VQU.mjs";
import {
  SearchfilterComponent
} from "./chunk-T2GSXKIR.mjs";
import {
  GoogleSheetService
} from "./chunk-VO5ZZWXY.mjs";
import {
  MatPaginator,
  MatPaginatorModule
} from "./chunk-NV7NCVB6.mjs";
import {
  MatSort,
  MatSortHeader,
  MatSortModule
} from "./chunk-QGE5RGZP.mjs";
import {
  readExcelFile,
  writeExcelFile
} from "./chunk-XQWRZCE6.mjs";
import {
  ErrorLogService
} from "./chunk-SRFBCIVI.mjs";
import {
  ConvertDriveData
} from "./chunk-OLFDOXYK.mjs";
import {
  removeVietnameseAccents
} from "./chunk-RGTCKLO2.mjs";
import {
  MatDrawer,
  MatDrawerContainer,
  MatSidenavModule
} from "./chunk-BKIOO2IQ.mjs";
import {
  MatMenu,
  MatMenuItem,
  MatMenuModule,
  MatMenuTrigger
} from "./chunk-UASPM37G.mjs";
import {
  Router,
  RouterOutlet
} from "./chunk-XXHMETOB.mjs";
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
} from "./chunk-LXPCAAVO.mjs";
import {
  GraphqlService
} from "./chunk-MECBLMI6.mjs";
import {
  MatProgressSpinnerModule
} from "./chunk-XEJ7KODZ.mjs";
import {
  StorageService
} from "./chunk-2BTDEHR6.mjs";
import {
  environment
} from "./chunk-BKGWM7TB.mjs";
import {
  MatTooltip,
  MatTooltipModule
} from "./chunk-G5Q3EA6K.mjs";
import {
  MatDialog,
  MatDialogClose,
  MatDialogContent,
  MatDialogModule
} from "./chunk-AJSGP2QM.mjs";
import {
  MatSelectModule
} from "./chunk-WVX3EDL3.mjs";
import {
  MatInput,
  MatInputModule
} from "./chunk-AQETVGJS.mjs";
import {
  DefaultValueAccessor,
  FormsModule,
  MatFormField,
  MatFormFieldModule,
  MatLabel,
  MatPrefix,
  NgControlStatus,
  NgModel
} from "./chunk-5444DBJD.mjs";
import {
  MatIcon,
  MatIconModule
} from "./chunk-DV7552T6.mjs";
import {
  MatSnackBar
} from "./chunk-WUOSISWE.mjs";
import {
  MatButton,
  MatButtonModule,
  MatIconButton
} from "./chunk-7RV546X3.mjs";
import {
  BreakpointObserver,
  Breakpoints
} from "./chunk-IKKFEUUM.mjs";
import {
  CommonModule,
  DatePipe,
  NgIf
} from "./chunk-WGGH2PUJ.mjs";
import {
  computed,
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
  ɵɵtextInterpolate3,
  ɵɵtwoWayBindingSet,
  ɵɵtwoWayListener,
  ɵɵtwoWayProperty,
  ɵɵviewQuery
} from "./chunk-ADMXANIA.mjs";
import {
  __decorate
} from "./chunk-QS2IQGEQ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/khachhang/khachhang-graphql.service.ts
var KhachhangGraphqlService = class _KhachhangGraphqlService {
  _GraphqlService = inject(GraphqlService);
  _StorageService = inject(StorageService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _ErrorLogService = inject(ErrorLogService);
  _sharedSocketService = inject(SharedSocketService);
  socket;
  // Signals for reactive state management
  ListKhachhang = signal([]);
  DetailKhachhang = signal({});
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  khachhangId = signal(null);
  loading = signal(false);
  error = signal(null);
  constructor() {
    this.socket = this._sharedSocketService.getSocket();
    this.listenKhachhangUpdates();
  }
  setKhachhangId(id) {
    this.khachhangId.set(id);
  }
  /**
   * Lấy toàn bộ danh sách khách hàng (không pagination)
   */
  getAllKhachhang() {
    return __async(this, arguments, function* (searchParam = {}) {
      try {
        this.loading.set(true);
        this.error.set(null);
        const select = {
          id: true,
          makh: true,
          name: true,
          diachi: true,
          quan: true,
          email: true,
          sdt: true,
          mst: true,
          gionhanhang: true,
          loaikh: true,
          ghichu: true,
          isActive: true,
          createdAt: true,
          banggiaId: true,
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true
            }
          }
        };
        const where = {
          isActive: true
          // Chỉ lấy khách hàng active
        };
        if (searchParam.subtitle) {
          where.OR = [
            { name: { contains: searchParam.subtitle, mode: "insensitive" } },
            { makh: { contains: searchParam.subtitle, mode: "insensitive" } },
            { email: { contains: searchParam.subtitle, mode: "insensitive" } },
            { sdt: { contains: searchParam.subtitle, mode: "insensitive" } }
          ];
        }
        if (searchParam.loaikh) {
          where.loaikh = searchParam.loaikh;
        }
        if (searchParam.banggiaId) {
          where.banggiaId = searchParam.banggiaId;
        }
        const orderBy = { createdAt: "desc" };
        const result = yield this._GraphqlService.findMany("khachhang", {
          where,
          orderBy,
          select
        });
        const totalCount = result?.length || 0;
        this.ListKhachhang.set(result || []);
        this.total.set(totalCount);
        this.totalPages.set(1);
        this.page.set(1);
        return result;
      } catch (error) {
        console.error("L\u1ED7i khi l\u1EA5y danh s\xE1ch kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 t\u1EA3i danh s\xE1ch kh\xE1ch h\xE0ng");
        this._ErrorLogService.logError("getAllKhachhang", error);
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Tìm kiếm khách hàng (không pagination)
   */
  getKhachhangBy(searchParam) {
    return __async(this, null, function* () {
      try {
        return yield this.getAllKhachhang(searchParam);
      } catch (error) {
        console.error("L\u1ED7i t\xECm ki\u1EBFm kh\xE1ch h\xE0ng:", error);
        throw error;
      }
    });
  }
  /**
   * Lấy chi tiết khách hàng với đầy đủ thông tin liên quan
   */
  getKhachhangById(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const include = {
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true,
              type: true,
              status: true
            }
          },
          nhomkhachhang: {
            select: {
              id: true,
              name: true,
              description: true
            }
          }
        };
        const khachhang = yield this._GraphqlService.findUnique("khachhang", { id }, { include });
        console.log(khachhang);
        if (khachhang) {
          this.DetailKhachhang.set(khachhang);
          this.setKhachhangId(id);
        }
        return khachhang;
      } catch (error) {
        console.error("L\u1ED7i khi l\u1EA5y chi ti\u1EBFt kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 t\u1EA3i th\xF4ng tin kh\xE1ch h\xE0ng");
        this._ErrorLogService.logError("getKhachhangById", error);
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Tạo khách hàng mới với GraphQL
   */
  createKhachhang(dulieu) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const createData = {
          makh: dulieu.makh || (yield this.generateMaKhachHang(dulieu.loaikh)),
          subtitle: dulieu.subtitle || "",
          tenfile: dulieu.tenfile || "",
          name: dulieu.name,
          diachi: dulieu.diachi || "",
          quan: dulieu.quan || "",
          email: dulieu.email || "",
          sdt: dulieu.sdt || "",
          mst: dulieu.mst || "",
          gionhanhang: dulieu.gionhanhang || "",
          machuyen: dulieu.machuyen || "",
          loaikh: dulieu.loaikh || "banle",
          ghichu: dulieu.ghichu || "",
          isActive: dulieu.isActive !== false,
          isshowvat: dulieu.isshowvat,
          hiengia: dulieu.hiengia,
          istitle2: dulieu.istitle2,
          banggiaId: dulieu.banggiaId || null
        };
        if (dulieu.nhomkhachhangIds?.length > 0) {
          createData.nhomkhachhang = {
            connect: dulieu.nhomkhachhangIds.map((id) => ({ id }))
          };
        }
        const include = {
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true
            }
          },
          nhomkhachhang: {
            select: {
              id: true,
              name: true
            }
          }
        };
        const newKhachhang = yield this._GraphqlService.createOne("khachhang", createData, { include });
        this.khachhangId.set(newKhachhang.id);
        this.DetailKhachhang.set(newKhachhang);
        yield this.getAllKhachhang();
        this._snackBar.open("T\u1EA1o kh\xE1ch h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return newKhachhang;
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 t\u1EA1o kh\xE1ch h\xE0ng");
        this._snackBar.open("L\u1ED7i t\u1EA1o kh\xE1ch h\xE0ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Cập nhật khách hàng với GraphQL
   */
  updateKhachhang(id, dulieu) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const updateData = {
          name: dulieu.name,
          subtitle: dulieu.subtitle,
          tenfile: dulieu.tenfile,
          diachi: dulieu.diachi,
          quan: dulieu.quan,
          email: dulieu.email,
          sdt: dulieu.sdt,
          mst: dulieu.mst,
          gionhanhang: dulieu.gionhanhang,
          machuyen: dulieu.machuyen,
          loaikh: dulieu.loaikh,
          ghichu: dulieu.ghichu,
          isActive: dulieu.isActive,
          isshowvat: dulieu.isshowvat,
          hiengia: dulieu.hiengia,
          istitle2: dulieu.istitle2,
          banggiaId: dulieu.banggiaId
        };
        if (dulieu.nhomkhachhangIds !== void 0) {
          updateData.nhomkhachhang = {
            set: (dulieu.nhomkhachhangIds || []).map((nhomId) => ({ id: nhomId }))
          };
        }
        const include = {
          banggia: {
            select: {
              id: true,
              title: true,
              mabanggia: true
            }
          },
          nhomkhachhang: {
            select: {
              id: true,
              name: true
            }
          }
        };
        const updatedKhachhang = yield this._GraphqlService.updateOne("khachhang", { id }, updateData, { include });
        this.DetailKhachhang.set(updatedKhachhang);
        yield this.getAllKhachhang();
        this._snackBar.open("C\u1EADp nh\u1EADt kh\xE1ch h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return updatedKhachhang;
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 c\u1EADp nh\u1EADt kh\xE1ch h\xE0ng");
        this._snackBar.open("L\u1ED7i c\u1EADp nh\u1EADt kh\xE1ch h\xE0ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Xóa khách hàng với GraphQL
   */
  deleteKhachhang(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const deletedKhachhang = yield this._GraphqlService.updateOne("khachhang", { id }, { isActive: false });
        yield this.getAllKhachhang();
        this._snackBar.open("X\xF3a kh\xE1ch h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return deletedKhachhang;
      } catch (error) {
        console.error("L\u1ED7i x\xF3a kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 x\xF3a kh\xE1ch h\xE0ng");
        this._snackBar.open("L\u1ED7i x\xF3a kh\xE1ch h\xE0ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Import khách hàng với batch operation và xử lý trùng lặp mã
   */
  importKhachhang(dulieu) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const customersWithIndex = dulieu.map((item, index) => __spreadProps(__spreadValues({}, item), { index }));
        const customersNeedingCodes = customersWithIndex.filter((item) => !item.makh);
        const customersWithCodes = customersWithIndex.filter((item) => item.makh);
        let generatedCodeMap = {};
        if (customersNeedingCodes.length > 0) {
          console.log(`Generating codes for ${customersNeedingCodes.length} customers...`);
          generatedCodeMap = yield this.generateBatchMaKhachHang(customersNeedingCodes);
        }
        const batchData = customersWithIndex.map((item) => ({
          makh: item.makh || generatedCodeMap[item.index] || `FALLBACK-${item.index}-${Date.now()}`,
          name: item.name,
          diachi: item.diachi || "",
          quan: item.quan || "",
          email: item.email || "",
          sdt: item.sdt || "",
          mst: item.mst || "",
          gionhanhang: item.gionhanhang || "",
          machuyen: item.machuyen || "",
          loaikh: item.loaikh || "banle",
          ghichu: item.ghichu || "",
          isActive: item.isActive !== false,
          banggiaId: item.banggiaId || null
        }));
        console.log(`Creating ${batchData.length} customers...`);
        const result = yield this._GraphqlService.batchCreate("khachhang", batchData);
        yield this.getAllKhachhang();
        this._snackBar.open(`Import th\xE0nh c\xF4ng ${result.length} kh\xE1ch h\xE0ng`, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        return result;
      } catch (error) {
        console.error("L\u1ED7i import kh\xE1ch h\xE0ng:", error);
        this.error.set("Kh\xF4ng th\u1EC3 import kh\xE1ch h\xE0ng");
        this._snackBar.open("L\u1ED7i import kh\xE1ch h\xE0ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Thay đổi trang (không cần thiết vì đã bỏ pagination)
   * Giữ lại để tương thích với code cũ
   */
  changePage(newPage, pageSize) {
    return __async(this, null, function* () {
      console.log("Pagination disabled - all data loaded");
      return this.ListKhachhang();
    });
  }
  /**
   * Socket listener cho real-time updates
   */
  listenKhachhangUpdates() {
    if (this.socket) {
      this.socket.on("khachhang:created", (data) => {
        const current = this.ListKhachhang();
        this.ListKhachhang.set([data, ...current]);
        this.total.set(this.total() + 1);
      });
      this.socket.on("khachhang:updated", (data) => {
        const current = this.ListKhachhang();
        const index = current.findIndex((item) => item.id === data.id);
        if (index !== -1) {
          current[index] = data;
          this.ListKhachhang.set([...current]);
        }
        if (this.khachhangId() === data.id) {
          this.DetailKhachhang.set(data);
        }
      });
      this.socket.on("khachhang:deleted", (data) => {
        const current = this.ListKhachhang();
        const filtered = current.filter((item) => item.id !== data.id);
        this.ListKhachhang.set(filtered);
        this.total.set(this.total() - 1);
      });
    }
  }
  /**
   * Generate mã khách hàng tự động theo logic backend với xử lý trùng lặp
   */
  generateMaKhachHang(loaikh = "khachle", maxRetries = 10) {
    return __async(this, null, function* () {
      const prefix = loaikh === "khachsi" ? "TG-KS" : "TG-KL";
      let attempts = 0;
      while (attempts < maxRetries) {
        try {
          const latestRecords = yield this._GraphqlService.findMany("khachhang", {
            where: {
              makh: {
                startsWith: prefix
              }
            },
            orderBy: { makh: "desc" },
            select: { makh: true },
            take: 1
          });
          let nextNumber = 1;
          if (latestRecords && latestRecords.length > 0 && latestRecords[0].makh) {
            const lastNumber = parseInt(latestRecords[0].makh.slice(prefix.length), 10);
            if (!isNaN(lastNumber)) {
              nextNumber = lastNumber + 1;
            }
          }
          nextNumber += attempts;
          const newMakh = `${prefix}${nextNumber.toString().padStart(5, "0")}`;
          const existingCustomer = yield this._GraphqlService.findMany("khachhang", {
            where: { makh: newMakh },
            select: { id: true },
            take: 1
          });
          if (!existingCustomer || existingCustomer.length === 0) {
            console.log(`Generated unique customer code: ${newMakh} (attempt ${attempts + 1})`);
            return newMakh;
          }
          console.warn(`Customer code ${newMakh} already exists, retrying... (attempt ${attempts + 1})`);
          attempts++;
        } catch (error) {
          console.error(`Error generating customer code (attempt ${attempts + 1}):`, error);
          attempts++;
          if (attempts >= maxRetries) {
            break;
          }
          yield new Promise((resolve) => setTimeout(resolve, 100 * attempts));
        }
      }
      console.warn("Max retries reached, using fallback generation method");
      const timestamp = Date.now().toString(36);
      const random = Math.random().toString(36).substr(2, 3);
      const fallbackCode = `${prefix}${timestamp}${random}`.toUpperCase();
      try {
        const existingFallback = yield this._GraphqlService.findMany("khachhang", {
          where: { makh: fallbackCode },
          select: { id: true },
          take: 1
        });
        if (existingFallback && existingFallback.length > 0) {
          const uniqueCode = `${prefix}${timestamp}${random}${Date.now().toString(36).slice(-2)}`.toUpperCase();
          console.warn(`Fallback code collision, using: ${uniqueCode}`);
          return uniqueCode;
        }
        return fallbackCode;
      } catch (error) {
        const uniqueCode = `${prefix}${timestamp}${random}${Date.now().toString(36).slice(-2)}`.toUpperCase();
        console.error("Error checking fallback code, using ultimate fallback:", uniqueCode);
        return uniqueCode;
      }
    });
  }
  /**
   * Batch generate unique customer codes for import operations
   */
  generateBatchMaKhachHang(customers) {
    return __async(this, null, function* () {
      const codeMap = {};
      const generatedCodes = /* @__PURE__ */ new Set();
      try {
        const khachsiCustomers = customers.filter((c) => c.loaikh === "khachsi");
        const khachleCustomers = customers.filter((c) => c.loaikh !== "khachsi");
        const [ksRecords, klRecords] = yield Promise.all([
          this._GraphqlService.findMany("khachhang", {
            where: { makh: { startsWith: "TG-KS" } },
            orderBy: { makh: "desc" },
            select: { makh: true },
            take: 1
          }),
          this._GraphqlService.findMany("khachhang", {
            where: { makh: { startsWith: "TG-KL" } },
            orderBy: { makh: "desc" },
            select: { makh: true },
            take: 1
          })
        ]);
        let ksNextNumber = 1;
        let klNextNumber = 1;
        if (ksRecords?.[0]?.makh) {
          const lastKsNumber = parseInt(ksRecords[0].makh.slice(5), 10);
          ksNextNumber = isNaN(lastKsNumber) ? 1 : lastKsNumber + 1;
        }
        if (klRecords?.[0]?.makh) {
          const lastKlNumber = parseInt(klRecords[0].makh.slice(5), 10);
          klNextNumber = isNaN(lastKlNumber) ? 1 : lastKlNumber + 1;
        }
        for (let i = 0; i < khachsiCustomers.length; i++) {
          const customer = khachsiCustomers[i];
          let attempts = 0;
          let code;
          do {
            code = `TG-KS${(ksNextNumber + i + attempts).toString().padStart(5, "0")}`;
            attempts++;
          } while (generatedCodes.has(code) && attempts < 100);
          generatedCodes.add(code);
          codeMap[customer.index || i] = code;
        }
        for (let i = 0; i < khachleCustomers.length; i++) {
          const customer = khachleCustomers[i];
          let attempts = 0;
          let code;
          do {
            code = `TG-KL${(klNextNumber + i + attempts).toString().padStart(5, "0")}`;
            attempts++;
          } while (generatedCodes.has(code) && attempts < 100);
          generatedCodes.add(code);
          codeMap[customer.index || i + khachsiCustomers.length] = code;
        }
        console.log(`Generated ${Object.keys(codeMap).length} unique customer codes for batch import`);
        return codeMap;
      } catch (error) {
        console.error("Error in batch code generation, falling back to individual generation:", error);
        for (let i = 0; i < customers.length; i++) {
          const customer = customers[i];
          try {
            const code = yield this.generateMaKhachHang(customer.loaikh);
            codeMap[customer.index || i] = code;
          } catch (err) {
            console.error(`Failed to generate code for customer ${i}:`, err);
            const timestamp = Date.now().toString(36);
            const random = Math.random().toString(36).substr(2, 3);
            const prefix = customer.loaikh === "khachsi" ? "TG-KS" : "TG-KL";
            codeMap[customer.index || i] = `${prefix}${timestamp}${random}${i}`.toUpperCase();
          }
        }
        return codeMap;
      }
    });
  }
  /**
   * Lấy các mã đã được cập nhật (legacy support)
   */
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      try {
        const result = yield this._GraphqlService.findMany("khachhang", {
          where: { isActive: true },
          select: { id: true, makh: true },
          orderBy: { updatedAt: "desc" },
          take: 100
        });
        return result;
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y updated code IDs:", error);
        return [];
      }
    });
  }
  /**
   * Clear cache và reset state
   */
  clearCache() {
    this.ListKhachhang.set([]);
    this.DetailKhachhang.set({});
    this.khachhangId.set(null);
    this.error.set(null);
    this.page.set(1);
  }
  static \u0275fac = function KhachhangGraphqlService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _KhachhangGraphqlService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _KhachhangGraphqlService, factory: _KhachhangGraphqlService.\u0275fac, providedIn: "root" });
};

// src/app/admin/khachhang/listkhachhang/listkhachhang.component.ts
var _c0 = ["drawer"];
var _c1 = () => [25, 50, 100, 200, 500];
var _c2 = () => ({ standalone: true });
var _forTrack0 = ($index, $item) => $item.key;
function ListKhachhangComponent_button_18_Template(rf, ctx) {
  if (rf & 1) {
    const _r2 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 48);
    \u0275\u0275listener("click", function ListKhachhangComponent_button_18_Template_button_click_0_listener() {
      \u0275\u0275restoreView(_r2);
      const ctx_r2 = \u0275\u0275nextContext();
      const DeleteDialog_r4 = \u0275\u0275reference(81);
      return \u0275\u0275resetView(ctx_r2.openDeleteDialog(DeleteDialog_r4));
    });
    \u0275\u0275elementStart(1, "mat-icon");
    \u0275\u0275text(2, "delete");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "span", 19);
    \u0275\u0275text(4, "Xo\xE1");
    \u0275\u0275elementEnd()();
  }
}
function ListKhachhangComponent_For_32_Template(rf, ctx) {
  if (rf & 1) {
    const _r5 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "button", 49);
    \u0275\u0275listener("click", function ListKhachhangComponent_For_32_Template_button_click_0_listener($event) {
      const item_r6 = \u0275\u0275restoreView(_r5).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      ctx_r2.toggleColumn(item_r6);
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
    const item_r6 = ctx.$implicit;
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.isShow ? "check_box" : "check_box_outline_blank");
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(item_r6.value);
  }
}
function ListKhachhangComponent_For_42_Conditional_1_th_0_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "th", 50)(1, "span");
    \u0275\u0275text(2);
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate(ctx_r2.ColumnName[column_r7]);
  }
}
function ListKhachhangComponent_For_42_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListKhachhangComponent_For_42_Conditional_1_th_0_Template, 3, 1, "th", 53);
  }
}
function ListKhachhangComponent_For_42_Conditional_2_th_0_Template(rf, ctx) {
  if (rf & 1) {
    const _r8 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "th", 51)(1, "span", 55);
    \u0275\u0275text(2);
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(3, "app-searchfilter", 56);
    \u0275\u0275listener("OutFilter", function ListKhachhangComponent_For_42_Conditional_2_th_0_Template_app_searchfilter_OutFilter_3_listener($event) {
      \u0275\u0275restoreView(_r8);
      const ctx_r2 = \u0275\u0275nextContext(3);
      return \u0275\u0275resetView(ctx_r2.onOutFilter($event));
    });
    \u0275\u0275elementEnd()();
  }
  if (rf & 2) {
    const column_r7 = \u0275\u0275nextContext(2).$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(2);
    \u0275\u0275textInterpolate1(" ", ctx_r2.ColumnName[column_r7], " ");
    \u0275\u0275advance();
    \u0275\u0275property("icon", "filter_alt")("ListItem", ctx_r2.Listkhachhang())("fieldsearch", column_r7)("ListFilter", ctx_r2.ListFilter)("filterItem", ctx_r2.FilterHederColumn(ctx_r2.dataSource.filteredData, column_r7));
  }
}
function ListKhachhangComponent_For_42_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275template(0, ListKhachhangComponent_For_42_Conditional_2_th_0_Template, 4, 6, "th", 54);
  }
}
function ListKhachhangComponent_For_42_td_3_Case_1_Template(rf, ctx) {
  if (rf & 1) {
    const _r9 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "span", 61);
    \u0275\u0275listener("click", function ListKhachhangComponent_For_42_td_3_Case_1_Template_span_click_0_listener() {
      \u0275\u0275restoreView(_r9);
      const row_r10 = \u0275\u0275nextContext().$implicit;
      const ctx_r2 = \u0275\u0275nextContext(2);
      return \u0275\u0275resetView(ctx_r2.goToDetail(row_r10));
    });
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 59);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const idx_r11 = \u0275\u0275nextContext().index;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", idx_r11 + 1, " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r7], "dd/MM/yyyy"), " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_4_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7] == null ? null : row_r10[column_r7].mabanggia, " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_5_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], "% ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_6_Conditional_1_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 62);
    \u0275\u0275text(1, "check_circle");
    \u0275\u0275elementEnd();
  }
}
function ListKhachhangComponent_For_42_td_3_Case_6_Conditional_2_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-icon", 63);
    \u0275\u0275text(1, "cancel");
    \u0275\u0275elementEnd();
  }
}
function ListKhachhangComponent_For_42_td_3_Case_6_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275template(1, ListKhachhangComponent_For_42_td_3_Case_6_Conditional_1_Template, 2, 0, "mat-icon", 62)(2, ListKhachhangComponent_For_42_td_3_Case_6_Conditional_2_Template, 2, 0, "mat-icon", 63);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional(row_r10[column_r7] ? 1 : 2);
  }
}
function ListKhachhangComponent_For_42_td_3_Case_7_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275pipe(2, "date");
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", \u0275\u0275pipeBind2(2, 1, row_r10[column_r7], "dd/MM/yyyy"), " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Case_8_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "span", 60);
    \u0275\u0275text(1);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r10 = \u0275\u0275nextContext().$implicit;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275textInterpolate1(" ", row_r10[column_r7], " ");
  }
}
function ListKhachhangComponent_For_42_td_3_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "td", 57);
    \u0275\u0275template(1, ListKhachhangComponent_For_42_td_3_Case_1_Template, 2, 1, "span", 58)(2, ListKhachhangComponent_For_42_td_3_Case_2_Template, 2, 1, "span", 59)(3, ListKhachhangComponent_For_42_td_3_Case_3_Template, 3, 4, "span", 60)(4, ListKhachhangComponent_For_42_td_3_Case_4_Template, 2, 1, "span", 60)(5, ListKhachhangComponent_For_42_td_3_Case_5_Template, 2, 1, "span", 60)(6, ListKhachhangComponent_For_42_td_3_Case_6_Template, 3, 1, "span", 60)(7, ListKhachhangComponent_For_42_td_3_Case_7_Template, 3, 4, "span", 60)(8, ListKhachhangComponent_For_42_td_3_Case_8_Template, 2, 1, "span", 60);
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    let tmp_21_0;
    const column_r7 = \u0275\u0275nextContext().$implicit;
    \u0275\u0275advance();
    \u0275\u0275conditional((tmp_21_0 = column_r7) === "makh" ? 1 : tmp_21_0 === "stt" ? 2 : tmp_21_0 === "createdAt" ? 3 : tmp_21_0 === "banggia" ? 4 : tmp_21_0 === "haohut" ? 5 : tmp_21_0 === "isActive" ? 6 : tmp_21_0 === "updatedAt" ? 7 : 8);
  }
}
function ListKhachhangComponent_For_42_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementContainerStart(0, 32);
    \u0275\u0275template(1, ListKhachhangComponent_For_42_Conditional_1_Template, 1, 0, "th", 50)(2, ListKhachhangComponent_For_42_Conditional_2_Template, 1, 0, "th", 51)(3, ListKhachhangComponent_For_42_td_3_Template, 9, 1, "td", 52);
    \u0275\u0275elementContainerEnd();
  }
  if (rf & 2) {
    const column_r7 = ctx.$implicit;
    \u0275\u0275property("matColumnDef", column_r7);
    \u0275\u0275advance();
    \u0275\u0275conditional(column_r7 == "stt" ? 1 : 2);
  }
}
function ListKhachhangComponent_tr_43_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275element(0, "tr", 64);
  }
}
function ListKhachhangComponent_tr_44_Template(rf, ctx) {
  if (rf & 1) {
    const _r12 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "tr", 65);
    \u0275\u0275listener("click", function ListKhachhangComponent_tr_44_Template_tr_click_0_listener() {
      const row_r13 = \u0275\u0275restoreView(_r12).$implicit;
      const ctx_r2 = \u0275\u0275nextContext();
      return \u0275\u0275resetView(ctx_r2.AddToEdit(row_r13));
    });
    \u0275\u0275elementEnd();
  }
  if (rf & 2) {
    const row_r13 = ctx.$implicit;
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275classMapInterpolate1("hover:bg-slate-50 ", ctx_r2.CheckItemInEdit(row_r13) ? "!bg-blue-50" : "", "");
  }
}
function ListKhachhangComponent_tr_45_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "tr", 66)(1, "td", 67);
    \u0275\u0275text(2, "Kh\xF4ng t\xECm th\u1EA5y");
    \u0275\u0275elementEnd()();
  }
}
function ListKhachhangComponent_ng_template_80_Template(rf, ctx) {
  if (rf & 1) {
    \u0275\u0275elementStart(0, "mat-dialog-content")(1, "div", 68)(2, "div", 69);
    \u0275\u0275text(3, "X\xE1c Nh\u1EADn");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(4, "div");
    \u0275\u0275text(5, "B\u1EA1n ch\u1EAFc ch\u1EAFn mu\u1ED1n xo\xE1 kh\xF4ng?");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(6, "div", 70)(7, "button", 71);
    \u0275\u0275text(8, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "button", 72);
    \u0275\u0275text(10, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()()();
  }
}
function ListKhachhangComponent_ng_template_82_Template(rf, ctx) {
  if (rf & 1) {
    const _r16 = \u0275\u0275getCurrentView();
    \u0275\u0275elementStart(0, "mat-dialog-content", 73)(1, "div", 74)(2, "mat-form-field", 23)(3, "mat-label");
    \u0275\u0275text(4, "IdSheet");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(5, "input", 75);
    \u0275\u0275twoWayListener("ngModelChange", function ListKhachhangComponent_ng_template_82_Template_input_ngModelChange_5_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.IdSheet, $event) || (ctx_r2.IdSheet = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()();
    \u0275\u0275elementStart(6, "mat-form-field", 23)(7, "mat-label");
    \u0275\u0275text(8, "SheetName");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(9, "input", 76);
    \u0275\u0275twoWayListener("ngModelChange", function ListKhachhangComponent_ng_template_82_Template_input_ngModelChange_9_listener($event) {
      \u0275\u0275restoreView(_r16);
      const ctx_r2 = \u0275\u0275nextContext();
      \u0275\u0275twoWayBindingSet(ctx_r2.SheetName, $event) || (ctx_r2.SheetName = $event);
      return \u0275\u0275resetView($event);
    });
    \u0275\u0275elementEnd()()();
    \u0275\u0275element(10, "div", 77);
    \u0275\u0275elementStart(11, "div", 78)(12, "button", 71);
    \u0275\u0275text(13, "\u0110\u1ED3ng \xDD");
    \u0275\u0275elementEnd();
    \u0275\u0275elementStart(14, "button", 72);
    \u0275\u0275text(15, "Hu\u1EF7 B\u1ECF");
    \u0275\u0275elementEnd()()();
  }
  if (rf & 2) {
    const ctx_r2 = \u0275\u0275nextContext();
    \u0275\u0275advance(5);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.IdSheet);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(4, _c2));
    \u0275\u0275advance(4);
    \u0275\u0275twoWayProperty("ngModel", ctx_r2.SheetName);
    \u0275\u0275property("ngModelOptions", \u0275\u0275pureFunction0(5, _c2));
  }
}
var ListKhachhangComponent = class _ListKhachhangComponent {
  displayedColumns = [];
  ColumnName = {
    stt: "#",
    makh: "M\xE3 KH",
    name: "T\xEAn KH",
    banggia: "B\u1EA3ng Gi\xE1",
    diachi: "\u0110\u1ECBa Ch\u1EC9",
    quan: "Qu\u1EADn",
    email: "Email",
    sdt: "SDT",
    mst: "MST",
    gionhanhang: "Gi\u1EDD Nh\u1EADn H\xE0ng",
    loaikh: "Lo\u1EA1i KH",
    ghichu: "Ghi Ch\xFA",
    isActive: "Tr\u1EA1ng Th\xE1i",
    createdAt: "Ng\xE0y T\u1EA1o"
  };
  FilterColumns = JSON.parse(localStorage.getItem("KhachhangColFilter") || "[]");
  Columns = [];
  paginator;
  sort;
  drawer;
  // Updated to use GraphQL service
  _KhachhangService = inject(KhachhangGraphqlService);
  _breakpointObserver = inject(BreakpointObserver);
  _GoogleSheetService = inject(GoogleSheetService);
  _router = inject(Router);
  _dialog = inject(MatDialog);
  _snackBar = inject(MatSnackBar);
  // GraphQL reactive signals
  Listkhachhang = this._KhachhangService.ListKhachhang;
  page = this._KhachhangService.page;
  totalPages = this._KhachhangService.totalPages;
  total = this._KhachhangService.total;
  pageSize = this._KhachhangService.pageSize;
  khachhangId = this._KhachhangService.khachhangId;
  loading = this._KhachhangService.loading;
  error = this._KhachhangService.error;
  dataSource = new MatTableDataSource([]);
  EditList = [];
  isSearch = signal(false);
  searchParam = {};
  // Client-side pagination info
  paginationInfo = computed(() => {
    const paginator = this.paginator;
    if (!paginator)
      return null;
    return {
      currentPage: paginator.pageIndex + 1,
      totalPages: Math.ceil(paginator.length / paginator.pageSize),
      pageSize: paginator.pageSize,
      totalRecords: paginator.length,
      displayStart: paginator.length === 0 ? 0 : paginator.pageIndex * paginator.pageSize + 1,
      displayEnd: Math.min((paginator.pageIndex + 1) * paginator.pageSize, paginator.length)
    };
  });
  constructor() {
    effect(() => {
      const data = this.Listkhachhang();
      if (data && data.length > 0) {
        this.dataSource.data = data;
        this.dataSource.sort = this.sort;
        if (this.paginator) {
          this.paginator.pageIndex = 0;
          this.paginator.pageSize = 50;
          this.paginator.length = data.length;
          this.paginator.pageSizeOptions = [25, 50, 100, 200, 500];
          this.paginator.showFirstLastButtons = true;
        }
      }
    });
    effect(() => {
      const errorMessage = this.error();
      if (errorMessage) {
        this._snackBar.open(errorMessage, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
    effect(() => {
      const isLoading = this.loading();
      if (isLoading) {
        console.log("Loading kh\xE1ch h\xE0ng...");
      }
    });
  }
  ngOnInit() {
    return __async(this, null, function* () {
      this.initializeColumns();
      this.setupDrawer();
      try {
        yield this._KhachhangService.getAllKhachhang(this.searchParam);
        const data = this.Listkhachhang();
        this.dataSource = new MatTableDataSource(data);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
        this.dataSource.sortingDataAccessor = (data2, sortHeaderId) => {
          switch (sortHeaderId) {
            case "banggia":
              return data2.banggia?.title || "";
            case "createdAt":
            case "updatedAt":
              return new Date(data2[sortHeaderId]);
            default:
              return data2[sortHeaderId] || "";
          }
        };
      } catch (error) {
        console.error("L\u1ED7i khi load d\u1EEF li\u1EC7u kh\xE1ch h\xE0ng:", error);
        this._snackBar.open("Kh\xF4ng th\u1EC3 t\u1EA3i d\u1EEF li\u1EC7u kh\xE1ch h\xE0ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  initializeColumns() {
    this.Columns = Object.entries(this.ColumnName).map(([key, value]) => ({ key, value, isShow: true }));
    this.FilterColumns = this.FilterColumns.length ? this.FilterColumns : this.Columns;
    localStorage.setItem("KhachhangColFilter", JSON.stringify(this.FilterColumns));
    this.displayedColumns = this.FilterColumns.filter((col) => col.isShow).map((col) => col.key);
    this.ColumnName = this.FilterColumns.reduce((acc, { key, value, isShow }) => isShow ? __spreadProps(__spreadValues({}, acc), { [key]: value }) : acc, {});
  }
  applyFilter(event) {
    return __async(this, null, function* () {
      const filterValue = event.target.value;
      if (filterValue.length === 0) {
        this.dataSource.filter = "";
        return;
      }
      try {
        const normalizedFilter = removeVietnameseAccents(filterValue.trim().toLowerCase());
        this.dataSource.filterPredicate = (data, filter) => {
          const searchFields = ["makh", "name", "email", "sdt", "diachi", "quan", "loaikh", "ghichu"];
          const dataStr = searchFields.map((field) => {
            if (field === "banggia") {
              return data.banggia?.title || "";
            }
            return data[field] ? data[field].toString() : "";
          }).join(" ").toLowerCase();
          const normalizedDataStr = removeVietnameseAccents(dataStr);
          return dataStr.includes(filter) || normalizedDataStr.includes(filter);
        };
        this.dataSource.filter = normalizedFilter;
        if (this.paginator) {
          this.paginator.firstPage();
        }
      } catch (error) {
        console.error("Error applying filter:", error);
        this._snackBar.open("L\u1ED7i khi t\xECm ki\u1EBFm", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.getUpdatedCodeIds();
        this._snackBar.open("C\u1EADp nh\u1EADt th\xE0nh c\xF4ng", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi c\u1EADp nh\u1EADt:", error);
        this._snackBar.open("L\u1ED7i khi c\u1EADp nh\u1EADt", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  // Method để refresh toàn bộ dữ liệu
  refreshData() {
    return __async(this, null, function* () {
      try {
        yield this._KhachhangService.getAllKhachhang({});
        this._snackBar.open("D\u1EEF li\u1EC7u \u0111\xE3 \u0111\u01B0\u1EE3c c\u1EADp nh\u1EADt", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("L\u1ED7i khi refresh d\u1EEF li\u1EC7u:", error);
        this._snackBar.open("Kh\xF4ng th\u1EC3 refresh d\u1EEF li\u1EC7u", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
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
    this.dataSource.filteredData = this.Listkhachhang().filter((v) => v[column].toLowerCase().includes(event.target.value.toLowerCase()));
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
    this.ListFilter = this.Listkhachhang();
  }
  EmptyFiter() {
    this.ListFilter = [];
  }
  CheckItem(item) {
    return this.ListFilter.find((v) => v.id === item.id) ? true : false;
  }
  ApplyFilterColum(menu) {
    this.dataSource.data = this.Listkhachhang().filter((v) => this.ListFilter.some((v1) => v1.id === v.id));
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
    localStorage.setItem("KhachhangColFilter", JSON.stringify(this.FilterColumns));
  }
  doFilterColumns(event) {
    const query = event.target.value.toLowerCase();
    this.FilterColumns = this.Columns.filter((v) => v.value.toLowerCase().includes(query));
  }
  create() {
    this.drawer.open();
    this._router.navigate(["admin/khachhang", "new"]);
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
      this._KhachhangService.deleteKhachhang(item.id);
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
    this._KhachhangService.setKhachhangId(item.id);
    this._router.navigate(["admin/khachhang", item.id]);
  }
  OpenLoadDrive(template) {
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
      const existingKhachhang = this._KhachhangService.ListKhachhang();
      const existingMasp = existingKhachhang.map((v) => v.masp);
      const newMasp = uniqueData.map((v) => v.masp).filter((item) => !existingMasp.includes(item));
      yield Promise.all(uniqueData.map((v) => __async(this, null, function* () {
        const existingItem = existingKhachhang.find((v1) => v1.masp === v.masp);
        if (existingItem) {
          const updatedItem = __spreadValues(__spreadValues({}, existingItem), v);
          yield this._KhachhangService.updateKhachhang(updatedItem.id, updatedItem);
        } else {
          yield this._KhachhangService.createKhachhang(v);
        }
      })));
      yield Promise.all(existingKhachhang.filter((sp) => !uniqueData.some((item) => item.masp === sp.masp)).map((sp) => this._KhachhangService.updateKhachhang(sp.id, __spreadProps(__spreadValues({}, sp), { isActive: false }))));
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
    return item.id || index.toString();
  }
  // Performance optimization: Track by cho filtered data
  trackByFilteredFn = (index, item) => {
    return `${item.id}-${item.updatedAt || item.createdAt}`;
  };
  // Client-side pagination methods
  getCurrentPage() {
    return this.paginator ? this.paginator.pageIndex + 1 : 1;
  }
  getTotalPages() {
    return this.paginator ? Math.ceil(this.paginator.length / this.paginator.pageSize) : 1;
  }
  getCurrentPageSize() {
    return this.paginator ? this.paginator.pageSize : 50;
  }
  getDisplayStart() {
    if (!this.paginator || this.paginator.length === 0)
      return 0;
    return this.paginator.pageIndex * this.paginator.pageSize + 1;
  }
  getDisplayEnd() {
    if (!this.paginator || this.paginator.length === 0)
      return 0;
    const end = (this.paginator.pageIndex + 1) * this.paginator.pageSize;
    return Math.min(end, this.paginator.length);
  }
  getTotalRecords() {
    return this.paginator ? this.paginator.length : 0;
  }
  canGoToPrevious() {
    return this.paginator ? this.paginator.hasPreviousPage() : false;
  }
  canGoToNext() {
    return this.paginator ? this.paginator.hasNextPage() : false;
  }
  onPageSizeChange(size, menuHienthi) {
    return __async(this, null, function* () {
      if (size < 1) {
        this._snackBar.open("S\u1ED1 l\u01B0\u1EE3ng ph\u1EA3i l\u1EDBn h\u01A1n 0", "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        return;
      }
      if (this.paginator) {
        this.paginator.pageSize = size;
        this.paginator.firstPage();
      }
      this._snackBar.open(`Hi\u1EC3n th\u1ECB ${size} items m\u1ED7i trang`, "", {
        duration: 1e3,
        horizontalPosition: "end",
        verticalPosition: "top",
        panelClass: ["snackbar-success"]
      });
      menuHienthi.closeMenu();
    });
  }
  onPreviousPage() {
    return __async(this, null, function* () {
      if (this.paginator && this.paginator.hasPreviousPage()) {
        this.paginator.previousPage();
      }
    });
  }
  onNextPage() {
    return __async(this, null, function* () {
      if (this.paginator && this.paginator.hasNextPage()) {
        this.paginator.nextPage();
      }
    });
  }
  static \u0275fac = function ListKhachhangComponent_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ListKhachhangComponent)();
  };
  static \u0275cmp = /* @__PURE__ */ \u0275\u0275defineComponent({ type: _ListKhachhangComponent, selectors: [["app-listkhachhang"]], viewQuery: function ListKhachhangComponent_Query(rf, ctx) {
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
  }, decls: 84, vars: 22, consts: [["drawer", ""], ["menu", "matMenu"], ["paginator", ""], ["menuHienthi", "matMenuTrigger"], ["menu1", "matMenu"], ["pageSizeInput", ""], ["DeleteDialog", ""], ["LoadDriveDialog", ""], ["autosize", "", 1, "w-full", "h-full"], ["mode", "over", 1, "flex", "flex-col", "!w-full", "h-full", 3, "position"], [1, "flex", "flex-col", "space-y-2", "h-screen-16", "w-full", "p-2"], [1, "p-2", "cursor-pointer", "w-full", "relative", "flex", "lg:flex-row", "lg:space-y-2", "space-y-0", "flex-col", "space-x-2", "justify-between", "items-center", "bg-white", "rounded-lg"], [1, "w-full", "flex", "flex-col", "gap-2", "lg:flex-row", "lg:items-center", "lg:justify-between"], [1, "flex", "flex-row", "space-x-2", "items-center"], [1, "relative", "w-full"], ["type", "text", "placeholder", "T\xECm Ki\u1EBFm...", 1, "block", "w-full", "pl-10", "pr-4", "py-2", "text-gray-700", "bg-white", "border", "border-gray-300", "rounded-lg", "focus:border-blue-400", "focus:ring-blue-400", "focus:outline-none", "focus:ring", "focus:ring-opacity-40", 3, "keyup"], [1, "absolute", "inset-y-0", "left-0", "flex", "items-center", "pl-3", "pointer-events-none"], [1, "material-symbols-outlined", "text-gray-500"], ["color", "primary", "matTooltip", "Th\xEAm m\u1EDBi", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], [1, "whitespace-nowrap"], ["class", "flex flex-row items-center", "color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 3, "click", 4, "ngIf"], ["matTooltip", "\u1EA8n hi\u1EC7n c\u1ED9t", "mat-icon-button", "", "color", "primary", 3, "matMenuTriggerFor"], [1, "p-4"], ["appearance", "outline", "subscriptSizing", "dynamic", 1, "w-full"], ["matInput", "", "placeholder", "T\xECm Ki\u1EBFm", 3, "input", "click"], ["matPrefix", ""], [1, "flex", "flex-col", "max-h-80", "overflow-auto"], ["mat-menu-item", ""], ["mat-icon-button", "", "color", "primary", "matTooltip", "C\u1EADp Nh\u1EADt L\u1EA1i Code", 3, "click"], ["mat-icon-button", "", "color", "primary", "matTooltip", "Refresh D\u1EEF Li\u1EC7u", 3, "click"], [1, "w-full", "h-full", "overflow-auto"], ["mat-table", "", "matSort", "", 1, "!border", "w-full", "cursor-pointer", 3, "dataSource"], [3, "matColumnDef"], ["mat-header-row", "", 4, "matHeaderRowDef", "matHeaderRowDefSticky"], ["class", "border", "mat-row", "", 3, "class", "click", 4, "matRowDef", "matRowDefColumns"], ["class", "mat-row border", 4, "matNoDataRow"], [1, "hidden", 3, "length", "pageSize", "pageSizeOptions", "showFirstLastButtons"], [1, "cursor-pointer", "border", "rounded-lg", "px-3", "p-1", "flex", "flex-row", "space-x-2", "items-center", "justify-between"], [1, "w-full", "flex", "lg:p-0", "p-2", "lg:flex-row", "lg:space-x-2", "lg:items-center", "lg:justify-between", "flex-col", "justify-center"], [1, "w-full", "text-center"], [1, "w-full", "flex", "flex-row", "space-x-2", "items-center", "lg:justify-end", "justify-center"], [1, "font-bold", "text-blue-600", 3, "matMenuTriggerFor"], [1, "w-full", "flex", "flex-row", "space-x-2", "p-4", 3, "click"], ["appearance", "outline", "subscriptSizing", "dynamic"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp S\u1ED1 L\u01B0\u1EE3ng", 3, "value"], ["mat-icon-button", "", "color", "primary", 3, "click"], [1, "pagination-controls"], ["mat-icon-button", "", "color", "primary", 3, "click", "disabled"], ["color", "warn", "matTooltip", "Xo\xE1", "mat-flat-button", "", 1, "flex", "flex-row", "items-center", 3, "click"], ["mat-menu-item", "", 3, "click"], ["mat-header-cell", "", 1, "!border", "!bg-slate-100"], ["mat-header-cell", "", "mat-sort-header", "", 1, "!border", "whitespace-nowrap", "!bg-slate-100"], ["class", "border", "mat-cell", "", 4, "matCellDef"], ["class", "!border !bg-slate-100", "mat-header-cell", "", 4, "matHeaderCellDef"], ["class", "!border whitespace-nowrap !bg-slate-100", "mat-header-cell", "", "mat-sort-header", "", 4, "matHeaderCellDef"], [1, "max-w-40", "line-clamp-4", "me-4"], [3, "OutFilter", "icon", "ListItem", "fieldsearch", "ListFilter", "filterItem"], ["mat-cell", "", 1, "border"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600"], [1, "flex", "text-center"], [1, "max-w-40", "line-clamp-4"], [1, "max-w-40", "line-clamp-4", "font-bold", "text-blue-600", 3, "click"], [1, "text-green-500"], [1, "text-red-500"], ["mat-header-row", ""], ["mat-row", "", 1, "border", 3, "click"], [1, "mat-row", "border"], ["colspan", "4", 1, "mat-cell", "p-4"], [1, "flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "font-bold"], [1, "flex", "flex-row", "space-x-2", "items-center", "justify-center"], ["mat-flat-button", "", "color", "primary", "mat-dialog-close", "true"], ["mat-flat-button", "", "color", "warn", "mat-dialog-close", "false"], [1, "!w-screen", "!h-screen", "!max-h-screen", "!relative", "!flex", "flex-col", "space-y-8", "items-center", "justify-center"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp IdSheet", 3, "ngModelChange", "ngModel", "ngModelOptions"], ["matInput", "", "placeholder", "Vui l\xF2ng Nh\u1EADp SheetName", 3, "ngModelChange", "ngModel", "ngModelOptions"], [1, "relative", "h-full", "w-full", "overflow-auto"], [1, "relative", "flex", "flex-row", "space-x-2", "items-center", "justify-center"]], template: function ListKhachhangComponent_Template(rf, ctx) {
    if (rf & 1) {
      const _r1 = \u0275\u0275getCurrentView();
      \u0275\u0275elementStart(0, "mat-drawer-container", 8)(1, "mat-drawer", 9, 0);
      \u0275\u0275element(3, "router-outlet");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(4, "div", 10)(5, "div", 11)(6, "div", 12)(7, "div", 13)(8, "div", 14)(9, "input", 15);
      \u0275\u0275listener("keyup", function ListKhachhangComponent_Template_input_keyup_9_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.applyFilter($event));
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(10, "div", 16)(11, "span", 17);
      \u0275\u0275text(12, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(13, "button", 18);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_13_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.create());
      });
      \u0275\u0275elementStart(14, "mat-icon");
      \u0275\u0275text(15, "add_circle");
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(16, "span", 19);
      \u0275\u0275text(17, "T\u1EA1o M\u1EDBi");
      \u0275\u0275elementEnd()();
      \u0275\u0275template(18, ListKhachhangComponent_button_18_Template, 5, 0, "button", 20);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(19, "div", 13)(20, "button", 21)(21, "mat-icon");
      \u0275\u0275text(22, "tune");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(23, "mat-menu", null, 1)(25, "div", 22)(26, "mat-form-field", 23)(27, "input", 24);
      \u0275\u0275listener("input", function ListKhachhangComponent_Template_input_input_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.doFilterColumns($event));
      })("click", function ListKhachhangComponent_Template_input_click_27_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(28, "mat-icon", 25);
      \u0275\u0275text(29, "search");
      \u0275\u0275elementEnd()()();
      \u0275\u0275elementStart(30, "div", 26);
      \u0275\u0275repeaterCreate(31, ListKhachhangComponent_For_32_Template, 5, 2, "button", 27, _forTrack0);
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(33, "button", 28);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_33_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.getUpdatedCodeIds());
      });
      \u0275\u0275elementStart(34, "mat-icon");
      \u0275\u0275text(35, "cached");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(36, "button", 29);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_36_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.refreshData());
      });
      \u0275\u0275elementStart(37, "mat-icon");
      \u0275\u0275text(38, "refresh");
      \u0275\u0275elementEnd()()()()();
      \u0275\u0275elementStart(39, "div", 30)(40, "table", 31);
      \u0275\u0275repeaterCreate(41, ListKhachhangComponent_For_42_Template, 4, 2, "ng-container", 32, \u0275\u0275repeaterTrackByIdentity);
      \u0275\u0275template(43, ListKhachhangComponent_tr_43_Template, 1, 0, "tr", 33)(44, ListKhachhangComponent_tr_44_Template, 1, 3, "tr", 34)(45, ListKhachhangComponent_tr_45_Template, 3, 0, "tr", 35);
      \u0275\u0275elementEnd();
      \u0275\u0275element(46, "mat-paginator", 36, 2);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(48, "div", 37)(49, "div", 38)(50, "span", 39);
      \u0275\u0275text(51, "\u0110ang Xem ");
      \u0275\u0275elementStart(52, "strong");
      \u0275\u0275text(53);
      \u0275\u0275elementEnd();
      \u0275\u0275text(54, " - ");
      \u0275\u0275elementStart(55, "strong");
      \u0275\u0275text(56);
      \u0275\u0275elementEnd();
      \u0275\u0275text(57);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(58, "div", 40)(59, "span", 41, 3);
      \u0275\u0275text(61);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(62, "mat-menu", null, 4)(64, "div", 42);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_div_click_64_listener($event) {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView($event.stopPropagation());
      });
      \u0275\u0275elementStart(65, "mat-form-field", 43)(66, "mat-label");
      \u0275\u0275text(67, "S\u1ED1 l\u01B0\u1EE3ng");
      \u0275\u0275elementEnd();
      \u0275\u0275element(68, "input", 44, 5);
      \u0275\u0275elementEnd();
      \u0275\u0275elementStart(70, "button", 45);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_70_listener() {
        \u0275\u0275restoreView(_r1);
        const menuHienthi_r14 = \u0275\u0275reference(60);
        const pageSizeInput_r15 = \u0275\u0275reference(69);
        return \u0275\u0275resetView(ctx.onPageSizeChange(+pageSizeInput_r15.value, menuHienthi_r14));
      });
      \u0275\u0275elementStart(71, "mat-icon");
      \u0275\u0275text(72, "published_with_changes");
      \u0275\u0275elementEnd()()()();
      \u0275\u0275elementStart(73, "div", 46)(74, "button", 47);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_74_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onPreviousPage());
      });
      \u0275\u0275elementStart(75, "mat-icon");
      \u0275\u0275text(76, "keyboard_arrow_left");
      \u0275\u0275elementEnd()();
      \u0275\u0275elementStart(77, "button", 47);
      \u0275\u0275listener("click", function ListKhachhangComponent_Template_button_click_77_listener() {
        \u0275\u0275restoreView(_r1);
        return \u0275\u0275resetView(ctx.onNextPage());
      });
      \u0275\u0275elementStart(78, "mat-icon");
      \u0275\u0275text(79, "keyboard_arrow_right");
      \u0275\u0275elementEnd()()()()()()()();
      \u0275\u0275template(80, ListKhachhangComponent_ng_template_80_Template, 11, 0, "ng-template", null, 6, \u0275\u0275templateRefExtractor)(82, ListKhachhangComponent_ng_template_82_Template, 16, 6, "ng-template", null, 7, \u0275\u0275templateRefExtractor);
    }
    if (rf & 2) {
      const menu_r17 = \u0275\u0275reference(24);
      const menu1_r18 = \u0275\u0275reference(63);
      \u0275\u0275advance();
      \u0275\u0275property("position", "end");
      \u0275\u0275advance(17);
      \u0275\u0275property("ngIf", ctx.EditList.length > 0);
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu_r17);
      \u0275\u0275advance(11);
      \u0275\u0275repeater(ctx.FilterColumns);
      \u0275\u0275advance(9);
      \u0275\u0275property("dataSource", ctx.dataSource);
      \u0275\u0275advance();
      \u0275\u0275repeater(ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("matHeaderRowDef", ctx.displayedColumns)("matHeaderRowDefSticky", true);
      \u0275\u0275advance();
      \u0275\u0275property("matRowDefColumns", ctx.displayedColumns);
      \u0275\u0275advance(2);
      \u0275\u0275property("length", ctx.getTotalRecords())("pageSize", ctx.getCurrentPageSize())("pageSizeOptions", \u0275\u0275pureFunction0(21, _c1))("showFirstLastButtons", true);
      \u0275\u0275advance(7);
      \u0275\u0275textInterpolate(ctx.getDisplayStart());
      \u0275\u0275advance(3);
      \u0275\u0275textInterpolate(ctx.getDisplayEnd());
      \u0275\u0275advance();
      \u0275\u0275textInterpolate3(" trong s\u1ED1 ", ctx.getTotalRecords(), " m\u1EE5c, ", ctx.getCurrentPage(), "/", ctx.getTotalPages(), " Trang ");
      \u0275\u0275advance(2);
      \u0275\u0275property("matMenuTriggerFor", menu1_r18);
      \u0275\u0275advance(2);
      \u0275\u0275textInterpolate1("Hi\u1EC7n Th\u1ECB : ", ctx.getCurrentPageSize(), " m\u1EE5c");
      \u0275\u0275advance(7);
      \u0275\u0275property("value", ctx.getCurrentPageSize());
      \u0275\u0275advance(6);
      \u0275\u0275property("disabled", !ctx.canGoToPrevious());
      \u0275\u0275advance(3);
      \u0275\u0275property("disabled", !ctx.canGoToNext());
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
    NgIf,
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
    SearchfilterComponent,
    MatProgressSpinnerModule
  ], encapsulation: 2, changeDetection: 0 });
};
__decorate([
  Debounce(300)
], ListKhachhangComponent.prototype, "applyFilter", null);
__decorate([
  memoize()
], ListKhachhangComponent.prototype, "FilterHederColumn", null);
__decorate([
  Debounce(300)
], ListKhachhangComponent.prototype, "doFilterHederColumn", null);
(() => {
  (typeof ngDevMode === "undefined" || ngDevMode) && \u0275setClassDebugInfo(ListKhachhangComponent, { className: "ListKhachhangComponent", filePath: "src/app/admin/khachhang/listkhachhang/listkhachhang.component.ts", lineNumber: 54 });
})();

export {
  KhachhangGraphqlService,
  ListKhachhangComponent
};
//# sourceMappingURL=chunk-2SQG42NW.mjs.map
