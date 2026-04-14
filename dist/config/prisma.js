"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.prisma = void 0;
const adapter_pg_1 = require("@prisma/adapter-pg");
const client_1 = require("@prisma/client");
const env_1 = require("./env");
const connectionString = env_1.env.DATABASE_URL;
if (!connectionString) {
    throw new Error("DATABASE_URL is not set.");
}
const adapter = new adapter_pg_1.PrismaPg({ connectionString });
exports.prisma = globalThis.prisma ??
    new client_1.PrismaClient({
        adapter,
    });
if (env_1.env.NODE_ENV !== "production") {
    globalThis.prisma = exports.prisma;
}
//# sourceMappingURL=prisma.js.map