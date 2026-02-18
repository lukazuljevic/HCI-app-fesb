"use client";

import React, { useEffect, useState } from "react";
import styles from "./BlogModal.module.css";
import { type Post } from "@/db/schema";
import { useUpdatePost, useDeletePost } from "@/hooks/use-mutations";

interface BlogModalProps {
  post: Post & { category?: string };
  authorName?: string;
  onClose: () => void;
  canModify?: boolean;
}

export default function BlogModal({ post, authorName, onClose, canModify }: BlogModalProps) {
  const [isEditing, setIsEditing] = useState(false);
  const [imgError, setImgError] = useState(false);
  const [editTitle, setEditTitle] = useState(post.title);
  const [editContent, setEditContent] = useState(post.content);
  const [editImageUrl, setEditImageUrl] = useState(post.imageUrl || "");
  const { trigger: updatePost, isMutating: isUpdating } = useUpdatePost();
  const { trigger: deletePost, isMutating: isDeleting } = useDeletePost();

  useEffect(() => {
    const handleEscape = (e: KeyboardEvent) => {
      if (e.key === "Escape") {
        if (isEditing) {
          setIsEditing(false);
          return;
        }
        onClose();
      }
    };

    document.addEventListener("keydown", handleEscape);
    document.body.style.overflow = "hidden";

    return () => {
      document.removeEventListener("keydown", handleEscape);
      document.body.style.overflow = "unset";
    };
  }, [onClose, isEditing]);

  const handleBackdropClick = (e: React.MouseEvent) => {
    if (e.target === e.currentTarget) {
      onClose();
    }
  };

  const handleSave = async () => {
    if (!editTitle.trim() || !editContent.trim()) return;

    try {
      await updatePost(post.id, {
        title: editTitle,
        content: editContent,
        imageUrl: editImageUrl || undefined,
      });
      setIsEditing(false);
      onClose();
    } catch {
      alert("Failed to update post");
    }
  };

  const handleDelete = async () => {
    if (!confirm("Are you sure you want to delete this post?")) return;

    try {
      await deletePost(post.id);
      onClose();
    } catch {
      alert("Failed to delete post");
    }
  };

  return (
    <div className={styles.overlay} onClick={handleBackdropClick}>
      <div className={styles.modal}>
        <button className={styles.closeButton} onClick={onClose} aria-label="Close modal">
          <svg width="18" height="18" viewBox="0 0 18 18" fill="none" xmlns="http://www.w3.org/2000/svg">
            <path d="M1 1L17 17M17 1L1 17" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round"/>
          </svg>
        </button>

        {!isEditing && (
          <div className={styles.imageWrapper}>
            {post.imageUrl && !imgError ? (
              <img src={post.imageUrl} alt={post.title} className={styles.image} onError={() => setImgError(true)} />
            ) : (
              <div className={styles.placeholderImage}>
                <svg width="48" height="48" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <rect x="2" y="3" width="20" height="18" rx="2" stroke="#555" strokeWidth="1.5"/>
                  <circle cx="8.5" cy="8.5" r="2" stroke="#555" strokeWidth="1.5"/>
                  <path d="M2 17l5-5 3 3 4-4 8 8" stroke="#555" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round"/>
                </svg>
              </div>
            )}
          </div>
        )}

        <div className={styles.content}>
          {isEditing ? (
            <div className={styles.editForm}>
              <label className={styles.editLabel}>Title</label>
              <input
                type="text"
                value={editTitle}
                onChange={(e) => setEditTitle(e.target.value)}
                className={styles.editInput}
              />
              <label className={styles.editLabel}>Image URL</label>
              <input
                type="text"
                value={editImageUrl}
                onChange={(e) => setEditImageUrl(e.target.value)}
                className={styles.editInput}
                placeholder="https://..."
              />
              <label className={styles.editLabel}>Content</label>
              <textarea
                value={editContent}
                onChange={(e) => setEditContent(e.target.value)}
                className={styles.editTextarea}
                rows={12}
              />
              <div className={styles.editActions}>
                <button
                  onClick={handleSave}
                  className={styles.saveButton}
                  disabled={isUpdating}
                >
                  {isUpdating ? "Saving..." : "Save Changes"}
                </button>
                <button
                  onClick={() => {
                    setIsEditing(false);
                    setEditTitle(post.title);
                    setEditContent(post.content);
                    setEditImageUrl(post.imageUrl || "");
                  }}
                  className={styles.cancelButton}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <>
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

              {canModify && (
                <div className={styles.postActions}>
                  <button onClick={() => setIsEditing(true)} className={styles.editButton}>
                    Edit Post
                  </button>
                  <button
                    onClick={handleDelete}
                    className={styles.deletePostButton}
                    disabled={isDeleting}
                  >
                    {isDeleting ? "Deleting..." : "Delete Post"}
                  </button>
                </div>
              )}

              <div className={styles.body}>
                {post.content.split("\n").map((paragraph, index) => (
                  <p key={index}>{paragraph}</p>
                ))}
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
}
