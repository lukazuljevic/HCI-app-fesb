import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import Credentials from "next-auth/providers/credentials";
import { getDrizzle } from "@/db/drizzle-client";
import { users } from "@/db/schema";
import { eq } from "drizzle-orm";
import bcrypt from "bcryptjs";
import { z } from "zod";

const loginSchema = z.object({
  email: z.string().email(),
  password: z.string().min(1),
});

export const { handlers, signIn, signOut, auth } = NextAuth({
  ...authConfig,
  providers: [
    Credentials({
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" },
      },
      authorize: async (credentials) => {
        try {
          const { email, password } = loginSchema.parse(credentials);

          const db = await getDrizzle();
          const userResult = await db
            .select()
            .from(users)
            .where(eq(users.email, email))
            .limit(1);

          if (userResult.length === 0) {
            return null;
          }

          const user = userResult[0];
          const passwordMatch = await bcrypt.compare(password, user.passwordHash);

          if (!passwordMatch) {
            return null;
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as "admin" | "user",
          };
        } catch (_error) {
          return null;
        }
      },
    }),
  ],
});
