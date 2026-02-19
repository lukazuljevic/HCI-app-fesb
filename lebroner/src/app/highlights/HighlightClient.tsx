"use client";

import styles from "./highlight.module.css";
import { useHighlights } from "@/hooks/use-queries";
import Carousel from "@/components/Carousel/Carousel";
import HighlightCard from "@/components/HighlightCard/HighlightCard";
import { useState, useMemo, useEffect } from "react";

interface HighlightClientProps {
  isAdmin: boolean;
}

export default function HighlightClient({ isAdmin }: HighlightClientProps) {
  const { highlights, isLoading } = useHighlights();
  
  const currentYear = new Date().getFullYear().toString();
  const [selectedYear, setSelectedYear] = useState<string>(currentYear);
  const [selectedTeam, setSelectedTeam] = useState<string>("Lakers");

  const years = useMemo(() => {
    if (!highlights || highlights.length === 0) return [currentYear];
    const uniqueYears = Array.from(new Set(highlights.map(h => h.year)));
    return uniqueYears.sort((a, b) => b.localeCompare(a));
  }, [highlights, currentYear]);

  const teams = useMemo(() => {
    if (!highlights || highlights.length === 0) return ["Lakers"];
    const uniqueTeams = Array.from(new Set(highlights.map(h => h.team)));
    return uniqueTeams.sort();
  }, [highlights]);

  useEffect(() => {
    if (highlights && highlights.length > 0) {
      if (years.length > 0 && !years.includes(selectedYear)) {
         setSelectedYear(years[0]);
      }
      else if(years.length > 0 && selectedYear === currentYear && !highlights.some(h => h.year === currentYear)){
         setSelectedYear(years[0]);
      }
    }
  }, [years, highlights, selectedYear, currentYear]);

  useEffect(() => {
    if (highlights && highlights.length > 0) {
       if (teams.length > 0 && !teams.includes(selectedTeam)) {
         setSelectedTeam(teams[0]);
      }
    }
  }, [teams, highlights, selectedTeam]);

  const yearHighlights = highlights?.filter(h => h.year === selectedYear) || [];
  const teamHighlights = highlights?.filter(h => h.team === selectedTeam) || [];
  
  const allHighlights = highlights || [];

  return (
    <div className={styles.container}>
      <section className={styles.hero}>
        <div className={styles.heroContent}>
            <div className={styles.heroHeader}>
                <div>
                   <h1 className={styles.heroTitle}>Highlights</h1>
                </div>

            </div>
        </div>
      </section>

      <section className={styles.section}>
        <div className={styles.sectionHeader}>
            <h2 className={styles.sectionTitle}>All Time</h2>
            <div className={styles.filterBadge}>
                All Time
            </div>
        </div>
         {isLoading ? <p>Loading...</p> : (
            <Carousel>
                {allHighlights.length > 0 ? allHighlights.map(h => (
                    <HighlightCard key={h.id} highlight={h} isAdmin={isAdmin} />
                )) : [
                    <p key="no-data" className={styles.noData}>No highlights found.</p>
                ]}
            </Carousel>
        )}
      </section>

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
                    <HighlightCard key={h.id} highlight={h} isAdmin={isAdmin} />
                )) : [
                   <p key="no-data" className={styles.noData}>No highlights from {selectedYear} yet.</p>
                ]}
            </Carousel>
        )}
      </section>

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
                    <HighlightCard key={h.id} highlight={h} isAdmin={isAdmin} />
                )) : [
                    <p key="no-data" className={styles.noData}>No highlights for {selectedTeam} yet.</p>
                ]}
            </Carousel>
        )}
      </section>
    </div>
  );
};
