import './polyfills.server.mjs';
import {
  DonhangService
} from "./chunk-KJDLSRZI.mjs";
import {
  SharedSocketService
} from "./chunk-VL2LVL37.mjs";
import {
  NhanvienService
} from "./chunk-NLBLBHTR.mjs";
import {
  TimezoneService
} from "./chunk-5FENH2CU.mjs";
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  ErrorLogService
} from "./chunk-233BLFDB.mjs";
import {
  Router
} from "./chunk-TLYIA537.mjs";
import {
  GraphqlService
} from "./chunk-SLWHV4LF.mjs";
import {
  StorageService
} from "./chunk-A5AQV4K7.mjs";
import {
  environment
} from "./chunk-OWHCCJ6T.mjs";
import {
  MatSnackBar
} from "./chunk-AF3EHXCM.mjs";
import {
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-I6KZCWLZ.mjs";
import {
  __async,
  __spreadProps,
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/admin/donhang/donhang-graphql.service.ts
var import_moment = __toESM(require_moment());
var DonhangGraphqlService = class _DonhangGraphqlService {
  _GraphqlService = inject(GraphqlService);
  _StorageService = inject(StorageService);
  _router = inject(Router);
  _snackBar = inject(MatSnackBar);
  _ErrorLogService = inject(ErrorLogService);
  _sharedSocketService = inject(SharedSocketService);
  _DonhangService = inject(DonhangService);
  _NhanvienService = inject(NhanvienService);
  _timezoneService = inject(TimezoneService);
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
  lastSearchParams = {};
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
        this.lastSearchParams = searchParams;
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
                diachi: true,
                machuyen: true,
                loaikh: true,
                gionhanhang: true,
                nhomkhachhang: {
                  select: {
                    id: true,
                    name: true
                  }
                }
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
                    dvt: true,
                    loadpoint: true
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
   * Xuất Excel danh sách vận đơn và phiếu chuyển (3 sheet: Vận đơn + Hàng Siêu Thị + Phiếu Chuyển)
   * Theo yêu cầu đặc thù cho nhóm SIÊU THỊ (30128727-7c5c-43c0-bc4b-0da5c6db0141)
   */
  exportVandonToExcel(data, filterMaSPs) {
    return __async(this, null, function* () {
      try {
        const GROUP_SIEU_THI_ID = "30128727-7c5c-43c0-bc4b-0da5c6db0141";
        const rawDonhangList = this.ListDonhang();
        if (!rawDonhangList || rawDonhangList.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t (Vui l\xF2ng Nh\u1EA5n T\xECm Ki\u1EBFm tr\u01B0\u1EDBc)", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        let allActiveOrders = [...rawDonhangList];
        if (filterMaSPs && filterMaSPs.length > 0) {
          allActiveOrders = allActiveOrders.map((order) => __spreadProps(__spreadValues({}, order), {
            sanpham: (order.sanpham || []).filter((sp) => filterMaSPs.includes(sp.sanpham?.masp))
          })).filter((order) => order.sanpham.length > 0);
        }
        if (allActiveOrders.length === 0) {
          this._snackBar.open("Kh\xF4ng c\xF3 \u0111\u01A1n h\xE0ng n\xE0o kh\u1EDBp v\u1EDBi \u0111i\u1EC1u ki\u1EC7n l\u1ECDc", "", {
            duration: 3e3,
            horizontalPosition: "end",
            verticalPosition: "top",
            panelClass: ["snackbar-warning"]
          });
          return;
        }
        const sieuThiOrders = allActiveOrders.filter((order) => order.khachhang?.nhomkhachhang?.some((nhom) => nhom.id === GROUP_SIEU_THI_ID || nhom.name?.toLowerCase().includes("si\xEAu th\u1ECB")));
        const khachLeOrders = allActiveOrders.filter((order) => order.khachhang?.loaikh?.toLowerCase().includes("l\u1EBB"));
        let nhanvienList = [];
        try {
          const nhanvienResponse = yield this._NhanvienService.getAllNhanvien({ limit: 9999 });
          nhanvienList = nhanvienResponse.data || [];
        } catch (error) {
          console.warn("Kh\xF4ng th\u1EC3 l\u1EA5y danh s\xE1ch nh\xE2n vi\xEAn:", error);
        }
        const dateStr = (0, import_moment.default)(this.lastSearchParams?.Batdau || /* @__PURE__ */ new Date()).format("DD/MM/YYYY");
        const fileName = `VanDon_TongHop_${(0, import_moment.default)(this.lastSearchParams?.Batdau || /* @__PURE__ */ new Date()).format("DD-MM-YYYY")}`;
        const vandonSheetData = allActiveOrders.flatMap((order) => (order.sanpham || []).map((sp) => ({
          "STT": "",
          "M\xE3 \u0110\u01A1n H\xE0ng": order.madonhang || "",
          "Kh\xE1ch H\xE0ng": order.khachhang?.name || "",
          "T\xEAn S\u1EA3n Ph\u1EA9m": sp.sanpham?.title || "",
          "\u0110\u01A1n V\u1ECB T\xEDnh": sp.sanpham?.dvt || "",
          "SL \u0110\u1EB7t": (Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0),
          "SL Giao": Number(sp.slgiao) || 0,
          "SL Nh\u1EADn": Number(sp.slnhan) || 0,
          "Ng\xE0y Giao": order.ngaygiao ? (0, import_moment.default)(order.ngaygiao).format("D/M/YYYY") : dateStr,
          "Tr\u1EA1ng Th\xE1i": this.getStatusLabel(order.status)
        }))).map((v, i) => __spreadProps(__spreadValues({}, v), { "STT": i + 1 }));
        const hangSieuThiAOA = [
          ["B\u1EA2NG S\u1EA2N PH\u1EA8M H\xC0NG \u0110\xD3NG G\xD3I SI\xCAU TH\u1ECA", "", "", "", "", ""],
          ["t\xEAn kh\xE1ch h\xE0ng", "s\u1EA3n ph\u1EA9m", "DVT", "KL", "Ng\xE0y Giao", "Tr\u1EA1ng Th\xE1i"]
        ];
        sieuThiOrders.forEach((order) => {
          (order.sanpham || []).forEach((sp) => {
            const netQty = (Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0);
            const slGiao = Number(sp.slgiao) || netQty;
            hangSieuThiAOA.push([
              order.khachhang?.name || "",
              sp.sanpham?.title || "",
              sp.sanpham?.dvt || "",
              slGiao,
              order.ngaygiao ? (0, import_moment.default)(order.ngaygiao).format("D/M/YYYY") : dateStr,
              this.getStatusLabel(order.status)
            ]);
          });
        });
        const thHangSieuThiMap = /* @__PURE__ */ new Map();
        sieuThiOrders.forEach((order) => {
          (order.sanpham || []).forEach((sp) => {
            const title = sp.sanpham?.title || "Unknown";
            const netQty = (Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0);
            const slGiao = Number(sp.slgiao) || netQty;
            const existing = thHangSieuThiMap.get(title);
            if (existing) {
              existing.qty += slGiao;
            } else {
              thHangSieuThiMap.set(title, {
                title,
                dvt: sp.sanpham?.dvt || "",
                qty: slGiao
              });
            }
          });
        });
        const thHangSieuThiAOA = [
          ["T\u1ED4NG H\u1EE2P H\xC0NG SI\xCAU TH\u1ECA \u0110\xD3NG G\xD3I", "", "", ""],
          ["s\u1EA3n ph\u1EA9m", "DVT", "KL", "Ghi ch\xFA"]
        ];
        Array.from(thHangSieuThiMap.values()).sort((a, b) => a.title.localeCompare(b.title)).forEach((item) => {
          thHangSieuThiAOA.push([item.title, item.dvt, item.qty, ""]);
        });
        const hangKhachLeAOA = [
          ["B\u1EA2NG S\u1EA2N PH\u1EA8M H\xC0NG KH\xC1CH L\u1EBA", "", "", "", "", ""],
          ["t\xEAn kh\xE1ch h\xE0ng", "s\u1EA3n ph\u1EA9m", "DVT", "KL", "Ng\xE0y Giao", "Tr\u1EA1ng Th\xE1i"]
        ];
        khachLeOrders.forEach((order) => {
          (order.sanpham || []).forEach((sp) => {
            const slGiao = Number(sp.slgiao || sp.sldat) || 0;
            hangKhachLeAOA.push([
              order.khachhang?.name || "",
              sp.sanpham?.title || "",
              sp.sanpham?.dvt || "",
              slGiao,
              order.ngaygiao ? (0, import_moment.default)(order.ngaygiao).format("D/M/YYYY") : dateStr,
              this.getStatusLabel(order.status)
            ]);
          });
        });
        const phieuChuyenSheetData = allActiveOrders.map((order, index) => {
          const activeProducts = order.sanpham || [];
          const totalItems = activeProducts.length;
          const totalQty = activeProducts.reduce((sum, sp) => sum + ((Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0)), 0);
          const totalQtyTT = activeProducts.reduce((sum, sp) => {
            const netQty = (Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0);
            const slActual = sp.slgiao !== void 0 && sp.slgiao !== null && sp.slgiao !== "" ? Number(sp.slgiao) : netQty;
            return sum + (slActual || 0);
          }, 0);
          const totalLoadpoint = parseFloat(activeProducts.reduce((sum, sp) => sum + Number(sp.sanpham?.loadpoint || 0) * ((Number(sp.sldat) || 0) - (Number(sp.slhuy) || 0)), 0).toFixed(3));
          let shipperName = order.shipper || "";
          if (!shipperName && order.khachhang?.machuyen && nhanvienList.length > 0) {
            const nv = nhanvienList.find((n) => n.maNV === order.khachhang.machuyen || n.maLamViec === order.khachhang.machuyen);
            if (nv)
              shipperName = nv.hoTen;
          }
          return {
            "STT": index + 1,
            "M\xE3 \u0110\u01A1n H\xE0ng": order.madonhang || "",
            "Ng\xE0y Giao": order.ngaygiao ? (0, import_moment.default)(order.ngaygiao).format("HH:mm:ss DD/MM/YYYY") : `07:00:00 ${dateStr}`,
            "T\xEAn Kh\xE1ch H\xE0ng": order.khachhang?.name || "",
            "S\u1ED1 L\u01B0\u1EE3ng": totalQty,
            "S\u1ED1 L\u01B0\u1EE3ng TT": totalQtyTT,
            "Tr\u1ECDng T\u1EA3i": totalLoadpoint,
            "M\xE3 Chuy\u1EBFn": order.khachhang?.machuyen || "",
            "\u0110\u1ECBa Ch\u1EC9": order.khachhang?.diachi || "",
            "Li\xEAn H\u1EC7": "",
            "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i": order.khachhang?.sdt || "",
            "Gi\u1EDD Nh\u1EADn H\xE0ng": order.khachhang?.gionhanhang || "",
            "T\u1ED5ng S\u1ED1 M\xF3n": totalItems,
            "Shipper": shipperName,
            "Phi\u1EBFu V\u1EC1": order.phieuve || "",
            "Gi\u1EDD \u0110i": order.giodi || "",
            "Gi\u1EDD V\u1EC1": order.giove || "",
            "K\xFD Nh\u1EADn": order.kynhan || ""
          };
        });
        let tonghopSheetData = [];
        try {
          let startDate;
          let endDate;
          if (this.lastSearchParams?.Batdau && this.lastSearchParams?.Ketthuc) {
            const range = this._timezoneService.getAPIDateRange(this.lastSearchParams.Batdau, this.lastSearchParams.Ketthuc);
            startDate = range.Batdau;
            endDate = range.Ketthuc;
          } else {
            const today = /* @__PURE__ */ new Date();
            const range = this._timezoneService.getAPIDateRange(today, today);
            startDate = range.Batdau;
            endDate = range.Ketthuc;
          }
          const response = yield this._GraphqlService.getNhuCauDatHang(startDate, endDate, true);
          const rawAggregated = response || [];
          const warehouses = [
            { value: "kho1", label: "TG-LONG AN", makho: "TG-LA" },
            { value: "kho2", label: "B\u1ED5 Sung", makho: "TG-BS" },
            { value: "kho3", label: "TG-\u0110\xC0 L\u1EA0T", makho: "TG-\u0110L" },
            { value: "kho4", label: "KHO T\u1ED4NG - HCM", makho: "TG-HCM" },
            { value: "kho5", label: "SG1", makho: "TG-SG1" },
            { value: "kho6", label: "SG2", makho: "TG-SG2" }
          ];
          const processedAggregated = (rawAggregated.data || []).map((item) => {
            const lastCountTime = item.updatedAt ? new Date(item.updatedAt).getTime() : 0;
            const receivedAfterCount = (item.Dathangs || []).filter((dh) => dh.status === "danhan" && dh.updatedAt && new Date(dh.updatedAt).getTime() > lastCountTime).reduce((sum, dh) => sum + (Number(dh.slnhan) || 0), 0);
            const deliveredAfterCount = (item.Donhangs || []).filter((dh) => (dh.status === "dagiao" || dh.status === "danhan" || dh.status === "hoanthanh") && dh.updatedAt && new Date(dh.updatedAt).getTime() > lastCountTime).reduce((sum, dh) => sum + (Number(dh.slnhan) || 0), 0);
            const khoValues = {};
            warehouses.forEach((w) => khoValues[w.value] = 0);
            if (item.Dathangs) {
              item.Dathangs.forEach((dh) => {
                if (dh.status === "dadat" || dh.status === "dagiao") {
                  const w = warehouses.find((kho) => kho.makho === dh.makho);
                  if (w)
                    khoValues[w.value] += Number(dh.sldat) || 0;
                }
              });
            }
            const incomingStock = Object.values(khoValues).reduce((sum, val) => sum + val, 0);
            const tongkho = parseFloat((Number(item.sltontt || 0) + receivedAfterCount - deliveredAfterCount + incomingStock).toFixed(3));
            const khachdat = Number(item.khachdat) || 0;
            const khachgiao = Number(item.khachgiao) || 0;
            const slhaohut = khachdat > 0 ? parseFloat((khachdat * (item.haohut || 0) / 100).toFixed(3)) : 0;
            const goiy = parseFloat((khachdat + slhaohut + khachgiao - tongkho).toFixed(3));
            return __spreadProps(__spreadValues({
              ngaynhan: item.Dathangs && item.Dathangs.length > 0 ? (0, import_moment.default)(item.Dathangs[0].ngaynhan).format("YYYY-MM-DD") : "",
              mancc: item.mancc || "",
              name: item.name || "",
              masp: item.masp || "",
              title: item.title || "",
              dvt: item.dvt || "",
              xSLDat: 0,
              // Default for template
              goiy,
              ghichu: item.ghichu || "",
              khachdat,
              khachgiao,
              khachhuy: item.khachhuy || 0,
              slton: tongkho,
              tongkho,
              sltontt: Number(item.sltontt) || 0,
              slsnapshot: Number(item.slsnapshot) || 0,
              chenhlech: parseFloat((tongkho - (Number(item.sltontt) || 0)).toFixed(3))
            }, khoValues), {
              haohut: item.haohut || 0,
              slhaohut
            });
          });
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
            khachdat: "T\u1ED4NG \u0110\u1EB6T (KH\xC1CH)",
            khachgiao: "T\u1ED4NG B\xC1N (GIAO)",
            khachhuy: "S\u1ED0 L\u01AF\u1EE2NG H\u1EE6Y",
            slton: "T\u1ED2N H\u1EC6 TH\u1ED0NG",
            tongkho: "T\u1ED4NG T\u1ED2N (C\xC1C KHO)",
            sltontt: "T\u1ED2N CH\u1ED0T KHO (TH\u1EF0C T\u1EBE)",
            slsnapshot: "S\u1ED0 L\u01AF\u1EE2NG CH\u1ED0T KHO (SNAPSHOT)",
            chenhlech: "CH\xCANH L\u1EC6CH",
            kho1: "TG-LONG AN",
            kho2: "B\u1ED4 SUNG",
            kho3: "TG-\u0110\xC0 L\u1EA0T",
            kho4: "KHO T\u1ED4NG - HCM",
            kho5: "SG1",
            kho6: "SG2",
            haohut: "T\u1EC8 L\u1EC6 HAO H\u1EE4T (%)",
            slhaohut: "SL HAO H\u1EE4T"
          };
          tonghopSheetData = processedAggregated.map((item) => {
            const row = {};
            Object.keys(mapping).forEach((key) => {
              const val = item[key];
              if (["ngaynhan", "mancc", "name", "masp", "title", "dvt", "ghichu"].includes(key)) {
                row[mapping[key]] = val || "";
              } else {
                row[mapping[key]] = val === null || val === void 0 || val === "" ? 0 : val;
              }
            });
            return row;
          });
        } catch (error) {
          console.warn("Kh\xF4ng th\u1EC3 t\u1EA1o sheet T\u1ED5ng h\u1EE3p:", error);
        }
        const { writeExcelFileSheets } = yield import("./chunk-DRNKRPRX.mjs");
        const sheets = {
          "T\u1ED5ng h\u1EE3p": { data: tonghopSheetData },
          "V\u1EADn \u0111\u01A1n": { data: vandonSheetData },
          "H\xE0ng ST": { data: hangSieuThiAOA },
          "TH Hang ST": { data: thHangSieuThiAOA },
          "Kh\xE1ch l\u1EBB": { data: hangKhachLeAOA },
          "Phi\u1EBFu Chuy\u1EC3n": { data: phieuChuyenSheetData }
        };
        writeExcelFileSheets(sheets, fileName);
        this._snackBar.open("Xu\u1EA5t Excel th\xE0nh c\xF4ng (5 sheet)", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        yield this._ErrorLogService.logError(`L\u1ED7i xu\u1EA5t Excel v\u1EADn \u0111\u01A1n si\xEAu th\u1ECB: ${error.message || error}`);
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
  /**
   * Xuất Excel báo cáo tồn kho cho Figure 2
   */
  exportFig2InventoryToExcel(maSPs) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const products = yield this._GraphqlService.findMany("sanpham", {
          where: { masp: { in: maSPs } },
          include: {
            TonKho: {
              select: {
                slton: true
              }
            },
            chotkhodetail: {
              orderBy: { ngaychot: "desc" },
              take: 1,
              select: {
                sltonhethong: true,
                sltonthucte: true,
                chenhlech: true,
                ngaychot: true
              }
            }
          }
        });
        if (!products || products.length === 0) {
          throw new Error("Kh\xF4ng t\xECm th\u1EA5y d\u1EEF li\u1EC7u cho c\xE1c s\u1EA3n ph\u1EA9m Figure 2");
        }
        const sortedProducts = maSPs.map((masp) => products.find((p) => p.masp === masp)).filter((p) => !!p);
        const reportData = sortedProducts.map((p) => {
          const lastClosing = p.chotkhodetail?.[0] || {};
          return {
            "M\xE3 S\u1EA3n Ph\u1EA9m": p.masp || "",
            "T\xEAn S\u1EA3n Ph\u1EA9m": p.title || "",
            "T\u1ED2N H\u1EC6 TH\u1ED0NG": Number(p.TonKho?.slton) || 0,
            "T\u1ED2N CH\u1ED0T KHO (TH\u1EF0C T\u1EBE)": Number(lastClosing.sltonthucte) || 0,
            "S\u1ED0 L\u01AF\u1EE2NG CH\u1ED0T KHO (SNAPSHOT)": Number(lastClosing.sltonhethong) || 0,
            "CH\xCANH L\u1EC6CH": Number(lastClosing.chenhlech) || 0
          };
        });
        const fileName = `DoiSoat_TonKho_Hinh2_${(0, import_moment.default)().format("DD-MM-YYYY")}`;
        const { writeExcelFileSheets } = yield import("./chunk-DRNKRPRX.mjs");
        writeExcelFileSheets({
          "\u0110\u1ED1i So\xE1t Figure 2": {
            data: reportData,
            headers: ["M\xE3 S\u1EA3n Ph\u1EA9m", "T\xEAn S\u1EA3n Ph\u1EA9m", "T\u1ED2N H\u1EC6 TH\u1ED0NG", "T\u1ED2N CH\u1ED0T KHO (TH\u1EF0C T\u1EBE)", "S\u1ED0 L\u01AF\u1EE2NG CH\u1ED0T KHO (SNAPSHOT)", "CH\xCANH L\u1EC6CH"]
          }
        }, fileName);
        this._snackBar.open("Xu\u1EA5t Excel H\xECnh 2 (\u0110\u1ED1i so\xE1t t\u1ED3n kho) th\xE0nh c\xF4ng", "", {
          duration: 3e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-success"]
        });
      } catch (error) {
        console.error("Export error:", error);
        this._snackBar.open("L\u1ED7i khi xu\u1EA5t Excel H\xECnh 2: " + error.message, "", {
          duration: 5e3,
          panelClass: ["snackbar-error"]
        });
      } finally {
        this.loading.set(false);
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
//# sourceMappingURL=chunk-VATJDZHC.mjs.map
