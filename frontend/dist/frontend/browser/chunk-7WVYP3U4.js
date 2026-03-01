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
  __async
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/banggia.service.ts
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
  setBanggiaId(id) {
    this.banggiaId.set(id);
  }
  importBGKH(dulieu) {
    return __async(this, null, function* () {
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/importbgkh`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  importSPBG(dulieu) {
    return __async(this, null, function* () {
      try {
        const batchSize = 10;
        const batches = [];
        for (let i = 0; i < dulieu.length; i += batchSize) {
          batches.push(dulieu.slice(i, i + batchSize));
        }
        for (const batch of batches) {
          const options = {
            method: "POST",
            headers: {
              "Content-Type": "application/json",
              "Authorization": "Bearer " + this._StorageService.getItem("token")
            },
            body: JSON.stringify(batch)
          };
          const response = yield fetch(`${environment.APIURL}/banggia/importspbg`, options);
          if (!response.ok) {
            throw new Error(`HTTP error! status: ${response.status}`);
          }
          const data = yield response.json();
          if (!response.ok) {
            this.handleError(response.status);
          }
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  ImportBanggia(dulieu) {
    return __async(this, null, function* () {
      console.log("bg", dulieu);
      try {
        const options = {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
            "Authorization": "Bearer " + this._StorageService.getItem("token")
          },
          body: JSON.stringify(dulieu)
        };
        const response = yield fetch(`${environment.APIURL}/banggia/import`, options);
        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`);
        }
        const data = yield response.json();
        if (!response.ok) {
          this.handleError(response.status);
        }
        this.getAllBanggia();
      } catch (error) {
        return console.error(error);
      }
    });
  }
  /**
   * Tạo bảng giá mới với sản phẩm và khách hàng sử dụng GraphQL
   */
  CreateBanggia(dulieu) {
    return __async(this, null, function* () {
      try {
        const createData = {
          title: dulieu.title,
          mabanggia: dulieu.mabanggia || this.generateMaBanggia(),
          type: dulieu.type || "bansi",
          batdau: dulieu.batdau ? new Date(dulieu.batdau).toISOString() : (/* @__PURE__ */ new Date()).toISOString(),
          ketthuc: dulieu.ketthuc ? new Date(dulieu.ketthuc).toISOString() : new Date(Date.now() + 30 * 24 * 60 * 60 * 1e3).toISOString(),
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
  updateBanggiaWithGraphQL(dulieu) {
    return __async(this, null, function* () {
      try {
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
          // Cập nhật khách hàng - disconnect tất cả và connect mới
          khachhang: dulieu.khachhang ? {
            set: dulieu.khachhang.map((kh) => ({ id: kh.id || kh }))
          } : void 0
        };
        Object.keys(updateData).forEach((key) => {
          if (updateData[key] === void 0) {
            delete updateData[key];
          }
        });
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
        const updatedBanggia = yield this._GraphqlService.updateOne("banggia", { id: dulieu.id }, updateData, { include });
        this.DetailBanggia.set(updatedBanggia);
        yield this.getAllBanggia();
        return updatedBanggia;
      } catch (error) {
        console.error("L\u1ED7i c\u1EADp nh\u1EADt b\u1EA3ng gi\xE1:", error);
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
              orderBy: { order: "asc" }
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
              }
            }
          }
        };
        const data = yield this._GraphqlService.findUnique("banggia", { id }, options);
        this.DetailBanggia.set(data);
        return data;
      } catch (error) {
        console.error("L\u1ED7i l\u1EA5y chi ti\u1EBFt b\u1EA3ng gi\xE1:", error);
        throw error;
      }
    });
  }
  /**
   * Xóa bảng giá sử dụng GraphQL
   */
  DeleteBanggia(item) {
    return __async(this, null, function* () {
      try {
        yield this._GraphqlService.deleteOne("banggia", { id: item.id });
        yield this.getAllBanggia();
      } catch (error) {
        console.error("L\u1ED7i x\xF3a b\u1EA3ng gi\xE1:", error);
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
        const currentBanggia = yield this._GraphqlService.findUnique("banggia", { id: dulieu.banggiaId }, { include: { khachhang: true } });
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
  ImportBanggiaGraphQL(dulieu) {
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
  importSPBGGrahQL(dulieu) {
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
  importBGKHGrahQL(dulieu) {
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
//# sourceMappingURL=chunk-7WVYP3U4.js.map
