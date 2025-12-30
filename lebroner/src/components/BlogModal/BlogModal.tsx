"use client";

import React, { useEffect } from "react";
import styles from "./BlogModal.module.css";
import { type Post } from "@/db/schema";

interface BlogModalProps {
  post: Post & { category?: string };
  authorName?: string;
  onClose: () => void;
}

export default function BlogModal({ post, authorName, onClose }: BlogModalProps) {
  // Close on escape key
  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    // Prevent body scroll when modal is open
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose]);

  // Close when clicking backdrop
  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          ×
        </button>

        {post.imageUrl && (
          <div className={styles.imageWrapper}>
            <img src={post.imageUrl} alt={post.title} className={styles.image} />
          </div>
        )}

        <div className={styles.content}>
          <span className={styles.category}>{post.category || "News"}</span>
          <h1 className={styles.title}>{post.title}</h1>
          
          <div className={styles.meta}>
            <span className={styles.author}>By {authorName || "Unknown"}</span>
            <span className={styles.date}>
              {new Date(post.createdAt).toLocaleDateString("en-US", {
                year: "numeric",
                month: "long",
                day: "numeric",
              })}
            </span>
          </div>

          <div className={styles.body}>
            {post.content.split("\n").map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}
