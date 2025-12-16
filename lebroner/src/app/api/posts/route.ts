import { getDrizzle } from "@/db/drizzle-client";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional(),
  category: z.enum(["News", "Game Recap", "Opinion", "Lifestyle"]).default("News"),
  authorId: z.string().uuid(),
});

import { auth } from "@/auth";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const category = searchParams.get("category");

    const db = await getDrizzle();
    let query = db
      .select({
        post: posts,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt))
      .$dynamic();

    if (category && category !== "All") {
        query = query.where(eq(posts.category, category as any));
    }

    const allPosts = await query;
      
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    if (!session || (session.user as any).role !== "admin") {
      return NextResponse.json({ message: "Forbidden" }, { status: 403 });
    }

    const body = await request.json();
    const validated = createPostSchema.parse(body);

    const db = await getDrizzle();
    const newPost = await db
      .insert(posts)
      .values({
        ...validated,
        authorId: session?.user?.id || (session?.user as any).id,
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error: any) {
    if (error?.errors) { 
        return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Error creating post", error: error.message },
      { status: 500 }
    );
  }
}
