import './polyfills.server.mjs';
import {
  require_moment
} from "./chunk-TEMMKMG5.mjs";
import {
  __toESM
} from "./chunk-FMEBT56H.mjs";

// src/app/shared/utils/date-helpers.ts
var import_moment = __toESM(require_moment());
var DateHelpers = class {
  static TIMEZONE = "Asia/Ho_Chi_Minh";
  static ISO_FORMAT = "YYYY-MM-DDTHH:mm:ss.SSSZ";
  static DATE_FORMAT = "YYYY-MM-DD";
  static DATETIME_FORMAT = "YYYY-MM-DD HH:mm:ss";
  /**
   * Initialize and suppress deprecation warnings
   */
  static init() {
    import_moment.default.suppressDeprecationWarnings = true;
  }
  /**
   * Safely convert any date input to moment without deprecation warnings
   */
  static toMoment(date, timezone = "Asia/Ho_Chi_Minh") {
    if (!date) {
      return (0, import_moment.default)();
    }
    if (import_moment.default.isMoment(date)) {
      return date.clone();
    }
    if (date instanceof Date) {
      return (0, import_moment.default)(date.toISOString());
    }
    if (typeof date === "string") {
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        return (0, import_moment.default)(date, this.DATE_FORMAT);
      }
      if (date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        return (0, import_moment.default)(date, this.DATETIME_FORMAT);
      }
      if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        return (0, import_moment.default)(date, "DD/MM/YYYY");
      }
      return (0, import_moment.default)(date);
    }
    return (0, import_moment.default)();
  }
  /**
   * Convert any date input to ISO string for API calls
   */
  static toISOString(date) {
    if (!date) {
      return (0, import_moment.default)().toISOString();
    }
    const momentDate = this.toMoment(date);
    return momentDate.toISOString();
  }
  /**
   * Convert any date input to Date object
   */
  static toDate(date) {
    if (!date) {
      return /* @__PURE__ */ new Date();
    }
    if (date instanceof Date) {
      return date;
    }
    const momentDate = this.toMoment(date);
    return momentDate.toDate();
  }
  /**
   * Format date for display
   */
  static formatDate(date, format = "DD/MM/YYYY") {
    if (!date) {
      return "";
    }
    const momentDate = this.toMoment(date);
    return momentDate.format(format);
  }
  /**
   * Format date for API (YYYY-MM-DD)
   */
  static formatDateForAPI(date) {
    if (!date) {
      return "";
    }
    const momentDate = this.toMoment(date);
    return momentDate.format(this.DATE_FORMAT);
  }
  /**
   * Format datetime for API (YYYY-MM-DD HH:mm:ss)
   */
  static formatDateTimeForAPI(date) {
    if (!date) {
      return "";
    }
    const momentDate = this.toMoment(date);
    return momentDate.format(this.DATETIME_FORMAT);
  }
  /**
   * Get start of day
   */
  static startOfDay(date) {
    const momentDate = this.toMoment(date);
    return momentDate.startOf("day").toDate();
  }
  /**
   * Get end of day
   */
  static endOfDay(date) {
    const momentDate = this.toMoment(date);
    return momentDate.endOf("day").toDate();
  }
  /**
   * Get start of week
   */
  static startOfWeek(date) {
    const momentDate = this.toMoment(date);
    return momentDate.startOf("week").toDate();
  }
  /**
   * Get end of week
   */
  static endOfWeek(date) {
    const momentDate = this.toMoment(date);
    return momentDate.endOf("week").toDate();
  }
  /**
   * Get start of month
   */
  static startOfMonth(date) {
    const momentDate = this.toMoment(date);
    return momentDate.startOf("month").toDate();
  }
  /**
   * Get end of month
   */
  static endOfMonth(date) {
    const momentDate = this.toMoment(date);
    return momentDate.endOf("month").toDate();
  }
  /**
   * Add time to date
   */
  static add(date, amount, unit) {
    const momentDate = this.toMoment(date);
    return momentDate.add(amount, unit).toDate();
  }
  /**
   * Subtract time from date
   */
  static subtract(date, amount, unit) {
    const momentDate = this.toMoment(date);
    return momentDate.subtract(amount, unit).toDate();
  }
  /**
   * Format date safely
   */
  static format(date, format = "YYYY-MM-DD") {
    if (!date) {
      return "";
    }
    const momentDate = this.toMoment(date);
    return momentDate.format(format);
  }
  /**
   * Get current date
   */
  static now() {
    return (0, import_moment.default)().toDate();
  }
  /**
   * Get date range presets
   */
  static getDateRangePresets() {
    const now = /* @__PURE__ */ new Date();
    return {
      today: {
        start: this.startOfDay(now),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(now)),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      yesterday: {
        start: this.startOfDay(this.subtract(now, 1, "day")),
        end: this.endOfDay(this.subtract(now, 1, "day")),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 1, "day"))),
        endFormatted: this.formatDateForAPI(this.endOfDay(this.subtract(now, 1, "day")))
      },
      last7days: {
        start: this.startOfDay(this.subtract(now, 6, "days")),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 6, "days"))),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      last30days: {
        start: this.startOfDay(this.subtract(now, 29, "days")),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 29, "days"))),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      thisMonth: {
        start: this.startOfMonth(now),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfMonth(now)),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      lastMonth: {
        start: this.startOfMonth(this.subtract(now, 1, "month")),
        end: this.endOfMonth(this.subtract(now, 1, "month")),
        startFormatted: this.formatDateForAPI(this.startOfMonth(this.subtract(now, 1, "month"))),
        endFormatted: this.formatDateForAPI(this.endOfMonth(this.subtract(now, 1, "month")))
      }
    };
  }
  /**
   * Safe moment creation from any input
   */
  static safeMoment(input) {
    if (!input) {
      return (0, import_moment.default)();
    }
    if (import_moment.default.isMoment(input)) {
      return input.clone();
    }
    if (input instanceof Date) {
      return (0, import_moment.default)(input.toISOString());
    }
    if (typeof input === "string") {
      return (0, import_moment.default)(input);
    }
    return (0, import_moment.default)();
  }
  /**
   * Check if date is valid
   */
  static isValid(date) {
    if (!date) {
      return false;
    }
    const momentDate = this.toMoment(date);
    return momentDate.isValid();
  }
  /**
   * Compare two dates
   */
  static isBefore(date1, date2) {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isBefore(moment2);
  }
  /**
   * Compare two dates
   */
  static isAfter(date1, date2) {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isAfter(moment2);
  }
  /**
   * Check if dates are same day
   */
  static isSameDay(date1, date2) {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isSame(moment2, "day");
  }
  /**
   * Get difference between dates
   */
  static diff(date1, date2, unit = "days") {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.diff(moment2, unit);
  }
};

export {
  DateHelpers
};
//# sourceMappingURL=chunk-KIQNTD6X.mjs.map
