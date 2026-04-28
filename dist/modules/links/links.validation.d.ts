import { z } from "zod";
export declare const createLinkSchema: z.ZodObject<{
    longUrl: z.ZodString;
    customAlias: z.ZodOptional<z.ZodString>;
    expiresAt: z.ZodOptional<z.ZodString>;
}, z.core.$strip>;
//# sourceMappingURL=links.validation.d.ts.map