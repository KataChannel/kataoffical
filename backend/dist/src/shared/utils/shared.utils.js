"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.nest_children = nest_children;
function nest_children(items, id = '', link = 'pid') {
    if (items) {
        return items.filter((item) => item[link] === id)
            .map((item) => ({
            ...item,
            children: nest_children(items, item.id),
        }));
    }
    ;
}
//# sourceMappingURL=shared.utils.js.map