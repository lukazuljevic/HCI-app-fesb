import { getDrizzle } from "@/db/drizzle-client";
import { highlights } from "@/db/schema";
import { eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { auth } from "@/auth";

export async function DELETE(
  request: Request,
  { params }: { params: Promise<{ id: string }> }
) {
  try {
    const session = await auth();
    if (!session || session.user?.role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const { id } = await params;
    const db = await getDrizzle();
    const deletedHighlight = await db
      .delete(highlights)
      .where(eq(highlights.id, id))
      .returning();

    if (deletedHighlight.length === 0) {
      return NextResponse.json({ error: "Highlight not found" }, { status: 404 });
    }

    return NextResponse.json(deletedHighlight[0]);
  } catch (error) {
    return NextResponse.json({ error: "Failed to delete highlight" }, { status: 500 });
  }
}
