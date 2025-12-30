"use client";

import Link from "next/link";
import styles from "./Nav.module.css";
import { ROUTES } from "@/constants/routes";
import { logout } from "@/actions/auth-actions";
import Image from "next/image";
import logo from "../../assets/logo.png";
import { useState } from "react";

interface NavClientProps {
  session: any; // Type accurately if possible, usually Session | null
  isAdmin: boolean;
}

const NavClient = ({ session, isAdmin }: NavClientProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <header className={styles.nav}>
      <div className={styles.navHeader}>
        <Link className={`${styles.link} ${styles.logoLink}`} href={ROUTES.HOME} onClick={() => setIsMenuOpen(false)}>
            <div className={styles.logoContainer}>
                <Image src={logo} alt="LeBroner Logo" fill style={{ objectFit: "cover" }} />
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

      <div className={`${styles.navLinks} ${isMenuOpen ? styles.showMenu : ''}`}>
        <Link className={styles.link} href={ROUTES.BLOG} onClick={() => setIsMenuOpen(false)}>
            Blog
        </Link>
        <Link className={styles.link} href={ROUTES.ABOUT} onClick={() => setIsMenuOpen(false)}>
            About
        </Link>
        <Link className={styles.link} href={ROUTES.HIGHLIGHT} onClick={() => setIsMenuOpen(false)}>
            Highlight
        </Link>
        
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
                 <Link className={styles.link} href="/login" onClick={() => setIsMenuOpen(false)}>
                    Login
                </Link>
            )}
        </div>
      </div>
    </header>
  );
};

export default NavClient;
