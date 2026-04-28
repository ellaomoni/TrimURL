"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.env = void 0;
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
//Rejects missing required environment variables and validates JWT_SECRET format
const requiredEnvVars = ["DATABASE_URL", "JWT_SECRET"];
for (const key of requiredEnvVars) {
    if (!process.env[key]) {
        throw new Error(`Missing required environment variable: ${key}`);
    }
}
const jwtSecret = process.env.JWT_SECRET ?? "";
if (!/^[a-fA-F0-9]{64}$/.test(jwtSecret)) {
    throw new Error("JWT_SECRET must be exactly 64 hexadecimal characters (32 random bytes encoded as hex).");
}
exports.env = {
    PORT: Number(process.env.PORT) || 3000,
    DATABASE_URL: process.env.DATABASE_URL || "",
    NODE_ENV: process.env.NODE_ENV ?? "development",
    JWT_SECRET: jwtSecret,
    APP_BASE_URL: process.env.APP_BASE_URL || "http://localhost:5000",
    CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:5173",
};
//# sourceMappingURL=env.js.map