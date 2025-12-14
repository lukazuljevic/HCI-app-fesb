"use client";

import Link from "next/link";
import styles from "./home.module.css";
import { useHighlights, usePosts } from "@/hooks/use-queries";
import { ROUTES } from "@/constants/routes";
import Carousel from "@/components/Carousel/Carousel";

export default function HomePage() {
  // Fetch up to 9 posts to allow scrolling
  const { posts, isLoading: postsLoading } = usePosts();
  const latestPosts = posts?.slice(0, 9) || [];

  // Fetch up to 9 highlights
  const { highlights, isLoading: highlightsLoading } = useHighlights();
  const latestHighlights = highlights?.slice(0, 9) || [];

  return (
    <div className={styles.container}>
      {/* Hero Section */}
      <section className={styles.hero}>
        <h1 className={styles.title}>LeBron James Fan Club</h1>
        <p className={styles.subtitle}>
          Celebrating the career and legacy of the King. From Akron to LA, witness greatness.
        </p>
      </section>

      {/* About Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>About The King</h2>
          <Link href={ROUTES.ABOUT} className={styles.viewAllBtn}>
            Read More
          </Link>
        </div>
        <div className={styles.about}>
          <div className={styles.aboutContent}>
            <p className={styles.cardText} style={{ fontSize: '1.1rem', color: '#ccc' }}>
              LeBron Raymone James Sr. is an American professional basketball player for the Los Angeles Lakers.
              Widely considered one of the greatest players in NBA history, James is frequently compared to Michael Jordan
              in debates over the greatest basketball player of all time. He has won four NBA championships, four NBA MVP awards,
              four NBA Finals MVP awards, and two Olympic gold medals.
            </p>
          </div>
          <div className={styles.aboutImage}>
             <img 
               src="https://upload.wikimedia.org/wikipedia/commons/c/cf/LeBron_James_crop_2020.jpg" 
               alt="LeBron James"
               style={{ width: '100%', height: 'auto', display: 'block' }}
             />
          </div>
        </div>
      </section>

      {/* Blogs Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Latest News</h2>
          <Link href={ROUTES.BLOG} className={styles.viewAllBtn}>
            View All Blogs
          </Link>
        </div>
        
        {postsLoading ? (
            <div style={{ display: 'flex', gap: 20, padding: '0 60px' }}>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
            </div>
        ) : latestPosts.length > 0 ? (
             <Carousel>
              {latestPosts.map((postWrapper) => {
                const p = postWrapper.post;
                return (
                  <div key={p.id} className={styles.card}>
                    {p.imageUrl ? (
                        <div style={{ height: 220, overflow: 'hidden' }}>
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
                      <span style={{ fontSize: '0.8rem', color: '#666', marginTop: 'auto' }}>
                        By {postWrapper.author?.name || 'Unknown'}
                      </span>
                    </div>
                  </div>
                );
              })}
            </Carousel>
        ) : ( 
            <p style={{ textAlign: 'center', color: '#666' }}>No news yet. Stay tuned!</p>
        )}
      </section>

      {/* Highlights Section */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
          <h2 className={styles.sectionTitle}>Highlights</h2>
          <Link href={ROUTES.HIGHLIGHT} className={styles.viewAllBtn}>
            Watch All
          </Link>
        </div>

         {highlightsLoading ? (
            <div style={{ display: 'flex', gap: 20, padding: '0 60px' }}>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
                <div className={styles.card} style={{ flex: 1, background: '#222' }}></div>
            </div>
        ) : latestHighlights.length > 0 ? (
            <Carousel>
            {latestHighlights.map((h) => (
                <div key={h.id} className={styles.card}>
                 <div className={styles.cardContent}>
                    <h3 className={styles.cardTitle}>{h.title}</h3>
                     {/* For now just showing a link/placeholder as actual video embedding depends on source */}
                    <div style={{ background: '#000', height: 200, display: 'flex', alignItems: 'center', justifyContent: 'center', color: 'white', borderRadius: 8 }}>
                        Video Placeholder
                    </div>
                 </div>
                </div>
            ))}
            </Carousel>
        ) : (
            <p style={{ textAlign: 'center', color: '#666' }}>No highlights yet.</p>
        )}
      </section>
    </div>
  );
}
