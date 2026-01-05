"use client";

import Link from "next/link";
import styles from "./home.module.css";
import { useHighlights, usePosts } from "@/hooks/use-queries";
import { ROUTES } from "@/constants/routes";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import lebronImg from "../assets/lebron.jpg";
import HighlightCard from "@/components/HighlightCard/HighlightCard";

export default function HomePage() {
  const { posts, isLoading: postsLoading } = usePosts();
  const latestPosts = posts?.slice(0, 9) || [];

  const { highlights, isLoading: highlightsLoading } = useHighlights();
  const latestHighlights = highlights?.slice(0, 9) || [];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <h1 className={styles.title}>LeBron James Fan Club</h1>
        <p className={styles.subtitle}>
          Celebrating the career and legacy of the King. From Akron to LA, witness greatness.
        </p>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About The King</h2>
          <Link href={ROUTES.ABOUT} className={styles.viewAllBtn}>
            Read More
          </Link>
        </div>
        <div className={styles.about}>
          <div className={styles.aboutContent}>
            <p className={`${styles.cardText} ${styles.aboutText}`}>
              LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers.
              Widely considered one of the greatest players in NBA history, James is frequently compared to Michael Jordan
              in debates over the greatest basketball player of all time. He has won four NBA championships, four NBA MVP awards,
              four NBA Finals MVP awards, and two Olympic gold medals.
            </p>
          </div>
          <div className={styles.aboutImage}>
             <div className={styles.aboutImageContainer}>
                <Image 
                  src={lebronImg} 
                  alt="LeBron James" 
                  fill 
                  style={{ objectFit: "contain", background: "#000" }} 
                />
             </div>
          </div>
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
          
             <div style={{ paddingTop: '2rem' }}>
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
            <div style={{ paddingTop: '2rem' }}>
            <Carousel>
            {latestHighlights.map((h) => (
                <div key={h.id} style={{ height: '450px' }}>
                    <HighlightCard highlight={h} />
                </div>
            ))}
            </Carousel>
           </div>
        ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>No highlights yet.</p>
        )}
      </section>
    </div>
  );
}
