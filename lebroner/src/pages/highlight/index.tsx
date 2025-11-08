import styles from "./highlight.module.css";
import Link from "next/link";

const Highlight: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Highlight</h1>
      <p>Select a subpage:</p>
      <ul>
        <li>
          <Link href="/highlight/club/manchester">Club: Manchester</Link>
        </li>
        <li>
          <Link href="/highlight/season/2024">Season: 2024</Link>
        </li>
      </ul>
      <p>
        <Link href="/">Home</Link>
      </p>
    </div>
  );
};

export default Highlight;
