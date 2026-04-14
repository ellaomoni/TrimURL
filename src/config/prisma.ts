import { PrismaPg } from "@prisma/adapter-pg";
import { PrismaClient } from "@prisma/client";
import { env } from "./env";

declare global {
  // Reuse the Prisma client in development to avoid exhausting DB connections on reloads.
  var prisma: PrismaClient | undefined;
}

const connectionString = env.DATABASE_URL;

if (!connectionString) {
  throw new Error("DATABASE_URL is not set.");
}

const adapter = new PrismaPg({ connectionString });

export const prisma =
  globalThis.prisma ??
  new PrismaClient({
    adapter,
  });

if (env.NODE_ENV !== "production") {
  globalThis.prisma = prisma;
}
