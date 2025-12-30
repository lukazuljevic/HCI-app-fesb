"use client";

import styles from "./highlight.module.css";
import Link from "next/link";
import { useHighlights } from "@/hooks/use-queries";
import Carousel from "@/components/Carousel/Carousel";
import HighlightCard from "@/components/HighlightCard/HighlightCard";
import { useSession } from "next-auth/react";

export default function HighlightPage() {
  const { highlights, isLoading } = useHighlights();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const currentYear = new Date().getFullYear().toString();
  const featuredTeam = "Lakers";

  // Client-side filtering
  const yearHighlights = highlights?.filter(h => h.year === currentYear) || [];
  const teamHighlights = highlights?.filter(h => h.team === featuredTeam) || [];
  
  // For 'All Time', we might want to exclude current year if desired, but protype says "All time", so let's use all.
  const allHighlights = highlights || [];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
            <div style={{ display: "flex", justifyContent: "space-between", alignItems: "flex-start" }}>
                <div>
                   <h1 className={styles.heroTitle}>Witness History</h1>
                   <p className={styles.heroText}>
                        Relive the greatest moments of King James career. From high-flying dunks to game-winning buzzer beaters, catch every highlight in high definition.
                   </p>
                </div>
                {isAdmin && (
                    <Link href="/highlight/create" className={styles.addButton}>
                        + Add Highlight
                    </Link>
                )}
            </div>
        </div>
      </section>

      {/* Section 1: Per Year */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Per Year</h2>
            <div className={styles.filterBadge}>
                <span>☒</span> {currentYear}
            </div>
        </div>
        {isLoading ? <p>Loading...</p> : (
            <Carousel>
                {yearHighlights.length > 0 ? yearHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} />
                )) : [
                   <p key="no-data" style={{color: '#666', padding: '2rem'}}>No highlights from {currentYear} yet.</p>
                ]}
            </Carousel>
        )}
      </section>

       {/* Section 2: All Time */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>All Time</h2>
            <div className={styles.filterBadge}>
                <span>☒</span> All Time
            </div>
        </div>
         {isLoading ? <p>Loading...</p> : (
            <Carousel>
                {allHighlights.length > 0 ? allHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} />
                )) : [
                    <p key="no-data" style={{color: '#666', padding: '2rem'}}>No highlights found.</p>
                ]}
            </Carousel>
        )}
      </section>

       {/* Section 3: Per Team */}
       <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Per Team</h2>
            <div className={styles.filterBadge}>
                <span>☒</span> {featuredTeam}
            </div>
        </div>
         {isLoading ? <p>Loading...</p> : (
            <Carousel>
                 {teamHighlights.length > 0 ? teamHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} />
                )) : [
                    <p key="no-data" style={{color: '#666', padding: '2rem'}}>No highlights for {featuredTeam} yet.</p>
                ]}
            </Carousel>
        )}
      </section>
    </div>
  );
};
