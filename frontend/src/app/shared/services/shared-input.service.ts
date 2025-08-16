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
   * Parse decimal value with support for both comma and dot
   */
  parseDecimalValue(value: string): number {
    return Number(value.replace(/,/g, '.')) || 0;
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
          nextInput.select();
        }
        
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
    
    if (type === 'number') {
      newValue = this.parseDecimalValue(target.innerText.trim());
    } else {
      newValue = target.innerText.trim();
    }

    // Handle keyboard events
    const keyboardEvent = event as KeyboardEvent;
    this.handleKeyboardEvent(keyboardEvent, type);

    // Get field configuration
    const fieldConfig = this.fieldMappings[componentType]?.[field];
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
    
    if (type === 'number') {
      newValue = this.parseDecimalValue(target.innerText.trim());
    } else {
      newValue = target.innerText.trim();
    }

    // Get field configuration
    const fieldConfig = this.fieldMappings[componentType]?.[field];
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
