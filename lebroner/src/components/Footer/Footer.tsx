import Link from "next/link";
import styles from "./Footer.module.css";

const Footer: React.FC = () => {
  const year = new Date().getFullYear();
  return (
    <footer className={styles.footer}>
      <div className={styles.brand}>Lebroner</div>
      <div className={styles.links}>
        <Link href="/about" className={styles.small}>
          About
        </Link>
        <Link href="/blog" className={styles.small}>
          Blog
        </Link>
        <span className={styles.small}>© {year}</span>
      </div>
    </footer>
  );
};

export default Footer;
