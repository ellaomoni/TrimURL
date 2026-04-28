"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.createLinkSchema = void 0;
const zod_1 = require("zod");
exports.createLinkSchema = zod_1.z.object({
    longUrl: zod_1.z.string().url("Please provide a valid URL"),
    customAlias: zod_1.z
        .string()
        .min(3, "Custom alias must be at least 3 characters")
        .max(30, "Custom alias cannot be more than 30 characters")
        .regex(/^[a-zA-Z0-9_-]+$/, "Custom alias can only contain letters, numbers, hyphens, and underscores")
        .optional(),
    expiresAt: zod_1.z
        .string()
        .datetime("expiresAt must be a valid ISO datetime string")
        .optional(),
});
//# sourceMappingURL=links.validation.js.map