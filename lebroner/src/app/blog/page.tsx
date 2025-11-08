import styles from "./blog.module.css";

export const BlogPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Blog</h1>
      <p>Posts will appear here.</p>
    </div>
  );
};

export default BlogPage;
