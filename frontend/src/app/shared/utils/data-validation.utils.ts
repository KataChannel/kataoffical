import moment from 'moment';

export interface ValidationRule {
  field: string;
  type: 'string' | 'number' | 'date' | 'email' | 'phone';
  required?: boolean;
  min?: number;
  max?: number;
  pattern?: RegExp;
  customValidator?: (value: any) => string | null;
}

export interface ValidationError {
  row: number;
  field: string;
  value: any;
  error: string;
}

export interface ValidationResult {
  isValid: boolean;
  errors: ValidationError[];
  validData: any[];
  invalidData: any[];
}

export class DataValidator {
  
  /**
   * Validate toàn bộ dữ liệu với các rules đã định nghĩa
   */
  static validateData(data: any[], rules: ValidationRule[]): ValidationResult {
    const errors: ValidationError[] = [];
    const validData: any[] = [];
    const invalidData: any[] = [];

    data.forEach((row, rowIndex) => {
      const rowErrors: ValidationError[] = [];
      const validatedRow = { ...row };

      rules.forEach(rule => {
        const error = this.validateField(row[rule.field], rule, rowIndex);
        if (error) {
          rowErrors.push(error);
        } else {
          // Transform valid data
          validatedRow[rule.field] = this.transformValue(row[rule.field], rule.type);
        }
      });

      if (rowErrors.length > 0) {
        errors.push(...rowErrors);
        invalidData.push({ ...row, _rowIndex: rowIndex, _errors: rowErrors });
      } else {
        validData.push(validatedRow);
      }
    });

    return {
      isValid: errors.length === 0,
      errors,
      validData,
      invalidData
    };
  }

  /**
   * Validate một field theo rule
   */
  private static validateField(value: any, rule: ValidationRule, rowIndex: number): ValidationError | null {
    // Check required
    if (rule.required && (value === null || value === undefined || value === '')) {
      return {
        row: rowIndex + 1,
        field: rule.field,
        value,
        error: `${rule.field} là bắt buộc`
      };
    }

    // Skip validation if value is empty and not required
    if (!rule.required && (value === null || value === undefined || value === '')) {
      return null;
    }

    // Type validation
    const typeError = this.validateType(value, rule.type, rowIndex, rule.field);
    if (typeError) return typeError;

    // Min/Max validation
    if (rule.min !== undefined || rule.max !== undefined) {
      const rangeError = this.validateRange(value, rule, rowIndex);
      if (rangeError) return rangeError;
    }

    // Pattern validation
    if (rule.pattern) {
      const patternError = this.validatePattern(value, rule, rowIndex);
      if (patternError) return patternError;
    }

    // Custom validation
    if (rule.customValidator) {
      const customError = rule.customValidator(value);
      if (customError) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: customError
        };
      }
    }

    return null;
  }

  /**
   * Validate kiểu dữ liệu
   */
  private static validateType(value: any, type: string, rowIndex: number, field: string): ValidationError | null {
    switch (type) {
      case 'number':
        if (!this.isValidNumber(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} phải là số`
          };
        }
        break;

      case 'date':
        if (!this.isValidDate(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} phải là ngày hợp lệ (DD/MM/YYYY hoặc YYYY-MM-DD)`
          };
        }
        break;

      case 'email':
        if (!this.isValidEmail(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} phải là email hợp lệ`
          };
        }
        break;

      case 'phone':
        if (!this.isValidPhone(value)) {
          return {
            row: rowIndex + 1,
            field,
            value,
            error: `${field} phải là số điện thoại hợp lệ`
          };
        }
        break;

      case 'string':
        // String is always valid, just ensure it's converted to string
        break;

      default:
        break;
    }
    return null;
  }

  /**
   * Validate range (min/max)
   */
  private static validateRange(value: any, rule: ValidationRule, rowIndex: number): ValidationError | null {
    if (rule.type === 'number') {
      const num = Number(value);
      if (rule.min !== undefined && num < rule.min) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} phải >= ${rule.min}`
        };
      }
      if (rule.max !== undefined && num > rule.max) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} phải <= ${rule.max}`
        };
      }
    } else if (rule.type === 'string') {
      const str = String(value);
      if (rule.min !== undefined && str.length < rule.min) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} phải có ít nhất ${rule.min} ký tự`
        };
      }
      if (rule.max !== undefined && str.length > rule.max) {
        return {
          row: rowIndex + 1,
          field: rule.field,
          value,
          error: `${rule.field} không được vượt quá ${rule.max} ký tự`
        };
      }
    }
    return null;
  }

  /**
   * Validate pattern
   */
  private static validatePattern(value: any, rule: ValidationRule, rowIndex: number): ValidationError | null {
    if (rule.pattern && !rule.pattern.test(String(value))) {
      return {
        row: rowIndex + 1,
        field: rule.field,
        value,
        error: `${rule.field} không đúng định dạng`
      };
    }
    return null;
  }

  /**
   * Check if value is valid number
   */
  private static isValidNumber(value: any): boolean {
    if (typeof value === 'number') return !isNaN(value);
    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') return false;
      return !isNaN(Number(trimmed));
    }
    return false;
  }

  /**
   * Check if value is valid date
   */
  private static isValidDate(value: any): boolean {
    if (value instanceof Date) {
      return !isNaN(value.getTime());
    }

    if (typeof value === 'string') {
      const trimmed = value.trim();
      if (trimmed === '') return false;

      // Try different date formats
      const formats = [
        'DD/MM/YYYY',
        'DD-MM-YYYY',
        'YYYY-MM-DD',
        'YYYY/MM/DD',
        'MM/DD/YYYY'
      ];

      return formats.some(format => moment(trimmed, format, true).isValid());
    }

    // Handle Excel date numbers
    if (typeof value === 'number') {
      try {
        const date = new Date((value - 25569) * 86400 * 1000);
        return !isNaN(date.getTime());
      } catch {
        return false;
      }
    }

    return false;
  }

  /**
   * Check if value is valid email
   */
  private static isValidEmail(value: any): boolean {
    if (typeof value !== 'string') return false;
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value.trim());
  }

  /**
   * Check if value is valid phone
   */
  private static isValidPhone(value: any): boolean {
    if (typeof value !== 'string' && typeof value !== 'number') return false;
    const phoneStr = String(value).trim();
    // Vietnamese phone number regex
    const phoneRegex = /^(\+84|84|0)(3[2-9]|5[6|8|9]|7[0|6-9]|8[1-6|8|9]|9[0-4|6-9])[0-9]{7}$/;
    return phoneRegex.test(phoneStr);
  }

  /**
   * Transform value to correct type
   */
  private static transformValue(value: any, type: string): any {
    switch (type) {
      case 'number':
        return Number(value);

      case 'date':
        if (value instanceof Date) return value;
        if (typeof value === 'string') {
          const formats = ['DD/MM/YYYY', 'DD-MM-YYYY', 'YYYY-MM-DD', 'YYYY/MM/DD'];
          for (const format of formats) {
            const parsed = moment(value.trim(), format, true);
            if (parsed.isValid()) {
              return parsed.toDate();
            }
          }
        }
        if (typeof value === 'number') {
          // Excel date number
          return new Date((value - 25569) * 86400 * 1000);
        }
        return value;

      case 'string':
        return String(value || '').trim();

      case 'email':
        return String(value || '').trim().toLowerCase();

      case 'phone':
        return String(value || '').trim();

      default:
        return value;
    }
  }

  /**
   * Get common validation rules for different entities
   */
  static getValidationRules(entityType: string): ValidationRule[] {
    switch (entityType) {
      case 'sanpham':
        return [
          { field: 'title', type: 'string', required: true, min: 2, max: 255 },
          { field: 'masp', type: 'string', required: true, min: 1, max: 50 },
          { field: 'giagoc', type: 'number', required: false, min: 0 },
          { field: 'dvt', type: 'string', required: false, max: 20 },
          { field: 'soluong', type: 'number', required: false, min: 0 },
          { field: 'soluongkho', type: 'number', required: false, min: 0 },
          { field: 'haohut', type: 'number', required: false, min: 0, max: 100 },
          { field: 'ghichu', type: 'string', required: false, max: 500 }
        ];

      case 'khachhang':
        return [
          { field: 'name', type: 'string', required: true, min: 2, max: 255 },
          { field: 'mancc', type: 'string', required: true, min: 1, max: 50 },
          { field: 'sdt', type: 'phone', required: false },
          { field: 'diachi', type: 'string', required: false, max: 500 },
          { field: 'ghichu', type: 'string', required: false, max: 500 }
        ];

      case 'donhang':
        return [
          { field: 'ngaygiao', type: 'date', required: true },
          { field: 'sldat', type: 'number', required: true, min: 0 },
          { field: 'slgiao', type: 'number', required: true, min: 0 },
          { field: 'slnhan', type: 'number', required: false, min: 0 },
          { field: 'giaban', type: 'number', required: false, min: 0 },
          { field: 'ghichu', type: 'string', required: false, max: 500 }
        ];

      default:
        return [];
    }
  }
}