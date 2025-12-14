import React from "react";
import Link from "next/link";
import styles from "./Footer.module.css";
import { ROUTES } from "@/constants/routes";

const Footer: React.FC = () => {
  return (
    <footer className={styles.footer}>
      <div className={styles.content}>
        <div className={styles.brand}>
          <h3>LeBroner</h3>
          <p>
            The ultimate destination for fans of King James. Stats, highlights, and the legacy of the greatest of all time.
          </p>
        </div>
        
        <div className={styles.column}>
          <h4>Explore</h4>
          <div className={styles.links}>
            <Link href={ROUTES.HOME} className={styles.link}>Home</Link>
            <Link href={ROUTES.BLOG} className={styles.link}>Blog</Link>
            <Link href={ROUTES.HIGHLIGHT} className={styles.link}>Highlights</Link>
            <Link href={ROUTES.ABOUT} className={styles.link}>About</Link>
          </div>
        </div>

        <div className={styles.column}>
          <h4>Connect</h4>
          <div className={styles.links}>
            <a href="#" className={styles.link}>Twitter</a>
            <a href="#" className={styles.link}>Instagram</a>
            <a href="#" className={styles.link}>YouTube</a>
          </div>
        </div>
      </div>
      
      <div className={styles.bottom}>
        &copy; {new Date().getFullYear()} Lebroner Fan Club
      </div>
    </footer>
  );
};

export default Footer;
