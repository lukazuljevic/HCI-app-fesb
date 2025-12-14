import styles from "./about.module.css";
import Image from "next/image";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        {/* Using a high quality placeholder */}
        <img 
          src="https://wallpapers.com/images/hd/lebron-james-lakers-dunk-4k-8a7c2x1y3z4b5d6e.jpg" 
          alt="LeBron James Background" 
          className={styles.bgImage}
        />
        
        <div className={styles.content}>
          <h1 className={styles.title}>THE CHOSEN ONE</h1>
          <h2 className={styles.subtitle}>More Than An Athlete</h2>
          <p className={styles.description}>
            From the courts of St. Vincent-St. Mary to the bright lights of the NBA, LeBron James has redefined greatness. 
            A 4-time NBA Champion, 4-time MVP, and the League's All-Time Leading Scorer. This platform is a tribute to his 
            enduring legacy and the impact he continues to have on and off the court.
          </p>
        </div>
      </div>
    </div>
  );
}
