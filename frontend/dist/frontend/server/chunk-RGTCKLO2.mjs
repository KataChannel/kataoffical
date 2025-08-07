import './polyfills.server.mjs';

// src/app/shared/utils/texttransfer.utils.ts
function removeVietnameseAccents(text) {
  if (!text) {
    return "";
  }
  return text.replace(/đ/g, "d").normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[^a-zA-Z0-9]/g, "").toLowerCase();
}

export {
  removeVietnameseAccents
};
//# sourceMappingURL=chunk-RGTCKLO2.mjs.map
