import {
  DynamicnumberToCode
} from "./chunk-TK4U3V5E.js";
import {
  UserService
} from "./chunk-RP2YRSE3.js";
import {
  StorageService
} from "./chunk-SSKGL4JO.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  MatSnackBar
} from "./chunk-43IDDEVP.js";
import {
  GraphqlService
} from "./chunk-Y4MVQOE5.js";
import {
  Apollo,
  gql
} from "./chunk-IABB4NTX.js";
import {
  HttpClient
} from "./chunk-HCACJZKN.js";
import {
  firstValueFrom,
  inject,
  signal,
  ɵɵdefineInjectable
} from "./chunk-RBDY2J7V.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/chotkho/chotkho.service.ts
var ChotkhoService = class _ChotkhoService {
  graphqlService = inject(GraphqlService);
  storageService = inject(StorageService);
  userService = inject(UserService);
  snackBar = inject(MatSnackBar);
  http = inject(HttpClient);
  apollo = inject(Apollo);
  apiUrl = environment.APIURL;
  modelName = "chotkho";
  detailModelName = "chotkhodetail";
  chotkhos = signal([]);
  isLoading = signal(false);
  selectedChotkho = signal(null);
  ListChotkho = signal([]);
  DetailChotkho = signal(null);
  page = signal(1);
  totalPages = signal(1);
  total = signal(0);
  pageSize = signal(50);
  chotkhoId = signal(null);
  isRefreshing = signal(false);
  lastUpdated = signal(null);
  ChotkhoCodeId() {
    return __async(this, null, function* () {
      try {
        const maxOrderResult = yield this.graphqlService.aggregate("chotkho", {
          _max: { order: true }
        });
        let maxOrder = maxOrderResult._max?.order || 0;
        let newOrder = maxOrder + 1;
        let codeId = DynamicnumberToCode("Chotkho", newOrder, false);
        let existingCodeId = yield this.graphqlService.findFirst("chotkho", {
          where: { codeId },
          select: { codeId: true }
        });
        while (existingCodeId && existingCodeId.codeId) {
          newOrder++;
          codeId = DynamicnumberToCode("Chotkho", newOrder, false);
          existingCodeId = yield this.graphqlService.findFirst("chotkho", {
            where: { codeId },
            select: { codeId: true }
          });
        }
        return { codeId, newOrder };
      } catch (error) {
        console.error("Error generating chotkho code ID:", error);
        this.showErrorMessage("L\u1ED7i khi t\u1EA1o m\xE3 ch\u1ED1t kho");
        const timestamp = Date.now().toString().slice(-6);
        const maxOrderResult = yield this.graphqlService.aggregate("chotkho", {
          _max: { order: true }
        });
        let maxOrder = maxOrderResult._max?.order || 0;
        let newOrder = maxOrder + 1;
        return { codeId: `CK-${timestamp}`, newOrder };
      }
    });
  }
  createChotkhoWithDetails(data) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const newChotkho = yield this.ChotkhoCodeId();
        const currentUserId = data.userId || (yield this.getCurrentUserId());
        const nestedCreateData = {
          ngaychot: data.ngaychot,
          title: data.title,
          ghichu: data.ghichu,
          userId: currentUserId,
          codeId: newChotkho.codeId,
          order: newChotkho.newOrder,
          details: {
            create: data.details && data.details.length > 0 ? data.details.map((detail) => ({
              sanphamId: detail.sanphamId,
              userId: currentUserId,
              sltonhethong: detail.sltonhethong || 0,
              sltonthucte: detail.sltonthucte || 0,
              slhuy: detail.slhuy || 0,
              chenhlech: this.calculateChenhLech(detail.sltonhethong || 0, detail.sltonthucte || 0, detail.slhuy || 0),
              ghichu: detail.ghichu || ""
            })) : []
          }
        };
        const masterResult = yield this.graphqlService.createOne(this.modelName, nestedCreateData, {
          select: {
            id: true,
            ngaychot: true,
            title: true,
            ghichu: true,
            userId: true,
            codeId: true,
            order: true,
            details: {
              select: {
                id: true,
                sanphamId: true,
                sltonhethong: true,
                sltonthucte: true,
                slhuy: true,
                chenhlech: true,
                ghichu: true
              }
            }
          }
        });
        if (!masterResult || !masterResult.id) {
          this.showErrorMessage("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho");
          return false;
        }
        masterResult.details.map((v) => __async(this, null, function* () {
          yield this.graphqlService.updateOne("tonkho", { sanphamId: v.sanphamId }, {
            slton: v.sltonthucte || 0,
            sltontt: v.sltonthucte || 0
          });
        }));
        console.log("Ch\u1ED1t kho \u0111\xE3 \u0111\u01B0\u1EE3c t\u1EA1o th\xE0nh c\xF4ng:", masterResult);
        this.showSuccessMessage(`T\u1EA1o ch\u1ED1t kho th\xE0nh c\xF4ng v\u1EDBi ${masterResult.details?.length || 0} chi ti\u1EBFt`);
        yield this.getAllChotkho();
        return masterResult;
      } catch (error) {
        console.error("Error creating chotkho with details:", error);
        this.showErrorMessage("L\u1ED7i khi t\u1EA1o ch\u1ED1t kho");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getAllChotkho(searchParam) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        let whereClause = "isActive: true";
        if (searchParam) {
          const conditions = [];
          if (searchParam.khoId) {
            conditions.push(`khoId: "${searchParam.khoId}"`);
          }
          if (searchParam.userId) {
            conditions.push(`userId: "${searchParam.userId}"`);
          }
          if (searchParam.startDate && searchParam.endDate) {
            conditions.push(`ngaychot: { gte: "${searchParam.startDate}", lte: "${searchParam.endDate}" }`);
          }
          if (searchParam.searchText) {
            conditions.push(`OR: [
            { title: { contains: "${searchParam.searchText}" } },
            { ghichu: { contains: "${searchParam.searchText}" } },
            { codeId: { contains: "${searchParam.searchText}" } }
          ]`);
          }
          if (conditions.length > 0) {
            whereClause = `AND: [{ isActive: true }, { ${conditions.join(", ")} }]`;
          }
        }
        const result = yield this.graphqlService.findMany(this.modelName, {
          where: whereClause,
          orderBy: { ngaychot: "desc" },
          skip: ((searchParam?.page || 1) - 1) * (searchParam?.limit || 50),
          take: searchParam?.limit || 50,
          include: {
            kho: {
              select: { id: true, name: true }
            },
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: { name: true }
                }
              }
            }
          }
        });
        if (result) {
          this.ListChotkho.set(result || []);
          this.chotkhos.set(result || []);
          this.total.set(result.length || 0);
          this.totalPages.set(Math.ceil((result.length || 0) / (searchParam?.limit || 50)));
          this.page.set(searchParam?.page || 1);
        }
      } catch (error) {
        console.error("Error getting chotkho data:", error);
        this.showErrorMessage("L\u1ED7i khi t\u1EA3i d\u1EEF li\u1EC7u ch\u1ED1t kho");
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  getChotkhoById(id) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const result = yield this.graphqlService.findUnique(this.modelName, { id }, {
          include: {
            user: {
              select: {
                id: true,
                email: true,
                profile: {
                  select: { name: true }
                }
              }
            },
            details: {
              include: {
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
        if (result) {
          const processedResult = __spreadProps(__spreadValues({}, result), {
            details: result.details?.map((detail) => __spreadProps(__spreadValues({}, detail), {
              // Flatten sanpham fields to detail level for table display
              title: detail.sanpham?.title,
              masp: detail.sanpham?.masp,
              dvt: detail.sanpham?.dvt,
              // Keep original sanpham object for reference
              sanpham: detail.sanpham
            })) || []
          });
          this.selectedChotkho.set(processedResult);
          this.DetailChotkho.set(processedResult);
          return processedResult;
        }
        return null;
      } catch (error) {
        console.error("Error getting chotkho by id:", error);
        this.showErrorMessage("L\u1ED7i khi l\u1EA5y th\xF4ng tin ch\u1ED1t kho");
        return null;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  updateChotkho(id, data) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const updateData = {
          ngaychot: data.ngaychot,
          title: data.title,
          ghichu: data.ghichu,
          isActive: data.isActive
        };
        const result = yield this.graphqlService.updateOne(this.modelName, { id }, updateData, {
          select: {
            id: true,
            ngaychot: true,
            title: true,
            ghichu: true,
            khoId: true
          }
        });
        if (result) {
          this.showSuccessMessage("C\u1EADp nh\u1EADt ch\u1ED1t kho th\xE0nh c\xF4ng");
          yield this.getAllChotkho();
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating chotkho:", error);
        this.showErrorMessage("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  updateChotkhoWithDetails(id, data) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const updateData = {
          ngaychot: data.ngaychot,
          title: data.title,
          ghichu: data.ghichu,
          isActive: data.isActive,
          details: data.details?.map((detail) => ({
            sanphamId: detail.sanphamId,
            sltonhethong: detail.sltonhethong || 0,
            sltonthucte: detail.sltonthucte || 0,
            slhuy: detail.slhuy || 0,
            ghichu: detail.ghichu || ""
          }))
        };
        const response = yield firstValueFrom(this.http.patch(`${environment.APIURL}/chotkho/${id}/with-details`, updateData, {
          headers: {
            Authorization: `Bearer ${this.storageService.getItem("token")}`
          }
        }));
        if (response) {
          this.showSuccessMessage("C\u1EADp nh\u1EADt ch\u1ED1t kho v\xE0 chi ti\u1EBFt th\xE0nh c\xF4ng");
          yield this.getAllChotkho();
          yield this.getChotkhoById(id);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error updating chotkho with details:", error);
        this.showErrorMessage("L\u1ED7i khi c\u1EADp nh\u1EADt ch\u1ED1t kho");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  deleteChotkho(id) {
    return __async(this, null, function* () {
      try {
        this.isLoading.set(true);
        const chotkhoData = yield this.graphqlService.findUnique(this.modelName, { id }, {
          include: {
            details: {
              include: {
                sanpham: {
                  select: {
                    title: true,
                    masp: true
                  }
                }
              }
            }
          }
        });
        if (!chotkhoData) {
          this.showErrorMessage("Kh\xF4ng t\xECm th\u1EA5y ch\u1ED1t kho c\u1EA7n x\xF3a");
          return false;
        }
        const detailCount = chotkhoData.details?.length || 0;
        const confirmMessage = `
        B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n x\xF3a ch\u1ED1t kho n\xE0y kh\xF4ng?
        
        \u{1F4CB} M\xE3 ch\u1ED1t kho: ${chotkhoData.codeId || "N/A"}
        \u{1F4DD} Ti\xEAu \u0111\u1EC1: ${chotkhoData.title || "N/A"}
        \u{1F4E6} S\u1ED1 l\u01B0\u1EE3ng s\u1EA3n ph\u1EA9m: ${detailCount}
        
        \u26A0\uFE0F Thao t\xE1c n\xE0y s\u1EBD x\xF3a v\u0129nh vi\u1EC5n:
        \u2022 Ch\u1ED1t kho ch\xEDnh
        \u2022 T\u1EA5t c\u1EA3 ${detailCount} chi ti\u1EBFt s\u1EA3n ph\u1EA9m
        
        Kh\xF4ng th\u1EC3 kh\xF4i ph\u1EE5c sau khi x\xF3a!
      `.trim();
        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) {
          console.log("User cancelled deletion");
          return false;
        }
        if (chotkhoData.details && chotkhoData.details.length > 0) {
          console.log(`\u{1F5D1}\uFE0F \u0110ang x\xF3a ${chotkhoData.details.length} chi ti\u1EBFt ch\u1ED1t kho...`);
          for (const detail of chotkhoData.details) {
            try {
              yield this.graphqlService.deleteOne(this.detailModelName, {
                id: detail.id
              });
              console.log(`\u2705 \u0110\xE3 x\xF3a detail ID: ${detail.id}`);
            } catch (detailError) {
              console.error(`\u274C L\u1ED7i x\xF3a detail ${detail.id}:`, detailError);
            }
          }
        }
        console.log(`\u{1F5D1}\uFE0F \u0110ang x\xF3a ch\u1ED1t kho ch\xEDnh ID: ${id}...`);
        const result = yield this.graphqlService.deleteOne(this.modelName, {
          id
        });
        if (result) {
          this.showSuccessMessage(`X\xF3a ch\u1ED1t kho v\xE0 ${detailCount} chi ti\u1EBFt th\xE0nh c\xF4ng`);
          yield this.getAllChotkho();
          if (this.selectedChotkho()?.id === id) {
            this.selectedChotkho.set(null);
            this.DetailChotkho.set(null);
          }
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting chotkho with details:", error);
        this.showErrorMessage("L\u1ED7i khi x\xF3a ch\u1ED1t kho v\xE0 chi ti\u1EBFt");
        return false;
      } finally {
        this.isLoading.set(false);
      }
    });
  }
  addChotkhoDetail(chotkhoId, detailData) {
    return __async(this, null, function* () {
      try {
        const data = __spreadProps(__spreadValues({}, detailData), {
          chotkhoId,
          userId: yield this.getCurrentUserId(),
          chenhlech: this.calculateChenhLech(detailData.sltonhethong || 0, detailData.sltonthucte || 0, detailData.slhuy || 0)
        });
        const result = yield this.graphqlService.createOne(this.detailModelName, data, {
          select: {
            id: true,
            sanphamId: true,
            sltonhethong: true,
            sltonthucte: true,
            slhuy: true,
            chenhlech: true,
            ghichu: true,
            chotkhoId: true
          }
        });
        if (result) {
          this.showSuccessMessage("Th\xEAm chi ti\u1EBFt th\xE0nh c\xF4ng");
          yield this.getChotkhoById(chotkhoId);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error adding chotkho detail:", error);
        this.showErrorMessage("L\u1ED7i khi th\xEAm chi ti\u1EBFt ch\u1ED1t kho");
        return false;
      }
    });
  }
  deleteChotkhoDetail(detailId, chotkhoId) {
    return __async(this, null, function* () {
      try {
        const detailData = yield this.graphqlService.findUnique(this.detailModelName, { id: detailId }, {
          include: {
            sanpham: {
              select: {
                title: true,
                masp: true
              }
            }
          }
        });
        if (!detailData) {
          this.showErrorMessage("Kh\xF4ng t\xECm th\u1EA5y chi ti\u1EBFt c\u1EA7n x\xF3a");
          return false;
        }
        const confirmMessage = `
        B\u1EA1n c\xF3 ch\u1EAFc mu\u1ED1n x\xF3a chi ti\u1EBFt n\xE0y kh\xF4ng?
        
        \u{1F4E6} S\u1EA3n ph\u1EA9m: ${detailData.sanpham?.title || "N/A"}
        \u{1F522} M\xE3 SP: ${detailData.sanpham?.masp || "N/A"}
        \u{1F4CA} SL t\u1ED3n h\u1EC7 th\u1ED1ng: ${detailData.sltonhethong || 0}
        \u{1F4CA} SL t\u1ED3n th\u1EF1c t\u1EBF: ${detailData.sltonthucte || 0}
        \u{1F4CA} SL h\u1EE7y: ${detailData.slhuy || 0}
        
        \u26A0\uFE0F Kh\xF4ng th\u1EC3 kh\xF4i ph\u1EE5c sau khi x\xF3a!
      `.trim();
        const confirmed = window.confirm(confirmMessage);
        if (!confirmed) {
          return false;
        }
        const result = yield this.graphqlService.deleteOne(this.detailModelName, {
          id: detailId
        });
        if (result) {
          this.showSuccessMessage("X\xF3a chi ti\u1EBFt th\xE0nh c\xF4ng");
          yield this.getChotkhoById(chotkhoId);
          return true;
        }
        return false;
      } catch (error) {
        console.error("Error deleting chotkho detail:", error);
        this.showErrorMessage("L\u1ED7i khi x\xF3a chi ti\u1EBFt ch\u1ED1t kho");
        return false;
      }
    });
  }
  calculateChenhLech(sltonhethong, sltonthucte, slhuy) {
    return sltonhethong - sltonthucte - slhuy;
  }
  generateChotkhoCode() {
    const now = /* @__PURE__ */ new Date();
    const dateStr = now.getFullYear().toString().substr(-2) + (now.getMonth() + 1).toString().padStart(2, "0") + now.getDate().toString().padStart(2, "0");
    const timeStr = now.getHours().toString().padStart(2, "0") + now.getMinutes().toString().padStart(2, "0");
    return `CK${dateStr}${timeStr}`;
  }
  setChotkhoId(id) {
    this.chotkhoId.set(id);
  }
  getCurrentUserId() {
    return __async(this, null, function* () {
      try {
        const profile = yield this.userService.getProfile();
        return profile?.id || null;
      } catch (error) {
        console.error("Error getting current user:", error);
        return null;
      }
    });
  }
  showSuccessMessage(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 3e3,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snackbar-success"]
    });
  }
  showErrorMessage(message) {
    this.snackBar.open(message, "\u0110\xF3ng", {
      duration: 5e3,
      horizontalPosition: "center",
      verticalPosition: "top",
      panelClass: ["snackbar-error"]
    });
  }
  // Additional methods used by listchotkho component (placeholder implementations)
  getUpdatedCodeIds() {
    return __async(this, null, function* () {
      console.log("getUpdatedCodeIds - implement if needed");
    });
  }
  DeleteChotkho(item) {
    return __async(this, null, function* () {
      if (item?.id) {
        yield this.deleteChotkho(item.id);
      }
    });
  }
  getStatistics() {
    return __async(this, null, function* () {
      return {
        total: this.ListChotkho().length,
        active: this.ListChotkho().filter((item) => item.isActive).length
      };
    });
  }
  generateReport(options) {
    return __async(this, null, function* () {
      console.log("generateReport - implement if needed", options);
      return { success: true, message: "Report placeholder" };
    });
  }
  bulkUpdateStatus(ids, status) {
    return __async(this, null, function* () {
      console.log("bulkUpdateStatus - implement if needed", ids, status);
      return true;
    });
  }
  importFromExcel(file, options) {
    return __async(this, null, function* () {
      console.log("importFromExcel - implement if needed", file, options);
      return { success: true, message: "Import placeholder" };
    });
  }
  backupData(type) {
    return __async(this, null, function* () {
      console.log("backupData - implement if needed", type);
      return true;
    });
  }
  optimizePerformance() {
    return __async(this, null, function* () {
      console.log("optimizePerformance - implement if needed");
      return { success: true };
    });
  }
  getSystemHealth() {
    return __async(this, null, function* () {
      console.log("getSystemHealth - implement if needed");
      return { status: "healthy" };
    });
  }
  generateImportTemplate(type) {
    return __async(this, null, function* () {
      console.log("generateImportTemplate - implement if needed", type);
      return true;
    });
  }
  exportData(format, options) {
    return __async(this, null, function* () {
      console.log("exportData - implement if needed", format, options);
      return true;
    });
  }
  smartCheckChenhLech(id) {
    return __async(this, null, function* () {
      console.log("smartCheckChenhLech - implement if needed", id);
      return { success: true };
    });
  }
  restoreFromBackup(file) {
    return __async(this, null, function* () {
      console.log("restoreFromBackup - implement if needed", file);
      return true;
    });
  }
  // Get all warehouses for selection
  getAllWarehouses() {
    return __async(this, null, function* () {
      const query = gql`
      query chotkhoGetAllWarehouses {
        chotkhoGetAllWarehouses
      }
    `;
      try {
        const response = yield firstValueFrom(this.apollo.query({
          query,
          fetchPolicy: "cache-first"
        }));
        return response.data.chotkhoGetAllWarehouses || [];
      } catch (error) {
        console.error("Error getting warehouses:", error);
        throw error;
      }
    });
  }
  // Get all products in a specific warehouse
  getProductsByWarehouse(khoId) {
    return __async(this, null, function* () {
      const query = gql`
      query chotkhoGetProductsByWarehouse($khoId: String!) {
        chotkhoGetProductsByWarehouse(khoId: $khoId)
      }
    `;
      try {
        const response = yield firstValueFrom(this.apollo.query({
          query,
          variables: { khoId },
          fetchPolicy: "cache-first"
        }));
        return response.data.chotkhoGetProductsByWarehouse || [];
      } catch (error) {
        console.error("Error getting products by warehouse:", error);
        throw error;
      }
    });
  }
  // Get all products with tonkho information (no warehouse filter)
  getAllProducts() {
    return __async(this, null, function* () {
      const query = gql`
      query chotkhoGetAllProducts {
        chotkhoGetAllProducts
      }
    `;
      try {
        const response = yield firstValueFrom(this.apollo.query({
          query,
          fetchPolicy: "cache-first"
        }));
        return response.data.chotkhoGetAllProducts || [];
      } catch (error) {
        console.error("Error getting all products:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function ChotkhoService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _ChotkhoService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _ChotkhoService, factory: _ChotkhoService.\u0275fac, providedIn: "root" });
};

export {
  ChotkhoService
};
//# sourceMappingURL=chunk-3TIKQVOT.js.map
