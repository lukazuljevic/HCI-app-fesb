import type { Config } from "drizzle-kit";
import * as dotenv from "dotenv";

dotenv.config({ path: ".env.local" });

if (!process.env.DIRECT_URL && !process.env.DATABASE_URL) {
  throw new Error("DATABASE_URL or DIRECT_URL is missing");
}

export default {
  schema: "./src/db/schema.ts",
  out: "./src/db/migrations",
  dialect: "postgresql",
  dbCredentials: {
    url: (process.env.DIRECT_URL || process.env.DATABASE_URL)!,
  },
} satisfies Config;
