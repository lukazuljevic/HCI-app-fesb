import { auth } from "@/auth";
import NavClient from "./NavClient";

const Nav = async () => {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return <NavClient session={session} isAdmin={isAdmin} />;
};

export default Nav;
