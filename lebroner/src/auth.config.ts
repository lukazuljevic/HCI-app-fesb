import type { NextAuthConfig } from "next-auth";

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




      return true; 
    }
  },
  providers: [],
  session: {
    strategy: "jwt",
  },
} satisfies NextAuthConfig;
