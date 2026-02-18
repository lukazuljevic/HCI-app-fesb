import styles from "./about.module.css";
import Image from "next/image";
import lebronImg from "../../assets/lebron.jpg";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <section className={styles.intro}>
        <div className={styles.introText}>
          <h1 className={styles.title}>The King&apos;s Legacy</h1>
          <p className={styles.paragraph}>
            Born on December 30, 1984, in Akron, Ohio, LeBron Raymone James was destined for greatness.
            Raised by his mother Gloria in challenging circumstances, he found salvation on the basketball
            court — and the court found its future king.
          </p>
          <p className={styles.paragraph}>
            Straight out of St. Vincent–St. Mary High School, LeBron was the #1 overall pick in the
            2003 NBA Draft. What followed was not just a career, but a two-decade redefinition of what
            one player can mean to a sport. From Cleveland to Miami, back to Cleveland, and finally
            Los Angeles — every chapter added to a story without parallel.
          </p>
          <p className={styles.paragraph}>
            Beyond the court, LeBron built the I PROMISE School in Akron, launched the LeBron James
            Family Foundation, and became a voice for social justice. He proved that true greatness
            isn&apos;t measured only in points and championships — it&apos;s measured in lives changed.
          </p>
        </div>
        <div className={styles.introImageWrapper}>
          <Image
            src={lebronImg}
            alt="LeBron James flexing"
            fill
            className={styles.introImage}
          />
        </div>
      </section>

      <section className={styles.statsSection}>
        <h2 className={styles.statsHeader}>Career Highlights</h2>
        <div className={styles.statsGrid}>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>40K+</h3>
            <p className={styles.statLabel}>Career Points</p>
            <p className={styles.statSub}>NBA All-Time Leading Scorer</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>4</h3>
            <p className={styles.statLabel}>NBA Championships</p>
            <p className={styles.statSub}>2012, 2013, 2016, 2020</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>4</h3>
            <p className={styles.statLabel}>MVP Awards</p>
            <p className={styles.statSub}>& 4 Finals MVPs</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>20</h3>
            <p className={styles.statLabel}>All-Star Selections</p>
            <p className={styles.statSub}>Consistency Personified</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>10K/10K</h3>
            <p className={styles.statLabel}>Rebounds & Assists</p>
            <p className={styles.statSub}>Only Player in 10k/10k/10k Club</p>
          </div>
          <div className={styles.statCard}>
            <h3 className={styles.statNumber}>3</h3>
            <p className={styles.statLabel}>Olympic Gold Medals</p>
            <p className={styles.statSub}>Representing USA</p>
          </div>
        </div>
      </section>
    </div>
  );
}
