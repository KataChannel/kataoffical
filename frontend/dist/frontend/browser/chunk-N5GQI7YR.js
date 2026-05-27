import {
  MatSnackBar
} from "./chunk-3D4DVDG5.js";
import {
  ɵɵdefineInjectable,
  ɵɵinject
} from "./chunk-SEHLAVZZ.js";

// src/app/shared/services/shared-input.service.ts
var SharedInputService = class _SharedInputService {
  snackBar;
  fieldMappings = {
    // DetailDonhang mappings
    "donhang": {
      "sldat": {
        fieldType: "sldat",
        inputClassName: ".sldat-input",
        focusNext: true,
        syncFields: ["slgiao", "slnhan"]
      },
      "slgiao": {
        fieldType: "slgiao",
        inputClassName: ".slgiao-input",
        focusNext: true,
        validation: (item, newValue) => {
          if (newValue < item.sldat) {
            return "S\u1ED1 l\u01B0\u1EE3ng giao ph\u1EA3i l\u1EDBn h\u01A1n s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t";
          }
          return null;
        }
      },
      "slnhan": {
        fieldType: "slnhan",
        inputClassName: ".slnhan-input",
        focusNext: true
      },
      "ghichu": {
        fieldType: "ghichu",
        inputClassName: ".ghichu-input",
        focusNext: true
      }
    },
    // DetailDathang mappings
    "dathang": {
      "sldat": {
        fieldType: "sldat",
        inputClassName: ".sldat-input",
        focusNext: true,
        syncFields: ["slgiao", "slnhan"]
      },
      "slgiao": {
        fieldType: "slgiao",
        inputClassName: ".slgiao-input",
        focusNext: true,
        validation: (item, newValue) => {
          if (newValue < item.sldat) {
            return "S\u1ED1 l\u01B0\u1EE3ng giao ph\u1EA3i l\u1EDBn h\u01A1n s\u1ED1 l\u01B0\u1EE3ng \u0111\u1EB7t";
          }
          return null;
        }
      },
      "slnhan": {
        fieldType: "slnhan",
        inputClassName: ".slnhan-input",
        focusNext: true,
        calculateFields: {
          "ttnhan": (item, newValue) => {
            return parseFloat((item.gianhap * parseFloat(newValue.toString())).toFixed(3)) || 0;
          }
        }
      },
      "gianhap": {
        fieldType: "gianhap",
        inputClassName: ".gianhap-input",
        focusNext: true,
        calculateFields: {
          "ttnhan": (item, newValue) => {
            return parseFloat((parseFloat(newValue.toString()) * item.slnhan).toFixed(3)) || 0;
          }
        }
      },
      "ghichu": {
        fieldType: "ghichu",
        inputClassName: ".ghichu-input",
        focusNext: true
      }
    },
    // DetailPhieugiaohang mappings
    "phieugiaohang": {
      "sldat": {
        fieldType: "sldat",
        inputClassName: ".sldat-input",
        focusNext: true,
        syncFields: ["slgiao", "slnhan"],
        calculateFields: {
          "ttgiao": (item, newValue) => {
            return Number(newValue) * (item.giaban || 0);
          }
        }
      },
      "slgiao": {
        fieldType: "slgiao",
        inputClassName: ".slgiao-input",
        focusNext: true,
        syncFields: ["slnhan"],
        calculateFields: {
          "ttgiao": (item, newValue) => {
            return Number(newValue) * (item.giaban || 0);
          }
        }
      },
      "slnhan": {
        fieldType: "slnhan",
        inputClassName: ".slnhan-input",
        focusNext: true
      },
      "giaban": {
        fieldType: "giaban",
        inputClassName: ".giaban-input",
        focusNext: true,
        calculateFields: {
          "ttgiao": (item, newValue) => {
            return (item.slgiao || 0) * Number(newValue);
          }
        }
      },
      "ghichu": {
        fieldType: "ghichu",
        inputClassName: ".ghichu-input",
        focusNext: true
      }
    }
  };
  constructor(snackBar) {
    this.snackBar = snackBar;
  }
  /**
   * Parse decimal value with support for thousands separators and both comma/dot decimals
   */
  parseDecimalValue(value) {
    if (!value && value !== 0)
      return 0;
    let str = value.toString().trim();
    const isNegative = str.startsWith("-");
    if (isNegative) {
      str = str.substring(1);
    }
    str = str.replace(/[^\d.,]/g, "");
    if (!str)
      return 0;
    const hasComma = str.includes(",");
    const hasDot = str.includes(".");
    if (hasComma && hasDot) {
      const lastComma = str.lastIndexOf(",");
      const lastDot = str.lastIndexOf(".");
      if (lastDot > lastComma) {
        str = str.replace(/,/g, "");
      } else {
        str = str.replace(/\./g, "").replace(/,/g, ".");
      }
    } else if (hasComma) {
      const commaCount = (str.match(/,/g) || []).length;
      if (commaCount > 1) {
        str = str.replace(/,/g, "");
      } else {
        const parts = str.split(",");
        if (parts[1] && parts[1].length === 3) {
          str = str.replace(/,/g, "");
        } else {
          str = str.replace(/,/g, ".");
        }
      }
    } else if (hasDot) {
      const dotCount = (str.match(/\./g) || []).length;
      if (dotCount > 1) {
        str = str.replace(/\./g, "");
      } else {
        const parts = str.split(".");
        if (parts[1] && parts[1].length === 3) {
          str = str.replace(/\./g, "");
        }
      }
    }
    const parsed = parseFloat(str);
    const finalValue = isNaN(parsed) ? 0 : parsed;
    return isNegative ? -finalValue : finalValue;
  }
  /**
   * Handle keyboard events for number inputs
   */
  handleKeyboardEvent(event, type) {
    if (event.key === "Enter" && !event.shiftKey) {
      event.preventDefault();
      return true;
    }
    if (type === "number") {
      const allowedKeys = [
        "Backspace",
        "Delete",
        "ArrowLeft",
        "ArrowRight",
        "Tab",
        "Enter",
        "0",
        "1",
        "2",
        "3",
        "4",
        "5",
        "6",
        "7",
        "8",
        "9",
        ".",
        ",",
        "Home",
        "End",
        "PageUp",
        "PageDown"
      ];
      const currentText = event.target.innerText.trim();
      const isDecimalSeparator = event.key === "." || event.key === ",";
      const hasDecimalSeparator = currentText.includes(".") || currentText.includes(",");
      const isDigit = /^[0-9]$/.test(event.key);
      const isNumpadDigit = event.code && event.code.startsWith("Numpad") && /Numpad[0-9]/.test(event.code);
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
  focusNextInput(inputClassName, currentIndex, totalLength) {
    if (currentIndex < totalLength - 1) {
      const inputs = document.querySelectorAll(inputClassName);
      const nextInput = inputs[currentIndex + 1];
      if (nextInput) {
        if (nextInput instanceof HTMLInputElement) {
          nextInput.focus();
          setTimeout(() => {
            nextInput.select();
          }, 10);
        } else {
          nextInput.focus();
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
  onInputFocus(event) {
    const target = event.target;
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
  updateValue(event, componentType, index, element, field, type, dataArray, updateFn, totalLength) {
    const target = event.target;
    let newValue;
    const rawValue = target instanceof HTMLInputElement ? target.value : target.innerText;
    if (type === "number") {
      newValue = this.parseDecimalValue(rawValue.trim());
    } else {
      newValue = rawValue.trim();
    }
    const keyboardEvent = event;
    this.handleKeyboardEvent(keyboardEvent, type);
    const fieldConfig = this.fieldMappings[componentType]?.[field];
    if (!fieldConfig) {
      this.updateSimpleField(index, element, field, newValue, dataArray, updateFn);
      return;
    }
    if (fieldConfig.validation && index !== null) {
      const currentItem = this.findItemInArray(element, dataArray);
      const validationError = fieldConfig.validation(currentItem, newValue);
      if (validationError) {
        this.snackBar.open(validationError, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        if (field === "slgiao") {
          newValue = currentItem?.sldat || 0;
        }
      }
    }
    this.updateFieldWithConfig(index, element, field, newValue, fieldConfig, dataArray, updateFn);
    if (fieldConfig.focusNext && index !== null) {
      this.focusNextInput(fieldConfig.inputClassName, index, totalLength);
    }
  }
  /**
   * Main update value method for blur events
   */
  updateBlurValue(event, componentType, index, element, field, type, dataArray, updateFn) {
    const target = event.target;
    let newValue;
    const rawValue = target instanceof HTMLInputElement ? target.value : target.innerText;
    if (type === "number") {
      newValue = this.parseDecimalValue(rawValue.trim());
    } else {
      newValue = rawValue.trim();
    }
    const fieldConfig = this.fieldMappings[componentType]?.[field];
    if (!fieldConfig) {
      this.updateSimpleField(index, element, field, newValue, dataArray, updateFn);
      return;
    }
    if (fieldConfig.validation && index !== null) {
      const currentItem = this.findItemInArray(element, dataArray);
      const validationError = fieldConfig.validation(currentItem, newValue);
      if (validationError) {
        this.snackBar.open(validationError, "", {
          duration: 1e3,
          horizontalPosition: "end",
          verticalPosition: "top",
          panelClass: ["snackbar-error"]
        });
        if (field === "slgiao") {
          newValue = currentItem?.sldat || 0;
        }
      }
    }
    this.updateFieldWithConfig(index, element, field, newValue, fieldConfig, dataArray, updateFn);
  }
  /**
   * Find item in array by element id or reference
   */
  findItemInArray(element, dataArray) {
    if (element?.id) {
      return dataArray.find((item) => item.id === element.id);
    }
    return element;
  }
  /**
   * Update field with configuration
   */
  updateFieldWithConfig(index, element, field, newValue, config, dataArray, updateFn) {
    if (index !== null) {
      const itemIndex = dataArray.findIndex((item) => item.id === element.id);
      if (itemIndex === -1)
        return;
      updateFn((v) => {
        v.sanpham[itemIndex][field] = newValue;
        if (config.syncFields) {
          config.syncFields.forEach((syncField) => {
            v.sanpham[itemIndex][syncField] = newValue;
          });
        }
        if (config.calculateFields) {
          Object.entries(config.calculateFields).forEach(([calcField, calcFn]) => {
            v.sanpham[itemIndex][calcField] = calcFn(v.sanpham[itemIndex], newValue);
          });
        }
        return v;
      });
    } else {
      updateFn((v) => {
        v[field] = newValue;
        return v;
      });
    }
  }
  /**
   * Simple field update for unknown fields
   */
  updateSimpleField(index, element, field, newValue, dataArray, updateFn) {
    if (index !== null) {
      const itemIndex = dataArray.findIndex((item) => item.id === element.id);
      if (itemIndex === -1)
        return;
      updateFn((v) => {
        v.sanpham[itemIndex][field] = newValue;
        return v;
      });
    } else {
      updateFn((v) => {
        v[field] = newValue;
        return v;
      });
    }
  }
  static \u0275fac = function SharedInputService_Factory(__ngFactoryType__) {
    return new (__ngFactoryType__ || _SharedInputService)(\u0275\u0275inject(MatSnackBar));
  };
  static \u0275prov = /* @__PURE__ */ \u0275\u0275defineInjectable({ token: _SharedInputService, factory: _SharedInputService.\u0275fac, providedIn: "root" });
};

export {
  SharedInputService
};
//# sourceMappingURL=chunk-N5GQI7YR.js.map
