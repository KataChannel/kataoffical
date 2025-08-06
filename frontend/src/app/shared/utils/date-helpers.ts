import moment from 'moment';

export class DateHelpers {
  private static readonly TIMEZONE = 'Asia/Ho_Chi_Minh';
  private static readonly ISO_FORMAT = 'YYYY-MM-DDTHH:mm:ss.SSSZ';
  private static readonly DATE_FORMAT = 'YYYY-MM-DD';
  private static readonly DATETIME_FORMAT = 'YYYY-MM-DD HH:mm:ss';

  /**
   * Initialize and suppress deprecation warnings
   */
  static init(): void {
    // Suppress moment deprecation warnings
    moment.suppressDeprecationWarnings = true;
  }

  /**
   * Safely convert any date input to moment without deprecation warnings
   */
  static toMoment(date: Date | string | moment.Moment | null | undefined, timezone = 'Asia/Ho_Chi_Minh'): moment.Moment {
    if (!date) {
      return moment();
    }

    if (moment.isMoment(date)) {
      return date.clone();
    }
    
    if (date instanceof Date) {
      // Convert Date to ISO string first to avoid deprecation warning
      return moment(date.toISOString());
    }
    
    if (typeof date === 'string') {
      // Handle various string formats
      if (date.match(/^\d{4}-\d{2}-\d{2}$/)) {
        // YYYY-MM-DD format
        return moment(date, this.DATE_FORMAT);
      }
      if (date.match(/^\d{4}-\d{2}-\d{2} \d{2}:\d{2}:\d{2}$/)) {
        // YYYY-MM-DD HH:mm:ss format
        return moment(date, this.DATETIME_FORMAT);
      }
      if (date.match(/^\d{2}\/\d{2}\/\d{4}$/)) {
        // DD/MM/YYYY format (Vietnamese)
        return moment(date, 'DD/MM/YYYY');
      }
      // For other formats, try to parse as ISO string
      return moment(date);
    }
    
    return moment();
  }

  /**
   * Convert any date input to ISO string for API calls
   */
  static toISOString(date: Date | string | moment.Moment | null | undefined): string {
    if (!date) {
      return moment().toISOString();
    }

    const momentDate = this.toMoment(date);
    return momentDate.toISOString();
  }

  /**
   * Convert any date input to Date object
   */
  static toDate(date: Date | string | moment.Moment | null | undefined): Date {
    if (!date) {
      return new Date();
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
  static formatDate(date: Date | string | moment.Moment | null | undefined, format: string = 'DD/MM/YYYY'): string {
    if (!date) {
      return '';
    }

    const momentDate = this.toMoment(date);
    return momentDate.format(format);
  }

  /**
   * Format date for API (YYYY-MM-DD)
   */
  static formatDateForAPI(date: Date | string | moment.Moment | null | undefined): string {
    if (!date) {
      return '';
    }

    const momentDate = this.toMoment(date);
    return momentDate.format(this.DATE_FORMAT);
  }

  /**
   * Format datetime for API (YYYY-MM-DD HH:mm:ss)
   */
  static formatDateTimeForAPI(date: Date | string | moment.Moment | null | undefined): string {
    if (!date) {
      return '';
    }

    const momentDate = this.toMoment(date);
    return momentDate.format(this.DATETIME_FORMAT);
  }

  /**
   * Get start of day
   */
  static startOfDay(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.startOf('day').toDate();
  }

  /**
   * Get end of day
   */
  static endOfDay(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.endOf('day').toDate();
  }

  /**
   * Get start of week
   */
  static startOfWeek(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.startOf('week').toDate();
  }

  /**
   * Get end of week
   */
  static endOfWeek(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.endOf('week').toDate();
  }

  /**
   * Get start of month
   */
  static startOfMonth(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.startOf('month').toDate();
  }

  /**
   * Get end of month
   */
  static endOfMonth(date?: Date | string | moment.Moment | null | undefined): Date {
    const momentDate = this.toMoment(date);
    return momentDate.endOf('month').toDate();
  }

  /**
   * Add time to date
   */
  static add(date: Date | string | moment.Moment | null | undefined, amount: number, unit: moment.unitOfTime.DurationConstructor): Date {
    const momentDate = this.toMoment(date);
    return momentDate.add(amount, unit).toDate();
  }

  /**
   * Subtract time from date
   */
  static subtract(date: Date | string | moment.Moment | null | undefined, amount: number, unit: moment.unitOfTime.DurationConstructor): Date {
    const momentDate = this.toMoment(date);
    return momentDate.subtract(amount, unit).toDate();
  }

  /**
   * Format date safely
   */
  static format(date: Date | string | moment.Moment | null | undefined, format: string = 'YYYY-MM-DD'): string {
    if (!date) {
      return '';
    }

    const momentDate = this.toMoment(date);
    return momentDate.format(format);
  }

  /**
   * Get current date
   */
  static now(): Date {
    return moment().toDate();
  }

  /**
   * Get date range presets
   */
  static getDateRangePresets(): {
    [key: string]: {
      start: Date;
      end: Date;
      startFormatted: string;
      endFormatted: string;
    }
  } {
    const now = new Date();
    
    return {
      today: {
        start: this.startOfDay(now),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(now)),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      yesterday: {
        start: this.startOfDay(this.subtract(now, 1, 'day')),
        end: this.endOfDay(this.subtract(now, 1, 'day')),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 1, 'day'))),
        endFormatted: this.formatDateForAPI(this.endOfDay(this.subtract(now, 1, 'day')))
      },
      last7days: {
        start: this.startOfDay(this.subtract(now, 6, 'days')),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 6, 'days'))),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      last30days: {
        start: this.startOfDay(this.subtract(now, 29, 'days')),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfDay(this.subtract(now, 29, 'days'))),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      thisMonth: {
        start: this.startOfMonth(now),
        end: this.endOfDay(now),
        startFormatted: this.formatDateForAPI(this.startOfMonth(now)),
        endFormatted: this.formatDateForAPI(this.endOfDay(now))
      },
      lastMonth: {
        start: this.startOfMonth(this.subtract(now, 1, 'month')),
        end: this.endOfMonth(this.subtract(now, 1, 'month')),
        startFormatted: this.formatDateForAPI(this.startOfMonth(this.subtract(now, 1, 'month'))),
        endFormatted: this.formatDateForAPI(this.endOfMonth(this.subtract(now, 1, 'month')))
      }
    };
  }

  /**
   * Safe moment creation from any input
   */
  static safeMoment(input?: any): moment.Moment {
    if (!input) {
      return moment();
    }
    
    if (moment.isMoment(input)) {
      return input.clone();
    }
    
    if (input instanceof Date) {
      return moment(input.toISOString());
    }
    
    if (typeof input === 'string') {
      return moment(input);
    }
    
    return moment();
  }

  /**
   * Check if date is valid
   */
  static isValid(date: Date | string | moment.Moment | null | undefined): boolean {
    if (!date) {
      return false;
    }

    const momentDate = this.toMoment(date);
    return momentDate.isValid();
  }

  /**
   * Compare two dates
   */
  static isBefore(date1: Date | string | moment.Moment, date2: Date | string | moment.Moment): boolean {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isBefore(moment2);
  }

  /**
   * Compare two dates
   */
  static isAfter(date1: Date | string | moment.Moment, date2: Date | string | moment.Moment): boolean {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isAfter(moment2);
  }

  /**
   * Check if dates are same day
   */
  static isSameDay(date1: Date | string | moment.Moment, date2: Date | string | moment.Moment): boolean {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.isSame(moment2, 'day');
  }

  /**
   * Get difference between dates
   */
  static diff(date1: Date | string | moment.Moment, date2: Date | string | moment.Moment, unit: moment.unitOfTime.Diff = 'days'): number {
    const moment1 = this.toMoment(date1);
    const moment2 = this.toMoment(date2);
    return moment1.diff(moment2, unit);
  }
}
