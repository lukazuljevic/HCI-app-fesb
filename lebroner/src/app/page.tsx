import styles from "./home.module.css";

export default function HomePage() {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Home</h1>
      <p>Welcome to Lebroner App</p>
    </div>
  );
}
