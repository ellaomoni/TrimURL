import dotenv from "dotenv";
dotenv.config();

const jwtSecret = process.env.JWT_SECRET ?? "";

if (!/^[a-fA-F0-9]{64}$/.test(jwtSecret)) {
  throw new Error(
    "JWT_SECRET must be exactly 64 hexadecimal characters (32 random bytes encoded as hex)."
  );
}

export const env = {
  PORT: Number(process.env.PORT) || 3000,
  DATABASE_URL: process.env.DATABASE_URL || "",
  NODE_ENV: process.env.NODE_ENV ?? "development",
  JWT_SECRET: jwtSecret,
};
