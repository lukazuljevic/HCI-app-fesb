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


      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About The King</h2>
          <Link href={ROUTES.ABOUT} className={styles.viewAllBtn}>
            Read More
          </Link>
        </div>
        <div className={styles.about}>
          <Image 
            src={lebronImg} 
            alt="LeBron James Background" 
            fill 
            className={styles.aboutBgImage}
          />
          <div className={styles.aboutOverlay}></div>
          <div className={styles.aboutContent}>
            <p className={`${styles.cardText} ${styles.aboutText}`}>
              The kid from Akron who became a King. Redefining greatness for over two decades, LeBron James is more than an athlete—he’s a movement. With 4 rings, 4 MVPs, and the all-time scoring record, witness the journey of the Chosen One.
            </p>
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
