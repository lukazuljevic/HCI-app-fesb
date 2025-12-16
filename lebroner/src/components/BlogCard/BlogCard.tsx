import Link from "next/link";
import styles from "./BlogCard.module.css";
import { type Post } from "@/db/schema";

interface BlogCardProps {
  post: Post & { category?: string; author?: { name: string } };
}

export default function BlogCard({ post }: BlogCardProps) {
  return (
    <div className={styles.card}>
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
          <Link href={`/blog/${post.id}`} className={styles.readMore}>
            Read More <span>→</span>
          </Link>
        </div>
      </div>
    </div>
  );
}
