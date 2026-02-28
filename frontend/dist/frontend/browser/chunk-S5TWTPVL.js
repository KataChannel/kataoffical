import {
  MatSnackBar
} from "./chunk-7TLPKC3B.js";
import {
  isPlatformBrowser
} from "./chunk-2VHAU5LM.js";
import {
  PLATFORM_ID,
  inject,
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-FWM3YOMT.js";
import {
  __async
} from "./chunk-SXK72SKC.js";

// src/app/shared/utils/storage.service.ts
var StorageService = class _StorageService {
  platformId;
  dbName = "PermissionDB";
  storeName = "permissions";
  db = null;
  openConnections = [];
  snackBar = inject(MatSnackBar);
  constructor(platformId) {
    this.platformId = platformId;
  }
  // Lưu dữ liệu vào localStorage
  setItem(key, value) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.setItem(key, JSON.stringify(value));
    }
  }
  // Lấy dữ liệu từ localStorage
  getItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      const value = localStorage.getItem(key);
      return value ? JSON.parse(value) : null;
    }
    return null;
  }
  // Xóa dữ liệu từ localStorage
  removeItem(key) {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.removeItem(key);
    }
  }
  // Xóa tất cả dữ liệu trong localStorage
  clear() {
    if (isPlatformBrowser(this.platformId)) {
      localStorage.clear();
    }
  }
  // Open PermissionDB and create object store if needed
  openDB() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId)) {
        throw new Error("IndexedDB is not available in this environment");
      }
      if (this.db) {
        return this.db;
      }
      return new Promise((resolve, reject) => {
        const request = indexedDB.open(this.dbName, 1);
        this.openConnections.push(request);
        request.onupgradeneeded = () => {
          const db = request.result;
          if (!db.objectStoreNames.contains(this.storeName)) {
            db.createObjectStore(this.storeName, { keyPath: "id" });
          }
        };
        request.onsuccess = () => {
          this.db = request.result;
          resolve(this.db);
        };
        request.onerror = () => {
          reject(new Error("Failed to open PermissionDB"));
        };
        request.onblocked = () => {
          this.snackBar.open("Cannot access PermissionDB: Database is blocked by another connection", "Close", {
            duration: 5e3,
            panelClass: ["snackbar-error"]
          });
          reject(new Error("PermissionDB blocked"));
        };
      });
    });
  }
  // Save data to PermissionDB
  saveData(key, data) {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      try {
        const db = yield this.openDB();
        const transaction = db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.put({ id: key, data });
        this.openConnections.push(request);
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve();
          request.onerror = () => reject(new Error("Failed to save data"));
        });
      } catch (error) {
        console.error("Failed to save data:", error);
        throw error;
      }
    });
  }
  // Retrieve data from PermissionDB
  getData(key) {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return null;
      try {
        const db = yield this.openDB();
        const transaction = db.transaction([this.storeName], "readonly");
        const store = transaction.objectStore(this.storeName);
        const request = store.get(key);
        this.openConnections.push(request);
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve(request.result?.data);
          request.onerror = () => reject(new Error("Failed to retrieve data"));
        });
      } catch (error) {
        console.error("Failed to retrieve data:", error);
        return null;
      }
    });
  }
  // Clear all data in the permissions store
  clearStore() {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      try {
        const db = yield this.openDB();
        const transaction = db.transaction([this.storeName], "readwrite");
        const store = transaction.objectStore(this.storeName);
        const request = store.clear();
        this.openConnections.push(request);
        return new Promise((resolve, reject) => {
          request.onsuccess = () => resolve();
          request.onerror = () => reject(new Error("Failed to clear store"));
        });
      } catch (error) {
        console.error("Failed to clear store:", error);
        throw error;
      }
    });
  }
  // Delete PermissionDB with retry on block
  deleteDB(maxRetries = 3, delay = 1e3) {
    return __async(this, null, function* () {
      if (!isPlatformBrowser(this.platformId))
        return;
      for (let i = 0; i < maxRetries; i++) {
        try {
          if (this.db) {
            this.db.close();
            this.db = null;
          }
          this.openConnections = [];
          return yield new Promise((resolve, reject) => {
            const request = indexedDB.deleteDatabase(this.dbName);
            request.onsuccess = () => {
              this.snackBar.open("PermissionDB deleted successfully", "", {
                duration: 1e3,
                panelClass: ["snackbar-success"]
              });
              resolve();
            };
            request.onerror = () => {
              reject(new Error("Failed to delete PermissionDB"));
            };
            request.onblocked = () => {
              this.snackBar.open("Cannot delete PermissionDB: Please close other tabs or refresh", "Retry", {
                duration: 5e3,
                panelClass: ["snackbar-error"]
              }).onAction().subscribe(() => {
              });
              reject(new Error("Deletion of PermissionDB blocked"));
            };
          });
        } catch (error) {
          if (i === maxRetries - 1) {
            console.error("Failed to delete PermissionDB after retries:", error);
            throw error;
          }
          yield new Promise((resolve) => setTimeout(resolve, delay));
        }
      }
    });
  }
  deleteAllIndexedDBs() {
    indexedDB.databases().then((databases) => {
      if (databases.length === 0) {
        console.log("Kh\xF4ng c\xF3 c\u01A1 s\u1EDF d\u1EEF li\u1EC7u IndexedDB n\xE0o \u0111\u1EC3 x\xF3a.");
        return;
      }
      databases.forEach((db) => {
        indexedDB.deleteDatabase(db.name).onsuccess = () => {
          console.log(`\u0110\xE3 x\xF3a c\u01A1 s\u1EDF d\u1EEF li\u1EC7u: ${db.name}`);
        };
        indexedDB.deleteDatabase(db.name).onerror = (event) => {
          console.error(`L\u1ED7i khi x\xF3a c\u01A1 s\u1EDF d\u1EEF li\u1EC7u ${db.name}:`, event.target.error);
        };
      });
    }).catch((error) => {
      console.error("L\u1ED7i khi l\u1EA5y danh s\xE1ch c\u01A1 s\u1EDF d\u1EEF li\u1EC7u:", error);
    });
  }
  // Close database explicitly
  closeDB() {
    if (isPlatformBrowser(this.platformId) && this.db) {
      this.db.close();
      this.db = null;
      this.openConnections = [];
    }
  }
  static \u0275fac = function StorageService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _StorageService)(\u0275\u0275inject(PLATFORM_ID));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _StorageService, factory: _StorageService.\u0275fac, providedIn: "root" });
};

export {
  StorageService
};
//# sourceMappingURL=chunk-S5TWTPVL.js.map
