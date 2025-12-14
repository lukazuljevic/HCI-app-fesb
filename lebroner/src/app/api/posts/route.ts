import { getDrizzle } from "@/db/drizzle-client";
import { posts, users } from "@/db/schema";
import { desc, eq } from "drizzle-orm";
import { NextResponse } from "next/server";
import { z } from "zod";

const createPostSchema = z.object({
  title: z.string().min(1),
  content: z.string().min(1),
  imageUrl: z.string().optional(),
  authorId: z.string().uuid(),
});

import { auth } from "@/auth";

export async function GET() {
  try {
    const db = await getDrizzle();
    const allPosts = await db
      .select({
        post: posts,
        author: {
          id: users.id,
          name: users.name,
        },
      })
      .from(posts)
      .leftJoin(users, eq(posts.authorId, users.id))
      .orderBy(desc(posts.createdAt));
      
    return NextResponse.json(allPosts);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const session = await auth();

    // Enforce Admin Role
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
        authorId: session?.user?.id || (session?.user as any).id, // Use authenticated user ID
      })
      .returning();

    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error: any) {
    if (error?.errors) { // Basic Zod check
        return NextResponse.json({ errors: error.errors }, { status: 400 });
    }
    return NextResponse.json(
      { message: "Error creating post", error: error.message },
      { status: 500 }
    );
  }
}
