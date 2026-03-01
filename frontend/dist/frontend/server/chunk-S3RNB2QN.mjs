import './polyfills.server.mjs';

// src/app/shared/utils/madonhang.utils.ts
function DonhangnumberToCode(number) {
  if (number < 1 || number > 676 * 99999) {
    throw new Error("S\u1ED1 th\u1EE9 t\u1EF1 kh\xF4ng h\u1EE3p l\u1EC7");
  }
  number -= 1;
  const letterValue = Math.floor(number / 99999);
  const numValue = number % 99999 + 1;
  const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
  const secondLetter = String.fromCharCode(65 + letterValue % 26);
  const numStr = numValue.toString().padStart(5, "0");
  return `TG-${firstLetter}${secondLetter}${numStr}`;
}
function DynamicnumberToCode(prefix, number, hasString) {
  if (number < 1 || number > 676 * 99999) {
    throw new Error("S\u1ED1 th\u1EE9 t\u1EF1 kh\xF4ng h\u1EE3p l\u1EC7");
  }
  number -= 1;
  if (hasString) {
    const letterValue = Math.floor(number / 99999);
    const numValue = number % 99999 + 1;
    const firstLetter = String.fromCharCode(65 + Math.floor(letterValue / 26));
    const secondLetter = String.fromCharCode(65 + letterValue % 26);
    const numStr = numValue.toString().padStart(5, "0");
    return `${prefix}-${firstLetter}${secondLetter}${numStr}`;
  } else {
    const numStr = (number + 1).toString().padStart(5, "0");
    return `${prefix}-${numStr}`;
  }
}

export {
  DonhangnumberToCode,
  DynamicnumberToCode
};
//# sourceMappingURL=chunk-S3RNB2QN.mjs.map
