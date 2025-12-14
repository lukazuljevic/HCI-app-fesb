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
    const body = await request.json();
    const validated = createPostSchema.parse(body);
    const db = await getDrizzle();
    const newPost = await db.insert(posts).values(validated).returning();
    return NextResponse.json(newPost[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create post" }, { status: 500 });
  }
}
