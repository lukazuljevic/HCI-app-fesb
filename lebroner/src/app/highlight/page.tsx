import styles from "./highlight.module.css";
import Link from "next/link";

export const HighlightPage = () => (
  <div className={styles.container}>
    <h1 className={styles.title}>Highlight</h1>
    <p>
      <Link href="/highlight/club/manchester">CLICK - Club: Manchester</Link>
    </p>
    <p>
      <Link href="/highlight/season/2024">CLICK - Season: 2024</Link>
    </p>
  </div>
);

export default HighlightPage;
