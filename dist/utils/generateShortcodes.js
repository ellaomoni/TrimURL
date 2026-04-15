"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.generateShortCode = void 0;
const generateShortCode = (length = 6) => {
    const chars = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
    let result = "";
    for (let i = 0; i < length; i++) {
        const randomIndex = Math.floor(Math.random() * chars.length);
        result += chars[randomIndex];
    }
    return result;
};
exports.generateShortCode = generateShortCode;
//# sourceMappingURL=generateShortcodes.js.map