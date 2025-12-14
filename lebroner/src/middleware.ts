import NextAuth from "next-auth";
import { authConfig } from "./auth.config";
import { NextResponse } from "next/server";

const { auth } = NextAuth(authConfig);

export default auth((req) => {
  const isLoggedIn = !!req.auth;
  const isApiAuthRoute = req.nextUrl.pathname.startsWith("/api/auth");
  
  if (req.method === "GET") {
    return NextResponse.next();
  }
  
  if (req.nextUrl.pathname === "/api/users" && req.method === "POST") {
     return NextResponse.next();
  }

  if (req.nextUrl.pathname === "/login" && req.method === "POST") {
     return NextResponse.next();
  }

  const isMutation = ["POST", "PUT", "DELETE", "PATCH"].includes(req.method);
  
  if (isMutation && !isLoggedIn && !isApiAuthRoute) {
    return NextResponse.json({ message: "Unauthorized" }, { status: 401 });
  }

  return NextResponse.next();
});

export const config = {
  matcher: ["/((?!_next/static|_next/image|favicon.ico).*)"],
};
