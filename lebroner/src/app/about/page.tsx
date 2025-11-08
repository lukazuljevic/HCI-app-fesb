import styles from "./about.module.css";

export const AboutPage = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p>This site was migrated to App Router.</p>
    </div>
  );
};

export default AboutPage;
