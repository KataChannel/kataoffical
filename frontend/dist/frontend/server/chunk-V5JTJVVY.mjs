import './polyfills.server.mjs';
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  ɵɵdefineInjectable
} from "./chunk-ADMXANIA.mjs";
import {
  __spreadValues,
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/services/timezone.service.ts
var import_moment = __toESM(require_moment());
var TimezoneService = class _TimezoneService {
  /**
   * Enhanced UTC conversion with precise date field handling
   * Special handling for ngaygiao, ngaynhan fields
   * FIXED: Prevents date shifting by treating dates as local midnight
   * @param date Date string hoặc Date object hoặc moment object
   * @param fieldName Optional field name for special handling
   * @returns ISO string UTC để lưu database
   */
  toUTC(date, fieldName) {
    if (!date)
      return "";
    if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
      console.log(`\u{1F504} Frontend converting ${fieldName}: ${date} to UTC`);
    }
    if (typeof date === "string" && date.match(/^\d{4}-\d{2}-\d{2}$/)) {
      const localDate = (0, import_moment.default)(date, "YYYY-MM-DD").startOf("day");
      const utcDate2 = localDate.utc().toISOString();
      if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
        console.log(`\u2705 Frontend converted ${fieldName}: ${date} (local) -> ${utcDate2} (UTC)`);
      }
      return utcDate2;
    }
    if (typeof date === "string" && date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
      const localDate = (0, import_moment.default)(date, "DD/MM/YYYY").startOf("day");
      const utcDate2 = localDate.utc().toISOString();
      if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
        console.log(`\u2705 Frontend converted ${fieldName}: ${date} (DD/MM/YYYY) -> ${utcDate2} (UTC)`);
      }
      return utcDate2;
    }
    if (date instanceof Date) {
      const localDate = (0, import_moment.default)(date).startOf("day");
      const utcDate2 = localDate.utc().toISOString();
      if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
        console.log(`\u2705 Frontend converted ${fieldName}: ${date} (Date object) -> ${utcDate2} (UTC)`);
      }
      return utcDate2;
    }
    const momentDate = (0, import_moment.default)(date);
    if (!momentDate.isValid()) {
      console.error(`Invalid date provided: ${date}`);
      return (0, import_moment.default)().utc().toISOString();
    }
    const utcDate = momentDate.startOf("day").utc().toISOString();
    if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
      console.log(`\u2705 Frontend converted ${fieldName}: ${date} -> ${utcDate} (UTC)`);
    }
    return utcDate;
  }
  /**
   * Chuyển đổi ngày từ UTC (database) về timezone local để hiển thị
   * @param utcDate UTC date string từ database
   * @returns Formatted string theo timezone local
   */
  fromUTC(utcDate, format = "YYYY-MM-DD") {
    if (!utcDate)
      return "";
    return import_moment.default.utc(utcDate).local().format(format);
  }
  /**
   * Lấy ngày hiện tại theo UTC để lưu database
   * @returns ISO string UTC
   */
  nowUTC() {
    return (0, import_moment.default)().utc().toISOString();
  }
  /**
   * Lấy ngày hiện tại theo local timezone để hiển thị
   * @param format Format string
   * @returns Formatted string theo timezone local
   */
  nowLocal(format = "YYYY-MM-DD") {
    return (0, import_moment.default)().format(format);
  }
  /**
   * So sánh 2 ngày (bỏ qua timezone)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu date1 > date2
   */
  isAfter(date1, date2) {
    return import_moment.default.utc(date1).isAfter(import_moment.default.utc(date2));
  }
  /**
   * So sánh 2 ngày (bỏ qua timezone)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu date1 < date2
   */
  isBefore(date1, date2) {
    return import_moment.default.utc(date1).isBefore(import_moment.default.utc(date2));
  }
  /**
   * Kiểm tra 2 ngày có cùng ngày không (bỏ qua giờ)
   * @param date1 Ngày 1
   * @param date2 Ngày 2
   * @returns true nếu cùng ngày
   */
  isSameDay(date1, date2) {
    return import_moment.default.utc(date1).format("YYYY-MM-DD") === import_moment.default.utc(date2).format("YYYY-MM-DD");
  }
  /**
   * Thêm/trừ số ngày
   * @param date Ngày gốc
   * @param days Số ngày cần thêm/trừ
   * @param format Format output
   * @returns Formatted string
   */
  addDays(date, days, format = "YYYY-MM-DD") {
    return import_moment.default.utc(date).add(days, "days").format(format);
  }
  /**
   * Lấy khoảng cách giữa 2 ngày (số ngày)
   * @param startDate Ngày bắt đầu
   * @param endDate Ngày kết thúc
   * @returns Số ngày chênh lệch
   */
  diffInDays(startDate, endDate) {
    return import_moment.default.utc(endDate).diff(import_moment.default.utc(startDate), "days");
  }
  /**
   * Validate date format
   * @param date Date string
   * @param format Expected format
   * @returns true nếu valid
   */
  isValidDate(date, format = "YYYY-MM-DD") {
    return (0, import_moment.default)(date, format, true).isValid();
  }
  /**
   * Chuyển đổi date input từ form sang UTC để gửi API
   * @param formDate Date từ form (YYYY-MM-DD hoặc Date object)
   * @returns UTC ISO string
   */
  formDateToUTC(formDate) {
    if (!formDate)
      return "";
    if (formDate instanceof Date) {
      return (0, import_moment.default)(formDate).utc().toISOString();
    }
    if (typeof formDate === "string") {
      return this.toUTC(formDate);
    }
    return (0, import_moment.default)(formDate).utc().toISOString();
  }
  /**
   * Chuyển đổi UTC date từ API về format cho form
   * @param utcDate UTC date từ API
   * @param forDatePicker Có phải cho date picker không
   * @returns Date object cho date picker hoặc string cho input
   */
  utcToFormDate(utcDate, forDatePicker = false) {
    if (!utcDate)
      return null;
    if (forDatePicker) {
      return import_moment.default.utc(utcDate).local().toDate();
    }
    return import_moment.default.utc(utcDate).local().format("YYYY-MM-DD");
  }
  /**
   * Format ngày để hiển thị cho user với timezone local
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị
   * @returns Formatted string
   */
  formatForDisplay(utcDate, format = "DD/MM/YYYY") {
    if (!utcDate)
      return "";
    return import_moment.default.utc(utcDate).local().format(format);
  }
  /**
   * Parse ngày từ input user và chuyển sang UTC để lưu database
   * @param userInput Input từ user
   * @param inputFormat Format của input
   * @returns UTC ISO string
   */
  parseUserInputToUTC(userInput, inputFormat = "YYYY-MM-DD") {
    if (!userInput)
      return "";
    const parsed = (0, import_moment.default)(userInput, inputFormat);
    if (!parsed.isValid()) {
      throw new Error(`Invalid date format: ${userInput}`);
    }
    return parsed.utc().toISOString();
  }
  /**
   * Lấy range ngày theo UTC (cho query database)
   * @param startDate Ngày bắt đầu (local)
   * @param endDate Ngày kết thúc (local)
   * @returns Object với startUTC và endUTC
   */
  getUTCDateRange(startDate, endDate) {
    let startUTC = "";
    let endUTC = "";
    if (startDate) {
      const start = (0, import_moment.default)(startDate).startOf("day").utc().toISOString();
      startUTC = start;
    }
    if (endDate) {
      const end = (0, import_moment.default)(endDate).endOf("day").utc().toISOString();
      endUTC = end;
    }
    return { startUTC, endUTC };
  }
  /**
   * Convert date range từ frontend form để gửi API
   * Đảm bảo consistent timezone handling
   * @param startDate Ngày bắt đầu
   * @param endDate Ngày kết thúc
   * @returns Object với Batdau và Ketthuc format chuẩn
   */
  getAPIDateRange(startDate, endDate) {
    const range = this.getUTCDateRange(startDate, endDate);
    return {
      Batdau: range.startUTC,
      Ketthuc: range.endUTC
    };
  }
  /**
   * Enhanced object date field synchronization
   * Specifically handles ngaygiao, ngaynhan fields for API calls
   * @param data Object containing date fields
   * @param dateFields Array of date field names to process
   * @returns Object with UTC-converted date fields
   */
  synchronizeObjectDates(data, dateFields = ["ngaygiao", "ngaynhan"]) {
    if (!data || typeof data !== "object")
      return data;
    const synchronized = __spreadValues({}, data);
    dateFields.forEach((field) => {
      if (synchronized[field] !== void 0 && synchronized[field] !== null) {
        console.log(`\u{1F504} Frontend synchronizing ${field}: ${synchronized[field]}`);
        try {
          synchronized[field] = this.toUTC(synchronized[field], field);
          console.log(`\u2705 Frontend synchronized ${field}: ${synchronized[field]}`);
        } catch (error) {
          console.error(`\u274C Error synchronizing ${field}:`, error);
          throw new Error(`Failed to synchronize ${field}: ${error instanceof Error ? error.message : String(error)}`);
        }
      }
    });
    return synchronized;
  }
  /**
   * Enhanced formatForDisplay method with logging for critical fields
   * @param utcDate UTC date từ database
   * @param format Format muốn hiển thị
   * @param fieldName Optional field name for logging
   * @returns Formatted string
   */
  formatForDisplayEnhanced(utcDate, format = "DD/MM/YYYY", fieldName) {
    if (!utcDate)
      return "";
    try {
      const formatted = import_moment.default.utc(utcDate).local().format(format);
      if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
        console.log(`\u{1F4C5} Frontend displaying ${fieldName}: ${utcDate} \u2192 ${formatted}`);
      }
      return formatted;
    } catch (error) {
      console.error(`Error formatting date for display:`, error);
      return "";
    }
  }
  /**
   * Validate date synchronization between client and server
   * @param clientDate Date from client
   * @param serverDate Date from server response
   * @param fieldName Field name for logging
   * @returns boolean indicating if dates match
   */
  validateDateSync(clientDate, serverDate, fieldName) {
    if (!clientDate || !serverDate)
      return false;
    try {
      const clientUTC = this.toUTC(clientDate);
      const serverUTC = import_moment.default.utc(serverDate).toISOString();
      const isMatch = clientUTC === serverUTC;
      if (fieldName && ["ngaygiao", "ngaynhan"].includes(fieldName)) {
        console.log(`\u{1F50D} Date sync validation for ${fieldName}:`, {
          client: clientUTC,
          server: serverUTC,
          match: isMatch
        });
      }
      return isMatch;
    } catch (error) {
      console.error(`Error validating date sync:`, error);
      return false;
    }
  }
  static \u0275fac = function TimezoneService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _TimezoneService)();
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _TimezoneService, factory: _TimezoneService.\u0275fac, providedIn: "root" });
};

export {
  TimezoneService
};
//# sourceMappingURL=chunk-V5JTJVVY.mjs.map
