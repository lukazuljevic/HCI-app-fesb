import { ROUTES } from "@/constants/routes";
import styles from "../home.module.css";
import Link from "next/link";

export const Home: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
      <p>Welcome to the site. Use the navigation to explore pages.</p>
      <nav className={styles.links}>
        <Link href={ROUTES.BLOG}>Blog</Link>
        <Link href={ROUTES.ABOUT}>About</Link>
        <Link href={ROUTES.HIGHLIGHT}>Highlight</Link>
      </nav>
    </div>
  );
};

export default Home;
