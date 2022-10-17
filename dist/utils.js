"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.isObject = void 0;
function isObject(obj) {
    const type = typeof obj;
    return type === 'function' || (type === 'object' && !!obj);
}
exports.isObject = isObject;
