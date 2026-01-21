import styles from "./BlogCard.module.css";
import { type Post } from "@/db/schema";
import { useDeletePost } from "@/hooks/use-mutations";

interface BlogCardProps {
  post: Post & { category?: string; author?: { name: string } };
  onClick?: () => void;
  isAdmin?: boolean;
}

export default function BlogCard({ post, onClick, isAdmin }: BlogCardProps) {
  const { trigger: deletePost, isMutating } = useDeletePost();

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
      {isAdmin && (
        <button 
            onClick={handleDelete}
            className={styles.deleteButton}
            title="Delete Post"
            disabled={isMutating}
        >
            {isMutating ? "..." : "×"}
        </button>
      )}
      <div className={styles.imageWrapper}>
        {post.imageUrl ? (
          <img src={post.imageUrl} alt={post.title} className={styles.image} />
        ) : (
           <div className={`${styles.image} ${styles.placeholderImage}`}>
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
