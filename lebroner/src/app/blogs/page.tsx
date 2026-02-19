import { auth } from "@/auth";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";
  const userId = (session?.user as any)?.id || null;

  return <BlogClient isAdmin={isAdmin} isLoggedIn={!!session?.user} userId={userId} />;
}
