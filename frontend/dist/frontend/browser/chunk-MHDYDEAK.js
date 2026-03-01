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
  HttpClient,
  HttpHeaders
} from "./chunk-HCACJZKN.js";
import {
  firstValueFrom,
  inject,
  ɵɵdefineInjectable
} from "./chunk-RBDY2J7V.js";
import {
  __async,
  __spreadProps,
  __spreadValues
} from "./chunk-SXK72SKC.js";

// src/app/admin/banggia/price-history.service.ts
var PriceHistoryService = class _PriceHistoryService {
  http = inject(HttpClient);
  storageService = inject(StorageService);
  graphqlService = inject(GraphqlService);
  baseUrl = environment.APIURL;
  getHeaders() {
    return new HttpHeaders({
      "Content-Type": "application/json",
      "Authorization": "Bearer " + this.storageService.getItem("token")
    });
  }
  /**
   * Get current user ID from token/storage
   */
  getCurrentUserId() {
    try {
      const token = this.storageService.getItem("token");
      if (!token) {
        console.warn("[PRICE-HISTORY] No token found");
        return null;
      }
      const payload = JSON.parse(atob(token.split(".")[1]));
      const userId = payload.id || null;
      if (userId) {
        console.log("[PRICE-HISTORY] Got userId from token:", userId);
      } else {
        console.warn("[PRICE-HISTORY] No userId in token payload:", payload);
      }
      return userId;
    } catch (error) {
      console.error("[PRICE-HISTORY] Failed to decode token:", error);
      return null;
    }
  }
  /**
   * Get price history for a product in a banggia
   */
  getPriceHistory(banggiaId, sanphamId) {
    return __async(this, null, function* () {
      try {
        const url = `${this.baseUrl}/banggia/${banggiaId}/sanpham/${sanphamId}/price-history`;
        return yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
      } catch (error) {
        console.error("Error fetching price history:", error);
        throw error;
      }
    });
  }
  /**
   * Get current price for a product in a banggia
   */
  getCurrentPrice(banggiaId, sanphamId) {
    return __async(this, null, function* () {
      try {
        const url = `${this.baseUrl}/banggia/${banggiaId}/sanpham/${sanphamId}/current-price`;
        return yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
      } catch (error) {
        console.error("Error fetching current price:", error);
        throw error;
      }
    });
  }
  /**
   * Update single product price with audit trail
   */
  updateSinglePrice(banggiaId, sanphamId, newPrice, reason, userId) {
    return __async(this, null, function* () {
      try {
        const url = `${this.baseUrl}/banggia/bulk-update-prices`;
        const currentUserId = userId || this.getCurrentUserId() || "system";
        const result = yield firstValueFrom(this.http.post(url, {
          updates: [{
            banggiaId,
            sanphamId,
            newPrice,
            reason: reason || "C\u1EADp nh\u1EADt gi\xE1 t\u1EEB b\u1EA3ng gi\xE1"
          }],
          userId: currentUserId
        }, { headers: this.getHeaders() }));
        console.log("[PRICE-HISTORY] Invalidating cache for banggia...");
        this.graphqlService.clearCache("banggia");
        this.graphqlService.clearCache("banggiasanpham");
        return result;
      } catch (error) {
        console.error("Error updating single price:", error);
        throw error;
      }
    });
  }
  /**
   * Bulk update prices with audit trail
   */
  bulkUpdatePrices(request) {
    return __async(this, null, function* () {
      try {
        const currentUserId = request.userId || this.getCurrentUserId() || "system";
        const url = `${this.baseUrl}/banggia/bulk-update-prices`;
        const result = yield firstValueFrom(this.http.post(url, __spreadProps(__spreadValues({}, request), {
          userId: currentUserId
        }), { headers: this.getHeaders() }));
        console.log("[PRICE-HISTORY] Invalidating cache for banggia (bulk)...");
        this.graphqlService.clearCache("banggia");
        this.graphqlService.clearCache("banggiasanpham");
        return result;
      } catch (error) {
        console.error("Error bulk updating prices:", error);
        throw error;
      }
    });
  }
  /**
   * Verify order prices against current banggia prices
   */
  verifyOrderPrices(donhangId) {
    return __async(this, null, function* () {
      try {
        const url = `${this.baseUrl}/donhang/verify-prices/${donhangId}`;
        return yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
      } catch (error) {
        console.error("Error verifying order prices:", error);
        throw error;
      }
    });
  }
  /**
   * Get price at specific date from history
   */
  getPriceAtDate(banggiaId, sanphamId, date) {
    return __async(this, null, function* () {
      try {
        const dateStr = date.toISOString();
        const url = `${this.baseUrl}/donhang/price-at-date?banggiaId=${banggiaId}&sanphamId=${sanphamId}&date=${dateStr}`;
        return yield firstValueFrom(this.http.get(url, { headers: this.getHeaders() }));
      } catch (error) {
        console.error("Error fetching price at date:", error);
        throw error;
      }
    });
  }
  static \u0275fac = function PriceHistoryService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _PriceHistoryService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _PriceHistoryService, factory: _PriceHistoryService.\u0275fac, providedIn: "root" });
};

export {
  PriceHistoryService
};
//# sourceMappingURL=chunk-MHDYDEAK.js.map
