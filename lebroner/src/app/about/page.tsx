import styles from "./about.module.css";
import Image from "next/image";
import heroImg from "../../assets/lebron_dunking.webp";

export default function AboutPage() {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroImageContainer}>
            <Image 
                src={heroImg} 
                alt="" 
                fill 
                style={{ objectFit: "cover", filter: "blur(20px)", zIndex: 0 }} 
                aria-hidden="true"
            />
            <Image 
                src={heroImg} 
                alt="LeBron Dunking" 
                fill 
                style={{ objectFit: "contain", opacity: 0.8, zIndex: 1 }} 
            />
        </div>
        
        <div className={styles.content}>
          <h1 className={styles.title}>THE CHOSEN ONE</h1>
          <h2 className={styles.subtitle}>More Than An Athlete</h2>
          <p className={styles.description}>
            The NBA's All-Time Leading Scorer. A kid from Akron who became a King.
          </p>
        </div>
      </div>

      <div className={styles.statsSection}>
        <h2 className={styles.statsHeader}>CAREER MILESTONES</h2>
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
      </div>
    </div>
  );
}
