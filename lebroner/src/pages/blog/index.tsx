import { ROUTES } from "@/constants/routes";
import styles from "./blog.module.css";
import Link from "next/link";

const Blog: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog</h1>
      <p>Posts will appear here.</p>

      <p>
        <Link href={ROUTES.HOME}>Home</Link>
      </p>
    </div>
  );
};

export default Blog;
