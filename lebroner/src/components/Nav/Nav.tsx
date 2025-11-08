import Link from "next/link";
import styles from "./Nav.module.css";
import { ROUTES } from "@/constants/routes";

const Nav: React.FC = () => {
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
    </header>
  );
};

export default Nav;
