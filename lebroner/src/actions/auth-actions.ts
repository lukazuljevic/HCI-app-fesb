"use server";

import { signIn, signOut } from "@/auth";
import { getDrizzle } from "@/db/drizzle-client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

const registerSchema = z.object({
  name: z.string().min(1),
  email: z.string().email(),
  password: z.string().min(6),
  confirmPassword: z.string().min(6),
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords do not match",
  path: ["confirmPassword"],
});

export async function register(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    const validatedFields = registerSchema.safeParse(data);

    if (!validatedFields.success) {
      if (validatedFields.error.flatten().fieldErrors.confirmPassword) {
         return { success: false, message: "Passwords do not match." };
      }
      return { success: false, message: "Invalid fields. Please check your input." };
    }

    const { name, email, password } = validatedFields.data;

    const db = await getDrizzle();

    const existingUser = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .limit(1);

    if (existingUser.length > 0) {
      return { success: false, message: "Email already in use." };
    }

    const passwordHash = await bcrypt.hash(password, 10);

    await db.insert(users).values({
      name,
      email,
      passwordHash,
      role: "user",
    });

    return { success: true };

  } catch (error) {
    console.error("Registration error:", error);
    return { success: false, message: "Something went wrong. Please try again." };
  }
}

export async function authenticate(formData: FormData) {
  try {
    const data = Object.fromEntries(formData);
    await signIn("credentials", { ...data, redirectTo: "/" });
  } catch (error) {
    if ((error as any).message === "NEXT_REDIRECT" || (error as any).digest?.startsWith("NEXT_REDIRECT")) {
        throw error;
    }
    
    if ((error as Error).message.includes("CredentialsSignin") || (error as any).type === "CredentialsSignin") {
      return "CredentialSignin";
    }
    throw error;
  }
}

export async function logout() {
    await signOut({ redirectTo: "/" });
}
