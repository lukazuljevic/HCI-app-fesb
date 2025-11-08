import { ROUTES } from "@/constants/routes";
import styles from "./about.module.css";
import Link from "next/link";

const About: React.FC = () => {
  return (
    <div className={styles.container}>
      <h1 className={styles.title}>About</h1>
      <p>This is the about page.</p>
      <p>
        <Link href={ROUTES.HOME}>Home</Link>
      </p>
    </div>
  );
};

export default About;
