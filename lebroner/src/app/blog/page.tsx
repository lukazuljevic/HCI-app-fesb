import { auth } from "@/auth";
import BlogClient from "./BlogClient";

export default async function BlogPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return <BlogClient isAdmin={isAdmin} isLoggedIn={!!session?.user} />;
}
