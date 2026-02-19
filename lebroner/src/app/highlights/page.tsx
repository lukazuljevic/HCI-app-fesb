import { auth } from "@/auth";
import HighlightClient from "./HighlightClient";

export default async function HighlightPage() {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return <HighlightClient isAdmin={isAdmin} />;
}
