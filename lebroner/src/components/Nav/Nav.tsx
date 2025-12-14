import Link from "next/link";
import styles from "./Nav.module.css";
import { ROUTES } from "@/constants/routes";
import { auth } from "@/auth";
import { logout } from "@/actions/auth-actions";
import Image from "next/image";
import logo from "../../assets/logo.png";

const Nav = async () => {
  const session = await auth();
  const isAdmin = (session?.user as any)?.role === "admin";

  return (
    <header className={styles.nav}>
      <Link className={`${styles.link} ${styles.logoLink}`} href={ROUTES.HOME}>
        <div className={styles.logoContainer}>
            <Image src={logo} alt="LeBroner Logo" fill style={{ objectFit: "cover" }} />
        </div>
        LeBroner
      </Link>
      <div className={styles.navLinks}>
        <Link className={styles.link} href={ROUTES.BLOG}>
            Blog
        </Link>
        <Link className={styles.link} href={ROUTES.ABOUT}>
            About
        </Link>
        <Link className={styles.link} href={ROUTES.HIGHLIGHT}>
            Highlight
        </Link>
      </div>
      
      <div className={styles.authContainer}>
        {session ? (
            <>
                {isAdmin && <span className={styles.adminBadge}>ADMIN</span>}
                <form action={logout}>
                    <button type="submit" className={`${styles.link} ${styles.logoutBtn}`}>
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
