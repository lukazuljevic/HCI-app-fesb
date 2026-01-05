"use client";

import styles from "./highlight.module.css";
import Link from "next/link";
import { useHighlights } from "@/hooks/use-queries";
import Carousel from "@/components/Carousel/Carousel";
import HighlightCard from "@/components/HighlightCard/HighlightCard";
import { useSession } from "next-auth/react";
import { useState, useMemo } from "react";

export default function HighlightPage() {
  const { highlights, isLoading } = useHighlights();
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";

  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedTeam, setSelectedTeam] = useState<string>("Lakers");

  // Calculate unique years and teams
  const years = useMemo(() => {
    if (!highlights) return [currentYear];
    const uniqueYears = Array.from(new Set(highlights.map(h => h.year)));
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [highlights, currentYear]);

  const teams = useMemo(() => {
    if (!highlights) return ["Lakers"];
    const uniqueTeams = Array.from(new Set(highlights.map(h => h.team)));
    return uniqueTeams.sort();
  }, [highlights]);

  // Client-side filtering
  const yearHighlights = highlights?.filter(h => h.year === selectedYear) || [];
  const teamHighlights = highlights?.filter(h => h.team === selectedTeam) || [];
  
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

      {/* Section 1: All Time */}
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

      {/* Section 2: Per Year */}
      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Per Year</h2>
            <div className={styles.filterContainer}>
                <select 
                    value={selectedYear} 
                    onChange={(e) => setSelectedYear(e.target.value)}
                    className={styles.filterSelect}
                >
                    {years.map(year => (
                        <option key={year} value={year}>{year}</option>
                    ))}
                </select>
            </div>
        </div>
        {isLoading ? <p>Loading...</p> : (
            <Carousel key={selectedYear}>
                {yearHighlights.length > 0 ? yearHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} />
                )) : [
                   <p key="no-data" style={{color: '#666', padding: '2rem'}}>No highlights from {selectedYear} yet.</p>
                ]}
            </Carousel>
        )}
      </section>

       {/* Section 3: Per Team */}
       <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>Per Team</h2>
             <div className={styles.filterContainer}>
                <select 
                    value={selectedTeam} 
                    onChange={(e) => setSelectedTeam(e.target.value)}
                    className={styles.filterSelect}
                >
                    {teams.map(team => (
                        <option key={team} value={team}>{team}</option>
                    ))}
                </select>
            </div>
        </div>
         {isLoading ? <p>Loading...</p> : (
            <Carousel key={selectedTeam}>
                 {teamHighlights.length > 0 ? teamHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} />
                )) : [
                    <p key="no-data" style={{color: '#666', padding: '2rem'}}>No highlights for {selectedTeam} yet.</p>
                ]}
            </Carousel>
        )}
      </section>
    </div>
  );
};
