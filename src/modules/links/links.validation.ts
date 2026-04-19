import { z } from "zod";

export const createLinkSchema = z.object({
  longUrl: z.string().url("Please provide a valid URL"),
  customAlias: z
    .string()
    .min(3, "Custom alias must be at least 3 characters")
    .max(30, "Custom alias cannot be more than 30 characters")
    .regex(
      /^[a-zA-Z0-9_-]+$/,
      "Custom alias can only contain letters, numbers, hyphens, and underscores"
    )
    .optional(),
  expiresAt: z
    .string()
    .datetime("expiresAt must be a valid ISO datetime string")
    .optional(),
}
);