"use client";

import Link from "next/link";
import styles from "./home.module.css";
import { useHighlights, usePosts } from "@/hooks/use-queries";
import { ROUTES } from "@/constants/routes";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import heroImg from "../assets/lebron_dunking.webp";
import HighlightCard from "@/components/HighlightCard/HighlightCard";

export default function HomePage() {
  const { posts, isLoading: postsLoading } = usePosts();
  const latestPosts = posts?.slice(0, 9) || [];

  const { highlights, isLoading: highlightsLoading } = useHighlights();
  const latestHighlights = highlights?.slice(0, 9) || [];

  return (
    <div className={styles.container}>

      <section className={styles.hero}>
        <Image
          src={heroImg}
          alt="LeBron James rising for a shot"
          fill
          priority
          className={styles.heroBgImage}
        />
        <div className={styles.heroOverlay}></div>
        <div className={styles.heroContent}>
          <h1 className={styles.heroHeadline}>
            Built Different.<br />
            <span className={styles.heroAccent}>Born to Reign.</span>
          </h1>
          <p className={styles.heroSubtext}>
            4 Rings. 4 MVPs. All-Time Scoring Leader. The kid from Akron who rewrote history.
          </p>
          <Link href={ROUTES.ABOUT} className={styles.heroCta}>
            His Legacy
          </Link>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <Link href={ROUTES.BLOG} className={styles.viewAllBtn}>
            View All Blogs
          </Link>
        </div>
        
        {postsLoading ? (
            <div className={styles.skeletonContainer}>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
            </div>
        ) : latestPosts.length > 0 ? (
          
             <div className={styles.carouselContainer}>
              <Carousel>
              {latestPosts.map((postWrapper) => {
                const p = postWrapper.post;
                return (
                  <div key={p.id} className={styles.card}>
                    {p.imageUrl ? (
                        <div className={styles.cardImageWrapper}>
                            <img src={p.imageUrl} alt={p.title} className={styles.cardImage} />
                        </div>
                    ) : (
                      <div className={styles.cardImage} />
                    )}
                    <div className={styles.cardContent}>
                      <h3 className={styles.cardTitle}>{p.title}</h3>
                      <p className={styles.cardText}>
                        {p.content.substring(0, 100)}...
                      </p>
                      <span className={styles.cardAuthor}>
                        By {postWrapper.author?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Carousel>
           </div>
        ) : ( 
            <p className={styles.emptyState}>No news yet. Stay tuned!</p>
        )}
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Highlights</h2>
          <Link href={ROUTES.HIGHLIGHT} className={styles.viewAllBtn}>
            Watch All
          </Link>
        </div>

         {highlightsLoading ? (
            <div className={styles.skeletonContainer}>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
                <div className={`${styles.card} ${styles.skeletonCard}`}></div>
            </div>
        ) : latestHighlights.length > 0 ? (
            <div className={styles.carouselContainer}>
            <Carousel>
            {latestHighlights.map((h) => (
                <div key={h.id} className={styles.highlightWrapper}>
                    <HighlightCard highlight={h} variant="home" />
                </div>
            ))}
            </Carousel>
           </div>
        ) : (
            <p className={styles.emptyState}>No highlights yet.</p>
        )}
      </section>
    </div>
  );
}
