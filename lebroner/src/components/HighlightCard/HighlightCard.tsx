import styles from "./HighlightCard.module.css";
import { type Highlight } from "@/db/schema";

interface HighlightCardProps {
  highlight: Highlight;
  variant?: 'default' | 'home';
}

export default function HighlightCard({ highlight, variant = 'default' }: HighlightCardProps) {
  return (
    <a 
      href={highlight.videoUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${styles.card} ${variant === 'home' ? styles.cardHome : ''}`}
    >
      <div className={styles.imageWrapper}>
        {highlight.imageUrl ? (
          <img 
            src={highlight.imageUrl} 
            alt={highlight.title} 
            className={styles.image} 
          />
        ) : (
          <div className={styles.placeholderImage}>
            No Image
          </div>
        )}
      </div>
      <div className={styles.content}>
        <div className={styles.meta}>
            <span>{highlight.team}</span>
            <span>{highlight.year}</span>
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
    </a>
  );
}
