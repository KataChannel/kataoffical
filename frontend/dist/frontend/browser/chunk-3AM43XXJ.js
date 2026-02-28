import {
  NhanvienService
} from "./chunk-VSXZ7WDU.js";
import {
  DonhangService
} from "./chunk-3RK5O7D3.js";
import {
  SharedSocketService
} from "./chunk-HXYVFSEQ.js";
import {
  require_moment
} from "./chunk-LIKOVN7R.js";
import {
  ErrorLogService
} from "./chunk-GODCD4GS.js";
import {
  Router
} from "./chunk-I3HWRSST.js";
import {
  StorageService
} from "./chunk-S5TWTPVL.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  MatSnackBar
} from "./chunk-7TLPKC3B.js";
import {
  GraphqlService
} from "./chunk-RPDITV5T.js";
import {
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-FWM3YOMT.js";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-SXK72SKC.js";

// src/app/admin/donhang/donhang-graphql.service.ts
var import_moment = __toESM(require_moment());
var DonhangGraphqlService = class _DonhangGraphqlService {
  _GraphqlService = inject(GraphqlService);
  _StorageService = inject(StorageService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _ErrorLogService = inject(ErrorLogService);
  _sharedSocketService = inject(SharedSocketService);
  _donhangService = inject(DonhangService);
  _NhanvienService = inject(NhanvienService);
  socket;
  // Signals for reactive state management
  ListDonhang = signal([]);
  ListVandon = signal([]);
  DetailDonhang = signal({});
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  donhangId = signal(null);
  loading = signal(false);
  error = signal(null);
  constructor() {
    this.socket = this._sharedSocketService.getSocket();
    this.socket?.on("donhang:updated", (data) => {
      this.refreshDonhangData();
    });
  }
  setDonhangId(id) {
    this.donhangId.set(id);
    if (id) {
      this.getOneDonhang(id);
    }
  }
  /**
   * Tìm kiếm đơn hàng với GraphQL - tối ưu cho component vandon
   */
  searchDonhang(searchParams) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        let where = {};
        if (searchParams.Batdau && searchParams.Ketthuc) {
          where.ngaygiao = {
            gte: (0, import_moment.default)(searchParams.Batdau).startOf("day").toISOString(),
            lte: (0, import_moment.default)(searchParams.Ketthuc).endOf("day").toISOString()
          };
        }
        if (searchParams.Status) {
          where.status = searchParams.Status;
        }
        const result = yield this._GraphqlService.findMany("donhang", {
          where,
          include: {
            khachhang: {
              select: {
                id: true,
                name: true,
                sdt: true,
                diachi: true
              }
            },
            sanpham: {
              select: {
                id: true,
                idSP: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                slhuy: true,
                ttdat: true,
                ttgiao: true,
                ttnhan: true,
                ghichu: true,
                order: true,
                isActive: true,
                giaban: true,
                ttsauvat: true,
                vat: true,
                sanpham: {
                  select: {
                    id: true,
                    masp: true,
                    title: true,
                    giagoc: true,
                    dvt: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: "desc" },
          take: searchParams.pageSize || 9999
        });
        this.ListDonhang.set(result || []);
        const vandonList = this.createVandonList(result || []);
        this.ListVandon.set(vandonList);
        this.loading.set(false);
        return result;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u \u0111\u01A1n h\xE0ng");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`L\u1ED7i t\xECm ki\u1EBFm \u0111\u01A1n h\xE0ng GraphQL: ${error.message || error}`);
        throw error;
      }
    });
  }
  /**
   * Tạo danh sách vận đơn từ đơn hàng
   */
  createVandonList(donhangList) {
    return donhangList.flatMap((item, index) => (item.sanpham || []).map((v) => ({
      // Dữ liệu từ Donhangsanpham
      id: v.id,
      idSP: v.idSP,
      sldat: v.sldat,
      slgiao: v.slgiao,
      slnhan: v.slnhan,
      slhuy: v.slhuy,
      ttdat: v.ttdat,
      ttgiao: v.ttgiao,
      ttnhan: v.ttnhan,
      ghichu: v.ghichu,
      order: v.order,
      isActive: v.isActive,
      giaban: v.giaban,
      ttsauvat: v.ttsauvat,
      vat: v.vat,
      // Dữ liệu từ Sanpham (nested relation)
      masp: v.sanpham?.masp,
      title: v.sanpham?.title,
      giagoc: v.sanpham?.giagoc,
      dvt: v.sanpham?.dvt,
      // Dữ liệu từ Donhang
      madonhang: item.madonhang,
      khachhang: item.khachhang?.name,
      sdt: item.khachhang?.sdt,
      diachi: item.khachhang?.diachi,
      createdAt: item.createdAt,
      ngaygiao: item.ngaygiao,
      status: item.status,
      // Dữ liệu phiếu chuyển
      shipper: item.shipper,
      phieuve: item.phieuve,
      giodi: item.giodi,
      giove: item.giove,
      kynhan: item.kynhan
    }))).map((v, i) => __spreadProps(__spreadValues({}, v), { stt: i + 1 }));
  }
  /**
   * Lấy chi tiết một đơn hàng
   */
  getOneDonhang(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const result = yield this._GraphqlService.findUnique("donhang", {
          id
        }, {
          include: {
            khachhang: {
              select: {
                id: true,
                name: true,
                sdt: true,
                diachi: true,
                email: true
              }
            },
            sanpham: {
              select: {
                id: true,
                idSP: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                slhuy: true,
                ttdat: true,
                ttgiao: true,
                ttnhan: true,
                ghichu: true,
                order: true,
                isActive: true,
                giaban: true,
                ttsauvat: true,
                vat: true,
                sanpham: {
                  select: {
                    id: true,
                    masp: true,
                    title: true,
                    giagoc: true,
                    dvt: true
                  }
                }
              }
            },
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: {
                    name: true
                  }
                }
              }
            }
          }
        });
        this.DetailDonhang.set(result || {});
        this.loading.set(false);
        return result;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i chi ti\u1EBFt \u0111\u01A1n h\xE0ng");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`L\u1ED7i l\u1EA5y chi ti\u1EBFt \u0111\u01A1n h\xE0ng GraphQL: ${error.message || error}`);
        throw error;
      }
    });
  }
  /**
   * Tạo đơn hàng mới
   */
  CreateDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const createData = {
          madonhang: dulieu.madonhang || this.generateMaDonhang(),
          status: dulieu.status || "dadat",
          tongtien: dulieu.tongtien || 0,
          khachhangId: dulieu.khachhangId,
          ngaygiao: dulieu.ngaygiao ? new Date(dulieu.ngaygiao).toISOString() : null,
          ghichu: dulieu.ghichu || "",
          order: dulieu.order || 1,
          isActive: dulieu.isActive !== void 0 ? dulieu.isActive : true
        };
        const result = yield this._GraphqlService.createOne("donhang", createData);
        yield this.refreshDonhangData();
        this._snackBar.open("T\u1EA1o \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.loading.set(false);
        return result;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA1o \u0111\u01A1n h\xE0ng");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`L\u1ED7i t\u1EA1o \u0111\u01A1n h\xE0ng GraphQL: ${error.message || error}`);
        this._snackBar.open("L\u1ED7i khi t\u1EA1o \u0111\u01A1n h\xE0ng: " + error.message, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      }
    });
  }
  /**
   * Cập nhật đơn hàng
   */
  updateDonhang(dulieu) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const updateData = {
          madonhang: dulieu.madonhang,
          status: dulieu.status,
          tongtien: dulieu.tongtien,
          khachhangId: dulieu.khachhangId,
          ngaygiao: dulieu.ngaygiao ? new Date(dulieu.ngaygiao).toISOString() : null,
          ghichu: dulieu.ghichu,
          order: dulieu.order,
          isActive: dulieu.isActive
        };
        const result = yield this._GraphqlService.updateOne("donhang", { id: dulieu.id }, updateData);
        yield this.refreshDonhangData();
        this._snackBar.open("C\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.loading.set(false);
        return result;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`L\u1ED7i c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng GraphQL: ${error.message || error}`);
        this._snackBar.open("L\u1ED7i khi c\u1EADp nh\u1EADt \u0111\u01A1n h\xE0ng: " + error.message, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      }
    });
  }
  /**
   * Xóa đơn hàng
   */
  deleteDonhang(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        yield this._GraphqlService.deleteOne("donhang", { id });
        yield this.refreshDonhangData();
        this._snackBar.open("X\xF3a \u0111\u01A1n h\xE0ng th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
        this.loading.set(false);
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi x\xF3a \u0111\u01A1n h\xE0ng");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`L\u1ED7i x\xF3a \u0111\u01A1n h\xE0ng GraphQL: ${error.message || error}`);
        this._snackBar.open("L\u1ED7i khi x\xF3a \u0111\u01A1n h\xE0ng: " + error.message, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      }
    });
  }
  /**
   * Làm mới dữ liệu đơn hàng
   */
  refreshDonhangData() {
    return __async(this, null, function* () {
      const currentList = this.ListDonhang();
      if (currentList.length > 0) {
        yield this.searchDonhang({
          pageSize: 9999
        });
      }
    });
  }
  /**
   * Tạo mã đơn hàng tự động
   */
  generateMaDonhang() {
    const timestamp = (/* @__PURE__ */ new Date()).getTime();
    const random = Math.floor(Math.random() * 1e3);
    return `DH${timestamp}${random}`;
  }
  /**
   * Xuất Excel danh sách vận đơn và phiếu chuyển
   */
  exportVandonToExcel(data) {
    return __async(this, null, function* () {
      try {
        const vandonData = data || this.ListVandon();
        const phieuchuyenData = this._donhangService.ListDonhang();
        if (vandonData.length === 0 && phieuchuyenData.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        let nhanvienList = [];
        try {
          const nhanvienResponse = yield this._NhanvienService.getAllNhanvien({ limit: 9999 });
          nhanvienList = nhanvienResponse.data || [];
        } catch (error) {
          console.warn("Kh\xF4ng th\u1EC3 l\u1EA5y danh s\xE1ch nh\xE2n vi\xEAn:", error);
        }
        const vandonExcelData = vandonData.map((item, index) => ({
          "STT": index + 1,
          "M\xE3 \u0110\u01A1n H\xE0ng": item.madonhang || "",
          "Kh\xE1ch H\xE0ng": item.khachhang || "",
          "T\xEAn S\u1EA3n Ph\u1EA9m": item.title || "",
          "\u0110\u01A1n V\u1ECB T\xEDnh": item.dvt || "",
          "SL \u0110\u1EB7t": Number(item.sldat) || 0,
          "SL Giao": Number(item.slgiao) || 0,
          "SL Nh\u1EADn": Number(item.slnhan) || 0,
          "Ng\xE0y Giao": item.ngaygiao ? new Date(item.ngaygiao).toLocaleDateString("vi-VN") : "",
          "Tr\u1EA1ng Th\xE1i": this.getStatusLabel(item.status) || ""
        }));
        const phieuchuyenExcelData = phieuchuyenData.map((item, index) => {
          let shipper = item.shipper || "";
          if (!shipper && item.machuyen && nhanvienList.length > 0) {
            const matchedNhanvien = nhanvienList.find((nv) => nv.maLamViec && nv.maLamViec.toLowerCase() === item.machuyen.toLowerCase());
            if (matchedNhanvien) {
              shipper = matchedNhanvien.hoTen || "";
            }
          }
          return {
            "STT": index + 1,
            "M\xE3 \u0110\u01A1n H\xE0ng": item.madonhang || "",
            "Ng\xE0y Giao": item.ngaygiao ? new Date(item.ngaygiao).toLocaleString("vi-VN") : "",
            "T\xEAn Kh\xE1ch H\xE0ng": item.name || "",
            "S\u1ED1 L\u01B0\u1EE3ng": item.soluongtt || 0,
            "M\xE3 Chuy\u1EBFn": item.machuyen || "",
            "\u0110\u1ECBa Ch\u1EC9": item.diachi || "",
            "Li\xEAn H\u1EC7": "",
            "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i": item.sdt || "",
            "Gi\u1EDD Nh\u1EADn H\xE0ng": item.gionhanhang || "",
            "T\u1ED5ng S\u1ED1 M\xF3n": item.tongsomon || 0,
            "S\u1ED1 L\u01B0\u1EE3ng TT": item.loadpoint || 0,
            "Shipper": shipper,
            "Phi\u1EBFu V\u1EC1": item.phieuve || "",
            "Gi\u1EDD \u0110i": item.giodi || "",
            "Gi\u1EDD V\u1EC1": item.giove || "",
            "K\xFD Nh\u1EADn": item.kynhan || ""
          };
        });
        const { writeExcelFileSheets } = yield import("./chunk-7VRYA244.js");
        const fileName = `VanDon_PhieuChuyen_${(/* @__PURE__ */ new Date()).toISOString().slice(0, 10)}`;
        const sheets = {
          "V\u1EADn \u0110\u01A1n": {
            data: vandonExcelData
          },
          "Phi\u1EBFu Chuy\u1EC3n": {
            data: phieuchuyenExcelData
          }
        };
        writeExcelFileSheets(sheets, fileName);
        this._snackBar.open("Xu\u1EA5t Excel th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        yield this._ErrorLogService.logError(`L\u1ED7i xu\u1EA5t Excel v\u1EADn \u0111\u01A1n: ${error.message || error}`);
        this._snackBar.open("L\u1ED7i khi xu\u1EA5t Excel: " + error.message, "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
      }
    });
  }
  /**
   * Lấy nhãn trạng thái đơn hàng
   */
  getStatusLabel(status) {
    const statusMap = {
      "dadat": "\u0110\xE3 \u0110\u1EB7t",
      "dagiao": "\u0110\xE3 Giao",
      "danhan": "\u0110\xE3 Nh\u1EADn",
      "hoanthanh": "Ho\xE0n Th\xE0nh",
      "huy": "H\u1EE7y"
    };
    return statusMap[status] || status;
  }
  /**
   * Import Excel dữ liệu phiếu chuyển để cập nhật shipper, phieuve, giodi, giove, kynhan
   */
  importPhieuChuyenFromExcel(excelData) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        let successCount = 0;
        let errorCount = 0;
        const errors = [];
        const total = excelData.length;
        console.log(`[IMPORT] B\u1EAFt \u0111\u1EA7u import ${total} d\xF2ng...`);
        this._snackBar.open(`\u23F3 \u0110ang x\u1EED l\xFD 0/${total}...`, "", {
          duration: void 0,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-info"]
        });
        for (let i = 0; i < excelData.length; i++) {
          const row = excelData[i];
          if (i % 10 === 0 || i === total - 1) {
            const progress = Math.round((i + 1) / total * 100);
            this._snackBar.open(`\u23F3 \u0110ang x\u1EED l\xFD ${i + 1}/${total} (${progress}%)...`, "", {
              duration: void 0,
              horizontalPosition: "end",
              verticalPosition: "top",
              panelClass: ["snackbar-info"]
            });
          }
          try {
            const madonhang = row["M\xE3 \u0110\u01A1n H\xE0ng"]?.toString().trim();
            if (!madonhang) {
              console.warn(`[IMPORT] D\xF2ng ${i + 1}: B\u1ECF qua - kh\xF4ng c\xF3 m\xE3 \u0111\u01A1n h\xE0ng`);
              continue;
            }
            const donhang = yield this._GraphqlService.findFirst("donhang", {
              where: { madonhang },
              include: {
                khachhang: {
                  select: { id: true, makh: true }
                }
              }
            });
            if (!donhang) {
              errors.push(`${madonhang}: Kh\xF4ng t\xECm th\u1EA5y`);
              errorCount++;
              continue;
            }
            const updateData = {};
            if (row["Shipper"])
              updateData.shipper = row["Shipper"].toString().trim();
            if (row["Phi\u1EBFu V\u1EC1"])
              updateData.phieuve = row["Phi\u1EBFu V\u1EC1"].toString().trim();
            if (row["Gi\u1EDD \u0110i"])
              updateData.giodi = row["Gi\u1EDD \u0110i"].toString().trim();
            if (row["Gi\u1EDD V\u1EC1"])
              updateData.giove = row["Gi\u1EDD V\u1EC1"].toString().trim();
            if (row["K\xFD Nh\u1EADn"])
              updateData.kynhan = row["K\xFD Nh\u1EADn"].toString().trim();
            if (Object.keys(updateData).length > 0) {
              yield this._GraphqlService.updateOne("donhang", { id: donhang.id }, updateData);
              successCount++;
            }
            if (row["M\xE3 Chuy\u1EBFn"] && donhang.khachhang?.id) {
              const machuyen = row["M\xE3 Chuy\u1EBFn"].toString().trim();
              yield this._GraphqlService.updateOne("khachhang", { id: donhang.khachhang.id }, { machuyen });
              console.log(`[IMPORT] Updated machuyen: ${machuyen} for khachhang: ${donhang.khachhang.makh}`);
            }
          } catch (rowError) {
            const rowNum = row["STT"] || i + 1;
            errors.push(`D\xF2ng ${rowNum}: ${rowError.message}`);
            errorCount++;
          }
        }
        console.log("[IMPORT] \u0110ang x\xF3a cache...");
        const token = this._StorageService.getItem("token");
        if (token) {
          yield fetch(`${environment.APIURL}/cache/invalidate/donhang`, {
            method: "POST",
            headers: { "Authorization": `Bearer ${token}` }
          });
        }
        console.log("[IMPORT] \u0110ang l\xE0m m\u1EDBi d\u1EEF li\u1EC7u...");
        yield this.refreshDonhangData();
        this.loading.set(false);
        const icon = errorCount > 0 ? "\u26A0\uFE0F" : "\u2705";
        const message = errorCount > 0 ? `${icon} ${successCount} th\xE0nh c\xF4ng, ${errorCount} l\u1ED7i` : `${icon} Import th\xE0nh c\xF4ng ${successCount} \u0111\u01A1n h\xE0ng`;
        this._snackBar.open(message, "\u0110\xF3ng", {
          duration: 4e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: errorCount > 0 ? ["snackbar-warning"] : ["snackbar-success"]
        });
        if (errors.length > 0) {
          console.warn("[IMPORT] L\u1ED7i:", errors.slice(0, 10));
          if (errors.length > 10) {
            console.warn(`[IMPORT] ... v\xE0 ${errors.length - 10} l\u1ED7i kh\xE1c`);
          }
        }
        return { success: successCount, error: errorCount, total };
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i import");
        this.loading.set(false);
        yield this._ErrorLogService.logError(`Import error: ${error.message || error}`);
        this._snackBar.open(`\u274C ${error.message}`, "\u0110\xF3ng", {
          duration: 4e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        throw error;
      }
    });
  }
  /**
   * Lấy thống kê đơn hàng
   */
  getStatistics(searchParams) {
    return __async(this, null, function* () {
      try {
        let where = {};
        if (searchParams?.Batdau && searchParams?.Ketthuc) {
          where.createdAt = {
            gte: new Date(searchParams.Batdau).toISOString(),
            lte: new Date(searchParams.Ketthuc).toISOString()
          };
        }
        const totalResult = yield this._GraphqlService.findMany("donhang", {
          where,
          select: { id: true }
        });
        const completedResult = yield this._GraphqlService.findMany("donhang", {
          where: __spreadProps(__spreadValues({}, where), { status: "hoanthanh" }),
          select: { id: true }
        });
        const cancelledResult = yield this._GraphqlService.findMany("donhang", {
          where: __spreadProps(__spreadValues({}, where), { status: "huy" }),
          select: { id: true }
        });
        return {
          total: totalResult?.length || 0,
          completed: completedResult?.length || 0,
          cancelled: cancelledResult?.length || 0,
          pending: (totalResult?.length || 0) - (completedResult?.length || 0) - (cancelledResult?.length || 0)
        };
      } catch (error) {
        console.error("Error getting statistics:", error);
        return {
          total: 0,
          completed: 0,
          cancelled: 0,
          pending: 0
        };
      }
    });
  }
  /**
   * Tìm kiếm nhanh đơn hàng
   */
  quickSearch(searchTerm) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const result = yield this._GraphqlService.findMany("donhang", {
          where: {
            OR: [
              { madonhang: { contains: searchTerm, mode: "insensitive" } },
              { khachhang: { name: { contains: searchTerm, mode: "insensitive" } } },
              { khachhang: { sdt: { contains: searchTerm } } }
            ]
          },
          include: {
            khachhang: {
              select: {
                id: true,
                name: true,
                sdt: true,
                diachi: true
              }
            },
            sanpham: {
              select: {
                id: true,
                idSP: true,
                sldat: true,
                slgiao: true,
                slnhan: true,
                slhuy: true,
                ttdat: true,
                ttgiao: true,
                ttnhan: true,
                ghichu: true,
                order: true,
                isActive: true,
                giaban: true,
                ttsauvat: true,
                vat: true,
                sanpham: {
                  select: {
                    id: true,
                    masp: true,
                    title: true,
                    giagoc: true,
                    dvt: true
                  }
                }
              }
            }
          },
          orderBy: { createdAt: "desc" },
          take: 100
        });
        this.ListDonhang.set(result || []);
        const vandonList = this.createVandonList(result || []);
        this.ListVandon.set(vandonList);
        this.loading.set(false);
        return result;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\xECm ki\u1EBFm");
        this.loading.set(false);
        throw error;
      }
    });
  }
  static \u0275fac = function DonhangGraphqlService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _DonhangGraphqlService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _DonhangGraphqlService, factory: _DonhangGraphqlService.\u0275fac, providedIn: "root" });
};

export {
  DonhangGraphqlService
};
//# sourceMappingURL=chunk-3AM43XXJ.js.map
