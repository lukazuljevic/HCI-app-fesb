import styles from "./BlogCard.module.css";
import { type Post } from "@/db/schema";

interface BlogCardProps {
  post: Post & { category?: string; author?: { name: string } };
  onClick?: () => void;
}

export default function BlogCard({ post, onClick }: BlogCardProps) {
  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      <div className={styles.imageWrapper}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className={styles.image} />
        ) : (
           <div className={styles.image} style={{ background: '#222', display: 'flex', alignItems: 'center', justifyContent: 'center', color: '#444' }}>
             No Image
           </div>
        )}
      </div>
      <div className={styles.content}>
        <span className={styles.category}>{post.category || "News"}</span>
        <h3 className={styles.title}>{post.title}</h3>
        <p className={styles.excerpt}>
          {post.content.length > 100
            ? post.content.substring(0, 100) + "..."
            : post.content}
        </p>
        <div className={styles.footer}>
          <span>{new Date(post.createdAt).toLocaleDateString()}</span>
          <span className={styles.readMore}>
            Read More <span>→</span>
          </span>
        </div>
      </div>
    </div>
  );
}
