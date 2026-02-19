"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/actions/auth-actions";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useState } from "react";
import { usePathname } from "next/navigation";
import type { Session } from "next-auth";

interface NavClientProps {
  session: Session | null;
  isAdmin: boolean;
}

const NavClient = ({ session, isAdmin }: NavClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const pathname = usePathname();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const linkClass = (href: string) => {
    const isActive = pathname === href || (href !== "/" && pathname.startsWith(href));
    return `${styles.link} ${isActive ? styles.activeLink : ""}`;
  };

  return (
    <header className={styles.nav}>
      <div className={styles.navHeader}>
        <Link className={`${styles.link} ${styles.logoLink}`} href={ROUTES.HOME} onClick={() => setIsMenuOpen(false)}>
            <div className={styles.logoContainer}>
                <Image src={logo} alt="LeBroner Logo" fill className={styles.logoImage} />
            </div>
            LeBroner
        </Link>
        <button 
            className={`${styles.hamburger} ${isMenuOpen ? styles.open : ''}`} 
            onClick={toggleMenu}
            aria-label="Toggle menu"
        >
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
            <span className={styles.bar}></span>
        </button>
      </div>

      <nav className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link className={linkClass(ROUTES.BLOG)} href={ROUTES.BLOG} onClick={() => setIsMenuOpen(false)}>
            Blogs
        </Link>
        <Link className={linkClass(ROUTES.ABOUT)} href={ROUTES.ABOUT} onClick={() => setIsMenuOpen(false)}>
            About
        </Link>
        <Link className={linkClass(ROUTES.HIGHLIGHT)} href={ROUTES.HIGHLIGHT} onClick={() => setIsMenuOpen(false)}>
            Highlights
        </Link>
        

        <div className={styles.authContainerMobile}>
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
                 <Link className={`${styles.link} ${styles.ctaLink}`} href={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                    Post Blogs
                </Link>
            )}
        </div>
      </nav>


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
               <Link className={`${styles.link} ${styles.ctaLink}`} href={ROUTES.LOGIN} onClick={() => setIsMenuOpen(false)}>
                  Post Blogs
              </Link>
          )}
      </div>
    </header>
  );
};

export default NavClient;
