import type { NextAuthConfig } from "next-auth";

// Define the shape of our user role
declare module "next-auth" {
    interface User {
        role?: "admin" | "user";
    }
    interface Session {
        user: {
            role?: "admin" | "user";
        } & import("next-auth").DefaultSession["user"];
    }
}

declare module "@auth/core/jwt" {
    interface JWT {
        role?: "admin" | "user";
        id?: string;
    }
}

export const authConfig = {
  // Explicitly set secret for middleware/edge compatibility
  secret: process.env.AUTH_SECRET,
  pages: {
    signIn: "/login",
  },
  callbacks: {
    jwt({ token, user }) {
      if (user) {
        token.role = user.role;
        token.id = user.id;
      }
      return token;
    },
    session({ session, token }) {
      if (session.user) {
        session.user.role = token.role;
        (session.user as any).id = token.id;
      }
      return session;
    },
    authorized({ auth, request: { nextUrl } }) {
      // Logic from middleware could move here, but we are keeping custom middleware
      // so just return true to let middleware handle redirect logic if preferred,
      // or implement basic protection here.
      // For now, let middleware handle it manually.
      return true; 
    }
  },
  providers: [], // Providers added in auth.ts
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
