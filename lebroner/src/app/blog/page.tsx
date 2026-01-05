"use client";

import { useState } from "react";
import styles from "./blog.module.css";
import Link from "next/link";
import { usePosts } from "@/hooks/use-queries";
import BlogCard from "@/components/BlogCard/BlogCard";
import BlogModal from "@/components/BlogModal/BlogModal";
import { useSession } from "next-auth/react";
import { type Post } from "@/db/schema";

const CATEGORIES = ["All", "News", "Game Recap", "Opinion", "Lifestyle"];

interface SelectedPost {
  post: Post & { category?: string };
  authorName: string;
}

export default function BlogPage() {
  const [selectedCategory, setSelectedCategory] = useState("All");
  const { posts, isLoading } = usePosts(selectedCategory);
  const { data: session } = useSession();
  const isAdmin = session?.user?.role === "admin";
  const [selectedPost, setSelectedPost] = useState<SelectedPost | null>(null);

  const handleCardClick = (post: Post & { category?: string }, authorName: string) => {
    setSelectedPost({ post, authorName });
  };

  const handleCloseModal = () => {
    setSelectedPost(null);
  };

  return (
    <div className={styles.container}>
        {isAdmin && (
            <Link href="/blog/create" className={styles.addButton}>
                + Add Post
            </Link>
        )}
      <section className={styles.hero}>
        <div className={styles.contentWrapper}>
          <h1 className={styles.heroTitle}>Blogs</h1>
        </div>
      </section>

      <div className={styles.contentWrapper}>
        <div className={styles.filters}>
            <label className={styles.filterLabel}>
                <svg width="20" height="20" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <path d="M4 6H20" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M7 12H17" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                    <path d="M10 18H14" stroke="#666" strokeWidth="2" strokeLinecap="round"/>
                </svg>
                Filter
            </label>
          <select 
            value={selectedCategory} 
            onChange={(e) => setSelectedCategory(e.target.value)}
            className={styles.select}
          >
            {CATEGORIES.map((cat) => (
              <option key={cat} value={cat}>
                {cat}
              </option>
            ))}
          </select>
        </div>

        {isLoading ? (
          <div className={styles.loading}>Loading posts...</div>
        ) : !posts || posts.length === 0 ? (
          <div className={styles.empty}>No posts found in this category.</div>
        ) : (
          <div className={styles.grid}>
            {posts.map((wrapper) => (
              <BlogCard 
                key={wrapper.post.id} 
                post={wrapper.post} 
                onClick={() => handleCardClick(wrapper.post, wrapper.author?.name || "Unknown")}
              />
            ))}
          </div>
        )}
      </div>


      {selectedPost && (
        <BlogModal
          post={selectedPost.post}
          authorName={selectedPost.authorName}
          onClose={handleCloseModal}
        />
      )}
    </div>
  );
}
