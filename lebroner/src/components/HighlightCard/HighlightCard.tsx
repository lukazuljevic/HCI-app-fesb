import styles from "./HighlightCard.module.css";
import { type Highlight } from "@/db/schema";
import { useDeleteHighlight } from "@/hooks/use-mutations";

interface HighlightCardProps {
  highlight: Highlight;
  variant?: 'default' | 'home';
  isAdmin?: boolean;
}

export default function HighlightCard({ highlight, variant = 'default', isAdmin }: HighlightCardProps) {
  const { trigger: deleteHighlight, isMutating } = useDeleteHighlight();

  const handleDelete = async (e: React.MouseEvent) => {
    e.preventDefault(); 
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this highlight?")) return;

    try {
      await deleteHighlight(highlight.id);
    } catch (error) {
      console.error("Error deleting highlight:", error);
      alert("Error deleting highlight");
    }
  };

  return (
    <a 
      href={highlight.videoUrl} 
      target="_blank" 
      rel="noopener noreferrer" 
      className={`${styles.card} ${variant === 'home' ? styles.cardHome : ''}`}
    >

      {isAdmin && (
        <button 
            onClick={handleDelete}
            className={styles.deleteButton}
            title="Delete Highlight"
            disabled={isMutating}
        >
            {isMutating ? "..." : "×"}
        </button>
      )}
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
