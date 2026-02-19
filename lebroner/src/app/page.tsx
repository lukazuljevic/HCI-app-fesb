"use client";

import Link from "next/link";
import styles from "./home.module.css";
import { useHighlights, usePosts } from "@/hooks/use-queries";
import { ROUTES } from "@/constants/routes";
import Carousel from "@/components/Carousel/Carousel";
import Image from "next/image";
import heroImg from "../assets/lebron_dunking.webp";
import HighlightCard from "@/components/HighlightCard/HighlightCard";
import { useState } from "react";

function PostCard({ p, authorName }: { p: { id: string; imageUrl: string | null; title: string; content: string }; authorName: string }) {
  const [imgError, setImgError] = useState(false);

  return (
    <div className={styles.card}>
      <div className={styles.cardImageWrapper}>
        {p.imageUrl && !imgError ? (
          <img
            src={p.imageUrl}
            alt={p.title}
            className={styles.cardImage}
            onError={() => setImgError(true)}
          />
        ) : (
          <div className={styles.cardPlaceholder}>
            <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <rect x="2" y="3" width="20" height="18" rx="2" stroke="#555" strokeWidth="1.5"/>
              <circle cx="8.5" cy="8.5" r="2" stroke="#555" strokeWidth="1.5"/>
              <path d="M2 17l5-5 3 3 4-4 8 8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
            </svg>
          </div>
        )}
      </div>
      <div className={styles.cardContent}>
        <h3 className={styles.cardTitle}>{p.title}</h3>
        <p className={styles.cardText}>
          {p.content.substring(0, 100)}...
        </p>
        <span className={styles.cardAuthor}>
          By {authorName}
        </span>
      </div>
    </div>
  );
}

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
              {latestPosts.map((postWrapper) => (
                <div key={postWrapper.post.id} className={styles.blogWrapper}>
                  <PostCard
                    p={postWrapper.post}
                    authorName={postWrapper.author?.name || 'Unknown'}
                  />
                </div>
              ))}
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
