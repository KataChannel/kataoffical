"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.convertXuatnhapton = void 0;
function convertXuatnhapton(data) {
    const warehouse = new Map();
    console.log(data);
    data.forEach(({ khoname, type, sanpham }) => {
        const products = warehouse.get(khoname) || new Map();
        sanpham.forEach(({ id, title, soluong, chitiet }) => {
            const currentProduct = products.get(id) || { soluong: 0, slnhap: 0, slxuat: 0, title, chitiet: [] };
            if (type === "nhap") {
                currentProduct.slnhap += soluong;
                currentProduct.soluong += soluong;
            }
            else {
                currentProduct.slxuat += soluong;
                currentProduct.soluong -= soluong;
            }
            currentProduct.chitiet = sanpham.filter((detail) => detail.id === id);
            products.set(id, currentProduct);
        });
        warehouse.set(khoname, products);
    });
    const result = [];
    warehouse.forEach((products, khoname) => {
        products.forEach(({ soluong, slnhap, slxuat, title, chitiet }, id) => {
            result.push({ id, khoname, title, slxuat, slnhap, soluong, chitiet });
        });
    });
    return result;
}
exports.convertXuatnhapton = convertXuatnhapton;
//# sourceMappingURL=xuatnhapton.utils.js.map