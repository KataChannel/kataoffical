import { Injectable } from '@angular/core';
import { MatSnackBar } from '@angular/material/snack-bar';

export interface InputUpdateConfig {
  fieldType: 'sldat' | 'slgiao' | 'slnhan' | 'gianhap' | 'giaban' | 'ghichu' | 'other';
  inputClassName: string;
  focusNext?: boolean;
  syncFields?: string[];
  calculateFields?: { [key: string]: (item: any, newValue: any) => number };
  validation?: (item: any, newValue: any) => string | null;
}

export interface ComponentFieldMapping {
  // Mapping for different component types
  [componentType: string]: {
    [fieldName: string]: InputUpdateConfig;
  };
}

@Injectable({
  providedIn: 'root'
})
export class SharedInputService {
  
  private fieldMappings: ComponentFieldMapping = {
    // DetailDonhang mappings
    'donhang': {
      'sldat': {
        fieldType: 'sldat',
        inputClassName: '.sldat-input',
        focusNext: true,
        syncFields: ['slgiao', 'slnhan']
      },
      'slgiao': {
        fieldType: 'slgiao',
        inputClassName: '.slgiao-input',
        focusNext: true,
        validation: (item: any, newValue: any) => {
          if (newValue < item.sldat) {
            return 'Số lượng giao phải lớn hơn số lượng đặt';
          }
          return null;
        }
      },
      'slnhan': {
        fieldType: 'slnhan',
        inputClassName: '.slnhan-input',
        focusNext: true
      },
      'ghichu': {
        fieldType: 'ghichu',
        inputClassName: '.ghichu-input',
        focusNext: true
      }
    },
    // DetailDathang mappings
    'dathang': {
      'sldat': {
        fieldType: 'sldat',
        inputClassName: '.sldat-input',
        focusNext: true,
        syncFields: ['slgiao', 'slnhan']
      },
      'slgiao': {
        fieldType: 'slgiao',
        inputClassName: '.slgiao-input',
        focusNext: true,
        validation: (item: any, newValue: any) => {
          if (newValue < item.sldat) {
            return 'Số lượng giao phải lớn hơn số lượng đặt';
          }
          return null;
        }
      },
      'slnhan': {
        fieldType: 'slnhan',
        inputClassName: '.slnhan-input',
        focusNext: true,
        calculateFields: {
          'ttnhan': (item: any, newValue: any) => {
            return parseFloat((item.gianhap * parseFloat(newValue.toString())).toFixed(3)) || 0;
          }
        }
      },
      'gianhap': {
        fieldType: 'gianhap',
        inputClassName: '.gianhap-input',
        focusNext: true,
        calculateFields: {
          'ttnhan': (item: any, newValue: any) => {
            return parseFloat((parseFloat(newValue.toString()) * item.slnhan).toFixed(3)) || 0;
          }
        }
      },
      'ghichu': {
        fieldType: 'ghichu',
        inputClassName: '.ghichu-input',
        focusNext: true
      }
    },
    // DetailPhieugiaohang mappings
    'phieugiaohang': {
      'sldat': {
        fieldType: 'sldat',
        inputClassName: '.sldat-input',
        focusNext: true,
        syncFields: ['slgiao', 'slnhan'],
        calculateFields: {
          'ttgiao': (item: any, newValue: any) => {
            return Number(newValue) * (item.giaban || 0);
          }
        }
      },
      'slgiao': {
        fieldType: 'slgiao',
        inputClassName: '.slgiao-input',
        focusNext: true,
        syncFields: ['slnhan'],
        calculateFields: {
          'ttgiao': (item: any, newValue: any) => {
            return Number(newValue) * (item.giaban || 0);
          }
        }
      },
      'slnhan': {
        fieldType: 'slnhan',
        inputClassName: '.slnhan-input',
        focusNext: true
      },
      'giaban': {
        fieldType: 'giaban',
        inputClassName: '.giaban-input',
        focusNext: true,
        calculateFields: {
          'ttgiao': (item: any, newValue: any) => {
            return (item.slgiao || 0) * Number(newValue);
          }
        }
      },
      'ghichu': {
        fieldType: 'ghichu',
        inputClassName: '.ghichu-input',
        focusNext: true
      }
    }
  };

  constructor(private snackBar: MatSnackBar) {}

  /**
   * Parse decimal value with support for thousands separators and both comma/dot decimals
   */
  /**
   * Parse decimal value with support for thousands separators and both comma/dot decimals.
   * Context-aware: quantity fields (sldat, slgiao, slnhan) always treat single dot/comma as decimal separator.
   */
  parseDecimalValue(value: string | number, fieldType?: string): number {
    if (!value && value !== 0) return 0;
    
    let str = value.toString().trim();
    
    // Handle negative numbers
    const isNegative = str.startsWith('-');
    if (isNegative) {
      str = str.substring(1);
    }
    
    // Remove all characters except digits, dots and commas
    str = str.replace(/[^\d.,]/g, '');
    if (!str) return 0;

    // 1. Quantity fields (sldat, slgiao, slnhan, soluong)
    // In food/vegetable business, weights frequently have decimals up to 3 digits (e.g. 0.375 kg = 375g).
    // Users NEVER enter thousands separators for row quantities.
    // Therefore, any single dot or comma is ALWAYS a decimal separator.
    const isQuantityField = ['sldat', 'slgiao', 'slnhan', 'soluong'].includes(fieldType || '');
    if (isQuantityField) {
      // Replace comma with dot
      str = str.replace(/,/g, '.');
      // If user accidentally typed multiple dots, keep only the first one
      const firstDot = str.indexOf('.');
      if (firstDot !== -1) {
        str = str.substring(0, firstDot + 1) + str.substring(firstDot + 1).replace(/\./g, '');
      }
      const val = parseFloat(str);
      const res = isNaN(val) ? 0 : val;
      return isNegative ? -res : res;
    }

    // 2. Price/currency fields (giaban, gianhap, etc.)
    // In VND, prices are integers with no decimals. Any dot/comma is a thousands separator.
    const isPriceField = ['giaban', 'gianhap', 'ttgiao', 'ttnhan', 'ttdat', 'tongtien', 'tongvat'].includes(fieldType || '');
    if (isPriceField) {
      str = str.replace(/[.,]/g, '');
      const val = parseFloat(str);
      const res = isNaN(val) ? 0 : val;
      return isNegative ? -res : res;
    }

    // 3. General / Fallback parsing:
    // If the number starts with 0 (e.g. 0.375 or 0,375), it is ALWAYS a decimal, never a thousands separator!
    if (/^0[.,]\d+$/.test(str)) {
      str = str.replace(/,/g, '.');
      const val = parseFloat(str);
      const res = isNaN(val) ? 0 : val;
      return isNegative ? -res : res;
    }

    // Check if it has both comma and dot (e.g. 1,234.56 or 1.234,56)
    const hasComma = str.includes(',');
    const hasDot = str.includes('.');

    if (hasComma && hasDot) {
      const lastComma = str.lastIndexOf(',');
      const lastDot = str.lastIndexOf('.');
      
      if (lastDot > lastComma) {
        // Dot is decimal, comma is thousand separator (e.g. 1,234.56)
        str = str.replace(/,/g, '');
      } else {
        // Comma is decimal, dot is thousand separator (e.g. 1.234,56)
        str = str.replace(/\./g, '').replace(/,/g, '.');
      }
    } else if (hasComma) {
      const commaCount = (str.match(/,/g) || []).length;
      if (commaCount > 1) {
        // Multiple commas -> thousands separator (e.g. 1,000,000)
        str = str.replace(/,/g, '');
      } else {
        // Single comma: treat as decimal separator (e.g. 10,5 or 0,375 or 12,5)
        str = str.replace(/,/g, '.');
      }
    } else if (hasDot) {
      const dotCount = (str.match(/\./g) || []).length;
      if (dotCount > 1) {
        // Multiple dots -> thousands separator (e.g. 1.000.000)
        str = str.replace(/\./g, '');
      }
      // Single dot: standard decimal in JavaScript, keep as is
    }

    const parsed = parseFloat(str);
    const finalValue = isNaN(parsed) ? 0 : parsed;
    return isNegative ? -finalValue : finalValue;
  }

  /**
   * Handle keyboard events for number inputs
   */
  handleKeyboardEvent(event: KeyboardEvent, type: 'number' | 'string'): boolean {
    if (event.key === 'Enter' && !event.shiftKey) {
      event.preventDefault();
      return true;
    }

    if (type === 'number') {
      const allowedKeys = [
        'Backspace', 'Delete', 'ArrowLeft', 'ArrowRight', 'Tab', 'Enter',
        '0', '1', '2', '3', '4', '5', '6', '7', '8', '9',
        '.', ',', 'Home', 'End', 'PageUp', 'PageDown'
      ];

      const currentText = (event.target as HTMLElement).innerText.trim();
      const isDecimalSeparator = event.key === '.' || event.key === ',';
      const hasDecimalSeparator = currentText.includes('.') || currentText.includes(',');
      
      const isDigit = /^[0-9]$/.test(event.key);
      const isNumpadDigit = event.code && event.code.startsWith('Numpad') && /Numpad[0-9]/.test(event.code);
      const isControlKey = allowedKeys.includes(event.key);
      
      if (!isDigit && !isNumpadDigit && !(isDecimalSeparator && !hasDecimalSeparator) && !isControlKey) {
        event.preventDefault();
        return false;
      }
    }
    return true;
  }

  /**
   * Focus next input in the same column
   */
  focusNextInput(inputClassName: string, currentIndex: number, totalLength: number): void {
    if (currentIndex < totalLength - 1) {
      const inputs = document.querySelectorAll(inputClassName) as NodeListOf<HTMLElement>;
      const nextInput = inputs[currentIndex + 1] as HTMLElement;
      
      if (nextInput) {
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
          setTimeout(() => {
            nextInput.select();
          }, 10);
        } else {
          nextInput.focus();
          // Use Range API for content editable elements
          setTimeout(() => {
            if (document.createRange && window.getSelection) {
              const range = document.createRange();
              range.selectNodeContents(nextInput);
              const selection = window.getSelection();
              selection?.removeAllRanges();
              selection?.addRange(range);
            }
          }, 10);
        }
      }
    }
  }

  /**
   * Auto-select text when focusing on input
   */
  onInputFocus(event: FocusEvent): void {
    const target = event.target as HTMLElement;
    if (target && target.isContentEditable) {
      setTimeout(() => {
        if (document.createRange && window.getSelection) {
          const range = document.createRange();
          range.selectNodeContents(target);
          const selection = window.getSelection();
          selection?.removeAllRanges();
          selection?.addRange(range);
        }
      }, 10);
    } else if (target instanceof HTMLInputElement) {
      setTimeout(() => {
        target.select();
      }, 10);
    }
  }

  /**
   * Main update value method for keyup events
   */
  updateValue(
    event: Event,
    componentType: 'donhang' | 'dathang' | 'phieugiaohang',
    index: number | null,
    element: any,
    field: string,
    type: 'number' | 'string',
    dataArray: any[],
    updateFn: (updateData: any) => void,
    totalLength: number
  ): void {
    const target = event.target as HTMLElement;
    let newValue: any;
    
    // Get field configuration
    const fieldConfig = this.fieldMappings[componentType]?.[field];
    const targetFieldType = fieldConfig?.fieldType || field;

    const rawValue = (target instanceof HTMLInputElement) ? target.value : target.innerText;
    if (type === 'number') {
      newValue = this.parseDecimalValue(rawValue.trim(), targetFieldType);
    } else {
      newValue = rawValue.trim();
    }

    // Handle keyboard events
    const keyboardEvent = event as KeyboardEvent;
    this.handleKeyboardEvent(keyboardEvent, type);

    if (!fieldConfig) {
      // Fallback for unknown fields
      this.updateSimpleField(index, element, field, newValue, dataArray, updateFn);
      return;
    }

    // Validate if needed
    if (fieldConfig.validation && index !== null) {
      const currentItem = this.findItemInArray(element, dataArray);
      const validationError = fieldConfig.validation(currentItem, newValue);
      if (validationError) {
        this.snackBar.open(validationError, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        // Reset to original value for validation failures
        if (field === 'slgiao') {
          newValue = currentItem?.sldat || 0;
        }
      }
    }

    // Update the data
    this.updateFieldWithConfig(index, element, field, newValue, fieldConfig, dataArray, updateFn);

    // Focus next input if configured
    if (fieldConfig.focusNext && index !== null) {
      this.focusNextInput(fieldConfig.inputClassName, index, totalLength);
    }
  }

  /**
   * Main update value method for blur events
   */
  updateBlurValue(
    event: Event,
    componentType: 'donhang' | 'dathang' | 'phieugiaohang',
    index: number | null,
    element: any,
    field: string,
    type: 'number' | 'string',
    dataArray: any[],
    updateFn: (updateData: any) => void
  ): void {
    const target = event.target as HTMLElement;
    let newValue: any;
    
    // Get field configuration
    const fieldConfig = this.fieldMappings[componentType]?.[field];
    const targetFieldType = fieldConfig?.fieldType || field;

    const rawValue = (target instanceof HTMLInputElement) ? target.value : target.innerText;
    if (type === 'number') {
      newValue = this.parseDecimalValue(rawValue.trim(), targetFieldType);
    } else {
      newValue = rawValue.trim();
    }

    if (!fieldConfig) {
      this.updateSimpleField(index, element, field, newValue, dataArray, updateFn);
      return;
    }

    // Validate if needed
    if (fieldConfig.validation && index !== null) {
      const currentItem = this.findItemInArray(element, dataArray);
      const validationError = fieldConfig.validation(currentItem, newValue);
      if (validationError) {
        this.snackBar.open(validationError, '', {
          duration: 1000,
          horizontalPosition: 'end',
          verticalPosition: 'top',
          panelClass: ['snackbar-error'],
        });
        if (field === 'slgiao') {
          newValue = currentItem?.sldat || 0;
        }
      }
    }

    // Update the data
    this.updateFieldWithConfig(index, element, field, newValue, fieldConfig, dataArray, updateFn);
  }

  /**
   * Find item in array by element id or reference
   */
  private findItemInArray(element: any, dataArray: any[]): any {
    if (element?.id) {
      return dataArray.find((item: any) => item.id === element.id);
    }
    return element;
  }

  /**
   * Update field with configuration
   */
  private updateFieldWithConfig(
    index: number | null,
    element: any,
    field: string,
    newValue: any,
    config: InputUpdateConfig,
    dataArray: any[],
    updateFn: (updateData: any) => void
  ): void {
    if (index !== null) {
      const itemIndex = dataArray.findIndex((item: any) => item.id === element.id);
      if (itemIndex === -1) return;

      updateFn((v: any) => {
        // Update main field
        v.sanpham[itemIndex][field] = newValue;

        // Sync fields if configured
        if (config.syncFields) {
          config.syncFields.forEach(syncField => {
            v.sanpham[itemIndex][syncField] = newValue;
          });
        }

        // Calculate derived fields if configured
        if (config.calculateFields) {
          Object.entries(config.calculateFields).forEach(([calcField, calcFn]) => {
            v.sanpham[itemIndex][calcField] = calcFn(v.sanpham[itemIndex], newValue);
          });
        }

        return v;
      });
    } else {
      // Update main object field
      updateFn((v: any) => {
        v[field] = newValue;
        return v;
      });
    }
  }

  /**
   * Simple field update for unknown fields
   */
  private updateSimpleField(
    index: number | null,
    element: any,
    field: string,
    newValue: any,
    dataArray: any[],
    updateFn: (updateData: any) => void
  ): void {
    if (index !== null) {
      const itemIndex = dataArray.findIndex((item: any) => item.id === element.id);
      if (itemIndex === -1) return;

      updateFn((v: any) => {
        v.sanpham[itemIndex][field] = newValue;
        return v;
      });
    } else {
      updateFn((v: any) => {
        v[field] = newValue;
        return v;
      });
    }
  }
}
