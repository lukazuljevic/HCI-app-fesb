import type { Client } from "pg";
import { drizzle, type NodePgDatabase } from "drizzle-orm/node-postgres";
import * as schema from "./schema";

type DrizzleDB = NodePgDatabase<typeof schema>;

const cached: { client?: Client; drizzle?: DrizzleDB } = {};

export async function getDrizzle() {
  if (cached.drizzle) return cached.drizzle;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Missing DIRECT_URL / DATABASE_URL environment variable. Add it to .env.local"
    );
  }

  const [{ Client }] = await Promise.all([await import("pg")]);

  if (!cached.client) {
    cached.client = new Client({ connectionString });
    await cached.client.connect();
  }

  cached.drizzle = drizzle(cached.client, { schema });
  return cached.drizzle;
}

export async function getClient() {
  if (cached.client) return cached.client;
  await getDrizzle();
  return cached.client!;
}

export default getDrizzle;
