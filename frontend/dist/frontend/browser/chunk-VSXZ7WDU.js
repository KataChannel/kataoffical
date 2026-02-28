import {
  writeExcelFile
} from "./chunk-DOJR6IHP.js";
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
  HttpClient,
  HttpHeaders
} from "./chunk-WSR5IJUW.js";
import {
  firstValueFrom,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-FWM3YOMT.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/models/nhanvien.model.ts
var GioiTinh;
(function(GioiTinh2) {
  GioiTinh2["NAM"] = "NAM";
  GioiTinh2["NU"] = "NU";
  GioiTinh2["KHAC"] = "KHAC";
})(GioiTinh || (GioiTinh = {}));
var GioiTinhLabels = {
  [GioiTinh.NAM]: "Nam",
  [GioiTinh.NU]: "N\u1EEF",
  [GioiTinh.KHAC]: "Kh\xE1c"
};
var TrangThaiNhanvien;
(function(TrangThaiNhanvien2) {
  TrangThaiNhanvien2["DANGLAMVIEC"] = "DANGLAMVIEC";
  TrangThaiNhanvien2["NGHIPHEP"] = "NGHIPHEP";
  TrangThaiNhanvien2["THUVIEC"] = "THUVIEC";
  TrangThaiNhanvien2["DANGHIVIEC"] = "DANGHIVIEC";
  TrangThaiNhanvien2["TAMNGHI"] = "TAMNGHI";
  TrangThaiNhanvien2["KHAC"] = "KHAC";
})(TrangThaiNhanvien || (TrangThaiNhanvien = {}));
var TrangThaiNhanvienLabels = {
  [TrangThaiNhanvien.DANGLAMVIEC]: "\u0110ang l\xE0m vi\u1EC7c",
  [TrangThaiNhanvien.NGHIPHEP]: "Ngh\u1EC9 ph\xE9p",
  [TrangThaiNhanvien.THUVIEC]: "Th\u1EED vi\u1EC7c",
  [TrangThaiNhanvien.DANGHIVIEC]: "\u0110\xE3 ngh\u1EC9 vi\u1EC7c",
  [TrangThaiNhanvien.TAMNGHI]: "T\u1EA1m ngh\u1EC9",
  [TrangThaiNhanvien.KHAC]: "Kh\xE1c"
};
var TrangThaiNhanvienColors = {
  [TrangThaiNhanvien.DANGLAMVIEC]: "text-green-600 bg-green-50",
  [TrangThaiNhanvien.NGHIPHEP]: "text-blue-600 bg-blue-50",
  [TrangThaiNhanvien.THUVIEC]: "text-yellow-600 bg-yellow-50",
  [TrangThaiNhanvien.DANGHIVIEC]: "text-gray-600 bg-gray-50",
  [TrangThaiNhanvien.TAMNGHI]: "text-orange-600 bg-orange-50",
  [TrangThaiNhanvien.KHAC]: "text-purple-600 bg-purple-50"
};

// src/app/admin/nhanvien/nhanvien.service.ts
var NhanvienService = class _NhanvienService {
  http = inject(HttpClient);
  storageService = inject(StorageService);
  snackBar = inject(MatSnackBar);
  apiUrl = `${environment.APIURL}/nhanvien`;
  // Signals for reactive state management
  ListNhanvien = signal([]);
  DetailNhanvien = signal(null);
  Statistics = signal(null);
  total = signal(0);
  page = signal(1);
  limit = signal(50);
  loading = signal(false);
  error = signal(null);
  getHeaders() {
    const token = this.storageService.getItem("token");
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": `Bearer ${token}`
    });
  }
  /**
   * Get all nhân viên with pagination and filters
   */
  getAllNhanvien(options) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        let url = this.apiUrl;
        const params = [];
        if (options?.phongbanId) {
          params.push(`phongbanId=${options.phongbanId}`);
        }
        if (options?.trangThai) {
          params.push(`trangThai=${options.trangThai}`);
        }
        if (options?.chucVu) {
          params.push(`chucVu=${options.chucVu}`);
        }
        if (options?.search) {
          params.push(`search=${encodeURIComponent(options.search)}`);
        }
        if (options?.page) {
          params.push(`page=${options.page}`);
          this.page.set(options.page);
        }
        if (options?.limit) {
          params.push(`limit=${options.limit}`);
          this.limit.set(options.limit);
        }
        if (params.length > 0) {
          url += "?" + params.join("&");
        }
        const response = yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
        this.ListNhanvien.set(response.data);
        this.total.set(response.total);
        this.page.set(response.page);
        this.limit.set(response.limit);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i danh s\xE1ch nh\xE2n vi\xEAn");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i danh s\xE1ch nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get nhân viên statistics
   */
  getStatistics() {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/statistics`, { headers: this.getHeaders() }));
        this.Statistics.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i th\u1ED1ng k\xEA");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i th\u1ED1ng k\xEA", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get nhân viên by ID
   */
  getNhanvienById(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }));
        this.DetailNhanvien.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i chi ti\u1EBFt nh\xE2n vi\xEAn");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i chi ti\u1EBFt nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Get nhân viên by mã
   */
  getNhanvienByMaNV(maNV) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.get(`${this.apiUrl}/ma/${maNV}`, { headers: this.getHeaders() }));
        this.DetailNhanvien.set(response);
        return response;
      } catch (error) {
        this.error.set(error.message || "L\u1ED7i khi t\u1EA3i nh\xE2n vi\xEAn");
        this.snackBar.open("L\u1ED7i khi t\u1EA3i nh\xE2n vi\xEAn", "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Create new nhân viên
   */
  createNhanvien(data) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.post(this.apiUrl, data, { headers: this.getHeaders() }));
        this.snackBar.open("T\u1EA1o nh\xE2n vi\xEAn th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllNhanvien({ page: this.page(), limit: this.limit() });
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi t\u1EA1o nh\xE2n vi\xEAn";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Update nhân viên
   */
  updateNhanvien(id, data) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.patch(`${this.apiUrl}/${id}`, data, { headers: this.getHeaders() }));
        this.snackBar.open("C\u1EADp nh\u1EADt nh\xE2n vi\xEAn th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllNhanvien({ page: this.page(), limit: this.limit() });
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi c\u1EADp nh\u1EADt nh\xE2n vi\xEAn";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Delete nhân viên
   */
  deleteNhanvien(id) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.delete(`${this.apiUrl}/${id}`, { headers: this.getHeaders() }));
        this.snackBar.open(response.message, "\u0110\xF3ng", { duration: 3e3 });
        yield this.getAllNhanvien({ page: this.page(), limit: this.limit() });
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi x\xF3a nh\xE2n vi\xEAn";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Link nhân viên to user
   */
  linkToUser(nhanvienId, userId) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.post(`${this.apiUrl}/${nhanvienId}/link-user`, { userId }, { headers: this.getHeaders() }));
        this.snackBar.open("Li\xEAn k\u1EBFt user th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi li\xEAn k\u1EBFt user";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Unlink nhân viên from user
   */
  unlinkFromUser(nhanvienId) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        this.error.set(null);
        const response = yield firstValueFrom(this.http.post(`${this.apiUrl}/${nhanvienId}/unlink-user`, {}, { headers: this.getHeaders() }));
        this.snackBar.open("G\u1EE1 li\xEAn k\u1EBFt user th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
        return response;
      } catch (error) {
        const message = error.error?.message || "L\u1ED7i khi g\u1EE1 li\xEAn k\u1EBFt user";
        this.error.set(message);
        this.snackBar.open(message, "\u0110\xF3ng", { duration: 3e3 });
        throw error;
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Reset error state
   */
  clearError() {
    this.error.set(null);
  }
  /**
   * Reset all signals
   */
  reset() {
    this.ListNhanvien.set([]);
    this.DetailNhanvien.set(null);
    this.Statistics.set(null);
    this.total.set(0);
    this.page.set(1);
    this.limit.set(50);
    this.loading.set(false);
    this.error.set(null);
  }
  // ==========================================
  // IMPORT / EXPORT METHODS
  // ==========================================
  /**
   * Export nhân viên to Excel
   */
  exportToExcel(options) {
    return __async(this, null, function* () {
      try {
        this.loading.set(true);
        const response = yield firstValueFrom(this.http.get(this.apiUrl + "?limit=10000", { headers: this.getHeaders() }));
        if (!response.data || response.data.length === 0) {
          this.snackBar.open("Kh\xF4ng c\xF3 d\u1EEF li\u1EC7u \u0111\u1EC3 xu\u1EA5t", "\u0110\xF3ng", { duration: 3e3 });
          return;
        }
        const headers = [
          "M\xE3 NV",
          "M\xE3 L\xE0m Vi\u1EC7c",
          "H\u1ECD v\xE0 T\xEAn",
          "Gi\u1EDBi T\xEDnh",
          "Ng\xE0y Sinh",
          "CMND/CCCD",
          "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i",
          "Email",
          "\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i",
          "Ph\xF2ng Ban",
          "Ch\u1EE9c V\u1EE5",
          "V\u1ECB Tr\xED",
          "Ng\xE0y V\xE0o L\xE0m",
          "Tr\u1EA1ng Th\xE1i",
          "L\u01B0\u01A1ng C\u01A1 B\u1EA3n",
          "Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c",
          "Ph\u1EE5 C\u1EA5p X\u0103ng",
          "Ph\u1EE5 C\u1EA5p \u0110T",
          "H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n",
          "Ti\u1EC1n \u0102n Gi\u1EEFa Ca",
          "Th\u01B0\u1EDFng Kinh Doanh",
          "Ph\u1EE5 C\u1EA5p Kh\xE1c",
          "S\u1ED1 T\xE0i Kho\u1EA3n",
          "Ng\xE2n H\xE0ng",
          "Chi Nh\xE1nh",
          "Ghi Ch\xFA"
        ];
        const mapping = {
          "maNV": "M\xE3 NV",
          "maLamViec": "M\xE3 L\xE0m Vi\u1EC7c",
          "hoTen": "H\u1ECD v\xE0 T\xEAn",
          "gioiTinhLabel": "Gi\u1EDBi T\xEDnh",
          "ngaySinhFormatted": "Ng\xE0y Sinh",
          "cmnd": "CMND/CCCD",
          "soDienThoai": "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i",
          "email": "Email",
          "diaChiHienTai": "\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i",
          "phongbanTen": "Ph\xF2ng Ban",
          "chucVu": "Ch\u1EE9c V\u1EE5",
          "viTri": "V\u1ECB Tr\xED",
          "ngayVaoLamFormatted": "Ng\xE0y V\xE0o L\xE0m",
          "trangThaiLabel": "Tr\u1EA1ng Th\xE1i",
          "luongCoBan": "L\u01B0\u01A1ng C\u01A1 B\u1EA3n",
          "hieuSuatCongViec": "Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c",
          "phuCapXang": "Ph\u1EE5 C\u1EA5p X\u0103ng",
          "phuCapDienThoai": "Ph\u1EE5 C\u1EA5p \u0110T",
          "hoTroChuyenCan": "H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n",
          "tienAnGiuaCa": "Ti\u1EC1n \u0102n Gi\u1EEFa Ca",
          "thuongKinhDoanh": "Th\u01B0\u1EDFng Kinh Doanh",
          "phuCapKhac": "Ph\u1EE5 C\u1EA5p Kh\xE1c",
          "soTaiKhoan": "S\u1ED1 T\xE0i Kho\u1EA3n",
          "nganHang": "Ng\xE2n H\xE0ng",
          "chiNhanh": "Chi Nh\xE1nh",
          "ghiChu": "Ghi Ch\xFA"
        };
        const exportData = response.data.map((nv) => __spreadProps(__spreadValues({}, nv), {
          gioiTinhLabel: nv.gioiTinh ? GioiTinhLabels[nv.gioiTinh] : "",
          trangThaiLabel: TrangThaiNhanvienLabels[nv.trangThai] || nv.trangThai,
          ngaySinhFormatted: nv.ngaySinh ? new Date(nv.ngaySinh).toLocaleDateString("vi-VN") : "",
          ngayVaoLamFormatted: nv.ngayVaoLam ? new Date(nv.ngayVaoLam).toLocaleDateString("vi-VN") : "",
          phongbanTen: nv.phongban?.ten || ""
        }));
        writeExcelFile(exportData, "DanhSachNhanVien", headers, mapping);
        this.snackBar.open(`\u0110\xE3 xu\u1EA5t ${response.data.length} nh\xE2n vi\xEAn th\xE0nh c\xF4ng`, "\u0110\xF3ng", { duration: 3e3 });
      } catch (error) {
        console.error("Error exporting to Excel:", error);
        this.snackBar.open("L\u1ED7i khi xu\u1EA5t Excel", "\u0110\xF3ng", { duration: 3e3 });
      } finally {
        this.loading.set(false);
      }
    });
  }
  /**
   * Export template Excel for import
   */
  exportImportTemplate() {
    const templateData = [
      {
        "M\xE3 NV": "NV001",
        "M\xE3 L\xE0m Vi\u1EC7c": "MLV001",
        "H\u1ECD v\xE0 T\xEAn": "Nguy\u1EC5n V\u0103n A",
        "Gi\u1EDBi T\xEDnh": "Nam",
        "Ng\xE0y Sinh": "01/01/1990",
        "CMND/CCCD": "012345678901",
        "S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i": "0901234567",
        "Email": "example@email.com",
        "\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i": "123 \u0110\u01B0\u1EDDng ABC, Qu\u1EADn XYZ",
        "Ph\xF2ng Ban": "K\u1EBF To\xE1n",
        "Ch\u1EE9c V\u1EE5": "Nh\xE2n vi\xEAn",
        "V\u1ECB Tr\xED": "KT N\u1ED9i B\u1ED9",
        "Ng\xE0y V\xE0o L\xE0m": "01/01/2024",
        "Tr\u1EA1ng Th\xE1i": "\u0110ang l\xE0m vi\u1EC7c",
        "L\u01B0\u01A1ng C\u01A1 B\u1EA3n": 1e7,
        "Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c": 0,
        "Ph\u1EE5 C\u1EA5p X\u0103ng": 5e5,
        "Ph\u1EE5 C\u1EA5p \u0110T": 2e5,
        "H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n": 3e5,
        "Ti\u1EC1n \u0102n Gi\u1EEFa Ca": 5e5,
        "Th\u01B0\u1EDFng Kinh Doanh": 0,
        "Ph\u1EE5 C\u1EA5p Kh\xE1c": 0,
        "S\u1ED1 T\xE0i Kho\u1EA3n": "1234567890",
        "Ng\xE2n H\xE0ng": "Vietcombank",
        "Chi Nh\xE1nh": "Chi nh\xE1nh HCM",
        "Ghi Ch\xFA": ""
      }
    ];
    const headers = Object.keys(templateData[0]);
    writeExcelFile(templateData, "MauImportNhanVien", headers);
    this.snackBar.open("\u0110\xE3 t\u1EA3i m\u1EABu import th\xE0nh c\xF4ng", "\u0110\xF3ng", { duration: 3e3 });
  }
  /**
   * Import nhân viên from Excel data
   */
  importFromExcel(data) {
    return __async(this, null, function* () {
      const result = { success: 0, failed: 0, errors: [] };
      for (let i = 0; i < data.length; i++) {
        const row = data[i];
        const rowNum = i + 2;
        try {
          const nhanvienData = this.transformImportRow(row);
          if (!nhanvienData.maNV) {
            result.errors.push(`D\xF2ng ${rowNum}: M\xE3 NV l\xE0 b\u1EAFt bu\u1ED9c`);
            result.failed++;
            continue;
          }
          if (!nhanvienData.hoTen) {
            result.errors.push(`D\xF2ng ${rowNum}: H\u1ECD v\xE0 t\xEAn l\xE0 b\u1EAFt bu\u1ED9c`);
            result.failed++;
            continue;
          }
          try {
            const existing = yield firstValueFrom(this.http.get(`${this.apiUrl}/ma/${nhanvienData.maNV}`, { headers: this.getHeaders() }));
            yield firstValueFrom(this.http.patch(`${this.apiUrl}/${existing.id}`, nhanvienData, { headers: this.getHeaders() }));
            result.success++;
          } catch (e) {
            if (e.status === 404) {
              yield firstValueFrom(this.http.post(this.apiUrl, nhanvienData, { headers: this.getHeaders() }));
              result.success++;
            } else {
              throw e;
            }
          }
        } catch (error) {
          const message = error?.error?.message || error?.message || "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
          result.errors.push(`D\xF2ng ${rowNum}: ${message}`);
          result.failed++;
        }
      }
      return result;
    });
  }
  /**
   * Transform Excel row to CreateNhanvienDto
   */
  transformImportRow(row) {
    const gioiTinhMap = {
      "Nam": GioiTinh.NAM,
      "N\u1EEF": GioiTinh.NU,
      "nam": GioiTinh.NAM,
      "n\u1EEF": GioiTinh.NU,
      "NAM": GioiTinh.NAM,
      "NU": GioiTinh.NU,
      "Kh\xE1c": GioiTinh.KHAC
    };
    const trangThaiMap = {
      "\u0110ang l\xE0m vi\u1EC7c": TrangThaiNhanvien.DANGLAMVIEC,
      "\u0110ang L\xE0m Vi\u1EC7c": TrangThaiNhanvien.DANGLAMVIEC,
      "Ngh\u1EC9 ph\xE9p": TrangThaiNhanvien.NGHIPHEP,
      "Th\u1EED vi\u1EC7c": TrangThaiNhanvien.THUVIEC,
      "\u0110\xE3 ngh\u1EC9 vi\u1EC7c": TrangThaiNhanvien.DANGHIVIEC,
      "T\u1EA1m ngh\u1EC9": TrangThaiNhanvien.TAMNGHI,
      "Kh\xE1c": TrangThaiNhanvien.KHAC,
      "DANGLAMVIEC": TrangThaiNhanvien.DANGLAMVIEC,
      "NGHIPHEP": TrangThaiNhanvien.NGHIPHEP,
      "THUVIEC": TrangThaiNhanvien.THUVIEC,
      "DANGHIVIEC": TrangThaiNhanvien.DANGHIVIEC,
      "TAMNGHI": TrangThaiNhanvien.TAMNGHI
    };
    const parseDate = (value) => {
      if (!value)
        return void 0;
      if (value instanceof Date)
        return value.toISOString();
      const str = String(value).trim();
      if (!str)
        return void 0;
      const parts = str.split("/");
      if (parts.length === 3) {
        const [day, month, year] = parts.map((p) => parseInt(p));
        if (day && month && year) {
          return new Date(year, month - 1, day).toISOString();
        }
      }
      const date = new Date(str);
      return isNaN(date.getTime()) ? void 0 : date.toISOString();
    };
    const parseNumber = (value) => {
      if (value === null || value === void 0 || value === "")
        return void 0;
      const num = Number(value);
      return isNaN(num) ? void 0 : num;
    };
    return {
      maNV: String(row["M\xE3 NV"] || row["maNV"] || "").trim(),
      maLamViec: String(row["M\xE3 L\xE0m Vi\u1EC7c"] || row["maLamViec"] || "").trim() || void 0,
      hoTen: String(row["H\u1ECD v\xE0 T\xEAn"] || row["hoTen"] || "").trim(),
      gioiTinh: gioiTinhMap[row["Gi\u1EDBi T\xEDnh"] || row["gioiTinh"]] || GioiTinh.KHAC,
      ngaySinh: parseDate(row["Ng\xE0y Sinh"] || row["ngaySinh"]),
      cmnd: String(row["CMND/CCCD"] || row["cmnd"] || "").trim() || void 0,
      soDienThoai: String(row["S\u1ED1 \u0110i\u1EC7n Tho\u1EA1i"] || row["soDienThoai"] || "").trim() || void 0,
      email: String(row["Email"] || row["email"] || "").trim() || void 0,
      diaChiHienTai: String(row["\u0110\u1ECBa Ch\u1EC9 Hi\u1EC7n T\u1EA1i"] || row["diaChiHienTai"] || "").trim() || void 0,
      chucVu: String(row["Ch\u1EE9c V\u1EE5"] || row["chucVu"] || "").trim() || void 0,
      viTri: String(row["V\u1ECB Tr\xED"] || row["viTri"] || "").trim() || void 0,
      ngayVaoLam: parseDate(row["Ng\xE0y V\xE0o L\xE0m"] || row["ngayVaoLam"]),
      trangThai: trangThaiMap[row["Tr\u1EA1ng Th\xE1i"] || row["trangThai"]] || TrangThaiNhanvien.THUVIEC,
      luongCoBan: parseNumber(row["L\u01B0\u01A1ng C\u01A1 B\u1EA3n"] || row["luongCoBan"]),
      hieuSuatCongViec: parseNumber(row["Hi\u1EC7u Su\u1EA5t C\xF4ng Vi\u1EC7c"] || row["hieuSuatCongViec"]),
      phuCapXang: parseNumber(row["Ph\u1EE5 C\u1EA5p X\u0103ng"] || row["phuCapXang"]),
      phuCapDienThoai: parseNumber(row["Ph\u1EE5 C\u1EA5p \u0110T"] || row["phuCapDienThoai"]),
      hoTroChuyenCan: parseNumber(row["H\u1ED7 Tr\u1EE3 Chuy\xEAn C\u1EA7n"] || row["hoTroChuyenCan"]),
      tienAnGiuaCa: parseNumber(row["Ti\u1EC1n \u0102n Gi\u1EEFa Ca"] || row["tienAnGiuaCa"]),
      thuongKinhDoanh: parseNumber(row["Th\u01B0\u1EDFng Kinh Doanh"] || row["thuongKinhDoanh"]),
      phuCapKhac: parseNumber(row["Ph\u1EE5 C\u1EA5p Kh\xE1c"] || row["phuCapKhac"]),
      soTaiKhoan: String(row["S\u1ED1 T\xE0i Kho\u1EA3n"] || row["soTaiKhoan"] || "").trim() || void 0,
      nganHang: String(row["Ng\xE2n H\xE0ng"] || row["nganHang"] || "").trim() || void 0,
      chiNhanh: String(row["Chi Nh\xE1nh"] || row["chiNhanh"] || "").trim() || void 0,
      ghiChu: String(row["Ghi Ch\xFA"] || row["ghiChu"] || "").trim() || void 0,
      isActive: true
    };
  }
  static \u0275fac = function NhanvienService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _NhanvienService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _NhanvienService, factory: _NhanvienService.\u0275fac, providedIn: "root" });
};

export {
  GioiTinh,
  GioiTinhLabels,
  TrangThaiNhanvien,
  TrangThaiNhanvienLabels,
  NhanvienService
};
//# sourceMappingURL=chunk-VSXZ7WDU.js.map
