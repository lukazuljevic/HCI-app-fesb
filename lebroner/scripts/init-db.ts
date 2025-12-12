import fs from "fs";
import path from "path";
import { Client } from "pg";

async function main() {
  const connectionString = process.env.DIRECT_URL || process.env.DATABASE_URL;
  if (!connectionString) {
    console.error("Missing DIRECT_URL / DATABASE_URL environment variable.");
    process.exit(1);
  }

  const candidates = [
    path.resolve(process.cwd(), "src/db/migrations/001_init.sql"),
    path.resolve(process.cwd(), "migrations/001_init.sql"),
  ];

  let found: string | null = null;
  for (const c of candidates) {
    if (fs.existsSync(c)) {
      found = c;
      break;
    }
  }

  if (!found) {
    console.error("Migration file not found. Checked:", candidates.join(", "));
    process.exit(1);
  }

  const sql = fs.readFileSync(found, "utf8");
  const client = new Client({ connectionString });
  await client.connect();
  try {
    await client.query(sql);
    console.log("Migration applied");
  } finally {
    await client.end();
  }
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
