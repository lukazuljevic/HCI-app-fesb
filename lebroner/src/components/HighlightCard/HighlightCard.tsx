import styles from "./HighlightCard.module.css";
import { type Highlight } from "@/db/schema";

interface HighlightCardProps {
  highlight: Highlight & { team?: string; year?: string };
}

export default function HighlightCard({ highlight }: HighlightCardProps) {
  return (
    <div className={styles.card}>
      <div className={styles.videoWrapper}>
        <video 
            src={highlight.videoUrl} 
            className={styles.video} 
            controls 
            preload="metadata"
        />
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
            <span>{highlight.team || "Lakers"}</span>
            <span>{highlight.year || "2024"}</span>
        </div>
        <h3 className={styles.title}>{highlight.title}</h3>
        {highlight.description && (
             <p className={styles.description}>
                {highlight.description.length > 80 
                    ? highlight.description.substring(0, 80) + "..." 
                    : highlight.description}
            </p>
        )}
      </div>
    </div>
  );
}
