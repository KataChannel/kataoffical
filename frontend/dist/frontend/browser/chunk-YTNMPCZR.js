import {
  Router
} from "./chunk-AGKEHWOL.js";
import {
  StorageService
} from "./chunk-SSKGL4JO.js";
import {
  environment
} from "./chunk-5F4VG3UZ.js";
import {
  GraphqlService
} from "./chunk-Y4MVQOE5.js";
import {
  inject,
  signal,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-RBDY2J7V.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/banggia-graphql.service.ts
var BanggiaService = class _BanggiaService {
  _StorageService;
  router;
  _GraphqlService = inject(GraphqlService);
  constructor(_StorageService, router) {
    this._StorageService = _StorageService;
    this.router = router;
  }
  ListBanggia = signal([]);
  DetailBanggia = signal({});
  banggiaId = signal(null);
  isLoading = signal(false);
  currentLoadId = null;
  lastSetId = null;
  // Track last set ID to prevent duplicate sets
  setBanggiaId(id) {
    if (this.lastSetId !== id) {
      console.log("[SERVICE] setBanggiaId from", this.lastSetId, "to", id);
      this.lastSetId = id;
      this.banggiaId.set(id);
    } else {
      console.log("[SERVICE] setBanggiaId called with same ID, skipping:", id);
    }
  }
  /**
   * Kiểm tra xem mabanggia + batdau + ketthuc đã tồn tại chưa
   */
  checkBanggiaExists(mabanggia, batdau, ketthuc, excludeId) {
    return __async(this, null, function* () {
      try {
        const where = {
          AND: [
            { mabanggia: { equals: mabanggia } },
            { batdau: { equals: batdau.toISOString() } },
            { ketthuc: { equals: ketthuc.toISOString() } }
          ]
        };
        if (excludeId) {
          where.AND.push({ id: { not: excludeId } });
        }
        const existing = yield this._GraphqlService.findMany("banggia", {
          where,
          take: 1
        });
        return existing && existing.length > 0;
      } catch (error) {
        console.error("[VALIDATE] Error checking banggia exists:", error);
        return false;
      }
    });
  }
  /**
   * Tạo bảng giá mới với sản phẩm và khách hàng sử dụng GraphQL
   */
  CreateBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        const mabanggia = dulieu.mabanggia || this.generateMaBanggia();
        const batdau = dulieu.batdau ? new Date(dulieu.batdau) : /* @__PURE__ */ new Date();
        const ketthuc = dulieu.ketthuc ? new Date(dulieu.ketthuc) : new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3);
        const exists = yield this.checkBanggiaExists(mabanggia, batdau, ketthuc);
        if (exists) {
          throw new Error(`B\u1EA3ng gi\xE1 v\u1EDBi m\xE3 "${mabanggia}" v\xE0 kho\u1EA3ng th\u1EDDi gian t\u1EEB ${batdau.toLocaleDateString()} \u0111\u1EBFn ${ketthuc.toLocaleDateString()} \u0111\xE3 t\u1ED3n t\u1EA1i!`);
        }
        const createData = {
          title: dulieu.title,
          mabanggia,
          type: dulieu.type || "bansi",
          batdau: batdau.toISOString(),
          ketthuc: ketthuc.toISOString(),
          order: dulieu.order || 1,
          ghichu: dulieu.ghichu || "",
          status: dulieu.status || "baogia",
          isActive: dulieu.isActive !== false,
          isDefault: dulieu.isDefault || false,
          // Tạo sản phẩm trong bảng giá
          sanpham: dulieu.sanpham ? {
            create: dulieu.sanpham.map((sp) => ({
              sanphamId: sp.sanphamId || sp.id,
              giaban: Number(sp.giaban) || 0,
              order: sp.order || 1,
              isActive: sp.isActive !== false
            }))
          } : void 0,
          // Kết nối khách hàng
          khachhang: dulieu.khachhang ? {
            connect: dulieu.khachhang.map((kh) => ({ id: kh.id || kh }))
          } : void 0
        };
        const include = {
          sanpham: {
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
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true
            }
          }
        };
        const newBanggia = yield this._GraphqlService.createOne("banggia", createData, { include });
        this.banggiaId.set(newBanggia.id);
        this.DetailBanggia.set(newBanggia);
        yield this.getAllBanggia();
        return newBanggia;
      } catch (error) {
        console.error("L\u1ED7i t\u1EA1o b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Cập nhật bảng giá với sản phẩm và khách hàng sử dụng GraphQL
   */
  updateBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        console.log("[UPDATE-BG] ========== START UPDATE ==========");
        console.log("[UPDATE-BG] Input dulieu:", JSON.stringify(dulieu, null, 2));
        if (dulieu.mabanggia && dulieu.batdau && dulieu.ketthuc) {
          const batdau = new Date(dulieu.batdau);
          const ketthuc = new Date(dulieu.ketthuc);
          const exists = yield this.checkBanggiaExists(dulieu.mabanggia, batdau, ketthuc, dulieu.id);
          if (exists) {
            throw new Error(`B\u1EA3ng gi\xE1 v\u1EDBi m\xE3 "${dulieu.mabanggia}" v\xE0 kho\u1EA3ng th\u1EDDi gian t\u1EEB ${batdau.toLocaleDateString()} \u0111\u1EBFn ${ketthuc.toLocaleDateString()} \u0111\xE3 t\u1ED3n t\u1EA1i!`);
          }
        }
        const updateData = {
          title: dulieu.title,
          mabanggia: dulieu.mabanggia,
          type: dulieu.type,
          batdau: dulieu.batdau ? new Date(dulieu.batdau).toISOString() : void 0,
          ketthuc: dulieu.ketthuc ? new Date(dulieu.ketthuc).toISOString() : void 0,
          order: dulieu.order,
          ghichu: dulieu.ghichu,
          status: dulieu.status,
          isActive: dulieu.isActive,
          isDefault: dulieu.isDefault,
          // Cập nhật sản phẩm - xóa tất cả và tạo mới
          sanpham: dulieu.sanpham ? {
            deleteMany: {},
            create: dulieu.sanpham.map((sp) => ({
              sanphamId: sp.sanphamId || sp.id,
              giaban: Number(sp.giaban) || 0,
              order: sp.order || 1,
              isActive: sp.isActive !== false
            }))
          } : void 0,
          // Cập nhật khách hàng - hỗ trợ cả array và Prisma relation structure
          khachhang: dulieu.khachhang ? (() => {
            console.log("[UPDATE-BG] Processing khachhang:", dulieu.khachhang);
            if (Array.isArray(dulieu.khachhang)) {
              const result2 = {
                set: dulieu.khachhang.map((kh) => ({ id: kh.id || kh }))
              };
              console.log("[UPDATE-BG] khachhang is array, converted to set:", result2);
              return result2;
            }
            if (dulieu.khachhang.disconnect !== void 0 || dulieu.khachhang.connect !== void 0) {
              const result2 = {
                disconnect: dulieu.khachhang.disconnect || [],
                connect: dulieu.khachhang.connect || []
              };
              console.log("[UPDATE-BG] khachhang is Prisma structure:", result2);
              console.log("[UPDATE-BG] Disconnect count:", result2.disconnect.length);
              console.log("[UPDATE-BG] Connect count:", result2.connect.length);
              return result2;
            }
            const result = {
              set: [{ id: dulieu.khachhang.id || dulieu.khachhang }]
            };
            console.log("[UPDATE-BG] khachhang fallback to set:", result);
            return result;
          })() : void 0
        };
        console.log("[UPDATE-BG] updateData before cleanup:", JSON.stringify(updateData, null, 2));
        Object.keys(updateData).forEach((key) => {
          if (updateData[key] === void 0) {
            delete updateData[key];
          }
        });
        console.log("[UPDATE-BG] updateData after cleanup:", JSON.stringify(updateData, null, 2));
        const include = {
          sanpham: {
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
          },
          khachhang: {
            select: {
              id: true,
              name: true,
              makh: true,
              diachi: true,
              sdt: true,
              email: true
            }
          }
        };
        console.log("[UPDATE-BG] Calling GraphQL updateOne with ID:", dulieu.id);
        const updatedBanggia = yield this._GraphqlService.updateOne("banggia", { id: dulieu.id }, updateData, { include });
        console.log("[UPDATE-BG] GraphQL response khachhang count:", updatedBanggia?.khachhang?.length || 0);
        console.log("[UPDATE-BG] GraphQL response khachhang:", updatedBanggia?.khachhang);
        console.log("[UPDATE-BG] Invalidating cache for banggia...");
        try {
          const response = yield fetch(`${environment.APIURL}/cache/invalidate/banggia`, {
            method: "POST",
            headers: {
              "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
              "Content-Type": "application/json"
            }
          });
          if (response.ok) {
            console.log("[UPDATE-BG] \u2705 Cache invalidated successfully");
          } else {
            console.warn("[UPDATE-BG] \u26A0\uFE0F Cache invalidation returned:", response.status);
          }
        } catch (cacheError) {
          console.warn("[UPDATE-BG] \u26A0\uFE0F Cache invalidation error:", cacheError);
        }
        this.DetailBanggia.set(updatedBanggia);
        yield this.getAllBanggia();
        console.log("[UPDATE-BG] ========== END UPDATE SUCCESS ==========");
        return updatedBanggia;
      } catch (error) {
        console.error("[UPDATE-BG] ========== END UPDATE FAILED ==========");
        console.error("[UPDATE-BG] L\u1ED7i c\u1EADp nh\u1EADt b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Lấy tất cả bảng giá sử dụng GraphQL
   */
  getAllBanggia() {
    return __async(this, null, function* () {
      try {
        const options = {
          where: {},
          orderBy: { order: "asc" },
          include: {
            sanpham: {
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
            },
            khachhang: {
              select: {
                id: true,
                name: true,
                makh: true
              }
            },
            _count: {
              select: {
                sanpham: true,
                khachhang: true
              }
            }
          }
        };
        const data = yield this._GraphqlService.findMany("banggia", options);
        this.ListBanggia.set(data);
        return data;
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y danh s\xE1ch b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Lấy bảng giá theo ID sử dụng GraphQL
   */
  getBanggiaByid(id) {
    return __async(this, null, function* () {
      console.log(`[SERVICE] getBanggiaByid called with ID: ${id}`);
      console.log(`[SERVICE] Current state - isLoading: ${this.isLoading()}, currentLoadId: ${this.currentLoadId}`);
      if (this.isLoading() && this.currentLoadId !== id) {
        console.log(`[SERVICE] Skipping load for ${id}, already loading ${this.currentLoadId}`);
        return;
      }
      if (this.isLoading() && this.currentLoadId === id) {
        console.log(`[SERVICE] Already loading ${id}, skipping duplicate call`);
        return;
      }
      console.log(`[SERVICE] Setting loading state to true for ${id}`);
      this.isLoading.set(true);
      this.currentLoadId = id;
      try {
        const options = {
          include: {
            sanpham: {
              include: {
                sanpham: {
                  select: {
                    id: true,
                    title: true,
                    masp: true,
                    dvt: true,
                    giagoc: true
                  }
                }
              },
              orderBy: { order: "asc" },
              take: 99999
            },
            khachhang: {
              select: {
                id: true,
                name: true,
                makh: true,
                diachi: true,
                sdt: true,
                email: true,
                loaikh: true,
                isActive: true
              },
              take: 99999
            }
          }
        };
        console.log(`[SERVICE] Fetching banggia data from API for ${id}...`);
        const data = yield this._GraphqlService.findUnique("banggia", { id }, options);
        console.log(`[SERVICE] API returned data for ${id}`);
        if (this.currentLoadId === id) {
          console.log("[SERVICE] Transforming data...");
          const result = this.transformDetailBanggia(data);
          console.log("[SERVICE] Updating DetailBanggia signal...");
          this.DetailBanggia.set(result);
          console.log(`[SERVICE] DetailBanggia updated for ${id}`);
        } else {
          console.log(`[SERVICE] Load completed for ${id}, but current ID is now ${this.currentLoadId}. Skipping update.`);
        }
        return data;
      } catch (error) {
        console.error("[SERVICE] Error fetching banggia:", error);
        throw error;
      } finally {
        console.log(`[SERVICE] Resetting isLoading to false for ${id}`);
        this.isLoading.set(false);
      }
    });
  }
  transformDetailBanggia(item) {
    console.log(item);
    const listSanpham = item.sanpham?.map((sanpham) => __spreadProps(__spreadValues({}, sanpham), {
      giaban: Number(sanpham.giaban) || 0,
      title: sanpham.sanpham.title,
      masp: sanpham.sanpham.masp,
      dvt: sanpham.sanpham.dvt
    })) || [];
    return __spreadProps(__spreadValues({}, item), { sanpham: listSanpham });
  }
  /**
   * Xóa bảng giá sử dụng backend API với transaction
   * Backend sẽ tự động xóa các bản ghi liên quan
   */
  DeleteBanggia(item) {
    return __async(this, null, function* () {
      try {
        const response = yield fetch(`${environment.APIURL}/banggia/${item.id}`, {
          method: "DELETE",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Content-Type": "application/json"
          }
        });
        if (!response.ok) {
          const errorData = yield response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to delete banggia: ${response.statusText}`);
        }
        yield this.getAllBanggia();
      } catch (error) {
        console.error("L\u1ED7i x\xF3a b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Xóa nhiều bảng giá cùng lúc sử dụng backend bulk delete API
   * Backend sẽ xử lý trong transaction, nhanh và an toàn hơn
   * @param items Array of banggia items to delete
   * @returns Result object with success/fail counts
   */
  DeleteBulkBanggia(items) {
    return __async(this, null, function* () {
      try {
        const ids = items.map((item) => item.id);
        const response = yield fetch(`${environment.APIURL}/banggia/bulk-delete`, {
          method: "POST",
          headers: {
            "Authorization": `Bearer ${this._StorageService.getItem("token")}`,
            "Content-Type": "application/json"
          },
          body: JSON.stringify({ ids })
        });
        if (!response.ok) {
          const errorData = yield response.json().catch(() => ({}));
          throw new Error(errorData.message || `Failed to bulk delete banggia: ${response.statusText}`);
        }
        const result = yield response.json();
        yield this.getAllBanggia();
        return result;
      } catch (error) {
        console.error("L\u1ED7i bulk delete b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Thêm khách hàng vào bảng giá sử dụng GraphQL
   */
  addKHtoBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const updateData = {
          khachhang: {
            connect: dulieu.khachhangIds.map((id) => ({ id }))
          }
        };
        yield this._GraphqlService.updateOne("banggia", { id: dulieu.banggiaId }, updateData);
        yield this.getBanggiaByid(dulieu.banggiaId);
      } catch (error) {
        console.error("L\u1ED7i th\xEAm kh\xE1ch h\xE0ng v\xE0o b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Xóa khách hàng khỏi bảng giá sử dụng GraphQL
   */
  removeKHfromBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const updateData = {
          khachhang: {
            disconnect: dulieu.khachhangIds.map((id) => ({ id }))
          }
        };
        yield this._GraphqlService.updateOne("banggia", { id: dulieu.banggiaId }, updateData);
        yield this.getBanggiaByid(dulieu.banggiaId);
      } catch (error) {
        console.error("L\u1ED7i x\xF3a kh\xE1ch h\xE0ng kh\u1ECFi b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Lấy tất cả bảng giá sản phẩm sử dụng GraphQL
   */
  getAllBGSP() {
    return __async(this, null, function* () {
      try {
        const options = {
          include: {
            banggia: {
              select: {
                id: true,
                title: true,
                mabanggia: true,
                status: true
              }
            },
            sanpham: {
              select: {
                id: true,
                title: true,
                masp: true,
                dvt: true
              }
            }
          },
          orderBy: { order: "asc" }
        };
        return yield this._GraphqlService.findMany("banggiasanpham", options);
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y b\u1EA3ng gi\xE1 s\u1EA3n ph\u1EA9m:", error);
        throw error;
      }
    });
  }
  /**
   * Lấy tất cả khách hàng theo bảng giá sử dụng GraphQL
   */
  getAllBGKH() {
    return __async(this, null, function* () {
      try {
        const options = {
          where: {
            banggiaId: { not: null }
          },
          include: {
            banggia: {
              select: {
                id: true,
                title: true,
                mabanggia: true,
                status: true
              }
            }
          },
          orderBy: { name: "asc" }
        };
        return yield this._GraphqlService.findMany("khachhang", options);
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y kh\xE1ch h\xE0ng theo b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Import bảng giá từ dữ liệu Excel - GraphQL version
   */
  ImportBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < dulieu.length; i += batchSize) {
          batches.push(dulieu.slice(i, i + batchSize));
        }
        for (const batch of batches) {
          const createPromises = batch.map((item) => this._GraphqlService.createOne("banggia", {
            title: item.title,
            mabanggia: item.mabanggia || this.generateMaBanggia(),
            type: item.type || "bansi",
            status: item.status || "baogia",
            isActive: item.isActive !== false
          }));
          yield Promise.all(createPromises);
        }
        yield this.getAllBanggia();
      } catch (error) {
        console.error("L\u1ED7i import b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Import sản phẩm vào bảng giá - GraphQL version
   */
  importSPBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < dulieu.length; i += batchSize) {
          batches.push(dulieu.slice(i, i + batchSize));
        }
        for (const batch of batches) {
          const createPromises = batch.map((item) => this._GraphqlService.createOne("banggiasanpham", {
            banggiaId: item.banggiaId,
            sanphamId: item.sanphamId,
            giaban: Number(item.giaban) || 0,
            order: item.order || 1,
            isActive: item.isActive !== false
          }));
          yield Promise.all(createPromises);
        }
        yield this.getAllBanggia();
      } catch (error) {
        console.error("L\u1ED7i import s\u1EA3n ph\u1EA9m b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Import bảng giá khách hàng - GraphQL version
   */
  importBGKH(dulieu) {
    return __async(this, null, function* () {
      try {
        const updatePromises = dulieu.map((item) => this._GraphqlService.updateOne("khachhang", { id: item.khachhangId }, { banggiaId: item.banggiaId }));
        yield Promise.all(updatePromises);
        yield this.getAllBanggia();
      } catch (error) {
        console.error("L\u1ED7i import b\u1EA3ng gi\xE1 kh\xE1ch h\xE0ng:", error);
        throw error;
      }
    });
  }
  /**
   * Tạo mã bảng giá tự động
   */
  generateMaBanggia() {
    const date = /* @__PURE__ */ new Date();
    const year = date.getFullYear().toString().slice(-2);
    const month = (date.getMonth() + 1).toString().padStart(2, "0");
    const day = date.getDate().toString().padStart(2, "0");
    const random = Math.floor(Math.random() * 1e3).toString().padStart(3, "0");
    return `BG${year}${month}${day}${random}`;
  }
  /**
   * Error handler
   */
  handleError(status) {
    let message = "L\u1ED7i kh\xF4ng x\xE1c \u0111\u1ECBnh";
    switch (status) {
      case 401:
        message = "Vui l\xF2ng \u0111\u0103ng nh\u1EADp l\u1EA1i";
        break;
      case 403:
        message = "B\u1EA1n kh\xF4ng c\xF3 quy\u1EC1n truy c\u1EADp";
        break;
      case 500:
        message = "L\u1ED7i m\xE1y ch\u1EE7, vui l\xF2ng th\u1EED l\u1EA1i sau";
        break;
    }
    const result = JSON.stringify({ code: status, title: message });
    this.router.navigate(["/errorserver"], { queryParams: { data: result } });
  }
  static \u0275fac = function BanggiaService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _BanggiaService)(\u0275\u0275inject(StorageService), \u0275\u0275inject(Router));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _BanggiaService, factory: _BanggiaService.\u0275fac, providedIn: "root" });
};

export {
  BanggiaService
};
//# sourceMappingURL=chunk-YTNMPCZR.js.map
