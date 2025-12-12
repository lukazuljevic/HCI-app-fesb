import type { Client } from "pg";

const cached: { client?: Client; drizzle?: unknown } = {};

export async function getDrizzle() {
  if (cached.drizzle) return cached.drizzle;

  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    throw new Error(
      "Missing DIRECT_URL / DATABASE_URL environment variable. Add it to .env.local"
    );
  }

  const [{ Client }] = await Promise.all([await import("pg")]);

  const { drizzle } = await import("drizzle-orm/node-postgres");
  if (!cached.client) {
    cached.client = new Client({ connectionString });
    await cached.client.connect();
  }

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  cached.drizzle = drizzle(cached.client as unknown as any);
  return cached.drizzle;
}

export async function getClient() {
  if (cached.client) return cached.client;
  await getDrizzle();
  return cached.client!;
}

export default getDrizzle;
