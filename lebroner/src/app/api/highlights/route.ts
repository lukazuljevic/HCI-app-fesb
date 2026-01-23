import { getDrizzle } from "@/db/drizzle-client";
import { highlights } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const db = await getDrizzle();
    const allHighlights = await db
      .select()
      .from(highlights)
      .orderBy(desc(highlights.createdAt));
    return NextResponse.json(allHighlights);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch highlights" }, { status: 500 });
  }
}