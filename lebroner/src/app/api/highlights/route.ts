import { getDrizzle } from "@/db/drizzle-client";
import { highlights } from "@/db/schema";
import { desc } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createHighlightSchema = z.object({
  title: z.string().min(1),
  description: z.string().optional(),
  videoUrl: z.string().url(),
  imageUrl: z.string().optional(),
  team: z.enum(["Lakers", "Cavaliers", "Heat", "USA"]).default("Lakers"),
  year: z.string().min(4),
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

import { auth } from "@/auth";

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validated = createHighlightSchema.parse(body);

    const db = await getDrizzle();
    const newHighlight = await db
      .insert(highlights)
      .values(validated)
      .returning();

    return NextResponse.json(newHighlight[0], { status: 201 });
  } catch (error: any) {
    if (error?.errors) {
        return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Error creating highlight", error: error.message },
      { status: 500 }
    );
  }
}
