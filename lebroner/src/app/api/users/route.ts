import { getDrizzle } from "@/db/drizzle-client";
import { users } from "@/db/schema";
import { NextResponse } from "next/server";
import { z } from "zod";
import bcrypt from "bcryptjs";

const createUserSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
});

export async function GET() {
  try {
    const db = await getDrizzle();
    const allUsers = await db.select({
      id: users.id,
      name: users.name,
      email: users.email,
      role: users.role,
      createdAt: users.createdAt,
    }).from(users);
    return NextResponse.json(allUsers);
  } catch (error) {
    return NextResponse.json({ error: "Failed to fetch users" }, { status: 500 });
  }
}

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const validated = createUserSchema.parse(body);
    
    const hashedPassword = await bcrypt.hash(validated.password, 10);

    const db = await getDrizzle();
    const newUser = await db.insert(users).values({
      name: validated.name,
      email: validated.email,
      passwordHash: hashedPassword,
    }).returning();
    
    return NextResponse.json(newUser[0], { status: 201 });
  } catch (error) {
    if (error instanceof z.ZodError) {
      return NextResponse.json({ error: (error as any).errors }, { status: 400 });
    }
    return NextResponse.json({ error: "Failed to create user" }, { status: 500 });
  }
}
