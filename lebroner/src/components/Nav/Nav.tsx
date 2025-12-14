import Link from "next/link";
import styles from "./Nav.module.css";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/auth";
import { logout } from "@/actions/auth-actions";

// Make it async to use await auth()
const Nav = async () => {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <header className={styles.nav}>
      <Link className={styles.link} href={ROUTES.HOME}>
        Home
      </Link>
      <Link className={styles.link} href={ROUTES.BLOG}>
        Blog
      </Link>
      <Link className={styles.link} href={ROUTES.ABOUT}>
        About
      </Link>
      <Link className={styles.link} href={ROUTES.HIGHLIGHT}>
        Highlight
      </Link>
      
      <div style={{ marginLeft: "auto", display: "flex", gap: "1rem", alignItems: "center" }}>
        {session ? (
            <>
                {isAdmin && <span style={{ color: "#FDB927", fontSize: '0.8rem', border: '1px solid #FDB927', padding: '2px 8px', borderRadius: '4px' }}>ADMIN</span>}
                <form action={logout}>
                    <button type="submit" className={styles.link} style={{ background: 'transparent', border: 'none', cursor: 'pointer', fontFamily: 'inherit' }}>
                        Logout
                    </button>
                </form>
            </>
        ) : (
             <Link className={styles.link} href="/login">
                Login
            </Link>
        )}
      </div>
    </header>
  );
};

export default Nav;
