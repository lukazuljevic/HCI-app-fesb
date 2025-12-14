import { getDrizzle } from "@/db/drizzle-client";
import { highlights } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createHighlightSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().url(),
});

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

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createHighlightSchema.parse(body);
    const db = await getDrizzle();
    const newHighlight = await db.insert(highlights).values(validated).returning();
    return NextResponse.json(newHighlight[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create highlight" }, { status: 500 });
  }
}
