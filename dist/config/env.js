"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const jwtSecret = process.env.JWT_SECRET ?? "";
if (!/^[a-fA-F0-9]{64}$/.test(jwtSecret)) {
    throw new Error("JWT_SECRET must be exactly 64 hexadecimal characters (32 random bytes encoded as hex).");
}
exports.env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    JWT_SECRET: jwtSecret,
};
//# sourceMappingURL=env.js.map