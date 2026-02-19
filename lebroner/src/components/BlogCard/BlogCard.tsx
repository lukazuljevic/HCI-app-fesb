import { useState } from "react";
import styles from "./BlogCard.module.css";
import { type Post } from "@/db/schema";
import { useDeletePost } from "@/hooks/use-mutations";

interface BlogCardProps {
  post: Post & { category?: string; author?: { name: string } };
  onClick?: () => void;
  canModify?: boolean;
}

const PlaceholderImage = () => (
  <div className={`${styles.image} ${styles.placeholderImage}`}>
    <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
      <rect x="2" y="3" width="20" height="18" rx="2" stroke="#555" strokeWidth="1.5"/>
      <circle cx="8.5" cy="8.5" r="2" stroke="#555" strokeWidth="1.5"/>
      <path d="M2 17l5-5 3 3 4-4 8 8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
    </svg>
  </div>
);

export default function BlogCard({ post, onClick, canModify }: BlogCardProps) {
  const { trigger: deletePost, isMutating } = useDeletePost();
  const [imgError, setImgError] = useState(false);

  const handleDelete = async (e: React.MouseEvent) => {
    e.stopPropagation();
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(post.id);
    } catch (error) {
      console.error("Error deleting post:", error);
      alert("Error deleting post");
    }
  };

  return (
    <div className={styles.card} onClick={onClick} role="button" tabIndex={0}>
      {canModify && (
        <button
            onClick={handleDelete}
            className={styles.deleteButton}
            title="Delete Post"
            disabled={isMutating}
        >
            {isMutating ? "..." : (
              <svg width="12" height="12" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="3" strokeLinecap="round"/>
              </svg>
            )}
        </button>
      )}
      <div className={styles.imageWrapper}>
        {post.imageUrl && !imgError ? (
          <img
            src={post.imageUrl}
            alt={post.title}
            className={styles.image}
            onError={() => setImgError(true)}
          />
        ) : (
          <PlaceholderImage />
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
            Read More <span>&rarr;</span>
          </span>
        </div>
      </div>
    </div>
  );
}
